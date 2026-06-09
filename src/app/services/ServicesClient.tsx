'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { services } from '@/data/services';
import PricingCard from '@/components/services/PricingCard';
import Button from '@/components/ui/Button';

export default function ServicesClient() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <div className="py-16 sm:py-20">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-700">
          {s.badge}
        </span>
        <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-bold text-stone-900 sm:text-5xl">
          {s.title}
        </h1>
        <p className="mt-4 text-lg text-stone-500">{s.subtitle}</p>
      </div>

      {/* Pricing cards grid */}
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {services.map((service) => (
          <PricingCard key={service.id} service={service} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto mt-16 max-w-2xl px-4 text-center sm:px-6">
        <div className="rounded-3xl bg-rose-50 px-8 py-10">
          <p className="text-2xl">🐾</p>
          <h2 className="mt-2 font-[var(--font-playfair)] text-2xl font-bold text-stone-900">
            Not sure which service fits?
          </h2>
          <p className="mt-2 text-stone-500">
            Send me a message and I&apos;ll help you find the best option for your pet.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/booking" size="lg">Book a Service</Button>
            <Button href="/contact" variant="outline" size="lg">Ask a Question</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
