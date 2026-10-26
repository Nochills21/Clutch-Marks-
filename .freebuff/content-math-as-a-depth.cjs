// Mathematics AS notes, deepened to the depth bar — Quadratics (1.1), Functions (1.2),
// Coordinate Geometry (1.3) and Circular Measure (1.4).
// Edexcel IAL Mathematics P1 (YMA01), unit framing P1.
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-as-a-depth.cjs > .freebuff-tmp/math-as-a.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-as-a.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-as-a.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "6d5aa4b1-9916-4af0-a529-74d409d9f9b9": "AS Level Mathematics: Quadratics",
    "f35f2af5-9d17-40d9-8772-d181fa861e96": "AS Level Mathematics: Functions",
    "7eaeae86-301f-41c8-9901-70ab01bf804c": "AS Level Mathematics: Coordinate Geometry",
    "929796bd-05c8-46af-85a3-af6815541b09": "AS Level Mathematics: Circular Measure",
  },
  rows: {
    "6d5aa4b1-9916-4af0-a529-74d409d9f9b9": `
<h2>AS Level Mathematics: Quadratics</h2>
<p>A quadratic is a curve you already know from everyday life: the path of a thrown ball, the profit curve of a business, the shape of a satellite dish. Algebraically it is any expression ax² + bx + c with a ≠ 0, and this note builds every technique the AS papers test: solving by factorising, completing the square and the formula; using the discriminant to count roots without solving; reading the vertex and intercepts off a sketch; and solving simultaneous and inequality problems where the quadratic meets a line. Every step is shown line by line, because the method marks live in the middle.</p>

<h3>The three forms of a quadratic</h3>
<table border="1" cellpadding="6">
<tr><th>Form</th><th>Expression</th><th>What it reveals</th></tr>
<tr><td>Standard</td><td>ax² + bx + c</td><td>the y-intercept is c</td></tr>
<tr><td>Factorised</td><td>a(x − p)(x − q)</td><td>roots at x = p and x = q</td></tr>
<tr><td>Completed square</td><td>a(x + h)² + k</td><td>vertex at (−h, k); minimum or maximum k</td></tr>
</table>
<p>The sign of a decides the shape: a > 0 opens upward (a minimum), a < 0 opens downward (a maximum). The axis of symmetry runs through the vertex, halfway between the roots.</p>

<h3>Solving by factorising</h3>
<p>Look for two numbers that multiply to ac and add to b, then split the middle term and factorise in pairs.</p>
<p><strong>Worked example.</strong> Solve 2x² + 7x + 3 = 0.</p>
<pre><code>ac = 6, b = 7: numbers 6 and 1
2x^2 + 6x + x + 3 = 0
2x(x + 3) + 1(x + 3) = 0
(2x + 1)(x + 3) = 0
x = -1/2 or x = -3</code></pre>
<p><strong>Worked example 2 (difference of squares).</strong> Solve 9x² − 25 = 0.</p>
<pre><code>(3x - 5)(3x + 5) = 0
x = 5/3 or x = -5/3</code></pre>

<h3>Completing the square</h3>
<p>Write x² + bx + c as (x + b/2)² − (b/2)² + c. The method: halve the coefficient of x, square the bracket, subtract the square of that half.</p>
<p><strong>Worked example.</strong> Write x² − 6x + 11 in completed-square form and state the vertex.</p>
<pre><code>x^2 - 6x + 11 = (x - 3)^2 - 9 + 11
              = (x - 3)^2 + 2
vertex: (3, 2); minimum value 2 at x = 3</code></pre>
<p><strong>Worked example 2 (leading coefficient not 1).</strong> Write 2x² + 8x + 5 in completed-square form.</p>
<pre><code>factor out 2: 2(x^2 + 4x) + 5
complete inside: 2[(x + 2)^2 - 4] + 5
= 2(x + 2)^2 - 8 + 5 = 2(x + 2)^2 - 3
vertex: (-2, -3); minimum -3</code></pre>
<p><strong>Worked example 3 (solving by completing the square).</strong> Solve x² + 4x − 1 = 0, giving exact answers.</p>
<pre><code>(x + 2)^2 - 4 - 1 = 0
(x + 2)^2 = 5
x + 2 = +/- sqrt(5)
x = -2 +/- sqrt(5)</code></pre>

<h3>The quadratic formula and the discriminant</h3>
<pre><code>x = (-b +/- sqrt(b^2 - 4ac)) / (2a)

discriminant D = b^2 - 4ac
D > 0: two distinct real roots
D = 0: one repeated root (the curve touches the x-axis)
D < 0: no real roots (the curve misses the x-axis)</code></pre>
<p><strong>Worked example.</strong> Solve 3x² − 5x − 2 = 0 using the formula.</p>
<pre><code>a = 3, b = -5, c = -2
D = 25 + 24 = 49
x = (5 +/- 7)/6
x = 12/6 = 2 or x = -2/6 = -1/3</code></pre>
<p><strong>Worked example 2 (discriminant).</strong> Find the values of k for which x² + kx + 9 = 0 has equal roots.</p>
<pre><code>equal roots: D = 0
k^2 - 36 = 0
k = 6 or k = -6</code></pre>

<h3>Sketching a quadratic</h3>
<p>A sketch needs four features: the shape (up or down from the sign of a), the y-intercept (c), the roots (from factorising or the formula) and the vertex (from completing the square or the midpoint of the roots). Mark them, then draw a smooth curve through them.</p>
<p><strong>Worked example.</strong> Sketch y = x² − 4x + 3.</p>
<pre><code>a = 1 > 0: opens upward
y-intercept: (0, 3)
roots: x^2 - 4x + 3 = (x - 1)(x - 3) -> x = 1, 3
vertex: (x - 2)^2 - 1 -> (2, -1)
axis of symmetry: x = 2</code></pre>

<h3>Simultaneous equations: a line and a curve</h3>
<p>The method: make one variable the subject in the line, substitute into the curve, solve the resulting quadratic, then find the partner values. Two solutions mean the line cuts the curve twice; one means it is a tangent; none means it misses.</p>
<p><strong>Worked example.</strong> Solve y = x² − 1 and y = 3x − 3.</p>
<pre><code>x^2 - 1 = 3x - 3
x^2 - 3x + 2 = 0
(x - 1)(x - 2) = 0  ->  x = 1 or x = 2
y = 3(1) - 3 = 0  and  y = 3(2) - 3 = 3
solutions: (1, 0) and (2, 3)</code></pre>
<p><strong>Worked example 2 (tangency condition).</strong> Find k such that y = 2x + k is tangent to y = x² + 3.</p>
<pre><code>x^2 + 3 = 2x + k  ->  x^2 - 2x + (3 - k) = 0
tangent: D = 0  ->  4 - 4(3 - k) = 0
4 - 12 + 4k = 0  ->  4k = 8  ->  k = 2</code></pre>

<h3>Quadratic inequalities</h3>
<p>Solve the corresponding equation first, sketch the parabola, then read which x-values satisfy the inequality.</p>
<p><strong>Worked example.</strong> Solve x² − x − 6 &lt; 0.</p>
<pre><code>roots: (x - 3)(x + 2) = 0  ->  x = 3, x = -2
the parabola opens upward, so it is below the axis between
the roots:  -2 < x < 3</code></pre>
<p><strong>Worked example 2 (outside).</strong> Solve x² − 4 ≥ 0.</p>
<pre><code>roots x = +/-2; upward parabola is above the axis outside:
x <= -2 or x >= 2</code></pre>

<h3>Disguised quadratics</h3>
<p>Many equations are quadratic in disguise: a substitution turns them into the standard form. The signal is a repeated expression appearing with two different powers — x⁴ and x², or 2^x and 2^(2x), or a trigonometric term squared and unsquared.</p>
<p><strong>Worked example 1.</strong> Solve x⁴ − 5x² + 4 = 0.</p>
<pre><code>let u = x^2:  u^2 - 5u + 4 = 0
(u - 1)(u - 4) = 0  ->  u = 1 or u = 4
back-substitute:
x^2 = 1  ->  x = +/-1
x^2 = 4  ->  x = +/-2
four solutions: x = 1, -1, 2, -2</code></pre>
<p><strong>Worked example 2 (exponential).</strong> Solve 2^(2x) − 5(2^x) + 4 = 0.</p>
<pre><code>let u = 2^x:  u^2 - 5u + 4 = 0  ->  u = 1 or 4
2^x = 1  ->  x = 0
2^x = 4  ->  x = 2</code></pre>
<p>The discipline is to return to the original variable at the end and to check that each candidate is valid in the original domain (a negative u cannot equal 2^x).</p>

<h3>Modelling with quadratics</h3>
<p>Applied questions give a context and expect you to build the quadratic, then use completing the square or the formula for a maximum or minimum.</p>
<p><strong>Worked example (area).</strong> A rectangular garden is to be fenced with 40 m of fencing against a wall (so only three sides need fencing). Find the maximum area.</p>
<pre><code>let the two equal sides be x; the third side is 40 - 2x
area A = x(40 - 2x) = 40x - 2x^2
complete the square: A = -2(x^2 - 20x) = -2[(x - 10)^2 - 100]
                    = -2(x - 10)^2 + 200
maximum area = 200 m2 when x = 10
(dimensions 10 m by 20 m)</code></pre>
<p><strong>Worked example 2 (profit).</strong> A stall sells n items at price (20 − 0.5n) pounds each. Find the number that maximises revenue.</p>
<pre><code>revenue R = n(20 - 0.5n) = 20n - 0.5n^2
R = -0.5(n^2 - 40n) = -0.5[(n - 20)^2 - 400]
  = -0.5(n - 20)^2 + 200
maximum revenue 200 pounds at n = 20 items</code></pre>
<p>Both examples share the signature: a product of two linear expressions in the same variable, completed to reveal a maximum. Negative leading coefficient means maximum; positive means minimum.</p>
<p><strong>Worked example 3 (sum and product of roots).</strong> For 2x² − 7x + 3 = 0, find the sum and product of the roots without solving.</p>
<pre><code>sum of roots = -b/a = 7/2
product of roots = c/a = 3/2
check by solving: (2x - 1)(x - 3) = 0 -> roots 1/2 and 3;
sum 3.5, product 1.5 - consistent</code></pre>
<p>These two relations are useful for forming equations from given roots and for checking a factorisation. If a question says the roots are p and q, the quadratic is x² − (p + q)x + pq = 0 (up to a constant factor). They also settle symmetric questions such as "find p² + q² given the equation": p² + q² = (p + q)² − 2pq, computed straight from the coefficients without finding the roots themselves.</p>
<p>A shortcut worth knowing for sketch questions: the vertex of y = ax² + bx + c sits at x = −b/(2a), and its y-coordinate comes from substituting that x back into the equation. This is the same result as completing the square, reached faster when only the turning point is needed and the exact form is not requested.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Factorise)</strong> Solve x² + x − 12 = 0. <em>Answer:</em> (x + 4)(x − 3) = 0 → x = −4 or 3.</li>
<li><strong>(Complete the square)</strong> Write x² + 8x + 10 in the form (x + p)² + q. <em>Answer:</em> (x + 4)² − 6.</li>
<li><strong>(Vertex)</strong> State the minimum point of y = (x − 5)² + 7. <em>Answer:</em> (5, 7).</li>
<li><strong>(Formula)</strong> Solve 2x² + 5x − 3 = 0. <em>Answer:</em> D = 25 + 24 = 49; x = (−5 ± 7)/4 = ½ or −3.</li>
<li><strong>(Discriminant)</strong> Show that x² + 2x + 5 = 0 has no real roots. <em>Answer:</em> D = 4 − 20 = −16 &lt; 0.</li>
<li><strong>(Simultaneous)</strong> Solve y = x² and y = x + 2. <em>Answer:</em> x² = x + 2 → x² − x − 2 = 0 → x = 2 or −1; points (2, 4) and (−1, 1).</li>
<li><strong>(Inequality)</strong> Solve x² + 3x − 10 &lt; 0. <em>Answer:</em> (x + 5)(x − 2) &lt; 0 → −5 &lt; x &lt; 2.</li>
<li><strong>(Tangent)</strong> Find k so that y = kx + 1 touches y = x² − 2x + 3. <em>Answer:</em> x² − (2 + k)x + 2 = 0; D = 0 → (2 + k)² = 8 → k = −2 ± 2√2.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Sign inside the completed square:</strong> x² − 6x completes to (x − 3)², not (x + 3)². The sign inside is half the coefficient's sign.</li>
<li><strong>Forgetting to subtract the square:</strong> (x + 4)² is x² + 8x + 16, so x² + 8x needs −16. The correction term is mandatory.</li>
<li><strong>Formula sign errors:</strong> x = (−b ± √(b² − 4ac))/2a — both terms negate b, and the whole numerator divides by 2a (not just the root).</li>
<li><strong>Discriminant conclusions:</strong> D > 0 means two roots, D = 0 one repeated, D < 0 none; "two roots" does not mean two positive roots.</li>
<li><strong>Inequality direction:</strong> for "&lt; 0" the solution lies between the roots when a > 0; for "&gt; 0" outside them. Sketching prevents reversal.</li>
<li><strong>Not using the original equation:</strong> when solving simultaneous equations, substitute back into the line (simpler) and state both coordinates.</li>
<li><strong>Dividing by x:</strong> x² = 4x gives x = 0 or x = 4; dividing by x loses the root x = 0.</li>
<li><strong>Sketch versus plot:</strong> a sketch needs shape, intercepts and turning point marked; a plot needs plotted points. Answer the question asked.</li>
</ul>
`,
    "f35f2af5-9d17-40d9-8772-d181fa861e96": `
<h2>AS Level Mathematics: Functions</h2>
<p>A function is a rule that turns each input into exactly one output — a machine with one chute per item. This note builds the whole AS treatment from zero: function notation with domain and range, the standard graphs and their shapes, composite functions and why order matters, inverses with their reflection in y = x, and the transformation rules that shift, stretch and reflect any graph. The marks in this topic come from precision — writing the correct domain, composing in the right order, and stating the rule for the inverse before using it.</p>

<h3>Notation, domain and range</h3>
<pre><code>f(x) = 2x + 3      "f of x"
f(4) = 11          substitute 4 for every x
domain: the set of allowed inputs
range: the set of outputs the function actually produces</code></pre>
<p>Domain restrictions matter: f(x) = 1/x is undefined at x = 0; f(x) = √x requires x ≥ 0; a quadratic over the reals has all reals as its domain. The range is found by considering the function's behaviour over its stated domain — for a quadratic, complete the square to find the minimum or maximum.</p>
<p><strong>Worked example.</strong> f(x) = x² − 4, domain x ≥ 0. Find the range.</p>
<pre><code>at x = 0: f = -4; the function increases without limit
range: f(x) >= -4</code></pre>
<p><strong>Worked example 2 (reciprocal).</strong> g(x) = 3/(x − 2), x ≠ 2. State the domain and range.</p>
<pre><code>domain: all real x except 2
range: all real values except 0 (the fraction can never be 0)</code></pre>

<h3>The standard graphs</h3>
<table border="1" cellpadding="6">
<tr><th>Function</th><th>Shape</th><th>Features</th></tr>
<tr><td>y = x</td><td>straight line</td><td>gradient 1, through origin</td></tr>
<tr><td>y = x²</td><td>parabola upward</td><td>minimum at origin, symmetric</td></tr>
<tr><td>y = x³</td><td>cubic, S-shaped</td><td>passes through origin, increasing</td></tr>
<tr><td>y = 1/x</td><td>two branches (hyperbola)</td><td>asymptotes x = 0 and y = 0</td></tr>
<tr><td>y = √x</td><td>half-parabola on its side</td><td>domain x ≥ 0, range y ≥ 0</td></tr>
<tr><td>y = |x|</td><td>V-shape</td><td>vertex at origin, domain all reals</td></tr>
<tr><td>y = aˣ (a &gt; 1)</td><td>exponential growth</td><td>always positive, through (0, 1)</td></tr>
</table>
<p>Knowing these shapes is the foundation of graph transformations and of estimating solutions graphically.</p>

<h3>Composite functions</h3>
<pre><code>fg(x) means f(g(x)): apply g first, then f
gf(x) means g(f(x)): apply f first, then g
in general fg(x) is not the same as gf(x)</code></pre>
<p><strong>Worked example.</strong> f(x) = 2x + 1, g(x) = x². Find fg(x) and gf(x).</p>
<pre><code>fg(x) = f(g(x)) = f(x^2) = 2x^2 + 1
gf(x) = g(f(x)) = (2x + 1)^2 = 4x^2 + 4x + 1
These differ, so order matters.</code></pre>
<p><strong>Worked example 2 (solving).</strong> With the same f and g, solve fg(x) = 19.</p>
<pre><code>2x^2 + 1 = 19
2x^2 = 18  ->  x^2 = 9  ->  x = 3 or x = -3</code></pre>

<h3>Inverse functions</h3>
<p>The inverse f⁻¹ undoes f: if f(a) = b then f⁻¹(b) = a. To find it, write y = f(x), swap x and y, and rearrange for y.</p>
<pre><code>method: y = f(x)  ->  x = f(y) after swap  ->  y = f^-1(x)</code></pre>
<p><strong>Worked example.</strong> Find the inverse of f(x) = 3x − 7.</p>
<pre><code>y = 3x - 7
swap: x = 3y - 7
rearrange: 3y = x + 7  ->  y = (x + 7)/3
f^-1(x) = (x + 7)/3</code></pre>
<p><strong>Worked example 2 (quadratic, restricted domain).</strong> f(x) = x² + 2 for x ≥ 0. Find f⁻¹ and its domain.</p>
<pre><code>y = x^2 + 2
swap: x = y^2 + 2  ->  y^2 = x - 2  ->  y = sqrt(x - 2)
(the negative root is rejected because the domain is x >= 0)
f^-1(x) = sqrt(x - 2), domain x >= 2</code></pre>
<p>Two properties worth remembering: the graph of f⁻¹ is the reflection of f in the line y = x, and the domain of f⁻¹ is the range of f (and vice versa).</p>

<h3>Transformations of graphs</h3>
<table border="1" cellpadding="6">
<tr><th>Transformation</th><th>Effect on the graph</th><th>What changes</th></tr>
<tr><td>y = f(x) + a</td><td>translate up by a</td><td>y-coordinates +a</td></tr>
<tr><td>y = f(x + a)</td><td>translate left by a</td><td>x replaced by x + a (inside: opposite direction)</td></tr>
<tr><td>y = af(x)</td><td>vertical stretch by a</td><td>y-coordinates × a</td></tr>
<tr><td>y = f(ax)</td><td>horizontal stretch by 1/a</td><td>x-coordinates ÷ a</td></tr>
<tr><td>y = −f(x)</td><td>reflection in the x-axis</td><td>y-coordinates negated</td></tr>
<tr><td>y = f(−x)</td><td>reflection in the y-axis</td><td>x-coordinates negated</td></tr>
</table>
<p>The inside/outside rule is the one that trips candidates: changes outside the bracket affect y and behave as written; changes inside affect x and behave in reverse.</p>
<p><strong>Worked example.</strong> The point (3, 5) lies on y = f(x). Find its image under y = f(x − 2) + 1.</p>
<pre><code>f(x - 2) shifts the graph 2 to the right; +1 shifts it up 1
image: (3 + 2, 5 + 1) = (5, 6)</code></pre>
<p><strong>Worked example 2 (stretch).</strong> The point (4, 1) is on y = f(x). Find its image under y = f(2x).</p>
<pre><code>horizontal stretch by 1/2: x-coordinate halves
image: (2, 1)</code></pre>

<h3>Rational functions and asymptotes</h3>
<p>A rational function is a ratio of polynomials, y = p(x)/q(x). Its graph is shaped by two constraints: where the denominator is zero the function is undefined (a vertical asymptote), and for large x the ratio settles to a horizontal asymptote determined by the leading terms.</p>
<pre><code>y = (ax + b)/(cx + d)
vertical asymptote: cx + d = 0  ->  x = -d/c
horizontal asymptote: y -> a/c as x -> +/- infinity
excluded value: the point where the denominator vanishes is
not in the domain</code></pre>
<p><strong>Worked example.</strong> Sketch y = 2/(x − 1) and state its domain and range.</p>
<pre><code>vertical asymptote x = 1 (denominator zero)
horizontal asymptote y = 0 (numerator fixed, denominator grows)
domain: x not equal to 1; range: y not equal to 0
the two branches lie in the regions x < 1 and x > 1</code></pre>
<p><strong>Worked example 2 (linear over linear).</strong> Sketch y = (x + 1)/(x − 2).</p>
<pre><code>vertical asymptote x = 2
horizontal asymptote y = 1 (leading coefficients 1/1)
intercepts: y = -1/2 at x = 0; x = -1 at y = 0</code></pre>

<h3>Exponential and logarithmic graphs</h3>
<p>Exponentials and logarithms are inverse functions, and their graphs encode that relationship. y = aˣ (a > 1) rises ever more steeply, passes through (0, 1) and never touches the x-axis — the x-axis is an asymptote. y = log_a x is the reflection in y = x: it passes through (1, 0), has a vertical asymptote at x = 0, and is defined only for x > 0.</p>
<ul>
<li><strong>Growth and decay:</strong> y = Ae^(kx) grows for k > 0 and decays for k < 0; the constant A is the value at x = 0.</li>
<li><strong>Logarithm laws:</strong> log(ab) = log a + log b; log(a/b) = log a − log b; log(aⁿ) = n log a.</li>
<li><strong>Solving exponentials:</strong> take logs of both sides — 3^x = 20 gives x log 3 = log 20, so x = log 20/log 3 ≈ 2.73.</li>
</ul>
<p><strong>Worked example.</strong> Solve 5^(2x−1) = 40.</p>
<pre><code>(2x - 1) log 5 = log 40
2x - 1 = log 40/log 5 = 1.602/0.699 = 2.292
2x = 3.292  ->  x = 1.65 (3 s.f.)</code></pre>
<p><strong>Worked example 2 (modelling with an exponential).</strong> A colony of bacteria doubles every 3 hours, starting at 500. Write the population after t hours and find when it reaches 20 000.</p>
<pre><code>P = 500 x 2^(t/3)
20000 = 500 x 2^(t/3)  ->  40 = 2^(t/3)
log 40 = (t/3) log 2  ->  t/3 = 5.322  ->  t = 16.0 hours</code></pre>
<p>The modelling step — translating "doubles every 3 hours" into 2^(t/3) — is where most marks are lost; write the base (2 for doubling, 0.5 for halving) and the exponent (time divided by the period) explicitly before solving. For decay, the same structure with a base below 1 (or a negative exponent) describes cooling, depreciation and radioactive half-life, so one pattern covers a whole family of questions.</p>

<h3>Worked examples: mixed function problems</h3>
<p><strong>Worked example.</strong> f(x) = x + 2, g(x) = 3x. Find f⁻¹(x), fg(x), and show that f⁻¹(fg(x)) = g(x).</p>
<pre><code>f^-1(x) = x - 2
fg(x) = 3x + 2
f^-1(fg(x)) = (3x + 2) - 2 = 3x = g(x)</code></pre>
<p><strong>Worked example 2 (range of composite).</strong> f(x) = x², g(x) = x + 1. Find the range of fg for x ≥ 0.</p>
<pre><code>fg(x) = (x + 1)^2
for x >= 0: x + 1 >= 1  ->  fg(x) >= 1
range: fg(x) >= 1</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Evaluate)</strong> f(x) = 2x² − 1. Find f(−3). <em>Answer:</em> 2(9) − 1 = 17.</li>
<li><strong>(Domain)</strong> State the domain of g(x) = 1/(x + 4). <em>Answer:</em> x ≠ −4.</li>
<li><strong>(Composite)</strong> f(x) = x + 3, g(x) = 2x. Find fg(x). <em>Answer:</em> 2x + 3.</li>
<li><strong>(Inverse)</strong> Find the inverse of h(x) = (x − 5)/2. <em>Answer:</em> y = 2x + 5.</li>
<li><strong>(Inverse domain)</strong> f(x) = x² + 1 for x ≥ 0. State the domain of f⁻¹. <em>Answer:</em> x ≥ 1 (the range of f).</li>
<li><strong>(Transformation)</strong> Describe the transformation y = f(x) → y = f(x + 3) − 2. <em>Answer:</em> translation 3 left and 2 down.</li>
<li><strong>(Point image)</strong> (2, 7) is on y = f(x). Find its image on y = 2f(x). <em>Answer:</em> (2, 14).</li>
<li><strong>(Reasoning)</strong> Explain why f⁻¹(f(x)) = x. <em>Answer:</em> The inverse undoes the function: applying f then f⁻¹ returns the original input for every x in the domain of f.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Order of composition:</strong> fg means g first. Writing f(g(x)) as f(x)g(x) (a product) is a fundamental error.</li>
<li><strong>Inside transformations reversed:</strong> f(x + 3) moves left, not right; f(2x) compresses horizontally by ½, not stretches by 2.</li>
<li><strong>Inverse of a quadratic without restriction:</strong> x² has no inverse over all reals because it is not one-to-one; the domain restriction is what makes the inverse valid.</li>
<li><strong>Dropping the ± in inverse quadratics:</strong> keep the root that matches the stated domain; state which and why.</li>
<li><strong>Domain notation:</strong> write inequalities or set notation precisely (x ≠ 2; x ≥ 0); "all numbers" is rarely correct.</li>
<li><strong>Confusing f⁻¹(x) with 1/f(x):</strong> the inverse is not the reciprocal. This is the most common notation trap.</li>
<li><strong>Range from the wrong feature:</strong> for a quadratic on a restricted domain, evaluate the endpoints and the vertex — the range may be bounded at both ends.</li>
<li><strong>Sketch axes:</strong> label asymptotes for reciprocal and exponential graphs; an unlabelled sketch loses communication marks.</li>
</ul>
`,
    "7eaeae86-301f-41c8-9901-70ab01bf804c": `
<h2>AS Level Mathematics: Coordinate Geometry</h2>
<p>Coordinate geometry turns shapes into algebra: every line is an equation, every intersection is a simultaneous equation, and every circle is a completed square waiting to happen. This note builds the whole AS toolkit from zero: distance and midpoint, gradients with the parallel and perpendicular rules, the three forms of a line's equation, intersections and perpendicular bisectors, circles in both centre-radius and expanded form, and tangents and normals to circles. Every worked example writes the formula line first, because that is where the method marks are.</p>

<h3>Distance and midpoint</h3>
<pre><code>distance between (x1, y1) and (x2, y2):
d = sqrt((x2 - x1)^2 + (y2 - y1)^2)

midpoint: ((x1 + x2)/2, (y1 + y2)/2)</code></pre>
<p>The distance formula is Pythagoras in disguise: the horizontal and vertical gaps are the legs of a right triangle, and the distance is the hypotenuse.</p>
<p><strong>Worked example.</strong> Find the distance and midpoint of A(1, 2) and B(7, 10).</p>
<pre><code>d = sqrt(6^2 + 8^2) = sqrt(100) = 10
midpoint = ((1 + 7)/2, (2 + 10)/2) = (4, 6)</code></pre>

<h3>Gradient and the parallel/perpendicular rules</h3>
<pre><code>gradient m = (y2 - y1)/(x2 - x1)   (rise over run)

parallel lines: m1 = m2
perpendicular lines: m1 x m2 = -1   (m2 = -1/m1)</code></pre>
<p><strong>Worked example.</strong> Find the gradient of AB for A(1, 2), B(5, 10), and the gradient of a line perpendicular to it.</p>
<pre><code>m = (10 - 2)/(5 - 1) = 8/4 = 2
perpendicular gradient = -1/2</code></pre>
<p><strong>Worked example 2 (collinearity).</strong> Show A(1, 1), B(3, 5), C(5, 9) are collinear.</p>
<pre><code>m(AB) = 4/2 = 2;  m(BC) = 4/2 = 2
equal gradients and a shared point B, so collinear</code></pre>

<h3>Equations of straight lines</h3>
<p>Three forms, each useful in its own situation:</p>
<ul>
<li><strong>y = mx + c:</strong> gradient m, y-intercept c. Use when you know both.</li>
<li><strong>y − y₁ = m(x − x₁):</strong> point-slope form. Use when you know a point and the gradient.</li>
<li><strong>ax + by + c = 0:</strong> general form. Rearrange to find m and c when needed.</li>
</ul>
<p><strong>Worked example 1.</strong> Find the equation of the line through (2, 5) with gradient 3.</p>
<pre><code>y - 5 = 3(x - 2)
y = 3x - 6 + 5
y = 3x - 1</code></pre>
<p><strong>Worked example 2 (two points).</strong> Find the equation of the line through (1, 4) and (4, 13).</p>
<pre><code>m = (13 - 4)/(4 - 1) = 9/3 = 3
using (1, 4): y - 4 = 3(x - 1)  ->  y = 3x + 1</code></pre>
<p><strong>Worked example 3 (perpendicular).</strong> Find the line through (2, 1) perpendicular to y = 2x + 3.</p>
<pre><code>perpendicular gradient = -1/2
y - 1 = -1/2 (x - 2)
y = -x/2 + 1 + 1 = -x/2 + 2</code></pre>

<h3>Intersections and the perpendicular bisector</h3>
<p>Two lines meet where their equations are simultaneously true: set them equal and solve. The perpendicular bisector of AB passes through the midpoint of AB with gradient −1/m(AB).</p>
<p><strong>Worked example.</strong> Find where y = 3x − 1 meets y = −x + 7.</p>
<pre><code>3x - 1 = -x + 7
4x = 8  ->  x = 2;  y = 3(2) - 1 = 5
intersection: (2, 5)</code></pre>
<p><strong>Worked example 2 (perpendicular bisector).</strong> Find the perpendicular bisector of A(1, 2) and B(5, 10).</p>
<pre><code>midpoint = (3, 6)
m(AB) = 8/4 = 2  ->  perpendicular gradient = -1/2
y - 6 = -1/2 (x - 3)
y = -x/2 + 3/2 + 6 = -x/2 + 7.5</code></pre>

<h3>Circles: centre-radius form</h3>
<pre><code>(x - a)^2 + (y - b)^2 = r^2
centre (a, b), radius r

expanded form x^2 + y^2 + 2fx + 2gy + c = 0:
complete the square in x and y to recover the centre and radius</code></pre>
<p><strong>Worked example 1.</strong> State the centre and radius of (x − 3)² + (y + 2)² = 25.</p>
<pre><code>centre (3, -2); radius = 5</code></pre>
<p><strong>Worked example 2 (completing the square).</strong> Find the centre and radius of x² + y² − 6x + 8y − 11 = 0.</p>
<pre><code>(x^2 - 6x) + (y^2 + 8y) = 11
(x - 3)^2 - 9 + (y + 4)^2 - 16 = 11
(x - 3)^2 + (y + 4)^2 = 36
centre (3, -4), radius 6</code></pre>
<p><strong>Worked example 3 (circle from diameter).</strong> AB is a diameter with A(1, 2) and B(7, 10). Find the circle's equation.</p>
<pre><code>centre = midpoint = (4, 6)
radius = half the distance = 10/2 = 5
(x - 4)^2 + (y - 6)^2 = 25</code></pre>

<h3>Tangents and normals to circles</h3>
<p>A tangent to a circle is perpendicular to the radius at the point of contact. The method: find the gradient of the radius from the centre to the point, take the negative reciprocal for the tangent, then use the point-slope form.</p>
<p><strong>Worked example.</strong> Find the tangent to the circle centre (2, 3) at the point (5, 7).</p>
<pre><code>radius gradient = (7 - 3)/(5 - 2) = 4/3
tangent gradient = -3/4
y - 7 = -3/4 (x - 5)
4y - 28 = -3x + 15
3x + 4y = 43</code></pre>
<p><strong>Worked example 2 (tangent length).</strong> From the point P(8, 3), find the length of the tangent to the circle (x − 2)² + (y − 1)² = 13.</p>
<pre><code>centre C(2, 1), radius sqrt(13)
distance PC = sqrt(6^2 + 2^2) = sqrt(40)
tangent^2 = PC^2 - r^2 = 40 - 13 = 27
tangent length = sqrt(27) = 3 sqrt(3) = 5.20</code></pre>
<p>The right angle between radius and tangent makes every tangent-length question a Pythagoras problem in disguise; drawing the radius to the contact point is the step that unlocks it.</p>
<p><strong>Worked example 2 (normal).</strong> The normal at a point on a circle is the radius line extended. Find the normal at the same point.</p>
<pre><code>normal gradient = radius gradient = 4/3
y - 7 = 4/3 (x - 5)  ->  4x - 3y + 1 = 0 (rearranged)</code></pre>

<h3>Circles and lines: intersection problems</h3>
<p>Where a line meets a circle, substitute the line into the circle's equation and solve the resulting quadratic. The discriminant then classifies the geometry: two roots mean a secant (two intersection points), one root means a tangent, none means the line misses the circle.</p>
<pre><code>substitute y = mx + c into (x - a)^2 + (y - b)^2 = r^2
solve for x; each x gives a y from the line
discriminant > 0: two points; = 0: tangent; < 0: no intersection</code></pre>
<p><strong>Worked example.</strong> Find the intersection of y = x + 1 with x² + y² = 25.</p>
<pre><code>x^2 + (x + 1)^2 = 25
2x^2 + 2x + 1 - 25 = 0
x^2 + x - 12 = 0
(x + 4)(x - 3) = 0  ->  x = -4 or 3
y = -3 or 4
points: (-4, -3) and (3, 4)</code></pre>
<p><strong>Worked example 2 (tangent condition).</strong> Show that y = 2x + 10 is tangent to x² + y² = 20.</p>
<pre><code>x^2 + (2x + 10)^2 = 20
5x^2 + 40x + 100 - 20 = 0
5x^2 + 40x + 80 = 0  ->  x^2 + 8x + 16 = 0
(x + 4)^2 = 0: repeated root, so tangent at x = -4, y = 2</code></pre>

<h3>Modelling with straight lines</h3>
<p>Linear models answer practical questions: when two plans cost the same, how a quantity changes at a constant rate, what a graph's gradient means in context. The method is to identify the two variables, write each relationship as a line, and solve simultaneously — then interpret the answer in the units of the problem.</p>
<p><strong>Worked example.</strong> A taxi charges a fixed 3 pounds plus 1.50 pounds per kilometre; a rival charges 6 pounds plus 1.00 pound per kilometre. Find the distance at which the charges are equal.</p>
<pre><code>3 + 1.5d = 6 + 1.0d
0.5d = 3  ->  d = 6 km
both charge 12 pounds at 6 km</code></pre>
<p><strong>Worked example 2 (gradient meaning).</strong> A graph of value against age for a car is a straight line through (0, 18000) and (4, 10000). Interpret the gradient.</p>
<pre><code>gradient = (10000 - 18000)/4 = -2000
meaning: the car loses 2000 pounds of value per year</code></pre>

<h3>Worked examples: mixed coordinate problems</h3>
<p><strong>Worked example.</strong> The line y = 2x + k is a tangent to the circle x² + y² = 20. Find k.</p>
<pre><code>substitute: x^2 + (2x + k)^2 = 20
x^2 + 4x^2 + 4kx + k^2 - 20 = 0
5x^2 + 4kx + (k^2 - 20) = 0
tangent: discriminant = 0
16k^2 - 20(k^2 - 20) = 0
16k^2 - 20k^2 + 400 = 0  ->  4k^2 = 400  ->  k = +/-10</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Distance)</strong> Find the distance between (2, 1) and (5, 5). <em>Answer:</em> √(9 + 16) = 5.</li>
<li><strong>(Gradient)</strong> Find the gradient through (3, 4) and (7, 12). <em>Answer:</em> 8/4 = 2.</li>
<li><strong>(Perpendicular)</strong> A line has gradient −⅔. Find the gradient of a perpendicular line. <em>Answer:</em> 3/2.</li>
<li><strong>(Equation)</strong> Find the line through (0, 3) with gradient −2. <em>Answer:</em> y = −2x + 3.</li>
<li><strong>(Circle)</strong> State the centre and radius of (x + 1)² + (y − 4)² = 9. <em>Answer:</em> centre (−1, 4), radius 3.</li>
<li><strong>(Completing the square)</strong> Find the centre and radius of x² + y² + 4x − 2y − 4 = 0. <em>Answer:</em> (x + 2)² + (y − 1)² = 9 → centre (−2, 1), radius 3.</li>
<li><strong>(Tangent)</strong> Find the tangent to x² + y² = 25 at (3, 4). <em>Answer:</em> radius gradient 4/3, tangent gradient −3/4; 3x + 4y = 25.</li>
<li><strong>(Midpoint/distance)</strong> Show that (1, 2), (5, 6), (9, 10) are collinear. <em>Answer:</em> gradients both 1; shared point → collinear.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Gradient sign errors:</strong> (y₂ − y₁)/(x₂ − x₁) — subtracting in the wrong order flips the sign. Keep the same point first in both differences.</li>
<li><strong>Perpendicular as negative:</strong> the perpendicular gradient is the negative reciprocal (−1/m), not just −m.</li>
<li><strong>Circle sign reversal:</strong> (x + 2)² means centre x = −2; (y − 5)² means y = 5. The sign inside is opposite to the centre coordinate.</li>
<li><strong>Radius squared:</strong> in (x − a)² + (y − b)² = 25 the radius is 5, not 25. Take the square root.</li>
<li><strong>Completing the square with coefficients:</strong> halve the x-coefficient and subtract its square; forgetting the subtraction changes the radius.</li>
<li><strong>Tangent versus normal:</strong> tangent is perpendicular to the radius; normal is along the radius. Swapping their gradients inverts the answer.</li>
<li><strong>Intersection arithmetic:</strong> after finding x, substitute into the simpler equation for y, and check both points when a quadratic gives two solutions.</li>
<li><strong>Sketching circles:</strong> mark the centre and radius explicitly; a circle without its centre marked cannot be checked.</li>
</ul>
`,
    "929796bd-05c8-46af-85a3-af6815541b09": `
<h2>AS Level Mathematics: Circular Measure</h2>
<p>Radians measure angles by the arc they cut: one radian is the angle subtended when the arc equals the radius. That definition makes every circle formula simpler — arc length becomes s = rθ and sector area becomes ½r²θ, with no 360 in sight. This note builds the topic from zero: the radian definition and conversions, arc length and sector area with derivations, the segment area formula, and the applied problems (belts, pendulums, cones) that combine circular measure with trigonometry. Every worked example keeps the calculator in radian mode, which is the first habit this topic demands.</p>

<h3>Radians and conversion</h3>
<pre><code>one full turn = 2 pi radians = 360 degrees
pi radians = 180 degrees

degrees -> radians: multiply by pi/180
radians -> degrees: multiply by 180/pi

common values: 30 deg = pi/6, 45 deg = pi/4,
60 deg = pi/3, 90 deg = pi/2, 180 deg = pi</code></pre>
<p><strong>Worked example.</strong> Convert 150° to radians and 2.4 radians to degrees.</p>
<pre><code>150 x pi/180 = 5 pi/6 = 2.618 rad
2.4 x 180/pi = 137.5 deg</code></pre>
<p>Why radians: the arc length formula s = rθ only works when θ is in radians. In degrees the same arc is (θ/360) × 2πr — the same quantity, but with the conversion built in.</p>

<h3>Arc length and sector area</h3>
<pre><code>arc length: s = r theta
sector area: A = (1/2) r^2 theta
perimeter of a sector: s + 2r

(theta in radians, r in the same length unit as s)</code></pre>
<p><strong>Worked example 1.</strong> A sector has radius 8 cm and angle 1.5 radians. Find the arc length and area.</p>
<pre><code>s = r theta = 8 x 1.5 = 12 cm
A = (1/2) r^2 theta = 0.5 x 64 x 1.5 = 48 cm2</code></pre>
<p><strong>Worked example 2 (perimeter).</strong> Find the perimeter of the same sector.</p>
<pre><code>perimeter = arc + 2 radii = 12 + 16 = 28 cm</code></pre>
<p><strong>Worked example 3 (working backwards).</strong> A sector of radius 6 cm has area 27 cm². Find the angle in radians and degrees.</p>
<pre><code>27 = (1/2)(36) theta  ->  27 = 18 theta  ->  theta = 1.5 rad
in degrees: 1.5 x 180/pi = 85.9 deg</code></pre>

<h3>Segment area</h3>
<pre><code>segment area = sector area - triangle area
             = (1/2) r^2 theta - (1/2) r^2 sin(theta)
             = (1/2) r^2 (theta - sin theta)</code></pre>
<p>The triangle is formed by the two radii and the chord; its area uses ½r² sin θ (the sine rule area formula). The subtraction is always the same picture: the segment is the sector with the triangle removed.</p>
<p><strong>Worked example.</strong> Find the area of the segment cut off by a chord in a circle of radius 10 cm when the angle at the centre is 1.2 radians.</p>
<pre><code>sector area = (1/2)(100)(1.2) = 60 cm2
triangle area = (1/2)(100) sin(1.2) = 50 x 0.932 = 46.6 cm2
segment = 60 - 46.6 = 13.4 cm2</code></pre>

<h3>Worked examples: the standard exam types</h3>
<p><strong>Worked example 1 (belt around pulleys).</strong> Two pulleys of radius 0.20 m and 0.50 m have centres 1.5 m apart. Find the length of the belt around them (straight sections plus arcs).</p>
<pre><code>straight sections: 2 x 1.5 = 3.0 m (approximately, for the
common external tangents when the radii differ the geometry
needs the tangent length, but the exam version usually gives
equal pulleys or the tangent length directly)
equal-pulley version: belt = 2d + 2 pi r = 3.0 + 1.26 = 4.26 m</code></pre>
<p><strong>Worked example 2 (pendulum arc).</strong> A pendulum of length 0.80 m swings through 0.6 radians. Find the arc length travelled by the bob.</p>
<pre><code>s = r theta = 0.80 x 0.6 = 0.48 m</code></pre>
<p><strong>Worked example 3 (cone sector).</strong> A sector of radius 12 cm and angle 2.0 radians is folded into a cone. Find the base radius.</p>
<pre><code>arc length becomes the base circumference:
s = 12 x 2.0 = 24 cm
2 pi r_base = 24  ->  r_base = 24/(2 pi) = 3.82 cm</code></pre>

<h3>Radian trigonometry and small angles</h3>
<p>In radian mode, the trigonometric functions take radian inputs, and small-angle approximations become available: for small θ, sin θ ≈ θ and tan θ ≈ θ (with θ in radians), and cos θ ≈ 1 − θ²/2. These approximations underpin pendulum motion and lens theory later, and they appear in exam questions as "show that for small θ ...".</p>
<p><strong>Worked example.</strong> Show that for small θ, the arc length and the chord length are approximately equal.</p>
<pre><code>arc = r theta
chord = 2r sin(theta/2) ~ 2r (theta/2) = r theta  for small theta
so chord ~ arc, with the difference of order theta^3</code></pre>

<h3>Composite shapes with sectors</h3>
<p>Exam figures combine sectors with triangles, rectangles and semicircles. The method is always the same: shade the required region, split it into standard pieces, compute each piece with the radian formulas, then add or subtract. Perimeter questions require the boundary only — internal lines are not part of it.</p>
<p><strong>Worked example.</strong> A shape is a rectangle 12 cm by 8 cm with a quarter-circle of radius 8 cm removed from one corner. Find the area and perimeter of the remaining shape.</p>
<pre><code>rectangle area = 96 cm2
quarter circle = (1/4) pi r^2 = (1/4)(3.142)(64) = 50.3 cm2
remaining area = 96 - 50.3 = 45.7 cm2

perimeter: straight edges 12 + 4 + 8 = 24 cm (the 4 cm is the
remaining part of the 8 cm side)
plus the arc: quarter circumference = (1/4)(2 pi)(8) = 12.6 cm
total perimeter = 36.6 cm</code></pre>
<p><strong>Worked example 2 (two sectors).</strong> Two circles of radius 5 cm have centres 8 cm apart. Find the area common to both.</p>
<pre><code>the overlap is two identical segments. In each circle the chord
subtends an angle theta where cos(theta/2) = 4/5, so theta/2 =
0.6435 and theta = 1.287 rad.
segment area = (1/2)(25)(1.287 - sin 1.287)
             = 12.5(1.287 - 0.960) = 4.09 cm2
common area = 2 x 4.09 = 8.18 cm2</code></pre>

<h3>Arc, chord and sector in practice</h3>
<p>Three quantities are easy to confuse and each has its own formula. Keep them side by side:</p>
<table border="1" cellpadding="6">
<tr><th>Quantity</th><th>Formula (theta in radians)</th><th>What it measures</th></tr>
<tr><td>Arc length</td><td>s = r theta</td><td>the curved boundary</td></tr>
<tr><td>Chord length</td><td>c = 2r sin(theta/2)</td><td>the straight line joining the arc's ends</td></tr>
<tr><td>Sector area</td><td>A = (1/2) r^2 theta</td><td>the pie-slice region</td></tr>
</table>
<p><strong>Worked example.</strong> A sector has radius 10 cm and angle 1.0 rad. Find the arc length, chord length and the difference between them.</p>
<pre><code>arc = 10 x 1.0 = 10.0 cm
chord = 2 x 10 x sin(0.5) = 20 x 0.4794 = 9.59 cm
difference = 0.41 cm (the arc bulges beyond the chord)</code></pre>
<p><strong>Worked example (angular speed).</strong> A wheel of radius 0.35 m turns at 12 rad s⁻¹. Find the linear speed of a point on its rim and the angle turned in 5 s.</p>
<pre><code>v = r omega = 0.35 x 12 = 4.2 m s-1
angle = omega t = 12 x 5 = 60 rad (about 9.5 full turns)</code></pre>
<p>Angular speed links circular measure to mechanics: one radian per second means one radius of arc per second, so the rim speed is rω. Exam questions on rotating wheels, pulleys and centrifuges all reduce to this one relation, and it also explains why a point near the rim of a wheel moves faster than a point near the hub despite both completing a turn in the same time. The same relation converts between the two ways of measuring rotation: revolutions per minute to radians per second is a factor of 2π/60.</p>
<p>The difference is the sagitta-related gap that appears in lens and bridge questions; it grows as the angle grows, which is why the small-angle approximation fails for large sectors.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Convert)</strong> Convert 72° to radians. <em>Answer:</em> 72 × π/180 = 2π/5 ≈ 1.257 rad.</li>
<li><strong>(Arc)</strong> Radius 5 cm, θ = 2.0 rad. Find the arc length. <em>Answer:</em> 10 cm.</li>
<li><strong>(Sector)</strong> Radius 4 cm, θ = 3.0 rad. Find the area. <em>Answer:</em> ½ × 16 × 3 = 24 cm².</li>
<li><strong>(Reverse)</strong> A sector of radius 9 cm has arc length 13.5 cm. Find θ in radians. <em>Answer:</em> θ = 13.5/9 = 1.5 rad.</li>
<li><strong>(Segment)</strong> Radius 6 cm, θ = π/3. Find the segment area. <em>Answer:</em> sector = ½ × 36 × π/3 = 6π ≈ 18.85; triangle = ½ × 36 × sin(π/3) = 18 × 0.866 = 15.59; segment ≈ 3.26 cm².</li>
<li><strong>(Perimeter)</strong> Find the perimeter of a sector of radius 7 cm and angle 0.8 rad. <em>Answer:</em> arc 5.6 + 14 = 19.6 cm.</li>
<li><strong>(Cone)</strong> A sector of radius 10 cm and angle 1.8 rad forms a cone. Find the base radius and slant height. <em>Answer:</em> arc = 18 cm → base radius 18/(2π) = 2.86 cm; slant height = 10 cm.</li>
<li><strong>(Small angle)</strong> Use sin θ ≈ θ to estimate sin(0.10) and compare with the calculator value. <em>Answer:</em> ≈ 0.10; calculator 0.0998 — agreement to about 0.2%.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Degree mode:</strong> every radians formula requires the calculator in RAD mode. A sin of 1.2 in degree mode gives an entirely different number.</li>
<li><strong>Mixing units:</strong> s = rθ silently assumes r in metres and s in metres; cm and m mixed in one calculation produces a factor-of-100 error.</li>
<li><strong>Half forgotten:</strong> sector area is ½r²θ, not r²θ. The ½ comes from the triangle comparison.</li>
<li><strong>Angle in degrees in the formula:</strong> θ must be radians; convert first, and only convert the final answer back if asked.</li>
<li><strong>Perimeter includes the radii:</strong> the perimeter of a sector is arc + 2r; the arc alone is not the perimeter.</li>
<li><strong>Segment triangle:</strong> use ½r² sin θ for the triangle, with θ the same central angle; a different angle changes the answer.</li>
<li><strong>Exact versus decimal:</strong> when the question says "in terms of π", keep π symbolic; converting to 3.14 loses the required form.</li>
<li><strong>Small-angle validity:</strong> sin θ ≈ θ is good only for small θ (roughly under 0.2 rad); do not apply it to 1.5 rad.</li>
</ul>
`,
  },
};
