'use client';

import { useLanguage } from '@/i18n/LanguageContext';

export default function SafetyEnvironment() {
  const { t } = useLanguage();
  const p = t.homeProfile;

  const items = [p.envApartment, p.envNoYard, p.envNonSmoking, p.envNoChildren, p.envPottyBreaks];

  return (
    <section>
      <h2 className="font-[var(--font-playfair)] text-2xl font-medium text-ink sm:text-3xl">
        {p.safetyHeading}
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">{p.safetyBody}</p>
      <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {items.map((text) => (
          <li key={text} className="text-sm text-muted">
            <span className="text-sage" aria-hidden="true">
              ·
            </span>{' '}
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
