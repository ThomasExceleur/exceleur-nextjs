import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline-white' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const variantStyles = {
  solid: 'bg-primary text-white border border-primary hover:bg-primary-hover',
  'outline-white': 'bg-transparent text-white border-[3px] border-white hover:bg-white/10',
  secondary: 'bg-secondary text-white hover:bg-secondary-hover',
};

const sizeStyles = {
  sm: 'px-3 py-2 text-small',
  md: 'px-4 py-3 text-small',
  lg: 'px-6 py-4 text-body',
};

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  href,
  target,
  className,
  disabled,
  type = 'button',
  onClick,
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center font-extrabold rounded-button transition-all duration-200 cursor-pointer no-underline',
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://');

    if (isExternal) {
      return (
        <a
          href={href}
          target={target || '_blank'}
          rel="noopener noreferrer"
          className={baseStyles}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseStyles}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
