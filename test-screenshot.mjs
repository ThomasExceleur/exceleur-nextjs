import { chromium } from 'playwright';
import { spawn } from 'child_process';

// Start dev server
console.log('Starting dev server...');
const server = spawn('npx', ['next', 'dev', '--port', '3333'], {
  cwd: 'C:\\Users\\thoma\\exceleur-nextjs',
  shell: true,
  stdio: 'pipe',
});

server.stdout.on('data', (d) => process.stdout.write('[server] ' + d.toString()));
server.stderr.on('data', (d) => process.stderr.write('[server-err] ' + d.toString()));

// Wait for server to be ready
const waitForServer = async (url, maxRetries = 60) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 500) return true; // 500 means compiled but errored, still usable to retry
    } catch {}
    await new Promise((r) => setTimeout(r, 2000));
    console.log(`Waiting for server... (${i + 1}/${maxRetries})`);
  }
  return false;
};

const pageUrl = 'http://localhost:3333/formations-excel/le-decollage-liste-attente/';

const ready = await waitForServer(pageUrl);
if (!ready) {
  console.error('Server did not start');
  server.kill();
  process.exit(1);
}

console.log('Server ready, waiting for full compilation...');
await new Promise((r) => setTimeout(r, 5000));

// Fetch page again to ensure compilation is complete
await fetch(pageUrl);
await new Promise((r) => setTimeout(r, 3000));

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  reducedMotion: 'reduce',
});

await page.goto(pageUrl, { waitUntil: 'load', timeout: 120000 });
await page.waitForTimeout(3000);

// Check if we have an error page
const hasError = await page.evaluate(() => {
  return document.body.innerText.includes('Server Error') || document.body.innerText.includes('Cannot find module');
});

if (hasError) {
  console.log('Got error page, reloading...');
  await page.reload({ waitUntil: 'load', timeout: 120000 });
  await page.waitForTimeout(3000);
}

// Scroll slowly through the whole page to trigger IntersectionObservers
const totalHeight = await page.evaluate(() => document.body.scrollHeight);
console.log('Page height:', totalHeight);

for (let y = 0; y < totalHeight; y += 200) {
  await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
  await page.waitForTimeout(100);
}
await page.waitForTimeout(1000);

// Scroll to pricing section
await page.evaluate(() => {
  const headings = document.querySelectorAll('h2');
  for (const h of headings) {
    if (h.textContent.includes('Investis dans')) {
      h.scrollIntoView({ block: 'start' });
      break;
    }
  }
});
await page.waitForTimeout(500);

await page.screenshot({ path: 'screenshot-pricing1.png', fullPage: false });

await page.evaluate(() => window.scrollBy(0, 350));
await page.waitForTimeout(300);
await page.screenshot({ path: 'screenshot-pricing2.png', fullPage: false });

await page.evaluate(() => window.scrollBy(0, 400));
await page.waitForTimeout(300);
await page.screenshot({ path: 'screenshot-pricing3.png', fullPage: false });

console.log('Screenshots saved!');
await browser.close();
server.kill();
process.exit(0);
