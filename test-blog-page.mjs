import { chromium } from 'playwright';

const PORT = 3460;
const BASE = `http://localhost:${PORT}`;

// Wait for server to be ready
async function waitForServer(maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const resp = await fetch(`${BASE}/`, { signal: AbortSignal.timeout(5000) });
      if (resp.ok || resp.status === 500) return true; // 500 = server running but page error
    } catch (e) {}
    await new Promise(r => setTimeout(r, 2000));
    console.log(`Waiting for server... (${i + 1}/${maxAttempts})`);
  }
  return false;
}

console.log('Waiting for dev server...');
const ready = await waitForServer();
if (!ready) {
  console.error('Server did not start');
  process.exit(1);
}
console.log('Server ready!');

const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

// Warm up the blog-excel page
console.log('Loading blog-excel page...');
await page.goto(`${BASE}/blog-excel/`, { waitUntil: 'load', timeout: 120000 });
await page.waitForTimeout(5000);
await page.reload({ waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);

// Hero section screenshot
await page.screenshot({ path: 'test-blog-hero.png' });
console.log('Hero screenshot taken');

// Popular articles
await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(1000);
await page.screenshot({ path: 'test-blog-popular.png' });
console.log('Popular screenshot taken');

// Now test a page with bullet points
console.log('Loading page with bullet points...');
await page.goto(`${BASE}/raccourcis-indispensables-excel/`, { waitUntil: 'load', timeout: 120000 });
await page.waitForTimeout(5000);
await page.reload({ waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);

await page.evaluate(() => window.scrollTo(0, 500));
await page.waitForTimeout(1000);
await page.screenshot({ path: 'test-bullets-1.png' });
console.log('Bullets 1 taken');

await page.evaluate(() => window.scrollTo(0, 1000));
await page.waitForTimeout(1000);
await page.screenshot({ path: 'test-bullets-2.png' });
console.log('Bullets 2 taken');

await browser.close();
console.log('Done!');
