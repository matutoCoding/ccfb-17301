import type { DepthFrame } from '../core/types';
import type { RecognitionResult } from '../core/types';

/** 深度伪彩 + 标记叠加 */
export function paintDepth(
  canvas: HTMLCanvasElement,
  frame: DepthFrame,
  reco?: RecognitionResult | null,
  opts?: { showTruth?: boolean; showNoise?: boolean },
) {
  const { width: W, height: H } = frame;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(W, H);
  const dMin = 0.25, dMax = 1.15;
  for (let i = 0; i < W * H; i++) {
    let r = 8, g = 12, b = 24;
    const d = frame.depth[i];
    if (Number.isFinite(d)) {
      const t = Math.max(0, Math.min(1, (d - dMin) / (dMax - dMin)));
      // 深蓝→青→黄→红
      if (t < 0.33) { const k = t / 0.33; r = 0; g = Math.round(120 + 120 * k); b = 220; }
      else if (t < 0.66) { const k = (t - 0.33) / 0.33; r = Math.round(255 * k); g = 240; b = Math.round(220 - 180 * k); }
      else { const k = (t - 0.66) / 0.34; r = 255; g = Math.round(220 - 160 * k); b = Math.round(40 + 40 * k); }
      if (frame.flying[i]) { r = 255; g = 255; b = 255; }
      if (frame.multipath[i] && opts?.showNoise) { r = 180; g = 80; b = 255; }
    } else if (frame.saturated[i]) {
      r = 255; g = 40; b = 40;
    }
    img.data[i * 4] = r; img.data[i * 4 + 1] = g; img.data[i * 4 + 2] = b; img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);

  // 像素坐标投影需要相机内参，这里用 bbox 中心近似画检测框/点（在相机页会另外用投影精确画）
  if (reco) {
    ctx.lineWidth = 1;
    reco.tips.forEach((tip) => {
      const [x0, y0, x1, y1] = tip.bbox;
      // bbox 是世界坐标，不能直接用；标记由相机页用投影覆盖层绘制
      void x0; void y0; void x1; void y1;
    });
  }
}

export function paintIr(canvas: HTMLCanvasElement, frame: DepthFrame) {
  const { width: W, height: H } = frame;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(W, H);
  for (let i = 0; i < W * H; i++) {
    let v = frame.ir[i];
    if (frame.saturated[i]) v = 255;
    // 轻微 gamma
    v = Math.round(Math.pow(v / 255, 0.85) * 255);
    img.data[i * 4] = v; img.data[i * 4 + 1] = v; img.data[i * 4 + 2] = Math.min(255, v + 8); img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

/** 在覆盖 canvas 上按投影函数画检测/真值标记 */
export function paintOverlay(
  canvas: HTMLCanvasElement,
  W: number,
  H: number,
  project: (p: { x: number; y: number; z: number }) => [number, number] | null,
  reco?: RecognitionResult | null,
  gtTips?: { x: number; y: number; z: number }[],
) {
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, W, H);
  // 真值绿圈
  gtTips?.forEach((g, i) => {
    const pr = project(g);
    if (!pr) return;
    const [u, v] = pr;
    ctx.strokeStyle = '#22ff88';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(u, v, 7, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#22ff88';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText(`T${i + 1}`, u + 8, v - 6);
  });
  // 检测红叉 / FP 橙叉
  reco?.tips.forEach((d) => {
    const pr = project(d.tip);
    if (!pr) return;
    const [u, v] = pr;
    const col = d.isFalsePositive ? '#ff9500' : d.errorMm !== undefined && d.errorMm <= 3 ? '#ff3b5c' : '#ffd60a';
    ctx.strokeStyle = col;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(u - 4, v - 4); ctx.lineTo(u + 4, v + 4);
    ctx.moveTo(u + 4, v - 4); ctx.lineTo(u - 4, v + 4);
    ctx.stroke();
    if (d.errorMm !== undefined) {
      ctx.fillStyle = col;
      ctx.font = '9px ui-monospace, monospace';
      ctx.fillText(`${d.errorMm.toFixed(1)}`, u + 6, v + 10);
    }
  });
}

/** 成功率热图 */
export function paintHeatmap(
  canvas: HTMLCanvasElement,
  heights: number[],
  pitches: number[],
  values: number[][], // [hi][pi] 0-1
  best?: { h: number; p: number },
) {
  const cellW = 64, cellH = 40, padL = 52, padB = 34, padT = 14, padR = 14;
  const W = padL + pitches.length * cellW + padR;
  const H = padT + heights.length * cellH + padB;
  canvas.width = W * 2; canvas.height = H * 2;
  canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(2, 2);
  ctx.fillStyle = '#0e1424'; ctx.fillRect(0, 0, W, H);
  ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
  pitches.forEach((p, j) => {
    const x = padL + j * cellW + cellW / 2;
    ctx.fillStyle = '#9fb0d0';
    ctx.fillText(`${p}°`, x, H - 14);
  });
  heights.forEach((hh, i) => {
    const y = padT + i * cellH + cellH / 2;
    ctx.fillStyle = '#9fb0d0'; ctx.textAlign = 'right';
    ctx.fillText(`${hh.toFixed(2)}m`, padL - 8, y + 4);
  });
  ctx.textAlign = 'center';
  for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < pitches.length; j++) {
      const v = values[i]?.[j] ?? 0;
      const x = padL + j * cellW, y = padT + i * cellH;
      // 红→黄→绿
      const r = v < 0.5 ? 230 : Math.round(230 - (v - 0.5) * 360);
      const g = v < 0.5 ? Math.round(60 + v * 2 * 150) : 210;
      const b = 70;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x + 2, y + 2, cellW - 4, cellH - 4);
      ctx.fillStyle = v > 0.45 ? '#10151f' : '#e8eefc';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`${Math.round(v * 100)}`, x + cellW / 2, y + cellH / 2 + 4);
      if (best && Math.abs(heights[i] - best.h) < 1e-6 && pitches[j] === best.p) {
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5;
        ctx.strokeRect(x + 3, y + 3, cellW - 6, cellH - 6);
      }
    }
  }
  ctx.fillStyle = '#cdd9f5'; ctx.font = '12px sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('俯仰角 →', padL, H - 0);
  ctx.save();
  ctx.translate(12, padT + heights.length * cellH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.fillText('安装高度', 0, 0);
  ctx.restore();
}
