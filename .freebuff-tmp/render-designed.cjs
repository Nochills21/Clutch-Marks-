// Render a plain staged note (h2 / h3 / p / ul) into the designed A* guided
// template. Explanations come from .freebuff-tmp/explain/<name>.json, keyed by
// the 1-based index of each non-exam section. Usage:
//   node .freebuff-tmp/render-designed.cjs <draft.html> [--write]
// Without --write it prints the rendered HTML to stdout (dry run).
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const DRAFTS = path.join(root, '.freebuff', 'drafts');
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'designed-template.html'), 'utf8');
const HEAD = TEMPLATE.slice(0, TEMPLATE.indexOf('</style>')) + WHY_CSS() + '</style>\n</head>\n';

function WHY_CSS() {
  return `
  /* Explanation: why the method works, set before the worked examples. */
  .why {
    margin: 14px 0; padding: 12px 16px; border-radius: 10px;
    background: var(--gold-tint); color: var(--ink); font-size: 15px;
  }
  .why strong { color: var(--gold); font-weight: 600; letter-spacing: 0.02em; }
`;
}

function parse(body) {
  const out = { title: '', syllabus: '', sections: [], exam: null, intro: null };
  let cur = null;
  const re = /<(h2|h3|p|ul)\b[^>]*>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(body))) {
    const tag = m[1], inner = m[2].trim();
    if (tag === 'h2') { out.title = inner; continue; }
    if (tag === 'h3') {
      cur = { title: inner.replace(/^\d+\.\s+/, ''), blocks: [] };
      if (/^exam technique$/i.test(inner)) { out.exam = cur; } else { out.sections.push(cur); }
      continue;
    }
    if (tag === 'p') {
      if (/^<strong>Syllabus:<\/strong>/.test(inner)) { out.syllabus = inner.replace(/^<strong>Syllabus:<\/strong>\s*/, ''); continue; }
      const ex = inner.match(/^<strong>(?:Worked )?Example[.:]?<\/strong>\s*([\s\S]*)$/);
      if (ex) { if (cur) cur.blocks.push({ type: 'example', html: ex[1] }); continue; }
      if (!cur) { continue; }
      cur.blocks.push({ type: 'p', html: inner });
      continue;
    }
    if (tag === 'ul') {
      const items = [...inner.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(x => x[1]);
      if (cur) cur.blocks.push({ type: 'ul', items });
    }
  }
  return out;
}

function renderBlocks(blocks) {
  return blocks.map(b => {
    if (b.type === 'example') return `    <div class="example"><strong>Example.</strong> ${b.html}</div>`;
    if (b.type === 'ul') return `    <ul>\n${b.items.map(i => `      <li>${i}</li>`).join('\n')}\n    </ul>`;
    return `    <p>${b.html}</p>`;
  }).join('\n');
}

function render(name, plainHtml) {
  const comment = (plainHtml.match(/^<!--[\s\S]*?-->/) || [''])[0];
  const body = plainHtml.slice(comment.length);
  const p = parse(body);
  const explainPath = path.join(__dirname, 'explain', name.replace(/\.html$/, '') + '.json');
  const explain = fs.existsSync(explainPath) ? JSON.parse(fs.readFileSync(explainPath, 'utf8')) : {};
  const eyebrow = (p.syllabus.match(/^([^:]+):/) || [, 'Clutch Marks'])[1].trim();
  const sections = p.sections.map((s, i) => {
    const why = explain[String(i + 1)];
    const whyHtml = why ? `    <div class="why"><strong>Why it works.</strong> ${why}</div>\n` : '';
    return `  <section class="block">\n    <div class="section-no">Section ${i + 1}</div>\n    <h2>${s.title}</h2>\n${whyHtml}${renderBlocks(s.blocks)}\n  </section>\n`;
  }).join('\n');
  const exam = p.exam ? `  <section class="exam">\n    <div class="section-no">Exam technique</div>\n    <h2>Mark-winning habits</h2>\n${renderBlocks(p.exam.blocks)}\n  </section>\n` : '';
  const intro = explain.intro ? `    <p class="syllabus">${explain.intro}</p>\n` : '';
  const head = HEAD.replace(/<title>[\s\S]*?<\/title>/, `<title>${p.title} \u2014 Clutch Marks revision note (draft)</title>`);
  return `${comment}\n${head}<body>\n<main class="page">\n\n  <header class="hero">\n    <div class="eyebrow">${eyebrow}</div>\n    <h1>${p.title}</h1>\n    <div class="rule"></div>\n    <p class="syllabus"><strong>Syllabus:</strong> ${p.syllabus}</p>\n${intro}  </header>\n\n${sections}\n${exam}\n  <footer class="foot">Clutch Marks &middot; <span>Revision note</span> &middot; draft, not yet published</footer>\n</main>\n</body>\n</html>\n`;
}

module.exports = { render, parse };

if (require.main === module) {
  const file = process.argv[2];
  const write = process.argv.includes('--write');
  const src = fs.readFileSync(path.join(DRAFTS, file), 'utf8');
  const html = render(file, src);
  if (write) fs.writeFileSync(path.join(DRAFTS, file), html, 'utf8');
  else process.stdout.write(html);
}
