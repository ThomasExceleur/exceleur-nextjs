import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { ShareButtons } from '@/components/sections/ShareButtons';
import { BlogPostMeta } from '@/types';

interface BlogContentProps {
  meta: BlogPostMeta;
  children: React.ReactNode;
  className?: string;
}

export function BlogContent({ meta, children, className }: BlogContentProps) {
  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Blog Excel', href: '/blog-excel' },
    { label: meta.title },
  ];

  const articleUrl = `https://exceleur.fr/${meta.slug}`;

  return (
    <article className={cn(className)}>
      {/* Hero Section */}
      <div className="gradient-hero py-12 lg:py-16">
        <Container>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <h1 className="text-h1 text-white mb-4">{meta.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <span>Par {meta.author}</span>
            <span className="opacity-50">|</span>
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            {meta.readingTime && (
              <>
                <span className="opacity-50">|</span>
                <span>{meta.readingTime} min de lecture</span>
              </>
            )}
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-12">
        <div className="max-w-3xl mx-auto">
          {/* Share buttons top */}
          <ShareButtons url={articleUrl} title={meta.title} className="mb-8" />

          {/* Article content */}
          <div className="prose max-w-none">{children}</div>

          {/* Share buttons bottom */}
          <div className="mt-12 pt-8 border-t border-background-muted">
            <ShareButtons url={articleUrl} title={meta.title} />
          </div>

          {/* Categories & Tags */}
          {(meta.categories.length > 0 || meta.tags.length > 0) && (
            <div className="mt-8 flex flex-wrap gap-2">
              {meta.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-small"
                >
                  {category}
                </span>
              ))}
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-background-muted text-text-light rounded-full text-small"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}
