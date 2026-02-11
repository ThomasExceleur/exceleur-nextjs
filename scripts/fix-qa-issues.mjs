#!/usr/bin/env node
/**
 * Automated fix for QA issues found by the pipeline.
 * Modifies MDX files in-place.
 *
 * Fixes:
 *  1. Absolute exceleur.fr URLs → relative
 *  2. -bg suffix slugs (guide-ultime-tcd-bg → guide-ultime-tcd, etc.)
 *  3. Placeholder links (lien-interne-*, example.com, lone "/")
 *  4. Malformed URLs (http://www)
 *  5. Broken internal links pointing to non-existent slugs → remove link, keep text
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, '..', 'content', 'blog');

// Known non-existent internal slugs to remove (keep link text, remove href)
const BROKEN_INTERNAL_SLUGS = new Set([
  'formules-excel',
  'recherchev-excel',
  'tableaux-croises-dynamiques',
  'graphiques-excel',
  'fonctions-excel',
  'formule-si-et-excel',
  'figer-cellule-excel',
  'mise-en-forme-conditionnelle-excel',
  'fonctions-date-excel',
  'fonctions-base-donnees',
  'formules-matricielles',
  'excel-index-equiv',
  'excel-formule-si-et',
  'fonctions-excel-avancees',
  'tableau-bord-excel',
  'fonctions-excel-essentielles',
  'references-cellules-excel',
  'optimiser-performances-excel',
  'optimiser-excel',
  'excel-ne-repond-pas',
  'recuperer-fichier-excel',
  'formules-avancees-excel',
  'vba-excel-automatisation',
  'moyenne-ponderee-excel',
  'index-equiv-excel',
  'ecart-type-excel',
]);

// Slug corrections (-bg suffix variants)
const SLUG_CORRECTIONS = {
  'guide-ultime-tcd-bg': 'guide-ultime-tcd',
  'raccourcis-indispensables-excel-bg': 'raccourcis-indispensables-excel',
};

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  const fileName = path.basename(filePath);
  const changes = [];

  // 1. Fix absolute exceleur.fr URLs in Markdown links → relative
  content = content.replace(
    /\[([^\]]*)\]\(https?:\/\/(?:www\.)?exceleur\.fr\/([^)]*)\)/g,
    (match, text, urlPath) => {
      // Normalize: ensure leading slash, keep trailing slash
      let relative = '/' + urlPath.replace(/^\//, '');
      if (!relative.endsWith('/')) relative += '/';

      // Extract slug from path for broken link check
      const slug = urlPath.replace(/^\//, '').replace(/\/$/, '');

      // Check if this slug (after corrections) exists or is broken
      const correctedSlug = SLUG_CORRECTIONS[slug] || slug;
      if (correctedSlug !== slug) {
        relative = '/' + correctedSlug + '/';
        changes.push(`  slug-fix: ${slug} → ${correctedSlug}`);
      }

      // Check if the slug (after path extraction) is a broken internal link
      const leafSlug = correctedSlug.split('/').pop();
      if (BROKEN_INTERNAL_SLUGS.has(leafSlug) || BROKEN_INTERNAL_SLUGS.has(correctedSlug)) {
        changes.push(`  broken-link-removed: [${text}](${match.match(/\(([^)]+)\)/)[1]}) → plain text`);
        return text; // Remove link, keep text
      }

      changes.push(`  absolute→relative: ${match.match(/\(([^)]+)\)/)[1]} → ${relative}`);
      return `[${text}](${relative})`;
    }
  );

  // 2. Fix placeholder links
  // lien-interne-* patterns
  content = content.replace(
    /\[([^\]]*)\]\(lien-interne-\d+\)/g,
    (match, text) => {
      changes.push(`  placeholder-removed: ${match} → plain text`);
      return text;
    }
  );
  // href="/" lone slash (only if it's a Markdown link)
  content = content.replace(
    /\[([^\]]+)\]\(\/\)/g,
    (match, text) => {
      changes.push(`  placeholder-slash: ${match} → plain text`);
      return text;
    }
  );
  // example.com
  content = content.replace(
    /\[([^\]]*)\]\(https?:\/\/example\.com[^)]*\)/g,
    (match, text) => {
      changes.push(`  placeholder-example: ${match} → plain text`);
      return text;
    }
  );

  // 3. Fix malformed URL http://www (no domain)
  content = content.replace(
    /\[([^\]]*)\]\(http:\/\/www\)/g,
    (match, text) => {
      changes.push(`  malformed-url: ${match} → plain text`);
      return text;
    }
  );

  // 4. Fix remaining broken internal links (relative format)
  // Pattern: [text](/broken-slug/) where broken-slug is in our set
  for (const slug of BROKEN_INTERNAL_SLUGS) {
    const re = new RegExp(`\\[([^\\]]*)\\]\\(\\/${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/\\)`, 'g');
    content = content.replace(re, (match, text) => {
      changes.push(`  broken-relative-removed: [${text}](/${slug}/) → plain text`);
      return text;
    });
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Fixed: ${fileName} (${changes.length} changes)`);
    if (process.argv.includes('--verbose')) {
      changes.forEach(c => console.log(c));
    }
    return changes.length;
  }
  return 0;
}

// Main
const files = fs.readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.mdx'))
  .map(f => path.join(BLOG_DIR, f));

console.log(`Scanning ${files.length} MDX files for fixable issues...\n`);

let totalChanges = 0;
let filesChanged = 0;

for (const file of files) {
  const n = fixFile(file);
  if (n > 0) {
    totalChanges += n;
    filesChanged++;
  }
}

console.log(`\nDone: ${totalChanges} changes across ${filesChanged} files.`);
