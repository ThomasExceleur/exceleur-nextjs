/**
 * Re-migrate truncated articles from WordPress.
 * Targets only the 10 articles identified by agent1-content-diff
 * with word ratio < 0.75 (content may be truncated).
 */
import fs from 'fs';
import path from 'path';
import TurndownService from 'turndown';

// ─── Config ────────────────────────────────────────────────────────────────────
const WP_URL = 'https://www.exceleur.fr';
const WP_API = `${WP_URL}/wp-json/wp/v2`;
const AUTH = 'Basic ' + Buffer.from('Fonzy59:siww aoCm ShPj B3iV jtiF MmDZ').toString('base64');
const OUTPUT_DIR = path.resolve('content/blog');

// The 10 truncated articles (word ratio < 0.75)
const TRUNCATED_SLUGS = [
  'excel-recherche-multicriteres',            // 0.57
  'excel-remplacer-une-couleur-par-une-autre', // 0.60
  'excel-additionner-les-heures-et-les-minutes-2', // 0.61
  'excel-afficher-le-jour-de-la-semaine-2',   // 0.61
  'excel-formule-si',                         // 0.61
  'quelle-formule-excel-pour-additionner-des-heures', // 0.66
  'excel-sous-total',                         // 0.66
  'excel-formule-somme',                      // 0.71
  'nb-si-ens-excel-compter-additionner',      // 0.72
  'excel-calcul-de-la-tva',                   // 0.74
];

// ─── Turndown (HTML → Markdown) — same config as migrate-wordpress.mjs ───────
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

// ─── Helpers (same as migrate-wordpress.mjs) ─────────────────────────────────
async function wpFetch(endpoint, params = {}) {
  const url = new URL(`${WP_API}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: { Authorization: AUTH },
  });
  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText} - ${url}`);
  }
  return res.json();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Escape unescaped < inside <code> tags so Turndown's HTML parser
 * doesn't treat Excel formulas like =SI(B2<A2,...) as HTML tags.
 */
function escapeCodeContent(html) {
  return html.replace(/<code([^>]*)>([\s\S]*?)<\/code>/gi, (match, attrs, content) => {
    // Replace raw < that are not part of HTML entities (&lt;)
    const escaped = content.replace(/</g, '&lt;');
    return `<code${attrs}>${escaped}</code>`;
  });
}

/**
 * Fix unclosed <code> tags (e.g. <strong>Ctrl + <code></strong>)
 * that would produce orphan backticks in Turndown output.
 */
function fixUnclosedCode(html) {
  // Remove <code> tags that have no matching </code> before the next closing tag
  return html.replace(/<code([^>]*)>(?=[^<]*<\/(?!code))/gi, '');
}

function cleanHtml(html) {
  let h = fixUnclosedCode(html);  // Must run before escapeCodeContent
  h = escapeCodeContent(h);
  return h
    .replace(/\[\/?\w+[^\]]*\]/g, '')
    .replace(/ style="[^"]*"/g, '')
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/&nbsp;/g, ' ')
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

