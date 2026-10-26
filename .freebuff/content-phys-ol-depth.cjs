// Physics OL notes, deepened to the estate depth bar (Cambridge IGCSE Physics
// 0625, 2026-2028, Topic 1 Motion, forces and energy: statements 1.2, 1.3, 1.5,
// 1.6, 1.7, 1.4 and 1.8). Batch 1 of the physics writing queue in
// docs/notes-depth.md. Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-phys-ol-depth.cjs > .freebuff-tmp/phys-ol-depth.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phys-ol-depth.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phys-ol-depth.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs physics OL
module.exports = {
  expectType: "notes",
  titles: {
    "e08e10e6-d123-407a-877f-dcc7c82c3d5b": "IGCSE Physics: Forces and Motion",
    "d371087c-b171-4536-ae7e-16eadfdba067": "IGCSE Physics: Energy, Work and Power",
    "61da5c21-d745-4a51-ba0c-2a861af41061": "IGCSE Physics: Pressure and Density",
  },
  rows: {
    "e08e10e6-d123-407a-877f-dcc7c82c3d5b": `
<h2>IGCSE Physics: Forces and Motion</h2>
<p>Cambridge IGCSE Physics 0625 (2026–2028), Topic 1 Motion, forces and energy: statements 1.2 Motion, 1.3 Mass and weight, 1.5 Forces and 1.6 Momentum. This is the mechanics spine of the whole course, and it is where the Paper 4 structured calculation marks are won and lost. Almost every mechanics question begins the same way: label the velocities, find the resultant force, then choose the equation. The ideas below are built from absolute zero, but the definitions are examinable word for word, so learn them exactly as stated.</p>

<h3>Speed, velocity and acceleration</h3>
<p>Start with an analogy. A car's speedometer tells you how fast the car is covering ground; it says nothing about which way the car points. That everyday reading is <strong>speed</strong>. Add a compass direction to it and you have <strong>velocity</strong>. Speed is a scalar (size only); velocity is a vector (size and direction), and that single distinction runs through the entire course.</p>
<table border="1" cellpadding="6">
<tr><th>Quantity</th><th>Definition</th><th>Symbol and unit</th><th>Scalar or vector</th></tr>
<tr><td>Distance</td><td>Total length of the path travelled</td><td>s, metre (m)</td><td>Scalar</td></tr>
<tr><td>Displacement</td><td>Distance in a stated straight-line direction from a start point</td><td>s, metre (m)</td><td>Vector</td></tr>
<tr><td>Speed</td><td>Distance travelled per unit time</td><td>v, metre per second (m s⁻¹)</td><td>Scalar</td></tr>
<tr><td>Velocity</td><td>Rate of change of displacement, i.e. speed in a stated direction</td><td>v, metre per second (m s⁻¹)</td><td>Vector</td></tr>
<tr><td>Acceleration</td><td>Rate of change of velocity</td><td>a, metre per second squared (m s⁻²)</td><td>Vector</td></tr>
</table>
<p>The two equations every question uses are:</p>
<pre><code>average speed = total distance travelled / total time taken        v = s / t
acceleration = (final velocity - initial velocity) / time taken    a = (v - u) / t</code></pre>
<p>Here u is the initial velocity, v is the final velocity, and t is the time taken. The SI units must be metres, seconds and metres per second before the equations are used; convert kilometres to metres and minutes to seconds first. The sign convention is the student's choice but must be stated: pick one direction as positive (upwards or forwards is usual), then velocities and accelerations in the opposite direction are negative. A negative acceleration that slows an object is often called a deceleration. An object thrown upwards has g = 9.81 m s⁻² downwards throughout its flight, so if up is positive its acceleration is −9.81 m s⁻² at every point, including the instant it stops at the top.</p>
<p><strong>Average speed over a whole journey is not the average of the speeds.</strong> It is total distance divided by total time, so a car that covers 100 km at 50 km h⁻¹ and the next 100 km at 100 km h⁻¹ has an average speed of 200 km in 3 hours, which is 67 km h⁻¹, not 75 km h⁻¹.</p>

<h3>Describing motion with graphs</h3>
<p>Graphs are the language of this topic, and Paper 4 nearly always carries one. Two kinds do all the work.</p>
<table border="1" cellpadding="6">
<tr><th>Feature</th><th>Distance–time graph</th><th>Speed–time graph</th></tr>
<tr><td>Gradient</td><td>Speed (or velocity)</td><td>Acceleration</td></tr>
<tr><td>Area under the graph</td><td>Not meaningful</td><td>Distance travelled</td></tr>
<tr><td>Horizontal line</td><td>Object at rest</td><td>Constant speed, zero acceleration</td></tr>
<tr><td>Straight sloping line</td><td>Constant speed</td><td>Constant acceleration</td></tr>
<tr><td>Curve</td><td>Changing speed (draw a tangent to find the speed at a point)</td><td>Changing acceleration</td></tr>
</table>
<p>On a distance–time graph the gradient is the distance moved divided by the time taken, which is the speed. On a speed–time graph the gradient is the change in speed divided by the time taken, which is the acceleration, and the area under the graph is made of rectangles (speed × time = distance) and triangles (½ × base × height), so it gives the total distance travelled. Drawing a tangent to a curve at a point is a Paper 6 skill: place the ruler so it just touches the curve, extend the line well past the curve on both sides, and take two distant points on the tangent to work out its gradient.</p>
<p><strong>Paper 6 link.</strong> A trolley pulled by a falling mass leaves dots on ticker tape from a 50 Hz timer, so consecutive dots are 0.02 s apart. The distance between successive dots gives the speed over that interval, and a speed–time graph of those speeds has a gradient equal to the trolley's acceleration. Measuring a short distance with a ruler and dividing by 0.02 s is exactly the averaging technique in statement 1.1.</p>

<h3>Mass, weight and gravitational field strength</h3>
<p>Mass is the amount of matter in an object, measured in kilograms with a balance. It does not change wherever the object is taken: the mass of an astronaut is the same on the Moon as on Earth. Weight is the force of gravity on that mass, measured in newtons with a spring balance, and it is a vector because gravity always pulls towards the centre of the attracting body. The astronaut's weight on the Moon is about one sixth of that on Earth because the Moon's gravitational field is weaker.</p>
<pre><code>weight = mass x gravitational field strength        W = m g</code></pre>
<ul>
<li>W: weight in newtons (N). Weight is a vector, and its direction is straight down towards the centre of the Earth.</li>
<li>m: mass in kilograms (kg). Mass is a scalar.</li>
<li>g: gravitational field strength in newtons per kilogram (N kg⁻¹); on Earth g ≈ 9.81 N kg⁻¹, which is numerically the same as the free-fall acceleration 9.81 m s⁻².</li>
</ul>
<p>Examination questions give the value of g to use, and many IGCSE papers round it to 10 N kg⁻¹ to keep the arithmetic simple. Always use the value printed in the question, and quote it in your answer when you substitute. Never confuse the two instruments: a balance compares masses and would give the same reading on the Moon, while a newton meter compares weights and would not.</p>

<h3>Forces and their effects</h3>
<p>A force is a push or a pull, measured in newtons, and it is a vector: direction matters. Forces can change an object's speed, change its direction of travel, or change its shape. <strong>Newton's first law</strong> states that an object remains at rest, or continues at constant velocity in a straight line, unless a resultant (net) force acts on it. Motion only changes when forces are unbalanced; a book resting on a table has weight and an equal upward normal contact force acting on it, so its resultant force is zero and it does not accelerate.</p>
<p>The <strong>resultant force</strong> is the single force that has the same effect as all the real forces combined. Two people pushing a trolley the same way add; pushing opposite ways subtract; forces at right angles combine by Pythagoras on the diagonal (Supplement). Newton's second law, in the form examined at IGCSE, is a Supplement statement:</p>
<pre><code>resultant force = mass x acceleration        F = m a</code></pre>
<ul>
<li>F: resultant force in newtons (N), positive in the chosen positive direction.</li>
<li>m: mass in kilograms (kg).</li>
<li>a: acceleration in metres per second squared (m s⁻²), in the same direction as F.</li>
</ul>
<p>The equation only works with the <strong>resultant</strong> force and only in SI units. If a car's engine produces 3000 N while drag is 1000 N, the resultant is 2000 N, and it is that 2000 N that goes into F = ma.</p>
<p><strong>Friction and drag.</strong> Friction acts where surfaces touch and always opposes the motion or the tendency to move. Drag (air resistance or water resistance) opposes motion through a fluid and grows as the speed grows. A falling object released from rest therefore accelerates at first, because weight exceeds drag; as speed rises, drag rises until it equals the weight. From that moment the resultant force is zero, the acceleration is zero, and the object falls at <strong>terminal velocity</strong>. This is a Supplement explanation and it is a regular Paper 4 six-mark question: describe the motion in stages and use the words resultant force, drag and terminal velocity.</p>
<p><strong>Springs and extension.</strong> A load hung on a spring stretches it. The relationship is summarised on a load–extension graph: a straight line through the origin shows extension proportional to load, up to the limit of proportionality. The stiffness of the spring is its spring constant:</p>
<pre><code>force = spring constant x extension        F = k x</code></pre>
<ul>
<li>F: force applied to the spring in newtons (N).</li>
<li>k: spring constant in newtons per metre (N m⁻¹); larger k means a stiffer spring.</li>
<li>x: extension in metres (m). Extension = stretched length − original length, so it is a scalar in practice.</li>
</ul>
<p>Beyond the limit of proportionality the line curves: the spring is permanently deformed and does not return to its original length when the load is removed. Doubling the load doubles the extension only while the graph is still a straight line. Two identical springs in series share the load and stretch twice as far; in parallel they share the load and stretch half as far (Supplement).</p>

<h3>Turning effects of forces: moments</h3>
<p>A force that does not act through a pivot makes an object turn. The size of that turning effect is the moment of the force:</p>
<pre><code>moment of a force = force x perpendicular distance from the pivot        M = F d</code></pre>
<ul>
<li>M: moment in newton metres (N m). A moment is a vector in the sense that it turns clockwise or anticlockwise, and that sense must be carried through the calculation as a sign.</li>
<li>F: force in newtons (N).</li>
<li>d: perpendicular distance from the line of action of the force to the pivot in metres (m).</li>
</ul>
<p>The word perpendicular is the whole mark. If a 10 N force acts at 30° to a spanner handle, the moment uses the perpendicular component of the force, or equivalently the perpendicular distance. For an object in equilibrium the <strong>principle of moments</strong> applies: the sum of the clockwise moments about any pivot equals the sum of the anticlockwise moments, and the resultant force is zero. A see-saw balances when the anticlockwise moment of the near child equals the clockwise moment of the far child; moving either child outwards increases that child's moment without changing their weight. Two equal and opposite forces whose lines of action do not coincide form a couple, which produces rotation without translation, as when a steering wheel is turned with both hands.</p>

<h3>Centre of gravity and stability</h3>
<p>The centre of gravity of an object is the single point through which its entire weight may be taken to act. For a uniform object it is the geometric centre; for a lamina (a flat sheet) it can be found experimentally by the plumb-line method, which is a classic Paper 6 task: hang the lamina freely from one hole, hang a plumb line from the same pin, and mark the line; repeat from a second hole; the lines cross at the centre of gravity.</p>
<p>Stability depends on where that point sits relative to the base. An object topples when the line of action of its weight falls outside its base, because the weight then produces a resultant moment that overturns it. Wide bases and low centres of gravity make objects stable (racing cars carry ballast low; tall trucks are loaded low), and top-heavy objects with narrow bases topple easily.</p>

<h3>Momentum and impulse</h3>
<p>Momentum is the quantity of motion a moving object carries: a lorry at 20 m s⁻¹ is far harder to stop than a bicycle at the same speed. Momentum is a Supplement statement for 0625 and is a favourite for Paper 4 calculation questions.</p>
<pre><code>momentum = mass x velocity        p = m v
impulse = change in momentum = resultant force x time        F t = m v - m u</code></pre>
<ul>
<li>p: momentum in kilogram metres per second (kg m s⁻¹). Momentum is a vector, in the same direction as the velocity, so the sign convention chosen at the start must be applied to every velocity.</li>
<li>m: mass in kilograms (kg); v and u: final and initial velocity in metres per second (m s⁻¹), positive in the chosen positive direction.</li>
<li>Impulse: newton seconds (N s), equal to the change in momentum.</li>
</ul>
<p>The <strong>principle of conservation of momentum</strong>: in a closed system, where no external resultant force acts, the total momentum before an event equals the total momentum after it. Total means the vector sum: momenta in opposite directions carry opposite signs. This one statement solves collisions, explosions and recoil problems. Newton's second law in its full form is implied here: the resultant force equals the rate of change of momentum, F = (mv − mu)/t, which is why increasing the time of impact reduces the force for the same change in momentum — that is how airbags, crash barriers and landing on a bent knee work.</p>

<h3>Worked example: collision and impact force</h3>
<p><strong>Collision.</strong> A 1200 kg car travelling at 15 m s⁻¹ runs into a stationary 800 kg car and the two lock together. Find their common velocity. Take the first car's direction as positive.</p>
<pre><code>total momentum before = 1200 x 15 + 800 x 0 = 18 000 kg m s-1
total momentum after = (1200 + 800) v = 2000 v
2000 v = 18 000, so v = 9 m s-1, in the original direction</code></pre>
<p>The combined cars move at 9 m s⁻¹ in the direction the first car was travelling. Note that kinetic energy is not conserved in this collision — most of it is lost to sound and deformation — but momentum is always conserved.</p>
<p><strong>Impact force.</strong> A 0.50 kg ball travelling at 12 m s⁻¹ hits a wall and rebounds at 8 m s⁻¹ in the opposite direction. The contact lasts 0.050 s. Find the average force on the ball. Take the initial direction as positive, so the rebound velocity is −8 m s⁻¹.</p>
<pre><code>change in momentum = m v - m u = 0.50 x (-8) - 0.50 x 12 = -4.0 - 6.0 = -10 kg m s-1
average force = change in momentum / time = -10 / 0.050 = -200 N</code></pre>
<p>The minus sign shows the force acts opposite to the ball's initial motion, which is what a wall does. The magnitude is 200 N. Getting the sign of the rebound velocity wrong is the single most common error in this topic, and it doubles the answer.</p>

<h3>Common mistakes</h3>
<ul>
<li>Confusing mass and weight: mass is in kilograms and never changes; weight is in newtons and equals mg. A mass of 5 kg has a weight of about 50 N, not 5 kg.</li>
<li>Using the average of speeds for the average speed of a journey; it is always total distance over total time.</li>
<li>Reading the wrong quantity from a graph: gradient on a distance–time graph is speed, gradient on a speed–time graph is acceleration, and only the speed–time graph has a meaningful area.</li>
<li>Putting any force into F = ma. Only the resultant force gives the acceleration, so add and subtract the forces first.</li>
<li>Using a slanted distance in a moment calculation; d is measured perpendicular to the line of action of the force.</li>
<li>Losing the sign of a velocity in a momentum calculation. Reversal of direction is a sign change, and the total momentum is a vector sum, not a sum of sizes.</li>
<li>Using g = 9.81 when the question says take g = 10 N kg⁻¹, and forgetting to state which value was used.</li>
<li>Adding a force in newtons to a momentum in kg m s⁻¹; if the units do not match, the physics does not either.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> A cyclist starts from rest and reaches 8.0 m s⁻¹ in 5.0 s. Calculate the average acceleration and the distance travelled.</p>
<p>Answer: a = (v − u)/t = (8.0 − 0)/5.0 = 1.6 m s⁻². Distance = average speed × time = ½(0 + 8.0) × 5.0 = 20 m. (A speed–time graph of the motion is a triangle of area ½ × 5.0 × 8.0 = 20 m.)</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> A skydiver of mass 80 kg falls. Explain, using forces, why she reaches a terminal velocity, and state the size of the drag force at that moment.</p>
<p>Answer: Weight W = mg = 80 × 9.8 = 784 N downwards (≈ 800 N if g = 10 is taken). At first weight exceeds drag, so there is a downward resultant force and she accelerates. As speed increases, drag increases. When drag equals the weight the resultant force is zero, acceleration is zero, and she falls at constant terminal velocity. The drag force is then 784 N (or 800 N) upwards.</p>
<p><strong>Question 3 (Paper 2 style).</strong> Which statement about a ball thrown straight up is correct? A: its acceleration at the top is zero; B: its velocity at the top is zero; C: its momentum at the top is maximum; D: its weight is zero at the top. Answer: B. The velocity is instantaneously zero at the top, but g still acts there, so the acceleration is 9.81 m s⁻² downwards and the weight is unchanged. Paper 2 setters rely on this confusion between velocity and acceleration.</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> A 1500 kg car travelling at 20 m s⁻¹ brakes to a stop in 4.0 s. Calculate the braking force.</p>
<p>Answer: change in momentum = mv − mu = 1500 × 0 − 1500 × 20 = −30 000 kg m s⁻¹. Force = change in momentum / time = −30 000 / 4.0 = −7500 N. The braking force is 7500 N opposite to the motion.</p>
<p><strong>Question 5 (Paper 6 style).</strong> Describe how you would find the centre of gravity of an irregular lamina.</p>
<p>Answer: Hang the lamina from a pin through a hole near its edge so it swings freely. Hang a plumb line from the same pin and, when everything is at rest, mark the plumb-line position on the lamina. Repeat with the lamina hung from a second hole. The point where the two marked lines cross is the centre of gravity. The plumb line marks the vertical through the pivot, and the centre of gravity lies on it in both cases.</p>
<p><strong>Question 6 (Paper 4, 3 marks).</strong> A 0.20 kg ball moving at 6.0 m s⁻¹ collides with an identical ball at rest and stops dead. Find the velocity of the second ball after the impact.</p>
<p>Answer: total momentum before = 0.20 × 6.0 = 1.2 kg m s⁻¹. After the impact the first ball has zero momentum, so 0.20 × v = 1.2 and v = 6.0 m s⁻¹ in the original direction.</p>
<p>Momentum, moments and Newton's laws are the tools; the next step is what those forces actually do to energy.</p>
`,

    "d371087c-b171-4536-ae7e-16eadfdba067": `
<h2>IGCSE Physics: Energy, Work and Power</h2>
<p>Cambridge IGCSE Physics 0625 (2026–2028), Topic 1 Motion, forces and energy, statement 1.7 Energy, work and power. Energy is the currency of every physical process: it is never created or destroyed, only moved between stores and converted between forms. This note builds the whole idea from scratch — stores, transfers, the two energy equations, work, power, the world's energy resources and efficiency — because Paper 4 rewards candidates who can both calculate an energy change and explain where the energy went.</p>

<h3>Energy stores and transfers</h3>
<p>Think of energy as money held in different bank accounts. It can sit in a store, and it can move between stores along a transfer pathway, but the total across all accounts never changes. The examined stores and transfers are:</p>
<table border="1" cellpadding="6">
<tr><th>Energy store</th><th>What it means</th><th>Example</th></tr>
<tr><td>Kinetic</td><td>Energy of a moving object; more mass or more speed means more</td><td>A moving lorry</td></tr>
<tr><td>Gravitational potential</td><td>Energy stored by virtue of height in a gravitational field</td><td>A book on a shelf</td></tr>
<tr><td>Elastic potential</td><td>Energy stored by stretching, compressing or twisting</td><td>A drawn bow, a compressed spring</td></tr>
<tr><td>Thermal (internal)</td><td>Energy of the random motion of particles in a substance</td><td>Hot water in a kettle</td></tr>
<tr><td>Chemical</td><td>Energy stored in chemical bonds</td><td>Food, fuel, a battery</td></tr>
<tr><td>Nuclear</td><td>Energy stored in the nucleus of an atom</td><td>Uranium fuel</td></tr>
</table>
<p>The four transfer pathways are <strong>mechanical work</strong> (a force acting over a distance), <strong>heating</strong> (energy transferred by a temperature difference), <strong>radiation</strong> (energy carried by waves, mainly infrared and light) and <strong>electrical work</strong> (charge moving through a potential difference). When a ball is thrown upwards, chemical energy in the muscles does mechanical work on the ball, and that energy becomes kinetic; as the ball rises, kinetic becomes gravitational potential; as it falls back, gravitational potential becomes kinetic again; on impact the kinetic spreads into the thermal stores of the ball, the ground and the air, and some is radiated as sound.</p>

<h3>Conservation of energy and Sankey diagrams</h3>
<p>The law of conservation of energy states that energy cannot be created or destroyed, and the total energy in a closed system stays constant. This is the most powerful statement in the syllabus: whenever a question says a machine loses energy, it means the energy has been transferred to less useful stores, not destroyed. A Sankey diagram draws the total energy input as one wide arrow, splits it into useful output and wasted arrows, and is drawn so the arrow widths are proportional to the energies.</p>
<p><strong>Useful energy</strong> is the energy transferred to the store the device was designed to fill; <strong>wasted energy</strong> is transferred to stores that were not the goal, usually thermal energy of the surroundings, and it is eventually transferred to the environment, often by radiation. Wasted energy is not destroyed — it has simply become too spread out to be harnessed easily.</p>

<h3>Kinetic and gravitational potential energy</h3>
<p>Both equations are Supplement statements, and both appear constantly in Paper 4 calculations.</p>
<pre><code>kinetic energy = 1/2 x mass x speed squared        EK = 1/2 m v^2
gravitational potential energy = mass x gravitational field strength x height        EP = m g h</code></pre>
<ul>
<li>EK: kinetic energy in joules (J); m: mass in kilograms (kg); v: speed in metres per second (m s⁻¹). Energy is a scalar, so the speed is squared and the direction of travel does not matter.</li>
<li>EP: gravitational potential energy in joules (J); g: gravitational field strength in newtons per kilogram (N kg⁻¹, use the value given in the question); h: vertical height in metres (m), measured between the two positions being compared.</li>
</ul>
<p>Only the difference in height matters. Lifting a 2 kg book from a table to a shelf 0.50 m above it raises EP by 2 × 9.81 × 0.50 = 9.8 J, whatever the height of the room. The sign convention is simple: EP increases as an object rises and decreases as it falls, and the change is ΔEP = m g Δh.</p>
<p>Energy methods are often faster than forces and equations of motion. For a falling object with no air resistance, m g h = ½ m v², and the mass cancels: every object falls at the same rate in a vacuum. For a roller coaster of mass 500 kg dropping 20 m from rest, v = √(2 g h) = √(2 × 9.81 × 20) = 19.8 m s⁻¹.</p>

<h3>Work done</h3>
<p>Work is done when a force moves an object. It is energy transferred by mechanical work, and it is measured in joules:</p>
<pre><code>work done = force x distance moved in the direction of the force        W = F s</code></pre>
<ul>
<li>W: work done in joules (J). One joule is the work done when a force of 1 newton moves its point of application 1 metre in the direction of the force.</li>
<li>F: force in newtons (N); s: distance moved in metres (m), measured in the direction of the force.</li>
</ul>
<p>Work is a scalar, but the two quantities must line up: carrying a box horizontally at constant height does no work against gravity, because the motion is perpendicular to the weight. Pushing a trolley with 50 N against 20 N of friction over 4 m does 200 J of work in total, of which 80 J goes to heating the bearings and floor through friction and 120 J remains as kinetic energy. If you carry shopping upstairs, the work done against gravity is your weight multiplied by the vertical height gained, not the length of the staircase.</p>

<h3>Power</h3>
<p>Power measures how fast energy is transferred — the rate of doing work. A car engine that lifts the same load in half the time is twice as powerful.</p>
<pre><code>power = work done / time taken = energy transferred / time taken        P = W / t = E / t</code></pre>
<ul>
<li>P: power in watts (W). One watt is one joule per second (1 W = 1 J s⁻¹). A kilowatt is 1000 W.</li>
<li>W: work done in joules (J); E: energy transferred in joules (J); t: time taken in seconds (s).</li>
</ul>
<p>Power is a scalar. For a vehicle moving at constant speed against a constant force, the same idea gives P = F v (Supplement), with F in newtons and v in metres per second, giving watts directly. Doubling the speed of a car at constant driving force doubles the power needed; a car climbing a hill at constant speed needs power P = mgv sin θ to raise its weight.</p>

<h3>Energy resources and electricity generation</h3>
<p>Most electrical energy is generated the same way: a fuel heats water, the steam spins a turbine, and the turbine spins a generator that converts the kinetic energy of rotation into electrical energy. What differs is the energy store the heat comes from.</p>
<table border="1" cellpadding="6">
<tr><th>Resource</th><th>Store used</th><th>Advantages</th><th>Disadvantages</th></tr>
<tr><td>Coal, oil, gas (fossil fuels)</td><td>Chemical, burned to give heat</td><td>Reliable, cheap to run, existing infrastructure</td><td>Finite supply; carbon dioxide and pollutants released; contributes to climate change and acid rain</td></tr>
<tr><td>Biofuel</td><td>Chemical, from plant or animal material</td><td>Renewable; carbon dioxide released was recently absorbed by the plants</td><td>Land and water needed to grow crops; energy cost of farming and transport</td></tr>
<tr><td>Hydroelectric</td><td>Gravitational potential of stored water</td><td>Renewable, reliable, no fuel cost, no emissions in use</td><td>Dams flood valleys and disrupt habitats; high construction cost; depends on rainfall</td></tr>
<tr><td>Geothermal</td><td>Thermal energy inside the Earth</td><td>Renewable, reliable, small land use</td><td>Only practical near volcanic regions; drilling cost; possible release of underground gases</td></tr>
<tr><td>Nuclear fuel</td><td>Nuclear, released by fission</td><td>Very large energy per kilogram; no carbon dioxide in operation</td><td>Radioactive waste that must be stored safely for centuries; high decommissioning cost; accident risk</td></tr>
<tr><td>Solar cells</td><td>Light radiation converted directly to electricity</td><td>Renewable, silent, no emissions in use, low maintenance</td><td>Output varies with light and season; expensive to manufacture; large area needed for high output</td></tr>
<tr><td>Solar panels (heating)</td><td>Light radiation heating water directly</td><td>Renewable and cheap to run</td><td>Only heats water; ineffective at night and in cloudy climates</td></tr>
</table>
<p>Non-renewable resources exist in finite stock and are used faster than they form; renewable resources are replenished as they are used. Supplement statements add the deep connection: the Sun is the principal source for almost all of these resources. Sunlight drives the water cycle behind hydroelectric power and biofuels, heats the ground behind wind and geothermal gradients, and fossil fuels are the remains of organisms that grew in sunlight. The Sun releases energy by <strong>nuclear fusion</strong> of hydrogen into helium, and research into fusion on Earth aims to provide a fuel that is abundant and produces no long-lived radioactive waste, though sustained fusion power is still experimental.</p>

<h3>Efficiency</h3>
<p>Efficiency compares what a device delivers with what it is given:</p>
<pre><code>efficiency = useful energy output / total energy input
efficiency = useful power output / total power input</code></pre>
<p>Efficiency has no unit; multiply by 100 for a percentage. No real device is 100 per cent efficient, because some energy is always transferred to thermal stores of the surroundings by friction, resistance and radiation. A filament lamp is about 5 per cent efficient (most energy becomes heat, not light); an electric motor might reach 80 per cent. The most efficient heating device is a simple heater, because its useful output is thermal energy — the same store as its waste. A Sankey diagram makes this visible at a glance, and the arrows must sum to the total input.</p>

<h3>Worked example: lifting and efficiency</h3>
<p>A crane lifts a 500 kg load through 12 m at constant speed in 20 s. Take g = 9.81 N kg⁻¹.</p>
<pre><code>weight = m g = 500 x 9.81 = 4905 N
useful work = force x distance = 4905 x 12 = 58 860 J
useful power = work / time = 58 860 / 20 = 2943 W (about 2.9 kW)</code></pre>
<p>The motor takes 150 000 J of electrical energy to do this lift. Its efficiency is 58 860 / 150 000 = 0.39, or 39 per cent. The remaining 91 140 J is not destroyed: it warms the motor windings, the cables and the surrounding air.</p>
<p>Second stage, using energy conservation: if the load is dropped from rest through the same 12 m with negligible air resistance, m g h = ½ m v² gives v = √(2 × 9.81 × 12) = 15.3 m s⁻¹. The mass cancels, so any object dropped through 12 m reaches the same speed.</p>

<h3>Common mistakes</h3>
<ul>
<li>Saying energy is used up or lost; energy is transferred to other stores, and the total is conserved. Examiners award the mark for transferred, not lost.</li>
<li>Putting speed rather than speed squared into EK = ½mv², and forgetting the ½.</li>
<li>Measuring h in EP = mgh along a slope or a staircase; h is the vertical height difference.</li>
<li>Using the wrong mass in W = mg: the mass in kilograms, multiplied by g, never the weight in newtons multiplied by g again.</li>
<li>Confusing work done with power: joules measure energy, watts measure the rate of energy transfer.</li>
<li>Calculating efficiency as total in over useful out; the useful output goes on top, so efficiency is always less than 1.</li>
<li>Forgetting that a percentage efficiency needs multiplying by 100, and leaving the answer as 0.39 when 39 per cent is asked for.</li>
<li>Mixing units: power in watts needs energy in joules and time in seconds, so kilowatts and minutes must be converted first.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> A ball of mass 0.15 kg is moving at 10 m s⁻¹. Calculate its kinetic energy and the height through which it would need to be raised to store the same energy. Take g = 9.81 N kg⁻¹.</p>
<p>Answer: EK = ½mv² = ½ × 0.15 × 10² = 7.5 J. Setting mgh = 7.5 gives h = 7.5 / (0.15 × 9.81) = 5.1 m.</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> A 60 kg student runs up a flight of stairs of vertical height 3.0 m in 4.0 s. Calculate the useful power developed. Take g = 10 N kg⁻¹.</p>
<p>Answer: work = mgh = 60 × 10 × 3.0 = 1800 J. Power = 1800 / 4.0 = 450 W. (Real power is higher, because the student also gains kinetic energy and warms their muscles.)</p>
<p><strong>Question 3 (Paper 2 style).</strong> A machine takes in 2000 J and delivers 1500 J of useful work. Its efficiency is: A 25 per cent; B 75 per cent; C 133 per cent; D 175 per cent. Answer: B. 1500/2000 = 0.75 = 75 per cent. Option C comes from putting input over output — the classic trap.</p>
<p><strong>Question 4 (Paper 4, 6 marks).</strong> Explain why a solar cell is described as renewable, and discuss whether it is a good replacement for a coal-fired power station.</p>
<p>Answer: A solar cell converts light energy directly into electrical energy and consumes no fuel, so its energy source, sunlight, is replenished continuously and it is renewable. It produces no carbon dioxide or pollutants in operation. Against that, output depends on light intensity and falls at night and in cloudy weather, so storage or backup generation is needed; manufacturing the cells is energy-intensive, and a large area is required for high output. Coal is reliable and dispatchable but burns a finite resource, releasing carbon dioxide that drives climate change plus sulfur dioxide and particulates. A balanced conclusion weighs reliability and land use against emissions and fuel sustainability.</p>
<p><strong>Question 5 (Paper 4, 3 marks).</strong> A car engine produces a driving force of 2000 N while travelling at 30 m s⁻¹. Calculate the useful power output.</p>
<p>Answer: P = F v = 2000 × 30 = 60 000 W = 60 kW.</p>
<p><strong>Question 6 (Paper 6 style).</strong> Suggest how you would determine experimentally the efficiency of an electric motor lifting a small mass.</p>
<p>Answer: Measure the mass with a balance and the height lifted with a ruler, and record the time with a stopwatch. The useful output is mgh, calculated from the measured mass and vertical height. Measure the electrical energy input with a joule meter, or with an ammeter and voltmeter readings and E = V I t. Efficiency is mgh divided by V I t. Repeat for several masses and quote an average, keeping the input voltage constant.</p>
<p>With energy accounted for, the next question is what happens when forces are spread over area and depth: pressure and density.</p>
`,

    "61da5c21-d745-4a51-ba0c-2a861af41061": `
<h2>IGCSE Physics: Pressure and Density</h2>
<p>Cambridge IGCSE Physics 0625 (2026–2028), Topic 1 Motion, forces and energy: statements 1.4 Density and 1.8 Pressure. Density tells you what is inside a given volume; pressure tells you what a force does when it is spread over an area. Both ideas start from everyday experience — why ships float, why snowshoes work, why your ears pop underwater — and both carry straightforward but unit-sensitive calculations that Paper 4 marks reliably. Paper 6 also examines the practical methods used to measure density, so the experimental detail matters as much as the equations.</p>

<h3>Density: what it is</h3>
<p>Imagine two identical buckets, one filled with feathers and one with sand. They hold the same volume, but the sand packs far more mass into that volume. Density measures exactly that: how much mass is squeezed into each cubic metre of a substance. It is a property of the material, not of the particular sample, which is why a small gold bead and a large gold bar have the same density.</p>
<pre><code>density = mass / volume        rho = m / V</code></pre>
<ul>
<li>rho: density in kilograms per cubic metre (kg m⁻³). Density is a scalar, so it has no direction and no sign.</li>
<li>m: mass in kilograms (kg); V: volume in cubic metres (m³).</li>
</ul>
<p>The SI units are easy to get wrong because laboratory data arrives in grams and cubic centimetres. Water has a density of 1.00 g cm⁻³, which is 1000 kg m⁻³: to convert g cm⁻³ to kg m⁻³, multiply by 1000. Typical exam densities run from about 0.5 g cm⁻³ for wood to 19.3 g cm⁻³ for gold, and the density of water is the reference point that decides whether things float.</p>

<h3>Measuring density experimentally</h3>
<p>The method depends on the shape and state of the sample, and Paper 6 expects you to choose and describe the right one.</p>
<table border="1" cellpadding="6">
<tr><th>Sample</th><th>Method</th><th>Key apparatus and care</th></tr>
<tr><td>Regular solid (cube or cylinder)</td><td>Measure the mass on a balance; measure the dimensions with a ruler and calculate the volume</td><td>Measure each dimension several times and average; a vernier caliper gives a better length than a ruler</td></tr>
<tr><td>Irregular solid</td><td>Measure the mass; find the volume by water displacement in a measuring cylinder</td><td>Read the bottom of the meniscus at eye level; the volume difference is the sample's volume</td></tr>
<tr><td>Liquid</td><td>Measure the mass of a measuring cylinder, add the liquid, read the volume, and find the mass of the liquid by subtraction</td><td>Pouring losses are the main error; use a balance that reads to 0.01 g for small volumes</td></tr>
<tr><td>Object that floats in water</td><td>Sink it with a thin pin or a heavy sinker and subtract the sinker's own displaced volume</td><td>A wax or wood sample cannot be measured by displacement alone because it refuses to submerge</td></tr>
</table>
<p>The percentage uncertainty of the result combines the volume and mass measurements, and since volume enters as a product of lengths, a 2 per cent error in a length gives about a 6 per cent error in the volume of a cube. Repeating readings and averaging is the standard control of random error. If the object is soluble in water, use an unsuitable-displacement liquid such as sand or oil instead.</p>

<h3>Floating and sinking</h3>
<p>An object placed in a liquid sinks if its average density is greater than the liquid's density, and floats if it is less. A floating object displaces its own weight of liquid, so a 1000 kg steel hull floats only because the hull shape encloses a large volume of air and the average density of ship plus air is below that of water. Ice floats on water because ice is less dense (about 0.92 g cm⁻³), which is why lakes freeze from the top.</p>
<p><strong>Supplement: one liquid on another.</strong> When two liquids that do not mix are poured together, the denser one sinks below the less dense one, and the boundary stays sharp. Oil (about 0.8 g cm⁻³) floats on water; syrup (about 1.4 g cm⁻³) sinks below it. A carefully poured column of syrup, water and oil layers in the order syrup, water, oil, and a grape that is denser than water but less dense than syrup will float at the syrup–water boundary. The rule is the same in every case: each substance finds the level where the density below it is greater and the density above it is smaller.</p>

<h3>Pressure: force spread over area</h3>
<p>Pressure is what a force does when it is spread over a surface. The same force over a smaller area produces a greater pressure, which is why a drawing pin drives into a board point-first and why snowshoes stop you sinking into snow. A sharp knife cuts because the small edge area turns a modest force into enormous pressure.</p>
<pre><code>pressure = force / area        p = F / A</code></pre>
<ul>
<li>p: pressure in pascals (Pa). One pascal is one newton per square metre (1 Pa = 1 N m⁻²). Pressure is a scalar.</li>
<li>F: force in newtons (N), acting perpendicular to the surface.</li>
<li>A: area in square metres (m²) over which the force acts.</li>
</ul>
<p>Area must be in square metres: 1 cm² = 0.0001 m², so 25 cm² = 0.0025 m². Atmospheric pressure at sea level is about 100 000 Pa (100 kPa), which presses on every square metre with a force of 100 000 N — the reason a vacuum flask is crushed if the air is pumped out, and the reason the body needs equal pressure inside as well.</p>
<p>Pressure is transmitted through liquids: a force applied at one point in a confined liquid is passed on undiminished in every direction, which is the principle of hydraulic brakes and car jacks, where a small force on a small piston gives a large force on a large piston because the pressure is the same on both.</p>

<h3>Pressure in a liquid</h3>
<p><strong>Supplement.</strong> The pressure in a liquid rises with depth because the liquid above presses down. For a liquid of uniform density the increase is:</p>
<pre><code>pressure due to a liquid column = density x gravitational field strength x depth        p = rho g h</code></pre>
<ul>
<li>p: pressure in pascals (Pa); rho: density of the liquid in kilograms per cubic metre (kg m⁻³).</li>
<li>g: gravitational field strength in newtons per kilogram (N kg⁻¹, use the value given in the question).</li>
<li>h: vertical depth below the surface in metres (m). Depth is measured vertically, not along a slope or the container wall.</li>
</ul>
<p>Only the vertical height of the column counts, which is why the pressure at the bottom of a swimming pool depends only on the water's depth, not on the shape or the width of the pool. The total pressure at depth includes the atmosphere pressing on the surface: total pressure = atmospheric pressure + ρgh. A diver at 20 m in fresh water experiences ρgh = 1000 × 9.81 × 20 = 196 200 Pa from the water alone, about three times atmospheric pressure in total, which is why the ears must be equalised during descent. A manometer measures a pressure difference by the height difference of a liquid column; a barometer measures atmospheric pressure by the height of a mercury column (about 760 mm at sea level).</p>

<h3>Worked example: density and pressure together</h3>
<p>A rectangular brass block measures 4.0 cm × 5.0 cm × 10.0 cm and has a mass of 1.20 kg.</p>
<pre><code>volume = 0.040 x 0.050 x 0.100 = 0.00020 m3
density = mass / volume = 1.20 / 0.00020 = 6000 kg m-3  (6.0 g cm-3)</code></pre>
<p>Notice the unit conversion before the division: centimetres were converted to metres first, so the density comes out in kg m⁻³ directly. The same calculation in laboratory units gives the same answer: the volume is 4.0 × 5.0 × 10.0 = 200 cm³ and the mass is 1200 g, so the density is 1200 / 200 = 6.0 g cm⁻³, which converts to 6000 kg m⁻³. Keep the arithmetic in one unit system end to end and the conversion error cannot appear.</p>
<p>Now the block rests on a table on its largest face. The force is its weight, 1.20 × 9.81 = 11.8 N, spread over 5.0 cm × 10.0 cm = 0.0050 m²:</p>
<pre><code>pressure = F / A = 11.8 / 0.0050 = 2350 Pa</code></pre>
<p>Turned onto its smallest face, the area is 4.0 × 5.0 = 0.0020 m² and the pressure rises to 5875 Pa — the same weight, a smaller area, a larger pressure. Finally, the pressure 2.0 m below the surface of a fresh-water lake is ρgh = 1000 × 9.81 × 2.0 = 19 620 Pa, about 20 kPa above atmospheric pressure.</p>

<h3>Common mistakes</h3>
<ul>
<li>Dividing by mass instead of volume, or reversing the density equation. Density is mass over volume; the heavy object with the same volume has the higher density.</li>
<li>Forgetting to convert g cm⁻³ to kg m⁻³ (multiply by 1000) or centimetres to metres before using SI equations. A volume in cm³ must become m³ by dividing by 10⁶.</li>
<li>Using area in cm² in p = F/A. The pascal is a newton per square metre, so the area must be in m².</li>
<li>Measuring h along the slope of a container or along the wall; depth is the vertical distance below the free surface.</li>
<li>Ignoring the atmosphere when asked for the total pressure at a depth: total pressure is atmospheric plus the liquid contribution.</li>
<li>Assuming heavy objects sink and light ones float; it is density, not mass, that decides. A huge ship floats on air-filled hull volume.</li>
<li>Treating density as a vector or attaching a direction to pressure; both are scalars.</li>
<li>Quoting more than two significant figures from readings taken with a ruler or a measuring cylinder, ignoring the precision of the apparatus.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> A glass block of mass 150 g has dimensions 5.0 cm × 4.0 cm × 2.0 cm. Calculate its density in g cm⁻³ and in kg m⁻³.</p>
<p>Answer: Volume = 5.0 × 4.0 × 2.0 = 40 cm³. Density = 150 / 40 = 3.75 g cm⁻³ ≈ 3.8 g cm⁻³. In SI units: 3.75 × 1000 = 3750 kg m⁻³.</p>
<p><strong>Question 2 (Paper 4, 3 marks).</strong> A student stands on one foot; her weight of 500 N acts on an area of 0.015 m². Calculate the pressure, and state what happens when she stands on both feet with a total area of 0.030 m².</p>
<p>Answer: p = F/A = 500 / 0.015 = 33 000 Pa (33 kPa). On both feet the area doubles, so the pressure halves to about 17 000 Pa. The force is unchanged; only the area changes.</p>
<p><strong>Question 3 (Paper 2 style).</strong> An object floats with half its volume submerged in water of density 1000 kg m⁻³. Its density is: A 2000 kg m⁻³; B 1000 kg m⁻³; C 500 kg m⁻³; D zero. Answer: C. Floating means the average density is less than the liquid's; an object that floats with half its volume submerged has an average density of 500 kg m⁻³.</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> Calculate the pressure due to the water at a depth of 3.0 m in a lake, and the total pressure at that depth. Take g = 10 N kg⁻¹ and atmospheric pressure as 100 kPa.</p>
<p>Answer: p = ρgh = 1000 × 10 × 3.0 = 30 000 Pa = 30 kPa. Total pressure = 100 kPa + 30 kPa = 130 kPa.</p>
<p><strong>Question 5 (Paper 6 style).</strong> Describe how you would determine the density of an irregular stone that is denser than water.</p>
<p>Answer: Measure the mass of the dry stone on a balance. Partly fill a measuring cylinder with water and record the volume at eye level with the meniscus bottom. Lower the stone in gently (tied with thread if needed) and record the new volume. The stone's volume is the difference. Density is mass divided by the volume change. Repeat the volume readings and average to reduce random error, and check that no water is splashed out or carried away on the stone.</p>
<p><strong>Question 6 (Paper 4, 3 marks).</strong> Explain why a steel needle sinks in water while a steel ship of 10 000 tonnes floats.</p>
<p>Answer: Steel has a density of about 7800 kg m⁻³, far greater than water, so a solid needle sinks. The ship's hull encloses a large volume of air, so the average density of the ship and the air inside it is much less than 1000 kg m⁻³. The ship therefore floats and displaces a weight of water equal to its own weight.</p>
<p>Density decides what floats and pressure decides what pushes; the next stop is the particle model that explains both when matter is heated.</p>
`,
  },
};
