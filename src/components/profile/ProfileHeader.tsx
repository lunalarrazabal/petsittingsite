'use client';

import Image from 'next/image';
import { BadgeCheck, Star } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

// "5.0 · 87 reviews" / "5,0 · 87 avis" — split on the middle dot so the
// stat row can show the number and label separately without hardcoding
// language-specific text.
function splitOnDot(str: string): [string, string] {
  const [value, ...rest] = str.split(' · ');
  return [value ?? str, rest.join(' · ')];
}

// "10 years of experience" / "10 ans d'expérience" — first token is the
// number, the rest is the label.
function splitLeadingValue(str: string): [string, string] {
  const [value, ...rest] = str.split(' ');
  return [value ?? str, rest.join(' ')];
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-[var(--font-playfair)] text-3xl leading-none text-ink sm:text-4xl">
        {value}
      </div>
      <div className="mt-1.5 text-[11px] uppercase tracking-[0.16em] text-faint">{label}</div>
    </div>
  );
}

function StatDivider() {
  return <div className="h-10 w-px shrink-0 bg-line" aria-hidden="true" />;
}

export default function ProfileHeader() {
  const { t } = useLanguage();
  const p = t.homeProfile;
  const tb = t.trustBadges;

  const [ratingValue, ratingLabel] = splitOnDot(p.ratingSummary);
  const [yearsValue, yearsLabel] = splitLeadingValue(p.yearsExperience);
  const [repeatValue, repeatLabel] = splitLeadingValue(p.repeatClients);

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
      <Reveal>
        <p className="eyebrow">{p.location}</p>
        <h1 className="mt-5 font-[var(--font-playfair)] text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          {p.greeting}
          <BadgeCheck
            className="ml-3 inline-block h-7 w-7 align-middle text-sage-deep sm:h-8 sm:w-8"
            aria-hidden="true"
          />
        </h1>
        <p className="mt-5 flex items-center gap-1.5 text-sm font-medium text-muted">
          <Star className="h-4 w-4 fill-sage text-sage" aria-hidden="true" />
          {p.ratingSummary}
        </p>
        <div className="mt-5 max-w-md">
          <p className="eyebrow">{p.betterRates}</p>
          <p className="mt-2 font-[var(--font-playfair)] text-xl text-ink">
            {p.experienceHeading}
          </p>
          <p className="mt-2 text-lg font-light leading-relaxed text-muted">
            {p.experienceBody}
          </p>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-8">
          <Button href="/booking" size="lg">
            {p.bookCta}
          </Button>
          <Button href="/services" variant="underline">
            {t.nav.services}
          </Button>
        </div>

        <div className="mt-14 flex items-center gap-8 sm:gap-10">
          <Stat value={ratingValue} label={ratingLabel} />
          <StatDivider />
          <Stat value={yearsValue} label={yearsLabel} />
          <StatDivider />
          <Stat value={repeatValue} label={repeatLabel} />
        </div>
      </Reveal>

      {/* .frame clips for the hover-zoom effect, so it wraps only the photo
          — the caption card below is a sibling (positioned against this
          plain relative wrapper instead) so it can spill outside the
          photo's edge without being clipped too. */}
      <div className="relative">
        <Reveal className="frame aspect-[4/5] lg:aspect-auto lg:h-[560px]">
          <Image
            src="/images/profile/profile-hero.webp"
            alt={p.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </Reveal>
        <div className="absolute -bottom-6 left-4 max-w-[230px] border border-line bg-surface p-5 sm:-left-8">
          <p className="eyebrow">{tb.meetGreetTitle}</p>
          <p className="mt-1.5 text-sm leading-snug text-muted">{tb.meetGreetSub}</p>
        </div>
      </div>
    </div>
  );
}
