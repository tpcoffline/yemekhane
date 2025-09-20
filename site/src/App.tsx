import { useEffect, useMemo, useState } from 'react';
import { fetchAllDates, fetchDayMenu } from './lib/data';
import { toDateKey } from './lib/date';
import DateScroller from './components/DateScroller';
import { BreakfastCard, DinnerCard } from './components/MenuCards';

function App() {
  const todayKey = useMemo(() => toDateKey(new Date()), []);
  const [dates, setDates] = useState<string[]>([]);
  const [active, setActive] = useState<string>(todayKey);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [menu, setMenu] = useState<Awaited<ReturnType<typeof fetchDayMenu>> | null>(null);

  useEffect(() => {
    fetchAllDates()
      .then((d) => {
        setDates(d);
        // If today not in list, fallback to closest next available; else use today
        if (!d.includes(todayKey) && d.length > 0) {
          setActive(d[0]);
        }
      })
      .catch((e) => setError(String(e)));
  }, [todayKey]);

  useEffect(() => {
    if (!active) return;
    setLoading(true);
    setError(null);
    fetchDayMenu(active)
      .then((m) => setMenu(m))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <header className="sticky top-0 z-10 -mx-4 -mt-4 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-3xl p-4 sm:p-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Yurt Yemekhane Menüsü</h1>
          <p className="mt-1 text-sm text-slate-600">Bugünün menüsü ve tarih seçici</p>
          {dates.length > 0 && (
            <div className="mt-3">
              <DateScroller dates={dates} activeDate={active} onSelect={setActive} />
            </div>
          )}
        </div>
      </header>

      <main className="mt-6 space-y-4 sm:space-y-6">
        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">Yükleniyor...</div>
        )}
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
            Bir hata oluştu: {error}
          </div>
        )}
        {!loading && !error && (
          <>
            <BreakfastCard items={menu?.kahvalti} />
            <DinnerCard
              items={menu?.aksam?.items}
              extras={menu?.aksam?.extras}
              grams={menu?.aksam?.grams}
            />
          </>
        )}
      </main>

      <footer className="mt-10 pb-6 text-center text-xs text-slate-500">
        Veriler statik JSON dosyalarından yüklenir.
      </footer>
    </div>
  );
}

export default App;
