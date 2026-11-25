import type { AppSettings, CowRecord, CowScreenResult } from '../core/types';
import { DEFAULT_SETTINGS } from '../core/screen';
import * as db from '../db/db';

interface State {
  cows: CowRecord[];
  settings: AppSettings;
  results: CowScreenResult[];
  selectedEarTag: string | null;
  ready: boolean;
}

export const state: State = {
  cows: [],
  settings: DEFAULT_SETTINGS,
  results: [],
  selectedEarTag: null,
  ready: false,
};

const listeners = new Set<() => void>();
export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function emit() { listeners.forEach((f) => f()); }

export async function init() {
  state.settings = await db.getSettings();
  state.cows = await db.ensureSeeded();
  state.results = await db.getAllResults();
  state.ready = true;
  const sel = sessionStorage.getItem('selectedEarTag');
  // 首次进入默认选一头标准站姿、干净帧四乳头认证误差均 ≤3mm 的示范牛
  state.selectedEarTag = sel ?? '8100090';
  emit();
}

export function selectCow(earTag: string | null) {
  state.selectedEarTag = earTag;
  if (earTag) sessionStorage.setItem('selectedEarTag', earTag);
  emit();
}

export function getSelectedCow(): CowRecord {
  return state.cows.find((c) => c.earTag === state.selectedEarTag) ?? state.cows.find((c) => c.kind === 'lactating') ?? state.cows[0];
}

export async function saveCow(cow: CowRecord) {
  await db.putCow(cow);
  const i = state.cows.findIndex((c) => c.id === cow.id);
  if (i >= 0) state.cows[i] = cow; else state.cows.unshift(cow);
  emit();
}

export async function removeCow(id: string) {
  await db.deleteCow(id);
  state.cows = state.cows.filter((c) => c.id !== id);
  emit();
}

export async function updateSettings(patch: Partial<AppSettings>) {
  state.settings = { ...state.settings, ...patch };
  await db.saveSettings(state.settings);
  emit();
}

export async function setResults(rs: CowScreenResult[]) {
  state.results = rs;
  await db.putResults(rs);
  emit();
}

export function resultFor(cowId: string): CowScreenResult | undefined {
  return state.results.find((r) => r.cowId === cowId);
}
