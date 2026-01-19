'use client';

import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/ui/FadeIn';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  as?: 'h1' | 'h2' | 'h3';
  variant?: 'default' | 'gradient' | 'light' | 'decorated';
  animated?: boolean;
}

const variantStyles = {
  default: {
    title: 'text-text-dark',
    subtitle: 'text-text-light',
    badge: 'bg-primary/10 text-primary border-primary/20',
    decoration: 'from-primary to-secondary',
  },
  gradient: {
    title: 'bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent',
    subtitle: 'text-text-light',
    badge: 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20',
    decoration: 'from-primary via-secondary to-accent',
  },
  light: {
    title: 'text-white',
    subtitle: 'text-white/80',
    badge: 'bg-white/10 text-white/90 border-white/20',
    decoration: 'from-white/60 via-white/40 to-white/60',
  },
  decorated: {
    title: 'text-text-dark',
    subtitle: 'text-text-light',
    badge: 'bg-accent/10 text-accent-dark border-accent/20',
    decoration: 'from-primary via-accent to-secondary',
  },
};

export function SectionTitle({
  title,
  subtitle,
  badge,
  align = 'center',
  className,
  titleClassName,
  as: Component = 'h2',
  variant = 'default',
  animated = true,
}: SectionTitleProps) {
  const styles = variantStyles[variant];

  const content = (
    <div
      className={cn(
        'mb-12 lg:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      {/* Badge */}
      {badge && (
        <div className={cn(
          'inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full text-sm font-medium border backdrop-blur-sm',
          styles.badge,
          align === 'center' && 'mx-auto'
        )}>
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          {badge}
        </div>
      )}

      {/* Title with decorative elements */}
      <div className="relative inline-block w-full">
        {/* Decorative line for decorated variant */}
        {variant === 'decorated' && align === 'center' && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary/50 rounded-full" />
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-secondary" />
            <div className="w-8 h-0.5 bg-gradient-to-r from-secondary/50 to-transparent rounded-full" />
          </div>
        )}

        <Component
          className={cn(
            'font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight',
            styles.title,
            titleClassName
          )}
        >
          {title}
        </Component>

        {/* Underline decoration for decorated variant */}
        {variant === 'decorated' && (
          <div className={cn(
            'mt-4 h-1 w-24 rounded-full bg-gradient-to-r',
            styles.decoration,
            align === 'center' && 'mx-auto'
          )} />
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className={cn(
          'mt-4 md:mt-6 text-lg md:text-xl leading-relaxed',
          styles.subtitle,
          align === 'center' && 'max-w-2xl mx-auto'
        )}>
          {subtitle}
        </p>
      )}

      {/* Bottom decorative dots for center aligned */}
      {align === 'center' && variant !== 'decorated' && variant !== 'light' && (
        <div className="flex items-center justify-center gap-1.5 mt-6">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <div className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
        </div>
      )}
    </div>
  );

  if (animated) {
    return <FadeIn direction="up">{content}</FadeIn>;
  }

  return content;
}

// Preset section titles for common use cases
export function FormationSectionTitle({
  title,
  subtitle,
  ...props
}: Omit<SectionTitleProps, 'variant'>) {
  return (
    <SectionTitle
      title={title}
      subtitle={subtitle}
      variant="decorated"
      {...props}
    />
  );
}

export function HeroSectionTitle({
  title,
  subtitle,
  badge,
  ...props
}: Omit<SectionTitleProps, 'variant'>) {
  return (
    <SectionTitle
      title={title}
      subtitle={subtitle}
      badge={badge}
      variant="light"
      {...props}
    />
  );
}
