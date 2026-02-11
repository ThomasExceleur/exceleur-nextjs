/**
 * Shared utilities for QA agents.
 * Provides file I/O, WordPress API access, HTTP checks, content extraction,
 * report building, and CLI helpers.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import matter from 'gray-matter';

// ─── Constants ──────────────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const BLOG_DIR = path.resolve(__dirname, '..', '..', 'content', 'blog');
export const PAGES_DIR = path.resolve(__dirname, '..', '..', 'content', 'pages');
export const REPORT_DIR = path.resolve(__dirname, '..', 'qa-report');

const WP_URL = 'https://www.exceleur.fr';
const WP_API = `${WP_URL}/wp-json/wp/v2`;
const BATCH_SIZE = 100;
const DELAY_MS = 500;

// ─── Files & Parsing ────────────────────────────────────────────────────────────

export function listMdxFiles(dir = BLOG_DIR) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx') && f !== 'index.mdx')
    .map(f => path.join(dir, f));
}

export function slugFromPath(filePath) {
  return path.basename(filePath, '.mdx');
}

export function readMdxFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  try {
    const { data, content } = matter(raw);
    return { frontmatter: data, content, raw };
  } catch (err) {
    return { frontmatter: {}, content: raw, raw, yamlError: err.message };
  }
}

// ─── WordPress API ──────────────────────────────────────────────────────────────

export function getWpCredentials() {
  const user = process.env.WORDPRESS_USER;
  const password = process.env.WORDPRESS_APP_PASSWORD;
  if (!user || !password) {
    throw new Error(
      'Missing WordPress credentials. Set WORDPRESS_USER and WORDPRESS_APP_PASSWORD environment variables.'
    );
  }
  return { user, password };
}

export async function wpFetch(endpoint, params = {}) {
  const { user, password } = getWpCredentials();
  const auth = 'Basic ' + Buffer.from(`${user}:${password}`).toString('base64');
  const url = new URL(`${WP_API}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const res = await fetch(url.toString(), {
    headers: { Authorization: auth },
  });

  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText} - ${url}`);
  }

  const total = parseInt(res.headers.get('X-WP-Total') || '0', 10);
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0', 10);
  const data = await res.json();
  return { data, total, totalPages };
}

export async function fetchAllWpPosts(fields = 'id,title,slug,date,content,excerpt,categories,tags,featured_media') {
  const allItems = [];
  let page = 1;
  let totalPages = 1;

  do {
    const { data, totalPages: tp } = await wpFetch('posts', {
      per_page: BATCH_SIZE,
      page,
      _fields: fields,
      status: 'publish',
    });
    totalPages = tp;
    allItems.push(...data);
    console.log(`  WP API: posts page ${page}/${totalPages} (${data.length} items)`);
    page++;
    if (page <= totalPages) await sleep(DELAY_MS);
  } while (page <= totalPages);

  return allItems;
}

export async function buildWpCategoryMap() {
  const allCats = [];
  let page = 1;
  let totalPages = 1;

  do {
    const { data, totalPages: tp } = await wpFetch('categories', {
      per_page: 100,
      page,
      _fields: 'id,name,slug',
    });
    totalPages = tp;
    allCats.push(...data);
    page++;
    if (page <= totalPages) await sleep(DELAY_MS);
  } while (page <= totalPages);

  const map = new Map();
  allCats.forEach(c => map.set(c.id, c.name));
  return map;
}

// ─── HTTP ───────────────────────────────────────────────────────────────────────

export async function checkUrl(url, { timeout = 8000, method = 'HEAD' } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      method,
      signal: controller.signal,
      redirect: 'manual',
      headers: { 'User-Agent': 'ExceleurQA/1.0' },
    });
    clearTimeout(timer);
    const status = res.status;
    const redirectUrl = res.headers.get('location') || undefined;
    // Retry with GET if HEAD returns 405
    if (status === 405 && method === 'HEAD') {
      return checkUrl(url, { timeout, method: 'GET' });
    }
    return { url, status, ok: status >= 200 && status < 400, redirectUrl, error: null };
  } catch (err) {
    clearTimeout(timer);
    return { url, status: 0, ok: false, redirectUrl: undefined, error: err.message };
  }
}

export async function checkUrlBatch(urls, { concurrency = 5, delayMs = 200, timeout = 8000 } = {}) {
  const results = [];
  let running = 0;
  let idx = 0;

  return new Promise(resolve => {
    function next() {
      while (running < concurrency && idx < urls.length) {
        const u = urls[idx++];
        running++;
        sleep(delayMs * (idx - 1)).then(() =>
          checkUrl(u, { timeout }).then(r => {
            results.push(r);
            running--;
            if (results.length === urls.length) resolve(results);
            else next();
          })
        );
      }
    }
    if (urls.length === 0) resolve([]);
    else next();
  });
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Content Extraction ─────────────────────────────────────────────────────────

export function stripCodeBlocks(content) {
  return content.replace(/```[\s\S]*?```/g, '');
}

export function extractMarkdownLinks(content) {
  const links = [];
  const stripped = stripCodeBlocks(content);
  const lines = stripped.split('\n');
  const re = /\[([^\]]*)\]\(([^)]+)\)/g;
  for (let i = 0; i < lines.length; i++) {
    let m;
    while ((m = re.exec(lines[i])) !== null) {
      // Skip image links
      if (lines[i][m.index - 1] === '!') continue;
      links.push({ text: m[1], url: m[2], line: i + 1 });
    }
  }
  return links;
}

export function extractMarkdownImages(content) {
  const images = [];
  const lines = content.split('\n');
  const re = /!\[([^\]]*)\]\(([^)]+)\)/g;
  for (let i = 0; i < lines.length; i++) {
    let m;
    while ((m = re.exec(lines[i])) !== null) {
      images.push({ alt: m[1], url: m[2], line: i + 1 });
    }
  }
  return images;
}

export function extractHeadings(content) {
  const headings = [];
  const lines = content.split('\n');
  for (const line of lines) {
    const m = line.match(/^(#{1,6})\s+(.+)$/);
    if (m) headings.push({ level: m[1].length, text: m[2].trim() });
  }
  return headings;
}

export function countWords(text) {
  return text
    .replace(/[#*_`\[\]()>|~\-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 0).length;
}

export function isInternalUrl(url) {
  if (!url) return false;
  return url.startsWith('/') || url.startsWith('#') || isExceleurAbsoluteUrl(url);
}

export function isExceleurAbsoluteUrl(url) {
  if (!url) return false;
  return url.startsWith('https://www.exceleur.fr') || url.startsWith('https://exceleur.fr') || url.startsWith('http://www.exceleur.fr') || url.startsWith('http://exceleur.fr');
}

// ─── Report ─────────────────────────────────────────────────────────────────────

export function createReport(agentName) {
  const issues = [];
  let status = 'pass';

  return {
    addIssue(file, check, severity, message, details = null) {
      issues.push({ file, check, severity, message, ...(details ? { details } : {}) });
      if (severity === 'fail') status = 'fail';
      else if (severity === 'warn' && status !== 'fail') status = 'warn';
    },
    setStatus(s) { status = s; },
    toJSON() {
      return {
        agent: agentName,
        timestamp: new Date().toISOString(),
        status,
        summary: {
          total: issues.length,
          fail: issues.filter(i => i.severity === 'fail').length,
          warn: issues.filter(i => i.severity === 'warn').length,
          info: issues.filter(i => i.severity === 'info').length,
        },
        issues,
      };
    },
  };
}

export function writeReport(agentName, json) {
  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR, { recursive: true });
  }
  const filePath = path.join(REPORT_DIR, `agent-${agentName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf-8');
  return filePath;
}

export function printSummary(name, json) {
  const color = json.status === 'pass' ? '\x1b[32m' : json.status === 'warn' ? '\x1b[33m' : '\x1b[31m';
  const reset = '\x1b[0m';
  console.log(`\n${color}[${json.status.toUpperCase()}]${reset} Agent: ${name}`);
  console.log(`  Issues: ${json.summary.total} (${json.summary.fail} fail, ${json.summary.warn} warn, ${json.summary.info || 0} info)`);
  if (json.issues.length > 0 && json.issues.length <= 10) {
    json.issues.forEach(i => {
      const ic = i.severity === 'fail' ? '\x1b[31m' : i.severity === 'warn' ? '\x1b[33m' : '\x1b[36m';
      console.log(`  ${ic}[${i.severity}]${reset} ${i.file || ''} — ${i.message}`);
    });
  } else if (json.issues.length > 10) {
    json.issues.slice(0, 10).forEach(i => {
      const ic = i.severity === 'fail' ? '\x1b[31m' : i.severity === 'warn' ? '\x1b[33m' : '\x1b[36m';
      console.log(`  ${ic}[${i.severity}]${reset} ${i.file || ''} — ${i.message}`);
    });
    console.log(`  ... and ${json.issues.length - 10} more`);
  }
}

// ─── CLI ────────────────────────────────────────────────────────────────────────

export function parseArgs() {
  const args = { slug: null, verbose: false, json: false, help: false };
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--slug=')) args.slug = arg.slice(7);
    else if (arg === '--verbose' || arg === '-v') args.verbose = true;
    else if (arg === '--json') args.json = true;
    else if (arg === '--help' || arg === '-h') args.help = true;
  }
  return args;
}

export function isStandalone(importMetaUrl) {
  const scriptPath = fileURLToPath(importMetaUrl);
  const mainPath = process.argv[1];
  if (!mainPath) return false;
  // Windows-compatible comparison
  return path.resolve(scriptPath) === path.resolve(mainPath);
}
