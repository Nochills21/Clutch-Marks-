// Recompute every numeric claim in the AS Maths drafts. [label, computed, claimed, tolerance]
const r = (x) => x;
const claims = [
  ["x^2+x-6 roots -3 and 2", [(-3) ** 2 + (-3) - 6, 2 ** 2 + 2 - 6], [0, 0], 1e-9],
  ["x^2-x-1 root (1+sqrt5)/2 ~ 1.618", (1 + Math.sqrt(5)) / 2, 1.618, 0.001],
  ["x^2-x-1 root (1-sqrt5)/2 ~ -0.618", (1 - Math.sqrt(5)) / 2, -0.618, 0.001],
  ["discriminant 2x^2-4x+5 = -24", 16 - 40, -24, 1e-9],
  ["completing square x^2+6x+5 at x=-3 gives -4", 9 - 18 + 5, -4, 1e-9],
  ["1/(3+sqrt2) = (3-sqrt2)/7", 1 / (3 + Math.SQRT2), (3 - Math.SQRT2) / 7, 1e-12],
  ["x^2-5x+6 at x=2.5 is negative", 6.25 - 12.5 + 6 < 0 ? 1 : 0, 1, 0],
  ["x^2-5x+6 at x=2 is zero (boundary)", 4 - 10 + 6, 0, 1e-9],
  ["fg(1) with f=x^2+1, g=2x-3 is 2", (2 * 1 - 3) ** 2 + 1, 2, 1e-9],
  ["gf(1) with f=x^2+1, g=2x-3 is 1", 2 * (1 + 1) - 3, 1, 1e-9],
  ["f^-1(f(5)) = 5 for f=2x+3", (2 * 5 + 3 - 3) / 2, 5, 1e-9],
  ["gradient A(1,2) B(5,10) = 2", (10 - 2) / (5 - 1), 2, 1e-9],
  ["midpoint AB x = 3", (1 + 5) / 2, 3, 1e-9],
  ["midpoint AB y = 6", (2 + 10) / 2, 6, 1e-9],
  ["AB length sqrt80 = 4sqrt5", Math.sqrt(80), 4 * Math.sqrt(5), 1e-9],
  ["AB length ~ 8.94", Math.sqrt(80), 8.94, 0.005],
  ["perpendicular to y=2x: -1/2", -1 / 2, -0.5, 1e-9],
  ["x+2y-25=0 passes through B(5,10)", 5 + 20 - 25, 0, 1e-9],
  ["sine rule b = 7 sin60/sin40 ~ 9.43", (7 * Math.sin(Math.PI / 3)) / Math.sin((40 * Math.PI) / 180), 9.43, 0.01],
  ["cosine rule a^2 = 25+49-35 = 39", 25 + 49 - 70 * 0.5, 39, 1e-9],
  ["cosine rule a ~ 6.24", Math.sqrt(39), 6.24, 0.005],
  ["sin x = 0.5 solutions 30 and 150 (sin150 = 0.5)", Math.sin((150 * Math.PI) / 180), 0.5, 1e-9],
  ["AP 20th term 3+19*4 = 79", 3 + 19 * 4, 79, 1e-9],
  ["AP sum S20 = 10*(6+76) = 820", 10 * (6 + 76), 820, 1e-9],
  ["GP sum to infinity 8/(1-1/2) = 16", 8 / (1 - 0.5), 16, 1e-9],
  ["sigma 2r for r=1..4 = 20", 2 + 4 + 6 + 8, 20, 1e-9],
  ["dy/dx of y=x^2 at x=1 is 2", 2 * 1, 2, 1e-9],
  ["tangent y=2x-1 at x=1 gives y=1", 2 * 1 - 1, 1, 1e-9],
  ["y=x^3-3x^2+2 at x=0 is 2", 2, 2, 1e-9],
  ["y=x^3-3x^2+2 at x=2 is -2", 8 - 12 + 2, -2, 1e-9],
  ["y''=6x-6 at x=0 is -6 (maximum)", 6 * 0 - 6, -6, 1e-9],
  ["y''=6x-6 at x=2 is 6 (minimum)", 6 * 2 - 6, 6, 1e-9],
  ["integral 2x+1 from 1 to 3 = 10", (9 + 3) - (1 + 1), 10, 1e-9],
  ["area 4-x^2 from -2 to 2 = 32/3", (4 * 2 - 8 / 3) - (4 * -2 + 8 / 3), 32 / 3, 1e-9],
  ["area 32/3 ~ 10.67", 32 / 3, 10.67, 0.005],
];
let fails = 0;
for (const [label, got, want, tol] of claims) {
  const g = Array.isArray(got) ? got : [got];
  const w = Array.isArray(want) ? want : [want];
  const ok = g.every((v, i) => Math.abs(v - w[i]) <= tol);
  if (!ok) fails++;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}: computed ${g.map((v) => Number(v.toFixed(4))).join(", ")}, claimed ${w.join(", ")}`);
}
console.log(fails ? `FAILURES: ${fails}` : `ALL ${claims.length} CHECKS PASS`);
process.exit(fails ? 1 : 0);
