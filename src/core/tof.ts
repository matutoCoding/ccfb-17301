import { Rng, hash32 } from './rng';
import type {
  CameraConfig,
  CameraPose,
  DepthFrame,
  NoiseSettings,
  TofModulePreset,
} from './types';
import { partCode, intersectPrims, rayFloor, type Prim } from './primitives';
import type { CowModel } from './cowModel';
import { clamp } from './vec';
import type { Vec3 } from './vec';

export const TOF_PRESETS: TofModulePreset[] = [
  {
    id: 'blaze-vga',
    label: 'Basler blaze-101 (640×480)',
    width: 640,
    height: 480,
    fovXDeg: 67,
    fovYDeg: 51,
    workDistM: 1.0,
    rangeM: [0.3, 3.0],
    modFreqMhz: 40,
    wavelengthNm: 940,
  },
  {
    id: 'azure-nfov',
    label: 'Azure Kinect NFOV (320×288)',
    width: 320,
    height: 288,
    fovXDeg: 75,
    fovYDeg: 65,
    workDistM: 0.8,
    rangeM: [0.25, 2.5],
    modFreqMhz: 80,
    wavelengthNm: 860,
  },
  {
    id: 'pmd-qvga',
    label: 'pmd flexx2 QVGA (320×240)',
    width: 320,
    height: 240,
    fovXDeg: 62,
    fovYDeg: 48,
    workDistM: 0.6,
    rangeM: [0.2, 2.0],
    modFreqMhz: 60,
    wavelengthNm: 850,
  },
  {
    id: 'ifm-o3d',
    label: 'ifm O3D303 (176×132)',
    width: 176,
    height: 132,
    fovXDeg: 60,
    fovYDeg: 45,
    workDistM: 0.5,
    rangeM: [0.3, 1.25],
    modFreqMhz: 55,
    wavelengthNm: 850,
  },
  {
    id: 'sweep-fast',
    label: '扫描用低分辨率 (160×120)',
    width: 160,
    height: 120,
    fovXDeg: 66,
    fovYDeg: 50,
    workDistM: 0.6,
    rangeM: [0.2, 2.2],
    modFreqMhz: 48,
    wavelengthNm: 940,
  },
];

export const DEFAULT_NOISE: NoiseSettings = {
  enabled: true,
  depthNoiseScale: 1,
  falloffScale: 1,
  flyingPixels: true,
  multipath: true,
  wetSaturation: true,
  multipathBiasM: 0.018,
};

export const CLEAN_NOISE: NoiseSettings = {
  enabled: false,
  depthNoiseScale: 0,
  falloffScale: 1,
  flyingPixels: false,
  multipath: false,
  wetSaturation: false,
  multipathBiasM: 0,
};

export interface CameraBasis {
  eye: Vec3;
  forward: Vec3;
  right: Vec3;
  up: Vec3;
  fx: number;
  fy: number;
}

export function cameraBasis(pose: CameraPose, preset: TofModulePreset): CameraBasis {
  const P = (pose.pitchDeg * Math.PI) / 180; // 正俯仰=仰视
  const Yaw = (pose.yawDeg * Math.PI) / 180;
  const roll = (pose.rollDeg * Math.PI) / 180;
  // 基准前方 +Z；pitch>0 时 forward.y>0
  const f: Vec3 = {
    x: Math.sin(Yaw) * Math.cos(P),
    y: Math.sin(P),
    z: Math.cos(Yaw) * Math.cos(P),
  };
  // right = cross(worldUp, f) = (f.z, 0, -f.x)
  const rl = Math.hypot(f.z, f.x) || 1;
  let r: Vec3 = { x: f.z / rl, y: 0, z: -f.x / rl };
  // up = cross(f, r)
  let u: Vec3 = {
    x: f.y * r.z - f.z * r.y,
    y: f.z * r.x - f.x * r.z,
    z: f.x * r.y - f.y * r.x,
  };
  // 滚转：绕 f 旋转 r/u
  if (roll !== 0) {
    const cr = Math.cos(roll);
    const sr = Math.sin(roll);
    const rr: Vec3 = {
      x: r.x * cr + u.x * sr,
      y: r.y * cr + u.y * sr,
      z: r.z * cr + u.z * sr,
    };
    const uu: Vec3 = {
      x: u.x * cr - r.x * sr,
      y: u.y * cr - r.y * sr,
      z: u.z * cr - r.z * sr,
    };
    r = rr;
    u = uu;
  }
  const fx = preset.width / 2 / Math.tan((preset.fovXDeg * Math.PI) / 360);
  const fy = preset.height / 2 / Math.tan((preset.fovYDeg * Math.PI) / 360);
  return { eye: { ...pose.position }, forward: f, right: r, up: u, fx, fy };
}

