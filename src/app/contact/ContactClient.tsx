'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactClient() {
  const { t } = useLanguage();
  const c = t.contact;

  const contactDetails = [
    { icon: '✉️', label: c.emailLabel, value: c.emailValue, href: `mailto:${c.emailValue}` },
    { icon: '📞', label: c.phoneLabel, value: c.phoneValue, href: `tel:${c.phoneValue.replace(/\s/g, '')}` },
    { icon: '📸', label: c.instagramLabel, value: c.instagramValue, href: 'https://instagram.com' },
  ];

  return (
    <div className="py-16 sm:py-20">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-700">
          {c.badge}
        </span>
        <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-bold text-stone-900 sm:text-5xl">
          {c.title}
        </h1>
        <p className="mt-4 text-lg text-stone-500">{c.subtitle}</p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        {/* Left column: contact info + map */}
        <div className="space-y-8">
          {/* Contact details cards */}
          <div className="space-y-3">
            {contactDetails.map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100 transition-shadow hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-xl">
                  {icon}
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                    {label}
                  </p>
                  <p className="font-medium text-stone-900">{value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Service area */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
            <h2 className="font-[var(--font-playfair)] text-xl font-bold text-stone-900">
              📍 {c.areaTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              {c.areaDescription}
            </p>

            {/* OpenStreetMap embed — free, no API key needed */}
            <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-stone-100">
              <iframe
                title="Montreal service area map"
                width="100%"
                height="200"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-73.6503%2C45.4955%2C-73.5503%2C45.5555&layer=mapnik&marker=45.5255%2C-73.6003"
                className="block"
                loading="lazy"
              />
            </div>
            <p className="mt-2 text-right text-xs text-stone-400">
              © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:underline">OpenStreetMap</a> contributors
            </p>
          </div>
        </div>

        {/* Right column: contact form */}
        <div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100 sm:p-8">
            <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-stone-900">
              Send a Message
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              I typically reply within 24 hours.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
