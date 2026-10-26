// Mathematics AS notes, deepened to the depth bar — Trigonometry (1.5),
// Sequences and Series (1.6), Differentiation (1.7) and Integration (1.8).
// Edexcel IAL Mathematics P1 (YMA01).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-as-b-depth.cjs > .freebuff-tmp/math-as-b.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-as-b.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-as-b.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "9b34477c-27c5-4eb8-9a65-e4fb425f5edc": "AS Level Mathematics: Trigonometry",
    "4c83eff4-82e2-473c-83a2-dc959f0ca347": "AS Level Mathematics: Sequences and Series",
    "edbbedae-7847-4852-a895-44af0d0b57d5": "AS Level Mathematics: Differentiation",
    "3bc168f1-4a43-4e2f-9954-2f256539800e": "AS Level Mathematics: Integration",
  },
  rows: {
    "9b34477c-27c5-4eb8-9a65-e4fb425f5edc": `
<h2>AS Level Mathematics: Trigonometry</h2>
<p>Trigonometry at AS level extends the triangle ratios of IGCSE into functions of any angle: the sine and cosine waves that model tides, sound and alternating current, the identities that let you simplify expressions and solve equations, and the sine and cosine rules that handle triangles without a right angle. This note builds the whole topic from zero: the graphs and their properties, exact values, the two core identities, the interval method for solving equations, the sine/cosine rules with the ambiguous case, and transformations of trigonometric graphs. Radian answers are expected wherever the question uses radians.</p>

<h3>The three graphs and their properties</h3>
<table border="1" cellpadding="6">
<tr><th>Function</th><th>Period</th><th>Range</th><th>Key features</th></tr>
<tr><td>sin θ</td><td>360° (2π)</td><td>−1 to 1</td><td>0 at 0°, 180°, 360°; maximum at 90°</td></tr>
<tr><td>cos θ</td><td>360° (2π)</td><td>−1 to 1</td><td>1 at 0°; 0 at 90°, 270°</td></tr>
<tr><td>tan θ</td><td>180° (π)</td><td>all real values</td><td>0 at 0°, 180°; asymptotes at 90°, 270°</td></tr>
</table>
<p>The graphs encode the symmetries the papers test: sin(180° − θ) = sin θ, cos(−θ) = cos θ, sin(−θ) = −sin θ, tan(180° + θ) = tan θ. A quick sketch of the relevant wave inside the required interval solves most equation problems before any algebra.</p>
<p><strong>Worked example.</strong> Sketch y = sin x for 0 ≤ x ≤ 360° and mark where sin x = 0.5.</p>
<pre><code>the sine wave crosses 0.5 on its rising part at x = 30 deg\nand on its falling part at x = 150 deg (symmetry about 90 deg)\nsolutions in the interval: x = 30, 150</code></pre>

<h3>Exact values</h3>
<p>The exact values come from two special triangles and must be known in both degrees and radians:</p>
<table border="1" cellpadding="6">
<tr><th>Angle</th><th>sin</th><th>cos</th><th>tan</th></tr>
<tr><td>30° = π/6</td><td>1/2</td><td>√3/2</td><td>1/√3</td></tr>
<tr><td>45° = π/4</td><td>1/√2</td><td>1/√2</td><td>1</td></tr>
<tr><td>60° = π/3</td><td>√3/2</td><td>1/2</td><td>√3</td></tr>
</table>
<p>Beyond the first quadrant, use the symmetry rules with the reference angle: sin 150° = sin 30° = ½; cos 240° = −cos 60° = −½; tan 135° = −tan 45° = −1. The quadrant sign pattern ("CAST" or a sketch) decides the sign.</p>
<p><strong>Worked example.</strong> Find the exact value of cos 300°.</p>
<pre><code>300 deg is in the fourth quadrant; reference angle 60 deg\ncos is positive in the fourth quadrant: cos 300 = cos 60 = 1/2</code></pre>

<h3>The two identities</h3>
<pre><code>sin^2(theta) + cos^2(theta) = 1\ntan(theta) = sin(theta)/cos(theta)     (cos theta not 0)\n\nuseful rearrangements:\nsin^2 = 1 - cos^2;  cos^2 = 1 - sin^2\n1 + tan^2 = sec^2 (beyond AS but built from the same identity)</code></pre>
<p><strong>Worked example 1 (simplify).</strong> Simplify (1 − cos²θ)/sin θ.</p>
<pre><code>1 - cos^2 = sin^2\nsin^2/sin = sin theta   (theta not a multiple of 180 deg)</code></pre>
<p><strong>Worked example 2 (prove).</strong> Prove that (sin θ + cos θ)² = 1 + 2 sin θ cos θ.</p>
<pre><code>expand: sin^2 + 2 sin cos + cos^2\nrearrange: (sin^2 + cos^2) + 2 sin cos = 1 + 2 sin cos</code></pre>
<p><strong>Worked example 3 (solve with the identity).</strong> Solve 2 sin²θ + cos θ = 2 for 0 ≤ θ ≤ 360°.</p>
<pre><code>replace sin^2 = 1 - cos^2:\n2(1 - cos^2) + cos = 2\n2 - 2cos^2 + cos = 2  ->  -2cos^2 + cos = 0\ncos(1 - 2cos) = 0  ->  cos = 0 or cos = 1/2\ncos = 0: theta = 90, 270\ncos = 1/2: theta = 60, 300</code></pre>

<h3>Solving trigonometric equations in an interval</h3>
<p>The method that never misses solutions: find the principal value, then use the symmetry of the wave to generate every solution in the interval.</p>
<ol>
<li>Isolate the trigonometric part (use identities if needed).</li>
<li>Find the principal value with the inverse function.</li>
<li>Use the symmetries: for sin, solutions are θ and 180° − θ (plus 360° steps); for cos, θ and 360° − θ; for tan, θ + 180° steps.</li>
<li>Check every solution lies in the stated interval, and count them.</li>
</ol>
<p><strong>Worked example.</strong> Solve cos 2x = 0.5 for 0 ≤ x ≤ 360°.</p>
<pre><code>let u = 2x, so 0 <= u <= 720\ncos u = 0.5  ->  u = 60, 300, 420, 660\nx = 30, 150, 210, 330</code></pre>
<p>The doubled-angle trap: the interval for u doubles too. Expand the interval whenever the argument is multiplied.</p>
<p><strong>Worked example 2 (shifted).</strong> Solve sin(x − 30°) = 0.6 for 0 ≤ x ≤ 360°.</p>
<pre><code>u = x - 30, so -30 <= u <= 330\nsin u = 0.6  ->  u = 36.9 or 143.1\nx = 66.9 or 173.1</code></pre>

<h3>The sine and cosine rules</h3>
<pre><code>sine rule: a/sin A = b/sin B = c/sin C\ncosine rule: a^2 = b^2 + c^2 - 2bc cos A\narea of a triangle: (1/2) a b sin C</code></pre>
<p>How to choose: two sides and a non-included angle (SSA) or two angles and a side (AAS) use the sine rule; three sides (SSS) or two sides and the included angle (SAS) use the cosine rule. The area formula uses two sides and the included angle.</p>
<p><strong>Worked example 1 (cosine rule).</strong> A triangle has sides 8 cm, 11 cm and an included angle of 60°. Find the third side and the area.</p>
<pre><code>a^2 = 8^2 + 11^2 - 2(8)(11)cos 60\n    = 64 + 121 - 176(0.5) = 185 - 88 = 97\na = 9.85 cm\narea = (1/2)(8)(11) sin 60 = 44 x 0.866 = 38.1 cm2</code></pre>
<p><strong>Worked example 2 (sine rule).</strong> In a triangle, angle A = 40°, side a = 7 cm, side b = 10 cm. Find angle B.</p>
<pre><code>sin B / b = sin A / a\nsin B = b sin A / a = 10 x 0.643/7 = 0.918\nB = 66.7 deg or B = 113.3 deg (ambiguous case)</code></pre>

<h3>The ambiguous case</h3>
<p>When you know two sides and a non-included angle, the sine rule can produce two valid triangles: angle B could be 66.7° or its supplement 113.3°. Both satisfy the sine rule, and the question must be read to decide which is intended — often a given angle sum rules one out, or the diagram shows an obtuse angle. State both and choose, with a reason.</p>
<p><strong>Worked example.</strong> In the triangle above, find the two possible values of angle C and side c.</p>
<pre><code>if B = 66.7: C = 180 - 40 - 66.7 = 73.3 deg\n  c/sin 73.3 = 7/sin 40  ->  c = 7 x 0.958/0.643 = 10.4 cm\nif B = 113.3: C = 26.7 deg\n  c = 7 x 0.449/0.643 = 4.89 cm</code></pre>

<h3>Transformations of trigonometric graphs</h3>
<pre><code>y = a sin(bx + c) + d\namplitude = |a|;  period = 360/b (or 2 pi/b)\nphase shift = -c/b;  vertical shift = d</code></pre>
<p><strong>Worked example.</strong> State the amplitude, period and range of y = 3 sin 2x + 1.</p>
<pre><code>amplitude 3; period 360/2 = 180 deg\nrange: 3 sin 2x ranges -3 to 3, so y ranges 1 - 3 = -2 to 4</code></pre>
<p><strong>Worked example 2 (phase).</strong> Describe the transformation y = sin(x + 45°).</p>
<pre><code>a translation of 45 deg to the left (inside the bracket, so the\nshift is opposite in sign to the constant)</code></pre>

<h3>Worked examples: applied trigonometry</h3>
<p><strong>Worked example.</strong> A ship sails 30 km on a bearing of 040°, then 20 km on a bearing of 130°. Find its distance and bearing from the start.</p>
<pre><code>the two legs are 90 deg apart (130 - 40), so resolve into east and north\nleg 1: east 30 sin 40 = 19.28;  north 30 cos 40 = 22.98\nleg 2: east 20 sin 130 = 15.32;  north 20 cos 130 = -12.86\ntotal: east 34.60;  north 10.12\ndistance = sqrt(34.60^2 + 10.12^2) = sqrt(1197.2 + 102.4) = 36.1 km\nbearing: tan(theta) = 34.60/10.12 = 3.419  ->  theta = 73.7 deg\n(measured from north towards east)  ->  bearing 074 deg</code></pre>
<p>The component method works for any number of legs; the cosine rule on the included angle is quicker only for exactly two. Either way, bearings are measured clockwise from north at every stage, never from the previous heading.</p>

<h3>Radians, arc length and sector area</h3>
<p>Radian measure is the natural unit for the trigonometric functions: one radian is the angle subtended at the centre of a circle by an arc equal in length to the radius, and a full turn is 2π radians. The conversions and the two circle formulas are used constantly in P1:</p>
<pre><code>pi radians = 180 deg;  1 radian = 57.3 deg
arc length s = r theta  (theta in radians)
sector area = (1/2) r^2 theta
segment area = sector area - triangle area</code></pre>
<p><strong>Worked example.</strong> A sector has radius 6 cm and angle 2 radians. Find its arc length, perimeter and area.</p>
<pre><code>arc = 6 x 2 = 12 cm
perimeter = 12 + 6 + 6 = 24 cm
area = (1/2)(36)(2) = 36 cm2</code></pre>
<p><strong>Worked example 2 (segment).</strong> Find the area of the segment cut off by a chord subtending 1.2 radians in a circle of radius 5 cm.</p>
<pre><code>sector = (1/2)(25)(1.2) = 15 cm2
triangle = (1/2)(5)(5) sin 1.2 = 12.5 x 0.932 = 11.65 cm2
segment = 15 - 11.65 = 3.35 cm2</code></pre>
<p>The radian formulas only work in radians; in degrees the arc length is (θ/360)2πr and the sector area (θ/360)πr². Mixing the two is a silent error that costs the accuracy mark.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Exact)</strong> Find sin 240° exactly. <em>Answer:</em> third quadrant, reference 60°: −√3/2.</li>
<li><strong>(Identity)</strong> Simplify sin²θ/(1 − sin²θ). <em>Answer:</em> sin²θ/cos²θ = tan²θ.</li>
<li><strong>(Solve)</strong> Solve tan θ = 1 for 0 ≤ θ ≤ 360°. <em>Answer:</em> θ = 45°, 225°.</li>
<li><strong>(Solve with identity)</strong> Solve 3 cos²θ = sin²θ for 0 ≤ θ ≤ 360°. <em>Answer:</em> 3cos² = 1 − cos² → cos² = ¼ → cos = ±½ → θ = 60°, 120°, 240°, 300°.</li>
<li><strong>(Cosine rule)</strong> Sides 5 cm and 7 cm with included angle 120°. Find the third side. <em>Answer:</em> a² = 25 + 49 − 70(−0.5) = 109 → a = 10.4 cm.</li>
<li><strong>(Sine rule)</strong> A = 35°, B = 80°, a = 9 cm. Find b. <em>Answer:</em> b = 9 sin 80/sin 35 = 9 × 0.985/0.574 = 15.4 cm.</li>
<li><strong>(Area)</strong> Find the area of a triangle with sides 6 cm and 9 cm and included angle 50°. <em>Answer:</em> ½ × 54 × sin 50 = 20.7 cm².</li>
<li><strong>(Graph)</strong> State the period and amplitude of y = 4 cos 3x. <em>Answer:</em> period 120°, amplitude 4.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Losing solutions:</strong> an equation often has more than one solution in the interval; use the symmetry rules or sketch the wave. The commonest mark loss in this topic.</li>
<li><strong>Not expanding the interval:</strong> for sin 2x over 0 ≤ x ≤ 360°, the argument runs to 720°; solutions are lost without that.</li>
<li><strong>Degree/radian mode:</strong> the question's units decide the calculator mode; a radian interval (0 to 2π) needs RAD.</li>
<li><strong>Wrong rule:</strong> sine rule for AAS/SSA, cosine rule for SAS/SSS; using the sine rule on SAS fails silently.</li>
<li><strong>Forgetting the ambiguous case:</strong> SSA can give two triangles; state both and justify the choice.</li>
<li><strong>Identity rearrangement slips:</strong> sin² = 1 − cos², not cos² − 1. Sign errors here propagate through the whole solution.</li>
<li><strong>Amplitude and period:</strong> y = a sin bx has amplitude |a| and period 360/b; the b is not an amplitude.</li>
<li><strong>Rounding mid-solution:</strong> keep full accuracy until the final answer; angles to 1 d.p. unless told otherwise.</li>
</ul>
`,
    "4c83eff4-82e2-473c-83a2-dc959f0ca347": `
<h2>AS Level Mathematics: Sequences and Series</h2>
<p>A sequence is an ordered list of numbers generated by a rule; a series is the sum of a sequence. Two families dominate the syllabus: arithmetic (add a constant each time) and geometric (multiply by a constant each time). This note builds the topic from zero: the nth term and sum formulas for both families with derivations, sigma notation, recurrence relations, the convergence condition for geometric series, and the applied problems — savings, depreciation, loans — where the formulas earn marks. Every formula is derived once so it can be rebuilt if forgotten.</p>

<h3>Arithmetic sequences</h3>
<pre><code>nth term: u_n = a + (n - 1)d\nsum of n terms: S_n = (n/2)[2a + (n - 1)d] = (n/2)(first + last)\n\na = first term, d = common difference</code></pre>
<p><strong>Worked example.</strong> An arithmetic sequence has first term 5 and common difference 4. Find the 20th term and the sum of the first 20 terms.</p>
<pre><code>u_20 = 5 + 19 x 4 = 81\nS_20 = (20/2)(5 + 81) = 10 x 86 = 860</code></pre>
<p><strong>Worked example 2 (working backwards).</strong> The 5th term is 17 and the 12th is 45. Find a and d.</p>
<pre><code>u_5: a + 4d = 17\nu_12: a + 11d = 45\nsubtract: 7d = 28  ->  d = 4;  a = 17 - 16 = 1</code></pre>

<h3>Arithmetic series and the sum formula</h3>
<p>The sum formula is Gauss's trick: pair the first and last terms, the second and second-last, and so on; each pair has the same total, and there are n/2 pairs.</p>
<p><strong>Worked example.</strong> Find the sum of the first 50 positive even numbers.</p>
<pre><code>a = 2, d = 2, n = 50\nlast term = 2 + 49 x 2 = 100\nS = (50/2)(2 + 100) = 25 x 102 = 2550</code></pre>
<p><strong>Worked example 2 (unknown n).</strong> The sum of the first n terms of 3, 7, 11, ... is 210. Find n.</p>
<pre><code>210 = (n/2)[6 + 4(n - 1)] = (n/2)(4n + 2) = 2n^2 + n\n2n^2 + n - 210 = 0\n(2n + 21)(n - 10) = 0  ->  n = 10 (n must be positive)</code></pre>

<h3>Geometric sequences</h3>
<pre><code>nth term: u_n = a r^(n - 1)\nsum of n terms: S_n = a(1 - r^n)/(1 - r)   (r not 1)\nsum to infinity: S_inf = a/(1 - r)   (only if |r| < 1)\n\na = first term, r = common ratio</code></pre>
<p><strong>Worked example.</strong> A geometric sequence has a = 3 and r = 2. Find the 8th term and the sum of the first 8 terms.</p>
<pre><code>u_8 = 3 x 2^7 = 384\nS_8 = 3(1 - 2^8)/(1 - 2) = 3(1 - 256)/(-1) = 765</code></pre>
<p><strong>Worked example 2 (working backwards).</strong> A geometric sequence has second term 12 and fifth term 96. Find r and a.</p>
<pre><code>u_2 = ar = 12;  u_5 = ar^4 = 96\ndivide: r^3 = 8  ->  r = 2;  a = 6</code></pre>

<h3>Sum to infinity and convergence</h3>
<p>A geometric series converges only when the ratio has magnitude less than 1: each term is smaller than the last, and the total approaches a finite limit.</p>
<pre><code>if |r| < 1: S_inf = a/(1 - r)\nif |r| >= 1: the series diverges (no finite sum)</code></pre>
<p><strong>Worked example.</strong> Find the sum to infinity of 8 + 4 + 2 + 1 + ...</p>
<pre><code>a = 8, r = 1/2\nS_inf = 8/(1 - 1/2) = 8/(0.5) = 16</code></pre>
<p><strong>Worked example 2 (recurring decimal).</strong> Write 0.444... as a fraction using a geometric series.</p>
<pre><code>0.444... = 0.4 + 0.04 + 0.004 + ...\na = 0.4, r = 0.1\nS_inf = 0.4/(1 - 0.1) = 0.4/0.9 = 4/9</code></pre>

<h3>Sigma notation and recurrence relations</h3>
<pre><code>sum from k = 1 to n of u_k  (sigma notation)\n\nrecurrence: u_(n+1) = f(u_n), with the first term given</code></pre>
<p><strong>Worked example (sigma).</strong> Evaluate the sum from k = 1 to 5 of (3k + 1).</p>
<pre><code>terms: 4, 7, 10, 13, 16 (arithmetic, a = 4, d = 3)\nS = (5/2)(4 + 16) = 50</code></pre>
<p><strong>Worked example 2 (recurrence).</strong> u₁ = 2, u_(n+1) = 3u_n + 1. Find u₄.</p>
<pre><code>u2 = 3(2) + 1 = 7\nu3 = 3(7) + 1 = 22\nu4 = 3(22) + 1 = 67</code></pre>
<p>Recurrence questions often ask you to prove a sequence is arithmetic or geometric: compute consecutive differences or ratios and show they are constant.</p>

<h3>Applied problems</h3>
<p><strong>Worked example (savings).</strong> A student saves 50 pounds in month 1 and increases the monthly saving by 10 pounds each month. How much is saved in month 12, and in total over the year?</p>
<pre><code>arithmetic: a = 50, d = 10\nu_12 = 50 + 11(10) = 160\nS_12 = (12/2)(50 + 160) = 6 x 210 = 1260 pounds</code></pre>
<p><strong>Worked example 2 (depreciation).</strong> A car worth 18000 pounds loses 15% of its value each year. Find its value after 5 years and the total loss.</p>
<pre><code>geometric: a = 18000, r = 0.85\nvalue after 5 years = 18000 x 0.85^5 = 18000 x 0.4437 = 7987 pounds\nloss = 18000 - 7987 = 10013 pounds</code></pre>
<p><strong>Worked example 3 (interest).</strong> 1000 pounds is invested at 4% compound interest. Find the value after 10 years and the total interest.</p>
<pre><code>value = 1000 x 1.04^10 = 1000 x 1.4802 = 1480.24 pounds\ninterest = 480.24 pounds</code></pre>

<h3>Deriving the sum formulas</h3>
<p>Knowing where the formulas come from makes them reconstructable under pressure. Write the arithmetic sum forwards and backwards and add:</p>
<pre><code>S = a + (a + d) + ... + [a + (n - 1)d]
S = [a + (n - 1)d] + ... + a
2S = n[2a + (n - 1)d]  (each of the n columns adds to 2a + (n-1)d)
S = (n/2)[2a + (n - 1)d]</code></pre>
<p>The geometric sum is derived by multiplying by r and subtracting, which cancels every intermediate term:</p>
<pre><code>S = a + ar + ar^2 + ... + ar^(n-1)
rS = ar + ar^2 + ... + ar^n
S - rS = a - ar^n  ->  S(1 - r) = a(1 - r^n)
S = a(1 - r^n)/(1 - r)   (r not 1)</code></pre>
<p>Letting n grow in the geometric formula, rⁿ → 0 whenever |r| &lt; 1, leaving S∞ = a/(1 − r): the same derivation explains convergence, so the condition is not a separate fact to memorise.</p>

<h3>Proving a sequence is arithmetic or geometric</h3>
<p>Show the consecutive differences or ratios are constant using algebra, not just numbers.</p>
<p><strong>Worked example.</strong> The terms of a sequence are 3, 3 + 2k, 3 + 4k, ... Show it is arithmetic and find the sum of the first 10 terms in terms of k.</p>
<pre><code>difference 1: (3 + 2k) - 3 = 2k
difference 2: (3 + 4k) - (3 + 2k) = 2k
constant difference 2k  ->  arithmetic with d = 2k
S_10 = (10/2)[2(3) + 9(2k)] = 5(6 + 18k) = 30 + 90k</code></pre>
<p><strong>Worked example 2 (geometric).</strong> Show that 2, 2x, 2x², ... is geometric and find the sum to infinity when x = 1/3.</p>
<pre><code>ratio: 2x/2 = x;  2x^2/(2x) = x  ->  geometric with r = x
with x = 1/3: S_inf = 2/(1 - 1/3) = 3</code></pre>

<h3>Combining and interpreting sequences</h3>
<p>Some questions give a sequence defined by a rule that is neither purely arithmetic nor geometric, and ask for specific terms or a sum found by splitting it into two familiar parts.</p>
<p><strong>Worked example.</strong> Find the sum of the first 20 terms of the sequence whose nth term is 3n + 2ⁿ.</p>
<pre><code>split: arithmetic part 3n (a = 3, d = 3) and geometric part 2^n (a = 2, r = 2)
arithmetic sum: (20/2)[6 + 19 x 3] = 10 x 63 = 630
geometric sum: 2(2^20 - 1)/(2 - 1) = 2(1048576 - 1) = 2097150
total = 630 + 2097150 = 2097780</code></pre>
<p><strong>Worked example 2 (loan style).</strong> A student repays a 5000 pound debt in monthly instalments that form an arithmetic sequence: 150 pounds in month 1, rising by 20 pounds each month. After how many months is the debt cleared, and what is the final instalment?</p>
<pre><code>S_n = (n/2)[2(150) + (n - 1)(20)] = 5000
(n/2)(300 + 20n - 20) = 5000
n(280 + 20n) = 10000
20n^2 + 280n - 10000 = 0  ->  n^2 + 14n - 500 = 0
n = [-14 + sqrt(196 + 2000)]/2 = (-14 + 46.86)/2 = 16.4
so 17 instalments are needed; the 17th clears the remainder
final (17th) instalment = 150 + 16(20) = 470 pounds</code></pre>
<p>Two modelling habits earn marks here: round n up (16 instalments leave the debt short) and state what the final, part-full payment means. Reading a plan for feasibility — does the sum actually reach the target? — is also examinable: an arithmetic sum with a negative difference peaks and then falls, so a repayment plan built that way may never clear the debt.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Arithmetic)</strong> Find the 15th term of 7, 11, 15, ... <em>Answer:</em> a = 7, d = 4; u₁₅ = 7 + 14(4) = 63.</li>
<li><strong>(Sum)</strong> Find the sum of the first 30 terms of 2, 5, 8, ... <em>Answer:</em> d = 3; S = 15(4 + 87) = 1365.</li>
<li><strong>(Geometric)</strong> Find the 6th term of 2, 6, 18, ... <em>Answer:</em> r = 3; u₆ = 2 × 3⁵ = 486.</li>
<li><strong>(Sum to infinity)</strong> Find S∞ for 12 + 6 + 3 + ... <em>Answer:</em> r = ½; S∞ = 12/(1 − ½) = 24.</li>
<li><strong>(Convergence)</strong> For what values of r does a geometric series converge? <em>Answer:</em> |r| &lt; 1.</li>
<li><strong>(Recurrence)</strong> u₁ = 5, u_(n+1) = 2u_n − 3. Find u₃. <em>Answer:</em> u₂ = 7, u₃ = 11.</li>
<li><strong>(Reverse)</strong> The 3rd term of an arithmetic sequence is 11 and the 8th is 31. Find a and d. <em>Answer:</em> 5d = 20 → d = 4; a = 3.</li>
<li><strong>(Applied)</strong> A ball is dropped from 2 m and rebounds to 60% of its height each bounce. Find the total distance travelled before it stops. <em>Answer:</em> down 2; up/down 2(0.6) twice... total = 2 + 2(2×0.6)/(1−0.6) = 2 + 6 = 8 m.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>n − 1 versus n:</strong> the nth term uses (n − 1)d, not nd. Off-by-one errors are the commonest in this topic.</li>
<li><strong>Count versus term:</strong> "sum of the first 20 terms" means n = 20; "the 20th term" means u₂₀. Read which is asked.</li>
<li><strong>Sign of r:</strong> a negative ratio alternates signs; the convergence condition uses |r|, so r = −0.5 converges.</li>
<li><strong>Sum to infinity misused:</strong> S∞ exists only for |r| &lt; 1; quoting it for a divergent series is a conceptual mark lost.</li>
<li><strong>Depreciation versus interest:</strong> depreciation multiplies by (1 − rate); interest by (1 + rate). Getting the factor wrong inverts the answer.</li>
<li><strong>Solving for n:</strong> the quadratic in n has one positive integer root; reject the negative or fractional value explicitly.</li>
<li><strong>Recurrence notation:</strong> u_(n+1) means the next term; substituting the wrong index shifts the whole sequence.</li>
<li><strong>Exact form:</strong> where a question asks for an exact answer, keep fractions and powers; decimal approximations lose the final mark.</li>
</ul>
`,
    "edbbedae-7847-4852-a895-44af0d0b57d5": `
<h2>AS Level Mathematics: Differentiation</h2>
<p>Differentiation measures how fast something changes: the gradient of a curve at a point, the speed of a moving object, the rate at which cost rises with output. It is the central tool of AS mathematics, and this note builds it from zero: the idea of a limit and the gradient function, the power rule with every algebraic case, tangents and normals, stationary points and their classification, increasing and decreasing intervals, and rates of change. Every worked example writes the derivative line before substituting, because the method marks live there.</p>

<h3>Gradient as a limit</h3>
<p>The gradient of a curve at a point is the gradient of the tangent there. Approximate it with a chord between two nearby points: as the points close up, the chord's gradient approaches the tangent's. That limiting process defines the derivative:</p>
<pre><code>gradient of chord = [f(x + h) - f(x)]/h\nderivative = limit as h -> 0\nnotation: dy/dx, f'(x)</code></pre>
<p>For y = x², the chord gradient simplifies to 2x + h, which tends to 2x as h → 0: the derivative of x² is 2x. That single calculation is the model for the general rule.</p>

<h3>The power rule</h3>
<pre><code>if y = x^n then dy/dx = n x^(n - 1)\n\nconstant multiple: d/dx [k f(x)] = k f'(x)\nsum: differentiate term by term\nconstant term: differentiates to 0</code></pre>
<p><strong>Worked example 1.</strong> Differentiate y = 4x³ − 2x² + 7x − 5.</p>
<pre><code>dy/dx = 12x^2 - 4x + 7</code></pre>
<p><strong>Worked example 2 (negative and fractional powers).</strong> Differentiate y = 3/x² + √x.</p>
<pre><code>rewrite: y = 3x^-2 + x^(1/2)\ndy/dx = -6x^-3 + (1/2)x^(-1/2)\n      = -6/x^3 + 1/(2 sqrt(x))</code></pre>
<p><strong>Worked example 3 (expand first).</strong> Differentiate y = x²(2x + 1).</p>
<pre><code>expand: y = 2x^3 + x^2\ndy/dx = 6x^2 + 2x</code></pre>
<p><strong>Worked example 4 (gradient at a point).</strong> Find the gradient of y = x³ − 4x at x = 2.</p>
<pre><code>dy/dx = 3x^2 - 4\nat x = 2: 12 - 4 = 8</code></pre>

<h3>Tangents and normals</h3>
<pre><code>tangent at x = a: gradient m = f'(a), through (a, f(a))\nnormal: gradient -1/m (perpendicular to the tangent)\nequation: y - y1 = m(x - x1)</code></pre>
<p><strong>Worked example.</strong> Find the tangent and normal to y = x² − 3x + 1 at x = 4.</p>
<pre><code>point: y = 16 - 12 + 1 = 5  ->  (4, 5)\ndy/dx = 2x - 3  ->  m = 5\ntangent: y - 5 = 5(x - 4)  ->  y = 5x - 15\nnormal: gradient -1/5\ny - 5 = -1/5 (x - 4)  ->  x + 5y = 29</code></pre>
<p><strong>Worked example 2 (tangent through a point).</strong> Find where the tangent to y = x³ at (2, 8) crosses the x-axis.</p>
<pre><code>dy/dx = 3x^2  ->  m = 12\ntangent: y - 8 = 12(x - 2)  ->  y = 12x - 16\nset y = 0: x = 16/12 = 4/3</code></pre>

<h3>Stationary points</h3>
<pre><code>stationary point: dy/dx = 0\nclassify with the second derivative:\n  d2y/dx2 < 0: maximum\n  d2y/dx2 > 0: minimum\n  d2y/dx2 = 0: could be either - check the gradient either side</code></pre>
<p><strong>Worked example.</strong> Find and classify the stationary points of y = x³ − 3x² + 4.</p>
<pre><code>dy/dx = 3x^2 - 6x = 3x(x - 2)\nstationary at x = 0 and x = 2\npoints: (0, 4) and (2, 0)\nd2y/dx2 = 6x - 6\nat x = 0: -6 < 0  ->  maximum\nat x = 2: +6 > 0  ->  minimum</code></pre>
<p><strong>Worked example 2 (unknown coefficient).</strong> The curve y = x³ + ax² + b has a stationary point at (2, 1). Find a and b.</p>
<pre><code>point condition: 8 + 4a + b = 1\nderivative condition: 3x^2 + 2ax = 0 at x = 2 -> 12 + 4a = 0 -> a = -3\nsubstitute: 8 - 12 + b = 1  ->  b = 5</code></pre>

<h3>Increasing and decreasing functions</h3>
<pre><code>increasing where dy/dx > 0\ndecreasing where dy/dx < 0\n</code></pre>
<p><strong>Worked example.</strong> Find the intervals where y = x³ − 6x² + 9x is increasing.</p>
<pre><code>dy/dx = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)\npositive outside the roots: x < 1 or x > 3\nincreasing on x < 1 and x > 3; decreasing on 1 < x < 3</code></pre>

<h3>Rates of change and kinematics</h3>
<pre><code>if s(t) is displacement: velocity v = ds/dt; acceleration a = dv/dt\ndisplacement from velocity: integrate (next topic)</code></pre>
<p><strong>Worked example.</strong> A particle's displacement is s = 2t³ − 9t² + 12t (metres, seconds). Find its velocity and acceleration at t = 2.</p>
<pre><code>v = ds/dt = 6t^2 - 18t + 12\nat t = 2: 24 - 36 + 12 = 0 m/s (momentarily at rest)\na = dv/dt = 12t - 18\nat t = 2: 24 - 18 = 6 m/s2</code></pre>
<p><strong>Worked example 2 (maximum displacement).</strong> With the same s(t), find when the particle is at rest and classify each moment.</p>
<pre><code>v = 0: 6t^2 - 18t + 12 = 0 -> t^2 - 3t + 2 = 0 -> t = 1, 2\na(1) = -6 < 0 -> at t = 1 the displacement is a maximum\na(2) = +6 > 0 -> at t = 2 the displacement is a minimum</code></pre>

<h3>Optimisation problems</h3>
<p>Applied maximum/minimum questions follow a fixed routine: write the quantity to optimise as a function of one variable, differentiate, set to zero, solve, and classify (or argue from the context).</p>
<p><strong>Worked example.</strong> A rectangular pen is to be made against a wall with 24 m of fencing (three sides). Find the maximum area.</p>
<pre><code>let the two equal sides be x; the third is 24 - 2x\nA = x(24 - 2x) = 24x - 2x^2\ndA/dx = 24 - 4x = 0  ->  x = 6\nA = 6(24 - 12) = 72 m2 (maximum since d2A/dx2 = -4 < 0)</code></pre>

<h3>Differentiation from first principles</h3>
<p>The definition is examinable and shows why the power rule works. The routine: form f(x + h), subtract f(x), divide by h, simplify, then let h → 0.</p>
<p><strong>Worked example.</strong> Differentiate f(x) = x² + 3x from first principles.</p>
<pre><code>f(x + h) = (x + h)^2 + 3(x + h) = x^2 + 2xh + h^2 + 3x + 3h
f(x + h) - f(x) = 2xh + h^2 + 3h
divide by h: 2x + h + 3
let h -> 0: f'(x) = 2x + 3</code></pre>
<p><strong>Worked example 2.</strong> Differentiate f(x) = 5x² from first principles.</p>
<pre><code>f(x + h) - f(x) = 5(x^2 + 2xh + h^2) - 5x^2 = 10xh + 5h^2
divide by h: 10x + 5h  ->  limit 10x</code></pre>

<h3>Concavity and the second derivative</h3>
<p>The second derivative describes how the gradient itself is changing. Where d²y/dx² &gt; 0 the gradient is increasing and the curve is concave up (holds water); where it is negative the gradient is decreasing and the curve is concave down. That is exactly why the sign classifies stationary points, and it also answers direct questions about concavity:</p>
<pre><code>d2y/dx2 > 0: concave up / minimum
d2y/dx2 < 0: concave down / maximum
d2y/dx2 = 0: possible point of inflection - test the gradient either side</code></pre>
<p><strong>Worked example.</strong> Find where y = x³ − 3x is concave up.</p>
<pre><code>dy/dx = 3x^2 - 3;  d2y/dx2 = 6x
concave up where 6x > 0  ->  x > 0</code></pre>

<h3>Sketching curves with calculus</h3>
<p>Calculus turns a sketch from guesswork into a list of facts: intercepts, stationary points and their nature, behaviour at the ends, and any asymptotes. A reliable order:</p>
<ol>
<li>Set x = 0 for the y-intercept; solve y = 0 for the x-intercepts where factorisable.</li>
<li>Differentiate, solve dy/dx = 0, and classify each stationary point.</li>
<li>Use the second derivative sign to fix concavity between the points.</li>
<li>Check the sign of y at the extremes of the sketch (a positive cubic rises to the right).</li>
</ol>
<p><strong>Worked example.</strong> Sketch y = x³ − 3x².</p>
<pre><code>intercepts: y = 0 at x = 0 and x = 3 (x^2(x - 3))
dy/dx = 3x^2 - 6x = 3x(x - 2)
stationary: (0, 0) and (2, -4)
d2y/dx2 = 6x - 6: at 0 negative -> maximum; at 2 positive -> minimum
The curve rises from the left, peaks at the origin, falls to (2, -4),
then rises, crossing the x-axis at x = 3.</code></pre>

<h3>Optimisation with a constraint</h3>
<p>Most real optimisation questions give a constraint (fixed perimeter, fixed volume, fixed budget) that must be used to eliminate one variable before differentiating.</p>
<p><strong>Worked example.</strong> A closed cylinder has volume 250 cm³. Find the radius that minimises its surface area.</p>
<pre><code>V = pi r^2 h = 250  ->  h = 250/(pi r^2)
S = 2 pi r^2 + 2 pi r h = 2 pi r^2 + 500/r
dS/dr = 4 pi r - 500/r^2 = 0
4 pi r^3 = 500  ->  r^3 = 39.79  ->  r = 3.41 cm
check: d2S/dr2 = 4 pi + 1000/r^3 > 0  ->  minimum</code></pre>
<p>The pattern is always the same: one constraint equation, one quantity to optimise, substitute, differentiate, solve, justify the nature of the stationary point — and answer the question actually asked (here the radius, not the height).</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Differentiate)</strong> Differentiate y = 5x⁴ − 3x² + 2. <em>Answer:</em> 20x³ − 6x.</li>
<li><strong>(Negative power)</strong> Differentiate y = 4/x. <em>Answer:</em> y = 4x⁻¹ → −4x⁻² = −4/x².</li>
<li><strong>(Gradient)</strong> Find the gradient of y = x² + 2x at x = −1. <em>Answer:</em> 2x + 2 → 0.</li>
<li><strong>(Tangent)</strong> Find the tangent to y = x² at (3, 9). <em>Answer:</em> m = 6; y = 6x − 9.</li>
<li><strong>(Stationary)</strong> Find the stationary point of y = x² − 6x + 5. <em>Answer:</em> 2x − 6 = 0 → x = 3; y = −4; minimum.</li>
<li><strong>(Second derivative)</strong> Classify the stationary point of y = x³ at x = 0. <em>Answer:</em> dy/dx = 3x², d²y/dx² = 6x = 0 at x = 0 — the test is inconclusive; the gradient is positive either side, so it is a point of inflection, not an extremum.</li>
<li><strong>(Increasing)</strong> Find where y = x² − 4x is decreasing. <em>Answer:</em> 2x − 4 &lt; 0 → x &lt; 2.</li>
<li><strong>(Kinematics)</strong> s = t³ − 6t² + 9t. Find the acceleration at t = 1. <em>Answer:</em> v = 3t² − 12t + 9; a = 6t − 12 → −6 m/s².</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Forgetting to rewrite powers:</strong> differentiate 1/x and √x only after rewriting as x⁻¹ and x^(1/2); the power rule does not apply to the original form.</li>
<li><strong>Dropping the constant:</strong> the derivative of a constant is 0 — a leftover +7 in dy/dx is an error.</li>
<li><strong>Tangent versus normal:</strong> the normal's gradient is −1/m, not −m; and it passes through the same point.</li>
<li><strong>Second derivative sign:</strong> negative means maximum (the curve is concave down); positive means minimum. Reversing the classification is the classic slip.</li>
<li><strong>d²y/dx² = 0:</strong> inconclusive, not automatically an inflection — check the gradient either side.</li>
<li><strong>Stationary point coordinates:</strong> the question wants (x, y), so substitute the x back into the original curve, not the derivative.</li>
<li><strong>Rates of change with units:</strong> attach units (m/s, m/s², units per item) and interpret the sign in context.</li>
<li><strong>Method marks:</strong> write dy/dx = ... explicitly before substituting; the derivative itself is credit even if the later arithmetic slips.</li>
</ul>
`,
    "3bc168f1-4a43-4e2f-9954-2f256539800e": `
<h2>AS Level Mathematics: Integration</h2>
<p>Integration is differentiation in reverse: it recovers a function from its gradient, and it accumulates a rate into a total — the area under a curve, the distance from a velocity, the cost from a marginal. This note builds the topic from zero: the indefinite integral and the constant of integration, the power rule, definite integrals and the fundamental theorem, areas above and below the axis, the area between two curves, and kinematics. Every worked example shows the antiderivative line before any substitution of limits.</p>

<h3>The indefinite integral</h3>
<pre><code>if dy/dx = x^n then y = x^(n+1)/(n+1) + c   (n not -1)\n\nintegral of x^n dx = x^(n+1)/(n+1) + c\nintegral of k f(x) dx = k integral of f(x) dx\nintegral of a sum = sum of integrals</code></pre>
<p>The +c is mandatory for indefinite integrals: every antiderivative differs by a constant, and the constant is fixed by a boundary condition (a point on the curve).</p>
<p><strong>Worked example 1.</strong> Find ∫(6x² − 4x + 3) dx.</p>
<pre><code>= 6x^3/3 - 4x^2/2 + 3x + c\n= 2x^3 - 2x^2 + 3x + c</code></pre>
<p><strong>Worked example 2 (negative and fractional powers).</strong> Find ∫(1/x² + √x) dx.</p>
<pre><code>rewrite: integral of (x^-2 + x^(1/2)) dx\n= -x^-1 + (2/3)x^(3/2) + c\n= -1/x + (2/3)x^(3/2) + c</code></pre>
<p><strong>Worked example 3 (finding c).</strong> dy/dx = 3x² + 2 and the curve passes through (1, 5). Find y.</p>
<pre><code>y = x^3 + 2x + c\n5 = 1 + 2 + c  ->  c = 2\ny = x^3 + 2x + 2</code></pre>

<h3>Definite integrals and area</h3>
<pre><code>integral from a to b of f(x) dx = F(b) - F(a)\n\narea under the curve between x = a and x = b (above the axis)\n= definite integral; a negative value means the region is\nbelow the x-axis, and the area is the magnitude</code></pre>
<p><strong>Worked example.</strong> Evaluate ∫ from 1 to 3 of (2x + 1) dx.</p>
<pre><code>antiderivative: x^2 + x\nF(3) = 9 + 3 = 12;  F(1) = 1 + 1 = 2\nvalue = 12 - 2 = 10</code></pre>
<p><strong>Worked example 2 (area under a curve).</strong> Find the area under y = x² between x = 0 and x = 3.</p>
<pre><code>integral: x^3/3\nfrom 0 to 3: 27/3 - 0 = 9 square units</code></pre>
<p><strong>Worked example 3 (below the axis).</strong> Find the area between y = x² − 4 and the x-axis from x = 0 to x = 2.</p>
<pre><code>integral: x^3/3 - 4x\nfrom 0 to 2: 8/3 - 8 = -16/3\nthe value is negative because the region is below the axis;\narea = 16/3 = 5.33 square units</code></pre>

<h3>Areas crossing the axis</h3>
<p>When a curve crosses the x-axis inside the interval, integrate each piece separately and add the magnitudes — a single integral would cancel positive and negative areas.</p>
<p><strong>Worked example.</strong> Find the total area between y = x² − 1 and the x-axis from x = −2 to x = 2.</p>
<pre><code>crossings at x = -1 and x = 1\npiece 1 (-2 to -1): F = x^3/3 - x; F(-1) - F(-2) = (2/3) - (-2/3) = 4/3\npiece 2 (-1 to 1): F(1) - F(-1) = (-2/3) - (2/3) = -4/3 -> magnitude 4/3\npiece 3 (1 to 2): F(2) - F(1) = (2/3) - (-2/3) = 4/3\ntotal area = 4/3 + 4/3 + 4/3 = 4 square units</code></pre>

<h3>Area between two curves</h3>
<pre><code>area between y = f(x) and y = g(x) from a to b\n= integral of (f(x) - g(x)) dx from a to b\nwhere f is the upper curve and g the lower</code></pre>
<p><strong>Worked example.</strong> Find the area between y = x² and y = x from x = 0 to x = 1.</p>
<pre><code>upper curve on this interval is y = x\nintegral of (x - x^2) dx = x^2/2 - x^3/3\nfrom 0 to 1: 1/2 - 1/3 = 1/6 square units</code></pre>
<p><strong>Worked example 2 (intersections).</strong> Find the area enclosed by y = x² and y = 2x.</p>
<pre><code>intersections: x^2 = 2x -> x(x - 2) = 0 -> x = 0, 2\nupper on (0, 2) is y = 2x\nintegral of (2x - x^2) dx = x^2 - x^3/3\nfrom 0 to 2: 4 - 8/3 = 4/3 square units</code></pre>

<h3>Kinematics with integration</h3>
<pre><code>velocity v = ds/dt  ->  displacement s = integral of v dt\nacceleration a = dv/dt  ->  velocity v = integral of a dt\n\ndefinite integral of v from t1 to t2 = displacement\nintegral of |v| = distance travelled</code></pre>
<p><strong>Worked example.</strong> A particle has velocity v = 3t² − 6t (m/s). Find its displacement from t = 0 to t = 3 and its distance travelled.</p>
<pre><code>s = integral of (3t^2 - 6t) dt = t^3 - 3t^2\nfrom 0 to 3: 27 - 27 = 0  ->  net displacement zero\nsign of v: 3t(t - 2), negative between 0 and 2, positive after\ndistance = |integral 0 to 2| + integral 2 to 3\n= |8 - 12| + (27 - 27) - (8 - 12) = 4 + 4 = 8 m</code></pre>
<p>The distinction between displacement and distance is examinable: displacement is the signed integral, distance is the sum of the absolute pieces.</p>

<h3>Worked examples: mixed integration</h3>
<p><strong>Worked example.</strong> The curve y = f(x) has f'(x) = 6x − 4 and passes through (2, 3). Find f(x) and the area under the curve from x = 1 to x = 2.</p>
<pre><code>f(x) = 3x^2 - 4x + c;  3 = 12 - 8 + c -> c = -1\nf(x) = 3x^2 - 4x - 1\narea = integral 1 to 2: x^3 - 2x^2 - x\nF(2) = 8 - 8 - 2 = -2; F(1) = 1 - 2 - 1 = -2\narea = -2 - (-2) = 0  (the curve is below the axis and the\nsigned areas cancel); the geometric area needs the crossing\nchecked - a useful reminder to sketch first</code></pre>

<h3>Integrating expressions that need rearranging</h3>
<p>Integration has no product or quotient rule at AS level, so expressions must first be written as sums of powers. Two standard rearrangements cover almost every case:</p>
<pre><code>product: expand, then integrate term by term
quotient with a single term denominator: divide through first

(x + 2)(x - 5) = x^2 - 3x - 10
(3x^2 + 4x)/x = 3x + 4
sqrt(x)(x + 1) = x^(3/2) + x^(1/2)</code></pre>
<p><strong>Worked example.</strong> Find ∫ (x + 3)(x − 1) dx.</p>
<pre><code>expand: x^2 + 2x - 3
integrate: x^3/3 + x^2 - 3x + c</code></pre>
<p><strong>Worked example 2.</strong> Find ∫ (4x³ + 2x)/x dx.</p>
<pre><code>divide: 4x^2 + 2
integrate: (4/3)x^3 + 2x + c</code></pre>

<h3>Two boundary conditions</h3>
<p>When the second derivative is given, integrate twice and use two pieces of information to fix both constants. The order matters: the first integration produces the gradient function and its constant, the second the curve and its constant.</p>
<p><strong>Worked example.</strong> d²y/dx² = 6x, dy/dx = 2 when x = 1, and y = 5 when x = 1. Find y.</p>
<pre><code>first: dy/dx = 3x^2 + c;  2 = 3 + c  ->  c = -1, so dy/dx = 3x^2 - 1
second: y = x^3 - x + k;  5 = 1 - 1 + k  ->  k = 5
y = x^3 - x + 5</code></pre>

<h3>Finding limits and constants from area information</h3>
<p>Area questions are often inverted: the area is given and a limit or coefficient must be found. Set up the definite integral with the unknown, evaluate, and solve the resulting equation — rejecting any root outside the geometric context.</p>
<p><strong>Worked example.</strong> The area under y = kx² from x = 0 to x = 3 is 36. Find k.</p>
<pre><code>integral: kx^3/3
from 0 to 3: 27k/3 = 9k
9k = 36  ->  k = 4</code></pre>
<p><strong>Worked example 2 (unknown upper limit).</strong> The area under y = 2x from x = 0 to x = a is 25. Find a.</p>
<pre><code>integral: x^2;  from 0 to a: a^2 = 25
a = 5  (the negative root is rejected: a is an x-coordinate to
the right of the origin in this setup)</code></pre>

<h3>Kinematics: recovering velocity from acceleration</h3>
<p><strong>Worked example.</strong> A particle starts from rest with acceleration a = 6t − 4 (m/s²). Find its velocity at t = 3 and the distance travelled in the first 3 seconds.</p>
<pre><code>v = integral of (6t - 4) dt = 3t^2 - 4t + c
at rest at t = 0: c = 0  ->  v = 3t^2 - 4t
v(3) = 27 - 12 = 15 m/s
distance = integral of |v| from 0 to 3
v = 0 at t = 0 and t = 4/3; v is negative on (0, 4/3)
piece 1: [t^3 - 2t^2] from 0 to 4/3 = 64/27 - 32/9 = -32/27 -> 32/27
piece 2: [t^3 - 2t^2] from 4/3 to 3 = (27 - 18) - (-32/27) = 9 + 32/27
distance = 32/27 + 9 + 32/27 = 9 + 64/27 = 11.4 m</code></pre>
<p>The sign analysis is the whole question: sketch v against t, mark where it crosses zero, and integrate each piece with its sign removed.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Indefinite)</strong> Find ∫(4x³ − 2) dx. <em>Answer:</em> x⁴ − 2x + c.</li>
<li><strong>(Negative power)</strong> Find ∫x⁻² dx. <em>Answer:</em> −x⁻¹ + c = −1/x + c.</li>
<li><strong>(Definite)</strong> Evaluate ∫ from 0 to 2 of 3x² dx. <em>Answer:</em> [x³] = 8.</li>
<li><strong>(Area)</strong> Find the area under y = x + 2 from x = 0 to x = 3. <em>Answer:</em> [x²/2 + 2x] = 4.5 + 6 = 10.5.</li>
<li><strong>(Below axis)</strong> Find the area between y = x − 3 and the x-axis from x = 0 to x = 2. <em>Answer:</em> integral = [x²/2 − 3x] = 2 − 6 = −4; area 4.</li>
<li><strong>(Between curves)</strong> Find the area between y = x² and y = x³ from 0 to 1. <em>Answer:</em> upper is x²; ∫(x² − x³) = 1/3 − 1/4 = 1/12.</li>
<li><strong>(Constant)</strong> dy/dx = 4x and y = 7 when x = 1. Find y. <em>Answer:</em> y = 2x² + c → 7 = 2 + c → c = 5 → y = 2x² + 5.</li>
<li><strong>(Kinematics)</strong> v = 2t + 1. Find the displacement from t = 0 to t = 4. <em>Answer:</em> [t² + t] = 16 + 4 = 20 m.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Forgetting +c:</strong> an indefinite integral without the constant loses a mark; with a boundary condition, the constant is required for the answer.</li>
<li><strong>Power rule reversal:</strong> integrate xⁿ to x^(n+1)/(n+1); adding one and dividing is the opposite of differentiating, and mixing them up produces nonsense.</li>
<li><strong>Limits order:</strong> F(b) − F(a), never the reverse. A negative area often means the limits were swapped.</li>
<li><strong>Ignoring crossings:</strong> a definite integral over a region that crosses the axis gives the signed area; split at the crossings and add magnitudes for the geometric area.</li>
<li><strong>Wrong upper curve:</strong> subtract lower from upper; sketching between the intersection points avoids the sign error.</li>
<li><strong>Distance versus displacement:</strong> displacement is the signed integral; distance sums the absolute pieces. Read which is asked.</li>
<li><strong>Expanding before integrating:</strong> products must be expanded or divided first; there is no product rule for integration at AS level.</li>
<li><strong>Units:</strong> areas are square units, displacements in metres; attach and interpret units in applied questions.</li>
</ul>
`,
  },
};
