// Physics depth pass, tranche B.
const F = require("./note-figures.cjs");
const { C, text, frame, plot } = F;

/* ── Figure: damping, three cases ────────────────────────────────────── */
const damping = (() => {
  const mk = (decay) => {
    const pts = [];
    for (let t = 0; t <= 10; t += 0.1) {
      pts.push([+t.toFixed(1), +(Math.exp(-decay * t) * Math.cos(2 * Math.PI * t * 0.8)).toFixed(3)]);
    }
    return pts;
  };
  return plot({
    id: "osc-damping",
    title: "Displacement against time for light, heavy and critical damping",
    label: "Figure 1.",
    caption:
      "Light damping lets the amplitude decay gradually over many oscillations. Heavy damping returns the system slowly without crossing the equilibrium line. Critical damping returns it in the shortest time with no overshoot at all — which is why door closers and car suspension are designed to sit at that point.",
    w: 580,
    h: 330,
    x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "time (s)" },
    y: { min: -1.1, max: 1.1, ticks: [-1, -0.5, 0, 0.5, 1], label: "displacement (arbitrary units)" },
    series: [
      { points: mk(0.12), color: C.gold, width: 2, smooth: false },
      { points: mk(0.55), color: C.muted, width: 2, smooth: false },
      { points: Array.from({ length: 51 }, (_, i) => [+(i / 5).toFixed(1), +Math.exp(-2.6 * (i / 5)).toFixed(3)]), color: C.goldDeep, width: 2.2, smooth: true },
    ],
    hidden: [{ y: 0, color: C.faint }],
    annotations: [
      { x: 6.8, y: 0.42, text: "light", dx: 6, dy: 0, color: C.gold, size: 11.5 },
      { x: 4.4, y: 0.16, text: "heavy", dx: 6, dy: -4, color: C.muted, size: 11.5 },
      { x: 2.6, y: 0.02, text: "critical", dx: 6, dy: 10, color: C.goldDeep, size: 11.5 },
    ],
  });
})();

/* ── Figure: force on a current-carrying wire, drawn as a cross-section ── */
const motorEffect = (() => {
  const parts = [];
  // Magnet poles.
  parts.push(
    `<rect x="60" y="90" width="60" height="150" fill="${C.goldFill}" stroke="${C.gold}" stroke-width="1.4"/>`,
    text(90, 74, "N", { anchor: "middle", size: 16, fill: C.ink, weight: "600" }),
    `<rect x="440" y="90" width="60" height="150" fill="${C.goldFill}" stroke="${C.gold}" stroke-width="1.4"/>`,
    text(470, 74, "S", { anchor: "middle", size: 16, fill: C.ink, weight: "600" }),
  );
  // Field lines from N to S.
  for (let y = 110; y <= 220; y += 22) {
    parts.push(
      `<line x1="124" y1="${y}" x2="432" y2="${y}" stroke="${C.muted}" stroke-width="1" stroke-dasharray="5 6"/>`,
      `<polygon points="436,${y} 426,${y - 4} 426,${y + 4}" fill="${C.muted}"/>`,
    );
  }
  // Wire in cross-section: current into the page.
  parts.push(
    `<circle cx="280" cy="168" r="18" fill="${C.goldFillSoft}" stroke="${C.ink}" stroke-width="2"/>`,
    `<line x1="271" y1="168" x2="289" y2="168" stroke="${C.ink}" stroke-width="2.4"/>`,
    `<line x1="280" y1="159" x2="280" y2="177" stroke="${C.ink}" stroke-width="2.4"/>`,
    text(280, 206, "current into the page", { anchor: "middle", size: 11.5 }),
  );
  // Force arrow, upward by Fleming's left hand rule.
  const arrow = (x1, y1, x2, y2, color) => [
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2.8"/>`,
    `<polygon points="${x2},${y2} ${x2 - 11},${y2 + 5} ${x2 - 11},${y2 - 5}" fill="${color}"/>`,
  ];
  parts.push(...arrow(280, 148, 280, 96, C.goldDeep));
  parts.push(text(292, 110, "force on the wire", { size: 12.5, fill: C.goldDeep, weight: "600" }));
  parts.push(text(280, 268, "field: N → S; current: into the page; force: upward", { anchor: "middle", size: 11.5 }));
  return frame({
    id: "mag-motor",
    title: "A wire carrying current into the page in a horizontal magnetic field, with the force acting upward",
    label: "Figure 1.",
    caption:
      "Fleming's left-hand rule gives the direction: first finger field, second finger current, thumb force — and all three are at right angles. Reverse the current and the force reverses; reverse the field and it reverses again; reverse both and it is unchanged, which is why the rule is worth practising with the field drawn rather than memorised as a sentence.",
    w: 560,
    h: 300,
    body: parts.join("\n"),
  });
})();

