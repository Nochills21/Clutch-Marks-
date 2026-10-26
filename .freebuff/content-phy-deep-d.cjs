// Physics depth pass, tranche D.
const F = require("./note-figures.cjs");
const { C, text, frame, plot } = F;

/* ── Figure: pressure against depth in two liquids ───────────────────── */
const pressureDepth = (() => {
  const water = [];
  const mercury = [];
  for (let h = 0; h <= 10; h += 0.5) {
    water.push([h, +(1000 * 9.81 * h / 1000).toFixed(1)]);
    mercury.push([h, +(13600 * 9.81 * h / 1000).toFixed(1)]);
  }
  return plot({
    id: "pr-depth",
    title: "Pressure due to depth in water and in mercury",
    label: "Figure 1.",
    caption:
      "The graphs are straight lines through the origin, because p = ρgh is linear in depth; the gradient is ρg, so mercury's much greater density makes its line thirteen times steeper. That single fact explains the barometer: a column of mercury only 760 mm tall balances the whole atmosphere, while water would need about 10 m.",
    w: 580,
    h: 330,
    x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "depth (m)" },
    y: { min: 0, max: 1400, ticks: [0, 350, 700, 1050, 1400], label: "pressure (kPa)" },
    series: [
      { points: water, color: C.gold, width: 2.6 },
      { points: mercury, color: C.goldDeep, width: 2.6 },
    ],
    annotations: [
      { x: 6.2, y: 72, text: "water: 9.81 kPa per metre", dx: 6, dy: 0, color: C.gold, size: 11.5 },
      { x: 5.4, y: 860, text: "mercury: 133 kPa per metre", dx: 6, dy: 0, color: C.goldDeep, size: 11.5 },
    ],
  });
})();

/* ── Figure: velocity-time graph with the area shaded ────────────────── */
const vtGraph = (() => {
  const pts = [];
  for (let t = 0; t <= 4; t += 0.5) pts.push([t, +(2 + 2.5 * t).toFixed(2)]);
  for (let t = 4.5; t <= 8; t += 0.5) pts.push([t, +(12 - 1.5 * (t - 4)).toFixed(2)]);
  return plot({
    id: "kin-vt",
    title: "A velocity-time graph: gradient gives acceleration, area gives displacement",
    label: "Figure 1.",
    caption:
      "From 0 to 4 s the velocity rises at 2.5 m s⁻², so the object accelerates uniformly; from 4 s onward it falls at 1.5 m s⁻², so it decelerates. The area under the line is the displacement, which is why counting squares and multiplying by the velocity and time scales is a legitimate way to answer a graph question.",
    w: 580,
    h: 330,
    x: { min: 0, max: 8, ticks: [0, 2, 4, 6, 8], label: "time (s)" },
    y: { min: 0, max: 14, ticks: [0, 4, 8, 12], label: "velocity (m s⁻¹)" },
    series: [{ points: pts, color: C.gold, width: 2.8 }],
    annotations: [
      { x: 1.2, y: 3.4, text: "gradient = 2.5 m s⁻²", dx: 6, dy: 0, color: C.gold, size: 11.5 },
      { x: 5.4, y: 10.4, text: "gradient = −1.5 m s⁻²", dx: 6, dy: 0, color: C.muted, size: 11.5 },
    ],
  });
})();

/* ── Figure: terminal velocity ───────────────────────────────────────── */
const terminal = (() => {
  const pts = [];
  for (let t = 0; t <= 10; t += 0.25) pts.push([+t.toFixed(2), +(12 * (1 - Math.exp(-0.55 * t))).toFixed(2)]);
  return plot({
    id: "dyn-terminal",
    title: "Velocity of a falling object against time as drag grows and the acceleration falls to zero",
    label: "Figure 1.",
    caption:
      "The gradient is the acceleration. It is largest at the start, when the only force is weight, and falls to zero as drag grows to equal weight: the velocity then stops changing and the object has reached terminal velocity. Opening a parachute raises the drag, so the velocity drops to a new, lower terminal value.",
    w: 580,
    h: 320,
    x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "time (s)" },
    y: { min: 0, max: 14, ticks: [0, 4, 8, 12], label: "velocity (m s⁻¹)" },
    series: [{ points: pts, color: C.gold, width: 2.8, smooth: true }],
    hidden: [{ y: 12, color: C.goldDeep }],
    annotations: [
      { x: 6, y: 12.15, text: "terminal velocity: drag = weight", dx: 4, dy: -6, color: C.goldDeep, size: 11.5 },
      { x: 0.5, y: 3.2, text: "steepest at the start", dx: 6, dy: 0, color: C.muted, size: 11.5 },
    ],
  });
})();

