// Physics depth pass, tranche C.
const F = require("./note-figures.cjs");
const { C, text, frame, plot } = F;

/* ── Figure: stress-strain curve with the named points ────────────────── */
const stressStrain = (() => {
  const pts = [];
  for (let x = 0; x <= 1.2; x += 0.1) pts.push([+x.toFixed(1), +(120 * x).toFixed(0)]);
  for (let x = 1.3; x <= 2.2; x += 0.1) pts.push([+x.toFixed(1), +(144 + (x - 1.2) * 70 - (x - 1.2) ** 2 * 30).toFixed(0)]);
  for (let x = 2.3; x <= 3.4; x += 0.1) pts.push([+x.toFixed(1), +(144 + (x - 1.2) * 40).toFixed(0)]);
  return plot({
    id: "mat-stress",
    title: "Stress against strain for a ductile metal, marking the limit of proportionality and the yield point",
    label: "Figure 1.",
    caption:
      "The straight section from the origin is Hooke's law, and its gradient is the Young modulus. Past the limit of proportionality the curve bends; past the yield point the material extends rapidly with little extra stress, and past the maximum it necks and breaks. A brittle material would show no plastic region at all — it would break at the end of the straight line.",
    w: 580,
    h: 340,
    x: { min: 0, max: 3.4, ticks: [0, 1, 2, 3], label: "strain (%)" },
    y: { min: 0, max: 220, ticks: [0, 50, 100, 150, 200], label: "stress (MPa)" },
    series: [{ points: pts, color: C.gold, width: 2.6, smooth: false }],
    annotations: [
      { x: 1.25, y: 150, text: "limit of proportionality", dx: 6, dy: -10, color: C.muted, size: 11.5 },
      { x: 2.3, y: 190, text: "yield", dx: 6, dy: 0, color: C.goldDeep, size: 11.5 },
      { x: 3.0, y: 170, text: "breaking stress", dx: -6, dy: -12, anchor: "end", color: C.ink, size: 11.5 },
    ],
  });
})();

/* ── Figure: gravitational field strength and potential against radius ── */
const gravityCurves = (() => {
  const g = [];
  const v = [];
  for (let r = 1; r <= 6; r += 0.1) {
    g.push([+r.toFixed(1), +(1 / (r * r)).toFixed(3)]);
    v.push([+r.toFixed(1), +(-1 / r).toFixed(3)]);
  }
  return plot({
    id: "grav-curves",
    title: "Gravitational field strength and potential outside a uniform sphere",
    label: "Figure 1.",
    caption:
      "Field strength falls as 1/r² while potential falls as 1/r, and potential is always negative since work is done on a mass as it is brought in from infinity. The gradient of the potential curve at any radius gives the field strength there, which is why the two curves are related by a derivative rather than by a constant factor.",
    w: 580,
    h: 340,
    x: { min: 0.8, max: 6, ticks: [1, 2, 3, 4, 5, 6], label: "distance from centre, in planetary radii" },
    y: { min: -1.1, max: 1.1, ticks: [-1, -0.5, 0, 0.5, 1], label: "g (arbitrary) and V (arbitrary)" },
    series: [
      { points: g, color: C.gold, width: 2.4, smooth: true },
      { points: v, color: C.goldDeep, width: 2.4, smooth: true, kind: "dashed" },
    ],
    hidden: [{ y: 0, color: C.faint }],
    annotations: [
      { x: 1.15, y: 0.72, text: "g ∝ 1/r²", dx: 6, dy: 0, color: C.gold, size: 12 },
      { x: 2.4, y: -0.5, text: "V ∝ −1/r", dx: 6, dy: 0, color: C.goldDeep, size: 12 },
    ],
  });
})();

