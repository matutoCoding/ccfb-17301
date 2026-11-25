import * as THREE from 'three';
import type { CowModel } from '../core/cowModel';
import type { Prim } from '../core/primitives';

const PART_COLOR: Record<string, number> = {
  floor: 0x6b7280,
  body: 0x9a6b4f,
  udder: 0xf2b8c6,
  teat: 0xf49ac0,
  legL: 0x8a5a3d,
  legR: 0x7c4f34,
  tail: 0x5b3d28,
  hoof: 0x2b2118,
};

function material(part: string, opacity = 1) {
  return new THREE.MeshStandardMaterial({
    color: PART_COLOR[part] ?? 0xcc9999,
    roughness: part === 'teat' ? 0.35 : 0.85,
    metalness: 0,
    transparent: opacity < 1,
    opacity,
  });
}

function primToMesh(p: Prim): THREE.Object3D | null {
  const mat = material(p.part);
  if (p.kind === 'sphere') {
    const m = new THREE.Mesh(new THREE.SphereGeometry(p.r, 24, 18), mat);
    m.position.set(p.c.x, p.c.y, p.c.z);
    return m;
  }
  if (p.kind === 'ellipsoid') {
    const m = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 20), mat);
    m.position.set(p.c.x, p.c.y, p.c.z);
    const basis = new THREE.Matrix4().makeBasis(
      new THREE.Vector3(p.e0.x, p.e0.y, p.e0.z),
      new THREE.Vector3(p.e1.x, p.e1.y, p.e1.z),
      new THREE.Vector3(p.e2.x, p.e2.y, p.e2.z),
    );
    m.quaternion.setFromRotationMatrix(basis);
    m.scale.set(p.r.x, p.r.y, p.r.z);
    return m;
  }
  // capsule
  const a = new THREE.Vector3(p.a.x, p.a.y, p.a.z);
  const b = new THREE.Vector3(p.b.x, p.b.y, p.b.z);
  const len = a.distanceTo(b);
  const geo = new THREE.CapsuleGeometry(p.r, Math.max(0.001, len - 2 * p.r), 8, 18);
  const m = new THREE.Mesh(geo, mat);
  m.position.copy(a).add(b).multiplyScalar(0.5);
  const dir = b.clone().sub(a).normalize();
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  return m;
}

export interface CowViewOptions {
  showLabels?: boolean;
  opacity?: number;
}

/** 由 CowModel 构建 three 组，并额外加地面、真值尖标记 */
export function buildCowView(model: CowModel, opts: CowViewOptions = {}): THREE.Group {
  const group = new THREE.Group();
  for (const p of model.prims) {
    const mesh = primToMesh(p);
    if (mesh) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
  }
  // 地面
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(2.2, 48),
    new THREE.MeshStandardMaterial({ color: 0x3a4152, roughness: 1 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  group.add(floor);

  // 真值乳头尖绿色小球
  model.gtTips.forEach((tip, i) => {
    const s = new THREE.Mesh(
      new THREE.SphereGeometry(0.008, 14, 10),
      new THREE.MeshBasicMaterial({ color: 0x22ff88 }),
    );
    s.position.set(tip.x, tip.y, tip.z);
    s.name = `gt-tip-${i}`;
    group.add(s);
  });
  void opts;
  return group;
}

/** 相机/机械臂末端辅助体 */
export function buildCameraRig(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 0.07, 0.16),
    new THREE.MeshStandardMaterial({ color: 0x2b6cb0, roughness: 0.4, metalness: 0.3 }),
  );
  g.add(body);
  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.028, 0.034, 0.05, 20),
    new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.2, metalness: 0.6 }),
  );
  lens.rotation.x = Math.PI / 2;
  lens.position.z = 0.09;
  g.add(lens);
  // 彩色锥表示视场
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.32, 0.7, 32, 1, true),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false }),
  );
  cone.rotation.x = -Math.PI / 2;
  cone.position.z = 0.45;
  cone.name = 'fov';
  g.add(cone);
  return g;
}

/** 套杯工具 */
export function buildCup(color = 0xf59e0b): THREE.Group {
  const g = new THREE.Group();
  const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.028, 0.022, 0.07, 20, 1, true),
    new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.5, side: THREE.DoubleSide }),
  );
  g.add(cup);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.004, 10, 24), new THREE.MeshStandardMaterial({ color: 0xfde68a, metalness: 0.7, roughness: 0.25 }));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.035;
  g.add(rim);
  return g;
}
