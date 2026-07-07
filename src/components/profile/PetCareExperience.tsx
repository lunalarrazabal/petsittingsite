'use client';

import { useLanguage } from '@/i18n/LanguageContext';

export default function PetCareExperience() {
  const { t, language } = useLanguage();
  const p = t.homeProfile;
  const isFr = language === 'fr';

  return (
    <section>
      <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:items-center">
        {/* Text — constrained to ~60% on desktop */}
        <div>
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            {p.betterRates}
          </span>
          <h2 className="mt-3 font-[var(--font-playfair)] text-xl font-bold text-slate-900 sm:text-2xl">
            {p.experienceHeading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.experienceBody}</p>
        </div>

        {/* Stats card — desktop only */}
        <div className="hidden lg:block">
          <div className="rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100">
            <dl className="divide-y divide-brand-100">
              <div className="pb-4">
                <dd className="text-3xl font-extrabold tracking-tight text-brand-600">5.0 ★</dd>
                <dt className="mt-0.5 text-xs text-slate-500">{p.ratingSummary}</dt>
              </div>
              <div className="py-4">
                <dd className="text-3xl font-extrabold tracking-tight text-brand-600">10+</dd>
                <dt className="mt-0.5 text-xs text-slate-500">
                  {isFr ? "ans d'expérience avec les animaux" : 'years of experience with pets'}
                </dt>
              </div>
              <div className="pt-4">
                <dd className="text-3xl font-extrabold tracking-tight text-brand-600">25</dd>
                <dt className="mt-0.5 text-xs text-slate-500">{p.repeatClients}</dt>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