/* ── Figure: Doppler redshift of a galaxy spectrum ───────────────────── */
const redshift = (() => {
  const parts = [];
  const drawSpectrum = (y, shift, label) => {
    const out = [];
    out.push(`<rect x="40" y="${y}" width="470" height="26" fill="${C.goldFillSoft}" stroke="${C.border || "hsl(var(--border))"}" stroke-width="1"/>`);
    // Dark absorption lines at fixed spacing, shifted by the galaxy's motion.
    for (const [pos, w] of [[120, 4], [180, 6], [236, 3], [300, 5], [360, 4]]) {
      out.push(`<rect x="${40 + (pos - 40) * (1 + shift)}" y="${y}" width="${w}" height="26" fill="${C.ink}"/>`);
    }
    out.push(text(516, y + 18, label, { size: 11.5, fill: C.ink }));
    return out;
  };
  parts.push(...drawSpectrum(70, 0, "laboratory"));
  parts.push(...drawSpectrum(150, 0.14, "distant galaxy"));
  // Bracket showing the displacement of one line.
  parts.push(
    `<line x1="300" y1="104" x2="336" y2="104" stroke="${C.goldDeep}" stroke-width="1.2" stroke-dasharray="3 3"/>`,
    `<line x1="336" y1="104" x2="336" y2="142" stroke="${C.goldDeep}" stroke-width="1.2" stroke-dasharray="3 3"/>`,
    text(342, 118, "same line, longer wavelength: redshift", { size: 11.5, fill: C.goldDeep }),
    text(40, 232, "the pattern is identical, only moved: that is what identifies the element", { size: 11.5 }),
    text(40, 252, "z = Δλ / λ, and for speeds well below c, v = zc", { size: 11.5 }),
  );
  return frame({
    id: "space-redshift",
    title: "Absorption line patterns from a laboratory source and a distant galaxy, shifted towards the red",
    label: "Figure 1.",
    caption:
      "The spacing of the dark lines is unique to each element, so a shifted pattern can still be identified. Measuring the fractional shift of a known line gives the redshift, and multiplying by the speed of light gives the recessional velocity — the observation behind Hubble's law.",
    w: 600,
    h: 280,
    body: parts.join("\n"),
  });
})();