const pressureDensity = `<h2>Pressure and Density: the two that explain floating</h2>
<p>Density and pressure are usually taught as two separate formulae, and then upthrust appears as a third fact to memorise. They are one chain: density gives the mass of a volume of fluid, that mass gives the weight, and the difference in pressure between the bottom and the top of a submerged object gives the upthrust. This section builds that chain and works the calculations that follow from it.</p>

<h3>Density is a property, and it is measured indirectly</h3>
<p>Density is mass per unit volume, ρ = m/V, in kg m⁻³. It is a property of the material, not of the object: a steel nail and a steel girder have the same density, because both mass and volume scale together. Water is 1,000 kg m⁻³, air about 1.2 kg m⁻³, aluminium 2,700 kg m⁻³, and mercury 13,600 kg m⁻³ — the last is worth remembering because it explains the barometer, and the first is worth remembering because it defines floating.</p>
<p>Measuring the density of a regular solid is a calculation: mass on a balance, dimensions with a ruler or vernier calipers, volume from the formula, density by division. Measuring it for an irregular solid needs displacement: the mass is weighed, then the object is lowered into a measuring cylinder and the rise in water level gives its volume. A denser object sinks, so it can be lowered on a thread; a floating object must be pushed under with a needle, and the volume recorded is that of the object, not the needle.</p>
<p>For a liquid, the standard method is more careful than it looks: measure the mass of an empty measuring cylinder, pour in a known volume, measure the mass again, and subtract. The subtraction removes the mass of the cylinder; pouring a fixed volume into a tared beaker would be equally valid, but reading the volume at the meniscus adds an uncertainty that should be quoted. The uncertainty in the density is the sum of the percentage uncertainties in mass and volume, and for a small volume the second dominates — which is why a burette is better than a measuring cylinder when precision matters.</p>

<h3>Floating, sinking and the meaning of upthrust</h3>
<p>An object floats when its weight is less than the upthrust on it when fully submerged, which is equivalent to saying that its average density is less than that of the fluid. A block of wood of density 600 kg m⁻³ floats in water with 60 % of its volume submerged, because that is the fraction needed to displace its own weight. A steel ship floats for the same reason: the hull encloses a large volume of air, so the average density of the ship is far less than that of steel. A submarine controls its average density by flooding and blowing ballast tanks, and that is the whole principle of submerging.</p>
<p>Upthrust arises from pressure, not from a mysterious upward force. Pressure increases with depth, so the pressure on the bottom of a submerged object is greater than on the top; the difference, multiplied by the area, is an upward resultant. That derivation is worth being able to write, because it explains why upthrust depends on the volume of the object and the density of the fluid, and not on the object's own density or on its depth — a point that surprises students and is a common exam question.</p>

<h3>Pressure on a surface, and why sharp things cut</h3>
<p>Pressure is force per unit area, p = F/A, in pascals, where one pascal is one newton per square metre. The relationship explains a whole family of everyday facts in one line: a sharp knife has a small contact area, so a modest force gives a large pressure and the material yields; snowshoes spread the same weight over a large area, so the pressure on the snow is small and you do not sink; a drawing pin has a sharp point and a broad head for the same reason, one end to concentrate the force and the other so that your thumb is not injured. A question that asks why a camel's foot is broad is asking for exactly this, and the answer should mention force, area and pressure in that order.</p>
<p>For a solid resting on a surface, the force is its weight, mg, so the pressure is mg/A. That is why a heavy object on a small base damages a floor, and why a stack of bricks is more likely to crack the tile beneath it than a single brick. It is also why a person standing on one foot exerts twice the pressure of a person standing on two, even though the weight is unchanged.</p>

<h3>Pressure in a liquid: depth, density, and nothing else</h3>
<p>The pressure due to a column of liquid is p = ρgh, and it depends only on the density of the liquid and the depth — not on the shape or width of the container. That is why a narrow tube of water can produce the same pressure at the same depth as a wide tank (the hydrostatic paradox), and why a dam is built thicker at the base: the pressure at the bottom is greater because h is greater (Figure 1). The force on a dam is the pressure multiplied by the area, and because the pressure increases linearly with depth, the total force can be found from the average pressure, which is the value at half the depth.</p>
<p>Two practical consequences are examinable. A diver at 20 m in water experiences an additional pressure of 1,000 × 9.81 × 20 = 196 kPa, about twice atmospheric pressure, and must equalise the pressure in their ears and lungs as they descend. And a mercury barometer works because the atmosphere supports a column of mercury 760 mm tall: the pressure at the base of that column is 13,600 × 9.81 × 0.760 = 101 kPa, which is atmospheric pressure, and the same atmosphere would support a water column about 10.3 m tall because water is 13.6 times less dense. When a question asks why mercury is used rather than water, the answer is that a water barometer would need to be more than ten metres tall.</p>

<h3>Putting the two together: a worked example</h3>
<p>A rectangular block of wood 0.20 m × 0.10 m × 0.05 m has a mass of 0.60 kg. Its volume is 0.20 × 0.10 × 0.05 = 1.0 × 10⁻³ m³, so its density is 0.60 / 1.0 × 10⁻³ = 600 kg m⁻³. Its weight is 0.60 × 9.81 = 5.9 N. Resting on its largest face, area 0.20 × 0.10 = 0.020 m², the pressure on the table is 5.9 / 0.020 = 295 Pa; resting on its smallest face, area 0.10 × 0.05 = 0.0050 m², the pressure is 5.9 / 0.0050 = 1,180 Pa. Same block, four times the pressure, because the area is a quarter.</p>
<p>Now float it in water. Because its density is 600 kg m⁻³, it floats with 60 % of its volume submerged, which is 6.0 × 10⁻⁴ m³, and that displaced water has a mass of 0.60 kg and a weight of 5.9 N — equal to the block's weight, which is the check that the answer is right. The upthrust equals the weight for any floating object, and that statement is the fastest way to solve a floating problem: you do not need to compute the pressure difference at all.</p>`;

