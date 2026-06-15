'use client';

import { Building2, Trees, CigaretteOff, PawPrint, Baby, BedDouble, Sofa, Timer } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function SafetyEnvironment() {
  const { t } = useLanguage();
  const p = t.homeProfile;

  const items = [
    { Icon: Building2, text: p.envApartment },
    { Icon: Trees, text: p.envNoYard },
    { Icon: CigaretteOff, text: p.envNonSmoking },
    { Icon: PawPrint, text: p.envNoPets },
    { Icon: Baby, text: p.envNoChildren },
    { Icon: BedDouble, text: p.envNoBed },
    { Icon: Sofa, text: p.envNoFurniture },
    { Icon: Timer, text: p.envPottyBreaks },
  ];

  return (
    <section>
      <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-slate-900 sm:text-3xl">
        {p.safetyHeading}
      </h2>
      <p className="mt-3 leading-relaxed text-slate-600">{p.safetyBody}</p>
      <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map(({ Icon, text }) => (
          <li
            key={text}
            className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-4 text-center text-xs text-slate-600"
          >
            <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
