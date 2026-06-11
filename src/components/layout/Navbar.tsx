'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

// The Navbar is a "Client Component" because it uses:
//   - useState (to open/close the mobile menu)
//   - useEffect (to detect scrolling)
//   - usePathname (to highlight the active page link)
//   - useLanguage (to read and change the language)

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a shadow to the navbar once the user scrolls down 10px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  // Adjusted during render (not in an effect) to avoid an extra
  // post-commit render pass — see https://react.dev/learn/you-might-not-need-an-effect
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/services', label: t.nav.services },
    { href: '/reviews', label: t.nav.reviews },
    { href: '/gallery', label: t.nav.gallery },
    { href: '/contact', label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'border-b border-stone-100'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo / Business Name */}
        <Link href="/" className="flex items-center gap-2 text-stone-900">
          <span className="text-2xl" aria-hidden="true">🐾</span>
          <span className="font-[var(--font-playfair)] text-lg font-bold leading-tight">
            Montreal<br className="hidden" />
            <span className="text-rose-600"> Pet Care</span>
          </span>
        </Link>

        {/* Desktop navigation links — hidden on small screens */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-rose-600'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: language toggle + CTA button */}
        <div className="flex items-center gap-3">
          {/* EN / FR language toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="rounded-full border border-stone-200 px-3 py-1 text-xs font-semibold text-stone-600 transition-colors hover:border-rose-300 hover:text-rose-600"
            aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
          >
            {language === 'en' ? 'FR' : 'EN'}
          </button>

          {/* Book Now button — desktop only */}
          <Link
            href="/booking"
            className="hidden rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700 md:block"
          >
            {t.nav.bookNow}
          </Link>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-5 bg-stone-700 transition-transform duration-200 ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-stone-700 transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-stone-700 transition-transform duration-200 ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="border-t border-stone-100 bg-white md:hidden">
          <ul className="flex flex-col divide-y divide-stone-100">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-6 py-3.5 text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/booking"
                className="block bg-rose-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-rose-700"
              >
                {t.nav.bookNow}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
