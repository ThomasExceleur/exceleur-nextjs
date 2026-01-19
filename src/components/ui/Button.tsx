'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline-white' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles = {
  solid: 'bg-primary text-white border-2 border-primary hover:bg-primary-hover hover:border-primary-hover hover:shadow-lg hover:shadow-primary/25',
  'outline-white': 'bg-transparent text-white border-[3px] border-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/10',
  secondary: 'bg-secondary text-white border-2 border-secondary hover:bg-secondary-hover hover:border-secondary-hover hover:shadow-lg hover:shadow-secondary/25',
  ghost: 'bg-transparent text-primary border-2 border-transparent hover:bg-primary/5 hover:border-primary/10',
  gradient: 'bg-gradient-to-r from-primary to-secondary text-white border-0 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-small gap-1.5',
  md: 'px-5 py-3 text-small gap-2',
  lg: 'px-6 py-4 text-body gap-2.5',
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
  icon,
  iconPosition = 'right',
}: ButtonProps) {
  const baseStyles = cn(
    // Base styles
    'relative inline-flex items-center justify-center font-heading font-extrabold rounded-button cursor-pointer no-underline overflow-hidden',
    // Transition
    'transition-all duration-300 ease-out',
    // Transform on active
    'active:scale-[0.98]',
    // Variant styles
    variantStyles[variant],
    // Size styles
    sizeStyles[size],
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  const content = (
    <>
      {/* Shimmer effect overlay */}
      <span className="absolute inset-0 -translate-x-full hover:translate-x-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100" />

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-inherit">
        {icon && iconPosition === 'left' && (
          <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://');

    if (isExternal) {
      return (
        <a
          href={href}
          target={target || '_blank'}
          rel="noopener noreferrer"
          className={cn(baseStyles, 'group')}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={cn(baseStyles, 'group')}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cn(baseStyles, 'group')}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

// Specialized button variants
export function CTAButton({
  children,
  href,
  className,
  ...props
}: Omit<ButtonProps, 'variant'>) {
  return (
    <Button
      variant="gradient"
      size="lg"
      href={href}
      className={cn(
        'uppercase tracking-wide',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary before:to-secondary before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        className
      )}
      icon={
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      }
      {...props}
    >
      {children}
    </Button>
  );
}

// Icon button for compact actions
export function IconButton({
  icon,
  label,
  className,
  ...props
}: Omit<ButtonProps, 'children' | 'icon'> & { icon: React.ReactNode; label: string }) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'p-2 rounded-full aspect-square',
        className
      )}
      aria-label={label}
      {...props}
    >
      {icon}
    </Button>
  );
}
