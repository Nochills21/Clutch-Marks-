// Batch r3: deepens seven thin notes toward 3000+ characters.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "0b01158e-1681-416b-986a-b17cb4bc9956": `
<h3>Worked example: binding energy per nucleon</h3>
<p>Carbon-12 has six protons and six neutrons. Adding their masses gives about 12.096 u, while the carbon-12 nucleus has a mass of about 11.997 u once the electrons are removed. The mass defect is therefore about 0.099 u. Using 1 u = 931.5 MeV, the binding energy is about 92 MeV, which is about 7.7 MeV per nucleon. Binding energy per nucleon peaks near iron-56 at about 8.8 MeV. Fusion of light nuclei and fission of heavy nuclei both move products toward that peak, and that shift is why both processes release energy.</p>
<h3>Exam method: nuclear equations</h3>
<p>Balance the nucleon number and the proton number on each side of the equation separately. Alpha emission lowers the nucleon number by 4 and the proton number by 2. Beta-minus emission (an electron) leaves the nucleon number unchanged and raises the proton number by 1, because a neutron becomes a proton. Write the full symbol with its nucleon and proton numbers so the marker can check both conservation laws.</p>
`,
    "3a5f3230-7e9e-4d8b-8943-bcf86193dc3b": `
<h3>Worked example: a uniform beam on two supports</h3>
<p>A uniform beam of length 4.0 m and weight 120 N rests on two supports, one at each end. Its centre of gravity is at its midpoint, 2.0 m from either support. Taking moments about the left support, the right-hand reaction R2 satisfies R2 × 4.0 = 120 × 2.0, so R2 = 60 N. Vertical equilibrium then gives R1 = 120 − 60 = 60 N. Checking that the two reactions add up to the weight is a quick way to catch an arithmetic or sign error.</p>
<h3>Forces and moments in exam questions</h3>
<p>Resolve forces into horizontal and vertical components before applying the conditions. For a body in equilibrium, the sum of forces in each direction is zero and the sum of moments about any point is zero. Choosing the pivot at the position of an unknown force removes that force from the moment equation, which often leaves a single equation to solve. A couple (two equal and opposite parallel forces) produces the same moment about every point, so it can be balanced only by another couple, never by a single force.</p>
`,
    "08301850-6448-4a6a-9f29-d723df78f89a": `
<h3>Worked example: a mass on a string</h3>
<p>A 0.50 kg mass on a string of length 0.80 m moves in a horizontal circle at 4.0 m/s. The tension supplies the centripetal force, so T = mv²/r = 0.50 × 4.0² / 0.80 = 10 N. If the same mass is swung in a vertical circle, the tension is least at the top. The minimum speed at the top occurs when the tension falls to zero, giving v = √(gr). Here that is √(9.8 × 0.80) ≈ 2.8 m/s. Below this speed the string goes slack and the mass no longer follows the circle.</p>
<h3>Exam method: SHM equations</h3>
<p>Use x = A sin(ωt) or x = A cos(ωt), depending on the point at which timing starts. The maximum speed is v₀ = Aω and the maximum acceleration is a₀ = Aω². Use ω = 2π/T, and convert any frequency in hertz by multiplying by 2π before you substitute, because ω is in radians per second. For a simple pendulum at small angles, the period is T = 2π√(L/g) and does not depend on the amplitude.</p>
`,
    "9078e0a1-ee3d-4cec-bb01-092369018e88": `
<h3>Worked example: threshold frequency and stopping voltage</h3>
<p>Zinc has a work function of 4.3 eV. Converted to joules, that is 6.9 × 10⁻¹⁹ J, so the threshold frequency is f₀ = φ/h = 6.9 × 10⁻¹⁹ / 6.63 × 10⁻³⁴ ≈ 1.04 × 10¹⁵ Hz. Light of frequency 1.5 × 10¹⁵ Hz gives photons of energy 6.63 × 10⁻³⁴ × 1.5 × 10¹⁵ ≈ 9.9 × 10⁻¹⁹ J, or about 6.2 eV. The maximum kinetic energy of the ejected electrons is 6.2 − 4.3 ≈ 1.9 eV, so the stopping voltage is about 1.9 V. Quote values with their units, and keep eV and joules consistent within each step.</p>
<h3>Exam method: photon energy and wavelength</h3>
<p>Combine E = hf with c = fλ to give E = hc/λ. Convert wavelengths to metres before you substitute into hc, because a wavelength given in nanometres must be multiplied by 10⁻⁹ first. A wrong power of ten is the most common way to lose the final mark, so estimate the answer before you calculate it precisely.</p>
`,
    "153c8051-6b06-48ca-b39a-24d41b791d2c": `
<h3>Worked example: the back bearing</h3>
<p>An aircraft flies from A to B on a bearing of 118°. To find the bearing of A from B, add 180° because the north line at B is parallel to the north line at A: 118° + 180° = 298°. If the sum is greater than 360°, subtract 360°. Draw the north line at the point from which the angle is measured, because the marks depend on the angle being taken from the correct point.</p>
<h3>Exam method: loci and constructions</h3>
<p>The locus of points at a fixed distance from one point is a circle. The locus of points equidistant from two points is the perpendicular bisector of the line joining them. The locus of points equidistant from two lines is an angle bisector. Show every construction arc, because the marks are given for the arcs as well as the final line, and do not erase them.</p>
`,
    "c521dc16-c47b-4ecc-8b0d-4c38df77c482": `
<h3>Worked example: lifting a load</h3>
<p>A 40 kg load is lifted through 5.0 m at a steady speed. The work done against gravity is W = mgh = 40 × 9.8 × 5.0 = 1960 J, or about 2.0 kJ. If the lifting motor is 60% efficient, the electrical energy supplied is 1960 / 0.60 ≈ 3270 J, and the rest is wasted as thermal energy. Efficiency is the useful energy output divided by the total energy input, and it can never exceed 100%.</p>
<h3>Exam method: power and energy</h3>
<p>Power is the rate of energy transfer: P = E/t. When a constant force moves an object at speed v, the power is P = Fv. Convert every time to seconds and every energy to joules before you substitute. Questions that give power in kilowatts sometimes ask for energy in kilowatt-hours, so check which unit the answer should use.</p>
`,
    "d7f2e9e8-ff4a-4fba-9960-48d8ca800dd6": `
<h3>Worked example: half-life from a count rate</h3>
<p>A radioactive sample gives a count rate of 800 counts per minute. After 30 minutes the count rate is 100 counts per minute. Each half-life halves the count rate: 800 to 400, then 200, then 100. That is three half-lives in 30 minutes, so the half-life is 30 / 3 = 10 minutes. When the ratio is a power of two you can count the halvings directly; use a logarithm or the decay equation only when it is not.</p>
<h3>Exam method: background radiation</h3>
<p>Background radiation comes from natural sources such as rocks and cosmic rays, and from man-made sources such as medical X-rays. A measured count must be corrected for background before you use it in a half-life calculation: subtract the background count from every reading. Forgetting this step is a common reason for a wrong answer, because background sets a floor that the sample's own count never falls below.</p>
`
  }
};
