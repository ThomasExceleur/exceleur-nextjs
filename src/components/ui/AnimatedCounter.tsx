'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  variant?: 'default' | 'gradient' | 'outlined' | 'card';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  icon?: React.ReactNode;
}

const sizeStyles = {
  sm: 'text-2xl md:text-3xl',
  md: 'text-3xl md:text-4xl',
  lg: 'text-4xl md:text-5xl',
  xl: 'text-5xl md:text-6xl',
};

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  variant = 'default',
  size = 'lg',
  label,
  icon,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const startValue = 0;

          const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = startValue + (end - startValue) * easeOutQuart;

            setCount(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const displayValue = decimals > 0
    ? count.toFixed(decimals)
    : Math.round(count).toString();

  // Gradient variant
  if (variant === 'gradient') {
    return (
      <div ref={ref} className={cn('text-center', className)}>
        {icon && (
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        <div className={cn(
          'font-heading font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent',
          sizeStyles[size]
        )}>
          {prefix}{displayValue}{suffix}
        </div>
        {label && (
          <p className="mt-2 text-text-light text-sm md:text-base">{label}</p>
        )}
      </div>
    );
  }

  // Outlined variant
  if (variant === 'outlined') {
    return (
      <div ref={ref} className={cn('text-center', className)}>
        <div className="inline-flex flex-col items-center p-6 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          {icon && (
            <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              {icon}
            </div>
          )}
          <div className={cn(
            'font-heading font-extrabold text-primary',
            sizeStyles[size]
          )}>
            {prefix}{displayValue}{suffix}
          </div>
          {label && (
            <p className="mt-2 text-text-light text-sm">{label}</p>
          )}
        </div>
      </div>
    );
  }

  // Card variant
  if (variant === 'card') {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 text-center',
          className
        )}
      >
        {/* Hover glow */}
        <div className="absolute -inset-1 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

        {icon && (
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
        <div className={cn(
          'font-heading font-extrabold text-text-dark',
          sizeStyles[size]
        )}>
          <span className="text-primary">{prefix}{displayValue}</span>
          <span className="text-text-light">{suffix}</span>
        </div>
        {label && (
          <p className="mt-3 text-text-light text-sm leading-relaxed">{label}</p>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div ref={ref} className={cn('text-center', className)}>
      {icon && (
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      )}
      <div className={cn(
        'font-heading font-extrabold text-primary',
        sizeStyles[size]
      )}>
        {prefix}{displayValue}{suffix}
      </div>
      {label && (
        <p className="mt-2 text-text-light text-sm md:text-base">{label}</p>
      )}
    </div>
  );
}

// Stats grid component for displaying multiple counters
interface StatsGridProps {
  stats: Array<{
    value: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    label: string;
    icon?: React.ReactNode;
  }>;
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'gradient' | 'card';
  className?: string;
}

export function StatsGrid({
  stats,
  columns = 3,
  variant = 'default',
  className,
}: StatsGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6 md:gap-8', gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <AnimatedCounter
          key={index}
          end={stat.value}
          suffix={stat.suffix}
          prefix={stat.prefix}
          decimals={stat.decimals}
          label={stat.label}
          icon={stat.icon}
          variant={variant}
          size="lg"
        />
      ))}
    </div>
  );
}

// Horizontal stats row
interface StatsRowProps {
  stats: Array<{
    value: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    label: string;
  }>;
  className?: string;
}

export function StatsRow({ stats, className }: StatsRowProps) {
  return (
    <div className={cn(
      'flex flex-wrap items-center justify-center gap-8 md:gap-12 py-6 px-4 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-2xl',
      className
    )}>
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-3">
          <AnimatedCounter
            end={stat.value}
            suffix={stat.suffix}
            prefix={stat.prefix}
            decimals={stat.decimals}
            size="md"
            className="!text-left"
          />
          <span className="text-sm text-text-light max-w-[120px] leading-tight">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
