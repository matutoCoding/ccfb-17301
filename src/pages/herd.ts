import { h, toast } from '../ui/dom';
import { state, saveCow, removeCow, selectCow } from '../app/store';
import { blankCow } from '../core/herd';
import type { CowRecord } from '../core/types';
import { resultFor } from '../app/store';
import { TIER_LABEL } from '../core/screen';

let query = '';
let kindFilter = 'all';
let sortKey: keyof CowRecord | 'tier' = 'earTag';
let sortDir: 1 | -1 = 1;

function tierBadge(cow: CowRecord) {
  if (cow.kind === 'heifer') return h('span', { class: 'tag heifer' }, '后备牛');
  const r = resultFor(cow.id);
  if (!r) return h('span', { class: 'tag muted' }, '未评测');
  return h('span', { class: `tag ${r.tier}` }, TIER_LABEL[r.tier]);
}

function cowEditor(cow: CowRecord, onClose: () => void) {
  const c: CowRecord = structuredClone(cow);
  const num = (obj: any, key: string, label: string, step = 1, unit = '') =>
    h('label', { class: 'field' },
      h('span', null, label),
      h('input', { type: 'number', step, value: String(obj[key]), oninput: (e: Event) => (obj[key] = Number((e.target as HTMLInputElement).value)) }),
      unit ? h('small', { class: 'faint' }, unit) : null,
    );
  const modal = h('div', { class: 'modal-mask', onclick: (e: MouseEvent) => { if (e.target === modal) onClose(); } },
    h('div', { class: 'modal' },
      h('h2', null, cow.earTag ? `编辑牛 ${cow.earTag}` : '新建牛只'),
      h('div', { class: 'form-grid' },
        h('label', { class: 'field' }, h('span', null, '耳号'), h('input', { type: 'text', value: c.earTag, oninput: (e: Event) => (c.earTag = (e.target as HTMLInputElement).value.trim()) })),
        h('label', { class: 'field' }, h('span', null, '牛别'),
          h('select', { onchange: (e: Event) => (c.kind = (e.target as HTMLSelectElement).value as CowRecord['kind']) },
            h('option', { value: 'lactating', selected: c.kind === 'lactating' }, '泌乳牛'),
            h('option', { value: 'heifer', selected: c.kind === 'heifer' }, '后备牛'),
            h('option', { value: 'dry', selected: c.kind === 'dry' }, '干奶牛'),
          )),
        num(c, 'parity', '胎次', 1),
        num(c, 'dim', '泌乳天数 DIM', 1, '天'),
        num(c, 'hoursSinceMilking', '距上次挤奶', 0.5, '小时'),
        h('label', { class: 'field' }, h('span', null, '栋舍'), h('input', { type: 'text', value: c.barn ?? '', oninput: (e: Event) => (c.barn = (e.target as HTMLInputElement).value) })),
        num(c.traits, 'udderFloorHeightMm', '乳房底离地高度', 1, 'mm（越低越危险）'),
        num(c.traits, 'udderDepthScore', '乳房深度线性分', 1, '1-9'),
        num(c.traits, 'frontTeatSpreadMm', '前乳头间距', 1, 'mm'),
        num(c.traits, 'rearTeatSpreadMm', '后乳头间距', 1, 'mm'),
        num(c.traits, 'frontRearGapMm', '前后排间距', 1, 'mm'),
        num(c.traits, 'teatLengthMm', '乳头长度', 1, 'mm'),
        num(c.traits, 'teatDiameterMm', '乳头直径', 1, 'mm'),
        num(c.traits, 'rearUdderHeightMm', '后乳房附着高度', 1, 'mm'),
        num(c.traits, 'rearUdderWidthMm', '后乳房宽度', 1, 'mm'),
        num(c.stance, 'rollDeg', '站姿侧倾', 0.1, '度'),
        num(c.stance, 'tailSwingDeg', '尾巴摆角', 1, '度'),
        h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: !!c.flags.crossedRearTeats, onchange: (e: Event) => (c.flags.crossedRearTeats = (e.target as HTMLInputElement).checked) }), '后乳头交叉'),
        h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: !!c.flags.veryShortTeats, onchange: (e: Event) => (c.flags.veryShortTeats = (e.target as HTMLInputElement).checked) }), '乳头特别短'),
        h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: !!c.flags.nearGroundUdder, onchange: (e: Event) => (c.flags.nearGroundUdder = (e.target as HTMLInputElement).checked) }), '乳房快拖地'),
        h('label', { class: 'field' }, h('span', null, `沾水程度 ${Math.round((c.flags.wetness ?? 0) * 100)}%`),
          h('input', { type: 'range', min: '0', max: '1', step: '0.05', value: String(c.flags.wetness ?? 0), oninput: (e: Event) => (c.flags.wetness = Number((e.target as HTMLInputElement).value)) })),
      ),
      h('div', { class: 'btn-row mt16', style: 'justify-content:flex-end' },
        h('button', { class: 'btn', onclick: onClose }, '取消'),
        h('button', {
          class: 'btn primary', onclick: async () => {
            if (!c.earTag) return toast('请填写耳号', 'err');
            if (!c.id) c.id = `cow-custom-${Date.now()}`;
            await saveCow(c);
            toast('已保存', 'ok');
            onClose();
            rerender();
          },
        }, '保存'),
      ),
    ),
  );
  return modal;
}

let root: HTMLElement | null = null;
function rerender() { if (root) { const nu = renderHerd(); root.replaceWith(nu); root = nu; } }

