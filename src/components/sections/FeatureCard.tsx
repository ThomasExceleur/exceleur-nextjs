'use client';

import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/ui/FadeIn';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'glass' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  delay?: number;
}

const variantStyles = {
  default: {
    container: 'bg-white hover:shadow-card-elevated',
    icon: 'bg-gradient-to-br from-primary/10 to-secondary/10 text-primary',
    title: 'text-text-dark',
    description: 'text-text-light',
  },
  elevated: {
    container: 'bg-white shadow-card hover:shadow-card-elevated hover:-translate-y-1',
    icon: 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30',
    title: 'text-text-dark',
    description: 'text-text',
  },
  bordered: {
    container: 'bg-white border-2 border-gray-100 hover:border-primary/30 hover:shadow-soft',
    icon: 'bg-primary/5 text-primary border border-primary/20',
    title: 'text-text-dark',
    description: 'text-text-light',
  },
  glass: {
    container: 'bg-white/80 backdrop-blur-sm border border-white/50 shadow-soft hover:shadow-card hover:bg-white/90',
    icon: 'bg-white/80 backdrop-blur-sm text-primary border border-white/50 shadow-soft',
    title: 'text-text-dark',
    description: 'text-text',
  },
  gradient: {
    container: 'bg-gradient-to-br from-primary/5 via-white to-secondary/5 border border-primary/10 hover:border-primary/30 hover:shadow-card',
    icon: 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20',
    title: 'text-text-dark',
    description: 'text-text',
  },
};

const sizeStyles = {
  sm: {
    container: 'p-5',
    icon: 'w-10 h-10 rounded-xl',
    iconSvg: 'w-5 h-5',
    title: 'text-base',
    description: 'text-sm',
  },
  md: {
    container: 'p-6',
    icon: 'w-14 h-14 rounded-2xl',
    iconSvg: 'w-7 h-7',
    title: 'text-lg',
    description: 'text-base',
  },
  lg: {
    container: 'p-8',
    icon: 'w-16 h-16 rounded-2xl',
    iconSvg: 'w-8 h-8',
    title: 'text-xl',
    description: 'text-base',
  },
};

export function FeatureCard({
  icon,
  title,
  description,
  className,
  variant = 'default',
  size = 'md',
  animated = true,
  delay = 0,
}: FeatureCardProps) {
  const styles = variantStyles[variant];
  const sizes = sizeStyles[size];

  const content = (
    <div
      className={cn(
        'group relative text-center rounded-2xl transition-all duration-300',
        sizes.container,
        styles.container,
        className
      )}
    >
      {/* Hover glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {/* Icon */}
      <div
        className={cn(
          'mx-auto mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
          sizes.icon,
          styles.icon
        )}
      >
        <span className={cn('flex items-center justify-center', sizes.iconSvg)}>
          {icon}
        </span>
      </div>

      {/* Title */}
      <h3
        className={cn(
          'font-heading font-bold mb-3 transition-colors duration-300',
          sizes.title,
          styles.title
        )}
      >
        {title}
      </h3>

      {/* Description */}
      <p className={cn('leading-relaxed', sizes.description, styles.description)}>
        {description}
      </p>

      {/* Decorative corner accent */}
      {variant === 'gradient' && (
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/10 to-transparent" />
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <FadeIn direction="up" delay={delay}>
        {content}
      </FadeIn>
    );
  }

  return content;
}

// Feature card with number indicator
interface NumberedFeatureCardProps extends Omit<FeatureCardProps, 'icon'> {
  number: number;
}

export function NumberedFeatureCard({
  number,
  title,
  description,
  className,
  variant = 'elevated',
  ...props
}: NumberedFeatureCardProps) {
  return (
    <FeatureCard
      icon={
        <span className="font-heading font-extrabold text-2xl">{number}</span>
      }
      title={title}
      description={description}
      variant={variant}
      className={className}
      {...props}
    />
  );
}

// Horizontal feature card variant
interface HorizontalFeatureCardProps extends FeatureCardProps {
  ctaText?: string;
  ctaHref?: string;
}

export function HorizontalFeatureCard({
  icon,
  title,
  description,
  className,
  variant = 'default',
  ctaText,
  ctaHref,
  animated = true,
  delay = 0,
}: HorizontalFeatureCardProps) {
  const styles = variantStyles[variant];

  const content = (
    <div
      className={cn(
        'group relative flex items-start gap-5 p-6 rounded-2xl transition-all duration-300',
        styles.container,
        className
      )}
    >
      {/* Hover glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {/* Icon */}
      <div
        className={cn(
          'flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
          styles.icon
        )}
      >
        <span className="w-7 h-7 flex items-center justify-center">{icon}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            'font-heading font-bold text-lg mb-2 transition-colors duration-300',
            styles.title
          )}
        >
          {title}
        </h3>
        <p className={cn('leading-relaxed text-sm', styles.description)}>
          {description}
        </p>
        {ctaText && ctaHref && (
          <a
            href={ctaHref}
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:text-primary-hover transition-colors group/link"
          >
            {ctaText}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );

  if (animated) {
    return (
      <FadeIn direction="up" delay={delay}>
        {content}
      </FadeIn>
    );
  }

  return content;
}

// Preset icons for common features
export const FeatureIcons = {
  certification: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  cpf: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  tosa: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  ),
  expert: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  video: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  ),
  support: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
  rocket: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    </svg>
  ),
  chart: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  ),
  clock: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};
