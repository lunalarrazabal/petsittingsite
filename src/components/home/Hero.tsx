'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import Button from '@/components/ui/Button';

// Decorative floating paw prints for the background
function PawPrint({ className }: { className: string }) {
  return (
    <span
      className={`pointer-events-none select-none text-rose-200 opacity-60 ${className}`}
      aria-hidden="true"
    >
      🐾
    </span>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50 py-20 lg:py-28">
      {/* Decorative background paw prints */}
      <PawPrint className="absolute left-[5%] top-[10%] text-5xl" />
      <PawPrint className="absolute right-[8%] top-[15%] text-3xl" />
      <PawPrint className="absolute left-[15%] bottom-[20%] text-4xl rotate-12" />
      <PawPrint className="absolute right-[20%] bottom-[10%] text-6xl -rotate-12" />
      <PawPrint className="absolute left-[45%] top-[5%] text-2xl rotate-45" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        {/* Left column: text content */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <div className="inline-block rounded-full bg-rose-100 px-4 py-1.5 text-sm font-medium text-rose-700">
            {h.badge}
          </div>

          {/* Headline */}
          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-bold leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
            {h.title}{' '}
            <span className="relative text-rose-600">
              {h.titleHighlight}
              {/* Underline decoration */}
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 300 8"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 6 Q75 0 150 5 Q225 10 300 4"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  className="text-rose-300"
                />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-relaxed text-stone-500 lg:max-w-xl">
            {h.description}
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href="/booking" size="lg">
              {h.cta}
            </Button>
            <Button href="/services" variant="outline" size="lg">
              {h.ctaSecondary}
            </Button>
          </div>
        </div>

        {/* Right column: profile card */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-sm">
            {/* Main card */}
            <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-100">
              {/* Avatar */}
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-rose-100 text-6xl shadow-inner">
                🐾
              </div>

              {/* Name + title */}
              <div className="mt-4 text-center">
                <p className="font-[var(--font-playfair)] text-xl font-semibold text-stone-900">
                  Luna Larrazabal
                </p>
                <p className="mt-0.5 text-sm text-stone-500">
                  Professional Pet Sitter · Montréal
                </p>
                {/* Stars */}
                <div className="mt-2 flex justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg" aria-hidden="true">★</span>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="mt-6 grid grid-cols-3 divide-x divide-stone-100 rounded-2xl bg-stone-50 py-4">
                {[
                  { value: h.stat1Value, label: h.stat1Label },
                  { value: h.stat2Value, label: h.stat2Label },
                  { value: h.stat3Value, label: h.stat3Label },
                ].map(({ value, label }) => (
                  <div key={label} className="px-2 text-center">
                    <p className="text-lg font-bold text-rose-600">{value}</p>
                    <p className="mt-0.5 text-xs text-stone-500 leading-tight">{label}</p>
                  </div>
                ))}
              </div>

              {/* Certification badges */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {[t.profile.cert1, t.profile.cert2, t.profile.cert3].map((cert) => (
                  <span
                    key={cert}
                    className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating emoji decorations */}
            <span
              className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-2xl shadow-md"
              aria-hidden="true"
            >
              🐶
            </span>
            <span
              className="absolute -bottom-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-2xl shadow-md"
              aria-hidden="true"
            >
              🐱
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
