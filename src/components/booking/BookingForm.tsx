'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import { services } from '@/data/services';
import AvailabilityCalendar from './AvailabilityCalendar';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  petName: string;
  petType: string;
  service: string;
  date: string;
  endDate: string;
  instructions: string;
  honeypot: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function BookingForm() {
  const { t, language } = useLanguage();
  const b = t.booking;

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petType: '',
    service: '',
    date: '',
    endDate: '',
    instructions: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, photo: b.photoTooLarge }));
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
    setErrors((prev) => ({ ...prev, photo: '' }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = b.nameRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = b.emailRequired;
    if (!form.phone.trim()) e.phone = b.phoneRequired;
    if (!form.petName.trim()) e.petName = b.petNameRequired;
    if (!form.petType) e.petType = b.petTypeRequired;
    if (!form.service) e.service = b.serviceRequired;
    if (!form.date) e.date = b.dateRequired;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      const fd = new FormData();
      (Object.keys(form) as (keyof FormData)[]).forEach((key) =>
        fd.append(key, form[key])
      );
      if (photoFile) fd.append('photo', photoFile);

      const res = await fetch('/api/booking', { method: 'POST', body: fd });
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
      <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 px-8 py-14 text-center ring-1 ring-emerald-100">
        <span className="text-6xl" aria-hidden="true">🎉</span>
        <h3 className="mt-4 font-[var(--font-playfair)] text-2xl font-bold text-stone-900">
          {b.successTitle}
        </h3>
        <p className="mt-2 max-w-sm text-stone-500">{b.successText}</p>
        <button
          onClick={() => {
            setStatus('idle');
            setForm({ name: '', email: '', phone: '', petName: '', petType: '', service: '', date: '', endDate: '', instructions: '', honeypot: '' });
            setPhotoFile(null);
            setPhotoPreview(null);
          }}
          className="mt-6 text-sm font-medium text-rose-600 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot spam trap */}
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

      {/* Availability Calendar */}
      <AvailabilityCalendar
        selectedDate={form.date}
        onDateSelect={(date) => update('date', date)}
        error={errors.date}
      />

      {/* Two-column grid for name / email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-name" className="mb-1 block text-sm font-medium text-stone-700">
            {b.formName} *
          </label>
          <input
            id="bk-name"
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Luna Larrazabal"
            autoComplete="name"
            className={inputClass('name')}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="bk-email" className="mb-1 block text-sm font-medium text-stone-700">
            {b.formEmail} *
          </label>
          <input
            id="bk-email"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@email.com"
            autoComplete="email"
            className={inputClass('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="bk-phone" className="mb-1 block text-sm font-medium text-stone-700">
          {b.formPhone} *
        </label>
        <input
          id="bk-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="+1 (514) 000-0000"
          autoComplete="tel"
          className={inputClass('phone')}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
      </div>

      {/* Pet name / Pet type */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-pet-name" className="mb-1 block text-sm font-medium text-stone-700">
            {b.formPetName} *
          </label>
          <input
            id="bk-pet-name"
            type="text"
            value={form.petName}
            onChange={(e) => update('petName', e.target.value)}
            placeholder="Buddy"
            className={inputClass('petName')}
          />
          {errors.petName && <p className="mt-1 text-xs text-red-600">{errors.petName}</p>}
        </div>

        <div>
          <label htmlFor="bk-pet-type" className="mb-1 block text-sm font-medium text-stone-700">
            {b.formPetType} *
          </label>
          <select
            id="bk-pet-type"
            value={form.petType}
            onChange={(e) => update('petType', e.target.value)}
            className={inputClass('petType')}
          >
            <option value="">{b.selectPetType}</option>
            {b.petTypes.map((pt) => (
              <option key={pt} value={pt}>{pt}</option>
            ))}
          </select>
          {errors.petType && <p className="mt-1 text-xs text-red-600">{errors.petType}</p>}
        </div>
      </div>

      {/* Service selection */}
      <div>
        <label htmlFor="bk-service" className="mb-1 block text-sm font-medium text-stone-700">
          {b.formService} *
        </label>
        <select
          id="bk-service"
          value={form.service}
          onChange={(e) => update('service', e.target.value)}
          className={inputClass('service')}
        >
          <option value="">{b.selectService}</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {language === 'en' ? s.nameEn : s.nameFr} — ${s.price} / {s.unit}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-xs text-red-600">{errors.service}</p>}
      </div>

      {/* End date — only shown for multi-day services */}
      {['overnight-sitting', 'boarding'].includes(form.service) && (
        <div>
          <label htmlFor="bk-end-date" className="mb-1 block text-sm font-medium text-stone-700">
            {b.formEndDate}
          </label>
          <input
            id="bk-end-date"
            type="date"
            value={form.endDate}
            min={form.date || undefined}
            onChange={(e) => update('endDate', e.target.value)}
            className={inputClass('endDate')}
          />
        </div>
      )}

      {/* Special instructions */}
      <div>
        <label htmlFor="bk-instructions" className="mb-1 block text-sm font-medium text-stone-700">
          {b.formInstructions}
        </label>
        <textarea
          id="bk-instructions"
          rows={4}
          value={form.instructions}
          onChange={(e) => update('instructions', e.target.value)}
          placeholder="Allergies, medications, favourite toys, feeding schedule…"
          className={`${inputClass('instructions')} resize-none`}
        />
      </div>

      {/* Pet photo upload */}
      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">
          {b.formPhoto}
        </label>
        <p className="mb-2 text-xs text-stone-400">{b.formPhotoHint}</p>

        {photoPreview ? (
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl">
              <Image
                src={photoPreview}
                alt="Pet photo preview"
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-medium text-rose-600 hover:underline"
            >
              {b.formPhotoChange}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-200 px-4 py-6 text-sm text-stone-400 transition-colors hover:border-rose-300 hover:text-rose-500"
          >
            <span className="text-xl" aria-hidden="true">📷</span>
            Click to upload a photo of your pet
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handlePhotoChange}
          className="hidden"
          aria-label="Upload pet photo"
        />
        {errors.photo && <p className="mt-1 text-xs text-red-600">{errors.photo}</p>}
      </div>

      {status === 'error' && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {b.errorText}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={status === 'loading'}
      >
        {status === 'loading' ? b.sending : b.formSubmit}
      </Button>
    </form>
  );
}
