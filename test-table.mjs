import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

await page.goto('http://localhost:3000/excel-formule-nb', { waitUntil: 'networkidle', timeout: 30000 });

// Scroll to table section
await page.evaluate(() => {
  const h2 = [...document.querySelectorAll('h2 span, h2')].find(el => el.textContent && el.textContent.includes('Comparaison'));
  if (h2) h2.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(500);
await page.screenshot({ path: 'screenshot-table-final.png' });

console.log('Screenshot saved');
await browser.close();
