import { Rng, hash32 } from './rng';
import type {
  CowRecord,
  TeatParams,
  UdderModelParams,
  Vec3 as T,
} from './types';
import { TEAT_NAMES } from './types';
export { TEAT_NAMES };
export type { UdderModelParams } from './types';
import type { Prim } from './primitives';
import { rotateEuler, v3, type Vec3 } from './vec';

const MM = 0.001;
const DEG = Math.PI / 180;

export interface WetZone {
  c: Vec3;
  r: number;
}
export interface CreaseZone {
  c: Vec3;
  r: number;
}

export interface CowModel {
  cow: CowRecord;
  params: UdderModelParams;
  prims: Prim[];
  /** 真值乳头尖（世界系 m），顺序 LF RF LR RR */
  gtTips: Vec3[];
  gtBases: Vec3[];
  udderCenter: Vec3;
  wetZones: WetZone[];
  creaseZones: CreaseZone[];
  seed: number;
}

/** 泌乳天数 → 容积曲线 0.82-1.05 */
export function dimCurve(dim: number): number {
  if (dim <= 0) return 0.8;
  const peak = 65;
  const d = Math.max(1, dim);
  // Wood 曲线归一化形状
  const w = Math.pow(d / peak, 0.22) * Math.exp(0.22 * (1 - d / peak));
  return 0.82 + 0.2 * w;
}

export function defaultTeatParams(cow: CowRecord): TeatParams[] {
  const tr = cow.traits;
  const rng = new Rng(hash32(cow.id + ':teatvar'));
  const out: TeatParams[] = [];
  for (let i = 0; i < 4; i++) {
    const isRear = i >= 2;
    let lengthMm = tr.teatLengthMm * rng.range(0.92, 1.08);
    let radiusMm = tr.teatDiameterMm * 0.5 * rng.range(0.92, 1.06);
    let tiltDeg = rng.range(3, 9);
    // yaw=90 → +X（左），-90 → -X（右）
    let yawDeg = i === 0 || i === 2 ? 90 : -90;
    if (isRear) {
      tiltDeg += rng.range(0, 5);
      yawDeg += rng.range(-14, 14);
    } else {
      yawDeg += rng.range(-10, 10);
    }
    if (cow.flags.veryShortTeats) {
      lengthMm = rng.range(16, 30);
      radiusMm *= rng.range(0.85, 1);
    }
    if (cow.flags.crossedRearTeats && isRear) {
      // 左后朝右跨、右后朝左跨
      yawDeg = i === 2 ? -90 + rng.range(-8, 8) : 90 + rng.range(-8, 8);
      tiltDeg = rng.range(30, 48);
    }
    out.push({ lengthMm, radiusMm, tiltDeg, yawDeg });
  }
  // 手动覆盖
  cow.teatOverrides?.forEach((ov, i) => {
    if (ov) out[i] = { ...out[i], ...ov };
  });
  return out;
}

export function defaultModelParams(cow: CowRecord): UdderModelParams {
  const teats = defaultTeatParams(cow) as [TeatParams, TeatParams, TeatParams, TeatParams];
  const milkState =
    cow.kind === 'lactating' ? Math.min(1, cow.hoursSinceMilking / 11) : 0.35;
  const dc = dimCurve(cow.dim);
  const rng = new Rng(hash32(cow.id + ':quarters'));
  const q: number[] = [];
  for (let i = 0; i < 4; i++) q.push(dc * rng.range(0.96, 1.04));
  return {
    quarterFullness: q as [number, number, number, number],
    teats,
    stance: { ...cow.stance },
    dim: cow.dim,
    milkState,
    wetness: cow.flags.wetness ?? 0,
  };
}

/** 把局部点按站姿变换到世界 */
function makeStanceXform(stance: CowRecord['stance']) {
  const rx = stance.pitchDeg * DEG;
  const rz = stance.rollDeg * DEG;
  return (p: Vec3): Vec3 => {
    const r = rotateEuler(p, rx, 0, rz);
    return { x: r.x + stance.offsetX, y: r.y, z: r.z };
  };
}

