import * as THREE from 'three';
import { h } from '../ui/dom';
import { getSelectedCow, state } from '../app/store';
import { buildCowModel, defaultModelParams, TEAT_NAMES } from '../core/cowModel';
import { createStage, type Stage } from '../three/stage';
import { buildCowView } from '../three/CowView';
import type { UdderModelParams } from '../core/types';

let stage: Stage | null = null;
let group: THREE.Group | null = null;

export function renderModel(): HTMLElement {
  const cow = getSelectedCow();
  const params: UdderModelParams = defaultModelParams(cow);
  const el = h('div', null) as HTMLElement;
  const host = h('div', { class: 'canvas-host' }, h('div', { class: 'view3d', id: 'model-view', style: 'height:560px' }));
  const gtBox = h('div', { class: 'kv mt12' });

  function rebuild() {
    if (!stage) return;
    if (group) { stage.scene.remove(group); group.traverse((o) => { if (o instanceof THREE.Mesh) o.geometry.dispose(); }); }
    const m = buildCowModel(cow, params);
    group = buildCowView(m);
    stage.scene.add(group);
    gtBox.innerHTML = '';
    m.gtTips.forEach((p, i) => {
      gtBox.append(h('dt', null, TEAT_NAMES[i]), h('dd', { class: 'mono small' }, `X${(p.x * 1000).toFixed(0)} Y${(p.y * 1000).toFixed(0)} Z${(p.z * 1000).toFixed(0)} mm`));
    });
  }

  const slider = (label: string, get: () => number, set: (v: number) => void, min: number, max: number, step: number, fmt = (v: number) => v.toFixed(2)) =>
    h('label', { class: 'field' },
      h('span', { class: 'row' }, label, h('output', null, fmt(get()))),
      h('input', {
        type: 'range', min, max, step, value: String(get()),
        oninput: (e: Event) => { const inp = e.target as HTMLInputElement; set(Number(inp.value)); (inp.parentElement!.querySelector('output') as HTMLOutputElement).textContent = fmt(get()); rebuild(); },
      }));

  const teatCard = (i: number) =>
    h('div', { class: 'card', style: 'padding:12px' },
      h('b', { class: 'small' }, TEAT_NAMES[i]),
      slider('长度 mm', () => params.teats[i].lengthMm, (v) => (params.teats[i].lengthMm = v), 12, 80, 1, (v) => `${v.toFixed(0)}`),
      slider('半径 mm', () => params.teats[i].radiusMm, (v) => (params.teats[i].radiusMm = v), 3, 20, 0.5, (v) => v.toFixed(1)),
      slider('倾角°', () => params.teats[i].tiltDeg, (v) => (params.teats[i].tiltDeg = v), 0, 60, 1, (v) => `${v.toFixed(0)}`),
      slider('偏航°', () => params.teats[i].yawDeg, (v) => (params.teats[i].yawDeg = v), -180, 180, 1, (v) => `${v.toFixed(0)}`),
    );

  const controls = h('div', { class: 'rowgap' },
    h('div', { class: 'card' },
      h('h3', null, '整体与泌乳状态'),
      h('label', { class: 'field' }, h('span', null, '选择牛只'),
        h('select', { onchange: (e: Event) => { location.hash = '#/model?ear=' + (e.target as HTMLSelectElement).value; } },
          ...state.cows.map((c) => h('option', { value: c.earTag, selected: c.earTag === cow.earTag }, `${c.earTag}${c.kind === 'heifer' ? '（后备）' : ''}`)))),
      slider('挤奶状态（0 刚挤完 → 1 高度充盈）', () => params.milkState, (v) => (params.milkState = v), 0, 1, 0.02),
      slider('泌乳天数 DIM（影响乳区曲线）', () => params.dim, (v) => (params.dim = v), 1, 380, 1, (v) => `${v.toFixed(0)}d`),
      slider('沾水程度', () => params.wetness, (v) => (params.wetness = v), 0, 1, 0.05),
    ),
    h('div', { class: 'card' },
      h('h3', null, '四个乳区饱满度'),
      h('div', { class: 'form-grid' }, ...[0, 1, 2, 3].map((i) =>
        slider(TEAT_NAMES[i], () => params.quarterFullness[i], (v) => (params.quarterFullness[i] = v), 0.7, 1.25, 0.01))),
    ),
    h('div', { class: 'card' },
      h('h3', null, '站姿'),
      slider('左右侧倾°', () => params.stance.rollDeg, (v) => (params.stance.rollDeg = v), -8, 8, 0.1, (v) => `${v.toFixed(1)}°`),
      slider('前后倾°', () => params.stance.pitchDeg, (v) => (params.stance.pitchDeg = v), -6, 6, 0.1, (v) => `${v.toFixed(1)}°`),
      slider('后肢开张', () => params.stance.legSpread, (v) => (params.stance.legSpread = v), 0.8, 1.3, 0.01),
      slider('尾巴摆角°', () => params.stance.tailSwingDeg, (v) => (params.stance.tailSwingDeg = v), -45, 45, 1, (v) => `${v.toFixed(0)}°`),
    ),
  );

  el.append(
    h('div', { class: 'page-head' }, h('div', null, h('h1', null, '乳房参数化建模'), h('p', null, '由线性评定数据生成乳区/乳头/后腿/尾巴网格，参数与相机求交模型完全一致'))),
    h('div', { class: 'grid cols-2' },
      h('div', { class: 'rowgap' }, controls, h('div', { class: 'card' }, h('h3', null, '真值乳头尖坐标'), gtBox)),
      h('div', { class: 'rowgap' },
        h('div', { class: 'card' }, h('h3', null, '实时 3D 模型（绿球=乳头尖真值）'), host),
        h('div', { class: 'grid cols-2-equal' }, teatCard(0), teatCard(1), teatCard(2), teatCard(3)),
      ),
    ),
  );

  setTimeout(() => {
    const hv = el.querySelector('#model-view') as HTMLElement;
    if (!hv) return;
    stage = createStage(hv, { cameraPos: [0.5, 0.75, -1.1] });
    rebuild();
  }, 30);
  return el;
}

export function disposeModel() { stage?.dispose(); stage = null; group = null; }
