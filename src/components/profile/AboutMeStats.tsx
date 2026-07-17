'use client';

import {
  Repeat,
  MessageCircle,
  Clock,
  Image as ImageIcon,
  Trophy,
  Pill,
  Syringe,
  HeartHandshake,
  Accessibility,
  Activity,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function AboutMeStats() {
  const { t } = useLanguage();
  const p = t.homeProfile;

  const communication = [
    { Icon: Repeat, text: p.repeatClients },
    { Icon: MessageCircle, text: p.responseRate },
    { Icon: Clock, text: p.responseTime },
    { Icon: ImageIcon, text: p.photoUpdates },
  ];

  const skills = [
    { Icon: Trophy, text: p.yearsExperience },
    { Icon: Pill, text: p.oralMeds },
    { Icon: Syringe, text: p.injectedMeds },
    { Icon: HeartHandshake, text: p.seniorDogs },
    { Icon: Accessibility, text: p.specialNeeds },
    { Icon: Activity, text: p.dailyExercise },
  ];

  return (
    <section>
      <h2 className="font-[var(--font-playfair)] text-2xl font-medium text-ink sm:text-3xl">
        {p.aboutHeading}
      </h2>
      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="eyebrow">{p.communicationHeading}</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {communication.map(({ Icon, text }) => (
              <li
                key={text}
                className="flex items-start gap-3 border-t border-line pt-3 text-sm text-muted"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow">{p.skillsHeading}</h3>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {skills.map(({ Icon, text }) => (
              <li
                key={text}
                className="flex items-start gap-3 border-t border-line pt-3 text-sm text-muted"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
