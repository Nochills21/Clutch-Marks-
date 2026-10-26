// Physics OL batch 2: Cambridge IGCSE Physics 0625 (2026-2028) statements 1.1
// (measurement, including the Paper 6 practical-skills strand), 2.1-2.3
// (thermal physics) and 3.1-3.4 (waves). Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-phys-ol-depth-2.cjs > .freebuff-tmp/phys-ol-depth-2.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phys-ol-depth-2.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phys-ol-depth-2.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs physics OL
module.exports = {
  expectType: "notes",
  titles: {
    "944a7eb4-3cc4-4439-bc06-3250049bf117": "IGCSE Physics: Measurement and Units",
    "944cae75-d042-4e44-adb7-84ee5a7e4f18": "IGCSE Physics: Thermal Physics",
    "4c3feece-d824-42a8-88ae-a9f3c5c313f7": "IGCSE Physics: Waves and Sound",
  },
  rows: {
    "944a7eb4-3cc4-4439-bc06-3250049bf117": `
<h2>IGCSE Physics: Measurement and Units</h2>
<p>Cambridge IGCSE Physics 0625 (2026–2028), Topic 1 Motion, forces and energy, statement 1.1 Physical quantities and measurement techniques — plus the experimental skills that Paper 6, Alternative to Practical, examines directly. Every physics result rests on a measurement, and every measurement is uncertain. This note builds the vocabulary of quantities and units, the practical techniques for length, volume and time, and then the full Paper 6 method: variables, safety, tables, graph plotting, gradients and intercepts, conclusions and error analysis. Paper 2 and Paper 4 carry the theory marks; Paper 6 carries these skills as a written exam of their own.</p>

<h3>Physical quantities and SI units</h3>
<p>A physical quantity is a property that can be measured, and every measurement needs a number and a unit. Physics uses the SI system, whose base units include the metre (m) for length, the kilogram (kg) for mass, the second (s) for time, the ampere (A) for electric current, the kelvin (K) for temperature and the mole (mol) for amount of substance. All other units are derived from these: speed in metres per second (m s⁻¹) is a base unit divided by a base unit, and force in newtons is defined so that 1 N = 1 kg m s⁻².</p>
<table border="1" cellpadding="6">
<tr><th>Quantity</th><th>Symbol</th><th>SI unit</th><th>How the unit is built</th></tr>
<tr><td>Length</td><td>s or l</td><td>metre (m)</td><td>base unit</td></tr>
<tr><td>Mass</td><td>m</td><td>kilogram (kg)</td><td>base unit</td></tr>
<tr><td>Time</td><td>t</td><td>second (s)</td><td>base unit</td></tr>
<tr><td>Volume</td><td>V</td><td>cubic metre (m³)</td><td>m³; litres and cm³ are everyday alternatives (1 litre = 0.001 m³)</td></tr>
<tr><td>Speed</td><td>v</td><td>metre per second (m s⁻¹)</td><td>m ÷ s</td></tr>
<tr><td>Frequency</td><td>f</td><td>hertz (Hz)</td><td>1 Hz = 1 cycle per second (s⁻¹)</td></tr>
<tr><td>Force</td><td>F</td><td>newton (N)</td><td>kg m s⁻²</td></tr>
<tr><td>Energy</td><td>E</td><td>joule (J)</td><td>N m = kg m² s⁻²</td></tr>
<tr><td>Pressure</td><td>p</td><td>pascal (Pa)</td><td>N m⁻²</td></tr>
</table>
<p>Large and small quantities use standard prefixes or standard form: kilo (×1000), centi (÷100), milli (÷1000), micro (÷10⁶). Standard form writes a quantity as a number between 1 and 10 multiplied by a power of ten, so the speed of light is 3 × 10⁸ m s⁻¹. Units obey ordinary algebra: dividing metres by seconds gives m s⁻¹, and a unit written as m/s and one written as m s⁻¹ are the same thing.</p>

<h3>Measuring length, area and volume</h3>
<p>Length is measured with a ruler or a tape. The three rules of good practice are fixed: place the scale edge along the line being measured, start from the zero mark rather than the worn end of the ruler, and take the reading at eye level directly above the point to avoid parallax error. A ruler reading should be quoted to the nearest half millimetre with an uncertainty of about ±0.5 mm; a vernier caliper or a micrometer screw gauge reads to 0.01 mm and is used when the length is small.</p>
<p>Areas and volumes are calculated from measured lengths. The area of a rectangle is length × width; the volume of a rectangular block is length × width × height; the volume of a cylinder is π r² l. For an irregular solid, the volume is found by displacement: water is poured into a measuring cylinder, the starting volume is read, the object is lowered in, and the rise in level is the object's volume. Read the bottom of the curved meniscus at eye level. The technique fails for objects that float (use a sinker), objects that absorb water or dissolve (use sand or oil), and objects that splash water out on entry (lower them gently on a thread).</p>
<p>Area scales with the square of a length and volume with the cube, so a small length error is amplified: a 2 per cent error in each of the three dimensions of a cube gives about a 6 per cent error in its volume. This is exactly the kind of reasoning Paper 6 rewards in its evaluation questions.</p>

<h3>Measuring time intervals</h3>
<p>Short times are measured with a stopwatch, and human reaction time of about 0.2 s dominates a single reading. Two standard techniques control it. First, <strong>repeat and average</strong>: time several oscillations of a pendulum and divide by the number of swings, because the reaction error is then spread over many periods. Second, <strong>use a larger quantity</strong>: time 20 trolley passes rather than one, or measure the time for 50 dots from a 50 Hz ticker timer, where consecutive dots are 0.02 s apart. Timing devices built into the apparatus — light gates, data loggers and ticker timers — remove reaction time entirely and are the expected answer when a question asks how to improve a timing measurement.</p>

<h3>Errors, precision and percentage uncertainty</h3>
<p>Every measurement carries an <strong>uncertainty</strong>, usually taken as the range of the scale: ±0.5 mm on a ruler, ±0.5 s on a stopwatch read to seconds, ±0.5 of the smallest scale division on a measuring cylinder. Two kinds of error behave differently. A <strong>random error</strong> scatters readings in both directions and is reduced by repeating and averaging; a <strong>systematic error</strong> shifts every reading the same way — a zero error on a balance, a bent ruler, parallax — and is removed by correcting the instrument, never by averaging. <strong>An anomaly</strong> is a result that does not fit the pattern; it is discarded only with a stated reason, never because it is inconvenient.</p>
<p>The size of an uncertainty is compared using percentage uncertainty, a technique Paper 6 tests whenever results are combined:</p>
<pre><code>percentage uncertainty in one reading = (uncertainty / reading) x 100
percentage uncertainty in a sum or difference = (largest absolute uncertainty / answer) x 100
percentage uncertainty in a product or quotient = sum of the individual percentage uncertainties</code></pre>
<p>Worked example: a cube of side 2.0 ± 0.05 cm has a mass of 24.0 ± 0.1 g. The side's percentage uncertainty is 0.05/2.0 × 100 = 2.5 per cent, so the volume (a product of three lengths) carries 3 × 2.5 = 7.5 per cent. The mass carries 0.1/24.0 × 100 = 0.4 per cent. The density = mass/volume carries 7.5 + 0.4 = 7.9 per cent, so ρ = 24.0/8.0 = 3.0 g cm⁻³ ± 0.2 g cm⁻³. The volume term dominates: improving the ruler improves the result far more than improving the balance.</p>

<h3>Scalars and vectors (Supplement)</h3>
<p>A scalar has size only: distance, speed, mass, energy, temperature, pressure. A vector has size and direction: displacement, velocity, acceleration, force, momentum, weight. Vectors are added by direction: two forces in a line add or subtract; two forces at right angles combine by Pythagoras, with the direction found from an angle. If a boat is pushed 3.0 m north and 4.0 m east, its resultant displacement is 5.0 m on a bearing of about 53° from north. Drawing the vector triangle to scale is a complete method on Paper 4 whenever the angle is not 90°.</p>

<h3>Paper 6: how the practical exam is written</h3>
<p>Paper 6 is a written exam about practical physics; you handle no apparatus but you must think like an experimenter. The question types repeat, and each has a method.</p>
<ul>
<li><strong>Choosing apparatus.</strong> Match the instrument to the quantity and its size: a ruler for lengths of centimetres, a micrometer for wires, a measuring cylinder for volumes, a balance for masses. State the range and the precision you expect.</li>
<li><strong>Variables.</strong> Name the independent variable (what you change), the dependent variable (what you measure) and the control variables (what you keep fixed). A fair test changes one thing only, and every control earns a mark: same material, same temperature, same apparatus, same operator.</li>
<li><strong>Safety.</strong> Link each hazard to a control: hot water and burners — use tongs and keep hands clear; masses and clamps — secure the clamp to the bench and stand clear of falling masses; lasers and ultrasound — never look into the beam; electricity — low voltages only, and switch off between readings.</li>
<li><strong>Tables.</strong> Draw a box with a column per quantity and a heading of quantity divided by unit, e.g. length / cm. Numbers sit in the cells without units. Give each column enough rows for repeats, quote consistent significant figures, and record raw readings before any calculated column.</li>
<li><strong>Graphs.</strong> The independent variable goes on the horizontal axis. Choose a scale that fills at least half the sheet, label both axes with quantity and unit, plot points with a fine cross, and draw a single smooth line of best fit — a thin ruled line for a linear relationship, a smooth curve otherwise. Never join dots dot to dot.</li>
<li><strong>Gradient and intercept.</strong> The gradient = (change in vertical quantity) / (change in horizontal quantity), taken between two distant points on the line, not between plotted points. For a straight line through the origin the two variables are directly proportional; a non-zero intercept has physical meaning — on a speed–time graph it is the initial speed, on a cooling curve the ambient temperature — and the equation of the line is written as vertical quantity = gradient × horizontal quantity + intercept.</li>
<li><strong>Conclusions.</strong> State the relationship the graph shows in words and symbols, quote the gradient with its unit, and relate the result to the physics (for example, a load–extension graph through the origin shows extension proportional to load, and its gradient is the spring constant).</li>
<li><strong>Evaluation.</strong> Name the largest source of uncertainty with a reason, say which way it pushes the answer, and propose a specific improvement — more repeats, a longer measurement interval, a sensor or data logger, a wider range of values — not a vague plea for more care.</li>
</ul>

<h3>Worked example: reading a graph and its gradient</h3>
<p>A student measures the speed of a trolley pulled down a runway, plotting speed on the vertical axis against time on the horizontal axis. The plotted points lie close to a straight line crossing the vertical axis at 0.10 m s⁻¹ and passing through (2.0 s, 1.30 m s⁻¹) and (6.0 s, 3.30 m s⁻¹).</p>
<pre><code>gradient = (3.30 - 1.30) / (6.0 - 2.0) = 2.00 / 4.0 = 0.50 m s-2
intercept = 0.10 m s-1
equation: speed = 0.50 x time + 0.10</code></pre>
<p>The gradient is the trolley's acceleration, 0.50 m s⁻², and the intercept is its initial speed, 0.10 m s⁻¹. A conclusion that says only speed increases with time earns no mark; the mark is for the number, its unit and its physical meaning.</p>

<h3>Common mistakes</h3>
<ul>
<li>Writing a number without its unit, or putting units into the cells of a results table whose heading already carries the unit.</li>
<li>Starting a ruler scale from the broken zero end, or reading at an angle and introducing parallax error.</li>
<li>Joining plotted points with a zig-zag line instead of drawing one smooth line of best fit, which hides anomalies rather than revealing them.</li>
<li>Calculating a gradient between two neighbouring plotted points; use two distant points on the line to shrink the reading error.</li>
<li>Reducing a systematic error by repeating readings; averaging shrinks random error only, and a zero error must be corrected at the instrument.</li>
<li>Keeping an anomaly with no comment, or discarding one without a stated physical reason.</li>
<li>Confusing scalar and vector: adding a speed to a velocity, or giving a direction for energy.</li>
<li>Reporting a percentage uncertainty but never saying which measurement dominates the final result.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 6, 3 marks).</strong> Describe how you would measure the average speed of a trolley on a runway.</p>
<p>Answer: Mark a fixed distance along the runway and measure it with a metre ruler. Release the trolley from the same point each time and time its passage over the marked distance with light gates and a data logger (or a stopwatch, repeated and averaged to reduce reaction error). Average speed is the distance divided by the time. Repeat for several distances or heights and record results in a table.</p>
<p><strong>Question 2 (Paper 6, 3 marks).</strong> A student measures the period of a pendulum once and gets 1.3 s. Suggest two improvements to the method.</p>
<p>Answer: Time 20 complete oscillations and divide by 20, so reaction time error becomes a small fraction of the total; repeat the whole measurement several times and take a mean. Keep the pendulum length fixed and time from the release point to avoid a variable starting condition.</p>
<p><strong>Question 3 (Paper 4, 2 marks).</strong> A length is recorded as 2.50 cm. State the instrument used and its uncertainty.</p>
<p>Answer: A ruler reading to 0.1 cm (or a vernier caliper if the precision demands it), with an uncertainty of ±0.05 cm, half the smallest scale division.</p>
<p><strong>Question 4 (Paper 6, 4 marks).</strong> The volume of a small stone is found from 30 cm³ to 45 cm³ in a measuring cylinder and its mass is 36 g. Calculate the density and its percentage uncertainty if each volume reading is uncertain by ±0.5 cm³.</p>
<p>Answer: Volume = 15 cm³. The uncertainty in the difference is 0.5 + 0.5 = 1.0 cm³ (worst case for a difference), so the percentage uncertainty is 1.0/15 × 100 = 6.7 per cent. Density = 36/15 = 2.4 g cm⁻³, so the answer is 2.4 g cm⁻³ ± 0.2 g cm³ (about ±7 per cent). Using a larger volume difference would shrink the percentage uncertainty.</p>
<p><strong>Question 5 (Paper 2 style).</strong> Which quantity is a vector? A energy; B temperature; C momentum; D pressure. Answer: C. Momentum has size and direction; the rest are scalars.</p>
<p>With measurements trustworthy, the next topic is what heat does to matter: thermal physics.</p>
`,

    "944cae75-d042-4e44-adb7-84ee5a7e4f18": `
<h2>IGCSE Physics: Thermal Physics</h2>
<p>Cambridge IGCSE Physics 0625 (2026–2028), Topic 2 Thermal physics: statements 2.1 Kinetic particle model of matter, 2.2 Thermal properties and temperature, and 2.3 Transfer of thermal energy. Heat is the traffic of energy between hot and cold objects, and the particle model explains every thermal phenomenon in the syllabus: expansion, pressure, changes of state, conduction, convection and radiation. Paper 4 loves the particle explanations as much as the calculations, so both are built here from the same model.</p>

<h3>States of matter and changes of state</h3>
<p>All matter is made of tiny particles in constant motion, and the three states differ in how those particles are arranged and how they move.</p>
<table border="1" cellpadding="6">
<tr><th>State</th><th>Arrangement</th><th>Motion</th><th>Shape and volume</th></tr>
<tr><td>Solid</td><td>Close-packed regular rows, touching</td><td>Vibrate about fixed positions</td><td>Fixed shape and fixed volume</td></tr>
<tr><td>Liquid</td><td>Close together but disordered</td><td>Slide over each other</td><td>Takes the shape of the container; fixed volume</td></tr>
<tr><td>Gas</td><td>Far apart, random, filling the container</td><td>Fast, random, straight-line between collisions</td><td>No fixed shape or volume</td></tr>
</table>
<p>When a substance is heated, energy is transferred to its thermal store and the particles move faster. On a heating curve the temperature rises until a change of state begins; during melting or boiling the temperature stays constant while the energy goes into breaking the forces between particles rather than into speed. The names of the changes are: melting (solid to liquid), freezing (liquid to solid), boiling or vaporisation (liquid to gas), condensation (gas to liquid), sublimation (solid straight to gas, as with dry ice).</p>

<h3>The particle model of pressure and Brownian motion</h3>
<p>Gas pressure arises because particles collide with the walls of their container: each collision gives a tiny push, and billions of pushes per second produce a steady pressure. Squeezing the same particles into a smaller volume raises the collision rate per unit area and so raises the pressure; heating a gas at fixed volume makes the particles move faster and collide harder and more often, again raising the pressure.</p>
<p><strong>Brownian motion</strong> is the random jiggling of smoke particles seen under a microscope. The smoke particles are bombarded unevenly by fast-moving invisible air molecules, and the bigger the imbalance of hits at any instant, the bigger the lurch. It is direct evidence that gas particles move randomly and continuously (Supplement: the uneven collisions and their random distribution are the explanation demanded).</p>

<h3>The gas laws and the absolute scale of temperature</h3>
<p>For a fixed mass of gas, three qualitative rules are examined at Core level: heating a gas at constant pressure makes it expand (and cooling makes it contract); compressing a gas at constant temperature raises its pressure; and the relationships are summarised by the particle model above. The Celsius scale is everyday but its zero is arbitrary; the kelvin scale starts at absolute zero, the temperature at which particles have the minimum possible energy.</p>
<pre><code>temperature in kelvin = temperature in degrees Celsius + 273        T (K) = theta (C) + 273</code></pre>
<p><strong>Supplement: Boyle's law.</strong> For a fixed mass of gas at constant temperature, pressure and volume are inversely proportional:</p>
<pre><code>p V = constant        p1 V1 = p2 V2</code></pre>
<ul>
<li>p: pressure in pascals (Pa), positive; V: volume in cubic metres (m³) or any consistent unit. Both are scalars.</li>
<li>The product pV stays constant only while the temperature and the amount of gas are fixed.</li>
</ul>
<p>Doubling the pressure halves the volume; a graph of p against V is a curve (inverse proportion), while a graph of p against 1/V is a straight line through the origin — a standard Paper 4 graph question.</p>

<h3>Thermal expansion of solids, liquids and gases</h3>
<p>Almost everything expands when heated: the particles move faster and push further apart. Everyday consequences include gaps between railway rails and bridge sections, expansion loops in power cables, the bimetallic strip in a thermostat (two metals expand by different amounts, so the strip bends and breaks a circuit), and the difficulty of undoing a metal jar lid, which can be loosened by running hot water over it so the metal lid expands more than the glass. Liquids expand more than solids for the same temperature rise, and gases expand most of all.</p>
<p>The particle explanation is a Supplement statement: heating increases the average separation of the particles because their increased energy makes them swing wider about their positions in a solid, slide further apart in a liquid, and occupy a larger volume in a gas at the same pressure. Thermometers work because liquids expand predictably with temperature: the liquid column rises in a narrow capillary, making a small volume change visible as a large length change.</p>

<h3>Specific heat capacity</h3>
<p>Equal masses of different substances need different amounts of energy to warm by the same temperature: water resists temperature change far more than sand, which is why coastal towns have mild climates and why water makes an excellent coolant in car engines and central heating. That property is the specific heat capacity:</p>
<pre><code>energy transferred = mass x specific heat capacity x temperature change        E = m c delta theta</code></pre>
<ul>
<li>E: energy transferred in joules (J); m: mass in kilograms (kg).</li>
<li>c: specific heat capacity in joules per kilogram per degree Celsius (J kg⁻¹ °C⁻¹, numerically the same as J kg⁻¹ K⁻¹). A scalar.</li>
<li>delta theta: temperature change in degrees Celsius (°C) or kelvin (K). Temperature rises give a positive energy input; falls give energy out.</li>
</ul>
<p><strong>Supplement: measuring c experimentally.</strong> An electrical heater warms a well-lagged block of the substance; an ammeter and voltmeter give the electrical energy E = V I t, and a thermometer gives the temperature rise. Plot temperature against time; the gradient gives the rate of heating, and c = V I t / (m delta theta). Lagging reduces heat loss to the surroundings, the stirrer evens out hot spots, and the same method compares two materials by heating equal masses with the same heater for the same time.</p>

<h3>Melting, boiling and evaporation</h3>
<p>Melting and boiling happen at fixed temperatures for a pure substance at fixed pressure: 0 °C and 100 °C for pure water at one atmosphere. On a heating curve, plateaus mark the changes of state, and the energy supplied during a plateau is the latent heat: the energy needed to change the state of 1 kg without any temperature change (latent heat of fusion for melting, of vaporisation for boiling). The plateau exists because the energy breaks intermolecular attractions rather than increasing particle speed.</p>
<p><strong>Evaporation</strong> is different from boiling and happens at any temperature. Particles at the liquid surface occasionally escape with above-average energy, so the average energy of those left falls and the liquid cools. Evaporation is faster when the temperature is higher, the surface area is larger, and a draught carries vapour away — the three factors Paper 4 expects in an evaporation-and-cooling explanation. Boiling happens throughout the liquid at a fixed temperature, with bubbles of vapour forming internally; evaporation happens only at the surface, at all temperatures, and cools the liquid left behind. Wet skin cools you because the water evaporates and takes the highest-energy particles with it.</p>

<h3>Conduction</h3>
<p>Conduction is the transfer of energy through a substance without the substance itself moving. In metals, the free electrons carry energy quickly from the hot end to the cold end, which is why metals are good conductors; in non-metals the energy passes only as vibrations handed along the vibrating particles, which is much slower. In gases and most liquids, conduction is poor because the particles are too far apart to pass on vibrations efficiently — hence insulating materials trap air in fibres or foam.</p>
<p>The core practical comparison: rods of different materials are coated with wax at one end and held over a heat source; the wax falls first from the best conductor. Metals come out in order (copper and aluminium good, steel poorer), while wood, plastic and glass barely conduct at all.</p>

<h3>Convection</h3>
<p>Convection is the transfer of energy by the movement of a fluid itself. Heating a fluid lowers its density: the warm parcel rises, cooler fluid sinks to take its place, and a convection current sets up. This is how radiators heat a room (hot air rises from the radiator, cools at the ceiling and returns down the far wall), how a kettle boils from the bottom, how sea breezes blow from sea to land by day, and how the element of a domestic water heater sits at the bottom so the whole tank warms. Convection requires a fluid — it cannot occur in a solid, and in a vacuum there is no medium at all.</p>

<h3>Radiation</h3>
<p>Radiation is the transfer of energy by electromagnetic waves, mainly infrared. It needs no medium, so it is the only way energy crosses the vacuum of space — which is why the Sun's heat reaches the Earth. The rate of emission and absorption depends on surface colour and texture: dull black surfaces are the best emitters and the best absorbers; shiny white or silvered surfaces are the poorest and reflect most radiation.</p>
<table border="1" cellpadding="6">
<tr><th>Application</th><th>Surface choice and reason</th></tr>
<tr><td>House radiator</td><td>Matte dark paint: emits radiation well</td></tr>
<tr><td>Hot-water tank and pipes</td><td>Silvered foil: reduces radiation loss</td></tr>
<tr><td>Thermos flask</td><td>Silvered glass walls on both sides: minimises radiated loss in and out</td></tr>
<tr><td>Ice box / cool box</td><td>Shiny white outside: reflects incoming radiation</td></tr>
<tr><td>Desert survival bag</td><td>Shiny side outwards in hot sun: reflects the Sun's radiation</td></tr>
</table>
<p><strong>Supplement: the Earth's energy balance.</strong> The Earth absorbs short-wavelength radiation from the Sun and radiates longer-wavelength infrared back to space. At equilibrium the two rates match and the average temperature is steady; greenhouse gases absorb some outgoing infrared and re-radiate it downwards, raising the equilibrium temperature. More greenhouse gas shifts the balance and warms the surface — the physics behind climate change.</p>

<h3>Worked example: heating water</h3>
<p>A 2.0 kg kettle of water is heated from 15 °C to 100 °C. The specific heat capacity of water is 4200 J kg⁻¹ °C⁻¹. The kettle's heater supplies 2400 W.</p>
<pre><code>energy needed = m c delta theta = 2.0 x 4200 x (100 - 15) = 714 000 J
time = energy / power = 714 000 / 2400 = 298 s (about 5.0 minutes)</code></pre>
<p>Real kettles take longer, because some energy warms the kettle body and is lost to the air — which is exactly why the efficiency of a kettle is less than 100 per cent. To boil the water away would need far more energy again, because of the latent heat of vaporisation.</p>
<p>Second calculation: a 0.50 kg block of aluminium (c = 900 J kg⁻¹ °C⁻¹) cools from 80 °C to 25 °C. Energy released = 0.50 × 900 × 55 = 24 750 J ≈ 25 kJ. Cooling gives out the same energy that heating took in; only the sign of the temperature change differs.</p>

<h3>Common mistakes</h3>
<ul>
<li>Saying heat rises. Heat is energy, not a substance; it is the warm fluid that rises because it is less dense.</li>
<li>Confusing temperature with internal energy: temperature measures the average energy per particle, while internal energy is the total energy of all particles.</li>
<li>Forgetting that during melting or boiling the temperature stays constant even though energy is still being supplied.</li>
<li>Mixing up conduction (through a substance), convection (by a moving fluid) and radiation (by waves, no medium). A vacuum flask blocks all three: silvered walls (radiation), vacuum gap (conduction and convection), foam or stopper (conduction).</li>
<li>Using degrees Celsius where kelvin are required in a gas-law calculation; always convert with T = θ + 273 before using pV = constant relationships.</li>
<li>Putting mass in grams into E = mcΔθ; the unit J kg⁻¹ °C⁻¹ demands kilograms.</li>
<li>Describing evaporation as boiling; evaporation occurs at any temperature, only at the surface, and cools the remaining liquid.</li>
<li>Claiming particles expand; it is the average separation between the particles that increases.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> A 500 g block of copper (c = 390 J kg⁻¹ °C⁻¹) is heated from 20 °C to 120 °C. Calculate the energy transferred.</p>
<p>Answer: E = mcΔθ = 0.50 × 390 × 100 = 19 500 J = 19.5 kJ.</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> Explain, using the particle model, why a metal lid on a glass jar loosens under hot water.</p>
<p>Answer: The hot water heats both the lid and the jar. The particles in the metal gain energy and vibrate with greater amplitude, so their average separation increases more than that of the glass particles, because metals expand more than glass for the same temperature rise. The metal lid therefore becomes slightly larger in diameter than the neck of the jar and turns more easily.</p>
<p><strong>Question 3 (Paper 2 style).</strong> Which change does not occur at a fixed temperature? A ice melting at 0 °C; B water boiling at 100 °C; C water evaporating from a puddle; D steam condensing at 100 °C. Answer: C. Evaporation occurs at any temperature and is not a fixed-temperature change of state.</p>
<p><strong>Question 4 (Paper 4, 6 marks).</strong> Explain how a vacuum flask keeps a drink hot, referring to all three methods of thermal energy transfer.</p>
<p>Answer: The double-walled glass vessel has a vacuum between the walls, and a vacuum contains no particles, so energy cannot be transferred across the gap by conduction or convection. Both walls are silvered to reduce radiation: the shiny surfaces are poor emitters and poor absorbers, so little infrared escapes. The plastic stopper and foam supports are poor conductors and block convection in the air above the liquid. Together these keep energy in the drink for hours.</p>
<p><strong>Question 5 (Paper 6 style).</strong> Describe an experiment to compare how well different materials conduct heat.</p>
<p>Answer: Fix rods of equal length and thickness made from the different materials, each coated at the far end with an equal blob of wax, over identical heat sources. Start together and record the time for each wax blob to fall. The shortest time identifies the best conductor. Keep the source, rod dimensions, coating thickness and starting temperature identical so the comparison is fair, and repeat to check the ranking.</p>
<p><strong>Question 6 (Paper 4, 3 marks).</strong> A gas is trapped in a sealed syringe at 100 cm³ and 20 °C. It is heated to 87 °C at constant pressure. Find its new volume.</p>
<p>Answer: Convert first: 20 °C = 293 K, 87 °C = 360 K. At constant pressure V/T is constant, so V₂ = 100 × 360/293 = 123 cm³. (For a Core-level answer, the gas expands when heated at constant pressure, and the volume rises by roughly a quarter.)</p>
<p>From heat to the transfer of energy by waves: the next topic is Waves and Sound.</p>
`,

    "4c3feece-d824-42a8-88ae-a9f3c5c313f7": `
<h2>IGCSE Physics: Waves and Sound</h2>
<p>Cambridge IGCSE Physics 0625 (2026–2028), Topic 3 Waves: statements 3.1 General properties of waves, 3.2 Light, 3.3 Electromagnetic spectrum and 3.4 Sound. Waves are how energy travels from place to place without moving matter along with it, and everything from a ripple on a pond to a gamma ray obeys the same few rules. This note builds the general wave behaviour first, then light (reflection, refraction, lenses, colour), then the electromagnetic spectrum and finally sound, with the calculations and the ray constructions that Paper 4 and Paper 6 reward.</p>

<h3>General properties of waves</h3>
<p>A wave transfers energy without transferring matter. Drop a cork into a ripple tank and the ripples pass under it while the cork only bobs: the water moves up and down, not outward. Every wave is described by the same vocabulary:</p>
<table border="1" cellpadding="6">
<tr><th>Term</th><th>Meaning</th><th>Unit</th></tr>
<tr><td>Amplitude</td><td>Maximum displacement from the rest position; relates to energy (loudness for sound, brightness for light)</td><td>metre (m)</td></tr>
<tr><td>Wavelength (lambda)</td><td>Distance between two equivalent points on neighbouring waves, e.g. crest to crest</td><td>metre (m)</td></tr>
<tr><td>Frequency</td><td>Number of complete waves passing a point per second; equals the source's number of oscillations per second</td><td>hertz (Hz)</td></tr>
<tr><td>Period</td><td>Time for one complete wave to pass a point</td><td>second (s)</td></tr>
<tr><td>Wave speed</td><td>Distance a wave crest travels per second</td><td>metre per second (m s⁻¹)</td></tr>
</table>
<pre><code>wave speed = frequency x wavelength        v = f lambda
period = 1 / frequency        T = 1 / f</code></pre>
<ul>
<li>v: wave speed in metres per second (m s⁻¹); f: frequency in hertz (Hz, = s⁻¹); lambda: wavelength in metres (m). All scalars, so there are no signs to worry about — but all three quantities must be in SI units before multiplying.</li>
</ul>
<p><strong>Transverse waves</strong> have the vibration perpendicular to the direction of travel: water waves, light and all electromagnetic waves, waves on a shaken rope. <strong>Longitudinal waves</strong> have the vibration parallel to the direction of travel: sound in air, the push-pull of a slinky. Longitudinal waves show compressions (where particles are pushed together) and rarefactions (where they are spread apart).</p>
<p>Three behaviours describe what happens when waves meet things. <strong>Reflection</strong> is bouncing off a surface; the angle of incidence equals the angle of reflection, measured from the normal. <strong>Refraction</strong> is the change of direction when a wave passes into a different medium at an angle, because its speed changes; moving into a slower medium bends the ray towards the normal and the wavelength shortens while the frequency stays constant. <strong>Diffraction</strong> is the spreading of waves through a gap or around an obstacle, and it is most pronounced when the gap width is comparable to the wavelength. Ripple tanks demonstrate all three: straight barriers give reflection, shallow regions give refraction, and narrow gaps give circular wavefronts after diffraction (Supplement: wider gaps give less spreading, and an edge produces noticeable diffraction only for longer wavelengths).</p>

<h3>Reflection of light</h3>
<p>Light travels in straight lines and reflects from smooth surfaces with the law of reflection: the angle of incidence equals the angle of reflection, both measured between the ray and the normal (an imaginary line perpendicular to the surface at the point of incidence). A plane-mirror image is upright, the same size as the object, laterally inverted (left and right swapped), and as far behind the mirror as the object is in front.</p>
<p><strong>Supplement: the ray construction.</strong> To locate the image, draw a ray from the object to the mirror, continue it behind the mirror at the same angle, and drop a perpendicular from the image position to the mirror; repeat with a second ray. Where the reflected rays appear to come from behind the mirror is where the image sits. Drawing the construction to scale with a protractor gives the image position exactly.</p>

<h3>Refraction of light</h3>
<p>When light passes from air into glass at an angle it slows and bends towards the normal; passing back out it speeds up and bends away from the normal. The amount of bending is fixed by the material's refractive index:</p>
<pre><code>refractive index = sin(angle of incidence in vacuum or air) / sin(angle of refraction)        n = sin i / sin r
critical angle:        sin c = 1 / n</code></pre>
<ul>
<li>n: refractive index, a scalar with no unit, always greater than 1 for a material like glass or water.</li>
<li>i and r: angles in degrees measured from the normal, not from the surface.</li>
<li>c: critical angle in degrees, defined for a ray passing from the material into air.</li>
</ul>
<p><strong>Total internal reflection</strong> happens when a ray inside a material hits the boundary at an angle greater than the critical angle: none of it escapes and all reflects. Two applications are examinable: optical fibres, where light bounces along the core with total internal reflection and carries data over long distances with little loss, and prisms in periscopes and binoculars, where a 45° prism turns light through 90° or 180° by total internal reflection with almost no energy loss compared with a mirror.</p>

<h3>Thin lenses and vision</h3>
<p>A converging lens brings parallel rays to a focus at its principal focus; a diverging lens spreads them out as if they came from a focus on the near side. Three standard rays build any image on a converging lens:</p>
<ul>
<li>A ray parallel to the axis refracts through the principal focus on the far side.</li>
<li>A ray through the centre of the lens passes straight through undeviated.</li>
<li>A ray through the near-side principal focus emerges parallel to the axis.</li>
</ul>
<p>Where two refracted rays cross, a real image forms — it can be shown on a screen. Where they only appear to diverge from a point behind the lens, a virtual image forms — it cannot be caught on a screen and is seen only by looking through the lens. An object beyond twice the focal length gives a smaller inverted real image (a camera); an object between the focus and the lens gives a larger upright virtual image (a magnifying glass, Supplement). Short sight (myopia) is corrected with a diverging lens, long sight (hyperopia) with a converging lens (Supplement).</p>

<h3>Dispersion and the electromagnetic spectrum</h3>
<p>White light passing through a prism disperses into a spectrum from red to violet because different colours refract by different amounts: red light is refracted least (it travels fastest in glass) and violet most. Light of a single colour is monochromatic (Supplement). The visible spectrum sits inside a much larger family — the electromagnetic spectrum, all waves travelling at 3 × 10⁸ m s⁻¹ in a vacuum, all transverse, arranged by increasing frequency (and decreasing wavelength) as: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays.</p>
<table border="1" cellpadding="6">
<tr><th>Region</th><th>Wavelength scale</th><th>Uses</th><th>Hazards</th></tr>
<tr><td>Radio waves</td><td>metres to hundreds of metres</td><td>Radio and TV broadcasting, communications</td><td>Little evidence of harm at normal levels</td></tr>
<tr><td>Microwaves</td><td>millimetres to centimetres</td><td>Mobile phones, satellite communications, microwave ovens, radar</td><td>Heating of body tissue; dangerous at high intensity</td></tr>
<tr><td>Infrared</td><td>micrometres</td><td>Heating, night-vision cameras, remote controls, optical fibres</td><td>Burns and skin heating at high intensity</td></tr>
<tr><td>Visible light</td><td>400–700 nm</td><td>Vision, photography, fibre-optic data</td><td>Dazzle; eye damage from lasers and the Sun</td></tr>
<tr><td>Ultraviolet</td><td>10–400 nm</td><td>Fluorescent lamps, sterilisation, security marking</td><td>Sunburn, skin ageing and skin cancer, eye damage</td></tr>
<tr><td>X-rays</td><td>0.01–10 nm</td><td>Medical imaging, airport security, detecting cracks in metal</td><td>Ionising: cell damage and cancer risk; dose kept low</td></tr>
<tr><td>Gamma rays</td><td>below 0.01 nm</td><td>Sterilising equipment, cancer radiotherapy, food irradiation</td><td>Ionising: severe cell damage; shielded with lead and concrete</td></tr>
</table>
<p><strong>Supplement: signals and communication.</strong> An analogue signal varies continuously with the quantity it carries; a digital signal is a stream of on/off pulses. Digital signals are preferred because they can be regenerated without amplifying noise, can be compressed to carry more information, can be encrypted, and can carry text, sound and images in the same stream. Satellite links work by beaming a microwave signal to an orbiting satellite, which amplifies and retransmits it back to a distant ground station.</p>

<h3>Sound</h3>
<p>Sound is a longitudinal wave produced by vibrating objects and travelling through a medium — air at about 340 m s⁻¹ at room temperature, faster in liquids and fastest in solids, because the particles are closer together and pass the vibration on more quickly. Sound cannot travel through a vacuum. The frequency of a sound sets its pitch (high frequency, high pitch), and the amplitude sets its loudness. The human range of hearing is roughly 20 Hz to 20 000 Hz.</p>
<p><strong>Echoes and distance measurement.</strong> Sound reflects from hard surfaces, giving echoes. The depth of the sea under a ship is found by sending a pulse and timing its return:</p>
<pre><code>distance to the surface = (speed of sound x total time) / 2        s = v t / 2</code></pre>
<p>The halving is essential — the pulse travels down and back — and forgetting it is the classic error in this topic. Measuring the time between two microphones a known distance apart gives the speed of sound directly: v = distance/time.</p>
<p><strong>Ultrasound</strong> is sound above the human hearing range (above 20 kHz). Its short wavelength means it reflects well from small internal boundaries, which makes it useful for prenatal scanning (reflection at tissue boundaries builds an image), cleaning delicate items (high-energy vibrations dislodge dirt), flaw detection in metal castings (an internal crack reflects the pulse), and sonar depth sounding. All uses share the same principle: send a pulse, time the echo, calculate the distance with s = vt/2.</p>

<h3>Worked example: wave calculation and echo depth</h3>
<p>A ship's sonar sends ultrasound of frequency 50 kHz. The echo returns from the seabed after 0.12 s. The speed of sound in seawater is 1500 m s⁻¹.</p>
<pre><code>total distance travelled = v t = 1500 x 0.12 = 180 m
depth of the sea = 180 / 2 = 90 m</code></pre>
<p>Second calculation: a ripple tank wave has a wavelength of 0.040 m and the dippers oscillate 25 times per second. The wave speed is v = f λ = 25 × 0.040 = 1.0 m s⁻¹. The frequency of the wave equals the frequency of the source, and it stays unchanged when the wave passes into deeper water — only the speed and the wavelength change there.</p>

<h3>Common mistakes</h3>
<ul>
<li>Measuring a wavelength from crest to trough; that is half a wavelength. Measure between two equivalent points on neighbouring waves.</li>
<li>Forgetting that frequency never changes on refraction. The speed and wavelength change; the frequency is set by the source and stays constant.</li>
<li>Mixing up the angle of incidence with its complement: all angles in reflection and refraction are measured from the normal.</li>
<li>Using v = fλ with mismatched units: hertz times centimetres gives cm s⁻¹, not m s⁻¹. Convert the wavelength to metres first.</li>
<li>Forgetting to halve the total distance in an echo calculation.</li>
<li>Drawing a converging lens ray diagram without the two special rays, or putting the image on the wrong side: real images form on the far side where rays actually cross, virtual images on the same side as the object.</li>
<li>Claiming light travels slower in a vacuum than in glass; it is fastest in a vacuum and slower in denser media, which is what causes refraction.</li>
<li>Describing a digital signal as continuously varying; it is discrete pulses, which is precisely why it resists noise.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> A water wave has a frequency of 4.0 Hz and a wavelength of 0.25 m. Calculate its speed and its period.</p>
<p>Answer: v = fλ = 4.0 × 0.25 = 1.0 m s⁻¹. Period T = 1/f = 1/4.0 = 0.25 s.</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> Explain why sound cannot be heard on the Moon but sunlight still reaches it.</p>
<p>Answer: Sound is a longitudinal wave that needs a medium, because it travels by particles passing vibrations to their neighbours. The Moon is surrounded by a vacuum, with no particles to carry the vibration, so sound cannot travel there. Light is an electromagnetic transverse wave that carries energy without needing a medium, so it crosses the vacuum of space easily.</p>
<p><strong>Question 3 (Paper 2 style).</strong> Light passes from air into glass at an angle. Which quantity does not change? A speed; B wavelength; C frequency; D direction. Answer: C. The frequency is set by the source and is unchanged; speed and wavelength both fall in glass and the ray bends.</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> Ultrasound of speed 1500 m s⁻¹ is used to find the depth of the sea. The echo returns in 0.40 s. Calculate the depth and explain why ultrasound is used rather than audible sound.</p>
<p>Answer: Depth = v t / 2 = 1500 × 0.40 / 2 = 300 m. Ultrasound has a very short wavelength, so it reflects well from small boundaries and gives a clear echo pattern without diffracting uselessly around small features; it also does not interfere with ordinary sound and is harmless at the intensities used.</p>
<p><strong>Question 5 (Paper 6 style).</strong> Describe how to measure the speed of sound in air using two microphones and a data logger.</p>
<p>Answer: Place two microphones a measured distance apart in a straight line from a sound source (a clapping board or signal generator and loudspeaker). Trigger the data logger with the sound at each microphone and record the time interval between the arrivals, or display both pulses on an oscilloscope and measure the time from the trace. Speed is the distance between the microphones divided by the time interval. Repeat at several separations and find the speed from the gradient of a distance–time graph, which averages out the reaction error.</p>
<p><strong>Question 6 (Paper 4, 3 marks).</strong> State two differences between a transverse and a longitudinal wave, and give one example of each.</p>
<p>Answer: In a transverse wave the vibrations are perpendicular to the direction of energy transfer; in a longitudinal wave they are parallel to it. Transverse waves have crests and troughs; longitudinal waves have compressions and rarefactions. Examples: light (transverse) and sound in air (longitudinal).</p>
<p>Waves carry energy without matter; the next topic is the energy that drives circuits: Electricity and Circuits.</p>
`,
  },
};
