import type { AksamJson, DayMenu, KahvaltiJson, MenuDateKey } from '../types';
import { sortDateKeysAsc } from './date';

const BASE = import.meta.env.BASE_URL || '/';
const KAHVALTI_URL = `${BASE}data/kahvalti_liste.json`;
const AKSAM_URL = `${BASE}data/aksam_liste.json`;

export async function fetchKahvalti(): Promise<KahvaltiJson> {
  const res = await fetch(KAHVALTI_URL);
  if (!res.ok) throw new Error('Kahvaltı verisi yüklenemedi');
  return res.json();
}

export async function fetchAksam(): Promise<AksamJson> {
  const res = await fetch(AKSAM_URL);
  if (!res.ok) throw new Error('Akşam verisi yüklenemedi');
  return res.json();
}

export async function fetchDayMenu(dateKey: MenuDateKey): Promise<DayMenu> {
  const [kah, aks] = await Promise.all([fetchKahvalti(), fetchAksam()]);
  const k = kah[dateKey]?.Yemekler;
  const a = aks[dateKey];
  return {
    dateKey,
    kahvalti: k,
    aksam: a
      ? {
          items: [
            { label: '1. Yemek', value: a['1. Yemek'] },
            { label: '2. Yemek', value: a['2. Yemek'] },
            { label: '3. Yemek', value: a['3. Yemek'] },
            { label: '4. Yemek', value: a['4. Yemek'] },
          ],
          extras: a.Ek,
          grams: a.Gramaj,
        }
      : undefined,
  };
}

export async function fetchAllDates(): Promise<string[]> {
  const [kah, aks] = await Promise.all([fetchKahvalti(), fetchAksam()]);
  const keys = new Set<string>([...Object.keys(kah), ...Object.keys(aks)]);
  return sortDateKeysAsc([...keys]);
}


