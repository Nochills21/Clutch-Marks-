// Page-map extractor v2: collects per-page text inside pagerender.
// Usage: bun pagemap.cjs <pdf-path> <out.json>
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse/lib/pdf-parse.js');
import fs from 'fs';

const [,, pdfPath, outPath] = process.argv;
const buf = fs.readFileSync(pdfPath);

const pages = [];
let current = { page: 0, text: '' };
await pdf(buf, {
  pagerender: async (pageData) => {
    const content = await pageData.getTextContent();
    const text = content.items.map((it) => it.str).join(' ').replace(/\s+/g, ' ').trim();
    current = { page: pageData.pageIndex + 1, text };
    pages.push(current);
    return '';
  },
});

fs.writeFileSync(outPath, JSON.stringify({ source: pdfPath, pages }, null, 0));
console.log(`wrote ${pages.length} pages -> ${outPath}`);
