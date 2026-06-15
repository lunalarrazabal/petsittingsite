import Link from 'next/link';

// A reusable Button component.
// Use variant="primary" for the main blue-colored button.
// Use variant="outline" for a transparent button with a border.
// Pass href to render it as a link instead of a button.

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-800 shadow-sm hover:shadow-md active:scale-[0.98]',
  outline:
    'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-[0.98]',
  ghost: 'text-slate-700 hover:bg-slate-100 active:scale-[0.98]',
};

const sizes = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

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
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

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
