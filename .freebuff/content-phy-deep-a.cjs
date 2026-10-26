// Physics depth pass, tranche A (thinnest three), plus the Biology top-up that
// left organisation-of-the-organism 379 characters short of 20,000.
const F = require("./note-figures.cjs");
const { C, text, frame, plot } = F;

/* ── Figure: Wien's law — peak wavelength against temperature ─────────── */
const wien = (() => {
  const pts = [];
  for (let t = 3; t <= 30; t += 0.5) pts.push([t, +(2.898e-3 / (t * 1000) * 1e6).toFixed(3)]);
  return plot({
    id: "ast-wien",
    title: "Peak wavelength of a black body against surface temperature, from Wien's law",
    label: "Figure 1.",
    caption:
      "The peak wavelength falls as the temperature rises: a cool star radiates mostly in the infrared, a hot one in the blue and ultraviolet. Plotting λ peak against 1/T would give a straight line through the origin, which is how the constant is measured in a laboratory question.",
    w: 580,
    h: 320,
    x: { min: 3, max: 30, ticks: [3, 9, 15, 21, 27], label: "surface temperature (× 1000 K)" },
    y: { min: 0, max: 1.0, ticks: [0, 0.25, 0.5, 0.75, 1.0], label: "peak wavelength (µm)" },
    series: [{ points: pts, color: C.gold, width: 2.6, smooth: true }],
    annotations: [
      { x: 5.8, y: 0.52, text: "5800 K: the Sun, 0.50 µm", dx: 6, dy: 0, color: C.ink, size: 12 },
      { x: 15, y: 0.2, text: "hotter star: shorter peak", dx: 6, dy: 0, color: C.muted, size: 11.5 },
    ],
  });
})();

/* ── Figure: the distance ladder ─────────────────────────────────────── */
const ladder = (() => {
  const parts = [];
  const rows = [
    ["parallax", "up to a few hundred pc", "geometry: the apparent shift against background"],
    ["main-sequence fitting", "up to about 10 kpc", "compare the star's colour and brightness with a cluster"],
    ["Cepheid variables", "up to a few Mpc", "period-luminosity relation gives luminosity, brightness gives distance"],
    ["Type Ia supernovae", "up to hundreds of Mpc", "standardisable peak luminosity, visible across the universe"],
    ["Hubble's law", "cosmological scales", "recessional velocity from redshift gives distance"],
  ];
  const w = 660;
  rows.forEach(([method, range, note], i) => {
    const y = 42 + i * 54;
    parts.push(
      `<rect x="26" y="${y}" width="608" height="44" rx="5" fill="${i % 2 ? C.goldFillSoft : C.goldFill}" stroke="${C.gold}" stroke-width="1"/>`,
      text(38, y + 18, method, { size: 12.5, fill: C.ink, weight: "600" }),
      text(38, y + 33, note, { size: 10.5 }),
      text(622, y + 18, range, { anchor: "end", size: 11.5, fill: C.goldDeep }),
    );
    if (i < rows.length - 1) {
      parts.push(`<line x1="330" y1="${y + 44}" x2="330" y2="${y + 54}" stroke="${C.muted}" stroke-width="1.4"/>`);
    }
  });
  parts.push(text(26, 320, "each rung is calibrated against the one above it, which is why the errors grow with distance", { size: 11.5 }));
  return frame({
    id: "ast-ladder",
    title: "The distance ladder: five methods, each calibrated by the one before",
    label: "Figure 2.",
    caption:
      "No single method measures every distance. Parallax is direct but short-range; Cepheids need a known period-luminosity relation; supernovae are bright enough to be seen far away but rare. Each rung is calibrated by the one above, so a systematic error at the bottom propagates all the way up.",
    w: 660,
    h: 330,
    body: parts.join("\n"),
  });
})();

