// Renders a row of star icons for a given numeric rating (0–5).
// Filled stars are amber, empty stars are light gray.

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
          className={`${sizes[size]} ${i < rating ? 'text-amber-400' : 'text-stone-200'}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
      {showNumber && (
        <span className="ml-1 text-sm font-medium text-stone-600">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
