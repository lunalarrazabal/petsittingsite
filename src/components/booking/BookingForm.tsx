'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Check, Minus, Plus } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { services } from '@/data/services';
import { calculateEstimate } from '@/lib/booking-estimate';
import DateRangePicker from './DateRangePicker';
import BookingSummary from './BookingSummary';
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

const dogServices = services.filter((s) => s.category === 'dog');
const catServices = services.filter((s) => s.category === 'cat');

const SERVICE_GROUPS = [
  { key: 'dog', labelEn: 'Dog Services', labelFr: 'Services pour chiens', items: dogServices },
  { key: 'cat', labelEn: 'Cat Services', labelFr: 'Services pour chats',  items: catServices },
] as const;

function QtyButton({
  onClick, disabled, children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
        disabled
          ? 'cursor-not-allowed border-slate-200 text-slate-300'
          : 'border-slate-300 text-slate-600 hover:border-brand-500 hover:text-brand-600'
      }`}
    >
      {children}
    </button>
  );
}

export default function BookingForm() {
  const { t, language } = useLanguage();
  const b = t.booking;

  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', petName: '', petType: '',
    date: '', endDate: '', instructions: '', honeypot: '',
  });
  const [selectedServices,  setSelectedServices]  = useState<string[]>([]);
  const [additionalDogs,    setAdditionalDogs]    = useState(0);
  const [additionalCats,    setAdditionalCats]    = useState(0);
  const [additionalDogNames, setAdditionalDogNames] = useState<string[]>([]);
  const [additionalCatNames, setAdditionalCatNames] = useState<string[]>([]);
  const [includePickup,  setIncludePickup]  = useState(false);
  const [includeDropoff, setIncludeDropoff] = useState(false);
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

  const updateDogQty = (delta: number) => {
    setAdditionalDogs((prev) => {
      const next = Math.max(0, prev + delta);
      // Resize name array, preserving existing entries
      setAdditionalDogNames((names) => {
        const arr = [...names];
        while (arr.length < next) arr.push('');
        return arr.slice(0, next);
      });
      return next;
    });
  };

  const updateCatQty = (delta: number) => {
    setAdditionalCats((prev) => {
      const next = Math.max(0, prev + delta);
      setAdditionalCatNames((names) => {
        const arr = [...names];
        while (arr.length < next) arr.push('');
        return arr.slice(0, next);
      });
      return next;
    });
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

    const estimate = calculateEstimate({
      selectedServices, checkIn: form.date, checkOut: form.endDate,
      additionalDogs, additionalCats, includePickup, includeDropoff,
    });

    try {
      const fd = new FormData();
      (Object.keys(form) as (keyof FormData)[]).forEach((key) =>
        fd.append(key, form[key])
      );
      fd.append('services', selectedServices.join(','));
      fd.append('additionalDogs',     String(additionalDogs));
      fd.append('additionalCats',     String(additionalCats));
      fd.append('additionalDogNames', JSON.stringify(additionalDogNames));
      fd.append('additionalCatNames', JSON.stringify(additionalCatNames));
      fd.append('includePickup',      String(includePickup));
      fd.append('includeDropoff',     String(includeDropoff));
      fd.append('estimatedTotal',     String(estimate.total));
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
            setAdditionalDogs(0);
            setAdditionalCats(0);
            setAdditionalDogNames([]);
            setAdditionalCatNames([]);
            setIncludePickup(false);
            setIncludeDropoff(false);
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

  const isFr = language === 'fr';

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
            {isFr ? "(sélectionner tout ce qui s'applique)" : '(select all that apply)'} *
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
                  {isFr ? group.labelFr : group.labelEn}
                </p>
              </div>
              {group.items.map((svc, si) => {
                const checked = selectedServices.includes(svc.id);
                const name    = isFr ? svc.nameFr : svc.nameEn;
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
        <p className="mb-1 text-sm font-medium text-slate-700">
          {isFr ? 'Animaux et services supplémentaires' : 'Additional Pets & Services'}
          <span className="ml-1.5 text-xs font-normal text-slate-400">
            {isFr ? '(facultatif)' : '(optional)'}
          </span>
        </p>

        {/* Explanation */}
        <div className="mb-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
          <p className="text-xs leading-relaxed text-slate-500">
            {isFr
              ? `Le tarif de base couvre votre animal principal. Ajoutez des animaux supplémentaires ci-dessous si vous en avez plus d'un.`
              : `The base rate covers your primary pet. Add below if you're bringing more than one.`}
          </p>
          <ul className="mt-2 space-y-1">
            {(isFr
              ? [
                  '2 chiens → Réservez Pension pour chien + ajoutez 1 Chien supplémentaire',
                  '1 chien + 1 chat → Réservez Pension pour chien + Pension pour chat, sans supplémentaire',
                  '2 chats → Réservez Pension pour chat + ajoutez 1 Chat supplémentaire',
                ]
              : [
                  '2 dogs → Book Dog Boarding + add 1 Additional Dog',
                  '1 dog + 1 cat → Book Dog Boarding + Cat Boarding, no extra needed',
                  '2 cats → Book Cat Boarding + add 1 Additional Cat',
                ]
            ).map((ex, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                <span className="mt-0.5 shrink-0 text-slate-300">›</span>
                {ex}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

          {/* ── Additional Dogs stepper ──────────────────────────────────── */}
          <div className="border-b border-slate-100">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">
                  {isFr ? 'Chien supplémentaire' : 'Additional Dog'}
                </p>
                <p className="text-xs text-slate-400">
                  {isFr ? '+20 $/nuit par chien' : '+$20/night per dog'}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <QtyButton
                  onClick={() => updateDogQty(-1)}
                  disabled={additionalDogs === 0}
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                </QtyButton>
                <span className="w-5 text-center text-sm font-semibold text-slate-800">
                  {additionalDogs}
                </span>
                <QtyButton onClick={() => updateDogQty(1)}>
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                </QtyButton>
              </div>
            </div>

            {/* Dog name inputs */}
            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                additionalDogs > 0 ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="border-t border-slate-100 bg-slate-50 px-4 pb-4 pt-3 space-y-3">
                {Array.from({ length: additionalDogs }).map((_, idx) => (
                  <div key={idx}>
                    <label
                      htmlFor={`dog-name-${idx}`}
                      className="mb-1.5 block text-xs font-medium text-slate-500"
                    >
                      {isFr ? `Nom du chien supplémentaire #${idx + 1}` : `Additional Dog #${idx + 1} Name`}
                    </label>
                    <input
                      id={`dog-name-${idx}`}
                      type="text"
                      value={additionalDogNames[idx] ?? ''}
                      onChange={(e) =>
                        setAdditionalDogNames((prev) => {
                          const arr = [...prev];
                          arr[idx] = e.target.value;
                          return arr;
                        })
                      }
                      placeholder={isFr ? "Nom de l'animal" : 'Pet name'}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Additional Cats stepper ──────────────────────────────────── */}
          <div className="border-b border-slate-100">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">
                  {isFr ? 'Chat supplémentaire' : 'Additional Cat'}
                </p>
                <p className="text-xs text-slate-400">
                  {isFr ? '+15 $/nuit par chat' : '+$15/night per cat'}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <QtyButton
                  onClick={() => updateCatQty(-1)}
                  disabled={additionalCats === 0}
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                </QtyButton>
                <span className="w-5 text-center text-sm font-semibold text-slate-800">
                  {additionalCats}
                </span>
                <QtyButton onClick={() => updateCatQty(1)}>
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                </QtyButton>
              </div>
            </div>

            {/* Cat name inputs */}
            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                additionalCats > 0 ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="border-t border-slate-100 bg-slate-50 px-4 pb-4 pt-3 space-y-3">
                {Array.from({ length: additionalCats }).map((_, idx) => (
                  <div key={idx}>
                    <label
                      htmlFor={`cat-name-${idx}`}
                      className="mb-1.5 block text-xs font-medium text-slate-500"
                    >
                      {isFr ? `Nom du chat supplémentaire #${idx + 1}` : `Additional Cat #${idx + 1} Name`}
                    </label>
                    <input
                      id={`cat-name-${idx}`}
                      type="text"
                      value={additionalCatNames[idx] ?? ''}
                      onChange={(e) =>
                        setAdditionalCatNames((prev) => {
                          const arr = [...prev];
                          arr[idx] = e.target.value;
                          return arr;
                        })
                      }
                      placeholder={isFr ? "Nom de l'animal" : 'Pet name'}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Pick-up ──────────────────────────────────────────────────── */}
          <label className={`flex cursor-pointer items-center gap-3 border-b border-slate-100 px-4 py-3 transition-colors ${includePickup ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                includePickup ? 'border-slate-600 bg-slate-600' : 'border-slate-300 bg-white'
              }`}
              aria-hidden="true"
            >
              {includePickup && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={includePickup}
              onChange={() => setIncludePickup((v) => !v)}
            />
            <span className="flex-1 text-sm text-slate-700">
              {isFr ? 'Service de ramassage' : 'Pick-up Service'}
            </span>
            <span className="shrink-0 text-sm font-semibold text-slate-900">
              +$50
              <span className="ml-0.5 text-xs font-normal text-slate-400">
                /{isFr ? 'trajet' : 'one way'}
              </span>
            </span>
          </label>

          {/* ── Drop-off ─────────────────────────────────────────────────── */}
          <label className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors ${includeDropoff ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                includeDropoff ? 'border-slate-600 bg-slate-600' : 'border-slate-300 bg-white'
              }`}
              aria-hidden="true"
            >
              {includeDropoff && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={includeDropoff}
              onChange={() => setIncludeDropoff((v) => !v)}
            />
            <span className="flex-1 text-sm text-slate-700">
              {isFr ? 'Service de livraison' : 'Drop-off Service'}
            </span>
            <span className="shrink-0 text-sm font-semibold text-slate-900">
              +$50
              <span className="ml-0.5 text-xs font-normal text-slate-400">
                /{isFr ? 'trajet' : 'one way'}
              </span>
            </span>
          </label>
        </div>
      </div>

      {/* ── Live price summary ────────────────────────────────────────────── */}
      <BookingSummary
        selectedServices={selectedServices}
        checkIn={form.date}
        checkOut={form.endDate}
        additionalDogs={additionalDogs}
        additionalCats={additionalCats}
        additionalDogNames={additionalDogNames}
        additionalCatNames={additionalCatNames}
        includePickup={includePickup}
        includeDropoff={includeDropoff}
        petName={form.petName}
        petType={form.petType}
        language={language}
      />

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
            isFr
              ? 'Allergies, médicaments, jouets préférés, horaire des repas…'
              : 'Allergies, medications, favourite toys, feeding schedule…'
          }
          className={`${inputClass('instructions')} resize-none`}
        />
      </div>

      {/* ── Pet photo upload ──────────────────────────────────────────────── */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          {b.formPhoto}
        </label>

        {photoPreview ? (
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl">
              <Image src={photoPreview} alt="Pet photo preview" fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">
                {isFr ? 'Photo téléchargée !' : 'Photo uploaded!'}
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-0.5 text-sm font-medium text-brand-600 hover:underline"
              >
                {b.formPhotoChange}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-2xl border-2 border-dashed border-slate-200 px-6 py-6 text-left transition-colors hover:border-brand-300 hover:bg-brand-50/40"
          >
            <p className="text-sm font-semibold text-slate-800">
              {isFr
                ? "J'ai hâte de rencontrer votre compagnon ! 🐾"
                : "I'm excited to meet your furry friend! 🐾"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {isFr
                ? "Téléchargez une photo récente de votre animal (ou de vos animaux) pour que je puisse commencer à les connaître avant notre rencontre. Si plusieurs animaux sont inclus, n'hésitez pas à en ajouter une pour chacun !"
                : "Please upload a recent photo of your pet (or pets) so I can start getting to know them before our meet & greet. If multiple pets are included in your booking, please upload a photo of each one!"}
            </p>
            <span className="mt-3 inline-block text-xs font-medium text-brand-600">
              {isFr
                ? 'Cliquez pour télécharger · JPG, PNG, WEBP · Max 5 Mo'
                : 'Click to upload · JPG, PNG, WEBP · Max 5 MB'}
            </span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handlePhotoChange}
          className="hidden"
          aria-label={isFr ? "Télécharger une photo de l'animal" : 'Upload pet photo'}
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
