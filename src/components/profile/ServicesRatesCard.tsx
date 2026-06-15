'use client';

import { Home, Sun, Footprints, Tag, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { services } from '@/data/services';
import type { Translations } from '@/i18n/translations';
import Button from '@/components/ui/Button';

type HomeProfile = Translations['homeProfile'];

function getServiceMeta(id: string): {
  Icon: LucideIcon;
  locationKey: keyof HomeProfile;
  unitKey: keyof HomeProfile;
} {
  switch (id) {
    case 'doggy-daycare':
      return { Icon: Sun, locationKey: 'doggyDaycareLocation', unitKey: 'perDay' };
    case 'dog-walking':
      return { Icon: Footprints, locationKey: 'dogWalkingLocation', unitKey: 'perWalk' };
    default:
      return { Icon: Home, locationKey: 'boardingLocation', unitKey: 'perNight' };
  }
}

export default function ServicesRatesCard() {
  const { t, language } = useLanguage();
  const p = t.homeProfile;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-lg font-bold text-slate-900">{p.servicesHeading}</h2>
      <p className="mt-0.5 text-sm text-slate-500">{p.servicesSubtext}</p>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700">
        <Tag className="h-4 w-4 shrink-0" aria-hidden="true" />
        {p.feesNotice}
      </div>

      <ul className="mt-4 space-y-4">
        {services.map((service) => {
          const { Icon, locationKey, unitKey } = getServiceMeta(service.id);
          const name = language === 'en' ? service.nameEn : service.nameFr;

          return (
            <li key={service.id} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-600">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{name}</p>
                <p className="text-sm text-slate-500">{p[locationKey]}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">${service.price}</p>
                <p className="text-xs text-slate-400">{p[unitKey]}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-5">
        <Button href="/services" variant="outline" fullWidth>
          {p.seeAdditionalRates}
        </Button>
      </div>
    </div>
  );
}