/* ── Figure: force against extension past the limit of proportionality ── */
const hooke = (() => {
  const linear = [];
  const beyond = [];
  for (let x = 0; x <= 4; x += 0.2) linear.push([x, 6 * x]);
  for (let x = 4; x <= 7; x += 0.2) beyond.push([x, 24 + (x - 4) * 2.2]);
  return plot({
    id: "wep-hooke",
    title: "Force against extension for a wire, showing the proportional region and the yield point",
    label: "Figure 1.",
    caption:
      "The straight section through the origin is the region where Hooke's law holds and the gradient is the spring constant. Past the limit of proportionality the curve bends; past the elastic limit the wire does not return to its original length. The area under the straight section is the energy stored.",
    w: 560,
    h: 320,
    x: { min: 0, max: 7, ticks: [0, 1, 2, 3, 4, 5, 6, 7], label: "extension (cm)" },
    y: { min: 0, max: 34, ticks: [0, 10, 20, 30], label: "force (N)" },
    series: [
      { points: linear, color: C.gold, width: 2.6 },
      { points: beyond, color: C.muted, width: 2.2, kind: "dashed" },
    ],
    annotations: [
      { x: 1.2, y: 9.5, text: "gradient = k", dx: 6, dy: 0, color: C.gold, size: 12 },
      { x: 4.2, y: 25.6, text: "limit of proportionality", dx: 6, dy: -8, color: C.muted, size: 11.5 },
    ],
  });
})();

const orgTopUp = `<h2>Organisation of the Organism: three checks before the exam</h2>
<p>Three errors account for most of the marks lost on this topic, and all three are errors of language rather than of knowledge.</p>

<h3>Check one: what the membrane does that the wall does not</h3>
<p>The cell wall is freely permeable. It provides strength and shape, and it stops a plant cell bursting when it becomes turgid, but it does not select what enters or leaves. Every statement about osmosis, diffusion or active transport is a statement about the cell surface membrane. An answer that says "water enters through the cell wall by osmosis" therefore contradicts itself, because a freely permeable wall offers no resistance and no selection. Write "through the partially permeable cell membrane" and the mark is secure.</p>

<h3>Check two: which cells have which organelles</h3>
<p>A plant cell has chloroplasts only if it is in a part of the plant that is exposed to light. Root cells, storage tissue and the inner stem have none, yet they are still plant cells, and they still have mitochondria. A root hair cell, often used as the example of a plant cell in an exam, has no chloroplasts at all. Equally, a plant cell has mitochondria because it respires continuously, including in daylight. The presence of chloroplasts tells you the cell photosynthesises; the presence of mitochondria tells you nothing about the kingdom.</p>
<p>The same logic applies to the nucleus. A mature red blood cell has lost its nucleus, which is why it cannot divide or repair itself, and a sieve tube element in phloem has lost its nucleus and most organelles, which is why it needs a companion cell beside it. Both are eukaryotic cells that have specialised by losing a structure, and that loss is itself the adaptation.</p>

<h3>Check three: magnification, resolution and the units</h3>
<p>Magnification is how much larger the image is than the object; resolution is the smallest distance at which two points can still be distinguished as separate. A photograph can be enlarged without limit, but its resolution does not improve, because enlarging an image does not add information. That is why a light microscope's maximum useful magnification is around ×1,500 even though the eyepiece can be changed: beyond the resolution limit, the image is simply bigger and blurrier.</p>
<p>Convert before you substitute: 1 mm = 1,000 µm and 1 µm = 1,000 nm, so 1 mm = 1,000,000 nm. A specimen 0.05 mm across is 50 µm, or 50,000 nm. Write the conversion as a separate line of working, every time, because a factor of a thousand is the single most common slip in this topic and it is invisible once it is inside a calculation.</p>`;

