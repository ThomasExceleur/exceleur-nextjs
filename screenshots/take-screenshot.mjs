import { chromium } from 'playwright';

const rawUrl = process.argv[2] || 'http://localhost:3001/formations-excel/le-decollage/';
// Next.js dev server binds to IPv6 (::) on Windows — force IPv6 loopback
const url = rawUrl.replace('localhost', '[::1]');
const output = process.argv[3] || 'screenshots/page.png';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(1000);
await page.screenshot({ path: output, fullPage: true });
console.log(`Screenshot saved: ${output}`);
await browser.close();
