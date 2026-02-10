import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

await page.goto('http://localhost:3457/livre', { waitUntil: 'load', timeout: 120000 });
await page.waitForTimeout(3000);

// Take screenshots scrolling through the page
const totalHeight = await page.evaluate(() => document.body.scrollHeight);
console.log('Total page height:', totalHeight);

let i = 0;
for (let y = 0; y < totalHeight; y += 800) {
  await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `screenshot-section-${i}.png` });
  i++;
}

await browser.close();
console.log(`Done - ${i} screenshots saved`);
