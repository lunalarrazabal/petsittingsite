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
      <h2 className="font-[var(--font-playfair)] text-xl font-bold text-slate-900 sm:text-2xl">
        {p.aboutHeading}
      </h2>
      <div className="mt-5 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            {p.communicationHeading}
          </h3>
          <ul className="mt-3 space-y-3">
            {communication.map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-slate-600">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            {p.skillsHeading}
          </h3>
          <ul className="mt-3 space-y-3">
            {skills.map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-slate-600">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
