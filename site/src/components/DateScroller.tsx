import { useEffect, useMemo, useRef } from 'react';
import { formatHuman } from '../lib/date';

type Props = {
  dates: string[];
  activeDate: string;
  onSelect: (dateKey: string) => void;
};

export default function DateScroller({ dates, activeDate, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo(() => dates.map((d) => ({ key: d, label: formatHuman(d) })), [dates]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const active = el.querySelector(`[data-key="${activeDate}"]`);
    if (active && 'scrollIntoView' in active) {
      (active as HTMLElement).scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  }, [activeDate]);

  return (
    <div ref={containerRef} className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-1" aria-label="Tarih seçici">
      {items.map(({ key, label }) => {
        const isActive = key === activeDate;
        return (
          <button
            key={key}
            data-key={key}
            onClick={() => onSelect(key)}
            className={[
              'whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors',
              isActive
                ? 'bg-slate-900 text-white border-slate-900 shadow'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}