/* ── Figure: a triangle of forces ────────────────────────────────────── */
const triangle = (() => {
  const parts = [];
  const A = [150, 70];
  const B = [420, 70];
  const Cc = [260, 250];
  const line = (p, q, color, label, lx, ly) => [
    `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${color}" stroke-width="2.4"/>`,
    text(lx, ly, label, { size: 12.5, fill: color, weight: "600" }),
  ];
  parts.push(...line(A, B, C.gold, "W (weight)", 250, 60));
  parts.push(...line(B, Cc, C.goldDeep, "T₁", 356, 170));
  parts.push(...line(Cc, A, C.muted, "T₂", 176, 172));
  // Arrowheads to show the sense of the vectors, head to tail.
  parts.push(`<polygon points="420,70 410,65 410,75" fill="${C.gold}"/>`);
  parts.push(`<polygon points="260,250 268,241 259,237" fill="${C.goldDeep}"/>`);
  parts.push(`<polygon points="150,70 160,75 160,65" fill="${C.muted}"/>`);
  parts.push(text(150, 292, "the three forces, drawn head to tail, close the triangle", { size: 11.5 }));
  parts.push(text(150, 310, "so their resultant is zero and the body is in equilibrium", { size: 11.5 }));
  return frame({
    id: "fe-triangle",
    title: "Three forces drawn head to tail forming a closed triangle",
    label: "Figure 1.",
    caption:
      "A body in equilibrium under three non-parallel forces has a closed vector triangle. That is why the angles in the triangle equal the angles between the forces, and why the sine rule can be applied directly instead of resolving — a shortcut that saves a page of algebra in a three-force problem.",
    w: 560,
    h: 330,
    body: parts.join("\n"),
  });
})();

