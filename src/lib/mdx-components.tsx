import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// Custom components available in MDX files
export const mdxComponents = {
  // Override default HTML elements
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="font-heading text-h1 font-extrabold mb-8" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-heading text-h2 font-extrabold mt-12 mb-6" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-heading text-h3 font-extrabold mt-8 mb-4" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-body mb-6" {...props} />
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http://') || href?.startsWith('https://');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-hover underline"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href || '#'} className="text-primary hover:text-primary-hover underline" {...props}>
        {children}
      </Link>
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-body" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-6 text-text-light"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-background-muted px-1 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-text-dark text-white p-4 rounded-lg overflow-x-auto my-6 text-sm"
      {...props}
    />
  ),
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;
    return (
      <span className="block my-6">
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={450}
          className="rounded-lg w-full h-auto"
        />
      </span>
    );
  },
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-background-muted px-4 py-2 text-left bg-background-muted font-heading font-bold"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-background-muted px-4 py-2 text-left" {...props} />
  ),
  hr: () => <hr className="my-8 border-t border-background-muted" />,

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
    type?: 'info' | 'warning' | 'success' | 'error';
    title?: string;
    children: React.ReactNode;
  }) => {
    const styles = {
      info: 'bg-accent/20 border-accent text-text',
      warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
      success: 'bg-green-50 border-green-400 text-green-800',
      error: 'bg-red-50 border-red-400 text-red-800',
    };

    return (
      <div className={`border-l-4 p-4 my-6 rounded-r-lg ${styles[type]}`}>
        {title && <p className="font-heading font-bold mb-2">{title}</p>}
        <div className="text-sm">{children}</div>
      </div>
    );
  },

  // YouTube embed component
  YouTube: ({ id }: { id: string }) => (
    <div className="relative my-6 pb-[56.25%] h-0 overflow-hidden rounded-lg">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  ),

  // Excel formula highlight component
  ExcelFormula: ({ formula }: { formula: string }) => (
    <code className="block bg-green-100 text-green-800 px-4 py-2 rounded my-4 font-mono text-sm">
      {formula}
    </code>
  ),
};
