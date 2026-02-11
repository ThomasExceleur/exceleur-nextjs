/**
 * Agent 3 — SEO Compliance (Phase A)
 * Verifies title, description, slug, date, and category mapping
 * between WordPress and MDX, plus duplicate detection.
 */
import {
  listMdxFiles, slugFromPath, readMdxFile,
  fetchAllWpPosts, buildWpCategoryMap,
  createReport, writeReport, printSummary,
  parseArgs, isStandalone,
} from './utils.mjs';

/**
 * Decode HTML entities in WP titles/excerpts
 */
function decodeEntities(str) {
  if (!str) return '';
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '\u2013')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#8230;/g, '\u2026')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&hellip;/g, '\u2026')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .trim();
}

/**
 * Normalize string for comparison
 */
function normalize(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Run SEO checks
 */
export async function run(options = {}) {
  const args = parseArgs();
  const report = createReport('seo');

  // Get WP data
  let wpPosts, wpCategoryMap;

  if (options.wpPostMap) {
    wpPosts = [...options.wpPostMap.values()];
    wpCategoryMap = options.wpCategoryMap || new Map();
    console.log(`  Using pre-fetched WP data (${wpPosts.length} posts)`);
  } else {
    console.log('  Fetching WP posts and categories...');
    wpPosts = await fetchAllWpPosts('id,title,slug,date,excerpt,categories');
    wpCategoryMap = await buildWpCategoryMap();
  }

  const wpMap = new Map();
  wpPosts.forEach(p => wpMap.set(p.slug, p));

  // Get MDX files
  let files = listMdxFiles();
  const allFiles = listMdxFiles(); // Keep full list for duplicate detection
  if (args.slug) {
    files = files.filter(f => slugFromPath(f) === args.slug);
  }

  console.log(`  Checking SEO for ${files.length} MDX files...`);

  // 3.7 — Duplicate detection (always on full corpus)
  const titleMap = new Map(); // normalized title -> [slug]
  const descMap = new Map();  // normalized desc -> [slug]

  for (const file of allFiles) {
    const slug = slugFromPath(file);
    const { frontmatter } = readMdxFile(file);

    const normTitle = normalize(frontmatter.title || '');
    const normDesc = normalize(frontmatter.description || '');

    if (normTitle) {
      if (!titleMap.has(normTitle)) titleMap.set(normTitle, []);
      titleMap.get(normTitle).push(slug);
    }
    if (normDesc) {
      if (!descMap.has(normDesc)) descMap.set(normDesc, []);
      descMap.get(normDesc).push(slug);
    }
  }

  // Report duplicates
  for (const [title, slugs] of titleMap) {
    if (slugs.length > 1) {
      for (const slug of slugs) {
        report.addIssue(slug + '.mdx', '3.7', 'warn',
          `Duplicate title found across ${slugs.length} articles`,
          { duplicates: slugs });
      }
    }
  }
  for (const [desc, slugs] of descMap) {
    if (slugs.length > 1) {
      for (const slug of slugs) {
        report.addIssue(slug + '.mdx', '3.7', 'warn',
          `Duplicate description found across ${slugs.length} articles`,
          { duplicates: slugs });
      }
    }
  }

  // Per-file checks
  let checked = 0;
  for (const file of files) {
    const slug = slugFromPath(file);
    const { frontmatter } = readMdxFile(file);
    const wp = wpMap.get(slug);

    if (!wp) continue; // No WP post to compare

    // 3.1 — Title match
    const wpTitle = decodeEntities(wp.title?.rendered || '');
    const mdxTitle = frontmatter.title || '';
    if (normalize(wpTitle) !== normalize(mdxTitle)) {
      report.addIssue(slug + '.mdx', '3.1', 'warn',
        `Title mismatch — WP: "${wpTitle.substring(0, 60)}" vs MDX: "${mdxTitle.substring(0, 60)}"`);
    }

    // 3.2 — Description present and > 100 chars
    const desc = frontmatter.description || frontmatter.excerpt || '';
    if (!desc) {
      report.addIssue(slug + '.mdx', '3.2', 'fail',
        'Missing description in frontmatter');
    } else if (desc.length < 100) {
      report.addIssue(slug + '.mdx', '3.2', 'warn',
        `Description too short (${desc.length} chars, min 100)`);
    }

    // 3.3 — Slug match
    if (wp.slug !== slug) {
      report.addIssue(slug + '.mdx', '3.3', 'fail',
        `Slug mismatch — WP: "${wp.slug}" vs file: "${slug}"`);
    }

    // 3.4 — Date preserved
    const wpDate = (wp.date || '').split('T')[0];
    const mdxDate = (frontmatter.date || '').split('T')[0];
    if (wpDate && mdxDate && wpDate !== mdxDate) {
      report.addIssue(slug + '.mdx', '3.4', 'warn',
        `Date mismatch — WP: ${wpDate} vs MDX: ${mdxDate}`);
    }

    // 3.5 — Categories correctly mapped
    const wpCatIds = wp.categories || [];
    const wpCatNames = wpCatIds.map(id => wpCategoryMap.get(id)).filter(Boolean);
    const mdxCats = frontmatter['catégories'] || frontmatter.categories || [];

    if (wpCatNames.length > 0) {
      const wpCatNorms = new Set(wpCatNames.map(normalize));
      const mdxCatNorms = new Set(mdxCats.map(normalize));

      for (const wpCat of wpCatNorms) {
        if (!mdxCatNorms.has(wpCat)) {
          report.addIssue(slug + '.mdx', '3.5', 'warn',
            `WP category "${[...wpCatNames].find(c => normalize(c) === wpCat)}" not found in MDX categories`);
        }
      }
    }

    checked++;
    if (checked % 100 === 0) {
      console.log(`    ... ${checked}/${files.length} checked`);
    }
  }

  const json = report.toJSON();
  json.meta = {
    filesChecked: checked,
    wpPostCount: wpPosts.length,
    duplicateTitles: [...titleMap.values()].filter(s => s.length > 1).length,
    duplicateDescs: [...descMap.values()].filter(s => s.length > 1).length,
  };

  writeReport('seo', json);
  printSummary('seo', json);
  return json;
}

if (isStandalone(import.meta.url)) {
  run().catch(err => { console.error(err); process.exit(1); });
}
