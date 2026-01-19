'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'gradient' | 'glass' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  dot?: boolean;
  pulse?: boolean;
}

const variantStyles = {
  primary: 'bg-primary/10 text-primary border border-primary/20',
  secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
  accent: 'bg-accent/20 text-accent-dark border border-accent/30',
  outline: 'bg-transparent border-2 border-primary text-primary',
  gradient: 'bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-md shadow-primary/20',
  glass: 'bg-white/80 backdrop-blur-sm text-text-dark border border-white/50 shadow-sm',
  success: 'bg-green-50 text-green-600 border border-green-200',
  warning: 'bg-amber-50 text-amber-600 border border-amber-200',
  error: 'bg-red-50 text-red-600 border border-red-200',
};

const sizeStyles = {
  sm: 'px-2.5 py-1 text-xs gap-1.5',
  md: 'px-3.5 py-1.5 text-sm gap-2',
  lg: 'px-4 py-2 text-sm gap-2',
};

export function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  className,
  icon,
  dot = false,
  pulse = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center font-heading font-bold rounded-full transition-all duration-300',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {/* Pulse animation for notifications */}
      {pulse && (
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
        </span>
      )}

      {/* Status dot */}
      {dot && (
        <span className={cn(
          'w-2 h-2 rounded-full',
          variant === 'success' && 'bg-green-500',
          variant === 'warning' && 'bg-amber-500',
          variant === 'error' && 'bg-red-500',
          variant === 'primary' && 'bg-primary',
          variant === 'secondary' && 'bg-secondary',
          variant === 'accent' && 'bg-accent',
          variant === 'gradient' && 'bg-white',
          variant === 'glass' && 'bg-gradient-to-r from-primary to-secondary',
          variant === 'outline' && 'bg-primary',
        )} />
      )}

      {/* Icon */}
      {icon && (
        <span className="flex-shrink-0">{icon}</span>
      )}

      {/* Content */}
      <span>{children}</span>
    </span>
  );
}

// Specialized badge for categories
interface CategoryBadgeProps {
  category: string;
  className?: string;
  href?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge
      variant="glass"
      size="sm"
      className={cn('hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer', className)}
      icon={
        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
      }
    >
      {category}
    </Badge>
  );
}

// Status badge for formations, etc.
interface StatusBadgeProps {
  status: 'available' | 'coming_soon' | 'full' | 'new';
  className?: string;
}

const statusConfig = {
  available: { label: 'Disponible', variant: 'success' as const },
  coming_soon: { label: 'Bientôt', variant: 'warning' as const },
  full: { label: 'Complet', variant: 'error' as const },
  new: { label: 'Nouveau', variant: 'gradient' as const },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      size="sm"
      dot
      pulse={status === 'new'}
      className={className}
    >
      {config.label}
    </Badge>
  );
}
