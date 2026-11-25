/// <reference lib="webworker" />
import { screenCow, tierFor } from '../core/screen';
import { evaluateTrial } from '../core/pipeline';
import { buildCowModel } from '../core/cowModel';
import { renderTofFrame, canonicalPose, TOF_PRESETS, CLEAN_NOISE, DEFAULT_NOISE } from '../core/tof';
import { recognizeTeats } from '../core/recognize';
import { digestArrays } from '../core/rng';
import type { AppSettings, CowRecord, CowScreenResult, HeatmapCell } from '../core/types';

const ctx = self as unknown as Worker;

interface ScreenMsg { type: 'screen'; cows: CowRecord[]; settings: AppSettings }
interface HeatMsg { type: 'heatmap'; cows: CowRecord[]; settings: AppSettings; sampleLimit?: number }
interface PrecisionMsg { type: 'precision'; cows: CowRecord[]; presetId?: string }
type Msg = ScreenMsg | HeatMsg | PrecisionMsg;

ctx.onmessage = (e: MessageEvent<Msg>) => {
  const msg = e.data;
  if (msg.type === 'screen') return runScreen(msg.cows, msg.settings);
  if (msg.type === 'heatmap') return runHeatmap(msg.cows, msg.settings, msg.sampleLimit);
  if (msg.type === 'precision') return runPrecision(msg.cows, msg.presetId ?? 'pmd-qvga');
};

function runScreen(cows: CowRecord[], settings: AppSettings) {
  const out: CowScreenResult[] = [];
  const milk = cows.filter((c) => c.kind !== 'heifer');
  milk.forEach((cow, i) => {
    out.push(screenCow(cow, settings));
    if (i % 3 === 0 || i === milk.length - 1) ctx.postMessage({ type: 'progress', job: 'screen', done: i + 1, total: milk.length });
  });
  ctx.postMessage({ type: 'screen-done', results: out });
}

function runHeatmap(cows: CowRecord[], settings: AppSettings, sampleLimit = 90) {
  const milkAll = cows.filter((c) => c.kind !== 'heifer');
  // 固定步长抽样，保证缺陷牛也按比例进入样本
  let milk = milkAll;
  if (sampleLimit && milkAll.length > sampleLimit) {
    const step = milkAll.length / sampleLimit;
    milk = Array.from({ length: sampleLimit }, (_, k) => milkAll[Math.floor(k * step)]);
  }
  const hs = settings.sweepHeights;
  const ps = settings.sweepPitches;
  const cells: HeatmapCell[] = [];
  let best = { h: hs[0], p: ps[0], v: -1 };
  let ci = 0;
  const total = hs.length * ps.length;
  for (let hi = 0; hi < hs.length; hi++) {
    for (let pi = 0; pi < ps.length; pi++) {
      let ok = 0;
      for (const cow of milk) {
        const model = buildCowModel(cow);
        const o = evaluateTrial(cow, model, {
          heightM: hs[hi], pitchDeg: ps[pi],
          seed: settings.defaultSeed + hi * 101 + pi * 7,
          cupTolMm: settings.cupToleranceMm,
        });
        if (o.success) ok++;
      }
      const herdSuccess = ok / milk.length;
      cells.push({ heightM: hs[hi], pitchDeg: ps[pi], herdSuccess, n: milk.length });
      if (herdSuccess > best.v) best = { h: hs[hi], p: ps[pi], v: herdSuccess };
      ci++;
      ctx.postMessage({ type: 'progress', job: 'heatmap', done: ci, total });
    }
  }
  ctx.postMessage({ type: 'heatmap-done', cells, best });
}

function runPrecision(cows: CowRecord[], presetId: string) {
  const preset = TOF_PRESETS.find((p) => p.id === presetId) ?? TOF_PRESETS[2];
  const milk = cows.filter((c) => c.kind !== 'heifer');
  let tips = 0, sum = 0, max = 0, cows4 = 0;
  const errArr: number[] = [];
  const worst: any[] = [];
  milk.forEach((cow, i) => {
    const model = buildCowModel(cow);
    const cfg = { preset, pose: canonicalPose(model), noise: CLEAN_NOISE, seed: 42 };
    const f = renderTofFrame(model, cfg);
    const r = recognizeTeats(f, model, undefined, { strict: true });
    if (r.matchedCount === 4) cows4++;
    r.tips.forEach((d) => {
      if (d.errorMm !== undefined) {
        tips++; sum += d.errorMm; errArr.push(d.errorMm);
        if (d.errorMm > max) max = d.errorMm;
        if (d.errorMm > 3) worst.push({ earTag: cow.earTag, teat: d.matchedTeat, e: +d.errorMm.toFixed(2) });
      }
    });
    if (i % 10 === 0) ctx.postMessage({ type: 'progress', job: 'precision', done: i + 1, total: milk.length });
  });
  errArr.sort((a, b) => a - b);
  const meanMm = tips ? sum / tips : 0;
  const p95Mm = errArr[Math.floor(errArr.length * 0.95)] ?? 0;
  const over3 = errArr.filter((e) => e > 3).length;

  // 确定性：同牛同种子两遍（含噪）
  const cow0 = milk[0];
  const m0 = buildCowModel(cow0);
  const noisy = { preset, pose: canonicalPose(m0), noise: DEFAULT_NOISE, seed: 777 };
  const a = renderTofFrame(m0, noisy);
  const ra = recognizeTeats(a, m0);
  const b = renderTofFrame(m0, noisy);
  const rb = recognizeTeats(b, m0);
  const hashSame = digestArrays([a.depth, a.ir]) === digestArrays([b.depth, b.ir]);
  const recoSame = JSON.stringify(ra.tips.map((t) => t.tip)) === JSON.stringify(rb.tips.map((t) => t.tip));

  ctx.postMessage({
    type: 'precision-done',
    stats: {
      cows: milk.length, tips, cows4,
      meanMm, p95Mm, maxMm: max, over3,
      pass: meanMm <= 3 && tips > 0, worst: worst.slice(0, 10),
      deterministic: hashSame && recoSame, hashSame, recoSame,
    },
  });
}

export { tierFor };
