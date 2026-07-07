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

// Show only primary (dog + cat) services on the homepage.
const primaryServices = services.filter(
  (s) => s.category === 'dog' || s.category === 'cat'
);

export default function HomeServicesSection() {
  const { t, language } = useLanguage();
  const p = t.homeProfile;

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-slate-900 sm:text-3xl">
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {primaryServices.map((service) => {
          const { Icon, locationKey, unitKey } = getServiceMeta(service.id);
          const name        = language === 'en' ? service.nameEn        : service.nameFr;
          const description = language === 'en' ? service.descriptionEn : service.descriptionFr;
          const features    = language === 'en' ? service.featuresEn    : service.featuresFr;

          return (
            <div
              key={service.id}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-shadow duration-200 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>

              <div className="mt-4 flex-1">
                <p className="font-semibold text-slate-900">{name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{p[locationKey]}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
              </div>

              <ul className="mt-4 space-y-1.5 border-t border-slate-50 pt-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-slate-900">${service.price}</span>
                <span className="text-sm text-slate-400">{p[unitKey]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
