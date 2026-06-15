'use client';

import { useLanguage } from '@/i18n/LanguageContext';

export default function AvailabilityWidget() {
  const { t } = useLanguage();
  const p = t.homeProfile;

  // Show the current month, read-only — days before today are "Not
  // available", today and onward are "Available".
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayDate = today.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-lg font-bold text-slate-900">{p.availabilityHeading}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.availabilityDescription}</p>

      <label className="mt-4 block">
        <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
          {p.serviceLabel}
        </span>
        <select
          disabled
          defaultValue="boarding"
          aria-label={p.serviceLabel}
          className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
        >
          <option value="boarding">{p.serviceOptionBoarding}</option>
          <option value="doggy-daycare">{p.serviceOptionDaycare}</option>
          <option value="dog-walking">{p.serviceOptionWalking}</option>
        </select>
      </label>

      <p className="mt-4 text-center text-sm font-semibold text-slate-800">
        {t.months[month]} {year}
      </p>

      <div className="mt-2 grid grid-cols-7 text-center">
        {t.days.map((day) => (
          <div key={day} className="py-1 text-xs font-medium text-slate-400">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-y-1 text-center">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const isPast = dayNum < todayDate;

          return (
            <div key={dayNum} className="flex justify-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                  isPast
                    ? 'text-slate-300 line-through'
                    : 'bg-brand-50 font-semibold text-brand-700'
                }`}
                aria-label={`${dayNum} — ${isPast ? p.notAvailable : p.available}`}
              >
                {dayNum}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-brand-50 ring-1 ring-brand-100" /> {p.available}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-slate-100" /> {p.notAvailable}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-xs text-slate-500">
        <p>{p.calendarUpdated}</p>
        <p>{p.maxPets}</p>
        <p>{p.cancellationPolicy}</p>
      </div>
    </div>
  );
}
