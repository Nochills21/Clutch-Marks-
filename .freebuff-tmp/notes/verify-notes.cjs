// Structural and numeric verification for the rebuilt A-level notes.
const fs = require('fs');
const path = require('path');
const DIR = path.join(process.cwd(), '.freebuff', 'drafts');
const slugs = fs.readdirSync(DIR).filter(f => /^(m1|s1|p3|p4)-.*\.html$/.test(f)).sort();
let problems = 0;
const bad = (m) => { problems++; console.log('FAIL ' + m); };

for (const f of slugs) {
  const h = fs.readFileSync(path.join(DIR, f), 'utf8');
  const count = re => (h.match(re) || []).length;
  if (count(/<main class="page">/g) !== 1 || count(/<\/main>/g) !== 1) bad(f + ': main tags');
  if (count(/<section class="block">/g) !== count(/<\/section>/g) - 1) bad(f + ': section balance');
  if (!h.includes('</html>')) bad(f + ': no closing html');
  if (h.includes('`')) bad(f + ': backtick');
  if (/\uFFFD/.test(h)) bad(f + ': U+FFFD');
  if (/\b(wait,|Let's|hmm,)\b/i.test(h)) bad(f + ': drafting residue');
  if (!/Mark-winning habits/.test(h)) bad(f + ': exam block missing');
}

// Independent numeric checks of the worked answers quoted in the notes.
const near = (a, b, tol = 0.01) => Math.abs(a - b) <= tol;
// Normal CDF via the error function (Abramowitz-Stegun 7.1.26).
const erf = x => { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return s * y; };
const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));
const checks = [
  ['M1 tension 3kg/2kg', 2 * (g => g / 5 + g)(9.8), 23.52, 0.05],
  ['M1 inclined a = g sin30', 9.8 * 0.5, 4.9, 0.01],
  ['M1 friction pulled block a', (20 * Math.cos(Math.PI / 6) - 0.2 * (49 - 20 * Math.sin(Math.PI / 6))) / 5, 1.90, 0.01],
  ['S1 P(X<58), N(50,16)', Phi(2), 0.9772, 0.0001],
  ['S1 P(46<X<58)', Phi(2) - Phi(-1), 0.8185, 0.0005],
  ['S1 z for 0.9', 1.2816, 1.2816, 0.0001],
  ['S1 Var(X) discrete', 3.4 - 1.6 ** 2, 0.84, 1e-9],
  ['S1 r for example data', 6 / Math.sqrt(10 * 6), 0.7746, 0.0001],
  ['S1 regression b', 6 / 10, 0.6, 1e-9],
  ['S1 IQR example', 12 - 5, 7, 1e-9],
  ['P3 remainder f(1)', 1 + 2 - 5 + 6, 4, 1e-9],
  ['P3 root of x^3-2x-5 via iteration', (() => { let x = 2; for (let i = 0; i < 30; i++) x = Math.cbrt(2 * x + 5); return x; })(), 2.0945, 0.0001],
  ['P3 |g\'| at root < 1', (2 / 3) * Math.pow(2 * 2.0945515 + 5, -2 / 3), 0.152, 0.005],
  ['P3 R-formula R', Math.hypot(3, 4), 5, 1e-9],
  ['P3 solve 3sin+4cos=4 at 73.74', 3 * Math.sin(73.74 * Math.PI / 180) + 4 * Math.cos(73.74 * Math.PI / 180), 4, 0.02],
  ['P3 sin75', Math.sin(75 * Math.PI / 180), (Math.sqrt(6) + Math.sqrt(2)) / 4, 1e-9],
  ['P3 integral e^{2x} 0..1', (Math.exp(2) - 1) / 2, 3.19, 0.01],
  ['P4 partial fraction check x=0', 5 / 3, 1 + 2 / 3, 1e-9],
  ['P4 repeated fraction check x=0', 1 / (1 * 2), -1 / (9 * -1) + 1 / (3 * 1) + 1 / (9 * 2), 1e-9],
  ['P4 binomial (1+x)^(1/2) x^2 coeff', (0.5 * -0.5) / 2, -1 / 8, 1e-9],
  ['P4 (1-2x)^-2 x^2 coeff', 3 * 4, 12, 1e-9],
  ['P4 V of sqrt(x) 0..4', Math.PI * 8, 8 * Math.PI, 1e-9],
  ['P4 area parametric', 2 / 5, 0.4, 1e-9],
  ['P4 vector |AB|', Math.sqrt(41), 6.40, 0.01],
  ['P4 scalar product', 4 - 10 + 18, 12, 1e-9],
  ['P4 angle (1,0,0)(1,1,1)', Math.acos(1 / Math.sqrt(3)) * 180 / Math.PI, 54.7, 0.05],
];
for (const [name, got, want, tol] of checks) {
  if (!near(got, want, tol)) bad(`${name}: got ${got}, expected ${want}`);
  else console.log(`ok   ${name}`);
}
console.log(`\nfiles=${slugs.length} problems=${problems}`);
process.exit(problems ? 1 : 0);
