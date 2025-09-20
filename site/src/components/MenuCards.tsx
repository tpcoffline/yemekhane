type BreakfastProps = {
  items?: string[];
};

export function BreakfastCard({ items }: BreakfastProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">🍳</span>
        <h2 className="text-lg font-semibold text-slate-900">Kahvaltı</h2>
      </div>
      {items && items.length > 0 ? (
        <ul className="list-disc space-y-1 pl-5 text-slate-700">
          {items.map((it, idx) => (
            <li key={idx}>{it}</li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">Bu tarihte kahvaltı menüsü bulunamadı.</p>
      )}
    </div>
  );
}

type DinnerProps = {
  items?: { label: string; value: string }[];
  extras?: string[];
  grams?: string[];
};

export function DinnerCard({ items, extras, grams }: DinnerProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700">🍽️</span>
        <h2 className="text-lg font-semibold text-slate-900">Akşam Yemeği</h2>
      </div>

      {items && items.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <ul className="space-y-1 text-slate-700">
            {items.map((it) => (
              <li key={it.label} className="flex gap-2"><span className="font-medium text-slate-600">{it.label}:</span> <span>{it.value}</span></li>
            ))}
          </ul>
          <div className="space-y-3">
            {extras && extras.length > 0 && (
              <div>
                <div className="mb-1 text-sm font-medium text-slate-600">Ek</div>
                <ul className="list-disc pl-5 text-slate-700">
                  {extras.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
            {grams && grams.length > 0 && (
              <div>
                <div className="mb-1 text-sm font-medium text-slate-600">Gramaj</div>
                <ul className="list-disc pl-5 text-slate-700">
                  {grams.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-slate-500">Bu tarihte akşam menüsü bulunamadı.</p>
      )}
    </div>
  );
}


