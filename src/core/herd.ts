import { Rng } from './rng';
import type { CowRecord, LinearTraits, StanceParams } from './types';

const MASTER_SEED = 20261126;

function scoreFromFloor(floorMm: number): number {
  return Math.round(Math.min(9, Math.max(1, 1 + (680 - floorMm) / 45)));
}

function randomStance(rng: Rng): StanceParams {
  return {
    rollDeg: rng.range(-3.2, 3.2),
    pitchDeg: rng.range(-2.2, 2.2),
    legLz: rng.range(-0.05, 0.07),
    legRz: rng.range(-0.05, 0.07),
    legSpread: rng.range(0.92, 1.14),
    tailSwingDeg: rng.range(-28, 28),
    offsetX: rng.range(-0.035, 0.035),
  };
}

/**
 * 生成测试牛群。默认 300 头，其中 36 头后备牛；
 * 定向掺入后乳头交叉、极短乳头、乳房拖地、沾水等缺陷。
 */
export function generateHerd(count = 300, seed: number = MASTER_SEED): CowRecord[] {
  const rng = new Rng(seed);
  const cows: CowRecord[] = [];
  const heiferCount = Math.round(count * 0.12); // 36
  const milkCount = count - heiferCount;

  // 预先抽取缺陷牛编号，保证比例且可重叠
  const indices = Array.from({ length: milkCount }, (_, i) => i);
  const shuffled = [...indices];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng.float() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const crossedSet = new Set(shuffled.slice(0, Math.round(milkCount * 0.13)));
  const shortSet = new Set(shuffled.slice(20, 20 + Math.round(milkCount * 0.11)));
  const lowSet = new Set(shuffled.slice(45, 45 + Math.round(milkCount * 0.13)));
  const wetSet = new Set(shuffled.slice(70, 70 + Math.round(milkCount * 0.16)));

  for (let i = 0; i < count; i++) {
    const seq = i + 1;
    const earTag = String(8100000 + seq);
    const id = `cow-${seed}-${seq}`;

    if (i >= milkCount) {
      /* ---------------- 后备牛：只有体型数据 ---------------- */
      const traits: LinearTraits = {
        udderDepthScore: 5,
        udderFloorHeightMm: 640,
        frontTeatSpreadMm: 110,
        rearTeatSpreadMm: 75,
        frontRearGapMm: 150,
        teatLengthMm: 48,
        teatDiameterMm: 25,
        rearUdderHeightMm: 860,
        rearUdderWidthMm: 150,
        frontPlacementScore: 5,
        rearPlacementScore: 5,
      };
      cows.push({
        id,
        earTag,
        kind: 'heifer',
        parity: 0,
        dim: 0,
        hoursSinceMilking: 0,
        barn: `后备舍 ${rng.int(1, 4)}`,
        traits,
        heiferBody: {
          rumpHeightCm: rng.range(138, 152),
          statureCm: rng.range(132, 146),
          rumpWidthCm: rng.range(46, 56),
          bodyDepthCm: rng.range(78, 92),
          rumpAngleScore: rng.int(3, 7),
          footAngleScore: rng.int(4, 7),
        },
        flags: {},
        stance: randomStance(rng),
        createdAt: Date.now() - seq * 86400000,
      });
      continue;
    }

    /* ---------------- 泌乳牛 ---------------- */
    const idx = i;
    // 胎次分布
    const pr = rng.float();
    const parity = pr < 0.3 ? 1 : pr < 0.57 ? 2 : pr < 0.75 ? 3 : pr < 0.88 ? 4 : rng.int(5, 7);

    const dim = rng.chance(0.08) ? rng.int(310, 380) : rng.int(8, 300);

    // 乳房底高：头胎高，随胎次下垂
    let floorMm =
      rng.range(560, 665) - (parity - 1) * rng.range(28, 52) + rng.range(-18, 18);
    if (lowSet.has(idx)) {
      floorMm = rng.range(235, 335); // 快拖地 / 低于飞节
    }
    floorMm = Math.round(floorMm);

    const crossed = crossedSet.has(idx);
    const veryShort = shortSet.has(idx);
    const rearSpread = crossed
      ? Math.round(rng.range(8, 30))
      : Math.round(rng.range(52, 112) - (parity - 1) * 3);

    const teatLength = veryShort
      ? Math.round(rng.range(17, 30))
      : Math.round(rng.range(42, 63) - parity * 0.8);

    const traits: LinearTraits = {
      udderDepthScore: scoreFromFloor(floorMm),
      udderFloorHeightMm: floorMm,
      frontTeatSpreadMm: Math.round(rng.range(92, 150)),
      rearTeatSpreadMm: rearSpread,
      frontRearGapMm: Math.round(rng.range(118, 188)),
      teatLengthMm: teatLength,
      teatDiameterMm: Math.round(rng.range(21, 30)),
      rearUdderHeightMm: Math.round(rng.range(730, 950) - (parity - 1) * 12),
      rearUdderWidthMm: Math.round(rng.range(128, 192)),
      frontPlacementScore: rng.int(3, 7),
      rearPlacementScore: crossed ? rng.int(8, 9) : rng.int(3, 7),
    };

    cows.push({
      id,
      earTag,
      kind: 'lactating',
      parity,
      dim,
      hoursSinceMilking: Math.round(rng.range(0.5, 11.5) * 2) / 2,
      barn: `机器人舍 ${rng.int(1, 2)} 组`,
      traits,
      flags: {
        crossedRearTeats: crossed,
        veryShortTeats: veryShort,
        nearGroundUdder: lowSet.has(idx),
        wetness: wetSet.has(idx) ? rng.range(0.45, 1) : rng.chance(0.1) ? rng.range(0.1, 0.3) : 0,
      },
      stance: randomStance(rng),
      createdAt: Date.now() - seq * 86400000,
    });
  }

  return cows;
}

/** 一头用于表单/演示的空白牛 */
export function blankCow(): CowRecord {
  return {
    id: `cow-custom-${Date.now()}`,
    earTag: '',
    kind: 'lactating',
    parity: 1,
    dim: 120,
    hoursSinceMilking: 6,
    barn: '机器人舍 1 组',
    traits: {
      udderDepthScore: 5,
      udderFloorHeightMm: 560,
      frontTeatSpreadMm: 120,
      rearTeatSpreadMm: 80,
      frontRearGapMm: 150,
      teatLengthMm: 50,
      teatDiameterMm: 25,
      rearUdderHeightMm: 850,
      rearUdderWidthMm: 160,
      frontPlacementScore: 5,
      rearPlacementScore: 5,
    },
    flags: {},
    stance: {
      rollDeg: 0,
      pitchDeg: 0,
      legLz: 0,
      legRz: 0,
      legSpread: 1,
      tailSwingDeg: 8,
      offsetX: 0,
    },
    createdAt: Date.now(),
  };
}
