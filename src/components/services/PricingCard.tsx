'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { type Service } from '@/types';
import Button from '@/components/ui/Button';
import { DogFaceIcon, TerrierIcon, WalkingIcon, CatIcon } from '@/components/icons/PetIcons';
import type { Translations } from '@/i18n/translations';

type HomeProfile = Translations['homeProfile'];

function getServiceMeta(id: string): { Icon: typeof DogFaceIcon; locationKey: keyof HomeProfile } {
  switch (id) {
    case 'dog-daycare':  return { Icon: TerrierIcon, locationKey: 'doggyDaycareLocation' };
    case 'dog-walking':  return { Icon: WalkingIcon, locationKey: 'dogWalkingLocation' };
    case 'cat-boarding': return { Icon: CatIcon,      locationKey: 'boardingLocation' };
    default:             return { Icon: DogFaceIcon,  locationKey: 'boardingLocation' };
  }
}

interface PricingCardProps {
  service: Service;
}

export default function PricingCard({ service }: PricingCardProps) {
  const { t, language } = useLanguage();
  const s = t.services;
  const p = t.homeProfile;
  const { Icon, locationKey } = getServiceMeta(service.id);
  const isPopular = !!service.popular;

  const name        = language === 'en' ? service.nameEn        : service.nameFr;
  const description = language === 'en' ? service.descriptionEn : service.descriptionFr;
  const features     = language === 'en' ? service.featuresEn    : service.featuresFr;

  return (
    <div
      className={`relative flex flex-col border p-7 ${
        isPopular ? 'border-ochre bg-surface' : 'border-line bg-bg'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3 left-6 bg-bg px-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ochre">
          {s.popular}
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <Icon className="h-10 w-10 text-ink" />
          <h3 className="mt-4 font-[var(--font-playfair)] text-2xl text-ink">{name}</h3>
          <p className="eyebrow mt-1">{p[locationKey]}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-[var(--font-playfair)] text-3xl leading-none text-ink">
            ${service.price}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.08em] text-faint">
            {service.unit}
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted">{description}</p>

      <ul className="mt-5 flex flex-col gap-2.5">
        {features.map((feature) => (
          <li key={feature} className="border-t border-line pt-2.5 text-sm text-muted">
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Button href="/booking" variant="underline">
          {s.bookService}
        </Button>
      </div>
    </div>
  );
}