const earthSpace = `<h2>Earth and Space: the mechanics behind the facts</h2>
<p>This topic is often learned as a set of facts about the Solar System, which makes it hard to answer anything unfamiliar. Almost every fact in it follows from two ideas — gravity and the conservation of angular momentum — so this section derives the facts rather than listing them, and then covers the observational evidence for the expansion of the Universe in the form exam questions use.</p>

<h3>Why a year is a year, and why the seasons are not caused by distance</h3>
<p>The Earth orbits the Sun once every 365.25 days, and the orbit is close to circular, so the distance to the Sun changes by only about 3 % over the year. That is far too small to explain a temperature difference between summer and winter, which is why "the Earth is closer to the Sun in summer" is wrong. The seasons are caused by the Earth's axial tilt of about 23.5°: as the Earth orbits, the northern hemisphere alternates between being tilted towards the Sun, when sunlight arrives more directly and days are longer, and tilted away, when it arrives at a shallower angle and days are shorter. Both effects add: a steeper angle concentrates the same power into a smaller area, and a longer day gives more hours of heating.</p>
<p>The same tilt explains the tropics. Between the Tropics of Cancer and Capricorn the Sun can be directly overhead at some point in the year; at the equator the day length is almost constant at twelve hours; and beyond the Arctic and Antarctic circles there is at least one day of continuous daylight and one of continuous darkness each year. Each of these is a consequence of the tilt plus the Earth's rotation, not a separate fact to memorise.</p>

<h3>Orbits, and why the Moon does not fall</h3>
<p>A satellite in a circular orbit is in free fall: gravity provides exactly the centripetal force needed to keep it moving in a circle, so it accelerates towards the Earth continuously without getting closer. That is the resolution of the apparent paradox. The speed needed follows from equating the gravitational force to the centripetal requirement: GMm/r² = mv²/r, so v = √(GM/r). A higher orbit has a smaller speed, which is counter-intuitive but follows from the equation — and it is why a geostationary satellite, at 36,000 km, takes 24 hours while a low-orbit satellite at 400 km takes about 90 minutes.</p>
<p>A geostationary satellite must orbit above the equator, in the same direction as the Earth's rotation, with a period of exactly one day. Those three conditions are all examinable, and each has a reason: above the equator so that it stays over one point; the same direction so that it does not drift westward relative to the ground; and one day so that its orbital period matches the Earth's rotation. Communications and weather satellites use this orbit because a dish can point at a fixed spot in the sky.</p>

<h3>The Solar System, and what the patterns tell you</h3>
<p>The rocky planets — Mercury, Venus, Earth and Mars — are small, dense and close to the Sun; the gas giants — Jupiter and Saturn — and the ice giants — Uranus and Neptune — are large, less dense and further out. The pattern is a clue to formation: close to the Sun, temperatures were too high for volatile compounds to condense, so only rock and metal could accrete; further out, water, ammonia and methane condensed into ices, which were far more abundant, so the planets grew larger. That is why the inner planets are rocky and the outer ones are not, and it is a better answer than a list of names.</p>
<p>Comets are icy bodies on highly elliptical orbits; as one approaches the Sun, the ice sublimes and the solar wind sweeps the gas and dust into a tail that points away from the Sun, not behind the comet's motion. Asteroids are rocky bodies concentrated in a belt between Mars and Jupiter, where Jupiter's gravity prevented them from accreting into a planet. Both are worth being able to distinguish, because a question that asks why a comet's tail points away from the Sun is really asking about radiation pressure and the solar wind.</p>

<h3>Stars: the life cycle in one paragraph</h3>
<p>A star forms when a cloud of gas and dust collapses under gravity; the gravitational energy becomes heat, and when the core is hot enough, hydrogen nuclei fuse into helium and the outward pressure of radiation balances the inward pull of gravity. That balance lasts for most of the star's life. When the hydrogen in the core is exhausted, the core contracts and heats, and the outer layers expand into a red giant. What happens next depends on mass: a star like the Sun sheds its outer layers as a planetary nebula and leaves a white dwarf, which cools over billions of years; a star several times more massive fuses heavier elements, collapses in a supernova, and leaves a neutron star or, if massive enough, a black hole. The heavy elements in your body were made in such stars, which is why the statement "we are made of star dust" is literally true rather than poetic.</p>

<h3>Redshift, and what the evidence actually shows</h3>
<p>Each element produces a characteristic pattern of dark absorption lines in a spectrum. In the light from a distant galaxy the same pattern appears, but shifted towards longer wavelengths (Figure 1). The fractional shift, z = Δλ/λ, is the redshift, and for speeds well below the speed of light it equals v/c, so the recessional velocity is v = zc. Measuring the shift of a known line therefore gives a velocity without any assumption about the galaxy's brightness.</p>
<p>Hubble plotted recessional velocity against distance for many galaxies and found a straight line through the origin: v = H₀d, with H₀ about 70 km s⁻¹ Mpc⁻¹. That is the observational basis of the expanding Universe. Two points about the interpretation are worth being precise on. The expansion is of space itself, not galaxies moving through space, which is why every observer sees the same relationship regardless of which galaxy they are in. And the linear relationship implies a finite age: dividing distance by velocity gives 1/H₀, about 14 billion years.</p>
<p>The cosmic microwave background is the strongest independent evidence. It is radiation at about 2.7 K filling all of space, interpreted as light from the moment the Universe cooled enough to become transparent, stretched by expansion into microwaves. Its near-uniformity, and the tiny ripples in it that seed galaxy formation, are predictions of the hot Big Bang model that were confirmed after the theory was proposed — which is the strongest kind of evidence a scientific model can have.</p>`;