/** 让相机从 position 对准 target 所需的 pitch/yaw */
export function aimPose(position: Vec3, target: Vec3, rollDeg = 0): CameraPose {
  const dx = target.x - position.x;
  const dy = target.y - position.y;
  const dz = target.z - position.z;
  const horiz = Math.hypot(dx, dz) || 1e-6;
  return {
    position: { ...position },
    pitchDeg: (Math.atan2(dy, horiz) * 180) / Math.PI,
    yawDeg: (Math.atan2(dx, dz) * 180) / Math.PI,
    rollDeg,
  };
}

/** 推荐的标准观察位姿（牛后下方、较近、大仰角对准乳头群） */
export function canonicalPose(model: CowModel): CameraPose {
  const F = model.cow.traits.udderFloorHeightMm / 1000;
  // 瞄准乳头群中心（乳房底稍下、纵向居中）
  const target: Vec3 = { x: model.udderCenter.x, y: F - 0.02, z: 0.0 };
  const eye: Vec3 = {
    x: model.cow.stance.offsetX * 0.6,
    y: Math.max(0.21, F - 0.32),
    z: -0.4,
  };
  return aimPose(eye, target);
}

function inWetZone(p: Vec3, model: CowModel): boolean {
  for (const z of model.wetZones) {
    const dx = p.x - z.c.x;
    const dy = p.y - z.c.y;
    const dz = p.z - z.c.z;
    if (dx * dx + dy * dy + dz * dz < z.r * z.r) return true;
  }
  return false;
}

function creaseFactor(p: Vec3, model: CowModel): number {
  let m = 0;
  for (const z of model.creaseZones) {
    const d = Math.hypot(p.x - z.c.x, p.y - z.c.y, p.z - z.c.z);
    if (d < z.r) m = Math.max(m, 1 - d / z.r);
  }
  return m;
}

/**
 * 渲染一帧 ToF 深度 + 红外。
 * 纯 CPU、完全确定性：相同 (model, config) 产出逐字节一致的数组。
 */
