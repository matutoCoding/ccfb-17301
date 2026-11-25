import { buildCowModel } from './cowModel';
import { evaluateTrial } from './pipeline';
import { Rng, hash32 } from './rng';
import type {
  AppSettings, CowRecord, CowScreenResult, HeiferPrediction, ParityProjection, Tier,
} from './types';

export const DEFAULT_SETTINGS: AppSettings = {
  defaultPresetId: 'pmd-qvga',
  defaultNoise: {
    enabled: true,
    depthNoiseScale: 1,
    falloffScale: 1,
    flyingPixels: true,
    multipath: true,
    wetSaturation: true,
    multipathBiasM: 0.018,
  },
  defaultSeed: 20261126,
  robotThreshold: 0.8,
  watchThreshold: 0.45,
  cupToleranceMm: 14,
  trialsPerCow: 10,
  sweepHeights: [0.3, 0.38, 0.46, 0.54, 0.62],
  sweepPitches: [10, 20, 30, 40, 50],
  sweepWidth: 160,
  sweepHeightPx: 120,
};

export function tierFor(rate: number, s: AppSettings): Tier {
  if (rate >= s.robotThreshold) return 'robot';
  if (rate >= s.watchThreshold) return 'watch';
  return 'parlor';
}

export const TIER_LABEL: Record<Tier, string> = {
  robot: '能进机器人',
  watch: '要盯着',
  parlor: '只能去挤奶厅',
};

/** 对一头牛在指定安装位置跑 K 个随机试验，得到成功率与失败原因 */
export function screenCow(
  cow: CowRecord,
  s: AppSettings,
  mount?: { heightM: number; pitchDeg: number },
  trials?: number,
): CowScreenResult {
  const model = buildCowModel(cow);
  const K = trials ?? s.trialsPerCow;
  const h = mount?.heightM ?? 0.46;
  const p = mount?.pitchDeg ?? 30;
  let successes = 0;
  let errSum = 0;
  let errN = 0;
  let matchedSum = 0;
  const reasons = new Map<string, number>();
  let bestErr: number | null = null;

  for (let k = 0; k < K; k++) {
    const seed = s.defaultSeed + k * 7919;
    const out = evaluateTrial(cow, model, {
      heightM: h + ((hash32(cow.id + 'h' + k) % 7) - 3) * 0.008,
      pitchDeg: p + ((hash32(cow.id + 'p' + k) % 9) - 4) * 1.2,
      seed,
      cupTolMm: s.cupToleranceMm,
    });
    if (out.success) successes++;
    if (out.maxErrorMm > 0) { errSum += out.maxErrorMm; errN++; bestErr = bestErr === null ? out.maxErrorMm : Math.min(bestErr, out.maxErrorMm); }
    matchedSum += out.matchedCount;
    if (out.matchedCount < 4) reasons.set('乳头识别不全', (reasons.get('乳头识别不全') ?? 0) + 1);
    if (out.blocked > 0) reasons.set('后腿/尾巴遮挡套杯路径', (reasons.get('后腿/尾巴遮挡套杯路径') ?? 0) + 1);
    if (out.legFp > 0) reasons.set('后腿误识为乳头', (reasons.get('后腿误识为乳头') ?? 0) + out.legFp);
    if (out.tailFp > 0) reasons.set('尾巴误识为乳头', (reasons.get('尾巴误识为乳头') ?? 0) + out.tailFp);
    if (cow.flags.crossedRearTeats) reasons.set('后乳头交叉', (reasons.get('后乳头交叉') ?? 0) + 1);
    if (cow.flags.veryShortTeats) reasons.set('乳头过短', (reasons.get('乳头过短') ?? 0) + 1);
    if (cow.flags.nearGroundUdder) reasons.set('乳房过低', (reasons.get('乳房过低') ?? 0) + 1);
  }
  const successRate = successes / K;
  const failureReasons = [...reasons.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([r]) => r);
  return {
    cowId: cow.id,
    earTag: cow.earTag,
    tier: tierFor(successRate, s),
    successRate,
    trials: K,
    bestTipErrorMm: bestErr,
    matchedTeats: Math.round(matchedSum / K),
    failureReasons,
    bestHeightM: h,
    bestPitchDeg: p,
  };
}

