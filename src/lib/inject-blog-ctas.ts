/**
 * Injects ElyxAI CTA blocks into blog post MDX content.
 *
 * Insertion points (mirroring WordPress Ad Inserter):
 * 1. "intro" — before the 1st ## heading (after introduction paragraphs)
 * 2. "mid"   — before the 3rd ## heading (after 2 complete sections)
 * 3. "end"   — before the last ## heading (near end of article)
 */
export function injectBlogCTAs(content: string): string {
  // Find all h2 heading positions
  const h2Regex = /^## .+$/gm;
  const h2Positions: number[] = [];

  let match: RegExpExecArray | null;
  while ((match = h2Regex.exec(content)) !== null) {
    h2Positions.push(match.index);
  }

  // Need at least 2 h2s to inject anything meaningful
  if (h2Positions.length < 2) return content;

  const insertions: { position: number; tag: string }[] = [];

  // CTA 1 (intro): before the 1st h2
  insertions.push({
    position: h2Positions[0],
    tag: '\n<ElyxCTA variant="intro" />\n\n',
  });

  // CTA 2 (mid): before the 3rd h2 (if it exists)
  if (h2Positions.length >= 3) {
    insertions.push({
      position: h2Positions[2],
      tag: '\n<ElyxCTA variant="mid" />\n\n',
    });
  }

  // CTA 3 (end): before the last h2 (only if distinct from mid position)
  const lastIdx = h2Positions.length - 1;
  if (lastIdx >= 3) {
    insertions.push({
      position: h2Positions[lastIdx],
      tag: '\n<ElyxCTA variant="end" />\n\n',
    });
  }

  // Apply insertions from end to start to preserve indices
  let result = content;
  for (let i = insertions.length - 1; i >= 0; i--) {
    const { position, tag } = insertions[i];
    result = result.slice(0, position) + tag + result.slice(position);
  }

  return result;
}