const materials = `<h2>Materials: what the graph is telling you, and how to measure it honestly</h2>
<p>Hooke's law and the Young modulus are simple, and the exam questions are not: they ask you to interpret a graph, to choose the right gradient, to convert units, and to attach an uncertainty to the answer. This section covers each of those, in the order a practical does them.</p>

<h3>Hooke's law is a condition, not a law of nature</h3>
<p>Hooke's law says that the extension of a spring is proportional to the force applied, provided the limit of proportionality is not exceeded: F = kx. It is an empirical rule that holds for metals at small strains and fails for rubber, for plastic, and for any material beyond its limit. The word "proportional" is the part that matters: it means a straight line through the origin, not merely a straight line. A graph with a straight section that does not pass through the origin — a spring with a pre-load, for instance — does not show proportionality in the strict sense, though the gradient still gives the spring constant.</p>
<p>Beyond the limit of proportionality the line curves (Figure 1). Beyond the elastic limit the material is permanently deformed: when the force is removed it does not return to its original length. Beyond the yield point it extends rapidly with little additional stress, and beyond the maximum it necks and then breaks. These are four distinct features and questions often ask which is which, so it is worth sketching the graph once with all four labelled.</p>

<h3>Stress and strain: turning force and extension into properties</h3>
<p>Stress is force per unit cross-sectional area, σ = F/A, in pascals. Strain is the fractional change in length, ε = ΔL/L, and it is dimensionless, which is why it is often quoted as a percentage. The point of dividing by area and by original length is that the resulting quantities describe the material rather than the particular specimen: a thick wire and a thin wire of the same steel have different spring constants but the same Young modulus.</p>
<p>Young modulus is the ratio of stress to strain in the linear region: E = σ/ε = (F/A)/(ΔL/L) = FL/(AΔL). Its unit is the pascal, and typical values are around 2 × 10¹¹ Pa for steel, 7 × 10¹⁰ Pa for aluminium and 1 × 10¹⁰ Pa for bone. Those orders of magnitude are worth remembering, because an answer that comes out at 10⁵ Pa for steel is a signal that a unit has gone wrong.</p>
<p>Worked example: a steel wire of length 2.0 m, diameter 0.50 mm, extends by 1.2 mm under a load of 50 N. The area is π(0.25 × 10⁻³)² = 1.96 × 10⁻⁷ m²; the stress is 50 / 1.96 × 10⁻⁷ = 2.55 × 10⁸ Pa; the strain is 1.2 × 10⁻³ / 2.0 = 6.0 × 10⁻⁴; and the Young modulus is 2.55 × 10⁸ / 6.0 × 10⁻⁴ = 4.2 × 10¹¹ Pa. That is larger than steel but not absurd — a thin wire of a stiff alloy — and the important thing is the method: convert every length to metres before substituting, and keep the area in square metres.</p>

<h3>Elastic strain energy, and where the half comes from</h3>
<p>The energy stored in a stretched wire or spring is the area under the force-extension graph. For the linear region that area is a triangle, so the energy is ½Fx, or ½kx², or ½ × stress × strain × volume. The half appears for the same reason it appears in kinetic energy: the force rises from zero to F as the extension grows, so the average force is F/2. A wire stretched by 2.0 mm under a force rising to 80 N stores ½ × 80 × 2.0 × 10⁻³ = 0.080 J.</p>
<p>Three equivalent expressions are worth knowing because each is convenient in a different question. ½Fx is easiest when force and extension are given. ½kx² is easiest when the spring constant is given. And ½ × stress × strain × volume is easiest when the question gives the dimensions of a specimen and asks for the energy per unit volume — which is the area under the stress-strain curve, a quantity called the strain energy density and equal to σ²/(2E) in the linear region.</p>

<h3>Brittle, ductile and polymeric behaviour</h3>
<p>A brittle material such as glass or cast iron breaks at the end of the linear region, with little or no plastic deformation; its stress-strain graph is a straight line that stops abruptly. A ductile material such as copper or mild steel has a long plastic region and necks before breaking, which is why it can be drawn into wire. An elastomer such as rubber has a curve that is not straight at all: it extends easily at first, stiffens as the polymer chains align, and retracts along a different path, so energy is dissipated as heat in each cycle. That hysteresis is why a rubber band warms when repeatedly stretched, and it is the reason rubber is good for damping and poor for returning energy.</p>
<p>These categories matter in design questions, and the answer is always a trade-off. A bicycle frame wants stiffness and strength with low mass, so it is made from an alloy with a high Young modulus and a high yield stress. A car bumper wants to deform plastically to absorb energy without breaking, so it is made from a ductile polymer. A bridge cable wants to stay within its elastic limit under all loads, so it is designed with a large safety factor against its breaking stress.</p>

<h3>Uncertainty in a materials experiment</h3>
<p>The Young modulus experiment has four measured quantities, and the uncertainty in the answer comes from all of them. Length is measured with a metre rule to ±1 mm; extension with a vernier scale or a travelling microscope to ±0.01 mm; diameter with a micrometer at several points around the wire, because it is never perfectly circular, and the mean used; force from a newton-meter or masses, with g taken as 9.81 m s⁻². The percentage uncertainty in the area is twice that in the diameter, because the area depends on the square of the diameter — a point that is worth a mark on its own.</p>
<p>The largest contribution usually comes from the extension, because it is the smallest measurement; that is why a long wire is used, to make the extension as large as possible relative to the resolution of the instrument. A systematic error would come from a zero error on the micrometer, and it would shift every diameter reading in the same direction; a random error would come from reading the scale differently each time, and it would average out. Repeating and taking a mean reduces random error but does nothing to systematic error, which is why the micrometer should be checked closed before use.</p>
<p>Control variables are the ones the examiner looks for: the same wire throughout, the same temperature, and no kinks or bends, because a kink concentrates stress and changes the effective length. The wire should be loaded and unloaded once before measurements begin, to straighten it and to take up any slack in the support.</p>`;

