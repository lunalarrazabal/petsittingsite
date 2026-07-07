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
    <div
      className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ${
        error ? 'ring-red-300' : 'ring-slate-100'
      }`}
    >
      <h3 className="font-semibold text-slate-900">{b.calendarTitle}</h3>
      <p className="mt-0.5 text-xs text-slate-400">{b.calendarSubtitle}</p>

      {/* Check-in / Check-out summary */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div
          className={`rounded-xl border-2 px-3 py-2.5 transition-colors ${
            checkIn ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {language === 'en' ? 'Check-in' : 'Arrivée'}
          </p>
          <p className={`mt-0.5 text-sm font-semibold ${checkIn ? 'text-slate-900' : 'text-slate-400'}`}>
            {checkIn || (language === 'en' ? 'Select date' : 'Choisir')}
          </p>
        </div>
        <div
          className={`rounded-xl border-2 px-3 py-2.5 transition-colors ${
            checkOut ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {language === 'en' ? 'Check-out' : 'Départ'}
          </p>
          <p className={`mt-0.5 text-sm font-semibold ${checkOut ? 'text-slate-900' : 'text-slate-400'}`}>
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
          className="flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ‹
        </button>
        <p className="text-sm font-semibold text-slate-800">
          {t.months[viewMonth]} {viewYear}
        </p>
        <button
          type="button"
          onClick={nextMonth}
          aria-label={b.nextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none transition-colors hover:bg-slate-100"
        >
          ›
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="mt-3 grid grid-cols-7 text-center">
        {t.days.map((day) => (
          <div key={day} className="py-1 text-xs font-medium text-slate-400">
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
          const dayOfWeek = date.getDay();

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
            wrapperCls += 'bg-blue-50 ';
            // Round the ends of the strip at week boundaries and at the endpoints
            if (dayOfWeek === 0 || (isStart)) wrapperCls += 'rounded-l-full ';
            if (dayOfWeek === 6 || (isEnd))   wrapperCls += 'rounded-r-full ';
          }
          if (isStart && checkOut) wrapperCls += 'rounded-l-full ';
          if (isEnd)               wrapperCls += 'rounded-r-full ';

          // Button circle
          let btnCls =
            'relative flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all duration-150 ';
          if (isStart || isEnd) {
            btnCls += 'bg-blue-600 text-white font-bold shadow-sm z-10 ';
          } else if (isDisabled) {
            btnCls += 'cursor-not-allowed text-slate-300 ';
            if (isBlocked) btnCls += 'bg-red-50 line-through ';
          } else if (isToday) {
            btnCls +=
              'font-bold text-blue-600 ring-2 ring-blue-300 hover:bg-blue-100 cursor-pointer ';
          } else {
            btnCls += 'cursor-pointer text-slate-700 hover:bg-blue-100 hover:text-blue-700 ';
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
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-500" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-blue-600" />
          {language === 'en' ? 'Check-in / Check-out' : 'Arrivée / Départ'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-blue-100" />
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
