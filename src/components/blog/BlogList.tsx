import { cn } from '@/lib/utils';
import { BlogPostMeta } from '@/types';
import { BlogCard } from './BlogCard';

interface BlogListProps {
  posts: BlogPostMeta[];
  columns?: 2 | 3 | 4;
  className?: string;
  showExcerpt?: boolean;
  showDate?: boolean;
  showReadingTime?: boolean;
}

export function BlogList({
  posts,
  columns = 3,
  className,
  showExcerpt = true,
  showDate = false,
  showReadingTime = false,
}: BlogListProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-body text-text-light">Aucun article trouve.</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 gap-8', gridCols[columns], className)}>
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          post={post}
          showExcerpt={showExcerpt}
          showDate={showDate}
          showReadingTime={showReadingTime}
        />
      ))}
    </div>
  );
}
