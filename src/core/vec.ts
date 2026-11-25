/** 三维向量，单位统一为米（UI 层负责 mm 换算） */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export const v3 = (x = 0, y = 0, z = 0): Vec3 => ({ x, y, z });

export const add = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
export const sub = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
export const scale = (a: Vec3, s: number): Vec3 => ({ x: a.x * s, y: a.y * s, z: a.z * s });
export const dot = (a: Vec3, b: Vec3): number => a.x * b.x + a.y * b.y + a.z * b.z;
export const cross = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});
export const len = (a: Vec3): number => Math.hypot(a.x, a.y, a.z);
export const dist = (a: Vec3, b: Vec3): number => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
export function norm(a: Vec3): Vec3 {
  const l = Math.hypot(a.x, a.y, a.z) || 1;
  return { x: a.x / l, y: a.y / l, z: a.z / l };
}
export const lerp = (a: Vec3, b: Vec3, t: number): Vec3 => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  z: a.z + (b.z - a.z) * t,
});

/** 绕轴旋转向量（轴角，弧度，Rodrigues） */
export function rotateAxisAngle(p: Vec3, axis: Vec3, ang: number): Vec3 {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  const d = dot(axis, p);
  const cr = cross(axis, p);
  return {
    x: p.x * c + cr.x * s + axis.x * d * (1 - c),
    y: p.y * c + cr.y * s + axis.y * d * (1 - c),
    z: p.z * c + cr.z * s + axis.z * d * (1 - c),
  };
}

/** 欧拉角（XYZ 顺序，弧度）旋转向量 */
export function rotateEuler(p: Vec3, rx: number, ry: number, rz: number): Vec3 {
  // X
  let y = p.y * Math.cos(rx) - p.z * Math.sin(rx);
  let z = p.y * Math.sin(rx) + p.z * Math.cos(rx);
  let x = p.x;
  // Y
  const x2 = x * Math.cos(ry) + z * Math.sin(ry);
  z = -x * Math.sin(ry) + z * Math.cos(ry);
  x = x2;
  // Z
  const y2 = y * Math.cos(rz) - x * Math.sin(rz);
  x = x * Math.cos(rz) + y * Math.sin(rz);
  y = y2;
  return { x, y, z };
}

export function clamp(x: number, lo: number, hi: number): number {
  return x < lo ? lo : x > hi ? hi : x;
}

export function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

/** 最近点：点 p 到线段 ab，返回 {t 0..1, q} */
export function closestOnSegment(p: Vec3, a: Vec3, b: Vec3): { t: number; q: Vec3 } {
  const ab = sub(b, a);
  const l2 = dot(ab, ab) || 1e-12;
  let t = dot(sub(p, a), ab) / l2;
  t = clamp01(t);
  return { t, q: { x: a.x + ab.x * t, y: a.y + ab.y * t, z: a.z + ab.z * t } };
}
