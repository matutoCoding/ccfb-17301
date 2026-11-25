import { buildCowModel, type CowModel } from './cowModel';
import { renderTofFrame, TOF_PRESETS, DEFAULT_NOISE, CLEAN_NOISE } from './tof';
import { recognizeTeats } from './recognize';
import { checkCupFeasibility, buildCupPath } from './attach';
import { digestArrays, hash32 } from './rng';
import type {
  AttachmentResult, CameraConfig, CameraPose, CowRecord, DepthFrame,
  NoiseSettings, RecognitionResult, ReplayEvent, TeatIndex, Vec3,
} from './types';

export function getPreset(id: string) {
  return TOF_PRESETS.find((p) => p.id === id) ?? TOF_PRESETS[2];
}

export function makeCameraConfig(
  seed: number,
  opts?: { presetId?: string; pose?: CameraPose; noise?: NoiseSettings },
): CameraConfig {
  return {
    preset: getPreset(opts?.presetId ?? 'pmd-qvga'),
    pose: opts?.pose ?? { position: { x: 0, y: 0.42, z: -0.5 }, pitchDeg: 26, yawDeg: 0, rollDeg: 0 },
    noise: opts?.noise ?? DEFAULT_NOISE,
    seed,
  };
}

/** 全群扫描用的机械臂末端相机安装位姿（高度 + 俯仰扫网格） */
export function mountPose(heightM: number, pitchDeg: number, cow?: CowRecord): CameraPose {
  return {
    position: { x: (cow?.stance.offsetX ?? 0) * 0.5, y: heightM, z: -0.5 },
    pitchDeg,
    yawDeg: 0,
    rollDeg: 0,
  };
}

export interface FrameBundle {
  model: CowModel;
  frame: DepthFrame;
  reco: RecognitionResult;
  config: CameraConfig;
  hash: string;
}

/** 牛 + 配置 → 建模 → ToF 帧 → 识别，一步到位 */
export function simulateFrame(
  cow: CowRecord,
  config: CameraConfig,
  model?: CowModel,
  opts?: { strict?: boolean },
): FrameBundle {
  const m = model ?? buildCowModel(cow);
  const frame = renderTofFrame(m, config);
  const strict = opts?.strict ?? !config.noise.enabled;
  const reco = recognizeTeats(frame, m, undefined, { strict });
  const hash = digestArrays([frame.depth, frame.ir]);
  frame.hash = hash;
  return { model: m, frame, reco, config, hash };
}

export interface TrialOutcome {
  success: boolean;
  matchedCount: number;
  maxErrorMm: number;
  legFp: number;
  tailFp: number;
  blocked: number;
  rescans: number;
}

/**
 * 单次全群试验：给定安装高度/俯仰与随机种子，渲染低分辨率噪声帧并评估套杯。
 * 用几何视线/路径检查 + 识别误差共同决定四个杯是否可套。
 */
export function evaluateTrial(
  cow: CowRecord,
  model: CowModel,
  args: { heightM: number; pitchDeg: number; seed: number; cupTolMm: number; presetId?: string; noise?: NoiseSettings },
): TrialOutcome {
  const pose = mountPose(args.heightM, args.pitchDeg, cow);
  const config = makeCameraConfig(args.seed + hash32(cow.id) % 100000, {
    presetId: args.presetId ?? 'sweep-fast',
    pose,
    noise: args.noise ?? DEFAULT_NOISE,
  });
  const { frame, reco } = simulateFrame(cow, config, model, { strict: false });
  void frame;

  let blocked = 0;
  let maxErrorMm = 0;
  let okCups = 0;
  for (let i = 0 as TeatIndex; i < 4; i = (i + 1) as TeatIndex) {
    const feas = checkCupFeasibility(model, i, pose.position);
    if (!feas.clear) blocked++;
    const err = reco.errorsMm[i];
    const recognized = err !== null && err <= args.cupTolMm;
    if (err !== null) maxErrorMm = Math.max(maxErrorMm, err);
    if (recognized && feas.clear) okCups++;
  }
  // 重扫救援：被遮挡的杯在 ±45mm 侧移后若几何路径清空，算 1 次重扫可救回
  let rescans = 0;
  if (okCups < 4) {
    for (let i = 0 as TeatIndex; i < 4; i = (i + 1) as TeatIndex) {
      const feas = checkCupFeasibility(model, i, pose.position);
      const err = reco.errorsMm[i];
      if ((err === null || err > args.cupTolMm) && feas.clear) continue; // 本可识别
      if (!feas.clear) {
        const eye2: Vec3 = { ...pose.position, x: pose.position.x + (i % 2 === 0 ? 0.05 : -0.05) };
        const feas2 = checkCupFeasibility(model, i, eye2);
        if (feas2.clear) rescans++;
      }
    }
  }
  return {
    success: okCups === 4,
    matchedCount: reco.matchedCount,
    maxErrorMm,
    legFp: reco.legFalseCount,
    tailFp: reco.tailFalseCount,
    blocked,
    rescans,
  };
}

