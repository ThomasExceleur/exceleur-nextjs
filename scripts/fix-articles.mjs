import TurndownService from 'turndown';
import fs from 'fs';
import path from 'path';

const AUTH = 'Basic ' + Buffer.from('Fonzy59:siww aoCm ShPj B3iV jtiF MmDZ').toString('base64');

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

// Improved pre/code handling - extract textContent directly to avoid HTML nesting issues
turndown.addRule('preCode', {
  filter: (node) => node.nodeName === 'PRE',
  replacement: (_content, node) => {
    const code = node.querySelector('code');
    const text = code ? code.textContent : node.textContent;
    const lang = code?.className?.replace('language-', '') || '';
    return `\n\n\`\`\`${lang}\n${text.trim()}\n\`\`\`\n\n`;
  },
});

function cleanHtml(html) {
  let h = html
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

  // Fix unclosed <pre><code> blocks by finding opens without matching closes
  // Strategy: process each <pre><code>...</code></pre> pair, and for any unclosed
  // <pre><code>, close it before the next block-level element (<h2>, <h3>, <ul>, <p>)
  h = h.replace(/<pre><code([^>]*)>([\s\S]*?)(<\/code><\/pre>)/g, (match, attrs, content, close) => {
    const cleanContent = content
      .replace(/<\/?p>/g, '\n')
      .replace(/<\/?em>/g, '')
      .replace(/<\/?strong>/g, '')
      .replace(/&#038;/g, '&');
    return `<pre><code${attrs}>${cleanContent}${close}`;
  });

  // Fix any remaining unclosed <pre><code> - close them before the next heading or list
  h = h.replace(/<pre><code([^>]*)>([\s\S]*?)(?=<h[1-6]|<ul>|<ol>|$)/g, (match, attrs, content) => {
    if (match.includes('</code></pre>')) return match; // already closed
    const cleanContent = content
      .replace(/<\/?p>/g, '\n')
      .replace(/<\/?em>/g, '')
      .replace(/<\/?strong>/g, '')
      .replace(/<\/?a[^>]*>/g, '')
      .replace(/&#038;/g, '&');
    return `<pre><code${attrs}>${cleanContent}</code></pre>`;
  });

  return h;
}

function htmlToMarkdown(html) {
  const cleaned = cleanHtml(html);
  let md = turndown.turndown(cleaned);
  md = md.replace(/\n{4,}/g, '\n\n\n');
  md = md.replace(/\n(#{1,6} )/g, '\n\n$1');
  return md.trim();
}

async function fixArticle(slug) {
  const r = await fetch(
    `https://www.exceleur.fr/wp-json/wp/v2/posts?slug=${slug}&_fields=id,title,slug,date,content,excerpt,categories,tags`,
    { headers: { Authorization: AUTH } }
  );
  const posts = await r.json();
  if (!posts[0]) {
    console.log('NOT FOUND: ' + slug);
    return;
  }
  const post = posts[0];
  const html = post.content.rendered;
  console.log(`${slug}: HTML length = ${html.length}`);

  const md = htmlToMarkdown(html);
  console.log(`${slug}: MD length = ${md.length}`);

  // Count links for verification
  const htmlLinks = [...html.matchAll(/<a\s[^>]*href=['"]([^'"#]+)['"][^>]*>/gi)]
    .filter((m) => !m[1].match(/^(lien-|\[)/));
  const mdLinks = md.match(/\[.*?\]\([^)]+\)/g) || [];
  console.log(`${slug}: HTML links=${htmlLinks.length}, MD links=${mdLinks.length}`);

  // Show preserved links
  mdLinks.forEach((link) => console.log(`  -> ${link.substring(0, 100)}`));

  // Read existing file to preserve frontmatter
  const existingPath = path.join('content/blog', `${slug}.mdx`);
  const existing = fs.readFileSync(existingPath, 'utf-8');
  const fmMatch = existing.match(/^---[\s\S]*?---/);
  const frontmatter = fmMatch ? fmMatch[0] : '';

  const title = post.title.rendered
    .replace(/<[^>]+>/g, '')
    .replace(/&rsquo;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, '&');

  const mdxContent = `${frontmatter}\n\n# ${title}\n\n${md}\n`;
  fs.writeFileSync(existingPath, mdxContent, 'utf-8');
  console.log(`${slug}: FIXED\n`);
}

(async () => {
  await fixArticle('excel-formule-index-equiv');
  await fixArticle('quelle-formule-excel-pour-calculer-lanciennete');
})();
