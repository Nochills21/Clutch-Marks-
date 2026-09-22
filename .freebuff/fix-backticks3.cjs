// v3: escape content backticks in lesson literals; correctly reset after closers.
const fs = require('fs');
const file = process.argv[2];
let src = fs.readFileSync(file, 'utf8');

// normalize: unescape any prior escaping first
src = src.replace(/\\`/g, '`');

const closerRe = /`,\n\s*questions:/;
let out = '';
let i = 0;
let inside = false;
let escapes = 0, closers = 0;
while (i < src.length) {
  if (!inside) {
    if (src.startsWith('lesson: `', i)) { inside = true; out += 'lesson: `'; i += 8; continue; }
    out += src[i]; i++; continue;
  }
  const rest = src.slice(i);
  const m = rest.match(closerRe);
  if (m && m.index === 0) {
    out += '`,'; // newline copied naturally next iteration
    closers++;
    inside = false;
    i += 2;
    continue;
  }
  if (m) {
    const seg = rest.slice(0, m.index);
    out += seg.replace(/`/g, '\\`');
    escapes += (seg.match(/`/g) || []).length;
    i += m.index;
    continue;
  }
  if (src[i] === '`') { out += '\\`'; escapes++; i++; continue; }
  out += src[i]; i++;
}
fs.writeFileSync(file, out);
console.log(`fixed ${file}: ${escapes} escaped, ${closers} closers, insideAtEof=${inside}`);
