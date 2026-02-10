import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  javaScriptEnabled: true,
});
const page = await context.newPage();

// Navigate and wait for everything to load
await page.goto('http://localhost:3457/blog-excel/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);

// Screenshot 1: Top of page (hero section with stats)
await page.screenshot({ path: 'test-blog-hero.png', fullPage: false });

// Screenshot 2: Scroll to popular articles section
await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'test-blog-popular.png', fullPage: false });

// Screenshot 3: Continue scrolling to articles grid
await page.evaluate(() => window.scrollTo(0, 1400));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'test-blog-articles.png', fullPage: false });

// Screenshot 4: Scroll further
await page.evaluate(() => window.scrollTo(0, 2100));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'test-blog-more.png', fullPage: false });

// Screenshot 5: Bottom of page
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'test-blog-bottom.png', fullPage: false });

// Now navigate to an article that likely has bullet points
await page.goto('http://localhost:3457/10-astuces-pour-optimiser-excel/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);

// Scroll to content area
await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'test-blog-article-content.png', fullPage: false });

await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'test-blog-article-content2.png', fullPage: false });

await page.evaluate(() => window.scrollTo(0, 1800));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'test-blog-article-content3.png', fullPage: false });

await browser.close();
console.log('All screenshots saved!');
