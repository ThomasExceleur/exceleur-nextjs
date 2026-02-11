import fs from 'fs';
import path from 'path';
import TurndownService from 'turndown';

// ─── Config ────────────────────────────────────────────────────────────────────
const WP_URL = 'https://www.exceleur.fr';
const WP_API = `${WP_URL}/wp-json/wp/v2`;
const AUTH = 'Basic ' + Buffer.from('Fonzy59:siww aoCm ShPj B3iV jtiF MmDZ').toString('base64');
const OUTPUT_DIR = path.resolve('content/blog');
const BATCH_SIZE = 100; // max per_page for WP API
const DELAY_MS = 500; // delay between batches to avoid rate-limiting

// ─── Turndown (HTML → Markdown) ────────────────────────────────────────────────
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

// Preserve Excel code blocks
turndown.addRule('preCode', {
  filter: (node) => node.nodeName === 'PRE' && node.querySelector('code'),
  replacement: (_content, node) => {
    const code = node.querySelector('code');
    const lang = code.className?.replace('language-', '') || '';
    return `\n\n\`\`\`${lang}\n${code.textContent.trim()}\n\`\`\`\n\n`;
  },
});

// Remove WordPress-specific elements (ads, CTAs, shortcodes)
turndown.addRule('removeWpElements', {
  filter: (node) => {
    const cls = node.className || '';
    return (
      cls.includes('wp-block-buttons') ||
      cls.includes('wp-block-button') ||
      cls.includes('elementor-') ||
      cls.includes('newsletter') ||
      cls.includes('lead-magnet') ||
      node.tagName === 'SCRIPT' ||
      node.tagName === 'STYLE' ||
      node.tagName === 'NOSCRIPT'
    );
  },
  replacement: () => '',
});

// ─── API Helpers ────────────────────────────────────────────────────────────────
async function wpFetch(endpoint, params = {}) {
  const url = new URL(`${WP_API}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { Authorization: AUTH },
  });

  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText} - ${url}`);
  }

  const total = parseInt(res.headers.get('X-WP-Total') || '0', 10);
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0', 10);
  const data = await res.json();

  return { data, total, totalPages };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Fetch all items with pagination ────────────────────────────────────────────
async function fetchAll(endpoint, fields, extraParams = {}) {
  const allItems = [];
  let page = 1;
  let totalPages = 1;

  do {
    const { data, totalPages: tp } = await wpFetch(endpoint, {
      per_page: BATCH_SIZE,
      page: page.toString(),
      _fields: fields,
      ...extraParams,
    });
    totalPages = tp;
    allItems.push(...data);
    console.log(`  Fetched ${endpoint} page ${page}/${totalPages} (${data.length} items)`);
    page++;
    if (page <= totalPages) await sleep(DELAY_MS);
  } while (page <= totalPages);

  return allItems;
}

// ─── Build lookup maps ──────────────────────────────────────────────────────────
async function buildCategoryMap() {
  const cats = await fetchAll('categories', 'id,name,slug', { per_page: '100' });
  const map = {};
  cats.forEach((c) => (map[c.id] = c.name));
  return map;
}

async function buildTagMap() {
  const allTags = [];
  let page = 1;
  let totalPages = 1;

  do {
    const { data, totalPages: tp } = await wpFetch('tags', {
      per_page: '100',
      page: page.toString(),
      _fields: 'id,name,slug',
    });
    totalPages = tp;
    allTags.push(...data);
    console.log(`  Fetched tags page ${page}/${totalPages} (${data.length} items)`);
    page++;
    if (page <= totalPages) await sleep(DELAY_MS);
  } while (page <= totalPages);

  const map = {};
  allTags.forEach((t) => (map[t.id] = t.name));
  return map;
}

// ─── Clean HTML content ─────────────────────────────────────────────────────────
function cleanHtml(html) {
  return html
    // Remove WordPress shortcodes
    .replace(/\[\/?\w+[^\]]*\]/g, '')
    // Remove inline styles
    .replace(/ style="[^"]*"/g, '')
    // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/g, '')
    // Remove &nbsp;
    .replace(/&nbsp;/g, ' ')
    // Fix common HTML entities
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&hellip;/g, '…');
}