const astronomy = `<h2>Astronomy and Cosmology: the reasoning behind the formulae</h2>
<p>The formulae in this topic are few and easy to quote; the marks are in knowing which one applies and what its assumptions are. This section works through the physics that connects them: why brightness falls with the square of distance, why a star's colour gives its temperature, why the Cepheid relation makes distance measurable at all, and what redshift is actually evidence for.</p>

<h3>Brightness: an inverse-square law with a geometric reason</h3>
<p>A star radiates energy in all directions. At a distance d, that energy is spread over the surface of a sphere of area 4πd², so the power per unit area — the intensity or brightness — falls as 1/d². This is not an empirical rule but a consequence of geometry, and it is worth being able to derive it in one line. Doubling the distance spreads the same power over four times the area, so the brightness falls to a quarter.</p>
<p>The practical consequence is the inverse-square law in the form used in exams: b = L / (4πd²), where L is luminosity (the total power radiated, in watts) and b is the brightness measured at the Earth. Rearranged, d = √(L / 4πb). The ratio form is often easier: two stars of the same luminosity at distances d₁ and d₂ have brightnesses in the ratio (d₂/d₁)². If one appears 25 times fainter, it is five times further away. Keeping the ratio form in mind prevents most algebra slips, because it makes the direction of the effect obvious: further away means fainter, and by the square.</p>

<h3>Colour, temperature and Stefan's law</h3>
<p>A hot object radiates a continuous spectrum whose peak wavelength depends only on its surface temperature: λ_max T = 2.898 × 10⁻³ m K, Wien's law. The Sun, at about 5,800 K, peaks at about 500 nm — in the middle of the visible spectrum, which is not a coincidence but a consequence of evolution. A star at 3,000 K peaks in the infrared and looks red; a star at 10,000 K peaks in the ultraviolet and looks blue-white (Figure 1). That is why astronomers talk about colour temperature: the colour of a star is a thermometer.</p>
<p>The total power radiated per unit area is given by Stefan's law: power per unit area = σT⁴, with σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴. Multiply by the star's surface area, 4πr², to get the luminosity: L = 4πr²σT⁴. This is where the fourth power matters: doubling the temperature multiplies the power by sixteen, while doubling the radius multiplies it by four. A star can therefore be far more luminous than the Sun because it is much hotter, much larger, or both — and a question that gives you L and T is really asking you to solve for r.</p>
<p>Worked example: a star has luminosity 100 times the Sun's and surface temperature twice the Sun's. Since L ∝ r²T⁴, the ratio of radii satisfies 100 = (r/r☉)² × 2⁴ = 16 (r/r☉)², so (r/r☉)² = 6.25 and r = 2.5 r☉. The star is hotter and bigger, and each factor contributes — which is why the answer is not simply 2.5 from either alone.</p>

<h3>Standard candles and the distance ladder</h3>
<p>A standard candle is an object whose luminosity can be determined independently of its distance. Measure its brightness, and the inverse-square law gives the distance. The difficulty is finding an object bright enough to be seen far away and predictable enough to be trusted, and no single object does both. The result is a ladder (Figure 2), in which each rung is calibrated using the rung above.</p>
<p>Parallax is the base of the ladder: as the Earth moves around the Sun, a nearby star appears to shift against the background, and the angle of the shift, together with the known diameter of the Earth's orbit, gives the distance by simple trigonometry. One parsec is the distance at which one astronomical unit subtends one arcsecond, about 3.26 light years. Parallax is direct and needs no assumptions about the star, but the shift becomes too small to measure beyond a few hundred parsecs.</p>
<p>Cepheid variables are the next rung. These stars pulsate with a period that is tightly correlated with their luminosity: the longer the period, the more luminous the star. Measure the period, read off the luminosity, compare with the brightness, and the distance follows. This relation was calibrated using nearby Cepheids whose distances were known from parallax, which is exactly what a ladder means — and it was Hubble's use of Cepheids in Andromeda that established that the spiral nebulae lie outside our galaxy.</p>
<p>Type Ia supernovae are the top rung. They occur when a white dwarf in a binary system accretes enough matter to exceed the Chandrasekhar limit and explodes, and because the trigger mass is the same every time, the peak luminosity is similar. They are bright enough to be seen across the observable universe, which is why they are used to measure cosmological distances — and why the discovery that distant ones were fainter than expected led to the conclusion that the expansion is accelerating.</p>

<h3>Redshift: what is measured, and what it implies</h3>
<p>The light from a receding source is shifted towards longer wavelengths. In a laboratory spectrum, each element produces a distinctive pattern of lines at known wavelengths; in a galaxy's spectrum the same pattern appears, but displaced towards the red end. The fractional shift, z = (λ_observed − λ_emitted) / λ_emitted, is the redshift, and for speeds well below the speed of light it equals v/c, so the recessional velocity is v = zc.</p>
<p>Two cautions are worth carrying. First, redshift is not the same as the Doppler effect for sound: for cosmological distances the stretching of wavelength is caused by the expansion of space itself while the light is in transit, not only by motion through space. For nearby galaxies the two descriptions agree numerically, which is why the simpler one is taught. Second, redshift measures velocity, not distance directly; distance comes from Hubble's law, v = H₀d, with H₀ about 70 km s⁻¹ Mpc⁻¹. So a galaxy with a redshift corresponding to 7,000 km s⁻¹ is at about 100 Mpc, and the calculation is one division.</p>

<h3>The Big Bang, and the three pieces of evidence</h3>
<p>Hubble's law is the observation that recession velocity is proportional to distance, which is exactly what an expanding universe produces: every point moves away from every other, and the further apart two points are, the faster they separate. Run the expansion backwards and everything converges on a hot, dense state at a finite time in the past. Dividing distance by velocity gives that time: 1/H₀, about 14 billion years, which is the age of the universe to within the uncertainties.</p>
<p>Three independent observations support the model. The cosmic microwave background is the relic radiation from the moment the universe cooled enough to become transparent, now stretched by expansion into microwaves at about 2.7 K; its almost perfect uniformity, with tiny ripples, is the fingerprint the theory predicted. The abundance of light elements — about 75 % hydrogen and 25 % helium by mass — matches the predictions of Big Bang nucleosynthesis, and no other process produces that ratio. And the observed evolution of galaxies, with distant ones looking younger and more irregular, is what a universe with a history looks like; a steady-state universe would look the same at every distance.</p>
<p>The phrase to avoid is "the Big Bang was an explosion in space". It was an expansion of space, with no centre and no edge: every observer sees every other galaxy receding, which is why the recession looks the same from any galaxy, including ours.</p>

<h3>The exam types, and the order to do them in</h3>
<table>
<tr><th>Given</th><th>Use</th><th>The trap</th></tr>
<tr><td>Brightness and distance</td><td>L = 4πd²b</td><td>Convert pc to m, and use the distance in metres</td></tr>
<tr><td>Luminosity and temperature</td><td>L = 4πr²σT⁴</td><td>T must be in kelvin, and it is to the fourth power</td></tr>
<tr><td>Peak wavelength</td><td>λ_max T = 2.898 × 10⁻³</td><td>λ must be in metres for the constant to work</td></tr>
<tr><td>Redshift and wavelength</td><td>v = c(Δλ/λ)</td><td>Δλ is the shift, not the observed wavelength</td></tr>
<tr><td>Velocity and distance</td><td>v = H₀d</td><td>H₀ is in km s⁻¹ Mpc⁻¹, so d comes out in Mpc</td></tr>
</table>`;

