import './styles.css';
import { h } from './ui/dom';
import { init, state, selectCow } from './app/store';
import { renderHerd } from './pages/herd';
import { renderModel, disposeModel } from './pages/model';
import { renderCamera, disposeCamera } from './pages/camera';
import { renderReplay, disposeReplay } from './pages/replay';
import { renderReport, disposeReport } from './pages/report';
import { renderSettings, disposeSettings } from './pages/settings';

type Route = 'herd' | 'model' | 'camera' | 'replay' | 'report' | 'settings';
const NAV: { key: Route; ico: string; label: string; hash: string }[] = [
  { key: 'herd', ico: '🐄', label: '牛群档案', hash: '#/herd' },
  { key: 'model', ico: '🫧', label: '乳房建模', hash: '#/model' },
  { key: 'camera', ico: '📷', label: '相机仿真', hash: '#/camera' },
  { key: 'replay', ico: '🦾', label: '套杯回放', hash: '#/replay' },
  { key: 'report', ico: '📊', label: '筛牛报告', hash: '#/report' },
  { key: 'settings', ico: '⚙️', label: '设置', hash: '#/settings' },
];

let cleanup: (() => void) | null = null;

function parseHash(): { route: Route; ear: string | null } {
  const raw = location.hash || '#/herd';
  const [path, query] = raw.slice(1).split('?');
  const route = (path.replace(/^\//, '') || 'herd') as Route;
  const ear = new URLSearchParams(query ?? '').get('ear');
  return { route: NAV.some((n) => n.key === route) ? route : 'herd', ear };
}

function navigate() {
  const { route, ear } = parseHash();
  if (ear) selectCow(ear);
  // 清理旧页 three/worker
  cleanup?.();
  disposeModel(); disposeCamera(); disposeReplay(); disposeReport(); disposeSettings();

  document.querySelectorAll('.nav-item').forEach((n) => n.classList.toggle('active', (n as HTMLElement).dataset.route === route));
  const host = document.getElementById('page-host')!;
  host.innerHTML = '';
  let node: HTMLElement;
  switch (route) {
    case 'model': node = renderModel(); break;
    case 'camera': node = renderCamera(); break;
    case 'replay': node = renderReplay(); break;
    case 'report': node = renderReport(); break;
    case 'settings': node = renderSettings(); break;
    default: node = renderHerd();
  }
  host.appendChild(node);
  window.scrollTo({ top: 0 });
}

function shell() {
  const app = document.getElementById('app')!;
  app.innerHTML = '';
  const sidebar = h('aside', { class: 'sidebar' },
    h('div', { class: 'brand' },
      h('div', { class: 'logo' }, '🐮'),
      h('div', { class: 'txt' }, h('b', null, '乳头识别仿真'), h('small', null, 'Milking Robot Vision Lab'))),
    ...NAV.map((n) => h('div', {
      class: 'nav-item', 'data-route': n.key,
      onclick: () => { location.hash = n.hash; },
    }, h('span', { class: 'ico' }, n.ico), h('span', { class: 'lbl' }, n.label))),
    h('div', { class: 'side-foot' },
      h('div', null, 'TypeScript · three.js · ToF'),
      h('div', { id: 'db-count' }, 'IndexedDB 初始化中…')),
  );
  const main = h('main', { class: 'main', id: 'page-host' });
  app.appendChild(h('div', { class: 'app-shell' }, sidebar, main));
}

window.addEventListener('hashchange', navigate);

(async function boot() {
  shell();
  await init();
  const cnt = document.getElementById('db-count');
  if (cnt) cnt.textContent = `本地牛群 ${state.cows.length} 头 · 结果 ${state.results.length}`;
  if (!location.hash) location.hash = '#/herd';
  navigate();
})();
