/**
 * Debug script to understand why Turndown truncates content.
 * Fetches WP HTML, converts with Turndown, and analyzes the result.
 */
import TurndownService from 'turndown';
import fs from 'fs';

const AUTH = 'Basic ' + Buffer.from('Fonzy59:siww aoCm ShPj B3iV jtiF MmDZ').toString('base64');
const WP_API = 'https://www.exceleur.fr/wp-json/wp/v2';

const slug = process.argv[2] || 'excel-additionner-les-heures-et-les-minutes-2';

// Same Turndown config as migrate-wordpress.mjs
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

turndown.addRule('preCode', {
  filter: (node) => node.nodeName === 'PRE' && node.querySelector('code'),
  replacement: (_content, node) => {
    const code = node.querySelector('code');
    const lang = code.className?.replace('language-', '') || '';
    return `\n\n\`\`\`${lang}\n${code.textContent.trim()}\n\`\`\`\n\n`;
  },
});

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

function cleanHtml(html) {
  return html
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

async function debug() {
  console.log(`=== Debug Turndown for: ${slug} ===\n`);

  // Fetch WP content
  const res = await fetch(`${WP_API}/posts?slug=${slug}&_fields=content`, {
    headers: { Authorization: AUTH },
  });
  const data = await res.json();
  if (!data[0]) {
    console.log('Post not found!');
    return;
  }
  const html = data[0].content.rendered;

  // Count H2 in HTML
  const htmlH2s = [];
  const h2re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let m;
  while ((m = h2re.exec(html)) !== null) {
    htmlH2s.push(m[1].replace(/<[^>]+>/g, '').trim());
  }
  console.log(`HTML: ${html.length} chars, ${htmlH2s.length} H2 headings`);

  // Clean and convert
  const cleaned = cleanHtml(html);
  const md = turndown.turndown(cleaned);

  // Count H2 in MD
  const mdLines = md.split('\n');
  const mdH2s = [];
  mdLines.forEach((line, i) => {
    if (line.startsWith('## ')) {
      mdH2s.push({ line: i + 1, text: line });
    }
  });
  console.log(`MD: ${md.length} chars, ${mdH2s.length} H2 headings, ${mdLines.length} lines\n`);

  // Compare headings
  console.log('--- HTML H2 headings ---');
  htmlH2s.forEach((h, i) => {
    const found = mdH2s.some(mh => mh.text.includes(h.substring(0, 30)));
    console.log(`  ${found ? '✓' : '✗'} ${i + 1}. ${h}`);
  });

  console.log('\n--- MD H2 headings ---');
  mdH2s.forEach(h => console.log(`  Line ${h.line}: ${h.text}`));

  // Look for headings that are NOT on their own line
  const inlineH2Pattern = /[^\n]## /g;
  let im;
  const inlineH2s = [];
  while ((im = inlineH2Pattern.exec(md)) !== null) {
    const context = md.substring(Math.max(0, im.index - 50), im.index + 80);
    inlineH2s.push(context);
  }
  if (inlineH2s.length > 0) {
    console.log(`\n--- Inline H2 issues (## not at line start) ---`);
    inlineH2s.forEach(c => console.log(`  "${c.replace(/\n/g, '\\n')}"`));
  }

  // Check for table-like structures that might confuse Turndown
  const tables = (html.match(/<table[\s\S]*?<\/table>/gi) || []);
  console.log(`\nHTML tables found: ${tables.length}`);

  // Check for figure/figcaption elements
  const figures = (html.match(/<figure[\s\S]*?<\/figure>/gi) || []);
  console.log(`HTML figures found: ${figures.length}`);

  // Dump the MD after the last found H2 to see what happens
  if (mdH2s.length > 0) {
    const lastH2Line = mdH2s[mdH2s.length - 1].line;
    console.log(`\n--- Content after last H2 (line ${lastH2Line}) ---`);
    const remainingLines = mdLines.slice(lastH2Line - 1);
    console.log(remainingLines.join('\n').substring(0, 1000));
  }

  // Save full MD for inspection
  fs.writeFileSync(`scripts/debug-${slug}.md`, md, 'utf-8');
  console.log(`\nFull MD saved to: scripts/debug-${slug}.md`);
}

debug().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
