/**
 * Agent 5 — Formatting Quality
 * Checks MDX files for residual HTML, unclosed code blocks, broken entities,
 * invalid tables, YAML errors, and excessively long lines.
 */
import {
  listMdxFiles, slugFromPath, readMdxFile, stripCodeBlocks,
  createReport, writeReport, printSummary,
  parseArgs, isStandalone,
} from './utils.mjs';

// HTML tags allowed in MDX content
const ALLOWED_HTML = new Set(['br', 'hr', 'br/', 'hr/']);

// Broken HTML entities to detect
const ENTITY_PATTERNS = [
  /&amp;(?!amp;|lt;|gt;|quot;|#)/g,
  /&#8217;/g, /&#8216;/g, /&#8220;/g, /&#8221;/g,
  /&#8211;/g, /&#8212;/g, /&#8230;/g,
  /&rsquo;/g, /&lsquo;/g, /&rdquo;/g, /&ldquo;/g,
  /&hellip;/g, /&nbsp;/g,
  /&#\d{2,5};/g,
];

/**
 * Check a single MDX file for formatting issues
 */
function checkFile(filePath, report, verbose) {
  const slug = slugFromPath(filePath);
  const { frontmatter, content, raw, yamlError } = readMdxFile(filePath);

  // 5.5 — Frontmatter YAML parseable
  if (yamlError) {
    report.addIssue(slug + '.mdx', '5.5', 'fail',
      `YAML parse error: ${yamlError}`);
  }

  // Work with content body only (after frontmatter)
  const body = content;

  // 5.1 — No residual HTML (outside code blocks and inline code)
  const stripped = stripCodeBlocks(body).replace(/`[^`]+`/g, '');
  const htmlRe = /<([a-z][a-z0-9]*)\b[^>]*\/?>/gi;
  let m;
  while ((m = htmlRe.exec(stripped)) !== null) {
    const tag = m[1].toLowerCase();
    if (!ALLOWED_HTML.has(tag) && !ALLOWED_HTML.has(tag + '/')) {
      const lineNum = stripped.substring(0, m.index).split('\n').length;
      report.addIssue(slug + '.mdx', '5.1', 'warn',
        `Residual HTML tag <${tag}> at line ~${lineNum}`,
        { tag: m[0] });
    }
  }

  // 5.2 — Code blocks closed (even count of ```)
  const fenceMatches = body.match(/^```/gm) || [];
  if (fenceMatches.length % 2 !== 0) {
    report.addIssue(slug + '.mdx', '5.2', 'fail',
      `Unclosed code block (${fenceMatches.length} fence markers, expected even)`);
  }

  // 5.3 — No broken HTML entities (outside code blocks)
  for (const pattern of ENTITY_PATTERNS) {
    const clone = new RegExp(pattern.source, pattern.flags);
    let em;
    while ((em = clone.exec(stripped)) !== null) {
      const lineNum = stripped.substring(0, em.index).split('\n').length;
      report.addIssue(slug + '.mdx', '5.3', 'warn',
        `Broken HTML entity "${em[0]}" at line ~${lineNum}`);
      break; // One report per pattern per file to avoid noise
    }
  }

  // 5.4 — Table validation
  const lines = body.split('\n');
  let inTable = false;
  let tableHeaderCols = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        // Table header
        inTable = true;
        tableHeaderCols = line.split('|').filter(c => c.trim() !== '').length;
      } else if (/^\|[\s\-:|]+\|$/.test(line)) {
        // Separator row — validate column count
        const sepCols = line.split('|').filter(c => c.trim() !== '').length;
        if (sepCols !== tableHeaderCols) {
          report.addIssue(slug + '.mdx', '5.4', 'warn',
            `Table separator at line ${i + 1} has ${sepCols} cols, header has ${tableHeaderCols}`);
        }
      } else {
        // Data row
        const dataCols = line.split('|').filter(c => c.trim() !== '').length;
        if (dataCols !== tableHeaderCols && tableHeaderCols > 0) {
          report.addIssue(slug + '.mdx', '5.4', 'warn',
            `Table row at line ${i + 1} has ${dataCols} cols, header has ${tableHeaderCols}`);
        }
      }
    } else {
      inTable = false;
      tableHeaderCols = 0;
    }
  }

  // 5.6 — No lines > 2000 chars
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length > 2000) {
      report.addIssue(slug + '.mdx', '5.6', 'warn',
        `Line ${i + 1} has ${lines[i].length} chars (> 2000) — possible unconverted HTML`);
    }
  }
}

/**
 * Run all formatting checks
 */
export async function run(options = {}) {
  const args = parseArgs();
  const report = createReport('formatting');

  let files = listMdxFiles();
  if (args.slug) {
    files = files.filter(f => slugFromPath(f) === args.slug);
    if (files.length === 0) {
      report.addIssue(args.slug, '', 'fail', `MDX file not found for slug "${args.slug}"`);
    }
  }

  console.log(`  Checking ${files.length} MDX files for formatting...`);

  for (const file of files) {
    checkFile(file, report, args.verbose);
  }

  const json = report.toJSON();
  json.meta = { filesChecked: files.length };

  writeReport('formatting', json);
  printSummary('formatting', json);
  return json;
}

if (isStandalone(import.meta.url)) {
  run().catch(err => { console.error(err); process.exit(1); });
}
