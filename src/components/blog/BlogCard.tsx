import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { BlogPostMeta } from '@/types';

interface BlogCardProps {
  post: BlogPostMeta;
  className?: string;
  showExcerpt?: boolean;
  showDate?: boolean;
  showReadingTime?: boolean;
}

export function BlogCard({
  post,
  className,
  showExcerpt = true,
  showDate = false,
  showReadingTime = false,
}: BlogCardProps) {
  return (
    <article className={cn('group', className)}>
      {/* Featured Image */}
      {post.featuredImage && (
        <Link href={`/${post.slug}`} className="block mb-4 overflow-hidden rounded-lg">
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}

      {/* Title */}
      <h3 className="font-heading text-h3-card text-text-dark mb-3">
        <Link
          href={`/${post.slug}`}
          className="no-underline hover:text-primary transition-colors"
        >
          {post.title}
        </Link>
      </h3>

      {/* Meta info */}
      {(showDate || showReadingTime) && (
        <div className="flex items-center gap-4 mb-3 text-small text-text-light">
          {showDate && <time dateTime={post.date}>{formatDate(post.date)}</time>}
          {showReadingTime && post.readingTime && (
            <span>{post.readingTime} min de lecture</span>
          )}
        </div>
      )}

      {/* Excerpt */}
      {showExcerpt && post.excerpt && (
        <p className="text-body text-text mb-4 line-clamp-3">{post.excerpt}</p>
      )}

      {/* Read More Link */}
      <Link
        href={`/${post.slug}`}
        className="inline-flex items-center text-read-more uppercase text-primary no-underline hover:underline"
      >
        Lire la suite
        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
}
