'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { blockedDates } from '@/data/blocked-dates';

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onRangeChange: (checkIn: string, checkOut: string) => void;
  error?: string;
}

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function DateRangePicker({
  checkIn,
  checkOut,
  onRangeChange,
  error,
}: DateRangePickerProps) {
  const { t, language } = useLanguage();
  const b = t.booking;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = toDateStr(today);

  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [hovered, setHovered]     = useState<string | null>(null);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handleDayClick = (dateStr: string) => {
    if (!checkIn || (checkIn && checkOut)) {
      // Start fresh selection
      onRangeChange(dateStr, '');
    } else {
      if (dateStr === checkIn) {
        onRangeChange('', '');
      } else if (dateStr < checkIn) {
        onRangeChange(dateStr, '');
      } else {
        onRangeChange(checkIn, dateStr);
      }
    }
  };

  // While hovering with check-in set and no check-out, show preview range
  const effectiveEnd = checkOut || (checkIn && !checkOut ? hovered : null);

  const isInRange = (dateStr: string): boolean => {
    if (!checkIn || !effectiveEnd || effectiveEnd <= checkIn) return false;
    return dateStr > checkIn && dateStr < effectiveEnd;
  };

  return (
    <div className={`border p-4 sm:p-5 ${error ? 'border-red-300' : 'border-line'} bg-bg`}>
      <h3 className="font-[var(--font-playfair)] text-lg text-ink">{b.calendarTitle}</h3>
      <p className="mt-0.5 text-xs text-faint">{b.calendarSubtitle}</p>

      {/* Check-in / Check-out summary */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className={`border px-3 py-2.5 transition-colors ${checkIn ? 'border-sage-deep bg-brand-50' : 'border-line bg-surface'}`}>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-faint">
            {language === 'en' ? 'Check-in' : 'Arrivée'}
          </p>
          <p className={`mt-0.5 text-sm font-semibold ${checkIn ? 'text-ink' : 'text-faint'}`}>
            {checkIn || (language === 'en' ? 'Select date' : 'Choisir')}
          </p>
        </div>
        <div className={`border px-3 py-2.5 transition-colors ${checkOut ? 'border-sage-deep bg-brand-50' : 'border-line bg-surface'}`}>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-faint">
            {language === 'en' ? 'Check-out' : 'Départ'}
          </p>
          <p className={`mt-0.5 text-sm font-semibold ${checkOut ? 'text-ink' : 'text-faint'}`}>
            {checkOut || (language === 'en' ? 'Select date' : 'Choisir')}
          </p>
        </div>
      </div>

      {/* Month navigation */}
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          aria-label={b.prevMonth}
          className="flex h-8 w-8 items-center justify-center border border-line text-lg leading-none text-ink transition-colors hover:bg-ink hover:text-surface disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
        >
          ‹
        </button>
        <p className="font-[var(--font-playfair)] text-base text-ink">
          {t.months[viewMonth]} {viewYear}
        </p>
        <button
          type="button"
          onClick={nextMonth}
          aria-label={b.nextMonth}
          className="flex h-8 w-8 items-center justify-center border border-line text-lg leading-none text-ink transition-colors hover:bg-ink hover:text-surface"
        >
          ›
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="mt-3 grid grid-cols-7 text-center">
        {t.days.map((day) => (
          <div key={day} className="py-1 text-xs font-medium text-faint">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        className="mt-1 grid grid-cols-7 text-center"
        onMouseLeave={() => setHovered(null)}
      >
        {/* Empty cells before the 1st */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`e${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum    = i + 1;
          const date      = new Date(viewYear, viewMonth, dayNum);
          const dateStr   = toDateStr(date);

          const isPast    = date < today;
          const isBlocked = blockedDates.includes(dateStr);
          const isDisabled = isPast || isBlocked;
          const isStart   = dateStr === checkIn;
          const isEnd     = dateStr === checkOut;
          const inRange   = isInRange(dateStr);
          const isToday   = dateStr === todayStr;

          // Range strip: full-width bg between endpoints
          let wrapperCls = 'flex h-9 items-center justify-center ';
          if (inRange) {
            wrapperCls += 'bg-brand-50 ';
          }

          // Button circle
          let btnCls =
            'relative flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all duration-150 ';
          if (isStart || isEnd) {
            btnCls += 'bg-ink text-surface font-bold z-10 ';
          } else if (isDisabled) {
            btnCls += 'cursor-not-allowed text-line ';
            if (isBlocked) btnCls += 'bg-red-50 line-through ';
          } else if (isToday) {
            btnCls +=
              'font-bold text-sage-deep ring-2 ring-sage cursor-pointer hover:bg-brand-50 ';
          } else {
            btnCls += 'cursor-pointer text-ink hover:bg-brand-50 hover:text-sage-deep ';
          }

          return (
            <div
              key={dayNum}
              className={wrapperCls}
              onMouseEnter={() => {
                if (!isDisabled && checkIn && !checkOut) setHovered(dateStr);
              }}
            >
              <button
                type="button"
                onClick={() => !isDisabled && handleDayClick(dateStr)}
                disabled={isDisabled}
                aria-label={`${dateStr}${isBlocked ? ` — ${b.unavailable}` : ''}${isToday ? ` — ${b.today}` : ''}`}
                aria-pressed={isStart || isEnd}
                className={btnCls}
              >
                {dayNum}
                {isToday && !isStart && !isEnd && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-sage-deep" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 border-t border-line pt-3 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-ink" />
          {language === 'en' ? 'Check-in / Check-out' : 'Arrivée / Départ'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-brand-100" />
          {language === 'en' ? 'Selected stay' : 'Séjour sélectionné'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-100 ring-1 ring-red-200" />
          {b.unavailable}
        </span>
      </div>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
