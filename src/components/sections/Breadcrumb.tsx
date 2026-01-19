'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: 'default' | 'light' | 'pill';
}

export function Breadcrumb({
  items,
  className,
  variant = 'default',
}: BreadcrumbProps) {
  if (variant === 'pill') {
    return (
      <nav className={cn('mb-6', className)} aria-label="Fil d'Ariane">
        <ol className="inline-flex items-center gap-1 px-3 py-2 bg-gray-50/80 backdrop-blur-sm rounded-full border border-gray-100">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-1 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 px-2 py-1 text-sm text-text-light no-underline hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200"
                >
                  {index === 0 && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  )}
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 px-2 py-1 text-sm font-medium text-text-dark">
                  {item.icon}
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  const textColor = variant === 'light' ? 'text-white' : 'text-text';
  const linkColor = variant === 'light'
    ? 'text-white/70 hover:text-white'
    : 'text-text-light hover:text-primary';

  return (
    <nav className={cn('mb-6', className)} aria-label="Fil d'Ariane">
      <ol className={cn('flex flex-wrap items-center gap-1 text-sm', textColor)}>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && (
              <svg
                className={cn(
                  'w-4 h-4 mx-1',
                  variant === 'light' ? 'text-white/40' : 'text-gray-300'
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  'inline-flex items-center gap-1.5 no-underline transition-colors duration-200',
                  linkColor
                )}
              >
                {index === 0 && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )}
                {item.icon}
                <span className="hover:underline underline-offset-2">{item.label}</span>
              </Link>
            ) : (
              <span className={cn(
                'inline-flex items-center gap-1.5 font-medium',
                variant === 'light' ? 'text-white' : 'text-text-dark'
              )}>
                {item.icon}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
