/**
 * Fix MDX files that have unescaped < characters outside code blocks.
 * MDX treats < as JSX. Excel formulas like =SI(B2<A2,...) or <>
 * must be inside backtick inline code or fenced code blocks.
 *
 * Strategy: Find < characters outside code blocks/inline code that are
 * NOT valid HTML tags (i.e., not followed by a letter or /), and wrap
 * the surrounding formula/expression in backticks.
 */
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.resolve('content/blog');
const FAILING_SLUGS = [
  'automatiser-classeur-let-lambda',
  'comment-utiliser-fonction-filtre-excel',
  'compter-plusieurs-criteres-nb-si-ens',
  'creer-diagramme-de-gantt-excel',
  'decouvrir-filtre-excel-tableaux-dynamiques',
  'excel-afficher-le-jour-de-la-semaine-2',
  'excel-calcul-de-la-tva',
  'excel-et-si-2',
  'excel-formule-si',
  'excel-formule-si-avancee-2',
  'excel-formule-somme',
  'excel-recherche-multicriteres',
  'extraire-sous-ensemble-donnees-filtre',
  'fonction-si-conditions-excel',
  'fonctions-fractionner-texte-joindre-texte',
  'formule-excel-filtre-guide',
  'gantt-interactif-excel-sans-macro',
  'modele-budgetaire-excel',
  'nb-si-ens-compter-conditions',
  'nb-si-ens-excel-compter-additionner',
  'simplifier-formules-fonction-let-excel',
  'sommeprod-excel-exemples-puissants-analyse',
  'supprimer-doublons-excel',
  'trier-et-dedupliquer-excel',
  'tutoriel-excel-unique-sequence-pour-listes-auto',
];

/**
 * Process a line: escape < that are NOT inside backtick code spans
 * and NOT valid HTML tags.
 */
function fixLine(line) {
  // Don't touch lines that are inside code fences (handled by caller)
  // Split line into segments: code spans vs regular text
  const segments = [];
  let remaining = line;
  let inCode = false;

  // Simple state machine to split by backtick code spans
  while (remaining.length > 0) {
    const backtickIdx = remaining.indexOf('`');
    if (backtickIdx === -1) {
      segments.push({ text: remaining, isCode: inCode });
      break;
    }
    if (backtickIdx > 0) {
      segments.push({ text: remaining.substring(0, backtickIdx), isCode: inCode });
    }
    segments.push({ text: '`', isCode: false }); // the backtick itself
    remaining = remaining.substring(backtickIdx + 1);
    inCode = !inCode;
  }

  // Process non-code segments: escape bare < and { } that would be parsed as JSX
  let result = '';
  for (const seg of segments) {
    if (seg.isCode || seg.text === '`') {
      result += seg.text;
    } else {
      let fixed = seg.text;
      // Replace < that is NOT followed by a letter, /, or ! (valid HTML/JSX)
      // These are Excel operators like <>, <=, <A2 (where A2 is not a tag)
      fixed = fixed.replace(/<(?![a-zA-Z\/!])/g, '&lt;');
      // Replace { and } that MDX would interpret as JSX expressions
      // Escape with backslash: \{ and \}
      fixed = fixed.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
      result += fixed;
    }
  }

  return result;
}

function fixFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n');
  let inFrontmatter = false;
  let frontmatterCount = 0;
  let inCodeBlock = false;
  let changed = false;
  const fixedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track frontmatter
    if (line.trim() === '---') {
      frontmatterCount++;
      if (frontmatterCount <= 2) {
        inFrontmatter = frontmatterCount === 1;
        fixedLines.push(line);
        if (frontmatterCount === 2) inFrontmatter = false;
        continue;
      }
    }

    // Skip frontmatter
    if (inFrontmatter) {
      fixedLines.push(line);
      continue;
    }

    // Track code blocks
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      fixedLines.push(line);
      continue;
    }

    // Skip code block content
    if (inCodeBlock) {
      fixedLines.push(line);
      continue;
    }

    // Fix the line
    const fixed = fixLine(line);
    if (fixed !== line) changed = true;
    fixedLines.push(fixed);
  }

  if (changed) {
    fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf-8');
  }
  return changed;
}

// Process failing files + scan all others
console.log('=== Fixing MDX JSX issues ===\n');

let fixed = 0;
let scanned = 0;

// First fix the known failing files
for (const slug of FAILING_SLUGS) {
  const filePath = path.join(BLOG_DIR, slug + '.mdx');
  if (!fs.existsSync(filePath)) {
    console.log(`  ✗ ${slug}.mdx not found`);
    continue;
  }
  scanned++;
  if (fixFile(filePath)) {
    console.log(`  ✓ Fixed: ${slug}.mdx`);
    fixed++;
  } else {
    console.log(`  - No changes needed: ${slug}.mdx`);
  }
}

// Then scan ALL other MDX files for the same issue
console.log('\nScanning all other MDX files...');
const allFiles = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
const failingSlugsSet = new Set(FAILING_SLUGS);

for (const file of allFiles) {
  const slug = file.replace('.mdx', '');
  if (failingSlugsSet.has(slug)) continue; // already processed
  scanned++;
  const filePath = path.join(BLOG_DIR, file);
  if (fixFile(filePath)) {
    console.log(`  ✓ Fixed: ${file}`);
    fixed++;
  }
}

console.log(`\n=== Done ===`);
console.log(`Scanned: ${scanned}`);
console.log(`Fixed: ${fixed}`);
