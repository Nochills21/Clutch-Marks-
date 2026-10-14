// Accuracy corrections found in the syllabus review. Each replacement must match
// its expected count in every file that contains the old text; otherwise nothing
// is written. Usage: node .freebuff-tmp/notes/fix-accuracy.cjs [--apply]
const fs = require('fs');
const path = require('path');
const APPLY = process.argv.includes('--apply');
const D = path.join(process.cwd(), '.freebuff', 'drafts');
const X = path.join(process.cwd(), '.freebuff-tmp', 'explain');
const N = name => path.join(process.cwd(), '.freebuff-tmp', 'notes', name);

const edits = [
  {
    why: 'same gradient alone does not make lines parallel (IGCSE algebra graphs)',
    targets: [path.join(D, 'igcse-algebra-graphs.html'), path.join(X, 'igcse-algebra-graphs.json')],
    old: 'Two lines with the same m never meet, which is why they are parallel.',
    new: 'Two lines with the same m and different c never meet, which is why they are parallel.',
    expected: 1,
  },
  {
    why: 'area under a v-t graph is displacement; it equals distance only without reversal (IGCSE forces)',
    targets: [path.join(D, 'igcse-forces-motion.html'), path.join(X, 'igcse-forces-motion.json')],
    old: 'The area under a velocity–time graph gives the distance travelled, because it multiplies velocity by time.',
    new: 'The area under a velocity–time graph gives the displacement, because it multiplies velocity by time. It equals the distance travelled only while the velocity does not change direction.',
    expected: 1,
  },
  {
    why: 'quartile convention for odd n is method-dependent (A-level S1 representation)',
    targets: [N('s1.cjs')],
    old: 'When n is odd, the median is usually excluded from both halves.',
    new: 'When n is odd, textbooks differ on whether the median is included in the halves, so state the method you use.',
    expected: 1,
  },
  {
    why: 'horizontal and vertical transformations can be applied in either order (A-level P3)',
    targets: [N('p3.cjs')],
    old: 'When combining transformations, apply them in order from the inside outwards, and apply a horizontal stretch or shift to x before applying a vertical change to y.',
    new: 'When combining transformations, work from the inside outwards: a change to x inside the bracket acts on the input, and a change outside the bracket acts on the output. Horizontal and vertical changes do not interfere with each other, but two horizontal changes must be applied in the right order.',
    expected: 1,
  },
  {
    why: 'Mechanics 1 vectors and kinematics are sections 2 and 3 (WME01 M1.2, M1.3); the eyebrow and syllabus both name them',
    targets: [N('m1.cjs')],
    old: 'sections 2.1, 2.2 and 3.1',
    new: 'sections 2 and 3',
    expected: 2,
  },
  {
    why: 'Statistics 1 Normal distribution is section 7 (WST01 S1.7); the eyebrow and syllabus both name it',
    targets: [N('s1.cjs')],
    old: 'Pearson Edexcel International Statistics 1, section 6',
    new: 'Pearson Edexcel International Statistics 1, section 7',
    expected: 2,
  },
  {
    why: 'discrete uniform sits under discrete distributions (WST01 S1.6), so the discrete RV note spans sections 5 and 6',
    targets: [N('s1.cjs')],
    old: 'Pearson Edexcel International Statistics 1, section 5',
    new: 'Pearson Edexcel International Statistics 1, sections 5 and 6',
    expected: 2,
  },
];

let problems = 0;
const changed = new Map(); // file -> content
for (const e of edits) {
  for (const f of e.targets) {
    if (!fs.existsSync(f)) { problems++; console.log(`!! missing ${f}`); continue; }
    const src = changed.get(f) ?? fs.readFileSync(f, 'utf8');
    const n = src.split(e.old).length - 1;
    if (n !== e.expected) { problems++; console.log(`!! ${path.basename(f)}: "${e.old.slice(0, 50)}..." matched ${n}, expected ${e.expected}`); continue; }
    changed.set(f, src.split(e.old).join(e.new));
    console.log(`ok   ${path.basename(f)}: ${e.why}`);
  }
}
if (problems) { console.log(`\nABORTED: ${problems} problem(s); nothing written.`); process.exit(1); }
if (APPLY) for (const [f, c] of changed) fs.writeFileSync(f, c);
console.log(`\n${APPLY ? 'APPLIED' : 'DRY RUN'}  files=${changed.size}`);
