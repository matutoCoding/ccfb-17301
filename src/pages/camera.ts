import * as THREE from 'three';
import { h, toast, fmtMm } from '../ui/dom';
import { state, getSelectedCow, selectCow } from '../app/store';
import { buildCowModel, defaultModelParams, type UdderModelParams } from '../core/cowModel';
import { cameraBasis, canonicalPose, TOF_PRESETS } from '../core/tof';
import { simulateFrame } from '../core/pipeline';
import { paintDepth, paintIr, paintOverlay } from '../ui/charts';
import { createStage, type Stage } from '../three/stage';
import { buildCowView, buildCameraRig } from '../three/CowView';
import { TEAT_NAMES, type CameraConfig, type TofModulePreset } from '../core/types';
import { digestArrays } from '../core/rng';

let stage: Stage | null = null;
let cowGroup: THREE.Group | null = null;
let rig: THREE.Group | null = null;
let modelParams: UdderModelParams | null = null;

export function renderCamera(): HTMLElement {
  const cow = getSelectedCow();
  selectCow(cow.earTag);
  const model = buildCowModel(cow);
  modelParams = defaultModelParams(cow);

  const preset: TofModulePreset = { ...TOF_PRESETS[2] };
  const config: CameraConfig = {
    preset,
    pose: canonicalPose(model),
    noise: { ...state.settings.defaultNoise },
    seed: state.settings.defaultSeed,
  };

  const el = h('div', null) as HTMLElement;
  const depthCanvas = h('canvas', { class: 'raw' }) as HTMLCanvasElement;
  const irCanvas = h('canvas', { class: 'raw' }) as HTMLCanvasElement;
  const overlay = h('canvas', { class: 'overlay' }) as HTMLCanvasElement;
  const depthCap = h('div', { class: 'cap' }, depthCanvas, overlay);
  const hashBadge = h('span', { class: 'badge-hash' }, '帧哈希 —');
  const resultBox = h('div', null, '尚未运行');
  const viewHost = h('div', { class: 'canvas-host' }, h('div', { class: 'view3d', id: 'cam-view' }));

  function project(p: { x: number; y: number; z: number }): [number, number] | null {
    const b = cameraBasis(config.pose, config.preset);
    const qx = p.x - b.eye.x, qy = p.y - b.eye.y, qz = p.z - b.eye.z;
    const zc = qx * b.forward.x + qy * b.forward.y + qz * b.forward.z;
    if (zc <= 0.02) return null;
    const xc = qx * b.right.x + qy * b.right.y + qz * b.right.z;
    const yc = qx * b.up.x + qy * b.up.y + qz * b.up.z;
    return [config.preset.width / 2 + (xc / zc) * b.fx, config.preset.height / 2 - (yc / zc) * b.fy];
  }

  function syncRig() {
    if (!rig) return;
    rig.position.set(config.pose.position.x, config.pose.position.y, config.pose.position.z);
    rig.rotation.set(
      THREE.MathUtils.degToRad(config.pose.rollDeg),
      THREE.MathUtils.degToRad(config.pose.yawDeg),
      THREE.MathUtils.degToRad(-config.pose.pitchDeg),
      'XYZ',
    );
  }

  function rebuildCow() {
    if (!stage) return;
    if (cowGroup) { stage.scene.remove(cowGroup); cowGroup.traverse((o) => { if (o instanceof THREE.Mesh) { o.geometry.dispose(); } }); }
    const m = buildCowModel(cow, modelParams!);
    cowGroup = buildCowView(m);
    stage.scene.add(cowGroup);
  }

  function run() {
    const m = buildCowModel(cow, modelParams!);
    const bundle = simulateFrame(cow, config, m);
    paintDepth(depthCanvas, bundle.frame, bundle.reco);
    paintIr(irCanvas, bundle.frame);
    paintOverlay(overlay, config.preset.width, config.preset.height, project, bundle.reco, m.gtTips);
    hashBadge.textContent = `帧哈希 ${bundle.hash} · 种子 ${config.seed} · 识别 ${bundle.reco.elapsedMs.toFixed(0)}ms`;
    renderResult(bundle);
    return bundle;
  }

  function renderResult(bundle: ReturnType<typeof simulateFrame>) {
    const r = bundle.reco;
    const rows = TEAT_NAMES.map((nm, i) => {
      const e = r.errorsMm[i];
      const det = r.tips.find((d) => d.matchedTeat === i);
      return h('tr', null,
        h('td', null, nm),
        h('td', { class: e === null ? 'faint' : e <= 3 ? 'err-ok' : 'err-bad' }, e === null ? '未匹配' : `${fmtMm(e)} mm`),
        h('td', { class: 'muted' }, det ? `${det.radiusMm.toFixed(1)}mm / ${det.pixelCount}px` : '—'),
      );
    });
    resultBox.innerHTML = '';
    resultBox.append(
      h('div', { class: 'spread mb12' },
        h('b', null, `匹配 ${r.matchedCount}/4 · 误报 ${r.falsePositives.length}`),
        h('span', { class: 'small' },
          h('span', { style: 'color:#60a5fa' }, ` 腿×${r.legFalseCount} `),
          h('span', { style: 'color:#fde047' }, ` 尾×${r.tailFalseCount}`))),
      h('table', null, h('thead', null, h('tr', null, h('th', null, '乳头'), h('th', null, '误差'), h('th', null, '半径/点数'))), h('tbody', null, ...rows)),
      r.falsePositives.length
        ? h('div', { class: 'mt12 small', style: 'color:#fbbf24' }, '⚠ 橙叉为误识别：', r.falsePositives.map((d) => d.truePart === 'tail' ? '尾巴' : d.truePart?.startsWith('leg') ? '后腿' : d.truePart).join('、'))
        : h('div', { class: 'mt12 small err-ok' }, '无误识别'),
    );
  }

  // 控件
  const poseSlider = (key: 'x' | 'y' | 'z', label: string, min: number, max: number, step: number) =>
    h('label', { class: 'field' },
      h('span', { class: 'row' }, label, h('output', null, config.pose.position[key].toFixed(2))),
      h('input', {
        type: 'range', min, max, step, value: String(config.pose.position[key]),
        oninput: (e: Event) => { const inp = e.target as HTMLInputElement; config.pose.position[key] = Number(inp.value); (inp.previousElementSibling!.querySelector('output') as HTMLElement).textContent = config.pose.position[key].toFixed(2); syncRig(); },
      }));
  const angSlider = (key: 'pitchDeg' | 'yawDeg', label: string, min: number, max: number) =>
    h('label', { class: 'field' },
      h('span', { class: 'row' }, label, h('output', null, `${config.pose[key].toFixed(0)}°`)),
      h('input', {
        type: 'range', min, max, step: '1', value: String(config.pose[key]),
        oninput: (e: Event) => { const inp = e.target as HTMLInputElement; config.pose[key] = Number(inp.value); (inp.previousElementSibling!.querySelector('output') as HTMLElement).textContent = `${config.pose[key].toFixed(0)}°`; syncRig(); },
      }));

  const presetSelect = h('select', {
    onchange: (e: Event) => {
      const p = TOF_PRESETS.find((x) => x.id === (e.target as HTMLSelectElement).value)!;
      Object.assign(preset, p);
      wInput.value = String(preset.width); hInput.value = String(preset.height);
      fovInput.value = String(preset.fovXDeg); wdInput.value = String(preset.workDistM); mfInput.value = String(preset.modFreqMhz);
      toast(`已载入 ${p.label}`);
    },
  }, ...TOF_PRESETS.map((p) => h('option', { value: p.id, selected: p.id === preset.id }, p.label)));

  const numField = (label: string, val: number, step: number, oninput: (v: number) => void) => {
    const inp = h('input', { type: 'number', step, value: String(val), oninput: () => oninput(Number(inp.value)) }) as HTMLInputElement;
    return h('label', { class: 'field' }, h('span', null, label), inp);
  };
  const wInput = h('input', { type: 'number', value: String(preset.width), oninput: (e: Event) => (preset.width = Number((e.target as HTMLInputElement).value)) }) as HTMLInputElement;
  const hInput = h('input', { type: 'number', value: String(preset.height), oninput: (e: Event) => (preset.height = Number((e.target as HTMLInputElement).value)) }) as HTMLInputElement;
  const fovInput = h('input', { type: 'number', value: String(preset.fovXDeg), oninput: (e: Event) => (preset.fovXDeg = Number((e.target as HTMLInputElement).value)) }) as HTMLInputElement;
  const wdInput = h('input', { type: 'number', step: '0.05', value: String(preset.workDistM), oninput: (e: Event) => (preset.workDistM = Number((e.target as HTMLInputElement).value)) }) as HTMLInputElement;
  const mfInput = h('input', { type: 'number', value: String(preset.modFreqMhz), oninput: (e: Event) => (preset.modFreqMhz = Number((e.target as HTMLInputElement).value)) }) as HTMLInputElement;

  const seedInput = h('input', { type: 'number', value: String(config.seed), oninput: (e: Event) => (config.seed = Number((e.target as HTMLInputElement).value)) }) as HTMLInputElement;

  const noiseToggle = (key: keyof typeof config.noise, label: string) =>
    h('label', { class: 'check' },
      h('input', { type: 'checkbox', checked: config.noise[key] as boolean, onchange: (e: Event) => ((config.noise as any)[key] = (e.target as HTMLInputElement).checked) }), label);

  const cowSelect = h('select', {
    onchange: (e: Event) => { selectCow((e.target as HTMLSelectElement).value); location.hash = '#/camera'; },
  }, ...state.cows.filter((c) => c.kind !== 'heifer').map((c) => h('option', { value: c.earTag, selected: c.earTag === cow.earTag }, `${c.earTag} · P${c.parity} · 底${c.traits.udderFloorHeightMm}`)));

  const controls = h('div', { class: 'card rowgap' },
    h('h3', null, '相机与机位'),
    h('label', { class: 'field' }, h('span', null, '选择牛只'), cowSelect),
    h('button', { class: 'btn', onclick: () => { config.pose = canonicalPose(buildCowModel(cow)); syncUIFromPose(); syncRig(); } }, '🎯 回到推荐机位'),
    poseSlider('x', '横向 X (m)', -0.3, 0.3, 0.01),
    poseSlider('y', '安装高度 Y (m)', 0.2, 0.85, 0.01),
    poseSlider('z', '前后 Z (m)', -0.95, -0.25, 0.01),
    angSlider('pitchDeg', '俯仰角（正=仰视）', -10, 60),
    angSlider('yawDeg', '偏航角', -25, 25),
    h('h3', { class: 'mt8' }, 'ToF 模组参数'),
    h('label', { class: 'field' }, h('span', null, '模组预设'), presetSelect),
    h('div', { class: 'form-grid' },
      h('label', { class: 'field' }, h('span', null, '宽 px'), wInput),
      h('label', { class: 'field' }, h('span', null, '高 px'), hInput),
      h('label', { class: 'field' }, h('span', null, '水平 FOV°'), fovInput),
      h('label', { class: 'field' }, h('span', null, '工作距离 m'), wdInput),
      h('label', { class: 'field' }, h('span', null, '调制频率 MHz'), mfInput),
      h('label', { class: 'field' }, h('span', null, '随机种子'), seedInput),
    ),
    h('h3', { class: 'mt8' }, '噪声模型'),
    noiseToggle('enabled', '启用 ToF 噪声'),
    noiseToggle('flyingPixels', '边缘飞点'),
    noiseToggle('multipath', '凹处多径偏远'),
    noiseToggle('wetSaturation', '沾水饱和无效'),
    h('label', { class: 'field' }, h('span', { class: 'row' }, '噪声强度', h('output', null, config.noise.depthNoiseScale.toFixed(1))),
      h('input', { type: 'range', min: '0', max: '2.5', step: '0.1', value: String(config.noise.depthNoiseScale), oninput: (e: Event) => { config.noise.depthNoiseScale = Number((e.target as HTMLInputElement).value); } })),
    h('div', { class: 'btn-row mt8' },
      h('button', { class: 'btn primary', onclick: () => run() }, '▶ 运行仿真'),
      h('button', {
        class: 'btn', onclick: () => {
          const b1 = run(); const h1 = digestArrays([b1.frame.depth, b1.frame.ir]);
          const b2 = run(); const h2 = digestArrays([b2.frame.depth, b2.frame.ir]);
          toast(h1 === h2 && JSON.stringify(b1.reco.tips.map((t) => t.tip)) === JSON.stringify(b2.reco.tips.map((t) => t.tip)) ? '确定性校验通过：两帧完全一致' : '两次结果不一致！', h1 === h2 ? 'ok' : 'err');
        },
      }, '🔁 确定性自检'),
      h('button', { class: 'btn green', onclick: () => location.hash = '#/replay' }, '套杯回放 →'),
    ),
  );

  function syncUIFromPose() {
    disposeCamera();
    const nu = renderCamera();
    el.replaceWith(nu);
  }

  const views = h('div', { class: 'rowgap' },
    h('div', { class: 'card' }, h('h3', null, '机械臂末端 / 相机位姿 3D'), viewHost),
    h('div', { class: 'card' },
      h('h3', null, 'ToF 深度图 与 红外强度图 ', h('span', { class: 'sub' }, '绿圈=真值，红叉=≤3mm，黄叉=超差，橙叉=误识')),
      h('div', { class: 'depth-grid' },
        h('div', { class: 'cap' }, depthCanvas, overlay),
        h('div', { class: 'cap' }, irCanvas)),
      h('div', { class: 'spread mt8' }, hashBadge, h('span', { class: 'legend' }, h('span', null, '近'), h('span', { class: 'bar' }), h('span', null, '远'))),
    ),
    h('div', { class: 'card' }, h('h3', null, '乳头识别与评分'), resultBox),
  );

  el.append(
    h('div', { class: 'page-head' },
      h('div', null, h('h1', null, '相机仿真与乳头识别'), h('p', null, '按真实 ToF 模组参数渲染深度/红外，点云分割求四个乳头尖并与模型真值比对')),
    ),
    h('div', { class: 'grid cols-2' }, controls, views),
  );

  // 挂载 three
  setTimeout(() => {
    const host = el.querySelector('#cam-view') as HTMLElement;
    if (!host) return;
    stage = createStage(host, { cameraPos: [0.5, 0.8, -1.2] });
    rebuildCow();
    rig = buildCameraRig();
    stage.scene.add(rig);
    syncRig();
    run();
  }, 30);

  return el;
}

export function disposeCamera() {
  stage?.dispose();
  stage = null; cowGroup = null; rig = null;
}
