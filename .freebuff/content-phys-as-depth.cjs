// Physics AS batch 4a: Edexcel International A Level Physics (YPH11), Unit 1
// (WPH11) Mechanics and Materials - kinematics, dynamics (with the fluids
// strand) and materials/deformation - with the Unit 3 (WPH13) practical-skills
// content woven in: data handling, uncertainties, graph analysis. Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-phys-as-depth.cjs > .freebuff-tmp/phys-as-depth.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phys-as-depth.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phys-as-depth.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs physics AS
module.exports = {
  expectType: "notes",
  titles: {
    "c6799c2c-a5ca-4a0d-b962-7bf95e65b17d": "AS Level Physics: Kinematics",
    "78b026c5-7368-43c8-a8bb-0b19b9be584d": "AS Level Physics: Dynamics",
    "eff91bce-733f-4869-933f-f449fc857e90": "AS Level Physics: Materials and Deformation",
  },
  rows: {
    "c6799c2c-a5ca-4a0d-b962-7bf95e65b17d": `
<h2>AS Level Physics: Kinematics</h2>
<p>Edexcel International A Level Physics, Unit 1 (WPH11) Mechanics and Materials — motion in a straight line and in a plane, and the measurement skills the companion Unit 3 paper (WPH13, Practical Skills in Physics I) examines. Everything in mechanics starts here: quantities with units and directions, the equations of motion, free fall, projectiles and the graphs that describe them. The unit also demands real data-handling skill — uncertainties, error bars, gradients and intercepts — because WPH13 is a written paper that marks your experimental thinking, not your hands.</p>

<h3>Quantities, units, scalars and vectors</h3>
<p>A physical quantity is a number with a unit, and every unit in mechanics is built from four SI base units: the metre (m), kilogram (kg), second (s) and ampere (A). Speed in m s⁻¹ and force in newtons (1 N = 1 kg m s⁻²) are derived from them. A <strong>scalar</strong> has size only — distance, speed, mass, time, energy, power. A <strong>vector</strong> has size and direction — displacement, velocity, acceleration, force, momentum. The distinction is operational, not decorative: vectors add by direction, and every mechanics question that mentions direction is testing it.</p>
<ul>
<li>Two vectors in a line: add if in the same direction, subtract if opposite, and state the direction of the resultant.</li>
<li>Two vectors at right angles: the resultant is the hypotenuse, R = √(A² + B²), at an angle θ = tan⁻¹(B/A) to A.</li>
<li>Any two vectors: resolve each into perpendicular components with A cos θ and A sin θ, add the components separately, then recombine.</li>
</ul>
<p>Resolution is the workhorse of A-level mechanics. A force F at angle θ to the horizontal has a horizontal component F cos θ along the motion and a vertical component F sin θ across it; only the component along the motion changes the motion. Sign convention is chosen, not given: for vertical motion taking up as positive makes g = −9.81 m s⁻²; for slopes, taking down the slope as positive is usually simplest.</p>

<h3>Motion in a straight line</h3>
<p>Uniform motion means constant velocity; accelerated motion means changing velocity. The five quantities in every equation of motion are: displacement s (m), initial velocity u (m s⁻¹), final velocity v (m s⁻¹), acceleration a (m s⁻²), and time t (s). Average velocity is (u + v)/2 only when the acceleration is constant.</p>
<table border="1" cellpadding="6">
<tr><th>Quantity</th><th>Definition</th><th>Unit</th><th>Scalar or vector</th></tr>
<tr><td>Displacement</td><td>Distance from a start point in a stated direction</td><td>m</td><td>Vector</td></tr>
<tr><td>Velocity</td><td>Rate of change of displacement</td><td>m s⁻¹</td><td>Vector</td></tr>
<tr><td>Acceleration</td><td>Rate of change of velocity</td><td>m s⁻²</td><td>Vector</td></tr>
<tr><td>Speed</td><td>Distance travelled per unit time</td><td>m s⁻¹</td><td>Scalar</td></tr>
</table>

<h3>The equations of motion</h3>
<p>For motion with <strong>constant acceleration</strong>, four equations connect the five quantities. They are valid only while a is constant, and they are all vector equations, so the sign convention must be applied to u, v, a and s consistently.</p>
<pre><code>v = u + a t
s = u t + 1/2 a t^2
v^2 = u^2 + 2 a s
s = 1/2 (u + v) t</code></pre>
<ul>
<li>Each equation omits one quantity: pick the equation that does not contain the unknown you do not need.</li>
<li>Units must be SI before substituting: kilometres to metres, minutes to seconds, km h⁻¹ to m s⁻¹ (divide by 3.6).</li>
<li>Direction convention: write one down before touching the algebra — for example, upward positive means a falling object has a = −9.81 m s⁻² and a downward displacement is negative.</li>
</ul>

<h3>Free fall and projectile motion</h3>
<p>Free fall is motion under gravity alone. Near the Earth's surface the acceleration is g = 9.81 m s⁻² downwards and is constant (air resistance neglected), so the equations of motion apply directly. An object thrown straight up decelerates at 9.81 m s⁻², stops instantaneously at the top, and falls back with the same acceleration; the time up equals the time down from the same height.</p>
<p>A projectile is any object moving under gravity alone once launched. The key insight is <strong>independence of components</strong>: the horizontal motion has zero acceleration and constant velocity, while the vertical motion has constant acceleration g. Resolve the launch velocity into u cos θ horizontally and u sin θ vertically, treat the two motions separately with the equations of motion, and combine at the end. At the highest point the vertical velocity is zero but the horizontal velocity is unchanged — the projectile is never at rest. The trajectory is a parabola.</p>

<h3>Motion graphs</h3>
<table border="1" cellpadding="6">
<tr><th>Graph</th><th>Gradient gives</th><th>Area gives</th></tr>
<tr><td>Displacement–time</td><td>Velocity</td><td>Not used</td></tr>
<tr><td>Velocity–time</td><td>Acceleration</td><td>Change in displacement</td></tr>
<tr><td>Acceleration–time</td><td>Not used</td><td>Change in velocity</td></tr>
</table>
<p>The equation s = ½(u + v)t is the area of a trapezium under a velocity–time graph, and v² = u² + 2as is what falls out of that geometry — which is why the equations and the graphs never disagree. Curved velocity–time graphs mean changing acceleration; the gradient at a point is found from a tangent drawn with a ruler and evaluated between two distant points on the tangent.</p>

<h3>Non-uniform motion: drag and terminal velocity</h3>
<p>When a real object falls, air resistance (drag) acts opposite to the motion and grows with speed. The resultant force is weight minus drag, so the acceleration is greatest at the start and falls as speed rises. When drag equals the weight the resultant force is zero and the object continues at <strong>terminal velocity</strong>. A skydiver reaches terminal velocity in free fall, opens the parachute (which raises drag enormously), and decelerates to a much lower terminal velocity before landing. The same physics sets the thinking and braking distances of a vehicle: thinking distance grows with reaction time and speed; braking distance grows with the square of the speed, because the work the brakes must do is ½mv².</p>

<h3>Unit 3 skills: measurement, data and uncertainty</h3>
<p>WPH13 examines the practical skills of Units 1 and 2 in writing, using unfamiliar contexts. The marks come from method and analysis, and the analysis rules are fixed.</p>
<ul>
<li><strong>Absolute uncertainty</strong> is the precision of the instrument: ±0.5 of the smallest scale division for an analogue scale, ± the smallest reading for a digital one. A length of 24.5 mm on a ruler carries ±0.5 mm.</li>
<li><strong>Percentage uncertainty</strong> = (absolute uncertainty ÷ measured value) × 100. A small quantity measured with the same instrument carries the biggest percentage uncertainty — which is why measuring a short wire's extension with a ruler is poor method.</li>
<li><strong>Combining uncertainties</strong>: for a sum or difference, add the absolute uncertainties; for a product or quotient (including powers), add the percentage uncertainties, and for a quantity raised to the power n, multiply its percentage uncertainty by n.</li>
<li><strong>Repeat readings</strong> reduce random error; the mean is quoted with the uncertainty taken as half the range or the instrument precision, whichever is larger. Systematic errors (zero errors, calibration faults) are corrected at the instrument, never by averaging.</li>
<li><strong>Graphs and error bars</strong>: plot every point with error bars in both directions where both quantities are uncertain, draw the line of best fit and also the worst acceptable steepest and shallowest lines within the error bars; the gradient's uncertainty comes from their spread.</li>
<li><strong>Gradient and intercept</strong>: gradient = Δy/Δx taken between two distant points on the line; state it with its unit. The intercept is physical only if the theory predicts one — on a velocity–time graph the intercept is the initial velocity; on a load–extension graph a non-zero intercept suggests the spring was already stretched.</li>
<li><strong>Calibration</strong>: a known input is applied to an instrument and its output recorded, giving a calibration graph against which unknown readings are converted.</li>
<li><strong>Control of variables and safety</strong>: identify the independent, dependent and control variables; keep controls fixed and name them; risk assessment links each hazard to a control (falling masses — clamp the stand; long wires under tension — eye protection).</li>
</ul>

<h3>Worked example: equations of motion and uncertainty</h3>
<p>A ball is dropped from rest and falls 1.50 m. Neglecting air resistance, take g = 9.81 m s⁻².</p>
<pre><code>v^2 = u^2 + 2 a s = 0 + 2 x 9.81 x 1.50 = 29.4, so v = 5.42 m s-1
time: s = u t + 1/2 a t^2 gives 1.50 = 4.905 t^2, so t = 0.553 s</code></pre>
<p>Now the uncertainty: if the height is measured as 1.50 ± 0.01 m, its percentage uncertainty is 0.01/1.50 × 100 = 0.67 per cent. Since v = √(2gs), the percentage uncertainty in v is half of that in s, so v = 5.42 ± 0.04 m s⁻¹. Treating powers correctly is the difference between a right and a wrong uncertainty.</p>

<h3>Common mistakes</h3>
<ul>
<li>Applying the equations of motion when the acceleration is not constant (for example once drag becomes significant).</li>
<li>Ignoring sign convention: mixing upward-positive displacements with downward-positive g gives nonsense answers.</li>
<li>Forgetting that at the top of a projectile's flight the vertical velocity is zero but the acceleration is still 9.81 m s⁻² downwards.</li>
<li>Adding percentage uncertainties for a sum instead of absolute uncertainties, or halving the percentage uncertainty of a square-rooted quantity incorrectly.</li>
<li>Joining plotted points with straight lines instead of drawing a smooth line of best fit, or ignoring error bars when asked for uncertainty.</li>
<li>Taking the gradient between two plotted points rather than two distant points on the best-fit line.</li>
<li>Confusing distance with displacement and speed with velocity in questions that mention direction.</li>
<li>Using km h⁻¹ directly in the equations: divide by 3.6 to convert to m s⁻¹ first.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (WPH11, 3 marks).</strong> A car accelerates uniformly from 5.0 m s⁻¹ to 15 m s⁻¹ in 6.0 s. Find the acceleration and the distance travelled.</p>
<p>Answer: a = (v − u)/t = (15 − 5.0)/6.0 = 1.7 m s⁻². s = ½(u + v)t = ½(5.0 + 15)(6.0) = 60 m.</p>
<p><strong>Question 2 (WPH11, 4 marks).</strong> A stone is thrown vertically upwards at 20 m s⁻¹. Calculate the maximum height and the total time of flight. Take g = 9.81 m s⁻².</p>
<p>Answer: At the top v = 0, so v² = u² + 2as gives 0 = 400 − 2(9.81)h, so h = 20.4 m. Time up: v = u + at gives 0 = 20 − 9.81t, so t = 2.04 s; total flight = 2 × 2.04 = 4.08 s (the motion is symmetric when the landing height equals the launch height).</p>
<p><strong>Question 3 (WPH13, 4 marks).</strong> A student measures the period of a pendulum as T = 1.98 ± 0.02 s and the length as L = 98.0 ± 0.5 cm. Calculate the percentage uncertainty in g if g = 4π²L/T².</p>
<p>Answer: Percentage uncertainty in L = 0.5/98.0 × 100 = 0.51 per cent. In T = 0.02/1.98 × 100 = 1.01 per cent, doubled for T² = 2.02 per cent. Total for g = 0.51 + 2.02 = 2.5 per cent. The period dominates, so timing more oscillations would improve the result most.</p>
<p><strong>Question 4 (WPH11, 3 marks).</strong> A projectile is launched at 30 m s⁻¹ at 30° above the horizontal. Find its initial horizontal and vertical velocity components.</p>
<p>Answer: Horizontal = 30 cos 30° = 26 m s⁻¹; vertical = 30 sin 30° = 15 m s⁻¹. The horizontal component stays constant (no air resistance); the vertical component decreases at 9.81 m s⁻².</p>
<p><strong>Question 5 (WPH13, 3 marks).</strong> A graph of extension against load does not pass through the origin. Suggest a reason and an improvement.</p>
<p>Answer: The spring may already have been loaded (its own weight or an unstated mass), or the initial length was measured incorrectly. Measure the spring's original length hanging vertically with no added load, allow it to settle, and take that as the true zero extension; repeat readings at each load and plot a best-fit line.</p>
<p><strong>Question 6 (WPH11, 3 marks).</strong> Explain, in terms of forces, why a skydiver reaches a terminal velocity before opening the parachute.</p>
<p>Answer: On leaving the aircraft, weight exceeds drag, so there is a downward resultant force and she accelerates. As speed increases, drag increases, reducing the resultant force and the acceleration. When drag equals the weight the resultant force is zero, so the acceleration is zero and she continues at constant terminal velocity.</p>
<p>Motion is caused by forces — the subject of Dynamics.</p>
`,

    "78b026c5-7368-43c8-a8bb-0b19b9be584d": `
<h2>AS Level Physics: Dynamics</h2>
<p>Edexcel International A Level Physics, Unit 1 (WPH11) Mechanics and Materials — Newton's laws of motion, the conservation of linear momentum, and the behaviour of objects moving through fluids (density, upthrust, viscous drag and terminal velocity). Dynamics answers the question kinematics asks: what makes motion change? The laws are three sentences long and everything else in the unit is their application, so they must be known exactly — including the conditions under which momentum is conserved.</p>

<h3>Force and Newton's laws of motion</h3>
<p>A force is a push or a pull, measured in newtons (N), and it is a vector. Forces change velocity (they accelerate masses) or change shape. The three laws, in their examinable form:</p>
<ul>
<li><strong>Newton's first law</strong>: a body remains at rest or moves with constant velocity in a straight line unless acted on by a resultant external force. It defines inertia — the reluctance of mass to change its state of motion.</li>
<li><strong>Newton's second law</strong>: the resultant force on a body equals the rate of change of its momentum, in the direction of that force. For constant mass this reduces to F = ma.</li>
<li><strong>Newton's third law</strong>: when body A exerts a force on body B, body B exerts an equal and opposite force on A. The pair acts on different bodies, always along the same line, and is always the same type of force (gravavitational on gravitational, contact on contact).</li>
</ul>
<pre><code>resultant force = mass x acceleration        F = m a</code></pre>
<ul>
<li>F: resultant force in newtons (N); m: mass in kilograms (kg); a: acceleration in metres per second squared (m s⁻²). Acceleration is in the direction of the resultant force.</li>
</ul>
<p><strong>Free-body diagrams</strong> are the first mark of nearly every dynamics answer: draw one body, with every force acting on it as an arrow from its centre, labelled (weight, normal reaction, tension, friction, drag, thrust). Resolve the forces along and perpendicular to the direction of motion, apply F = ma along the motion, and use equilibrium (zero resultant) perpendicular to it.</p>
<p>Mass is the quantity of matter and is constant; weight is the gravitational force on that mass, W = mg, and varies with location. The third law pair to an object's weight is the gravitational pull of the object on the Earth — not the normal contact force of the table beneath it.</p>

<h3>Momentum and its conservation</h3>
<p>Momentum is the product of mass and velocity:</p>
<pre><code>momentum = mass x velocity        p = m v</code></pre>
<ul>
<li>p: momentum in kilogram metres per second (kg m s⁻¹). Momentum is a vector, in the direction of velocity; with a stated sign convention, momenta in opposite directions carry opposite signs.</li>
<li>Newton's second law in full form: F = (mv − mu)/t, the rate of change of momentum.</li>
</ul>
<p>The <strong>principle of conservation of linear momentum</strong>: when no external resultant force acts on a system, the total momentum of that system remains constant. Collisions, explosions and recoil problems all reduce to one equation: total momentum before = total momentum after, summed as vectors. The condition matters — a ball bouncing off a floor is not momentum-conserving for the ball alone, because the Earth supplies an external force during the bounce.</p>
<pre><code>impulse = change in momentum = force x time        F t = m v - m u</code></pre>
<ul>
<li>Impulse is measured in newton seconds (N s), numerically equal to the momentum change. A force–time graph has an area equal to the impulse; extending the time of impact reduces the peak force for the same impulse — crumple zones, air bags, landing on a bent knee.</li>
</ul>

<h3>Elastic and inelastic collisions</h3>
<p>Momentum is conserved in every collision (in an isolated system); kinetic energy is not. A collision is <strong>elastic</strong> when the total kinetic energy is conserved — idealised gas molecules, and perfectly elastic springs. It is <strong>inelastic</strong> when kinetic energy is lost to deformation, heat and sound; a collision in which the bodies stick together is <strong>completely inelastic</strong>, and that is the case where the kinetic energy loss is greatest. Explosions convert stored energy (chemical or elastic) into kinetic energy of the fragments, so the total momentum is conserved while the kinetic energy increases.</p>

<h3>Equilibrium and connected bodies</h3>
<p>A body is in <strong>equilibrium</strong> when the resultant force and the resultant moment on it are both zero: it is either at rest or moving with constant velocity. The method is always the same — draw the free-body diagram, resolve along and across the direction of motion, and set the resultant to zero in each direction. For a mass hanging from a string, the tension equals the weight; for a block resting on a slope, the weight resolves into mg sin θ down the slope and mg cos θ into the slope, and the normal reaction balances the latter while friction can balance the former.</p>
<p><strong>Friction</strong> acts parallel to a surface and opposes the motion or the tendency to move. The maximum frictional force before slipping is proportional to the normal contact force: F(friction) = mu R, where mu is the coefficient of friction (dimensionless) and R is the normal reaction in newtons. Static friction below that maximum simply matches the applied force, which is why a block on a gentle slope stays put.</p>
<p><strong>Connected bodies</strong> share one acceleration, so the fastest method treats the system as a whole first and then separates it. Two masses (3.0 kg and 2.0 kg) joined by a light string over a frictionless pulley accelerate together: the resultant force on the system is the difference in weights, 1.0g, so a = 1.0g/5.0 = 1.96 m s⁻². Cutting the system then gives the tension in the string: for the 3.0 kg mass, 3.0g − T = 3.0a, so T = 23.5 N. The same two answers must hold whichever mass is isolated — a built-in check on the arithmetic.</p>

<h3>Fluids: density, upthrust and viscous drag</h3>
<p>A fluid is a liquid or a gas, and objects moving through fluids experience forces that solids never show. <strong>Density</strong> is mass per unit volume, ρ = m/V (kg m⁻³). An object immersed in a fluid is pushed up by an <strong>upthrust</strong> equal to the weight of fluid displaced (Archimedes' principle), so an object denser than the fluid sinks and one less dense floats; a floating object displaces its own weight of fluid.</p>
<p><strong>Viscous drag</strong> is the friction within a fluid: layers of fluid slide over each other and over the object, and the drag grows with speed, viscosity and size. For a small sphere falling slowly through a viscous fluid, Stokes' law gives the drag:</p>
<pre><code>viscous drag = 6 pi x viscosity x radius x speed        F = 6 pi eta r v</code></pre>
<ul>
<li>F: drag force in newtons (N); eta: viscosity of the fluid in pascal seconds (Pa s); r: radius of the sphere in metres (m); v: speed in metres per second (m s⁻¹). The force acts opposite to the direction of motion.</li>
</ul>
<p>A falling sphere accelerates until drag + upthrust = weight, and then falls at <strong>terminal velocity</strong>, which from Stokes' law is v = 2r²(ρ − σ)g/(9η) for a sphere of density ρ in a fluid of density σ. Terminal velocity is reached quickly for small dense spheres in viscous fluids — the principle of the falling-ball viscometer, one of the unit's core practicals. At low speeds the flow around a sphere is smooth and layered (<strong>laminar</strong>); above a critical speed it becomes chaotic (<strong>turbulent</strong>), and the drag then rises more steeply with speed. Streamlining delays the onset of turbulence, which is why a golf ball has dimples and a car is shaped the way it is.</p>

<h3>Worked example: collision and impulse</h3>
<p>A 1200 kg car travelling at 20 m s⁻¹ collides with a stationary 900 kg car and they move together. Find their common velocity and the energy lost.</p>
<pre><code>momentum before = 1200 x 20 = 24 000 kg m s-1
common velocity = 24 000 / (1200 + 900) = 11.4 m s-1
KE before = 1/2 x 1200 x 20^2 = 240 000 J
KE after = 1/2 x 2100 x 11.4^2 = 136 000 J
energy lost = 104 000 J (to deformation, heat and sound)</code></pre>
<p>Momentum is conserved; kinetic energy is not — the collision is inelastic. Second stage: if the impact lasts 0.15 s, the average force on the stationary car is F = mv/t = 900 × 11.4 / 0.15 = 68 400 N, and lengthening the impact with a crumple zone would cut that force sharply.</p>

<h3>Common mistakes</h3>
<ul>
<li>Using F = ma with one force instead of the resultant; draw the free-body diagram and resolve first.</li>
<li>Writing third-law pairs that act on the same body (they never do) or that are different kinds of force.</li>
<li>Ignoring direction in momentum problems; a rebound reverses the velocity sign and the total is a vector sum.</li>
<li>Assuming kinetic energy is conserved in every collision; only elastic collisions conserve it, and sticking collisions lose the most.</li>
<li>Forgetting upthrust when a body moves through a fluid: terminal velocity is reached when drag + upthrust = weight, not when drag = weight, if the fluid's density is not negligible.</li>
<li>Using Stokes' law outside its conditions — it assumes laminar flow, slow speeds and a spherical object.</li>
<li>Confusing mass and weight in W = mg, or using g in m s⁻² when the question gives g in N kg⁻¹ (numerically equal but state your units).</li>
<li>Quoting an impulse as a force: impulse is N s and equals the momentum change; the force depends on the impact time.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (WPH11, 3 marks).</strong> A 4.0 kg trolley on a frictionless runway is pulled by a 12 N force. Calculate its acceleration and the distance travelled in 3.0 s from rest.</p>
<p>Answer: a = F/m = 12/4.0 = 3.0 m s⁻². s = ½at² = ½ × 3.0 × 9.0 = 13.5 m ≈ 14 m.</p>
<p><strong>Question 2 (WPH11, 4 marks).</strong> A 60 g ball moving at 5.0 m s⁻¹ hits a wall at right angles and rebounds at 3.0 m s⁻¹. The contact lasts 0.020 s. Calculate the average force.</p>
<p>Answer: Taking the initial direction as positive, Δp = 0.060(−3.0) − 0.060(5.0) = −0.48 kg m s⁻¹. Force = Δp/t = −0.48/0.020 = −24 N, i.e. 24 N opposite to the initial motion.</p>
<p><strong>Question 3 (WPH11, 4 marks).</strong> Two ice skaters push apart. Skater A (60 kg) moves at 3.0 m s⁻¹. Find the velocity of skater B (75 kg) and explain which principle you used.</p>
<p>Answer: Total momentum before = 0, so 60 × 3.0 + 75 × v = 0 and v = −2.4 m s⁻¹: B moves at 2.4 m s⁻¹ in the opposite direction. The conservation of linear momentum applies because the push is an internal force; the ice's friction is negligible during the push.</p>
<p><strong>Question 4 (WPH11, 3 marks).</strong> Explain why a small steel ball bearing falling through glycerine reaches terminal velocity, and state the forces acting at that moment.</p>
<p>Answer: As the ball accelerates, the viscous drag rises with speed (F = 6πηrv). The resultant force is weight minus drag minus upthrust, so the acceleration falls as speed rises. When drag + upthrust equals the weight the resultant force is zero and the ball continues at constant terminal velocity, acted on by three balanced forces: weight down, upthrust and drag up.</p>
<p><strong>Question 5 (WPH13, 3 marks).</strong> Describe how you would determine the viscosity of a liquid using a falling-ball method.</p>
<p>Answer: Drop a small steel sphere (radius measured with a micrometer) into a wide measuring cylinder of the liquid and time its fall between two marked lines, where it is already at terminal velocity. Repeat and average the times; calculate v = distance/time. At terminal velocity, 6πηrv = (4/3)πr³(ρ − σ)g, so η = 2r²(ρ − σ)g/(9v). Keep the temperature constant (viscosity depends strongly on it) and use a cylinder at least ten sphere diameters wide to avoid wall effects.</p>
<p><strong>Question 6 (WPH11, 3 marks).</strong> A 1500 kg car hits a crash barrier at 15 m s⁻¹ and stops in 0.30 s. Calculate the average force on the car and state one safety feature that reduces this force.</p>
<p>Answer: F = mv/t = 1500 × 15 / 0.30 = 75 000 N = 75 kN. A crumple zone extends the impact time, and for the same momentum change the force falls in proportion to the time.</p>
<p>Forces also change shape — the subject of Materials and Deformation.</p>
`,

    "eff91bce-733f-4869-933f-f449fc857e90": `
<h2>AS Level Physics: Materials and Deformation</h2>
<p>Edexcel International A Level Physics, Unit 1 (WPH11) Mechanics and Materials — Hooke's law, stress and strain, Young modulus, elastic and plastic behaviour, and elastic strain energy. This is where mechanics meets the laboratory: the definitions are precise, the graphs carry most of the marks, and the measurement of Young modulus is one of the unit's core practicals and a favourite of WPH13.</p>

<h3>Hooke's law</h3>
<p>Stretch a spring and it extends; double the load and (at first) the extension doubles. That proportionality is Hooke's law:</p>
<pre><code>force = spring constant x extension        F = k x</code></pre>
<ul>
<li>F: load in newtons (N); k: spring constant (the stiffness) in newtons per metre (N m⁻¹); x: extension in metres (m), where extension = loaded length − original length. Extension is positive for stretching and negative for compression.</li>
<li>The law holds only up to the <strong>limit of proportionality</strong>: beyond it the load–extension graph curves, and past the <strong>elastic limit</strong> the material is permanently deformed — the extension remains when the load is removed.</li>
</ul>
<p>A load–extension graph is a straight line through the origin up to the limit of proportionality, and its gradient is the spring constant. Springs in series share the load and add their extensions (1/k = 1/k₁ + 1/k₂); springs in parallel share the load and add their spring constants. Hooke's law applies to all elastic materials, not just coils: a wire, a beam and a rubber band all show the same initial proportionality.</p>

<h3>Stress and strain</h3>
<p>Extension depends on the size of the sample as well as the material, so materials are compared using quantities that are independent of dimensions. <strong>Stress</strong> is the force per unit cross-sectional area; <strong>strain</strong> is the extension per unit original length:</p>
<pre><code>tensile stress = force / cross-sectional area        sigma = F / A
tensile strain = extension / original length        epsilon = x / L</code></pre>
<ul>
<li>Stress (sigma): pascals (Pa = N m⁻²); strain (epsilon): dimensionless, often quoted as a percentage. Both are scalars in a tensile test, but the sign distinguishes tension (positive) from compression (negative).</li>
<li>A: cross-sectional area in square metres (m²); L: original length in metres (m); x: extension in metres (m).</li>
</ul>
<p>Strain has no unit because it is a ratio of two lengths — a common examination trap. Engineering strain uses the original length; so does the AS definition.</p>

<h3>Young modulus</h3>
<p>The stiffness of a material itself, as opposed to a particular sample, is Young modulus:</p>
<pre><code>Young modulus = stress / strain        E = sigma / epsilon = F L / (A x)</code></pre>
<ul>
<li>E: Young modulus in pascals (Pa), usually quoted in gigapascals (1 GPa = 10⁹ Pa). Steel is about 200 GPa, aluminium about 70 GPa, rubber about 0.01 GPa.</li>
<li>E is the gradient of the straight-line (linear) portion of the stress–strain graph, and it is constant for a given material within the limit of proportionality.</li>
</ul>
<p><strong>Measuring Young modulus (core practical).</strong> A long steel wire is clamped at one end, loaded with known masses over a pulley, and its extension measured with a travelling microscope, a vernier scale or an extensometer attached directly to the wire. The long wire is deliberate: a 2 m wire stretches far more than a 30 cm one for the same stress, so the percentage uncertainty in the extension is small. Diameter is measured with a micrometer at several points and orientations and averaged, because A = πd²/4 and the diameter enters squared. Plot load against extension; the gradient is k, and E = FL/(Ax) is evaluated from the gradient and the measured dimensions. The procedure repeats the readings, checks the wire returns to its original length (elastic region), and keeps the load below the limit of proportionality.</p>

<h3>Stress–strain and load–extension graphs</h3>
<table border="1" cellpadding="6">
<tr><th>Feature</th><th>Meaning</th></tr>
<tr><td>Initial straight line</td><td>Elastic deformation: stress is proportional to strain; gradient = Young modulus; unloaded material returns to its original length</td></tr>
<tr><td>Limit of proportionality</td><td>End of the straight line: stress and strain are no longer proportional</td></tr>
<tr><td>Elastic limit</td><td>Beyond this point deformation is plastic: permanent set remains after unloading</td></tr>
<tr><td>Yield point</td><td>A sudden large extension for little extra load; the material flows</td></tr>
<tr><td>Ultimate tensile stress</td><td>The maximum stress on the graph, where necking begins (the wire thins locally)</td></tr>
<tr><td>Fracture point</td><td>The wire breaks</td></tr>
</table>
<p>The area under a load–extension graph is the work done in stretching the sample; the area under a stress–strain graph is the energy stored per unit volume. Material types read straight off the graph: a <strong>ductile</strong> material (copper) has a long plastic region before breaking; a <strong>brittle</strong> material (glass, cast iron) fractures with little plastic deformation; a <strong>polymeric</strong> material (rubber) shows a long, curved elastic region and large strain at low stress.</p>

<h3>Elastic strain energy</h3>
<p>Work must be done to stretch a material, and while the deformation is elastic that work is stored as elastic strain (potential) energy in the stretched bonds:</p>
<pre><code>elastic strain energy = 1/2 x force x extension        E = 1/2 F x = 1/2 k x^2</code></pre>
<ul>
<li>E: energy in joules (J); F: load in newtons (N); x: extension in metres (m); k: spring constant in newtons per metre (N m⁻¹).</li>
<li>It equals the area under the load–extension graph (a triangle, ½ × base × height), and the energy per unit volume is the area under the stress–strain graph, ½ × stress × strain in the linear region.</li>
</ul>
<p>This is why an elastic band gets warm when stretched repeatedly — hysteresis — and why a bow stores energy in its limbs. On release, the stored energy converts to kinetic energy: ½kx² = ½mv² gives the launch speed of a spring-loaded trolley.</p>

<h3>Unit 3 skills: uncertainty in a materials experiment</h3>
<p>WPH13 regularly uses a materials experiment as the context for data-analysis questions. The skills it marks:</p>
<ul>
<li>Choosing instruments to match the expected size of the quantity (micrometer for wire diameter, vernier or extensometer for extension), and explaining why (small quantities carry large percentage uncertainties otherwise).</li>
<li>Percentage uncertainty propagation for E = FL/(Ax): add the percentage uncertainties of F, L, A and x, remembering that A ∝ d² so the diameter's percentage uncertainty is doubled.</li>
<li>Error bars on both axes, best-fit line, and the uncertainty in the gradient from the steepest and shallowest lines through the error bars.</li>
<li>Control variables: same wire material and diameter throughout, same temperature, avoid overloading beyond the elastic limit, allow the wire to settle before each reading.</li>
<li>Safety: long wires under heavy loads store large energies and can snap — wear eye protection, stand behind a barrier, use a safety cage on the pulley, add masses gently.</li>
</ul>

<h3>Worked example: Young modulus and its uncertainty</h3>
<p>A steel wire of length 1.80 m and diameter 0.40 mm extends 2.1 mm under a load of 60 N.</p>
<pre><code>area = pi d^2 / 4 = 3.14 x (0.00040)^2 / 4 = 1.26 × 10⁻⁷ m²
stress = F / A = 60 / 1.26 × 10⁻⁷ = 4.8 × 10⁸ Pa
strain = x / L = 0.0021 / 1.80 = 1.17 × 10⁻³
Young modulus = stress / strain = 4.8 × 10⁸ / 1.17 × 10⁻³ = 4.1 × 10¹¹ Pa (about 400 GPa)</code></pre>
<p>A sanity check flags the result: steel is about 200 GPa, so a value of 400 GPa suggests an error — in fact the extension here is half the realistic value, which is exactly the sort of conclusion an evaluation question wants. Uncertainties: with the extension measured as 2.1 ± 0.1 mm its percentage uncertainty is 4.8 per cent; the diameter 0.40 ± 0.01 mm gives 2.5 per cent, doubled to 5.0 per cent through d²; the length contributes about 0.3 per cent. The total is about 10 per cent, dominated by the extension — so an extensometer rather than a ruler would improve the result most.</p>

<h3>Common mistakes</h3>
<ul>
<li>Confusing the spring constant (a property of a particular spring, N m⁻¹) with Young modulus (a property of a material, Pa).</li>
<li>Using the stretched length instead of the original length in strain, or forgetting to square the diameter when finding the cross-sectional area.</li>
<li>Quoting strain with a unit; it is dimensionless.</li>
<li>Applying E = FL/(Ax) or F = kx beyond the limit of proportionality.</li>
<li>Forgetting the ½ in elastic strain energy: the load rises from zero linearly, so the work is the triangle's area, not the full rectangle.</li>
<li>Reading the gradient of a load–extension graph as Young modulus; Young modulus is the gradient of stress against strain. Convert first.</li>
<li>Missing that A = πd²/4 means the diameter's uncertainty doubles in the final percentage.</li>
<li>Assuming a brittle material stores much energy before fracture; the area under its graph is tiny.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (WPH11, 3 marks).</strong> A 2.0 N load stretches a spring from 12.0 cm to 15.0 cm. Calculate the spring constant and the extension produced by a 5.0 N load.</p>
<p>Answer: Extension = 3.0 cm = 0.030 m, so k = F/x = 2.0/0.030 = 67 N m⁻¹. With 5.0 N, x = F/k = 5.0/67 = 0.075 m = 7.5 cm (assuming the limit of proportionality is not exceeded).</p>
<p><strong>Question 2 (WPH11, 4 marks).</strong> A copper wire of length 2.00 m and cross-sectional area 0.50 mm² is loaded with 100 N and extends 1.2 mm. Calculate the stress, the strain and Young modulus.</p>
<p>Answer: Stress = F/A = 100 / (0.50 × 10⁻⁶) = 2.0 × 10⁸ Pa. Strain = x/L = 0.0012/2.00 = 6.0 × 10⁻⁴. Young modulus = 2.0 × 10⁸ / 6.0 × 10⁻⁴ = 3.3 × 10¹¹ Pa ≈ 330 GPa.</p>
<p><strong>Question 3 (WPH13, 4 marks).</strong> Explain why a long thin wire is used to measure Young modulus, and why the diameter is measured at several positions.</p>
<p>Answer: The extension is proportional to length and inversely proportional to area, so a long thin wire gives a measurable extension under a modest load, keeping the percentage uncertainty in the extension small. The diameter is measured at several positions and in two perpendicular directions and averaged, because the wire's diameter is not perfectly uniform and the area depends on d², so a single unrepresentative measurement would skew the result.</p>
<p><strong>Question 4 (WPH11, 3 marks).</strong> A spring of constant 400 N m⁻¹ is compressed by 0.12 m. Calculate the elastic potential energy stored and the speed it can give to a 0.50 kg ball.</p>
<p>Answer: E = ½kx² = ½ × 400 × 0.0144 = 2.9 J. Setting ½mv² = 2.9 gives v = √(2 × 2.9/0.50) = 3.4 m s⁻¹.</p>
<p><strong>Question 5 (WPH11, 4 marks).</strong> Describe the difference between elastic and plastic deformation, and explain how a stress–strain graph shows which is occurring.</p>
<p>Answer: In elastic deformation the atoms are displaced slightly from their equilibrium spacing and return when the load is removed, so no permanent change occurs; the stress–strain graph is a straight line whose gradient is Young modulus. In plastic deformation the atomic planes slide over one another, so the material is permanently changed when unloaded; on the graph this is beyond the elastic limit, where the line curves and the strain grows faster than the stress. The limit of proportionality marks the end of the linear region; the elastic limit marks the onset of permanent set.</p>
<p><strong>Question 6 (WPH13, 3 marks).</strong> A student's value of Young modulus is 30 per cent below the accepted value. Suggest two likely sources of error.</p>
<p>Answer: The extension was measured with a ruler over too short a gauge length, underestimating it (a systematic underestimate of extension gives an underestimate of E); the wire may already have been stretched beyond its elastic limit on earlier runs, giving extra extension for the same load. Use an extensometer over a longer gauge length, keep loads within the elastic region, and take repeated readings at each load.</p>
<p>Unit 1's remaining strand — energy, power and turning effects — continues the mechanics.</p>
`,
  },
};