const oscillations = `<h2>Oscillations: what the equations are telling you</h2>
<p>Simple harmonic motion is defined by one condition — acceleration proportional to displacement and directed towards the equilibrium position — and everything else follows from it. This section works from that condition rather than from a list of formulae: why the period is independent of amplitude, where the energy goes, what damping actually does to the motion, and why resonance can be both useful and dangerous.</p>

<h3>From the defining condition to the equations</h3>
<p>The defining condition is a = −ω²x. The minus sign is the whole of "directed towards the equilibrium position", and the constant ω² is the "proportional to displacement". Differentiate the displacement twice and you get back an acceleration proportional to the displacement: x = A cos(ωt) gives v = −Aω sin(ωt) and a = −Aω² cos(ωt) = −ω²x. So the equation of motion is not an extra assumption; it is the condition written out.</p>
<p>Speed is greatest at the equilibrium position, where the displacement is zero, and zero at the extremes, where the displacement is A. That follows from the velocity expression: v = ±ω√(A² − x²), which is maximum when x = 0 and zero when x = A. Acceleration does the opposite: it is zero at the centre and maximum at the extremes. Students often get these two the wrong way round; the physical picture is that a pendulum moves fastest as it passes the bottom and is momentarily stationary at the top of each swing, while the restoring force is greatest at the extremes.</p>
<p>The period is T = 2π/ω, and for a mass on a spring ω = √(k/m), so T = 2π√(m/k); for a simple pendulum ω = √(g/L), so T = 2π√(L/g). Two consequences are examinable. The period does not depend on amplitude, which is what makes a pendulum a clock: the swings get smaller as the clock runs down, but they take the same time. And the period does depend on mass for a spring but not for a pendulum, because the restoring force for a spring is proportional to the extension while for a pendulum it is proportional to the component of weight, which depends on g and L rather than on the bob's mass.</p>

<h3>Energy in SHM, and the shape of the curves</h3>
<p>At the extremes the energy is entirely potential — elastic in a spring, gravitational in a pendulum — and the kinetic energy is zero. At the equilibrium position it is entirely kinetic and the potential energy is zero. In between, the two are exchanged. The kinetic energy is ½mv², which with v = ω√(A² − x²) becomes ½mω²(A² − x²); the potential energy is ½mω²x²; and their sum, ½mω²A², is constant. That total is the maximum kinetic energy and also the maximum potential energy, and it is proportional to the square of the amplitude, which is why doubling the amplitude quadruples the energy that must be supplied.</p>
<p>The graphs are worth sketching once and remembering: kinetic energy peaks at the centre and falls to zero at both extremes, potential energy does the reverse, and both are parabolas in x rather than sine curves in t. A graph of total energy against time is a horizontal line if there is no damping — and that flat line is the reason a question asking "why does the amplitude not change?" wants the answer "no energy is lost to the surroundings".</p>

<h3>Damping: three cases and one design decision</h3>
<p>Damping removes energy from an oscillator, usually to the surroundings as thermal energy. Light damping lets the amplitude decay over many oscillations, and the period is almost unchanged. Heavy damping removes energy so quickly that the system returns to equilibrium without oscillating at all, but slowly. Critical damping is the boundary case: the system returns in the shortest possible time without overshooting (Figure 1).</p>
<p>The engineering examples are chosen because one of the three behaviours is exactly what is wanted. Car suspension is designed to be slightly under critical damping, so that a bump is absorbed quickly without the car bouncing; a door closer is critically damped so the door shuts without slamming; a galvanometer needle is damped so that it settles on a reading quickly rather than swinging past it. A child on a swing wants very light damping, because the point is to keep going.</p>

<h3>Resonance, and why the Tacoma Narrows bridge is not the whole story</h3>
<p>Every oscillator has a natural frequency. If a periodic driving force is applied at that frequency, the amplitude of the response is maximum — resonance — because each push arrives in step with the motion and adds energy. The amplitude also depends on the damping: lightly damped systems resonate sharply and reach a large amplitude, heavily damped ones have a broad, low peak.</p>
<p>Useful resonance is easy to list: a microwave oven drives water molecules at their resonant frequency, a radio tunes its circuit so that one station's frequency resonates while others do not, and a musical instrument's body resonates to amplify a particular range of notes. Destructive resonance needs the mechanism named: soldiers marching in step across a bridge can drive it at its natural frequency, which is why they break step; a washing machine spinning at a speed that matches its own natural frequency walks across the floor; and a building can be driven by wind or by an earthquake at a frequency close to its own. The remedy in each case is either to change the natural frequency or to add damping, and both are examinable answers.</p>
<p>One caution about the Tacoma Narrows collapse: the popular account says it was simple resonance, but the motion was a torsional flutter, a self-exciting oscillation rather than a response to a periodic driving force at the natural frequency. If you are asked about resonance, use the marching soldiers or the washing machine; if you are asked about Tacoma Narrows, describe aeroelastic flutter and do not claim it as a resonance example.</p>

<h3>The graph questions, and how to read them</h3>
<p>Three graphs appear repeatedly. A displacement-time graph of SHM is a sine or cosine curve, and its gradient at any point is the velocity; the gradient is steepest at the centre and zero at the extremes. A velocity-time graph is the same curve shifted by a quarter of a period, and its gradient is the acceleration. An acceleration-displacement graph is a straight line through the origin with a negative gradient, whose gradient is −ω² — which is the experimental test for SHM and the reason a question might ask you to show that a motion is simple harmonic by plotting a against x.</p>
<p>When reading any of these, check the axes before anything else. A graph of displacement against time has a period you read horizontally and an amplitude you read vertically; a graph of displacement against position (for a wave, not an oscillator) has a wavelength horizontally. The two look identical and mean completely different things.</p>`;

