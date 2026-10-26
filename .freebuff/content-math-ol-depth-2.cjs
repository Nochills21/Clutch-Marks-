// Mathematics OL batch 2: Cambridge IGCSE Mathematics 0580 (2025-2027),
// section 2/3 - statements 2.9-2.12 and 3.1-3.7 (graphs and coordinate
// geometry, including the Extended differentiation introduction) and
// 2.7/2.13 (sequences and functions). Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-ol-depth-2.cjs > .freebuff-tmp/mth-ol-depth-2.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/mth-ol-depth-2.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/mth-ol-depth-2.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs mathematics OL
module.exports = {
  expectType: "notes",
  titles: {
    "32494a39-439f-420e-9bf7-d3421da7c2e6": "IGCSE Mathematics: Graphs and Coordinate Geometry",
    "7a6b58bd-8e42-4c07-8162-996586f0077b": "IGCSE Mathematics: Sequences and Functions",
  },
  rows: {
    "32494a39-439f-420e-9bf7-d3421da7c2e6": `
<h2>IGCSE Mathematics: Graphs and Coordinate Geometry</h2>
<p>Cambridge IGCSE Mathematics 0580 (2025–2027), section 2 statements 2.9 Graphs in practical situations, 2.10 Graphs of functions, 2.11 Sketching curves, 2.12 Differentiation (Extended), and section 3 statements 3.1 to 3.7 Coordinate geometry. Graphs turn algebra into pictures and pictures into algebra, and the coordinate geometry of straight lines is the most examined machinery in both papers. This note builds coordinates, gradient, the equation of a line, length and midpoint from scratch, then practical graphs, curves and the first steps of differentiation — with every formula derived rather than asserted.</p>

<h3>Coordinates and the Cartesian plane</h3>
<p>A point's position is given by an ordered pair (x, y): the x-coordinate says how far right (positive) or left (negative) of the origin, and the y-coordinate says how far up (positive) or down (negative). Order matters: (3, 5) is a different point from (5, 3). The plane is cut into four quadrants by the x-axis and y-axis, and a point on an axis has one coordinate equal to zero. Plotting accurately means counting in the scale given on the axes, marking with a small cross, and labelling the point.</p>

<h3>The gradient of a straight line</h3>
<p>Gradient measures steepness: how far the line rises or falls for each unit it runs to the right. The word to remember is <strong>vertical over horizontal</strong>.</p>
<pre><code>gradient = (change in y) / (change in x) = (y2 - y1) / (x2 - x1)</code></pre>
<ul>
<li>Gradient m is a number with no unit: 2 means the line rises 2 units for every 1 unit right.</li>
<li>Uphill lines have positive gradient, downhill lines negative; a horizontal line has gradient 0 and a vertical line has undefined gradient (zero run).</li>
<li>The gradient between two points is the same wherever the points are taken on a straight line — that constancy is what makes the line straight.</li>
</ul>
<p><strong>Why the formula works.</strong> Take points (1, 2) and (4, 10). Walking from the first to the second you go up 10 − 2 = 8 units and right 4 − 1 = 3 units, so the steepness is 8/3. The formula just records that walk for any two points.</p>
<pre><code>Find the gradient of the line through (-2, 5) and (3, -7):

m = (-7 - 5) / (3 - (-2)) = -12 / 5 = -2.4        [negative: the line falls to the right]</code></pre>

<h3>The equation of a straight line</h3>
<p>Every straight-line graph can be written as y = mx + c, where m is the gradient and c is the y-intercept (where the line crosses the y-axis). The formula calculates the y-value for any x, and it is the algebraic twin of the drawing.</p>
<pre><code>Find the equation of the line with gradient 2 passing through (1, 5):

y = mx + c gives 5 = 2(1) + c        [substitute the point and the gradient]
5 = 2 + c
c = 3
y = 2x + 3</code></pre>
<p>Given two points instead, find the gradient first, then use one point to find c. Given the intercept and a point, substitute. The form ax + by + d = 0 is the same line rearranged, and gradient-intercept form can always be recovered by solving for y.</p>
<p><strong>Parallel lines</strong> never meet, so they have equal gradients: m₁ = m₂. <strong>Perpendicular lines</strong> meet at right angles, and their gradients multiply to −1:</p>
<pre><code>m1 x m2 = -1        so the perpendicular gradient is  m2 = -1 / m1</code></pre>
<p><strong>Why −1.</strong> Rotating a right-angled triangle through 90° swaps its two legs and reverses one direction, turning a rise/run of m into a run/rise of −1/m. If one line has gradient 2, a line at right angles to it has gradient −1/2; if a line has gradient 0 (horizontal), the perpendicular line is vertical with undefined gradient.</p>
<pre><code>Find the equation of the line perpendicular to y = 3x - 4 passing through (3, 0):

perpendicular gradient = -1/3
y = (-1/3)x + c
0 = (-1/3)(3) + c = -1 + c,  so c = 1
y = -x/3 + 1</code></pre>

<h3>Length and midpoint of a line segment (Extended)</h3>
<p>The distance between two points is Pythagoras applied to the horizontal and vertical gaps; the midpoint is the average of the coordinates.</p>
<pre><code>length = √[(x2 - x1)^2 + (y2 - y1)^2]
midpoint = ((x1 + x2)/2, (y1 + y2)/2)</code></pre>
<p><strong>Why.</strong> The horizontal gap is (x₂ − x₁) and the vertical gap is (y₂ − y₁); these are the two shorter sides of a right-angled triangle whose hypotenuse is the distance, so Pythagoras gives the length at once. The midpoint formula is just the average of the two x-values and of the two y-values.</p>
<pre><code>Find the length and midpoint of the segment joining A(-1, 2) and B(5, 8):

horizontal gap = 5 - (-1) = 6;  vertical gap = 8 - 2 = 6
length = √(6^2 + 6^2) = √72 = 6√2 ≈ 8.49
midpoint = ((-1 + 5)/2, (2 + 8)/2) = (2, 5)</code></pre>

<h3>Graphs in practical situations</h3>
<p>Real data is plotted on axes carrying units, and the shape of the graph tells the story. The skills are reading values, finding gradients and interpreting what sections mean.</p>
<table border="1" cellpadding="6">
<tr><th>Graph</th><th>Vertical axis</th><th>Gradient means</th><th>Area means</th></tr>
<tr><td>Distance–time</td><td>Distance (m or km)</td><td>Speed</td><td>Not used</td></tr>
<tr><td>Speed–time</td><td>Speed (m s⁻¹)</td><td>Acceleration</td><td>Distance travelled</td></tr>
<tr><td>Temperature–time</td><td>Temperature (°C)</td><td>Rate of heating or cooling</td><td>Not used</td></tr>
<tr><td>Conversion graphs</td><td>One unit (e.g. °F)</td><td>The conversion rate</td><td>Not used</td></tr>
</table>
<p>A horizontal section means the quantity is constant; a steep section means fast change; a curved section means the rate itself is changing. Interpolation reads values inside the plotted range; extrapolation reads beyond it and is unreliable — a distinction the questions like to test. On a distance–time graph for a journey, a stop is flat, a return journey heads down, and the steepest section is the fastest.</p>

<h3>Graphs of functions and sketching curves</h3>
<p>A function is a machine turning x into y; its graph is all the (x, y) pairs it produces. To sketch, plot a short table of values and recognise the shape:</p>
<table border="1" cellpadding="6">
<tr><th>Function</th><th>Shape</th><th>Key features</th></tr>
<tr><td>y = mx + c</td><td>Straight line</td><td>Gradient m, crossing the y-axis at c</td></tr>
<tr><td>y = ax² + bx + c</td><td>Parabola (U-shape, or ∩ if a is negative)</td><td>Crosses the x-axis at the roots; turning point on the axis of symmetry midway between the roots</td></tr>
<tr><td>y = x³</td><td>S-shaped cubic</td><td>Flattening at the origin; grows steeply both ways</td></tr>
<tr><td>y = k/x</td><td>Hyperbola</td><td>Two branches; the axes are asymptotes the curve approaches but never touches</td></tr>
<tr><td>y = aˣ</td><td>Exponential growth</td><td>Passes through (0, 1); rises ever faster; never touches the x-axis</td></tr>
</table>
<p>Quadratics deserve particular care. The graph of y = ax² + bx + c has its turning point where x = −b/(2a), and the y-coordinate follows by substitution. Factorising y = (x − p)(x − q) shows the roots p and q at once, and the axis of symmetry is exactly halfway: x = (p + q)/2.</p>
<p><strong>Solving equations graphically.</strong> The roots of f(x) = 0 are where the curve crosses the x-axis. To solve f(x) = g(x), draw both graphs and read the x-coordinates of the intersection points. A rearrangement like x³ − 2x − 5 = 0 becomes y = x³ − 2x and y = 5: where they meet, the equation holds. Answers read from a graph are approximate, so always state them to the accuracy the graph supports.</p>

<h3>Gradients of curves and differentiation (Extended)</h3>
<p>A curve's gradient changes from point to point, so the straight-line formula does not apply directly. The fix is a limit: take two points on the curve closer and closer together, and the chord between them settles towards the <strong>tangent</strong> — the line that just touches the curve at that point. Its gradient is the instantaneous rate of change of y with respect to x: how fast y is changing at that exact moment, like a speedometer reading rather than an average speed.</p>
<pre><code>For y = x^n, the gradient function is:  dy/dx = n x^(n-1)</code></pre>
<ul>
<li>dy/dx: the gradient function, meaning the gradient at any value of x; it is read dy by dx.</li>
<li>n: the power of x in the term. Multiply by the power, then reduce the power by one: y = x³ gives dy/dx = 3x².</li>
<li>A constant term differentiates to zero (its graph is flat), and a constant multiple survives: y = 5x² gives dy/dx = 10x.</li>
</ul>
<p><strong>Why the rule works.</strong> Expand (x + h)ⁿ for a tiny step h, subtract y = xⁿ, and divide by h. For y = x²: [(x + h)² − x²]/h = [x² + 2xh + h² − x²]/h = (2xh + h²)/h = 2x + h. As h shrinks to nothing, this approaches 2x — exactly the rule. The same argument gives nxⁿ⁻¹ for every whole power.</p>
<p><strong>Stationary points</strong> are where the gradient is zero — the tops of hills and bottoms of valleys. Solve dy/dx = 0 for x, substitute back for y, then decide which by looking at the curve or the gradient either side: a maximum has positive gradient before and negative after; a minimum the reverse. Maximum and minimum questions are the standard Paper 4 use of differentiation.</p>

<h3>Worked example: tangent, stationary point and a practical graph</h3>
<p>For the curve y = x² − 4x + 3:</p>
<pre><code>dy/dx = 2x - 4
Stationary point: 2x - 4 = 0, so x = 2;  y = 4 - 8 + 3 = -1. The turning point is (2, -1).
Since the x^2 term is positive the parabola opens upwards, so (2, -1) is a minimum.
Roots: x^2 - 4x + 3 = (x - 1)(x - 3) = 0, so the curve crosses the x-axis at 1 and 3.
Gradient at x = 4: dy/dx = 2(4) - 4 = 4.
Tangent at x = 4: the point is (4, 3), and the tangent has gradient 4:
y - 3 = 4(x - 4), so y = 4x - 13.</code></pre>
<p>The axis of symmetry, x = 2, sits midway between the roots 1 and 3 — everything is consistent, and cross-checking like this catches slips before they cost marks.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Dividing the gradient the wrong way round: it is always (change in y) over (change in x), with the coordinates subtracted in the same order in both.</li>
<li>Reading c from where the line crosses the x-axis; the y-intercept is on the y-axis.</li>
<li>Assuming parallel and perpendicular lines share a rule: parallel gradients are equal, perpendicular gradients multiply to −1.</li>
<li>Forgetting to halve the step in a midpoint, or using the Pythagoras formula without squaring both gaps.</li>
<li>Confusing the x-intercepts with the turning point on a quadratic sketch, or sketching y = (x − 2)² as crossing the x-axis at −2 (the root is +2).</li>
<li>Treating the asymptote of y = k/x as part of the curve; the curve approaches the axes and never crosses them.</li>
<li>Quoting an average speed from a speed–time graph's gradient at one point; the gradient there is acceleration.</li>
<li>Differentiating x³ as 3x² and then claiming the gradient of y = x³ is 3 at x = 1 — correct value, but the method mark is for writing dy/dx = 3x² and substituting x = 1.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 3 marks).</strong> Find the gradient of the line through (2, 3) and (6, 11).</p>
<p>Answer: m = (11 − 3)/(6 − 2) = 8/4 = 2.</p>
<p><strong>Question 2 (Paper 2, 4 marks).</strong> Find the equation of the line with gradient −3 passing through (4, −2).</p>
<p>Answer: y = mx + c gives −2 = −3(4) + c, so c = 10 and the equation is y = −3x + 10.</p>
<p><strong>Question 3 (Paper 4, 4 marks).</strong> A line L passes through (1, 2) and (5, 10). Find the equation of the line perpendicular to L through the origin.</p>
<p>Answer: Gradient of L is (10 − 2)/(5 − 1) = 2, so the perpendicular gradient is −1/2. Through the origin c = 0, so y = −x/2.</p>
<p><strong>Question 4 (Paper 4, 5 marks).</strong> A car travels at 20 m s⁻¹ for 30 s, then decelerates uniformly to rest in 10 s. Sketch the speed–time graph and find the total distance.</p>
<p>Answer: The graph is a horizontal line at 20 from t = 0 to t = 30, then a straight fall from (30, 20) to (40, 0). Distance = area = rectangle 30 × 20 = 600 m plus triangle ½ × 10 × 20 = 100 m, total 700 m.</p>
<p><strong>Question 5 (Paper 4, 5 marks).</strong> For y = x² − 6x + 5, find the coordinates of the turning point and the roots, and sketch the curve.</p>
<p>Answer: dy/dx = 2x − 6 = 0 gives x = 3, y = 9 − 18 + 5 = −4, so the minimum is (3, −4). Roots: (x − 1)(x − 5) = 0 gives x = 1 and x = 5. The parabola opens upward through (1, 0) and (5, 0) with its minimum at (3, −4), crossing the y-axis at (0, 5).</p>
<p><strong>Question 6 (Paper 4, 4 marks).</strong> The points A(−2, 1), B(4, 7) and C(10, 1) form a triangle. Show that AB = BC and find the midpoint of AC.</p>
<p>Answer: AB = √[(4 − (−2))² + (7 − 1)²] = √(36 + 36) = √72 = 6√2. BC = √[(10 − 4)² + (1 − 7)²] = √(36 + 36) = √72 = 6√2. The two sides are equal, so the triangle is isosceles. Midpoint of AC = ((−2 + 10)/2, (1 + 1)/2) = (4, 1).</p>
<p>Graphs describe change; sequences describe discrete patterns, and functions describe the machines behind both.</p>
`,

    "7a6b58bd-8e42-4c07-8162-996586f0077b": `
<h2>IGCSE Mathematics: Sequences and Functions</h2>
<p>Cambridge IGCSE Mathematics 0580 (2025–2027), section 2 Algebra and graphs: statement 2.7 Sequences and statement 2.13 Functions (Extended). A sequence is a list of numbers generated by a rule; a function is the rule itself. This note builds nth-term rules from scratch — showing <em>why</em> the formula works, not just what it is — then function notation, composite functions and inverse functions, including the domain restrictions that decide whether an inverse exists.</p>

<h3>What a sequence is; term-to-term rules</h3>
<p>A sequence is an ordered list of numbers. The <strong>term-to-term rule</strong> gets from one term to the next: add 4, multiply by 2, subtract 1 then double. It tells you what happens step by step but not what the hundredth term is. The <strong>position-to-term rule</strong> (the nth term) gives any term directly from its position n, and that is the more powerful description.</p>
<pre><code>Sequence: 3, 7, 11, 15, 19, ...

Term-to-term: add 4 each time.
Position-to-term: the terms are 4 less than 4, 8, 12, 16, 20, ..., so the nth term is 4n - 1.

Check: n = 1 gives 4(1) - 1 = 3 ✓;  n = 5 gives 4(5) - 1 = 19 ✓</code></pre>

<h3>Linear sequences and the nth term</h3>
<p>A linear (arithmetic) sequence has a constant difference d between terms. Its nth term is dn + b, and b is chosen to make the first term correct.</p>
<pre><code>Find the nth term of 5, 8, 11, 14, ...

Constant difference d = 3, so the nth term starts as 3n.
Compare with the sequence: 3, 6, 9, 12, ... is three times the table of 3;
the real sequence is 2 more each time, so b = 2.
nth term:  3n + 2

Check every term: n = 1: 5 ✓   n = 2: 8 ✓   n = 3: 11 ✓
The 50th term is 3(50) + 2 = 152.</code></pre>
<p><strong>Why dn + b always works.</strong> Adding d each time from a starting value a means the nth term is a + (n − 1)d, since term n has had (n − 1) additions of d. Expanding gives a + nd − d = nd + (a − d), which is exactly dn + b with b = a − d. Both forms are the same rule; examiners accept either.</p>

<h3>Quadratic and special sequences</h3>
<p>When the first difference changes but the <strong>second difference</strong> is constant, the rule is quadratic: an² + bn + c. The method: build the n² sequence, subtract it from the sequence, and finish the linear remainder.</p>
<pre><code>Find the nth term of 2, 5, 10, 17, 26, ...

First differences: 3, 5, 7, 9;  second differences: 2, 2 (constant) -> quadratic.
The n^2 sequence is 1, 4, 9, 16, 25, ...
Subtract: (2-1), (5-4), (10-9), (17-16), (26-25) = 1, 1, 1, 1, 1
So the sequence is n^2 + 1.

Check: n = 3 gives 9 + 1 = 10 ✓</code></pre>
<p>Other sequences to recognise on sight: the triangular numbers n(n + 1)/2 (1, 3, 6, 10, ...), the square numbers n², the Fibonacci sequence (each term is the sum of the two before it, and it has no simple nth term), and geometric sequences that multiply by a fixed ratio r — their nth term is arⁿ⁻¹ where a is the first term.</p>
<pre><code>Geometric example: 3, 6, 12, 24, ... has a = 3 and r = 2, so the nth term is 3 x 2^(n-1).
The 6th term is 3 x 2^5 = 96.</code></pre>

<table border="1" cellpadding="6">
<tr><th>Sequence type</th><th>Example</th><th>Rule</th></tr>
<tr><td>Linear (arithmetic)</td><td>5, 8, 11, 14</td><td>Constant difference d; nth term dn + b</td></tr>
<tr><td>Quadratic</td><td>2, 5, 10, 17</td><td>Constant second difference; nth term an² + bn + c</td></tr>
<tr><td>Geometric</td><td>3, 6, 12, 24</td><td>Constant ratio r; nth term arⁿ⁻¹</td></tr>
<tr><td>Triangular numbers</td><td>1, 3, 6, 10</td><td>n(n + 1)/2</td></tr>
<tr><td>Square numbers</td><td>1, 4, 9, 16</td><td>n²</td></tr>
<tr><td>Fibonacci</td><td>1, 1, 2, 3, 5</td><td>Add the two previous terms (no simple nth term)</td></tr>
</table>
<p>Choosing the right description is half the battle: check the first differences, then the second, then the ratio, before assuming any rule. Once a candidate rule is found, verify it against every given term — a sequence that matches only the first three terms is not proven.</p>

<h3>Function notation</h3>
<p>A function is a machine with an input and exactly one output for each input. The notation f(x) = 2x + 3 names the machine f and says what it does to x: multiply by 2, then add 3. Evaluating is substitution: f(4) = 2(4) + 3 = 11. The machine picture matters: one input never gives two outputs, though two inputs may share an output.</p>
<ul>
<li>The <strong>domain</strong> is the set of allowed inputs; the <strong>range</strong> is the set of outputs the function actually produces.</li>
<li>For f(x) = x² with domain all real numbers, the range is y ⩾ 0, because squares are never negative.</li>
<li>For f(x) = 2x + 3 with domain 0 ⩽ x ⩽ 5, the range is 3 ⩽ f(x) ⩽ 13 — substitute the endpoints, since linear functions stretch ranges proportionally.</li>
</ul>
<p>Questions ask for the range in terms of y or f(x); find the outputs at the domain boundaries and, for quadratics, at the turning point.</p>

<h3>Composite functions</h3>
<p>A composite function runs one machine after the other. fg(x) means apply g first, then f to the result — the notation reads right to left, like f(g(x)).</p>
<pre><code>Given f(x) = 2x + 1 and g(x) = x^2, find fg(3), gf(x) and fg(x).

fg(3):  g(3) = 9, then f(9) = 2(9) + 1 = 19.
gf(x):  apply f first:  g(f(x)) = (2x + 1)^2 = 4x^2 + 4x + 1.
fg(x):  apply g first:  f(g(x)) = 2x^2 + 1.

Note fg(x) ≠ gf(x): order matters.</code></pre>
<p>Every line is written out because the most common error is applying the functions in the wrong order — and the composite is not commutative.</p>

<h3>Inverse functions</h3>
<p>The inverse f⁻¹ undoes f: if f turns 4 into 11, f⁻¹ turns 11 back into 4. Inverse functions exist only for <strong>one-to-one</strong> functions — ones where different inputs always give different outputs. The graph of y = x² is not one-to-one over all real numbers (both 3 and −3 give 9), so it has no inverse unless the domain is restricted to x ⩾ 0.</p>
<pre><code>Find the inverse of f(x) = (3x - 2)/5:

Write y = (3x - 2)/5 and make x the subject:
5y = 3x - 2          [multiply by 5]
5y + 2 = 3x          [add 2]
x = (5y + 2)/3       [divide by 3]

Swap x and y:  f^-1(x) = (5x + 2)/3

Check by composing: f^-1(f(x)) = [5((3x - 2)/5) + 2]/3 = [(3x - 2) + 2]/3 = 3x/3 = x  ✓</code></pre>
<ul>
<li>f⁻¹(x) is a single symbol meaning the inverse function; the −1 is not a power and f⁻¹(x) does not mean 1/f(x).</li>
<li>The domain of f⁻¹ is the range of f, and the range of f⁻¹ is the domain of f — they swap, exactly as the inputs and outputs swap roles.</li>
<li>Graphically, y = f⁻¹(x) is the reflection of y = f(x) in the line y = x.</li>
</ul>

<h3>Worked example: a full function question</h3>
<p>Let f(x) = x² + 3 for x ⩾ 0, and g(x) = 4x − 5.</p>
<pre><code>(a) Find f(2):  f(2) = 4 + 3 = 7.

(b) Find fg(x):  f(g(x)) = (4x - 5)^2 + 3 = 16x^2 - 40x + 25 + 3 = 16x^2 - 40x + 28.

(c) Find f^-1(x):  y = x^2 + 3, so x^2 = y - 3 and x = √(y - 3) (positive root, since x ⩾ 0).
Swap: f^-1(x) = √(x - 3).
Domain of f^-1: x ⩾ 3, which is exactly the range of f.

(d) Solve f(x) = 30 for x ⩾ 0:
x^2 + 3 = 30
x^2 = 27
x = √27 = 3√3 ≈ 5.20        [only the positive root is in the domain]</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Reading fg(x) as f then g. It is g first, then f — the notation runs right to left.</li>
<li>Assuming fg = gf; only special cases agree.</li>
<li>Treating f⁻¹(x) as 1/f(x). The inverse undoes the function; it is not a reciprocal.</li>
<li>Ignoring domain restrictions: with x ⩾ 0 on f(x) = x² + 3, the inverse takes the positive root only, and a negative root answer is wrong.</li>
<li>Claiming y = x² has an inverse over all real numbers; it is two-to-one and needs a restricted domain.</li>
<li>Building the nth term from the first difference alone without checking every term; a single wrong check sends a whole answer wrong.</li>
<li>Writing a geometric nth term as arⁿ instead of arⁿ⁻¹; the first term must be a itself.</li>
<li>Stating a range that ignores the turning point of a quadratic: the range of y = (x − 2)² + 1 is y ⩾ 1, not y ⩾ 0.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 3 marks).</strong> Find the nth term of 7, 11, 15, 19, ...</p>
<p>Answer: Constant difference 4, so 4n + b; the first term 7 = 4 + b gives b = 3. The nth term is 4n + 3. The 20th term is 83.</p>
<p><strong>Question 2 (Paper 2, 3 marks).</strong> A sequence has nth term 5n − 2. Write down the first four terms and the 100th.</p>
<p>Answer: n = 1, 2, 3, 4 give 3, 8, 13, 18; the 100th term is 5(100) − 2 = 498.</p>
<p><strong>Question 3 (Paper 4, 4 marks).</strong> f(x) = 3x − 1 and g(x) = x² + 2. Find fg(x), gf(2) and f⁻¹(x).</p>
<p>Answer: fg(x) = 3(x² + 2) − 1 = 3x² + 5. gf(2): f(2) = 5, so g(5) = 27. Inverse: y = 3x − 1 gives x = (y + 1)/3, so f⁻¹(x) = (x + 1)/3.</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> The second differences of a sequence are constant at 4, and its first two terms are 2 and 7. Find the nth term.</p>
<p>Answer: Constant second difference 4 means the n² coefficient is 4/2 = 2, so the rule starts 2n². The n² sequence gives 2, 8, ... while the sequence is 2, 7, ..., so the remainder is 0, −1, ... a linear part with difference −1: −n + 1. Check: 2n² − n + 1 gives n = 1: 2 ✓ and n = 2: 8 − 2 + 1 = 7 ✓. The nth term is 2n² − n + 1.</p>
<p><strong>Question 5 (Paper 4, 5 marks).</strong> f(x) = (x + 4)/(x − 2) for x ≠ 2. Find f⁻¹(x) and the value of x for which f(x) is undefined.</p>
<p>Answer: y = (x + 4)/(x − 2) gives y(x − 2) = x + 4, so yx − 2y = x + 4, yx − x = 2y + 4, x(y − 1) = 2y + 4 and x = (2y + 4)/(y − 1). Swapping: f⁻¹(x) = (2x + 4)/(x − 1). The function itself is undefined at x = 2, where the denominator vanishes; its inverse is undefined at x = 1.</p>
<p><strong>Question 6 (Paper 2, 3 marks).</strong> The first three terms of a geometric sequence are 5, 15, 45. Find the 8th term.</p>
<p>Answer: Common ratio r = 15/5 = 3, so the nth term is 5 × 3ⁿ⁻¹ and the 8th term is 5 × 3⁷ = 5 × 2187 = 10 935.</p>
<p>From variables and patterns, the course now turns to the number system itself.</p>
`,
  },
};