const circularGravity = `<h2>Circular Motion and Gravity: the same force seen twice</h2>
<p>Circular motion and gravitational fields are taught as separate topics and are the same physics: in both, a force acts perpendicular to the velocity and produces an acceleration towards a centre. This section connects them, then deals with the parts that are most often learned as formulae without meaning — potential, escape velocity, and the difference between field strength and potential.</p>

<h3>Circular motion: why the acceleration points inward</h3>
<p>Speed is constant in uniform circular motion, but velocity is not, because its direction changes continuously. The change in velocity points towards the centre of the circle, so the acceleration does too, and its magnitude is v²/r. That is why the force needed is mv²/r: it is not a new kind of force, but whatever force happens to be acting towards the centre — tension in a string, friction between tyres and road, gravity for a satellite, the normal reaction for a car on the inside of a loop.</p>
<p>Three consequences are examinable and often missed. First, no work is done by the centripetal force, because it is always perpendicular to the motion, so the speed stays constant — which is why a satellite in a circular orbit does not need fuel. Second, the required force grows with the square of the speed, which is why a car can take a bend slowly but not quickly, and why the maximum safe speed on a bend depends on the coefficient of friction. Third, the sensation of being "thrown outward" is not a force: there is no outward force, only the inertia of your body continuing in a straight line while the vehicle turns. That distinction is worth stating explicitly in any question about a fairground ride.</p>
<p>Angular velocity is the rate of change of angle, ω = 2π/T = v/r, and the centripetal acceleration can also be written a = ω²r. The two forms are useful in different cases: v²/r when the linear speed is given, ω²r when the period is given. For a conical pendulum or a banked track, resolving vertically and horizontally, with the centripetal force horizontal, is the standard method — and the angle of banking that makes friction unnecessary is given by tan θ = v²/(rg).</p>

<h3>Gravitational field strength: force per unit mass, and it is a vector</h3>
<p>The gravitational field strength at a point is the force per unit mass on a small test mass placed there: g = F/m. Near the Earth's surface it is about 9.81 N kg⁻¹, and it is the same quantity as the acceleration of free fall, because F = ma and F = mg. That equivalence is the reason a hammer and a feather fall together in a vacuum.</p>
<p>For a spherical mass, the field outside it is that of a point mass at its centre: g = GM/r². The 1/r² dependence means the field strength falls quickly with distance — at twice the Earth's radius it is a quarter of the surface value — and the curve is steep near the surface and flat far away (Figure 1). Inside a uniform sphere the field falls linearly to zero at the centre, which is why a tunnel through the Earth would produce simple harmonic motion rather than a fall to the middle and a stop.</p>
<p>The vector nature matters in a question about the field between the Earth and the Moon. There is a point where the two fields are equal and opposite, and the resultant field is zero; that point is closer to the Moon because the Moon is less massive. It is not the same as the point where the gravitational forces on a spacecraft are equal, because the spacecraft's mass cancels in both — the two points are the same, which is worth noting.</p>

<h3>Potential: energy per unit mass, and why it is negative</h3>
<p>Gravitational potential at a point is the work done per unit mass in bringing a small mass from infinity to that point. Since gravity attracts, the field does the work for you as the mass comes in, so the work done by an external agent is negative; hence potential is negative everywhere and tends to zero at infinity. For a point mass, V = −GM/r.</p>
<p>The relationship between potential and field strength is that the field strength is the negative gradient of the potential: g = −dV/dr. That is why the two curves in Figure 1 have different shapes — 1/r² and 1/r — and why the potential curve is the integral of the field curve. It is also why the potential difference between two points is what matters physically: the work done in moving between them is mΔV, and the absolute value of V at a point has no direct physical meaning.</p>
<p>The potential energy of a mass m at potential V is U = mV = −GMm/r. The negative sign has a real consequence: a satellite in a higher orbit has a less negative potential energy, so it has more energy, and energy must be supplied to lift it. That is why a rocket needs fuel to climb to a higher orbit even though the orbital speed there is lower — the kinetic energy falls, but the potential energy rises by twice as much, and the total rises.</p>

<h3>Escape velocity, derived rather than memorised</h3>
<p>Escape velocity is the minimum speed at which a projectile can leave a planet's field without further propulsion. At the surface the total energy is ½mv² − GMm/R; at infinity it is zero. Setting the total equal to zero gives ½v² = GM/R, so v = √(2GM/R). For the Earth this is about 11.2 km s⁻¹, and for the Moon about 2.4 km s⁻¹, which is why the Moon has no atmosphere: gas molecules at ordinary temperatures have speeds comparable with its escape velocity, so they leak away over geological time.</p>
<p>Two points about the derivation are worth knowing. The escape velocity does not depend on the mass of the projectile, because the mass cancels — a molecule and a rocket need the same speed. And it does not depend on the direction of launch, provided the projectile does not hit the ground first, because the energy depends only on the speed, not on the direction. That is a consequence of the field being conservative, and it is a good example of an energy argument replacing a force argument.</p>

<h3>Orbits, and Kepler's third law</h3>
<p>Equating the gravitational force to the centripetal requirement for a circular orbit gives GMm/r² = mv²/r, so v² = GM/r. Substituting v = 2πr/T gives GM/r = 4π²r²/T², and rearranging gives T² = (4π²/GM) r³ — Kepler's third law, that the square of the period is proportional to the cube of the orbital radius. The constant depends only on the mass of the central body, which is why the same law applies to planets around the Sun and to satellites around the Earth, with a different constant.</p>
<p>That relationship is the standard route to a geostationary orbit: set T equal to one day, solve for r, and subtract the Earth's radius to find the altitude, which comes out at about 36,000 km. It is also why a low-orbit satellite has a short period: r is smaller, so T is much smaller, since the cube of a small number falls faster than its square. And it explains why a satellite cannot simply hover: for a given radius there is exactly one speed that keeps it in a circular orbit, and any slower speed makes the orbit elliptical and eventually brings it down.</p>`;

module.exports = {
  sections: [
    {
      id: "798f9e7d-33c5-456e-9070-c32874b67978",
      slug: "earth-space",
      heading: "Earth and Space: the mechanics behind the facts",
      html: earthSpace + "\n" + redshift + "\n",
    },
    {
      id: "eff91bce-733f-4869-933f-f449fc857e90",
      slug: "materials-deformation",
      heading: "Materials: what the graph is telling you, and how to measure it honestly",
      html: materials + "\n" + stressStrain + "\n",
    },
    {
      id: "60c15fd5-3a9c-4466-ab16-33b4c3496232",
      slug: "motion-in-a-circle-and-gravity",
      heading: "Circular Motion and Gravity: the same force seen twice",
      html: circularGravity + "\n" + gravityCurves + "\n",
    },
  ],
};
