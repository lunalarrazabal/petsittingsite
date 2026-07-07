'use client';

import {
  PlusCircle,
  Car,
  CalendarDays,
  Tag,
  Check,
  PawPrint,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { services, longTermRates } from '@/data/services';
import PricingCard from '@/components/services/PricingCard';
import Button from '@/components/ui/Button';
import type { Service } from '@/types';

// ─── Compact add-on card for supplementary services ────────────────────────

function getAddonIcon(id: string): LucideIcon {
  if (id === 'pickup' || id === 'dropoff') return Car;
  return PlusCircle;
}

function AddonCard({ service, language }: { service: Service; language: 'en' | 'fr' }) {
  const Icon = getAddonIcon(service.id);
  const name = language === 'en' ? service.nameEn : service.nameFr;
  const description = language === 'en' ? service.descriptionEn : service.descriptionFr;

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition-shadow duration-200 hover:shadow-md">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900">{name}</p>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-xl font-bold text-slate-900">${service.price}</p>
        <p className="text-xs text-slate-400">{service.unit}</p>
      </div>
    </div>
  );
}

// ─── Section heading ────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-slate-900 sm:text-3xl">
      {children}
    </h2>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function ServicesClient() {
  const { t, language } = useLanguage();
  const s = t.services;

  const dogServices       = services.filter((sv) => sv.category === 'dog');
  const catServices       = services.filter((sv) => sv.category === 'cat');
  const addonServices     = services.filter((sv) => sv.category === 'addon');
  const transportServices = services.filter((sv) => sv.category === 'transport');

  return (
    <div className="py-10 sm:py-14">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="rounded-full bg-brand-100 px-4 py-1 text-sm font-medium text-brand-700">
          {s.badge}
        </span>
        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-bold text-slate-900 sm:text-5xl">
          {s.title}
        </h1>
        <p className="mt-3 text-lg text-slate-500">{s.subtitle}</p>
      </div>

      <div className="mx-auto mt-10 max-w-6xl space-y-12 px-4 sm:px-6">

        {/* ── Dog Services ─────────────────────────────────────────────────── */}
        <section aria-labelledby="dog-services-heading">
          <SectionHeading>
            <span id="dog-services-heading">Dog Services</span>
          </SectionHeading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dogServices.map((sv) => (
              <PricingCard key={sv.id} service={sv} />
            ))}
          </div>
        </section>

        {/* ── Cat Services ─────────────────────────────────────────────────── */}
        <section aria-labelledby="cat-services-heading">
          <SectionHeading>
            <span id="cat-services-heading">Cat Services</span>
          </SectionHeading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catServices.map((sv) => (
              <PricingCard key={sv.id} service={sv} />
            ))}
          </div>
        </section>

        {/* ── Long-Term Stay Discount ───────────────────────────────────────── */}
        <section aria-labelledby="longterm-heading">
          <div className="overflow-hidden rounded-3xl bg-brand-50 ring-1 ring-brand-100">
            <div className="px-8 py-8 sm:px-10 sm:py-10">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <CalendarDays className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2
                      id="longterm-heading"
                      className="font-[var(--font-playfair)] text-xl font-bold text-slate-900 sm:text-2xl"
                    >
                      Long-Term Stay Discount
                    </h2>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                      <Tag className="h-3 w-3" aria-hidden="true" />
                      {longTermRates.minimumDays}+ days
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-brand-100">
                      <p className="text-sm font-medium text-slate-500">Dog Boarding</p>
                      <p className="mt-1 text-2xl font-extrabold tracking-tight text-brand-600">
                        ${longTermRates.dogBoardingWeekly}
                        <span className="text-sm font-normal text-slate-400"> / week</span>
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        vs. ${services.find(sv => sv.id === 'dog-boarding')?.price}/night standard
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-brand-100">
                      <p className="text-sm font-medium text-slate-500">Cat Boarding</p>
                      <p className="mt-1 text-2xl font-extrabold tracking-tight text-brand-600">
                        ${longTermRates.catBoardingWeekly}
                        <span className="text-sm font-normal text-slate-400"> / week</span>
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        vs. ${services.find(sv => sv.id === 'cat-boarding')?.price}/night standard
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-2 text-sm text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.5} aria-hidden="true" />
                    <p>
                      Perfect for vacations and extended trips. Discounted weekly pricing is
                      automatically applied for eligible bookings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Additional Pets ───────────────────────────────────────────────── */}
        <section aria-labelledby="addons-heading">
          <SectionHeading>
            <span id="addons-heading">Additional Pets</span>
          </SectionHeading>
          <p className="mt-2 text-slate-500">
            Add extra pets to your existing booking at a reduced rate.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {addonServices.map((sv) => (
              <AddonCard key={sv.id} service={sv} language={language} />
            ))}
          </div>
        </section>

        {/* ── Transportation ────────────────────────────────────────────────── */}
        <section aria-labelledby="transport-heading">
          <SectionHeading>
            <span id="transport-heading">Transportation</span>
          </SectionHeading>
          <p className="mt-2 text-slate-500">
            Optional pick-up and drop-off services available within the Montreal area.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {transportServices.map((sv) => (
              <AddonCard key={sv.id} service={sv} language={language} />
            ))}
          </div>
        </section>

      </div>

      {/* Bottom CTA */}
      <div className="mx-auto mt-12 max-w-2xl px-4 text-center sm:px-6">
        <div className="rounded-3xl bg-slate-50 px-8 py-10 ring-1 ring-slate-100">
          <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
            <PawPrint className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-[var(--font-playfair)] text-2xl font-bold text-slate-900">
            Not sure which service fits?
          </h2>
          <p className="mt-2 text-slate-500">
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
