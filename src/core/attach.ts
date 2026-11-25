import type { CowModel } from './cowModel';
import type { CupPath, ReplayEvent, TeatIndex, Vec3 } from './types';
import { segmentBlocked } from './primitives';
import { dist } from './vec';

/** 乳头“向上（朝乳房）”方向，由真值基部→尖反推不可靠，这里用尖-基向量 */
export function teatUpAxis(model: CowModel, i: number): Vec3 {
  const tip = model.gtTips[i];
  const base = model.gtBases[i];
  const d = { x: tip.x - base.x, y: tip.y - base.y, z: tip.z - base.z };
  const l = Math.hypot(d.x, d.y, d.z) || 1;
  // base→tip 向下；up 取反
  return { x: -d.x / l, y: -d.y / l, z: -d.z / l };
}

export interface CupFeasibility {
  teat: TeatIndex;
  visible: boolean;
  sightBlockedBy?: string;
  pathBlockedSamples: number;
  clear: boolean;
}

/** 检查相机视线与套杯路径是否被后腿/尾巴挡住 */
export function checkCupFeasibility(
  model: CowModel,
  i: TeatIndex,
  eye: Vec3,
  opts?: { cupRadiusM?: number },
): CupFeasibility {
  const tip = model.gtTips[i];
  const up = teatUpAxis(model, i);
  const down = { x: -up.x, y: -up.y, z: -up.z };
  // 视线
  const sight = segmentBlocked(eye, tip, model.prims, true);
  // 套杯路径：从尖下方 11cm 到尖处，采样
  const far = { x: tip.x + down.x * 0.11, y: tip.y + down.y * 0.11, z: tip.z + down.z * 0.11 };
  const near = { x: tip.x + down.x * 0.012, y: tip.y + down.y * 0.012, z: tip.z + down.z * 0.012 };
  let blockedSamples = 0;
  let blocker: string | undefined;
  const NS = 10;
  for (let s = 0; s <= NS; s++) {
    const t = s / NS;
    const p = { x: far.x + (near.x - far.x) * t, y: far.y + (near.y - far.y) * t, z: far.z + (near.z - far.z) * t };
    // 与后腿/尾的距离判定（杯半径 + 肢体半径近似）
    for (const prim of model.prims) {
      if (prim.part !== 'legL' && prim.part !== 'legR' && prim.part !== 'tail') continue;
      let dmin = Infinity;
      if (prim.kind === 'capsule') {
        const ab = { x: prim.b.x - prim.a.x, y: prim.b.y - prim.a.y, z: prim.b.z - prim.a.z };
        const l2 = ab.x * ab.x + ab.y * ab.y + ab.z * ab.z || 1e-9;
        let tt = ((p.x - prim.a.x) * ab.x + (p.y - prim.a.y) * ab.y + (p.z - prim.a.z) * ab.z) / l2;
        tt = Math.max(0, Math.min(1, tt));
        const q = { x: prim.a.x + ab.x * tt, y: prim.a.y + ab.y * tt, z: prim.a.z + ab.z * tt };
        dmin = dist(p, q);
      } else if (prim.kind === 'sphere') {
        dmin = dist(p, prim.c) - prim.r;
      } else {
        dmin = dist(p, prim.c);
      }
      const cupR = opts?.cupRadiusM ?? 0.026;
      const limbR = prim.kind === 'capsule' ? prim.r : 0.04;
      if (dmin < cupR + limbR * 0.55) {
        blockedSamples++;
        blocker = prim.part;
        break;
      }
    }
  }
  return {
    teat: i,
    visible: !sight.blocked,
    sightBlockedBy: sight.blocked ? sight.prim?.part : undefined,
    pathBlockedSamples: blockedSamples,
    clear: blockedSamples <= 1 && !sight.blocked,
  };
}

