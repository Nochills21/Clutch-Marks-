// Recompute every numeric claim in the IGCSE batch-1 drafts. Each line is
// [label, computed, expected, tolerance]; any mismatch is a FAIL.
const claims = [
  ["3/8 = 0.375", 3 / 8, 0.375, 1e-9],
  ["3/5 of 240 = 144", (240 / 5) * 3, 144, 1e-9],
  ["2/3+5/8 = 31/24", 2 / 3 + 5 / 8, 31 / 24, 1e-9],
  ["2/3 x 9/10 = 3/5", (2 / 3) * (9 / 10), 3 / 5, 1e-9],
  ["3/4 / 2/5 = 15/8", (3 / 4) / (2 / 5), 15 / 8, 1e-9],
  ["percent change 80->92 = 15", ((92 - 80) / 80) * 100, 15, 1e-9],
  ["reverse 96/1.2 = 80", 96 / 1.2, 80, 1e-9],
  ["96 - 20% = 76.8 (wrong method)", 96 * 0.8, 76.8, 1e-9],
  ["10% down then up = 99", 100 * 0.9 * 1.1, 99, 1e-9],
  ["5000*1.03^4 = 5627.54", 5000 * Math.pow(1.03, 4), 5627.54, 0.005],
  ["3(2*6-5) = 21", 3 * (2 * 6 - 5), 21, 1e-9],
  ["(2+4)/3 - 2/2 = 1", (2 + 4) / 3 - 2 / 2, 1, 1e-9],
  ["5*3+3 = 2*3+12", 5 * 3 + 3, 2 * 3 + 12, 1e-9],
  ["Sam/Tom ages: 11+15 = 26", 11 + 15, 26, 1e-9],
  ["octagon interior = 6*180/8 = 135", (8 - 2) * 180 / 8, 135, 1e-9],
  ["octagon exterior = 360/8 = 45", 360 / 8, 45, 1e-9],
  ["hyp 5,12 = 13", Math.sqrt(25 + 144), 13, 1e-9],
  ["10 sin35 = 5.74", 10 * Math.sin(35 * Math.PI / 180), 5.74, 0.005],
  ["atan(7/24) = 16.3 deg", Math.atan(7 / 24) * 180 / Math.PI, 16.3, 0.05],
  ["sin60 = sqrt3/2", Math.sin(60 * Math.PI / 180), Math.sqrt(3) / 2, 1e-9],
  ["mean 3,5,8,9 = 6.25", (3 + 5 + 8 + 9) / 4, 6.25, 1e-9],
  ["pie: 360/40 * 12 = 108", (360 / 40) * 12, 108, 1e-9],
  ["histogram density 12/10 = 1.2", 12 / 10, 1.2, 1e-9],
  ["accel 0->20 in 8s = 2.5", (20 - 0) / 8, 2.5, 1e-9],
  ["distance (0+20)/2*8 = 80", ((0 + 20) / 2) * 8, 80, 1e-9],
  ["2kg weight at g=10 = 20", 2 * 10, 20, 1e-9],
  ["F=ma: 15/5 = 3", 15 / 5, 3, 1e-9],
  ["momentum 2*3 = 6", 2 * 3, 6, 1e-9],
  ["joint velocity 6/3 = 2", 6 / 3, 2, 1e-9],
];
let fails = 0;
for (const [label, got, want, tol] of claims) {
  const ok = Math.abs(got - want) <= tol;
  if (!ok) fails++;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}: computed ${Number(got.toFixed(4))}, claimed ${want}`);
}
console.log(fails ? `FAILURES: ${fails}` : `ALL ${claims.length} CHECKS PASS`);
process.exit(fails ? 1 : 0);
