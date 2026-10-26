// Physics OL batch 3: Cambridge IGCSE Physics 0625 (2026-2028) statements
// 4.2-4.4 (electricity and circuits), 4.1 and 4.5 (magnetism and
// electromagnetism), 5.1-5.2 (nuclear physics) and 6.1-6.2 (space physics).
// Completes Physics OL 10/10 at the depth bar. Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-phys-ol-depth-3.cjs > .freebuff-tmp/phys-ol-depth-3.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phys-ol-depth-3.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phys-ol-depth-3.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs physics OL
module.exports = {
  expectType: "notes",
  titles: {
    "cad3375c-cc3e-4846-8a72-441509ebada1": "IGCSE Physics: Electricity and Circuits",
    "53568d22-201e-404e-83d9-0e61912f2c1b": "IGCSE Physics: Magnetism and Electromagnetism",
    "d7f2e9e8-ff4a-4fba-9960-48d8ca800dd6": "IGCSE Physics: Nuclear Physics",
    "798f9e7d-33c5-456e-9070-c32874b67978": "IGCSE Physics: Earth and Space",
  },
  rows: {
    "cad3375c-cc3e-4846-8a72-441509ebada1": `
<h2>IGCSE Physics: Electricity and Circuits</h2>
<p>Cambridge IGCSE Physics 0625 (2026–2028), Topic 4 Electricity and magnetism: statements 4.2 Electrical quantities, 4.3 Electric circuits and 4.4 Electrical safety. Electric circuits are the most calculation-dense part of the Paper 4 paper, and every result in them flows from one picture: a battery pushes charge round a circuit, the charge pays a price (p.d.) to get through each component, and the rate of flow is the current. This note builds charge, current, e.m.f., p.d., resistance, energy and power from scratch, then builds real circuits from them and finishes with the mains safety that saves lives.</p>

<h3>Electric charge and the electron model</h3>
<p>There are two kinds of charge, positive and negative, and the rule is simple: like charges repel, unlike charges attract. Rubbing a polythene rod with a cloth transfers electrons from the cloth to the rod, so the rod becomes negatively charged and the cloth positive; nothing is created — charge is transferred. A <strong>conductor</strong> (metal, graphite, the human body, tap water) lets charge move through it because it contains free electrons; an <strong>insulator</strong> (plastic, rubber, dry air, glass) does not. Charging by friction works only when the object is isolated on an insulating support, or the charge leaks away instantly.</p>
<p>Supplement adds the two deeper ideas. Charge is measured in coulombs (C); one coulomb is the charge that flows when a current of 1 ampere passes for 1 second, and the charge on one electron is 1.6 × 10⁻¹⁹ C. A charged object also creates an electric field in the space around it — a region where other charges experience a force — and the field of a point charge is drawn as radial lines pointing away from a positive charge and towards a negative one.</p>

<h3>Electric current</h3>
<p>Electric current is the rate of flow of charge. In metals the charge carriers are free electrons drifting slowly around the circuit while the electric field travels almost at the speed of light, which is why a lamp lights the instant a switch is closed.</p>
<pre><code>current = charge / time        I = Q / t</code></pre>
<ul>
<li>I: current in amperes (A); Q: charge in coulombs (C); t: time in seconds (s). Current is treated as a scalar in circuit calculations.</li>
<li>Conventional current flows from the positive terminal, round the circuit, to the negative terminal; electrons drift the opposite way. Both descriptions are accepted, but conventional current is the one used in circuit diagrams.</li>
</ul>
<p>An ammeter measures current and is connected in <strong>series</strong>, so the whole current passes through it. Direct current (d.c.) flows in one direction only, as from a battery; alternating current (a.c.) reverses direction repeatedly, as from the mains, which in the UK completes 50 cycles per second at 230 V.</p>

<h3>Electromotive force and potential difference</h3>
<p>The <strong>electromotive force</strong> (e.m.f.) of a source is the energy transferred from other forms to electrical energy per unit charge driven round the whole circuit; the <strong>potential difference</strong> (p.d.) across a component is the energy transferred from electrical to other forms per unit charge passing through that component. Both are measured in volts, and a voltmeter is connected in <strong>parallel</strong> with the component being measured.</p>
<pre><code>potential difference = energy transferred / charge        V = W / Q
electromotive force = energy transferred from other forms / charge driven</code></pre>
<ul>
<li>V: potential difference in volts (V); W: energy in joules (J); Q: charge in coulombs (C). One volt is one joule per coulomb (1 V = 1 J C⁻¹).</li>
</ul>
<p>The distinction that earns marks: e.m.f. is about energy <em>supplied</em> to the circuit (a battery's rating, 1.5 V for a dry cell), while p.d. is about energy <em>delivered</em> to a component. In a series circuit the p.d.s across the components add up to the supply e.m.f., because each coulomb spends its energy bit by bit around the loop.</p>

<h3>Resistance</h3>
<p>Resistance is how much a component opposes current. It is measured in ohms (Ω): a 12 Ω resistor passes less current than a 4 Ω resistor at the same p.d.</p>
<pre><code>resistance = potential difference / current        R = V / I</code></pre>
<ul>
<li>R: resistance in ohms (Ω); V: p.d. across the component in volts (V); I: current through it in amperes (A). Resistance is a scalar.</li>
</ul>
<p>Resistance is measured by setting up a circuit with the unknown resistor, an ammeter in series and a voltmeter across it, then changing the supply with a variable resistor and taking several pairs of readings. The resistance is found from the gradient of a graph of V against I, which averages the whole data set.</p>
<p><strong>The wire's dimensions matter.</strong> A longer wire has greater resistance (resistance is proportional to length); a thicker wire has less (resistance is inversely proportional to cross-sectional area); and the material matters because of how many free electrons it provides. Nichrome wire is used for heating elements because it has a high resistance and resists oxidation when hot.</p>
<p><strong>Supplement: current–voltage graphs.</strong> A metallic conductor at constant temperature gives a straight line through the origin — ohmic. A filament lamp curves over: as it heats, its resistance rises, so the graph flattens. A diode conducts in one direction only, giving almost zero current in reverse; a light-dependent resistor falls in resistance as light intensity rises; a thermistor falls in resistance as temperature rises. All three are basis-of-operation questions for sensors.</p>

<h3>Electrical energy and power</h3>
<p>Every component turns electrical energy into something else — heat in a resistor, light and heat in a lamp, kinetic energy in a motor. The rate of that transfer is electrical power:</p>
<pre><code>electrical power = potential difference x current        P = V I
electrical energy = power x time = V I t        E = V I t</code></pre>
<ul>
<li>P: power in watts (W); V: volts (V); I: amperes (A); E: energy in joules (J); t: time in seconds (s).</li>
<li>Combined with R = V/I this gives P = I²R and P = V²/R, useful when the resistance is known instead of the p.d.</li>
</ul>
<p>The kilowatt-hour is the domestic unit of energy: one kWh is the energy used by a 1000 W device running for one hour (3.6 × 10⁶ J). Electricity bills charge cost = number of kWh × price per kWh, and a Paper 4 question usually asks for the cost of running a named appliance for a stated time.</p>

<h3>Circuit components and circuit rules</h3>
<p>Circuit diagrams use standard symbols: cell, battery, lamp, resistor, variable resistor, thermistor, LDR, diode, LED, ammeter, voltmeter, switch, motor. The two rules for series and parallel circuits are the spine of every calculation:</p>
<table border="1" cellpadding="6">
<tr><th></th><th>Series</th><th>Parallel</th></tr>
<tr><td>Current</td><td>The same through every component</td><td>Shared between the branches; the branch currents add up to the total</td></tr>
<tr><td>Potential difference</td><td>Shared between the components; the p.d.s add up to the supply</td><td>The same across every branch</td></tr>
<tr><td>Resistance</td><td>R(total) = R1 + R2 + ...</td><td>1/R(total) = 1/R1 + 1/R2 + ... (Supplement); two equal resistors in parallel give half the resistance of one</td></tr>
</table>
<p>Adding lamps in series makes all of them dimmer, because the total resistance rises and the current falls; adding lamps in parallel leaves each at full brightness (each has the full p.d. across it) but draws more current from the supply. A variable resistor in series with a lamp dims it by reducing the current; a <strong>potential divider</strong> (Supplement) is two resistors in series with the output tapped between them:</p>
<pre><code>output voltage = supply voltage x R2 / (R1 + R2)</code></pre>
<p>A potential divider feeding a sensor gives an output voltage that changes with light or temperature, which is the basis of automatic night lights and thermostats.</p>

<h3>Electrical safety</h3>
<p>The domestic mains in the UK is 230 V a.c., enough to kill. The three wires in a three-core cable are colour-coded: <strong>live</strong> (brown) carries the alternating p.d. at about 230 V; <strong>neutral</strong> (blue) completes the circuit and is held near 0 V; <strong>earth</strong> (green and yellow) is a safety wire connected to the metal case of the appliance and to the ground.</p>
<ul>
<li><strong>Fuse</strong>: a thin wire in the live path that melts and breaks the circuit if the current exceeds its rating, protecting against overheating and fire. Choose a rating just above the normal working current.</li>
<li><strong>Circuit breaker</strong>: a magnetic or electronic switch that trips and can be reset; faster and reusable, doing the same job as a fuse.</li>
<li><strong>Earthing</strong>: if a fault connects the live wire to a metal case, the earth wire carries a large current that blows the fuse instead of giving the user a shock.</li>
<li><strong>Double insulation</strong>: appliances with plastic cases need no earth wire, because no fault can make the case live.</li>
</ul>
<p>Everyday hazards to name in an exam: frayed cables, damaged plugs, wet hands, water near electrical equipment, overloaded adapters, and touching a live conductor. The physics of the danger is current through the body: even a few tens of milliamperes through the heart can be fatal, and wet skin lowers body resistance and raises that current.</p>

<h3>Worked example: a mixed circuit</h3>
<p>Two resistors, 6.0 Ω and 3.0 Ω, are connected in parallel across a 12 V supply.</p>
<pre><code>1 / R(total) = 1/6.0 + 1/3.0 = 0.167 + 0.333 = 0.500, so R(total) = 2.0 ohm
total current = V / R = 12 / 2.0 = 6.0 A
current in the 6.0 ohm resistor = 12 / 6.0 = 2.0 A
current in the 3.0 ohm resistor = 12 / 3.0 = 4.0 A   (branch currents add to 6.0 A)
power in the circuit = V I = 12 x 6.0 = 72 W
energy in 5 minutes = P t = 72 x 300 = 21 600 J</code></pre>
<p>Each resistor has the full 12 V across it, as the parallel rule demands. If the two were instead in series, the total resistance would be 9.0 Ω, the current 1.33 A, and each p.d. would add to 12 V — a useful check before trusting any circuit answer.</p>

<h3>Common mistakes</h3>
<ul>
<li>Putting an ammeter in parallel or a voltmeter in series; ammeters join in series, voltmeters across the component.</li>
<li>Using the supply voltage as the p.d. across one component in a series circuit; the supply is shared.</li>
<li>Adding resistances in parallel by simple addition; the reciprocals add, so the total is always less than the smallest branch.</li>
<li>Confusing current direction with electron drift, or saying charge is used up; the current is the same everywhere in a series circuit, and energy is transferred, not the charge.</li>
<li>Using watts and minutes in E = VIt; power in watts needs energy in joules and time in seconds (convert kWh and hours carefully in cost questions).</li>
<li>Forgetting that a filament lamp's resistance rises as it heats, so its I–V graph is a curve, not a straight line.</li>
<li>Choosing a fuse rating far above the working current for safety; too high a rating defeats the protection.</li>
<li>Mixing e.m.f. and p.d.: the battery has an e.m.f.; each component has a p.d. across it.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> A lamp is marked 24 W, 12 V. Calculate the current it takes and its resistance.</p>
<p>Answer: P = VI gives I = 24/12 = 2.0 A. R = V/I = 12/2.0 = 6.0 Ω.</p>
<p><strong>Question 2 (Paper 4, 3 marks).</strong> A charge of 360 C passes through a lamp in 3.0 minutes. Calculate the current.</p>
<p>Answer: I = Q/t = 360/180 = 2.0 A. (Convert minutes to seconds first.)</p>
<p><strong>Question 3 (Paper 2 style).</strong> In a series circuit of two resistors, which statement is true? A the current is largest through the smaller resistor; B the p.d. across each is the same as the supply; C the current is the same in both; D the total resistance is less than either. Answer: C. Current is the same everywhere in series; the p.d. is shared and the total resistance is the sum.</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> A 3.0 kW kettle runs for 4.0 minutes from 230 V. Find the charge that flows and the energy transferred.</p>
<p>Answer: I = P/V = 3000/230 = 13 A. Q = It = 13 × 240 = 3120 C. Energy = Pt = 3000 × 240 = 720 000 J (0.20 kWh).</p>
<p><strong>Question 5 (Paper 4, 4 marks).</strong> Explain why a metal-cased washing machine has an earth wire but a plastic hairdryer does not.</p>
<p>Answer: The metal case is a conductor; if a fault brings the live wire into contact with it, the case would become live at 230 V and anyone touching it would receive a shock. The earth wire connects the case to the ground, so a large fault current flows to earth and melts the fuse, isolating the supply. The hairdryer has a plastic (double-insulated) case which cannot conduct, so no fault can make the outside live and no earth wire is needed.</p>
<p><strong>Question 6 (Paper 6 style).</strong> Describe how you would determine the resistance of a coil of wire.</p>
<p>Answer: Connect the coil in series with an ammeter, a cell and a variable resistor, with a voltmeter across the coil. Vary the current and record several pairs of current and p.d. readings. Plot p.d. against current; the gradient is the resistance of the coil. Taking several readings and using the graph removes the effect of random errors and of the coil warming up (which would otherwise change its resistance).</p>
<p>Where charge flows, fields follow: next is Magnetism and Electromagnetism.</p>
`,

    "53568d22-201e-404e-83d9-0e61912f2c1b": `
<h2>IGCSE Physics: Magnetism and Electromagnetism</h2>
<p>Cambridge IGCSE Physics 0625 (2026–2028), Topic 4 Electricity and magnetism: statements 4.1 Simple phenomena of magnetism and 4.5 Electromagnetic effects. Magnetism and electricity are two faces of one interaction: moving charge makes magnetic fields, and changing magnetic fields make currents. That single loop of cause and effect explains generators, motors, transformers and every device that turns movement into electricity or electricity into movement.</p>

<h3>Magnets and magnetic fields</h3>
<p>A magnet has two poles, north and south. Like poles repel; unlike poles attract; and a magnet freely suspended turns to line up with the Earth's magnetic field, which is why a compass points north. Magnetic materials (iron, steel, nickel, cobalt) are attracted to magnets; non-magnetic materials are not. <strong>Induced magnetism</strong> is what happens when a magnetic material near a magnet becomes a magnet itself: a paper clip picked up by a magnet can pick up a second clip. Soft iron makes temporary magnets (it magnetises and demagnetises easily — good for electromagnets and relays); steel makes permanent magnets (hard to demagnetise — good for compass needles).</p>
<p>A magnetic field is the region around a magnet where another magnet experiences a force. Its direction is the direction a north pole would move — out of a north pole and into a south pole. Field lines never cross, and their spacing shows the field strength: close together for a strong field, spread out for a weak one (Supplement: the field is the region of influence, and its strength is represented by the line density). Plotting fields is done with a small plotting compass on a sheet of paper over the magnet; the compass needle traces the lines from pole to pole.</p>

<h3>Electromagnetic induction</h3>
<p>Move a magnet into a coil of wire and a voltage appears across the coil: this is <strong>electromagnetic induction</strong>, discovered by Faraday. The induced e.m.f. (and the current it drives if the circuit is closed) is bigger when:</p>
<ul>
<li>the magnet or coil moves faster;</li>
<li>the magnet is stronger;</li>
<li>the coil has more turns;</li>
<li>the coil's core is soft iron (which concentrates the magnetic field).</li>
</ul>
<p>It is the <em>change</em> in the field that induces a voltage — a stationary magnet inside a coil does nothing. <strong>Supplement: Lenz's law.</strong> The induced current always flows in a direction that opposes the change producing it: push a north pole in and the coil's near face becomes north to push back; pull it out and the coil becomes south to hold it. Energy conservation demands this — the mechanical work done pushing against the opposition is exactly the electrical energy induced.</p>

<h3>The a.c. generator</h3>
<p>A generator turns kinetic energy into electrical energy by spinning a coil in a magnetic field (or a magnet inside a coil). As the coil rotates, the amount of magnetic field passing through it changes continuously, so an e.m.f. is induced that rises, falls and reverses, producing alternating current.</p>
<ul>
<li>The coil ends are joined to two <strong>slip rings</strong>, each touching a <strong>brush</strong> (a carbon block) that carries the current to the external circuit.</li>
<li>Supplement: the e.m.f.–time graph is a sine wave; it is zero when the coil is vertical (moving parallel to the field) and maximum when the coil is horizontal (cutting the field fastest).</li>
</ul>
<p>A power station generator is the same machine scaled up: steam, water or wind spins the coil, and the faster it spins or the stronger the field, the greater the peak e.m.f.</p>

<h3>The magnetic effect of a current</h3>
<p>A current in a wire produces a magnetic field around it — the discovery that links electricity and magnetism. The field lines are concentric circles centred on the wire, and the field is stronger closer to the wire. The <strong>right-hand grip rule</strong> gives the direction: point the thumb along the conventional current and the curled fingers show the direction of the field lines.</p>
<p>Winding the wire into a <strong>solenoid</strong> (coil) concentrates the field into a pattern just like a bar magnet's: strong and uniform inside the coil, out of one end and into the other. The field is stronger with more turns and a larger current, and an iron core inside the coil makes an <strong>electromagnet</strong> — a magnet that can be switched on and off, made stronger at will, and loses its magnetism when the current stops.</p>
<ul>
<li><strong>Relay</strong>: a small current in an electromagnet's coil attracts a soft-iron armature that closes a second, high-current circuit. It lets a low-voltage circuit switch a dangerous mains circuit safely.</li>
<li><strong>Loudspeaker</strong>: alternating current in a coil in the field of a permanent magnet makes the coil (attached to the cone) vibrate with the frequency of the current, producing sound waves. The loudspeaker turns electrical energy into sound energy; a microphone does the reverse.</li>
</ul>

<h3>Force on a current-carrying conductor</h3>
<p>A wire carrying a current in a magnetic field experiences a force — the principle of the motor and of the moving-coil loudspeaker. The force is largest when the wire is perpendicular to the field and zero when it runs parallel to it.</p>
<pre><code>force on a conductor = magnetic flux density x current x length        F = B I L</code></pre>
<ul>
<li>F: force in newtons (N); B: magnetic flux density in tesla (T); I: current in amperes (A); L: length of wire in the field in metres (m). The force direction is given by Fleming's left-hand rule and is a vector: swap any two of field, current and force and the force reverses.</li>
</ul>
<p><strong>Fleming's left-hand rule</strong>: first finger Field, seCond finger Current, thuMb Motion. The three fingers held mutually at right angles give all three directions. The force can be increased by raising the current, using a stronger magnet, or making the wire longer in the field (more turns on the coil). <strong>Supplement</strong>: a charged particle moving through a magnetic field is deflected for the same reason, which is how a beam of electrons can be bent on a screen.</p>

<h3>The d.c. motor</h3>
<p>A coil carrying current in a magnetic field experiences opposite forces on its two sides, producing a turning effect (a couple) that rotates the coil. A simple d.c. motor has the coil, a commutator (a split-ring), brushes, and a permanent-magnet field. The <strong>split-ring commutator</strong> is the clever part: every half turn it reverses the current in the coil, so the forces always push the same way and the rotation continues instead of stalling at the vertical position.</p>
<ul>
<li>The rotation speeds up with a larger current, a stronger field or more turns on the coil.</li>
<li>Energy conversion: electrical energy in, kinetic energy out (plus heat from the coil's resistance).</li>
<li>Running the motor in reverse — driving the coil instead of feeding it — turns it into a generator, which is how a bicycle dynamo works.</li>
</ul>

<h3>The transformer</h3>
<p>A transformer changes the size of an alternating voltage using electromagnetic induction. It has two coils wound on the same soft-iron core: the alternating current in the primary coil makes an alternating magnetic field in the core, which induces an alternating e.m.f. in the secondary coil.</p>
<pre><code>secondary voltage / primary voltage = secondary turns / primary turns        Vs / Vp = Ns / Np</code></pre>
<ul>
<li>Vp and Vs: voltages in volts (V); Np and Ns: numbers of turns on each coil. A step-up transformer has more turns on the secondary; a step-down has fewer.</li>
<li>Supplement: for an ideal transformer, power in = power out, so Vp Ip = Vs Is; stepping the voltage up steps the current down, and vice versa.</li>
</ul>
<p>Transformers are why the National Grid transmits at 11 000 V or more. For the same power, P = IV means a high voltage needs a small current, and the energy wasted heating the cables is I²R — squaring a small current makes the waste tiny. Power stations therefore step up for transmission and step down again at substations and on poles for safe domestic use. An ideal transformer has no energy losses; real ones lose a little to heating in the coils, to eddy currents in the core (reduced by a laminated core) and to magnetising the core, giving efficiencies of 95 per cent or better.</p>

<h3>Worked example: transmission losses</h3>
<p>A power station sends 20 MW at 250 V along cables of total resistance 0.10 Ω, and again at 25 000 V.</p>
<pre><code>current at 250 V = P / V = 20 000 000 / 250 = 80 000 A
power wasted = I² R = 80 000² × 0.10 = 640 MW   (impossible in practice - the cable would melt)
current at 25 000 V = 20 000 000 / 25 000 = 800 A
power wasted = 800² × 0.10 = 64 000 W = 64 kW</code></pre>
<p>Stepping the voltage up one hundredfold cuts the current one hundredfold and the wasted power ten thousandfold — 64 kW instead of 640 MW. That is the entire reason the grid uses transformers.</p>

<h3>Common mistakes</h3>
<ul>
<li>Using Fleming's left-hand rule for generators; the left hand is for motors (force on a current), while generators and induction use the idea that the induced current opposes the change (Lenz's law).</li>
<li>Saying a stationary magnet in a coil induces a current; only a changing field does.</li>
<li>Forgetting to square the current in the cable-loss equation, or using the transmission voltage instead of the current in I²R.</li>
<li>Drawing transformer field lines that do not link both coils; the coils share one core and one magnetic field.</li>
<li>Assuming transformers work on d.c.; a steady d.c. produces no changing field and no induced e.m.f. in the secondary.</li>
<li>Reversing the turns ratio: step-up means more turns on the secondary, so Vs is bigger than Vp.</li>
<li>Mixing up where the force points: current along the second finger, field along the first, motion along the thumb, and all three at right angles.</li>
<li>Forgetting that the commutator reverses the current every half turn; without it the coil would stop at the vertical.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> A transformer has 500 primary turns and 2000 secondary turns with a 230 V input. Calculate the output voltage and state the transformer type.</p>
<p>Answer: Vs = Vp × Ns/Np = 230 × 2000/500 = 920 V. It is a step-up transformer because the secondary has more turns.</p>
<p><strong>Question 2 (Paper 4, 3 marks).</strong> A straight wire carries 4.0 A perpendicular to a 0.25 T field. Find the force on 0.30 m of wire.</p>
<p>Answer: F = BIL = 0.25 × 4.0 × 0.30 = 0.30 N, in the direction given by Fleming's left-hand rule.</p>
<p><strong>Question 3 (Paper 2 style).</strong> Which change increases the e.m.f. induced in a coil? A holding the magnet still inside it; B moving the magnet faster; C using fewer turns; D using a weaker magnet. Answer: B. Faster motion means a faster change of field through the coil.</p>
<p><strong>Question 4 (Paper 4, 6 marks).</strong> Explain how a transformer works and why the grid transmits power at high voltage.</p>
<p>Answer: The a.c. in the primary coil produces an alternating magnetic field in the soft-iron core. That changing field passes through the secondary coil and induces an alternating e.m.f. in it by electromagnetic induction. The size of the output voltage depends on the turns ratio: Vs/Vp = Ns/Np. For transmission, P = IV, so the same power can be sent at high voltage and low current. The energy wasted heating the cables is I²R, so a smaller current greatly reduces the wasted energy; the voltage is then stepped down with transformers for safe domestic use.</p>
<p><strong>Question 5 (Paper 4, 3 marks).</strong> State two ways to increase the turning effect on the coil of a d.c. motor.</p>
<p>Answer: Increase the current, use a stronger magnetic field (or increase the flux density), or wind more turns on the coil. Any two, with the reasoning that the force on each side of the coil is F = BIL, so bigger B or I or L gives a bigger force.</p>
<p><strong>Question 6 (Paper 6 style).</strong> Describe an experiment to show the pattern of the magnetic field around a bar magnet.</p>
<p>Answer: Place the bar magnet on a sheet of paper and sprinkle iron filings (or use a small plotting compass). Tap the paper gently; the filings line up along the field. The compass needle is placed at several points and its direction marked with an arrow pointing away from the north pole; the marks are joined into smooth field lines from north to south, close together near the poles where the field is strongest.</p>
<p>Fields move charges and magnets; inside the atom, a different kind of energy is stored: Nuclear Physics next.</p>
`,

    "d7f2e9e8-ff4a-4fba-9960-48d8ca800dd6": `
<h2>IGCSE Physics: Nuclear Physics</h2>
<p>Cambridge IGCSE Physics 0625 (2026–2028), Topic 5 Nuclear physics: statements 5.1 The nuclear model of the atom and 5.2 Radioactivity. Everything in the physical world is built from about a hundred kinds of atom, and almost all the mass of an atom sits in a tiny, dense nucleus. This note builds the nuclear model, then radioactivity from first principles: what the three emissions are, how nuclei decay, how half-life quantifies it, and how radiation is used safely.</p>

<h3>The atom and the nuclear model</h3>
<p>An atom is mostly empty space: a tiny central nucleus surrounded by electrons that occupy shells around it. The nucleus is about 10 000 times smaller than the atom, yet holds more than 99.9 per cent of its mass. Atoms are neutral because the number of electrons equals the number of protons; if an atom loses or gains electrons it becomes a <strong>ion</strong>, charged positive or negative.</p>
<p><strong>Supplement: the evidence.</strong> In the alpha-particle scattering experiment, alpha particles were fired at an extremely thin gold foil. Most passed straight through, a few were deflected by small angles, and a very small number bounced back. Rutherford concluded that the atom has a small, dense, positively charged nucleus: most alphas met only empty space, those passing near the nucleus were deflected by the positive repulsion, and the rare head-on reversals required a tiny, massive target.</p>

<h3>The nucleus: protons, neutrons and isotopes</h3>
<p>The nucleus contains protons and neutrons, collectively <strong>nucleons</strong>. A proton carries one positive charge and one unit of mass; a neutron carries no charge and one unit of mass; an electron carries one negative charge and almost no mass.</p>
<table border="1" cellpadding="6">
<tr><th>Particle</th><th>Relative charge</th><th>Relative mass</th><th>Location</th></tr>
<tr><td>Proton</td><td>+1</td><td>1</td><td>Nucleus</td></tr>
<tr><td>Neutron</td><td>0</td><td>1</td><td>Nucleus</td></tr>
<tr><td>Electron</td><td>−1</td><td>1/1836 (negligible)</td><td>Shells around the nucleus</td></tr>
</table>
<p>Nuclide notation writes the symbol of the element with the <strong>proton number</strong> Z (the number of protons, which decides the element) and the <strong>nucleon number</strong> A (the total number of protons and neutrons) as a superscript and subscript on the left: A over Z beside the symbol. The number of neutrons is A − Z. <strong>Isotopes</strong> are atoms of the same element (same Z) with different numbers of neutrons (different A), so they have identical chemical properties but different nuclear behaviour.</p>
<p><strong>Supplement: fission and fusion.</strong> Nuclear <strong>fission</strong> splits a heavy nucleus (such as uranium-235) into two lighter nuclei plus neutrons and a large release of energy; a neutron triggers the split and the released neutrons sustain a chain reaction in a reactor. Nuclear <strong>fusion</strong> joins two light nuclei (such as hydrogen isotopes) into a heavier one, releasing far more energy per kilogram — this powers the Sun and every star. In both, a small loss of mass appears as a large release of energy, in line with mass–energy equivalence, and the sum of the nucleon numbers and of the proton numbers is conserved in any nuclear equation.</p>

<h3>Detection of radioactivity</h3>
<p>Radioactivity is the spontaneous emission of radiation from unstable nuclei. It cannot be seen, heard or felt, so it is detected by its effects: a <strong>Geiger–Müller tube</strong> produces an electrical pulse for each ionising particle entering it; photographic film darkens (which is why film badges measure radiation dose); and a cloud chamber shows the tracks of the emissions.</p>
<p><strong>Background radiation</strong> is present everywhere and must be subtracted from every measurement: it comes from natural sources (radon gas from rocks and soil, cosmic rays from space, radiation from food and building materials) and from human activity (medical X-rays, fallout from nuclear accidents and weapons tests). A count-rate measurement is corrected by taking the reading with no source present and subtracting it from the source reading (Supplement: count rates are quoted in counts per second or counts per minute, and repeated background readings are averaged before use).</p>

<h3>The three types of nuclear emission</h3>
<p>Emission from an unstable nucleus is <strong>spontaneous</strong> and <strong>random</strong>: nothing external causes a particular nucleus to decay at a particular moment, and no prediction is possible for any single nucleus.</p>
<table border="1" cellpadding="6">
<tr><th>Property</th><th>Alpha (α)</th><th>Beta (β)</th><th>Gamma (γ)</th></tr>
<tr><td>Nature</td><td>Helium nucleus: 2 protons + 2 neutrons</td><td>Fast electron from the nucleus</td><td>Electromagnetic wave of high frequency</td></tr>
<tr><td>Charge</td><td>+2</td><td>−1</td><td>0</td></tr>
<tr><td>Relative mass</td><td>4</td><td>1/1836 (negligible)</td><td>0</td></tr>
<tr><td>Ionising power</td><td>Very strong</td><td>Moderate</td><td>Weak</td></tr>
<tr><td>Penetrating power</td><td>Stopped by paper or a few cm of air</td><td>Stopped by a few mm of aluminium</td><td>Reduced only by thick lead or many metres of concrete</td></tr>
<tr><td>Effect of a magnetic field</td><td>Deflected slightly (opposite way to beta)</td><td>Deflected more (opposite way to alpha)</td><td>Not deflected</td></tr>
</table>
<p>Supplement deepens the ionisation ranking: alpha particles are large and doubly charged, so they tear electrons from atoms at every collision and stop quickly; beta particles are small and singly charged and ionise less; gamma rays carry no charge and ionise least, so they travel furthest. The same ranking explains the danger profiles: alpha sources are the least dangerous outside the body (stopped by skin) but the most dangerous if ingested, because their intense ionisation wrecks nearby cells.</p>

<h3>Radioactive decay</h3>
<p>Decay is the change of an unstable nucleus into a different, more stable nucleus, with the emission of radiation. The nucleus changes identity: emitting alpha reduces the nucleon number by 4 and the proton number by 2; emitting beta converts a neutron into a proton, so the proton number rises by 1 while the nucleon number is unchanged; gamma emission changes the energy of the nucleus but not its identity.</p>
<pre><code>alpha decay:        (A over Z) X  ->  (A-4 over Z-2) Y  +  helium nucleus
beta decay:         (A over Z) X  ->  (A over Z+1) Y  +  electron</code></pre>
<p>In every nuclear equation the total nucleon number and the total charge are the same on both sides — the standard balancing question on Paper 2 and Paper 4. Decay is unaffected by temperature, pressure or chemical state: the nucleus is shielded from ordinary conditions by its electrons.</p>

<h3>Half-life</h3>
<p>Half-life is the time taken for half the undecayed nuclei of a sample to decay — equivalently, for the count rate to fall to half its original value. It is a fixed property of each isotope, ranging from fractions of a second to billions of years.</p>
<pre><code>after n half-lives:        count rate = starting count rate x (1/2)^(number of half-lives)</code></pre>
<p>From a decay curve, read the time for the rate to halve from any starting point; the half-life is the same at every stage. Radioactive dating uses the ratio of a long-lived isotope to its decay product in rocks (uranium to lead) or in once-living things (carbon-14, half-life 5730 years, absorbed during life and decaying after death). Short-lived isotopes are used as medical tracers, since they deliver a dose that soon disappears.</p>

<h3>Safety precautions</h3>
<p>Radiation damages living tissue by ionising atoms in cells, which can kill cells or damage DNA and cause cancer. Three simple controls govern all handling:</p>
<ul>
<li><strong>Time</strong>: keep exposures short and work quickly with sources.</li>
<li><strong>Distance</strong>: use tongs and remote handling; the intensity falls sharply with distance from the source.</li>
<li><strong>Shielding</strong>: store sources in lead-lined boxes; use paper for alpha, aluminium for beta, lead or concrete for gamma.</li>
</ul>
<p>Sealed sources are never touched or pointed at people; contamination (spreading open sources) is prevented with gloves, trays and careful disposal; workers wear film badges and dose records are kept. Doctors and patients accept a medical dose only when the benefit outweighs the risk — the principle of every risk–benefit question in the paper.</p>

<h3>Worked example: half-life calculation</h3>
<p>A source has a corrected count rate of 640 counts per minute and a half-life of 8.0 days. What is the rate after 24 days, and how long until it falls below 40 counts per minute?</p>
<pre><code>24 days = 3 half-lives:        640 -> 320 -> 160 -> 80 counts per minute
80 -> 40 needs one more half-life, so 24 + 8 = 32 days total</code></pre>
<p>The physical reasoning: half-living is exponential, never linear. After three half-lives an eighth of the original activity remains, not one third.</p>

<h3>Common mistakes</h3>
<ul>
<li>Confusing the three emissions: alpha is a helium nucleus (2 protons, 2 neutrons), beta is an electron created in the nucleus, gamma is a wave.</li>
<li>Saying radiation becomes safe after a fixed number of days; only the activity falls with half-life, and each isotope has its own.</li>
<li>Halving the count rate every half-life from the original instead of from the current value (linear thinking): 100 goes 50, 25, 12.5, not 50, 0, 0.</li>
<li>Forgetting to subtract background radiation from raw counts before plotting a decay curve.</li>
<li>Balancing a nuclear equation without conserving both the nucleon number and the proton number.</li>
<li>Claiming alpha is the most dangerous radiation in every case: it is the most ionising, but the least penetrating — the hazard depends on whether the source is outside or inside the body.</li>
<li>Saying isotopes have different chemical properties; the electron arrangement is identical, so the chemistry is identical.</li>
<li>Linking decay to temperature or pressure; nuclear decay is unaffected by ordinary physical conditions.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> A nucleus of uranium-238 emits an alpha particle. Write the nuclear equation if the product is thorium-234.</p>
<p>Answer: uranium-238 (92 protons) becomes thorium-234 (90 protons) plus a helium nucleus: 238 = 234 + 4 and 92 = 90 + 2, so both totals balance.</p>
<p><strong>Question 2 (Paper 4, 3 marks).</strong> A sample's count rate falls from 400 to 50 counts per second in 12 minutes. Calculate the half-life.</p>
<p>Answer: 400 → 200 → 100 → 50 is three half-lives in 12 minutes, so the half-life is 4.0 minutes.</p>
<p><strong>Question 3 (Paper 2 style).</strong> Which emission is stopped by a sheet of paper? A alpha; B beta; C gamma; D X-rays. Answer: A. Alpha is stopped by paper, beta by a few millimetres of aluminium, gamma only by thick lead.</p>
<p><strong>Question 4 (Paper 4, 6 marks).</strong> Explain why alpha emitters are safe outside the body but extremely dangerous if inhaled.</p>
<p>Answer: Alpha particles are large and doubly charged, so they ionise atoms strongly and are stopped by the dead outer layer of skin or by a sheet of paper, meaning they cannot reach living tissue from outside. If an alpha emitter is inhaled, it lodges in lung tissue and the particles then strike living cells at point-blank range. Their intense ionisation breaks chemical bonds and damages DNA in those cells, which can kill them or cause mutations and cancer. Distance and shielding matter: inside the body there is neither.</p>
<p><strong>Question 5 (Paper 4, 3 marks).</strong> State the three standard precautions when handling a radioactive source.</p>
<p>Answer: Keep the time of exposure short; keep well away and handle with long tongs to reduce intensity; store in a lead-lined box with suitable shielding for the emission type (paper for alpha, aluminium for beta, lead for gamma).</p>
<p><strong>Question 6 (Paper 6 style).</strong> Describe how you would measure the half-life of a short-lived isotope safely.</p>
<p>Answer: Place the source in a holder a fixed distance from a Geiger–Müller tube connected to a scaler or data logger. Measure the background count rate with no source present and average several readings. Record the source's count rate at regular time intervals until it approaches background, keeping geometry constant. Subtract the background from each reading, plot count rate against time, and read the time for the activity to halve between any two points on the curve. Keep exposure brief, handle the source with tongs, and store it in its shielded box.</p>
<p>The nucleus holds the energy of stars; the last topic of the IGCSE course is where those stars live — Earth and Space.</p>
`,

    "798f9e7d-33c5-456e-9070-c32874b67978": `
<h2>IGCSE Physics: Earth and Space</h2>
<p>Cambridge IGCSE Physics 0625 (2026–2028), Topic 6 Space physics: statements 6.1 The Earth and the Solar System and 6.2 Stars and the Universe. This final topic scales the mechanics and nuclear physics of the rest of the course up to the largest objects there are. Gravity holds planets in orbit and holds stars together; fusion powers stars; the light from distant galaxies tells us the Universe is expanding. Paper 4 usually has one structured question here, and the calculations are orbital mechanics and redshift.</p>

<h3>The Earth: rotation, orbit and seasons</h3>
<p>The Earth spins on its axis once every 24 hours, which gives day and night, and it orbits the Sun once every 365.25 days, which gives the year. The Earth's axis is tilted at about 23.5° to the plane of its orbit, and that tilt — not the changing distance from the Sun — causes the seasons: when a hemisphere is tilted towards the Sun its rays strike more directly and the days are longer, so it is summer.</p>
<p>The Moon orbits the Earth in about 27 days. It shines by reflected sunlight, and because we see different fractions of its lit half as it orbits, it shows phases: new moon, crescent, half, gibbous, full. A lunar eclipse occurs when the Earth's shadow falls on the Moon; a solar eclipse when the Moon's shadow falls on the Earth.</p>
<p><strong>Supplement: orbital speed.</strong> For a circular orbit of radius r completed in period T:</p>
<pre><code>orbital speed = (2 pi r) / T        v = 2 pi r / T</code></pre>
<ul>
<li>v: orbital speed in metres per second (m s⁻¹); r: orbital radius in metres (m); T: orbital period in seconds (s). Convert days and years to seconds first.</li>
</ul>

<h3>The Solar System</h3>
<p>The Solar System is the Sun and the bodies bound to it by gravity: eight planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune), their moons, dwarf planets, asteroids and comets. The four inner planets are small and rocky with few or no moons; the four outer planets are gas giants — large, low density, with many moons and ring systems. Asteroids orbit mainly between Mars and Jupiter; comets have highly elliptical orbits and grow bright tails of gas and dust when near the Sun.</p>
<p>Gravity provides the centripetal force that keeps every planet, moon and satellite in orbit. A planet's orbital speed falls with distance from the Sun (Kepler's laws), and the planets' orbits are ellipses with the Sun at one focus (Supplement: conservation of energy means a planet speeds up at perihelion and slows at aphelion, trading kinetic for gravitational potential energy).</p>
<p><strong>Supplement: light-travel time.</strong> Light from the Sun takes about 8 minutes to reach Earth; from the nearest star, about 4.2 years. The light-year is the distance light travels in one year, about 9.5 × 10¹⁵ m, so looking at distant objects is literally looking into the past.</p>

<h3>The Sun as a star</h3>
<p>The Sun is an ordinary main-sequence star: a sphere of hot gas, about three-quarters hydrogen and one-quarter helium by mass, with a core at roughly 15 million degrees Celsius. Its energy comes from <strong>nuclear fusion</strong> in the core, where hydrogen nuclei fuse into helium nuclei, and a small loss of mass becomes the radiated energy. That radiation powers the whole Solar System: it drives the water cycle behind hydroelectric power and biofuels, heats the Earth's surface, and — over geological time — built the fossil fuels (Supplement: solar energy is the principal source behind almost every renewable resource on Earth).</p>
<p>The Sun is a medium-sized star about 4.6 billion years old, with enough hydrogen for roughly another 5 billion years of fusion before it swells into a red giant.</p>

<h3>Stars and galaxies</h3>
<p>A galaxy is a vast collection of stars, gas and dust held together by gravity. The Sun is one of roughly 200 billion stars in the Milky Way, a spiral galaxy, and galaxies themselves are grouped into clusters. The nearest large galaxy to us is Andromeda, about 2.5 million light-years away.</p>
<p>Stars have life cycles set by their mass:</p>
<ul>
<li><strong>Nebula</strong>: a huge cloud of gas and dust, pulled inward by gravity.</li>
<li><strong>Protostar</strong>: the contracting, heating core of the cloud.</li>
<li><strong>Main sequence star</strong>: when the core is hot enough for hydrogen fusion to start, the outward radiation pressure balances gravity and the star is stable — the Sun's current stage.</li>
<li><strong>Red giant or supergiant</strong>: when core hydrogen runs low, fusion moves outwards and the star swells and cools at the surface.</li>
<li><strong>End state</strong>: a star like the Sun sheds its outer layers as a planetary nebula and leaves a white dwarf. A massive star explodes as a supernova and leaves a neutron star, or, for the most massive, a black hole — an object whose gravity is so strong that not even light escapes.</li>
</ul>
<p>Supernovae matter beyond astrophysics: they create and scatter the elements heavier than helium, so the carbon, oxygen and iron in your body were forged inside stars.</p>

<h3>The Universe: redshift, expansion and the Big Bang</h3>
<p>Light from distant galaxies is shifted towards the red end of the spectrum: the spectral lines appear at longer wavelengths than the same lines produced in a laboratory. This <strong>redshift</strong> is a Doppler effect — the galaxies are moving away from us. Crucially, almost every galaxy shows redshift, and the more distant the galaxy, the greater the redshift and the faster it is receding. The conclusion is that the Universe is expanding.</p>
<p>Running the expansion backwards implies that everything was once at one place — the <strong>Big Bang</strong>, roughly 13.8 billion years ago. Two further pieces of evidence support it: the <strong>cosmic microwave background</strong> (CMB), faint microwave radiation coming from every direction, which is the cooled remnant of the hot early Universe, and the abundance of light elements (hydrogen and helium) matching the predictions of Big Bang nucleosynthesis.</p>
<p><strong>Supplement: Hubble's law and the age of the Universe.</strong> The recession speed of a galaxy is proportional to its distance:</p>
<pre><code>recession speed = Hubble constant x distance        v = H d</code></pre>
<ul>
<li>v: recession speed in metres per second (m s⁻¹); d: distance in metres (m) (often megaparsecs, but convert); H: the Hubble constant in s⁻¹ (quoted as km s⁻¹ per megaparsec).</li>
<li>The age of the Universe follows as roughly 1/H: run the expansion back at the present rate.</li>
</ul>

<h3>Worked example: orbital speed and Hubble's law</h3>
<p>The Earth orbits the Sun at a radius of 1.5 × 10¹¹ m with a period of 365 days.</p>
<pre><code>T = 365 x 24 x 3600 = 3.15 × 10⁷ s
v = 2 pi r / T = 2 × 3.14 × 1.5 × 10¹¹ / 3.15 × 10⁷ = 3.0 × 10⁴ m s⁻¹ (about 30 km s⁻¹)</code></pre>
<p>Second calculation: a galaxy is 200 megaparsecs away and Hubble's constant is 70 km s⁻¹ per megaparsec. Its recession speed is v = Hd = 70 × 200 = 14 000 km s⁻¹. The age estimate is 1/H: one megaparsec is 3.1 × 10¹⁹ km, so 1/H = 3.1 × 10¹⁹/70 = 4.4 × 10¹⁷ s ≈ 14 billion years — consistent with the accepted value.</p>

<h3>Common mistakes</h3>
<ul>
<li>Blaming the seasons on the Earth–Sun distance; it is the axial tilt. The Earth is actually closest to the Sun in January.</li>
<li>Confusing the Moon's phases with eclipses: phases are the normal monthly cycle of the lit fraction; eclipses are shadows, and are rare because the Moon's orbit is tilted.</li>
<li>Using kilometres and seconds in v = 2πr/T without one consistent unit system; convert the period to seconds and the radius to metres.</li>
<li>Calling a light-year a unit of time; it is a distance — the distance light travels in one year.</li>
<li>Saying redshift means the galaxies are moving through space away from us; the accepted interpretation is that space itself is expanding, stretching the light.</li>
<li>Mixing up redshift and blueshift: receding sources shift to longer (redder) wavelengths; approaching sources shift shorter (bluer) — nearby Andromeda is blueshifted.</li>
<li>Placing the Sun at the centre of the Solar System as an absolute; the Sun is the centre of the Solar System, but the Solar System is an ordinary part of the Milky Way.</li>
<li>Forgetting that the fusion in stars is hydrogen to helium, which is not the same as the fission of uranium in power stations.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> Calculate the orbital speed of a satellite orbiting 7.0 × 10⁶ m from the Earth's centre every 5900 s.</p>
<p>Answer: v = 2πr/T = 2 × 3.14 × 7.0 × 10⁶ / 5900 = 7.5 × 10³ m s⁻¹ (7.5 km s⁻¹).</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> Explain the evidence from redshift that the Universe is expanding.</p>
<p>Answer: The spectral lines from distant galaxies are shifted towards longer wavelengths than laboratory lines, which by the Doppler effect means the sources are receding. The more distant the galaxy, the greater the redshift and the faster it recedes, so the whole Universe is expanding with every distance growing over time. Reversing that expansion implies all matter was once concentrated at one point — the Big Bang.</p>
<p><strong>Question 3 (Paper 2 style).</strong> The seasons on Earth are caused by: A the changing Earth–Sun distance; B the tilt of the Earth's axis; C the Moon's gravity; D the Sun's rotation. Answer: B. The tilt changes the angle of the sunlight and the length of day through the year.</p>
<p><strong>Question 4 (Paper 4, 6 marks).</strong> Describe the life cycle of a star like the Sun.</p>
<p>Answer: It begins as a nebula, a cloud of gas and dust. Gravity contracts the cloud and the core heats into a protostar. When the core temperature reaches about 15 million degrees, hydrogen fusion begins and the star joins the main sequence, where radiation pressure from fusion balances gravity and it is stable for billions of years. As core hydrogen depletes, fusion moves outwards, the outer layers expand and cool and the star becomes a red giant. Finally the outer layers are expelled as a planetary nebula, leaving a white dwarf that slowly cools — no fusion, supported by electron degeneracy pressure.</p>
<p><strong>Question 5 (Paper 4, 3 marks).</strong> State two pieces of evidence for the Big Bang theory besides the redshift of galaxies.</p>
<p>Answer: The cosmic microwave background radiation — faint microwave radiation arriving from every direction, the cooled afterglow of the hot early Universe. The observed abundances of the light elements, especially hydrogen and helium, match the amounts predicted to have formed in the first minutes after the Big Bang.</p>
<p><strong>Question 6 (Paper 4, 3 marks).</strong> Explain why nuclear fusion in the Sun releases energy.</p>
<p>Answer: In fusion, light hydrogen nuclei combine to form a heavier helium nucleus. The product nucleus has slightly less mass than the four protons that formed it; that lost mass is converted into energy in accordance with mass–energy equivalence, and the energy is radiated from the Sun's core. Fusion releases energy for light elements up to iron, which is why it powers stars.</p>
<p>That completes the Cambridge IGCSE 0625 course: the AS notes begin with Edexcel IAL Unit 1 and Kinematics.</p>
`,
  },
};
