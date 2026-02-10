import { chromium } from 'playwright';

const url = 'http://localhost:3456/formations-excel/le-decollage-liste-attente/';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce'
  });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  // Scroll slowly through the whole page to trigger IntersectionObservers
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < totalHeight; y += 200) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(150);
  }

  // Wait for all animations to settle
  await page.waitForTimeout(1000);

  // Now scroll to pricing section
  await page.evaluate(() => {
    const el = document.querySelector('h2');
    const headings = document.querySelectorAll('h2');
    for (const h of headings) {
      if (h.textContent.includes('Investis dans')) {
        h.scrollIntoView({ block: 'start' });
        break;
      }
    }
  });
  await page.waitForTimeout(500);

  // Screenshot 1: pricing header + top of cards
  await page.screenshot({ path: 'screenshot-pricing1.png', fullPage: false });

  // Screenshot 2: scroll down to see middle of cards
  await page.evaluate(() => window.scrollBy(0, 350));
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshot-pricing2.png', fullPage: false });

  // Screenshot 3: scroll down to see bottom of cards
  await page.evaluate(() => window.scrollBy(0, 350));
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshot-pricing3.png', fullPage: false });

  console.log('Screenshots saved!');
  await browser.close();
})();
