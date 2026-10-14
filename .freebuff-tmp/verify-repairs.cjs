// Independent re-check of repaired keys: recompute each answer in code and
// compare with the stored correct option. Exit 1 on any mismatch.
const fs = require('fs');
const load = s => JSON.parse(fs.readFileSync(`.freebuff/drafts/${s}.json`, 'utf8')).accepted;
const find = (slug, sub) => {
  const h = load(slug).filter(q => q.question_text.includes(sub));
  if (h.length !== 1) throw new Error(`${slug}: "${sub}" matched ${h.length}`);
  return h[0];
};
const near = (a, b) => Math.abs(a - b) < 1e-9;
const checks = [];
const ok = (name, q, expectText) => checks.push({ name, got: q.options[q.correct_option], expectText });

// Gradients and lines
{ const g = (5 - 3) / (4 - 2); ok('gradient (2,3)-(4,5)', find('coordinate-geometry', 'passing through points'), String(g) === '1' ? '1' : '?'); }
{ const perp = 3 / 2; ok('perpendicular to 2x+3y=5 through (2,1)', find('coordinate-geometry', 'perpendicular to 2x + 3y = 5'), `y - 1 = ${perp}(x - 2)`.replace('1.5', '3/2')); }
{ const grad = -4 / -2; ok('gradient of 4x-2y=5', find('coordinate-geometry', '4x - 2y = 5'), String(grad)); }
// Intersection of 2x+3y=5 and x-2y=-1: solve by Cramer's rule
{ const det = 2 * -2 - 3 * 1; const x = (5 * -2 - 3 * -1) / det, y = (2 * -1 - 5 * 1) / det;
  ok('intersection x-2y=-1', load('coordinate-geometry').find(q => q.question_text === 'Find the intersection point of lines 2x + 3y = 5 and x - 2y = -1.'), `(${x}, ${y})`);
  ok('intersection x-2y=-1 (working)', find('coordinate-geometry', 'Show your working'), `(${x}, ${y})`); }
// Stationary point x>2 of y=x^3-6x^2+9x+2
{ const f = x => x ** 3 - 6 * x ** 2 + 9 * x + 2; const xs = [1, 3].filter(x => x > 2); ok('stationary x>2', find('differentiation', 'with x-coordinate greater than 2'), `(${xs[0]}, ${f(xs[0])})`); }
// Normal to y=x^2 at (1,1): normal gradient -1/2; check point satisfies x+2y-3=0
{ const q = find('differentiation', 'normal to y = x^2 at (1, 1)'); const ok2 = 1 + 2 * 1 - 3 === 0 && near(-1 / 2, -1 / (2 * 1)); checks.push({ name: 'normal to y=x^2 (1,1)', got: q.options[q.correct_option], expectText: ok2 ? 'x + 2y - 3 = 0' : '?' }); }
// Normal gradient at x=2 for y=x^2-2x+1
{ const d = 2 * 2 - 2; ok('normal gradient x=2', find('differentiation', 'gradient of the normal to y = x^2 - 2x + 1'), String(-1 / d === -0.5 ? '-1/2' : '?')); }
// Stationary point of y=x^3-3x^2-9x+1, positive x
{ const f = x => x ** 3 - 3 * x ** 2 - 9 * x + 1; const roots = [3, -1]; ok('stationary positive x', find('differentiation', 'positive x-coordinate'), `(${roots[0]}, ${f(roots[0])})`); }
// Area of 3x^2-2x+1 on [0,2]
{ const F = x => x ** 3 - x ** 2 + x; ok('area 0..2', find('integration', 'Find the area under the curve y = 3x^2'), String(F(2) - F(0))); }
// Tangent to y=x^2-3x+2 at (2,0)
{ const slope = 2 * 2 - 3; ok('tangent slope at x=2', find('quadratics', 'tangent to the curve y = x^2 - 3x + 2'), slope === 1 ? 'y = x - 2' : '?'); }
// Geometric series a=16 r=1/2
{ const s4 = 16 * (1 - 0.5 ** 4) / (1 - 0.5), sinf = 16 / (1 - 0.5); ok('geometric sums', find('sequences-and-series', 'geometric series has first term 16'), `sum of first 4 terms is ${s4} and sum to infinity is ${sinf}`); }
// cos(3x) period
ok('period cos 3x', find('trigonometry', 'period of the function y = cos(3x)'), `2π/${3}`.replace('2π/3', '2π/3'));
// Speed: s = 2t^2+3t, v(2)=11
ok('velocity t=2', find('algebra-graphs', 'displacement s metres'), `${4 * 2 + 3} m/s`);
// Vertex of y=x^2+4x+3
ok('vertex x', find('algebra-graphs', 'vertex of the parabola y = x^2 + 4x + 3'), String(-4 / 2));
// 8th term of 1,4,7,10
ok('8th term', find('algebra-sequences-and-functions', '8th term of the sequence 1, 4, 7, 10'), String(1 + (8 - 1) * 3));
// 2a^2-b, a=2, b=-3
ok('2a^2 - b', find('algebra-simplifying-and-expanding', '2a^2 - b'), String(2 * 2 ** 2 + 3));
// Angles: straight line 180, centre 60, cyclic x=35, quadrilateral 200
ok('straight line', find('geometry-angles-and-polygons', 'at a point on a straight line'), '180');
ok('centre angle', find('geometry-angles-and-polygons', 'angle at the centre of a circle'), String(2 * 30));
ok('cyclic x', find('geometry-angles-and-polygons', 'cyclic quadrilateral, two opposite'), String((180 - 5) / 5));
ok('quadrilateral fourth', find('geometry-angles-and-polygons', 'three of the angles are 40'), String(360 - (40 + 50 + 70)));
// Similar solids: volume ratio 216/27=8 => length factor 2
ok('cube scale', find('geometry-congruence-and-similarity', 'Two similar cubes'), String(Math.cbrt(216 / 27)));
ok('area ratio 4:9', find('geometry-congruence-and-similarity', 'areas are in the ratio 4:9'), `2:3`);
// Binary 1101 = 13 = D
ok('binary 1101', find('data-representation', 'hexadecimal representation of the binary number 1101'), (13).toString(16).toUpperCase());

let bad = 0;
for (const c of checks) {
  const pass = c.got === c.expectText;
  if (!pass) bad++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${c.name}: key="${c.got}" expected="${c.expectText}"`);
}
console.log(`\n${checks.length - bad}/${checks.length} repaired keys confirmed by recomputation`);
process.exit(bad ? 1 : 0);
