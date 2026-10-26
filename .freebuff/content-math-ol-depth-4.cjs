// Mathematics OL batch 4: corrected rewrite of the trigonometry note.
// Written from the official Cambridge IGCSE Mathematics 0580 content list,
// E6.4 Trigonometric functions (graphs over 0-360 degrees, solving trig
// equations) and E6.5 Non-right-angled triangles (sine rule, cosine rule,
// 1/2 ab sin C), plus bearing and 3-D applications. This replaces a note whose
// worked examples contained arithmetic errors (a sine-rule answer of 9.98 that
// its own later working showed was 9.87; an area of 14.8 instead of 14.9; a
// cosine-rule example with -20 where 2 x 8 x 5 x cos 60 = 40, so QR = 7 cm and
// not root 69; and a bearing result of 68.4 km instead of 68.5 km). Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-ol-depth-4.cjs > .freebuff-tmp/mth-ol-depth-4.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/mth-ol-depth-4.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/mth-ol-depth-4.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs mathematics OL
module.exports = {
  expectType: "notes",
  titles: {
    "3e7dd5a5-8c36-474d-9ae4-f9cbb91c9a3e": "IGCSE Mathematics: Trig Graphs, Sine and Cosine Rules",
  },
  rows: {
    "3e7dd5a5-8c36-474d-9ae4-f9cbb91c9a3e": `
<h2>IGCSE Mathematics: Trig Graphs, Sine and Cosine Rules</h2>
<p>Cambridge IGCSE Mathematics 0580 (2025–2027), section 6 Trigonometry, Extended statements E6.4 Trigonometric functions (the graphs of sine, cosine and tangent over 0° to 360°, and solving trigonometric equations) and E6.5 Non-right-angled triangles (the sine rule, the cosine rule and the area formula ½ab sin C). The right-angled toolkit SOH CAH TOA only works when a right angle is present; these are the tools that work for every triangle. The note also covers the bearing and three-dimensional applications that appear in Paper 4, with every worked example fully recalculated.</p>

<h3>From right-angled ratios to any angle</h3>
<p>In a right-angled triangle, sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse and tan θ = opposite/adjacent. The graphs in this note extend those definitions to every angle from 0° to 360°, which is what makes them useful for waves, rotating objects and periodic motion later in the course. The exact values to know by heart:</p>
<table border="1" cellpadding="6">
<tr><th>Angle</th><th>sin</th><th>cos</th><th>tan</th></tr>
<tr><td>0°</td><td>0</td><td>1</td><td>0</td></tr>
<tr><td>30°</td><td>1/2</td><td>√3/2</td><td>1/√3</td></tr>
<tr><td>45°</td><td>√2/2</td><td>√2/2</td><td>1</td></tr>
<tr><td>60°</td><td>√3/2</td><td>1/2</td><td>√3</td></tr>
<tr><td>90°</td><td>1</td><td>0</td><td>undefined</td></tr>
</table>
<p>These come from two triangles worth knowing: the half-equilateral (30°–60°–90° with sides 1, √3, 2) and the isosceles right triangle (45°–45°–90° with sides 1, 1, √2).</p>

<h3>The trigonometric graphs, 0° to 360°</h3>
<ul>
<li><strong>y = sin x</strong> starts at 0, rises to 1 at 90°, falls through 0 at 180°, to −1 at 270°, and back to 0 at 360°. It is a wave, maximum 1 and minimum −1.</li>
<li><strong>y = cos x</strong> is the sine wave shifted: it starts at 1, falls through 0 at 90°, to −1 at 180°, through 0 at 270°, back to 1 at 360°.</li>
<li><strong>y = tan x</strong> is 0 at 0° and 180° and 360°, rises steeply towards +∞ just before 90°, and comes from −∞ just after 90°; it has vertical asymptotes at 90° and 270° because cos x = 0 there and tan = sin/cos.</li>
</ul>
<p>The symmetries behind solving equations:</p>
<pre><code>sin x = sin (180° - x)        e.g. sin 40° = sin 140°
cos x = -cos (180° - x)       e.g. cos 60° = -cos 120°
cos x = cos (360° - x)        e.g. cos 40° = cos 320°</code></pre>
<p><strong>Solving trigonometric equations.</strong> Find the first solution from the calculator or the exact-value table, then use the symmetry to find the others in 0° ⩽ x ⩽ 360°:</p>
<pre><code>Solve sin x = 0.5 for 0° ⩽ x ⩽ 360°:

First solution: x = 30° (from the exact values)
Sine is positive in the first and second quadrants, so the second solution is
x = 180° - 30° = 150°
Answers: x = 30° and x = 150°</code></pre>
<pre><code>Solve 2 cos x + 1 = 0 for 0° ⩽ x ⩽ 360°:

2 cos x = -1
cos x = -1/2
First solution: x = 120° (cosine is negative in the second quadrant; cos 60° = 1/2)
Cosine is also negative in the third quadrant: x = 360° - 120° = 240°
Answers: x = 120° and x = 240°</code></pre>
<p>A sketch of the graph before solving is the safest habit: it shows how many answers to expect, which is exactly what examiners check for.</p>

<h3>Area of a triangle: ½ab sin C</h3>
<p>The familiar area formula is ½ × base × height. For a triangle with sides a and b and included angle C, the height above base b is a sin C (from SOH in the right-angled triangle formed by the height), so:</p>
<pre><code>area = 1/2 x a x b x sin C</code></pre>
<ul>
<li>a, b: the two known sides, in any units as long as both match; C: the angle <strong>between</strong> those two sides, in degrees; area: in the square of the side units.</li>
</ul>
<pre><code>Worked example: a = 8 cm, b = 5 cm, C = 48°:

area = 1/2 x 8 x 5 x sin 48°
     = 20 x 0.7431        [sin 48° = 0.7431 to 4 d.p.]
     = 14.86 cm^2  ≈ 14.9 cm^2 (3 s.f.)</code></pre>
<p>The angle must be the included one; using a non-included angle gives a different (wrong) triangle.</p>

<h3>The sine rule</h3>
<p>For any triangle with sides a, b, c opposite angles A, B, C:</p>
<pre><code>a / sin A = b / sin B = c / sin C

or, when looking for an angle:  sin A / a = sin B / b = sin C / c</code></pre>
<p>Use it when you know a matching <strong>side–angle pair</strong> (a side and the angle opposite it) plus one other item. It generalises SOH CAH TOA to triangles without a right angle.</p>
<pre><code>Worked example: A = 40°, a = 7 cm, B = 65°. Find b.

a / sin A = b / sin B
7 / sin 40° = b / sin 65°
b = 7 x sin 65° / sin 40°
  = 7 x 0.9063 / 0.6428      [4 d.p. values]
  = 6.3441 / 0.6428
  = 9.87 cm (3 s.f.)</code></pre>
<p><strong>The ambiguous case.</strong> When you know two sides and an angle that is not between them (SSA), the triangle may not be unique: if the given angle is acute and the opposite side is shorter than the other side but longer than the perpendicular distance, there are <strong>two</strong> possible triangles. Since sin θ = sin (180° − θ), the calculator's answer θ may need supplementing with 180° − θ. Check both candidates against the angle sum of 180° before accepting them.</p>

<h3>The cosine rule</h3>
<p>For any triangle with sides a, b, c and angle A opposite side a:</p>
<pre><code>a^2 = b^2 + c^2 - 2 b c cos A
rearranged for an angle:  cos A = (b^2 + c^2 - a^2) / (2 b c)</code></pre>
<p>Use it when you know <strong>SAS</strong> (two sides and the included angle) or <strong>SSS</strong> (all three sides). It is the general form of Pythagoras: with A = 90°, cos 90° = 0 and the formula collapses to a² = b² + c².</p>
<pre><code>Worked example (SAS): b = 7 cm, c = 5 cm, A = 52°. Find a.

a^2 = 7^2 + 5^2 - 2 x 7 x 5 x cos 52°
    = 49 + 25 - 70 x 0.6157        [cos 52° = 0.6157 to 4 d.p.]
    = 74 - 43.10
    = 30.90
a = √30.90 = 5.56 cm (3 s.f.)</code></pre>
<pre><code>Worked example (SSS): a = 8 cm, b = 5 cm, c = 7 cm. Find angle B.

cos B = (a^2 + c^2 - b^2) / (2 a c)
      = (64 + 49 - 25) / (2 x 8 x 7)
      = 88 / 112
      = 0.7857
B = cos^(-1)(0.7857) = 38.2° (3 s.f.)</code></pre>
<p>The rule never fails for a valid triangle, and the angle found is always the one opposite the side that appears alone with the minus sign.</p>

<h3>Bearings and multi-step problems</h3>
<p>A bearing is measured clockwise from north, written as three figures (070°, 150°). The method: draw both north lines (they are parallel), transfer angles using parallel-line facts (alternate angles are equal), then choose the sine or cosine rule for the triangle formed.</p>
<pre><code>Worked example: from a port Q, a ship sails 60 km on a bearing of 070° to P,
then 45 km on a bearing of 150° to R. Find the distance PR.

Both legs start at Q, so the angle at Q between them is the difference of the
bearings: angle PQR = 150° - 070° = 80° (draw the north line at Q and measure
clockwise to each leg; the angle inside the triangle is the gap between them).
PR^2 = 60^2 + 45^2 - 2 x 60 x 45 x cos 80°        [cosine rule at angle Q]
     = 3600 + 2025 - 5400 x 0.1736
     = 5625 - 937.7
     = 4687.3
PR = 68.5 km (3 s.f.)</code></pre>
<p>The 3-D extension uses the same toolkit: a space diagonal has length d = √(x² + y² + z²), and the angle between a line and a plane is found by projecting the line onto the plane and solving the right-angled triangle that remains. Sketch the relevant 2-D triangle separately — that is the step most answers skip and most marks follow.</p>

<h3>Worked example: choosing the right rule</h3>
<p>In triangle PQR, PQ = 5 cm, PR = 8 cm and angle QPR = 60°. Find QR and the area.</p>
<pre><code>QR is opposite the known angle 60° with the two other sides known (SAS):
QR^2 = 8^2 + 5^2 - 2 x 8 x 5 x cos 60°
     = 64 + 25 - 80 x 0.5        [cos 60° = 0.5]
     = 89 - 40
     = 49
QR = 7 cm exactly.

Area = 1/2 x 8 x 5 x sin 60° = 20 x 0.8660 = 17.3 cm^2 (3 s.f.)</code></pre>
<p>Note the exact answer: when the numbers conspire, the square root is whole and leaving it as √49 would be an incomplete answer. Now find angle PQR with the sine rule: sin Q / 8 = sin 60° / 7 gives sin Q = 8 × 0.8660/7 = 0.9897, so Q = 81.8° or 98.2° (ambiguous case); the cosine rule resolves it: cos Q = (25 + 49 − 64)/(2 × 5 × 7) = 10/70 = 0.1429, so Q = 81.8°.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Using the sine rule without a matched pair: you need a side and the angle opposite it; otherwise use the cosine rule.</li>
<li>Forgetting the ambiguous case: two triangles may satisfy the data when two sides and a non-included angle are given — check both.</li>
<li>Mixing degrees and calculator mode: the calculator must be in degrees mode, and answers should be given to 3 s.f. unless told otherwise.</li>
<li>Losing a minus sign in the cosine rule: a² = b² + c² − 2bc cos A; for an obtuse angle cos A is negative, which makes the side longer, and an answer that contradicts that is a sign slip.</li>
<li>Using ½ab sin C with a non-included angle; C must be the angle between a and b.</li>
<li>Writing bearings without three figures (070°, not 70°) or measuring anticlockwise.</li>
<li>Rounding intermediate values too early; keep 4+ d.p. through the working and round only the final answer.</li>
<li>Reading sin⁻¹ as 1/sin; it is the inverse function giving an angle from a ratio.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 4 marks).</strong> Solve cos x = 0.6 for 0° ⩽ x ⩽ 360°.</p>
<p>Answer: First solution x = 53.1° (3 s.f.). Cosine is positive in the first and fourth quadrants, so the second is x = 360° − 53.1° = 306.9°. Answers: 53.1° and 306.9°.</p>
<p><strong>Question 2 (Paper 2, 3 marks).</strong> Sketch y = sin x for 0° ⩽ x ⩽ 360° and state its maximum and minimum.</p>
<p>Answer: A wave starting at (0, 0), peaking at (90°, 1), crossing (180°, 0), bottoming at (270°, −1), ending at (360°, 0). Maximum 1, minimum −1.</p>
<p><strong>Question 3 (Paper 4, 4 marks).</strong> Triangle ABC has AB = 9 cm, AC = 7 cm and angle BAC = 50°. Find BC.</p>
<p>Answer: Cosine rule: BC² = 9² + 7² − 2 × 9 × 7 × cos 50° = 81 + 49 − 126 × 0.6428 = 130 − 81.0 = 49.0, so BC = 7.0 cm (3 s.f.).</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> In triangle PQR, angle P = 30°, angle Q = 105° and PR = 12 cm. Find QR.</p>
<p>Answer: Angle R = 45°. By the sine rule, QR/sin 30° = 12/sin 45°, so QR = 12 × 0.5/0.7071 = 8.49 cm (3 s.f.).</p>
<p><strong>Question 5 (Paper 4, 4 marks).</strong> A triangle has sides 6 cm, 8 cm and 11 cm. Find its area.</p>
<p>Answer: Find the angle between two known sides first. cos C = (36 + 64 − 121)/(2 × 6 × 8) = −21/96 = −0.2188, so C = 102.6°. Area = ½ × 6 × 8 × sin 102.6° = 24 × 0.9763 = 23.4 cm² (3 s.f.).</p>
<p><strong>Question 6 (Paper 4, 5 marks).</strong> A boat sails 2.8 km due south from a point A to a point B. A lighthouse L is 4.2 km from A on a bearing of 120°. Find the distance BL and the bearing of the lighthouse from B.</p>
<p>Answer: At A the due-south direction is bearing 180°, so angle BAL = 180° − 120° = 60°. Cosine rule: BL² = 2.8² + 4.2² − 2 × 2.8 × 4.2 × cos 60° = 7.84 + 17.64 − 11.76 = 13.72, so BL = 3.70 km (3 s.f.). For the bearing, find angle ABL: cos B = (2.8² + 13.72 − 17.64)/(2 × 2.8 × 3.704) = 3.92/20.74 = 0.1890, so B = 79.1°. Since B is due south of A, the direction from B to A is due north, and the lighthouse lies east of that line, so its bearing from B is 079° (3 s.f.).</p>
<p>Angles and sides are the language of shape; the next note measures those shapes — area, volume and mensuration.</p>
`,
  },
};
