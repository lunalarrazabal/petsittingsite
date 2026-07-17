'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { services, longTermRates } from '@/data/services';
import PricingCard from '@/components/services/PricingCard';
import Button from '@/components/ui/Button';
import type { Service } from '@/types';

function AddonCard({ service, language }: { service: Service; language: 'en' | 'fr' }) {
  const name = language === 'en' ? service.nameEn : service.nameFr;
  const description = language === 'en' ? service.descriptionEn : service.descriptionFr;

  return (
    <div className="flex items-center justify-between gap-4 border border-line bg-bg px-5 py-4">
      <div className="min-w-0">
        <p className="text-sm text-ink">{name}</p>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-[var(--font-playfair)] text-xl text-ink">${service.price}</p>
        <p className="text-xs text-faint">{service.unit}</p>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[var(--font-playfair)] text-xl text-ink sm:text-2xl">
      {children}
    </h2>
  );
}

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
        <p className="eyebrow">{s.badge}</p>
        <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-medium text-ink sm:text-5xl">
          {s.title}
        </h1>
        <p className="mt-4 text-base text-muted">{s.subtitle}</p>
      </div>

      <div className="mx-auto mt-12 max-w-6xl space-y-12 px-4 sm:px-6">

        {/* ── Dog Services ─────────────────────────────────────────────────── */}
        <section aria-labelledby="dog-services-heading">
          <SectionHeading>
            <span id="dog-services-heading">Dog Services</span>
          </SectionHeading>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {catServices.map((sv) => (
              <PricingCard key={sv.id} service={sv} />
            ))}
          </div>
        </section>

        {/* ── Long-Term Stay Discount ───────────────────────────────────────── */}
        <section aria-labelledby="longterm-heading">
          <div className="border border-line bg-surface">
            <div className="px-6 py-7 sm:px-8">
              <div className="flex flex-wrap items-center gap-3">
                <h2
                  id="longterm-heading"
                  className="font-[var(--font-playfair)] text-xl text-ink sm:text-2xl"
                >
                  Long-Term Stay Discount
                </h2>
                <span className="eyebrow border border-line px-2 py-1 text-sage-deep">
                  {longTermRates.minimumDays}+ days
                </span>
              </div>

              <div className="mt-5 grid gap-px bg-line sm:grid-cols-2">
                <div className="bg-bg p-5">
                  <p className="text-xs uppercase tracking-[0.08em] text-faint">Dog Boarding</p>
                  <p className="mt-1.5 font-[var(--font-playfair)] text-2xl text-ink">
                    ${longTermRates.dogBoardingWeekly}
                    <span className="text-sm font-normal text-faint"> / week</span>
                  </p>
                  <p className="mt-1 text-xs text-faint">
                    vs. ${services.find((sv) => sv.id === 'dog-boarding')?.price}/night standard
                  </p>
                </div>
                <div className="bg-bg p-5">
                  <p className="text-xs uppercase tracking-[0.08em] text-faint">Cat Boarding</p>
                  <p className="mt-1.5 font-[var(--font-playfair)] text-2xl text-ink">
                    ${longTermRates.catBoardingWeekly}
                    <span className="text-sm font-normal text-faint"> / week</span>
                  </p>
                  <p className="mt-1 text-xs text-faint">
                    vs. ${services.find((sv) => sv.id === 'cat-boarding')?.price}/night standard
                  </p>
                </div>
              </div>

              <p className="mt-5 text-xs text-muted">
                Perfect for vacations and extended trips. Discounted weekly pricing is
                automatically applied for eligible bookings.
              </p>
            </div>
          </div>
        </section>

        {/* ── Additional Pets ───────────────────────────────────────────────── */}
        <section aria-labelledby="addons-heading">
          <SectionHeading>
            <span id="addons-heading">Additional Pets</span>
          </SectionHeading>
          <p className="mt-1.5 text-sm text-muted">
            Add extra pets to your existing booking at a reduced rate.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
          <p className="mt-1.5 text-sm text-muted">
            Optional pick-up and drop-off services available within the Montreal area.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {transportServices.map((sv) => (
              <AddonCard key={sv.id} service={sv} language={language} />
            ))}
          </div>
        </section>

      </div>

      {/* Bottom CTA */}
      <div className="mx-auto mt-12 max-w-2xl px-4 text-center sm:px-6">
        <div className="border border-line bg-surface px-8 py-10">
          <h2 className="font-[var(--font-playfair)] text-2xl text-ink">
            Not sure which service fits?
          </h2>
          <p className="mt-2 text-sm text-muted">
            Send me a message and I&apos;ll help you find the best option for your pet.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button href="/booking" size="lg">Book a Service</Button>
            <Button href="/contact" variant="underline">Ask a Question</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
