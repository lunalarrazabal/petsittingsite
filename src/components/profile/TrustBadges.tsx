'use client';

import { Award, Users, Star, Camera, Clock, CalendarDays } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { LucideIcon } from 'lucide-react';

interface Badge {
  Icon: LucideIcon;
  titleKey: keyof ReturnType<typeof useTrustBadges>;
  subKey: keyof ReturnType<typeof useTrustBadges>;
}

function useTrustBadges() {
  const { t } = useLanguage();
  return t.trustBadges;
}

const BADGES: Badge[] = [
  { Icon: Award,       titleKey: 'experienceTitle', subKey: 'experienceSub'   },
  { Icon: Users,       titleKey: 'meetGreetTitle',  subKey: 'meetGreetSub'    },
  { Icon: Star,        titleKey: 'topRatedTitle',   subKey: 'topRatedSub'     },
  { Icon: Camera,      titleKey: 'photoUpdatesTitle', subKey: 'photoUpdatesSub' },
  { Icon: Clock,       titleKey: 'fastResponseTitle', subKey: 'fastResponseSub' },
  { Icon: CalendarDays, titleKey: 'flexibleTitle',  subKey: 'flexibleSub'     },
];

export default function TrustBadges() {
  const tb = useTrustBadges();

  return (
    <section aria-label="Why choose Luna" className="mt-6">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {BADGES.map(({ Icon, titleKey, subKey }) => (
          <div
            key={titleKey}
            className="group flex items-start gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-slate-100/80 transition-all duration-200 hover:shadow-md hover:ring-slate-200"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-200 group-hover:bg-brand-100">
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <dt className="truncate text-sm font-semibold leading-snug text-slate-900">
                {tb[titleKey]}
              </dt>
              <dd className="mt-0.5 text-xs leading-relaxed text-slate-500">
                {tb[subKey]}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
