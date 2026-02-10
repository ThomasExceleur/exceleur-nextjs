import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// Custom components available in MDX files
export const mdxComponents = {
  // Override default HTML elements
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="font-heading text-3xl md:text-4xl font-extrabold mb-8 text-text-dark" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="group font-heading text-2xl md:text-3xl font-extrabold mt-12 mb-6 text-text-dark relative">
      <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      <span {...props} />
    </h2>
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-heading text-xl md:text-2xl font-bold mt-10 mb-4 text-text-dark" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="font-heading text-lg font-bold mt-8 mb-3 text-text-dark" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-body text-text leading-relaxed mb-6" {...props} />
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http://') || href?.startsWith('https://');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary font-medium hover:text-primary-hover underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors"
          {...props}
        >
          {children}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      );
    }
    return (
      <Link href={href || '#'} className="text-primary font-medium hover:text-primary-hover underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors" {...props}>
        {children}
      </Link>
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} />
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-body text-text" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="relative my-8 pl-6 pr-6 py-4 bg-gradient-to-br from-primary/5 to-accent/5 border-l-4 border-primary rounded-r-xl"
      {...props}
    >
      <svg className="absolute top-4 right-4 w-8 h-8 text-primary/10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <div className="italic text-text-dark/80 leading-relaxed">{children}</div>
    </blockquote>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="px-2 py-1 rounded-md text-sm font-mono bg-primary/10 text-primary border border-primary/20" {...props} />
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="relative my-8 group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
      <pre
        className="relative bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed"
        {...props}
      >
        {children}
      </pre>
      <div className="absolute top-3 right-3 flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
    </div>
  ),
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;
    return (
      <figure className="my-8">
        <div className="relative rounded-2xl overflow-hidden shadow-card-elevated">
          <Image
            src={src}
            alt={alt || ''}
            width={800}
            height={450}
            className="w-full h-auto"
          />
        </div>
        {alt && (
          <figcaption className="mt-3 text-center text-sm text-text-light italic">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 shadow-soft">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gradient-to-r from-primary/10 to-secondary/10" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 text-left font-heading font-bold text-text-dark border-b border-gray-200"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-left border-b border-gray-100 text-text" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-gray-50 transition-colors" {...props} />
  ),
  hr: () => (
    <div className="my-12 flex items-center justify-center gap-2">
      <div className="w-2 h-2 rounded-full bg-primary/30" />
      <div className="w-16 h-0.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-full" />
      <div className="w-2 h-2 rounded-full bg-secondary/30" />
      <div className="w-16 h-0.5 bg-gradient-to-r from-secondary/30 via-accent/30 to-primary/30 rounded-full" />
      <div className="w-2 h-2 rounded-full bg-accent/30" />
    </div>
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-text-dark" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-text-dark/90" {...props} />
  ),

  // Custom MDX components
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,

  // Custom callout component
  Callout: ({
    type = 'info',
    title,
    children,
  }: {
    type?: 'info' | 'warning' | 'success' | 'error' | 'tip';
    title?: string;
    children: React.ReactNode;
  }) => {
    const styles = {
      info: {
        bg: 'bg-accent/10',
        border: 'border-accent',
        icon: '💡',
        iconBg: 'bg-accent/20',
        title: 'text-accent-dark',
      },
      warning: {
        bg: 'bg-amber-50',
        border: 'border-amber-400',
        icon: '⚠️',
        iconBg: 'bg-amber-100',
        title: 'text-amber-800',
      },
      success: {
        bg: 'bg-green-50',
        border: 'border-green-400',
        icon: '✅',
        iconBg: 'bg-green-100',
        title: 'text-green-800',
      },
      error: {
        bg: 'bg-red-50',
        border: 'border-red-400',
        icon: '❌',
        iconBg: 'bg-red-100',
        title: 'text-red-800',
      },
      tip: {
        bg: 'bg-primary/5',
        border: 'border-primary',
        icon: '🎯',
        iconBg: 'bg-primary/10',
        title: 'text-primary',
      },
    };

    const style = styles[type];

    return (
      <div className={`relative my-8 p-5 rounded-2xl border-l-4 ${style.bg} ${style.border}`}>
        <div className="flex gap-4">
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${style.iconBg} flex items-center justify-center text-xl`}>
            {style.icon}
          </div>
          <div className="flex-1 min-w-0">
            {title && (
              <p className={`font-heading font-bold mb-2 ${style.title}`}>{title}</p>
            )}
            <div className="text-sm text-text leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">{children}</div>
          </div>
        </div>
      </div>
    );
  },

  // YouTube embed component
  YouTube: ({ id, title }: { id: string; title?: string }) => (
    <div className="my-8">
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-card-elevated">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title || 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      {title && (
        <p className="mt-3 text-center text-sm text-text-light">{title}</p>
      )}
    </div>
  ),

  // Excel formula highlight component
  ExcelFormula: ({ formula, description }: { formula: string; description?: string }) => (
    <div className="my-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <code className="block bg-white px-4 py-3 rounded-lg font-mono text-green-700 text-sm border border-green-200 overflow-x-auto">
            {formula}
          </code>
          {description && (
            <p className="mt-2 text-sm text-green-700">{description}</p>
          )}
        </div>
      </div>
    </div>
  ),

  // Step by step component
  Steps: ({ children }: { children: React.ReactNode }) => (
    <div className="my-8 space-y-4">
      {children}
    </div>
  ),

  Step: ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-bold text-text-dark mb-2">{title}</h4>
        <div className="text-sm text-text leading-relaxed">{children}</div>
      </div>
    </div>
  ),

  // Key takeaway component
  KeyTakeaway: ({ children }: { children: React.ReactNode }) => (
    <div className="my-8 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-primary mb-2">À retenir</p>
          <div className="text-text leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  ),
};