function htmlToMarkdown(html) {
  const cleaned = cleanHtml(html);
  let md = turndown.turndown(cleaned);
  md = md.replace(/\n{4,}/g, '\n\n\n');
  md = md.replace(/\n(#{1,6} )/g, '\n\n$1');
  md = md.trim();
  return md;
}

function escapeYaml(str) {
  if (!str) return '""';
  return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function decodeTitle(rendered) {
  return rendered
    .replace(/<[^>]+>/g, '')
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
}

function decodeExcerpt(rendered) {
  return (rendered || '')
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
}

async function fetchFeaturedImageUrl(mediaId) {
  if (!mediaId || mediaId === 0) return null;
  try {
    const data = await wpFetch(`media/${mediaId}`, { _fields: 'source_url' });
    return data.source_url || null;
  } catch {
    return null;
  }
}

function buildFrontmatter(post, categoryMap, tagMap) {
  const title = decodeTitle(post.title.rendered);
  const date = post.date.split('T')[0];
  const excerpt = decodeExcerpt(post.excerpt?.rendered);

  const categories = (post.categories || [])
    .map((id) => categoryMap[id])
    .filter(Boolean);

  const tags = (post.tags || [])
    .map((id) => tagMap[id])
    .filter(Boolean)
    .slice(0, 10);

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

// ─── Count words (for before/after comparison) ──────────────────────────────
function countWords(text) {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&\w+;/g, ' ')
    .replace(/&#\d+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Main ───────────────────────────────────────────────────────────────────────
async function remigrate() {
  console.log('=== Re-migration of truncated articles ===\n');

  // 1. Fetch category and tag maps
  console.log('1. Fetching categories...');
  const catData = await wpFetch('categories', { per_page: '100', _fields: 'id,name,slug' });
  const categoryMap = {};
  catData.forEach(c => categoryMap[c.id] = c.name);
  console.log(`   → ${Object.keys(categoryMap).length} categories\n`);

  console.log('2. Fetching tags...');
  const allTags = [];
  let tagPage = 1;
  let tagTotalPages = 1;
  do {
    const res = await fetch(`${WP_API}/tags?per_page=100&page=${tagPage}&_fields=id,name,slug`, {
      headers: { Authorization: AUTH },
    });
    const totalPagesHeader = res.headers.get('X-WP-TotalPages');
    tagTotalPages = parseInt(totalPagesHeader || '1', 10);
    const data = await res.json();
    allTags.push(...data);
    console.log(`   Fetched tags page ${tagPage}/${tagTotalPages} (${data.length} items)`);
    tagPage++;
    if (tagPage <= tagTotalPages) await sleep(500);
  } while (tagPage <= tagTotalPages);
  const tagMap = {};
  allTags.forEach(t => tagMap[t.id] = t.name);
  console.log(`   → ${Object.keys(tagMap).length} tags\n`);

  // 2. Fetch and re-migrate each truncated article
  console.log(`3. Re-migrating ${TRUNCATED_SLUGS.length} articles...\n`);

  let success = 0;
  let errors = 0;

  for (const slug of TRUNCATED_SLUGS) {
    try {
      // Fetch article by slug
      const posts = await wpFetch('posts', {
        slug,
        _fields: 'id,title,slug,date,content,excerpt,categories,tags,featured_media',
        status: 'publish',
      });

      if (!posts || posts.length === 0) {
        console.log(`   ✗ ${slug}: not found in WordPress`);
        errors++;
        continue;
      }

      const post = posts[0];
      const htmlContent = post.content?.rendered || '';

      if (!htmlContent.trim()) {
        console.log(`   ✗ ${slug}: empty content`);
        errors++;
        continue;
      }

      // Read existing file for word count comparison
      const filePath = path.join(OUTPUT_DIR, `${slug}.mdx`);
      const oldContent = fs.existsSync(filePath)
        ? fs.readFileSync(filePath, 'utf-8')
        : '';
      const oldWords = countWords(oldContent);

      // Fetch featured image
      if (post.featured_media && post.featured_media > 0) {
        post.featured_media_url = await fetchFeaturedImageUrl(post.featured_media);
      }

      // Build new MDX
      const frontmatter = buildFrontmatter(post, categoryMap, tagMap);
      const markdown = htmlToMarkdown(htmlContent);
      const title = decodeTitle(post.title.rendered);
      const mdxContent = `${frontmatter}\n\n# ${title}\n\n${markdown}\n`;

      // Word counts for comparison
      const wpWords = countWords(stripHtml(htmlContent));
      const newMdxWords = countWords(mdxContent);
      const newRatio = wpWords > 0 ? (newMdxWords / wpWords).toFixed(2) : 'N/A';

      // Write file
      fs.writeFileSync(filePath, mdxContent, 'utf-8');
      success++;

      console.log(`   ✓ ${slug}`);
      console.log(`     Old: ${oldWords} words → New: ${newMdxWords} words (WP: ${wpWords}, ratio: ${newRatio})`);
    } catch (err) {
      console.log(`   ✗ ${slug}: ${err.message}`);
      errors++;
    }

    await sleep(300); // respect rate limits
  }

  console.log(`\n=== Done ===`);
  console.log(`Success: ${success}`);
  console.log(`Errors:  ${errors}`);
}

remigrate().catch(err => {
  console.error('Re-migration failed:', err);
  process.exit(1);
});