const dynamics = `<h2>Dynamics: forces as the cause of change</h2>
<p>Newton's three laws are short and are usually quoted without their consequences. This section draws out what each one actually forbids or requires: why a constant force gives a changing velocity, why mass is a measure of inertia as well as of gravity, what a free-body diagram is for, and why drag turns a falling problem into a differential equation that has a simple end state.</p>

<h3>Newton's first law is a statement about forces, not about motion</h3>
<p>An object remains at rest or moves with constant velocity unless a resultant force acts on it. The law looks trivial and is not: it says that motion at constant velocity needs no force at all, so a car cruising at a steady speed on a level road has a forward force from the engine exactly equal to the resistive forces, and the resultant is zero. Students often assume that motion requires a force, which leads to the mistaken idea that the engine "overcomes" the resistance by being larger; it does not, it matches it.</p>
<p>The law also defines what a force is for: a force is what changes velocity, either its magnitude or its direction. That is why circular motion at constant speed needs a force — the direction is changing — and why a question that asks whether a force is acting on a satellite in a circular orbit has the answer yes, gravity, even though the speed is constant.</p>

<h3>Newton's second law, and what the mass really measures</h3>
<p>Resultant force equals mass times acceleration, F = ma, and it is a vector equation applied in each direction separately. Two consequences are worth stating. For a given force, a larger mass accelerates less, so mass is a measure of inertia. And acceleration is always in the direction of the resultant force, not necessarily in the direction of motion: a car braking has an acceleration opposite to its velocity, and a ball thrown upward has a downward acceleration throughout its flight, including at the highest point where its velocity is momentarily zero.</p>
<p>The distinction between mass and weight is examinable and easy to get right. Mass is the amount of matter, measured in kilograms, and is the same everywhere; weight is the gravitational force on that mass, measured in newtons, and depends on the field strength: W = mg. On the Moon, a 60 kg astronaut has a weight of about 100 N rather than 590 N, but their mass is still 60 kg and their inertia is unchanged. A question that asks why an astronaut can jump higher on the Moon wants both halves: the weight is lower, so the same muscle force gives a larger acceleration, while the mass is the same, so the muscles move the same amount of matter.</p>
<p>Worked example: a 1,200 kg car experiences a driving force of 4,000 N and a total resistive force of 1,000 N. The resultant is 3,000 N, so the acceleration is 3,000 / 1,200 = 2.5 m s⁻². Once the car reaches its maximum speed the resultant is zero and the acceleration is zero, which means the driving force has fallen to 1,000 N — or, more realistically, the resistive force has risen to 4,000 N, because resistance grows with speed squared.</p>

<h3>Free-body diagrams, and the discipline they impose</h3>
<p>A free-body diagram shows one object and every force acting on it, drawn from its centre, with no other objects in the picture. The discipline is what makes it useful: forces that the object exerts on something else are not included, and neither are "the force of motion" or "the centrifugal force". For a block sliding down a slope, the diagram has weight vertically down, normal reaction perpendicular to the slope, friction along the slope, and nothing else. Resolving along and perpendicular to the slope then gives two equations: mg sin θ − friction = ma along the slope, and N = mg cos θ perpendicular to it.</p>
<p>Two checks catch most errors. If the object is in equilibrium, the forces must close into a polygon — a triangle for three forces. And the normal reaction is not always equal to the weight: on a slope it is mg cos θ, in a lift accelerating upward it is m(g + a), and in a lift accelerating downward it is m(g − a). Losing contact happens when the reaction falls to zero, which is why you feel weightless at the top of a roller-coaster loop if the speed is just right.</p>

<h3>Drag, terminal velocity, and the shape of the curve</h3>
<p>Drag is a resistive force that increases with speed — roughly with the square of the speed for a fast-moving object in air. A falling object therefore has a changing acceleration: at the instant of release the only force is weight, so the acceleration is g; as the speed rises, drag grows, the resultant force falls, and the acceleration falls with it; eventually drag equals weight, the resultant is zero, and the velocity stops changing (Figure 1). That constant velocity is the terminal velocity, and it depends on the object's shape and mass: a skydiver in a spread-eagle position reaches about 55 m s⁻¹, and with a parachute about 6 m s⁻¹, because the parachute's large area produces much more drag at the same speed.</p>
<p>The velocity-time curve is worth being able to sketch and describe. It starts steep, with a gradient of g, and flattens asymptotically towards the terminal value; it never quite reaches it in theory, but does within experimental precision. If the parachute opens, the drag suddenly exceeds the weight, the resultant is upward, the object decelerates sharply, and it settles at the new lower terminal velocity. That whole sequence, described in terms of the resultant force, is the standard six-mark answer.</p>

<h3>Connected bodies and the pulley problem</h3>
<p>Two masses connected by a string over a pulley are best treated in two stages. First, treat the pair as one system: the driving force is the difference in their weights, the total mass being accelerated is the sum, so a = (m₁ − m₂)g / (m₁ + m₂). Second, to find the tension, apply F = ma to one mass alone: for the heavier mass, m₁g − T = m₁a, so T = m₁(g − a). Both stages are needed because the single-system equation does not contain the tension — it is an internal force and cancels.</p>
<p>Two subtleties are examinable. The tension is not equal to the weight of either mass, because the masses are accelerating; it lies between the two weights. And if the string is light and the pulley frictionless, the tension is the same throughout the string, which is the assumption that makes the calculation possible. A question that asks why the tension is not simply the weight of the hanging mass is asking about that acceleration.</p>`;

