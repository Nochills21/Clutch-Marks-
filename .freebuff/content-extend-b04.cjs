// Batch 04: extends four AS physics notes toward 2x.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "013ebfea-e165-48f6-ad1d-2e01fd4e5214": `
<h3>Two-source interference: a worked calculation</h3>
<p>Two coherent loudspeakers emit sound of frequency 680 Hz. The speed of sound is 340 m s⁻¹, so λ = v/f = 340/680 = 0.50 m. A listener walks along a line parallel to the line joining the speakers. At a point where the path difference is 0.75 m, the waves arrive in antiphase, because 0.75 is an odd multiple of λ/2 (0.25 m). The listener hears a minimum there.</p>
<p>Use the path difference, not the distance from one source, to decide the outcome. Path difference = nλ gives a maximum; path difference = (n + ½)λ gives a minimum. Writing the test as a multiple of λ, and not as a raw distance, is the step examiners look for.</p>
<h3>Phase difference and path difference</h3>
<p>A phase difference of 360° (2π radians) corresponds to a path difference of one wavelength. A phase difference of 180° corresponds to a path difference of λ/2. In general, phase difference = (path difference / λ) × 360°. Questions often give one and ask for the other, so be ready to convert between them.</p>
<ul>
<li>Coherence needs a constant phase difference, which is why two independent light bulbs do not produce a stable fringe pattern.</li>
<li>Monochromatic light is needed for sharp fringes, because each wavelength produces its own fringe spacing and the patterns blur together.</li>
<li>Fringe spacing is directly proportional to wavelength and to screen distance, and inversely proportional to slit separation. Halving a doubles the spacing.</li>
</ul>
<h3>Stationary waves: harmonics on a pipe</h3>
<p>An open pipe has antinodes at both ends, so its fundamental wavelength is 2L and its harmonics are f, 2f, 3f and so on. A pipe closed at one end has a node at the closed end and an antinode at the open end, so its fundamental wavelength is 4L, and it produces only odd harmonics: f, 3f, 5f.</p>
<p>Example: a pipe of length 0.85 m, open at both ends, with speed of sound 340 m s⁻¹. The fundamental is f = v/(2L) = 340/1.7 = 200 Hz, and the second harmonic is 400 Hz.</p>
<h3>Common errors that lose marks</h3>
<ul>
<li>Using the slit spacing a where the question gives the slit-to-screen distance D, or the reverse. Read the labels in the diagram before substituting.</li>
<li>Stating that a stationary wave transfers energy along the string. It does not: energy is confined between the nodes, and the wave transfers no net energy along the medium.</li>
<li>Calling the points between two adjacent nodes "in phase" without qualification. Particles between the same two nodes are in phase; particles either side of a node are in antiphase.</li>
</ul>
`,
    "60c15fd5-3a9c-4466-ab16-33b4c3496232": `
<h3>Worked example: orbital speed and period</h3>
<p>A satellite of mass m orbits a planet of mass M at radius r. Gravity provides the centripetal force: GMm/r² = mv²/r, so v = √(GM/r). The orbital period follows from T = 2πr/v, which gives T² = (4π²/GM) r³. This is Kepler's third law in the form used at AS level.</p>
<p>Example: a satellite at radius 7.0 × 10⁶ m around a planet of mass 6.0 × 10²⁴ kg. The speed is v = √((6.67 × 10⁻¹¹ × 6.0 × 10²⁴)/(7.0 × 10⁶)) = √(5.7 × 10⁷) ≈ 7.6 × 10³ m s⁻¹. The period is T = 2π × 7.0 × 10⁶ / 7.6 × 10³ ≈ 5.8 × 10³ s, about 97 minutes.</p>
<h3>Geostationary orbit</h3>
<p>A geostationary satellite has a period of exactly 24 hours and orbits in the equatorial plane. Its radius is fixed by the period, so every geostationary satellite has the same radius and speed, regardless of its mass. Its orbit must lie above the equator, which is why communication satellites sit over one point on the ground.</p>
<h3>Why orbiting bodies are weightless</h3>
<p>Astronauts in orbit are not outside the pull of gravity; gravity supplies their centripetal acceleration. The spacecraft and its occupants fall freely together, so there is no contact force, and the apparent weightlessness follows from that free fall.</p>
<h3>Circular motion: banked roads and conical pendulums</h3>
<p>On a banked road with no friction, the horizontal component of the normal reaction supplies the centripetal force: N sin θ = mv²/r, while the vertical component balances weight: N cos θ = mg. Dividing gives tan θ = v²/(rg). The design speed depends only on the angle, the radius and g, not on the mass of the vehicle.</p>
<ul>
<li>For a conical pendulum, tension has a vertical component that balances weight and a horizontal component that supplies the centripetal force.</li>
<li>Always draw a free-body diagram and resolve forces into components along the radius and the vertical before writing equations.</li>
<li>The centripetal force is not an extra force on the diagram; name the real forces that supply it.</li>
</ul>
<h3>Common errors that lose marks</h3>
<ul>
<li>Including centripetal force as a separate force in the free-body diagram, which double-counts the force.</li>
<li>Using the planet's surface radius where the question gives the distance from the centre, or the reverse.</li>
<li>Stating that the satellite is stationary in orbit. It is moving at constant speed, so its velocity changes direction continuously and it is accelerating.</li>
</ul>
`,
    "78b026c5-7368-43c8-a8bb-0b19b9be584d": `
