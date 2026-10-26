// Chemistry OL batch 2: official Cambridge IGCSE Chemistry 0620 (2026-2028)
// Topic 1 States of matter (1.1 Solids liquids and gases, 1.2 Diffusion),
// Topic 5 Chemical energetics (5.1), and Topic 6 Chemical reactions
// (6.1 Physical and chemical changes, 6.2 Rate of reaction, 6.3 Reversible
// reactions and equilibrium, 6.4 Redox). Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-chem-ol-depth-2.cjs > .freebuff-tmp/chem-ol-depth-2.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/chem-ol-depth-2.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/chem-ol-depth-2.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs chemistry OL
module.exports = {
  expectType: "notes",
  titles: {
    "258a3ebd-d71c-4442-b520-667ad751bc89": "IGCSE Chemistry: States of Matter and Diffusion",
    "898a04b7-907b-40f2-b919-a7beca60be7d": "IGCSE Chemistry: Chemical Energetics",
    "2fea980f-6881-452a-923b-8b3bb9f698fa": "IGCSE Chemistry: Rates, Equilibrium and Redox",
  },
  rows: {
    "258a3ebd-d71c-4442-b520-667ad751bc89": `
<h2>IGCSE Chemistry: States of Matter and Diffusion</h2>
<p>Cambridge IGCSE Chemistry 0620 (2026–2028), Extended route, Topic 1 States of matter: statement 1.1 Solids, liquids and gases and 1.2 Diffusion. Everything in this note follows from one picture — matter made of tiny particles in constant motion — applied systematically to the three states, their changes, and the way particles spread. The kinetic particle theory is the single most-used explanatory model in the whole syllabus: Paper 4 rewards answers that describe particle arrangement, separation and motion explicitly, and this note does exactly that, with heating and cooling curves traced step by step.</p>

<h3>The kinetic particle theory</h3>
<p>All matter is made of tiny particles (atoms, molecules or ions) that are always moving and always attracting each other. The balance between that motion and that attraction decides the state — like people held together by magnets while running around a room: slow enough and they clump (solid), faster and they jostle past each other (liquid), fast enough and they fly apart (gas).</p>
<table border="1" cellpadding="6">
<tr><th>State</th><th>Arrangement</th><th>Separation</th><th>Motion</th><th>Energy</th></tr>
<tr><td>Solid</td><td>Regular, packed lattice</td><td>Very close, touching</td><td>Vibrate about fixed positions</td><td>Lowest kinetic energy</td></tr>
<tr><td>Liquid</td><td>Irregular, close-packed</td><td>Close, touching</td><td>Slide over each other randomly</td><td>Intermediate</td></tr>
<tr><td>Gas</td><td>Random, far apart</td><td>Far apart (≈10× diameter apart)</td><td>Fast, random, straight lines</td><td>Highest kinetic energy</td></tr>
</table>
<p>Each state answers the same three exam questions: how are the particles arranged? how far apart? how do they move? Learn the table as three triads and any states question is answerable.</p>

<h3>Changes of state</h3>
<p>Melting, boiling, freezing and condensation are physical changes — the substance keeps its identity; only the arrangement and energy of the particles change. Evaporation happens at the surface at any temperature (the fastest particles escape); boiling happens throughout the liquid at the boiling point (vapour pressure equals external pressure).</p>
<pre><code>Heating curve for ice at -20 °C, traced plateau by plateau:

  Start: ice at -20 °C - particles vibrating slowly in a lattice.

  1. ICE WARMING: heating curve rises steadily. Energy increases the
     particles' vibration (kinetic energy up, temperature up).
  2. MELTING PLATEAU at 0 °C: the line goes FLAT although heating continues.
     Energy is used to break the lattice forces (potential energy up),
     not to speed particles up - temperature is constant while solid and
     liquid coexist.
  3. WATER WARMING: rise resumes; liquid particles move faster.
  4. BOILING PLATEAU at 100 °C: flat again - energy overcomes the remaining
     intermolecular attractions entirely (steam forms).
  5. STEAM WARMING: rise resumes; gas particles move fastest of all.

Cooling curve is the exact mirror image, with FUSING at 0 °C and CONDENSING
at 100 °C as its plateaus - same physics, energy leaving.

The exam sentence that earns the plateau mark: "temperature stays constant
because the energy is being used to overcome forces between particles, not to
increase their speed."</code></pre>
<p>Boiling point as a diagnostic: a pure substance has a sharp melting/boiling point; an impure sample melts over a range and below the pure value — the basis of purity testing in Paper 6.</p>

<h3>Gas volume, temperature and pressure</h3>
<ul>
<li><strong>Temperature:</strong> heating a gas gives particles more kinetic energy → they collide with the walls harder and more often → pressure rises (or volume rises if the container can expand).</li>
<li><strong>Pressure:</strong> at constant temperature, compressing a gas (smaller volume) increases collisions per second with the walls → pressure rises.</li>
</ul>
<pre><code>The particle-level explanation, in exam wording:

  "When the gas is heated, the particles gain kinetic energy, move faster,
   and collide with the container walls more frequently and with greater
   force, so the pressure increases."

  Charles's law (fixed amount of gas, constant pressure):
   V1 / T1 = V2 / T2    (T in kelvin: K = °C + 273)

  Worked: 500 cm³ of gas at 27 °C is heated to 127 °C at constant pressure.
    T1 = 27 + 273 = 300 K
    T2 = 127 + 273 = 400 K
    V2 = V1 x T2 / T1 = 500 x 400 / 300 = 667 cm³</code></pre>

<h3>Heating and cooling curves: reading them under exam conditions</h3>
<p>Questions hand you a plotted curve and ask for interpretations. The method: identify the flat sections (change of state at a fixed temperature), read the plateau temperatures off the axis (melting point and boiling point), and use their sharpness as a purity check. A pure substance melts and boils at sharp, well-defined temperatures; an impure one melts over a range and below the pure value — which is why melting-point determination is a standard purity test in Paper 6. On a cooling curve read the same features backwards: the first plateau is condensing at the boiling point, the second freezing at the melting point, and each flat section is where potential energy changes as particles rearrange while their speed stays constant.</p>

<h3>Diffusion</h3>
<p><strong>Diffusion</strong> is the net movement of particles from a region of higher concentration to a region of lower concentration, down a concentration gradient, due to their random motion. No energy input is needed — the particles' own movement does the work. Everyday examples: a smell spreading across a room, a crystal of potassium manganate(VII) colouring still water.</p>
<pre><code>Diffusion rates and relative molecular mass - worked:

  The lighter the gas, the faster it spreads (same temperature = same
  average kinetic energy; lighter particles move faster:
  KE = 1/2 mv² is the same, so smaller m means larger v).

  Ammonia (NH₃, Mᵣ = 17) vs hydrogen chloride (HCl, Mᵣ = 36.5):
  rate ratio = √(36.5 / 17) = √2.147 = 1.47
  -> ammonia diffuses about 1.5 times faster.

  Classic experiment: cotton wool soaked in each at opposite ends of a tube;
  NH₃ meets HCl first, nearer the HCl end; they form a white ring of NH₄Cl
  where the clouds meet:
    NH₃(g) + HCl(g) -> NH₄Cl(s)
  The ring position shows which travelled further - the lighter gas.</code></pre>
<p>Temperature also matters: hotter particles move faster, so diffusion speeds up with temperature. Diffusion is a <em>physical</em> process — the gases do not react until they meet.</p>

<h3>Worked example: one concept set, three questions</h3>
<pre><code>Explain each observation using the kinetic particle theory:

(a) A drop of ink spreads through still water.
    Ink particles move randomly; their collisions carry them down the
    concentration gradient until evenly distributed - diffusion.

(b) A syringe of gas is hard to push in when sealed.
    Compressing the gas reduces volume, so particles hit the walls more
    often per second - pressure rises and resists the push.

(c) Ice at 0 °C cools a drink but does not raise its temperature until
    it has all melted.
    Melting absorbs energy to break lattice forces (latent heat) while the
    ice-water mixture stays at 0 °C - the plateau effect.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Saying particles "move faster" during melting — melting energy breaks forces; average speed (temperature) is constant on the plateau.</li>
<li>Confusing evaporation (surface, any temperature) with boiling (throughout, at boiling point).</li>
<li>Describing gas particles as "not touching because they repel" — separation comes from energetic motion, not repulsion.</li>
<li>Forgetting kelvin in gas-law calculations (add 273 before dividing).</li>
<li>Attributing diffusion to gravity or convection; it is random particle motion down a concentration gradient.</li>
<li>Claiming heavier gases diffuse faster; at equal temperature, lighter particles have higher speeds.</li>
<li>Saying "the smell travelled" without particle motion — the answer must invoke moving particles colliding and spreading.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> Describe the arrangement and motion of particles in a solid and in a gas.</p>
<p>Answer: In a solid, particles are closely packed in a regular lattice, touching, and vibrate about fixed positions. In a gas, particles are far apart in random arrangement, moving rapidly in straight lines with collisions.</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> Explain, using the kinetic particle theory, why the temperature of melting ice stays constant.</p>
<p>Answer: Although heat is being supplied, the energy is used to overcome the attractive forces holding the ice lattice together rather than increase particles' kinetic energy. The particles change from fixed vibrating positions to sliding past each other while their average speed — and hence the temperature — remains constant until all the solid has melted.</p>
<p><strong>Question 3 (Paper 4, 3 marks).</strong> Explain why a gas increases in pressure when heated at constant volume.</p>
<p>Answer: Heating increases the particles' kinetic energy, so they move faster and collide with the container walls more frequently and with greater force. More forceful collisions per unit area per second means a higher pressure.</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> A gas jar of bromine vapour and one of air are connected; the brown colour spreads evenly after minutes. Explain this and predict what happens at higher temperature.</p>
<p>Answer: Bromine particles diffuse — their random motion carries them down the concentration gradient into the air jar while air particles move the other way, until the mixture is uniform. At higher temperature particles have greater kinetic energy and move faster, so the brown colour spreads more quickly.</p>
<p><strong>Question 5 (Paper 4, 3 marks).</strong> Hydrogen chloride (Mᵣ = 36.5) and ammonia (Mᵣ = 17) are released at opposite ends of a tube. State which travels further and calculate the ratio of their rates.</p>
<p>Answer: Ammonia travels further (lighter molecules move faster). Rate ratio = √(36.5 ÷ 17) = √2.147 ≈ 1.47, so ammonia diffuses about 1.5 times as fast.</p>
<p><strong>Question 6 (Paper 2, 2 marks).</strong> State two differences between evaporation and boiling.</p>
<p>Answer: Evaporation occurs only at the surface of a liquid at any temperature, whereas boiling occurs throughout the liquid at the boiling point. Evaporation causes gradual cooling as the fastest particles escape, whereas boiling maintains a constant temperature while the liquid turns to gas.</p>
<p>The particles and their motions are the machinery; when they rearrange in reactions, energy flows — the next topic.</p>
`,

    "898a04b7-907b-40f2-b919-a7beca60be7d": `
<h2>IGCSE Chemistry: Chemical Energetics</h2>
<p>Cambridge IGCSE Chemistry 0620 (2026–2028), Extended route, Topic 5 Chemical energetics, statement 5.1 Exothermic and endothermic reactions. This note covers the energy accounting of reactions: where the energy goes when bonds break and form, how to read and draw reaction pathway diagrams, and how to calculate enthalpy changes from bond energies. Every calculation is worked line by line, and the sign convention — where most marks are lost — is derived from the physics rather than memorised.</p>

<h3>Exothermic and endothermic: the physical picture</h3>
<p>Every chemical reaction involves breaking bonds in the reactants and making new bonds in the products. <strong>Breaking bonds takes energy in</strong> (you must pull atoms apart against their attraction); <strong>making bonds releases energy out</strong> (atoms fall into each other's attraction). The overall energy change is the balance between the two — like a bank account with deposits and withdrawals.</p>
<ul>
<li><strong>Exothermic</strong> reactions release more energy than they absorb — the products have lower energy than the reactants, the temperature of the surroundings rises. Examples: combustion, neutralisation, respiration.</li>
<li><strong>Endothermic</strong> reactions absorb more than they release — products have higher energy, surroundings cool. Examples: thermal decomposition, photosynthesis, dissolving ammonium nitrate.</li>
</ul>
<p>Definitions to write exactly: an <strong>enthalpy change (ΔH)</strong> is the heat energy change at constant pressure; <strong>ΔH is negative for exothermic</strong> reactions (the system loses energy to the surroundings) and <strong>positive for endothermic</strong> reactions (the system gains). The <strong>activation energy (Eₐ)</strong> is the minimum energy colliding particles need to react — the hill every reaction must climb first, even exothermic ones.</p>

<h3>Reaction pathway diagrams</h3>
<pre><code>Exothermic profile (combustion of methane):

  energy
    |  *  <- reactants (CH₄ + 2O₂) at higher energy
    |   \\
    |    \\  Eₐ (activation energy: reactants to the peak)
    |     \\_
    |       * <- transition state (the hill's peak)
    |        \\
    |         \\  ΔH negative (downhill overall)
    |          \\
    |           *  <- products (CO₂ + 2H₂O) at lower energy
    +---------------- reaction path

Endothermic profile (thermal decomposition):

  energy
    |             *  <- products at HIGHER energy
    |            /   ΔH positive (uphill overall)
    |           /
    |       * <- transition state
    |      /
    |  *  <- reactants
    +---------------- reaction path

Drawing rules that earn marks:
  - label BOTH energy levels (reactants and products),
  - draw Eₐ from reactants up to the peak,
  - draw ΔH as the DIFFERENCE between reactant and product levels
    (arrow down for exothermic, up for endothermic),
  - label the axes (energy against reaction path).</code></pre>

<table border="1" cellpadding="6">
<tr><th>Bond</th><th>Bond energy (kJ/mol)</th><th>Bond</th><th>Bond energy (kJ/mol)</th></tr>
<tr><td>H-H</td><td>436</td><td>O-H</td><td>464</td></tr>
<tr><td>Cl-Cl</td><td>242</td><td>C-H</td><td>413</td></tr>
<tr><td>O=O</td><td>498</td><td>C=O (in CO₂)</td><td>805</td></tr>
<tr><td>C-C</td><td>348</td><td>H-Cl</td><td>431</td></tr>
</table>
<p>These are average values for the bonds in many environments; an exam supplies the table it expects you to use, so always take numbers from the question. The arithmetic above stays identical whichever numbers arrive.</p>

<h3>Calculating enthalpy changes from bond energies</h3>
<p>Master method: ΔH = (energy needed to break all reactant bonds) − (energy released making all product bonds). Bond energies are always positive quantities; the sign of ΔH comes out of the subtraction.</p>
<pre><code>Worked: calculate ΔH for the combustion of methane using bond energies.
  CH₄ + 2O₂ -> CO₂ + 2H₂O

  Bond energies (kJ/mol): C-H 413, O=O 498, C=O 805, O-H 464

Step 1 - count and list bonds BROKEN (reactants):
  4 x C-H  = 4 x 413 = 1652 kJ
  2 x O=O  = 2 x 498 =  996 kJ
  total in = 2648 kJ

Step 2 - count and list bonds MADE (products):
  2 x C=O  = 2 x 805 = 1610 kJ   (CO₂ has two C=O double bonds)
  4 x O-H  = 4 x 464 = 1856 kJ   (2 H₂O x two O-H each)
  total out = 3466 kJ

Step 3 - subtract:
  ΔH = 2648 - 3466 = -818 kJ per mole of CH₄

Step 4 - sign check: negative = energy released = exothermic ✓
  (combustion must be exothermic - a positive answer means a counting error)

Common counting errors flagged: CO₂ contains TWO C=O bonds (not one); each
water has TWO O-H bonds, and there are TWO waters (four O-H in total).</code></pre>

<h3>The master method for any energetics question</h3>
<pre><code>1. Write the BALANCED equation first (unbalanced = wrong bond counts).
2. Draw out or list every bond in reactants and products.
3. Multiply each bond energy by the number of those bonds.
4. ΔH = bonds broken − bonds made.
5. Check the sign matches the reaction type (combustion: negative).

Worked mini-example: H₂ + Cl₂ -> 2HCl
  broken: H-H 436 + Cl-Cl 242 = 678
  made:   2 x H-Cl 2 x 431 = 862
  ΔH = 678 - 862 = -184 kJ/mol  (exothermic ✓)</code></pre>

<h3>Worked example: an enthalpy cycle question from scratch</h3>
<pre><code>Enthalpy of combustion is measured in a calorimeter; the same data can be
reached through a cycle. Example: given
  (1) C(s) + O₂(g) -> CO₂(g)                ΔH = -394 kJ/mol
  (2) H₂(g) + 1/2 O₂(g) -> H₂O(l)           ΔH = -286 kJ/mol
  (3) C(s) + 2H₂(g) -> CH₄(g)               ΔH = -75 kJ/mol
find the enthalpy of combustion of methane.

Target: CH₄ + 2O₂ -> CO₂ + 2H₂O

Method: combine the given equations so they add to the target.
  Reverse (3): CH₄ -> C + 2H₂       ΔH = +75      (sign flips on reversal)
  Keep (1):    C + O₂ -> CO₂        ΔH = -394
  2 x (2):     2H₂ + O₂ -> 2H₂O    ΔH = 2 x -286 = -572
  ------------------------------------------------------------
  Add: CH₄ + 2O₂ -> CO₂ + 2H₂O
  ΔH = +75 - 394 - 572 = -891 kJ/mol

Sanity check: combustion must be exothermic - a negative answer is the
signature. The sign-flip-on-reversal rule and the multiply-everything rule
are where the marks live.</code></pre>

<h3>Everyday energy changes</h3>
<p>Instant cold packs (ammonium nitrate dissolving in water — endothermic, the pack cools); self-heating cans (calcium oxide + water — exothermic); hand warmers (iron oxidation — exothermic); the energy value of fuels (calorimetry: energy = mass of water × 4.2 J/g°C × temperature rise). These applied questions always ask for the particle-level reason as well as the sign.</p>
<pre><code>Calorimetry worked: burning 0.5 g of a fuel heats 100 g of water from
22.0 °C to 32.0 °C. Calculate the energy released per gram.

  energy = mass x specific heat x ΔT
         = 100 x 4.2 x (32.0 - 22.0)
         = 100 x 4.2 x 10
         = 4200 J = 4.2 kJ
  per gram: 4.2 kJ / 0.5 g = 8.4 kJ/g

Watch the units: 4.2 is J/g°C (so the answer starts in joules); the question
may want kJ - divide by 1000 and say so.</code></pre>

<p>Calorimetry questions also probe assumptions: heat is lost to the surroundings and to the calorimeter itself, so measured temperature rises underestimate the true enthalpy change; insulation and a lid reduce that loss. Incomplete combustion (carbon monoxide or soot forming instead of carbon dioxide) releases less energy than the complete-combustion value, which is why experimental answers fall below data-book figures. Stating these two effects is often the last mark on a fuel-comparison question.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Getting ΔH's sign backwards: exothermic = negative (energy leaves the system); endothermic = positive. Bond energy method: broken − made, not the reverse.</li>
<li>Subtracting bond energies the wrong way round — the formula is energy in (broken) minus energy out (made).</li>
<li>Forgetting to multiply by the number of bonds (four C-H, not one).</li>
<li>Confusing activation energy with enthalpy change: Eₐ is the reactant-to-peak height (always positive); ΔH is reactant-to-product difference.</li>
<li>Drawing an exothermic profile with products above reactants (or forgetting to label levels/axes).</li>
<li>Claiming bond making absorbs energy — making bonds releases; breaking absorbs.</li>
<li>Mixing J and kJ in calorimetry (4.2 J/g°C × g × °C gives joules).</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> Define enthalpy change and state the sign of ΔH for (i) combustion (ii) thermal decomposition.</p>
<p>Answer: Enthalpy change is the heat energy change at constant pressure during a reaction. (i) Combustion is exothermic, so ΔH is negative. (ii) Thermal decomposition is endothermic, so ΔH is positive.</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> Explain, in terms of bonds, why combustion is exothermic.</p>
<p>Answer: Combustion breaks the bonds in the fuel and in oxygen (absorbing energy) and makes new bonds in carbon dioxide and water (releasing energy). The energy released forming the very strong C=O and O-H bonds in the products exceeds the energy absorbed breaking the reactant bonds, so net energy is released to the surroundings and ΔH is negative.</p>
<p><strong>Question 3 (Paper 4, 5 marks).</strong> Calculate ΔH for 2H₂ + O₂ → 2H₂O using bond energies: H-H 436, O=O 498, O-H 464 kJ/mol.</p>
<p>Answer: Broken: 2 × H-H = 872; 1 × O=O = 498; total = 1370 kJ. Made: 4 × O-H = 1856 kJ. ΔH = 1370 − 1856 = −486 kJ per mole of reaction as written (−243 kJ per mole of H₂).</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> Draw and label a reaction pathway diagram for an endothermic reaction, identifying activation energy and ΔH.</p>
<p>Answer: Axes: energy (y) against reaction path (x). Products are drawn above reactants. Eₐ is the vertical arrow from reactants up to the peak of the curve (positive, the energy needed to start the reaction). ΔH is the vertical arrow between reactant and product levels, pointing up (positive) since products have higher energy.</p>
<p><strong>Question 5 (Paper 4, 3 marks).</strong> A student burns 1.0 g of ethanol and heats 200 g of water by 15.0 °C. Calculate the energy released and give it in kJ/g. (c = 4.2 J/g°C)</p>
<p>Answer: Energy = 200 × 4.2 × 15.0 = 12 600 J = 12.6 kJ. Per gram of ethanol: 12.6 ÷ 1.0 = 12.6 kJ/g.</p>
<p><strong>Question 6 (Paper 2, 2 marks).</strong> Explain why an instant cold pack feels cold.</p>
<p>Answer: The pack dissolves an endothermic salt (ammonium nitrate): the dissolving process absorbs heat energy from the surroundings to break the solute's lattice, so the pack and hand lose thermal energy and feel cold.</p>
<p>Energy decides whether a reaction can happen at all; whether it actually does — and how fast — is the next topic.</p>
`,

    "2fea980f-6881-452a-923b-8b3bb9f698fa": `
<h2>IGCSE Chemistry: Rates, Equilibrium and Redox</h2>
<p>Cambridge IGCSE Chemistry 0620 (2026–2028), Extended route, Topic 6 Chemical reactions: statement 6.1 Physical and chemical changes, 6.2 Rate of reaction, 6.3 Reversible reactions and equilibrium, and 6.4 Redox. Three questions meet here: how fast a reaction goes, how far it goes, and what happens to the electrons. Each section below works from the particle model to the exam wording, with collision theory as the engine of every rate explanation and the Haber and Contact processes traced condition by condition.</p>

<h3>Physical and chemical changes</h3>
<p>A <strong>physical change</strong> alters form without changing the substance — no new material is made (melting, dissolving, evaporation), and it is usually reversible. A <strong>chemical change</strong> makes new substances with new properties — new bonds form and old ones break (burning, rusting, reacting acid with metal), is often harder to reverse, and usually involves an energy change. The decisive question: "has a new substance formed?"</p>

<h3>Rate of reaction: the measurement</h3>
<p>Rate is how fast a reaction happens: rate = change in quantity ÷ time. Measure it by how fast a reactant disappears or a product appears.</p>
<pre><code>Three standard measurement methods, each with its apparatus:

  1. MASS CHANGE (balance + flask): a gas escapes, so mass falls.
     rate = loss of mass / time. Good for CO₂ from acid + carbonate.
     Limitation: only works when the gas escapes and is not toxic.
  2. GAS VOLUME (gas syringe): collect the gas; read volume at intervals.
     rate = volume of gas / time. Works for any gaseous product.
     Limitation: gas may leak past the plunger; syringe may stick.
  3. COLOUR CHANGE / TURBIDITY (colorimeter or cross-on-paper): for
     thiosulfate + acid (sulfur precipitate clouds the solution); time how
     long a marked cross disappears from view.
  4. TEMPERATURE CHANGE for neutralisation-type reactions (thermometer).

Reading rate from a graph: the rate at any moment is the GRADIENT of the
tangent to the curve. Steep = fast; the curve flattens as reactants are used
up and collisions become rarer.</code></pre>

<h3>Rate and collision theory</h3>
<p>Particles react when they collide with enough energy (≥ the activation energy) in the right orientation. Anything that increases the frequency or energy of successful collisions increases the rate.</p>
<table border="1" cellpadding="6">
<tr><th>Factor</th><th>Particle-level explanation</th><th>Effect on graph</th></tr>
<tr><td>Concentration</td><td>More particles per volume → more frequent collisions</td><td>Steeper initial gradient, same final product</td></tr>
<tr><td>Pressure (gases)</td><td>Same as concentration: particles closer together</td><td>Steeper initial gradient</td></tr>
<tr><td>Surface area</td><td>Powder exposes more particles to collide at once</td><td>Steeper initial gradient, same final product</td></tr>
<tr><td>Temperature</td><td>Particles move faster (more frequent collisions) AND a bigger fraction exceed Eₐ</td><td>Steeper initial gradient; often reaches the same final product</td></tr>
<tr><td>Catalyst</td><td>Provides an alternative route with LOWER activation energy; more particles can react on collision; unchanged at the end</td><td>Steeper initial gradient, same final product</td></tr>
</table>
<p>Enzymes are biological catalysts — same mechanism, protein shaped to fit the substrate; denatured by high temperature (shape changes, substrate no longer fits).</p>
<pre><code>Rate worked example: marble chips + acid, measured by gas volume.

  50 cm³ of CO₂ collected: first 30 s -> 20 cm³; second 30 s -> 12 cm³;
  third 30 s -> 8 cm³; fourth -> 6 cm³; fifth -> 4 cm³ (total 50).

  rates (cm³/s): 20/30 = 0.67 ; 12/30 = 0.40 ; 8/30 = 0.27 ; 6/30 = 0.20 ;
                 4/30 = 0.13

  The rate falls because acid concentration drops as it is consumed - fewer
  collisions per second. Adding the same mass of powdered marble instead of
  chips would double the early rate (more surface) but the SAME 50 cm³ total
  appears - the amount of product depends on the limiting reactant, not the
  rate.</code></pre>

<h3>Reversible reactions and equilibrium</h3>
<p>A <strong>reversible reaction</strong> (⇌) can go in both directions. In a <strong>closed system</strong> nothing escapes, so eventually the forward and reverse reactions proceed at the same rate and concentrations stay constant — <strong>dynamic equilibrium</strong>. "Dynamic" matters: both reactions continue; the observable amounts just stop changing.</p>
<pre><code>Le Chatelier's principle - the exam's master rule:

  "If a condition is changed, the position of equilibrium shifts to
   OPPOSE the change."

Worked through each variable on the Haber process:
  N₂(g) + 3H₂(g) ⇌ 2NH₃(g)   ΔH negative (exothermic forward)

  - Increase pressure: shift to the side with FEWER gas molecules to reduce
    it -> products (1 mole N₂ + 3 H₂ = 4 gas moles -> 2 NH₃) -> more NH₃.
  - Increase temperature: shift to ABSORB heat -> endothermic direction
    (reverse) -> LESS NH₃. (A real conflict: higher T speeds the rate but
    lowers the yield - compromise at 450 °C.)
  - Add more N₂: shift to use it up -> more NH₃.
  - Remove NH₃ as it forms: shift to replace it -> more NH₃.
  - Catalyst: NO shift - it speeds both directions equally, so equilibrium
    is reached sooner at the same position.

Why the Haber conditions (chosen, not optimal for yield alone):
  450 °C - a compromise: lower temperature gives better yield but too slow
  a rate; 450 gives an economic rate with acceptable yield.
  200 atm - high pressure favours the 4-gas-mole side and improves yield,
  but very high pressures cost too much in plant and energy.
  Iron catalyst - faster equilibrium attainment, cheaper than platinum.

Contact process: 2SO₂ + O₂ ⇌ 2SO₃ (exothermic) - same reasoning:
  450 °C, 1-2 atm, V₂O₅ catalyst.</code></pre>
<p>The hydrated–anhydrous reversible pair is the syllabus's visual example: blue anhydrous copper(II) sulfate + water ⇌ blue hydrated crystals (and pink ⇌ blue for cobalt(II) chloride) — adding water drives it one way, heat drives it back.</p>

<h3>Redox</h3>
<p><strong>Redox</strong> is a reaction involving simultaneous <strong>reduction</strong> and <strong>oxidation</strong>. The classic definitions: oxidation is gain of oxygen (or loss of electrons, or increase in oxidation number); reduction is loss of oxygen (or gain of electrons, or decrease in oxidation number). One process never happens without the other — if something is oxidised, something else has been reduced.</p>
<pre><code>Three ways to spot redox - all on one reaction:

  CuO + H₂ -> Cu + H₂O

  1. Oxygen: CuO loses oxygen -> CuO is REDUCED; H₂ gains oxygen -> H₂ is
     OXIDISED.
  2. Electrons: Cu²⁺ gains 2 electrons to become Cu (reduction); H loses
     electrons to become H⁺ in water (oxidation).
  3. Oxidation numbers: Cu goes +2 -> 0 (decrease: reduction);
     H goes 0 -> +1 (increase: oxidation).

  Oxidation number rules:
    element alone = 0; simple ion = its charge; O in compounds = -2
    (except peroxides); H in compounds = +1; sum over a compound = 0.
    Roman numerals in names give the metal's number: iron(III) = Fe³⁺.

  Oxidising agent: ACCEPTS electrons and is itself reduced (CuO above).
  Reducing agent: DONATES electrons and is itself oxidised (H₂ above).</code></pre>
<pre><code>Half-equations - worked through two examples:

  Mg -> Mg²⁺ + 2e⁻            (oxidation: electrons on the right)
  Cl₂ + 2e⁻ -> 2Cl⁻           (reduction: electrons on the left)

  Check both the atoms AND the charge balance:
    left of the second: 0 charge + 2e⁻ = -2 total; right: 2 x -1 = -2 ✓

  Combining: Mg + Cl₂ -> MgCl₂ - electrons lost by Mg exactly equal those
  gained by Cl₂ (2 = 2 ✓). If they are not equal, multiply the half-
  equations so they are before adding.</code></pre>

<h3>Worked example: one scenario, all three topics</h3>
<pre><code>Hydrogen + iodine ⇌ hydrogen iodide (reversible, exothermic):

Rate side: raising temperature speeds both directions (more collisions
  exceed Eₐ); adding a catalyst reaches equilibrium faster without moving it.

Equilibrium side: heating shifts the equilibrium to oppose the change -
  the endothermic (reverse) direction - so less HI forms; increasing pressure
  has no effect here (2 gas moles each side).

Redox side: H goes 0 -> +1 (oxidised); I goes 0 -> -1 (reduced).
  Half-equations: H₂ -> 2H⁺ + 2e⁻ ; I₂ + 2e⁻ -> 2I⁻.
  I₂ is the oxidising agent (it gains the electrons).</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Sign errors in Le Chatelier wording: say which direction the equilibrium shifts and what the change does — "shifts to oppose the increase" is the credit-worthy phrasing.</li>
<li>Claiming a catalyst changes the yield or equilibrium position — it only changes how fast equilibrium is reached.</li>
<li>Confusing rate with yield: a steeper graph is speed; total product height is yield/amount, set by the limiting reactant.</li>
<li>Explaining temperature effects with collision frequency alone — the activation-energy fraction is the more important half at this level.</li>
<li>Redox: putting electrons on the wrong side of half-equations (oxidation loses electrons — they appear on the right) or leaving atoms/charge unbalanced.</li>
<li>Calling the reducing agent "the thing that gets reduced" — the agent does the reducing while being oxidised itself.</li>
<li>Forgetting closed-system conditions when defining equilibrium (open systems never reach it — reactants escape).</li>
<li>Reading tangent gradients as vertical heights on rate graphs.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 4 marks).</strong> Explain, using collision theory, why powdered calcium carbonate reacts faster with acid than large chips.</p>
<p>Answer: Powder has a much larger surface area than the same mass of chips, so more calcium carbonate particles are exposed to acid particles at any moment. Collisions therefore occur more frequently, the rate of successful collisions per second increases, and the reaction is faster.</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> Explain how increasing temperature affects the rate of a reaction in terms of collision theory.</p>
<p>Answer: Increasing temperature increases particles' average kinetic energy: they collide more often and, crucially, a much greater fraction of collisions have energy equal to or greater than the activation energy. The number of successful collisions per second rises sharply, so the rate increases.</p>
<p><strong>Question 3 (Paper 4, 5 marks).</strong> For N₂ + 3H₂ ⇌ 2NH₃ (ΔH negative), explain the effect of (i) increasing pressure (ii) increasing temperature on the yield of ammonia.</p>
<p>Answer: (i) The forward reaction converts 4 moles of gas to 2, so higher pressure shifts the equilibrium to the side with fewer gas molecules — the products — to oppose the increase, raising the yield. (ii) The forward reaction is exothermic, so heating shifts the equilibrium in the endothermic (reverse) direction to oppose the temperature rise, lowering the yield — which is why a compromise temperature of about 450 °C is used.</p>
<p><strong>Question 4 (Paper 4, 3 marks).</strong> Explain why adding a catalyst does not change the position of equilibrium.</p>
<p>Answer: A catalyst lowers the activation energy of both the forward and reverse reactions equally, so both rates increase by the same factor. Equilibrium is reached sooner, but the ratio of products to reactants at equilibrium is unchanged.</p>
<p><strong>Question 5 (Paper 4, 4 marks).</strong> In the reaction CuO + H₂ → Cu + H₂O, identify what is oxidised and what is reduced, justifying with oxidation numbers.</p>
<p>Answer: In CuO, copper has oxidation number +2; it becomes Cu with oxidation number 0 — a decrease, so copper is reduced (CuO is the oxidising agent). Hydrogen goes from 0 in H₂ to +1 in H₂O — an increase, so hydrogen is oxidised (it is the reducing agent).</p>
<p><strong>Question 6 (Paper 4, 3 marks).</strong> Write half-equations for the conversion of magnesium to magnesium ions and of chlorine to chloride ions, and name the type of each change.</p>
<p>Answer: Mg → Mg²⁺ + 2e⁻ (oxidation — electrons lost); Cl₂ + 2e⁻ → 2Cl⁻ (reduction — electrons gained). The electrons lost by magnesium equal those gained by chlorine, so the combination Mg + Cl₂ → MgCl₂ is balanced in charge.</p>
<p>Rates and equilibrium describe reactions in general; the next topics give that machinery a home — the acids, salts and Periodic Table groups where it is applied.</p>
`,
  },
};
