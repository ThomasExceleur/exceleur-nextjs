import { readMdxFile } from './agents/utils.mjs';
import path from 'path';

const file = path.resolve('content/blog/excel-recherche-multicriteres.mdx');
const { content } = readMdxFile(file);

// Step by step
const step1 = content.replace(/<[^>]+>/g, ' ');
const step2 = step1.replace(/[#*_`\[\]()>|~\-]/g, ' ');
const words1 = content.split(/\s+/).filter(w => w.length > 0);
const words2 = step2.split(/\s+/).filter(w => w.length > 0);

console.log('Raw words:', words1.length);
console.log('After HTML strip words:', step1.split(/\s+/).filter(w => w.length > 0).length);
console.log('After MD strip words:', words2.length);

// Find words that are in raw but not after stripping
// Actually, let's look at lines and how they're affected
const lines = content.split('\n');
let maxDiff = 0;
let maxDiffLine = -1;
for (let i = 0; i < lines.length; i++) {
  const rawWords = lines[i].split(/\s+/).filter(w => w.length > 0).length;
  const strippedLine = lines[i].replace(/<[^>]+>/g, ' ').replace(/[#*_`\[\]()>|~\-]/g, ' ');
  const strippedWords = strippedLine.split(/\s+/).filter(w => w.length > 0).length;
  const diff = rawWords - strippedWords;
  if (diff > maxDiff) {
    maxDiff = diff;
    maxDiffLine = i;
  }
  if (diff > 5) {
    console.log(`Line ${i+1}: ${rawWords} → ${strippedWords} (lost ${diff})`);
    console.log(`  First 100 chars: ${lines[i].substring(0, 100)}`);
  }
}

// Also check: how many raw words are pure markdown chars?
const pureMarkdownWords = words1.filter(w => /^[#*_`\[\]()>|~\-]+$/.test(w));
console.log('\nPure markdown character words:', pureMarkdownWords.length);
console.log('Sample:', pureMarkdownWords.slice(0, 20));

// Check: words that become empty after stripping
let lostWords = 0;
for (const w of words1) {
  const stripped = w.replace(/[#*_`\[\]()>|~\-]/g, '').trim();
  if (stripped.length === 0) lostWords++;
}
console.log('Words that become empty after stripping:', lostWords);
