/**
 * 确定性随机数工具。
 * 全系统所有仿真随机性都必须来自这里：
 * 同一 (seed, 调用序列) 永远得到同一结果，保证深度帧/识别结果可复现。
 */

/** 32 位字符串/数字哈希，返回 uint32 */
export function hash32(str: string | number): number {
  let h = 2166136261 >>> 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // 雪崩
  h ^= h >>> 16;
  h = Math.imul(h, 2246822507);
  h ^= h >>> 13;
  h = Math.imul(h, 3266489909);
  h ^= h >>> 16;
  return h >>> 0;
}

/** mulberry32 —— 小型确定性 PRNG，返回 [0,1) */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Rng {
  private next01: () => number;
  readonly seed: number;

  constructor(seed: number | string) {
    this.seed = typeof seed === 'string' ? hash32(seed) : seed >>> 0;
    this.next01 = mulberry32(this.seed);
  }

  /** [0,1) 均匀 */
  float(): number {
    return this.next01();
  }

  /** [min,max) 均匀 */
  range(min: number, max: number): number {
    return min + (max - min) * this.next01();
  }

  /** 整数 [min,max] 闭区间 */
  int(min: number, max: number): number {
    return Math.floor(this.range(min, max + 1));
  }

  /** 近似正态（Box-Muller），均值 0 标准差 1 */
  gauss(): number {
    let u = 0;
    let v = 0;
    while (u === 0) u = this.next01();
    while (v === 0) v = this.next01();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  chance(p: number): boolean {
    return this.next01() < p;
  }

  pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(this.next01() * arr.length)];
  }
}

/** 稳定的 JSON 字符串哈希（用于"两次运行结果一模一样"校验） */
export function digestArrays(arrays: ArrayLike<number>[]): string {
  let h = 0x811c9dc5 >>> 0;
  for (const a of arrays) {
    for (let i = 0; i < a.length; i++) {
      let v = Math.round(a[i] * 1e6) | 0;
      // 把每个 float 的位混入
      h = Math.imul(h ^ (v & 255), 16777619);
      h = Math.imul(h ^ ((v >>> 8) & 255), 16777619);
      h = Math.imul(h ^ ((v >>> 16) & 255), 16777619);
      h = Math.imul(h ^ ((v >>> 24) & 255), 16777619);
    }
  }
  return ('00000000' + (h >>> 0).toString(16)).slice(-8);
}
