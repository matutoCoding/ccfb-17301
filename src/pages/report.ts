import { h, toast, downloadText, fmtPct } from '../ui/dom';
import { state, setResults, selectCow } from '../app/store';
import { summarize, predictHeifer, projectParities, TIER_LABEL } from '../core/screen';
import { paintHeatmap } from '../ui/charts';
import type { HeatmapCell, Tier } from '../core/types';

let worker: Worker | null = null;

function getWorker(): Worker {
  if (!worker) worker = new Worker(new URL('../workers/batch.worker.ts', import.meta.url), { type: 'module' });
  return worker;
}

export function disposeReport() {
  worker?.terminate();
  worker = null;
}

export function renderReport(): HTMLElement {
  const el = h('div', null) as HTMLElement;
  const summary0 = summarize(state.results);

  const statRobot = h('div', { class: 'stat robot' }, h('div', { class: 'v' }, '—'), h('div', { class: 'k' }, '能进机器人'));
  const statWatch = h('div', { class: 'stat watch' }, h('div', { class: 'v' }, '—'), h('div', { class: 'k' }, '要盯着'));
  const statParlor = h('div', { class: 'stat parlor' }, h('div', { class: 'v' }, '—'), h('div', { class: 'k' }, '只能去奶厅'));
  const statAvg = h('div', { class: 'stat accent' }, h('div', { class: 'v' }, '—'), h('div', { class: 'k' }, '平均套杯成功率'));
  function fillStats() {
    const s = summarize(state.results);
    statRobot.querySelector('.v')!.textContent = state.results.length ? String(s.counts.robot) : '—';
    statWatch.querySelector('.v')!.textContent = state.results.length ? String(s.counts.watch) : '—';
    statParlor.querySelector('.v')!.textContent = state.results.length ? String(s.counts.parlor) : '—';
    statAvg.querySelector('.v')!.textContent = state.results.length ? fmtPct(s.avgRate) : '—';
  }
  fillStats();

  const screenBar = h('div', { class: 'progress' }, h('i'));
  const screenProgText = h('span', { class: 'small muted' }, state.results.length ? `已有 ${state.results.length} 头评测结果，可重新全群评测` : '尚未跑全群评测');
  const btnScreen = h('button', { class: 'btn primary' }, '🚀 全群评测（Web Worker，不卡界面）');
  btnScreen.onclick = () => {
    btnScreen.disabled = true;
    screenProgText.textContent = '评测中…';
    const w = getWorker();
    w.onmessage = (e: MessageEvent) => {
      const m = e.data;
      if (m.type === 'progress' && m.job === 'screen') {
        (screenBar.firstElementChild as HTMLElement).style.width = `${(m.done / m.total) * 100}%`;
        screenProgText.textContent = `评测中 ${m.done}/${m.total}`;
      } else if (m.type === 'screen-done') {
        setResults(m.results);
        fillStats();
        renderTierTables();
        btnScreen.disabled = false;
        screenProgText.textContent = `完成：${m.results.length} 头`;
        toast('全群评测完成', 'ok');
      }
    };
    w.postMessage({ type: 'screen', cows: state.cows, settings: state.settings });
  };

  /* 热图 */
  const heatCanvas = h('canvas') as HTMLCanvasElement;
  const heatHost = h('div', { class: 'heatmap-wrap' }, heatCanvas);
  const heatInfo = h('div', { class: 'small muted' }, '尚未扫描');
  const heatBar = h('div', { class: 'progress' }, h('i'));
  const btnHeat = h('button', { class: 'btn' }, '🌡 扫描安装高度×俯仰热图（抽样 90 头）');
  const btnHeatFull = h('button', { class: 'btn' }, '全群精确热图（较慢）');
  let heatCells: HeatmapCell[] = [];
  let best: { h: number; p: number; v: number } | null = null;

  function drawHeat() {
    const hs = state.settings.sweepHeights;
    const ps = state.settings.sweepPitches;
    const vals = hs.map((hh) => ps.map((pp) => heatCells.find((c) => c.heightM === hh && c.pitchDeg === pp)?.herdSuccess ?? 0));
    paintHeatmap(heatCanvas, hs, ps, vals, best ?? undefined);
    if (best) heatInfo.innerHTML = `全群最优安装：<b class="err-ok">高度 ${best.h.toFixed(2)} m · 俯仰 ${best.p}° · 成功率 ${fmtPct(best.v)}</b>`;
  }
  function runHeat(sampleLimit?: number) {
    const btn = sampleLimit ? btnHeat : btnHeatFull;
    btn.setAttribute('disabled', 'true');
    const w = getWorker();
    w.onmessage = (e: MessageEvent) => {
      const m = e.data;
      if (m.type === 'progress' && m.job === 'heatmap') {
        (heatBar.firstElementChild as HTMLElement).style.width = `${(m.done / m.total) * 100}%`;
        heatInfo.textContent = `热图扫描 ${m.done}/${m.total} 格`;
      } else if (m.type === 'heatmap-done') {
        heatCells = m.cells; best = m.best; drawHeat();
        btn.removeAttribute('disabled');
        toast('热图扫描完成', 'ok');
      }
    };
    w.postMessage({ type: 'heatmap', cows: state.cows, settings: state.settings, sampleLimit });
  }
  btnHeat.onclick = () => runHeat(90);
  btnHeatFull.onclick = () => runHeat(0);

  /* 三档表 */
  const tierHost = h('div');
  function renderTierTables() {
    const tiers: Tier[] = ['robot', 'watch', 'parlor'];
    tierHost.innerHTML = '';
    const grid = h('div', { class: 'grid', style: 'grid-template-columns:repeat(3,1fr)' });
    if (window.innerWidth < 1100) grid.style.gridTemplateColumns = '1fr';
    for (const tier of tiers) {
      const rs = state.results.filter((r) => r.tier === tier).sort((a, b) => b.successRate - a.successRate);
      const card = h('div', { class: 'card', style: 'padding:12px' },
        h('h3', null, h('span', { class: `tag ${tier}` }, TIER_LABEL[tier]), h('span', { class: 'sub' }, `${rs.length} 头`)),
        h('div', { class: 'table-wrap', style: 'max-height:340px' },
          h('table', null,
            h('thead', null, h('tr', null, h('th', null, '耳号'), h('th', null, '成功率'), h('th', null, '匹配'), h('th', null, '主要原因'))),
            h('tbody', null, ...rs.slice(0, 60).map((r) =>
              h('tr', { onclick: () => { selectCow(r.earTag); location.hash = '#/camera'; } },
                h('td', null, h('b', null, r.earTag)),
                h('td', null, h('span', { style: `color:${r.successRate >= 0.8 ? '#4ade80' : r.successRate >= 0.45 ? '#fbbf24' : '#f87171'};font-weight:700` }, fmtPct(r.successRate))),
                h('td', null, `${r.matchedTeats}/4`),
                h('td', { class: 'small muted', style: 'white-space:normal' }, r.failureReasons.slice(0, 2).join('、') || '—'),
              ))))));
      grid.appendChild(card);
    }
    tierHost.append(grid);
  }
  renderTierTables();

  /* 后备牛预测 */
  const heifers = state.cows.filter((c) => c.kind === 'heifer');
  const heiferRows = heifers.slice(0, 40).map((c) => {
    const p = predictHeifer(c, state.settings);
    return h('tr', { onclick: () => { selectCow(c.earTag); location.hash = '#/report'; } },
      h('td', null, h('b', null, c.earTag)),
      h('td', null, `P0`),
      h('td', null, `${p.predictedFloorMm}`),
      h('td', null, `${p.sagMm}`),
      h('td', null, h('span', { class: `tag ${p.predictedTier}` }, TIER_LABEL[p.predictedTier])));
  });
  const heiferCard = h('div', { class: 'card' },
    h('h3', null, `后备牛头胎下垂预测（${heifers.length} 头，展示前 40）`, h('span', { class: 'sub' }, '由体高/体深/尻角线性预测产犊后乳房底高并跑仿真')),
    h('div', { class: 'table-wrap', style: 'max-height:300px' },
      h('table', null, h('thead', null, h('tr', null, h('th', null, '耳号'), h('th', null, '胎次'), h('th', null, '预测底高 mm'), h('th', null, '下垂 mm'), h('th', null, '预测档位'))),
        h('tbody', null, ...heiferRows))));

  /* 胎次推移 */
  const paritySelect = h('select', null,
    ...state.cows.filter((c) => c.kind === 'lactating').slice(0, 120).map((c) => h('option', { value: c.earTag }, `${c.earTag}（P${c.parity}）`)));
  const parityBox = h('div', null, '选择牛只后显示当前胎次及后推三胎');
  function runParity() {
    const cow = state.cows.find((c) => c.earTag === paritySelect.value)!;
    const proj = projectParities(cow, state.settings);
    parityBox.innerHTML = '';
    parityBox.append(
      proj.firstUnsuitableParity !== null
        ? h('div', { class: 'tag parlor mb12', style: 'font-size:13px;padding:5px 12px' }, `该牛从第 ${proj.firstUnsuitableParity} 胎开始不适合机器人`)
        : h('div', { class: 'tag robot mb12', style: 'font-size:13px;padding:5px 12px' }, '连推三胎仍可进机器人'),
      h('div', { class: 'grid', style: 'grid-template-columns:repeat(4,1fr)' },
        ...proj.rows.map((r) => h('div', { class: 'stat', style: 'padding:14px' },
          h('div', { class: 'k' }, `第 ${r.parity} 胎`),
          h('div', { class: 'v', style: `font-size:22px;color:${r.tier === 'robot' ? '#4ade80' : r.tier === 'watch' ? '#fbbf24' : '#f87171'}` }, fmtPct(r.successRate)),
          h('div', { class: 'small muted' }, `底高 ${r.floorMm}mm`),
          h('span', { class: `tag ${r.tier} mt8` }, TIER_LABEL[r.tier])))));
  }
  paritySelect.onchange = runParity;
  setTimeout(runParity, 0);
  const parityCard = h('div', { class: 'card' }, h('h3', null, '胎次下垂推移（连推三胎）'),
    h('label', { class: 'field' }, h('span', null, '选择牛只'), paritySelect), parityBox);

  /* 导出 */
  const btnExport = h('button', { class: 'btn green' }, '📄 导出给场长（HTML 报告）');
  btnExport.onclick = () => exportHtml();
  const btnCsv = h('button', { class: 'btn' }, '⬇ 导出 CSV');
  btnCsv.onclick = () => {
    const head = 'earTag,tier,successRate,trials,matchedTeats,reasons\n';
    const csv = head + state.results.map((r) => `${r.earTag},${r.tier},${r.successRate.toFixed(3)},${r.trials},${r.matchedTeats},"${r.failureReasons.join('；')}"`).join('\n');
    downloadText(`筛牛报告_${new Date().toISOString().slice(0, 10)}.csv`, '﻿' + csv, 'text/csv;charset=utf-8');
    toast('CSV 已导出', 'ok');
  };

  function exportHtml() {
    const s = summarize(state.results);
    const rowsHtml = [...state.results].sort((a, b) => b.successRate - a.successRate).map((r) =>
      `<tr><td>${r.earTag}</td><td>${TIER_LABEL[r.tier]}</td><td>${(r.successRate * 100).toFixed(0)}%</td><td>${r.matchedTeats}/4</td><td>${r.failureReasons.join('；')}</td></tr>`).join('');
    const html = `<!doctype html><html lang="zh"><head><meta charset="utf-8"><title>机器人挤奶筛牛报告</title>
<style>body{font-family:"Microsoft YaHei",sans-serif;max-width:1000px;margin:30px auto;color:#1a2444;padding:0 20px}h1{color:#0369a1}table{border-collapse:collapse;width:100%;font-size:13px}th,td{border:1px solid #cbd5e1;padding:6px 9px;text-align:left}th{background:#e0f2fe}.c{display:flex;gap:16px;margin:18px 0}.b{flex:1;border-radius:10px;padding:16px;color:#fff}.r{background:#16a34a}.w{background:#d97706}.p{background:#dc2626}.b b{font-size:30px;display:block}</style></head><body>
<h1>挤奶机器人乳头识别与筛牛报告</h1>
<p>生成时间：${new Date().toLocaleString('zh-CN')} · 牛群 ${state.cows.length} 头 · 已评测 ${state.results.length} 头${best ? ` · 最优安装 ${best.h.toFixed(2)}m / ${best.p}°（${(best.v * 100).toFixed(0)}%）` : ''}</p>
<div class="c"><div class="b r"><b>${s.counts.robot}</b>能进机器人</div><div class="b w"><b>${s.counts.watch}</b>要盯着</div><div class="b p"><b>${s.counts.parlor}</b>只能去挤奶厅</div></div>
<p>平均套杯成功率 <strong>${(s.avgRate * 100).toFixed(1)}%</strong>。分档阈值：≥${state.settings.robotThreshold * 100}% 机器人，≥${state.settings.watchThreshold * 100}% 观察，其余奶厅。</p>
<table><thead><tr><th>耳号</th><th>档位</th><th>成功率</th><th>平均匹配</th><th>主要风险</th></tr></thead><tbody>${rowsHtml}</tbody></table>
<p style="color:#64748b;font-size:12px;margin-top:24px">本报告由挤奶机器人视觉仿真与筛牛系统生成，成功率为确定性仿真试验结果，仅供分群参考。</p>
</body></html>`;
    downloadText(`筛牛报告_${new Date().toISOString().slice(0, 10)}.html`, html, 'text/html;charset=utf-8');
    toast('HTML 报告已导出', 'ok');
  }

  el.append(
    h('div', { class: 'page-head' },
      h('div', null, h('h1', null, '筛牛报告与安装位姿优化'), h('p', null, '全群批量仿真不卡界面；点任意牛行可跳回它的相机仿真')),
      h('div', { class: 'btn-row' }, btnCsv, btnExport)),
    h('div', { class: 'grid cols-3 mb12' }, statRobot, statWatch, statParlor),
    h('div', { class: 'card mb12' }, h('div', { class: 'spread' }, statAvg, h('div', { class: 'btn-row' }, btnScreen)), h('div', { class: 'mt12' }, screenBar), h('div', { class: 'mt8' }, screenProgText)),
    h('div', { class: 'card mb12' },
      h('h3', null, '相机安装高度 × 俯仰角 全群成功率热图'),
      h('div', { class: 'btn-row mb12' }, btnHeat, btnHeatFull),
      heatBar, h('div', { class: 'mt12' }, heatHost), h('div', { class: 'mt8' }, heatInfo)),
    h('div', { class: 'mb12' }, tierHost),
    h('div', { class: 'grid cols-2-equal mb12' }, parityCard, heiferCard),
  );
  return el;
}
