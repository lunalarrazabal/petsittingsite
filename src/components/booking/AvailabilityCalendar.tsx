'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { blockedDates } from '@/data/blocked-dates';

interface AvailabilityCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  error?: string;
}

// Format a Date object as 'YYYY-MM-DD' for comparison with blockedDates
function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function AvailabilityCalendar({
  selectedDate,
  onDateSelect,
  error,
}: AvailabilityCalendarProps) {
  const { t } = useLanguage();
  const b = t.booking;

  // Which month/year the calendar is currently showing
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  // Build the grid of days for the current view month
  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  // Can we go back? Don't allow navigating before the current month
  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div
      className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ${
        error ? 'ring-red-300' : 'ring-slate-100'
      }`}
    >
      <h3 className="font-semibold text-slate-900">{b.calendarTitle}</h3>
      <p className="mt-0.5 text-xs text-slate-400">{b.calendarSubtitle}</p>

      {/* Month navigation */}
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          aria-label={b.prevMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
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
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-slate-100"
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
      <div className="mt-1 grid grid-cols-7 gap-y-1 text-center">
        {/* Empty cells before the 1st */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const date = new Date(viewYear, viewMonth, dayNum);
          const dateStr = toDateString(date);

          const isPast = date < today;
          const isBlocked = blockedDates.includes(dateStr);
          const isToday = dateStr === toDateString(today);
          const isSelected = dateStr === selectedDate;
          const isDisabled = isPast || isBlocked;

          let cellClass =
            'relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all duration-150 ';

          if (isSelected) {
            cellClass += 'bg-blue-600 text-white font-bold shadow-md';
          } else if (isDisabled) {
            cellClass += 'cursor-not-allowed text-slate-300 ';
            if (isBlocked) cellClass += 'bg-red-50 line-through';
          } else if (isToday) {
            cellClass +=
              'font-bold text-blue-600 ring-2 ring-blue-300 hover:bg-blue-50 cursor-pointer';
          } else {
            cellClass +=
              'cursor-pointer text-slate-700 hover:bg-blue-50 hover:text-blue-700';
          }

          return (
            <div key={dayNum} className="flex justify-center">
              <button
                type="button"
                onClick={() => !isDisabled && onDateSelect(dateStr)}
                disabled={isDisabled}
                aria-label={`${dateStr}${isBlocked ? ` — ${b.unavailable}` : ''}${isToday ? ` — ${b.today}` : ''}`}
                aria-pressed={isSelected}
                className={cellClass}
              >
                {dayNum}
                {/* Dot below today's date */}
                {isToday && !isSelected && (
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
          <span className="h-3 w-3 rounded-full bg-blue-600" /> {b.selected}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-100 ring-1 ring-red-200" /> {b.unavailable}
        </span>
      </div>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
