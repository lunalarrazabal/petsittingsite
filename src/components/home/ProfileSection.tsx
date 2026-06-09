'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import Button from '@/components/ui/Button';

export default function ProfileSection() {
  const { t } = useLanguage();
  const p = t.profile;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        {/* Left column: decorative card with photo placeholder */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="h-72 w-72 overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 to-amber-100 sm:h-80 sm:w-80">
              {/* Profile photo placeholder — replace with <Image> when you have a photo */}
              <div className="flex h-full items-center justify-center text-8xl">
                🐾
              </div>
            </div>

            {/* Floating experience badge */}
            <div className="absolute -bottom-4 -right-4 rounded-2xl bg-white px-5 py-3 shadow-lg ring-1 ring-stone-100">
              <p className="text-2xl font-bold text-rose-600">2+</p>
              <p className="text-xs text-stone-500 leading-tight">Years of<br/>Experience</p>
            </div>

            {/* Floating pets badge */}
            <div className="absolute -left-4 -top-4 rounded-2xl bg-white px-5 py-3 shadow-lg ring-1 ring-stone-100">
              <p className="text-2xl font-bold text-rose-600">50+</p>
              <p className="text-xs text-stone-500 leading-tight">Happy<br/>Pets</p>
            </div>
          </div>
        </div>

        {/* Right column: bio text */}
        <div>
          <span className="rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-700">
            {p.badge}
          </span>

          <h2 className="mt-4 font-[var(--font-playfair)] text-3xl font-bold text-stone-900 sm:text-4xl">
            {p.title}
          </h2>

          <p className="mt-4 leading-relaxed text-stone-500">{p.description1}</p>
          <p className="mt-3 leading-relaxed text-stone-500">{p.description2}</p>

          {/* Certification badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[p.cert1, p.cert2, p.cert3].map((cert) => (
              <span
                key={cert}
                className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200"
              >
                <span aria-hidden="true">✓</span>
                {cert}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <Button href="/booking" size="lg">
              {p.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
