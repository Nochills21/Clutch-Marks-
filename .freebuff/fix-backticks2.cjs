// Escape content backticks inside lesson template literals, preserving closers.
// Closer = backtick followed by ',' + newline + spaces + 'questions:'. Delete after use.
const fs = require('fs');
const file = process.argv[2];
const src = fs.readFileSync(file, 'utf8');

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
  // inside a lesson literal
  const rest = src.slice(i);
  const m = rest.match(closerRe);
  if (m && m.index === 0) {
    out += '`,\n'; closers++;
    i += 2;
    // keep the newline+spaces+questions: as-is
    continue;
  }
  // lookahead match anywhere near: only treat as closer at exact position; otherwise escape
  const any = rest.match(closerRe);
  if (any) {
    // copy up to the closer, escaping backticks along the way
    const seg = rest.slice(0, any.index);
    out += seg.replace(/`/g, '\\`');
    escapes += (seg.match(/`/g) || []).length;
    i += any.index;
    continue;
  }
  if (src[i] === '`') { out += '\\`'; escapes++; i++; continue; }
  out += src[i]; i++;
}
fs.writeFileSync(file, out);
console.log(`fixed ${file}: ${escapes} content backticks escaped, ${closers} closers preserved`);