/** 生成单个杯的路径关键点 */
export function buildCupPath(model: CowModel, i: TeatIndex, detectedTip?: Vec3 | null): CupPath {
  const gt = model.gtTips[i];
  const tip = detectedTip ?? gt;
  const up = teatUpAxis(model, i);
  const down = { x: -up.x, y: -up.y, z: -up.z };
  const side = i === 0 || i === 2 ? 1 : -1;
  const waypoints: Vec3[] = [
    { x: tip.x + side * 0.05, y: tip.y - 0.02, z: tip.z - 0.16 }, // 进入
    { x: tip.x + down.x * 0.12 + side * 0.02, y: tip.y + down.y * 0.12, z: tip.z + down.z * 0.12 - 0.03 },
    { x: tip.x + down.x * 0.055, y: tip.y + down.y * 0.055, z: tip.z + down.z * 0.055 },
    { x: tip.x + down.x * 0.012, y: tip.y + down.y * 0.012, z: tip.z + down.z * 0.012 },
    { x: tip.x - up.x * 0.012, y: tip.y - up.y * 0.012, z: tip.z - up.z * 0.012 }, // 套入
  ];
  const feas = checkCupFeasibility(model, i, { x: 0, y: 0.4, z: -0.5 });
  return {
    teat: i,
    waypoints,
    success: feas.clear,
    blockedSamples: feas.pathBlockedSamples,
    rescans: 0,
  };
}

/** 由一次识别结果生成完整套杯回放脚本（不含额外重扫帧，重扫在 pipeline 里补充） */
export function buildReplayFromReco(
  model: CowModel,
  opts?: { cupToleranceMm?: number; eye?: Vec3; rescans?: number[] },
): { cups: CupPath[]; events: ReplayEvent[]; totalRescans: number; success: boolean } {
  const tol = opts?.cupToleranceMm ?? 12;
  const events: ReplayEvent[] = [];
  const cups: CupPath[] = [];
  let t = 0;
  const push = (type: ReplayEvent['type'], text: string, teat?: TeatIndex, dt = 1.4) => {
    events.push({ t, type, text, teat });
    t += dt;
  };
  push('info', '机械臂进入牛位，ToF 相机开始扫描', undefined, 1.6);
  push('scan', '第一次扫描：点云分割四个乳头', undefined, 2.2);

  let totalRescans = 0;
  for (let i = 0 as TeatIndex; i < 4; i = (i + 1) as TeatIndex) {
    const feas = checkCupFeasibility(model, i, opts?.eye ?? { x: 0, y: 0.42, z: -0.5 });
    const rescan = opts?.rescans?.[i] ?? 0;
    totalRescans += rescan;
    for (let r = 0; r < rescan; r++) {
      push('rescan', `第 ${r + 1} 次重扫：机械臂侧移避开遮挡`, i, 1.5);
    }
    if (feas.sightBlockedBy === 'legL' || feas.sightBlockedBy === 'legR') {
      push('blocked', `左/右后腿挡住 ${['左前', '右前', '左后', '右后'][i]} 视线`, i, 1.6);
    } else if (feas.sightBlockedBy === 'tail') {
      push('blocked', '尾巴进入相机视野，遮挡乳头', i, 1.4);
    }
    const detected = null; // 由调用方在需要时把检测尖传入 buildCupPath
    const cup = buildCupPath(model, i, detected);
    cup.blockedSamples = feas.pathBlockedSamples;
    cup.success = feas.clear;
    cup.rescans = rescan;
    cups.push(cup);
    if (feas.clear) {
      push('found', `${['左前', '右前', '左后', '右后'][i]} 定位成功，误差 ${tol.toFixed(0)}mm 内`, i, 1.2);
      push('cup-on', `奶杯 ${i + 1}/4 沿乳头轴上升套入`, i, 1.8);
      push('cup-done', `${['左前', '右前', '左后', '右后'][i]} 套杯完成`, i, 0.8);
    } else {
      push('fail', `${['左前', '右前', '左后', '右后'][i]} 路径被肢体遮挡，无法套杯`, i, 1.6);
    }
  }
  const success = cups.every((c) => c.success);
  if (totalRescans > 0) push('info', `本轮共重扫 ${totalRescans} 次`, undefined, 1.2);
  push(success ? 'cup-done' : 'fail', success ? '四个奶杯全部套上，开始挤奶' : '存在无法套杯乳头，转人工套杯', undefined, 1.6);
  return { cups, events, totalRescans, success };
}
