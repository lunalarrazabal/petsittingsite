'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { services } from '@/data/services';
import DateRangePicker from './DateRangePicker';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  petName: string;
  petType: string;
  date: string;     // check-in
  endDate: string;  // check-out
  instructions: string;
  honeypot: string;
}

type FormErrors = Partial<Record<keyof FormData | 'photo' | 'services', string>>;
type Status = 'idle' | 'loading' | 'success' | 'error';

// Primary service groups shown in the main selector (dog + cat only)
const dogServices = services.filter((s) => s.category === 'dog');
const catServices = services.filter((s) => s.category === 'cat');

const SERVICE_GROUPS = [
  { key: 'dog', labelEn: 'Dog Services', labelFr: 'Services pour chiens', items: dogServices },
  { key: 'cat', labelEn: 'Cat Services', labelFr: 'Services pour chats',  items: catServices },
] as const;

// Additional services shown as secondary checkboxes
const ADDON_OPTIONS = [
  { id: 'additional-dog', labelEn: 'Additional Dog',  labelFr: 'Chien supplémentaire', price: 20, unit: 'night' },
  { id: 'additional-cat', labelEn: 'Additional Cat',  labelFr: 'Chat supplémentaire',  price: 15, unit: 'night' },
  { id: 'pickup',         labelEn: 'Pick-up Service', labelFr: 'Service de ramassage', price: 50, unit: 'one way' },
  { id: 'dropoff',        labelEn: 'Drop-off Service',labelFr: 'Service de livraison', price: 50, unit: 'one way' },
] as const;

