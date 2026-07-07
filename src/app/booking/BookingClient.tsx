'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import BookingForm from '@/components/booking/BookingForm';

export default function BookingClient() {
  const { t } = useLanguage();
  const b = t.booking;

  return (
    <div className="py-8 sm:py-10">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="rounded-full bg-brand-100 px-4 py-1 text-sm font-medium text-brand-700">
          {b.badge}
        </span>
        <h1 className="mt-3 font-[var(--font-playfair)] text-3xl font-bold text-slate-900 sm:text-4xl">
          {b.title}
        </h1>
        <p className="mt-3 text-base text-slate-500">{b.subtitle}</p>
      </div>

      {/* Two-column layout: guarantees on the left, form on the right */}
      <div className="mx-auto mt-8 grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_2fr]">
        {/* Left column: trust signals */}
        <aside className="space-y-3">
          <h2 className="font-[var(--font-playfair)] text-lg font-bold text-slate-900">
            What happens next?
          </h2>
          {[
            { icon: '📩', title: 'I receive your request', body: 'Your booking request lands directly in my inbox within seconds.' },
            { icon: '💬', title: 'I get back to you', body: 'I confirm availability and details within 24 hours.' },
            { icon: '✅', title: "You're confirmed", body: 'Once confirmed, your pet is in safe hands.' },
          ].map(({ icon, title, body }) => (
            <div key={title} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <span className="mt-0.5 text-xl" aria-hidden="true">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{body}</p>
              </div>
            </div>
          ))}

          <div className="rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100">
            <p className="text-sm font-semibold text-brand-700">🐾 Questions first?</p>
            <p className="mt-1 text-xs text-slate-500">
              Not sure which service to pick?{' '}
              <a href="/contact" className="font-medium text-brand-600 hover:underline">
                Send me a message
              </a>{' '}
              and I&apos;ll help you choose.
            </p>
          </div>
        </aside>

        {/* Right column: booking form */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
