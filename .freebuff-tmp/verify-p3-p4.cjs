// Numeric claims in the Pure 3 and Pure 4 drafts. [label, computed, claimed, tol]
const d = Math.PI / 180;
let x = 1.5; for (let i = 0; i < 40; i++) x = Math.cbrt(x + 1);
const f = (t) => t ** 3 - t - 1;
const claims = [
  ["division: (x-1)(x^2+3x-2) at x=2 equals 8", (2 - 1) * (4 + 6 - 2), 2 ** 3 + 2 * 4 - 5 * 2 + 2, 0],
  ["|2x-1|=x+5 at x=6", Math.abs(2 * 6 - 1), 6 + 5, 0],
  ["|2x-1|=x+5 at x=-4/3", Math.abs(2 * (-4 / 3) - 1), -4 / 3 + 5, 1e-12],
  ["fg(0) = (0-3)^2+1 = 10", (0 - 3) ** 2 + 1, 10, 0],
  ["gf(0) = 0^2+1-3 = -2", 0 ** 2 + 1 - 3, -2, 0],
  ["inverse (x-3)/2 at f(5)=13 -> 5", (13 - 3) / 2, 5, 0],
  ["3sin+4cos = 5 sin(theta+alpha) check at theta=30", 3 * Math.sin(30 * d) + 4 * Math.cos(30 * d), 5 * (Math.sin(30 * d) * 0.6 + Math.cos(30 * d) * 0.8), 1e-12],
  ["alpha = atan(4/3) ~ 53.1", Math.atan(4 / 3) / d, 53.1, 0.05],
  ["e^(2x)=5 -> x = ln5/2 ~ 0.805", Math.log(5) / 2, 0.805, 0.001],
  ["ln(x+1)=2 -> x = e^2 - 1 ~ 6.389", Math.exp(2) - 1, 6.389, 0.001],
  ["log-graph: y=10*10^x at x=2 gives 1000", 10 * 10 ** 2, 1000, 0],
  ["d/dx(x/(x+1)) at x=1 = 1/4", 1 / (1 + 1) ** 2, 0.25, 0],
  ["product rule d/dx(x^2 sin x) at x=pi/2: 2x sinx + x^2 cosx = pi", 2 * (Math.PI / 2) * 1 + 0, Math.PI, 1e-12],
  ["d/dx(0.5x - 0.25 sin2x) at x=1 equals sin^2(1) (numerical)", (((1.000001/2 - 0.25*Math.sin(2*1.000001)) - (0.999999/2 - 0.25*Math.sin(2*0.999999))) / 0.000002), Math.sin(1) ** 2, 1e-6],
  ["f(1.3) = -0.103", f(1.3), -0.103, 0.001],
  ["f(1.4) = 0.344", f(1.4), 0.344, 0.001],
  ["fixed point iteration x=(x+1)^(1/3) -> 1.3247", x, 1.3247, 0.0001],
  ["fixed point satisfies x^3 = x+1", x ** 3, x + 1, 1e-9],
  ["partial fraction (3x+5)/((x+1)(x+2)) at x=0", 5 / 2, 2 / 1 + 1 / 2, 1e-12],
  ["(2x+3)/(x-1)^2 at x=0 = 3 = -2+5", 3 / 1, -2 + 5, 1e-12],
  ["(1+4x)^(-1/2): x^2 coefficient 6", ((-1 / 2) * (-3 / 2) / 2) * 16, 6, 1e-12],
  ["(1+x)^(1/2): x^2 coefficient -1/8", (0.5 * -0.5) / 2, -1 / 8, 1e-12],
  ["volume pi int_0^4 x dx = 8pi", 8 * Math.PI, 8 * Math.PI, 1e-12],
  ["implicit dy/dx = -3/4 at (3,4)", -3 / 4, -0.75, 1e-12],
  ["parametric gradient at t=2: 1/t = 0.5", 1 / 2, 0.5, 1e-12],
  ["tangent x-2y+4 at (4,4): 4-8+4=0", 4 - 8 + 4, 0, 0],
  ["separable y=e^(x^2): y(0)=1", Math.exp(0), 1, 0],
  ["unit vector of (1,2,2) = (1/3,2/3,2/3), magnitude 1", Math.hypot(1 / 3, 2 / 3, 2 / 3), 1, 1e-12],
  ["a.b for (1,2,2),(2,-1,2) = 4", 1 * 2 + 2 * -1 + 2 * 2, 4, 0],
  ["cos theta = 4/9 -> theta ~ 63.6", Math.acos(4 / 9) / d, 63.6, 0.05],
  ["r=(1,2,3)+t(2,-1,1) at t=1 = (3,1,4)", 1 + 2, 3, 0],
  ["binomial validity |4x|<1 means |x|<1/4", 1 / 4, 0.25, 0],
];
let fails = 0;
for (const [label, got, want, tol] of claims) {
  const ok = Math.abs(got - want) <= tol;
  if (!ok) fails++;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}: computed ${+got.toFixed(5)}, claimed ${+want.toFixed(5)}`);
}
console.log(fails ? `FAILURES: ${fails}` : `ALL ${claims.length} CHECKS PASS`);
process.exit(fails ? 1 : 0);
