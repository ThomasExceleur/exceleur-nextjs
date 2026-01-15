import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  as: Component = 'h2',
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      <Component
        className={cn(
          'font-heading text-h2 text-text mb-4',
          titleClassName
        )}
      >
        {title}
      </Component>
      {subtitle && (
        <p className="text-body text-text-light max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
