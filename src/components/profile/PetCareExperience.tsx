'use client';

import { useLanguage } from '@/i18n/LanguageContext';

export default function PetCareExperience() {
  const { t } = useLanguage();
  const p = t.homeProfile;

  return (
    <section>
      <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
        {p.betterRates}
      </span>
      <h2 className="mt-4 font-[var(--font-playfair)] text-2xl font-bold text-slate-900 sm:text-3xl">
        {p.experienceHeading}
      </h2>
      <p className="mt-3 leading-relaxed text-slate-600">{p.experienceBody}</p>
    </section>
  );
}
