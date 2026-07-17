'use client';

import { Check } from 'lucide-react';
import { calculateEstimate } from '@/lib/booking-estimate';
import { services } from '@/data/services';

interface Props {
  selectedServices:   string[];
  checkIn:            string;
  checkOut:           string;
  additionalDogs:     number;
  additionalCats:     number;
  additionalDogNames: string[];
  additionalCatNames: string[];
  includePickup:      boolean;
  includeDropoff:     boolean;
  petName:            string;
  petType:            string;
  language:           'en' | 'fr';
}

function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
}

function getServiceName(id: string, lang: 'en' | 'fr'): string {
  const svc = services.find((s) => s.id === id);
  if (!svc) return id;
  return lang === 'en' ? svc.nameEn : svc.nameFr;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-faint">
        {label}
      </span>
      <div className="text-right text-sm text-ink">{children}</div>
    </div>
  );
}

export default function BookingSummary({
  selectedServices, checkIn, checkOut,
  additionalDogs, additionalCats,
  additionalDogNames, additionalCatNames,
  includePickup, includeDropoff,
  petName, petType, language,
}: Props) {
  const estimate = calculateEstimate({
    selectedServices, checkIn, checkOut,
    additionalDogs, additionalCats, includePickup, includeDropoff,
  });

  if (!estimate.hasContent) return null;

  const isFr   = language === 'fr';
  const locale  = isFr ? 'fr-CA' : 'en-CA';

  const serviceNames = selectedServices.map((id) => getServiceName(id, language));

  // Build additional pet display lines
  const additionalPetLines: string[] = [];
  if (additionalDogs > 0) {
    const names = additionalDogNames.filter(Boolean);
    const label = isFr
      ? (additionalDogs === 1 ? 'Chien supplémentaire' : `${additionalDogs} chiens supplémentaires`)
      : (additionalDogs === 1 ? 'Additional Dog' : `${additionalDogs} Additional Dogs`);
    additionalPetLines.push(names.length > 0 ? `${label} (${names.join(', ')})` : label);
  }
  if (additionalCats > 0) {
    const names = additionalCatNames.filter(Boolean);
    const label = isFr
      ? (additionalCats === 1 ? 'Chat supplémentaire' : `${additionalCats} chats supplémentaires`)
      : (additionalCats === 1 ? 'Additional Cat' : `${additionalCats} Additional Cats`);
    additionalPetLines.push(names.length > 0 ? `${label} (${names.join(', ')})` : label);
  }

  const hasAdditionalServices = includePickup || includeDropoff;

  return (
    <div className="border border-line bg-bg">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="border-b border-line bg-surface px-5 py-3">
        <p className="font-[var(--font-playfair)] text-sm text-ink">
          {isFr ? 'Résumé de la réservation' : 'Booking Summary'}
        </p>
      </div>

      {/* ── Booking details ──────────────────────────────────────────────── */}
      <div className="divide-y divide-line px-5">

        {/* Service(s) */}
        {serviceNames.length > 0 && (
          <Row label={isFr ? 'Service' : 'Service'}>
            <span className="font-medium">{serviceNames.join(', ')}</span>
          </Row>
        )}

        {/* Stay dates */}
        {checkIn && (
          <Row label={isFr ? 'Séjour' : 'Stay'}>
            {checkOut ? (
              <div>
                <p className="font-medium">
                  {formatDate(checkIn, locale)} – {formatDate(checkOut, locale)}
                </p>
                <p className="mt-0.5 text-xs text-faint">
                  {estimate.nights}{' '}
                  {isFr
                    ? (estimate.nights === 1 ? 'nuit' : 'nuits')
                    : (estimate.nights === 1 ? 'night' : 'nights')}
                  {estimate.isLongTerm && (
                    <span className="ml-1.5 border border-sage-deep px-1.5 py-0.5 text-xs font-medium text-sage-deep">
                      {isFr ? 'Tarif hebdo.' : 'Weekly rate'}
                    </span>
                  )}
                </p>
              </div>
            ) : (
              <span className="font-medium">{formatDate(checkIn, locale)}</span>
            )}
          </Row>
        )}

        {/* Primary pet */}
        {petName && (
          <Row label={isFr ? 'Animal principal' : 'Primary Pet'}>
            <span className="font-medium">
              {petName}
              {petType && <span className="font-normal text-faint"> ({petType})</span>}
            </span>
          </Row>
        )}

        {/* Additional pets */}
        {additionalPetLines.length > 0 && (
          <Row label={isFr ? 'Animaux suppl.' : 'Additional Pets'}>
            <div className="space-y-0.5">
              {additionalPetLines.map((line, i) => (
                <p key={i} className="font-medium">{line}</p>
              ))}
            </div>
          </Row>
        )}

        {/* Transportation */}
        {hasAdditionalServices && (
          <Row label={isFr ? 'Transport' : 'Transport'}>
            <div className="flex flex-col items-end gap-0.5">
              {includePickup && (
                <p className="flex items-center gap-1 font-medium">
                  <Check className="h-3 w-3 shrink-0 text-sage-deep" strokeWidth={2.5} />
                  {isFr ? 'Ramassage (+50 $)' : 'Pick-up (+$50)'}
                </p>
              )}
              {includeDropoff && (
                <p className="flex items-center gap-1 font-medium">
                  <Check className="h-3 w-3 shrink-0 text-sage-deep" strokeWidth={2.5} />
                  {isFr ? 'Livraison (+50 $)' : 'Drop-off (+$50)'}
                </p>
              )}
            </div>
          </Row>
        )}
      </div>

      {/* ── Price breakdown ──────────────────────────────────────────────── */}
      <div className="border-t border-line bg-surface px-5 pb-1 pt-3">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-faint">
          {isFr ? 'Détail des prix' : 'Price Breakdown'}
        </p>
        <div className="divide-y divide-line">
          {estimate.lines.map((line, idx) => (
            <div key={idx} className="flex items-start justify-between gap-2 py-2">
              <div className="min-w-0">
                <span className="text-xs text-muted">{isFr ? line.labelFr : line.label}</span>
                <span className="ml-1 text-xs text-faint">
                  {isFr ? line.detailFr : line.detail}
                </span>
              </div>
              {line.isPending ? (
                <span className="shrink-0 text-xs text-faint">
                  {isFr ? '(dates requises)' : '(needs dates)'}
                </span>
              ) : (
                <span className="shrink-0 text-xs font-semibold text-ink">
                  ${line.amount}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Total ────────────────────────────────────────────────────────── */}
      <div className="border-t border-line bg-surface px-5 py-4">
        {estimate.hasDates ? (
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-ink">
              {isFr ? 'Coût estimé' : 'Estimated Booking Cost'}
            </span>
            <span className="font-[var(--font-playfair)] text-2xl text-ink">
              ${estimate.total}
              <span className="ml-1 text-sm font-normal text-faint">CAD</span>
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">
              {isFr ? 'Coût estimé' : 'Estimated Booking Cost'}
            </span>
            <span className="text-sm text-faint">
              {isFr ? 'Sélectionnez vos dates' : 'Select your dates above'}
            </span>
          </div>
        )}
        <p className="mt-2 text-xs leading-relaxed text-muted">
          {isFr
            ? "Ceci est un total estimé basé sur les informations fournies. Le prix final sera confirmé une fois que j'aurai examiné et accepté votre demande de réservation."
            : 'This is an estimated total based on the information provided. The final price will be confirmed once I review and accept your booking request.'}
        </p>
      </div>
    </div>
  );
}
