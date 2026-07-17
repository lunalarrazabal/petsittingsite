'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactClient() {
  const { t } = useLanguage();
  const c = t.contact;

  const contactDetails = [
    { label: c.emailLabel, value: c.emailValue, href: `mailto:${c.emailValue}` },
    { label: c.instagramLabel, value: c.instagramValue, href: 'https://instagram.com' },
  ];

  return (
    <div className="py-10 sm:py-14">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="eyebrow">{c.badge}</p>
        <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-medium text-ink sm:text-5xl">
          {c.title}
        </h1>
        <p className="mt-4 text-base text-muted">{c.subtitle}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        {/* Left column: contact info + map */}
        <div className="space-y-8">
          {/* Contact details */}
          <div className="flex flex-col gap-5">
            {contactDetails.map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="border-t border-line pt-4"
              >
                <p className="eyebrow">{label}</p>
                <p className="mt-1.5 font-[var(--font-playfair)] text-xl text-ink">{value}</p>
              </a>
            ))}
          </div>

          {/* Service area */}
          <div className="border border-line bg-surface p-6">
            <h2 className="font-[var(--font-playfair)] text-xl text-ink">{c.areaTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.areaDescription}</p>

            {/* OpenStreetMap embed — free, no API key needed */}
            <div className="mt-4 border border-line">
              <iframe
                title="Montreal service area map"
                width="100%"
                height="200"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-73.5933%2C45.4846%2C-73.5653%2C45.5026&layer=mapnik"
                className="block"
                loading="lazy"
              />
            </div>
            <p className="mt-2 text-right text-xs text-faint">
              ©{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                OpenStreetMap
              </a>{' '}
              contributors
            </p>
          </div>
        </div>

        {/* Right column: contact form */}
        <div>
          <div className="border border-line bg-bg p-6 sm:p-8">
            <h2 className="font-[var(--font-playfair)] text-2xl text-ink">Send a Message</h2>
            <p className="mt-1 text-sm text-muted">I typically reply within 24 hours.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
