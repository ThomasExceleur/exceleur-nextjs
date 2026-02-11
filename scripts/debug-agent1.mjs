/**
 * Debug: replicate agent1's exact logic for specific slugs
 */
process.env.WORDPRESS_USER = 'Fonzy59';
process.env.WORDPRESS_APP_PASSWORD = 'siww aoCm ShPj B3iV jtiF MmDZ';

import {
  listMdxFiles, slugFromPath, readMdxFile, countWords,
  fetchAllWpPosts,
} from './agents/utils.mjs';

const TARGET_SLUGS = new Set([
  'excel-recherche-multicriteres',
  'excel-afficher-le-jour-de-la-semaine-2',
  'excel-remplacer-une-couleur-par-une-autre',
  'excel-formule-somme',
  'nb-si-ens-excel-compter-additionner',
]);

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

async function debug() {
  console.log('Fetching WP posts...');
  const wpPosts = await fetchAllWpPosts('id,title,slug,content');
  const wpMap = new Map();
  wpPosts.forEach(p => wpMap.set(p.slug, p));

  const files = listMdxFiles();
  console.log(`Total MDX files: ${files.length}\n`);

  for (const file of files) {
    const slug = slugFromPath(file);
    if (!TARGET_SLUGS.has(slug)) continue;

    const wp = wpMap.get(slug);
    const { content: mdxContent } = readMdxFile(file);
    const wpHtml = wp?.content?.rendered || '';
    const wpText = stripHtml(wpHtml);
    const wpWords = countWords(wpText);
    const mdxWords = countWords(mdxContent);
    const ratio = wpWords > 0 ? (mdxWords / wpWords).toFixed(2) : 'N/A';

    console.log(`${slug}:`);
    console.log(`  File: ${file}`);
    console.log(`  MDX body: ${mdxWords} words (${mdxContent.length} chars)`);
    console.log(`  WP text: ${wpWords} words (${wpText.length} chars)`);
    console.log(`  Ratio: ${ratio}`);
    console.log(`  WP HTML length: ${wpHtml.length}`);
    console.log(`  WP slug match: ${wp ? 'yes' : 'NO'}`);
    console.log('');
  }
}

debug().catch(err => { console.error(err); process.exit(1); });
