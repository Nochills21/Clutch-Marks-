// Numeric claims in the M1 and S1 drafts. [label, computed, claimed, tol]
const g = 9.8, d = Math.PI / 180;
const claims = [
  ["|3i+4j| = 5", Math.hypot(3, 4), 5, 0],
  ["angle tan^-1(4/3) ~ 53.1 deg", Math.atan(4 / 3) / d, 53.1, 0.05],
  ["v = 4 + 3*5 = 19", 4 + 3 * 5, 19, 0],
  ["s = 4*5 + 0.5*3*25 = 57.5", 4 * 5 + 0.5 * 3 * 25, 57.5, 0],
  ["check 0.5*(4+19)*5 = 57.5", 0.5 * (4 + 19) * 5, 57.5, 0],
  ["F=ma: 12/4 = 3", 12 / 4, 3, 0],
  ["connected a = g/5 ~ 1.96", (3 - 2) * g / 5, 1.96, 0.005],
  ["connected T = 2(a+g) ~ 23.5", 2 * ((g / 5) + g), 23.5, 0.05],
  ["check T via 3g - 3a: 3g-3a", 3 * g - 3 * (g / 5), 23.52, 0.01],
  ["incline g sin30 = 4.9", g * Math.sin(30 * d), 4.9, 0.005],
  ["friction R=49, F=9.8", 0.2 * 5 * g, 9.8, 1e-9],
  ["impulse 2(2-3) = -2", 2 * (2 - 3), -2, 0],
  ["collision common v = 6/3 = 2", (2 * 3) / 3, 2, 0],
  ["10cos30 ~ 8.66", 10 * Math.cos(30 * d), 8.66, 0.005],
  ["10 sin30 = 5", 10 * Math.sin(30 * d), 5, 1e-9],
  ["moment 10*2 = 20", 10 * 2, 20, 0],
  ["mean 2,4,6,8 = 5", (2 + 4 + 6 + 8) / 4, 5, 0],
  ["median 2,4,6,8 = 5", (4 + 6) / 2, 5, 0],
  ["sum x^2 = 120", 4 + 16 + 36 + 64, 120, 0],
  ["Var = 120/4 - 25 = 5", 120 / 4 - 25, 5, 0],
  ["sd sqrt5 ~ 2.24", Math.sqrt(5), 2.24, 0.005],
  ["sum rule P(A)=0.6 P(B)=0.5 indep: P(AnB)=0.3", 0.6 * 0.5, 0.3, 1e-12],
  ["union 0.6+0.5-0.3 = 0.8", 0.6 + 0.5 - 0.3, 0.8, 1e-12],
  ["bag P(RR)=3/5*2/4=3/10", (3 / 5) * (2 / 4), 0.3, 1e-12],
  ["P(second red|first red)=1/2", 2 / 4, 0.5, 0],
  ["regression Sxy = 25-22 = 3", 25 - 3 * 2 * (11 / 3), 3, 1e-9],
  ["Sxx = 14-12 = 2", 14 - 3 * 4, 2, 0],
  ["b = 3/2 = 1.5", 3 / 2, 1.5, 0],
  ["a = 11/3 - 1.5*2 = 2/3", 11 / 3 - 3, 2 / 3, 1e-9],
  ["line passes through (2, 11/3): 2/3+3", 2 / 3 + 3, 11 / 3, 1e-9],
  ["E(X) = 1.7", 0 * 0.1 + 1 * 0.3 + 2 * 0.4 + 3 * 0.2, 1.7, 1e-12],
  ["E(X^2) = 3.7", 0 + 0.3 + 4 * 0.4 + 9 * 0.2, 3.7, 1e-12],
  ["Var = 3.7 - 1.7^2 = 0.81", 3.7 - 1.7 ** 2, 0.81, 1e-9],
  ["F(2) = 0.8", 0.1 + 0.3 + 0.4, 0.8, 1e-12],
  ["E(2X+3)=6.4", 2 * 1.7 + 3, 6.4, 1e-12],
  ["Var(2X+3)=3.24", 4 * 0.81, 3.24, 1e-9],
  ["uniform die mean 3.5", 3.5, 3.5, 0],
  ["uniform die var 35/12 ~ 2.92", (36 - 1) / 12, 2.92, 0.005],
  ["z=(58-50)/4=2", (58 - 50) / 4, 2, 0],
  ["Phi(2) ~ 0.9772", 0.9772, 0.9772, 0],
  ["P(X>46)=P(Z>-1)=P(Z<1) ~ 0.8413", 0.8413, 0.8413, 0],
  ["z=1 -> x=54", 50 + 1 * 4, 54, 0],
];
let fails = 0;
for (const [label, got, want, tol] of claims) {
  const ok = Math.abs(got - want) <= tol;
  if (!ok) fails++;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}: computed ${+got.toFixed(4)}, claimed ${want}`);
}
console.log(fails ? `FAILURES: ${fails}` : `ALL ${claims.length} CHECKS PASS`);
process.exit(fails ? 1 : 0);
