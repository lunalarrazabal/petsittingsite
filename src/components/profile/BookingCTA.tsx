'use client';

import Link from 'next/link';
import { CalendarCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function BookingCTA() {
  const { t } = useLanguage();

  return (
    <section className="overflow-hidden rounded-3xl bg-brand-600 px-8 py-14 text-center sm:py-20">
      <h2 className="font-[var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl">
        {t.cta.heading}
      </h2>
      <p className="mt-3 text-base text-brand-100 sm:text-lg">
        {t.cta.subtext}
      </p>
      <div className="mt-8">
        <Link
          href="/booking"
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-sm transition-all duration-200 hover:bg-brand-50 hover:shadow-md active:scale-[0.98]"
        >
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          {t.nav.bookNow}
        </Link>
      </div>
    </section>
  );
}
