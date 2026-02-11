#!/usr/bin/env node
/**
 * Fix long lines (>2000 chars) in MDX files.
 * These are caused by the WP migration script concatenating
 * markdown content into a single line.
 *
 * Strategy: insert newlines before common Markdown patterns.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, '..', 'content', 'blog');

const FILES_TO_FIX = [
  'excel-additionner-les-heures-et-les-minutes-2.mdx',
  'excel-budget-familial.mdx',
  'excel-formule-datedif.mdx',
  'excel-formule-si.mdx',
  'excel-formule-somme.mdx',
  'excel-mise-en-forme-conditionnelle.mdx',
  'excel-moyenne-ponderee.mdx',
  'excel-remplacer-une-couleur-par-une-autre.mdx',
  'quelle-formule-excel-pour-additionner-des-heures.mdx',
  'quelle-formule-excel-pour-calculer-lanciennete.mdx',
  'titre-test.mdx',
];

/**
 * Split a long blob of concatenated Markdown back into lines.
 */
function reformatLongLine(line) {
  let text = line;

  // Clean up stray backtick artifacts at boundaries
  // Pattern: `` `` or ``` `` or similar fence noise
  text = text.replace(/`{4,}/g, '```');
  text = text.replace(/``\s*``/g, '');
  text = text.replace(/``_``/g, '');
  text = text.replace(/``\s*_\s*``/g, '\n\n---\n\n');

  // Insert newlines before headings (## ### #### etc.)
  text = text.replace(/\s{2,}(#{2,6}\s)/g, '\n\n$1');

  // Insert newlines before code fences
  text = text.replace(/\s{2,}(```\w*)/g, '\n\n$1\n');

  // Insert newlines after closing code fences
  text = text.replace(/(```)\s{2,}/g, '$1\n\n');

  // Insert newlines before list items (numbered or bulleted)
  text = text.replace(/\s{2,}(\d+\.\s{1,3})/g, '\n$1');
  text = text.replace(/\s{2,}(-\s{1,3})/g, '\n$1');

  // Insert newlines before bold paragraph starters
  text = text.replace(/\s{2,}(\*\*[A-Z])/g, '\n\n$1');

  // Insert newlines around separators (underscore used as hr)
  text = text.replace(/\s{2,}_\s{2,}/g, '\n\n---\n\n');
  text = text.replace(/\s+_\s+(?=[A-Z#*\[])/g, '\n\n---\n\n');

  // Insert newlines between sentences that look like paragraphs
  // (two spaces followed by a capital letter after a period)
  text = text.replace(/\.\s{2,}([A-Z])/g, '.\n\n$1');

  // Insert newlines before "Pour ", "Cette ", "Avec ", etc (common French starters)
  text = text.replace(/\s{2,}(Pour |Cette |Avec |Les |La |Le |Un |Une |Si |Dans |Quand |Voici |Utilisez |Créez |Exemple|Formule|Identifie|Met en |Alerte|Où )/g, '\n\n$1');

  // Clean up table rows that are on the same line
  // Pattern: text  Ville  Heure → split with |
  // This is harder to handle generically, so just ensure spacing

  // Remove excessive blank lines
  text = text.replace(/\n{4,}/g, '\n\n\n');

  // Clean leading/trailing whitespace on each line
  text = text.split('\n').map(l => l.trimEnd()).join('\n');

  return text;
}

function fixFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length > 2000) {
      console.log(`  Line ${i + 1}: ${lines[i].length} chars → reformatting...`);
      lines[i] = reformatLongLine(lines[i]);
      changed = true;
    }
  }

  if (changed) {
    let result = lines.join('\n');

    // Final cleanup: fix orphaned backtick fences
    // Remove stray `` or ` at line starts that aren't code
    result = result.replace(/^``$/gm, '');
    result = result.replace(/^`$/gm, '');

    // Ensure code blocks are properly fenced (``` on its own line)
    result = result.replace(/([^\n])```(\w+)/g, '$1\n\n```$2');
    result = result.replace(/```([^\n\w])/g, '```\n$1');

    // Remove excessive blank lines again
    result = result.replace(/\n{4,}/g, '\n\n\n');

    fs.writeFileSync(filePath, result, 'utf-8');
  }

  return changed;
}

// Main
console.log('Fixing long lines in MDX files...\n');

let fixed = 0;
for (const file of FILES_TO_FIX) {
  const filePath = path.join(BLOG_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.log(`  SKIP: ${file} not found`);
    continue;
  }
  console.log(`Processing: ${file}`);
  if (fixFile(filePath)) {
    fixed++;
    console.log(`  FIXED`);
  } else {
    console.log(`  No long lines found`);
  }
}

console.log(`\nDone: ${fixed} files fixed.`);
