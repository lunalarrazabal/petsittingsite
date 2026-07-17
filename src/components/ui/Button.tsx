import Link from 'next/link';

// A reusable Button component.
// Use variant="primary" for the main solid ink-colored button (inverts on hover).
// Use variant="outline" for a transparent button with a border.
// Use variant="underline" for a plain-text link with an animated underline.
// Pass href to render it as a link instead of a button.

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'underline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variants = {
  primary: 'btn-solid',
  outline:
    'border border-ink text-ink hover:bg-ink hover:text-surface active:scale-[0.98]',
  underline: 'btn-underline text-ink',
  ghost: 'text-muted hover:text-ink active:scale-[0.98]',
};

const sizes = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-6 py-2.5 text-xs',
  lg: 'px-8 py-3.5 text-sm',
};

// The underline variant is a plain inline link, not a padded button box.
const sizelessVariants: Array<ButtonProps['variant']> = ['underline'];

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${
    sizelessVariants.includes(variant) ? '' : sizes[size]
  } ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
