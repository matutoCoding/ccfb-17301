import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface Stage {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  raf: number;
  dispose: () => void;
  onFrame: (fn: (dt: number, t: number) => void) => void;
}

/** 在容器内创建带轨道控制的 three 舞台；返回 dispose 清理 */
export function createStage(container: HTMLElement, opts?: { cameraPos?: [number, number, number]; target?: [number, number, number] }): Stage {
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a1024);
  scene.fog = new THREE.Fog(0x0a1024, 2.2, 5);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.02, 20);
  camera.position.set(...(opts?.cameraPos ?? [0.55, 0.85, -1.35]));

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(...(opts?.target ?? [0, 0.5, -0.02]));
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI * 0.52;
  controls.minDistance = 0.3;
  controls.maxDistance = 3.5;

  const hemi = new THREE.HemisphereLight(0xbfd8ff, 0x2a2018, 0.85);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(-1.2, 2.4, -1.4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 0.1; key.shadow.camera.far = 6;
  key.shadow.camera.left = -1.5; key.shadow.camera.right = 1.5;
  key.shadow.camera.top = 1.5; key.shadow.camera.bottom = -1.5;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x66ccff, 0.5);
  rim.position.set(1, 1.2, 1.5);
  scene.add(rim);

  const resize = () => {
    const w = container.clientWidth || 640;
    const h = container.clientHeight || 460;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  const frameFns = new Set<(dt: number, t: number) => void>();
  const clock = new THREE.Clock();
  let raf = 0;
  const loop = () => {
    raf = requestAnimationFrame(loop);
    const dt = clock.getDelta();
    const t = clock.elapsedTime;
    frameFns.forEach((f) => f(dt, t));
    controls.update();
    renderer.render(scene, camera);
  };
  loop();

  return {
    renderer, scene, camera, controls, raf,
    onFrame: (fn) => frameFns.add(fn),
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
