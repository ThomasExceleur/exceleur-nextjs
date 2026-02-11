#!/usr/bin/env node
/**
 * Fix code blocks where the closing ``` is at the end of a content line
 * instead of on its own line. Also fix the final blob of text trapped
 * inside a fake code block.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, '..', 'content', 'blog');

function fixCodeFences(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Fix pattern: line ending with ``` (closing fence not on its own line)
  // e.g.: " // some code here ```" → " // some code here\n```"
  content = content.replace(/^( .+) ```$/gm, (match, codePart) => {
    return codePart.trimEnd() + '\n```';
  });

  // Fix pattern: stray backtick on a line by itself (` or ``)
  content = content.replace(/^\s*`\s*$/gm, '');

  // Fix pattern: code fence followed by text content that's clearly NOT code
  // This handles the case where a conclusion/article text is inside a code block
  // Look for ``` ```excel ``` followed by a long blob containing "Conclusion" or article text
  const lines = content.split('\n');
  const fixedLines = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (/^```\w*$/.test(trimmed) && !inCodeBlock) {
      inCodeBlock = true;
      fixedLines.push(line);
    } else if (trimmed === '```' && inCodeBlock) {
      inCodeBlock = false;
      fixedLines.push(line);
    } else if (inCodeBlock && line.length > 500 && /Conclusion|Récapitulatif|Prêt à|N'hésitez pas|Rejoignez/i.test(line)) {
      // This is article text trapped in a code block — close the code block and output as text
      inCodeBlock = false;
      fixedLines.push('```');
      fixedLines.push('');
      // Reformat the trapped text
      const reformatted = line
        .replace(/\s{2,}(#{2,6}\s)/g, '\n\n$1')
        .replace(/\s{2,}(\*\*[A-Z])/g, '\n\n$1')
        .replace(/\s{2,}(-\s)/g, '\n- ')
        .replace(/\s{2,}(\d+\.\s)/g, '\n$1')
        .replace(/\s{2,}(✅|🎯|🔧|🧠|🚀|⚡|📚|🔬|🏢|📊|💰|📈|🔍|🤖)/g, '\n$1')
        .replace(/\.\s{2,}([A-Z])/g, '.\n\n$1');
      fixedLines.push(reformatted);
    } else {
      fixedLines.push(line);
    }
  }

  content = fixedLines.join('\n');

  // Clean up excessive blank lines
  content = content.replace(/\n{4,}/g, '\n\n\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  return false;
}

// Fix the specific problematic files
const files = [
  'excel-formule-si.mdx',
  'excel-mise-en-forme-conditionnelle.mdx',
  'excel-additionner-les-heures-et-les-minutes-2.mdx',
];

console.log('Fixing code fences...\n');
for (const file of files) {
  const filePath = path.join(BLOG_DIR, file);
  if (!fs.existsSync(filePath)) continue;
  console.log(`Processing: ${file}`);
  if (fixCodeFences(filePath)) {
    // Verify
    const content = fs.readFileSync(filePath, 'utf-8');
    const fences = (content.match(/^```/gm) || []).length;
    console.log(`  FIXED (${fences} fence markers, ${fences % 2 === 0 ? 'EVEN' : 'ODD'})`);
  } else {
    console.log('  No changes needed');
  }
}
