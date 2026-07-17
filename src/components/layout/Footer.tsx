'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/services', label: t.nav.services },
    { href: '/reviews', label: t.nav.reviews },
    { href: '/gallery', label: t.nav.gallery },
    { href: '/contact', label: t.nav.contact },
    { href: '/booking', label: t.nav.bookNow },
  ];

  return (
    <footer className="relative border-t border-line bg-bg text-ink">
      {/* Paw-print doodle, ported from design-reference/Pet Loft Mtl.dc.html */}
      <svg
        viewBox="0 -3 120 43"
        width="88"
        height="31"
        fill="var(--color-ink)"
        stroke="none"
        aria-hidden="true"
        className="absolute right-8 top-10 opacity-70"
        style={{ transform: 'rotate(-6deg)' }}
      >
        <ellipse cx="14" cy="34" rx="6" ry="4.5" />
        <circle cx="8" cy="26" r="2" />
        <circle cx="14" cy="23" r="2" />
        <circle cx="20" cy="26" r="2" />
        <ellipse cx="55" cy="22" rx="6" ry="4.5" />
        <circle cx="49" cy="14" r="2" />
        <circle cx="55" cy="11" r="2" />
        <circle cx="61" cy="14" r="2" />
        <ellipse cx="96" cy="10" rx="6" ry="4.5" />
        <circle cx="90" cy="2" r="2" />
        <circle cx="96" cy="-1" r="2" />
        <circle cx="102" cy="2" r="2" />
      </svg>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-[var(--font-playfair)] text-2xl font-semibold italic">
                Montreal
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-sage-deep">
                Pet Care
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t.footer.tagline}
            </p>
            <p className="mt-4 text-sm text-faint">{t.footer.madeWith}</p>
          </div>

          {/* Quick links column */}
          <div>
            <h3 className="eyebrow">{t.footer.quickLinks}</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="eyebrow">{t.footer.contactTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${t.contact.emailValue}`}
                  className="transition-colors hover:text-ink"
                >
                  {t.contact.emailValue}
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  {t.contact.instagramValue}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-line pt-6 text-center text-xs tracking-[0.06em] text-faint">
          © {year} Montreal Pet Care — Luna Larrazabal. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
