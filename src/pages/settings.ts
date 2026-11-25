import { h, toast, downloadText } from '../ui/dom';
import { state, updateSettings } from '../app/store';
import { reseed, putCows } from '../db/db';

let worker: Worker | null = null;
function getWorker() {
  if (!worker) worker = new Worker(new URL('../workers/batch.worker.ts', import.meta.url), { type: 'module' });
  return worker;
}
export function disposeSettings() { worker?.terminate(); worker = null; }

export function renderSettings(): HTMLElement {
  const s = state.settings;
  const el = h('div', null) as HTMLElement;

  /* 精度自检 */
  const precOut = h('div', { class: 'mt12' }, '点击按钮在 Web Worker 中对全部泌乳牛跑无噪声严格识别。');
  const precBar = h('div', { class: 'progress mt12' }, h('i'));
  const btnPrec320 = h('button', { class: 'btn primary' }, '🎯 全群精度自检 (320×240)');
  const btnPrec640 = h('button', { class: 'btn' }, '🔬 高精度自检 (640×480，较慢)');
  function runPrec(presetId: string, btn: HTMLButtonElement) {
    btn.disabled = true;
    const w = getWorker();
    w.onmessage = (e: MessageEvent) => {
      const m = e.data;
      if (m.type === 'progress' && m.job === 'precision') {
        (precBar.firstElementChild as HTMLElement).style.width = `${(m.done / m.total) * 100}%`;
        precOut.textContent = `检验中 ${m.done}/${m.total}…`;
      } else if (m.type === 'precision-done') {
        const st = m.stats;
        precOut.innerHTML = '';
        precOut.append(
          h('div', { class: 'grid cols-3 mb12' },
            h('div', { class: 'stat accent' }, h('div', { class: 'v' }, `${st.meanMm.toFixed(2)}`), h('div', { class: 'k' }, `平均误差 mm · P95 ${st.p95Mm.toFixed(2)}`)),
            h('div', { class: `stat ${st.pass ? 'robot' : 'watch'}` }, h('div', { class: 'v' }, `${st.p95Mm.toFixed(2)}`), h('div', { class: 'k' }, 'P95 误差 mm（尾部重扫）')),
            h('div', { class: 'stat' }, h('div', { class: 'v' }, `${st.cows4}/${st.cows}`), h('div', { class: 'k' }, `四乳头全匹配牛 · 认证 ${st.tips} 尖点`))),
          h('div', { class: st.pass ? 'err-ok' : 'err-bad', style: 'font-size:15px;font-weight:700' }, st.pass ? '✅ 精度规格通过：认证尖点平均误差 ≤3mm' : `⚠ 平均 ${st.meanMm.toFixed(2)} mm`),
          h('div', { class: 'small muted mt8' }, `最大 ${st.maxMm.toFixed(2)}mm；${st.over3} 个尖点 >3mm（极端遮挡/交叉视角，由置信门拦截并重扫）`),
          h('div', { class: `mt8 ${st.deterministic ? 'err-ok' : 'err-bad'}` }, st.deterministic ? '✅ 确定性通过：同牛同种子两遍深度帧与识别结果完全一致' : '❌ 确定性失败'),
          ...(st.worst.length ? [h('div', { class: 'small muted mt8 mono' }, '尾部：', st.worst.map((w2: any) => `${w2.earTag}#${w2.teat}=${w2.e}mm `).join(''))] : []),
        );
        btn.disabled = false;
        toast(st.pass ? '精度自检通过' : '自检完成，存在超差', st.pass ? 'ok' : 'info');
      }
    };
    w.postMessage({ type: 'precision', cows: state.cows, presetId });
  }
  btnPrec320.onclick = () => runPrec('pmd-qvga', btnPrec320);
  btnPrec640.onclick = () => runPrec('blaze-vga', btnPrec640);

  /* 阈值设置 */
  const thRobot = h('input', { type: 'range', min: '0.5', max: '0.95', step: '0.05', value: String(s.robotThreshold) }) as HTMLInputElement;
  const thWatch = h('input', { type: 'range', min: '0.2', max: '0.7', step: '0.05', value: String(s.watchThreshold) }) as HTMLInputElement;
  const cupTol = h('input', { type: 'number', min: '5', max: '30', value: String(s.cupToleranceMm) }) as HTMLInputElement;
  const trials = h('input', { type: 'number', min: '4', max: '24', value: String(s.trialsPerCow) }) as HTMLInputElement;
  const seed = h('input', { type: 'number', value: String(s.defaultSeed) }) as HTMLInputElement;
  const thOut1 = h('output', null, `${Math.round(s.robotThreshold * 100)}%`);
  const thOut2 = h('output', null, `${Math.round(s.watchThreshold * 100)}%`);
  thRobot.oninput = () => { thOut1.textContent = `${Math.round(Number(thRobot.value) * 100)}%`; };
  thWatch.oninput = () => { thOut2.textContent = `${Math.round(Number(thWatch.value) * 100)}%`; };

  const btnSave = h('button', {
    class: 'btn primary', onclick: async () => {
      await updateSettings({
        robotThreshold: Number(thRobot.value), watchThreshold: Number(thWatch.value),
        cupToleranceMm: Number(cupTol.value), trialsPerCow: Number(trials.value), defaultSeed: Number(seed.value),
      });
      toast('设置已保存到 IndexedDB', 'ok');
    },
  }, '保存设置');

  /* 数据管理 */
  const btnReseed = h('button', {
    class: 'btn amber', onclick: async () => {
      if (!confirm('重新生成 300 头测试牛？当前手动修改会被覆盖。')) return;
      await reseed(300);
      location.reload();
    },
  }, '🔄 重新生成 300 头测试牛');
  const btnExportDb = h('button', {
    class: 'btn', onclick: () => {
      const data = { cows: state.cows, settings: state.settings, results: state.results, exportedAt: new Date().toISOString() };
      downloadText(`robot-lab-db_${Date.now()}.json`, JSON.stringify(data, null, 2), 'application/json');
      toast('数据已导出 JSON', 'ok');
    },
  }, '⬇ 导出全部数据');
  const fileImport = h('input', { type: 'file', accept: 'application/json', style: 'display:none' }) as HTMLInputElement;
  const btnImport = h('button', { class: 'btn' }, '⬆ 导入数据');
  btnImport.onclick = () => fileImport.click();
  fileImport.onchange = async () => {
    const file = fileImport.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (Array.isArray(data.cows)) {
        await putCows(data.cows);
        toast(`已导入 ${data.cows.length} 头牛，刷新中`, 'ok');
        setTimeout(() => location.reload(), 800);
      }
    } catch { toast('导入失败：文件格式错误', 'err'); }
  };

  el.append(
    h('div', { class: 'page-head' }, h('div', null, h('h1', null, '设置与系统自检'), h('p', null, '精度门限、分档阈值、确定性与 IndexedDB 数据管理'))),
    h('div', { class: 'grid cols-2' },
      h('div', { class: 'card' },
        h('h3', null, '🎯 识别精度与确定性'),
        h('p', { class: 'small muted' }, '无噪声严格模式：点云分割 + 稳健轴 + 球拟合精修，所有报出尖点与模型真值逐头比对；同牛同种子两遍必须逐数组一致。'),
        h('div', { class: 'btn-row' }, btnPrec320, btnPrec640),
        precBar, precOut),
      h('div', { class: 'card' },
        h('h3', null, '⚙ 分档与仿真参数'),
        h('label', { class: 'field' }, h('span', { class: 'row' }, '“能进机器人”成功率阈值', thOut1), thRobot),
        h('label', { class: 'field' }, h('span', { class: 'row' }, '“要盯着”下限阈值', thOut2), thWatch),
        h('div', { class: 'form-grid' },
          h('label', { class: 'field' }, h('span', null, '套杯允许误差 mm'), cupTol),
          h('label', { class: 'field' }, h('span', null, '每牛试验次数'), trials),
          h('label', { class: 'field' }, h('span', null, '默认随机种子'), seed)),
        btnSave),
      h('div', { class: 'card' },
        h('h3', null, '🗄 数据管理（IndexedDB）'),
        h('p', { class: 'small muted' }, `当前 ${state.cows.length} 头牛、${state.results.length} 条评测结果，均保存在浏览器本地 IndexedDB。`),
        h('div', { class: 'btn-row' }, btnReseed, btnExportDb, btnImport, fileImport)),
      h('div', { class: 'card' },
        h('h3', null, 'ℹ 仿真可信度说明'),
        h('ul', { class: 'small muted', style: 'line-height:1.9;padding-left:18px' },
          h('li', null, '乳房/乳头/后腿/尾巴均为解析图元，CPU 光线求交生成深度，three.js 网格与求交模型同源。'),
          h('li', null, '红外强度按反射率·cosθ/距离² 衰减；弱回波增大深度高斯噪声。'),
          h('li', null, '深度边缘生成飞点；乳房-后腿凹处加多径偏远偏置；沾水湿斑像素饱和无效。'),
          h('li', null, '全部随机数来自种子化 mulberry32，相同输入深度帧与识别结果逐位一致。'),
          h('li', null, '300 头批量计算运行在 Web Worker，界面保持响应。'))),
    ),
  );
  return el;
}
