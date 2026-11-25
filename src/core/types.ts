import type { Vec3 } from './vec';
export type { Vec3 } from './vec';

/* ============================ 牛群档案 ============================ */

/** 线性评定 + 实测体型数据。长度/高度一律 mm */
export interface LinearTraits {
  /** 乳房深度线性分 1-9（分越高乳房越深、底越低） */
  udderDepthScore: number;
  /** 乳房底离地高度 mm（由评分映射，也可直接录） */
  udderFloorHeightMm: number;
  /** 前乳头间距 mm */
  frontTeatSpreadMm: number;
  /** 后乳头间距 mm（很小/负值概念通过交叉标记体现） */
  rearTeatSpreadMm: number;
  /** 前后乳头基部纵向间距 mm */
  frontRearGapMm: number;
  /** 乳头长度 mm（群体基准，单乳头可覆盖） */
  teatLengthMm: number;
  /** 乳头直径 mm */
  teatDiameterMm: number;
  /** 后乳房附着高度（离地）mm */
  rearUdderHeightMm: number;
  /** 后乳房宽度/附着宽度 mm */
  rearUdderWidthMm: number;
  /** 前乳头位置分 1-9（外展→内靠） */
  frontPlacementScore: number;
  /** 后乳头位置分 1-9 */
  rearPlacementScore: number;
}

/** 后备牛体型数据（用于预测头胎后乳房下垂） */
export interface HeiferBodyTraits {
  /** 十字部高 cm */
  rumpHeightCm: number;
  /** 体高 cm */
  statureCm: number;
  /** 臀角/腰角宽度 cm */
  rumpWidthCm: number;
  /** 体深/胸深 cm */
  bodyDepthCm: number;
  /** 尻角度分 1-9 */
  rumpAngleScore: number;
  /** 蹄角度分 */
  footAngleScore: number;
}

export type CowKind = 'lactating' | 'heifer' | 'dry';

export interface CowFlags {
  crossedRearTeats?: boolean;
  veryShortTeats?: boolean;
  nearGroundUdder?: boolean;
  /** 沾水程度 0-1，决定 ToF 饱和无效像素 */
  wetness?: number;
}

export interface CowRecord {
  id: string;
  earTag: string;
  name?: string;
  kind: CowKind;
  parity: number;
  /** 泌乳天数（后备牛为 0） */
  dim: number;
  /** 最近一次挤奶后小时数 0-12，影响乳区充盈 */
  hoursSinceMilking: number;
  birthDate?: string;
  barn?: string;
  traits: LinearTraits;
  heiferBody?: HeiferBodyTraits;
  flags: CowFlags;
  /** 站姿参数（建档时的典型站姿） */
  stance: StanceParams;
  /** 每乳头的手动覆盖（顺序 LF RF LR RR，从牛自身左右） */
  teatOverrides?: Partial<TeatParams>[];
  note?: string;
  createdAt: number;
}

/* ============================ 乳房模型 ============================ */

export type TeatIndex = 0 | 1 | 2 | 3; // LF, RF, LR, RR

export const TEAT_NAMES = ['左前', '右前', '左后', '右后'] as const;

export interface TeatParams {
  lengthMm: number;
  radiusMm: number;
  /** 朝向：相对竖直向下的偏角 deg */
  tiltDeg: number;
  /** 偏航角 deg（0 = 朝牛后方？按建模约定） */
  yawDeg: number;
}

export interface StanceParams {
  /** 左右偏（脊柱侧倾）deg */
  rollDeg: number;
  /** 前后倾 deg */
  pitchDeg: number;
  /** 左后肢前后位置偏移 m */
  legLz: number;
  /** 右后肢前后位置偏移 m */
  legRz: number;
  /** 后肢开张宽度系数 */
  legSpread: number;
  /** 尾巴摆角 deg */
  tailSwingDeg: number;
  /** 整体左右站位偏移 m */
  offsetX: number;
}

export interface UdderModelParams {
  /** 四个乳区充盈度 0.7-1.25 */
  quarterFullness: [number, number, number, number];
  teats: [TeatParams, TeatParams, TeatParams, TeatParams];
  stance: StanceParams;
  /** 泌乳天数（影响容积曲线） */
  dim: number;
  /** 挤奶前后状态 0=刚挤完 1=高度充盈 */
  milkState: number;
  wetness: number;
}

/* ============================ 相机 / ToF ============================ */

export interface TofModulePreset {
  id: string;
  label: string;
  width: number;
  height: number;
  fovXDeg: number;
  fovYDeg: number;
  /** 标称工作距离 m */
  workDistM: number;
  /** 最近/最远有效距离 m */
  rangeM: [number, number];
  /** 调制频率 MHz */
  modFreqMhz: number;
  wavelengthNm: number;
}

export interface CameraPose {
  /** 机械臂末端/相机位置 m（世界系） */
  position: Vec3;
  /** 俯仰 deg，正=仰视乳房 */
  pitchDeg: number;
  /** 偏航 deg */
  yawDeg: number;
  /** 滚转 deg */
  rollDeg: number;
}

export interface NoiseSettings {
  enabled: boolean;
  /** 深度噪声强度倍率 */
  depthNoiseScale: number;
  /** 强度衰减系数（越大衰减越快） */
  falloffScale: number;
  flyingPixels: boolean;
  multipath: boolean;
  wetSaturation: boolean;
  /** 多径偏远强度 m */
  multipathBiasM: number;
}

export interface CameraConfig {
  preset: TofModulePreset;
  pose: CameraPose;
  noise: NoiseSettings;
  seed: number;
}

/* ============================ 深度帧 / 识别结果 ============================ */

