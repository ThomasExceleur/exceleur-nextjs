'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { BlogPostMeta } from '@/types';

interface BlogCardProps {
  post: BlogPostMeta;
  className?: string;
  showExcerpt?: boolean;
  showDate?: boolean;
  showReadingTime?: boolean;
  variant?: 'default' | 'featured' | 'compact';
}

export function BlogCard({
  post,
  className,
  showExcerpt = true,
  showDate = false,
  showReadingTime = false,
  variant = 'default',
}: BlogCardProps) {
  if (variant === 'featured') {
    return (
      <article className={cn('group relative', className)}>
        <Link href={`/${post.slug}/`} className="block no-underline">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-gray-100 shadow-soft hover:shadow-card-elevated transition-all duration-500 p-6 md:p-8">
            <h3 className="font-heading font-bold text-xl md:text-2xl text-text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>
            <div className="flex items-center gap-4 text-text-light text-sm">
              {post.date && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
              )}
              {post.readingTime && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.readingTime} min</span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className={cn('group', className)}>
        <Link href={`/${post.slug}/`} className="block no-underline">
          <h4 className="font-heading font-bold text-text-dark text-sm line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-1">
            {post.title}
          </h4>
          {post.date && (
            <time dateTime={post.date} className="text-xs text-text-light">
              {formatDate(post.date)}
            </time>
          )}
        </Link>
      </article>
    );
  }

  // Default variant
  return (
    <article className={cn('group relative', className)}>
      {/* Glow effect on hover */}
      <div className="absolute -inset-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-card-elevated transition-all duration-500 hover:-translate-y-1">
        {/* Content */}
        <div className="p-5">
          {/* Meta info */}
          {(showDate || showReadingTime) && (
            <div className="flex items-center gap-3 mb-3 text-xs text-text-light">
              {showDate && post.date && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
              )}
              {showReadingTime && post.readingTime && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.readingTime} min</span>
                </div>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="font-heading font-bold text-lg text-text-dark mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            <Link href={`/${post.slug}/`} className="no-underline">
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          {showExcerpt && post.excerpt && (
            <p className="text-sm text-text-light mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
          )}

          {/* Decorative line */}
          <div className="w-full h-px bg-gradient-to-r from-primary/20 via-accent/20 to-transparent mb-4" />

          {/* Read More Link */}
          <Link
            href={`/${post.slug}/`}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary no-underline group/link"
          >
            <span className="relative">
              Lire l&apos;article
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover/link:w-full transition-all duration-300" />
            </span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
