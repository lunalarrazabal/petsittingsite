'use client';

import { useLanguage } from '@/i18n/LanguageContext';

export default function LocationCard() {
  const { t } = useLanguage();
  const p = t.homeProfile;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-lg font-bold text-slate-900">{p.locationHeading}</h2>
      <p className="mt-0.5 text-sm text-slate-500">{p.location}</p>

      <div className="mx-auto mt-4 aspect-square max-w-[280px] overflow-hidden rounded-full ring-1 ring-slate-100">
        <iframe
          title={p.locationHeading}
          width="100%"
          height="100%"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-73.5878%2C45.4876%2C-73.5708%2C45.4996&layer=mapnik&marker=45.4936%2C-73.5793"
          loading="lazy"
          className="block"
        />
      </div>
      <p className="mt-2 text-center text-xs text-slate-400">{p.mapAttribution}</p>
    </div>
  );
}
