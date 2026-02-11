/**
 * Agent 1 — Content Diff (Phase A)
 * Compares WordPress content with MDX files:
 * word count ratio and heading coverage.
 */
import {
  listMdxFiles, slugFromPath, readMdxFile,
  extractHeadings, countWords,
  fetchAllWpPosts,
  createReport, writeReport, printSummary,
  parseArgs, isStandalone,
} from './utils.mjs';

/**
 * Strip HTML tags from WP content for word counting
 */
function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&hellip;/g, '...')
    .replace(/&amp;/g, '&')
    .replace(/&#\d+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Decode HTML entities in text
 */
function decodeEntities(str) {
  return str
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '\u2013')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#8230;/g, '\u2026')
    .replace(/&hellip;/g, '\u2026')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
}

/**
 * Extract headings from WP HTML content
 */
function extractHtmlHeadings(html) {
  const headings = [];
  const re = /<h([2-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const level = parseInt(m[1], 10);
    const text = decodeEntities(m[2].replace(/<[^>]+>/g, '')).trim();
    if (text) headings.push({ level, text });
  }
  return headings;
}

/**
 * Normalize heading text for fuzzy comparison
 */
function normalizeHeading(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Run content diff checks
 */
export async function run(options = {}) {
  const args = parseArgs();
  const report = createReport('content-diff');

  // Get WP posts (from orchestrator or fetch directly)
  let wpPosts;
  if (options.wpPostMap) {
    wpPosts = [...options.wpPostMap.values()];
    console.log(`  Using pre-fetched WP data (${wpPosts.length} posts)`);
  } else {
    console.log('  Fetching WP posts...');
    wpPosts = await fetchAllWpPosts('id,title,slug,content');
  }

  // Build slug -> WP post map
  const wpMap = new Map();
  wpPosts.forEach(p => wpMap.set(p.slug, p));

  // Get MDX files
  let files = listMdxFiles();
  if (args.slug) {
    files = files.filter(f => slugFromPath(f) === args.slug);
  }

  console.log(`  Comparing ${files.length} MDX files against WP content...`);

  let checked = 0;
  for (const file of files) {
    const slug = slugFromPath(file);
    const wp = wpMap.get(slug);

    if (!wp) {
      report.addIssue(slug + '.mdx', '1.0', 'info',
        `No WP post found for slug "${slug}" (may be local-only)`);
      continue;
    }

    const { content: mdxContent } = readMdxFile(file);
    const wpHtml = wp.content?.rendered || '';

    // 1.1 — Word count ratio
    const wpText = stripHtml(wpHtml);
    const wpWords = countWords(wpText);
    const mdxWords = countWords(mdxContent);

    if (wpWords > 0) {
      const ratio = mdxWords / wpWords;
      if (ratio < 0.75) {
        report.addIssue(slug + '.mdx', '1.1', 'fail',
          `Word ratio ${ratio.toFixed(2)} (MDX: ${mdxWords}, WP: ${wpWords}) — content may be truncated`);
      } else if (ratio < 0.90) {
        report.addIssue(slug + '.mdx', '1.1', 'warn',
          `Word ratio ${ratio.toFixed(2)} (MDX: ${mdxWords}, WP: ${wpWords}) — some content may be missing`);
      }
    }

    // 1.2 — Heading coverage
    const wpHeadings = extractHtmlHeadings(wpHtml);
    const mdxHeadings = extractHeadings(mdxContent);

    const mdxHeadingNorms = new Set(mdxHeadings.map(h => normalizeHeading(h.text)));

    const missingHeadings = [];
    for (const wh of wpHeadings) {
      const norm = normalizeHeading(wh.text);
      if (!norm) continue;
      // Fuzzy match: check if any MDX heading contains the normalized WP heading
      const found = mdxHeadingNorms.has(norm) ||
        [...mdxHeadingNorms].some(mh => mh.includes(norm) || norm.includes(mh));
      if (!found) {
        missingHeadings.push(wh.text);
      }
    }

    if (wpHeadings.length > 0) {
      const matchRate = 1 - missingHeadings.length / wpHeadings.length;
      if (matchRate < 0.90) {
        report.addIssue(slug + '.mdx', '1.2', 'fail',
          `Only ${(matchRate * 100).toFixed(0)}% of WP headings found in MDX`,
          { missing: missingHeadings.slice(0, 5) });
      } else if (missingHeadings.length > 0) {
        report.addIssue(slug + '.mdx', '1.2', 'warn',
          `${missingHeadings.length} WP heading(s) not found in MDX`,
          { missing: missingHeadings });
      }
    }

    checked++;
    if (checked % 100 === 0) {
      console.log(`    ... ${checked}/${files.length} compared`);
    }
  }

  const json = report.toJSON();
  json.meta = {
    filesChecked: checked,
    wpPostCount: wpPosts.length,
  };

  writeReport('content-diff', json);
  printSummary('content-diff', json);
  return json;
}

if (isStandalone(import.meta.url)) {
  run().catch(err => { console.error(err); process.exit(1); });
}
