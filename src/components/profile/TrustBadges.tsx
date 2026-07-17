'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import type { Translations } from '@/i18n/translations';

type TrustBadgesT = Translations['trustBadges'];

const BADGE_KEYS: Array<[keyof TrustBadgesT, keyof TrustBadgesT]> = [
  ['experienceTitle', 'experienceSub'],
  ['meetGreetTitle', 'meetGreetSub'],
  ['topRatedTitle', 'topRatedSub'],
  ['photoUpdatesTitle', 'photoUpdatesSub'],
  ['fastResponseTitle', 'fastResponseSub'],
  ['flexibleTitle', 'flexibleSub'],
];

export default function TrustBadges() {
  const { t } = useLanguage();
  const tb = t.trustBadges;

  return (
    <section aria-label="Why choose Luna" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
          {BADGE_KEYS.map(([titleKey, subKey]) => (
            <div key={titleKey} className="bg-surface px-5 py-7 sm:px-6 sm:py-8">
              <dt className="font-[var(--font-playfair)] text-lg text-ink sm:text-xl">
                {tb[titleKey]}
              </dt>
              <dd className="mt-1.5 text-xs leading-relaxed text-muted">{tb[subKey]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
