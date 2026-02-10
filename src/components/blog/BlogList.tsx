'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BlogPostMeta } from '@/types';
import { BlogCard } from './BlogCard';
import { FadeIn } from '@/components/ui/FadeIn';

interface BlogListProps {
  posts: BlogPostMeta[];
  columns?: 2 | 3 | 4;
  className?: string;
  showExcerpt?: boolean;
  showDate?: boolean;
  showReadingTime?: boolean;
  variant?: 'default' | 'grid' | 'featured' | 'masonry';
  animated?: boolean;
  emptyMessage?: string;
}

export function BlogList({
  posts,
  columns = 3,
  className,
  showExcerpt = true,
  showDate = false,
  showReadingTime = false,
  variant = 'default',
  animated = true,
  emptyMessage = 'Aucun article trouvé.',
}: BlogListProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  if (posts.length === 0) {
    return (
      <FadeIn direction="up">
        <div className="relative text-center py-16 px-6">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl" />

          <div className="relative">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>

            <p className="text-lg text-text-light mb-4">{emptyMessage}</p>
            <p className="text-sm text-text-light/70">
              Revenez bientôt pour découvrir nos nouveaux articles !
            </p>
          </div>
        </div>
      </FadeIn>
    );
  }

  // Featured variant: first post large, others in grid
  if (variant === 'featured' && posts.length > 1) {
    const [featuredPost, ...otherPosts] = posts;

    return (
      <div className={cn('space-y-8', className)}>
        {/* Featured post */}
        <FadeIn direction="up">
          <BlogCard
            post={featuredPost}
            variant="featured"
            showExcerpt={showExcerpt}
            showDate={showDate}
            showReadingTime={showReadingTime}
          />
        </FadeIn>

        {/* Other posts grid */}
        {otherPosts.length > 0 && (
          <div className={cn('grid grid-cols-1 gap-6', gridCols[columns])}>
            {otherPosts.map((post, index) => (
              <FadeIn key={post.slug} direction="up" delay={animated ? index * 0.1 : 0}>
                <BlogCard
                  post={post}
                  variant="default"
                  showExcerpt={showExcerpt}
                  showDate={showDate}
                  showReadingTime={showReadingTime}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Masonry variant: alternating sizes
  if (variant === 'masonry') {
    return (
      <div className={cn('columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6', className)}>
        {posts.map((post, index) => (
          <FadeIn key={post.slug} direction="up" delay={animated ? index * 0.05 : 0}>
            <div className="break-inside-avoid">
              <BlogCard
                post={post}
                variant={index % 3 === 0 ? 'featured' : 'default'}
                showExcerpt={showExcerpt}
                showDate={showDate}
                showReadingTime={showReadingTime}
              />
            </div>
          </FadeIn>
        ))}
      </div>
    );
  }

  // Default and grid variants
  return (
    <div className={cn('grid grid-cols-1 gap-6 lg:gap-8', gridCols[columns], className)}>
      {posts.map((post, index) => (
        <FadeIn key={post.slug} direction="up" delay={animated ? index * 0.1 : 0}>
          <BlogCard
            post={post}
            variant={variant === 'grid' ? 'compact' : 'default'}
            showExcerpt={showExcerpt}
            showDate={showDate}
            showReadingTime={showReadingTime}
          />
        </FadeIn>
      ))}
    </div>
  );
}

// Blog list with category filter
interface FilterableBlogListProps extends BlogListProps {
  categories?: string[];
  showFilter?: boolean;
}

export function FilterableBlogList({
  posts,
  categories = [],
  showFilter = true,
  ...props
}: FilterableBlogListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Extract unique categories from posts if not provided
  const allCategories = categories.length > 0
    ? categories
    : Array.from(new Set(posts.flatMap(post => post.categories || [])));

  const filteredPosts = activeCategory
    ? posts.filter(post => post.categories?.includes(activeCategory))
    : posts;

  return (
    <div className="space-y-8">
      {/* Category filter */}
      {showFilter && allCategories.length > 0 && (
        <FadeIn direction="up">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activeCategory === null
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                  : 'bg-gray-100 text-text-light hover:bg-gray-200'
              )}
            >
              Tous
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                    : 'bg-gray-100 text-text-light hover:bg-gray-200'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>
      )}

      {/* Posts list */}
      <BlogList posts={filteredPosts} {...props} />

      {/* Results count */}
      {showFilter && (
        <div className="text-center text-sm text-text-light">
          {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''}
          {activeCategory && ` dans "${activeCategory}"`}
        </div>
      )}
    </div>
  );
}

// Horizontal scrolling blog list for featured sections
interface HorizontalBlogListProps {
  posts: BlogPostMeta[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function HorizontalBlogList({
  posts,
  title,
  subtitle,
  className,
}: HorizontalBlogListProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      {(title || subtitle) && (
        <FadeIn direction="up">
          <div>
            {title && (
              <h3 className="font-heading text-2xl font-bold text-text-dark">{title}</h3>
            )}
            {subtitle && (
              <p className="text-text-light mt-1">{subtitle}</p>
            )}
          </div>
        </FadeIn>
      )}

      {/* Scrollable container */}
      <div className="relative -mx-4 px-4">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrollable list */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} direction="up" delay={index * 0.1}>
              <div className="flex-shrink-0 w-[300px] md:w-[350px] snap-start">
                <BlogCard
                  post={post}
                  variant="compact"
                  showExcerpt={false}
                  showDate
                  showReadingTime
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

    </div>
  );
}
