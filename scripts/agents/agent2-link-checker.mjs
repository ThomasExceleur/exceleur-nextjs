/**
 * Agent 2 — Link Checker
 * Verifies all Markdown links are accessible:
 * internal slug existence, external HTTP status, absolute exceleur.fr detection,
 * and placeholder link detection.
 */
import path from 'path';
import {
  listMdxFiles, slugFromPath, readMdxFile,
  extractMarkdownLinks, isInternalUrl, isExceleurAbsoluteUrl,
  checkUrl, BLOG_DIR, PAGES_DIR,
  createReport, writeReport, printSummary,
  parseArgs, isStandalone, sleep,
} from './utils.mjs';

// Reserved routes and static pages (valid internal targets)
const RESERVED_ROUTES = ['blog-excel', 'formations-excel', 'categorie'];
const STATIC_PAGES = [
  'livre', 'guide-ultime-tcd', 'raccourcis-indispensables-excel',
  'mentions-legales', 'cgv', 'politique-de-cookies-ue',
  'declaration-de-confidentialite-ue', 'thank-you',
  'thank-you-guide-ultime-tcd', 'thank-you-guide-ultime-tcd-lk',
  'newsletter-externe', 'formations_bf2025-2',
];
const FORMATION_SLUGS = [
  'excel-avance', 'le-decollage-liste-attente', 'la-machine-liste-attente',
  'power-query-secrets-liste-attente', 'la-slide-liste-attente',
  'excelgpt', 'tcd-express',
];

// Placeholder patterns
const PLACEHOLDER_PATTERNS = [
  /^#$/,
  /^\/$/,
  /^lien-interne/i,
  /^placeholder/i,
  /^https?:\/\/example\./i,
];

/**
 * Build set of all valid internal slugs
 */
function buildValidSlugSet() {
  const mdxFiles = listMdxFiles(BLOG_DIR);
  const pageFiles = listMdxFiles(PAGES_DIR);
  const slugs = new Set();

  mdxFiles.forEach(f => slugs.add(slugFromPath(f)));
  pageFiles.forEach(f => slugs.add(slugFromPath(f)));
  RESERVED_ROUTES.forEach(r => slugs.add(r));
  STATIC_PAGES.forEach(s => slugs.add(s));
  FORMATION_SLUGS.forEach(s => slugs.add('formations-excel/' + s));

  // Add root
  slugs.add('');
  return slugs;
}

/**
 * Extract slug from an internal URL
 */
function slugFromUrl(url) {
  let slug = url;
  // Remove absolute domain
  slug = slug.replace(/^https?:\/\/(?:www\.)?exceleur\.fr\/?/, '/');
  // Remove leading slash and trailing slash
  slug = slug.replace(/^\//, '').replace(/\/$/, '');
  // Remove anchor
  slug = slug.replace(/#.*$/, '');
  return slug;
}

/**
 * Run all link checks
 */
export async function run(options = {}) {
  const args = parseArgs();
  const report = createReport('link-checker');

  let files = listMdxFiles();
  if (args.slug) {
    files = files.filter(f => slugFromPath(f) === args.slug);
  }

  console.log(`  Scanning ${files.length} MDX files for links...`);

  const validSlugs = buildValidSlugSet();

  // Collect all links with deduplication for external checks
  const externalUrlMap = new Map(); // url -> [{ file, line }]
  const allLinkEntries = []; // { file, link }

  for (const file of files) {
    const slug = slugFromPath(file);
    const { content } = readMdxFile(file);
    const links = extractMarkdownLinks(content);

    for (const link of links) {
      allLinkEntries.push({ file: slug + '.mdx', link });

      // 2.5 — Placeholder detection
      if (PLACEHOLDER_PATTERNS.some(p => p.test(link.url))) {
        report.addIssue(slug + '.mdx', '2.5', 'fail',
          `Placeholder link "${link.url}" at line ${link.line}`);
        continue;
      }

      // 2.4 — exceleur.fr absolute URLs that should be relative
      if (isExceleurAbsoluteUrl(link.url)) {
        report.addIssue(slug + '.mdx', '2.4', 'warn',
          `Absolute exceleur.fr link "${link.url}" should be relative (line ${link.line})`);
      }

      if (isInternalUrl(link.url)) {
        // 2.2 — Internal link: slug target must exist
        const targetSlug = slugFromUrl(link.url);
        if (targetSlug && !targetSlug.startsWith('#') && !validSlugs.has(targetSlug)) {
          report.addIssue(slug + '.mdx', '2.2', 'fail',
            `Internal link target "${targetSlug}" does not exist (line ${link.line})`,
            { url: link.url });
        }
      } else {
        // External link — collect for batch checking
        if (!link.url.startsWith('mailto:') && !link.url.startsWith('tel:')) {
          if (!externalUrlMap.has(link.url)) {
            externalUrlMap.set(link.url, []);
          }
          externalUrlMap.get(link.url).push({ file: slug + '.mdx', line: link.line });
        }
      }
    }
  }

  // 2.1 / 2.3 — Batch check external URLs (deduplicated)
  const externalUrls = [...externalUrlMap.keys()];
  console.log(`  Checking ${externalUrls.length} unique external URLs (concurrency=5)...`);

  const CONCURRENCY = 5;
  const DELAY = 200;
  const TIMEOUT = 8000;
  const results = [];
  let idx = 0;
  let running = 0;
  let completed = 0;

  await new Promise(resolve => {
    function next() {
      while (running < CONCURRENCY && idx < externalUrls.length) {
        const url = externalUrls[idx++];
        running++;
        sleep(DELAY * (running - 1)).then(async () => {
          let result = await checkUrl(url, { timeout: TIMEOUT });
          // Retry once on timeout
          if (!result.ok && result.error && result.error.includes('abort')) {
            result = await checkUrl(url, { timeout: TIMEOUT });
          }
          results.push(result);
          running--;
          completed++;
          if (completed % 50 === 0) {
            console.log(`    ... ${completed}/${externalUrls.length} URLs checked`);
          }
          if (completed === externalUrls.length) resolve();
          else next();
        });
      }
    }
    if (externalUrls.length === 0) resolve();
    else next();
  });

  // Domains known to block automated requests (false positives)
  const BOT_BLOCKING_DOMAINS = ['reddit.com', 'techcommunity.microsoft.com'];

  // Report broken external links
  for (const result of results) {
    if (!result.ok) {
      const locations = externalUrlMap.get(result.url);
      const isBotBlocked = BOT_BLOCKING_DOMAINS.some(d => result.url.includes(d))
        && (result.status === 403 || result.status === 400);
      const severity = isBotBlocked ? 'info' : result.status === 0 ? 'warn' : 'fail';
      for (const loc of locations) {
        report.addIssue(loc.file, '2.3', severity,
          `External link broken: ${result.url} → ${result.status || result.error} (line ${loc.line})`);
      }
    }
  }

  const json = report.toJSON();
  const okCount = results.filter(r => r.ok).length;
  json.meta = {
    filesScanned: files.length,
    totalLinks: allLinkEntries.length,
    externalUnique: externalUrls.length,
    externalOk: okCount,
    externalBroken: externalUrls.length - okCount,
  };

  writeReport('link-checker', json);
  printSummary('link-checker', json);
  return json;
}

if (isStandalone(import.meta.url)) {
  run().catch(err => { console.error(err); process.exit(1); });
}