/** 后备牛：由体型预测头胎产犊后乳房底高与下垂量，再做仿真评估 */
export function predictHeifer(cow: CowRecord, s: AppSettings): HeiferPrediction {
  const b = cow.heiferBody!;
  // 透明的线性体型模型
  let floor =
    610 +
    (b.statureCm - 140) * 4.2 +
    (b.rumpHeightCm - 145) * 2.4 -
    (b.bodyDepthCm - 85) * 3.1 -
    Math.abs(b.rumpAngleScore - 5) * 7 -
    (b.rumpWidthCm - 50) * 1.6;
  // 头胎产犊后乳房进一步发育下沉
  floor -= 70;
  floor = Math.max(300, Math.min(680, floor));
  const sagMm = Math.round(660 - floor);

  // 构造预测牛只做 6 次试验
  const predicted: CowRecord = {
    ...cow,
    kind: 'lactating',
    parity: 1,
    dim: 60,
    traits: {
      ...cow.traits,
      udderFloorHeightMm: Math.round(floor),
      udderDepthScore: Math.round(Math.min(9, Math.max(1, 1 + (680 - floor) / 45))),
      rearTeatSpreadMm: 78,
      teatLengthMm: 48,
    },
  };
  const r = screenCow(predicted, s, { heightM: Math.max(0.3, floor / 1000 - 0.1), pitchDeg: 32 }, 6);
  const rationale = `体高 ${b.statureCm}cm、体深 ${b.bodyDepthCm}cm、尻角 ${b.rumpAngleScore} 分 → 预测头胎后乳房底高约 ${Math.round(floor)}mm（下垂 ${sagMm}mm），仿真成功率 ${(r.successRate * 100).toFixed(0)}%`;
  return {
    cowId: cow.id,
    earTag: cow.earTag,
    predictedFloorMm: Math.round(floor),
    predictedTier: r.tier,
    predictedSuccessRate: r.successRate,
    sagMm,
    rationale,
  };
}

/** 胎次推移：生成后续 3 个胎次的投影并逐档评估 */
export function projectParities(cow: CowRecord, s: AppSettings): ParityProjection {
  const rows: ParityProjection['rows'] = [];
  const baseParity = Math.max(1, cow.parity);
  let firstUnsuitable: number | null = null;
  for (let step = 0; step <= 3; step++) {
    const parity = baseParity + step;
    // 每胎下垂递增，经产更明显
    const drop = step === 0 ? 0 : [0, 34, 46, 58][step] + (parity - 3) * 8;
    const floorMm = Math.max(180, cow.traits.udderFloorHeightMm - drop);
    const projected: CowRecord = {
      ...cow,
      parity,
      traits: {
        ...cow.traits,
        udderFloorHeightMm: Math.round(floorMm),
        rearTeatSpreadMm: Math.max(14, cow.traits.rearTeatSpreadMm - step * 7),
      },
      flags: {
        ...cow.flags,
        crossedRearTeats: cow.flags.crossedRearTeats || (step >= 2 && cow.traits.rearTeatSpreadMm < 40),
      },
    };
    const r = screenCow(projected, s, undefined, 6);
    const suitable = r.successRate >= s.robotThreshold;
    if (!suitable && firstUnsuitable === null && step > 0) firstUnsuitable = parity;
    rows.push({ parity, floorMm: Math.round(floorMm), successRate: r.successRate, tier: r.tier, suitable });
  }
  return { cowId: cow.id, earTag: cow.earTag, rows, firstUnsuitableParity: firstUnsuitable };
}

/** 牛群分层统计 */
export function summarize(results: CowScreenResult[]) {
  const c = { robot: 0, watch: 0, parlor: 0 } as Record<Tier, number>;
  let rateSum = 0;
  for (const r of results) { c[r.tier]++; rateSum += r.successRate; }
  return { counts: c, avgRate: results.length ? rateSum / results.length : 0, n: results.length };
}

/** 确定性随机（报告抽样用） */
export function reportRng(seed: number) {
  return new Rng(seed);
}
