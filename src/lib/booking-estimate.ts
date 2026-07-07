// Pure price-calculation utility — no React, no side effects.
// Prices mirror services.ts and longTermRates; update both if pricing changes.

import { longTermRates } from '@/data/services';

const MIN_LONG_TERM     = longTermRates.minimumDays;                    // 7
const DOG_BOARDING_WKLY = Number(longTermRates.dogBoardingWeekly);     // 250
const CAT_BOARDING_WKLY = Number(longTermRates.catBoardingWeekly);     // 175

const RATE = {
  'dog-boarding':   45,
  'cat-boarding':   28,
  'dog-daycare':    40,
  'dog-walking':    28,
  'additional-dog': 20,
  'additional-cat': 15,
  pickup:           50,
  dropoff:          50,
} as const;

export interface EstimateLine {
  label:    string;
  labelFr:  string;
  detail:   string;
  detailFr: string;
  amount:   number;
  isPending: boolean;   // amount unknown until dates are chosen
  isDiscount?: boolean; // weekly rate applied
}

export interface BookingEstimate {
  lines:       EstimateLine[];
  total:       number;
  nights:      number;
  isLongTerm:  boolean;
  hasContent:  boolean; // anything selected at all
  hasDates:    boolean;
}

export function calcNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const diff =
    new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(diff / 86_400_000));
}

function plural(n: number, singular: string, fr?: string): string {
  return `${n} ${n === 1 ? singular : singular + 's'}`;
}
function pluralFr(n: number, singular: string, plural: string): string {
  return `${n} ${n === 1 ? singular : plural}`;
}

