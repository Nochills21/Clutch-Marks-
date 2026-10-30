// OxfordAQA International GCSE Chemistry 9202 — topic 3.4 Chemical Analysis.
// Statements covered: 3.4.1 Purity and chromatography, 3.4.2 Identification of
// common gases, 3.4.3 Identification of ions.
//
// Applied by .freebuff/seed-oxfordaqa-9202-notes.cjs. This topic is almost entirely
// recall of observation and conclusion, so the note is built around the table of
// tests rather than around explanations.
module.exports = {
  topicSlug: "chemical-analysis",
  title: "IGCSE Chemistry (OxfordAQA): Chemical Analysis",
  html: `<h2>Chemical Analysis</h2>
<p>This topic is about finding out what a substance is without being told. Half of it is a set of tests you must know exactly — the gas tests, the flame tests, the hydroxide precipitates and the anion tests — because the examiner asks for the observation and the conclusion, and a test you half-remember produces the wrong colour and no marks. The other half is the two techniques that separate mixtures from pure substances: melting and boiling point as a measure of purity, and chromatography as a way of splitting a mixture into its components and identifying them by an Rf value. Both halves reward precision over explanation: a colour must be right, a calculation must be laid out, and the order of a test (acid first, then barium chloride) must be correct.</p>

<h3>1. What "pure" means in chemistry</h3>
<p>In everyday speech "pure" means "nothing added", which is why orange juice can be labelled pure while containing dozens of compounds. In chemistry a pure substance is a single element or a single compound, with nothing else mixed in. Pure water is H₂O and nothing else; orange juice is a mixture, however natural it is, because it contains water, sugars, acids and pigments together.</p>
<p>A mixture contains two or more substances that are not chemically joined, so it can be separated by physical means — filtration, distillation, crystallisation or chromatography — and the proportions can be anything. A compound is chemically joined, has a fixed formula, and can only be separated by a chemical reaction. That distinction is the reason a mixture has a melting <em>range</em> while a pure compound melts at one temperature.</p>
<p>Alloys are a useful test of the definition: brass is a mixture of copper and zinc, so it is not pure, even though it is a single solid material with a definite colour and it looks completely homogeneous.</p>

<h3>2. Melting and boiling points as a purity test</h3>
<p>A pure substance melts and boils at a single fixed temperature, and both values are a property of that substance. An impurity lowers the melting point and raises the boiling point, and it also spreads each one over a range, because the impurity disturbs the arrangement of particles and the substance no longer changes state all at once.</p>
<p>So the test is not just "get a number and look it up": the <em>sharpness</em> is the evidence. A sample that melts between 78.5 and 79.5 °C is almost certainly a pure substance, because that range is 1 °C wide and near the melting point of naphthalene at 80 °C; a sample that starts to soften at 70 °C and is fully liquid at 85 °C is impure, whatever its average. The value identifies the substance and the width of the range judges its purity, so two samples with different ranges are not equally pure, and the wider and lower the range, the more impurity is present.</p>
<p>Boiling point is measured the same way, and distillation uses this: a pure liquid distils at a constant temperature, so a thermometer reading that climbs during distillation is evidence that the liquid was a mixture. That is why fractional distillation can separate crude oil into fractions at all.</p>

<h3>3. Formulations and mixtures</h3>
<p>Many useful materials are deliberately mixtures, designed to have the properties no single substance has. These are called <strong>formulations</strong>, and each component is present in a measured amount: paints contain a pigment, a solvent, a binder and additives; medicines contain an active ingredient plus fillers; fertilisers contain several compounds to supply nitrogen, phosphorus and potassium together; alloys are formulated for strength or resistance to corrosion.</p>
<p>Because a formulation is a mixture, its composition can be checked by analysis rather than by a formula — the percentage by mass of each component can be measured, and a product that does not match its specification is out of specification even if every ingredient is present. The exam wording to watch for is "state why the paint is a formulation rather than a compound": the answer is that the components are mixed and not chemically combined, and each is present in a chosen proportion.</p>

<h3>4. Paper chromatography — how it separates</h3>
<p>Chromatography separates the components of a mixture by letting them travel at different speeds through a material. In paper chromatography the paper is the <strong>stationary phase</strong> (the water held in the paper fibres does most of the work) and the solvent that creeps up it is the <strong>mobile phase</strong>.</p>
<p>The method matters, because the marks are in the detail: draw a pencil line near the bottom of the paper (pencil, not pen, because ink would dissolve and run), put a small spot of the mixture on the line, and lower the paper into the solvent so that the solvent is <em>below</em> the line and the spot is not submerged. Let the solvent rise, then take the paper out and mark the solvent front before it dries.</p>
<p>A component that is strongly attracted to the stationary phase moves slowly; one that dissolves well in the mobile phase moves quickly. The result is a series of spots at different heights. If a substance is colourless, a <strong>locating agent</strong> is needed to make the spots visible — ninhydrin for amino acids, for example — which is why an "explain why a locating agent is used" question appears so often.</p>
<p>Chromatography is used to identify the dyes in an ink or a food colouring, to separate the amino acids from a protein digest, to check the purity of a drug, and in forensic work to compare a sample from a scene with a reference. In every case the identification works by comparison: the unknown's spots are compared with spots from known substances run on the same paper.</p>

<h3>5. Rf values and reading a chromatogram</h3>
<p>The position of a spot is summarised by its Rf value — the retention factor — which is the distance the spot moved divided by the distance the solvent moved:</p>
<p>Rf = distance moved by the substance ÷ distance moved by the solvent front → <em>Key:</em> both distances are measured in the same units (usually cm) from the pencil line, to the <em>centre</em> of the spot and to the solvent front; Rf has no units and is always less than 1, because nothing can travel further than the solvent.</p>
<p>The Rf value is a property of the substance <em>under those conditions</em>, which is the sentence that earns the mark. Change the solvent, the temperature or the type of paper and the value changes, so an Rf is only comparable with a reference value obtained the same way. That is why an unknown is run alongside known substances on the same sheet rather than matched against a table from a textbook.</p>
<p>Reading a chromatogram also involves counting: three spots in a vertical line means three components, and two spots at the same height means the same substance, whether the mixture is a single sample or two samples side by side.</p>

<h3>6. Worked examples — purity and chromatography</h3>
<p><strong>Example 1.</strong> On a chromatogram the solvent front is 7.8 cm above the pencil line and the centre of a spot is 4.7 cm above it. Calculate the Rf value.</p>
<p>Rf = distance moved by the substance ÷ distance moved by the solvent front = 4.7 ÷ 7.8 = 0.60. The answer has no units, and it must be below 1; a value above 1 means the distances were measured from the wrong place, usually from the bottom of the paper rather than from the pencil line.</p>
<p><strong>Example 2.</strong> A sample of a solid melts between 74 °C and 81 °C. The pure substance melts at 79 °C. State what the result shows and explain it.</p>
<p>The sample is impure. A pure substance melts sharply at a single temperature, whereas this sample melts over a range of 7 °C and starts to melt below the true value; an impurity lowers the melting point and broadens the range, so both features point the same way.</p>
<p><strong>Example 3.</strong> Why must the solvent level be below the spot when the paper is placed in the tank?</p>
<p>If the solvent covers the spot, the sample dissolves into the bulk solvent in the tank instead of travelling up the paper, so the components never separate and no chromatogram forms.</p>

<h3>7. Tests for the common gases</h3>
<p>Six gases are examined, and each has one test and one observation. Learn them as pairs, because a test without its observation scores nothing:</p>
<table border="1">
  <tr><th>Gas</th><th>Test</th><th>Positive result</th></tr>
  <tr><td>Hydrogen, H₂</td><td>Hold a lighted splint at the mouth of the tube</td><td>A squeaky pop as it burns</td></tr>
  <tr><td>Oxygen, O₂</td><td>Insert a glowing splint</td><td>The splint relights</td></tr>
  <tr><td>Carbon dioxide, CO₂</td><td>Bubble through limewater (calcium hydroxide solution)</td><td>The limewater turns milky or cloudy</td></tr>
  <tr><td>Chlorine, Cl₂</td><td>Hold damp litmus paper in the gas</td><td>The paper is bleached; the gas is pale green</td></tr>
  <tr><td>Ammonia, NH₃</td><td>Hold damp red litmus paper in the gas</td><td>The paper turns blue</td></tr>
  <tr><td>Sulfur dioxide, SO₂</td><td>Bubble through acidified potassium dichromate(VI) solution</td><td>Orange turns green</td></tr>
</table>
<p>The limewater test has a chemistry behind it, and it is worth knowing because it explains the word "milky": CO₂ + Ca(OH)₂ → CaCO₃ + H₂O → <em>Key:</em> the calcium carbonate is the white, insoluble solid that makes the solution cloudy, and it dissolves again if excess carbon dioxide is bubbled through, which is why a long bubbling can clear the liquid.</p>
<p>Two of these tests are easily confused. Chlorine bleaches damp litmus (it goes white), while ammonia turns damp <em>red</em> litmus blue; using blue litmus for chlorine and red for oxygen is the usual slip. Notice too that the litmus must be damp for both, because the gas has to dissolve to form an acid or an alkali before it can change the indicator.</p>

<h3>8. Flame tests for metal ions</h3>
<p>A clean nichrome or platinum wire is dipped in the sample and held in a non-luminous flame; the colour of the flame identifies the metal ion. The wire must be cleaned in concentrated hydrochloric acid between tests, otherwise the previous sample contaminates the next colour.</p>
<table border="1">
  <tr><th>Ion</th><th>Flame colour</th></tr>
  <tr><td>Lithium, Li⁺</td><td>Crimson (deep red)</td></tr>
  <tr><td>Sodium, Na⁺</td><td>Yellow, persistent and bright</td></tr>
  <tr><td>Potassium, K⁺</td><td>Lilac</td></tr>
  <tr><td>Calcium, Ca²⁺</td><td>Orange-red</td></tr>
  <tr><td>Copper, Cu²⁺</td><td>Green or blue-green</td></tr>
</table>
<p>Flame tests work because heating supplies energy that excites electrons; as they fall back they emit light of a wavelength characteristic of that ion. That explanation is not required at IGCSE, but it does explain the limitation: a mixture of two metal ions shows the dominant colour, so sodium's yellow can mask everything else, and a very small amount of an ion may give no visible colour at all. Flame tests are quick but not sensitive, which is exactly the gap that instrumental methods fill.</p>

<h3>9. Hydroxide precipitate tests</h3>
<p>Adding a few drops of sodium hydroxide solution to a solution of a metal salt produces an insoluble hydroxide, and the colour of that precipitate identifies several ions at once:</p>
<table border="1">
  <tr><th>Ion</th><th>Precipitate with NaOH(aq)</th><th>Behaviour in excess NaOH(aq)</th></tr>
  <tr><td>Copper(II), Cu²⁺</td><td>Blue</td><td>Insoluble</td></tr>
  <tr><td>Iron(II), Fe²⁺</td><td>Green, turning brown on standing in air</td><td>Insoluble</td></tr>
  <tr><td>Iron(III), Fe³⁺</td><td>Red-brown (rust coloured)</td><td>Insoluble</td></tr>
  <tr><td>Aluminium, Al³⁺</td><td>White</td><td>Dissolves to a colourless solution</td></tr>
  <tr><td>Zinc, Zn²⁺</td><td>White</td><td>Dissolves to a colourless solution</td></tr>
  <tr><td>Calcium, Ca²⁺</td><td>White</td><td>Insoluble</td></tr>
  <tr><td>Magnesium, Mg²⁺</td><td>White</td><td>Insoluble</td></tr>
</table>
<p>The behaviour in excess is the part students leave out and the part that carries the marks. Aluminium and zinc hydroxides are amphoteric — they dissolve in excess alkali — so a white precipitate that disappears in excess sodium hydroxide is evidence for Al³⁺ or Zn²⁺, and a white precipitate that stays is evidence for Ca²⁺ or Mg²⁺. To separate aluminium from zinc, add ammonia solution instead: the zinc hydroxide dissolves in excess ammonia, the aluminium hydroxide does not.</p>
<p>Iron(II) is worth a second look: the green precipitate is iron(II) hydroxide, and it darkens to brown because the iron(II) is oxidised to iron(III) by oxygen in the air. If a question says the precipitate "turns brown on standing", the answer is iron(II) and the explanation is oxidation, not a mistake by the student.</p>

<h3>10. Tests for anions</h3>
<p>Three anion tests cover the syllabus, and each has a required order of addition:</p>
<ul>
  <li><strong>Carbonate, CO₃²⁻:</strong> add dilute acid. If a carbonate is present, effervescence occurs and the gas turns limewater milky — the same CO₂ test as above. Nothing else in these tests fizzes with acid, so this one is a good first check.</li>
  <li><strong>Sulfate, SO₄²⁻:</strong> add dilute hydrochloric acid first, then barium chloride solution. A white precipitate of barium sulfate confirms a sulfate. The acid is added first to remove any carbonate, which would also give a white precipitate and a false positive.</li>
  <li><strong>Halides:</strong> add dilute nitric acid, then silver nitrate solution. Chloride gives a white precipitate, bromide gives cream, and iodide gives yellow. The acid removes carbonate for the same reason as above, so a white precipitate here really is silver chloride rather than a mixture of silver chloride and carbonate.</li>
</ul>
<p>To tell the halides apart with certainty, add ammonia solution: silver chloride dissolves in dilute ammonia, silver bromide only in concentrated ammonia, and silver iodide does not dissolve at all. That single extra step is often the difference between a 2-mark and a 3-mark answer.</p>

<h3>11. Putting the tests together — identifying an unknown</h3>
<p>Most exam questions give an unknown solid and a list of results, and the answer is built from them in order. Work through the observations systematically:</p>
<ol>
  <li>Colour of the solid or solution — a blue solution suggests Cu²⁺, pale green Fe²⁺, yellow or brown Fe³⁺. A colourless solution rules those out but not much else.</li>
  <li>Flame test — identifies Li⁺, Na⁺, K⁺, Ca²⁺ or Cu²⁺ even in a mixture.</li>
  <li>Hydroxide precipitate — confirms the cation and gives information the flame test cannot, especially for Al³⁺, Zn²⁺, Mg²⁺ and Fe²⁺, which have no useful flame colour.</li>
  <li>Carbonate test with acid — decides whether the anion might be a carbonate before anything else is added.</li>
  <li>Sulfate and halide tests — with the acid first in each case, so the result is not confused by a carbonate.</li>
</ol>
<p>The one modern addition in the spec is <strong>instrumental analysis</strong>, and flame emission spectroscopy is the example to know. The sample is heated in a flame and the light emitted is passed through a spectrometer, which separates it into wavelengths. Each metal ion emits a characteristic set of wavelengths, so the ion can be identified from the pattern, and the intensity of the light gives the concentration.</p>
<p>Compared with the tests above, instrumental methods are more sensitive (they detect amounts far too small to see), faster, and more accurate, and they can analyse a mixture without separating it or even without a trained eye reading a colour. The cost is the equipment, which is why a school laboratory still uses a wire and a flame.</p>

<h3>12. Worked examples — identification</h3>
<p><strong>Example 1.</strong> A white solid dissolves in water to give a colourless solution. Adding sodium hydroxide gives a white precipitate that does not dissolve in excess. Adding dilute nitric acid then silver nitrate gives a white precipitate that dissolves in dilute ammonia. Identify the solid.</p>
<p>A white precipitate with sodium hydroxide that is insoluble in excess is calcium or magnesium; the flame test would separate them, but with no flame colour reported, the anion decides the identity. The white precipitate with silver nitrate that dissolves in dilute ammonia is silver chloride, so the anion is Cl⁻. A compound of Ca²⁺ (the more common of the two in this test) with Cl⁻ gives calcium chloride, CaCl₂.</p>
<p><strong>Example 2.</strong> Three unlabelled solutions contain copper(II) sulfate, iron(II) sulfate and iron(III) sulfate. Describe one test that identifies all three.</p>
<p>Add sodium hydroxide solution to each. Copper(II) gives a blue precipitate, iron(II) gives a green precipitate that turns brown on standing, and iron(III) gives a red-brown precipitate immediately. One reagent, three colours, and the precipitates are all insoluble in excess, so the excess step is not needed here.</p>
<p><strong>Example 3.</strong> A fertiliser is suspected of containing ammonium sulfate. Explain why the sulfate test must come after the carbonate test.</p>
<p>If a carbonate were present, adding barium chloride would give a white precipitate of barium carbonate, which looks exactly like barium sulfate; adding dilute acid first destroys any carbonate, so a white precipitate afterwards can only be barium sulfate. The carbonate test is not optional housekeeping: it is what makes the sulfate result mean something.</p>

<h3>13. Exam-style questions</h3>
<ol>
  <li>State what is meant by a pure substance in chemistry, and explain why a sample that melts over a range of 8 °C is not pure. <em>Answer:</em> a pure substance is a single element or compound with nothing else mixed in; a pure substance melts at one fixed temperature, so a range of 8 °C shows an impurity is present, which lowers the melting point and spreads it over a range.</li>
  <li>Describe how paper chromatography can show that a green ink contains three dyes. <em>Answer:</em> place a spot of the ink on a pencil line near the bottom of the paper, stand the paper in a solvent with the solvent level below the spot, and let the solvent rise; the dyes travel at different speeds according to their attraction to the paper and the solvent, so three spots appear at different heights, and each can be identified by comparing its Rf value with those of known dyes run on the same paper.</li>
  <li>Give the test and the observation for carbon dioxide, and write the equation for the reaction involved. <em>Answer:</em> bubble the gas through limewater; it turns milky. CO₂ + Ca(OH)₂ → CaCO₃ + H₂O, and the white calcium carbonate is what makes it cloudy.</li>
  <li>A solution gives a white precipitate with sodium hydroxide that dissolves in excess, and no precipitate with silver nitrate. Identify the two ions that could be present and explain how to distinguish them. <em>Answer:</em> Al³⁺ or Zn²⁺, since both give a white hydroxide that is amphoteric; add ammonia solution instead, because zinc hydroxide dissolves in excess ammonia and aluminium hydroxide does not.</li>
  <li>Explain why the wire used in a flame test must be cleaned between samples. <em>Answer:</em> a trace of the previous sample would remain on the wire and give its flame colour, so the observed colour might belong to the contaminant rather than to the substance being tested.</li>
  <li>State two advantages of flame emission spectroscopy over a flame test. <em>Answer:</em> it is more sensitive, so it detects ions at concentrations too low for a visible colour; and it is more accurate and can measure concentration as well as identify the ion, whereas a flame test only gives a colour.</li>
  <li>A white solid fizzes with dilute hydrochloric acid and the gas turns limewater milky. Identify the anion and write the ionic equation for the reaction with acid. <em>Answer:</em> carbonate, CO₃²⁻; CO₃²⁻ + 2H⁺ → CO₂ + H₂O. The fizzing and the milky limewater together are the evidence, since neither observation on its own is conclusive.</li>
</ol>

<h3>14. Common mistakes</h3>
<ul>
  <li>Using the wrong litmus for a gas. Chlorine bleaches damp litmus paper; ammonia turns damp red litmus blue.</li>
  <li>Giving a test without its observation. "Bubble through limewater" scores nothing until you add "and it turns milky".</li>
  <li>Mixing the halide colours. Chloride is white, bromide cream, iodide yellow — not the other way round.</li>
  <li>Adding silver nitrate before the acid. Without the acid first, a carbonate produces a white precipitate and looks like a chloride.</li>
  <li>Forgetting the excess step in a hydroxide precipitate test, which is the only way to separate aluminium and zinc from calcium and magnesium.</li>
  <li>Measuring Rf from the bottom edge of the paper rather than from the pencil line, or to the top of the spot rather than its centre. Both give a value that is wrong and sometimes greater than 1.</li>
  <li>Saying a substance is pure because it looks uniform. Brass is uniform and is a mixture.</li>
  <li>Claiming an impurity raises the melting point. It lowers it, and raises the boiling point.</li>
</ul>

<h3>15. Exam technique for this topic</h3>
<ul>
  <li>Write tests as a pair: reagent, then observation, then conclusion. Three short sentences score three marks; "it goes cloudy" alone scores one.</li>
  <li>Give colours precisely, with the standard words: blue, green, red-brown, cream, yellow, lilac, crimson, orange-red. "Dark" or "light" is not a colour in a mark scheme.</li>
  <li>When the question says "excess", it is asking about the extra observation, not about the amount. Say whether the precipitate dissolves.</li>
  <li>In an Rf calculation, show the fraction with the words in place before substituting the numbers, and check the answer is below 1.</li>
  <li>If the data identify two possible ions, say how to tell them apart rather than guessing. A named second test is a mark; a guess is not.</li>
  <li>For "state one advantage of an instrumental method", the safe answers are sensitivity, speed, accuracy and the ability to work with very small samples.</li>
</ul>
`,
};
