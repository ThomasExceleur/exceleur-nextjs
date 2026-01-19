'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}?page=${page}`;
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className={cn('flex items-center justify-center gap-3 mt-16', className)} aria-label="Pagination">
      {/* Previous */}
      <Link
        href={currentPage > 1 ? getPageUrl(currentPage - 1) : '#'}
        className={cn(
          'group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full no-underline font-heading font-bold text-sm transition-all duration-300',
          currentPage > 1
            ? 'bg-white border border-gray-200 text-text-dark hover:border-primary hover:text-primary hover:shadow-md'
            : 'bg-gray-50 border border-gray-100 text-gray-300 cursor-not-allowed pointer-events-none'
        )}
        aria-disabled={currentPage <= 1}
      >
        <svg
          className={cn(
            'w-4 h-4 transition-transform duration-300',
            currentPage > 1 && 'group-hover:-translate-x-1'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Précédent</span>
      </Link>

      {/* Page numbers container */}
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-50/80 rounded-full border border-gray-100">
        {getPageNumbers().map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-10 h-10 flex items-center justify-center text-text-light"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="6" cy="12" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="18" cy="12" r="1.5" />
                </svg>
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <Link
              key={page}
              href={getPageUrl(page)}
              className={cn(
                'relative w-10 h-10 flex items-center justify-center rounded-full no-underline font-heading font-bold text-sm transition-all duration-300',
                isActive
                  ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30'
                  : 'text-text-dark hover:bg-white hover:text-primary hover:shadow-md'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Glow effect for active page */}
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary blur-md opacity-40 -z-10" />
              )}
              <span className="relative">{page}</span>
            </Link>
          );
        })}
      </div>

      {/* Next */}
      <Link
        href={currentPage < totalPages ? getPageUrl(currentPage + 1) : '#'}
        className={cn(
          'group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full no-underline font-heading font-bold text-sm transition-all duration-300',
          currentPage < totalPages
            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]'
            : 'bg-gray-50 border border-gray-100 text-gray-300 cursor-not-allowed pointer-events-none'
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <span className="hidden sm:inline">Suivant</span>
        <svg
          className={cn(
            'w-4 h-4 transition-transform duration-300',
            currentPage < totalPages && 'group-hover:translate-x-1'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </nav>
  );
}
