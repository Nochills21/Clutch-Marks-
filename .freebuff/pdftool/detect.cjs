// Detect chapter start pages. Usage: bun detect.cjs <pagemap.json>
import fs from 'fs';

const [,, mapPath] = process.argv;
const { source, pages } = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

console.log(`\n### ${source}`);
for (const p of pages) {
  const stripped = p.text.replace(/\s+/g, '');
  const hits = stripped.match(/CHAPTER\d+/gi) || [];
  if (hits.length === 0) continue;
  if (hits.length > 3) continue; // TOC page
  const idx = stripped.search(/CHAPTER\d+/i);
  console.log(`p${p.page}: ${stripped.slice(Math.max(0, idx - 6), idx + 60)}`);
}
