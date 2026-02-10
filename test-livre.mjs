import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto('http://localhost:3457/livre', { waitUntil: 'networkidle', timeout: 30000 });

// Full page screenshot
await page.screenshot({ path: 'screenshot-livre-full.png', fullPage: true });

// Screenshot of just the hero area (title + subtitle)
const hero = await page.$('section');
if (hero) {
  await hero.screenshot({ path: 'screenshot-livre-hero.png' });
}

// Scroll to bullet points and take screenshot
const bulletLists = await page.$$('ul');
for (let i = 0; i < bulletLists.length; i++) {
  await bulletLists[i].screenshot({ path: `screenshot-livre-bullets-${i}.png` });
}

await browser.close();
console.log('Screenshots saved');
