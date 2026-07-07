'use client';

import { Building2, Trees, CigaretteOff, Baby, Timer } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function SafetyEnvironment() {
  const { t } = useLanguage();
  const p = t.homeProfile;

  const items = [
    { Icon: Building2, text: p.envApartment },
    { Icon: Trees,     text: p.envNoYard },
    { Icon: CigaretteOff, text: p.envNonSmoking },
    { Icon: Baby,      text: p.envNoChildren },
    { Icon: Timer,     text: p.envPottyBreaks },
  ];

  return (
    <section>
      <h2 className="font-[var(--font-playfair)] text-xl font-bold text-slate-900 sm:text-2xl">
        {p.safetyHeading}
      </h2>
      <p className="mt-3 leading-relaxed text-slate-600">{p.safetyBody}</p>
      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map(({ Icon, text }) => (
          <li
            key={text}
            className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="text-sm text-slate-700">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
