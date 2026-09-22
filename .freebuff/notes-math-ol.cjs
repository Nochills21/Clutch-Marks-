// Cambridge IGCSE Mathematics 0580 (2025–2027 exams) — exam-grade lesson HTML
// for the 20 existing DB topics (exact names). Used by upgrade-notes.cjs.
module.exports = [
  {
    topic: "Number — Arithmetic and Place Value",
    spec: "1.1–1.3, 1.8 (2025–2027)",
    html: `<h2>Number — Arithmetic and Place Value</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> 1.1 integers &amp; place value; 1.2 fractions/decimals/percentages context; 1.3 powers &amp; roots; HCF/LCM.</p>

<h3>1. Types of number</h3>
<ul>
<li><strong>Integers</strong>: … −2, −1, 0, 1, 2 … <strong>Primes</strong>: exactly two factors; 2 is the only even prime; 1 is not prime.</li>
<li><strong>HCF</strong> = product of common prime factors (lowest powers); <strong>LCM</strong> = all prime factors (highest powers).</li>
</ul>
<p><strong>Example:</strong> 60 = 2²×3×5 and 84 = 2²×3×7 ⇒ HCF = 2²×3 = 12; LCM = 2²×3×5×7 = 420.</p>

<h3>2. Place value</h3>
<p>In 47 382 the digit 7 has value 7000. Rounding to significant figures: keep n digits, round using the next digit (≥5 up).</p>
<p><strong>Estimation:</strong> round inputs to 1 s.f. first — 39.2 × 5.98 ≈ 40 × 6 = 240.</p>

<h3>3. Order of operations</h3>
<p>BIDMAS. 3 + 4 × 2² = 3 + 16 = 19. Insert brackets yourself when translating words: "3 added to the product of 4 and 2²" = 3 + (4 × 2²).</p>

<h3>4. Negative numbers and calculators</h3>
<p>Bracket negatives when substituting. Know the ×10ˣ, x², √, ˣ√ and fraction keys; give answers to 3 s.f. unless told otherwise.</p>

<h3>5. Bounds (Extended)</h3>
<p>Measured to nearest u: UB = +u/2, LB = −u/2. Division p/q: max = UB<sub>p</sub> ÷ LB<sub>q</sub>.</p>
<p><strong>Example:</strong> 45 cm (nearest cm) in 6 s (nearest s): max speed = 45.5 ÷ 5.5 = 8.27 m/s (3 s.f.).</p>

<p><strong>Exam tips:</strong> show prime-factor trees for HCF/LCM; always state rounding units (3 s.f., 1 d.p.); bounds answers quote both limits.</p>`,
  },
  {
    topic: "Number — Fractions, Decimals and Percentages",
    spec: "1.2, 1.8 (2025–2027)",
    html: `<h2>Number — Fractions, Decimals and Percentages</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> conversions between fractions, decimals and percentages; percentage change; reverse percentages; compound change.</p>

<h3>1. Conversions</h3>
<p>Fraction → decimal by division; decimal → percentage ×100. Recurring decimals: let x = 0.7̄, then 10x − x = 7 ⇒ x = 7/9.</p>
<p>Compare fractions by common denominator or by converting to decimals.</p>

<h3>2. Operating on fractions</h3>
<ul>
<li>Add/subtract: common denominator. 2/3 + 1/4 = 8/12 + 3/12 = 11/12.</li>
<li>Multiply: top×top, bottom×bottom. Divide: flip and multiply — 2/3 ÷ 4/5 = 2/3 × 5/4 = 5/6.</li>
<li>Of: 3/5 of 45 = 27.</li>
</ul>

<h3>3. Percentage change</h3>
<p>change ÷ original × 100. Increase $80 by 15%: 80 × 1.15 = $92.</p>

<h3>4. Reverse percentages</h3>
<p>Original = new ÷ multiplier. "After a 20% increase a coat is $72" → 72 ÷ 1.2 = $60. "After 12% discount a phone is $440" → 440 ÷ 0.88 = $500.</p>

<h3>5. Compound change</h3>
<p>Multiplierⁿ. Simple interest I = Prt/100 vs compound P(1 + r/100)ⁿ.</p>
<p><strong>Example:</strong> $800 at 3% for 4 years → 800 × 1.03⁴ = $900.41. Successive +10% then −10% ⇒ ×0.99 (net 1% decrease).</p>

<p><strong>Exam tips:</strong> identify "increase TO" vs "increase BY"; for reverse questions divide, never subtract the percentage; quote money to 2 d.p.</p>`,
  },
  {
    topic: "Number — Ratio, Rate and Proportion",
    spec: "1.11–1.12 (2025–2027)",
    html: `<h2>Number — Ratio, Rate and Proportion</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> ratio notation, sharing, direct &amp; inverse proportion (including squares/cubes), unit rates.</p>

<h3>1. Simplifying and sharing ratios</h3>
<ul>
<li>Scale both parts by the same factor: 250 g : 0.4 kg = 250 : 400 = 5 : 8.</li>
<li>Share $200 in 3 : 5 → 8 parts → $75 : $125.</li>
<li>Part–whole: 3 : 5 ⇒ 3/8 of the total. Given one share, find others by scaling.</li>
</ul>
<p><strong>Example:</strong> A : B = 3 : 4 and B : C = 2 : 5 ⇒ A : B : C = 3 : 4 : 10 (make B equal: ×2).</p>

<h3>2. Direct proportion</h3>
<p>y = kx. Best method: find the unit value, then multiply.</p>
<p><strong>Example:</strong> 5 pens cost $3.25 → 1 pen $0.65 → 8 pens $5.20.</p>
<p>Squared/cubed proportion: y ∝ x². y = 54 when x = 3 ⇒ k = 6 ⇒ y = 6x²; at x = 5, y = 150.</p>

<h3>3. Inverse proportion</h3>
<p>y = k/x (product constant). 4 workers 6 days ⇒ 24 worker-days ⇒ 8 workers take 3 days. Square-law: y ∝ 1/x².</p>

<h3>4. Rates</h3>
<p>Unit rates (per item, per litre), exchange rates (draw the arrow to the target currency), best buys (price per unit, careful with multi-packs). Speed/density/pressure are compound-measure rates (Mensuration).</p>

<p><strong>Exam tips:</strong> write the proportional equation with k before substituting; check proportion type — "more workers, fewer days" = inverse.</p>`,
  },
  {
    topic: "Number — Indices and Standard Form",
    spec: "1.3, 1.8 (2025–2027)",
    html: `<h2>Number — Indices and Standard Form</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> index laws, negative and fractional indices, standard form arithmetic.</p>

<h3>1. Index laws</h3>
<ul>
<li>aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ</li>
<li>a⁰ = 1; a⁻ⁿ = 1/aⁿ; a^(1/n) = ⁿ√a; a^(m/n) = (ⁿ√a)ᵐ</li>
</ul>
<p><strong>Examples:</strong> 27^(2/3) = (³√27)² = 9; 5⁻² = 1/25; (2x³)² = 4x⁶.</p>

<h3>2. Standard form</h3>
<p>a × 10ⁿ with 1 ≤ a &lt; 10.</p>
<ul>
<li>47 382 = 4.7382 × 10⁴; 0.0056 = 5.6 × 10⁻³</li>
<li>Multiplication: multiply a's, add powers. Division: divide a's, subtract powers.</li>
</ul>
<p><strong>Example:</strong> (3 × 10⁵) × (4 × 10⁻²) = 12 × 10³ = 1.2 × 10⁴.</p>

<h3>3. Calculator use</h3>
<p>Use the ×10ˣ key, not 10 ^; keep working in standard form and convert at the end. Give final answers in the form asked (often 3 s.f. standard form).</p>

<h3>4. Solving index equations</h3>
<p>Match bases: 2ˣ = 32 ⇒ 2ˣ = 2⁵ ⇒ x = 5. With different bases, rewrite (8 = 2³).</p>

<p><strong>Exam tips:</strong> check a is in [1, 10) before writing standard form; in "multiply out" questions apply the power to <em>every</em> factor including coefficients.</p>`,
  },
  {
    topic: "Number — Sets",
    spec: "1.4–1.5 (2025–2027)",
    html: `<h2>Number — Sets</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> set notation, Venn diagrams, shading, universal set, subsets.</p>

<h3>1. Notation</h3>
<ul>
<li>∈ belongs to; ∉ not in; ∅ empty set; ξ (or U) universal set; n(A) = number of elements.</li>
<li>A ∩ B intersection (AND); A ∪ B union (OR); A′ complement (NOT A).</li>
<li>A ⊆ B: every element of A is in B.</li>
</ul>

<h3>2. Venn diagrams</h3>
<p>Fill the intersection first, then work outwards. Two sets: only A, both, only B, neither.</p>
<p><strong>Example:</strong> 30 students; 18 maths, 15 physics, 7 both ⇒ neither = 30 − (11 + 7 + 8) = 4.</p>

<h3>3. Shading</h3>
<p>For A ∩ B′ shade where A and outside-B overlap. (A ∪ B)′ = A′ ∩ B′ (De Morgan) — check every region.</p>

<h3>4. Regions algebra</h3>
<p>With region variables x, y, z: use the totals to form equations, e.g. n(A ∪ B) = n(A) + n(B) − n(A ∩ B).</p>

<h3>5. Probability links</h3>
<p>P(A ∪ B) = P(A) + P(B) − P(A ∩ B) — inclusion–exclusion from the diagram.</p>

<p><strong>Exam tips:</strong> "neither" sits outside both circles — subtract from the universal set last; label regions with numbers, not expressions, as you fill.</p>`,
  },
  {
    topic: "Algebra — Simplifying and Expanding",
    spec: "2.1–2.3 (2025–2027)",
    html: `<h2>Algebra — Simplifying and Expanding</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> substitution, collecting like terms, expanding brackets, factorising (common factor, quadratics, difference of two squares), algebraic fractions.</p>

<h3>1. Substitution</h3>
<p>a = 3, b = −2: 2a² − b = 2(9) + 2 = 20. Always bracket substituted negatives.</p>

<h3>2. Collecting like terms</h3>
<p>5x + 3y − 2x + y = 3x + 4y. Terms need identical letter parts (x² and x are not like terms).</p>

<h3>3. Expanding</h3>
<ul>
<li>Single: 3(2x − 5) = 6x − 15.</li>
<li>Double: (x + 3)(x − 4) = x² − x − 12 (grid or FOIL).</li>
<li>Cubic products: (x+2)³ = x³ + 6x² + 12x + 8.</li>
</ul>

<h3>4. Factorising</h3>
<ul>
<li>Common factor: 6x²y − 9xy² = 3xy(2x − 3y).</li>
<li>Quadratics: x² − 5x + 6 = (x − 2)(x − 3) (two numbers ×6, sum −5).</li>
<li>Harder: 6x² + 7x + 2 = (3x + 2)(2x + 1) — split the middle term.</li>
<li>Difference of two squares: 9x² − 25 = (3x − 5)(3x + 5).</li>
</ul>

<h3>5. Algebraic fractions</h3>
<p>Factorise top and bottom fully, then cancel: (x² − 9)/(x + 3) = (x − 3). To add, use a common denominator: 1/(x+1) + 2/(x−1) = (3x + 1)/((x+1)(x−1)).</p>

<p><strong>Exam tips:</strong> always factorise out the <em>highest</em> common factor including the number; check expansion by substituting x = 1 into both forms.</p>`,
  },
  {
    topic: "Algebra — Equations",
    spec: "2.4 (2025–2027)",
    html: `<h2>Algebra — Equations</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> linear equations, simultaneous equations, quadratic formula, completing the square, forming equations from words.</p>

<h3>1. Linear equations</h3>
<p>3(x − 2) = x + 4 → 3x − 6 = x + 4 → 2x = 10 → x = 5. With fractions, multiply through by the LCD first.</p>

<h3>2. Forming equations</h3>
<p>Translate shapes/situations: "rectangle length 3 cm more than width, perimeter 34" → 2w + 2(w + 3) = 34 → w = 7.</p>

<h3>3. Simultaneous equations</h3>
<ul>
<li>Elimination: 2x + y = 7 and x − y = 2 → add → 3x = 9 → x = 3, y = 1.</li>
<li>Substitution for linear–quadratic: substitute y = 2x into x² + y² = 20 → 5x² = 20 → x = ±2.</li>
</ul>

<h3>4. Quadratics by formula</h3>
<p>x = (−b ± √(b² − 4ac)) / 2a.</p>
<p><strong>Example:</strong> 2x² − 4x − 3 = 0 → x = (4 ± √(16 + 24))/4 = 2.58 or −0.58 (2 d.p.).</p>

<h3>5. Completing the square</h3>
<p>x² + bx + c = (x + b/2)² − (b/2)² + c. x² − 6x + 5 = (x − 3)² − 4 → minimum at (3, −4). Use for turning points and for solving when factorising fails.</p>

<p><strong>Exam tips:</strong> substitute answers back to verify; in word problems define the unknown clearly ("let w = width in cm"); give quadratic solutions to the accuracy demanded.</p>`,
  },
  {
    topic: "Algebra — Inequalities",
    spec: "2.5 (2025–2027)",
    html: `<h2>Algebra — Inequalities</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> solving linear inequalities, integer solution sets, shading regions on graphs (linear programming context).</p>

<h3>1. Solving</h3>
<p>Like equations, but <strong>reverse the sign</strong> when multiplying/dividing by a negative: −2x ≥ 6 ⇒ x ≤ −3.</p>
<p><strong>Example:</strong> 3x − 5 &lt; 2x + 1 ⇒ x &lt; 6.</p>

<h3>2. Integer solutions</h3>
<p>−1 ≤ x &lt; 4 ⇒ x ∈ {−1, 0, 1, 2, 3}. Closed endpoint for ≤/≥, open for &lt;/&gt;.</p>

<h3>3. Double inequalities</h3>
<p>Handle both sides: −3 &lt; 2x + 1 ≤ 7 → −4 &lt; 2x ≤ 6 → −2 &lt; x ≤ 3.</p>

<h3>4. Shading regions</h3>
<ul>
<li>Draw the boundary line: dashed for &lt;/&gt;, solid for ≤/≥.</li>
<li>Test a point (usually (0,0)) to pick the wanted side; shade the <em>unwanted</em> side or label the wanted region.</li>
<li>Feasible region satisfies all constraints simultaneously.</li>
</ul>
<p><strong>Example:</strong> y ≤ 2x + 1: solid line, test (0,0): 0 ≤ 1 ✓ → region containing origin.</p>

<p><strong>Exam tips:</strong> never divide by an unknown sign — move x terms first; list integer solutions inside curly brackets; state which region you shade.</p>`,
  },
  {
    topic: "Algebra — Sequences and Functions",
    spec: "2.6, 2.8 (2025–2027)",
    html: `<h2>Algebra — Sequences and Functions</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> nth term (linear &amp; quadratic), special sequences, function notation, composites, inverses.</p>

<h3>1. Linear sequences</h3>
<p>nth term = a + (n − 1)d. 5, 8, 11, … → 3n + 2. Check n = 1, 2, 3.</p>

<h3>2. Quadratic sequences</h3>
<p>Second difference = 2a → an² + bn + c. 3, 8, 15, 24 … has second difference 2 → n² + bn + c; subtract n² → 2, 4, 6, 8 → 2n; so nth term = n² + 2n.</p>

<h3>3. Special sequences</h3>
<p>Even/odd, triangular (½n(n+1)), squares, cubes, Fibonacci-type (each term = sum of previous two), geometric (×r).</p>

<h3>4. Function notation</h3>
<p>f(x) = 2x − 5: f(3) = 1. Solve f(x) = 11 → x = 8.</p>

<h3>5. Composite functions</h3>
<p>fg(x) = f(g(x)) — g first. f(x) = 2x − 5, g(x) = x²: gf(2) = g(1) = 1; fg(3) = f(9) = 13.</p>

<h3>6. Inverse functions</h3>
<p>Swap x and y, rearrange. f(x) = 2x − 5 ⇒ f⁻¹(x) = (x + 5)/2. Domain of inverse = range of original. Verify: f⁻¹(f(x)) = x.</p>

<p><strong>Exam tips:</strong> write the bracket order explicitly in composites; show the "swap and rearrange" line for inverses — answer-only scores little.</p>`,
  },
  {
    topic: "Algebra — Graphs",
    spec: "2.7 (2025–2027)",
    html: `<h2>Algebra — Graphs</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> straight lines (gradient, intercept), key curves (quadratic, cubic, reciprocal, exponential), tangents, kinematic reading.</p>

<h3>1. Straight lines</h3>
<ul>
<li>Gradient m = (y₂ − y₁)/(x₂ − x₁).</li>
<li>y = mx + c; parallel ⇒ equal m; perpendicular ⇒ m₁m₂ = −1.</li>
</ul>
<p><strong>Example:</strong> through (2, −1) parallel to y = 3x + 1: y + 1 = 3(x − 2) ⇒ y = 3x − 7.</p>

<h3>2. Drawing curves</h3>
<p>Table of values, plot, smooth curve. Parabola symmetry axis x = −b/2a. Recognise reciprocal y = 1/x (two branches) and exponential y = aˣ (through (0,1)).</p>

<h3>3. Interpreting</h3>
<ul>
<li>Roots = x-intercepts; y-intercept from x = 0.</li>
<li>Turning points of quadratics by completing the square.</li>
</ul>

<h3>4. Tangents and rates</h3>
<p>Gradient of tangent at a point = instantaneous rate: draw a large triangle, rise/run. Area under a speed–time graph = distance (trapezium estimate).</p>

<h3>5. Graphical solutions</h3>
<p>Simultaneous: intersection points. Quadratic = line: intersections give roots. Read off carefully to the accuracy allowed.</p>

<p><strong>Exam tips:</strong> quote gradients as fractions where exact; when estimating a tangent gradient, use a triangle spanning at least 4 grid squares.</p>`,
  },
  {
    topic: "Geometry — Angles and Polygons",
    spec: "3.4 + circle theorems 4.x Extended (2025–2027)",
    html: `<h2>Geometry — Angles and Polygons</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> angle facts, parallel lines, polygon angles, circle theorems (Extended).</p>

<h3>1. Core angle facts</h3>
<ul>
<li>Line 180°; point 360°; vertically opposite equal.</li>
<li>Parallel lines: corresponding (F), alternate (Z), co-interior (C, sum 180°).</li>
<li>Triangle 180°; isosceles/equilateral properties; exterior angle = sum of two remote interior angles.</li>
</ul>

<h3>2. Polygons</h3>
<p>Interior angle sum = (n − 2) × 180°. Regular polygon: exterior = 360° ÷ n; interior = 180° − exterior.</p>
<p><strong>Example:</strong> regular octagon: exterior 45°, interior 135°.</p>

<h3>3. Circle theorems (Extended)</h3>
<ol>
<li>Angle at centre = 2 × angle at circumference (same arc).</li>
<li>Angle in a semicircle = 90°.</li>
<li>Angles in the same segment are equal.</li>
<li>Cyclic quadrilateral: opposite angles sum to 180°.</li>
<li>Tangent ⊥ radius; two tangents from an external point are equal.</li>
<li>Alternate segment theorem.</li>
</ol>
<p>Quote the reason in brackets every time: "∠ACB = 62° (angles in same segment)".</p>

<h3>4. Algebra with angles</h3>
<p>Set up equations from the theorem: cyclic quad (2x + 10) + (3x − 5) = 180 ⇒ x = 35.</p>

<p><strong>Exam tips:</strong> mark every found angle on the diagram immediately; use radii to create isosceles triangles; never leave a theorem unquoted.</p>`,
  },
  {
    topic: "Geometry — Congruence and Similarity",
    spec: "3.2–3.3 (2025–2027)",
    html: `<h2>Geometry — Congruence and Similarity</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> congruence criteria, similar shapes, scale factors for length/area/volume, symmetry.</p>

<h3>1. Congruence</h3>
<p>Criteria: SSS, SAS, ASA (AAS), RHS. State the criterion used when proving triangles congruent, then transfer matching sides/angles.</p>

<h3>2. Similarity</h3>
<p>Equal angles + sides in proportion. Scale factor k = corresponding new ÷ old.</p>
<p><strong>Example:</strong> triangles with sides 4, 6, 8 and 6, 9, 12: k = 1.5.</p>

<h3>3. Length, area, volume factors</h3>
<p>Length ×k; area ×k²; volume ×k³ — including reverse problems.</p>
<p><strong>Example:</strong> volumes 250 cm³ and 2000 cm³: k³ = 8 ⇒ k = 2 ⇒ areas ×4.</p>

<h3>4. Area/volume calculations from similarity</h3>
<p>Find k from a matching length pair, then apply the right power. Watch hidden pairs (radii, heights, slants).</p>

<h3>5. Symmetry</h3>
<p>Line symmetry (reflect) and rotational symmetry order — for 2-D shapes and 3-D solids (prisms, cubes, pyramids).</p>

<p><strong>Exam tips:</strong> write the matching-vertex order in similarity statements (△ABC ~ △DEF); choose which k-power applies <em>before</em> calculating.</p>`,
  },
  {
    topic: "Mensuration — Area and Volume",
    spec: "4.1–4.4 (2025–2027)",
    html: `<h2>Mensuration — Area and Volume</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> units, perimeter/area (incl. sectors), surface area, volume of standard solids, composite shapes.</p>

<h3>1. Units</h3>
<p>1 m² = 10 000 cm²; 1 m³ = 1 000 000 cm³; 1 litre = 1000 cm³. Convert area/volume factors carefully (square/cube the length factor).</p>

<h3>2. Area</h3>
<ul>
<li>Triangle ½bh; trapezium ½(a + b)h; parallelogram bh.</li>
<li>Circle A = πr²; sector area = (θ/360)πr²; arc = (θ/360) × 2πr.</li>
<li>Composites: split, calculate, add/subtract.</li>
</ul>

<h3>3. Volume and surface area</h3>
<ul>
<li>Cuboid V = lbh; prism V = cross-section × length.</li>
<li>Cylinder V = πr²h; SA = 2πr² + 2πrh.</li>
<li>Pyramid V = ⅓ × base area × h.</li>
<li>Cone V = ⅓πr²h; SA = πr² + πrl, with l² = r² + h².</li>
<li>Sphere V = (4/3)πr³; SA = 4πr².</li>
</ul>

<h3>4. Problem solving</h3>
<p>Flow/filling: volume ÷ rate = time. Packing: divide volumes (check edge alignment). Nets for surface area: label every face before adding.</p>

<p><strong>Exam tips:</strong> keep π on the calculator until the final answer; for sector problems ask "fraction of the full circle?"; quote units in every answer.</p>`,
  },
  {
    topic: "Mensuration — Bearings and Loci",
    spec: "bearings (4.6/6 context) + 3.1 constructions (2025–2027)",
    html: `<h2>Mensuration — Bearings and Loci</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> compass bearings, scale drawings, constructions (perpendicular/angle bisectors), loci regions.</p>

<h3>1. Bearings</h3>
<ul>
<li>Measured clockwise from north; three figures: 065°, 128°, 300°.</li>
<li>Back bearing = front bearing ± 180°.</li>
<li>Draw a north line at <em>both</em> points; north lines are parallel, giving Z-angles.</li>
</ul>
<p><strong>Example:</strong> B is on bearing 070° from A → A is on bearing 250° from B.</p>

<h3>2. Scale drawings</h3>
<p>1 cm : 500 m style scales; measure, convert, and quote distances/bearings from your drawing to the accuracy allowed.</p>

<h3>3. Constructions</h3>
<ul>
<li>Perpendicular bisector of a segment: equal arcs from both ends, join the crossings.</li>
<li>Angle bisector: equal arcs from the vertex arms.</li>
<li>60° and 90° constructions with compasses; leave all arcs visible.</li>
</ul>

<h3>4. Loci</h3>
<p>Fixed distance from a point = circle; from a line = parallel lines with rounded ends; equidistant from two points = perpendicular bisector; from two lines = angle bisector.</p>
<p><strong>Example:</strong> a goat tied by a 5 m rope to a corner of a 4 m × 6 m shed: the reachable region is ¾ circle radius 5 m + two ¼ circles radius 1 m where the rope wraps.</p>

<p><strong>Exam tips:</strong> state "clockwise from north" in bearing definitions; shade/label locus regions clearly; use a ruler for construction lines too.</p>`,
  },
  {
    topic: "Transformations and Vectors",
    spec: "3.5–3.6 (2025–2027)",
    html: `<h2>Transformations and Vectors</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> reflection, rotation, translation, enlargement (incl. negative SF); vector notation, resultant, magnitude, vector geometry.</p>

<h3>1. Transformations — full descriptions</h3>
<ul>
<li><strong>Reflection</strong>: mirror line (x = 0, y = x, y = −x…).</li>
<li><strong>Rotation</strong>: centre, angle, direction (anticlockwise positive).</li>
<li><strong>Translation</strong>: column vector.</li>
<li><strong>Enlargement</strong>: centre + scale factor; negative SF inverts through the centre.</li>
</ul>
<p>"Enlargement, SF 2, centre (0, 3)" — every word earns a mark.</p>

<h3>2. Combined transformations</h3>
<p>Apply right-to-left: "reflect in y = x, then rotate 90°" — rotate the reflected image.</p>

<h3>3. Vectors</h3>
<ul>
<li>Column vector (x; y); magnitude = √(x² + y²).</li>
<li>Resultant by component addition; parallel vectors are scalar multiples.</li>
<li>Position vectors: AB = OB − OA.</li>
</ul>
<p><strong>Example:</strong> A(1, 2), B(4, 6): AB = (3; 4), |AB| = 5.</p>

<h3>4. Vector geometry</h3>
<p>Midpoint of AB = ½(a + b). Prove collinearity: show AB = k·BC (shared point). Prove parallelogram: AB = DC. Use route paths: AC = AB + BC.</p>

<p><strong>Exam tips:</strong> tracing paper is allowed for transformations; in proofs, end with a conclusion sentence ("hence A, B, C are collinear").</p>`,
  },
  {
    topic: "Trigonometry — Right-Angled Triangles",
    spec: "4.6 (2025–2027)",
    html: `<h2>Trigonometry — Right-Angled Triangles</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> SOH CAH TOA, exact values, angles of elevation/depression.</p>

<h3>1. The ratios</h3>
<p>Label sides first (opposite, adjacent, hypotenuse) with respect to the marked angle, then choose:</p>
<ul>
<li>sin θ = opp/hyp; cos θ = adj/hyp; tan θ = opp/adj.</li>
</ul>
<p><strong>Example:</strong> hyp 10, angle 35°, find opposite: x = 10 sin 35° = 5.74 (3 s.f.).</p>

<h3>2. Finding angles</h3>
<p>Use inverse keys: θ = sin⁻¹(opp/hyp). tan θ = 3/4 ⇒ θ = 36.9° (1 d.p.).</p>

<h3>3. Exact values (Extended)</h3>
<table border="1" cellpadding="6"><tr><th>θ</th><th>sin</th><th>cos</th><th>tan</th></tr>
<tr><td>30°</td><td>1/2</td><td>√3/2</td><td>√3/3</td></tr>
<tr><td>45°</td><td>√2/2</td><td>√2/2</td><td>1</td></tr>
<tr><td>60°</td><td>√3/2</td><td>1/2</td><td>√3</td></tr></table>

<h3>4. Elevation and depression</h3>
<p>Elevation: angle up from horizontal; depression: down. Both measured from the horizontal line at the observer.</p>
<p><strong>Example:</strong> tower 20 m, elevation to top 42° → horizontal distance = 20/tan 42° = 22.2 m.</p>

<h3>5. Pythagoras combinations</h3>
<p>Find a missing side with Pythagoras before applying a ratio when two sides are known instead of an angle.</p>

<p><strong>Exam tips:</strong> never round mid-calculation (keep full calculator accuracy); 3 s.f. for lengths, 1 d.p. for angles unless stated.</p>`,
  },
  {
    topic: "Trigonometry — Sine and Cosine Rules",
    spec: "4.6 Extended + bearings applications (2025–2027)",
    html: `<h2>Trigonometry — Sine and Cosine Rules</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> area formula, sine rule, cosine rule, multi-step bearing and 3-D problems (Extended).</p>

<h3>1. Area of a triangle</h3>
<p>A = ½ab sin C (C = included angle between sides a and b).</p>
<p><strong>Example:</strong> a = 8, b = 5, C = 48° → A = ½ × 8 × 5 × sin 48° = 14.8.</p>

<h3>2. Sine rule</h3>
<p>a/sin A = b/sin B = c/sin C. Use when a matching angle–side pair is known.</p>
<p><strong>Example:</strong> A = 40°, a = 7, B = 65°: b = 7 sin 65°/sin 40° = 9.98.</p>
<p>Ambiguous case: two triangles possible when finding an angle — check the obtuse option (180° − θ).</p>

<h3>3. Cosine rule</h3>
<p>a² = b² + c² − 2bc cos A. Use with two sides + included angle, or all three sides (then cos A = (b² + c² − a²)/(2bc)).</p>
<p><strong>Example:</strong> b = 7, c = 5, A = 52°: a² = 74 − 70 cos 52° = 30.9 → a = 5.56.</p>

<h3>4. Bearing problems</h3>
<p>Draw both north lines, transfer angles via parallel lines, then pick sine/cosine rule.</p>
<p><strong>Example:</strong> QP = 60 km bearing 070° from Q; QR = 45 km bearing 150°. ∠PQR = 80° → PR² = 60² + 45² − 2·60·45 cos 80° → PR = 68.4 km.</p>

<h3>5. 3-D trigonometry</h3>
<p>Identify the plane containing the required angle; use 3-D Pythagoras d² = x² + y² + z² for space diagonals; angle between a line and a plane uses the projection onto the plane.</p>

<p><strong>Exam tips:</strong> state which rule you are using and why; sketch a separate 2-D triangle for 3-D questions; answers to 3 s.f. / bearings as three digits.</p>`,
  },
  {
    topic: "Statistics — Data Handling",
    spec: "5.2–5.4 (2025–2027)",
    html: `<h2>Statistics — Data Handling</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> averages from lists and tables, quartiles/IQR, charts, cumulative frequency, histograms.</p>

<h3>1. Averages</h3>
<ul>
<li>Mean = Σfx/Σf from frequency tables. Median = middle value (ordered data). Mode = most frequent. Range = max − min.</li>
<li>Choose the best average: mode for shoe sizes, median when outliers distort the mean.</li>
</ul>
<p><strong>Example (table):</strong> goals 0,1,2,3 with f 5,8,4,3: mean = (0+8+8+9)/20 = 1.25.</p>

<h3>2. Quartiles and IQR</h3>
<p>Q₁ at n/4, Q₃ at 3n/4 (position); IQR = Q₃ − Q₁ — less affected by outliers than the range.</p>

<h3>3. Charts</h3>
<p>Bar charts, pie charts (angle = fraction × 360°), time series, pictograms. Compare data sets with like-for-like totals; comment on trends.</p>

<h3>4. Cumulative frequency</h3>
<p>Running totals vs upper class boundaries; the curve ends at (max, n). Median at n/2; Q₁/Q₃ at n/4 and 3n/4; box plot from the five-figure summary.</p>

<h3>5. Histograms</h3>
<p>Bar <em>area</em> ∝ frequency: FD = frequency ÷ class width. Recover frequencies as FD × width; unequal widths need FDs on the axis.</p>

<p><strong>Exam tips:</strong> read cumulative-frequency answers with dashed construction lines; always compare spreads, not just averages, when asked to compare data.</p>`,
  },
  {
    topic: "Statistics — Probability",
    spec: "5.1 (2025–2027)",
    html: `<h2>Statistics — Probability</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> probability scale, combined events, tree diagrams, conditional probability, relative frequency.</p>

<h3>1. Basics</h3>
<p>P(event) = favourable/total; 0 ≤ P ≤ 1; P(not A) = 1 − P(A). Probabilities of a complete set sum to 1 — use to find a missing probability.</p>

<h3>2. Combined events</h3>
<ul>
<li>Independent: P(A and B) = P(A) × P(B).</li>
<li>Mutually exclusive: P(A or B) = P(A) + P(B).</li>
<li>With replacement ⇒ independent; without replacement ⇒ denominators shrink.</li>
</ul>
<p><strong>Example:</strong> bag 4 red, 6 blue; two draws without replacement: P(both red) = 4/10 × 3/9 = 2/15.</p>

<h3>3. Tree diagrams</h3>
<p>Multiply along branches; add between outcome paths. Label end products like 4/10 × 6/9 = 4/15.</p>

<h3>4. Conditional probability</h3>
<p>P(A|B) = P(A ∩ B)/P(B). From tree diagrams it is the "given the first branch happened" re-weighting.</p>

<h3>5. Relative frequency (experimental)</h3>
<p>Relative frequency = successes ÷ trials. More trials → closer to theoretical probability; compare with expected counts (n × P).</p>

<p><strong>Exam tips:</strong> always reduce fractions for final answers; in tree diagrams write the multiplication line before the product — that is where the marks are.</p>`,
  },
  {
    topic: "Scatter Diagrams and Correlation",
    spec: "5.5 (2025–2027)",
    html: `<h2>Scatter Diagrams and Correlation</h2>
<p><strong>Cambridge IGCSE 0580 (2025–2027):</strong> scatter diagrams, types of correlation, line of best fit, interpolation vs extrapolation.</p>

<h3>1. Correlation types</h3>
<ul>
<li><strong>Positive</strong>: both increase (revision time vs score).</li>
<li><strong>Negative</strong>: one increases, other decreases (price vs demand).</li>
<li><strong>No correlation</strong>: random scatter.</li>
<li>Strength: strong (tight to a line) vs weak (loose).</li>
</ul>

<h3>2. Line of best fit</h3>
<p>Balance points either side of the line; it need not pass through the origin. Use two well-separated points <em>on your line</em> (not necessarily data points) to estimate its gradient and equation.</p>
<p><strong>Example:</strong> line through (10, 24) and (50, 60): m = 36/40 = 0.9 → y = 0.9x + 15.</p>

<h3>3. Using the line</h3>
<p><strong>Interpolation</strong> (inside the data range) is reliable; <strong>extrapolation</strong> (outside) is a risk — say so if asked.</p>

<h3>4. Correlation ≠ causation</h3>
<p>A third factor may drive both variables (ice-cream sales and drownings both rise with temperature). Describe relationships, don't over-claim.</p>

<h3>5. Outliers</h3>
<p>Points far from the trend: identify, and comment on their effect on the line; ignore them when drawing the best fit if instructed.</p>

<p><strong>Exam tips:</strong> describe correlation in full ("strong positive linear correlation"); quote the equation only from two points on the drawn line, not raw data.</p>`,
  },
];