const magnetic = `<h2>Magnetic Fields: the rules, and why they are vector rules</h2>
<p>The right-hand grip rule, Fleming's left-hand rule and Lenz's law are usually memorised as three separate tricks. They are one idea seen from three directions: a current produces a magnetic field, a magnetic field exerts a force on a current, and a changing magnetic flux induces a current that opposes the change. This section connects them and then applies them to the cases that appear in exams.</p>

<h3>Flux density, flux and flux linkage</h3>
<p>Magnetic flux density B is the force per unit current per unit length on a conductor placed at right angles to the field, which is why its unit, the tesla, is equivalent to a newton per ampere-metre. It is a vector: it has a direction, and the direction is where the north pole of a compass would point.</p>
<p>Magnetic flux Φ is the product of flux density and area, Φ = BA, and it is a measure of how many field lines pass through a surface. When the surface is not perpendicular to the field, only the component of B perpendicular to the area counts, so Φ = BA cos θ, where θ is the angle between the field and the normal to the surface. Flux linkage is the flux multiplied by the number of turns: NΦ = NBA cos θ. That progression — B, then Φ, then NΦ — is the one to keep straight, because most induction errors come from using B where NΦ is needed.</p>

<h3>Force on a conductor, and on a moving charge</h3>
<p>A straight wire of length L carrying current I at right angles to a field B experiences a force F = BIL (Figure 1). If the wire is at an angle θ to the field, only the perpendicular component matters, so F = BIL sin θ; the force is zero when the wire lies along the field, which is worth knowing as a check on your answer. The direction comes from Fleming's left-hand rule: first finger field, second finger current, thumb force, mutually at right angles.</p>
<p>A moving charge is a current, so the same force appears in the form F = BQv. For an electron moving at right angles to a uniform field, the force is always perpendicular to the velocity, so it provides a centripetal force and the path is a circle: BQv = mv²/r, giving r = mv/(BQ). This is the principle of the mass spectrometer and of a cyclotron, and it explains why the radius is larger for a faster particle and smaller for a more charged one. A question that asks why the speed does not change while the direction does is asking you to notice that the force is always perpendicular to the motion, so no work is done on the particle.</p>
<p>Two parallel wires carrying current in the same direction attract; in opposite directions they repel. The mechanism is worth stating: each wire produces a field, and the other wire's current experiences a force in that field. Do not say "like currents attract like magnets" — it is the field of one acting on the current in the other.</p>

<h3>Fields due to currents, and the shapes worth drawing</h3>
<p>A long straight wire produces circular field lines around it, with the direction given by the right-hand grip rule: thumb along the current, fingers curl in the direction of the field. The field strength falls with distance, B = μ₀I/(2πr). A solenoid produces a field like a bar magnet's: uniform inside, weak and spreading outside, with the end that current appears to circulate anticlockwise (viewed from outside) acting as a north pole. The field inside a solenoid is B = μ₀nI, where n is the number of turns per metre, and the fact that it does not depend on the radius is why solenoids are used to produce uniform fields.</p>
<p>For two fields superimposed — a current-carrying wire in an external field, for instance — the resultant is the vector sum, so the field is strengthened on one side and weakened on the other. That is the mechanism behind the force on the wire, stated in field terms rather than as a rule to memorise.</p>

<h3>Induction, and the conservation law hiding inside Lenz's law</h3>
<p>A change in magnetic flux through a circuit induces an electromotive force. Faraday's law gives its size: the induced emf equals the rate of change of flux linkage, ε = −N dΦ/dt. The minus sign is Lenz's law, and it is not a convention: it says the induced current opposes the change that produced it, which is a statement of conservation of energy. If the induced current helped the change, it would grow without any input of energy, which is impossible.</p>
<p>Four ways to induce an emf follow from the formula, and each is worth a sentence. Move a magnet into a coil: the flux through the coil changes. Move the coil into a field: the same thing from the other side. Rotate the coil: the angle between the field and the normal changes, so cos θ changes even if B and A are fixed. And change the current in a nearby circuit: its field changes, so the flux through the second circuit changes. That last one is mutual induction, and it is the basis of the transformer.</p>
<p>The direction question is answered by Lenz's law rather than by a separate rule. Drop a magnet through a coil: as the north pole approaches, the flux through the coil increases, so the induced current produces a field that repels the approaching pole — a north pole at the top of the coil. As the magnet leaves, the flux decreases, so the induced current now attracts, producing a south pole at the bottom. The induced current therefore always acts as a brake, which is exactly what energy conservation requires.</p>

<h3>Transformers and transmission</h3>
<p>A transformer has two coils on a shared iron core; an alternating current in the primary produces a changing flux in the core, which links the secondary and induces an alternating emf there. For an ideal transformer, power in equals power out, so V_p I_p = V_s I_s, and the turns ratio gives V_s/V_p = N_s/N_p. A step-up transformer has more turns on the secondary and raises the voltage; a step-down has fewer and lowers it.</p>
<p>The reason electricity is transmitted at high voltage is the power equation. The power lost in a transmission cable is I²R, so for a given power P = VI, raising V lowers I and reduces the loss by the square of the current ratio. Transmitting 100 MW at 25 kV requires 4,000 A and loses 4,000² × R watts in the cable; at 400 kV it requires 250 A and loses 250² × R, sixteen times less for the same cable. The transformer is what makes the high voltage practical, and the whole grid depends on it.</p>

<h3>Alternating current: peak, rms and why the root mean square exists</h3>
<p>An alternating current reverses direction, so its average value over a cycle is zero — which would make "average current" useless for calculating power. The power dissipated depends on the square of the current, so the meaningful average is the mean of the square, and taking the square root of that gives a value that behaves like a direct current: the root mean square. For a sine wave, I_rms = I₀/√2 and V_rms = V₀/√2, and the power is P = I_rms V_rms = ½I₀V₀. Mains voltage quoted as 230 V is an rms value; the peak is about 325 V.</p>
<p>Rectification turns alternating current into direct current with diodes, which conduct in one direction only. A half-wave rectifier uses one diode and passes one half of each cycle; a full-wave rectifier uses four in a bridge and passes both, folding the negative half into positive. Smoothing then uses a capacitor across the output: it charges when the voltage rises and discharges when it falls, filling the gaps between peaks into a steadier dc. A larger capacitor or a higher frequency gives smoother output, because the capacitor has less time to discharge between peaks.</p>`;

