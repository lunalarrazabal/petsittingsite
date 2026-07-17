// Renders a row of star icons for a given numeric rating (0–5).
// Filled stars are sage, empty stars are a muted line color.

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' };

export default function StarRating({
  rating,
  max = 5,
  size = 'md',
  showNumber = false,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`${sizes[size]} ${i < rating ? 'text-brand-600' : 'text-[var(--color-line)]'}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
      {showNumber && (
        <span className="ml-1 text-sm font-medium text-[var(--color-muted)]">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
