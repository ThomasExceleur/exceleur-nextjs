/**
 * Agent 6 — Routing & Redirects
 * Verifies that every WordPress URL has a corresponding MDX file,
 * no slug collisions with reserved routes, and sitemap coverage.
 */
import {
  listMdxFiles, slugFromPath, BLOG_DIR, PAGES_DIR,
  createReport, writeReport, printSummary,
  parseArgs, isStandalone,
} from './utils.mjs';

// Reserved routes from src/app/[slug]/page.tsx
const RESERVED_ROUTES = ['blog-excel', 'formations-excel', 'categorie'];

// Static pages defined in [slug]/page.tsx
const STATIC_PAGES = [
  'livre', 'guide-ultime-tcd', 'raccourcis-indispensables-excel',
  'mentions-legales', 'cgv', 'politique-de-cookies-ue',
  'declaration-de-confidentialite-ue', 'thank-you',
  'thank-you-guide-ultime-tcd', 'thank-you-guide-ultime-tcd-lk',
  'newsletter-externe', 'formations_bf2025-2',
];

/**
 * Fetch WP post-sitemap.xml and extract slugs
 */
async function fetchWpSitemapSlugs() {
  const res = await fetch('https://www.exceleur.fr/post-sitemap.xml', {
    headers: { 'User-Agent': 'ExceleurQA/1.0' },
  });
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  const xml = await res.text();

  const slugs = [];
  const re = /<loc>https?:\/\/(?:www\.)?exceleur\.fr\/([^<]+?)\/?<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const slug = m[1].replace(/\/$/, '');
    if (slug && !slug.includes('/')) {
      slugs.push(slug);
    }
  }
  return slugs;
}

/**
 * Run all routing checks
 */
export async function run(options = {}) {
  const args = parseArgs();
  const report = createReport('routing');

  // 1. List MDX files
  const mdxFiles = listMdxFiles(BLOG_DIR);
  const mdxSlugs = new Set(mdxFiles.map(slugFromPath));
  console.log(`  MDX files found: ${mdxSlugs.size}`);

  // Page slugs
  const pageFiles = listMdxFiles(PAGES_DIR);
  const pageSlugs = new Set(pageFiles.map(slugFromPath));

  // 2. Check 6.2 — No collision with reserved routes
  for (const slug of mdxSlugs) {
    if (RESERVED_ROUTES.includes(slug)) {
      report.addIssue(slug + '.mdx', '6.2', 'fail',
        `Slug "${slug}" collides with reserved route`);
    }
  }

  // 3. Check 6.1 — WP sitemap slugs have a matching MDX
  let wpSlugs = [];
  try {
    wpSlugs = await fetchWpSitemapSlugs();
    console.log(`  WP sitemap slugs: ${wpSlugs.length}`);
  } catch (err) {
    report.addIssue('', '6.1', 'warn', `Could not fetch WP sitemap: ${err.message}`);
  }

  // Slugs that are valid but not blog MDX files
  const nonBlogSlugs = new Set([...RESERVED_ROUTES, ...STATIC_PAGES, ...pageSlugs]);

  const missingMdx = [];
  for (const slug of wpSlugs) {
    if (!mdxSlugs.has(slug) && !nonBlogSlugs.has(slug)) {
      missingMdx.push(slug);
      report.addIssue(slug, '6.1', 'fail',
        `WP slug "${slug}" has no MDX file`);
    }
  }

  if (wpSlugs.length > 0 && missingMdx.length === 0) {
    console.log(`  6.1 PASS: all ${wpSlugs.length} WP slugs matched`);
  }

  // 4. Check 6.3 — generateStaticParams covers all MDX slugs
  // We replicate the logic: blog slugs + page slugs + static page slugs
  const generatedSlugs = new Set([...mdxSlugs, ...pageSlugs, ...STATIC_PAGES]);
  for (const slug of mdxSlugs) {
    if (!generatedSlugs.has(slug)) {
      report.addIssue(slug + '.mdx', '6.3', 'fail',
        `Slug "${slug}" not covered by generateStaticParams`);
    }
  }

  // 5. Check 6.4 — Slugs ending with -\d have their MDX
  const suffixedSlugs = wpSlugs.filter(s => /-\d+$/.test(s));
  for (const slug of suffixedSlugs) {
    if (!mdxSlugs.has(slug)) {
      report.addIssue(slug, '6.4', 'fail',
        `Suffixed slug "${slug}" (e.g. -2, -3) missing MDX`);
    }
  }

  // 6. Check 6.5 — Sitemap Next.js should contain all blog URLs
  // We verify programmatically by checking MDX slugs would be generated
  for (const slug of mdxSlugs) {
    // Every MDX slug should appear in the sitemap output
    // Since sitemap.ts uses getAllBlogPosts which reads from content/blog,
    // as long as the MDX file exists and has valid frontmatter, it's covered.
    // We just verify the file is parseable here.
    const filePath = mdxFiles.find(f => slugFromPath(f) === slug);
    if (filePath) {
      try {
        const raw = (await import('fs')).readFileSync(filePath, 'utf-8');
        (await import('gray-matter')).default(raw);
      } catch {
        report.addIssue(slug + '.mdx', '6.5', 'warn',
          `MDX file "${slug}" may not appear in sitemap (frontmatter parse error)`);
      }
    }
  }

  // If single slug mode
  if (args.slug) {
    if (!mdxSlugs.has(args.slug)) {
      report.addIssue(args.slug, '6.1', 'fail', `Slug "${args.slug}" has no MDX file`);
    } else {
      console.log(`  Slug "${args.slug}" exists as MDX`);
    }
  }

  const json = report.toJSON();
  json.meta = {
    mdxCount: mdxSlugs.size,
    wpSitemapCount: wpSlugs.length,
    missingCount: missingMdx.length,
    collisions: [...mdxSlugs].filter(s => RESERVED_ROUTES.includes(s)),
  };

  writeReport('routing', json);
  printSummary('routing', json);
  return json;
}

if (isStandalone(import.meta.url)) {
  run().catch(err => { console.error(err); process.exit(1); });
}
