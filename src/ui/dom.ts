/** 极简 DOM 构建助手 */
export type ElChild = Node | string | number | false | null | undefined;

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: Record<string, any> | null,
  ...children: ElChild[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v === undefined || v === null || v === false) continue;
      if (k === 'class') el.className = String(v);
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else if (k.startsWith('data-')) el.setAttribute(k, String(v));
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v as EventListener);
      else if (k === 'html') el.innerHTML = String(v);
      else if (k === 'style' && typeof v === 'string') el.setAttribute('style', v);
      else (el as unknown as Record<string, unknown>)[k] = v;
    }
  }
  for (const c of children.flat()) {
    if (c === false || c === null || c === undefined) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

export function clear(el: HTMLElement) {
  el.innerHTML = '';
}

export function toast(msg: string, kind: 'ok' | 'err' | 'info' = 'info') {
  let box = document.getElementById('toast-box');
  if (!box) {
    box = h('div', { id: 'toast-box' });
    document.body.appendChild(box);
  }
  const t = h('div', { class: `toast ${kind}` }, msg);
  box.appendChild(t);
  setTimeout(() => { t.classList.add('hide'); setTimeout(() => t.remove(), 300); }, 2600);
}

export function fmtPct(x: number): string {
  return `${Math.round(x * 100)}%`;
}
export function fmtMm(x: number | null | undefined): string {
  return x === null || x === undefined ? '—' : `${x.toFixed(1)}`;
}

/** 下载文本文件 */
export function downloadText(filename: string, text: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