const kinematics = `<h2>Kinematics: choosing the right equation, and knowing when not to</h2>
<p>The equations of motion are four formulae and most marks are lost by choosing the wrong one or by using one where the acceleration is not constant. This section sets out the selection procedure, then covers the cases where the constant-acceleration assumption fails — projectiles in two dimensions, motion with drag, and graph reading — and ends with the uncertainty treatment that a practical question expects.</p>

<h3>The selection procedure</h3>
<p>Every constant-acceleration problem has five quantities: initial velocity u, final velocity v, acceleration a, displacement s and time t. Each equation omits exactly one of them. Write down what you are given and what you want; the equation that omits the quantity you neither have nor want is the one to use.</p>
<table>
<tr><th>Equation</th><th>Omits</th><th>Use it when</th></tr>
<tr><td>v = u + at</td><td>s</td><td>You know three of u, v, a, t and want the fourth</td></tr>
<tr><td>s = ut + ½at²</td><td>v</td><td>You know u, a, t and want s</td></tr>
<tr><td>v² = u² + 2as</td><td>t</td><td>Time is not given and not wanted — the most useful form in exam questions</td></tr>
<tr><td>s = ½(u + v)t</td><td>a</td><td>Acceleration is unknown, and you have u, v and t</td></tr>
</table>
<p>Two habits make this reliable. Write the list of knowns with units and signs before choosing, so that a negative acceleration is not lost. And choose a positive direction explicitly — upward or downward, left or right — then apply it to every quantity, because a sign error is otherwise indistinguishable from an arithmetic error.</p>

<h3>Free fall, and the symmetry of projectile motion</h3>
<p>An object in free fall has an acceleration of 9.81 m s⁻² downward, whatever its velocity, including at the highest point of its flight where the velocity is momentarily zero. That last point is a favourite exam trap: the acceleration at the top of the flight is not zero, it is g. The velocity is zero, the acceleration is not.</p>
<p>For a projectile launched horizontally, the motion separates into two independent parts. Vertically it is free fall from rest, so h = ½gt² gives the time of flight from the height. Horizontally there is no acceleration, so the horizontal velocity is constant and the range is that velocity multiplied by the time of flight. The two are linked only by the shared time, which is why the standard method is to solve the vertical motion first and then substitute into the horizontal. For a projectile launched at an angle, resolve the initial velocity into components, use the vertical component to find the time of flight and the maximum height, and the horizontal component to find the range — and note that the maximum range on level ground occurs at 45°.</p>
<p>A worked example: a ball is thrown horizontally at 8.0 m s⁻¹ from a table 1.25 m high. The time to fall is given by 1.25 = ½ × 9.81 × t², so t² = 0.255 and t = 0.505 s. The horizontal distance is 8.0 × 0.505 = 4.0 m. If the same ball were thrown at 16 m s⁻¹, the time would be unchanged and the distance would double — which is the point of separating the two motions.</p>

<h3>Reading motion graphs without confusing the axes</h3>
<p>A displacement-time graph has velocity as its gradient: a straight line means constant velocity, a curve means changing velocity, and a horizontal line means at rest. A velocity-time graph has acceleration as its gradient and displacement as the area under it (Figure 1): a straight line means constant acceleration, a curve means changing acceleration, and a negative gradient means deceleration. An acceleration-time graph has the change in velocity as its area. The single most common error is to treat a velocity-time graph as a picture of the path, so that a line going down is read as the object coming back; it is not, it is the object slowing down.</p>
<p>Areas below the time axis count as negative displacement, which is why a velocity-time graph that crosses the axis describes an object that reverses direction. Counting squares is a legitimate method when the curve is not a shape you can compute: work out what one square represents in metres by multiplying the time per square by the velocity per square, then count.</p>

<h3>When constant acceleration fails</h3>
<p>The four equations assume a constant acceleration, so they cannot be used for an object falling with drag, a car accelerating with a power limit, or anything whose velocity-time graph is curved. What you can do in those cases is read the graph, use the gradient at an instant for the acceleration at that instant, or use energy arguments, which do not care about the path. A question that gives a curved velocity-time graph and asks for the acceleration at 3 s wants a tangent, not a formula — and drawing the tangent carefully, then reading two points from it, is the method.</p>
<p>The other case where the equations fail is relativistic motion, which is outside this specification but worth knowing exists: at speeds approaching the speed of light, velocities do not add simply and the equations here no longer apply. At the speeds in an exam, they always do.</p>

<h3>Measurement and uncertainty in a motion experiment</h3>
<p>A typical practical uses a ticker-tape timer, a light gate or a video, and each has its own uncertainty. With a light gate, the time is measured to a fraction of a millisecond and the length of the card to a millimetre, so the percentage uncertainty in the speed is dominated by the card measurement. With a ruler for displacement, the uncertainty is ±1 mm or ±0.5 mm depending on how carefully the scale is read, and it should be quoted once, not invented at the end.</p>
<p>Percentage uncertainty is the absolute uncertainty divided by the value, times 100. When quantities are multiplied or divided, percentage uncertainties add; when a quantity is squared, its percentage uncertainty doubles. So if the time has a 2 % uncertainty and the displacement a 1 % uncertainty, the calculated acceleration has about 5 % — 1 % from displacement and 2 × 2 % from time. That is why timing is the measurement worth repeating: its uncertainty is multiplied by two whenever the time is squared.</p>`;

module.exports = {
  sections: [
    {
      id: "61da5c21-d745-4a51-ba0c-2a861af41061",
      slug: "pressure-density",
      heading: "Pressure and Density: the two that explain floating",
      html: pressureDensity + "\n" + pressureDepth + "\n",
    },
    {
      id: "78b026c5-7368-43c8-a8bb-0b19b9be584d",
      slug: "dynamics",
      heading: "Dynamics: forces as the cause of change",
      html: dynamics + "\n" + terminal + "\n",
    },
    {
      id: "c6799c2c-a5ca-4a0d-b962-7bf95e65b17d",
      slug: "kinematics",
      heading: "Kinematics: choosing the right equation, and knowing when not to",
      html: kinematics + "\n" + vtGraph + "\n",
    },
  ],
};