export default function BookingForm() {
  const { t, language } = useLanguage();
  const b = t.booking;

  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', petName: '', petType: '',
    date: '', endDate: '', instructions: '', honeypot: '',
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAddons,   setSelectedAddons]   = useState<string[]>([]);
  const [errors,  setErrors]  = useState<FormErrors>({});
  const [status,  setStatus]  = useState<Status>('idle');
  const [photoFile,    setPhotoFile]    = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    if (errors.services) setErrors((prev) => ({ ...prev, services: '' }));
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
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
    const e: FormErrors = {};
    if (!form.name.trim())                                 e.name     = b.nameRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))  e.email    = b.emailRequired;
    if (!form.phone.trim())                                e.phone    = b.phoneRequired;
    if (!form.petName.trim())                              e.petName  = b.petNameRequired;
    if (!form.petType)                                     e.petType  = b.petTypeRequired;
    if (selectedServices.length === 0)                     e.services = b.serviceRequired;
    if (!form.date)                                        e.date     = b.dateRequired;
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
      fd.append('services', selectedServices.join(','));
      if (selectedAddons.length > 0) {
        fd.append('additionalServices', selectedAddons.join(','));
      }
      if (photoFile) fd.append('photo', photoFile);
      const res = await fetch('/api/booking', { method: 'POST', body: fd });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
      errors[field]
        ? 'border-red-400 bg-red-50'
        : 'border-slate-200 bg-white hover:border-slate-300'
    }`;

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 px-8 py-14 text-center ring-1 ring-emerald-100">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-8 w-8 text-emerald-600" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-[var(--font-playfair)] text-2xl font-bold text-slate-900">
          {b.successTitle}
        </h3>
        <p className="mt-2 max-w-sm text-slate-500">{b.successText}</p>
        <button
          onClick={() => {
            setStatus('idle');
            setForm({ name: '', email: '', phone: '', petName: '', petType: '', date: '', endDate: '', instructions: '', honeypot: '' });
            setSelectedServices([]);
            setSelectedAddons([]);
            setPhotoFile(null);
            setPhotoPreview(null);
          }}
          className="mt-6 text-sm font-medium text-brand-600 hover:underline"
        >
          {language === 'en' ? 'Submit another request' : 'Envoyer une autre demande'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot */}
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

      {/* Date range picker */}
      <DateRangePicker
        checkIn={form.date}
        checkOut={form.endDate}
        onRangeChange={(ci, co) => {
          setForm((prev) => ({ ...prev, date: ci, endDate: co }));
          if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
        }}
        error={errors.date}
      />

      {/* Name / Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-name" className="mb-1 block text-sm font-medium text-slate-700">
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
          <label htmlFor="bk-email" className="mb-1 block text-sm font-medium text-slate-700">
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
        <label htmlFor="bk-phone" className="mb-1 block text-sm font-medium text-slate-700">
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
          <label htmlFor="bk-pet-name" className="mb-1 block text-sm font-medium text-slate-700">
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
          <label htmlFor="bk-pet-type" className="mb-1 block text-sm font-medium text-slate-700">
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

      {/* ── Main service multi-select ─────────────────────────────────────── */}
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          {b.formService}{' '}
          <span className="font-normal text-slate-400">
            {language === 'en' ? '(select all that apply)' : '(sélectionner tout ce qui s\'applique)'} *
          </span>
        </p>

        <div
          className={`overflow-hidden rounded-2xl border ${
            errors.services ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
          }`}
        >
          {SERVICE_GROUPS.map((group, gi) => (
            <div key={group.key} className={gi > 0 ? 'border-t border-slate-100' : ''}>
              <div className="bg-slate-50 px-4 py-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {language === 'en' ? group.labelEn : group.labelFr}
                </p>
              </div>
              {group.items.map((svc, si) => {
                const checked = selectedServices.includes(svc.id);
                const name    = language === 'en' ? svc.nameEn : svc.nameFr;
                const isLast  = si === group.items.length - 1;
                return (
                  <label
                    key={svc.id}
                    className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors ${
                      checked ? 'bg-brand-50' : 'hover:bg-slate-50'
                    } ${!isLast ? 'border-b border-slate-100' : ''}`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                        checked ? 'border-brand-600 bg-brand-600' : 'border-slate-300 bg-white'
                      }`}
                      aria-hidden="true"
                    >
                      {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleService(svc.id)}
                      value={svc.id}
                    />
                    <span className="flex-1 text-sm text-slate-700">{name}</span>
                    <span className="shrink-0 text-sm font-semibold text-slate-900">
                      ${svc.price}
                      <span className="ml-0.5 text-xs font-normal text-slate-400">/{svc.unit}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          ))}
        </div>
        {errors.services && (
          <p className="mt-1 text-xs text-red-600">{errors.services}</p>
        )}
      </div>

      {/* ── Additional Services ───────────────────────────────────────────── */}
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          {language === 'en' ? 'Additional Services' : 'Services supplémentaires'}
          <span className="ml-1.5 text-xs font-normal text-slate-400">
            {language === 'en' ? '(optional)' : '(facultatif)'}
          </span>
        </p>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {ADDON_OPTIONS.map((addon, i) => {
            const checked = selectedAddons.includes(addon.id);
            const label   = language === 'en' ? addon.labelEn : addon.labelFr;
            const isLast  = i === ADDON_OPTIONS.length - 1;
            return (
              <label
                key={addon.id}
                className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors ${
                  checked ? 'bg-slate-50' : 'hover:bg-slate-50'
                } ${!isLast ? 'border-b border-slate-100' : ''}`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                    checked ? 'border-slate-600 bg-slate-600' : 'border-slate-300 bg-white'
                  }`}
                  aria-hidden="true"
                >
                  {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleAddon(addon.id)}
                  value={addon.id}
                />
                <span className="flex-1 text-sm text-slate-700">{label}</span>
                <span className="shrink-0 text-sm font-semibold text-slate-900">
                  +${addon.price}
                  <span className="ml-0.5 text-xs font-normal text-slate-400">/{addon.unit}</span>
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Special instructions */}
      <div>
        <label htmlFor="bk-instructions" className="mb-1 block text-sm font-medium text-slate-700">
          {b.formInstructions}
        </label>
        <textarea
          id="bk-instructions"
          rows={4}
          value={form.instructions}
          onChange={(e) => update('instructions', e.target.value)}
          placeholder={
            language === 'en'
              ? 'Allergies, medications, favourite toys, feeding schedule…'
              : 'Allergies, médicaments, jouets préférés, horaire des repas…'
          }
          className={`${inputClass('instructions')} resize-none`}
        />
      </div>

      {/* Pet photo upload */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          {b.formPhoto}
        </label>
        <p className="mb-2 text-xs text-slate-400">{b.formPhotoHint}</p>

        {photoPreview ? (
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl">
              <Image src={photoPreview} alt="Pet photo preview" fill className="object-cover" />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-medium text-brand-600 hover:underline"
            >
              {b.formPhotoChange}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 px-4 py-6 text-sm text-slate-400 transition-colors hover:border-brand-300 hover:text-brand-600"
          >
            {language === 'en' ? 'Click to upload a photo of your pet' : 'Cliquez pour télécharger une photo de votre animal'}
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handlePhotoChange}
          className="hidden"
          aria-label={language === 'en' ? 'Upload pet photo' : "Télécharger une photo de l'animal"}
        />
        {errors.photo && <p className="mt-1 text-xs text-red-600">{errors.photo}</p>}
      </div>

      {status === 'error' && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {b.errorText}
        </p>
      )}

      <Button type="submit" size="lg" fullWidth disabled={status === 'loading'}>
        {status === 'loading' ? b.sending : b.formSubmit}
      </Button>
    </form>
  );
}
