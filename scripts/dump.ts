import { generateHerd } from '../src/core/herd';
import { buildCowModel } from '../src/core/cowModel';
import { renderTofFrame, TOF_PRESETS, CLEAN_NOISE, canonicalPose, cameraBasis, DEFAULT_NOISE } from '../src/core/tof';
import { recognizeTeats } from '../src/core/recognize';
import { writePng, depthColor, PART_COLORS } from './png';
import { sub } from '../src/core/vec';

const idx = Number(process.argv[2] ?? 0);
const noisy = process.argv[3] === 'noisy';
const cows = generateHerd(300);
const cow = cows[idx];
const model = buildCowModel(cow);
const preset = TOF_PRESETS.find((p) => p.id === 'pmd-qvga')!;
const pose = canonicalPose(model);
const cfg = { preset, pose, noise: noisy ? DEFAULT_NOISE : CLEAN_NOISE, seed: 42 };
const f = renderTofFrame(model, cfg);
const traces: any = { seeds: 0, accepted: 0, rejects: [] };
const reco = recognizeTeats(f, model, traces);
const W = f.width, H = f.height;
const basis = cameraBasis(pose, preset);

function proj(p: { x: number; y: number; z: number }): [number, number] {
  const q = sub(p, basis.eye);
  const zc = q.x * basis.forward.x + q.y * basis.forward.y + q.z * basis.forward.z;
  const xc = q.x * basis.right.x + q.y * basis.right.y + q.z * basis.right.z;
  const yc = q.x * basis.up.x + q.y * basis.up.y + q.z * basis.up.z;
  return [W / 2 + (xc / zc) * basis.fx, H / 2 - (yc / zc) * basis.fy];
}
function setPx(rgba: Uint8ClampedArray, x: number, y: number, c: [number, number, number]) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  rgba[i] = c[0]; rgba[i + 1] = c[1]; rgba[i + 2] = c[2]; rgba[i + 3] = 255;
}
function cross(rgba: Uint8ClampedArray, x: number, y: number, c: [number, number, number], r = 5) {
  for (let k = -r; k <= r; k++) { setPx(rgba, x + k, y, c); setPx(rgba, x, y + k, c); }
}

// depth
const depthRgba = new Uint8ClampedArray(W * H * 4);
const labelRgba = new Uint8ClampedArray(W * H * 4);
const irRgba = new Uint8ClampedArray(W * H * 4);
for (let i = 0; i < W * H; i++) {
  const dc = depthColor(f.cleanDepth[i]);
  depthRgba[i * 4] = dc[0]; depthRgba[i * 4 + 1] = dc[1]; depthRgba[i * 4 + 2] = dc[2]; depthRgba[i * 4 + 3] = 255;
  const pc = PART_COLORS[f.partId[i]] ?? [0, 0, 0];
  labelRgba[i * 4] = f.valid[i] || f.teatId[i] >= 0 ? pc[0] : 10;
  labelRgba[i * 4 + 1] = f.valid[i] || f.teatId[i] >= 0 ? pc[1] : 10;
  labelRgba[i * 4 + 2] = f.valid[i] || f.teatId[i] >= 0 ? pc[2] : 20;
  labelRgba[i * 4 + 3] = 255;
  const v = f.ir[i];
  irRgba[i * 4] = v; irRgba[i * 4 + 1] = v; irRgba[i * 4 + 2] = v; irRgba[i * 4 + 3] = 255;
}
// GT 绿圈，检测红叉 / FP 橙
for (const g of model.gtTips) { const [u, v] = proj(g); cross(depthRgba, u, v, [0, 255, 0], 6); cross(labelRgba, u, v, [0, 255, 0], 6); }
for (const d of reco.tips) {
  const [u, v] = proj(d.tip);
  const col: [number, number, number] = d.isFalsePositive ? [255, 160, 0] : [255, 40, 40];
  cross(depthRgba, u, v, col, 4); cross(labelRgba, u, v, col, 4);
}

writePng(`scripts/out/${idx}-depth.png`, W, H, depthRgba);
writePng(`scripts/out/${idx}-label.png`, W, H, labelRgba);
writePng(`scripts/out/${idx}-ir.png`, W, H, irRgba);
console.log(`cow ${cow.earTag} F=${cow.traits.udderFloorHeightMm} flags=${JSON.stringify(cow.flags)}`);
console.log(`detections ${reco.tips.length} matched ${reco.matchedCount} errors`, reco.errorsMm.map((e) => e?.toFixed(1) ?? '-').join(' '));
for (const d of reco.tips) console.log(`  r=${d.radiusMm.toFixed(1)} len=${d.lengthMm.toFixed(0)} px=${d.pixelCount} part=${d.truePart} fp=${d.isFalsePositive} err=${d.errorMm?.toFixed(2) ?? '-'}`);
console.log('--- trace ---', `seeds=${traces.seeds} accepted=${traces.accepted}`);
for (const r of traces.rejects) console.log(`  REJ ${r.reason} r=${r.r.toFixed(1)} len=${r.len.toFixed(0)} down=${r.down.toFixed(2)} pts=${r.pts}`);
