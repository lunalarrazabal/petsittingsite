// layout.tsx is the "frame" that wraps every page on the site.
// Whatever is here — Navbar, Footer, fonts — appears on ALL pages.

import type { Metadata } from 'next';
import { Jost, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Jost is a clean geometric sans-serif used for body text and UI chrome.
// Kept under the `--font-inter` variable name so every existing
// `font-[var(--font-inter)]` reference picks it up automatically.
const inter = Jost({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

// Cormorant Garamond is the editorial serif used for headings and quotes.
// Kept under the `--font-playfair` variable name for the same reason.
const playfair = Cormorant_Garamond({
  variable: '--font-playfair',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

// This metadata appears in browser tabs and Google search results.
// Each page can override these with its own metadata (see services/page.tsx, etc.)
export const metadata: Metadata = {
  title: {
    default: 'Montreal Pet Care | Professional Pet Sitting by Luna Larrazabal',
    template: '%s | Montreal Pet Care',
  },
  description:
    'Professional, loving pet care in Montreal. Pet boarding ($40/night), doggy day care ($40/day), and dog walking ($28/walk) by Luna Larrazabal. Serving Plateau-Mont-Royal, Mile End, Rosemont & more.',
  keywords: [
    'pet sitter Montreal',
    'dog walker Montreal',
    'cat sitter Montreal',
    'pet boarding Montreal',
    'pet care Montreal',
    'gardienne animaux Montréal',
    'promenade chien Montréal',
  ],
  authors: [{ name: 'Luna Larrazabal' }],
  creator: 'Luna Larrazabal',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    alternateLocale: 'fr_CA',
    siteName: 'Montreal Pet Care',
    title: 'Montreal Pet Care | Professional Pet Sitting',
    description:
      'Loving, reliable pet care in Montreal. Dog walking, overnight sitting, boarding & more.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Montreal Pet Care' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Montreal Pet Care',
    description: 'Professional pet sitting in Montreal by Luna Larrazabal.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)] font-[var(--font-inter)] antialiased">
        {/* Providers gives every component access to the language switcher */}
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
