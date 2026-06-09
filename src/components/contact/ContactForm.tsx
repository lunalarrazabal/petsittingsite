'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string; // Hidden spam trap — bots fill this, humans don't
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const { t } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<Status>('idle');

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = c.nameRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = c.emailRequired;
    if (!form.message.trim()) e.message = c.messageRequired;
    if (form.message.trim().length < 10) e.message = c.messageTooShort;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition ${
      errors[field]
        ? 'border-red-400 bg-red-50'
        : 'border-stone-200 bg-white hover:border-stone-300'
    }`;

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 px-8 py-12 text-center ring-1 ring-emerald-100">
        <span className="text-5xl" aria-hidden="true">✅</span>
        <h3 className="mt-4 font-[var(--font-playfair)] text-2xl font-bold text-stone-900">
          {c.successTitle}
        </h3>
        <p className="mt-2 text-stone-500">{c.successText}</p>
        <button
          onClick={() => {
            setStatus('idle');
            setForm({ name: '', email: '', phone: '', message: '', honeypot: '' });
          }}
          className="mt-6 text-sm font-medium text-rose-600 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot — hidden from real users, bots fill it in */}
      <input
        type="text"
        name="website"
        value={form.honeypot}
        onChange={(e) => update('honeypot', e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-stone-700">
          {c.formName} *
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="Your name"
          autoComplete="name"
          className={inputClass('name')}
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-stone-700">
          {c.formEmail} *
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
          className={inputClass('email')}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium text-stone-700">
          {c.formPhone}
        </label>
        <input
          id="contact-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="+1 (514) 000-0000"
          autoComplete="tel"
          className={inputClass('phone')}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-stone-700">
          {c.formMessage} *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Tell me about your pet and what you need…"
          className={`${inputClass('message')} resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {c.errorText}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={status === 'loading'}
      >
        {status === 'loading' ? c.sending : c.formSubmit}
      </Button>
    </form>
  );
}
