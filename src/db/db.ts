import type { AppSettings, CowRecord, CowScreenResult } from '../core/types';
import { DEFAULT_SETTINGS } from '../core/screen';
import { generateHerd } from '../core/herd';

const DB_NAME = 'robot-teat-lab';
const DB_VERSION = 1;
const STORE_COWS = 'cows';
const STORE_RESULTS = 'results';
const STORE_KV = 'kv';

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_COWS)) {
        const st = db.createObjectStore(STORE_COWS, { keyPath: 'id' });
        st.createIndex('earTag', 'earTag', { unique: true });
        st.createIndex('kind', 'kind', { unique: false });
      }
      if (!db.objectStoreNames.contains(STORE_RESULTS)) {
        db.createObjectStore(STORE_RESULTS, { keyPath: 'cowId' });
      }
      if (!db.objectStoreNames.contains(STORE_KV)) db.createObjectStore(STORE_KV);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function tx<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(store, mode);
        const req = fn(t.objectStore(store));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      }),
  );
}

export async function getAllCows(): Promise<CowRecord[]> {
  try {
    return await tx<CowRecord[]>(STORE_COWS, 'readonly', (s) => s.getAll() as IDBRequest<CowRecord[]>);
  } catch {
    return [];
  }
}

export async function putCow(cow: CowRecord): Promise<void> {
  await tx(STORE_COWS, 'readwrite', (s) => s.put(cow));
}

export async function putCows(cows: CowRecord[]): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const t = db.transaction(STORE_COWS, 'readwrite');
    const s = t.objectStore(STORE_COWS);
    for (const c of cows) s.put(c);
    t.oncomplete = () => resolve();
    t.onerror = () => reject(t.error);
  });
}

export async function deleteCow(id: string): Promise<void> {
  await tx(STORE_COWS, 'readwrite', (s) => s.delete(id));
}

export async function clearCows(): Promise<void> {
  await tx(STORE_COWS, 'readwrite', (s) => s.clear());
}

export async function getResult(cowId: string): Promise<CowScreenResult | undefined> {
  return tx<CowScreenResult | undefined>(STORE_RESULTS, 'readonly', (s) => s.get(cowId) as IDBRequest<CowScreenResult | undefined>);
}

export async function getAllResults(): Promise<CowScreenResult[]> {
  return tx<CowScreenResult[]>(STORE_RESULTS, 'readonly', (s) => s.getAll() as IDBRequest<CowScreenResult[]>);
}

export async function putResult(r: CowScreenResult): Promise<void> {
  await tx(STORE_RESULTS, 'readwrite', (s) => s.put(r));
}

export async function putResults(rs: CowScreenResult[]): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const t = db.transaction(STORE_RESULTS, 'readwrite');
    const s = t.objectStore(STORE_RESULTS);
    for (const r of rs) s.put(r);
    t.oncomplete = () => resolve();
    t.onerror = () => reject(t.error);
  });
}

export async function getSettings(): Promise<AppSettings> {
  const s = await tx<AppSettings | undefined>(STORE_KV, 'readonly', (st) => st.get('settings') as IDBRequest<AppSettings | undefined>);
  return { ...DEFAULT_SETTINGS, ...(s ?? {}) };
}

export async function saveSettings(s: AppSettings): Promise<void> {
  await tx(STORE_KV, 'readwrite', (st) => st.put(s, 'settings'));
}

export async function getKv<T>(key: string): Promise<T | undefined> {
  return tx<T | undefined>(STORE_KV, 'readonly', (st) => st.get(key) as IDBRequest<T | undefined>);
}
export async function setKv(key: string, val: unknown): Promise<void> {
  await tx(STORE_KV, 'readwrite', (st) => st.put(val, key));
}

/** 首次启动播种 300 头测试牛 */
export async function ensureSeeded(): Promise<CowRecord[]> {
  const existing = await getAllCows();
  if (existing.length > 0) return existing;
  const herd = generateHerd(300);
  await putCows(herd);
  return herd;
}

export async function reseed(count = 300): Promise<CowRecord[]> {
  await clearCows();
  const herd = generateHerd(count);
  await putCows(herd);
  return herd;
}
