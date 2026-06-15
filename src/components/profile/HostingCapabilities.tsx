'use client';

import { Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function HostingCapabilities() {
  const { t } = useLanguage();
  const p = t.homeProfile;

  const items = [
    p.hostCats,
    p.hostDogsSmall,
    p.hostDogsMedium,
    p.hostDogsLarge,
    p.hostDogsXLarge,
    p.hostCrateTrained,
  ];

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-lg font-bold text-slate-900">{p.hostingHeading}</h2>
      <ul className="mt-3 grid grid-cols-2 gap-y-2 gap-x-3 lg:grid-cols-1">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
            <Check className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
