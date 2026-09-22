// Recover files corrupted by fix-backticks run. Delete after use.
const fs = require('fs');
const file = process.argv[2];
const lines = fs.readFileSync(file, 'utf8').split('\n');
const openerIdx = lines.findIndex((l) => /lesson: `/.test(l));
if (openerIdx < 0) { console.error('no lesson opener found'); process.exit(1); }
const out = lines.map((l, i) => (i > openerIdx ? l.replace(/\\`/g, '`') : l));
fs.writeFileSync(file, out.join('\n'));
console.log(`recovered ${file} (opener at line ${openerIdx + 1})`);
