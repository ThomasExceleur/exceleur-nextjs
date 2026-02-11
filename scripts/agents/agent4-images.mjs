/**
 * Agent 4 — Images & Media
 * Verifies all image URLs are accessible, featured images work,
 * WordPress-hosted images are reachable, and alt text is present.
 */
import {
  listMdxFiles, slugFromPath, readMdxFile,
  extractMarkdownImages, checkUrl, sleep,
  createReport, writeReport, printSummary,
  parseArgs, isStandalone,
} from './utils.mjs';

const CONCURRENCY = 10;
const TIMEOUT = 5000;
const DELAY = 100;

/**
 * Run all image checks
 */
export async function run(options = {}) {
  const args = parseArgs();
  const report = createReport('images');

  let files = listMdxFiles();
  if (args.slug) {
    files = files.filter(f => slugFromPath(f) === args.slug);
  }

  console.log(`  Scanning ${files.length} MDX files for images...`);

  // Collect all image URLs with deduplication
  const urlMap = new Map(); // url -> [{ file, line, context }]
  const altIssues = []; // { file, url, line }

  for (const file of files) {
    const slug = slugFromPath(file);
    const { frontmatter, content } = readMdxFile(file);

    // 4.2 — featuredImage from frontmatter
    if (frontmatter.featuredImage) {
      const url = frontmatter.featuredImage;
      if (!urlMap.has(url)) urlMap.set(url, []);
      urlMap.get(url).push({ file: slug + '.mdx', line: 0, context: 'featuredImage' });
    }

    // 4.1 — Markdown images
    const images = extractMarkdownImages(content);
    for (const img of images) {
      if (!urlMap.has(img.url)) urlMap.set(img.url, []);
      urlMap.get(img.url).push({ file: slug + '.mdx', line: img.line, context: 'content' });

      // 4.4 — Alt text check
      if (!img.alt || img.alt.trim() === '') {
        altIssues.push({ file: slug + '.mdx', url: img.url, line: img.line });
      }
    }
  }

  // Report alt text issues
  for (const issue of altIssues) {
    report.addIssue(issue.file, '4.4', 'warn',
      `Image missing alt text at line ${issue.line}: ${issue.url}`);
  }

  // Batch check all unique image URLs
  const allUrls = [...urlMap.keys()].filter(u =>
    u.startsWith('http://') || u.startsWith('https://')
  );
  console.log(`  Checking ${allUrls.length} unique image URLs (concurrency=${CONCURRENCY})...`);

  const results = [];
  let idx = 0;
  let running = 0;
  let completed = 0;

  await new Promise(resolve => {
    function next() {
      while (running < CONCURRENCY && idx < allUrls.length) {
        const url = allUrls[idx++];
        running++;
        sleep(DELAY * (running - 1)).then(async () => {
          const result = await checkUrl(url, { timeout: TIMEOUT });
          results.push(result);
          running--;
          completed++;
          if (completed % 50 === 0) {
            console.log(`    ... ${completed}/${allUrls.length} images checked`);
          }
          if (completed === allUrls.length) resolve();
          else next();
        });
      }
    }
    if (allUrls.length === 0) resolve();
    else next();
  });

  // Report broken images
  let wpImageCount = 0;
  let wpImageBroken = 0;

  for (const result of results) {
    const locations = urlMap.get(result.url);
    const isWpImage = result.url.includes('wp-content/uploads');

    if (isWpImage) wpImageCount++;

    if (!result.ok) {
      if (isWpImage) wpImageBroken++;

      for (const loc of locations) {
        const checkId = loc.context === 'featuredImage' ? '4.2' : isWpImage ? '4.3' : '4.1';
        report.addIssue(loc.file, checkId, 'fail',
          `Image inaccessible: ${result.url} → ${result.status || result.error} (line ${loc.line})`);
      }
    }
  }

  const json = report.toJSON();
  const okCount = results.filter(r => r.ok).length;
  json.meta = {
    filesScanned: files.length,
    uniqueImages: allUrls.length,
    accessible: okCount,
    broken: allUrls.length - okCount,
    wpImages: wpImageCount,
    wpImagesBroken: wpImageBroken,
    missingAlt: altIssues.length,
  };

  writeReport('images', json);
  printSummary('images', json);
  return json;
}

if (isStandalone(import.meta.url)) {
  run().catch(err => { console.error(err); process.exit(1); });
}
