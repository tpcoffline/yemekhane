// Utilities for handling date keys in format DD-MM-YYYY

export function toDateKey(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = String(date.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
}

export function fromDateKey(dateKey: string): Date | null {
  const [dd, mm, yyyy] = dateKey.split('-').map(Number);
  if (!dd || !mm || !yyyy) return null;
  const d = new Date(yyyy, mm - 1, dd);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatHuman(dateKey: string, locale: string = 'tr-TR'): string {
  const d = fromDateKey(dateKey);
  if (!d) return dateKey;
  return new Intl.DateTimeFormat(locale, { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }).format(d);
}

export function sortDateKeysAsc(keys: string[]): string[] {
  return [...keys].sort((a, b) => {
    const da = fromDateKey(a)?.getTime() ?? 0;
    const db = fromDateKey(b)?.getTime() ?? 0;
    return da - db;
  });
}