const workEnergy = `<h2>Work, Energy and Power: the audit that never fails</h2>
<p>Almost every question in this topic can be answered by one procedure: name the energy stores at the start, name them at the end, and account for the difference with work done against friction or air resistance. This section sets out that audit, then applies it to the cases that catch students out — brakes, ramps, pumps and the difference between useful and total power.</p>

<h3>Work is a transfer, not a substance</h3>
<p>Work is done when a force moves its point of application through a distance in the direction of the force: W = Fs cos θ, where θ is the angle between the force and the displacement. The cosine matters in two ways. A force at right angles to the motion does no work, which is why the tension in a string does no work on a mass moving in a circle and why the normal contact force does no work on a block sliding along a floor. And a force with a component along the motion does work equal to that component times the distance — so pulling a sledge at 30° to the horizontal with a force F does work F cos 30° × s, not Fs.</p>
<p>Work and energy are the same quantity in different language: work is the process, energy is the capacity. The unit is the joule in both cases, and one joule is one newton-metre. Saying "work is transferred" sounds odd but is correct, and it prevents the common error of treating work as something a body possesses.</p>

<h3>Kinetic energy, and why it goes as the square</h3>
<p>Kinetic energy is ½mv². The square has a consequence that examiners test repeatedly: doubling the speed quadruples the kinetic energy, so the braking distance quadruples for the same braking force. That is why a car at 60 mph needs roughly four times the distance to stop as one at 30 mph, not twice, and it is the physics behind speed limits near schools. The stopping distance is the thinking distance — speed × reaction time — plus the braking distance, and only the second is governed by the square.</p>
<p>Worked example: a 1,200 kg car travelling at 15 m s⁻¹ has kinetic energy ½ × 1,200 × 15² = 135,000 J. If the brakes exert a constant 6,000 N, the braking distance is found from work done = kinetic energy: 6,000 × s = 135,000, so s = 22.5 m. At 30 m s⁻¹ the kinetic energy is 540,000 J and the distance is 90 m — four times as far, from twice the speed, exactly as the square predicts. The method is always the same: set the work done by friction equal to the kinetic energy lost.</p>

<h3>Gravitational potential energy, and when mgh is not enough</h3>
<p>Near the Earth's surface, where g is effectively constant, the change in gravitational potential energy is mgΔh. It is a change, not an absolute value, so the zero can be chosen anywhere convenient — the floor, the bench, the bottom of the ramp — as long as every height is measured from the same place. A question that asks for the potential energy "of" an object is really asking for the value relative to the level you have chosen, and the mark scheme will accept any consistent choice.</p>
<p>For a satellite or a projectile that moves far enough for g to change, mgh is no longer valid and the field strength must be integrated; that is the A2 treatment. At IGCSE and AS, the test is whether the height change is small compared with the Earth's radius. A few metres or a few hundred metres: mgh. A few thousand kilometres: not mgh.</p>

<h3>The energy audit, written out</h3>
<p>The audit has four lines and they work for every problem of this kind.</p>
<ol>
<li>Write the energy at the start, naming each store: kinetic, gravitational potential, elastic, chemical, thermal.</li>
<li>Write the energy at the end, naming each store.</li>
<li>Write the difference as work done against resistive forces, mostly friction and air resistance, which ends up as thermal energy in the surroundings.</li>
<li>Check that the two sides balance, and state the assumption you used — usually that air resistance is negligible or that no energy is lost to the surroundings.</li>
</ol>
<p>Applied to a roller coaster: at the top, the car has gravitational potential energy and a little kinetic; at the bottom, it has mostly kinetic. The difference is the work done against friction and air resistance, which is why the speed at the bottom is always less than √(2gh) predicts. Applied to a pendulum: the energy swaps between potential and kinetic twice per swing, with a small loss each time, which is why the amplitude decays. Applied to a spring: the energy is stored elastically as ½Fx, and released as kinetic when the spring is let go. The audit is the same in each case; only the labels change.</p>

<h3>Hooke's law, and the energy in a stretched spring</h3>
<p>For a spring or a wire within its limit of proportionality, the extension is proportional to the force: F = kx, where k is the spring constant in N m⁻¹. The graph of force against extension is a straight line through the origin (Figure 1), and the gradient is k. Beyond the limit of proportionality the line curves; beyond the elastic limit the wire is permanently deformed and does not return to its original length when the force is removed. These are three different points on the same graph, and a question that asks which one a graph shows wants you to name the feature, not the number.</p>
<p>The energy stored is the area under that line, which for the straight section is ½Fx = ½kx². The factor of a half is not arbitrary: the force rises from zero to F as the extension grows, so the average force is F/2. A spring stretched 0.20 m by a force rising to 40 N stores ½ × 40 × 0.20 = 4.0 J. If the graph is curved, the energy is still the area, but it must be counted squares rather than calculated from a formula — and that is a legitimate exam task.</p>

<h3>Power: the rate, and the two efficiencies</h3>
<p>Power is the rate of energy transfer, P = W/t, and for a force moving an object at constant velocity it is also P = Fv. That second form is the one that explains why a car needs a much larger engine to cruise at 70 mph than at 30 mph: the drag force itself rises with speed, and the power rises with the product of drag and speed, so the requirement grows faster than linearly. It also explains why a cyclist crouches: reducing the frontal area reduces the drag force, which reduces the power needed at the same speed.</p>
<p>Efficiency is useful output divided by total input, as a fraction or a percentage. Two distinctions are examinable. The useful output of a motor is mechanical work, while the total input is the chemical energy in the fuel or the electrical energy supplied, so the difference appears as heat in the motor and the surroundings. And the useful output of a power station is electrical energy, while the input is the chemical energy of the fuel, with the largest loss being thermal energy rejected to cooling towers — which is why a power station's efficiency is around 40 % and not because of poor engineering but because of thermodynamics.</p>
<p>Worked example: a pump raises 30 kg of water per second through a height of 12 m. The useful power is mgh per second = 30 × 9.81 × 12 = 3,530 W, or 3.5 kW. If the pump's motor draws 5.0 kW, the efficiency is 3,530 / 5,000 = 0.71, or 71 %. The remaining 29 % heats the pump and the water through turbulence, and no amount of good design removes all of it.</p>`;