export function renderHerd(): HTMLElement {
  const el = h('div', null) as HTMLElement;
  root = el;
  const lact = state.cows.filter((c) => c.kind === 'lactating').length;
  const heifers = state.cows.filter((c) => c.kind === 'heifer').length;
  const defect = state.cows.filter((c) => c.flags.crossedRearTeats || c.flags.veryShortTeats || c.flags.nearGroundUdder).length;

  const head = h('div', { class: 'page-head' },
    h('div', null, h('h1', null, '牛群档案'), h('p', null, `按耳号建档，记录胎次、泌乳天数、线性评定与站姿；共 ${state.cows.length} 头（泌乳 ${lact} · 后备 ${heifers} · 缺陷标记 ${defect}）`)),
    h('div', { class: 'btn-row' },
      h('button', { class: 'btn', onclick: () => { const m = cowEditor(blankCow(), () => m.remove()); document.body.appendChild(m); } }, '＋ 新建牛只'),
    ),
  );

  const search = h('input', { type: 'text', placeholder: '搜索耳号 / 栋舍…', value: query, style: 'max-width:240px', oninput: (e: Event) => { query = (e.target as HTMLInputElement).value; rerender(); setTimeout(focusSearch, 0); } });
  function focusSearch() { const inp = root?.querySelector('input[type=text]') as HTMLInputElement | null; if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); } }

  const filters = h('div', { class: 'pill-group' },
    ...[['all', '全部'], ['lactating', '泌乳'], ['heifer', '后备'], ['defect', '缺陷']].map(([k, label]) =>
      h('button', { class: kindFilter === k ? 'on' : '', onclick: () => { kindFilter = k; rerender(); } }, label)));

  const bar = h('div', { class: 'card mb12 spread' },
    h('div', { class: 'btn-row' }, search, filters),
    h('div', { class: 'muted small' }, `点击行进入相机仿真`),
  );

  let rows = state.cows.filter((c) => {
    if (query && !c.earTag.includes(query) && !(c.barn ?? '').includes(query)) return false;
    if (kindFilter === 'lactating') return c.kind === 'lactating';
    if (kindFilter === 'heifer') return c.kind === 'heifer';
    if (kindFilter === 'defect') return c.flags.crossedRearTeats || c.flags.veryShortTeats || c.flags.nearGroundUdder;
    return true;
  });
  rows = [...rows].sort((a, b) => {
    let va: any, vb: any;
    if (sortKey === 'tier') { va = resultFor(a.id)?.successRate ?? -1; vb = resultFor(b.id)?.successRate ?? -1; }
    else { va = (a as any)[sortKey]; vb = (b as any)[sortKey]; }
    if (typeof va === 'string') return sortDir * va.localeCompare(vb);
    return sortDir * ((va ?? 0) - (vb ?? 0));
  });

  const th = (key: keyof CowRecord | 'tier', label: string) =>
    h('th', { onclick: () => { if (sortKey === key) sortDir = (sortDir * -1) as 1 | -1; else { sortKey = key; sortDir = 1; } rerender(); } },
      label + (sortKey === key ? (sortDir === 1 ? ' ▲' : ' ▼') : ''));

  const table = h('div', { class: 'table-wrap' },
    h('table', null,
      h('thead', null, h('tr', null,
        th('earTag', '耳号'), th('kind', '类别'), th('parity', '胎次'), th('dim', 'DIM'),
        th('udderFloorHeightMm' as any, '乳房底高'), th('teatLengthMm' as any, '乳头长'),
        th('rearTeatSpreadMm' as any, '后乳头距'), th('tier', '筛牛档位'), h('th', null, '操作'),
      )),
      h('tbody', null,
        ...rows.slice(0, 400).map((c) =>
          h('tr', { onclick: () => { selectCow(c.earTag); location.hash = '#/camera'; } },
            h('td', null, h('b', null, c.earTag)),
            h('td', null, c.kind === 'lactating' ? '泌乳' : c.kind === 'heifer' ? '后备' : '干奶'),
            h('td', null, String(c.parity)),
            h('td', null, String(c.dim)),
            h('td', { class: c.traits.udderFloorHeightMm < 340 ? 'err-bad' : '' }, `${c.traits.udderFloorHeightMm}`),
            h('td', { class: c.traits.teatLengthMm < 32 ? 'err-bad' : '' }, `${c.traits.teatLengthMm}`),
            h('td', { class: c.flags.crossedRearTeats ? 'err-bad' : '' }, `${Math.round(c.traits.rearTeatSpreadMm)}${c.flags.crossedRearTeats ? ' ⤫' : ''}`),
            h('td', null, tierBadge(c)),
            h('td', { onclick: (e: MouseEvent) => e.stopPropagation() },
              h('div', { class: 'btn-row' },
                h('button', { class: 'btn sm', onclick: () => { selectCow(c.earTag); location.hash = '#/camera'; } }, '相机'),
                h('button', { class: 'btn sm', onclick: () => { selectCow(c.earTag); location.hash = '#/replay'; } }, '回放'),
                h('button', { class: 'btn sm', onclick: () => { const m = cowEditor(c, () => m.remove()); document.body.appendChild(m); } }, '编辑'),
                h('button', {
                  class: 'btn sm red', onclick: async () => {
                    if (confirm(`删除牛 ${c.earTag}？`)) { await removeCow(c.id); rerender(); toast('已删除'); }
                  },
                }, '删'),
              )),
          )),
      ),
    ),
  );
  if (!rows.length) table.appendChild(h('div', { class: 'muted', style: 'padding:20px' }, '没有匹配的牛只'));

  el.append(head, bar, table);
  return el;
}
