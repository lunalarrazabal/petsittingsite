'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { type Service } from '@/types';
import Button from '@/components/ui/Button';

interface PricingCardProps {
  service: Service;
}

export default function PricingCard({ service }: PricingCardProps) {
  const { t, language } = useLanguage();
  const s = t.services;

  const name = language === 'en' ? service.nameEn : service.nameFr;
  const description = language === 'en' ? service.descriptionEn : service.descriptionFr;
  const features = language === 'en' ? service.featuresEn : service.featuresFr;

  return (
    <div
      className={`relative flex flex-col rounded-3xl p-6 shadow-sm ring-1 transition-shadow hover:shadow-lg ${
        service.popular
          ? 'bg-rose-600 text-white ring-rose-500'
          : 'bg-white text-stone-900 ring-stone-100'
      }`}
    >
      {/* "Most popular" badge */}
      {service.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-amber-900 shadow">
          ⭐ {s.popular}
        </span>
      )}

      {/* Icon */}
      <span className="text-4xl" aria-hidden="true">
        {service.icon}
      </span>

      {/* Service name */}
      <h3
        className={`mt-3 font-[var(--font-playfair)] text-xl font-bold ${
          service.popular ? 'text-white' : 'text-stone-900'
        }`}
      >
        {name}
      </h3>

      {/* Description */}
      <p
        className={`mt-2 text-sm leading-relaxed ${
          service.popular ? 'text-rose-100' : 'text-stone-500'
        }`}
      >
        {description}
      </p>

      {/* Price */}
      <div className="mt-4">
        <p
          className={`text-3xl font-extrabold ${
            service.popular ? 'text-white' : 'text-rose-600'
          }`}
        >
          ${service.price}
          <span
            className={`text-sm font-normal ${
              service.popular ? 'text-rose-200' : 'text-stone-400'
            }`}
          >
            {' '}
            / {service.unit}
          </span>
        </p>
      </div>

      {/* Feature list */}
      <ul className="mt-5 flex-1 space-y-2">
        <p
          className={`mb-2 text-xs font-semibold uppercase tracking-wider ${
            service.popular ? 'text-rose-200' : 'text-stone-400'
          }`}
        >
          {s.includes}
        </p>
        {features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2 text-sm ${
              service.popular ? 'text-rose-100' : 'text-stone-600'
            }`}
          >
            <span
              className={`mt-0.5 shrink-0 ${
                service.popular ? 'text-amber-300' : 'text-emerald-500'
              }`}
              aria-hidden="true"
            >
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <div className="mt-6">
        <Button
          href="/booking"
          variant={service.popular ? 'ghost' : 'outline'}
          fullWidth
          className={
            service.popular
              ? 'bg-white text-rose-600 hover:bg-rose-50'
              : ''
          }
        >
          {s.bookService}
        </Button>
      </div>
    </div>
  );
}
