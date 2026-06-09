'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { services } from '@/data/services';

export default function ServicesPreview() {
  const { t, language } = useLanguage();
  const s = t.servicesPreview;

  // Show only the first 4 services on the home page
  const preview = services.slice(0, 4);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center">
          <span className="rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-700">
            {s.badge}
          </span>
          <h2 className="mt-4 font-[var(--font-playfair)] text-3xl font-bold text-stone-900 sm:text-4xl">
            {s.title}
          </h2>
          <p className="mt-3 text-stone-500 sm:text-lg">{s.subtitle}</p>
        </div>

        {/* Service cards grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((service) => (
            <Link
              key={service.id}
              href="/services"
              className="group rounded-2xl border border-stone-100 bg-stone-50 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-rose-200 hover:bg-white hover:shadow-lg"
            >
              <span className="text-4xl" aria-hidden="true">
                {service.icon}
              </span>
              <h3 className="mt-3 font-semibold text-stone-900 group-hover:text-rose-600 transition-colors">
                {language === 'en' ? service.nameEn : service.nameFr}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
                {language === 'en' ? service.descriptionEn : service.descriptionFr}
              </p>
              <p className="mt-4 text-lg font-bold text-rose-600">
                ${service.price}
                <span className="text-sm font-normal text-stone-400">
                  {' '}
                  / {service.unit}
                </span>
              </p>
            </Link>
          ))}
        </div>

        {/* Link to full services page */}
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center font-semibold text-rose-600 transition-colors hover:text-rose-700"
          >
            {s.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
