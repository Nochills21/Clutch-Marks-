// Batch 03: extends five existing maths AS (9709) notes toward 2x.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "929796bd-05c8-46af-85a3-af6815541b09": `
<h3>Worked example: arc length and sector area</h3>
<p>A sector has radius 5 cm and angle 0.8 radians. The arc length is rθ = 5 × 0.8 = 4 cm. The sector area is ½r²θ = ½ × 25 × 0.8 = 10 cm².</p>
<p>Both formulas need the angle in radians. If the question gives degrees, convert first: 60° = π/3 radians, and 1 radian is about 57.3°. Writing a degree value into rθ is one of the most common lost marks in this topic.</p>
<h3>Exact answers with π</h3>
<p>For radius 6 cm and angle π/3, the arc length is 6 × π/3 = 2π cm, and the sector area is ½ × 36 × π/3 = 6π cm². Leave answers in terms of π when the question asks for an exact value, and give a decimal only if it asks for one.</p>
<h3>Segment area</h3>
<p>A segment is the region between a chord and an arc. Its area is the sector area minus the area of the triangle formed by the two radii and the chord, so segment = ½r²(θ − sin θ).</p>
<p>Example: with r = 5 and θ = 0.8, sin 0.8 is about 0.7174, so the segment area is ½ × 25 × (0.8 − 0.7174) = 1.03 cm² to 2 decimal places. Keep sin θ in your calculator, not rounded, until the final line.</p>
<h3>Finding an angle or radius from a perimeter or arc</h3>
<p>If an arc has length 12 cm on a circle of radius 4 cm, the angle is θ = 12/4 = 3 radians. If the perimeter of a sector is given, the perimeter is 2r + rθ, so set that expression equal to the known value and solve for the unknown.</p>
<ul>
<li>Check that the answer is reasonable: an angle of 3 radians is less than π, so the sector must be less than a half-disc.</li>
<li>Sketch the sector and label the radii and the angle before you substitute.</li>
<li>When a question combines two sectors or a sector with a triangle, find each area separately and then add or subtract, stating which operation you used.</li>
</ul>
`,
    "7eaeae86-301f-41c8-9901-70ab01bf804c": `
<h3>Worked example: midpoint, distance and the perpendicular bisector</h3>
<p>Let A = (2, 5) and B = (8, −1). The midpoint is ((2 + 8)/2, (5 − 1)/2) = (5, 2). The length AB is √((8 − 2)² + (−1 − 5)²) = √(36 + 36) = 6√2.</p>
<p>The gradient of AB is (−1 − 5)/(8 − 2) = −1. The perpendicular bisector has gradient 1 and passes through (5, 2), so its equation is y − 2 = x − 5, which gives y = x − 3. Check that C = (0, −3) lies on it: 0 − 3 = −3, so it does.</p>
<h3>Intersection of two lines</h3>
<p>To find where y = 2x + 1 meets y = −x + 7, set the two right-hand sides equal: 2x + 1 = −x + 7, so 3x = 6 and x = 2. Substitute back: y = 2(2) + 1 = 5. The lines meet at (2, 5). Always substitute back into the second equation as a check.</p>
<h3>Area of a triangle from coordinates</h3>
<p>For the triangle with vertices (1, 1), (5, 1) and (3, 4), the base from (1, 1) to (5, 1) has length 4 and the height is the vertical distance from (3, 4) to that base, which is 3. The area is ½ × 4 × 3 = 6 square units.</p>
<p>When the base is not horizontal, use the shoelace method: list the coordinates in order, multiply diagonally, subtract, and halve the absolute value. It works for any triangle, so it is safer than estimating the height.</p>
<h3>Parallel and perpendicular lines in exam questions</h3>
<ul>
<li>Parallel lines have equal gradients, so 2y = 4x + 1 and y = 2x − 7 are parallel.</li>
<li>Perpendicular gradients multiply to −1, so a line perpendicular to gradient 3/4 has gradient −4/3.</li>
<li>If a question asks for a line through a given point perpendicular to a line, find the gradient first, then substitute the point into y = mx + c or y − y₁ = m(x − x₁).</li>
</ul>
<h3>Common errors that lose marks</h3>
<ul>
<li>Subtracting the coordinates in different orders for the gradient, for example using (−1 − 5)/(2 − 8), which gives the wrong sign.</li>
<li>Stating the distance as the difference of the x-coordinates only, rather than using Pythagoras on both differences.</li>
<li>Leaving a midpoint as a fraction when it is a whole number, or giving a line equation in a form that is not what the question asks for.</li>
</ul>
`,
    "6d5aa4b1-9916-4af0-a529-74d409d9f9b9": `
