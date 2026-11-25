import type { DepthFrame, DetectedTip, RecognitionResult, TeatIndex } from './types';
import type { CowModel } from './cowModel';
import { codePart } from './primitives';
import type { PartKind } from './types';
import type { Vec3 } from './vec';

interface Roi { minX: number; maxX: number; minY: number; maxY: number; minZ: number; maxZ: number }

export function defaultRoi(model: CowModel): Roi {
  const uc = model.udderCenter;
  const F = model.cow.traits.udderFloorHeightMm / 1000;
  return { minX: uc.x - 0.34, maxX: uc.x + 0.34, minY: 0.1, maxY: F + 0.3, minZ: -0.46, maxZ: 0.38 };
}

interface CloudPoint { x: number; y: number; z: number; px: number }

function pca(pts: CloudPoint[], c: Vec3): Vec3 {
  let sxx = 0, syy = 0, szz = 0, sxy = 0, sxz = 0, syz = 0;
  for (const p of pts) {
    const x = p.x - c.x, y = p.y - c.y, z = p.z - c.z;
    sxx += x * x; syy += y * y; szz += z * z; sxy += x * y; sxz += x * z; syz += y * z;
  }
  let v = { x: 0, y: 1, z: 0 };
  for (let it = 0; it < 40; it++) {
    const nx = sxx * v.x + sxy * v.y + sxz * v.z;
    const ny = sxy * v.x + syy * v.y + syz * v.z;
    const nz = sxz * v.x + syz * v.y + szz * v.z;
    const l = Math.hypot(nx, ny, nz) || 1;
    v = { x: nx / l, y: ny / l, z: nz / l };
  }
  return v;
}

function centroid(pts: CloudPoint[]): Vec3 {
  let x = 0, y = 0, z = 0;
  for (const p of pts) { x += p.x; y += p.y; z += p.z; }
  return { x: x / pts.length, y: y / pts.length, z: z / pts.length };
}

/** Huber IRLS 稳健主轴：压低垂直残差大的污染点（乳房外展/合并组织） */
function robustAxis(pts: CloudPoint[], initial: Vec3): Vec3 {
  let a = initial;
  let w = new Float64Array(pts.length).fill(1);
  for (let it = 0; it < 4; it++) {
    let ws = 0, cx = 0, cy = 0, cz = 0;
    for (let i = 0; i < pts.length; i++) { ws += w[i]; cx += pts[i].x * w[i]; cy += pts[i].y * w[i]; cz += pts[i].z * w[i]; }
    if (ws <= 0) break;
    const C = { x: cx / ws, y: cy / ws, z: cz / ws };
    let sxx = 0, syy = 0, szz = 0, sxy = 0, sxz = 0, syz = 0;
    const res: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const dx = p.x - C.x, dy = p.y - C.y, dz = p.z - C.z;
      const q = dx * a.x + dy * a.y + dz * a.z;
      const per = Math.hypot(dx - a.x * q, dy - a.y * q, dz - a.z * q);
      res.push(per);
      const wi = w[i];
      sxx += wi * dx * dx; syy += wi * dy * dy; szz += wi * dz * dz;
      sxy += wi * dx * dy; sxz += wi * dx * dz; syz += wi * dy * dz;
    }
    // 加权协方差幂迭代
    let v = { ...a };
    for (let k = 0; k < 30; k++) {
      const nx = sxx * v.x + sxy * v.y + sxz * v.z;
      const ny = sxy * v.x + syy * v.y + syz * v.z;
      const nz = sxz * v.x + syz * v.y + szz * v.z;
      const l = Math.hypot(nx, ny, nz) || 1;
      v = { x: nx / l, y: ny / l, z: nz / l };
    }
    a = v.y < 0 ? { x: -v.x, y: -v.y, z: -v.z } : v;
    const sorted = [...res].sort((x, y) => x - y);
    const sig = 1.4826 * (sorted[sorted.length >> 1] || 0.01) + 1e-4;
    w = new Float64Array(pts.length);
    for (let i = 0; i < pts.length; i++) {
      const rr = res[i] / sig;
      w[i] = rr <= 1.345 ? 1 : 1.345 / Math.max(rr, 1e-3);
    }
  }
  return a;
}

