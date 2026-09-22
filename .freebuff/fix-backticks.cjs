// Escape backticks inside lesson template literals. Delete after use.
const fs = require('fs');
const file = process.argv[2];
const lines = fs.readFileSync(file, 'utf8').split('\n');
let inside = false;
const out = lines.map((l) => {
  if (!inside && /lesson: `/.test(l)) { inside = true; return l; }
  if (inside) {
    // closer: a line that is only a backtick (optionally followed by a comma)
    if (/^\s*`,?\s*$/.test(l)) { inside = false; return l; }
    return l.replace(/`/g, '\\`');
  }
  return l;
});
if (inside) console.error('WARNING: file ended inside a lesson literal — closer not found!');
fs.writeFileSync(file, out.join('\n'));
console.log('done, inside at EOF:', inside);
