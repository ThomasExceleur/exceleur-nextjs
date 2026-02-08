import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXContent, MDXFrontmatter, BlogPostMeta, FormationMeta } from '@/types';
import { calculateReadingTime, slugify } from './utils';

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * WordPress-style slugify: apostrophes are removed (not replaced by hyphens)
 * e.g. "Gestion d'erreurs" → "gestion-derreurs" (not "gestion-d-erreurs")
 */
function wpSlugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Get all MDX files from a directory
 */
function getMDXFiles(directory: string): string[] {
  const dirPath = path.join(contentDirectory, directory);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs.readdirSync(dirPath).filter((file) => file.endsWith('.mdx') && file !== 'index.mdx');
}

/**
 * Parse MDX file content and frontmatter
 */
function parseMDXFile(filePath: string): MDXContent {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as MDXFrontmatter,
    content,
  };
}

/**
 * Get single MDX content by slug
 */
export function getMDXContent(directory: string, slug: string): MDXContent | null {
  const filePath = path.join(contentDirectory, directory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseMDXFile(filePath);
}

/**
 * Get all blog posts with metadata
 */
export function getAllBlogPosts(): BlogPostMeta[] {
  const files = getMDXFiles('blog');

  const posts = files.map((file) => {
    const slug = file.replace('.mdx', '');
    const filePath = path.join(contentDirectory, 'blog', file);
    const { frontmatter, content } = parseMDXFile(filePath);

    return {
      slug,
      title: frontmatter.title || slug,
      excerpt: frontmatter.excerpt || frontmatter.description || '',
      date: frontmatter.date || new Date().toISOString(),
      author: frontmatter.author || 'Thomas L\'Exceleur',
      category: frontmatter.category || 'Excel',
      categories: frontmatter.categories || [],
      tags: frontmatter.tags || [],
      featuredImage: frontmatter.featuredImage,
      metaDescription: frontmatter.description,
      readingTime: calculateReadingTime(content),
    };
  });

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get blog post by slug
 */
export function getBlogPost(slug: string): { meta: BlogPostMeta; content: string } | null {
  const mdxContent = getMDXContent('blog', slug);

  if (!mdxContent) {
    return null;
  }

  const { frontmatter, content } = mdxContent;

  return {
    meta: {
      slug,
      title: frontmatter.title || slug,
      excerpt: frontmatter.excerpt || frontmatter.description || '',
      date: frontmatter.date || new Date().toISOString(),
      author: frontmatter.author || 'Thomas L\'Exceleur',
      category: frontmatter.category || 'Excel',
      categories: frontmatter.categories || [],
      tags: frontmatter.tags || [],
      featuredImage: frontmatter.featuredImage,
      metaDescription: frontmatter.description,
      readingTime: calculateReadingTime(content),
    },
    content,
  };
}

/**
 * Get all formations with metadata
 */
export function getAllFormations(): FormationMeta[] {
  const files = getMDXFiles('formations');

  const formations = files.map((file) => {
    const slug = file.replace('.mdx', '');
    const filePath = path.join(contentDirectory, 'formations', file);
    const { frontmatter } = parseMDXFile(filePath);

    return {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || '',
      price: frontmatter.price,
      duration: frontmatter.duration,
      level: frontmatter.level,
      features: frontmatter.features || [],
      metaDescription: frontmatter.description,
      featuredImage: frontmatter.featuredImage,
    } as FormationMeta;
  });

  return formations;
}

/**
 * Get formation by slug
 */
export function getFormation(slug: string): { meta: FormationMeta; content: string } | null {
  const mdxContent = getMDXContent('formations', slug);

  if (!mdxContent) {
    return null;
  }

  const { frontmatter, content } = mdxContent;

  return {
    meta: {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || '',
      price: frontmatter.price,
      duration: frontmatter.duration,
      level: frontmatter.level,
      features: frontmatter.features || [],
      metaDescription: frontmatter.description,
      featuredImage: frontmatter.featuredImage,
    } as FormationMeta,
    content,
  };
}

/**
 * Get page content by slug
 */
export function getPage(slug: string): MDXContent | null {
  return getMDXContent('pages', slug);
}

/**
 * Get all page slugs
 */
export function getAllPageSlugs(): string[] {
  const files = getMDXFiles('pages');
  return files.map((file) => file.replace('.mdx', ''));
}

/**
 * Get blog posts by category
 */
export function getBlogPostsByCategory(categorySlug: string): BlogPostMeta[] {
  const allPosts = getAllBlogPosts();
  const normalizedSlug = categorySlug.toLowerCase();
  return allPosts.filter(
    (post) => {
      const postCatSlug = slugify(post.category);
      const wpSlug = wpSlugify(post.category);
      return postCatSlug === normalizedSlug ||
        wpSlug === normalizedSlug ||
        post.categories.some((cat) => slugify(cat) === normalizedSlug || wpSlugify(cat) === normalizedSlug);
    }
  );
}

/**
 * Get all unique categories from blog posts
 */
export function getAllCategories(): { slug: string; name: string; count: number }[] {
  const allPosts = getAllBlogPosts();
  const categoryMap = new Map<string, number>();

  allPosts.forEach((post) => {
    const categories = [post.category, ...post.categories];
    categories.forEach((cat) => {
      if (cat) {
        const current = categoryMap.get(cat) || 0;
        categoryMap.set(cat, current + 1);
      }
    });
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    slug: wpSlugify(name),
    name,
    count,
  }));
}

/**
 * Get paginated blog posts
 */
export function getPaginatedBlogPosts(
  page: number = 1,
  perPage: number = 12
): { posts: BlogPostMeta[]; totalPages: number; totalPosts: number } {
  const allPosts = getAllBlogPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / perPage);
  const startIndex = (page - 1) * perPage;
  const posts = allPosts.slice(startIndex, startIndex + perPage);

  return { posts, totalPages, totalPosts };
}
