// Physics AS notes, deepened to the depth bar — Work, Energy and Power (statements
// 5.1-5.2), Forces and Equilibrium (4.1-4.2) and Electricity: D.C. Circuits
// (9.1-9.3, 10.1-10.3). Board framing: Edexcel IAL Physics Units 1-2.
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-phy-as-b-depth.cjs > .freebuff-tmp/phy-as-b.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phy-as-b.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phy-as-b.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "c521dc16-c47b-4ecc-8b0d-4c38df77c482": "AS Level Physics: Work, Energy and Power",
    "3a5f3230-7e9e-4d8b-8943-bcf86193dc3b": "AS Level Physics: Forces and Equilibrium",
    "b019737f-148f-4517-90eb-36528c45eb85": "AS Level Physics: D.C. Circuits",
  },
  rows: {
    "c521dc16-c47b-4ecc-8b0d-4c38df77c482": `
<h2>AS Level Physics: Work, Energy and Power</h2>
<p>Energy is the currency of physics: it is never created or destroyed, only changed in form and moved from place to place, and every calculation in mechanics is really an accounting exercise in that currency. This note builds the energy toolkit from zero: what work actually is (a transfer, not a thing), the conservation principle that governs every process, the two energy formulas you will use daily — kinetic and gravitational potential — and power, the rate at which the currency is spent. Every worked example is a full energy audit with each line shown.</p>

<h3>Work: energy in transit</h3>
<p>Work is done when a force moves its point of application: energy is transferred from one store to another. The definition that earns the mark:</p>
<pre><code>work done = force x distance moved in the direction of the force
W = F s cos(theta)

W in joules (J), F in newtons (N), s in metres (m)
theta = angle between the force and the displacement</code></pre>
<p>The analogy: pushing a shopping trolley. Push along the direction of travel (θ = 0, cos θ = 1) and all your effort does work; push sideways (θ = 90°, cos θ = 0) and you do no work on its forward motion — you merely warm your arms. One joule is the work done when a force of one newton moves its point of application one metre: 1 J = 1 N m.</p>
<p><strong>Worked example.</strong> A woman pushes a trolley with 80 N along 15 m of horizontal floor, the force angled 30° above the horizontal. Find the work done.</p>
<pre><code>W = F s cos(theta) = 80 x 15 x cos(30)
  = 80 x 15 x 0.866 = 1039 J  (2 s.f.: 1.0 kJ)</code></pre>
<p>If instead the question were a box pushed horizontally with 80 N over 15 m, the answer is simply 80 × 15 = 1200 J. Read whether an angle is given; the cos θ line is where method marks live.</p>

<h3>Conservation of energy</h3>
<p>Energy cannot be created or destroyed; the total energy of a closed system is constant. Energy transfers between stores — kinetic, gravitational potential, elastic potential, thermal, internal — and every real transfer leaks some energy to thermal stores of the surroundings through friction. The exam phrasing: "energy is transferred usefully to X and dissipated to the surroundings as heat" — learn the transfer vocabulary (transferred, dissipated, stored) because the mark schemes use it deliberately.</p>
<table border="1" cellpadding="6">
<tr><th>Store</th><td>Change that fills it</td><td>Example</td></tr>
<tr><td>Kinetic</td><td>an object speeds up</td><td>a falling stone</td></tr>
<tr><td>Gravitational potential</td><td>an object is lifted</td><td>a book on a shelf</td></tr>
<tr><td>Elastic potential</td><td>a spring is stretched or compressed</td><td>a drawn bow</td></tr>
<tr><td>Thermal (internal)</td><td>friction, or heating</td><td>brake pads after a descent</td></tr>
</table>

<h3>Kinetic energy and gravitational potential energy</h3>
<pre><code>kinetic energy:  KE = (1/2) m v^2
gravitational potential energy (near a planet's surface):
                 GPE = m g h     (change in GPE = m g Delta h)

m in kg, v in m s-1, g = 9.81 m s-2 (or the value given),
h = vertical height change in metres</code></pre>
<p>Two traps live in the definitions. First, h is vertical: moving a box 10 m along a shelf adds no gravitational potential energy however far it slides. Second, GPE is defined as a change — only differences matter, so the question's reference level (where h = 0) is yours to choose; pick the lowest point and every height stays positive.</p>
<p><strong>Worked example 1 (falling object).</strong> A 0.50 kg ball is dropped from 20 m. Find its speed just before impact (ignore air resistance).</p>
<pre><code>energy at top:   GPE = m g h = 0.50 x 9.81 x 20 = 98.1 J
energy at bottom: KE = (1/2) m v^2, and KE = GPE
(1/2)(0.50) v^2 = 98.1
0.25 v^2 = 98.1 -> v^2 = 392.4 -> v = 19.8 m s-1</code></pre>
<p><strong>Worked example 2 (with friction).</strong> A 2.0 kg trolley starts at the top of a 5.0 m slope at 30° and reaches the bottom at 3.0 m s⁻¹. Find the energy dissipated by friction.</p>
<pre><code>vertical height: h = 5.0 sin(30) = 2.5 m
initial GPE = m g h = 2.0 x 9.81 x 2.5 = 49.05 J
final KE = (1/2)(2.0)(3.0)^2 = 9.0 J
energy lost to friction = 49.05 - 9.0 = 40.05 J
                        = 40 J (2 s.f.)</code></pre>
<p>Note the structure of every friction question: start energy minus end energy is the dissipation. Nothing is destroyed — it went to thermal stores.</p>

<h3>Bringing things to rest: work done by braking</h3>
<p>A whole family of questions asks how far a vehicle takes to stop, or what force stops it. The engine of the calculation is always the same: the kinetic energy the vehicle loses becomes work done by the braking force.</p>
<pre><code>KE lost = work done by braking
(1/2) m v^2 = F s        (F = average braking force, s = stopping distance)</code></pre>
<p><strong>Worked example.</strong> A 1200 kg car travelling at 20 m s⁻¹ brakes to a halt over 40 m. Find the average braking force.</p>
<pre><code>initial KE = (1/2) m v^2 = 0.5 x 1200 x 20^2 = 240 000 J
(1/2) m v^2 = F s  ->  240 000 = F x 40
F = 240 000/40 = 6000 N = 6.0 kN</code></pre>
<p>The same equation rearranged answers the safety version: since KE grows with v², doubling the speed quadruples the energy the brakes must absorb and hence the stopping distance at constant force. That single statement is a full mark in most questions about speed limits.</p>

<h3>Power: the rate of transfer</h3>
<pre><code>power = work done / time = energy transferred / time
P = W/t          (watts, W; 1 W = 1 J s-1)

also, for a force moving at constant speed:
P = F v          (derivable: W/t = F s/t = F v)</code></pre>
<p><strong>Worked example 1.</strong> A motor lifts a 200 kg crate through 8.0 m in 12 s at constant speed. Find its useful power output (g = 9.81 m s⁻²).</p>
<pre><code>useful work = gain in GPE = m g h = 200 x 9.81 x 8.0 = 15 696 J
P = W/t = 15 696/12 = 1308 W = 1.3 kW (2 s.f.)</code></pre>
<p><strong>Worked example 2 (P = Fv).</strong> A car engine provides 20 kN of thrust at a steady 30 m s⁻¹. Find the power developed.</p>
<pre><code>P = F v = 20 000 x 30 = 6.0 x 10^5 W = 600 kW</code></pre>
<p>Efficiency closes the topic: efficiency = useful energy output / total energy input, always a fraction (or ×100%). Real machines are between 0 and 1 — an efficiency of 1.2 is a red flag in your own answer.</p>
<p><strong>Worked example 3 (efficiency).</strong> A lift uses 40 kJ of electrical energy to raise a 500 kg load through 6.0 m. Find its efficiency.</p>
<pre><code>useful output = m g h = 500 x 9.81 x 6.0 = 29 430 J
input = 40 kJ = 40 000 J
efficiency = 29 430/40 000 = 0.74  (74%)</code></pre>

<h3>Worked examples: the mixed audit</h3>
<p><strong>Worked example.</strong> A 1.5 kg trolley is pushed by a 6.0 N force along a 4.0 m horizontal track. It starts from rest and ends at 3.0 m s⁻¹. Account for the energy.</p>
<pre><code>work input from the push: W = F s = 6.0 x 4.0 = 24 J
final KE = (1/2)(1.5)(3.0)^2 = 6.75 J
energy to friction/thermal = 24 - 6.75 = 17.25 J = 17 J (2 s.f.)
comment: most of the push became heat - the track is rough.</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Work)</strong> A 40 N force acts at 60° to the horizontal, moving a box 5.0 m horizontally. Find the work done. <em>Answer:</em> W = Fs cos θ = 40 × 5.0 × cos 60 = 40 × 5.0 × 0.5 = 100 J.</li>
<li><strong>(Conservation)</strong> A cyclist freewheels down a hill. Describe the energy transfers. <em>Answer:</em> Gravitational potential energy is transferred to kinetic energy as the cyclist descends; some energy is dissipated to the thermal stores of the brakes, tyres and air through friction and drag, so the final kinetic energy is slightly less than the initial GPE.</li>
<li><strong>(GPE/KE)</strong> A 0.20 kg ball is thrown up at 15 m s⁻¹. Find the maximum height reached (no air resistance). <em>Answer:</em> ½mv² = mgh → h = v²/(2g) = 225/(2 × 9.81) = 11.5 m.</li>
<li><strong>(Power)</strong> A crane lifts 800 kg through 12 m at constant speed in 20 s. Find the useful power (g = 9.81). <em>Answer:</em> W = mgh = 800 × 9.81 × 12 = 94 176 J; P = W/t = 4709 W = 4.7 kW.</li>
<li><strong>(Efficiency)</strong> A generator takes in 50 kJ and delivers 38 kJ of electrical energy. Find the efficiency and state where the rest goes. <em>Answer:</em> 38/50 = 0.76 (76%); the remaining 12 kJ is dissipated as heat to the surroundings (thermal stores) through friction and electrical resistance.</li>
<li><strong>(P = Fv)</strong> A car moves at constant speed against a total drag of 500 N. Find the engine power at 25 m s⁻¹. <em>Answer:</em> P = Fv = 500 × 25 = 12 500 W = 12.5 kW.</li>
<li><strong>(Vertical height)</strong> A 3.0 kg suitcase is carried 4.0 m horizontally across a room. Find the change in its GPE. <em>Answer:</em> Zero — the vertical height did not change, and GPE depends only on vertical displacement.</li>
<li><strong>(Full audit)</strong> A 1.0 kg block slides 2.0 m down a 25° slope and reaches 2.5 m s⁻¹. Find the energy dissipated. <em>Answer:</em> h = 2.0 sin 25 = 0.845 m; GPE lost = 1.0 × 9.81 × 0.845 = 8.29 J; KE gained = ½ × 1.0 × 6.25 = 3.13 J; dissipated = 8.29 − 3.13 = 5.2 J.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>h is vertical:</strong> sliding along a level floor changes no GPE. Convert slope distance to vertical height with sin θ before mgh.</li>
<li><strong>Speed squared:</strong> KE = ½mv² — doubling v quadruples KE. Candidates who double the energy on doubling speed lose marks in multi-step questions.</li>
<li><strong>W = Fs versus W = mgh:</strong> the work done by a lifting force equals the gain in GPE only at constant speed; if the load accelerates, some work also becomes KE.</li>
<li><strong>Forgetting the energy audit structure:</strong> friction questions want input energy minus output energy as a stated subtraction — show both energies first.</li>
<li><strong>Power units:</strong> kW into W before dividing by seconds (1 kW = 1000 W). 1300 W is 1.3 kW, not 13.</li>
<li><strong>Efficiency as a percentage over 100:</strong> impossible; check the ratio direction (output over input, never the reverse).</li>
<li><strong>g value:</strong> use 9.81 m s⁻² unless the paper supplies another value; a question giving g = 10 expects 10.</li>
<li><strong>Significant figures and units:</strong> answers to 2 or 3 s.f. with units (J, W, m s⁻¹) — unrounded calculator output costs marks.</li>
<li><strong>Method visibility:</strong> write the formula (W = Fs cos θ, P = W/t) as its own line before substitution; formulae earn credit independently of arithmetic.</li>
</ul>
`,
    "3a5f3230-7e9e-4d8b-8943-bcf86193dc3b": `
<h2>AS Level Physics: Forces and Equilibrium</h2>
<p>Equilibrium is the physics of things that stay put — or move steadily — because everything acting on them cancels. The two conditions it obeys (no resultant force, no resultant moment) turn architecture, cranes and ladders into solvable puzzles. This note builds the toolkit from zero: what a moment is and why doors have handles at their edges, couples and torque, the centre of gravity, and the two equilibrium conditions applied to beams and multi-force systems, with every worked example solved in full.</p>

<h3>Moment: the turning effect of a force</h3>
<p>A force that does not act through a pivot makes a body turn. The measure of that turning effect is the moment:</p>
<pre><code>moment of a force = force x perpendicular distance from the pivot
M = F d          (unit: newton metre, N m)</code></pre>
<p>The analogy: a door. Push at the handle (far from the hinges) and it swings easily; push near the hinges and the same force barely turns it. The perpendicular is the load-bearing word: the distance must be measured along the line perpendicular to the force's line of action. If a force acts at an angle, resolve it first and use the perpendicular component.</p>
<p><strong>Worked example.</strong> A door handle is 0.80 m from the hinges. A student pushes with 30 N at 40° to the door's surface. Find the moment about the hinges.</p>
<pre><code>component perpendicular to the door: F_perp = 30 sin(40) = 19.3 N
(the angle is measured from the door itself, so the perpendicular
 component carries the sine)
M = F_perp d = 19.3 x 0.80 = 15.4 N m  (2 s.f.: 15 N m)</code></pre>
<p>Direction matters in sign conventions: anticlockwise moments are usually taken as positive, clockwise as negative (or vice versa — consistency is what the marker checks).</p>

<h3>Couples and torque</h3>
<p>A couple is a pair of equal and opposite forces whose lines of action do not coincide: it produces pure rotation with no resultant force. The moment of a couple (its torque) is one force times the perpendicular distance <em>between the two forces</em>:</p>
<pre><code>torque of a couple = F x d_between        (or 2 x F x (d/2))
unit: N m</code></pre>
<p>Everyday couples: turning a steering wheel (both hands push oppositely), winding a clock key, the compass needle between two poles. The commonest exam error is halving or doubling the separation — measure between the two forces, full stop.</p>

<h3>Centre of gravity</h3>
<p>The centre of gravity is the point where the entire weight of a body may be taken to act. For uniform regular shapes it sits at the geometric centre; for irregular shapes it can be found experimentally (plumb-line method: hang the shape freely from two different points; the verticals from the suspension points meet at the centre of gravity). Stability questions follow from its position: an object topples when its line of action of weight falls outside its base — wide bases and low centres of gravity give stability (racing cars, furniture anti-tip brackets).</p>
<p><strong>Worked example.</strong> Explain why a double-decker bus is more likely to topple on a sharp bend when fully loaded on the upper deck. <em>Answer:</em> Loading the upper deck raises the combined centre of gravity; on the bend, the turning effect of the weight about the outer wheels increases with the perpendicular distance to the pivot; if the weight's line of action passes beyond the outer wheels, the net moment topples the bus.</p>

<h3>Equilibrium of forces: the two conditions</h3>
<p>A body is in equilibrium when both conditions hold:</p>
<ol>
<li><strong>Translational equilibrium:</strong> the vector sum of forces is zero — ΣF = 0 in every direction.</li>
<li><strong>Rotational equilibrium:</strong> the sum of moments about any pivot is zero — ΣM = 0 (total anticlockwise = total clockwise).</li>
</ol>
<p>The practical routine for any beam problem: (1) draw the diagram and mark every force; (2) take moments about a chosen pivot — choosing one where an unknown force acts eliminates it; (3) write ΣM = 0 and solve; (4) use ΣF = 0 to find the remaining unknowns.</p>

<h3>Worked examples: beam problems in full</h3>
<p><strong>Worked example 1.</strong> A uniform beam of weight 40 N and length 2.0 m rests on two supports, one at each end. A 20 N load sits 0.50 m from the left support. Find the reaction forces.</p>
<pre><code>Let the reactions be R_L (left) and R_R (right).
Take moments about the left support (eliminates R_L):
anticlockwise = clockwise
R_R x 2.0 = (40 x 1.0) + (20 x 0.50)
R_R x 2.0 = 40 + 10 = 50
R_R = 25 N
Vertical equilibrium: R_L + R_R = 40 + 20 = 60 N
R_L = 60 - 25 = 35 N
Check: moments about the right support:
35 x 2.0 = 70 clockwise, and (40 x 1.0) + (20 x 1.5) = 70
anticlockwise. Balanced.</code></pre>
<p><strong>Worked example 2 (non-uniform).</strong> A 3.0 m plank of weight 60 N rests with one end on a pivot and the other on a scale. Its centre of gravity is 1.2 m from the pivot end. Find the scale reading.</p>
<pre><code>Take moments about the pivot:
R_scale x 3.0 = 60 x 1.2 = 72
R_scale = 72/3.0 = 24 N
(and the pivot takes the remaining 60 - 24 = 36 N)</code></pre>
<p><strong>Worked example 3 (angled force).</strong> A horizontal beam is held by a rope at 30° to the beam at its far end; the beam's weight W acts at its centre. Find the rope tension T in terms of W.</p>
<pre><code>Moments about the beam end at the wall:
anticlockwise (rope): T sin(30) x L
clockwise (weight):  W x L/2
T sin(30) x L = W L/2
T x 0.5 = W/2  ->  T = W</code></pre>
<p>The habit that prevents errors: cancel the common factor (L) only after writing both moment lines fully.</p>

<h3>Multi-force equilibrium: triangles and resolution</h3>
<p>When three non-parallel forces hold a body in equilibrium, they can be arranged tip-to-tail into a closed triangle — a graphical method with marks attached. For more forces, resolve into perpendicular components (usually horizontal and vertical) and set each sum to zero:</p>
<pre><code>sum of horizontal components = 0
sum of vertical components   = 0</code></pre>
<p><strong>Worked example.</strong> A 100 N weight hangs from two ropes, one at 30° and one at 60° to the horizontal. Find the tensions.</p>
<pre><code>Let tensions be A (30 deg rope) and B (60 deg rope).
Horizontal: A cos(30) = B cos(60)
            0.866 A = 0.5 B  ->  B = 1.732 A
Vertical:   A sin(30) + B sin(60) = 100
            0.5 A + 0.866 x 1.732 A = 100
            0.5 A + 1.5 A = 100 -> 2.0 A = 100
A = 50 N,  B = 1.732 x 50 = 86.6 N</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Moment)</strong> A spanner grips a nut 0.25 m from its pivot end; a mechanic pushes at 60° to the spanner with 80 N. Find the moment. <em>Answer:</em> perpendicular component = 80 sin 60 = 69.3 N; M = 69.3 × 0.25 = 17.3 N m ≈ 17 N m.</li>
<li><strong>(Definition)</strong> Define centre of gravity. <em>Answer:</em> The point at which the whole weight of a body may be taken to act.</li>
<li><strong>(Couple)</strong> Two opposite 15 N forces act 0.40 m apart on a wheel rim. Find the torque. <em>Answer:</em> τ = Fd = 15 × 0.40 = 6.0 N m.</li>
<li><strong>(Beam)</strong> A uniform 4.0 m beam (weight 100 N) rests on supports 0.50 m from each end. A 50 N load sits at the midpoint. Find the reactions. <em>Answer:</em> By symmetry each reaction = (100 + 50)/2 = 75 N.</li>
<li><strong>(Stability)</strong> Explain why a racing car is built low and wide. <em>Answer:</em> A low centre of gravity and wide base increase stability: the weight's line of action must move further before it falls outside the base, so larger moments are needed to topple it.</li>
<li><strong>(Equilibrium conditions)</strong> State the two conditions for a rigid body to be in equilibrium. <em>Answer:</em> The resultant force on the body is zero (ΣF = 0), and the resultant moment about any point is zero (ΣM = 0).</li>
<li><strong>(Resolution)</strong> A single rope holds a 20 N weight stationary, the rope making 40° with the horizontal. Find the tension. <em>Answer:</em> Vertical equilibrium: T sin 40 = 20, so T = 20/0.643 = 31.1 N ≈ 31 N. (For a picture hung on a cord fixed at both ends, resolve both halves' tensions instead.)</li>
<li><strong>(Practical)</strong> Describe how to find the centre of gravity of an irregular lamina. <em>Answer:</em> Hang the lamina freely from a pin through a hole near its edge; hang a plumb line from the same pin and draw the vertical line; repeat from a second hole; the intersection of the two vertical lines is the centre of gravity.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Perpendicular distance:</strong> the moment is Fd with d perpendicular to F. Using the slant distance when a force acts at an angle is the commonest error — resolve the force or find the true perpendicular first.</li>
<li><strong>Couple geometry:</strong> d in Fd for a couple is the full separation of the two forces, not the radius. Turning a steering wheel with hands 0.60 m apart: τ = F × 0.60.</li>
<li><strong>Pivot choice:</strong> take moments about a point where an unknown force acts to eliminate it; taking them about the wrong point creates simultaneous equations unnecessarily.</li>
<li><strong>Uniform assumption:</strong> a uniform beam's weight acts at its midpoint; a non-uniform one's does not — read which the question gives.</li>
<li><strong>Reaction direction:</strong> assume upward reactions; a negative result simply means the force acts downward (a tether, not a support). Do not panic at minus signs.</li>
<li><strong>Forces without directions:</strong> ΣF = 0 is a vector statement — write horizontal and vertical sums separately rather than one jumble.</li>
<li><strong>Three-force triangle conditions:</strong> the forces must be coplanar and non-parallel for the triangle method; parallel forces need the moment approach.</li>
<li><strong>Units and precision:</strong> moments in N m (not J — even though the units are dimensionally identical, the mark requires the moment unit), forces in N, 2 or 3 s.f.</li>
<li><strong>Method marks:</strong> state "taking moments about the pivot" and write ΣM = 0 explicitly before substituting numbers.</li>
</ul>
`,
    "b019737f-148f-4517-90eb-36528c45eb85": `
<h2>AS Level Physics: D.C. Circuits</h2>
<p>Direct-current circuits are where abstract quantities become measurable: current is charge in motion, potential difference is energy per charge, and resistance is the friction of the electrical world. This note builds the complete circuit toolkit from zero: current and the drift model, potential difference and power, resistance and resistivity, real sources and internal resistance, Kirchhoff's two laws, and potential dividers. Every calculation type is worked line by line, and the practical skills — meters, graphs, and the divider equation — are given the treatment the papers demand.</p>

<h3>Electric current: charge in motion</h3>
<p>Current is the rate of flow of charge: I = Q/t, measured in amperes (1 A = 1 C s⁻¹). Charge itself comes in quanta of e = 1.60 × 10⁻¹⁹ C. At the microscopic level, current in a metal is the drift of free electrons through a lattice of ions:</p>
<pre><code>I = n A v q

n = charge carrier density (m-3)
A = cross-sectional area of the conductor (m2)
v = drift velocity (m s-1)
q = charge on each carrier (C), = e for electrons</code></pre>
<p>The analogy worth keeping: a garden hose already full of water. Turning the tap (closing the switch) sends water out the far end almost instantly — not because water travels the hose in zero time, but because the hose is full and pressure passes the signal along. So drift velocities are millimetres per second while the lamp lights instantly.</p>
<p><strong>Worked example.</strong> A wire of cross-section 1.0 mm² carries 3.0 A. There are 8.5 × 10²⁸ free electrons per m³. Find the drift velocity.</p>
<pre><code>A = 1.0 mm2 = 1.0 x 10-6 m2
v = I/(n A q) = 3.0/(8.5 x 1028 x 1.0 x 10-6 x 1.6 x 10-19)
  = 3.0/(13 600) = 2.2 x 10-4 m s-1  (0.22 mm s-1)</code></pre>
<p>Note the unit conversions: mm² to m² is a factor of 10⁻⁶, and the answer in mm s⁻¹ is a factor of 10³ from m s⁻¹.</p>

<h3>Potential difference and power</h3>
<p>Potential difference (p.d.) across a component is the energy transferred per unit charge passing through it: V = W/Q, in volts (1 V = 1 J C⁻¹). Electromotive force (e.m.f.) is the energy converted from other forms to electrical energy per unit charge by a source — the same unit, different story (energy in, not energy out). Combine with I = Q/t to get the power equations that run the paper:</p>
<pre><code>W = Q V = I t V
P = W/t = I V = I^2 R = V^2 / R</code></pre>
<p><strong>Worked example.</strong> A 12 V heater draws 8.0 A. Find its power and the energy converted in 5.0 minutes.</p>
<pre><code>P = I V = 8.0 x 12 = 96 W
W = P t = 96 x (5.0 x 60) = 96 x 300 = 28 800 J = 29 kJ</code></pre>
<p>Choosing the right power form: use P = IV when you have current and voltage, I²R when current and resistance are known (it shows why heating losses rise with current), V²/R when the voltage is fixed across the component.</p>

<h3>Resistance, Ohm's law and resistivity</h3>
<p>Resistance is the ratio V/I, in ohms (1 Ω = 1 V A⁻¹). Ohm's law states that current is proportional to potential difference <em>for a metallic conductor at constant temperature</em> — the graph of I against V is a straight line through the origin; the qualification about temperature is examinable. Resistivity is the material's own opposition to current, independent of the wire's shape:</p>
<pre><code>R = rho L / A          so   rho = R A / L

rho in ohm metre (ohm m)
L in m, A in m2</code></pre>
<p><strong>Worked example 1.</strong> A nichrome wire of resistivity 1.10 × 10⁻⁶ Ω m is 2.5 m long and 0.20 mm in diameter. Find its resistance.</p>
<pre><code>A = pi r^2 = 3.14 x (1.0 x 10-4)^2 = 3.14 x 10-8 m2
R = rho L/A = (1.10 x 10-6 x 2.5)/(3.14 x 10-8)
  = 2.75 x 10-6/3.14 x 10-8 = 87.6 ohm  (2 s.f.: 88 ohm)</code></pre>
<p><strong>Worked example 2 (temperature).</strong> Explain why the resistance of a metal filament rises as it heats up. <em>Answer:</em> The lattice ions vibrate more vigorously with temperature, increasing the rate of collision with drifting electrons; each collision impedes the drift, so the same potential difference drives less current and R = V/I rises. (Semiconductors behave oppositely: more carriers are released, so their resistance falls.)</p>

<h3>Practical circuits: sources, internal resistance and meters</h3>
<p>A real source has internal resistance r: some energy is converted to heat inside the source itself, so the terminal potential difference is less than the e.m.f. whenever current flows.</p>
<pre><code>e.m.f. = terminal p.d. + lost volts
E = V + I r        ->   V = E - I r

also: E = I (R + r)  for a load resistance R in series with r</code></pre>
<p>The V–I graph of a real source is the standard question: a straight line with y-intercept E and gradient −r. Short-circuit current (V = 0) is E/r.</p>
<p><strong>Worked example.</strong> A cell of e.m.f. 1.50 V drives 0.20 A through a 6.0 Ω resistor. Find the internal resistance and the terminal p.d.</p>
<pre><code>E = I(R + r)  ->  1.50 = 0.20(6.0 + r)
7.5 = 6.0 + r  ->  r = 1.5 ohm
terminal p.d.: V = I R = 0.20 x 6.0 = 1.20 V
check: lost volts = I r = 0.20 x 1.5 = 0.30 V, and 1.20 + 0.30 = 1.50 V</code></pre>
<p>Meter rules: an ammeter goes in series (ideally zero resistance) and a voltmeter in parallel with the component (ideally infinite resistance); a real ammeter's small resistance and a real voltmeter's finite one are sources of systematic error worth naming in evaluation questions.</p>

<h3>Series and parallel: the recaps that decide marks</h3>
<table border="1" cellpadding="6">
<tr><th></th><th>Series</th><th>Parallel</th></tr>
<tr><td>Current</td><td>same through each component</td><td>splits; total = sum of branches</td></tr>
<tr><td>Voltage</td><td>splits; total = sum across components</td><td>same across each branch</td></tr>
<tr><td>Resistance</td><td>R = R₁ + R₂ + ...</td><td>1/R = 1/R₁ + 1/R₂ + ...</td></tr>
</table>
<p><strong>Worked example.</strong> Find the total resistance of 6.0 Ω and 3.0 Ω in parallel, then in series with 2.0 Ω.</p>
<pre><code>parallel pair: 1/R = 1/6 + 1/3 = 0.1667 + 0.3333 = 0.5
R_pair = 2.0 ohm
total with the series resistor: R = 2.0 + 2.0 = 4.0 ohm</code></pre>

<h3>Kirchhoff's laws</h3>
<ul>
<li><strong>First law (charge conservation):</strong> the sum of currents entering a junction equals the sum leaving it. ΣI in = ΣI out. The junction rule — charge is not created inside a wire.</li>
<li><strong>Second law (energy conservation):</strong> the sum of e.m.f.s around any closed loop equals the sum of p.d. drops around it; equivalently the potential changes around a loop sum to zero. ΣE = ΣIR.</li>
</ul>
<p>The loop method for any network: (1) label current directions (a wrong guess just returns a negative value); (2) write one junction equation per junction you need; (3) write loop equations for enough independent loops; (4) solve the simultaneous equations.</p>
<p><strong>Worked example.</strong> A 12 V battery drives two parallel resistors, 4.0 Ω and 6.0 Ω. Find the current from the battery and through each branch.</p>
<pre><code>parallel p.d. is the same: 12 V across both branches
I(4.0) = V/R = 12/4.0 = 3.0 A
I(6.0) = 12/6.0 = 2.0 A
junction rule: I_battery = 3.0 + 2.0 = 5.0 A
check with total resistance: R = (4 x 6)/(4 + 6) = 2.4 ohm
I = 12/2.4 = 5.0 A  (consistent)</code></pre>
<p><strong>Worked example 2 (loop law).</strong> A 1.5 V cell and a 2.0 V cell are connected in series aiding, driving 0.10 A through a 33 Ω resistor plus internal resistances of 2.0 Ω total. Verify the loop law.</p>
<pre><code>total e.m.f. = 1.5 + 2.0 = 3.5 V
total resistance = 33 + 2.0 = 35 ohm
I = 3.5/35 = 0.10 A  (matches the given current)
loop check: sum of p.d. drops = 0.10 x 35 = 3.5 V = sum of e.m.f.s</code></pre>

<h3>Potential dividers</h3>
<p>Two resistors in series across a supply share the supply voltage in proportion to their resistances:</p>
<pre><code>V_out = V_in x R2/(R1 + R2)

(R2 is the resistor across which the output is tapped)</code></pre>
<p>The divider is the backbone of sensor circuits: replace R₂ with a light-dependent resistor or thermistor and the output voltage tracks light level or temperature. The loading caveat is examinable — connecting a finite-resistance voltmeter or load across R₂ changes the effective resistance and lowers V_out below the ideal value.</p>
<p><strong>Worked example 1.</strong> A 9.0 V supply has R₁ = 2.0 kΩ and R₂ = 4.0 kΩ. Find the output voltage.</p>
<pre><code>V_out = 9.0 x 4.0/(2.0 + 4.0) = 9.0 x 4/6 = 6.0 V</code></pre>
<p><strong>Worked example 2 (design).</strong> You need 3.0 V from a 12 V supply with a 1.0 kΩ total resistance. Choose R₁ and R₂.</p>
<pre><code>V_out/V_in = R2/(R1 + R2) -> 3.0/12 = R2/1000
R2 = 250 ohm,  R1 = 750 ohm</code></pre>
<p><strong>Worked example 3 (thermistor).</strong> A thermistor in the lower leg falls from 4.0 kΩ to 1.0 kΩ on heating, with R₁ = 2.0 kΩ across a 9.0 V supply. Find the output voltage before and after heating.</p>
<pre><code>cold:  V_out = 9.0 x 4.0/(2.0 + 4.0) = 6.0 V
hot:   V_out = 9.0 x 1.0/(2.0 + 1.0) = 3.0 V
The falling output signals rising temperature.</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Current)</strong> A current of 0.50 A flows for 2.0 minutes. Find the charge transferred. <em>Answer:</em> Q = It = 0.50 × 120 = 60 C.</li>
<li><strong>(Power)</strong> A 6.0 Ω resistor dissipates 24 W. Find the current through it. <em>Answer:</em> P = I²R → I = √(P/R) = √(24/6.0) = 2.0 A.</li>
<li><strong>(Resistivity)</strong> Two wires of the same material have the same resistance; one is twice as long. State how its cross-section compares. <em>Answer:</em> R = ρL/A, so doubling L requires doubling A to keep R — the longer wire must have twice the cross-sectional area.</li>
<li><strong>(Internal resistance)</strong> A battery of e.m.f. 6.0 V and internal resistance 0.50 Ω drives a 2.5 Ω load. Find the terminal p.d. <em>Answer:</em> I = E/(R+r) = 6.0/3.0 = 2.0 A; V = IR = 2.0 × 2.5 = 5.0 V (lost volts = 1.0 V).</li>
<li><strong>(Kirchhoff 1)</strong> At a junction, 3.0 A and 2.0 A enter; one wire leaves. Find its current. <em>Answer:</em> 5.0 A — charge conservation.</li>
<li><strong>(Kirchhoff 2)</strong> State the second law and what it represents. <em>Answer:</em> The sum of e.m.f.s around any closed loop equals the sum of potential differences around it — conservation of energy.</li>
<li><strong>(Divider)</strong> A divider has R₁ = 3.0 kΩ and R₂ = 5.0 kΩ across 8.0 V. Find V_out. <em>Answer:</em> V_out = 8.0 × 5.0/8.0 = 5.0 V.</li>
<li><strong>(Sensor)</strong> Explain how a potential divider with a thermistor can act as a temperature sensor. <em>Answer:</em> The thermistor's resistance falls as temperature rises, changing the ratio R₂/(R₁+R₂) and hence V_out; the output voltage therefore tracks temperature and can be calibrated to a scale or trigger.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Power formula roulette:</strong> choosing P = V²/R when the current is fixed wastes time and marks. Match the formula to the quantities known.</li>
<li><strong>Resistivity units:</strong> ρ is in Ω m, and areas in the formula are m² — mm² and cm² must be converted (1 mm² = 10⁻⁶ m²).</li>
<li><strong>Internal resistance omission:</strong> "a battery" in a paper often implies real internal resistance; if the question gives r or a V–I graph, use V = E − Ir.</li>
<li><strong>Divider loading:</strong> the ideal divider formula assumes no load current; if the question says a resistor is connected across the output, recompute the effective resistance rather than quoting the ideal value.</li>
<li><strong>Meter placement:</strong> ammeters in series, voltmeters in parallel; a swapped meter is a practical-method mark lost.</li>
<li><strong>Junction arithmetic:</strong> sum currents entering = leaving; the classic error is subtracting a branch current from itself when directions were assumed wrongly. A negative answer just means the assumed direction is reversed.</li>
<li><strong>Series/parallel recognition:</strong> redraw circuits before calculating; two resistors across the same two nodes are parallel however the wires are drawn.</li>
<li><strong>Significant figures and units:</strong> 2 or 3 s.f. with units (A, V, Ω, W, J); keep Ω as the unit for resistance — never ohms written as O or zero.</li>
<li><strong>Method marks:</strong> state the formula (I = V/R, V = E − Ir, Kirchhoff's law) and the loop/junction you are using before substituting; the law name itself is credit.</li>
</ul>
`,
  },
};