<h3>Worked example: completing the square with a coefficient</h3>
<p>Write 2x² + 8x + 3 in the form a(x + p)² + q. Factor the 2 from the first two terms: 2(x² + 4x) + 3. Complete the square inside the bracket: x² + 4x = (x + 2)² − 4. So the expression is 2((x + 2)² − 4) + 3 = 2(x + 2)² − 5.</p>
<p>The minimum value is −5, reached when x = −2, so the minimum point is (−2, −5). Always factor the leading coefficient out first, otherwise the constant term comes out wrong.</p>
<h3>Discriminant and the range of a parameter</h3>
<p>The equation x² + kx + 4 = 0 has no real roots when the discriminant is negative: k² − 16 &lt; 0. Solve as a quadratic in k to get −4 &lt; k &lt; 4. Stating the range is the mark-earning step, so write the inequality in full.</p>
<p>If the discriminant equals zero, the line is a tangent to the curve; if it is positive the line cuts the curve at two points.</p>
<h3>Tangent to a curve</h3>
<p>Find where y = x² − 2x + 3 meets the line y = 2x + k. Substitute to get x² − 4x + (3 − k) = 0. For a tangent the discriminant is zero: 16 − 4(3 − k) = 0, so k = −1. The tangent is y = 2x − 1, touching the curve at x = 2, where y = 3 on both.</p>
<h3>Solving a quadratic inequality with a sketch</h3>
<p>Solve 2x² − 5x − 3 &gt; 0. Factor as (2x + 1)(x − 3) and find the roots x = −½ and x = 3. The parabola has a positive leading coefficient, so it is above the axis outside the roots. The solution is x &lt; −½ or x &gt; 3. Note the word or: this is two separate intervals, not one.</p>
<ul>
<li>Positive leading coefficient: the expression is positive outside the roots and negative between them.</li>
<li>Negative leading coefficient: the reverse is true.</li>
<li>If the quadratic has no real roots, the sign never changes, so test one value to decide whether the inequality holds for all x.</li>
</ul>
`,
    "4c83eff4-82e2-473c-83a2-dc959f0ca347": `
<h3>Worked example: arithmetic progression</h3>
<p>The sequence 3, 7, 11, … has first term a = 3 and common difference d = 4. The 20th term is a + 19d = 3 + 76 = 79. The sum of the first 20 terms is Sₙ = n/2 (2a + (n − 1)d) = 10 × (6 + 76) = 820.</p>
<p>Check with the average method: the first and last terms average (3 + 79)/2 = 41, and 41 × 20 = 820.</p>
<h3>Worked example: geometric progression</h3>
<p>The sequence 5, 10, 20, … has r = 2. The 8th term is 5 × 2⁷ = 640. The sum of the first six terms is 5(2⁶ − 1)/(2 − 1) = 315. Adding them directly gives 5 + 10 + 20 + 40 + 80 + 160 = 315, which confirms the formula.</p>
<h3>Sum to infinity</h3>
<p>A geometric series has a sum to infinity only when |r| &lt; 1, and then S∞ = a/(1 − r). For 81, 27, 9, … the ratio is 1/3, so S∞ = 81/(2/3) = 121.5. If |r| ≥ 1 the terms do not shrink and the sum does not converge, so say so rather than quoting a formula.</p>
<h3>Binomial expansion</h3>
<p>For (1 + 2x)⁵, the first terms are 1 + 5(2x) + 10(2x)² + … The coefficient of x² is C(5, 2) × 2² = 10 × 4 = 40. The expansion is valid for |2x| &lt; 1, so the range of x must be stated when the question asks for it.</p>
<h3>Common errors that lose marks</h3>
<ul>
<li>Using n instead of n − 1 in the n-th term formula, which shifts every term.</li>
<li>Confusing the nth term with the sum of the first n terms, a very common error on exam questions that ask for both.</li>
<li>Dividing a/(1 − r) when the series starts at a term other than the first, so check the index on the first term before using the formula.</li>
<li>Forgetting that the binomial expansion of (a + b)ⁿ has a coefficient C(n, r) on each term, and that the powers of a and b add to n.</li>
</ul>
`,
    "9b34477c-27c5-4eb8-9a65-e4fb425f5edc": `
<h3>Worked example: exact values and a quadrant rule</h3>
<p>Use the exact values sin 30° = ½, cos 45° = 1/√2 and tan 60° = √3. For an angle such as 150°, sin 150° = sin(180° − 30°) = sin 30° = ½, because sine is positive in the second quadrant. For 225°, tan 225° = tan 45° = 1, because tangent is positive in the third quadrant.</p>
<p>Draw a quick CAST diagram to decide the sign: all positive in the first quadrant, sine in the second, tangent in the third and cosine in the fourth.</p>
<h3>Solving a trigonometric equation</h3>
<p>Solve 2cos x = 1 for 0 ≤ x ≤ 2π. Then cos x = ½, so x = π/3 or x = 2π − π/3 = 5π/3. Always find the principal value first, then use the symmetry of the graph to find the other solutions in the range.</p>
<p>Solve 2sin²x − sin x − 1 = 0 for 0° ≤ x ≤ 360°. Factor as (2 sin x + 1)(sin x − 1) = 0. Then sin x = 1, giving x = 90°, or sin x = −½, giving x = 210° and 330°.</p>
<h3>Proving an identity</h3>
<p>Show that (sin x + cos x)² = 1 + sin 2x. Expand the left side: sin²x + 2 sin x cos x + cos²x. Use sin²x + cos²x = 1 to get 1 + 2 sin x cos x, and recall sin 2x = 2 sin x cos x, so the left side equals 1 + sin 2x.</p>
<h3>Graphs and transformations</h3>
<ul>
<li>y = 3 sin 2x + 1 has amplitude 3, period 180° (or π radians), and the maximum value 4 occurs at x = 45°.</li>
<li>The range of y = 3 sin 2x + 1 is −2 ≤ y ≤ 4.</li>
<li>A horizontal stretch by factor ½ halves the period; a vertical shift of +1 moves the whole graph up by one unit.</li>
</ul>
<h3>Common errors that lose marks</h3>
<ul>
<li>Working in degrees when the question uses radians, or the reverse. Check the units in the question before you start.</li>
<li>Giving only the principal value and missing the other solutions in the range. Always check the quadrant signs.</li>
<li>Squaring both sides of an equation to remove a root, which can add extra solutions. Check each answer in the original equation.</li>
</ul>
`
  }
};
