import type { PartKind } from './types';
import type { Vec3 } from './vec';
import { dot, sub } from './vec';

export const PART_CODES: PartKind[] = [
  'floor',
  'body',
  'udder',
  'teat',
  'legL',
  'legR',
  'tail',
  'hoof',
];

export const partCode = (p: PartKind): number => PART_CODES.indexOf(p);
export const codePart = (c: number): PartKind => PART_CODES[c] ?? 'body';

interface PrimBase {
  part: PartKind;
  teatId?: number;
  /** 反射率 0-1 */
  albedo: number;
}

export interface SpherePrim extends PrimBase {
  kind: 'sphere';
  c: Vec3;
  r: number;
}

export interface EllipsoidPrim extends PrimBase {
  kind: 'ellipsoid';
  c: Vec3;
  /** 正交基（已含方向），半径与基对应 */
  e0: Vec3;
  e1: Vec3;
  e2: Vec3;
  r: Vec3; // x=对应 e0 的半径 ...
}

export interface CapsulePrim extends PrimBase {
  kind: 'capsule';
  a: Vec3;
  b: Vec3;
  r: number;
}

export type Prim = SpherePrim | EllipsoidPrim | CapsulePrim;

export interface Hit {
  t: number;
  point: Vec3;
  normal: Vec3;
  prim: Prim;
}

const EPS = 1e-7;

function finishSphere(
  t: number,
  o: Vec3,
  d: Vec3,
  c: Vec3,
  r: number,
  prim: Prim,
): Hit | null {
  if (t < EPS) return null;
  const point = { x: o.x + d.x * t, y: o.y + d.y * t, z: o.z + d.z * t };
  const n = sub(point, c);
  const nl = Math.hypot(n.x, n.y, n.z) || 1;
  return { t, point, normal: { x: n.x / nl, y: n.y / nl, z: n.z / nl }, prim };
}

export function raySphere(o: Vec3, d: Vec3, s: SpherePrim): Hit | null {
  const oc = sub(o, s.c);
  const b = dot(oc, d);
  const cc = dot(oc, oc) - s.r * s.r;
  const disc = b * b - cc; // |oc + t d|²=r², d normalized
  if (disc < 0) return null;
  const sq = Math.sqrt(disc);
  let t = -b - sq;
  if (t < EPS) t = -b + sq;
  if (t < EPS) return null;
  return finishSphere(t, o, d, s.c, s.r, s);
}

export function rayEllipsoid(o: Vec3, d: Vec3, el: EllipsoidPrim): Hit | null {
  const oc = sub(o, el.c);
  // 变换到单位球空间：q_i = dot(p-c, e_i)/r_i
  const ox = dot(oc, el.e0) / el.r.x;
  const oy = dot(oc, el.e1) / el.r.y;
  const oz = dot(oc, el.e2) / el.r.z;
  const dx = dot(d, el.e0) / el.r.x;
  const dy = dot(d, el.e1) / el.r.y;
  const dz = dot(d, el.e2) / el.r.z;
  const A = dx * dx + dy * dy + dz * dz;
  const B = ox * dx + oy * dy + oz * dz; // 半 b
  const C = ox * ox + oy * oy + oz * oz - 1;
  const disc = B * B - A * C;
  if (disc < 0 || A < EPS) return null;
  const sq = Math.sqrt(disc);
  let t = (-B - sq) / A;
  if (t < EPS) t = (-B + sq) / A;
  if (t < EPS) return null;
  const point = { x: o.x + d.x * t, y: o.y + d.y * t, z: o.z + d.z * t };
  // 梯度法线： n ~ Σ e_i * q_i / r_i
  const qx = ox + t * dx;
  const qy = oy + t * dy;
  const qz = oz + t * dz;
  let nx = (el.e0.x * qx) / el.r.x + (el.e1.x * qy) / el.r.y + (el.e2.x * qz) / el.r.z;
  let ny = (el.e0.y * qx) / el.r.x + (el.e1.y * qy) / el.r.y + (el.e2.y * qz) / el.r.z;
  let nz = (el.e0.z * qx) / el.r.x + (el.e1.z * qy) / el.r.z + (el.e2.z * qz) / el.r.z;
  const nl = Math.hypot(nx, ny, nz) || 1;
  nx /= nl;
  ny /= nl;
  nz /= nl;
  return { t, point, normal: { x: nx, y: ny, z: nz }, prim: el };
}