function perpDist(p: CloudPoint, C: Vec3, a: Vec3): { q: number; per: number } {
  const dx = p.x - C.x, dy = p.y - C.y, dz = p.z - C.z;
  const q = dx * a.x + dy * a.y + dz * a.z;
  return { q, per: Math.hypot(dx - a.x * q, dy - a.y * q, dz - a.z * q) };
}

interface SphereFit { c: Vec3; r: number; rmsMm: number }

function fitSphereGN(points: CloudPoint[]): SphereFit | null {
  const n = points.length;
  if (n < 8) return null;
  const M = new Float64Array(16), rhs = new Float64Array(4);
  for (const p of points) {
    const row = [2 * p.x, 2 * p.y, 2 * p.z, 1];
    const b = p.x * p.x + p.y * p.y + p.z * p.z;
    for (let a = 0; a < 4; a++) {
      rhs[a] += row[a] * b;
      for (let c = 0; c < 4; c++) M[a * 4 + c] += row[a] * row[c];
    }
  }
  const A = Array.from(M), bv = Array.from(rhs);
  for (let i = 0; i < 4; i++) {
    let piv = i;
    for (let k = i + 1; k < 4; k++) if (Math.abs(A[k * 4 + i]) > Math.abs(A[piv * 4 + i])) piv = k;
    if (Math.abs(A[piv * 4 + i]) < 1e-9) return null;
    for (let c = 0; c < 4; c++) { const t = A[i * 4 + c]; A[i * 4 + c] = A[piv * 4 + c]; A[piv * 4 + c] = t; }
    { const t = bv[i]; bv[i] = bv[piv]; bv[piv] = t; }
    for (let k = i + 1; k < 4; k++) {
      const f = A[k * 4 + i] / A[i * 4 + i];
      for (let c = i; c < 4; c++) A[k * 4 + c] -= f * A[i * 4 + c];
      bv[k] -= f * bv[i];
    }
  }
  const sol = [0, 0, 0, 0];
  for (let i = 3; i >= 0; i--) {
    let s = bv[i];
    for (let c = i + 1; c < 4; c++) s -= A[i * 4 + c] * sol[c];
    sol[i] = s / A[i * 4 + i];
  }
  let C: Vec3 = { x: sol[0], y: sol[1], z: sol[2] };
  const r2 = sol[3] + C.x * C.x + C.y * C.y + C.z * C.z;
  if (!(r2 > 1e-8)) return null;
  let r = Math.sqrt(r2);
  if (r < 0.003 || r > 0.026) return null;
  for (let it = 0; it < 5; it++) {
    const JTJ = new Float64Array(16), JTr = new Float64Array(4);
    for (const p of points) {
      const dx = p.x - C.x, dy = p.y - C.y, dz = p.z - C.z;
      const d = Math.hypot(dx, dy, dz) || 1e-6;
      const res = d - r;
      const J = [-dx / d, -dy / d, -dz / d, -1];
      for (let a = 0; a < 4; a++) {
        JTr[a] += J[a] * res;
        for (let c = 0; c < 4; c++) JTJ[a * 4 + c] += J[a] * J[c];
      }
    }
    const MM = Array.from(JTJ), rr = Array.from(JTr);
    let sing = false;
    for (let i = 0; i < 4; i++) {
      let piv = i;
      for (let k = i + 1; k < 4; k++) if (Math.abs(MM[k * 4 + i]) > Math.abs(MM[piv * 4 + i])) piv = k;
      if (Math.abs(MM[piv * 4 + i]) < 1e-10) { sing = true; break; }
      for (let c = 0; c < 4; c++) { const t = MM[i * 4 + c]; MM[i * 4 + c] = MM[piv * 4 + c]; MM[piv * 4 + c] = t; }
      { const t = rr[i]; rr[i] = rr[piv]; rr[piv] = t; }
      for (let k = i + 1; k < 4; k++) {
        const f = MM[k * 4 + i] / MM[i * 4 + i];
        for (let c = i; c < 4; c++) MM[k * 4 + c] -= f * MM[i * 4 + c];
        rr[k] -= f * rr[i];
      }
    }
    if (sing) break;
    const delta = [0, 0, 0, 0];
    for (let i = 3; i >= 0; i--) {
      let s = rr[i];
      for (let c = i + 1; c < 4; c++) s -= MM[i * 4 + c] * delta[c];
      delta[i] = s / MM[i * 4 + i];
    }
    C = { x: C.x - delta[0], y: C.y - delta[1], z: C.z - delta[2] };
    r -= delta[3];
  }
  let se = 0;
  for (const p of points) { const d = Math.hypot(p.x - C.x, p.y - C.y, p.z - C.z); se += (d - r) ** 2; }
  return { c: C, r, rmsMm: Math.sqrt(se / n) * 1000 };
}

