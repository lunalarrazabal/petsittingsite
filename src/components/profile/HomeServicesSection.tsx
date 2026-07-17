'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { services } from '@/data/services';
import { DogFaceIcon, TerrierIcon, WalkingIcon, CatIcon } from '@/components/icons/PetIcons';
import type { Translations } from '@/i18n/translations';

type HomeProfile = Translations['homeProfile'];

function getServiceMeta(id: string): {
  Icon: typeof DogFaceIcon;
  locationKey: keyof HomeProfile;
  unitKey: keyof HomeProfile;
} {
  switch (id) {
    case 'dog-daycare':  return { Icon: TerrierIcon, locationKey: 'doggyDaycareLocation', unitKey: 'perDay'   };
    case 'dog-walking':  return { Icon: WalkingIcon, locationKey: 'dogWalkingLocation',   unitKey: 'perWalk'  };
    case 'cat-boarding': return { Icon: CatIcon,      locationKey: 'boardingLocation',     unitKey: 'perNight' };
    default:             return { Icon: DogFaceIcon,  locationKey: 'boardingLocation',     unitKey: 'perNight' };
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
        <h2 className="font-[var(--font-playfair)] text-2xl font-medium text-ink sm:text-3xl">
          {p.servicesHeading}
        </h2>
        <Link href="/services" className="btn-underline shrink-0 text-ink">
          {p.seeAdditionalRates}
        </Link>
      </div>
      <p className="mt-1 text-sm text-muted">{p.servicesSubtext}</p>

      <div className="mt-6 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {primaryServices.map((service) => {
          const { Icon, locationKey, unitKey } = getServiceMeta(service.id);
          const name        = isFr ? service.nameFr        : service.nameEn;
          const description = isFr ? service.descriptionFr : service.descriptionEn;
          const features    = isFr ? service.featuresFr    : service.featuresEn;

          return (
            <div key={service.id} className="flex flex-col bg-surface p-6">
              <Icon className="h-9 w-9 text-ink" />

              <div className="mt-4 flex-1">
                <p className="font-[var(--font-playfair)] text-xl text-ink">{name}</p>
                <p className="eyebrow mt-1">{p[locationKey]}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted">{description}</p>
              </div>

              <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-3">
                {features.map((feature) => (
                  <li key={feature} className="text-xs leading-relaxed text-muted">
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-lg text-ink">${service.price}</span>
                <span className="text-xs uppercase tracking-[0.08em] text-faint">{p[unitKey]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional services preview */}
      <div className="mt-6 border border-line bg-surface px-5 py-5 sm:px-6">
        <p className="eyebrow">{isFr ? 'Également disponible' : 'Also available'}</p>
        <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
          {ALSO_AVAILABLE.map((item) => (
            <span key={item.labelEn} className="flex items-baseline gap-1.5 text-sm text-muted">
              {isFr ? item.labelFr : item.labelEn}
              <span className="font-semibold text-sage-deep">
                {isFr ? item.priceFr : item.priceEn}
              </span>
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-faint">
          {isFr
            ? 'Les animaux supplémentaires sont facturés à un tarif réduit par rapport à votre animal principal.'
            : 'Additional pets are charged at a reduced rate compared to your primary pet.'}
        </p>
      </div>
    </section>
  );
}
