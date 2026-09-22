// Extract text from a PDF in pages. Usage: bun extract.cjs <pdf-path> [maxPages]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse/lib/pdf-parse.js');
import fs from 'fs';

const [,, pdfPath, maxPagesArg] = process.argv;
const maxPages = maxPagesArg ? parseInt(maxPagesArg, 10) : Infinity;

const buf = fs.readFileSync(pdfPath);
const out = [];
await pdf(buf, {
  pagerender: async (pageData) => {
    const idx = pageData.pageIndex + 1;
    if (idx > maxPages) return '';
    const content = await pageData.getTextContent();
    return content.items.map((it) => it.str).join(' ');
  },
}).then((data) => {
  const pages = data.text.split('\f');
  pages.forEach((p, i) => {
    if (i < maxPages) out.push(`===== PAGE ${i + 1} =====\n${p.trim()}`);
  });
});

console.log(out.join('\n'));
