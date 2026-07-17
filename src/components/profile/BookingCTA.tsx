'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';

export default function BookingCTA() {
  const { t } = useLanguage();

  return (
    <section className="border border-line bg-ink px-8 py-14 text-center text-surface sm:py-16">
      <h2 className="font-[var(--font-playfair)] text-3xl font-medium sm:text-4xl">
        {t.cta.heading}
      </h2>
      <p className="mt-3 text-sm text-surface/70 sm:text-base">{t.cta.subtext}</p>
      <div className="mt-9">
        <Link
          href="/booking"
          className="inline-block border border-surface px-8 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-surface transition-colors hover:bg-surface hover:text-ink"
        >
          {t.nav.bookNow}
        </Link>
      </div>
    </section>
  );
}