const furtherMech = `<h2>Further Mechanics: the physics behind the conservation laws</h2>
<p>Momentum questions are usually solved by applying a formula, and that is why they are easy to get wrong when the situation is unfamiliar. This section explains why momentum is conserved, how impulse connects force to change in momentum, and how to decide whether a collision is elastic without calculating every energy — then applies all three to the cases that appear in exams.</p>

<h3>Why momentum is conserved</h3>
<p>Newton's third law says that if A exerts a force on B, then B exerts an equal and opposite force on A. If the two bodies interact for the same time, the impulses are equal and opposite, so the changes in momentum are equal and opposite, and the total momentum of the pair is unchanged. That is the whole derivation, and it explains the condition: momentum is conserved when no external resultant force acts on the system. A ball bouncing off a wall does not conserve momentum with the wall alone, because the wall is attached to the Earth and the Earth takes up the difference; the ball-and-Earth system does conserve it.</p>
<p>The vector nature is where most marks are lost. Momentum is a vector, so a body moving left has negative momentum if right is positive, and a collision where one body reverses direction has a change of momentum equal to the sum of the magnitudes, not the difference. Write a direction convention at the top of your answer and keep it: "taking right as positive" costs one line and prevents most sign errors.</p>

<h3>Impulse: the same law, rearranged</h3>
<p>Impulse is force multiplied by the time for which it acts, and it equals the change in momentum: FΔt = Δp = mv − mu. The rearrangement explains every safety device in a car. For a given change in momentum — the passenger must be brought to rest from the car's speed — the product FΔt is fixed, so increasing the time reduces the force. A crumple zone, a seat belt that stretches, an airbag and a motorcycle helmet all work by extending the deceleration time. That sentence, with the phrase "for the same change in momentum", is the answer to the standard question, and the equation makes it a derivation rather than a slogan.</p>
<p>The same reasoning in reverse explains why a golf club is followed through and why a hammer has a heavy head: a longer contact time, or a larger mass, delivers a larger impulse for the same effort. And it explains the danger of jumping from a height onto a hard surface: the stopping time is milliseconds, so the force is many times body weight.</p>

<h3>Elastic, inelastic, and the test that decides</h3>
<p>In every collision, momentum is conserved (provided no external force acts). Kinetic energy is conserved only in an elastic collision. In an inelastic collision some kinetic energy is converted to other forms — sound, heat, deformation — so the total kinetic energy afterwards is less. A collision in which the bodies stick together is the extreme case and is always inelastic, because the maximum possible kinetic energy has been lost while still conserving momentum.</p>
<p>The test is arithmetic, not vocabulary. Calculate the total kinetic energy before and after; if they are equal within rounding, the collision is elastic. A common exam trap is a collision where the two bodies exchange velocities: momentum is conserved, kinetic energy is also conserved, and the collision is elastic even though it looks like a head-on impact. Another is a "perfectly elastic" bounce off a wall, where the ball rebounds at the same speed: its momentum changes by 2mv, but its kinetic energy is unchanged.</p>
<p>Worked example: a 0.50 kg trolley at 2.0 m s⁻¹ collides with a stationary 0.50 kg trolley and they stick together. Momentum before = 0.50 × 2.0 = 1.0 kg m s⁻¹; after, the combined mass is 1.0 kg, so v = 1.0 m s⁻¹. Kinetic energy before = ½ × 0.50 × 4.0 = 1.0 J; after = ½ × 1.0 × 1.0 = 0.50 J. Half the kinetic energy has gone, so the collision is inelastic — and the missing 0.50 J is in the deformation and sound of the coupling.</p>

<h3>Two dimensions, and why the vector diagram is the answer</h3>
<p>When the collision is not along a single line, momentum is conserved independently in each direction. That gives two equations, and the standard method is to resolve each velocity into components, apply conservation horizontally and vertically, then combine the resulting components with Pythagoras and find the direction with a tangent. The marks are for the components and for the final magnitude and direction, not for a single number.</p>
<p>A useful check: the total momentum after must have the same magnitude and direction as the total before. If the two bodies approach at right angles and stick together, the final momentum is the vector sum, so the final speed is smaller than the sum of the speeds and the direction lies between them. If your answer has a final momentum larger than the initial total, you have added magnitudes where you should have added vectors.</p>

<h3>Explosions, recoil and rockets</h3>
<p>An explosion is a collision run backwards. Before, the total momentum is zero; after, it is still zero, so the fragments must move in opposite directions with momenta of equal magnitude. A gun recoils because the bullet goes forward and the gun must go backward; a rocket moves forward because it throws gas backward, and it needs no air to push against — which is why rockets work in space, and why the "rocket pushes against the air" explanation is wrong.</p>
<p>The kinetic energy in an explosion increases, supplied by chemical energy. That is not a contradiction of conservation of energy, but it is a reminder that momentum conservation and energy conservation are separate statements: momentum is conserved in an explosion because no external force acts, while kinetic energy rises because internal energy is converted. A question that asks how the kinetic energy can increase when momentum is conserved is asking exactly that distinction.</p>

<h3>The force-time graph, read properly</h3>
<p>If a force acts on a body for a time, the impulse is the area under the force-time graph. A constant force gives a rectangle; a force that rises and falls gives a shape whose area must be counted or estimated in squares. The average force is the impulse divided by the total time, which is why a graph with a high peak and a long tail has a modest average. This is the graph form of the crumple-zone argument: the same area, spread over a longer base, means a lower average height.</p>
<p>Two readings are commonly confused. The gradient of a force-time graph is not a physical quantity of interest; the area is the impulse. And the area under a force-displacement graph is work done, which is a different area with a different meaning — mixing them up is the most common error in this topic.</p>`;

module.exports = {
  sections: [
    {
      id: "821d977f-fba2-4db9-a316-ac617721233b",
      slug: "organisation-of-the-organism",
      heading: "Organisation of the Organism: three checks before the exam",
      proseOnly: true,
      html: orgTopUp + "\n",
    },
    {
      id: "15f953e6-3831-4cd9-a4ff-98a991c5d346",
      slug: "astronomy-and-cosmology",
      heading: "Astronomy and Cosmology: the reasoning behind the formulae",
      html: astronomy + "\n" + wien + "\n" + ladder + "\n",
    },
    {
      id: "c521dc16-c47b-4ecc-8b0d-4c38df77c482",
      slug: "work-energy-and-power",
      heading: "Work, Energy and Power: the audit that never fails",
      html: workEnergy + "\n" + hooke + "\n",
    },
    {
      id: "aa5be96b-372d-4bee-9a92-9a5530573c02",
      slug: "further-mechanics",
      heading: "Further Mechanics: the physics behind the conservation laws",
      proseOnly: true,
      html: furtherMech + "\n",
    },
  ],
};
