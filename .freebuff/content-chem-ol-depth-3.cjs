// Chemistry OL batch 3: official Cambridge IGCSE Chemistry 0620 (2026-2028)
// Topic 7 Acids bases and salts (7.1-7.3), Topic 8 The Periodic Table
// (8.1-8.5), and Topic 9 Metals (9.1-9.6). Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-chem-ol-depth-3.cjs > .freebuff-tmp/chem-ol-depth-3.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/chem-ol-depth-3.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/chem-ol-depth-3.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs chemistry OL
module.exports = {
  expectType: "notes",
  titles: {
    "216c9d31-4a93-46df-a523-fcc7557e1427": "IGCSE Chemistry: Acids, Bases and Salts",
    "c0b1214f-49b8-4fbe-99e6-7087b28873d8": "IGCSE Chemistry: The Periodic Table",
    "b289e98a-b116-4ed8-998a-acf221bcfe28": "IGCSE Chemistry: Metals and Reactivity",
  },
  rows: {
    "216c9d31-4a93-46df-a523-fcc7557e1427": `
<h2>IGCSE Chemistry: Acids, Bases and Salts</h2>
<p>Cambridge IGCSE Chemistry 0620 (2026–2028), Extended route, Topic 7 Acids, bases and salts: statement 7.1 The characteristic properties of acids and bases, 7.2 Oxides, and 7.3 Preparation of salts. This note builds from what an acid physically is (a proton donor) through every reaction type worth marks, to the four salt-preparation methods with their procedures — and it is those procedures that carry Paper 6 as well as Paper 4. Every equation is balanced and every calculation line is explicit.</p>

<h3>What acids and bases are</h3>
<p>The everyday definition: acids taste sour, turn litmus red and react with metals and carbonates; <strong>bases</strong> are metal oxides or hydroxides that neutralise acids; <strong>alkalis</strong> are soluble bases (they dissolve to give hydroxide ions). The Extended definition that earns the extra mark: an <strong>acid is a proton (H⁺) donor</strong> and a <strong>base is a proton acceptor</strong> — in water an acid donates H⁺ to the solvent, forming H₃O⁺ but conventionally written as H⁺(aq).</p>
<pre><code>Dissociation of acids in water - the strong/weak distinction:

  STRONG acid - fully dissociated (every molecule releases its proton):
    HCl(aq) -> H⁺(aq) + Cl⁻(aq)          [single arrow]
    HNO₃(aq) -> H⁺(aq) + NO₃⁻(aq)
    H₂SO₄(aq) -> 2H⁺(aq) + SO₄²⁻(aq)

  WEAK acid - only partially dissociated (an equilibrium):
    CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq)   [equilibrium arrow]
    H₂CO₃(aq) ⇌ H⁺(aq) + HCO₃⁻(aq)

Strong vs weak is about the DISOCIATION, not the concentration:
  dilute HCl is strong but dilute; concentrated ethanoic acid is weak but
  concentrated. Strong acids attack metals and carbonates faster (more H⁺
  ions per volume); weak acids are safer (vinegar, lemon juice).</code></pre>

<h3>Reactions of acids: the four types</h3>
<table border="1" cellpadding="6">
<tr><th>Reacts with</th><th>Products</th><th>Worked equation</th></tr>
<tr><td>Metals</td><td>Salt + hydrogen</td><td>Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)</td></tr>
<tr><td>Bases (metal oxides/hydroxides)</td><td>Salt + water</td><td>CuO(s) + H₂SO₄(aq) → CuSO₄(aq) + H₂O(l)</td></tr>
<tr><td>Carbonates</td><td>Salt + water + carbon dioxide</td><td>CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)</td></tr>
<tr><td>Ammonia (alkali)</td><td>Ammonium salt</td><td>NH₃(g) + HCl(aq) → NH₄Cl(aq)</td></tr>
</table>
<p><strong>Neutralisation</strong> is acid + base → salt + water; the ionic essence is H⁺ + OH⁻ → H₂O. Indicators: litmus (red in acid, blue in alkali), thymolphthalein (colourless in acid, blue in alkali), methyl orange (red in acid, yellow in alkali), universal indicator for a pH estimate. <strong>pH</strong> measures acidity: pH 7 neutral, below 7 acidic, above 7 alkaline; each unit is a tenfold change in H⁺ concentration.</p>

<h3>Oxides: the four classes</h3>
<ul>
<li><strong>Basic oxides</strong> — metal oxides (CuO, CaO) that react with acids to give salt and water.</li>
<li><strong>Acidic oxides</strong> — non-metal oxides (SO₂, CO₂, NO₂) that react with alkalis to give salt and water.</li>
<li><strong>Amphoteric oxides</strong> — react with both acids and alkalis (Al₂O₃, ZnO) — the Extended favourite.</li>
<li><strong>Neutral oxides</strong> — neither (CO, NO, H₂O).</li>
</ul>
<pre><code>Amphoteric behaviour worked, both directions:

  Al₂O₃ + 6HCl -> 2AlCl₃ + 3H₂O         [acts as a base, with acid]
  Al₂O₃ + 2NaOH -> 2NaAlO₂ + H₂O        [acts as an acid, with alkali]

The oxide's character tracks the element's position: metallic oxides basic,
non-metallic oxides acidic, and the metal/metalloid border (Al, Zn) gives
amphoteric behaviour.</code></pre>

<h3>Preparation of salts: four methods</h3>
<p>The method is chosen by the salt's solubility and the acid type — a decision tree the exam expects you to reason through, not recite.</p>
<pre><code>Decision tree:

  Soluble salt?
  |-- YES -> use an ACID + excess INSOLUBLE base/metal/carbonate, then
  |          filter off the excess and crystallise.
  |-- NO  -> precipitation: mix two solutions of soluble salts, filter,
             wash and dry the precipitate.

Worked procedure 1 - soluble salt from an insoluble base:
  copper(II) sulfate from copper(II) oxide + dilute sulfuric acid.
  1. Warm dilute H₂SO₄ in a beaker.
  2. Add CuO powder a little at a time with stirring - it reacts and
     dissolves: CuO + H₂SO₄ -> CuSO₄ + H₂O
  3. Keep adding until NO MORE DISSOLVES (the excess solid remains) -
     this guarantees all the acid is used up.
  4. FILTER off the excess CuO (the filtrate is pure copper(II) sulfate
     solution).
  5. Heat the filtrate to the point of crystallisation, leave to cool and
     crystallise; dry the crystals between filter papers.

  The excess-solid trick is the key exam point: a pure salt needs either
  reagent fully consumed, and only an insoluble excess can be filtered off.

Worked procedure 2 - insoluble salt by precipitation:
  barium sulfate from barium chloride + sodium sulfate solutions.
  BaCl₂(aq) + Na₂SO₄(aq) -> BaSO₄(s) + 2NaCl(aq)
  Mix solutions, filter the precipitate, wash with distilled water, dry.

Worked procedure 3 - titration (soluble salt from acid + soluble alkali):
  sodium chloride from hydrochloric acid + sodium hydroxide.
  Both are solutions, so there is no excess solid to filter - use EXACT
  volumes from a titration (see the techniques note), then evaporate.

Worked procedure 4 - acid + excess metal (hydrogen given off):
  zinc sulfate from zinc + dilute sulfuric acid; filter excess zinc.</code></pre>

<h3>Water of crystallisation</h3>
<p>Many salts crystallise with water locked into their lattice — <strong>hydrated</strong> salts (CuSO₄·5H₂O blue; CoCl₂·6H₂O pink). Heating drives the water off as <strong>anhydrous</strong> salt (white CuSO₄), and the change is reversible — the water test from the environment topic. In calculations the water counts in the formula mass: Mᵣ of CuSO₄·5H₂O = 160 + 5 × 18 = 250, not 160.</p>

<h3>Worked example: a full salt-preparation calculation</h3>
<pre><code>10.0 g of calcium carbonate reacts with excess hydrochloric acid:
  CaCO₃ + 2HCl -> CaCl₂ + H₂O + CO₂

(a) moles CaCO₃ = 10.0 / 100 = 0.100 mol
(b) ratio 1:1 -> moles CaCl₂ = 0.100 mol
(c) mass CaCl₂ (Mᵣ = 111) = 0.100 x 111 = 11.1 g   [theoretical yield]
(d) if 9.4 g of dry salt is collected:
    percentage yield = 9.4 / 11.1 x 100 = 84.7%

Where the mass is lost: crystals left in solution, spills, incomplete
reaction, or wet product if not dried - the usual evaluation question.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Confusing acid strength with concentration — strong = fully dissociated; concentrated = lots of acid per volume. The two are independent axes.</li>
<li>Writing weak acid dissociation with a single arrow; weak acids are equilibria.</li>
<li>Salt formula errors from ion charges: Al³⁺ + Cl⁻ → AlCl₃, not AlCl — check charge balance.</li>
<li>Forgetting carbon dioxide in acid + carbonate answers (three products, not two).</li>
<li>Adding excess soluble alkali in salt prep (then the salt is contaminated and cannot be filtered) — only insoluble reagents can be used in excess.</li>
<li>Leaving water of crystallisation out of formula mass or percentage-composition calculations.</li>
<li>Describing neutralisation as "acid + metal" — that is a separate reaction type; neutralisation is acid + base.</li>
<li>In precipitation questions, not washing the precipitate (residual soluble ions contaminate it).</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> Explain the difference between a strong acid and a concentrated acid.</p>
<p>Answer: A strong acid dissociates completely in water, releasing all its protons (e.g. hydrochloric acid); a concentrated acid contains a large amount of acid per unit volume of solution. A dilute solution of a strong acid is strong but dilute; a concentrated solution of a weak acid (ethanoic) is concentrated but weak.</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> Write equations for sulfuric acid reacting with (i) magnesium (ii) copper(II) oxide (iii) sodium carbonate.</p>
<p>Answer: (i) Mg + H₂SO₄ → MgSO₄ + H₂. (ii) CuO + H₂SO₄ → CuSO₄ + H₂O. (iii) Na₂CO₃ + H₂SO₄ → Na₂SO₄ + H₂O + CO₂.</p>
<p><strong>Question 3 (Paper 4, 4 marks).</strong> Describe how pure crystals of copper(II) sulfate are prepared from copper(II) oxide and dilute sulfuric acid.</p>
<p>Answer: Warm the dilute acid; add copper(II) oxide with stirring until it no longer dissolves (excess solid ensures all acid reacts); filter off the excess copper(II) oxide; heat the filtrate to the point of crystallisation; leave the solution to cool and crystallise; filter and dry the crystals between filter papers.</p>
<p><strong>Question 4 (Paper 4, 3 marks).</strong> Explain why aluminium oxide is described as amphoteric.</p>
<p>Answer: Aluminium oxide reacts with acids to form a salt and water (acting as a base), e.g. Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O, and also reacts with alkalis to form a salt and water (acting as an acid), e.g. Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O. Oxides with both behaviours are amphoteric.</p>
<p><strong>Question 5 (Paper 4, 5 marks).</strong> Calculate the mass of anhydrous sodium sulfate formed when 21.2 g of sodium carbonate is neutralised by excess sulfuric acid. (Mᵣ: Na₂CO₃ = 106, Na₂SO₄ = 142)</p>
<p>Answer: Na₂CO₃ + H₂SO₄ → Na₂SO₄ + H₂O + CO₂. Moles Na₂CO₃ = 21.2 ÷ 106 = 0.200 mol. Ratio 1:1 → 0.200 mol Na₂SO₄. Mass = 0.200 × 142 = 28.4 g.</p>
<p><strong>Question 6 (Paper 6, 3 marks).</strong> A student prepares lead(II) iodide by precipitation. State the reagents and describe the steps after mixing.</p>
<p>Answer: Mix solutions of lead(II) nitrate and potassium iodide. Filter to collect the yellow precipitate; wash it with distilled water to remove soluble nitrate/iodide ions; dry it between filter papers or in a warm oven.</p>
<p>Acids and salts live in the wider map of the elements — the Periodic Table's groups and their trends.</p>
`,

    "c0b1214f-49b8-4fbe-99e6-7087b28873d8": `
<h2>IGCSE Chemistry: The Periodic Table</h2>
<p>Cambridge IGCSE Chemistry 0620 (2026–2028), Extended route, Topic 8 The Periodic Table: statement 8.1 Arrangement of elements, 8.2 Group I properties, 8.3 Group VII properties, 8.4 Transition elements, and 8.5 Noble gases. The Periodic Table is chemistry's master chart — position predicts behaviour — and this note derives every trend from electron structure rather than asking you to memorise it. Each group's properties are traced down the group with the particle-level reason, because Paper 4 asks "explain the trend", never "state the trend".</p>

<h3>Arrangement: periods, groups and the prediction power</h3>
<p>Elements are arranged in order of increasing <strong>proton number</strong> in rows (<strong>periods</strong>) and columns (<strong>groups</strong>). Two structural facts run everything: elements in the same group have the same number of <strong>outer-shell electrons</strong> (hence similar chemistry), and the period number equals the number of occupied shells. Across a period, the character changes from metallic (left) to non-metallic (right); group number gives the ion charge (Group I → +1, Group VII → −1 for monatomic ions).</p>

<h3>Group I: the alkali metals</h3>
<table border="1" cellpadding="6">
<tr><th>Trend down Group I</th><th>Pattern</th><th>Why (electron structure)</th></tr>
<tr><td>Reactivity</td><td>Increases (Li &lt; Na &lt; K)</td><td>The outer electron is further from the nucleus and more shielded, so it is lost more easily</td></tr>
<tr><td>Melting/boiling point</td><td>Decreases</td><td>The metallic bond weakens as ions get larger and the delocalised electrons are further from the nuclei</td></tr>
<tr><td>Density</td><td>Increases (they float or sink accordingly)</td><td>Mass grows faster than atomic radius</td></tr>
</table>
<pre><code>Reactions of Group I with water - the pattern, worked:

  2Li + 2H₂O -> 2LiOH + H₂       lithium: steady fizz, floats
  2Na + 2H₂O -> 2NaOH + H₂       sodium: vigorous, melts into a ball
  2K  + 2H₂O -> 2KOH  + H₂       potassium: lilac flame, skitters

  The products are the group's hydroxide (an alkali, so the name) and
  hydrogen. Down the group the fizzing gets more vigorous - the outer
  electron is lost more easily, so the reaction with water speeds up.

  Burning in oxygen: lithium oxide Li₂O, sodium peroxide Na₂O₂,
  potassium superoxide KO₂ - the pattern of increasing reactivity also
  shows in the oxide formed.</code></pre>

<h3>Group VII: the halogens</h3>
<table border="1" cellpadding="6">
<tr><th>Trend down Group VII</th><th>Pattern</th><th>Why</th></tr>
<tr><td>Reactivity</td><td>Decreases (F &gt; Cl &gt; Br &gt; I)</td><td>The outer shell is further from the nucleus, so an incoming electron is attracted less strongly</td></tr>
<tr><td>Colour</td><td>Darkens: pale yellow-green gas → red-brown liquid → black solid</td><td>Molecular size and polarisability increase</td></tr>
<tr><td>Boiling point</td><td>Increases</td><td>Larger molecules → stronger intermolecular forces → more energy needed</td></tr>
</table>
<pre><code>Displacement reactions - the reactivity rule, worked:

  A more reactive halogen DISPLACES a less reactive halide from solution.

  Cl₂(aq) + 2KBr(aq) -> 2KCl(aq) + Br₂(aq)
    chlorine displaces bromine: the solution turns orange-brown.
  Cl₂(aq) + 2KI(aq)  -> 2KCl(aq) + I₂(aq)
    iodine formed: with hexane/hexane layer it shows violet.
  Br₂(aq) + 2KI(aq)  -> 2KBr(aq) + I₂(aq)
  Br₂(aq) + 2KCl(aq) -> no reaction (bromine is less reactive than chlorine)

  Rule: the higher element in the group displaces the lower one's ions.
  Exam answers quote the observation, not just the equation - name the
  colour change.</code></pre>

<h3>Group VIII: the noble gases</h3>
<p>The noble gases (He, Ne, Ar, Kr, Xe, Rn) are monatomic gases with full outer shells — hence almost completely unreactive. Their existence and inertness are the proof that a full outer shell confers stability — the electron-configuration explanation that underpins all of bonding.</p>

<h3>Transition elements</h3>
<ul>
<li>Physical: high density, high melting point, strong metallic bonding (partly from their delocalised electrons).</li>
<li>Chemical: form <strong>coloured compounds</strong> (Cu²⁺ blue, Fe²⁺ pale green, Fe³⁺ yellow), show <strong>variable oxidation numbers</strong> (iron(II) and iron(III)), and act as <strong>catalysts</strong> (iron in the Haber process, V₂O₅ in the Contact process, nickel in hydrogenation).</li>
</ul>
<pre><code>Variable oxidation numbers - worked:

  Iron(II) chloride FeCl₂  -> iron is +2
  Iron(III) chloride FeCl₃ -> iron is +3
  Copper(II) sulfate CuSO₄ -> +2 ; copper(I) oxide Cu₂O -> +1

  Roman numeral in the NAME = oxidation number. The same element in two
  oxidation states means two families of compounds - a transition-metal
  signature. Colour changes in redox titrations (e.g. MnO₄⁻ purple to
  Mn²⁺ colourless) exploit these states.</code></pre>

<p>The electron-configuration link is worth stating as a rule of its own, because nearly every explanation in this topic reduces to it. The number of outer electrons equals the group number (Group II elements have two outer electrons and form 2+ ions), and the number of occupied shells equals the period number. Similarity within a group is not a coincidence of mass — it is a consequence of identical outer-shell electron arrangements, which is why lithium and potassium, thousands of mass units apart in behaviour terms, give hydroxides of the same formula type and both release hydrogen from water. Across a period, proton number rises while shells stay the same, so the nucleus pulls electrons in more tightly, the atom shrinks, and metallic character gives way to non-metallic — which is why Period 3 runs from sodium's vigorous water chemistry to chlorine's and argon's total inertness.</p>

<h3>Worked example: predicting from position</h3>
<pre><code>Question: predict the properties of astatine (At, below iodine in Group VII).

  From the trends down the group:
  - state: solid at room temperature (darker than iodine - black),
  - melting point: higher than iodine's,
  - reactivity: LOWER than iodine (outer electron furthest from nucleus),
  - displacement: iodine would displace astatide from solution, and At
    would NOT displace Cl/Br/I.
  - reaction with hydrogen: At₂ + H₂ -> 2HAt, less readily than iodine's.

Every prediction cites the trend AND the electron-structure reason - that
pair is the mark scheme.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Explaining Group I reactivity with "gets bigger" alone — the mark is outer electron distance/shielding and ease of loss.</li>
<li>Confusing Group I and Group VII trends: Group I reactivity increases down; Group VII decreases — keep the electron argument (lose vs gain) straight.</li>
<li>Forgetting the colour observations in displacement answers — the visible change is half the marks.</li>
<li>Saying noble gases "have full outer shells so they are stable" without connecting to why that stops bonding.</li>
<li>Listing transition-metal properties without examples (coloured compounds: name the ion and its colour).</li>
<li>Confusing period number (shells) with group number (outer electrons).</li>
<li>Claiming Group I metals float or sink universally — density increases down the group, and lithium floats while others sink in water/oil.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 4 marks).</strong> Explain why the reactivity of Group I metals increases down the group.</p>
<p>Answer: Each element down the group has one more occupied shell, so the outer electron is further from the nucleus and more shielded by inner shells. The electrostatic attraction holding the outer electron weakens, so it is lost more readily in reactions — the metal is more reactive.</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> Explain why the reactivity of Group VII elements decreases down the group.</p>
<p>Answer: Halogens react by gaining an electron into the outer shell. Down the group the outer shell is further from the nucleus and more shielded, so the attraction for an incoming electron is weaker and it is gained less readily — reactivity falls.</p>
<p><strong>Question 3 (Paper 4, 3 marks).</strong> Describe what happens when chlorine is added to potassium iodide solution and name the reaction type.</p>
<p>Answer: The solution turns brown as iodine is displaced: Cl₂ + 2KI → 2KCl + I₂. This is a displacement (redox) reaction — chlorine is more reactive and displaces iodine from its salt.</p>
<p><strong>Question 4 (Paper 4, 3 marks).</strong> State three characteristic properties of transition elements and give an example of each.</p>
<p>Answer: Form coloured compounds (copper(II) sulfate is blue); show variable oxidation states (iron(II) and iron(III) compounds); act as catalysts (iron in the Haber process).</p>
<p><strong>Question 5 (Paper 4, 4 marks).</strong> Explain why noble gases are unreactive.</p>
<p>Answer: Noble gases have full outer electron shells (2 for helium, 8 for the rest). A full outer shell is energetically stable, so the atoms neither lose, gain nor share electrons — there is no bonding advantage — and they exist as monatomic gases.</p>
<p><strong>Question 6 (Paper 4, 4 marks).</strong> Compare the melting points of Group I metals and Group VII elements down each group, explaining both trends.</p>
<p>Answer: Group I metals: melting points decrease down the group — atoms grow larger, the metallic bond between positive ions and delocalised electrons weakens. Group VII elements: melting points increase — molecules get larger (Cl₂ → Br₂ → I₂) and the intermolecular forces between molecules strengthen, so more energy is needed to separate them.</p>
<p>The table's metals deserve their own machinery — extraction, corrosion and the reactivity series.</p>
`,

    "b289e98a-b116-4ed8-998a-acf221bcfe28": `
<h2>IGCSE Chemistry: Metals and Reactivity</h2>
<p>Cambridge IGCSE Chemistry 0620 (2026–2028), Extended route, Topic 9 Metals: statements 9.1 Properties of metals, 9.2 Uses of metals, 9.3 Alloys and their properties, 9.4 Reactivity series, 9.5 Corrosion of metals, and 9.6 Extraction of metals. The reactivity series is the spine of this topic — it predicts what metals do with water, acid and oxygen, how they are extracted, and why they corrode. Every prediction below flows from one ordering, and the blast furnace is traced reaction by reaction.</p>

<h3>Properties and uses</h3>
<p>Metals: good conductors of heat and electricity, malleable (hammer into sheets) and ductile (draw into wire), with high melting points — all from metallic bonding (positive ions in a sea of delocalised electrons). Uses follow properties: <strong>aluminium</strong> — low density (aircraft), corrosion resistance (food containers, overhead cables: light + oxide-protected + conductive); <strong>copper</strong> — excellent conductivity and ductility (electrical wiring), non-toxic (water pipes).</p>

<table border="1" cellpadding="6">
<tr><th>Metal</th><th>Key property</th><th>Use</th></tr>
<tr><td>Aluminium</td><td>Low density; corrosion-resistant oxide layer; conducts</td><td>Aircraft, overhead cables, food containers</td></tr>
<tr><td>Copper</td><td>Excellent electrical conductivity; ductile; non-toxic</td><td>Electrical wiring, water pipes</td></tr>
<tr><td>Iron (steel)</td><td>Strong, cheap; alloyed for hardness</td><td>Structures, vehicles, cutlery (stainless)</td></tr>
<tr><td>Tungsten</td><td>Very high melting point (3422 °C)</td><td>Lamp filaments, cutting tools</td></tr>
<tr><td>Titanium</td><td>Strong, low density, corrosion-resistant, biocompatible</td><td>Aerospace, replacement joints</td></tr>
</table>

<h3>Alloys</h3>
<p>An <strong>alloy</strong> is a mixture of a metal with other elements (brass = copper + zinc; stainless steel = iron + chromium + nickel). Alloys are harder and stronger than pure metals: atoms of different sizes disrupt the regular layers, so the layers cannot slide over each other easily — this is the complete explanation, and both halves earn marks. Stainless steel's hardness and corrosion resistance suit cutlery.</p>

<h3>The reactivity series</h3>
<pre><code>The series, memorised in order of decreasing reactivity:

  potassium K, sodium Na, calcium Ca, magnesium Mg, aluminium Al,
  carbon C (reference), zinc Zn, iron Fe, hydrogen H (reference),
  copper Cu, silver Ag, gold Au

Three observations fix a metal's place:

  WITH WATER:
    K, Na, Ca: react with cold water (2K + 2H₂O -> 2KOH + H₂; sodium melts
    and skitters; calcium fizzes steadily)
    Mg: very slowly with cold water, vigorously with steam
       (Mg + H₂O -> MgO + H₂)
    Al, Zn, Fe: react with STEAM only (Fe + H₂O -> Fe₃O₄ + H₂ at red heat)
    Cu, Ag, Au: no reaction even with steam

  WITH DILUTE HCl:
    K..Mg: vigorous (fast fizz of H₂)
    Zn, Fe: steady fizz
    Cu, Ag, Au: no reaction (below hydrogen in the series)

  WITH OXYGEN:
    most metals form oxides; gold does not tarnish at all.

Displacement: a more reactive metal displaces a less reactive metal from its
salt solution:
    Zn(s) + CuSO₄(aq) -> ZnSO₄(aq) + Cu(s)      [zinc plates copper]
    Cu(s) + ZnSO₄(aq) -> no reaction
  Observations: zinc gains a red-brown coating; the blue Cu²⁺ colour fades.</code></pre>

<h3>Corrosion and protection</h3>
<p><strong>Rusting</strong> is the corrosion of iron in the presence of <strong>both</strong> water and oxygen — the classic two-variable experiment (wet + air = rust; dry air or water without air = none). The product is hydrated iron(III) oxide, Fe₂O₃·xH₂O.</p>
<ul>
<li><strong>Barrier methods</strong>: painting, greasing, plastic coating — block water and oxygen reaching the surface.</li>
<li><strong>Galvanising</strong>: coating with zinc; even scratched, zinc protects because it corrodes preferentially.</li>
<li><strong>Sacrificial protection</strong>: a more reactive metal (zinc or magnesium) is attached to iron; it corrodes <em>instead</em> of the iron because it loses electrons more readily — used on ships' hulls and underground pipes.</li>
</ul>
<pre><code>Sacrificial protection explained electron by electron:

  Iron in contact with zinc in damp conditions forms a tiny electrochemical
  cell. Zinc is more reactive, so Zn atoms lose electrons (Zn -> Zn²⁺ + 2e⁻)
  and corrode; the electrons flow to the iron, where oxygen and water take
  them up. The iron is reduced-protected - it cannot corrode while the zinc
  remains. This is why the zinc block is called "sacrificial": it is eaten
  away to save the iron.</code></pre>

<h3>Extraction of metals</h3>
<p>Ease of extraction tracks the reactivity series: <strong>unreactive</strong> metals (Cu, Ag, Au) exist as native elements and need no chemical extraction; <strong>moderately reactive</strong> metals (Zn, Fe) are extracted by reduction with carbon; the <strong>most reactive</strong> (Al, Mg, Na) are extracted by <strong>electrolysis</strong> — carbon cannot reduce them.</p>
<pre><code>The blast furnace for iron, reaction by reaction:

  Raw materials: iron ore (haematite, Fe₂O₃), coke (C), limestone (CaCO₃),
                 hot air.

  1. Coke burns to make carbon monoxide (the reducing agent):
       C + O₂ -> CO₂          (exothermic - heats the furnace)
       CO₂ + C -> 2CO          (endothermic; the key reduction agent forms)
  2. Reduction of the ore:
       Fe₂O₃ + 3CO -> 2Fe + 3CO₂
     (also direct: Fe₂O₃ + 3C -> 2Fe + 3CO at the hottest zone)
  3. Limestone removes sandy impurities (silica):
       CaCO₃ -> CaO + CO₂        (thermal decomposition)
       CaO + SiO₂ -> CaSiO₃     (slag - molten, drained off)

  Slag uses: road building. The molten iron is TAPPED from the bottom;
  slag floats above it (less dense) and is run off separately.

Aluminium extraction (electrolysis of Al₂O₃ in molten cryolite):
  - cryolite (Na₃AlF₆) lowers the melting point from 2050 °C to ~950 °C,
    saving energy;
  - carbon anodes: oxygen liberated reacts with them: C + O₂ -> CO₂, so
    anodes burn away and must be replaced regularly;
  - half-equations:  Al³⁺ + 3e⁻ -> Al  (cathode, reduction)
                     2O²⁻ -> O₂ + 4e⁻  (anode, oxidation)
  - aluminium is used for overhead cables and aircraft: light, resistant
    to corrosion (protective oxide layer), and conductive.</code></pre>

<h3>Worked example: reactivity reasoning end to end</h3>
<pre><code>Question: metal X does not react with steam but displaces copper from
copper(II) sulfate. Metal Y reacts with cold water. Order X, Y and copper
and justify.

  Y reacts with cold water -> Y is high in the series (like K, Na or Ca).
  X does not react with steam -> X is BELOW the steam-reactive metals (Al,
  Zn, Fe react with steam; Cu, Ag, Au do not) - but X displaces copper ->
  X is MORE reactive than copper. So X sits between iron and copper region:
  e.g. X could be lead. Order: Y > X > copper.

  The displacement alone proves X > Cu; the steam data place X low but not
  at the bottom; combining both observations is the mark.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Writing rust as just iron oxide — it is hydrated iron(III) oxide, and both water AND oxygen are required.</li>
<li>Explaining sacrificial protection without electron loss ("zinc is stronger") — the mark is reactivity and electron transfer.</li>
<li>Forgetting carbon and hydrogen's places as reference points in the series (they anchor extraction and acid-reaction predictions).</li>
<li>Confusing the blast furnace's reducing agents: carbon makes CO, and CO does the reduction — not carbon alone at the top.</li>
<li>Missing the limestone/slag step when asked "what removes impurities?"</li>
<li>Claiming alloys are harder because "the atoms are bigger" — the layers-disruption explanation is required.</li>
<li>Writing electrolysis for iron extraction (that is aluminium) — match method to reactivity.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 4 marks).</strong> Explain why gold is found unreactive in the Earth's crust while aluminium is extracted by electrolysis.</p>
<p>Answer: Gold is very low in the reactivity series — it does not react with water, oxygen or dilute acids, so it occurs as the free element and needs no chemical extraction. Aluminium is very reactive: its oxide is too stable for carbon to reduce at workable temperatures, so it must be extracted by electrolysis of molten aluminium oxide in cryolite.</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> Describe how iron is extracted in the blast furnace, including the role of limestone.</p>
<p>Answer: Coke burns to carbon dioxide, which reacts with more coke to carbon monoxide; the CO reduces haematite: Fe₂O₃ + 3CO → 2Fe + 3CO₂. Limestone decomposes to calcium oxide, which reacts with sandy silica impurities to form molten calcium silicate (slag), which floats on the molten iron and is tapped off separately.</p>
<p><strong>Question 3 (Paper 4, 4 marks).</strong> Explain sacrificial protection of iron.</p>
<p>Answer: A more reactive metal such as zinc is attached to iron in damp conditions. Zinc loses electrons more readily (Zn → Zn²⁺ + 2e⁻) and corrodes instead of the iron; the electrons it releases prevent iron from being oxidised. The zinc block is consumed over time — it is sacrificed — and must be replaced, but the iron stays intact.</p>
<p><strong>Question 4 (Paper 4, 3 marks).</strong> Explain why stainless steel is harder than pure iron.</p>
<p>Answer: Stainless steel is an alloy of iron with chromium and nickel. Atoms of different sizes distort the regular layers of iron atoms, so the layers cannot slide over each other easily when stressed — the material resists deformation and is harder and stronger.</p>
<p><strong>Question 5 (Paper 4, 4 marks).</strong> Write equations for the reactions of (i) magnesium with steam (ii) zinc with dilute hydrochloric acid (iii) zinc with copper(II) sulfate, and state the observation for (iii).</p>
<p>Answer: (i) Mg + H₂O → MgO + H₂. (ii) Zn + 2HCl → ZnCl₂ + H₂. (iii) Zn + CuSO₄ → ZnSO₄ + Cu — the zinc gains a red-brown copper deposit and the blue solution colour fades.</p>
<p><strong>Question 6 (Paper 4, 3 marks).</strong> State the conditions needed for iron to rust and describe two methods of prevention.</p>
<p>Answer: Iron needs both water and oxygen (air) in contact with it. Prevention: barrier methods such as painting or greasing that exclude both; galvanising with a zinc coating (which also protects scratches by corroding preferentially); or sacrificial protection with attached zinc or magnesium blocks.</p>
<p>Metals and their reactions shape the environment as well as industry — the next topic is the chemistry of air and water.</p>
`,
  },
};
