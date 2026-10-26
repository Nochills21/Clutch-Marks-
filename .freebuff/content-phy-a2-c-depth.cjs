// Physics A2 notes, deepened to the depth bar — Further Mechanics (momentum, impulse,
// collisions), Magnetic Fields and Electromagnetism (statements 20.1-20.5, 21.1-21.2)
// and Astronomy and Cosmology (25.1-25.3). Board framing: Edexcel IAL Physics Units 4-6.
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-phy-a2-c-depth.cjs > .freebuff-tmp/phy-a2-c.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phy-a2-c.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phy-a2-c.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "aa5be96b-372d-4bee-9a92-9a5530573c02": "A Level Physics: Further Mechanics",
    "df41cba4-9394-49c0-8680-fde851153c12": "A Level Physics: Magnetic Fields and Electromagnetism",
    "15f953e6-3831-4cd9-a4ff-98a991c5d346": "A Level Physics: Astronomy and Cosmology",
  },
  rows: {
    "aa5be96b-372d-4bee-9a92-9a5530573c02": `
<h2>A Level Physics: Further Mechanics</h2>
<p>Newton's cradle is the whole topic in one toy: a ball arrives, a ball leaves at the same speed, and something invisible has been conserved through the collision. That something is momentum — mass times velocity — and with impulse and energy it lets you analyse every collision, explosion and crash the papers can invent. This note builds the mechanics from zero: the momentum vector and its conservation, impulse as the area under a force–time graph and the physics of why cars crumple, elastic and inelastic collisions with full energy bookkeeping, and the standard problem types solved line by line.</p>

<h3>Momentum and its conservation</h3>
<pre><code>momentum p = m v        (kg m s-1; a vector)

conservation: in the absence of external forces, the total
momentum of a system stays constant:
  m1 u1 + m2 u2 = m1 v1 + m2 v2</code></pre>
<p>Velocity is a vector, so momentum carries direction: assign positive and negative directions before writing any equation. The conservation law follows from Newton's third law — the forces two bodies exert on each other are equal and opposite for equal times, so the impulses are equal and opposite, so the momentum changes cancel.</p>
<p><strong>Worked example.</strong> A 2.0 kg trolley moving at 3.0 m s⁻¹ collides with a stationary 1.0 kg trolley; they stick together. Find the common velocity.</p>
<pre><code>before: 2.0 x 3.0 + 1.0 x 0 = 6.0 kg m s-1
after:  (2.0 + 1.0) v = 3.0 v
3.0 v = 6.0  ->  v = 2.0 m s-1 (same direction)</code></pre>

<h3>Impulse</h3>
<pre><code>impulse = force x time = change in momentum
J = F Delta t = Delta p = m v - m u

on a force-time graph: impulse = area under the graph</code></pre>
<p>The analogy: catching a ball. A hard catch (short time) means a huge force; moving your hands back (longer time) spreads the same momentum change over more time and reduces the force. That is the entire physics of crumple zones, airbags, seatbelts, helmets, landing mats and bending your knees when you jump down.</p>
<p><strong>Worked example.</strong> A 0.16 kg cricket ball arrives at 30 m s⁻¹ and is struck back at 45 m s⁻¹; contact lasts 12 ms. Find the impulse and the average force.</p>
<pre><code>take the incoming direction as negative:
u = -30, v = +45
Delta p = m(v - u) = 0.16 x (45 - (-30)) = 0.16 x 75
        = 12 kg m s-1
F = Delta p/Delta t = 12/0.012 = 1000 N = 1.0 kN</code></pre>
<p><strong>Worked example (graph).</strong> A force-time graph shows a triangular pulse rising to 800 N over 0.050 s and falling to zero over the next 0.050 s. Find the impulse and the speed change of a 2.0 kg object.</p>
<pre><code>area = (1/2) x base x height = 0.5 x 0.10 x 800 = 40 N s
Delta p = 40 kg m s-1  ->  Delta v = 40/2.0 = 20 m s-1</code></pre>

<h3>Elastic and inelastic collisions</h3>
<p>Momentum is conserved in every collision (absent external forces); kinetic energy is conserved only in elastic ones:</p>
<table border="1" cellpadding="6">
<tr><th></th><th>Elastic</th><th>Inelastic</th></tr>
<tr><td>Momentum</td><td>conserved</td><td>conserved</td></tr>
<tr><td>Kinetic energy</td><td>conserved</td><td>not conserved — some becomes heat, sound, deformation</td></tr>
<tr><td>Typical example</td><td>gas molecules, billiard-ball idealisation</td><td>cars sticking together, clay, crumple zones</td></tr>
</table>
<p>Explosions run the same conservation law backwards: total momentum before is zero, so the fragments' momenta must cancel.</p>
<p><strong>Worked example (explosion).</strong> A 0.50 kg firework at rest explodes into two pieces; the 0.30 kg piece flies at 12 m s⁻¹. Find the velocity of the other piece.</p>
<pre><code>0 = 0.30 x 12 + 0.20 v
0.20 v = -3.6  ->  v = -18 m s-1
The 0.20 kg piece moves at 18 m s-1 in the opposite direction.</code></pre>

<h3>Worked examples: the full audit</h3>
<p><strong>Worked example.</strong> A 1500 kg car at 20 m s⁻¹ crashes into a stationary 1000 kg car; they lock together. Find the velocity after impact, the kinetic energy lost, and explain where it went.</p>
<pre><code>momentum: 1500 x 20 = 2500 v  ->  v = 12 m s-1
KE before = (1/2) x 1500 x 400 = 300 000 J
KE after  = (1/2) x 2500 x 144 = 180 000 J
lost = 120 000 J = 120 kJ
The energy goes to deformation of the bodies, heat, and sound.</code></pre>
<p><strong>Worked example 2 (elastic check).</strong> Two identical trolleys approach each other at 2.0 m s⁻¹ and bounce back at 2.0 m s⁻¹ each. Show the collision is elastic.</p>
<pre><code>momentum before: m(2) + m(-2) = 0; after: m(-2) + m(2) = 0
KE before = (1/2)m(4) + (1/2)m(4) = 4m
KE after  = 4m  - unchanged, so elastic.</code></pre>

<h3>Momentum in two dimensions</h3>
<p>Momentum is conserved separately in each perpendicular direction. For a collision that is not head-on, resolve the momenta into x and y components before and after, and set up two conservation equations. The geometry is where the marks are: a ball striking a wall at an angle rebounds with its perpendicular component reversed and its parallel component unchanged (for a smooth wall), which is why the angle of reflection equals the angle of incidence in the ideal case.</p>
<pre><code>before: p_x = m u cos(theta),  p_y = m u sin(theta)
after a smooth-wall bounce:
  p_x = -m v cos(theta)  (normal component reversed)
  p_y = +m v sin(theta)  (parallel component unchanged)
  |Delta p| = 2 m v cos(theta)</code></pre>
<p><strong>Worked example.</strong> A 0.20 kg ball hits a smooth wall at 12 m s⁻¹ at 30° to the normal and rebounds elastically at the same speed and angle. Find the impulse on the ball.</p>
<pre><code>Delta p = 2 m v cos(theta) = 2 x 0.20 x 12 x cos(30)
        = 4.8 x 0.866 = 4.2 kg m s-1
(directed away from the wall)</code></pre>

<h3>Explosions, recoil and rockets</h3>
<p>An explosion is a collision reversed: total momentum stays at its initial value (usually zero), so the fragments' momenta must cancel. Recoil problems — a gun, a skateboarder pushing off, an astronaut throwing a tool — are all this one equation. A rocket is the continuous version: it expels gas backward at high speed and gains forward momentum, and it works in a vacuum precisely because it pushes against its own exhaust, not against the air.</p>
<pre><code>recoil: 0 = m1 v1 + m2 v2   ->   v2 = -(m1/m2) v1
rocket thrust: F = (rate of change of momentum of the exhaust)
             = (mass per second) x (exhaust speed)</code></pre>
<p><strong>Worked example.</strong> A 4.0 kg rifle fires a 0.020 kg bullet at 400 m s⁻¹. Find the rifle's recoil speed.</p>
<pre><code>0 = 0.020 x 400 + 4.0 v
4.0 v = -8.0  ->  v = -2.0 m s-1
The rifle recoils at 2.0 m s-1 opposite to the bullet.</code></pre>

<h3>Forces, momentum and safety engineering</h3>
<p>Questions about safety devices are impulse questions in disguise: the momentum change is fixed by the crash, so the only variable is time. A seatbelt extends the stopping time, so F = Δp/Δt falls; a crumple zone does the same by deforming; an airbag spreads the force over area as well. When asked to evaluate a design, quantify: if the stopping time triples, the average force falls to a third.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Momentum)</strong> Define momentum and state its unit. <em>Answer:</em> Momentum is the product of mass and velocity, p = mv, a vector; unit kg m s⁻¹ (equivalently N s).</li>
<li><strong>(Conservation)</strong> A 3.0 kg block at 4.0 m s⁻¹ hits a stationary 1.0 kg block and they move together. Find the final speed. <em>Answer:</em> 3.0 × 4.0 = 4.0v → v = 3.0 m s⁻¹.</li>
<li><strong>(Impulse)</strong> A 0.50 kg ball hits a wall at 8.0 m s⁻¹ and rebounds at 6.0 m s⁻¹; contact time 0.020 s. Find the average force. <em>Answer:</em> Δp = 0.50 × (6.0 + 8.0) = 7.0 kg m s⁻¹; F = 7.0/0.020 = 350 N.</li>
<li><strong>(Graph)</strong> Explain how to find impulse from a force–time graph. <em>Answer:</em> Impulse is the area under the graph; for a curve, count squares or integrate.</li>
<li><strong>(Elasticity)</strong> A collision conserves momentum but not kinetic energy. Classify it and name a real example. <em>Answer:</em> Inelastic; a car crash or two lumps of clay sticking together.</li>
<li><strong>(Explosion)</strong> A 60 kg astronaut pushes off a 400 kg spacecraft, moving at 0.50 m s⁻¹ relative to it. Find the spacecraft's recoil speed. <em>Answer:</em> 60 × 0.50 = 400 × v → v = 0.075 m s⁻¹ (opposite direction).</li>
<li><strong>(Safety)</strong> Explain how a crumple zone reduces injury. <em>Answer:</em> It deforms, increasing the collision time for a given momentum change; since F = Δp/Δt, the average force falls, reducing injury.</li>
<li><strong>(Energy)</strong> In an inelastic collision, where does the lost kinetic energy go? <em>Answer:</em> Into thermal energy, sound and permanent deformation of the materials — energy is conserved overall, but not as kinetic energy.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Dropping signs:</strong> momentum is a vector; a rebound reverses sign. The classic error is Δp = m(v − u) with both speeds positive, halving the true impulse.</li>
<li><strong>Adding speeds wrongly:</strong> for a rebound, the change is v + u in magnitude (with signs, v − (−u)).</li>
<li><strong>Assuming KE is conserved:</strong> check the type; "they stick together" is always inelastic. Compute KE before and after when asked.</li>
<li><strong>External forces:</strong> conservation needs no net external force — a collision on a rough surface during a long interval is not the same as an instantaneous impact.</li>
<li><strong>Unit of impulse:</strong> N s or kg m s⁻¹ are equivalent; force alone (N) is not.</li>
<li><strong>Force–time areas:</strong> triangles and trapeziums need the correct geometric factors (½ for a triangle), not base × height.</li>
<li><strong>Mass in grams:</strong> convert to kg before momentum calculations; a factor of 1000 error is common in cricket-ball questions.</li>
<li><strong>Precision:</strong> 2 or 3 s.f. with units; keep direction words (opposite, same direction) in the answer.</li>
</ul>
`,
    "df41cba4-9394-49c0-8680-fde851153c12": `
<h2>A Level Physics: Magnetic Fields and Electromagnetism</h2>
<p>Magnetism and electricity are one phenomenon seen from two sides: every current makes a magnetic field, and every changing magnetic field makes a current. This note builds the subject from zero: what a magnetic field is and how flux density measures it, the forces on currents and on moving charges with their right-hand rules, the fields produced by wires and solenoids, electromagnetic induction through Faraday's and Lenz's laws, and the alternating-current ideas — rms values, rectification and smoothing — that connect the physics to the mains supply. Every calculation type is worked in full.</p>

<h3>The magnetic field and flux density</h3>
<p>A magnetic field is a region where a magnetic force acts on moving charges, currents and magnetic materials. Field lines run from north to south outside a magnet and never cross; their density indicates strength. The strength of the field is measured by the magnetic flux density B, in tesla (T): one tesla is one newton per ampere-metre of conductor, or one weber per square metre. Magnetic flux Φ through an area is the field passing through it:</p>
<pre><code>Phi = B A cos(theta)        weber (Wb)

theta = angle between the field and the NORMAL to the area
flux linkage = N Phi        (N turns of a coil)</code></pre>

<h3>Force on a current-carrying conductor</h3>
<pre><code>F = B I L sin(theta)

B in T, I in A, L = length of conductor in the field (m)
theta = angle between the current and the field</code></pre>
<p>The force is maximum when the current is perpendicular to the field (sin 90° = 1) and zero when parallel. Its direction comes from Fleming's left-hand rule: first finger = field, second finger = current, thumb = force (all mutually perpendicular). The analogy: think of the wire as a sail in a river of field lines — the force is perpendicular to both the flow and the sail.</p>
<p><strong>Worked example.</strong> A 0.20 m wire carrying 3.0 A sits perpendicular to a 0.50 T field. Find the force.</p>
<pre><code>F = B I L = 0.50 x 3.0 x 0.20 = 0.30 N</code></pre>

<h3>Force on a moving charge</h3>
<pre><code>F = B Q v sin(theta)

for a charge moving perpendicular to the field:
F = B Q v, and this force is centripetal:
B Q v = m v^2/r  ->  r = m v/(B Q)</code></pre>
<p>A charged particle moving perpendicular to a uniform field follows a circular path; the radius grows with momentum and shrinks with field strength and charge. This is the working principle of the mass spectrometer (ions of different mass follow different radii) and the cyclotron.</p>
<p><strong>Worked example.</strong> An electron moves at 2.0 × 10⁶ m s⁻¹ perpendicular to a 0.10 T field. Find the force and the radius of its path.</p>
<pre><code>F = B e v = 0.10 x 1.6 x 10^-19 x 2.0 x 10^6 = 3.2 x 10^-14 N
r = m v/(B e) = (9.11 x 10^-31 x 2.0 x 10^6)/(0.10 x 1.6 x 10^-19)
  = 1.82 x 10^-24/1.6 x 10^-20 = 1.14 x 10^-4 m  (0.11 mm)</code></pre>

<h3>Magnetic fields due to currents</h3>
<ul>
<li><strong>Straight wire:</strong> concentric circular field lines around the wire; the right-hand grip rule (thumb along current, fingers curl with the field) gives direction; strength falls with distance, B = μ₀I/(2πr).</li>
<li><strong>Solenoid:</strong> a uniform field inside, like a bar magnet, with the field direction set by the right-hand grip rule; adding an iron core concentrates the field (an electromagnet).</li>
<li><strong>Parallel wires:</strong> currents in the same direction attract, opposite directions repel — a direct consequence of each wire's field acting on the other's current.</li>
</ul>
<p><strong>Worked example.</strong> Find the flux density 0.050 m from a long straight wire carrying 10 A (μ₀ = 4π × 10⁻⁷ T m A⁻¹).</p>
<pre><code>B = mu0 I/(2 pi r) = (4 pi x 10^-7 x 10)/(2 pi x 0.050)
  = (2 x 10^-6)/0.050 = 4.0 x 10^-5 T</code></pre>

<h3>Electromagnetic induction</h3>
<p>Faraday's law: the induced e.m.f. is proportional to the rate of change of magnetic flux linkage. Lenz's law: the induced current opposes the change producing it (a statement of energy conservation — the induced current's field pushes back).</p>
<pre><code>epsilon = - N dPhi/dt

moving a rod of length L at speed v perpendicular to B:
epsilon = B L v

rotating coil (peak e.m.f.): epsilon_0 = N B A omega</code></pre>
<p><strong>Worked example.</strong> A 0.50 m rod moves at 4.0 m s⁻¹ perpendicular to a 0.20 T field. Find the induced e.m.f.</p>
<pre><code>epsilon = B L v = 0.20 x 0.50 x 4.0 = 0.40 V</code></pre>
<p><strong>Worked example (flux change).</strong> A 200-turn coil of area 0.010 m² sits in a 0.50 T field; the field is reversed in 0.10 s. Find the average e.m.f.</p>
<pre><code>initial flux linkage: N B A = 200 x 0.50 x 0.010 = 1.0 Wb-turn
field reversed: change = 2 x 1.0 = 2.0 Wb-turn
epsilon = change/time = 2.0/0.10 = 20 V</code></pre>

<h3>Alternating current: peak and rms values</h3>
<p>Mains electricity is sinusoidal: the voltage and current reverse direction periodically. The average of a sine wave is zero, so power calculations use the root-mean-square value, which is the steady d.c. value that would deliver the same power:</p>
<pre><code>V_rms = V_0/sqrt(2) = 0.707 V_0
I_rms = I_0/sqrt(2)

average power: P = V_rms I_rms = I_rms^2 R = V_rms^2/R</code></pre>
<p><strong>Worked example.</strong> A 230 V rms mains supply feeds a 2.0 kW heater. Find the peak voltage and the rms current.</p>
<pre><code>V_0 = 230 x sqrt(2) = 325 V
I_rms = P/V_rms = 2000/230 = 8.7 A</code></pre>

<h3>Rectification and smoothing</h3>
<p>A diode allows current in one direction only, so a single diode halves the a.c. wave (half-wave rectification); a bridge of four diodes produces full-wave rectification — the output always has the same polarity. A capacitor in parallel with the load then smooths the output: it charges at the peaks and discharges through the load between them, reducing the ripple. Larger capacitance and larger load resistance give less ripple (τ = RC longer relative to the cycle).</p>
<ul>
<li><strong>Half-wave:</strong> one diode; half the wave is missing; more ripple.</li>
<li><strong>Full-wave:</strong> bridge of four diodes; both halves used; easier to smooth.</li>
<li><strong>Smoothing:</strong> capacitor across the load; ripple reduced as C and R increase.</li>
</ul>

<h3>Worked examples: combined electromagnetism</h3>
<p><strong>Worked example.</strong> A generator coil of 50 turns and area 0.020 m² rotates at 60 rad s⁻¹ in a 0.40 T field. Find the peak e.m.f. and the rms e.m.f.</p>
<pre><code>epsilon_0 = N B A omega = 50 x 0.40 x 0.020 x 60
         = 24 V
epsilon_rms = 24/sqrt(2) = 17 V</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Force on wire)</strong> A 0.30 m wire carrying 2.0 A is perpendicular to a 0.80 T field. Find the force. <em>Answer:</em> F = BIL = 0.80 × 2.0 × 0.30 = 0.48 N.</li>
<li><strong>(Direction)</strong> State Fleming's left-hand rule. <em>Answer:</em> With the first finger along the field and the second along the current, the thumb points along the force — used for motors (the left hand gives the force on the conductor).</li>
<li><strong>(Charge)</strong> Explain why a moving charge in a uniform magnetic field moves in a circle. <em>Answer:</em> The magnetic force is always perpendicular to the velocity, so it does no work and changes only direction; a constant perpendicular force produces circular motion with r = mv/(BQ).</li>
<li><strong>(Solenoid)</strong> Describe the magnetic field inside a current-carrying solenoid. <em>Answer:</em> Strong, uniform, and directed along the axis; outside it resembles a bar magnet's field, with the end determined by the right-hand grip rule.</li>
<li><strong>(Faraday)</strong> State Faraday's law and Lenz's law. <em>Answer:</em> The induced e.m.f. is proportional to the rate of change of magnetic flux linkage; the induced current opposes the change that produces it.</li>
<li><strong>(Lenz)</strong> Explain why Lenz's law is a consequence of energy conservation. <em>Answer:</em> If the induced current aided the change, it would generate energy from nothing; opposing it means work must be done to produce the change, and that work becomes electrical energy.</li>
<li><strong>(rms)</strong> An a.c. supply has peak voltage 340 V. Find the rms voltage. <em>Answer:</em> V_rms = 340/√2 = 240 V.</li>
<li><strong>(Smoothing)</strong> Explain how a capacitor smooths a rectified output. <em>Answer:</em> The capacitor charges as the rectified voltage rises to its peak and discharges through the load as the voltage falls, filling the gaps between peaks and reducing the ripple.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Angle in F = BIL sin θ:</strong> θ is between the current and the field; perpendicular means sin θ = 1. A wire parallel to the field feels no force.</li>
<li><strong>Left hand versus right hand:</strong> use the left-hand rule for the force on a current (motor effect) and the right-hand grip rule for the field around a current. Mixing them reverses the answer.</li>
<li><strong>Flux versus flux density:</strong> Φ = BA (weber), B is tesla; flux linkage multiplies by N turns. Do not call B flux.</li>
<li><strong>Change of flux sign:</strong> reversing a field doubles the change (from +BA to −BA), a factor candidates often forget.</li>
<li><strong>rms factor:</strong> peak over √2; the peak is rms × √2. Power uses rms values, not peak.</li>
<li><strong>Induced e.m.f. needs change:</strong> a stationary coil in a steady field induces nothing; there must be a changing flux linkage (movement, rotation, or a changing current).</li>
<li><strong>Lenz direction questions:</strong> state the opposing field direction and then the current direction; the reasoning chain is the mark.</li>
<li><strong>Rectification understanding:</strong> diodes conduct one way only; a bridge gives full-wave, a single diode half-wave — do not claim a single diode gives full-wave output.</li>
<li><strong>Precision and units:</strong> tesla, weber, volt; 2 or 3 s.f.; μ₀ = 4π × 10⁻⁷ T m A⁻¹ from the data sheet.</li>
</ul>
`,
    "15f953e6-3831-4cd9-a4ff-98a991c5d346": `
<h2>A Level Physics: Astronomy and Cosmology</h2>
<p>Astronomy is physics at the largest scale: measuring the distance to a star by its brightness, its size by its temperature, and the age of the universe by how fast galaxies recede. This note builds the toolkit from zero: luminosity and the inverse-square law, standard candles (Cepheid variables and Type Ia supernovae) and the distance ladder, stellar radii from Stefan's law, Hubble's law and redshift, and the evidence for the Big Bang. Every calculation is worked in full, because the papers test exactly these three or four formulas.</p>

<h3>Brightness, luminosity and the inverse-square law</h3>
<p>A star's luminosity L is the total power it radiates (watts). What a telescope receives is intensity (or flux) I — power per unit area at the observer's distance:</p>
<pre><code>I = L/(4 pi d^2)

I in W m-2, L in W, d in m
doubling the distance quarters the intensity</code></pre>
<p>The analogy: a light bulb's power is fixed, but the same light spreads over a sphere of radius d — four times the area at twice the distance, so a quarter of the brightness per square metre. This one law underlies every distance measurement in astronomy.</p>
<p><strong>Worked example.</strong> A star has luminosity 4.0 × 10²⁶ W. Find its intensity at 10 parsecs (1 pc = 3.09 × 10¹⁶ m).</p>
<pre><code>d = 10 x 3.09 x 10^16 = 3.09 x 10^17 m
I = L/(4 pi d^2) = 4.0 x 10^26/(4 x 3.14 x (3.09 x 10^17)^2)
  = 4.0 x 10^26/(1.20 x 10^36) = 3.3 x 10^-10 W m-2</code></pre>

<h3>Standard candles and the distance ladder</h3>
<p>A standard candle is an object whose luminosity is known, so its observed intensity gives its distance by rearranging the inverse-square law. Two are examinable:</p>
<ul>
<li><strong>Cepheid variables:</strong> pulsating stars whose period of variation is tightly related to their luminosity (longer period, more luminous). Measuring the period gives L; measuring I gives d. Cepheids calibrated the first rungs of the cosmic distance ladder.</li>
<li><strong>Type Ia supernovae:</strong> exploding white dwarfs that reach a consistent peak luminosity, bright enough to be seen in distant galaxies; they extended the ladder to cosmological distances and revealed the accelerating expansion.</li>
</ul>
<pre><code>distance from a standard candle:
d = sqrt(L/(4 pi I))</code></pre>
<p><strong>Worked example.</strong> A Cepheid has luminosity 1.0 × 10²⁹ W and observed intensity 2.5 × 10⁻¹² W m⁻². Find its distance in parsecs.</p>
<pre><code>d = sqrt(L/(4 pi I)) = sqrt(1.0 x 10^29/(4 x 3.14 x 2.5 x 10^-12))
  = sqrt(1.0 x 10^29/3.14 x 10^-11) = sqrt(3.18 x 10^39)
  = 5.64 x 10^19 m
in parsecs: 5.64 x 10^19/3.09 x 10^16 = 1825 pc
          = 1.8 kpc (2 s.f.)</code></pre>

<h3>Stellar radii and Stefan's law</h3>
<p>A star radiates approximately as a black body. Stefan's law relates its luminosity to its surface area and absolute temperature:</p>
<pre><code>L = 4 pi r^2 sigma T^4

sigma = 5.67 x 10-8 W m-2 K-4 (Stefan-Boltzmann constant)
r = stellar radius (m), T = surface temperature (K)

so r = sqrt(L/(4 pi sigma T^4))</code></pre>
<p>The fourth power is the headline: doubling a star's temperature multiplies its radiated power per square metre by 16. That is why hot blue stars are vastly more luminous than cooler red ones of similar size — and why a red giant can outshine the Sun despite its low temperature, because its radius is enormous.</p>
<p><strong>Worked example.</strong> The Sun has L = 3.8 × 10²⁶ W and T = 5800 K. Find its radius.</p>
<pre><code>r = sqrt(L/(4 pi sigma T^4))
T^4 = (5800)^4 = 1.13 x 10^15
4 pi sigma T^4 = 4 x 3.14 x 5.67 x 10^-8 x 1.13 x 10^15
              = 8.05 x 10^8
r = sqrt(3.8 x 10^26/8.05 x 10^8) = sqrt(4.72 x 10^17)
  = 6.87 x 10^8 m  (about 7 x 10^8 m; the accepted value is 6.96 x 10^8 m)</code></pre>
<p><strong>Worked example 2 (comparison).</strong> A star has the same temperature as the Sun but 100 times its luminosity. Find its radius in solar radii.</p>
<pre><code>L = 4 pi r^2 sigma T^4, same T and sigma:
r^2 proportional to L  ->  r = 10 R_sun</code></pre></pre>

<h3>Redshift and Hubble's law</h3>
<p>Light from distant galaxies is shifted toward longer wavelengths — redshift — because the galaxies are receding. For speeds much less than c:</p>
<pre><code>z = Delta lambda/lambda = v/c     (v << c)

Hubble's law: v = H0 d

H0 = Hubble constant (about 70 km s-1 Mpc-1)
d = distance (Mpc)</code></pre>
<p><strong>Worked example 1.</strong> A galaxy's spectral line at 656 nm is observed at 689 nm. Find its recession speed.</p>
<pre><code>Delta lambda = 689 - 656 = 33 nm
z = 33/656 = 0.0503
v = z c = 0.0503 x 3.0 x 10^8 = 1.51 x 10^7 m s-1
  = 1.5 x 10^4 km s-1</code></pre>
<p><strong>Worked example 2.</strong> A galaxy at 100 Mpc recedes at 7000 km s⁻¹. Find H₀ and the Hubble time.</p>
<pre><code>H0 = v/d = 7000/100 = 70 km s-1 Mpc-1
Hubble time = 1/H0:
70 km s-1 Mpc-1 = 70 000/(3.09 x 10^22) s-1 = 2.27 x 10^-18 s-1
t = 1/H0 = 4.4 x 10^17 s = 1.4 x 10^10 years = 14 billion years</code></pre>

<h3>The Big Bang and its evidence</h3>
<p>Hubble's law implies that galaxies were once much closer together — the universe expanded from a hot, dense state. Three pieces of evidence are examinable:</p>
<ul>
<li><strong>Redshift of galaxies:</strong> nearly all galaxies recede, and recession speed increases with distance — expansion from a common origin.</li>
<li><strong>Cosmic microwave background (CMB):</strong> a uniform 2.7 K radiation filling the sky — the cooled remnant of the hot early universe, predicted before it was found.</li>
<li><strong>Abundance of light elements:</strong> the observed ratios of hydrogen, helium and lithium match predictions of Big Bang nucleosynthesis.</li>
</ul>
<p>The expanding universe has no centre: space itself stretches, so every observer sees distant galaxies receding in all directions. The age estimate 1/H₀ assumes constant expansion; accelerating expansion (dark energy) modifies it, and the measured value is about 13.8 billion years.</p>
<p>The theory makes a further testable claim: the CMB should be an almost perfect black-body spectrum with tiny temperature ripples, and it is — the ripples themselves are the seeds of galaxy formation, and their pattern matches the theory's predictions for the mix of ordinary matter, dark matter and dark energy. That agreement across independent observations is why the Big Bang is accepted as the standard cosmological model rather than a single unexplained measurement.</p>

<h3>Worked examples: the standard exam types</h3>
<p><strong>Worked example.</strong> Two stars have the same radius; star A is twice as hot as star B. Find the ratio of their luminosities.</p>
<pre><code>L = 4 pi r^2 sigma T^4; same r and sigma
L_A/L_B = (T_A/T_B)^4 = 2^4 = 16
Star A is 16 times more luminous.</code></pre>
<p><strong>Worked example 2.</strong> A star's luminosity is 4.0 × 10³⁰ W and its surface temperature 10 000 K. Find its radius and compare it with the Sun's (7.0 × 10⁸ m).</p>
<pre><code>T^4 = (10^4)^4 = 1.0 x 10^16
4 pi sigma T^4 = 4 x 3.14 x 5.67 x 10^-8 x 1.0 x 10^16 = 7.12 x 10^9
r = sqrt(4.0 x 10^30/7.12 x 10^9) = sqrt(5.62 x 10^20)
  = 2.37 x 10^10 m
r/R_sun = 2.37 x 10^10/7.0 x 10^8 = 34 solar radii</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Inverse square)</strong> A star at 20 pc has intensity I. What is its intensity at 60 pc? <em>Answer:</em> Three times the distance gives 1/9 of the intensity: I/9.</li>
<li><strong>(Luminosity)</strong> Define luminosity and state its unit. <em>Answer:</em> The total power radiated by a star across all wavelengths, measured in watts (W).</li>
<li><strong>(Standard candle)</strong> Explain how a Cepheid variable is used to find distance. <em>Answer:</em> Its pulsation period determines its luminosity from the period–luminosity relation; comparing that luminosity with the observed intensity gives d = √(L/4πI).</li>
<li><strong>(Stefan)</strong> A star has twice the Sun's radius and half its temperature. Compare luminosities. <em>Answer:</em> L ∝ r²T⁴ → (2)² × (1/2)⁴ = 4 × 1/16 = 1/4: the star is a quarter as luminous.</li>
<li><strong>(Redshift)</strong> A line at 500 nm appears at 505 nm. Find v. <em>Answer:</em> z = 5/500 = 0.010; v = 0.010 × 3.0 × 10⁸ = 3.0 × 10⁶ m s⁻¹.</li>
<li><strong>(Hubble)</strong> A galaxy at 50 Mpc recedes at 3500 km s⁻¹. Find H₀. <em>Answer:</em> H₀ = 3500/50 = 70 km s⁻¹ Mpc⁻¹.</li>
<li><strong>(Age)</strong> Estimate the age of the universe from H₀ = 70 km s⁻¹ Mpc⁻¹. <em>Answer:</em> t = 1/H₀ ≈ 14 billion years (with unit conversions: 70 km s⁻¹ Mpc⁻¹ = 2.27 × 10⁻¹⁸ s⁻¹).</li>
<li><strong>(Big Bang evidence)</strong> State two observations supporting the Big Bang. <em>Answer:</em> The redshift–distance relation (Hubble's law) and the cosmic microwave background; the light-element abundances are a third.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Parsecs versus metres:</strong> convert before substituting; 1 pc = 3.09 × 10¹⁶ m, 1 Mpc = 3.09 × 10²² m, 1 AU = 1.50 × 10¹¹ m.</li>
<li><strong>Luminosity versus intensity:</strong> L is the star's total power; I is what arrives per square metre. The inverse-square law connects them and d must be in metres.</li>
<li><strong>T⁴ not T:</strong> Stefan's law is a fourth power — doubling temperature multiplies luminosity by 16, not 2. Most arithmetic errors here are exponent slips.</li>
<li><strong>Kelvin:</strong> surface temperatures in Stefan's law must be absolute; a temperature given in °C needs +273 first.</li>
<li><strong>Redshift approximation:</strong> z = v/c holds for v ≪ c; at large redshifts the relativistic formula is needed. State the assumption.</li>
<li><strong>H₀ units:</strong> km s⁻¹ Mpc⁻¹ — mismatched units in 1/H₀ give absurd ages. Convert km to m and Mpc to m.</li>
<li><strong>Hubble time is an estimate:</strong> 1/H₀ assumes constant expansion; note the acceleration caveat when discussing the age.</li>
<li><strong>Centre of the universe:</strong> the Big Bang happened everywhere — there is no centre or edge; expansion stretches space between galaxies.</li>
<li><strong>Precision:</strong> 2 or 3 s.f. with units (W, W m⁻², m, km s⁻¹, years); the data sheet supplies σ, c and H₀.</li>
</ul>
`,
  },
};
