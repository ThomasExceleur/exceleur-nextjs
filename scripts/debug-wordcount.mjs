/**
 * Debug word counting discrepancy between manual check and agent1
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.resolve('content/blog');

function countWords(text) {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

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

const AUTH = 'Basic ' + Buffer.from('Fonzy59:siww aoCm ShPj B3iV jtiF MmDZ').toString('base64');

const slugs = [
  'excel-recherche-multicriteres',
  'excel-afficher-le-jour-de-la-semaine-2',
  'excel-remplacer-une-couleur-par-une-autre',
  'excel-formule-somme',
  'nb-si-ens-excel-compter-additionner',
];

async function debug() {
  // Fetch WP posts for these slugs
  for (const slug of slugs) {
    const filePath = path.join(BLOG_DIR, slug + '.mdx');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    const mdxWords = countWords(content);

    // Fetch WP
    const res = await fetch(`https://www.exceleur.fr/wp-json/wp/v2/posts?slug=${slug}&_fields=content`, {
      headers: { Authorization: AUTH },
    });
    const posts = await res.json();
    const wpHtml = posts[0]?.content?.rendered || '';
    const wpText = stripHtml(wpHtml);
    const wpWords = countWords(wpText);

    const ratio = wpWords > 0 ? (mdxWords / wpWords).toFixed(2) : 'N/A';

    console.log(`${slug}:`);
    console.log(`  MDX body: ${mdxWords} words, ${content.length} chars`);
    console.log(`  WP stripped: ${wpWords} words, ${wpText.length} chars`);
    console.log(`  Ratio: ${ratio}`);

    // Check if content has unusual characters
    const nullChars = (content.match(/\x00/g) || []).length;
    const weirdChars = (content.match(/[\x00-\x08\x0E-\x1F]/g) || []).length;
    if (nullChars > 0 || weirdChars > 0) {
      console.log(`  WARNING: ${nullChars} null chars, ${weirdChars} weird control chars`);
    }

    console.log('');
  }
}

debug().catch(err => { console.error(err); process.exit(1); });