interface Seed { x: number; y: number; z: number; score: number }
export interface RecoTrace { seeds: number; accepted: number; rejects: { reason: string; r: number; len: number; down: number; pts: number }[]; seedPts?: { x: number; y: number; z: number }[] }

export function recognizeTeats(
  frame: DepthFrame,
  model: CowModel,
  traceOut?: RecoTrace,
  opts?: { strict?: boolean },
): RecognitionResult {
  const strict = opts?.strict ?? false;
  const t0 = performance.now();
  const roi = defaultRoi(model);
  const F = model.cow.traits.udderFloorHeightMm / 1000;
  const { width: W, height: H, points: P, valid } = frame;

  const cloud: CloudPoint[] = [];
  for (let idx = 0; idx < W * H; idx++) {
    if (!valid[idx]) continue;
    const x = P[idx * 3], y = P[idx * 3 + 1], z = P[idx * 3 + 2];
    if (y < roi.minY || y > roi.maxY || x < roi.minX || x > roi.maxX || z < roi.minZ || z > roi.maxZ) continue;
    cloud.push({ x, y, z, px: idx });
  }

  /* XZ 最低包络 + 最大值滤波基准 */
  const CS = 0.005;
  const gx0 = Math.floor(roi.minX / CS), gz0 = Math.floor(roi.minZ / CS);
  const nx = Math.ceil((roi.maxX - roi.minX) / CS) + 2;
  const nz = Math.ceil((roi.maxZ - roi.minZ) / CS) + 2;
  const dim = nx * nz;
  const minY = new Float32Array(dim).fill(Infinity);
  const lowPt = new Int32Array(dim).fill(-1);
  cloud.forEach((p, ci) => {
    const ix = Math.floor(p.x / CS) - gx0, iz = Math.floor(p.z / CS) - gz0;
    if (ix < 0 || ix >= nx || iz < 0 || iz >= nz) return;
    const d = ix * nz + iz;
    if (p.y < minY[d]) { minY[d] = p.y; lowPt[d] = ci; }
  });
  const WR = 7;
  const tmp = new Float32Array(dim).fill(-Infinity);
  const baseline = new Float32Array(dim).fill(-Infinity);
  for (let ix = 0; ix < nx; ix++) for (let iz = 0; iz < nz; iz++) {
    let m = -Infinity;
    for (let k = -WR; k <= WR; k++) { const jz = iz + k; if (jz < 0 || jz >= nz) continue; const v = minY[ix * nz + jz]; if (Number.isFinite(v) && v > m) m = v; }
    tmp[ix * nz + iz] = m;
  }
  for (let ix = 0; ix < nx; ix++) for (let iz = 0; iz < nz; iz++) {
    let m = -Infinity;
    for (let k = -WR; k <= WR; k++) { const jx = ix + k; if (jx < 0 || jx >= nx) continue; const v = tmp[jx * nz + iz]; if (Number.isFinite(v) && v > m) m = v; }
    baseline[ix * nz + iz] = m;
  }

  /* 种子：乳头尖高度带 + 中央 x 带内的局部最低/突出；该粗先验来自乳房定位，不含尖坐标 */
  const MR = 3;
  const rawSeeds: Seed[] = [];
  const xCenter = model.udderCenter.x;
  for (let ix = MR; ix < nx - MR; ix++) for (let iz = MR; iz < nz - MR; iz++) {
    const d = ix * nz + iz, h = minY[d];
    if (!isFinite(h) || lowPt[d] < 0) continue;
    // 乳头尖可能的高度/横向带（排除身体两侧、飞节、地面）
    if (h < F - 0.13 || h > F + 0.05) continue;
    const ci0 = lowPt[d];
    if (Math.abs(cloud[ci0].x - xCenter) > 0.135) continue;
    let isMin = true;
    for (let ax = -MR; ax <= MR && isMin; ax++) for (let az = -MR; az <= MR; az++) {
      if (!ax && !az) continue;
      const h2 = minY[(ix + ax) * nz + iz + az];
      if (isFinite(h2) && h2 < h - 1e-6) { isMin = false; break; }
    }
    if (!isMin) continue;
    const prom = isFinite(baseline[d]) ? baseline[d] - h : 0;
    if (prom > 0.008) {
      rawSeeds.push({ x: cloud[ci0].x, y: h, z: cloud[ci0].z, score: prom });
    }
  }
  rawSeeds.sort((a, b) => b.score - a.score || a.x - b.x || a.z - b.z);
  const seeds: Seed[] = [];
  for (const s of rawSeeds) {
    if (seeds.every((o) => Math.hypot(o.x - s.x, o.z - s.z) > 0.02)) seeds.push(s);
    if (seeds.length >= 10) break;
  }

  const detections: DetectedTip[] = [];
  const rejects: RecoTrace['rejects'] = [];

  for (const seed of seeds) {
    let T: Vec3 = { x: seed.x, y: seed.y, z: seed.z };
    let up: Vec3 = { x: 0, y: 1, z: 0 };
    let rad = 0.011;
    let members: CloudPoint[] = [];

    /* 1) 圆柱迭代生长 */
    for (let iter = 0; iter < 3; iter++) {
      members = [];
      const Cg = T;
      for (const p of cloud) {
        const { q, per } = perpDist(p, Cg, up);
        if (q < -0.012 || q > 0.058) continue;
        if (per < rad + 0.005) members.push(p);
      }
      if (members.length < 14) break;
      const ax = pca(members, centroid(members));
      if (ax.y < 0) { ax.x = -ax.x; ax.y = -ax.y; ax.z = -ax.z; }
      up = ax;
      const rr = members.map((p) => perpDist(p, T, up).per).sort((a, b) => a - b);
      rad = rr[rr.length >> 1] ?? rad;
      const down = { x: -up.x, y: -up.y, z: -up.z };
      const top = members.map((p) => ({ p, q: p.x * down.x + p.y * down.y + p.z * down.z })).sort((a, b) => b.q - a.q);
      const K = Math.min(5, Math.max(3, (members.length / 16) | 0));
      let tx = 0, ty = 0, tz = 0;
      for (let k = 0; k < K; k++) { tx += top[k].p.x; ty += top[k].p.y; tz += top[k].p.z; }
      T = { x: tx / K, y: ty / K, z: tz / K };
    }
    if (members.length < 16) { rejects.push({ reason: 'fewPts', r: rad * 1000, len: 0, down: up.y, pts: members.length }); continue; }

    /* 2) PCA + 垂直距外点剔除，稳定轴 */
    let axisBefore: Vec3 = up;
    for (let it = 0; it < 2; it++) {
      const C0 = centroid(members);
      const a0 = pca(members, C0);
      if (a0.y > 0.3) up = a0;
      const ds = members.map((p) => perpDist(p, C0, up).per).sort((a, b) => a - b);
      const med = ds[ds.length >> 1];
      const kept = members.filter((p) => perpDist(p, C0, up).per < med + 0.004);
      if (kept.length >= 16) members = kept;
      if (it === 0) axisBefore = up;
    }

    /* 3) 轴向半径剖面截断乳房外展/合并组织 */
    const Cp = centroid(members);
    const prof = new Map<number, number[]>();
    for (const p of members) {
      const { q, per } = perpDist(p, Cp, up);
      const bin = Math.round(q / 0.005);
      if (!prof.has(bin)) prof.set(bin, []);
      prof.get(bin)!.push(per);
    }
    const coreR: number[] = [];
    prof.forEach((arr, bin) => { if (bin >= 1 && bin <= 6) { arr.sort((a, b) => a - b); coreR.push(arr[arr.length >> 1]); } });
    coreR.sort((a, b) => a - b);
    const rCore = coreR.length ? coreR[coreR.length >> 1] : rad;
    let qTopBin = 14; // 默认 70mm
    let flare = 0;
    for (let bin = 0; bin <= 15; bin++) {
      const arr = prof.get(bin);
      if (!arr || arr.length < 3) continue;
      arr.sort((a, b) => a - b);
      const rm = arr[arr.length >> 1];
      if (rm > rCore * 1.5) { flare++; if (flare >= 2) { qTopBin = bin; break; } } else flare = 0;
    }
    const qTop = qTopBin * 0.005;
    const beforeN = members.length;
    members = members.filter((p) => perpDist(p, Cp, up).q < qTop + 0.004);
    void beforeN;

    /* 4) 截断后用轴中段重估轴，并检查轴稳定性 */
    let axisRatio = 1;
    const shaft = members.filter((p) => { const q = perpDist(p, T, up).q; return q > 0.006 && q < Math.max(0.02, qTop - 0.006); });
    if (shaft.length >= 12) {
      const a2 = robustAxis(shaft, pca(shaft, centroid(shaft)));
      if (a2.y > 0.4) up = a2;
    }
    const axisShift = Math.acos(Math.min(1, Math.abs(axisBefore.x * up.x + axisBefore.y * up.y + axisBefore.z * up.z))) * 180 / Math.PI;
    {
      const C1 = centroid(members);
      let par = 0, per = 0;
      for (const p of members) { const { q } = perpDist(p, C1, up); const dx = p.x - C1.x, dy = p.y - C1.y, dz = p.z - C1.z; par += q * q; per += dx * dx + dy * dy + dz * dz - q * q; }
      axisRatio = par / Math.max(1e-9, per / 2);
    }

    // 正常乳头轴近似竖直：仅用很轻的竖直先验抑制单侧可视导致的 PCA 抖动
    const rawDown = { x: -up.x, y: -up.y, z: -up.z };
    if (strict) {
      const wV = 0.22;
      const bx = up.x * (1 - wV), by = up.y * (1 - wV) + wV, bz = up.z * (1 - wV);
      const bl = Math.hypot(bx, by, bz) || 1;
      up = { x: bx / bl, y: by / bl, z: bz / bl };
    }

    const down = { x: -up.x, y: -up.y, z: -up.z };
    const top = members.map((p) => ({ p, q: p.x * down.x + p.y * down.y + p.z * down.z })).sort((a, b) => b.q - a.q);
    const K = Math.min(5, Math.max(3, (members.length / 16) | 0));
    let tx = 0, ty = 0, tz = 0;
    for (let k = 0; k < K; k++) { tx += top[k].p.x; ty += top[k].p.y; tz += top[k].p.z; }
    T = { x: tx / K + down.x * 0.0008, y: ty / K + down.y * 0.0008, z: tz / K + down.z * 0.0008 };

    let qmin = Infinity, qmax = -Infinity;
    for (const p of members) { const q = perpDist(p, T, up).q; if (q < qmin) qmin = q; if (q > qmax) qmax = q; }
    const lenMm = (qmax - qmin + rad * 2) * 1000;

    /* 球拟合精修 */
    const capPts = members.filter((p) => { const q = perpDist(p, T, down as Vec3).q; return q > -Math.max(0.015, rCore * 1.5); });
    const sphere = fitSphereGN(capPts.length >= 10 ? capPts : members);
    let tip = T;
    let radiusMm = rCore * 1000;
    let consistency = 99, cover = 0;
    if (sphere) {
      radiusMm = sphere.r * 1000;
      const tipS = { x: sphere.c.x + down.x * sphere.r, y: sphere.c.y + down.y * sphere.r, z: sphere.c.z + down.z * sphere.r };
      consistency = Math.hypot(tipS.x - T.x, tipS.y - T.y, tipS.z - T.z) * 1000;
      for (const p of capPts) {
        const dx = (p.x - sphere.c.x) / sphere.r, dy = (p.y - sphere.c.y) / sphere.r, dz = (p.z - sphere.c.z) / sphere.r;
        const co = dx * down.x + dy * down.y + dz * down.z;
        if (co > cover) cover = co;
      }
      if (consistency < 2.6) tip = tipS;
    }
    let dNear = Infinity;
    for (const p of members) { const dd = Math.hypot(p.x - tip.x, p.y - tip.y, p.z - tip.z); if (dd < dNear) dNear = dd; }
    const dNearMm = dNear * 1000;
    // 拟合轴尖点 vs 世界垂直尖点
    let downDiffMm = 0;
    if (sphere) {
      const ta = { x: sphere.c.x + rawDown.x * sphere.r, y: sphere.c.y + rawDown.y * sphere.r, z: sphere.c.z + rawDown.z * sphere.r };
      const td = { x: sphere.c.x, y: sphere.c.y - sphere.r, z: sphere.c.z };
      downDiffMm = Math.hypot(ta.x - td.x, ta.y - td.y, ta.z - td.z) * 1000;
    }
    const tiltDeg = (Math.acos(Math.min(1, up.y)) * 180) / Math.PI;
    // 融合前后尖点位移：轴越不稳越大
    const refR = sphere?.r ?? rad;
    const blendShiftMm = Math.hypot(rawDown.x - down.x, rawDown.y - down.y, rawDown.z - down.z) * refR * 1000;

    /* 宽度/双峰：90 分位垂直距 vs 中位 */
    const perAll = members.map((p) => perpDist(p, centroid(members), up).per).sort((a, b) => a - b);
    const p90 = perAll[Math.floor(perAll.length * 0.9)] ?? rad;
    const widthRatio = p90 / Math.max(rad, 1e-6);

    // 掠射角：相机视线与乳头轴一致度，过低=尖在轮廓边缘，严格模式弃权
    const evx = frame.eye.x - tip.x, evy = frame.eye.y - tip.y, evz = frame.eye.z - tip.z;
    const evl = Math.hypot(evx, evy, evz) || 1;
    const headOn = down.x * (evx / evl) + down.y * (evy / evl) + down.z * (evz / evl);

    /* ---------- 质量门：不可信就弃权（触发重扫） ----------
       strict（无噪声精度验证）下用紧门限，保证报出的尖点 ≤3mm；
       含噪批量用宽门限，靠后续容错完成套杯。 */
    const reject = (reason: string) => rejects.push({ reason, r: radiusMm, len: lenMm, down: up.y, pts: members.length });
    const tiltGate = strict ? 0.9 : 0.6;
    const ratioGate = strict ? 3.2 : 2.6;
    const shiftGate = strict ? 9 : 14;
    const consGate = strict ? 1.7 : 3.2;
    const rmsGate = strict ? 0.8 : 1.6;
    const nearGate = strict ? 1.8 : 2.4;
    const widthGate = strict ? 1.9 : 2.1;
    if (radiusMm < 4 || radiusMm > (strict ? 16.5 : 19)) { reject('radius'); continue; }
    if (up.y < tiltGate) { reject('axis'); continue; }
    if (lenMm < 15) { reject('len'); continue; }
    const maxMembers = Math.round(900 * Math.max(0.25, (W * H) / (320 * 240)));
    if (members.length < (strict ? 30 : 22) || members.length > maxMembers) { reject('pts'); continue; }
    if (axisRatio < ratioGate) { reject('ratio'); continue; }
    if (axisShift > shiftGate) { reject('axisShift'); continue; }
    if (consistency > consGate) { reject('cons'); continue; }
    if (sphere && sphere.rmsMm > rmsGate) { reject('rms'); continue; }
    if (strict && !sphere) { reject('noSphere'); continue; }
    if (dNearMm > nearGate) { reject('near'); continue; }
    if (cover < (strict ? 0.7 : 0.55)) { reject('cover'); continue; }
    if (widthRatio > widthGate) { reject('width'); continue; }
    if (strict && downDiffMm > 2.8) { reject('downDiff'); continue; }
    if (strict && blendShiftMm > 1.7) { reject('blendShift'); continue; }
    const rawTiltDeg = (Math.acos(Math.min(1, Math.max(-1, -rawDown.y))) * 180) / Math.PI;
    // 折半稳定性：cap 点奇偶分半各拟合球，尖点分歧大=极区不可观，严格模式弃权
    let halfSplitMm = 0;
    if (strict && sphere && capPts.length >= 16) {
      const aPts = capPts.filter((_, i) => i % 2 === 0);
      const bPts = capPts.filter((_, i) => i % 2 === 1);
      const sa = fitSphereGN(aPts), sb = fitSphereGN(bPts);
      if (sa && sb) {
        const ta = { x: sa.c.x + down.x * sa.r, y: sa.c.y + down.y * sa.r, z: sa.c.z + down.z * sa.r };
        const tb = { x: sb.c.x + down.x * sb.r, y: sb.c.y + down.y * sb.r, z: sb.c.z + down.z * sb.r };
        halfSplitMm = Math.hypot(ta.x - tb.x, ta.y - tb.y, ta.z - tb.z) * 1000;
      }
    }
    if (strict && halfSplitMm > 1.0) { reject('split'); continue; }
    // 球半径与圆柱中位半径明显不符=小弧冠退化拟合，严格模式弃权
    if (strict && sphere && Math.abs(sphere.r - rad) * 1000 > 2.4) { reject('rFit'); continue; }
    if (strict && rawTiltDeg > 22) { reject('tilt'); continue; }
    if (strict && headOn < 0.3) { reject('grazing'); continue; }

    /* 真值部件投票（仅标注） */
    const votes = new Map<number, number>();
    for (const p of members) { const c = frame.partId[p.px]; votes.set(c, (votes.get(c) ?? 0) + 1); }
    let bestCode = 1, bestVotes = -1;
    votes.forEach((v, c) => { if (v > bestVotes) { bestVotes = v; bestCode = c; } });

    const xs = members.map((p) => p.x), ys = members.map((p) => p.y);
    const zs = members.map((p) => p.z);
    detections.push({
      tip, centroid: centroid(members), axis: down,
      radiusMm, lengthMm: lenMm, pixelCount: members.length,
      bbox: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)],
      truePart: codePart(bestCode) as PartKind,
      fitRmsMm: sphere?.rmsMm ?? -1, consMm: consistency,
      diag: { axisRatio, dNearMm, cover, downDiffMm, tiltDeg },
      isFalsePositive: false,
    });
  }

  /* 尖端去重 */
  const dedup: DetectedTip[] = [];
  for (const d of [...detections].sort((a, b) => b.pixelCount - a.pixelCount)) {
    if (!dedup.some((o) => Math.hypot(o.tip.x - d.tip.x, o.tip.y - d.tip.y, o.tip.z - d.tip.z) < 0.012)) dedup.push(d);
  }
  detections.length = 0;
  detections.push(...dedup);

  /* 与真值匹配 */
  const gt = model.gtTips;
  const pairs: { d: number; di: number; ti: number }[] = [];
  detections.forEach((det, di) => gt.forEach((g, ti) => pairs.push({ d: Math.hypot(det.tip.x - g.x, det.tip.y - g.y, det.tip.z - g.z), di, ti })));
  pairs.sort((a, b) => a.d - b.d);
  const usedD = new Set<number>(), usedT = new Set<number>();
  const errorsMm: (number | null)[] = [null, null, null, null];
  for (const pa of pairs) {
    if (usedD.has(pa.di) || usedT.has(pa.ti) || pa.d > 0.03) continue;
    usedD.add(pa.di); usedT.add(pa.ti);
    const det = detections[pa.di];
    det.matchedTeat = pa.ti as TeatIndex;
    det.errorMm = pa.d * 1000;
    errorsMm[pa.ti] = det.errorMm;
  }
  const fps: DetectedTip[] = [];
  let legFalseCount = 0, tailFalseCount = 0;
  for (let di = 0; di < detections.length; di++) {
    const det = detections[di];
    if (!usedD.has(di)) {
      det.isFalsePositive = true; fps.push(det);
      if (det.truePart === 'tail') tailFalseCount++;
      if (det.truePart === 'legL' || det.truePart === 'legR' || det.truePart === 'hoof') legFalseCount++;
    }
  }
  if (traceOut) { traceOut.seeds = seeds.length; traceOut.accepted = detections.length; traceOut.rejects = rejects; traceOut.seedPts = seeds.map((s) => ({ x: s.x, y: s.y, z: s.z })); }

  return {
    tips: detections, groundTruthTips: gt, errorsMm, matchedCount: usedT.size,
    falsePositives: fps, legFalseCount, tailFalseCount, elapsedMs: performance.now() - t0,
  };
}
