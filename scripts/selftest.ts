/* 核心算法自检：npx tsx scripts/selftest.ts */
import { generateHerd } from '../src/core/herd';
import { buildCowModel } from '../src/core/cowModel';
import { renderTofFrame, TOF_PRESETS, CLEAN_NOISE, DEFAULT_NOISE, canonicalPose } from '../src/core/tof';
import { recognizeTeats } from '../src/core/recognize';
import { digestArrays } from '../src/core/rng';
import type { CameraConfig } from '../src/core/types';

function cleanConfig(seed = 42): CameraConfig {
  const presetId = process.env.PRESET ?? 'pmd-qvga';
  return {
    preset: TOF_PRESETS.find((p) => p.id === presetId)!,
    pose: { position: { x: 0, y: 0.45, z: -0.72 }, pitchDeg: 18, yawDeg: 0, rollDeg: 0 },
    noise: CLEAN_NOISE,
    seed,
  };
}

function main() {
  const limit = Number(process.env.LIMIT ?? 0);
  const all = generateHerd(300);
  const cows = limit ? all.slice(0, limit) : all;
  console.log(`生成牛群 ${all.length} 头，本次检验 ${cows.length} 头，预设 ${process.env.PRESET ?? 'pmd-qvga'}`);

  let allTips = 0;
  let maxErr = 0;
  let worst = '';
  let sumErr = 0;
  const errList: number[] = [];
  let cows4 = 0;
  let totalFP = 0;
  let legFP = 0;
  let tailFP = 0;
  const fail4: string[] = [];
  let tRender = 0;
  let tReco = 0;

  for (const cow of cows) {
    if (cow.kind === 'heifer') continue;
    const model = buildCowModel(cow);
    const cfg = cleanConfig();
    cfg.pose = canonicalPose(model);
    let t = performance.now();
    const frame = renderTofFrame(model, cfg);
    tRender += performance.now() - t;
    t = performance.now();
    const reco = recognizeTeats(frame, model, undefined, { strict: true });
    tReco += performance.now() - t;

    if (reco.matchedCount === 4) cows4++;
    else fail4.push(`${cow.earTag}(${reco.matchedCount})`);
    totalFP += reco.falsePositives.length;
    legFP += reco.legFalseCount;
    tailFP += reco.tailFalseCount;
    for (let i = 0; i < 4; i++) {
      const e = reco.errorsMm[i];
      if (e !== null) {
        allTips++;
        sumErr += e;
        errList.push(e);
        if (e > maxErr) {
          maxErr = e;
          worst = `${cow.earTag} teat${i} ${e.toFixed(2)}mm`;
        }
      }
    }
  }

  const n = cows.filter((c) => c.kind === 'lactating').length;
  errList.sort((a, b) => a - b);
  const meanErr = sumErr / allTips;
  const p95 = errList[Math.floor(errList.length * 0.95)] ?? 0;
  const over3 = errList.filter((e) => e > 3).length;
  console.log(`泌乳牛 ${n}`);
  console.log(`四乳头全匹配: ${cows4}/${n}`);
  console.log(`未全匹配样例(前20): ${fail4.slice(0, 20).join(' ')}`);
  console.log(`认证尖点总数 ${allTips}（低置信视角由严格门拦截并重扫）`);
  console.log(`平均误差 ${meanErr.toFixed(3)} mm   P95 ${p95.toFixed(2)} mm`);
  console.log(`>3mm 尖点 ${over3}/${allTips}；最大 ${maxErr.toFixed(2)} mm  最差: ${worst}`);
  console.log(`误报总数 ${totalFP} (腿 ${legFP}, 尾 ${tailFP})`);
  console.log(`平均渲染 ${(tRender / n).toFixed(1)}ms, 识别 ${(tReco / n).toFixed(1)}ms`);
  const precisionPass = meanErr <= 3 && allTips > 0;
  console.log(`精度规格 平均误差≤3mm: ${precisionPass ? 'PASS ✅' : 'FAIL ❌'}（P95 ${p95.toFixed(2)}mm，尾部视角转重扫）`);
  if (!precisionPass) process.exitCode = 1;

  /* 确定性测试：同牛同种子跑两遍含噪帧 */
  const cow0 = cows[0];
  const m0 = buildCowModel(cow0);
  const noisy: CameraConfig = { ...cleanConfig(777), noise: DEFAULT_NOISE };
  noisy.pose = canonicalPose(m0);
  const f1 = renderTofFrame(m0, noisy);
  const r1 = recognizeTeats(f1, m0);
  const h1 = digestArrays([f1.depth, f1.ir]);
  const f2 = renderTofFrame(m0, noisy);
  const r2 = recognizeTeats(f2, m0);
  const h2 = digestArrays([f2.depth, f2.ir]);
  const tips1 = JSON.stringify(r1.tips.map((t) => [t.tip.x, t.tip.y, t.tip.z]));
  const tips2 = JSON.stringify(r2.tips.map((t) => [t.tip.x, t.tip.y, t.tip.z]));
  console.log(`确定性 帧哈希 ${h1} vs ${h2}: ${h1 === h2 ? 'PASS ✅' : 'FAIL ❌'}`);
  console.log(`确定性 识别结果: ${tips1 === tips2 ? 'PASS ✅' : 'FAIL ❌'}`);

  /* 不同种子应不同 */
  const noisyB: CameraConfig = { ...noisy, seed: 778 };
  const f3 = renderTofFrame(m0, noisyB);
  const h3 = digestArrays([f3.depth, f3.ir]);
  console.log(`种子区分度: ${h1 !== h3 ? 'PASS ✅' : 'FAIL ❌'}`);
}

main();
