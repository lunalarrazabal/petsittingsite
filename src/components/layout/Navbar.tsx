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

  // Add a subtle shadow to the navbar once the user scrolls down 10px
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
      className={`sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo / Business Name */}
        <Link
          href="/"
          className="flex items-baseline gap-2 text-ink"
        >
          <span className="font-[var(--font-playfair)] text-2xl italic font-semibold tracking-tight">
            Montreal
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-sage-deep">
            Pet Care
          </span>
        </Link>

        {/* Desktop navigation links — hidden on small screens */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`navlink text-xs font-medium uppercase tracking-[0.12em] text-ink ${
                  isActive(href) ? 'on' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: language toggle + CTA button */}
        <div className="flex items-center gap-6">
          {/* EN / FR language toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="text-xs font-medium uppercase tracking-[0.12em] text-ink opacity-55 transition-opacity hover:opacity-100"
            aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
          >
            {language === 'en' ? 'FR' : 'EN'}
          </button>

          {/* Book Now button — desktop only */}
          <Link
            href="/booking"
            className="btn-underline hidden text-ink md:inline-block"
          >
            {t.nav.bookNow}
          </Link>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-5 bg-ink transition-transform duration-200 ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-5 bg-ink transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-px w-5 bg-ink transition-transform duration-200 ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="border-t border-line bg-surface md:hidden">
          <ul className="flex flex-col divide-y divide-line">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-6 py-3.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                    isActive(href)
                      ? 'bg-brand-50 text-sage-deep'
                      : 'text-ink hover:bg-brand-50/50'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/booking"
                className="btn-solid block px-6 py-3.5 text-center text-xs font-medium uppercase tracking-[0.12em]"
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