function teatDirection(tp: TeatParams): Vec3 {
  const tilt = tp.tiltDeg * DEG;
  const yaw = tp.yawDeg * DEG;
  // yaw=0 → 朝牛后方 -Z；yaw=90 → +X
  const x = Math.sin(tilt) * Math.sin(yaw);
  const z = -Math.sin(tilt) * Math.cos(yaw);
  const y = -Math.cos(tilt);
  return v3(x, y, z);
}

export function buildCowModel(cow: CowRecord, params?: UdderModelParams): CowModel {
  const P = params ?? defaultModelParams(cow);
  const tr = cow.traits;
  const F = tr.udderFloorHeightMm * MM;
  const xform = makeStanceXform(P.stance);
  const prims: Prim[] = [];
  const gtTips: Vec3[] = [];
  const gtBases: Vec3[] = [];
  const wetZones: WetZone[] = [];
  const creaseZones: CreaseZone[] = [];

  const X = (p: Vec3) => xform(p);
  const Xdir = (d: Vec3) => {
    const r = rotateEuler(d, P.stance.pitchDeg * DEG, 0, P.stance.rollDeg * DEG);
    return r;
  };

  /* ---------------- 乳房主体 + 四乳区 ---------------- */
  const full = P.quarterFullness.map((q) => q * (0.86 + 0.2 * P.milkState));
  // 主乳房椭球
  prims.push({
    kind: 'ellipsoid',
    part: 'udder',
    albedo: 0.62,
    c: X(v3(0, F + 0.115, 0.03)),
    e0: Xdir(v3(1, 0, 0)),
    e1: Xdir(v3(0, 1, 0)),
    e2: Xdir(v3(0, 0, 1)),
    r: v3(0.15 * full.reduce((a, b) => a + b, 0) / 4, 0.115, 0.195),
  });

  // 四个乳区：0 LF(+x,+z) 1 RF(-x,+z) 2 LR(+x,-z) 3 RR(-x,-z)
  const sf = tr.frontTeatSpreadMm * MM;
  const sr = tr.rearTeatSpreadMm * MM;
  const gap = tr.frontRearGapMm * MM;
  const zRear = -0.085;
  const zFront = zRear + gap;
  const teatX = [sf / 2, -sf / 2, sr / 2, -sr / 2];
  const teatZ = [zFront, zFront, zRear, zRear];

  for (let i = 0; i < 4; i++) {
    const f = full[i];
    const rx = 0.072 * (0.94 + 0.12 * f);
    const ry = 0.082 * (0.9 + 0.16 * f);
    const rz = 0.088 * (0.94 + 0.12 * f);
    // 乳区中心与乳头基部对齐，让乳头从椭球底极伸出，避免大段被埋
    const cx = teatX[i];
    const cz = teatZ[i] + (i < 2 ? 0.012 : -0.012);
    const cy = F + ry; // 椭球底恰在 F
    prims.push({
      kind: 'ellipsoid',
      part: 'udder',
      albedo: 0.6,
      c: X(v3(cx, cy, cz)),
      e0: Xdir(v3(1, 0, 0)),
      e1: Xdir(v3(0, 1, 0)),
      e2: Xdir(v3(0, 0, 1)),
      r: v3(rx, ry, rz),
    });

    /* 乳头胶囊 */
    const tp = P.teats[i];
    const L = tp.lengthMm * MM;
    const rad = tp.radiusMm * MM;
    const base = v3(teatX[i], F + rad * 0.35, teatZ[i]);
    const d = teatDirection(tp);
    const rWorldDir = Xdir(d);
    const baseW = X(base);
    // 胶囊 b 为直段末端（尖球心），总尖 = b + r*d
    const tipCenterLocal = {
      x: base.x + d.x * Math.max(0, L - rad),
      y: base.y + d.y * Math.max(0, L - rad),
      z: base.z + d.z * Math.max(0, L - rad),
    };
    const tipLocal = {
      x: base.x + d.x * L,
      y: base.y + d.y * L,
      z: base.z + d.z * L,
    };
    const bW = X(tipCenterLocal);
    prims.push({
      kind: 'capsule',
      part: 'teat',
      teatId: i,
      albedo: 0.52,
      a: baseW,
      b: bW,
      r: rad,
    });
    gtBases.push(baseW);
    gtTips.push(X(tipLocal));

    /* 沾水区域：沿乳头的小湿斑 */
    if (P.wetness > 0) {
      const wr = new Rng(hash32(cow.id + ':wet' + i));
      const patches = Math.round(P.wetness * 3 * (wr.chance(0.6) ? 1 : 0));
      for (let k = 0; k < patches; k++) {
        const tt = wr.range(0.25, 0.95);
        wetZones.push({
          c: X({
            x: base.x + d.x * L * tt,
            y: base.y + d.y * L * tt,
            z: base.z + d.z * L * tt,
          }),
          r: wr.range(0.004, 0.009) * (0.7 + P.wetness * 0.6),
        });
      }
    }
  }

  /* ---------------- 后乳房附着区 ---------------- */
  const attachH = tr.rearUdderHeightMm * MM;
  const attachW = tr.rearUdderWidthMm * MM;
  prims.push({
    kind: 'ellipsoid',
    part: 'udder',
    albedo: 0.58,
    c: X(v3(0, (F + attachH) / 2 + 0.05, -0.145)),
    e0: Xdir(v3(1, 0, 0)),
    e1: Xdir(v3(0, 1, 0)),
    e2: Xdir(v3(0, 0, 1)),
    r: v3(attachW / 2, Math.max(0.12, (attachH - F) / 2 + 0.06), 0.055),
  });

  /* ---------------- 腹部/身体 ---------------- */
  prims.push({
    kind: 'ellipsoid',
    part: 'body',
    albedo: 0.7,
    c: X(v3(0, F + 0.34, 0.22)),
    e0: Xdir(v3(1, 0, 0)),
    e1: Xdir(v3(0, 1, 0)),
    e2: Xdir(v3(0, 0, 1)),
    r: v3(0.24, 0.21, 0.52),
  });

  /* ---------------- 两条后腿 ---------------- */
  const spread = P.stance.legSpread;
  for (const side of [-1, 1] as const) {
    // side=+1 左（x+），-1 右
    const part = side > 0 ? 'legL' : 'legR';
    const zoff = side > 0 ? P.stance.legLz : P.stance.legRz;
    const xHip = side * 0.145 * spread;
    const xHock = side * 0.118 * spread;
    const xFoot = side * 0.1 * spread;
    const hip = v3(xHip, 0.92, -0.02 + zoff * 0.3);
    const hock = v3(xHock, 0.46, -0.2 + zoff);
    const fet = v3(xFoot, 0.13, -0.1 + zoff * 0.6);
    prims.push({ kind: 'capsule', part, albedo: 0.72, a: X(hip), b: X(hock), r: 0.052 });
    prims.push({ kind: 'capsule', part, albedo: 0.7, a: X(hock), b: X(fet), r: 0.034 });
    prims.push({
      kind: 'ellipsoid',
      part,
      albedo: 0.66,
      c: X(v3(xFoot, 0.05, -0.06 + zoff * 0.6)),
      e0: v3(1, 0, 0),
      e1: v3(0, 1, 0),
      e2: v3(0, 0, 1),
      r: v3(0.052, 0.05, 0.085),
    });
  }

  /* ---------------- 尾巴（带尾帚） ---------------- */
  const sw = P.stance.tailSwingDeg * DEG;
  const tx = Math.sin(sw) * 0.12;
  const tail0 = v3(0.02, 1.04, -0.27);
  const tail1 = v3(tx * 0.4, 0.74, -0.34);
  const tail2 = v3(tx, 0.46, -0.31);
  prims.push({ kind: 'capsule', part: 'tail', albedo: 0.4, a: X(tail0), b: X(tail1), r: 0.02 });
  prims.push({ kind: 'capsule', part: 'tail', albedo: 0.38, a: X(tail1), b: X(tail2), r: 0.016 });
  prims.push({ kind: 'sphere', part: 'tail', albedo: 0.32, c: X(tail2), r: 0.046 });

  /* ---------------- 乳房-后腿凹处（多径区） ---------------- */
  for (const side of [-1, 1]) {
    creaseZones.push({
      c: X(v3(side * 0.105, F + 0.075, -0.14)),
      r: 0.1,
    });
  }

  const udderCenter = X(v3(0, F + 0.09, 0.02));
  return {
    cow,
    params: P,
    prims,
    gtTips,
    gtBases,
    udderCenter,
    wetZones,
    creaseZones,
    seed: hash32(cow.id),
  };
}

export function teatLabel(i: number): string {
  return TEAT_NAMES[i];
}
