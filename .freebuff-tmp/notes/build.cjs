// Rebuilds the A-level draft notes in .freebuff/drafts as longer, fully explained
// notes. The <head> (CSS, draft comment, title) is kept from each existing file;
// only the <main> body is regenerated from the content modules.
// Usage: node .freebuff-tmp/notes/build.cjs [m1|s1|p3|p4 ...]
const fs = require('fs');
const path = require('path');
const DIR = path.join(process.cwd(), '.freebuff', 'drafts');
const subjects = { m1: './m1.cjs', s1: './s1.cjs', p3: './p3.cjs', p4: './p4.cjs' };

// Authored text is plain; only the three HTML-significant characters are escaped.
const E = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function body(n) {
  const out = [];
  out.push('<main class="page">');
  out.push(`  <header class="hero">\n    <div class="eyebrow">${E(n.eyebrow)}</div>\n    <h1>${E(n.title)}</h1>\n    <div class="rule"></div>\n    <p class="syllabus"><strong>Syllabus:</strong> ${E(n.syllabus)}</p>\n  </header>`);
  n.sections.forEach((s, i) => {
    out.push(`  <section class="block">\n    <div class="section-no">Section ${i + 1}</div>\n    <h2>${E(s.h)}</h2>`);
    out.push(`    <div class="why"><strong>The big idea.</strong> ${E(s.why)}</div>`);
    for (const p of s.paras) out.push(`    <p>${E(p)}</p>`);
    for (const f of s.formulas || []) out.push(`    <div class="formula">${E(f)}</div>`);
    for (const ex of s.examples || []) out.push(`    <div class="example"><strong>Worked example.</strong> ${E(ex)}</div>`);
    out.push('  </section>');
  });
  out.push(`  <section class="exam">\n    <div class="section-no">Exam technique</div>\n    <h2>Mark-winning habits</h2>\n    <ul>\n${n.exam.map(x => `      <li>${E(x)}</li>`).join('\n')}\n    </ul>\n  </section>`);
  out.push('  <footer class="foot">Clutch Marks &middot; <span>Revision note</span> &middot; draft, not yet published</footer>');
  out.push('</main>\n</body>\n</html>\n');
  return out.join('\n');
}

const bodyWords = html => html.slice(html.indexOf('<main')).replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

const want = process.argv.slice(2);
const todo = want.length ? want : Object.keys(subjects);
let failures = 0;
for (const subj of todo) {
  const notes = require(subjects[subj]);
  for (const n of notes) {
    const file = path.join(DIR, n.file + '.html');
    const old = fs.readFileSync(file, 'utf8');
    const head = old.slice(0, old.indexOf('<main'));
    const html = head + body(n);
    const words = bodyWords(html);
    if (!html.includes('</html>')) { failures++; console.log('!! malformed', n.file); continue; }
    if (/`|\uFFFD/.test(html.slice(html.indexOf('<main')))) { failures++; console.log('!! bad char', n.file); continue; }
    fs.writeFileSync(file, html);
    console.log(`${n.file}  sections=${n.sections.length}  body_words=${words} (was ${bodyWords(old)})`);
  }
}
process.exit(failures ? 1 : 0);