export function renderTofFrame(model: CowModel, config: CameraConfig): DepthFrame {
  const { preset, noise } = config;
  const W = preset.width;
  const H = preset.height;
  const N = W * H;
  const basis = cameraBasis(config.pose, preset);
  const seedStr = `${model.cow.id}|${config.seed}|${preset.id}|${config.pose.position.x.toFixed(4)},${config.pose.position.y.toFixed(4)},${config.pose.position.z.toFixed(4)}|${config.pose.pitchDeg.toFixed(2)},${config.pose.yawDeg.toFixed(2)},${config.pose.rollDeg.toFixed(2)}|${noise.enabled ? 1 : 0}`;
  const rng = new Rng(hash32(seedStr));

  const depth = new Float32Array(N);
  const cleanDepth = new Float32Array(N);
  const ir = new Uint8ClampedArray(N);
  const partId = new Uint8Array(N);
  const teatId = new Int8Array(N).fill(-1);
  const points = new Float32Array(N * 3);
  const valid = new Uint8Array(N);
  const flying = new Uint8Array(N);
  const multipath = new Uint8Array(N);
  const saturated = new Uint8Array(N);

  // 所有随机数按固定像素顺序预抽取，保证任何后续逻辑分支都不影响确定性
  const gaussDraws = new Float32Array(N * 2);
  const chanceDraws = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    gaussDraws[i * 2] = rng.gauss();
    gaussDraws[i * 2 + 1] = rng.gauss();
    chanceDraws[i] = rng.float();
  }

  const prims: Prim[] = model.prims;
  const [dNear, dFar] = preset.rangeM;

  for (let j = 0; j < H; j++) {
    const sy = H / 2 - (j + 0.5);
    for (let i = 0; i < W; i++) {
      const idx = j * W + i;
      const sx = i + 0.5 - W / 2;
      // 光线方向
      let dx = basis.forward.x + (sx / basis.fx) * basis.right.x + (sy / basis.fy) * basis.up.x;
      let dy = basis.forward.y + (sx / basis.fx) * basis.right.y + (sy / basis.fy) * basis.up.y;
      let dz = basis.forward.z + (sx / basis.fx) * basis.right.z + (sy / basis.fy) * basis.up.z;
      const dl = Math.hypot(dx, dy, dz) || 1;
      dx /= dl;
      dy /= dl;
      dz /= dl;
      const ro = basis.eye;
      const rd: Vec3 = { x: dx, y: dy, z: dz };

      let bestT = Infinity;
      let bestNormal: Vec3 | null = null;
      let bestPrim: Prim | null = null;

      const ft = rayFloor(ro, rd);
      if (ft !== null && ft < bestT) {
        bestT = ft;
        bestNormal = { x: 0, y: 1, z: 0 };
        bestPrim = null; // 地面
      }
      const hit = intersectPrims(ro, rd, prims);
      if (hit && hit.t < bestT) {
        bestT = hit.t;
        bestNormal = hit.normal;
        bestPrim = hit.prim;
      }

      if (!isFinite(bestT) || bestT > dFar || bestT < dNear * 0.4) {
        cleanDepth[idx] = NaN;
        depth[idx] = NaN;
        continue;
      }

      const p: Vec3 = { x: ro.x + dx * bestT, y: ro.y + dy * bestT, z: ro.z + dz * bestT };
      cleanDepth[idx] = bestT;
      partId[idx] = bestPrim ? partCode(bestPrim.part) : 0;
      if (bestPrim?.teatId !== undefined) teatId[idx] = bestPrim.teatId;

      /* ---------- 红外强度：∝ albedo·cosθ / d² ---------- */
      const cosI = bestNormal ? clamp(-(bestNormal.x * dx + bestNormal.y * dy + bestNormal.z * dz), 0.05, 1) : 0.9;
      const d = bestT;
      const K = 118 * noise.falloffScale + 40 * (1 - noise.falloffScale);
      let amp = 10 + (K * (bestPrim?.albedo ?? 0.55) * cosI) / (d * d);
      // 调制频率对信号的轻微影响
      amp *= 0.85 + 0.15 * Math.min(1, preset.modFreqMhz / 60);

      /* ---------- 沾水镜面饱和 → 直接无效 ---------- */
      let isSaturated = false;
      if (noise.enabled && noise.wetSaturation && bestPrim?.part === 'teat' && model.wetZones.length) {
        if (inWetZone(p, model)) {
          isSaturated = true;
          saturated[idx] = 1;
          ir[idx] = 255;
          depth[idx] = NaN;
          cleanDepth[idx] = bestT;
          valid[idx] = 0;
          continue;
        }
      }

      /* ---------- 深度噪声：弱回波处方差显著增大（标定到真实 ToF 量级） ---------- */
      const fRef = 48;
      const ampForSigma = Math.max(amp, 42);
      const ampFactor = Math.sqrt(130 / ampForSigma);
      let sigma = 0.0016 * (fRef / preset.modFreqMhz) * ampFactor * noise.depthNoiseScale;
      sigma = Math.min(sigma, 0.012);

      let z = bestT;
      if (noise.enabled) {
        // 截断到 ±2.5σ，避免罕见极端值形成把种子带偏的飞点
        const gn = Math.max(-2.5, Math.min(2.5, gaussDraws[idx * 2]));
        z += gn * sigma;
        // IR 噪声（散粒+读出）
        amp += gaussDraws[idx * 2 + 1] * (2.5 + Math.sqrt(Math.max(amp, 1)) * 0.55);
      }
      ir[idx] = clamp(Math.round(amp), 0, 255);

      /* ---------- 凹处多径：深度系统性偏远 ---------- */
      if (noise.enabled && noise.multipath && bestPrim?.part === 'udder') {
        const cf = creaseFactor(p, model);
        if (cf > 0.02) {
          multipath[idx] = 1;
          z += noise.multipathBiasM * (0.35 + 0.65 * cf);
          z += gaussDraws[idx * 2] * 0.004 * cf;
        }
      }

      depth[idx] = z;
      valid[idx] = 1;
      points[idx * 3] = ro.x + dx * z;
      points[idx * 3 + 1] = ro.y + dy * z;
      points[idx * 3 + 2] = ro.z + dz * z;
    }
  }

  /* ---------- 边缘飞点：前后景交界处深度混合 ---------- */
  if (noise.enabled && noise.flyingPixels) {
    const getD = (x: number, y: number): number => {
      if (x < 0 || y < 0 || x >= W || y >= H) return NaN;
      return cleanDepth[y * W + x];
    };
    for (let j = 1; j < H - 1; j++) {
      for (let i = 1; i < W - 1; i++) {
        const idx = j * W + i;
        const dc = cleanDepth[idx];
        if (!isFinite(dc) || saturated[idx]) continue;
        const ns = [getD(i - 1, j), getD(i + 1, j), getD(i, j - 1), getD(i, j + 1)];
        let far = dc;
        let near = dc;
        for (const dn of ns) {
          if (!isFinite(dn)) {
            far = Math.max(far, dc + 0.5); // 背景无回波当作很远
            continue;
          }
          if (dn > far) far = dn;
          if (dn < near) near = dn;
        }
        const gap = far - near;
        // 当前像素靠近前景边缘且存在明显前后景跳变
        if (gap > 0.045 && dc <= near + 0.02 && chanceDraws[idx] < 0.42) {
          const alpha = 0.3 + chanceDraws[(idx + 13) % N] * 0.45;
          const fz = near + (far - near) * alpha;
          depth[idx] = fz + gaussDraws[idx * 2] * 0.006;
          flying[idx] = 1;
          valid[idx] = 1;
        }
      }
    }
    // 飞点改了深度，统一重建所有点云，保证一致
    for (let idx = 0; idx < N; idx++) {
      if (!valid[idx] || !isFinite(depth[idx])) {
        valid[idx] = 0;
        continue;
      }
      // 由像素索引反推光线（与上面相同）
      const i = idx % W;
      const j = (idx / W) | 0;
      const sx = i + 0.5 - W / 2;
      const sy = H / 2 - (j + 0.5);
      let dx = basis.forward.x + (sx / basis.fx) * basis.right.x + (sy / basis.fy) * basis.up.x;
      let dy = basis.forward.y + (sx / basis.fx) * basis.right.y + (sy / basis.fy) * basis.up.y;
      let dz = basis.forward.z + (sx / basis.fx) * basis.right.z + (sy / basis.fy) * basis.up.z;
      const dl = Math.hypot(dx, dy, dz) || 1;
      dx /= dl;
      dy /= dl;
      dz /= dl;
      const z = depth[idx];
      points[idx * 3] = basis.eye.x + dx * z;
      points[idx * 3 + 1] = basis.eye.y + dy * z;
      points[idx * 3 + 2] = basis.eye.z + dz * z;
    }
  }

  return {
    width: W,
    height: H,
    depth,
    cleanDepth,
    ir,
    partId,
    teatId,
    points,
    valid,
    flying,
    multipath,
    saturated,
    seed: config.seed,
    eye: basis.eye,
  };
}
