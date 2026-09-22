// Global unescape: \` -> ` everywhere. Delete after use.
const fs = require('fs');
const file = process.argv[2];
const src = fs.readFileSync(file, 'utf8');
const out = src.replace(/\\`/g, '`');
fs.writeFileSync(file, out);
console.log(`unesecaped ${file}: ${(src.match(/\\`/g) || []).length} sequences`);
