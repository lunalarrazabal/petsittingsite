'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import BookingForm from '@/components/booking/BookingForm';

export default function BookingClient() {
  const { t } = useLanguage();
  const b = t.booking;

  return (
    <div className="py-10 sm:py-14">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="eyebrow">{b.badge}</p>
        <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-medium text-ink sm:text-5xl">
          {b.title}
        </h1>
        <p className="mt-4 text-base text-muted">{b.subtitle}</p>
      </div>

      {/* Two-column layout: guarantees on the left, form on the right */}
      <div className="mx-auto mt-10 grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_2fr]">
        {/* Left column: trust signals */}
        <aside className="space-y-4">
          <h2 className="font-[var(--font-playfair)] text-xl text-ink">What happens next?</h2>
          {[
            { title: 'I receive your request', body: 'Your booking request lands directly in my inbox within seconds.' },
            { title: 'I get back to you', body: 'I confirm availability and details within 24 hours.' },
            { title: "You're confirmed", body: 'Once confirmed, your pet is in safe hands.' },
          ].map(({ title, body }) => (
            <div key={title} className="border-t border-line pt-4">
              <p className="text-sm font-semibold text-ink">{title}</p>
              <p className="mt-1 text-xs text-muted">{body}</p>
            </div>
          ))}

          <div className="border border-line bg-surface p-4">
            <p className="eyebrow">Questions first?</p>
            <p className="mt-1.5 text-xs text-muted">
              Not sure which service to pick?{' '}
              <a href="/contact" className="font-medium text-sage-deep hover:underline">
                Send me a message
              </a>{' '}
              and I&apos;ll help you choose.
            </p>
          </div>
        </aside>

        {/* Right column: booking form */}
        <div className="border border-line bg-bg p-5 sm:p-7">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
