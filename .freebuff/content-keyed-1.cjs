// Keyed-equation sheets, batch 1 of 6. Each section is appended to an existing
// note (content = content || section), so nothing already in the note is touched.
// Every equation below is quoted from that note's own body and carries its
// <em>Key:</em> line in the same paragraph.
module.exports = {
  minEquations: 3,
  sections: {
    "821d977f-fba2-4db9-a316-ac617721233b": {
      slug: "organisation-of-the-organism/OL",
      html: `
<h2>Equations and symbols</h2>
<p>The magnification triangle in words, the unit ladder, and the two direction-of-use forms. Paper 6 gives you two of the three quantities and marks the conversion line as much as the arithmetic.</p>
<p><strong>magnification = size of image divided by size of real object</strong> <em>Key:</em> magnification = how many times larger the image is (×, no unit); size of image = length measured on the drawing or micrograph (mm); size of real object = the true length of the specimen (µm). Both lengths must be in the same unit before dividing.</p>
<p><strong>real size = image size divided by magnification</strong> <em>Key:</em> real size = the specimen's true length (µm or mm, whichever the question asks for); image size = the measured length on the page; magnification = the × value printed on the micrograph. This is the rearrangement used when the micrograph gives ×20 000 and you must name the organelle.</p>
<p><strong>image size = real size × magnification</strong> <em>Key:</em> image size = the length your drawing must be (convert to mm for a ruler); real size = the specimen's true length; magnification = the required drawing magnification. A draw-at-×1500 instruction is this line and a conversion, nothing more.</p>
<p><strong>magnification = drawing width (mm) ÷ real width (mm)</strong> <em>Key:</em> drawing width = your own pencil drawing, measured with a ruler (mm); real width = the specimen's true width (mm, so divide a µm value by 1000 first). This is the form that earns the "calculate the magnification of your drawing" mark.</p>
<p><strong>1 millimetre (mm) = 1000 micrometres (µm)</strong> <em>Key:</em> the first step of the unit ladder; multiply by 1000 to go down, divide by 1000 to go up. A 40 mm image is 40 × 1000 = 40 000 µm, and only then may it be divided by a real size in µm.</p>
<p><strong>1 µm = 1000 nanometres (nm)</strong> <em>Key:</em> the second rung, used for organelles: a ribosome at 20 nm is 0.02 µm, which is why a light microscope cannot resolve it. Writing a bacterium's size in nm when the question asked for µm is the commonest unit slip on this topic.</p>
`,
    },
    "d4916dc4-4e6b-46f3-a59f-3f6372af80e8": {
      slug: "respiration/OL",
      html: `
<h2>Equations and symbols</h2>
<p>The three equations of respiration and the one calculation behind the respirometer. Arrow means "is converted into"; the state symbols are not required at IGCSE, but the balancing is.</p>
<p><strong>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O</strong> <em>Key:</em> C₆H₁₂O₆ = glucose, one molecule; O₂ = oxygen, six molecules; CO₂ = carbon dioxide; H₂O = water. Count the atoms before you write it: 6 carbon, 12 hydrogen and 18 oxygen on each side.</p>
<p><strong>C₆H₁₂O₆ → 2C₃H₆O₃</strong> <em>Key:</em> C₃H₆O₃ = lactic acid, two molecules from one glucose; no oxygen appears on either side, which is what makes this the anaerobic equation of muscle. The energy released is small and is not shown as a product — write "energy transferred to ATP" in words.</p>
<p><strong>C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂</strong> <em>Key:</em> C₂H₅OH = ethanol; CO₂ = carbon dioxide, which is what raises bread dough and shows as bubbles in yeast experiments. Plants and yeast use this route; animals never do, because they cannot excrete ethanol.</p>
<p><strong>volume = π × radius² × distance</strong> <em>Key:</em> volume = oxygen taken up (cm³); π = 3.14; radius = internal radius of the capillary bore (cm, so 0.5 mm becomes 0.05 cm); distance = how far the coloured drop moved (cm). The area of the bore times the distance travelled is the volume, and dividing by the time gives a rate.</p>
<p><strong>11 ÷ 10 = 1.1 mm/min and 3 ÷ 10 = 0.3 mm/min</strong> <em>Key:</em> 11 mm and 3 mm are the control-corrected distances the drop moved at 25 °C and at 15 °C; 10 is the time in minutes; the quotients are rates of oxygen uptake. Their ratio, 1.1 ÷ 0.3 ≈ 3.7, is the comparison the question wants, and the dead-seed control is what makes both numbers trustworthy.</p>
`,
    },
    "fe7f71d3-15f5-4c6c-836a-351016c8bf63": {
      slug: "molecules-transport-and-health/AS",
      html: `
<h2>Equations and symbols</h2>
<p>This topic is a set of quantitative relations about surfaces, hearts and data. Each one is a definition, so the mark is for writing it before substituting.</p>
<p><strong>rate of diffusion = (surface area × concentration difference) / thickness of the surface</strong> <em>Key:</em> rate of diffusion = amount crossing per unit time (arbitrary units or mol s⁻¹); surface area = area available for exchange (m²); concentration difference = the gradient between the two sides (mol dm⁻³ or arbitrary units); thickness = diffusion distance (m or µm, kept consistent). Fick's law is why an alveolus is thin and folded: halve the thickness and you double the rate.</p>
<p><strong>cardiac output = heart rate × stroke volume</strong> <em>Key:</em> cardiac output = volume pumped per minute (cm³ min⁻¹ or dm³ min⁻¹); heart rate = beats per minute; stroke volume = volume ejected per beat (cm³). Convert both to the same volume unit before multiplying, and state the unit of the answer.</p>
<p><strong>BMI = mass (kg) / height (m) squared</strong> <em>Key:</em> BMI = body mass index (kg m⁻²); mass in kilograms, not pounds; height in metres, not centimetres. A person of 70 kg and 1.75 m has BMI = 70/3.06 = 22.9.</p>
<p><strong>standard error = standard deviation divided by the square root of n</strong> <em>Key:</em> standard error = the precision of the mean (same unit as the measurement); standard deviation = spread of the individual values; n = number of measurements. It shrinks as √n, so quadrupling the sample only halves the error.</p>
<p><strong>percentage error = uncertainty divided by the measured value, times 100</strong> <em>Key:</em> uncertainty = half the smallest division of the instrument (or the stated tolerance); measured value = the reading itself. Quote it as a percentage of the reading, not of the range.</p>
<p><strong>t = (36 − 14) / sqrt(2.5 / 5 + 2.7 / 5)</strong> <em>Key:</em> the numerator is the difference of the two means (stomata per field); each 2.5 and 2.7 is a variance (standard deviation squared); each 5 is that sample's n. Compare the result with the critical value at n₁ + n₂ − 2 degrees of freedom before you say "significant".</p>
`,
    },
    "eb9a809a-a086-4f98-b365-670ae0c8f7aa": {
      slug: "coordination-response-and-gene-technology/A2",
      html: `
<h2>Equations and symbols</h2>
<p>Two kinds of relation appear in this topic: the arrow path of a nervous response, and the quantitative work of the respirometer. Both are mark-scheme shapes, so write them as they stand.</p>
<p><strong>stimulus → receptor → sensory neurone → CNS (relay neurone) → motor neurone → effector → response</strong> <em>Key:</em> each arrow is one link, and a missing link loses the mark; effector = muscle or gland; response = contraction or secretion. The arrow means "is transmitted to", not "causes", so the order is the whole answer.</p>
<p><strong>RQ = CO₂ released ÷ O₂ consumed</strong> <em>Key:</em> RQ = respiratory quotient (no units, because both are volumes over the same period); CO₂ released and O₂ consumed in cm³ or dm³. A carbohydrate gives 1.0, a fat about 0.7, a protein about 0.8 — the value identifies the substrate, which is what the question asks for.</p>
<p><strong>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O</strong> <em>Key:</em> one glucose molecule needs six oxygen molecules and gives six of each product. For this substrate RQ = 6 ÷ 6 = 1.0, the arithmetic that follows from the coefficients.</p>
<p><strong>Volume = area times distance = 0.00785 times 2.8 = 0.0220 cm³ of oxygen in 30 minutes</strong> <em>Key:</em> 0.00785 cm² is the bore's cross-sectional area, from π times the radius squared with radius 0.05 cm; 2.8 cm is the control-corrected movement of the drop. Scale to a rate by dividing by the time in minutes and, if the question asks per gram, by the mass of seeds.</p>
<p><strong>3.14 times 0.05 squared = 3.14 times 0.0025 = 0.00785 cm²</strong> <em>Key:</em> π taken as 3.14; 0.05 cm = 0.5 mm, the internal radius of the capillary; the answer is an area, so the unit is cm². Squaring the radius before multiplying is the step students skip.</p>
`,
    },
    "c0b1214f-49b8-4fbe-99e6-7087b28873d8": {
      slug: "the-periodic-table/OL",
      html: `
<h2>Equations and symbols</h2>
<p>The reactions that carry the trends: Group I with water, and the halogen displacement series. Each one is evidence for a reactivity trend, so name the trend when you write the equation.</p>
<p><strong>2Na + 2H₂O → 2NaOH + H₂</strong> <em>Key:</em> Na = sodium (Group I metal); H₂O = water; NaOH = sodium hydroxide, an alkaline solution; H₂ = hydrogen gas, seen as fizz. Sodium floats, melts into a ball and moves — the observations belong in the same answer as the equation.</p>
<p><strong>2K + 2H₂O → 2KOH + H₂</strong> <em>Key:</em> K = potassium; KOH = potassium hydroxide; the reaction is faster and more exothermic than sodium's, and the hydrogen usually ignites with a lilac flame. Same equation shape, more vigorous — that is the trend down Group I.</p>
<p><strong>2Li + 2H₂O → 2LiOH + H₂</strong> <em>Key:</em> Li = lithium; LiOH = lithium hydroxide; lithium fizzes steadily and does not usually melt, because it is the least reactive of the three. Reading the three equations in order is the exam answer to "describe the trend".</p>
<p><strong>Cl₂(aq) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)</strong> <em>Key:</em> Cl₂ = chlorine, the more reactive halogen; KBr = potassium bromide; KCl = potassium chloride; Br₂ = bromine, which colours the solution orange-brown. Chlorine displaces bromide because it is higher in Group VII, which is the definition of the trend.</p>
<p><strong>Cl₂(aq) + 2KI(aq) → 2KCl(aq) + I₂(aq)</strong> <em>Key:</em> KI = potassium iodide; I₂ = iodine, giving a brown solution (or a dark solid with starch present). Chlorine displaces both bromide and iodide; bromine displaces only iodide, which is why the series is an order and not a list.</p>
<p><strong>Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(aq)</strong> <em>Key:</em> bromine is above iodine in Group VII, so this reaction goes; the reverse — Br₂ + 2KCl — does not. A displacement that "does not happen" is still worth writing, because it is the evidence for the order.</p>
`,
    },
    "32080d0c-9637-493b-89c2-989ec33a3ce0": {
      slug: "atomic-structure-and-the-periodic-table/AS",
      html: `
<h2>Equations and symbols</h2>
<p>The three counting relations and the one average that defines relative atomic mass. Every mass-spectrum question is these four lines.</p>
<p><strong>Neutrons = mass number − atomic number</strong> <em>Key:</em> neutrons = number of neutrons in the nucleus (no unit); mass number = protons + neutrons, the bigger of the two numbers in the symbol; atomic number = protons, which fixes the element. For ³⁵Cl: 35 − 17 = 18 neutrons.</p>
<p><strong>Electrons = protons minus positive charge, or plus negative charge</strong> <em>Key:</em> electrons = number of electrons in the ion (no unit); protons = atomic number; the charge term is the ion's charge in units of e. Mg²⁺ has 12 − 2 = 10 electrons; Cl⁻ has 17 + 1 = 18.</p>
<p><strong>Formula for relative atomic mass = sum of (isotopic mass × relative abundance) ÷ total abundance</strong> <em>Key:</em> relative atomic mass = the weighted mean mass of the atoms on the ¹²C scale (no unit); isotopic mass = mass number of each isotope; relative abundance = its percentage or fraction; total abundance = 100 for percentages. Weigh by abundance, never take a simple mean.</p>
<p><strong>((24 × 78.99) + (25 × 10.00) + (26 × 11.01)) ÷ 100 = 24.3</strong> <em>Key:</em> 78.99, 10.00 and 11.01 are the percentage abundances of ²⁴Mg, ²⁵Mg and ²⁶Mg; the divisor 100 is the total abundance. Quote to one decimal place when the data is given to two, which is what the mark scheme accepts.</p>
<p><strong>(35 × 75 + 37 × 25) ÷ 100 = 35.5</strong> <em>Key:</em> chlorine's two isotopes at 75% and 25%; the answer sits between them, nearer 35 because that isotope is commoner. If an answer falls outside the range of the isotopes, the arithmetic is wrong — a fast check worth doing every time.</p>
`,
    },
    "f2928fb1-9785-4216-b895-2ecbb103a554": {
      slug: "redox-chemistry-and-groups-1-2-and-7/AS",
      html: `
<h2>Equations and symbols</h2>
<p>Half-equations, neutralisations, thermal decompositions and the two identifying tests — the equations that turn observations into marks in this topic.</p>
<p><strong>Mg → Mg²⁺ + 2e⁻</strong> <em>Key:</em> Mg = magnesium atom; Mg²⁺ = magnesium ion; e⁻ = electron lost. Oxidation is loss of electrons, so the electrons sit on the right. Charge balances: 0 on the left, +2 − 2 = 0 on the right.</p>
<p><strong>Cl₂ + 2e⁻ → 2Cl⁻</strong> <em>Key:</em> Cl₂ = chlorine molecule; each chlorine atom gains one electron; 2Cl⁻ = two chloride ions. Reduction is gain of electrons, so the electrons sit on the left. Adding the two half-equations gives the overall redox equation.</p>
<p><strong>Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O</strong> <em>Key:</em> Cr₂O₇²⁻ = dichromate(VI), the oxidising agent, orange; Cr³⁺ = chromium(III), green; H⁺ = acid, needed because the half-equation is written in acid solution. Check charge: −2 + 14 − 6 = +6 on the left, 2(+3) = +6 on the right.</p>
<p><strong>Cr₂O₇²⁻ + 6Fe²⁺ + 14H⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O</strong> <em>Key:</em> Fe²⁺ = iron(II), the reducing agent; Fe³⁺ = iron(III). The 6 in front of Fe²⁺ is the ratio from the half-equations, and it is the number a titration calculation depends on.</p>
<p><strong>MCO₃ → MO + CO₂</strong> <em>Key:</em> M = any Group 2 metal; MCO₃ = the carbonate; MO = the oxide; CO₂ = carbon dioxide, which turns limewater milky. Group 2 carbonates need strong heating; Group 1 carbonates are more stable.</p>
<p><strong>Ba²⁺ + SO₄²⁻ → BaSO₄</strong> <em>Key:</em> Ba²⁺ = barium ion from acidified barium chloride; SO₄²⁻ = sulfate ion; BaSO₄ = the white precipitate that identifies a sulfate. The acid is there to dissolve any carbonate or sulfite that would also give a white solid.</p>
<p><strong>CO₃²⁻ + 2H⁺ → H₂O + CO₂</strong> <em>Key:</em> CO₃²⁻ = carbonate; H⁺ = dilute acid; CO₂ = the gas that turns limewater milky, distinguishing a carbonate from a sulfate. Hydrogencarbonate gives the same observation with half the acid.</p>
<p><strong>concentration in mol dm⁻³ = moles ÷ volume in dm³</strong> <em>Key:</em> moles = amount of solute (mol); volume must be in dm³, so divide cm³ by 1000 first. To convert to g dm⁻³ multiply by the molar mass — the step the question usually asks for next.</p>
`,
    },
    "46db98e1-090c-40c6-9384-85e1a37f3cbe": {
      slug: "organic-carbonyls-carboxylic-acids-and-chirality/A2",
      html: `
<h2>Equations and symbols</h2>
<p>The addition reaction, the two analytical relations that this topic is examined on, and the rule that predicts splitting. Mechanisms are drawn, not written, but these lines carry the marks that are typed.</p>
<p><strong>RCHO + HCN → RCN</strong> <em>Key:</em> R = the rest of the chain; CHO = the aldehyde carbonyl group; HCN = hydrogen cyanide, the nucleophile source (KCN is added to raise the cyanide concentration); RCN = the cyanohydrin product, which has a new C–C bond and a new chiral centre. Ketones react the same way but give a product with two different R groups.</p>
<p><strong>Rf = (distance travelled by spot) ÷ (distance travelled by solvent front)</strong> <em>Key:</em> Rf = retention factor, a ratio between 0 and 1 with no units; both distances measured from the same baseline, in the same units (cm or mm). A ratio cannot exceed 1, so an answer above 1 means the distances were measured from different origins.</p>
<p><strong>Rf = 3.5 ÷ 8.4 = 0.42</strong> <em>Key:</em> 3.5 cm = distance moved by the spot; 8.4 cm = distance moved by the solvent front; 0.42 is the Rf, quoted to two significant figures because the ruler reads to a millimetre. Rf is characteristic of a compound in a given solvent, which is how chromatography identifies it.</p>
<p><strong>3 + 1 = 4</strong> <em>Key:</em> the (n + 1) rule: n = number of non-equivalent protons on the adjacent carbon (here the CH₃ of ethanol, so 3); the answer 4 is the number of peaks in the multiplet, a quartet. Protons on the same carbon do not split each other, and OH protons usually exchange too fast to split at all.</p>
`,
    },
    "11594218-4521-43d6-bccd-fb79cda469b4": {
      slug: "networking-communication/OL",
      html: `
<h2>Equations and symbols</h2>
<p>The two calculations this topic is examined on — transfer time and error detection — plus the unit ladder they depend on. Write the conversion line first; it carries a mark of its own.</p>
<p><strong>45 MB = 45 × 8 = 360 megabits</strong> <em>Key:</em> MB = megabytes (file size); megabits = the unit of data used with a transfer rate in Mbit/s; the factor 8 is bits per byte. Rates are quoted in bits, sizes are usually given in bytes, so this conversion is unavoidable.</p>
<p><strong>360 / 8 = 45 seconds</strong> <em>Key:</em> 360 megabits = the file size after conversion; 8 = the transfer rate in Mbit/s; the answer is a time in seconds. Time = data ÷ rate, and both must be in the same unit — the single commonest lost mark on this question.</p>
<p><strong>12 MB = 96 megabits (12 × 8)</strong> <em>Key:</em> 12 MB file; 96 megabits; note the capital B for bytes and the lower-case b for bits, because 12 Mb is an eighth of 12 MB. Then 96 ÷ 4 = 24 seconds at 4 Mbit/s.</p>
<p><strong>25 + 47 + 12 = 84</strong> <em>Key:</em> the three data bytes (25, 47, 12) summed to give the checksum byte 84, which is transmitted with them. The receiver repeats the sum; a mismatch means a transmission error, though a checksum cannot locate which byte is wrong.</p>
<p><strong>Count the 1-bits: 0+1+1+0+1+0+1+1 = 5 ones (odd)</strong> <em>Key:</em> the eight bits of the byte, and the parity scheme agreed in advance — even parity requires an even number of 1s, so the parity bit is set to make the total even. Parity detects an odd number of flipped bits and misses an even number, which is the limitation worth quoting.</p>
`,
    },
    "45b10674-ff18-4672-8046-5a67a308f50a": {
      slug: "computational-thinking-and-programming/AS",
      html: `
<h2>Equations and symbols</h2>
<p>A trace is arithmetic on variables, so the lines that matter here are the accumulators and the mean. Every one is quoted from the note's own worked example.</p>
<p><strong>total = 0.0</strong> <em>Key:</em> total = an accumulator that will hold the running sum; 0.0 is a float, so the sum stays floating point and does not silently truncate. Initialising before the loop is what stops the first iteration adding to garbage.</p>
<p><strong>count = 0</strong> <em>Key:</em> count = the number of values read so far (an integer). It is incremented by 1 per iteration, which is what makes the mean a running calculation rather than a second pass over the data.</p>
<p><strong>value = float(line)</strong> <em>Key:</em> line = one line of text from the file (a string); float() converts it to a number so arithmetic is possible; value = the converted number. A non-numeric line raises ValueError, which is why a validation step belongs here.</p>
<p><strong>print("mean =", total / count)</strong> <em>Key:</em> total / count = the mean; total is the float accumulator and count the number of values, so the result is a float. Dividing by zero when the file is empty is the edge case the note's guard exists for.</p>
<p><strong>mark = 72 → 72&gt;=70 true → "Distinction"</strong> <em>Key:</em> the left-hand assignment sets the value under test; each comparison is one selection branch, evaluated in order; the arrow points at the output the branch produces. Tracing a table like this, one row per iteration, is how a four-mark trace question is answered.</p>
`,
    },
    "662f1c89-d99a-45eb-b539-3b51d4bae55c": {
      slug: "prepositions-and-collocations/IGCSE",
      html: `
<h2>Equations and symbols</h2>
<p>For a grammar topic the "equation" is a mapping rule: a type of time or place on the left, the preposition on the right. Learn the mapping, not the translation — the same four rules answer every gap-fill.</p>
<p><strong>day → on Monday</strong> <em>Key:</em> left = the category the target belongs to (a named day or date); right = the preposition that category always takes. Collocation, not logic: there is no reason "on" belongs to a day, only that English fixed it that way.</p>
<p><strong>clock time → at 9 am</strong> <em>Key:</em> left = a point in time, including at noon, at night, at the weekend (BrE); right = the preposition for points. Change the category and the preposition changes, which is why the decision comes before the word.</p>
<p><strong>part of the day → in the morning</strong> <em>Key:</em> left = an enclosed period (morning, afternoon, evening, month, year, season); right = "in". The exception worth memorising is "at night", the one part of the day that behaves like a point.</p>
<p><strong>month → in May</strong> <em>Key:</em> left = a month or year; right = "in", because the period encloses the event. Compare "in May" with "on 3 May", where naming the day moves the target into the day category.</p>
<p><strong>keen on (adjective collocation) → on</strong> <em>Key:</em> left = the adjective and the preposition it is fixed to (keen on, good at, interested in, worried about); right = the preposition to retrieve. The word after the gap is what tells you which pair you are in — read it before you choose.</p>
`,
    },
    "74521159-f61f-4fad-920f-9df01e850ec5": {
      slug: "reading-for-information-and-inference/IGCSE",
      html: `
<h2>Equations and symbols</h2>
<p>Reading answers are built from three fixed chains. Writing them out as arrows is not decoration: it is the order the mark scheme rewards, and each arrow is one sentence of your answer.</p>
<p><strong>quote briefly → name the method → explain the effect → link to the writer's purpose</strong> <em>Key:</em> quote = a word or short phrase, not a paragraph; method = the named feature (verb choice, metaphor, sentence length); effect = what the reader now thinks or feels; purpose = why the writer wanted that. Four arrows, four marks, in this order.</p>
<p><strong>evidence → literal → inference</strong> <em>Key:</em> evidence = the words from the passage; literal = what they state outright; inference = what they imply, which must be a step beyond the literal or it earns nothing. Two arrows of inference is the difference between a 1-mark and a 3-mark response.</p>
<p><strong>He shares his food with someone he does not know.</strong> <em>Key:</em> the model of a literal answer: own words, no quotation, no interpretation. Answer what happens, then in the next sentence say what it suggests — mixing the two loses the "own words" mark.</p>
<p><strong>short sentences + dark imagery → tension or menace</strong> <em>Key:</em> left = the two features to look for; right = the effect they are conventionally used for. Say which feature produced which part of the effect rather than quoting the pair as a formula.</p>
<p><strong>"she counted the minutes" → she is anxious or impatient</strong> <em>Key:</em> left = the action the character performs; right = the feeling it implies. The arrow is the inference step, and the mark is for making it explicitly, not for spotting the quotation.</p>
`,
    },
    "7798ea37-c64d-4cc6-a474-c55584ee86a7": {
      slug: "number-fractions-decimals-and-percentages/OL",
      html: `
<h2>Equations and symbols</h2>
<p>The conversion cycle in one place: fraction ↔ decimal ↔ percentage, the multiplier that handles every percentage change, and the mixed-number rule. Non-calculator Paper 2 lives on these.</p>
<p><strong>Fraction to decimal: divide.  3/8 = 3 ÷ 8 = 0.375</strong> <em>Key:</em> the line means "a fraction is a division"; the numerator is divided by the denominator. Terminating here because 8 has only 2 as a prime factor; a denominator with any other prime gives a recurring decimal.</p>
<p><strong>Fraction to percentage: divide, then multiply by 100.  3/8 = 0.375 = 37.5%</strong> <em>Key:</em> the decimal comes first, then ×100 moves the point two places; the % sign replaces the "per hundred" you multiplied by. Reversing it, divide by 100 and simplify.</p>
<p><strong>Percentage to fraction: write over 100 and simplify.  45% = 45/100 = 9/20</strong> <em>Key:</em> percent means "per hundred", so the denominator is 100 before simplifying; cancel by the highest common factor, 5 here. Leaving 45/100 is a lost mark in a "give your answer as a fraction in its simplest form" question.</p>
<p><strong>2 3/5 = (2 × 5 + 3)/5 = 13/5</strong> <em>Key:</em> the whole-number part (2) is multiplied by the denominator (5), the numerator (3) is added, and the result goes over the same denominator. This is the step needed before multiplying or dividing mixed numbers.</p>
<p><strong>the new value is 135% of the old, so multiply by 1.35:  1.35 × 240 = 324</strong> <em>Key:</em> 1.35 is the multiplier for an increase of 35% (100% + 35%, as a decimal); 240 is the original. The multiplier chains: 0.8 × 0.8 = 0.64 is not a 40% discount but a 36% one, which is the trap this line exists to close.</p>
<p><strong>18/60 × 100 = 30%</strong> <em>Key:</em> 18 = the part; 60 = the whole; ×100 turns the fraction into a percentage. "18 out of 60" and "18 as a percentage of 60" are the same question, and the fraction is always part ÷ whole.</p>
`,
    },
    "6103544a-0080-4c85-af53-ddbb12284c25": {
      slug: "transformations-and-vectors/OL",
      html: `
<h2>Equations and symbols</h2>
<p>Every transformation is a coordinate map, and every vector is a column pair. Learn the four rotation maps and the two vector rules, and the topic is arithmetic.</p>
<p><strong>90 ° clockwise about O: (x, y) → (y, -x)</strong> <em>Key:</em> (x, y) = the original coordinates; the arrow points to the image's coordinates; O = the origin, the fixed centre. Anticlockwise is the same map with the signs reversed — write the centre down, because a rotation about any other point is not this formula.</p>
<p><strong>180 °: (x, y) → (-x, -y)</strong> <em>Key:</em> both coordinates change sign; a half-turn is the only rotation that is also a translation-free "point reflection" in the origin. Check with a point on an axis, where one coordinate stays zero.</p>
<p><strong>reflection in y = x swaps the coordinates: (3, 5) → (5, 3)</strong> <em>Key:</em> the line y = x is the mirror; swapping means the image of (x, y) is (y, x). The line is the perpendicular bisector of the segment joining each point to its image, which is the definition to quote.</p>
<p><strong>(1, 1) → (5, -1)</strong> <em>Key:</em> left = a vertex of the object; right = the matching vertex of the image. Subtract to read off the translation: 5 − 1 = 4 across and −1 − 1 = −2 down, so the column vector is (4; −2).</p>
<p><strong>(3, 1) → (1, -3)</strong> <em>Key:</em> this is a 90° clockwise turn about the origin applied to a second vertex — the same map, different numbers. With two vertices mapped you can describe the transformation fully rather than guessing from one.</p>
`,
    },
    "1da2d645-3b35-4626-9a02-59685e70c60a": {
      slug: "proof/AS",
      html: `
<h2>Equations and symbols</h2>
<p>The algebraic moves that carry a P1 proof. Each line is a rewrite of one expression, so the marks are for the factorisation at the end, not the expansion.</p>
<p><strong>sum = 4n + 4 = 4(n + 1)</strong> <em>Key:</em> sum = the combined expression from two consecutive even numbers; 4n + 4 is the unsimplified result; 4(n + 1) is the form that proves divisibility by 4. Always finish in the "k × integer" shape the question names.</p>
<p><strong>product = 4mn + 2m + 2n + 1 = 2(2mn + m + n) + 1</strong> <em>Key:</em> m, n = integers, so 2m + 1 and 2n + 1 are the two odd numbers; the final form is 2k + 1 with k = 2mn + m + n, which is the definition of odd. The factorisation, not the arithmetic, is the proof.</p>
<p><strong>(n + 1)² - n² = n² + 2n + 1 - n² = 2n + 1 = n + (n + 1)</strong> <em>Key:</em> the difference of consecutive squares; the result is the sum of the same two numbers, which is the identity being proved. Two independent routes to 2n + 1 is stronger than one.</p>
<p><strong>n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)</strong> <em>Key:</em> three consecutive integers; the middle term is n + 1, so the sum is three times the middle. The last form proves divisibility by 3 for every n without testing any value.</p>
<p><strong>let x = 2n + 1</strong> <em>Key:</em> the standard opening for an odd number; n is an integer, so 2n is even and 2n + 1 is odd. State "for some integer n" — the clause is part of the proof, not decoration.</p>
`,
    },
    "e1a3c834-71a5-46c5-87e6-4700be5beeb8": {
      slug: "binomial-distribution/A2",
      html: `
<h2>Equations and symbols</h2>
<p>The distribution, its conditions and the four tail identities. Every question on this topic is one of these lines plus a calculator.</p>
<p><strong>P(X = r) = nCr p^r (1 - p)^(n - r)</strong> <em>Key:</em> n = number of trials, fixed in advance; p = probability of success in one trial, constant; r = the number of successes asked for; nCr = n!/(r!(n − r)!), the number of orders the successes can occur in. The (1 − p) term is the failures, and its power must be n − r.</p>
<p><strong>X ~ B(n, p)</strong> <em>Key:</em> X = the count of successes; the tilde means "is distributed as"; n and p as above. Write this line before calculating — it is often a mark on its own, and it fixes which parameters go into the calculator.</p>
<p><strong>P = 10C3 (0.3)³ (0.7)⁷</strong> <em>Key:</em> n = 10, p = 0.3, r = 3, so the failures are 7 and their probability is 0.7. The coefficient 10C3 = 120 accounts for the order of the three successes among the ten trials.</p>
<p><strong>P(X &gt;= r) = 1 - P(X &lt;= r - 1)</strong> <em>Key:</em> a complement, so the two probabilities add to 1; the boundary moves by one because the binomial is discrete. Using 1 − P(X ≤ r) instead is the classic off-by-one error.</p>
<p><strong>P(a &lt;= X &lt;= b) = P(X &lt;= b) - P(X &lt;= a - 1)</strong> <em>Key:</em> subtract the part below the interval; again the "− 1" is there because P(X ≤ a − 1) is everything before a. Check with a small case you can list by hand before trusting the calculator.</p>
`,
    },
    "f8fe66ce-4d84-4329-9cb4-7dd7fc8825a1": {
      slug: "proof/A2",
      html: `
<h2>Equations and symbols</h2>
<p>The chain of a contradiction proof and the two algebraic identities that close most A2 proofs. Each arrow is a step whose justification is a sentence of your answer.</p>
<p><strong>2q² = p², so p² is even, so p is even: p = 2k</strong> <em>Key:</em> p, q = integers with no common factor, assumed at the start; q² = the square of the denominator; k = an integer, so 2k is the definition of even. The last implication uses the fact that only an even number has an even square — quote it, because it is a step.</p>
<p><strong>4k² = 2q²  →  q² = 2k², so q is even</strong> <em>Key:</em> substituting p = 2k into p² = 2q²; dividing by 2 gives the second equation; q even contradicts "no common factor", which is the finish. Without the contradiction sentence the proof is incomplete.</p>
<p><strong>assume √(2) = p/q in lowest terms, p and q integers</strong> <em>Key:</em> the assumption being negated; "lowest terms" is what makes the contradiction bite, so it must be written. For x² = 6 the divisor argument runs the same way with 3 in place of 2.</p>
<p><strong>n³ - n = n(n - 1)(n + 1), three consecutive integers</strong> <em>Key:</em> n = any integer; the product of three consecutive integers always contains a multiple of 2 and a multiple of 3, so it is divisible by 6. The factorisation is the proof; testing n = 1, 2, 3 is not.</p>
<p><strong>(2n + 3)² - (2n + 1)² = (4n² + 12n + 9) - (4n² + 4n + 1) = 8n + 8</strong> <em>Key:</em> n = integer; 2n + 1 and 2n + 3 are consecutive odd numbers; 8n + 8 = 8(n + 1) proves the difference is always a multiple of 8. Expanding both squares and subtracting is faster and safer than the difference-of-squares identity here.</p>
<p><strong>2n(2n + 2) = 4n(n + 1); n(n + 1) is even, so the product is 8k</strong> <em>Key:</em> the product of two consecutive even numbers; the 4 outside times the even n(n + 1) gives 4 × 2k = 8k. The proof is the observation that one of any two consecutive integers is even.</p>
`,
    },
    "025cde37-5b9f-4913-bf5c-b8b4d99007af": {
      slug: "waves/AS",
      html: `
<h2>Equations and symbols</h2>
<p>Four relations carry the whole topic: the wave equation, its two rearrangements, the intensity laws and the Doppler shift. Every calculation in the note is one of these with numbers in.</p>
<p><strong>v = f λ</strong> <em>Key:</em> v = wave speed (m s⁻¹); f = frequency (Hz); λ = wavelength (m). In one period the wave advances one wavelength, which is where the relation comes from — quote that if asked to derive it.</p>
<p><strong>f = 1/T</strong> <em>Key:</em> f = frequency (Hz, oscillations per second); T = period (s, seconds per oscillation); the two are reciprocals. A period of 0.004 s is 250 Hz, and every graph-reading question passes through this line.</p>
<p><strong>λ = vT</strong> <em>Key:</em> λ = wavelength (m); v = wave speed (m s⁻¹); T = period (s). Identical in substance to v = fλ, but it is the form that uses a period read straight off a time trace.</p>
<p><strong>I = P/A</strong> <em>Key:</em> I = intensity (W m⁻²); P = power delivered by the source (W); A = area the power passes through (m²), taken perpendicular to the direction of travel. Intensity is power per unit area, so a larger area means a smaller intensity for the same source.</p>
<p><strong>I = P/(4 π r²)</strong> <em>Key:</em> r = distance from a point source (m); 4πr² = the surface area of the sphere the power has spread over; I falls with the inverse square of distance. Double the distance and the intensity quarters — the check that catches most arithmetic slips.</p>
<p><strong>I ∝ A²</strong> <em>Key:</em> I = intensity (W m⁻²); A = amplitude of the oscillation (m); the symbol ∝ means "is proportional to", so doubling the amplitude quadruples the intensity. Intensity depends on amplitude squared, never on amplitude.</p>
<p><strong>f' = f v/(v - v_s)</strong> <em>Key:</em> f' = observed frequency (Hz); f = emitted frequency (Hz); v = speed of sound in the medium (m s⁻¹); v_s = speed of the source (m s⁻¹), with the minus sign for approach. An approaching source compresses the wavefronts, so the observed frequency is higher — the sign follows from that, not from memory.</p>
`,
    },
  },
};
