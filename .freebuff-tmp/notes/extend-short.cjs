// Extends the 25 short inline notes. Existing HTML is kept verbatim; a worked
// example and a common-mistakes block are appended. Output: review drafts only.
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "short-inline.json");
const OUT = path.join(__dirname, "extended");

const ADD = {
  "circular-measure": `
<h3>Worked example</h3>
<p>A sector has radius 6 cm and angle 0.5 rad. Arc length = rθ = 6 × 0.5 = 3 cm. Sector area = ½r²θ = ½ × 36 × 0.5 = 9 cm². The triangle formed by the two radii has area ½r² sin θ = 18 × 0.4794 ≈ 8.63 cm², so the segment area is 9 − 8.63 ≈ 0.37 cm².</p>
<h3>Common mistakes</h3>
<ul><li>Using degree-based formulas with radian input, or leaving the calculator in degree mode.</li><li>Quoting the segment area as the sector area; subtract the triangle.</li></ul>`,

  "further-trigonometry": `
<h3>Worked example</h3>
<p>Solve sin 2x = sin x for 0 ≤ x ≤ 2π. Using sin 2x = 2 sin x cos x gives sin x (2 cos x − 1) = 0. Then sin x = 0 gives x = 0, π, 2π, and cos x = ½ gives x = π/3, 5π/3: five solutions in total.</p>
<h3>Common mistakes</h3>
<ul><li>Dividing both sides by sin x, which silently loses x = 0, π and 2π.</li><li>Stopping at the principal value and missing the solutions in the other quadrants.</li></ul>`,

  "sequences-and-series": `
<h3>Worked example</h3>
<p>For the AP 3, 7, 11, …: the 20th term is 3 + 19 × 4 = 79, and the sum of the first 20 terms is 10 × (2 × 3 + 19 × 4) = 820. For the GP 2, 6, 18, …: r = 3, so the sum of the first five terms is 2(3⁵ − 1)/(3 − 1) = 242, which matches 2 + 6 + 18 + 54 + 162.</p>
<h3>Common mistakes</h3>
<ul><li>Using S∞ = a/(1 − r) when |r| ≥ 1; the sum to infinity does not exist.</li><li>Mixing up n and n − 1 in the nth-term formula for an AP.</li></ul>`,

  "integration": `
<h3>Worked example</h3>
<p>Find the area between y = x² + 1, the x-axis, and x = 0 to x = 2. The integral is [x³/3 + x] from 0 to 2 = 8/3 + 2 = 14/3 square units. Since the curve is above the axis throughout, no splitting is needed.</p>
<h3>Common mistakes</h3>
<ul><li>Forgetting the constant of integration on indefinite integrals, or dropping it when a condition is given to find it.</li><li>Reporting a negative area when part of the region lies below the x-axis; split the integral at the crossing points and take the absolute value of each part.</li></ul>`,

  "differentiation-ii": `
<h3>Worked example</h3>
<p>For y = x²/(x + 1), the quotient rule gives dy/dx = [2x(x + 1) − x²]/(x + 1)² = (x² + 2x)/(x + 1)². At x = 1 this is 3/4. For the parametric curve x = t², y = t³, dy/dx = (3t²)/(2t) = 3t/2.</p>
<h3>Common mistakes</h3>
<ul><li>Differentiating the top and bottom separately instead of applying the quotient rule.</li><li>Writing dy/dx in terms of t without converting it back to x when the question asks for x.</li></ul>`,

  "electric-fields-and-capacitance": `
<h3>Worked example</h3>
<p>Two parallel plates 5 mm apart are held at 100 V. The field is E = V/d = 100 / 0.005 = 2 × 10⁴ V/m. With plate area 0.01 m², the capacitance is C = ε₀A/d = 8.85 × 10⁻¹² × 0.01 / 0.005 ≈ 1.77 × 10⁻¹¹ F (17.7 pF), and the stored energy is ½CV² ≈ 8.9 × 10⁻⁸ J.</p>
<h3>Common mistakes</h3>
<ul><li>Using the plate separation in millimetres instead of metres.</li><li>Adding capacitances in series; the reciprocals add, so the combined value is smaller than either one.</li></ul>`,

  "pressure-density": `
<h3>Worked example</h3>
<p>The gauge pressure at 10 m depth in fresh water is p = ρgh = 1000 × 9.81 × 10 ≈ 98 kPa. Adding atmospheric pressure (about 101 kPa) gives a total of about 199 kPa. A 500 g block of volume 250 cm³ has density 0.5 kg ÷ 2.5 × 10⁻⁴ m³ = 2000 kg/m³.</p>
<h3>Common mistakes</h3>
<ul><li>Using cm³ directly in density calculations; convert to m³ first (1 cm³ = 10⁻⁶ m³).</li><li>Forgetting that a pressure at depth in a liquid is independent of the container's shape.</li></ul>`,

  "motion-in-a-circle-and-gravity": `
<h3>Worked example</h3>
<p>A 1000 kg car takes a bend of radius 50 m at 20 m/s. The required centripetal force is mv²/r = 1000 × 400 / 50 = 8000 N, which friction must supply. At twice the Earth's radius, the gravitational field strength falls to a quarter of its surface value: 9.81 / 4 ≈ 2.45 N/kg.</p>
<h3>Common mistakes</h3>
<ul><li>Drawing a separate outward "centrifugal" force on the car; in the inertial frame only real forces appear, and the net inward force equals mv²/r.</li><li>Applying the inverse-square law to radius instead of distance from the centre.</li></ul>`,

  "thermal-physics": `
<h3>Worked example</h3>
<p>Heating 2 kg of water from 20 °C to 80 °C with c = 4200 J kg⁻¹ K⁻¹ needs Q = mcΔθ = 2 × 4200 × 60 = 504 000 J. Melting 0.5 kg of ice with L = 3.34 × 10⁵ J kg⁻¹ needs 1.67 × 10⁵ J, and the temperature stays at 0 °C throughout.</p>
<h3>Common mistakes</h3>
<ul><li>Using specific heat capacity for a phase change; use the specific latent heat instead.</li><li>Expecting temperature to rise while a substance is melting or boiling.</li></ul>`,

  "work-energy-and-power": `
<h3>Worked example</h3>
<p>Lifting a 50 kg load through 4 m does work W = mgh = 50 × 9.81 × 4 ≈ 1960 J. If this takes 10 s, the average power is 196 W. If the motor takes 2500 J of electrical energy to do that work, its efficiency is 1960 / 2500 ≈ 78%.</p>
<h3>Common mistakes</h3>
<ul><li>Taking the useful output as the input energy; efficiency is always below 100%.</li><li>Confusing power (energy per second) with energy.</li></ul>`,

  "circular-motion-and-shm": `
<h3>Worked example</h3>
<p>A 0.2 kg mass on a spring of stiffness 20 N/m has period T = 2π√(m/k) = 2π√0.01 ≈ 0.63 s. With amplitude 0.05 m, ω = 2π/T = 10 rad/s, so the maximum speed is ωA = 0.5 m/s, reached at the centre of the oscillation.</p>
<h3>Common mistakes</h3>
<ul><li>Putting maximum speed at the extremes; speed is greatest at the equilibrium position, and acceleration is greatest at the extremes.</li><li>Using the frequency f where the question asks for the angular frequency ω.</li></ul>`,

  "integration-ii": `
<h3>Worked example</h3>
<p>By parts with u = x and dv = eˣ dx, ∫ x eˣ dx = (x − 1)eˣ + C. For partial fractions, (3x + 5)/((x + 1)(x + 2)) = 2/(x + 1) + 1/(x + 2): check by substituting x = −1 to get 2 and x = −2 to get 1. For substitution, ∫ 2x(x² + 1)³ dx = (x² + 1)⁴/4 + C, with u = x² + 1.</p>
<h3>Common mistakes</h3>
<ul><li>Choosing the wrong part for u in integration by parts; pick the part that simplifies when differentiated.</li><li>Forgetting to change the limits when substituting in a definite integral.</li></ul>`,

  "coordinate-geometry": `
<h3>Worked example</h3>
<p>The line through (1, 2) and (5, 10) has gradient 8/4 = 2, so y − 2 = 2(x − 1), i.e. y = 2x. The perpendicular bisector of the same segment passes through the midpoint (3, 6) with gradient −½, so y − 6 = −½(x − 3).</p>
<h3>Common mistakes</h3>
<ul><li>Using the same gradient for a perpendicular line; the gradients must multiply to −1.</li><li>Forgetting that a bisector passes through the midpoint, not an endpoint.</li></ul>`,

  "astronomy-and-cosmology": `
<h3>Worked example</h3>
<p>For a star with surface temperature 5800 K, Wien's law gives λmax = 2.9 × 10⁻³ / 5800 ≈ 5.0 × 10⁻⁷ m, or about 500 nm. With H₀ ≈ 70 km s⁻¹ Mpc⁻¹, a galaxy 100 Mpc away has recession speed v = H₀d = 7000 km/s.</p>
<h3>Common mistakes</h3>
<ul><li>Mixing up the units of H₀, which are per second per megaparsec.</li><li>Using the surface temperature in °C rather than kelvin in Wien's law.</li></ul>`,

  "differentiation": `
<h3>Worked example</h3>
<p>For y = x³ − 3x², dy/dx = 3x² − 6x = 0 gives x = 0 or x = 2. Since d²y/dx² = 6x − 6, the point (0, 0) is a maximum and (2, −4) is a minimum. The tangent at x = 1 has gradient −3 and passes through (1, −2), so its equation is y = −3x + 1.</p>
<h3>Common mistakes</h3>
<ul><li>Stating a stationary point without giving its y-coordinate.</li><li>Using the gradient of the curve for the normal instead of its negative reciprocal.</li></ul>`,

  "quantum-physics": `
<h3>Worked example</h3>
<p>A photon of wavelength 500 nm has energy E = hc/λ = 1240/500 ≈ 2.48 eV. If the metal has work function 2.0 eV, the maximum kinetic energy of an emitted electron is 2.48 − 2.00 = 0.48 eV. Increasing the intensity alone would emit more electrons but would not change this maximum.</p>
<h3>Common mistakes</h3>
<ul><li>Saying intensity increases the electron energy; intensity affects the number of electrons, frequency affects their energy.</li><li>Mixing up the threshold frequency f₀ = φ/h with the threshold wavelength.</li></ul>`,

  "vectors": `
<h3>Worked example</h3>
<p>For a = (2, −1, 3) and b = (1, 4, −2): a · b = 2 − 4 − 6 = −8. Using |a| = √14 and |b| = √21, cos θ = −8/√294 ≈ −0.466, so θ ≈ 118°.</p>
<h3>Common mistakes</h3>
<ul><li>Using the magnitude of the dot product as the answer; the sign tells you whether the angle is acute or obtuse.</li><li>Forgetting that the dot product of perpendicular vectors is zero, not one.</li></ul>`,

  "number-sets": `
<h3>Worked example</h3>
<p>In a group of 30 students, 18 study maths, 15 study physics and 7 study both. Then n(M ∪ P) = 18 + 15 − 7 = 26, so 4 study neither. Only maths is 18 − 7 = 11, and only physics is 15 − 7 = 8.</p>
<h3>Common mistakes</h3>
<ul><li>Adding the two totals without subtracting the overlap.</li><li>Reading "only A" as the whole of A.</li></ul>`,

  "materials-deformation": `
<h3>Worked example</h3>
<p>A wire of area 1 × 10⁻⁶ m² and length 2 m is stretched 1 mm by a 100 N force. Stress = F/A = 1 × 10⁸ Pa. Strain = extension/length = 10⁻³ / 2 = 5 × 10⁻⁴. Young modulus = stress/strain = 2 × 10¹¹ Pa.</p>
<h3>Common mistakes</h3>
<ul><li>Using the diameter in place of the cross-sectional area.</li><li>Using extension where the question asks for strain (a ratio with no units).</li></ul>`,

  "algebra-inequalities": `
<h3>Worked example</h3>
<p>Solve 3x − 5 &lt; 2x + 1: subtracting 2x and adding 5 gives x &lt; 6. For integer solutions to −2 &lt; 2x + 3 ≤ 7, subtract 3 to get −5 &lt; 2x ≤ 4, so −2.5 &lt; x ≤ 2. The integers are −2, −1, 0, 1 and 2.</p>
<h3>Common mistakes</h3>
<ul><li>Failing to reverse the inequality when multiplying or dividing by a negative: −2x &gt; 6 gives x &lt; −3.</li><li>Giving non-integer values when the question asks for integers.</li></ul>`,

  "trigonometry": `
<h3>Worked example</h3>
<p>Solve 3 tan²x = 1 for 0° ≤ x ≤ 360°. Then tan x = ±1/√3, so the solutions are x = 30°, 150°, 210° and 330°. The calculator gives only 30° and −30°, so the other two must come from the CAST diagram.</p>
<h3>Common mistakes</h3>
<ul><li>Giving only the principal value and missing solutions in the other quadrants.</li><li>Taking the square root of tan²x without considering both signs.</li></ul>`,

  "nuclear-physics": `
<h3>Worked example</h3>
<p>A sample with half-life 10 days has 1/2³ = 1/8 of its nuclei left after 30 days (three half-lives). A mass defect of 0.1 u corresponds to 0.1 × 931.5 ≈ 93 MeV of binding energy.</p>
<h3>Common mistakes</h3>
<ul><li>Treating 1 u as 1 MeV; it is about 931.5 MeV of energy.</li><li>Confusing activity with the number of nuclei remaining.</li></ul>`,

  "data-structures": `
<h3>Worked example</h3>
<p>Push A, B and C onto a stack, then pop: the order is C, B, A (LIFO). Enqueue 1, 2 and 3 into a queue, then dequeue: the order is 1, 2, 3 (FIFO). With a hash function h(k) = k mod 5, inserting 12 puts it in slot 2, and inserting 17 also maps to slot 2, which is a collision that must be resolved.</p>
<h3>Common mistakes</h3>
<ul><li>Saying a stack is FIFO or a queue is LIFO.</li><li>Quoting O(1) for linear search; it is O(n), while binary search on sorted data is O(log n).</li></ul>`,

  "kinematics": `
<h3>Worked example</h3>
<p>A car accelerates uniformly from 0 to 20 m/s in 8 s, so a = 2.5 m/s² and the distance covered is s = (u + v)t/2 = 10 × 8 = 80 m. A projectile launched at 20 m/s and 30° has horizontal velocity 17.3 m/s, time of flight 2.04 s, range 35.3 m, and maximum height 5.1 m.</p>
<h3>Common mistakes</h3>
<ul><li>Using the SUVAT equations on a non-uniform acceleration.</li><li>Forgetting that the horizontal and vertical motions of a projectile are treated separately.</li></ul>`,

  "hardware-and-logic-gates": `
<h3>Worked example</h3>
<p>Check A + A̅B = A + B: with A = 0 and B = 1, the left side is 0 + 1 = 1, matching the right side. A half adder has sum = A XOR B and carry = A AND B. For a JK flip-flop with J = K = 1, the output toggles on each clock pulse.</p>
<h3>Common mistakes</h3>
<ul><li>Drawing a NAND or NOR gate with the wrong output inversion.</li><li>Simplifying a Boolean expression without naming the law used.</li></ul>`,
};

// Stray backticks leaked into two headings: "<p>`# Title</p>" becomes "<h2>Title</h2>".
function fixStrayHeading(html) {
  return html.replace(/<p>`#\s*([^<]*)<\/p>/, "<h2>$1</h2>");
}

const notes = JSON.parse(fs.readFileSync(SRC, "utf8"));
fs.mkdirSync(OUT, { recursive: true });
const report = [];
for (const n of notes) {
  const add = ADD[n.slug];
  if (!add) throw new Error("no addition for " + n.slug);
  const before = n.content;
  const fixed = fixStrayHeading(before);
  const out = fixed.trimEnd() + "\n" + add.trim() + "\n";
  fs.writeFileSync(path.join(OUT, n.slug + ".html"), out);
  report.push({ slug: n.slug, before: before.length, after: out.length, fixedHeading: fixed !== before });
}
fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(report, null, 2));
for (const r of report) console.log(r.slug.padEnd(34), String(r.before).padStart(5), "->", String(r.after).padStart(5), r.fixedHeading ? "(heading fixed)" : "");
console.log("wrote", report.length, "drafts to", OUT);
