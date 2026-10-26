// Physics A2 notes, deepened to the depth bar — Electric Fields and Capacitance
// (statements 18.1-18.5, 19.1-19.3), Motion in a Circle and Gravity (13.1-13.4)
// and Circular Motion and SHM (12.1-12.2). Board framing: Edexcel IAL Physics Units 4-6.
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-phy-a2-b-depth.cjs > .freebuff-tmp/phy-a2-b.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phy-a2-b.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phy-a2-b.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "7e15d4c0-7177-419e-989b-05b5eca76131": "A Level Physics: Electric Fields and Capacitance",
    "60c15fd5-3a9c-4466-ab16-33b4c3496232": "A Level Physics: Motion in a Circle and Gravity",
    "08301850-6448-4a6a-9f29-d723df78f89a": "A Level Physics: Circular Motion and SHM",
  },
  rows: {
    "7e15d4c0-7177-419e-989b-05b5eca76131": `
<h2>A Level Physics: Electric Fields and Capacitance</h2>
<p>Electric fields are the invisible architecture around every charge: the reason a balloon sticks to a wall, the reason a capacitor can store energy in a camera flash, the reason lightning finds a path. This note builds the topic from zero: what a field is and how field lines encode it, uniform and radial fields with their formulas, Coulomb's law and electric potential, and then capacitance — what it means to store charge, where the energy lives, and how a capacitor discharges exponentially. Every formula is derived or justified, and every calculation type is worked in full.</p>

<h3>Electric fields and field lines</h3>
<p>A field is a region where a force acts on a suitable object: an electric field exerts a force on a charge. Field lines are the map, drawn with three rules: they point in the direction of the force on a <em>positive</em> charge; their density indicates field strength (closer lines, stronger field); and they never cross. A positive point charge has lines radiating outward; a negative charge has them pointing inward; between two parallel plates the lines are equally spaced and parallel — a uniform field.</p>
<ul>
<li><strong>Uniform field:</strong> same magnitude and direction everywhere (between charged plates).</li>
<li><strong>Radial field:</strong> strength falls with distance, direction along the radius (around a point charge or sphere).</li>
</ul>

<h3>Uniform electric fields</h3>
<p>Between parallel plates separated by distance d with potential difference V, the field strength is constant:</p>
<pre><code>E = V/d        (V m-1 or N C-1)

force on a charge in the field: F = Q E
so the acceleration of a particle of mass m: a = QE/m</code></pre>
<p>The analogy: the field is a slope; a charge is a ball. Between parallel plates the slope is uniform, so the ball accelerates steadily — exactly like projectile motion with gravity replaced by QE, which is why electron beams deflect in parabolic arcs between deflection plates.</p>
<p><strong>Worked example.</strong> Two plates 4.0 cm apart have a p.d. of 200 V. An electron enters the field.</p>
<pre><code>E = V/d = 200/0.040 = 5000 V m-1
force: F = eE = 1.6 x 10^-19 x 5000 = 8.0 x 10^-16 N
acceleration: a = F/m_e = 8.0 x 10^-16/9.11 x 10^-31
            = 8.8 x 10^14 m s-2  (toward the positive plate)</code></pre>

<h3>Coulomb's law: force between point charges</h3>
<pre><code>F = Q1 Q2 / (4 pi epsilon_0 r^2)

epsilon_0 = 8.85 x 10-12 F m-1 (permittivity of free space)
1/(4 pi epsilon_0) = 8.99 x 10^9 N m2 C-2
r = separation between the charges (m)</code></pre>
<p>The law is an inverse-square law like gravitation, but with two crucial differences: the force can attract or repel (like charges repel), and the constant is enormously larger. The 10³⁶ ratio between electric and gravitational forces between two protons is why gravity dominates the cosmos while electricity dominates chemistry.</p>
<p><strong>Worked example.</strong> Two charges of +3.0 μC and −2.0 μC are 0.15 m apart in air. Find the force.</p>
<pre><code>F = k Q1 Q2/r^2 = 8.99 x 10^9 x (3.0 x 10^-6 x 2.0 x 10^-6)/0.15^2
  = 8.99 x 10^9 x 6.0 x 10^-12/0.0225
  = 0.0539/0.0225 = 2.4 N  (attractive)</code></pre>

<h3>Electric field of a point charge</h3>
<p>From Coulomb's law, the field strength at distance r from a point charge Q is the force per unit charge:</p>
<pre><code>E = Q / (4 pi epsilon_0 r^2)        (N C-1)</code></pre>
<p>Compare with gravitational field strength g = GM/r²: same inverse-square shape, different constant and source. Field strength is a vector (direction is the force on a positive charge); field lines are denser near the charge, matching the 1/r² fall.</p>
<p><strong>Worked example.</strong> Find the field strength 0.20 m from a +5.0 nC charge.</p>
<pre><code>E = k Q/r^2 = 8.99 x 10^9 x 5.0 x 10^-9/0.040
  = 44.95/0.040 = 1.1 x 10^3 N C-1 (away from the charge)</code></pre>

<h3>Electric potential</h3>
<p>Potential is the potential energy per unit charge at a point in a field, measured relative to infinity:</p>
<pre><code>V = Q / (4 pi epsilon_0 r)        (volts, J C-1)

work done moving a charge: W = Q Delta V
relation to field strength: E = - dV/dr  (field is the
potential gradient; the minus sign means E points toward
decreasing potential)</code></pre>
<p>The potential around a positive charge is positive and falls with distance; around a negative charge it is negative and rises toward zero at infinity. Equipotential surfaces are perpendicular to field lines — no work is done moving a charge along one.</p>
<p><strong>Worked example.</strong> Find the potential 0.50 m from a −4.0 nC charge and the work needed to move a +2.0 nC charge there from infinity.</p>
<pre><code>V = k Q/r = 8.99 x 10^9 x (-4.0 x 10^-9)/0.50 = -71.9 V
W = Q Delta V = 2.0 x 10^-9 x (-71.9 - 0) = -1.4 x 10^-7 J
The negative work means the field does the work - the charges attract.</code></pre>

<h3>Capacitors and capacitance</h3>
<p>A capacitor stores charge on two conductors separated by an insulator. Its capacitance is the charge stored per volt:</p>
<pre><code>C = Q/V        farad (F); 1 F = 1 C V-1

parallel plates: C = epsilon_0 epsilon_r A/d

epsilon_r = relative permittivity of the dielectric,
A = plate area (m2), d = plate separation (m)</code></pre>
<p>The analogy: a capacitor is a tank for charge, and capacitance is the tank's width — a wide tank (large C) holds more charge for the same pressure (voltage). The dielectric matters: inserting a material with ε_r > 1 (typically 2–10) multiplies the capacitance because the molecules polarise and reduce the effective field between the plates.</p>
<p><strong>Worked example.</strong> A parallel-plate capacitor has plates of area 0.020 m² separated by 0.10 mm of air. Find C.</p>
<pre><code>C = epsilon_0 A/d = 8.85 x 10-12 x 0.020/1.0 x 10-4
  = 1.77 x 10-13/1.0 x 10-4 = 1.77 x 10-9 F = 1.8 nF</code></pre>
<p>Combining capacitors reverses the resistor rules: capacitors in <strong>parallel</strong> add (C = C₁ + C₂ — bigger plates), while in <strong>series</strong> the reciprocals add (1/C = 1/C₁ + 1/C₂).</p>
<p><strong>Worked example (series).</strong> Find the total capacitance of 4.0 μF and 12.0 μF in series.</p>
<pre><code>1/C = 1/4.0 + 1/12.0 = 0.25 + 0.0833 = 0.333
C = 3.0 uF   (always smaller than the smallest capacitor)</code></pre>

<h3>Energy stored in a capacitor</h3>
<p>Charging a capacitor means pushing charge onto a conductor that already repels it — the voltage rises as charge accumulates, so the work done is the area under the Q–V graph, a triangle:</p>
<pre><code>W = (1/2) Q V = (1/2) C V^2 = Q^2/(2C)</code></pre>
<p>The energy is stored in the electric field between the plates. The Q–V graph is a straight line through the origin for a fixed capacitor; the stored energy is the triangular area beneath it — which is why the factor is ½ and not 1.</p>
<p><strong>Worked example.</strong> A 100 μF capacitor is charged to 12 V. Find the energy stored and the charge.</p>
<pre><code>Q = C V = 100 x 10^-6 x 12 = 1.2 x 10^-3 C
W = (1/2) C V^2 = 0.5 x 100 x 10^-6 x 144 = 7.2 x 10^-3 J
  = 7.2 mJ</code></pre>

<h3>Discharging a capacitor</h3>
<p>A capacitor discharging through a resistor follows an exponential decay, like radioactive decay:</p>
<pre><code>Q = Q0 e^(-t/RC)        V = V0 e^(-t/RC)        I = I0 e^(-t/RC)

time constant tau = RC   (seconds)
after one tau: about 37% of the starting value remains
after five tau: under 1% remains (effectively discharged)</code></pre>
<p><strong>Worked example.</strong> A 470 μF capacitor charged to 9.0 V discharges through 2.2 kΩ. Find the time constant and the voltage after 2.0 s.</p>
<pre><code>tau = R C = 2200 x 470 x 10^-6 = 1.03 s
V = 9.0 x e^(-2.0/1.03) = 9.0 x e^(-1.94)
  = 9.0 x 0.144 = 1.29 V  (1.3 V, 2 s.f.)</code></pre>
<p>The discharge graph questions are standard: plot ln V against t and the gradient is −1/(RC); the area under a current–time graph is the charge that left the capacitor.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Field strength)</strong> Two plates 2.0 cm apart have a p.d. of 100 V. Find E. <em>Answer:</em> E = V/d = 100/0.020 = 5000 V m⁻¹.</li>
<li><strong>(Coulomb)</strong> Two +2.0 μC charges are 0.10 m apart. Find the force between them. <em>Answer:</em> F = 8.99 × 10⁹ × (2.0 × 10⁻⁶)²/(0.10)² = 8.99 × 10⁹ × 4.0 × 10⁻¹²/0.010 = 3.6 N, repulsive.</li>
<li><strong>(Potential)</strong> Explain why electric potential, unlike field strength, is a scalar. <em>Answer:</em> Potential is energy per unit charge, and energy is a scalar; it has sign (positive near positive charge) but no direction. Field strength is a vector because force has direction.</li>
<li><strong>(Capacitance)</strong> A capacitor stores 5.0 mC at 25 V. Find its capacitance. <em>Answer:</em> C = Q/V = 5.0 × 10⁻³/25 = 2.0 × 10⁻⁴ F = 200 μF.</li>
<li><strong>(Dielectric)</strong> Explain why inserting a dielectric increases capacitance. <em>Answer:</em> The dielectric's molecules polarise, creating an opposing field that reduces the net field for the same charge; since V = Ed falls while Q stays, C = Q/V rises (multiplied by ε_r).</li>
<li><strong>(Energy)</strong> A 2.0 μF capacitor is charged to 50 V. Find the energy stored. <em>Answer:</em> W = ½CV² = ½ × 2.0 × 10⁻⁶ × 2500 = 2.5 × 10⁻³ J = 2.5 mJ.</li>
<li><strong>(Discharge)</strong> A 2.0 kΩ resistor discharges a 100 μF capacitor. Find the time constant and the percentage remaining after 0.60 s. <em>Answer:</em> τ = RC = 2000 × 100 × 10⁻⁶ = 0.20 s; after 0.60 s = 3τ, remaining fraction = e⁻³ = 0.050, so 5.0%.</li>
<li><strong>(Graph)</strong> State how the gradient of a ln V against t graph relates to the time constant. <em>Answer:</em> ln V = ln V₀ − t/RC, so the gradient is −1/(RC) = −1/τ.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>V/d in centimetres:</strong> d must be in metres; 4.0 cm is 0.040 m, and the classic factor-of-100 error follows.</li>
<li><strong>Charge units:</strong> μC = 10⁻⁶ C, nC = 10⁻⁹ C. Substituting μC as C inflates answers by a million.</li>
<li><strong>Sign conventions:</strong> field strength is defined by the force on a positive charge; around a negative charge the lines point inward. State directions explicitly.</li>
<li><strong>E = V/d only in uniform fields:</strong> between plates yes; around a point charge use E = kQ/r².</li>
<li><strong>Series/parallel reversal:</strong> capacitors behave oppositely to resistors — series gives the reciprocals, parallel simply adds.</li>
<li><strong>Energy factor ½:</strong> W = ½QV, not QV — the voltage rises during charging, so averaging matters. Forgetting the ½ doubles the answer.</li>
<li><strong>Time-constant confusion:</strong> τ = RC in seconds means R in ohms and C in farads; the pair must be SI.</li>
<li><strong>Discharge graph linearisation:</strong> a plot of V against t is a curve; only ln V against t is a straight line whose gradient gives −1/τ.</li>
<li><strong>Precision:</strong> 2 or 3 s.f. with units (N, V m⁻¹, F, J, s); use ε₀ = 8.85 × 10⁻¹² F m⁻¹ from the data sheet.</li>
</ul>
`,
    "60c15fd5-3a9c-4466-ab16-33b4c3496232": `
<h2>A Level Physics: Motion in a Circle and Gravity</h2>
<p>Gravity is the weakest of the four fundamental forces and yet it shapes galaxies — because it never cancels: mass has only one sign, so every particle attracts every other. This note builds the gravitational toolkit from zero: the field concept and field lines, Newton's law of gravitation, field strength and potential for a point mass, and then the applications that fill the papers — satellite orbits, escape velocity and the energy bookkeeping of lifting a mass to infinity. Every formula is derived from the inverse-square law, and every calculation type is worked in full.</p>

<h3>The gravitational field</h3>
<p>A gravitational field is a region in which a mass experiences a force. Field lines point toward the mass creating the field (gravity is always attractive), and their density shows strength — close to a planet the lines are dense (strong field), far away they are sparse. Two field shapes are examinable:</p>
<ul>
<li><strong>Radial field:</strong> around a point mass or a spherical planet outside its surface; strength falls with distance.</li>
<li><strong>Uniform field:</strong> near a planet's surface over small height changes; strength g is effectively constant (the approximation behind mgh).</li>
</ul>

<h3>Newton's law of gravitation</h3>
<pre><code>F = G M m / r^2

G = 6.67 x 10-11 N m2 kg-2 (gravitational constant)
M, m = the two masses (kg)
r = separation between their centres (m)</code></pre>
<p>The analogy that makes the law intuitive: the force weakens like light spreading from a lamp — doubling the distance spreads the same influence over four times the area, so the force quarters. The law is universal: the same G applies to an apple and the Earth as to two galaxies.</p>
<p><strong>Worked example.</strong> Find the gravitational force between two 1000 kg masses 2.0 m apart.</p>
<pre><code>F = G M m/r^2 = 6.67 x 10^-11 x 1000 x 1000/4.0
  = 6.67 x 10^-5/4.0 = 1.7 x 10^-5 N</code></pre>
<p>Note how tiny it is — gravity only matters when one mass is astronomical, which is why the electric force dominates at particle scales.</p>

<h3>Gravitational field strength</h3>
<p>Field strength g is force per unit mass (N kg⁻¹), and for a point mass or a spherical body:</p>
<pre><code>g = G M / r^2

at a planet's surface: g = G M / R^2  (R = planet radius)
variation with height: g falls as 1/r^2 from the centre</code></pre>
<p><strong>Worked example.</strong> Find g at the surface of Mars (M = 6.4 × 10²³ kg, R = 3.4 × 10⁶ m).</p>
<pre><code>g = G M/R^2 = 6.67 x 10^-11 x 6.4 x 10^23/(3.4 x 10^6)^2
  = 4.27 x 10^13/1.156 x 10^13 = 3.7 N kg-1</code></pre>
<p><strong>Worked example 2 (height).</strong> At what height above Earth's surface does g fall to half its surface value? (R = 6.4 × 10⁶ m.)</p>
<pre><code>g_surface = GM/R^2; half -> GM/r^2 = (1/2) GM/R^2
r^2 = 2 R^2 -> r = R sqrt(2) = 9.05 x 10^6 m
height = r - R = 2.65 x 10^6 m  (about 2650 km)</code></pre>

<h3>Gravitational potential</h3>
<p>Potential is the work done per unit mass in bringing a mass from infinity to that point (zero at infinity by definition). Because gravity attracts, the work is done <em>by</em> the field on the way in, so potential is negative everywhere:</p>
<pre><code>V = - G M / r        (J kg-1)

potential energy of a mass m: U = m V = - G M m / r
work to move between potentials: W = m (V2 - V1)</code></pre>
<p>The negative sign is not a detail — it is the physical statement that masses are bound. The potential well around a planet is a dip; escape means climbing out of it to V = 0 at infinity.</p>
<p><strong>Worked example.</strong> Find the potential at Earth's surface (M = 5.97 × 10²⁴ kg, R = 6.37 × 10⁶ m).</p>
<pre><code>V = -GM/R = -(6.67 x 10^-11 x 5.97 x 10^24)/6.37 x 10^6
  = -3.98 x 10^14/6.37 x 10^6 = -6.25 x 10^7 J kg-1</code></pre>

<h3>Escape velocity</h3>
<p>To escape a planet's gravity, a body needs enough kinetic energy to climb from the surface potential to zero:</p>
<pre><code>(1/2) m v^2 = G M m / R  ->  v_escape = sqrt(2 G M / R)

Earth: v = sqrt(2 x 6.67 x 10^-11 x 5.97 x 10^24/6.37 x 10^6)
     = sqrt(1.25 x 10^8) = 1.12 x 10^4 m s-1 = 11.2 km s-1</code></pre>
<p>The derivation is worth learning as a pattern: set kinetic energy equal to the depth of the potential well, cancel m, solve for v. Escape speed is independent of the escaping body's mass — a rocket and a molecule need the same speed (though not the same fuel).</p>
<p>The potential well picture explains the sign conventions in one image: near a planet the potential is deeply negative (the bottom of a dip), and moving outward means climbing toward zero. A body with total energy (kinetic plus potential) below zero is bound — it will fall back; a body with total energy at or above zero can coast to infinity. That single inequality, kinetic energy compared with the depth of the well, decides every escape and orbit question, and it is the most reliable way to check an answer's sign and size.</p>

<h3>Orbits</h3>
<p>A satellite in a circular orbit has gravity as its centripetal force:</p>
<pre><code>G M m / r^2 = m v^2 / r   ->   v = sqrt(G M / r)

period: T = 2 pi r / v = 2 pi sqrt(r^3/(G M))
(Kepler's third law: T^2 proportional to r^3)</code></pre>
<p>The counter-intuitive exam favourite: a <em>lower</em> orbit means a <em>faster</em> satellite. Since v = √(GM/r), smaller r gives larger v and shorter periods — which is why the International Space Station orbits in about 90 minutes while the Moon takes 27 days.</p>
<p><strong>Worked example.</strong> Find the speed and period of a satellite 400 km above Earth's surface.</p>
<pre><code>r = 6.37 x 10^6 + 4.0 x 10^5 = 6.77 x 10^6 m
v = sqrt(GM/r) = sqrt(6.67 x 10^-11 x 5.97 x 10^24/6.77 x 10^6)
  = sqrt(5.88 x 10^7) = 7.67 x 10^3 m s-1
T = 2 pi r/v = 2 x 3.14 x 6.77 x 10^6/7.67 x 10^3
  = 4.25 x 10^7/7.67 x 10^3 = 5.5 x 10^3 s  (about 92 minutes)</code></pre>
<p>Geostationary orbits are the applied case: r ≈ 4.2 × 10⁷ m gives T = 24 hours, the satellite sits above one point on the equator, and it must orbit west-to-east in the equatorial plane.</p>

<h3>Worked examples: combined gravity problems</h3>
<p><strong>Worked example.</strong> Compare the gravitational potential energy of a 500 kg satellite at 400 km altitude with its value at infinity, and find the energy needed to escape from that orbit.</p>
<pre><code>r = 6.77 x 10^6 m
U_orbit = -GMm/r = -(6.67 x 10^-11 x 5.97 x 10^24 x 500)/6.77 x 10^6
        = -1.99 x 10^17/6.77 x 10^6 = -2.94 x 10^10 J
U_infinity = 0
energy to escape = 0 - (-2.94 x 10^10) = 2.9 x 10^10 J</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Law)</strong> State Newton's law of gravitation. <em>Answer:</em> The gravitational force between two point masses is proportional to the product of their masses and inversely proportional to the square of the distance between their centres: F = GMm/r².</li>
<li><strong>(Field strength)</strong> Define gravitational field strength. <em>Answer:</em> The force per unit mass on a small test mass at that point, g = F/m, measured in N kg⁻¹.</li>
<li><strong>(Inverse square)</strong> State how g changes when the distance from a planet's centre is tripled. <em>Answer:</em> g = GM/r², so tripling r divides g by 9.</li>
<li><strong>(Potential)</strong> Explain why gravitational potential is negative. <em>Answer:</em> Potential is defined as zero at infinity; gravity attracts, so the field does work on a mass brought in from infinity, meaning its potential energy — and therefore potential — decreases below zero.</li>
<li><strong>(Escape)</strong> Calculate the escape velocity from the Moon (M = 7.35 × 10²² kg, R = 1.74 × 10⁶ m). <em>Answer:</em> v = √(2GM/R) = √(2 × 6.67 × 10⁻¹¹ × 7.35 × 10²²/1.74 × 10⁶) = √(5.63 × 10⁶) = 2.37 × 10³ m s⁻¹ ≈ 2.4 km s⁻¹.</li>
<li><strong>(Orbit)</strong> Explain why a satellite in a lower orbit moves faster. <em>Answer:</em> Gravity provides the centripetal force: GMm/r² = mv²/r, so v = √(GM/r); a smaller r gives a larger speed and a shorter period.</li>
<li><strong>(Geostationary)</strong> State two conditions for a geostationary orbit. <em>Answer:</em> The period must be 24 hours, the orbit must be equatorial and the satellite must orbit in the same direction as Earth's rotation (west to east) — all three are usually wanted.</li>
<li><strong>(Energy)</strong> Explain why the energy needed to move a satellite from a low orbit to a higher one is not simply mgh. <em>Answer:</em> Over large distances g is not constant; the correct treatment uses the change in gravitational potential energy, U = −GMm/r, evaluated at both radii.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>r measured from the centre:</strong> the separation is centre-to-centre, so a satellite's r includes the planet's radius. Using altitude alone underestimates r and inflates g and v.</li>
<li><strong>Mass cancellation:</strong> in orbital and escape calculations m cancels — do not carry a satellite's mass through and then wonder why the answer is huge.</li>
<li><strong>Negative potentials:</strong> V and U are negative; a "larger" potential energy at a higher orbit is less negative, not more. Work done = m(V₂ − V₁), keeping the signs.</li>
<li><strong>g versus G:</strong> g = GM/r² is field strength (N kg⁻¹); G is the universal constant (N m² kg⁻²). Confusing the symbols loses marks and factors of mass.</li>
<li><strong>Surface approximation:</strong> mgh applies only for small heights; over planetary distances use the potential formula.</li>
<li><strong>Orbit direction:</strong> geostationary requires equatorial, west-to-east, 24 hours — a polar orbit is not geostationary however high it is.</li>
<li><strong>Units of G and distances:</strong> G in N m² kg⁻², masses in kg, distances in metres — km into m, and planet masses given in scientific notation handled carefully.</li>
<li><strong>Precision:</strong> 2 or 3 s.f. with units; the data sheet supplies G, Earth's mass and radius — quote them rather than relying on memory.</li>
<li><strong>Method marks:</strong> write F = GMm/r² or v = √(GM/r) before substituting; formulae earn credit independently of arithmetic.</li>
</ul>
`,
    "08301850-6448-4a6a-9f29-d723df78f89a": `
<h2>A Level Physics: Circular Motion and SHM</h2>
<p>Circular motion is motion at constant speed but changing velocity — because velocity is a vector, turning is accelerating. This note builds the kinematics of uniform circular motion from zero: angular displacement and angular velocity, the relation v = ωr, centripetal acceleration and the force that causes it, and then the beautiful connection to simple harmonic motion — SHM is literally the shadow of circular motion. Every formula is derived from the geometry, and the standard calculation types (car cornering, vertical circles, conical pendulums, satellite orbits) are worked in full.</p>

<h3>Kinematics of uniform circular motion</h3>
<p>An object moving in a circle at constant speed has a continuously changing direction, so its velocity changes continuously — it is accelerating. Two measures describe the motion:</p>
<pre><code>angular displacement: theta (radians); one revolution = 2 pi rad
angular velocity: omega = theta/t = 2 pi/T = 2 pi f   (rad s-1)
linear speed: v = omega r        (m s-1)

period T = 2 pi/omega; frequency f = 1/T</code></pre>
<p>The analogy: a point on a record's edge and a point near its centre complete a revolution in the same time, but the edge point travels further — hence v = ωr. Angular velocity is shared; linear speed depends on radius.</p>
<p><strong>Worked example.</strong> A wheel of radius 0.30 m spins at 20 revolutions per minute. Find ω and the speed of a point on its rim.</p>
<pre><code>f = 20/60 = 0.333 Hz  ->  omega = 2 pi f = 2.09 rad s-1
v = omega r = 2.09 x 0.30 = 0.63 m s-1</code></pre>

<h3>Centripetal acceleration</h3>
<p>The acceleration of circular motion points toward the centre — it changes the direction of velocity, not its magnitude. From the geometry of a small angular displacement, the change in velocity points inward with magnitude v²/r:</p>
<pre><code>a = v^2/r = omega^2 r        (directed toward the centre)

centripetal force: F = m a = m v^2/r = m omega^2 r</code></pre>
<p>Derivation sketch worth reproducing in an exam: as the object turns through a small angle θ, the velocity triangle has a small change Δv perpendicular to v, and Δv/v = Δs/r (similar triangles), so Δv/Δt = (v/r)(Δs/Δt) = v²/r. The direction of Δv is toward the centre — hence centripetal.</p>
<p><strong>Worked example.</strong> A 1200 kg car rounds a bend of radius 50 m at 15 m s⁻¹. Find the centripetal force.</p>
<pre><code>F = m v^2/r = 1200 x 225/50 = 1200 x 4.5 = 5400 N
The force is provided by friction between tyres and road.</code></pre>

<h3>Where the centripetal force comes from</h3>
<p>Centripetal force is not a new kind of force — it is the name for whatever real force points toward the centre:</p>
<table border="1" cellpadding="6">
<tr><th>Situation</th><th>Force providing the centripetal effect</th></tr>
<tr><td>Car on a flat bend</td><td>static friction between tyres and road</td></tr>
<tr><td>Car on a banked track</td><td>component of the normal reaction</td></tr>
<tr><td>Satellite in orbit</td><td>gravitational attraction</td></tr>
<tr><td>Ball on a string</td><td>tension in the string</td></tr>
<tr><td>Electron in a magnetic field</td><td>magnetic force (qvB)</td></tr>
<tr><td>Conical pendulum</td><td>horizontal component of tension</td></tr>
</table>
<p>The exam favourite is the vertical circle: at the top of a loop, gravity and any normal force both point down and together provide mv²/r; the minimum speed to stay in contact is when the normal force falls to zero, so mg = mv²/r and v_min = √(gr).</p>
<p><strong>Worked example (vertical circle).</strong> A ball on a string of length 0.80 m is swung in a vertical circle. Find the minimum speed at the top for the string to stay taut.</p>
<pre><code>at the top: mg + T = mv^2/r; minimum when T = 0
v_min = sqrt(g r) = sqrt(9.81 x 0.80) = sqrt(7.85)
      = 2.8 m s-1</code></pre>
<p><strong>Worked example (banked track).</strong> A track is banked at angle θ with no friction. Show that the design speed satisfies tan θ = v²/(rg).</p>
<pre><code>vertical: N cos(theta) = mg
horizontal (centripetal): N sin(theta) = mv^2/r
divide: tan(theta) = v^2/(r g)</code></pre>

<h3>Circular motion and SHM: the projection connection</h3>
<p>Watch a point moving uniformly around a circle from the side: its shadow on a diameter moves back and forth with simple harmonic motion. This is not an analogy — it is an identity, and it lets you derive every SHM equation from circular motion:</p>
<pre><code>if a particle moves on a circle of radius A with angular
velocity omega, its projection on a diameter has
displacement x = A cos(omega t)  (or A sin, depending on start)
velocity v = -A omega sin(omega t)
acceleration a = -omega^2 A cos(omega t) = -omega^2 x

maximum speed at the centre: v_max = A omega
maximum acceleration at the extremes: a_max = A omega^2</code></pre>
<p>So the SHM angular frequency ω is exactly the angular velocity of the reference circle, and the period T = 2π/ω. The geometry also explains the phase relationships: velocity leads displacement by a quarter turn (90°), acceleration is anti-phase with displacement (180°).</p>
<p><strong>Worked example.</strong> A point moves on a circle of radius 0.050 m at 3.0 rad s⁻¹. Find the amplitude, period and maximum speed of its projection.</p>
<pre><code>amplitude A = 0.050 m
T = 2 pi/omega = 6.28/3.0 = 2.1 s
v_max = A omega = 0.050 x 3.0 = 0.15 m s-1</code></pre>

<h3>Applications: centrifuges and looping tracks</h3>
<p>Circular motion is engineered into everyday machines. A centrifuge spins samples so that the required centripetal force — provided by the container walls — vastly exceeds gravity; denser components need a larger force at the same radius, so they settle outward and separate. The same logic sizes a washing machine's spin cycle (water leaves through the drum holes when the required force exceeds what surface tension can supply) and a car's brake discs (ventilation handles the frictional heat).</p>
<p>A looping track is the vertical-circle problem made physical: at the top of the loop the riders' weight and the track's normal reaction both point inward, providing mv²/r; the design speed is set just above v = √(gr) so the normal reaction never falls to zero and contact is maintained. Rollercoaster designers use the excess above that minimum to create the sensation of lightness without losing the car.</p>

<h3>Worked examples: the standard exam types</h3>
<p><strong>Worked example 1 (conical pendulum).</strong> A 0.20 kg mass on a 1.0 m string moves in a horizontal circle, the string at 30° to the vertical. Find the tension and the period.</p>
<pre><code>vertical: T cos(30) = mg  ->  T = 0.20 x 9.81/0.866 = 2.27 N
radius: r = L sin(30) = 0.50 m
horizontal: T sin(30) = m v^2/r
2.27 x 0.5 = 0.20 x v^2/0.50  ->  v^2 = 2.84  ->  v = 1.69 m s-1
T_period = 2 pi r/v = 6.28 x 0.50/1.69 = 1.86 s</code></pre>
<p><strong>Worked example 2 (satellite).</strong> Find the orbital speed of a satellite at radius 7.0 × 10⁶ m around Earth (M = 5.97 × 10²⁴ kg).</p>
<pre><code>GMm/r^2 = mv^2/r  ->  v = sqrt(GM/r)
v = sqrt(6.67 x 10^-11 x 5.97 x 10^24/7.0 x 10^6)
  = sqrt(5.69 x 10^7) = 7.54 x 10^3 m s-1</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Angular velocity)</strong> A cyclist's wheel of radius 0.35 m turns at 2.0 revolutions per second. Find the speed of the rim. <em>Answer:</em> ω = 2π × 2.0 = 12.6 rad s⁻¹; v = ωr = 12.6 × 0.35 = 4.4 m s⁻¹.</li>
<li><strong>(Acceleration)</strong> State the direction of centripetal acceleration and explain why speed stays constant. <em>Answer:</em> It points toward the centre, perpendicular to the velocity; because the acceleration has no component along the velocity, it changes direction only, not speed.</li>
<li><strong>(Force)</strong> A 0.15 kg ball on a 0.60 m string moves at 4.0 m s⁻¹ in a horizontal circle. Find the tension. <em>Answer:</em> T = mv²/r = 0.15 × 16/0.60 = 4.0 N.</li>
<li><strong>(Vertical circle)</strong> Explain why a bucket of water can be swung overhead without spilling. <em>Answer:</em> At the top, the water's weight provides the centripetal force; if v ≥ √(gr) the water stays in contact with the bucket base, so it does not fall out.</li>
<li><strong>(Banking)</strong> A bend of radius 80 m is banked for 20 m s⁻¹. Find the angle. <em>Answer:</em> tan θ = v²/(rg) = 400/(80 × 9.81) = 0.510; θ = 27°.</li>
<li><strong>(SHM link)</strong> Explain how simple harmonic motion can be modelled by the projection of circular motion. <em>Answer:</em> A point moving uniformly on a circle of radius A projects onto a diameter as x = A cos ωt; differentiating gives v and a with a = −ω²x, the defining SHM condition.</li>
<li><strong>(Satellite)</strong> Show that the period of a satellite is proportional to r^(3/2). <em>Answer:</em> v = √(GM/r) and T = 2πr/v, so T = 2πr/√(GM/r) = 2π√(r³/GM), hence T ∝ r^(3/2).</li>
<li><strong>(Misconception)</strong> A student says a car turning at constant speed has no acceleration. Correct the statement. <em>Answer:</em> Velocity is a vector; its direction changes continuously in a turn, so the car accelerates centripetally toward the centre of the turn even though the speedometer reading is constant.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>The centrifugal fiction:</strong> there is no outward force in the inertial frame; the "centrifugal force" felt in a turning car is the inertia of your body, not a force on the car. Never put it on a free-body diagram.</li>
<li><strong>v²/r with the wrong r:</strong> radius from the centre of the circular path — for a conical pendulum r = L sin θ, not the string length.</li>
<li><strong>ω versus v:</strong> v = ωr; forgetting the radius converts angular to linear incorrectly. And ω in rad s⁻¹ means revolutions per second × 2π.</li>
<li><strong>Units of angle:</strong> radians, not degrees, in ω = 2π/T and in the projection equations.</li>
<li><strong>Centripetal force is not extra:</strong> it is the resultant of the real forces (tension, friction, weight component) — do not add it alongside them.</li>
<li><strong>Vertical circles:</strong> tension and weight are collinear at top and bottom but not at the sides; resolve properly rather than assuming T = mv²/r everywhere.</li>
<li><strong>Period direction:</strong> T = 2πr/v uses the circumference; mixing in angular velocity without converting gives factor-of-2π errors.</li>
<li><strong>SHM phase:</strong> the projection can be sine or cosine depending on the starting point; state your choice and stay consistent.</li>
<li><strong>Precision:</strong> 2 or 3 s.f. with units (rad s⁻¹, m s⁻¹, N, s); keep π symbolic until the end to avoid rounding drift.</li>
</ul>
`,
  },
};
