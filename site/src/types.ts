export type KahvaltiJson = Record<string, {
  Yemekler: string[];
}>;

export type AksamJson = Record<string, {
  "1. Yemek": string;
  "2. Yemek": string;
  "3. Yemek": string;
  "4. Yemek": string;
  Ek: string[];
  Gramaj: string[];
}>;

export type MenuDateKey = string; // format: DD-MM-YYYY

export type DayMenu = {
  dateKey: MenuDateKey;
  kahvalti?: string[];
  aksam?: {
    items: { label: string; value: string }[];
    extras: string[];
    grams: string[];
  };
};


