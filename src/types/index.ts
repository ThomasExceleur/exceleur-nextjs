// Blog Post types
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  categories: string[];
  tags: string[];
  featuredImage?: string;
  metaDescription?: string;
  readingTime?: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  categories: string[];
  tags: string[];
  featuredImage?: string;
  metaDescription?: string;
  readingTime?: number;
}

// Formation types
export interface Formation {
  slug: string;
  title: string;
  description: string;
  content: string;
  price?: string;
  duration?: string;
  level?: 'debutant' | 'intermediaire' | 'avance';
  features: string[];
  metaDescription?: string;
  featuredImage?: string;
  cta?: {
    text: string;
    url: string;
  };
}

export interface FormationMeta {
  slug: string;
  title: string;
  description: string;
  price?: string;
  duration?: string;
  level?: 'debutant' | 'intermediaire' | 'avance';
  features: string[];
  metaDescription?: string;
  featuredImage?: string;
}

// Category types
export interface Category {
  slug: string;
  title: string;
  description?: string;
  metaDescription?: string;
  postCount: number;
}

// Page types
export interface Page {
  slug: string;
  title: string;
  content: string;
  metaDescription?: string;
  type: 'page' | 'guide' | 'legal' | 'utility';
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavConfig {
  main: NavItem[];
  footer: {
    legal: NavItem[];
    resources: NavItem[];
  };
}

// SEO types
export interface SEOProps {
  title: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
}

// Component props
export interface ButtonVariant {
  variant?: 'solid' | 'outline-white' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

// Pagination
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

// MDX types
export interface MDXFrontmatter {
  title: string;
  date?: string;
  author?: string;
  excerpt?: string;
  description?: string;
  featuredImage?: string;
  category?: string;
  categories?: string[];
  tags?: string[];
  [key: string]: unknown;
}

export interface MDXContent {
  frontmatter: MDXFrontmatter;
  content: string;
}
