// Mathematics A2 notes, deepened to the depth bar — batch C:
// Differentiation II (2.4/3.4), Integration II (2.5/3.5) and Further
// Trigonometry (2.3/3.3).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-a2-c-depth.cjs > .freebuff-tmp/math-a2-c.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-a2-c.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-a2-c.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "39e37ac0-41b8-4d23-8d69-64e36dfd77af": "A Level Mathematics: Differentiation II",
    "42a00afc-901a-4089-8544-5d9011e1d6ca": "A Level Mathematics: Integration II",
    "8070ed35-c07d-4ba4-bba0-9dfbe1a79c80": "A Level Mathematics: Further Trigonometry",
  },
  rows: {
    "39e37ac0-41b8-4d23-8d69-64e36dfd77af": `
<h2>A Level Mathematics: Differentiation II</h2>
<p>A2 differentiation adds the rules for products, quotients and functions of functions, then applies them to implicit equations, parametric curves and rates of change. Every rule in this note is stated with the condition for using it and derived where the derivation is short, because the exam tests recognition as much as execution.</p>

<h3>The chain rule</h3>
<pre><code>if y = f(g(x)) then dy/dx = f'(g(x)) g'(x)\n\nor with u: dy/dx = dy/du x du/dx</code></pre>
<p><strong>Worked example 1.</strong> Differentiate y = (3x + 2)⁵.</p>
<pre><code>dy/dx = 5(3x + 2)^4 x 3 = 15(3x + 2)^4</code></pre>
<p><strong>Worked example 2 (trigonometric).</strong> Differentiate y = sin(2x).</p>
<pre><code>dy/dx = 2 cos(2x)</code></pre>
<p><strong>Worked example 3 (exponential).</strong> Differentiate y = e^(x²).</p>
<pre><code>dy/dx = 2x e^(x^2)</code></pre>
<p><strong>Worked example 4 (power of a trig function).</strong> Differentiate y = cos³x.</p>
<pre><code>treat as (cos x)^3: dy/dx = 3(cos x)^2 x (-sin x) = -3 sin x cos^2 x</code></pre>

<h3>The product rule</h3>
<pre><code>d(uv)/dx = u dv/dx + v du/dx\n\n"first times derivative of second plus second times derivative of first"</code></pre>
<p><strong>Worked example 1.</strong> Differentiate y = x² sin x.</p>
<pre><code>dy/dx = 2x sin x + x^2 cos x</code></pre>
<p><strong>Worked example 2.</strong> Differentiate y = x ln x.</p>
<pre><code>dy/dx = ln x + x(1/x) = ln x + 1</code></pre>
<p><strong>Worked example 3.</strong> Differentiate y = x²e^(3x).</p>
<pre><code>dy/dx = 2x e^(3x) + 3x^2 e^(3x) = x e^(3x)(2 + 3x)</code></pre>
<p>Factorising the answer is not cosmetic: stationary points need the factorised form to be solved.</p>

<h3>The quotient rule</h3>
<pre><code>d(u/v)/dx = (v du/dx - u dv/dx)/v^2\n\nthe numerator's order matters: v times derivative of u minus u times\nderivative of v</code></pre>
<p><strong>Worked example 1.</strong> Differentiate y = sin x/x.</p>
<pre><code>dy/dx = (x cos x - sin x)/x^2</code></pre>
<p><strong>Worked example 2 (a common form).</strong> Differentiate y = (2x + 1)/(x − 3).</p>
<pre><code>dy/dx = [(x - 3)(2) - (2x + 1)(1)]/(x - 3)^2\n      = (2x - 6 - 2x - 1)/(x - 3)^2 = -7/(x - 3)^2</code></pre>
<p><strong>Worked example 3 (exponential quotient).</strong> Differentiate y = e^x/ln x.</p>
<pre><code>dy/dx = [ln x e^x - e^x(1/x)]/(ln x)^2</code></pre>

<h3>Implicit differentiation</h3>
<pre><code>differentiate both sides with respect to x, treating y as a function\nof x: each y term contributes its derivative times dy/dx\n\nthen solve for dy/dx</code></pre>
<p><strong>Worked example 1.</strong> Find dy/dx for x² + y² = 25.</p>
<pre><code>2x + 2y dy/dx = 0\n dy/dx = -x/y</code></pre>
<p><strong>Worked example 2 (product inside).</strong> Find dy/dx for xy + y² = 6.</p>
<pre><code>differentiate: y + x dy/dx + 2y dy/dx = 0\ndy/dx (x + 2y) = -y\ndy/dx = -y/(x + 2y)</code></pre>
<p><strong>Worked example 3 (tangent).</strong> Find the tangent to x² + xy = 6 at the point (2, 1).</p>
<pre><code>2x + y + x dy/dx = 0\nat (2, 1): 4 + 1 + 2 dy/dx = 0  ->  dy/dx = -2.5\ntangent: y - 1 = -2.5(x - 2)  ->  5x + 2y = 12</code></pre>

<h3>Parametric differentiation</h3>
<pre><code>if x = f(t) and y = g(t): dy/dx = (dy/dt)/(dx/dt)</code></pre>
<p><strong>Worked example.</strong> For x = t², y = t³ − t, find dy/dx in terms of t.</p>
<pre><code>dx/dt = 2t;  dy/dt = 3t^2 - 1\ndy/dx = (3t^2 - 1)/(2t)</code></pre>
<p><strong>Worked example 2 (tangent).</strong> Find the tangent at t = 2.</p>
<pre><code>point: x = 4, y = 6\ngradient: (12 - 1)/4 = 2.75\ntangent: y - 6 = 2.75(x - 4)  ->  y = 2.75x - 5</code></pre>
<p><strong>Worked example 3 (second derivative).</strong> Find d²y/dx² in terms of t for the same curve.</p>
<pre><code>d/dx(dy/dx) = [d/dt(dy/dx)] / (dx/dt)\nd/dt[(3t^2 - 1)/(2t)] = (6t x 2t - (3t^2 - 1)2)/(4t^2) = (6t^2 + 2)/(4t^2)\ndivide by 2t: (6t^2 + 2)/(8t^3)</code></pre>

<h3>Stationary points with the new rules</h3>
<p><strong>Worked example.</strong> Find and classify the stationary point of y = x e^(−x²).</p>
<pre><code>dy/dx = e^(-x^2) + x(-2x)e^(-x^2) = e^(-x^2)(1 - 2x^2)\nstationary at x = +/- 1/sqrt 2 = +/- 0.707\nat x = 0.707: y = 0.707 e^(-0.5) = 0.429  ->  maximum\nby symmetry x = -0.707 is a minimum with y = -0.429</code></pre>
<p><strong>Worked example 2 (product inside a log).</strong> Show y = x ln x has a minimum at x = e^(−1).</p>
<pre><code>dy/dx = ln x + 1 = 0  ->  x = e^-1 = 0.368\ny = e^-1 ln(e^-1) = -e^-1 = -0.368\nsecond derivative = 1/x > 0 at this point, so minimum</code></pre>

<h3>Connected rates of change</h3>
<pre><code>chain rule in rate form: dV/dt = dV/dr x dr/dt\nstrategy: write the quantity as a function of one variable, differentiate,\nlink the rates, substitute</code></pre>
<p><strong>Worked example.</strong> A spherical balloon is inflated so that its volume increases at 100 cm³/s. Find dr/dt when r = 5 cm.</p>
<pre><code>V = (4/3) pi r^3  ->  dV/dr = 4 pi r^2\nat r = 5: dV/dr = 100 pi = 314.2\ndr/dt = (dV/dt)/(dV/dr) = 100/314.2 = 0.318 cm/s</code></pre>
<p><strong>Worked example 2 (area).</strong> A circular ripple's radius grows at 2 cm/s. How fast is the area growing when r = 10 cm?</p>
<pre><code>A = pi r^2  ->  dA/dr = 2 pi r = 62.83\ndA/dt = 62.83 x 2 = 125.7 cm2/s</code></pre>

<h3>Exponentials and logarithms to other bases</h3>
<p>Every exponential can be rewritten with base e, because a = e^(ln a). That one identity turns an unfamiliar derivative into something the chain rule already handles, and it explains why base e is the natural choice: the conversion factor disappears.</p>
<pre><code>y = a^x = e^(x ln a)
dy/dx = ln a x e^(x ln a) = a^x ln a

y = log_a(x);  write x = a^y and differentiate implicitly:
1 = a^y ln a dy/dx   ->   dy/dx = 1/(x ln a)

special cases: d/dx(e^x) = e^x;  d/dx(ln x) = 1/x</code></pre>
<p>The factor ln a is what students leave out. For a = e it equals 1, which is exactly why base-e derivatives come out clean and every other base drags a constant along.</p>
<p><strong>Worked example.</strong> Differentiate y = 3^x.</p>
<pre><code>y = e^(x ln 3)
dy/dx = ln 3 x e^(x ln 3) = 3^x ln 3 = 1.0986 x 3^x</code></pre>
<p><strong>Worked example 2 (chain rule inside the exponent).</strong> Differentiate y = 2^(x²).</p>
<pre><code>y = e^(x^2 ln 2)
dy/dx = e^(x^2 ln 2) x (2x ln 2) = 2x ln 2 x 2^(x^2) = 1.386 x 2^(x^2)</code></pre>
<p><strong>Worked example 3 (logarithm of a linear function).</strong> Differentiate y = ln(3x + 2) and state where the derivative is valid.</p>
<pre><code>inner u = 3x + 2, du/dx = 3
dy/dx = (1/u) x 3 = 3/(3x + 2)
valid for 3x + 2 &gt; 0, i.e. x &gt; -2/3</code></pre>

<h3>The second derivative test and curve sketching</h3>
<p>At a stationary point the first derivative vanishes, so it cannot distinguish a peak from a trough. The second derivative does: it measures how the gradient itself is changing, which is the curvature of the graph at that point.</p>
<table>
<tr><th>Condition at a stationary point</th><th>Shape of the curve</th><th>Conclusion</th></tr>
<tr><td>d²y/dx² &lt; 0</td><td>concave down (∩)</td><td>local maximum</td></tr>
<tr><td>d²y/dx² &gt; 0</td><td>concave up (∪)</td><td>local minimum</td></tr>
<tr><td>d²y/dx² = 0</td><td>test inconclusive</td><td>check the sign of dy/dx either side</td></tr>
</table>
<p><strong>Worked example.</strong> Find and classify the stationary points of y = x³ − 3x, then sketch the curve.</p>
<pre><code>dy/dx = 3x^2 - 3 = 3(x - 1)(x + 1)
stationary at x = 1 and x = -1
at x = 1:  y = 1 - 3 = -2;  y'' = 6x = 6 &gt; 0  ->  minimum (1, -2)
at x = -1: y = -1 + 3 = 2;  y'' = -6 &lt; 0      ->  maximum (-1, 2)
y intercept: x = 0, y = 0 (also a root)
end behaviour: x -&gt; +inf gives y -&gt; +inf; x -&gt; -inf gives y -&gt; -inf</code></pre>
<p><strong>Worked example 2 (where the test fails).</strong> Classify the stationary point of y = x⁴.</p>
<pre><code>dy/dx = 4x^3 = 0 only at x = 0, where y = 0
y'' = 12x^2 = 0 at x = 0, so the test is inconclusive
look at dy/dx: negative for x &lt; 0, positive for x &gt; 0
so the curve falls then rises: (0, 0) is a minimum</code></pre>
<p>The failed case is examinable: y = x³ has no sign change in dy/dx at the origin, so it is a point of inflection, not an extremum. Reporting "stationary point" for x³ without that check loses the mark.</p>

<h3>Kinematics with calculus</h3>
<p>When displacement is given as a function of time, velocity is its derivative and acceleration the derivative of velocity. Those two definitions replace the constant-acceleration formulas the moment the motion stops being uniform, which is the whole point of the calculus treatment.</p>
<pre><code>s(t) displacement;  v = ds/dt;  a = dv/dt = d^2s/dt^2
reverse: s = integral of v dt;  v = integral of a dt
maximum displacement occurs where v = 0
distance travelled = integral of |v| dt, split where v changes sign</code></pre>
<p><strong>Worked example.</strong> A particle moves with s = t³ − 6t² + 9t metres. Find when it is instantaneously at rest and its acceleration at those instants.</p>
<pre><code>v = 3t^2 - 12t + 9 = 3(t - 1)(t - 3)
at rest: t = 1 and t = 3
a = 6t - 12   ->   a(1) = -6 m/s2;  a(3) = 6 m/s2
s(1) = 4 m;  s(3) = 0 m</code></pre>
<p><strong>Worked example 2 (total distance versus displacement).</strong> For the same motion, find the distance travelled in 0 ≤ t ≤ 3.</p>
<pre><code>v is positive on (0, 1) and negative on (1, 3)
distance = [s(1) - s(0)] + [s(1) - s(3)] = (4 - 0) + (4 - 0) = 8 m
note the displacement s(3) - s(0) = 0, so displacement alone would report 0</code></pre>
<p>That last result is the standard trap: a question asking for distance needs the sign changes found first, or the positive and negative parts cancel and the answer is nonsense.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Chain)</strong> Differentiate (2x − 1)⁴. <em>Answer:</em> 8(2x − 1)³.</li>
<li><strong>(Product)</strong> Differentiate x³e^x. <em>Answer:</em> x²e^x(3 + x).</li>
<li><strong>(Quotient)</strong> Differentiate (x + 1)/(x − 1). <em>Answer:</em> −2/(x − 1)².</li>
<li><strong>(Implicit)</strong> x² + y² = 16: find dy/dx. <em>Answer:</em> −x/y.</li>
<li><strong>(Implicit tangent)</strong> Same circle at (2, √12): gradient? <em>Answer:</em> −2/3.46 = −0.577.</li>
<li><strong>(Parametric)</strong> x = t², y = 2t + 1: find dy/dx. <em>Answer:</em> 2/(2t) = 1/t.</li>
<li><strong>(Rates)</strong> V = s³, ds/dt = 1.5, s = 4. Find dV/dt. <em>Answer:</em> 3s² × 1.5 = 72.</li>
<li><strong>(Stationary)</strong> y = x²e^x: find the stationary points. <em>Answer:</em> e^x(x² + 2x) = 0 → x = 0 (min), x = −2 (max).</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Chain rule forgotten:</strong> differentiating sin 2x as 2 cos 2x, not cos 2x — the inner derivative is compulsory.</li>
<li><strong>Quotient rule order reversed:</strong> v du − u dv, not u dv − v du; the sign flips if you swap.</li>
<li><strong>Implicit y terms:</strong> each differentiated y term needs a dy/dx factor, including products like xy.</li>
<li><strong>Parametric dy/dx inverted:</strong> it is (dy/dt)/(dx/dt), not the reciprocal.</li>
<li><strong>Second derivative by differentiating dy/dx with respect to t:</strong> must divide by dx/dt, or the answer is d/dt, not d/dx.</li>
<li><strong>Rates linked backwards:</strong> dV/dt = dV/dr × dr/dt; inverting gives an answer in the wrong units.</li>
<li><strong>Stationary points unfactorised:</strong> equations like x e^x(2 + x) = 0 are solved only when factorised.</li>
<li><strong>Domain of ln:</strong> differentiating ln x is valid only for x &gt; 0; for negative arguments use ln|x|.</li>
</ul>
`,
    "42a00afc-901a-4089-8544-5d9011e1d6ca": `
<h2>A Level Mathematics: Integration II</h2>
<p>A2 integration extends the AS power rule to trigonometric and exponential functions, then adds the two general techniques — substitution and integration by parts — plus partial fractions, definite integrals with the new functions, areas, and differential equations. Each technique is presented with its recognition cue: which integrand signals which method is the skill the exam rewards.</p>

<h3>Standard integrals to know</h3>
<pre><code>integral of sin(ax) dx = -(1/a) cos(ax) + c\nintegral of cos(ax) dx = (1/a) sin(ax) + c\nintegral of sec^2(ax) dx = (1/a) tan(ax) + c\nintegral of e^(ax) dx = (1/a) e^(ax) + c\nintegral of (1/x) dx = ln|x| + c\nintegral of (1/(ax + b)) dx = (1/a) ln|ax + b| + c</code></pre>
<p><strong>Worked example.</strong> Find ∫ (3 sin 2x + 4e^(−x)) dx.</p>
<pre><code>= -(3/2) cos 2x - 4e^(-x) + c</code></pre>
<p><strong>Worked example 2.</strong> Find ∫ (1/(3x + 1)) dx.</p>
<pre><code>= (1/3) ln|3x + 1| + c</code></pre>

<h3>Trigonometric identities before integrating</h3>
<p>Products and even powers of sine and cosine do not integrate directly; use an identity first.</p>
<pre><code>sin^2 x = (1 - cos 2x)/2\ncos^2 x = (1 + cos 2x)/2\nsin A cos B = (1/2)[sin(A + B) + sin(A - B)]</code></pre>
<p><strong>Worked example.</strong> Find ∫ sin²x dx.</p>
<pre><code>= integral of (1 - cos 2x)/2 dx = x/2 - (sin 2x)/4 + c</code></pre>
<p><strong>Worked example 2.</strong> Find ∫ sin 3x cos x dx.</p>
<pre><code>sin 3x cos x = (1/2)[sin 4x + sin 2x]\nintegral = -(1/8) cos 4x - (1/4) cos 2x + c</code></pre>

<h3>Integration by substitution</h3>
<pre><code>let u = g(x), du = g'(x) dx; rewrite the whole integral in u\nfor definite integrals, change the limits too</code></pre>
<p><strong>Worked example 1.</strong> Find ∫ 2x(x² + 1)⁵ dx.</p>
<pre><code>u = x^2 + 1, du = 2x dx\nintegral becomes ∫ u^5 du = u^6/6 + c = (x^2 + 1)^6/6 + c</code></pre>
<p><strong>Worked example 2 (definite).</strong> Find ∫ from 0 to 1 of x e^(x²) dx.</p>
<pre><code>u = x^2, du = 2x dx, so x dx = du/2\nlimits: x = 0 -> u = 0;  x = 1 -> u = 1\n= (1/2) ∫ from 0 to 1 e^u du = (1/2)(e - 1) = 0.859</code></pre>
<p><strong>Worked example 3 (trigonometric).</strong> Find ∫ cos x sin³x dx.</p>
<pre><code>u = sin x, du = cos x dx\n∫ u^3 du = sin^4 x/4 + c</code></pre>

<h3>Integration by parts</h3>
<pre><code>∫ u dv = uv - ∫ v du\n\nchoose u to be the part that simplifies when differentiated\n(LIATE: logs, inverse trig, algebra, trig, exponential)</code></pre>
<p><strong>Worked example 1.</strong> Find ∫ x e^x dx.</p>
<pre><code>u = x, dv = e^x dx  ->  du = dx, v = e^x\n= x e^x - ∫ e^x dx = x e^x - e^x + c = e^x(x - 1) + c</code></pre>
<p><strong>Worked example 2.</strong> Find ∫ x cos x dx.</p>
<pre><code>u = x, dv = cos x dx  ->  du = dx, v = sin x\n= x sin x - ∫ sin x dx = x sin x + cos x + c</code></pre>
<p><strong>Worked example 3 (logarithm).</strong> Find ∫ ln x dx.</p>
<pre><code>u = ln x, dv = dx  ->  du = dx/x, v = x\n= x ln x - ∫ 1 dx = x ln x - x + c</code></pre>
<p><strong>Worked example 4 (twice).</strong> Find ∫ x² e^x dx.</p>
<pre><code>first: u = x^2, dv = e^x dx  ->  x^2 e^x - 2∫ x e^x dx\nsecond: ∫ x e^x = e^x(x - 1)\nresult: e^x(x^2 - 2x + 2) + c</code></pre>

<h3>Partial fractions in integration</h3>
<pre><code>(px + q)/[(x - a)(x - b)]  ->  A/(x - a) + B/(x - b)\nintegrates to A ln|x - a| + B ln|x - b|</code></pre>
<p><strong>Worked example.</strong> Find ∫ 5/[(x − 1)(x + 4)] dx.</p>
<pre><code>partial fractions: 1/(x - 1) - 1/(x + 4)\nintegral: ln|x - 1| - ln|x + 4| + c = ln|(x - 1)/(x + 4)| + c</code></pre>
<p><strong>Worked example 2 (repeated factor).</strong> Find ∫ 3/[(x + 1)²] dx.</p>
<pre><code>= 3 ∫ (x + 1)^-2 dx = -3(x + 1)^-1 + c = -3/(x + 1) + c</code></pre>

<h3>Areas and volumes</h3>
<pre><code>area between curve and x-axis: definite integral (split at crossings)\nvolume of revolution about the x-axis: V = pi ∫ y^2 dx</code></pre>
<p><strong>Worked example 1.</strong> Find the area under y = sin x from 0 to π.</p>
<pre><code>[-cos x] from 0 to pi = -(-1) - (-1) = 2 square units</code></pre>
<p><strong>Worked example 2 (volume).</strong> The region under y = x from 0 to 2 is rotated about the x-axis. Find the volume.</p>
<pre><code>V = pi ∫ from 0 to 2 of x^2 dx = pi [x^3/3] = 8 pi/3 = 8.38 cubic units</code></pre>
<p>The π multiplies the whole integral; forgetting it is the classic error.</p>

<h3>Differential equations</h3>
<pre><code>separable: dy/dx = f(x) g(y)  ->  ∫ dy/g(y) = ∫ f(x) dx\n\napply the boundary condition to find the constant</code></pre>
<p><strong>Worked example.</strong> Solve dy/dx = xy with y = 3 when x = 0.</p>
<pre><code>∫ dy/y = ∫ x dx\nln|y| = x^2/2 + c\ny = A e^(x^2/2);  at x = 0, y = 3  ->  A = 3\ny = 3e^(x^2/2)</code></pre>
<p><strong>Worked example 2 (rate of cooling).</strong> dT/dt = −k(T − 20), T = 90 when t = 0, T = 60 when t = 10. Find T at t = 25.</p>
<pre><code>∫ dT/(T - 20) = -k ∫ dt  ->  ln(T - 20) = -kt + c\nT - 20 = A e^(-kt);  at t = 0, A = 70\nat t = 10: 40 = 70 e^(-10k)  ->  k = 0.0560\nat t = 25: T = 20 + 70e^(-1.4) = 37.3 deg C</code></pre>

<h3>Choosing a method: the recognition cues</h3>
<p>A2 integration is not a list of tricks to try at random; each integrand shape points at one method. Reading the shape before writing anything is the skill the exam actually tests.</p>
<table>
<tr><th>Shape of the integrand</th><th>Method</th><th>Why</th></tr>
<tr><td>a function times its own derivative</td><td>substitution</td><td>the derivative becomes du</td></tr>
<tr><td>product of two unrelated functions</td><td>integration by parts</td><td>one factor is integrated, the other differentiated</td></tr>
<tr><td>a rational function with factorable denominator</td><td>partial fractions</td><td>each part integrates to a logarithm</td></tr>
<tr><td>even powers of sin and cos</td><td>double-angle identity</td><td>lowers the power to a single wave</td></tr>
<tr><td>no elementary antiderivative (e.g. e^(−x²))</td><td>numerical method</td><td>the trapezium rule approximates it</td></tr>
</table>
<p><strong>Worked example (cue check).</strong> Name the method for each: ∫ 2x(x² + 1)⁵ dx, ∫ x e^x dx, ∫ (3x + 1)/(x² + x) dx.</p>
<pre><code>first: 2x is the derivative of x^2 + 1  ->  substitution u = x^2 + 1
second: x and e^x are unrelated  ->  by parts with u = x
third: denominator factors x(x + 1)  ->  partial fractions</code></pre>

<h3>Definite integrals with substitution</h3>
<p>When a definite integral is evaluated by substitution, the limits belong to the old variable and must be converted to the new one. Forgetting this is the most common single error in the whole topic, and it is invisible if the answer happens to be close.</p>
<pre><code>integral from x = a to x = b of f(x) dx
with u = g(x):  limits become u = g(a) and u = g(b)
then integrate in u with no conversion back</code></pre>
<p><strong>Worked example.</strong> Evaluate ∫ from 0 to 2 of x(x² + 1)³ dx.</p>
<pre><code>u = x^2 + 1, du = 2x dx  ->  x dx = du/2
limits: x = 0 -> u = 1;  x = 2 -> u = 5
integral = (1/2) ∫ from 1 to 5 of u^3 du = (1/2)[u^4/4] from 1 to 5
= (1/8)(625 - 1) = 78</code></pre>
<p><strong>Worked example 2 (by parts, definite).</strong> Evaluate ∫ from 0 to 1 of x e^(2x) dx.</p>
<pre><code>u = x, dv = e^(2x) dx  ->  du = dx, v = e^(2x)/2
= [x e^(2x)/2] from 0 to 1 - ∫ from 0 to 1 of e^(2x)/2 dx
= e^2/2 - 0 - [e^(2x)/4] from 0 to 1
= e^2/2 - (e^2/4 - 1/4) = (e^2 + 1)/4 = 2.097</code></pre>

<h3>The trapezium rule</h3>
<p>When no antiderivative exists in elementary terms, the area is estimated by joining the sampled heights with straight lines. Each strip is a trapezium, so the rule is exact for straight lines and underestimates for curves that bend upwards.</p>
<pre><code>h = (b - a)/n  (width of each strip)
area = (h/2)[y0 + 2(y1 + y2 + ... + y(n-1)) + yn]
first and last heights counted once, all interior heights twice</code></pre>
<p><strong>Worked example.</strong> Use the trapezium rule with 4 strips to estimate ∫ from 0 to 1 of e^(−x²) dx.</p>
<pre><code>h = 0.25;  heights at x = 0, 0.25, 0.5, 0.75, 1
1, 0.9394, 0.7788, 0.5698, 0.3679
sum = 1 + 2(0.9394 + 0.7788 + 0.5698) + 0.3679 = 1 + 4.5760 + 0.3679 = 5.9439
area = (0.25/2)(5.9439) = 0.7430</code></pre>
<p><strong>Worked example 2 (error direction).</strong> The curve e^(−x²) is concave down on this interval. State whether the estimate is an over- or underestimate and how to improve it.</p>
<p>Tabulating the heights is worth the thirty seconds it costs. A single transcription error in one of five heights changes the answer but leaves the working looking correct, so the mark scheme cannot help you; writing the sample points in a column and summing them twice is the check that catches it. Mark schemes also accept the rule written in the equivalent form (h/2)(y0 + 2Σ interior + yn), which is often easier to key into a calculator without dropping a term.</p>
<pre><code>chords lie below a concave-down curve, so the rule underestimates
halving h (doubling n) roughly quarters the error
an overestimate would need the curve concave up</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Standard)</strong> ∫ cos 3x dx. <em>Answer:</em> (1/3) sin 3x + c.</li>
<li><strong>(Identity)</strong> ∫ cos²x dx. <em>Answer:</em> x/2 + (sin 2x)/4 + c.</li>
<li><strong>(Substitution)</strong> ∫ 3x²(x³ + 1)⁴ dx. <em>Answer:</em> u = x³ + 1 → (x³ + 1)⁵/5 + c.</li>
<li><strong>(By parts)</strong> ∫ x sin x dx. <em>Answer:</em> −x cos x + sin x + c.</li>
<li><strong>(By parts log)</strong> ∫ x ln x dx. <em>Answer:</em> (x²/2)ln x − x²/4 + c.</li>
<li><strong>(Partial fractions)</strong> ∫ 4/[(x + 1)(x − 1)] dx. <em>Answer:</em> 2 ln|x − 1| − 2 ln|x + 1| + c.</li>
<li><strong>(Volume)</strong> y = x² rotated about x-axis from 0 to 1. <em>Answer:</em> π/5.</li>
<li><strong>(Differential equation)</strong> dy/dx = 2y, y = 5 at x = 0. <em>Answer:</em> y = 5e^(2x).</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Missing the reciprocal factor:</strong> ∫ cos 3x is (1/3)sin 3x, not sin 3x.</li>
<li><strong>Integrating products directly:</strong> sin x cos x is not sin²x/2 by guesswork — use the identity.</li>
<li><strong>Substitution without changing limits:</strong> definite integrals must convert the limits to the new variable, or convert back.</li>
<li><strong>Wrong choice for u in by parts:</strong> choose the part that simplifies when differentiated; x and ln x are the standard picks.</li>
<li><strong>Sign errors in by parts:</strong> the formula is uv − ∫v du; slipping the minus reverses the answer.</li>
<li><strong>Forgetting the modulus in log integrals:</strong> ln|x| covers both signs.</li>
<li><strong>Volume without π:</strong> the π multiplies the entire definite integral of y².</li>
<li><strong>Differential equation constants:</strong> find the constant from the boundary condition and state the particular solution.</li>
</ul>
`,
    "8070ed35-c07d-4ba4-bba0-9dfbe1a79c80": `
<h2>A Level Mathematics: Further Trigonometry</h2>
<p>A2 trigonometry covers the reciprocal functions, the compound and double-angle identities, the harmonic form R sin(θ + α) that turns a sum into a single wave, inverse functions with their domains, and equations with multiple or transformed angles. This note builds every identity from the compound-angle results, so the whole set is reconstructable rather than memorised.</p>

<h3>The reciprocal functions</h3>
<pre><code>sec x = 1/cos x;  cosec x = 1/sin x;  cot x = 1/tan x = cos x/sin x\n\nidentities: 1 + tan^2 x = sec^2 x;  1 + cot^2 x = cosec^2 x</code></pre>
<p><strong>Worked example.</strong> Solve sec x = 2 for 0 ≤ x ≤ 360°.</p>
<pre><code>cos x = 1/2  ->  x = 60 or 300</code></pre>
<p><strong>Worked example 2 (identity).</strong> Prove that sec²x − tan²x = 1.</p>
<pre><code>sec^2 - tan^2 = 1/cos^2 - sin^2/cos^2 = (1 - sin^2)/cos^2 = cos^2/cos^2 = 1</code></pre>
<p><strong>Worked example 3 (solve).</strong> Solve 2 cosec²x = 5 for 0 ≤ x ≤ 360°.</p>
<pre><code>cosec^2 x = 2.5  ->  sin^2 x = 0.4  ->  sin x = +/- 0.6325\nx = 39.2, 140.8, 219.2, 320.8</code></pre>
<p>Reciprocal functions blow up where the denominator vanishes: sec and tan at 90°, cosec and cot at 0°. Sketching is the safest way to see the asymptotes.</p>

<h3>Compound-angle identities</h3>
<pre><code>sin(A + B) = sin A cos B + cos A sin B\nsin(A - B) = sin A cos B - cos A sin B\ncos(A + B) = cos A cos B - sin A sin B\ncos(A - B) = cos A cos B + sin A sin B\ntan(A + B) = (tan A + tan B)/(1 - tan A tan B)</code></pre>
<p><strong>Worked example 1 (exact value).</strong> Find sin 75° exactly.</p>
<pre><code>sin(45 + 30) = sin45 cos30 + cos45 sin30\n= (sqrt2/2)(sqrt3/2) + (sqrt2/2)(1/2) = (sqrt6 + sqrt2)/4</code></pre>
<p><strong>Worked example 2 (prove).</strong> Prove that sin(A + B) + sin(A − B) = 2 sin A cos B.</p>
<pre><code>add the two expansions: the cos A sin B terms cancel\nleaving 2 sin A cos B</code></pre>
<p><strong>Worked example 3 (solve).</strong> Solve sin(x + 30°) = cos x for 0 ≤ x ≤ 360°.</p>
<pre><code>sin x cos30 + cos x sin30 = cos x\n0.866 sin x + 0.5 cos x = cos x\n0.866 sin x = 0.5 cos x  ->  tan x = 0.577  ->  x = 30 or 210</code></pre>

<h3>Double-angle identities</h3>
<pre><code>sin 2A = 2 sin A cos A\ncos 2A = cos^2 A - sin^2 A = 2cos^2 A - 1 = 1 - 2 sin^2 A\ntan 2A = 2 tan A/(1 - tan^2 A)</code></pre>
<p><strong>Worked example.</strong> Given sin A = 3/5 with A acute, find sin 2A and cos 2A.</p>
<pre><code>cos A = 4/5\nsin 2A = 2(3/5)(4/5) = 24/25\ncos 2A = 1 - 2(9/25) = 7/25</code></pre>
<p><strong>Worked example 2 (solve).</strong> Solve cos 2x = sin x for 0 ≤ x ≤ 360°.</p>
<pre><code>1 - 2 sin^2 x = sin x  ->  2 sin^2 x + sin x - 1 = 0\n(2 sin x - 1)(sin x + 1) = 0\nsin x = 1/2  ->  x = 30, 150;  sin x = -1  ->  x = 270</code></pre>
<p>The choice of cos 2A form matters: pick the one that leaves a single trigonometric function in the resulting equation.</p>

<h3>The harmonic form</h3>
<pre><code>a sin x + b cos x = R sin(x + alpha)\nR = sqrt(a^2 + b^2);  tan alpha = b/a\n\nalways expand back to check the sign of alpha</code></pre>
<p><strong>Worked example.</strong> Express 3 sin x + 4 cos x in the form R sin(x + α).</p>
<pre><code>R = 5; tan alpha = 4/3  ->  alpha = 53.13 deg\n3 sin x + 4 cos x = 5 sin(x + 53.13 deg)\ncheck: 5[sin x cos53.13 + cos x sin53.13] = 3 sin x + 4 cos x</code></pre>
<p><strong>Worked example 2 (maximum).</strong> Hence find the maximum value of 3 sin x + 4 cos x and the x at which it occurs.</p>
<pre><code>maximum = 5, when sin(x + 53.13) = 1\nx + 53.13 = 90  ->  x = 36.87 deg</code></pre>
<p><strong>Worked example 3 (solve).</strong> Solve 3 sin x + 4 cos x = 2 for 0 ≤ x ≤ 360°.</p>
<pre><code>5 sin(x + 53.13) = 2  ->  sin(x + 53.13) = 0.4\nx + 53.13 = 23.58 or 156.42\nx = -29.5 (reject, or add 360: 330.5) or 103.3</code></pre>
<p>Adjusting the interval for the phase shift is compulsory: the angle x + α runs over a different range from x.</p>

<h3>Inverse trigonometric functions</h3>
<pre><code>arcsin: domain [-1, 1], range [-90, 90] degrees\narccos: domain [-1, 1], range [0, 180]\narctan: all reals, range (-90, 90)</code></pre>
<p>The restricted ranges are what make the inverses functions. That is why arcsin(sin 150°) = 30°, not 150°.</p>
<p><strong>Worked example.</strong> Evaluate arcsin(sin 200°).</p>
<pre><code>sin 200 = -0.342\narcsin(-0.342) = -20 deg, which lies in the principal range</code></pre>
<p><strong>Worked example 2 (equation).</strong> Solve tan⁻¹(2x) = 45°.</p>
<pre><code>2x = tan 45 = 1  ->  x = 0.5</code></pre>
<p><strong>Worked example 3 (derivative link).</strong> Differentiate y = arcsin x.</p>
<pre><code>dy/dx = 1/sqrt(1 - x^2), valid for |x| < 1</code></pre>

<h3>Equations with transformed angles</h3>
<pre><code>for sin(kx + c) = value over a range of x:\n  1. find the range of the argument kx + c\n  2. solve for the argument\n  3. convert back to x and keep only values in the x-range</code></pre>
<p><strong>Worked example.</strong> Solve sin(2x − 30°) = 0.5 for 0 ≤ x ≤ 180°.</p>
<pre><code>argument range: -30 <= 2x - 30 <= 330\n2x - 30 = 30, 150, 390 (out of range)\n2x = 60 or 180  ->  x = 30 or 90</code></pre>
<p><strong>Worked example 2.</strong> Solve cos(3x) = −0.5 for 0 ≤ x ≤ 180°.</p>
<pre><code>argument range 0 <= 3x <= 540\n3x = 120, 240, 480  ->  x = 40, 80, 160</code></pre>

<h3>Solving equations in a given range</h3>
<p>The single most reliable routine in A2 trigonometry is a fixed order of operations, because the marks are lost in the bookkeeping, never in the trigonometry.</p>
<pre><code>step 1  reduce to ONE trigonometric function (identity if needed)
step 2  solve for the function value, keeping every sign
step 3  find the principal solution
step 4  use symmetry to find all solutions in the argument's range
step 5  convert back to x, and discard anything outside the stated range</code></pre>
<p><strong>Worked example.</strong> Solve 2 sin²x + 3 cos x = 3 for 0 ≤ x ≤ 360°.</p>
<pre><code>sin^2 = 1 - cos^2  ->  2(1 - cos^2 x) + 3 cos x = 3
2 - 2cos^2 x + 3 cos x - 3 = 0
2cos^2 x - 3 cos x + 1 = 0   ->  (2cos x - 1)(cos x - 1) = 0
cos x = 1/2  ->  x = 60, 300
cos x = 1    ->  x = 0, 360
solutions: 0, 60, 300, 360 degrees</code></pre>
<p><strong>Worked example 2 (quadratic in tan).</strong> Solve 3 tan²x − tan x − 2 = 0 for 0 ≤ x ≤ 360°.</p>
<pre><code>(3 tan x + 2)(tan x - 1) = 0
tan x = 1  ->  x = 45, 225
tan x = -2/3  ->  x = 180 - 33.7 = 146.3;  and 326.3
tangent repeats every 180 degrees, so each root gives exactly two solutions here</code></pre>
<p>Note the period: sin and cos repeat every 360°, tan every 180°. Getting the period wrong either loses half the solutions or invents ones outside the range.</p>

<h3>Proving identities</h3>
<p>An identity is proved by transforming one side into the other, never by moving terms across the equals sign as if it were an equation. The safe strategy is to start on the side that looks worse and simplify towards the other.</p>
<pre><code>allowed moves: rewrite sec/cosec/cot as sin and cos; apply Pythagoras;
               expand compound angles; use a double-angle form
not allowed:   multiplying both sides by something, unless every step is reversible
               and the result is still an identity</code></pre>
<p><strong>Worked example.</strong> Prove that (1 + sin x)/(cos x) = cos x/(1 − sin x).</p>
<pre><code>start from the left; multiply numerator and denominator by (1 - sin x):
(1 + sin x)(1 - sin x) / [cos x (1 - sin x)]
= (1 - sin^2 x) / [cos x (1 - sin x)]
= cos^2 x / [cos x (1 - sin x)]
= cos x / (1 - sin x)</code></pre>
<p><strong>Worked example 2 (double angle).</strong> Prove that (sin 2x)/(1 + cos 2x) = tan x.</p>
<pre><code>sin 2x = 2 sin x cos x;  1 + cos 2x = 1 + (2cos^2 x - 1) = 2cos^2 x
ratio = 2 sin x cos x / 2cos^2 x = sin x/cos x = tan x</code></pre>
<p>The choice of cos 2A form is not taste: pick the version that cancels against the rest of the expression. Here 2cos²x − 1 was right because the denominator needed a cosine.</p>

<h3>Modelling with the harmonic form</h3>
<p>The R-formula is not only an algebraic trick; it is the reason oscillating physical quantities are written as a single wave. Tidal height, temperature, alternating current and the height of a point on a rotating wheel are all of the form a sin θ + b cos θ, and every question about their maximum, minimum or first occurrence is answered by the amplitude and phase.</p>
<pre><code>h = 12 + 5 sin(30t) + 12 cos(30t)  (t in hours)
R = sqrt(25 + 144) = 13;  tan alpha = 12/5  ->  alpha = 67.38 degrees
h = 12 + 13 sin(30t + 67.38)
maximum depth = 12 + 13 = 25;  minimum = 12 - 13 = -1 (below the datum)</code></pre>
<p><strong>Worked example.</strong> For that model, find the first time after t = 0 at which the height is a maximum.</p>
<pre><code>sin(30t + 67.38) = 1  ->  30t + 67.38 = 90
30t = 22.62  ->  t = 0.754 hours = 45.2 minutes</code></pre>
<p><strong>Worked example 2 (period and interpretation).</strong> State the period of the model and what it represents.</p>
<pre><code>argument 30t has period 360 degrees in t:  360/30 = 12 hours
the tide repeats every 12 hours, twice a day</code></pre>
<p><strong>Worked example 3 (minimum as a phrase).</strong> Find the time of the first minimum.</p>
<pre><code>sin(30t + 67.38) = -1  ->  30t + 67.38 = 270
30t = 202.62  ->  t = 6.75 hours</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Reciprocal)</strong> Solve cosec x = 2 for 0 ≤ x ≤ 360°. <em>Answer:</em> sin x = ½ → 30°, 150°.</li>
<li><strong>(Identity)</strong> Simplify (1 − cos²x)/sin x. <em>Answer:</em> sin x.</li>
<li><strong>(Compound)</strong> Find cos 15° exactly. <em>Answer:</em> (√6 + √2)/4.</li>
<li><strong>(Double)</strong> Given cos A = 5/13, find sin 2A. <em>Answer:</em> 2(12/13)(5/13) = 120/169.</li>
<li><strong>(Double solve)</strong> Solve sin 2x = cos x for 0 ≤ x ≤ 180°. <em>Answer:</em> cos x(2 sin x − 1) = 0 → x = 90°, 30°, 150°.</li>
<li><strong>(Harmonic)</strong> Express 5 sin x − 12 cos x as R sin(x − α). <em>Answer:</em> 13 sin(x − 67.4°).</li>
<li><strong>(Maximum)</strong> Max of 5 sin x − 12 cos x? <em>Answer:</em> 13.</li>
<li><strong>(Inverse)</strong> Solve arccos(2x) = 60°. <em>Answer:</em> 2x = ½ → x = ¼.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Losing solutions:</strong> quadratics in sin or cos give two values, each with its own solutions in the range.</li>
<li><strong>Wrong cos 2A form:</strong> choose the version that leaves one function; otherwise the equation becomes unsolvable.</li>
<li><strong>Harmonic sign:</strong> R sin(x − α) versus R sin(x + α) depends on the signs of a and b; expand to check.</li>
<li><strong>Interval not adjusted:</strong> transformed angles need the argument's range computed before solving.</li>
<li><strong>Inverse range ignored:</strong> arcsin returns only the principal value; other solutions come from the symmetries.</li>
<li><strong>sec/cosec confused:</strong> sec = 1/cos, cosec = 1/sin — the reverse is a silent disaster.</li>
<li><strong>Degrees and radians:</strong> the R-formula's α follows the mode; mixing them gives a phase error.</li>
<li><strong>Identity proofs without a direction:</strong> start from the more complicated side and transform towards the simpler; do not work on both sides at once unless every step is reversible.</li>
</ul>
`,
  },
};