/** iq 风格胶囊求交（有限圆柱 + 两端球） */
export function rayCapsule(o: Vec3, d: Vec3, cap: CapsulePrim): Hit | null {
  const ba = sub(cap.b, cap.a);
  const oa = sub(o, cap.a);
  const baba = dot(ba, ba);
  const bard = dot(ba, d);
  const baoa = dot(ba, oa);
  const rdoa = dot(d, oa);
  const oaoa = dot(oa, oa);
  const r = cap.r;

  let bestT = Infinity;
  let normal: Vec3 | null = null;

  // 圆柱侧面
  const A = baba - bard * bard;
  if (A > 1e-10) {
    const B = baba * rdoa - baoa * bard; // 注意这是 2b 还是 b？按 iq: b = baba*rdoa - baoa*bard
    const C = baba * oaoa - baoa * baoa - r * r * baba;
    const h = B * B - A * C;
    if (h >= 0) {
      const t = (-B - Math.sqrt(h)) / A;
      const y = baoa + t * bard; // = dot(hit-a, ba)
      if (t > EPS && y > 0 && y < baba && t < bestT) {
        bestT = t;
        const p = { x: o.x + d.x * t, y: o.y + d.y * t, z: o.z + d.z * t };
        const s = y / baba;
        const axisP = {
          x: cap.a.x + ba.x * s,
          y: cap.a.y + ba.y * s,
          z: cap.a.z + ba.z * s,
        };
        const n = sub(p, axisP);
        const nl = Math.hypot(n.x, n.y, n.z) || 1;
        normal = { x: n.x / nl, y: n.y / nl, z: n.z / nl };
      }
    }
  }

  // 端球
  for (const c of [cap.a, cap.b]) {
    const oc = sub(o, c);
    const bcoef = dot(oc, d);
    const cc = dot(oc, oc) - r * r;
    const disc = bcoef * bcoef - cc;
    if (disc < 0) continue;
    const sq = Math.sqrt(disc);
    let t = -bcoef - sq;
    if (t < EPS) t = -bcoef + sq;
    if (t > EPS && t < bestT) {
      const p = { x: o.x + d.x * t, y: o.y + d.y * t, z: o.z + d.z * t };
      const n = sub(p, c);
      const nl = Math.hypot(n.x, n.y, n.z) || 1;
      bestT = t;
      normal = { x: n.x / nl, y: n.y / nl, z: n.z / nl };
    }
  }

  if (!isFinite(bestT) || !normal) return null;
  const point = { x: o.x + d.x * bestT, y: o.y + d.y * bestT, z: o.z + d.z * bestT };
  return { t: bestT, point, normal, prim: cap };
}

/** 与 y=0 地面求交 */
export function rayFloor(o: Vec3, d: Vec3): number | null {
  if (Math.abs(d.y) < 1e-9) return null;
  const t = -o.y / d.y;
  return t > EPS ? t : null;
}

export function intersectPrims(o: Vec3, d: Vec3, prims: Prim[]): Hit | null {
  let best: Hit | null = null;
  for (let i = 0; i < prims.length; i++) {
    const p = prims[i];
    let h: Hit | null = null;
    if (p.kind === 'sphere') h = raySphere(o, d, p);
    else if (p.kind === 'ellipsoid') h = rayEllipsoid(o, d, p);
    else h = rayCapsule(o, d, p);
    if (h && (!best || h.t < best.t)) best = h;
  }
  return best;
}

/** 线段/射线是否被任意实体挡住（套杯路径碰撞、视线遮挡用），返回碰撞次数 */
export function segmentBlocked(
  from: Vec3,
  to: Vec3,
  prims: Prim[],
  ignoreTeats = false,
): { blocked: boolean; count: number; prim?: Prim } {
  const dir = sub(to, from);
  const total = Math.hypot(dir.x, dir.y, dir.z);
  if (total < 1e-9) return { blocked: false, count: 0 };
  const nd = { x: dir.x / total, y: dir.y / total, z: dir.z / total };
  let count = 0;
  let firstPrim: Prim | undefined;
  // 沿线段步进检测：用每段端点做最近距离近似不如直接对 prim 求交并限制 t<=total
  for (const p of prims) {
    if (ignoreTeats && p.part === 'teat') continue;
    let h: Hit | null = null;
    if (p.kind === 'sphere') h = raySphere(from, nd, p);
    else if (p.kind === 'ellipsoid') h = rayEllipsoid(from, nd, p);
    else h = rayCapsule(from, nd, p);
    if (h && h.t <= total && h.t >= 0) {
      // 排除"起点就在物体内部"的套杯目标乳头本身由 ignoreTeats 处理
      count++;
      if (!firstPrim) firstPrim = p;
    }
  }
  return { blocked: count > 0, count, prim: firstPrim };
}