// ─── Convert HTML to clean Markdown ─────────────────────────────────────────────
function htmlToMarkdown(html) {
  const cleaned = cleanHtml(html);
  let md = turndown.turndown(cleaned);

  // Clean up excessive newlines
  md = md.replace(/\n{4,}/g, '\n\n\n');
  // Fix heading spacing
  md = md.replace(/\n(#{1,6} )/g, '\n\n$1');
  // Trim
  md = md.trim();

  return md;
}

// ─── Build frontmatter ──────────────────────────────────────────────────────────
function escapeYaml(str) {
  if (!str) return '""';
  // Escape quotes and wrap in quotes
  return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function buildFrontmatter(post, categoryMap, tagMap) {
  const title = post.title.rendered
    .replace(/<[^>]+>/g, '') // strip HTML tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8217;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ');

  const date = post.date.split('T')[0]; // YYYY-MM-DD

  const excerpt = (post.excerpt?.rendered || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\n/g, ' ')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .trim()
    .substring(0, 300);

  const categories = (post.categories || [])
    .map((id) => categoryMap[id])
    .filter(Boolean);

  const tags = (post.tags || [])
    .map((id) => tagMap[id])
    .filter(Boolean)
    .slice(0, 10); // limit tags

  const primaryCategory = categories[0] || 'Uncategorized';

  const lines = [
    '---',
    `title: ${escapeYaml(title)}`,
    `date: "${date}"`,
    `author: "Thomas L'Exceleur"`,
    `excerpt: ${escapeYaml(excerpt)}`,
    `description: ${escapeYaml(excerpt)}`,
    `category: ${escapeYaml(primaryCategory)}`,
  ];

  if (categories.length > 0) {
    lines.push(`catégories: [${categories.map((c) => escapeYaml(c)).join(', ')}]`);
  }

  if (tags.length > 0) {
    lines.push(`tags: [${tags.map((t) => escapeYaml(t)).join(', ')}]`);
  }

  if (post.featured_media_url) {
    lines.push(`featuredImage: "${post.featured_media_url}"`);
  }

  lines.push('---');
  return lines.join('\n');
}

// ─── Fetch featured image URL ───────────────────────────────────────────────────
async function fetchFeaturedImageUrl(mediaId) {
  if (!mediaId || mediaId === 0) return null;
  try {
    const { data } = await wpFetch(`media/${mediaId}`, { _fields: 'source_url' });
    return data.source_url || null;
  } catch {
    return null;
  }
}

// ─── Main migration ─────────────────────────────────────────────────────────────
async function migrate() {
  console.log('=== WordPress → MDX Migration ===\n');

  // 1. Build lookup maps
  console.log('1. Fetching categories...');
  const categoryMap = await buildCategoryMap();
  console.log(`   → ${Object.keys(categoryMap).length} categories loaded\n`);

  console.log('2. Fetching tags...');
  const tagMap = await buildTagMap();
  console.log(`   → ${Object.keys(tagMap).length} tags loaded\n`);

  // 2. Fetch all posts
  console.log('3. Fetching all posts...');
  const posts = await fetchAll(
    'posts',
    'id,title,slug,date,content,excerpt,categories,tags,featured_media',
    { status: 'publish' }
  );
  console.log(`   → ${posts.length} posts fetched\n`);

  // 3. Backup existing MDX files
  const backupDir = path.resolve('content/blog-backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log(`4. Created backup directory: ${backupDir}`);
    // Copy existing files to backup
    const existingFiles = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith('.mdx'));
    for (const file of existingFiles) {
      fs.copyFileSync(path.join(OUTPUT_DIR, file), path.join(backupDir, file));
    }
    console.log(`   → Backed up ${existingFiles.length} existing MDX files\n`);
  } else {
    console.log('4. Backup directory already exists, skipping backup\n');
  }

  // 4. Process each post
  console.log('5. Converting and writing MDX files...');
  let written = 0;
  let skipped = 0;
  let errors = 0;
  const report = { written: [], skipped: [], errors: [] };

  for (const post of posts) {
    try {
      const slug = post.slug;
      if (!slug) {
        skipped++;
        report.skipped.push({ id: post.id, reason: 'no slug' });
        continue;
      }

      // Fetch featured image if present
      if (post.featured_media && post.featured_media > 0) {
        post.featured_media_url = await fetchFeaturedImageUrl(post.featured_media);
      }

      // Build frontmatter
      const frontmatter = buildFrontmatter(post, categoryMap, tagMap);

      // Convert content
      const htmlContent = post.content?.rendered || '';
      if (!htmlContent.trim()) {
        skipped++;
        report.skipped.push({ id: post.id, slug, reason: 'empty content' });
        continue;
      }

      const markdown = htmlToMarkdown(htmlContent);

      // Extract first H1 or use title
      const title = post.title.rendered
        .replace(/<[^>]+>/g, '')
        .replace(/&rsquo;/g, "'")
        .replace(/&#8217;/g, "'")
        .replace(/&amp;/g, '&');

      // Build final MDX content
      const mdxContent = `${frontmatter}\n\n# ${title}\n\n${markdown}\n`;

      // Write file
      const filePath = path.join(OUTPUT_DIR, `${slug}.mdx`);
      fs.writeFileSync(filePath, mdxContent, 'utf-8');
      written++;

      if (written % 50 === 0) {
        console.log(`   ... ${written}/${posts.length} written`);
      }
    } catch (err) {
      errors++;
      report.errors.push({ id: post.id, slug: post.slug, error: err.message });
      console.error(`   ✗ Error on post ${post.id} (${post.slug}): ${err.message}`);
    }
  }

  // 5. Summary
  console.log('\n=== Migration Complete ===');
  console.log(`Written:  ${written}`);
  console.log(`Skipped:  ${skipped}`);
  console.log(`Errors:   ${errors}`);
  console.log(`Total:    ${posts.length}`);

  // Write report
  const reportPath = path.resolve('scripts/migration-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\nReport saved to: ${reportPath}`);

  // 6. Check for orphan MDX files (in Next.js but not in WordPress)
  const wpSlugs = new Set(posts.map((p) => p.slug));
  const existingMdx = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith('.mdx'));
  const orphans = existingMdx
    .map((f) => f.replace('.mdx', ''))
    .filter((slug) => !wpSlugs.has(slug));

  if (orphans.length > 0) {
    console.log(`\nOrphan MDX files (not in WordPress): ${orphans.length}`);
    const orphanPath = path.resolve('scripts/orphan-files.json');
    fs.writeFileSync(orphanPath, JSON.stringify(orphans, null, 2), 'utf-8');
    console.log(`Orphan list saved to: ${orphanPath}`);
  }
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