export function calculateEstimate(p: {
  selectedServices: string[];
  checkIn:          string;
  checkOut:         string;
  additionalDogs:   number;
  additionalCats:   number;
  includePickup:    boolean;
  includeDropoff:   boolean;
}): BookingEstimate {
  const nights     = calcNights(p.checkIn, p.checkOut);
  const hasDates   = nights > 0;
  const isLongTerm = nights >= MIN_LONG_TERM;

  const lines: EstimateLine[] = [];
  let total = 0;

  // ── Primary services ────────────────────────────────────────────────────────

  for (const id of p.selectedServices) {
    if (id === 'dog-boarding') {
      let amount = 0;
      let detail    = '$45/night';
      let detailFr  = '45 $/nuit';
      let isDiscount = false;

      if (hasDates) {
        if (isLongTerm) {
          const weeks = Math.floor(nights / 7);
          const rem   = nights % 7;
          amount = weeks * DOG_BOARDING_WKLY + rem * RATE['dog-boarding'];
          detail   = `${plural(weeks, 'week')} × $${DOG_BOARDING_WKLY}/wk`;
          detailFr = `${pluralFr(weeks, 'semaine', 'semaines')} × ${DOG_BOARDING_WKLY} $/sem.`;
          if (rem > 0) {
            detail   += ` + ${plural(rem, 'night')} × $45`;
            detailFr += ` + ${pluralFr(rem, 'nuit', 'nuits')} × 45 $`;
          }
          isDiscount = true;
        } else {
          amount   = nights * RATE['dog-boarding'];
          detail   = `${plural(nights, 'night')} × $45`;
          detailFr = `${pluralFr(nights, 'nuit', 'nuits')} × 45 $`;
        }
      }

      lines.push({
        label: 'Dog Boarding', labelFr: 'Pension pour chien',
        detail, detailFr, amount, isPending: !hasDates, isDiscount,
      });
      total += amount;

    } else if (id === 'cat-boarding') {
      let amount = 0;
      let detail    = '$28/night';
      let detailFr  = '28 $/nuit';
      let isDiscount = false;

      if (hasDates) {
        if (isLongTerm) {
          const weeks = Math.floor(nights / 7);
          const rem   = nights % 7;
          amount = weeks * CAT_BOARDING_WKLY + rem * RATE['cat-boarding'];
          detail   = `${plural(weeks, 'week')} × $${CAT_BOARDING_WKLY}/wk`;
          detailFr = `${pluralFr(weeks, 'semaine', 'semaines')} × ${CAT_BOARDING_WKLY} $/sem.`;
          if (rem > 0) {
            detail   += ` + ${plural(rem, 'night')} × $28`;
            detailFr += ` + ${pluralFr(rem, 'nuit', 'nuits')} × 28 $`;
          }
          isDiscount = true;
        } else {
          amount   = nights * RATE['cat-boarding'];
          detail   = `${plural(nights, 'night')} × $28`;
          detailFr = `${pluralFr(nights, 'nuit', 'nuits')} × 28 $`;
        }
      }

      lines.push({
        label: 'Cat Boarding', labelFr: 'Pension pour chat',
        detail, detailFr, amount, isPending: !hasDates, isDiscount,
      });
      total += amount;

    } else if (id === 'dog-daycare') {
      let amount = 0;
      let detail    = '$40/day';
      let detailFr  = '40 $/jour';

      if (hasDates) {
        amount   = nights * RATE['dog-daycare'];
        detail   = `${plural(nights, 'day')} × $40`;
        detailFr = `${pluralFr(nights, 'jour', 'jours')} × 40 $`;
      }

      lines.push({
        label: 'Dog Daycare', labelFr: 'Garderie pour chien',
        detail, detailFr, amount, isPending: !hasDates,
      });
      total += amount;

    } else if (id === 'dog-walking') {
      lines.push({
        label: 'Dog Walking', labelFr: 'Promenade de chien',
        detail: '$28 per walk', detailFr: '28 $/promenade',
        amount: RATE['dog-walking'], isPending: false,
      });
      total += RATE['dog-walking'];
    }
  }

  // ── Additional pets ─────────────────────────────────────────────────────────

  if (p.additionalDogs > 0) {
    const qty    = p.additionalDogs;
    let amount   = 0;
    let detail   = `${qty} × $20/night`;
    let detailFr = `${qty} × 20 $/nuit`;

    if (hasDates) {
      amount   = qty * RATE['additional-dog'] * nights;
      detail   = `${qty} × $20/night × ${plural(nights, 'night')}`;
      detailFr = `${qty} × 20 $/nuit × ${pluralFr(nights, 'nuit', 'nuits')}`;
    }

    lines.push({
      label:   qty === 1 ? 'Additional Dog' : `Additional Dogs (${qty})`,
      labelFr: qty === 1 ? 'Chien supplémentaire' : `Chiens supplémentaires (${qty})`,
      detail, detailFr, amount, isPending: !hasDates,
    });
    total += amount;
  }

  if (p.additionalCats > 0) {
    const qty    = p.additionalCats;
    let amount   = 0;
    let detail   = `${qty} × $15/night`;
    let detailFr = `${qty} × 15 $/nuit`;

    if (hasDates) {
      amount   = qty * RATE['additional-cat'] * nights;
      detail   = `${qty} × $15/night × ${plural(nights, 'night')}`;
      detailFr = `${qty} × 15 $/nuit × ${pluralFr(nights, 'nuit', 'nuits')}`;
    }

    lines.push({
      label:   qty === 1 ? 'Additional Cat' : `Additional Cats (${qty})`,
      labelFr: qty === 1 ? 'Chat supplémentaire' : `Chats supplémentaires (${qty})`,
      detail, detailFr, amount, isPending: !hasDates,
    });
    total += amount;
  }

  // ── Transportation ──────────────────────────────────────────────────────────

  if (p.includePickup) {
    lines.push({
      label: 'Pick-up Service', labelFr: 'Service de ramassage',
      detail: 'one way', detailFr: 'aller simple',
      amount: RATE.pickup, isPending: false,
    });
    total += RATE.pickup;
  }

  if (p.includeDropoff) {
    lines.push({
      label: 'Drop-off Service', labelFr: 'Service de livraison',
      detail: 'one way', detailFr: 'aller simple',
      amount: RATE.dropoff, isPending: false,
    });
    total += RATE.dropoff;
  }

  const hasContent =
    p.selectedServices.length > 0 ||
    p.additionalDogs > 0 ||
    p.additionalCats > 0 ||
    p.includePickup ||
    p.includeDropoff;

  return { lines, total, nights, isLongTerm, hasContent, hasDates };
}