<h3>Worked example: explosion and recoil</h3>
<p>A 2.0 kg gun at rest fires a 0.020 kg bullet at 300 m s⁻¹. Before the shot, total momentum is zero. After it, the bullet has momentum 0.020 × 300 = 6.0 kg m s⁻¹ forwards, so the gun must recoil with momentum 6.0 kg m s⁻¹ backwards. Its recoil velocity is 6.0/2.0 = 3.0 m s⁻¹. The same reasoning holds for any explosion from rest: the fragments' momenta sum to zero.</p>
<h3>Two-dimensional collisions</h3>
<p>Momentum is a vector, so it is conserved separately in each perpendicular direction. In a collision where a 2.0 kg ball moving east at 4.0 m s⁻¹ strikes a stationary ball of equal mass at an angle, resolve the momentum of each ball along the original direction and perpendicular to it. Apply conservation in both directions, then combine the components to find the resultant speed or angle.</p>
<h3>Kinetic energy in collisions</h3>
<p>Kinetic energy is lost in any inelastic collision. For the trolley example above, the initial kinetic energy is ½ × 0.5 × 4² = 4.0 J, and the final kinetic energy is ½ × 1.5 × (1.33)² ≈ 1.33 J. About 2.7 J has been transferred to sound, heat and deformation. Calculate the energies to show that the collision is inelastic, rather than just saying it is.</p>
<h3>Impulse and the force–time graph</h3>
<p>If a force of 40 N acts for 0.25 s, the impulse is 10 N s. Where the force varies, find the area under the force–time graph: count the squares, or split the area into triangles and rectangles. A large area means a large change in momentum, even if the peak force is modest.</p>
<ul>
<li>Use Δp = m(v − u) with the sign of each velocity included. A ball that bounces back has a negative final velocity relative to its initial motion.</li>
<li>For a bounce, the change in momentum is larger than for a ball that stops, because the ball reverses direction.</li>
<li>When a question asks for the average force on a ball, use the impulse and the contact time, and state the direction of the force.</li>
</ul>
<h3>Common errors that lose marks</h3>
<ul>
<li>Adding the speeds of two bodies moving in opposite directions instead of subtracting, because direction was not included.</li>
<li>Treating a non-isolated system as isolated, for example ignoring friction or a gravitational force that acts on the system from outside.</li>
<li>Confusing the impulse with the force, or failing to convert the time into seconds.</li>
</ul>
`,
    "eff91bce-733f-4869-933f-f449fc857e90": `
<h3>Worked example: a stretched wire with a load</h3>
<p>A steel wire 1.5 m long and 0.80 mm in diameter is loaded with a 20 kg mass. The cross-sectional area is π(0.40 × 10⁻³)² ≈ 5.03 × 10⁻⁷ m². The force is F = mg = 20 × 9.81 = 196 N, so the stress is 196 ÷ (5.03 × 10⁻⁷) ≈ 3.9 × 10⁸ Pa.</p>
<p>If the wire stretches by 1.1 mm, the strain is 0.0011 ÷ 1.5 ≈ 7.3 × 10⁻⁴, and E = stress ÷ strain = 3.9 × 10⁸ ÷ 7.3 × 10⁻⁴ ≈ 5.3 × 10¹¹ Pa. Quote the Young modulus with its unit and to two significant figures, and check that the value is in the range expected for the material: steel is roughly 2 × 10¹¹ Pa, so a result far from that points to an area or unit error.</p>
<h3>Comparing materials</h3>
<ul>
<li>A stiff material has a large Young modulus: for a given stress, it produces a small strain.</li>
<li>A brittle material fractures soon after the elastic limit, with little or no plastic deformation, so its graph stops abruptly.</li>
<li>A ductile material, such as copper, undergoes large plastic deformation before it breaks, so its graph shows a long curved section after the elastic limit.</li>
</ul>
<h3>Area under the graph</h3>
<p>For a non-linear force–extension graph, the energy stored is still the area under the curve. Count the squares, or split the region into a triangle and a rectangle, and convert the result to joules using the scale factors. Only the energy up to the elastic limit can be recovered when the load is removed; the rest is dissipated as heat.</p>
<h3>Hysteresis and loading cycles</h3>
<p>When a material is loaded and then unloaded, the unloading curve may not retrace the loading curve. The region enclosed between the two curves is energy dissipated per cycle, often as heat. Rubber bands and car tyres show this, which is why they warm up when repeatedly deformed.</p>
<ul>
<li>Strain is extension divided by the original length, so do not use the stretched length.</li>
<li>Young modulus has the unit of pascal, the same as stress, because strain is dimensionless.</li>
<li>Only a sample loaded within its elastic region returns to the same length; a permanent set after unloading means plastic deformation has occurred.</li>
</ul>
<h3>Common errors that lose marks</h3>
<ul>
<li>Using the diameter as the radius in the area formula, which quadruples the area.</li>
<li>Calling the gradient of the stress-strain graph the "stiffness". Stiffness belongs to the force-extension graph; the gradient of stress against strain gives E.</li>
<li>Quoting Hooke's law as valid beyond the limit of proportionality, where extension is no longer proportional to force.</li>
</ul>
`
  }
};
