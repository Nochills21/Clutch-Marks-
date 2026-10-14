// Numeric claims in the Physics drafts. [label, computed, claimed, tol]
const d = Math.PI / 180;
const claims = [
  ["UAM v = 4+3*5 = 19", 4 + 3 * 5, 19, 0],
  ["UAM s = 4*5 + 0.5*3*25 = 57.5", 4 * 5 + 0.5 * 3 * 25, 57.5, 0],
  ["2kg falls 5m: mgh = 98 J", 2 * 9.8 * 5, 98, 0],
  ["upthrust 1000*2e-3*9.8 ~ 19.6", 1000 * 2e-3 * 9.8, 19.6, 1e-9],
  ["stress 100/1e-6 = 1e8 Pa", 100 / 1e-6, 1e8, 1e-6],
  ["strain 0.001/2 = 5e-4", 0.001 / 2, 5e-4, 1e-12],
  ["Young modulus 1e8/5e-4 = 2e11", 1e8 / 5e-4, 2e11, 1e-3],
  ["wave speed 500*0.70 = 350", 500 * 0.70, 350, 0],
  ["critical angle glass n=1.5: asin(1/1.5) ~ 41.8 deg", Math.asin(1 / 1.5) / d, 41.8, 0.05],
  ["grating d = 1mm/500 = 2e-6 m", 1e-3 / 500, 2e-6, 1e-15],
  ["grating sin theta = 6e-7/2e-6 = 0.30", 6e-7 / 2e-6, 0.30, 1e-12],
  ["grating theta ~ 17.5 deg", Math.asin(0.30) / d, 17.5, 0.05],
  ["copper R = 1.7e-8*2/1e-6 ~ 0.034", 1.7e-8 * 2 / 1e-6, 0.034, 1e-9],
  ["cell terminal V = 1.5 - 0.5*0.5 = 1.25", 1.5 - 0.5 * 0.5, 1.25, 0],
  ["impulse 0.2*(-6-10) = -3.2", 0.2 * (-6 - 10), -3.2, 0],
  ["angular velocity 2 rev/s = 4pi ~ 12.6", 2 * 2 * Math.PI, 12.6, 0.05],
  ["linear speed 0.30*4pi ~ 3.8", 0.30 * 4 * Math.PI, 3.8, 0.05],
  ["centripetal 0.5*2^2/0.8 = 2.5", 0.5 * 4 / 0.8, 2.5, 0],
  ["Coulomb field 8.99e9*2e-6/0.5^2 ~ 7.2e4", 8.99e9 * 2e-6 / 0.25, 7.2e4, 0.05e4],
  ["tau = 1e4 * 100e-6 = 1 s", 1e4 * 100e-6, 1, 1e-12],
  ["V after 2 s ~ 0.135 V0", Math.exp(-2), 0.135, 0.001],
  ["one tau ~ 37%", Math.exp(-1), 0.37, 0.005],
  ["238U neutrons 238-92 = 146", 238 - 92, 146, 0],
  ["proton radius r = p/(BQ) with p=5e-22: ~0.016 m", 5e-22 / (0.20 * 1.6e-19), 0.016, 0.0005],
  ["E=mc^2 for 1 kg = 9e16 J", 1 * (3e8) ** 2, 9e16, 1e9],
  ["mass defect 0.030 u * 931.5 ~ 28 MeV", 0.030 * 931.5, 28, 0.5],
  ["spring T = 2pi sqrt(0.5/20) ~ 0.99 s", 2 * Math.PI * Math.sqrt(0.5 / 20), 0.99, 0.01],
  ["g = GM/R^2 ~ 9.8 (using g=9.8)", 9.8, 9.8, 0],
  ["unit 1 kelvin: 25 C -> 298 K", 25 + 273, 298, 0],
];
let fails = 0;
for (const [label, got, want, tol] of claims) {
  const ok = Math.abs(got - want) <= tol;
  if (!ok) fails++;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}: computed ${+got.toPrecision(5)}, claimed ${want}`);
}
console.log(fails ? `FAILURES: ${fails}` : `ALL ${claims.length} CHECKS PASS`);
process.exit(fails ? 1 : 0);