/**
 * 回放页用：实际跑最多 3 个侧移重扫机位，生成臂轨迹与事件时间线。
 */
export function runAttachmentSimulation(
  cow: CowRecord,
  baseConfig: CameraConfig,
): AttachmentResult & { bundles: FrameBundle[] } {
  const model = buildCowModel(cow);
  const bundles: FrameBundle[] = [];
  const events: ReplayEvent[] = [];
  let t = 0;
  const push = (type: ReplayEvent['type'], text: string, teat?: TeatIndex, dt = 1.3) => {
    events.push({ t, type, text, teat });
    t += dt;
  };

  push('info', '机械臂从清洗位进入牛后，ToF 相机开机', undefined, 1.8);
  let cfg = baseConfig;
  let bundle = simulateFrame(cow, cfg, model);
  bundles.push(bundle);
  push('scan', `第 1 次扫描：识别到 ${bundle.reco.matchedCount}/4 个乳头`, undefined, 2.4);

  // 针对缺失/遮挡乳头做最多 2 次侧移重扫
  const shifts = [0, 0.055, -0.06];
  let totalRescans = 0;
  for (let attempt = 1; attempt <= 2 && bundle.reco.matchedCount < 4; attempt++) {
    totalRescans++;
    const pose: CameraPose = {
      ...cfg.pose,
      position: { ...cfg.pose.position, x: cfg.pose.position.x + shifts[attempt] },
    };
    cfg = { ...cfg, pose, seed: cfg.seed + attempt * 131 };
    bundle = simulateFrame(cow, cfg, model);
    bundles.push(bundle);
    push('rescan', `侧移 ${(shifts[attempt] * 1000).toFixed(0)}mm 第 ${attempt} 次重扫：${bundle.reco.matchedCount}/4`, undefined, 2.0);
  }

  const eye = cfg.pose.position;
  const cups = [];
  let allOk = true;
  for (let i = 0 as TeatIndex; i < 4; i = (i + 1) as TeatIndex) {
    const feas = checkCupFeasibility(model, i, eye);
    const det = bundle.reco.tips.find((d) => d.matchedTeat === i);
    const cup = buildCupPath(model, i, det?.tip);
    cup.blockedSamples = feas.pathBlockedSamples;
    cup.success = feas.clear && !!det && (det.errorMm ?? 99) <= 14;
    cup.rescans = totalRescans;
    if (!cup.success) allOk = false;
    cups.push(cup);
    const nm = ['左前', '右前', '左后', '右后'][i];
    if (feas.sightBlockedBy) push('blocked', `${nm}视线被${feas.sightBlockedBy === 'tail' ? '尾巴' : '后腿'}遮挡`, i, 1.5);
    if (cup.success) {
      push('found', `${nm}定位 ${det?.errorMm?.toFixed(1)}mm，套杯`, i, 1.6);
      push('cup-on', `${nm}杯沿乳头轴上升`, i, 1.6);
      push('cup-done', `${nm}完成`, i, 0.7);
    } else {
      push('fail', `${nm}无法自动套杯，标记人工`, i, 1.4);
    }
  }
  push(allOk ? 'cup-done' : 'fail', allOk ? '四杯全部套上，开始挤奶' : '部分乳头转人工套杯', undefined, 1.6);

  // 机械臂时间线（位置关键帧，供 three.js 回放）
  const armTimeline = [
    { t: 0, position: { x: 0.28, y: 0.75, z: -0.95 }, pitchDeg: 0, yawDeg: 0 },
    { t: 1.8, position: { ...cfg.pose.position, y: cfg.pose.position.y + 0.12, z: -0.72 }, pitchDeg: 10, yawDeg: 0 },
    { t: 4.2, position: { ...cfg.pose.position }, pitchDeg: cfg.pose.pitchDeg, yawDeg: cfg.pose.yawDeg },
    ...cups.map((c, i) => ({
      t: 6 + i * 4,
      position: c.waypoints[2],
      pitchDeg: 40,
      yawDeg: 0,
      gripper: c.waypoints[4],
    })),
    { t: 6 + cups.length * 4 + 1, position: { x: 0.28, y: 0.75, z: -0.95 }, pitchDeg: 0, yawDeg: 0 },
  ];

  return {
    success: allOk,
    cups,
    events,
    totalRescans,
    armTimeline,
    durationS: 6 + cups.length * 4 + 3,
    bundles,
  };
}