export type PartKind =
  | 'floor'
  | 'body'
  | 'udder'
  | 'teat'
  | 'legL'
  | 'legR'
  | 'tail'
  | 'hoof';

export interface DepthFrame {
  width: number;
  height: number;
  /** 含噪径向距离 m；无效像素为 NaN */
  depth: Float32Array;
  /** 无噪声真值距离 m */
  cleanDepth: Float32Array;
  /** 红外强度 0-255 */
  ir: Uint8ClampedArray;
  /** 真值部件 id（PartKind 对应的数字编码） */
  partId: Uint8Array;
  /** 真值乳头索引 0-3，非乳头为 -1 */
  teatId: Int8Array;
  /** 世界坐标点云（每像素 3 个 float，无效为 0 且 valid=0） */
  points: Float32Array;
  valid: Uint8Array;
  /** 飞点标记 */
  flying: Uint8Array;
  /** 多径像素标记 */
  multipath: Uint8Array;
  /** 饱和无效标记 */
  saturated: Uint8Array;
  seed: number;
  /** 渲染该帧的相机光心（世界系） */
  eye: Vec3;
  /** 帧内容哈希（确定性校验用） */
  hash?: string;
}

export interface DetectedTip {
  /** 检测到的乳头尖世界坐标 m */
  tip: Vec3;
  /** 聚类质心 */
  centroid: Vec3;
  /** PCA 主轴 */
  axis: Vec3;
  radiusMm: number;
  lengthMm: number;
  pixelCount: number;
  /** 图像中的像素 bbox [minX,minY,maxX,maxY] */
  bbox: [number, number, number, number];
  /** 若被错标为乳头，真值部件是什么 */
  truePart?: PartKind;
  /** 匹配到的真值乳头索引 */
  matchedTeat?: TeatIndex;
  /** 与真值尖误差 mm */
  errorMm?: number;
  /** 球拟合残差 mm（诊断） */
  fitRmsMm?: number;
  /** 球拟合与极点法一致性 mm（诊断） */
  consMm?: number;
  /** 置信诊断量 */
  diag?: { axisRatio: number; dNearMm: number; cover: number; downDiffMm?: number; tiltDeg?: number };
  isFalsePositive: boolean;
}

export interface RecognitionResult {
  tips: DetectedTip[];
  /** 四个真值尖（来自模型，仅用于评分） */
  groundTruthTips: Vec3[];
  /** 每乳头误差 mm，未匹配为 null */
  errorsMm: (number | null)[];
  matchedCount: number;
  falsePositives: DetectedTip[];
  legFalseCount: number;
  tailFalseCount: number;
  /** 识别耗时 ms */
  elapsedMs: number;
}

/* ============================ 套杯 / 回放 ============================ */

export type ReplayEventType =
  | 'info'
  | 'scan'
  | 'rescan'
  | 'blocked'
  | 'found'
  | 'cup-on'
  | 'cup-done'
  | 'fail';

export interface ReplayEvent {
  t: number;
  type: ReplayEventType;
  text: string;
  teat?: TeatIndex;
}

export interface CupPath {
  teat: TeatIndex;
  /** 杯具路径关键点（世界系） */
  waypoints: Vec3[];
  /** 是否一次成功 */
  success: boolean;
  /** 路径上被后腿遮挡/碰撞的采样点数 */
  blockedSamples: number;
  /** 该杯之前的重扫次数 */
  rescans: number;
}

export interface AttachmentResult {
  success: boolean;
  cups: CupPath[];
  events: ReplayEvent[];
  /** 总重扫次数 */
  totalRescans: number;
  /** 机械臂关键位姿时间线（位置+俯仰），供回放 */
  armTimeline: { t: number; position: Vec3; pitchDeg: number; yawDeg: number; gripper?: Vec3 }[];
  durationS: number;
}

/* ============================ 筛牛 / 报告 ============================ */

export type Tier = 'robot' | 'watch' | 'parlor';

export interface CowScreenResult {
  cowId: string;
  earTag: string;
  tier: Tier;
  /** 0-1 全流程成功率 */
  successRate: number;
  trials: number;
  /** 平均乳头尖误差 mm（无噪声最佳视角） */
  bestTipErrorMm: number | null;
  matchedTeats: number;
  failureReasons: string[];
  /** 推荐安装高度 m / 俯仰 deg（该牛） */
  bestHeightM?: number;
  bestPitchDeg?: number;
}

export interface HeatmapCell {
  heightM: number;
  pitchDeg: number;
  /** 全群成功率 0-1 */
  herdSuccess: number;
  /** 参与计算牛数 */
  n: number;
}

export interface HeiferPrediction {
  cowId: string;
  earTag: string;
  /** 预测头胎后乳房底高 mm */
  predictedFloorMm: number;
  predictedTier: Tier;
  predictedSuccessRate: number;
  sagMm: number;
  rationale: string;
}

export interface ParityProjection {
  cowId: string;
  earTag: string;
  rows: {
    parity: number;
    floorMm: number;
    successRate: number;
    tier: Tier;
    suitable: boolean;
  }[];
  /** 从第几胎开始不适合（null=三胎内仍适合） */
  firstUnsuitableParity: number | null;
}

export interface AppSettings {
  defaultPresetId: string;
  defaultNoise: NoiseSettings;
  defaultSeed: number;
  /** 分档阈值：>= robot 进机器人；>= watch 盯着；否则奶厅 */
  robotThreshold: number;
  watchThreshold: number;
  /** 套杯允许尖点误差 mm */
  cupToleranceMm: number;
  /** 全群试验次数/牛 */
  trialsPerCow: number;
  sweepHeights: number[];
  sweepPitches: number[];
  sweepWidth: number;
  sweepHeightPx: number;
}
