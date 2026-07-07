'use client';

import {
  Home,
  Sun,
  Footprints,
  Moon,
  PlusCircle,
  Car,
  Star,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { type Service } from '@/types';
import Button from '@/components/ui/Button';

function getIcon(id: string): LucideIcon {
  switch (id) {
    case 'dog-daycare':  return Sun;
    case 'dog-walking':  return Footprints;
    case 'cat-boarding': return Moon;
    case 'additional-dog':
    case 'additional-cat': return PlusCircle;
    case 'pickup':
    case 'dropoff':      return Car;
    default:             return Home;
  }
}

interface PricingCardProps {
  service: Service;
}

export default function PricingCard({ service }: PricingCardProps) {
  const { t, language } = useLanguage();
  const s = t.services;
  const Icon = getIcon(service.id);

  const name        = language === 'en' ? service.nameEn        : service.nameFr;
  const description = language === 'en' ? service.descriptionEn : service.descriptionFr;

  const isPopular = !!service.popular;

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-5 shadow-sm ring-1 transition-shadow duration-200 hover:shadow-md ${
        isPopular
          ? 'bg-blue-600 text-white ring-blue-500'
          : 'bg-white text-slate-900 ring-slate-100'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white px-4 py-1 text-xs font-bold text-blue-600 shadow">
          <Star className="h-3 w-3 fill-blue-500 text-blue-500" aria-hidden="true" />
          {s.popular}
        </span>
      )}

      {/* Icon */}
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          isPopular ? 'bg-blue-500' : 'bg-brand-50 text-brand-700'
        }`}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>

      {/* Name */}
      <h3
        className={`mt-3 font-[var(--font-playfair)] text-lg font-bold ${
          isPopular ? 'text-white' : 'text-slate-900'
        }`}
      >
        {name}
      </h3>

      {/* Description */}
      <p
        className={`mt-1.5 flex-1 text-sm leading-relaxed ${
          isPopular ? 'text-blue-100' : 'text-slate-500'
        }`}
      >
        {description}
      </p>

      {/* Price */}
      <div className="mt-4">
        <p
          className={`text-2xl font-extrabold tracking-tight ${
            isPopular ? 'text-white' : 'text-brand-600'
          }`}
        >
          ${service.price}
          <span
            className={`text-sm font-normal tracking-normal ${
              isPopular ? 'text-blue-200' : 'text-slate-400'
            }`}
          >
            {' '}/ {service.unit}
          </span>
        </p>
      </div>

      {/* CTA */}
      <div className="mt-4">
        <Button
          href="/booking"
          variant={isPopular ? 'ghost' : 'outline'}
          fullWidth
          className={isPopular ? 'bg-white text-blue-600 hover:bg-blue-50' : ''}
        >
          {s.bookService}
        </Button>
      </div>
    </div>
  );
}
