import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: 'default' | 'light';
}

export function Breadcrumb({
  items,
  className,
  variant = 'default',
}: BreadcrumbProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-text';
  const linkColor = variant === 'light' ? 'text-white/80 hover:text-white' : 'text-primary hover:text-primary-hover';

  return (
    <nav className={cn('mb-6', className)} aria-label="Fil d'Ariane">
      <ol className={cn('flex flex-wrap items-center gap-2 text-body', textColor)}>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="opacity-60" aria-hidden="true">
                &gt;
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className={cn('no-underline hover:underline transition-colors', linkColor)}
              >
                {item.label}
              </Link>
            ) : (
              <span className="opacity-80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
