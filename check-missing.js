const fs = require('fs');
const path = require('path');

const sitemap = JSON.parse(fs.readFileSync('_meta/sitemap.json', 'utf8'));
const sitemapSlugs = sitemap.all_blog_posts_urls.map(url => url.replace('/', ''));

const blogDir = './content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
const existing = files.map(f => f.replace('.mdx', ''));

const missing = sitemapSlugs.filter(slug => !existing.includes(slug));

console.log('Sitemap URLs:', sitemapSlugs.length);
console.log('Existing articles:', existing.length);
console.log('Still missing:', missing.length);

if (missing.length > 0) {
  console.log('\nMissing articles:');
  missing.forEach(s => console.log(s));
}
