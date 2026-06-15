'use client';

import { useLanguage } from '@/i18n/LanguageContext';

export default function SitterPreferences() {
  const { t } = useLanguage();
  const p = t.homeProfile;

  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-slate-900 sm:text-3xl">
          {p.petInfoHeading}
        </h2>
        <p className="mt-3 leading-relaxed text-slate-600">{p.petInfoBody}</p>
      </div>
      <div>
        <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-slate-900 sm:text-3xl">
          {p.typicalDayHeading}
        </h2>
        <p className="mt-3 leading-relaxed text-slate-600">{p.typicalDayBody}</p>
      </div>
    </section>
  );
}
