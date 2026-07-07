'use client';

import Link from 'next/link';
import { Home, Sun, Footprints, Moon, ArrowRight, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { services } from '@/data/services';
import type { Translations } from '@/i18n/translations';

type HomeProfile = Translations['homeProfile'];

function getServiceMeta(id: string): {
  Icon: LucideIcon;
  locationKey: keyof HomeProfile;
  unitKey: keyof HomeProfile;
} {
  switch (id) {
    case 'dog-daycare':  return { Icon: Sun,       locationKey: 'doggyDaycareLocation', unitKey: 'perDay'   };
    case 'dog-walking':  return { Icon: Footprints, locationKey: 'dogWalkingLocation',   unitKey: 'perWalk'  };
    case 'cat-boarding': return { Icon: Moon,       locationKey: 'boardingLocation',     unitKey: 'perNight' };
    default:             return { Icon: Home,       locationKey: 'boardingLocation',     unitKey: 'perNight' };
  }
}

const primaryServices = services.filter(
  (s) => s.category === 'dog' || s.category === 'cat'
);

const ALSO_AVAILABLE = [
  { labelEn: 'Additional Dog', labelFr: 'Chien supplémentaire', priceEn: '+$20/night', priceFr: '+20 $/nuit' },
  { labelEn: 'Additional Cat', labelFr: 'Chat supplémentaire',  priceEn: '+$15/night', priceFr: '+15 $/nuit' },
  { labelEn: 'Pick-up',        labelFr: 'Ramassage',            priceEn: '$50',        priceFr: '50 $' },
  { labelEn: 'Drop-off',       labelFr: 'Livraison',            priceEn: '$50',        priceFr: '50 $' },
] as const;

export default function HomeServicesSection() {
  const { t, language } = useLanguage();
  const p = t.homeProfile;
  const isFr = language === 'fr';

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-[var(--font-playfair)] text-xl font-bold text-slate-900 sm:text-2xl">
          {p.servicesHeading}
        </h2>
        <Link
          href="/services"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
        >
          {p.seeAdditionalRates}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-1 text-sm text-slate-500">{p.servicesSubtext}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {primaryServices.map((service) => {
          const { Icon, locationKey, unitKey } = getServiceMeta(service.id);
          const name        = isFr ? service.nameFr        : service.nameEn;
          const description = isFr ? service.descriptionFr : service.descriptionEn;
          const features    = isFr ? service.featuresFr    : service.featuresEn;

          return (
            <div
              key={service.id}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition-shadow duration-200 hover:shadow-md"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
              </span>

              <div className="mt-3 flex-1">
                <p className="text-sm font-semibold text-slate-900">{name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{p[locationKey]}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{description}</p>
              </div>

              <ul className="mt-3 space-y-1 border-t border-slate-50 pt-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-1.5 text-xs text-slate-500">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-xl font-bold text-slate-900">${service.price}</span>
                <span className="text-xs text-slate-400">{p[unitKey]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional services preview */}
      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {isFr ? 'Également disponible' : 'Also available'}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {ALSO_AVAILABLE.map((item) => (
            <span
              key={item.labelEn}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
            >
              {isFr ? item.labelFr : item.labelEn}
              <span className="font-semibold text-brand-600">
                {isFr ? item.priceFr : item.priceEn}
              </span>
            </span>
          ))}
        </div>
        <p className="mt-2.5 text-xs text-slate-400">
          {isFr
            ? 'Les animaux supplémentaires sont facturés à un tarif réduit par rapport à votre animal principal.'
            : 'Additional pets are charged at a reduced rate compared to your primary pet.'}
        </p>
      </div>
    </section>
  );
}
