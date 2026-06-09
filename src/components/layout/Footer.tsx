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
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-white">
              <span className="text-2xl" aria-hidden="true">🐾</span>
              <span className="font-[var(--font-playfair)] text-lg font-bold">
                Montreal <span className="text-rose-400">Pet Care</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-400">
              {t.footer.tagline}
            </p>
            <p className="mt-4 text-sm text-stone-500">
              {t.footer.madeWith}
            </p>
          </div>

          {/* Quick links column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-200">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-stone-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-200">
              {t.footer.contactTitle}
            </h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li>
                <a
                  href={`mailto:${t.contact.emailValue}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <span aria-hidden="true">✉️</span>
                  {t.contact.emailValue}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t.contact.phoneValue.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <span aria-hidden="true">📞</span>
                  {t.contact.phoneValue}
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <span aria-hidden="true">📸</span>
                  {t.contact.instagramValue}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-stone-700 pt-6 text-center text-xs text-stone-500">
          © {year} Montreal Pet Care — Luna Larrazabal. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
