// Un-flatten: '\n' escape sequences inside lesson strings -> real newlines.
const fs = require('fs');
for (const f of ['content-as-physics.cjs', 'content-a2-physics.cjs', 'content-as-cs.cjs']) {
  const mod = require('./' + f);
  for (const t of mod) {
    if (typeof t.lesson === 'string') {
      t.lesson = t.lesson.replace(/\\n/g, '\n').replace(/^`+/, '').replace(/`+$/, '');
    }
  }
  const orig = fs.readFileSync(f, 'utf8').split('\n')[0];
  const banner = '// lesson strings carry REAL newlines (JSON.stringify with escape=false is unsafe; kept as data, seeder writes via dollar-quoting).\n';
  // emit with lessons as readable multi-line template literals
  const parts = mod.map((t) => {
    const qs = t.questions.map((q) =>
      `      { q: ${JSON.stringify(q.q)}, opts: ${JSON.stringify(q.opts)}, correct: ${q.correct}, explain: ${JSON.stringify(q.explain)} },`
    ).join('\n');
    return `  {\n    name: ${JSON.stringify(t.name)},\n    description: ${JSON.stringify(t.description)},\n    lesson: \`${t.lesson}\`,\n    questions: [\n${qs}\n    ],\n  },`;
  });
  fs.writeFileSync(f, `${orig}\n${banner}module.exports = [\n${parts.join('\n')}\n];\n`);
  console.log(`unflattened ${f}`);
}
