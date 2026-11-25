import * as THREE from 'three';
import { h } from '../ui/dom';
import { getSelectedCow, state, selectCow } from '../app/store';
import { buildCowModel } from '../core/cowModel';
import { makeCameraConfig, runAttachmentSimulation } from '../core/pipeline';
import { canonicalPose } from '../core/tof';
import { createStage, type Stage } from '../three/stage';
import { buildCowView, buildCup } from '../three/CowView';
import { TEAT_NAMES, type CowRecord } from '../core/types';

let stage: Stage | null = null;

function pickDemoCow(): CowRecord {
  const milk = state.cows.filter((c) => c.kind === 'lactating' && !c.flags.crossedRearTeats && !c.flags.veryShortTeats && !c.flags.nearGroundUdder);
  const sorted = [...milk].sort((a, b) => {
    const score = (c: CowRecord) => c.traits.udderFloorHeightMm - Math.abs(c.stance.rollDeg) * 6 - Math.abs(c.stance.tailSwingDeg) * 1.2;
    return score(b) - score(a);
  });
  return sorted[Math.floor(sorted.length * 0.4)] ?? getSelectedCow();
}

export function renderReplay(): HTMLElement {
  const cow = state.selectedEarTag ? (state.cows.find((c) => c.earTag === state.selectedEarTag) ?? pickDemoCow()) : pickDemoCow();
  selectCow(cow.earTag);
  const el = h('div', null) as HTMLElement;
  const cowSelect = h('select', {
    style: 'width:auto;min-width:220px',
    onchange: (e: Event) => { selectCow((e.target as HTMLSelectElement).value); window.dispatchEvent(new HashChangeEvent('hashchange')); },
  }, ...state.cows.filter((c) => c.kind !== 'heifer').slice(0, 160).map((c) => h('option', { value: c.earTag, selected: c.earTag === cow.earTag }, `${c.earTag} · P${c.parity} · 底${c.traits.udderFloorHeightMm}`)));
  const host = h('div', { class: 'canvas-host' }, h('div', { class: 'view3d', id: 'replay-view', style: 'height:540px' }));
  const model = buildCowModel(cow);
  const replayConfig = makeCameraConfig(state.settings.defaultSeed);
  replayConfig.pose = canonicalPose(model);
  const result = runAttachmentSimulation(cow, replayConfig);
  const duration = result.durationS;
  let cur = 0;
  let playing = true;
  let speed = 1;

  const scrub = h('input', { type: 'range', min: '0', max: String(duration), step: '0.05', value: '0', style: 'flex:1' }) as HTMLInputElement;
  const timeLabel = h('span', { class: 'mono small muted' }, `0.0 / ${duration.toFixed(0)}s`);
  const playBtn = h('button', { class: 'btn primary' }, '⏸ 暂停');
  const rescanBadge = h('span', { class: 'tag watch' }, `重扫 ${result.totalRescans} 次`);
  const statusBadge = h('span', { class: `tag ${result.success ? 'robot' : 'parlor'}` }, result.success ? '四杯成功' : '需人工介入');

  const eventEls: HTMLElement[] = [];
  const log = h('div', { class: 'timeline' },
    ...result.events.map((ev) => {
      const item = h('div', { class: `tl-item ${ev.type}` }, h('span', { class: 'tl-time mono' }, `${ev.t.toFixed(1)}s`), ev.text);
      eventEls.push(item);
      return item;
    }),
  );

  const cupSummary = h('div', { class: 'grid cols-2-equal mt12' },
    ...result.cups.map((c, i) => h('div', { class: 'stat', style: 'padding:12px' },
      h('div', { class: 'spread' }, h('b', null, TEAT_NAMES[i]), h('span', { class: `tag ${c.success ? 'robot' : 'parlor'}` }, c.success ? '套上' : '失败')),
      h('div', { class: 'small muted mt8' }, `路径遮挡采样 ${c.blockedSamples} · 重扫 ${c.rescans}`),
    )));

  el.append(
    h('div', { class: 'page-head' },
      h('div', null, h('h1', null, '套杯过程回放'), h('p', null, '机械臂从进牛位到四杯依次套上；红色事件为后腿/尾巴遮挡，黄色为重扫')),
      cowSelect),
    h('div', { class: 'grid cols-2' },
      h('div', { class: 'card' }, h('h3', null, '3D 回放'), host,
        h('div', { class: 'spread mt12' }, playBtn, scrub, timeLabel,
          h('select', { style: 'width:auto', onchange: (e: Event) => (speed = Number((e.target as HTMLSelectElement).value)) },
            h('option', { value: '0.5' }, '0.5×'), h('option', { value: '1', selected: true }, '1×'), h('option', { value: '2' }, '2×')),
          rescanBadge, statusBadge)),
      h('div', { class: 'card' }, h('h3', null, '事件时间线'), log, h('h3', { class: 'mt16' }, '每杯路径评估'), cupSummary),
    ),
  );

  setTimeout(() => {
    const hv = el.querySelector('#replay-view') as HTMLElement;
    if (!hv) return;
    stage = createStage(hv, { cameraPos: [0.7, 0.8, -1.25] });
    stage.scene.add(buildCowView(model));

    // 机械臂（简单关节组）
    const arm = new THREE.Group();
    const col = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4, metalness: 0.4 });
    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.4, 16), col);
    upper.position.y = 0.2; arm.add(upper);
    const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.028, 0.34, 16), col);
    fore.position.set(0, 0.42, 0.12); fore.rotation.x = 0.7; arm.add(fore);
    const wrist = new THREE.Mesh(new THREE.SphereGeometry(0.045, 18, 14), new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.5, roughness: 0.3 }));
    wrist.position.set(0, 0.5, 0.24); arm.add(wrist);
    stage.scene.add(arm);

    const cups3d = result.cups.map((c) => { const g = buildCup(); stage!.scene.add(g); return g; });

    function interpTimeline(t: number) {
      const tl = result.armTimeline;
      for (let i = 0; i < tl.length - 1; i++) {
        if (t >= tl[i].t && t <= tl[i + 1].t) {
          const k = (t - tl[i].t) / Math.max(0.01, tl[i + 1].t - tl[i].t);
          const a = tl[i].position, b = tl[i + 1].position;
          return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, z: a.z + (b.z - a.z) * k };
        }
      }
      return tl[tl.length - 1].position;
    }

    stage!.onFrame((dt) => {
      if (playing) { cur += dt * speed; if (cur > duration) cur = 0; scrub.value = cur.toFixed(2); }
      const ap = interpTimeline(cur);
      arm.position.set(ap.x, ap.y - 0.5, ap.z);
      timeLabel.textContent = `${cur.toFixed(1)} / ${duration.toFixed(0)}s`;
      // 杯子沿路径
      result.cups.forEach((c, i) => {
        const g = cups3d[i];
        const start = 5.5 + i * 3.6;
        const local = (cur - start) / 3.2;
        if (local < 0) { g.visible = false; return; }
        g.visible = true;
        const wps = c.waypoints;
        if (local >= 1) {
          const p = wps[wps.length - 1]; g.position.set(p.x, p.y + 0.035, p.z); return;
        }
        const f = local * (wps.length - 1);
        const idx = Math.min(wps.length - 2, Math.floor(f));
        const k = f - idx;
        const a = wps[idx], b = wps[idx + 1];
        g.position.set(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k + 0.035, a.z + (b.z - a.z) * k);
      });
      // 事件高亮
      let active = -1;
      result.events.forEach((ev, i) => { if (ev.t <= cur) active = i; });
      eventEls.forEach((item, i) => { (item as HTMLElement).style.opacity = i <= active ? '1' : '0.32'; });
    });

    playBtn.onclick = () => { playing = !playing; playBtn.textContent = playing ? '⏸ 暂停' : '▶ 播放'; };
    scrub.oninput = () => { cur = Number(scrub.value); playing = false; playBtn.textContent = '▶ 播放'; };
  }, 30);

  return el;
}

export function disposeReplay() { stage?.dispose(); stage = null; }
