'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'glass' | 'gradient' | 'feature';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glow?: boolean;
  gradientBorder?: boolean;
}

const variantStyles = {
  default: 'bg-white',
  elevated: 'bg-white shadow-card-elevated',
  bordered: 'bg-white border border-gray-100',
  glass: 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-glass',
  gradient: 'bg-gradient-to-br from-white to-gray-50/50 border border-gray-100/50',
  feature: 'bg-gradient-to-br from-primary/5 via-white to-accent/5 border border-primary/10',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

export function Card({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  glow = false,
  gradientBorder = false,
}: CardProps) {
  return (
    <div className={cn('relative group', glow && 'glow-wrapper')}>
      {/* Glow effect background */}
      {glow && (
        <div className="absolute -inset-px bg-gradient-to-br from-primary/20 to-accent/20 rounded-[inherit] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      )}

      {/* Gradient border effect */}
      {gradientBorder && (
        <div className="absolute inset-0 rounded-[inherit] p-[1px] bg-gradient-to-br from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
          <div className="absolute inset-[1px] rounded-[inherit] bg-white" />
        </div>
      )}

      <div
        className={cn(
          'relative rounded-card-lg overflow-hidden transition-all duration-300',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'hover:shadow-card-hover hover:-translate-y-1 cursor-pointer',
          gradientBorder && 'hover:border-transparent',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: 'primary' | 'secondary' | 'accent' | 'success';
}

const badgeColors = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary/10 text-secondary border-secondary/20',
  accent: 'bg-accent/10 text-accent-dark border-accent/20',
  success: 'bg-green-50 text-green-600 border-green-200',
};

export function CardHeader({ children, className, icon, badge, badgeColor = 'primary' }: CardHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <div>{children}</div>
        </div>
        {badge && (
          <span className={cn(
            'inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border',
            badgeColors[badgeColor]
          )}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
  gradient?: boolean;
}

export function CardTitle({ children, className, as: Component = 'h3', gradient = false }: CardTitleProps) {
  return (
    <Component
      className={cn(
        'font-heading font-bold text-text-dark',
        gradient && 'text-gradient',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-sm text-text-light mt-1', className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('text-body text-text', className)}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

export function CardFooter({ children, className, divider = false }: CardFooterProps) {
  return (
    <div className={cn(
      'mt-4',
      divider && 'pt-4 border-t border-gray-100',
      className
    )}>
      {children}
    </div>
  );
}

// Specialized card variants
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  number?: string;
}

export function FeatureCard({ icon, title, description, className, number }: FeatureCardProps) {
  return (
    <Card variant="feature" hover glow className={cn('relative', className)}>
      {/* Number indicator */}
      {number && (
        <div className="absolute top-4 right-4 text-5xl font-extrabold text-text-dark/5 select-none">
          {number}
        </div>
      )}

      {/* Icon container */}
      <div className="relative w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-lg">
        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
          <div className="text-primary">{icon}</div>
        </div>
      </div>

      <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
        {title}
      </CardTitle>
      <CardDescription className="text-base">
        {description}
      </CardDescription>
    </Card>
  );
}

interface StatCardProps {
  value: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ value, label, description, icon, className }: StatCardProps) {
  return (
    <Card variant="glass" hover className={cn('text-center', className)}>
      {icon && (
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      )}
      <div className="text-3xl md:text-4xl font-heading font-extrabold text-gradient mb-1">
        {value}
      </div>
      <div className="font-heading font-bold text-text-dark text-sm">
        {label}
      </div>
      {description && (
        <div className="text-text-light text-xs mt-1">
          {description}
        </div>
      )}
    </Card>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({ quote, author, role, avatar, rating = 5, className }: TestimonialCardProps) {
  return (
    <Card variant="elevated" padding="lg" hover className={className}>
      {/* Rating stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-body text-text mb-6 leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        {avatar ? (
          <img src={avatar} alt={author} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-heading font-bold text-text-dark">{author}</div>
          {role && <div className="text-sm text-text-light">{role}</div>}
        </div>
      </div>
    </Card>
  );
}