const forcesEq = `<h2>Forces and Equilibrium: the conditions, and how to use them</h2>
<p>Two conditions decide whether a rigid body is in equilibrium, and almost every question is one of them applied carefully: the resultant force is zero, and the resultant moment about any point is zero. This section explains why both are needed, how to choose the pivot that makes a moment problem easy, and how a three-force problem can be solved with a triangle instead of simultaneous equations.</p>

<h3>Why a body can have zero resultant force and still rotate</h3>
<p>Two equal and opposite forces applied at different points produce no resultant force but a turning effect — a couple. The body will not accelerate, but it will rotate. That is why the second condition is not redundant: the force condition controls translation and the moment condition controls rotation. A body at rest needs both.</p>
<p>The moment of a force about a point is force times perpendicular distance from the point to the line of action. The phrase "perpendicular distance" is the whole trap: if a force acts at an angle, the moment is Fd sin θ, where d is the distance along the beam and θ is the angle between the beam and the force. A force acting along a line that passes through the pivot has zero moment, however large it is, because its perpendicular distance is zero. Recognising that saves work in almost every diagram.</p>

<h3>Couples and torque</h3>
<p>A couple is a pair of equal and opposite forces whose lines of action are separated. The torque of a couple is the force multiplied by the perpendicular distance between the two lines of action, not by the distance from a pivot, because a couple has no single point of application. Turning a steering wheel, a tap or a screwdriver all apply couples; the reason a wide steering wheel is easier to turn is that the distance between the hands is the moment arm.</p>
<p>Note the vocabulary: a single force has a moment about a point, while a couple has a torque. Exam questions are usually forgiving about the words but not about the arithmetic, and the arithmetic for a couple is one line: T = Fd, with d measured between the lines of action.</p>

<h3>Choosing the pivot, which is the whole skill</h3>
<p>In a moment problem the pivot may be chosen anywhere, because a body in equilibrium has zero moment about any point. Choosing it at the point where an unknown force acts makes that force's moment zero, so it drops out of the equation. A beam with two supports and three loads is therefore solved twice, once taking moments about each support, and each equation contains only the other support's reaction. This is not a trick but a consequence of the equilibrium condition, and it is the fastest route through any beam question.</p>
<p>Worked example: a uniform beam of weight 200 N and length 4.0 m rests on supports at each end. A load of 300 N is placed 1.0 m from the left end. Taking moments about the left support removes that reaction: the load gives 300 × 1.0 = 300 N m clockwise; the beam's weight acts at its centre, 2.0 m from the left support, giving 200 × 2.0 = 400 N m clockwise; the right support's reaction R acts at 4.0 m, giving 4.0R anticlockwise. So 4.0R = 700 and R = 175 N. The force condition then gives the left reaction: 500 − 175 = 325 N.</p>
<p>The check is not optional: take moments about the right support and see whether the same numbers work. The left reaction acts 4.0 m away, giving 325 × 4.0 = 1,300 N m anticlockwise; the load is 3.0 m from the right support, giving 300 × 3.0 = 900 N m, and the weight is 2.0 m away, giving 200 × 2.0 = 400 N m, for 1,300 N m clockwise. The two agree, which confirms both reactions. Doing this check every time is how a sign error or a mis-measured distance is caught in the exam rather than after it.</p>

<h3>Three forces: the triangle shortcut</h3>
<p>If a body is in equilibrium under exactly three non-parallel forces, their lines of action must meet at a point, and drawn head to tail they form a closed triangle (Figure 1). That converts a resolution problem into a trigonometry problem: the angles of the triangle are the angles between the forces, so the sine rule gives the magnitudes directly. For a lamp hanging from two angled wires, the triangle has the weight along one side and the two tensions along the others, and the angles are known from the geometry of the wires.</p>
<p>Worked example: a 60 N lamp hangs from two wires, one making 40° with the horizontal and the other 50°. The angle between the wires is therefore 90°, so the vector triangle is right-angled and the weight of 60 N is its hypotenuse, with the two tensions as the legs. Each tension is the weight multiplied by the cosine of the angle it makes with the vertical: the 40° wire is 50° from the vertical, so its tension is 60 cos 50° = 39 N; the 50° wire is 40° from the vertical, so its tension is 60 cos 40° = 46 N. Check with Pythagoras: 39² + 46² = 1,521 + 2,116 = 3,637, and √3,637 = 60.3, which is 60 to two significant figures. Notice that the steeper wire carries the greater tension, which is the general result and a useful sanity check on any hanging-lamp answer.</p>

<h3>Centre of gravity, stability and toppling</h3>
<p>The weight of a body acts through its centre of gravity, which for a uniform regular object is at its geometric centre. That single fact turns a complicated body into a point for the purposes of moments. A non-uniform object — a loaded shelf, a broom — has its centre of gravity towards the heavier end, which is why a loaded shelf must be supported closer to the load.</p>
<p>Stability follows from the same idea. A body topples when the vertical line through its centre of gravity falls outside its base. A wide base and a low centre of gravity therefore both increase stability, because they make it harder for that vertical line to pass outside the base. A racing car is low and wide for exactly this reason, and a double-decker bus is tall and narrow, which is why it is more prone to rolling over. The question "why does a suitcase fall over when it is tall and narrow?" is answered by where the vertical through its centre of gravity lands.</p>

<h3>Resolving, and the components worth naming</h3>
<p>Any force can be replaced by two perpendicular components, F cos θ along one axis and F sin θ along the other, where θ is measured from that axis. The choice of axes is yours and should be made to simplify: for a block on an incline, take axes along and perpendicular to the slope, so that the weight has components mg sin θ down the slope and mg cos θ into it, and the normal reaction is entirely along one axis. Resolving along horizontal and vertical instead produces two simultaneous equations for a problem that needed one.</p>
<p>The signs are the other half of the method. Choose a positive direction, state it, and apply it consistently to every force; a sign error is the most common cause of a wrong answer in this topic, and stating the convention is the cheapest insurance against it. If the answer comes out negative, that is information: the force acts in the opposite direction to your convention, not that you have made a mistake.</p>`;

module.exports = {
  sections: [
    {
      id: "17860f55-8ba0-4591-85d1-577aabc0b5af",
      slug: "oscillations-and-waves-ii",
      heading: "Oscillations: what the equations are telling you",
      html: oscillations + "\n" + damping + "\n",
    },
    {
      id: "df41cba4-9394-49c0-8680-fde851153c12",
      slug: "magnetic-fields-and-electromagnetism",
      heading: "Magnetic Fields: the rules, and why they are vector rules",
      html: magnetic + "\n" + motorEffect + "\n",
    },
    {
      id: "3a5f3230-7e9e-4d8b-8943-bcf86193dc3b",
      slug: "forces-and-equilibrium",
      heading: "Forces and Equilibrium: the conditions, and how to use them",
      html: forcesEq + "\n" + triangle + "\n",
    },
  ],
};
