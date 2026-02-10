import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/mdx';
import { siteConfig } from '@/lib/content';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Scan content/pages/ and return slugs of pages that are NOT noindex.
 * Excludes index.mdx (homepage) and pages already handled elsewhere
 * (formations-excel, blog-excel).
 */
function getIndexablePageSlugs(): string[] {
  const pagesDir = path.join(process.cwd(), 'content', 'pages');
  const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.mdx'));

  // Slugs handled explicitly elsewhere in the sitemap
  const explicitSlugs = new Set(['index', 'formations-excel', 'blog-excel']);

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      if (explicitSlugs.has(slug)) return null;

      const raw = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
      const { data } = matter(raw);
      if (data.noindex) return null;

      return slug;
    })
    .filter(Boolean) as string[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Get all blog posts
  const posts = getAllBlogPosts();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Core static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog-excel/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/formations-excel/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // Dynamic pages from content/pages/ (excludes noindex)
  const pageSlugs = getIndexablePageSlugs();
  const pageUrls = pageSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  // Formation pages
  const formations = [
    'excel-avance',
    'le-decollage-liste-attente',
    'la-machine-liste-attente',
    'power-query-secrets-liste-attente',
    'la-slide-liste-attente',
    'excelgpt',
    'tcd-express',
  ];

  const formationUrls = formations.map((slug) => ({
    url: `${baseUrl}/formations-excel/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...pageUrls, ...formationUrls, ...blogUrls];
}
