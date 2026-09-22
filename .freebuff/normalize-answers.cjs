// Normalize answer distribution: rotate options per question by a varied,
// deterministic shift; adjust `correct` accordingly. Explanations never
// reference option letters (verified), so content stays valid.
const fs = require('fs');

const files = ['content-as-physics.cjs', 'content-a2-physics.cjs', 'content-as-cs.cjs', 'content-a2-cs.cjs'];
let qi = 0;
for (const f of files) {
  const mod = require('./' + f);
  let shifted = 0;
  for (let t = 0; t < mod.length; t++) {
    for (let j = 0; j < mod[t].questions.length; j++) {
      const q = mod[t].questions[j];
      const shift = ((qi * 7) + (t * 3)) % 4; // varied deterministic 0..3
      if (shift !== 0) {
        const n = q.opts.length;
        q.opts = q.opts.map((_, k) => q.opts[(k - shift + n) % n]); // rotate right by shift
        q.correct = (q.correct + shift) % n;
        shifted++;
      }
      qi++;
    }
  }
  // serialize back in the file's shape
  const banner = `// AUTO-NORMALIZED: options rotated so correct answers spread across 0-3 (0-based).\n`;
  const body = 'module.exports = ' + JSON.stringify(mod, null, 2).replace(/"([a-zA-Z_]+)":/g, '$1:').replace(/"/g, "'") + ';\n';
  // restore the original header comment line
  const orig = fs.readFileSync(f, 'utf8').split('\n')[0];
  fs.writeFileSync(f, orig + '\n' + banner + body);
  console.log(`${f}: ${shifted} questions rotated`);
}
