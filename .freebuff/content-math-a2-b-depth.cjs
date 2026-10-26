// Mathematics A2 notes, deepened to the depth bar — batch B:
// Exponentials and Logarithms (2.2), Numerical Methods (3.6/P3) and Proof
// (P2/P3).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-a2-b-depth.cjs > .freebuff-tmp/math-a2-b.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-a2-b.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-a2-b.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "b9b130df-e3f7-41f1-9347-ac8773a9fe71": "A Level Mathematics: Exponentials and Logarithms",
    "623cecd2-630e-456c-ac75-c567c01d46c3": "A Level Mathematics: Numerical Methods",
    "f8fe66ce-4d84-4329-9cb4-7dd7fc8825a1": "A Level Mathematics: Proof",
  },
  rows: {
    "b9b130df-e3f7-41f1-9347-ac8773a9fe71": `
<h2>A Level Mathematics: Exponentials and Logarithms</h2>
<p>The exponential function eˣ is the one function whose gradient equals its value, which is why it describes any process whose rate of change is proportional to its size: cooling, decay, growth, charging a capacitor, the value of an investment. Its inverse, ln x, is the tool that unlocks equations with the unknown in the exponent. This note builds the pair from zero, links them to calculus, and finishes with the modelling and log-linear graph work that A2 papers test.</p>

<h3>Definitions and the laws</h3>
<pre><code>log_a x = n  means  a^n = x\nln x = log_e x,  e = 2.718281828...\n\nlog(xy) = log x + log y\nlog(x/y) = log x - log y\nlog(x^n) = n log x\nlog_a a = 1;  log_a 1 = 0</code></pre>
<p>e is defined as the value that makes the gradient of aˣ equal to aˣ itself. That single property generates the whole calculus of the topic:</p>
<pre><code>d/dx (e^x) = e^x;  d/dx (e^(kx)) = k e^(kx)\nd/dx (ln x) = 1/x;  d/dx (ln(kx)) = 1/x\nintegral of e^(kx) dx = (1/k) e^(kx) + c\nintegral of (1/x) dx = ln|x| + c</code></pre>
<p><strong>Worked example.</strong> Differentiate y = e^(3x) + ln(5x).</p>
<pre><code>dy/dx = 3e^(3x) + 1/x</code></pre>
<p><strong>Worked example 2.</strong> Find ∫ (4e^(2x) + 3/x) dx.</p>
<pre><code>= 2e^(2x) + 3 ln|x| + c</code></pre>

<h3>Solving exponential equations</h3>
<p><strong>Worked example 1.</strong> Solve 7^x = 50.</p>
<pre><code>x ln 7 = ln 50\nx = ln 50/ln 7 = 3.912/1.946 = 2.01</code></pre>
<p><strong>Worked example 2 (same base first).</strong> Solve 2^(3x−1) = 4^(x+1).</p>
<pre><code>4 = 2^2, so 4^(x+1) = 2^(2x+2)\n3x - 1 = 2x + 2  ->  x = 3</code></pre>
<p>Always look for a common base before taking logs: it converts an exponential equation into a linear one and avoids rounding.</p>
<p><strong>Worked example 3 (quadratic in eˣ).</strong> Solve e^(2x) − 5e^x + 6 = 0.</p>
<pre><code>let y = e^x: y^2 - 5y + 6 = 0  ->  (y - 2)(y - 3) = 0\ny = 2  ->  x = ln 2 = 0.693\ny = 3  ->  x = ln 3 = 1.099</code></pre>

<h3>Solving logarithmic equations</h3>
<p><strong>Worked example 1.</strong> Solve ln(x + 3) + ln(x − 1) = ln 5.</p>
<pre><code>ln[(x + 3)(x - 1)] = ln 5\nx^2 + 2x - 3 = 5  ->  x^2 + 2x - 8 = 0\n(x + 4)(x - 2) = 0  ->  x = 2 (x = -4 makes an argument negative)</code></pre>
<p><strong>Worked example 2 (different bases).</strong> Solve log₂ x + log₄ x = 3.</p>
<pre><code>log_4 x = log_2 x / log_2 4 = (log_2 x)/2\nso (3/2) log_2 x = 3  ->  log_2 x = 2  ->  x = 4</code></pre>
<p>The change-of-base step is compulsory whenever bases differ; check every root against the original domains, and remember that log₂ x is only defined for x &gt; 0 while its squared form can produce spurious negative candidates.</p>

<h3>The graphs and their transformations</h3>
<pre><code>y = e^x: through (0, 1), increasing, asymptote y = 0\ny = ln x: through (1, 0), increasing, asymptote x = 0, domain x > 0\nthey are reflections in y = x</code></pre>
<p><strong>Worked example.</strong> Sketch y = ln(x − 2), stating the asymptote, domain and intercept.</p>
<pre><code>translation 2 right\nasymptote x = 2;  domain x > 2\nx-intercept: ln(x - 2) = 0  ->  x - 2 = 1  ->  x = 3</code></pre>
<p><strong>Worked example 2 (reflection).</strong> Sketch y = e^(−x) and state its relationship to y = e^x, noting the intercepts and asymptote of each.</p>
<pre><code>reflection in the y-axis; still through (0, 1); asymptote y = 0;\ndecreasing, a decay curve</code></pre>

<h3>Growth and decay models</h3>
<pre><code>N = N_0 e^(kt): k > 0 growth, k < 0 decay\nhalf-life = ln 2/|k|;  doubling time = ln 2/k\n\nNewton's cooling: T = T_room + (T_0 - T_room) e^(-kt)</code></pre>
<p><strong>Worked example 1 (half-life).</strong> A substance decays as N = 80e^(−0.05t). Find the half-life and the amount after 20 years.</p>
<pre><code>half-life: e^(-0.05t) = 0.5  ->  t = ln 2/0.05 = 13.86 years\nat t = 20: 80e^-1 = 29.4 units</code></pre>
<p><strong>Worked example 2 (cooling).</strong> A cup of coffee at 90 °C cools to 60 °C in 10 minutes in a 20 °C room. Find k and the temperature after 25 minutes.</p>
<pre><code>T - 20 = 70e^(-kt);  at t = 10, T = 60: 40 = 70e^(-10k)\ne^(-10k) = 4/7  ->  k = ln(7/4)/10 = 0.0560\nat t = 25: T = 20 + 70e^(-1.4) = 20 + 17.3 = 37.3 deg C</code></pre>

<h3>Log-linear graphs</h3>
<p>If a relationship is exponential, plotting ln y against x gives a straight line whose gradient and intercept reveal the constants. This is how experimental data is tested for exponential behaviour.</p>
<pre><code>y = a b^x  ->  ln y = ln a + x ln b\ngradient = ln b;  intercept = ln a\ny = a x^n  ->  ln y = ln a + n ln x  (log-log plot)\ngradient = n;  intercept = ln a</code></pre>
<p><strong>Worked example.</strong> A graph of ln y against x is a straight line with gradient 0.4 and intercept 1.2. Find the relationship.</p>
<pre><code>ln y = 1.2 + 0.4x\ny = e^1.2 x e^(0.4x) = 3.32 e^(0.4x)\nso a = 3.32 and the growth rate is 0.4 per unit x</code></pre>
<p><strong>Worked example 2 (power law).</strong> A log-log plot of y against x has gradient 2 and intercept 0.693; the intercept is ln a, so a = e^0.693 = 2.</p>
<pre><code>ln y = 0.693 + 2 ln x  ->  y = 2x^2</code></pre>

<h3>Reducing other models to linear form</h3>
<p>Some models are linearised by a different transformation. The technique is to rearrange into Y = mX + c and identify what to plot.</p>
<pre><code>y = a/x + b  ->  plot y against 1/x: gradient a, intercept b\ny = a e^(bx) ->  plot ln y against x\ny = a x^n    ->  plot ln y against ln x</code></pre>
<p><strong>Worked example.</strong> Data fits y = p/x + q. What should be plotted on the axes, and how are p and q then found from the graph?</p>
<pre><code>plot y (vertical) against 1/x (horizontal)\ngradient = p, intercept = q</code></pre>

<h3>Inequalities and exact solutions</h3>
<p><strong>Worked example.</strong> Solve e^x &gt; 10, giving an exact answer.</p>
<pre><code>x > ln 10</code></pre>
<p><strong>Worked example 2.</strong> Solve ln(2x − 1) ≤ 3.</p>
<pre><code>2x - 1 <= e^3 and 2x - 1 > 0\n1/2 < x <= (e^3 + 1)/2 = 10.54</code></pre>
<p>Both boundaries matter: the domain condition gives the strict lower bound, the inequality gives the upper one.</p>

<h3>Exponentials in calculus: stationary points</h3>
<p>Because e^x differentiates to itself, a product with a polynomial produces clean stationary-point questions.</p>
<p><strong>Worked example.</strong> Find and classify the stationary point of y = x e^(−x).</p>
<pre><code>product rule: dy/dx = e^(-x) - x e^(-x) = e^(-x)(1 - x)
stationary where 1 - x = 0  ->  x = 1, y = e^-1 = 0.368
second derivative: e^(-x)(x - 2); at x = 1 it is -e^-1 < 0
so (1, 0.368) is a maximum</code></pre>
<p><strong>Worked example 2.</strong> Find the minimum of y = e^x − 3x.</p>
<pre><code>dy/dx = e^x - 3 = 0  ->  x = ln 3 = 1.099
y = 3 - 3 ln 3 = 3 - 3.296 = -0.296
second derivative e^x > 0, so it is a minimum</code></pre>
<p><strong>Worked example 3 (integration by recognition).</strong> Find ∫ x e^(x²) dx.</p>
<pre><code>the derivative of e^(x^2) is 2x e^(x^2), so the integral is
(1/2)e^(x^2) + c</code></pre>

<h3>Comparing growth rates</h3>
<p>Exponential growth eventually outpaces any polynomial. That statement is examinable as a comparison of gradients or of long-run behaviour.</p>
<p><strong>Worked example.</strong> Show that for large x, e^x grows faster than x³ by comparing their ratio.</p>
<pre><code>consider f(x) = e^x/x^3
as x -> infinity the ratio tends to infinity (exponential beats polynomial)
equivalently: differentiating repeatedly, e^x keeps its factor of e^x
while the polynomial loses a degree each time</code></pre>
<p><strong>Worked example 2 (doubling).</strong> A quantity grows as N = 50e^(0.08t). How long to double?</p>
<pre><code>e^(0.08t) = 2  ->  t = ln 2/0.08 = 8.66 years</code></pre>
<p>The doubling time depends only on k, not on the starting value: that is the signature of exponential growth and worth saying in the answer. Halving time behaves the same way, and for decay the ratio ln 2/|k| gives a half-life independent of the initial quantity — which is why radiocarbon dating works on any sample size.</p>

<h3>Simultaneous exponential equations</h3>
<p>Two exponential equations are solved by taking logs and then treating the result as a linear system in the unknowns.</p>
<p><strong>Worked example.</strong> Solve 2^x 3^y = 12 and 2^y 3^x = 18.</p>
<pre><code>take logs: x ln 2 + y ln 3 = ln 12
y ln 2 + x ln 3 = ln 18
rearrange the second: x ln 3 + y ln 2 = ln 18
solve the 2x2 system:
from the first: x = (ln 12 - y ln 3)/ln 2
substitute and simplify  ->  y = 1, x = 2</code></pre>
<p><strong>Worked example 2 (same base).</strong> Solve 9^x = 3^(x+2).</p>
<pre><code>9^x = 3^(2x), so 2x = x + 2  ->  x = 2</code></pre>
<p>With two unknowns the log step is compulsory, and the equations are linear in x and y after it; that structure is what makes the pair solvable.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Evaluate)</strong> Find ln(e³). <em>Answer:</em> 3.</li>
<li><strong>(Law)</strong> Simplify ln 12 − ln 3. <em>Answer:</em> ln 4.</li>
<li><strong>(Solve)</strong> Solve 3^(2x) = 81. <em>Answer:</em> 2x = 4 → x = 2.</li>
<li><strong>(Solve logs)</strong> Solve log₂(x) + log₂(x − 2) = 3. <em>Answer:</em> x(x − 2) = 8 → x = 4.</li>
<li><strong>(Differentiate)</strong> y = e^(2x) ln x. Use the product rule. <em>Answer:</em> 2e^(2x) ln x + e^(2x)/x.</li>
<li><strong>(Integrate)</strong> ∫ (1/(2x)) dx. <em>Answer:</em> ½ ln|2x| + c = ½ ln|x| + c′.</li>
<li><strong>(Model)</strong> A population is 200e^(0.03t). When does it reach 500? <em>Answer:</em> t = ln(2.5)/0.03 = 30.5.</li>
<li><strong>(Log-linear)</strong> ln y = 0.5x + 2. Find y. <em>Answer:</em> y = 7.39e^(0.5x).</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>log(a + b) treated as log a + log b:</strong> there is no such law; the sum cannot be split.</li>
<li><strong>Domain ignored:</strong> ln of a non-positive number is undefined; reject roots that violate it and say so.</li>
<li><strong>Differentiating e^(kx) as ke^x:</strong> the factor k multiplies the whole exponential.</li>
<li><strong>Integrating 1/x as ln x without the modulus:</strong> use ln|x|, since the function is defined on both sides of zero.</li>
<li><strong>Half-life sign:</strong> with decay k is negative, so half-life is ln 2/|k|; a negative time means the sign was mishandled.</li>
<li><strong>Log-linear misread:</strong> the intercept is ln a, so a = e^(intercept), not the intercept itself.</li>
<li><strong>Base 10 and base e mixed:</strong> convert with log_a x = ln x/ln a before combining.</li>
<li><strong>Model without interpretation:</strong> state the meaning of k in context — a rate per year, per minute, per unit.</li>
</ul>
`,
    "623cecd2-630e-456c-ac75-c567c01d46c3": `
<h2>A Level Mathematics: Numerical Methods</h2>
<p>Some equations cannot be solved exactly: x = cos x, x³ − x − 1 = 0, e^x = 4x. Numerical methods find the solutions to any required accuracy by iteration and refinement. This note builds the four techniques A2 requires — locating a root by sign change, fixed-point iteration and its convergence, the Newton-Raphson formula with its derivation, and the trapezium rule for integrals that have no elementary antiderivative — together with the failure modes examiners test.</p>

<h3>Locating a root: change of sign</h3>
<pre><code>if f(a) and f(b) have opposite signs and f is continuous on [a, b],\nthere is at least one root in (a, b)</code></pre>
<p><strong>Worked example.</strong> Show that x³ − x − 1 = 0 has a root between 1 and 2.</p>
<pre><code>f(1) = 1 - 1 - 1 = -1\nf(2) = 8 - 2 - 1 = 5\nsign change and the cubic is continuous  ->  a root in (1, 2)</code></pre>
<p>The two conditions are both required: continuity rules out a jump, and the sign change forces a crossing. The theorem guarantees at least one root, not exactly one — say "at least" in the answer.</p>
<p><strong>Worked example 2 (narrowing).</strong> Show the root lies between 1.3 and 1.4.</p>
<pre><code>f(1.3) = 2.197 - 1.3 - 1 = -0.103\nf(1.4) = 2.744 - 1.4 - 1 = 0.344\nso the root lies in (1.3, 1.4)</code></pre>

<h3>Fixed-point iteration</h3>
<pre><code>rearrange f(x) = 0 into x = g(x), then iterate x_(n+1) = g(x_n)\n\nthe iteration converges when |g'(x)| < 1 near the root\n</code></pre>
<p><strong>Worked example.</strong> Use x_(n+1) = (x_n + 1)^(1/3) with x₁ = 1.3 to find the root of x³ − x − 1 = 0 to 4 d.p.</p>
<pre><code>x2 = (2.3)^(1/3) = 1.3200\nx3 = (2.32)^(1/3) = 1.3238\nx4 = 1.3245;  x5 = 1.3246;  x6 = 1.3247\nthe sequence settles: root = 1.3247 (4 d.p.)</code></pre>
<p><strong>Worked example 2 (testing convergence).</strong> For g(x) = (x + 1)^(1/3), show the iteration converges near 1.32.</p>
<pre><code>g'(x) = (1/3)(x + 1)^(-2/3)\nat x = 1.32: g' = (1/3)(2.32)^(-2/3) = 0.19 < 1\nso the iteration converges</code></pre>
<p>If |g′| &gt; 1 near the root the iteration diverges, and a different rearrangement is needed. The same equation usually has several rearrangements, only some of which converge — that is exactly what the |g′| test decides.</p>

<h3>Failure modes of iteration</h3>
<pre><code>divergence: |g'| > 1 near the root\noscillation: the sequence jumps between two values\nslow convergence: |g'| close to 1</code></pre>
<p><strong>Worked example.</strong> The rearrangement x = x³ − 1 for x³ − x − 1 = 0 gives g′(x) = 3x², which is about 5.3 near the root: the iteration diverges rapidly. That is why the cube-root rearrangement, with g′ ≈ 0.19, is used instead.</p>

<h3>Newton-Raphson</h3>
<pre><code>x_(n+1) = x_n - f(x_n)/f'(x_n)\n\nthe tangent at the current point is followed to the x-axis;\nthe intercept becomes the next estimate</code></pre>
<p><strong>Derivation.</strong> The tangent at x_n has equation y − f(x_n) = f′(x_n)(x − x_n). Setting y = 0 gives x = x_n − f(x_n)/f′(x_n), which is the formula.</p>
<p><strong>Worked example.</strong> Use Newton-Raphson on f(x) = x³ − x − 1 with x₁ = 1.3.</p>
<pre><code>f'(x) = 3x^2 - 1\nx2 = 1.3 - (-0.103)/(4.07) = 1.3 + 0.0253 = 1.3253\nx3 = 1.3253 - (0.00053)/(4.2637) = 1.3252\nroot = 1.3252 (4 d.p.) in two steps, against six for the iteration</code></pre>
<p><strong>Worked example 2 (failure).</strong> Explain why x₁ = 0.5 fails for f(x) = x³ − x − 1.</p>
<pre><code>f'(0.5) = -0.25, so x2 = 0.5 - (-1.375)/(-0.25) = 0.5 - 5.5 = -5.0\nthe tangent is nearly horizontal, so the step overshoots wildly;\nthe method can diverge when f' is small near the initial guess</code></pre>
<p>State the failure condition explicitly: Newton-Raphson needs f′(x_n) ≠ 0 and a good starting value close to the root.</p>

<h3>The trapezium rule</h3>
<pre><code>integral from a to b of f(x) dx ~ (h/2)[y_0 + 2(y_1 + ... + y_(n-1)) + y_n]\nwhere h = (b - a)/n and y_i = f(a + ih)\n\nthe error: a larger n reduces it; the rule overestimates for a\nconcave-up curve and underestimates for concave-down</code></pre>
<p><strong>Worked example.</strong> Use the trapezium rule with 4 strips to estimate ∫ from 0 to 2 of e^(x²) dx.</p>
<pre><code>h = 0.5; x: 0, 0.5, 1, 1.5, 2\ny: 1, 1.2840, 2.7183, 6.4760, 54.5982\nI ~ (0.5/2)[1 + 2(1.2840 + 2.7183 + 6.4760) + 54.5982]\n  = 0.25[1 + 20.9566 + 54.5982] = 0.25 x 76.5548 = 19.14</code></pre>
<p><strong>Worked example 2 (over or under).</strong> Is the estimate above or below the true value here?</p>
<pre><code>e^(x^2) is concave up (its gradient is increasing), so each chord lies\nabove the curve and the trapezium rule overestimates</code></pre>

<h3>Accuracy and error</h3>
<pre><code>the error of a trapezium estimate is roughly proportional to h^2\nhalving h roughly quarters the error\n\nrounding to k decimal places requires the estimate to be stable at\nthe next place</code></pre>
<p><strong>Worked example.</strong> An estimate with h = 0.5 gives 19.14; with h = 0.25 the estimate is 18.92. Estimate the answer to 1 d.p.</p>
<pre><code>the two agree to 1 d.p. at 18.9; quoting 18.9 is defensible, and the\ndifference indicates the scale of the remaining error</code></pre>
<p>Comparing two step sizes is the standard way to justify an accuracy claim; a single estimate cannot.</p>

<h3>Setting up an iteration properly</h3>
<p>An iteration question usually hands you the rearrangement; the marks are for using it correctly, showing the iterates, and judging convergence. Three habits cover it:</p>
<ul>
<li>Write the recurrence exactly as given and substitute the stated starting value.</li>
<li>Record each iterate to one more decimal place than required.</li>
<li>Show two consecutive iterates agreeing at the required accuracy before quoting the root.</li>
</ul>
<p><strong>Worked example.</strong> f(x) = x³ + 2x − 5 has a root near 1.3. Show that x = (5 − 2x)^(1/3) is a valid rearrangement and iterate twice.</p>
<pre><code>from x^3 + 2x - 5 = 0: x^3 = 5 - 2x  ->  x = (5 - 2x)^(1/3)
x2 = (5 - 2.6)^(1/3) = (2.4)^(1/3) = 1.3389
x3 = (5 - 2.6777)^(1/3) = (2.3223)^(1/3) = 1.3241
converging towards about 1.328</code></pre>
<p><strong>Worked example 2 (convergence check).</strong> Test |g′| for g(x) = (5 − 2x)^(1/3) near 1.33.</p>
<pre><code>g'(x) = (1/3)(5 - 2x)^(-2/3) x (-2) = -0.667(5 - 2x)^(-2/3)
|g'(1.33)| = 0.667 x (2.34)^(-2/3) = 0.667 x 0.534 = 0.356 < 1
so the iteration converges</code></pre>

<h3>Newton-Raphson on other functions</h3>
<p>The formula is universal; what changes is the derivative and the care needed with trigonometry and logs.</p>
<p><strong>Worked example.</strong> Use Newton-Raphson to solve cos x = x starting from x₁ = 0.7.</p>
<pre><code>f(x) = cos x - x;  f'(x) = -sin x - 1
x2 = 0.7 - (0.7648 - 0.7)/(-0.6442 - 1) = 0.7 + 0.0648/1.6442 = 0.7394
x3 = 0.7394 - (0.7391 - 0.7394)/(-0.6735 - 1) = 0.7391
root = 0.7391 (4 d.p.)</code></pre>
<p><strong>Worked example 2 (log equation).</strong> Solve x ln x = 1 from x₁ = 1.5.</p>
<pre><code>f(x) = x ln x - 1;  f'(x) = ln x + 1
x2 = 1.5 - (0.6082 - 1)/(0.4055 + 1) = 1.5 + 0.2788 = 1.7788
x3 = 1.7788 - 0.0423/1.5755 = 1.7519
x4 = 1.7632;  converging to 1.7632</code></pre>
<p>Radians are compulsory in any Newton-Raphson question involving trigonometry; degrees give a value of f′ scaled by π/180 and destroy convergence.</p>

<h3>Choosing a starting value</h3>
<p>Both iteration and Newton-Raphson need a starting value near the root, and a sketch is the reliable way to find one. Plot or sketch y = left-hand side and y = right-hand side of the rearranged equation; the intersections are the roots, and their approximate positions are the starting values.</p>
<p><strong>Worked example.</strong> e^x = 4x has two roots. Sketch and estimate them.</p>
<pre><code>sketch y = e^x and y = 4x: they cross once near x = 0.3 and again
near x = 2.2
checking: e^0.3 = 1.35 against 1.2; e^2.2 = 9.03 against 8.8
so start Newton-Raphson from 0.4 and from 2.2 separately</code></pre>
<p>Two roots require two separate runs; a single guess finds only the root it is near. That is the most common lost mark in equations with several roots.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Sign change)</strong> Show x³ + x − 3 = 0 has a root in (1, 2). <em>Answer:</em> f(1) = −1, f(2) = 7; continuous; sign change.</li>
<li><strong>(Iteration)</strong> x_(n+1) = (3 − x_n)^(1/3), x₁ = 1. Find x₃. <em>Answer:</em> 1.2599, 1.2020.</li>
<li><strong>(Convergence)</strong> g(x) = (3 − x)^(1/3): show |g′| &lt; 1 near 1.21. <em>Answer:</em> |g′| = (1/3)(3 − x)^(−2/3) ≈ 0.21 &lt; 1.</li>
<li><strong>(Newton)</strong> f(x) = x² − 5, x₁ = 2. Find x₂. <em>Answer:</em> 2 − (−1)/4 = 2.25.</li>
<li><strong>(Newton again)</strong> Find x₃ for the same. <em>Answer:</em> 2.25 − 0.0625/4.5 = 2.2361.</li>
<li><strong>(Newton failure)</strong> f(x) = x³, x₁ = −1. What happens? <em>Answer:</em> x₂ = −1 − (−1)/3 = −0.667, converging slowly towards 0; the root is a stationary point, so convergence is linear.</li>
<li><strong>(Trapezium)</strong> Estimate ∫₀² x² dx with 2 strips. <em>Answer:</em> h = 1; (1/2)[0 + 2(1) + 4] = 3.</li>
<li><strong>(Error)</strong> Is that estimate over or under? <em>Answer:</em> over, since x² is concave up; the true value is 8/3 = 2.667.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Claiming exactly one root:</strong> the sign change proves at least one; uniqueness needs monotonicity or a sketch.</li>
<li><strong>Iterating too few times:</strong> the answer must be stable at the required number of decimal places — show consecutive values agreeing.</li>
<li><strong>Calculator in the wrong mode:</strong> iteration on a reset calculator silently uses the last answer; store x_n in a variable.</li>
<li><strong>Newton with a small derivative:</strong> the step overshoots; state the failure rather than ploughing on.</li>
<li><strong>Wrong h:</strong> h = (b − a)/n, not the number of ordinates; counting strips and counting points are different.</li>
<li><strong>Trapezium brackets:</strong> the first and last ordinates are counted once, the interior ones twice; a factor-of-two error here is the classic slip.</li>
<li><strong>Error direction guessed:</strong> justify over/under estimate from the concavity, not from the size of the answer.</li>
<li><strong>Accuracy unqualified:</strong> "the answer is 1.32" without evidence that later iterations agree is not a numerical-methods answer.</li>
</ul>
`,
    "f8fe66ce-4d84-4329-9cb4-7dd7fc8825a1": `
<h2>A Level Mathematics: Proof</h2>
<p>Proof at A2 extends the AS methods with contradiction, disproof by counter-example in unfamiliar settings, and algebraic arguments about divisibility, parity and inequalities. The examinable skills are choosing a method, setting up general notation, and closing the argument — not spotting a clever trick. This note works through each method with complete examples and the wording mark schemes expect.</p>

<h3>The four methods and when to use them</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Use when</th><th>Shape of the argument</th></tr>
<tr><td>Direct</td><td>The statement is algebraic</td><td>Start from definitions, manipulate to the target form</td></tr>
<tr><td>Exhaustion</td><td>The domain splits into a few cases</td><td>Check each case</td></tr>
<tr><td>Counter-example</td><td>The statement claims "for all" and looks false</td><td>Produce one failing case with arithmetic</td></tr>
<tr><td>Contradiction</td><td>The statement is negative or about irrationality/infinity</td><td>Assume the opposite, derive an impossibility</td></tr>
</table>
<p>Choosing badly wastes time: a "prove that there is no largest prime" question cannot be done directly, and a parity statement cannot be done by example.</p>

<h3>Proof by contradiction</h3>
<pre><code>assume the negation, derive a contradiction with a known truth,\nconclude the original statement</code></pre>
<p><strong>Worked example 1 (irrationality of √2).</strong> The classic, examinable in full.</p>
<pre><code>assume sqrt(2) = p/q in lowest terms, p and q integers\n2q^2 = p^2, so p^2 is even, so p is even: p = 2k\n4k^2 = 2q^2  ->  q^2 = 2k^2, so q is even\np and q both even contradicts "lowest terms"\nhence sqrt(2) is irrational</code></pre>
<p><strong>Worked example 2 (no largest prime).</strong> Prove there are infinitely many primes.</p>
<pre><code>assume finitely many: p1, p2, ..., pn\nconsider N = p1 p2 ... pn + 1\nN leaves remainder 1 when divided by any pi, so no pi divides N\nso N has a prime factor not in the list: contradiction\nhence there are infinitely many primes</code></pre>
<p><strong>Worked example 3 (no rational solution).</strong> Prove that x² = 6 has no rational root.</p>
<pre><code>assume x = p/q in lowest terms: p^2 = 6q^2\nso 3 divides p^2, hence 3 divides p: p = 3k\n9k^2 = 6q^2  ->  3k^2 = 2q^2, so 3 divides q^2, hence q\nboth divisible by 3 contradicts lowest terms</code></pre>

<h3>Disproof by counter-example</h3>
<p><strong>Worked example 1.</strong> Disprove "if a &gt; b then a² &gt; b²".</p>
<pre><code>take a = 1, b = -3: 1 > -3 but 1 < 9\ncounter-example disproves the statement</code></pre>
<p><strong>Worked example 2.</strong> Disprove "n² + n + 41 is prime for all positive integers n".</p>
<pre><code>n = 41: 1681 + 41 + 41 = 1763 = 41 x 43, not prime</code></pre>
<p><strong>Worked example 3.</strong> Disprove "every odd number is prime".</p>
<pre><code>9 is odd and 9 = 3 x 3, not prime</code></pre>
<p>Each disproof is complete with one case; the arithmetic must be shown, not asserted.</p>

<h3>Algebraic proof with parity and divisibility</h3>
<pre><code>even: 2n;  odd: 2n + 1\n"is a multiple of k" means the expression equals k times an integer\n</code></pre>
<p><strong>Worked example 1.</strong> Prove that the difference of the squares of two consecutive odd numbers is a multiple of 8.</p>
<pre><code>(2n + 3)^2 - (2n + 1)^2 = (4n^2 + 12n + 9) - (4n^2 + 4n + 1) = 8n + 8\n= 8(n + 1), a multiple of 8</code></pre>
<p><strong>Worked example 2.</strong> Prove that n³ − n is divisible by 6 for all integers n.</p>
<pre><code>n^3 - n = n(n - 1)(n + 1), three consecutive integers\none is even, one is a multiple of 3; since 2 and 3 are coprime,\nthe product is divisible by 6</code></pre>
<p><strong>Worked example 3.</strong> Prove that the product of two consecutive even numbers is a multiple of 8.</p>
<pre><code>2n(2n + 2) = 4n(n + 1); n(n + 1) is even, so the product is 8k</code></pre>

<h3>Inequalities by completing the square</h3>
<pre><code>a squared term is never negative; complete the square to expose a\nminimum, then conclude the inequality</code></pre>
<p><strong>Worked example 1.</strong> Prove that x² − 4x + 7 &gt; 0 for all real x.</p>
<pre><code>= (x - 2)^2 + 3 >= 3 > 0</code></pre>
<p><strong>Worked example 2.</strong> Prove that 4x − x² − 5 &lt; 0 for all x.</p>
<pre><code>= -(x^2 - 4x + 5) = -[(x - 2)^2 + 1] = -(x - 2)^2 - 1 <= -1 < 0</code></pre>
<p><strong>Worked example 3 (unknown constant).</strong> Find the values of k for which x² + kx + k &gt; 0 for all x.</p>
<pre><code>(x + k/2)^2 + k - k^2/4 > 0 requires k - k^2/4 > 0\nk(1 - k/4) > 0  ->  0 < k < 4</code></pre>
<p>The discriminant route gives the same answer (k² − 4k &lt; 0); the completing-the-square route states the minimum explicitly, which is usually clearer in a proof.</p>

<h3>Proof by exhaustion</h3>
<p><strong>Worked example.</strong> Prove that every integer from 1 to 10 is either prime, a square, or the sum of two primes.</p>
<pre><code>1 (square); 2 (prime); 3 (prime); 4 (square); 5 (prime);\n6 = 3 + 3; 7 (prime); 8 = 3 + 5; 9 (square); 10 = 3 + 7\nall ten cases checked  ->  statement proved for this finite domain</code></pre>
<p>Exhaustion is only valid for a finite domain, and the proof is incomplete unless every case is listed. State the domain explicitly.</p>

<h3>Setting out a proof for full marks</h3>
<ul>
<li>Define every variable with its domain ("let n be an integer").</li>
<li>State which method you are using when it is not obvious.</li>
<li>Write the algebra in connected steps, each justified.</li>
<li>Finish with a sentence tying the result to the claim ("hence ... as required").</li>
<li>For contradiction, state the assumption and where the contradiction lies.</li>
</ul>
<p><strong>Worked example (full structure).</strong> Prove that if n is odd then n² + 1 is even.</p>
<pre><code>let n be an odd integer, so n = 2k + 1 for some integer k   [definition]\nn^2 + 1 = 4k^2 + 4k + 1 + 1 = 4k^2 + 4k + 2              [algebra]\n        = 2(2k^2 + 2k + 1)                              [target form]\nwhich is even, hence n^2 + 1 is even whenever n is odd      [conclusion]</code></pre>

<h3>Inequalities with the discriminant</h3>
<p>"Always positive" or "always negative" quadratics are proved with the discriminant, which is the algebraic form of the completing-the-square argument.</p>
<pre><code>ax^2 + bx + c > 0 for all x  (a > 0)  <=>  b^2 - 4ac < 0
ax^2 + bx + c < 0 for all x  (a < 0)  <=>  b^2 - 4ac < 0
</code></pre>
<p><strong>Worked example.</strong> Prove that 2x² − 3x + 4 &gt; 0 for all real x.</p>
<pre><code>a = 2 > 0;  discriminant = 9 - 32 = -23 < 0
no real roots and the parabola opens upward, so it never touches the
x-axis and is positive throughout</code></pre>
<p><strong>Worked example 2 (find the range).</strong> Find p such that x² + (p + 1)x + 4 &gt; 0 for all x.</p>
<pre><code>(p + 1)^2 - 16 < 0  ->  -4 < p + 1 < 4  ->  -5 < p < 3</code></pre>
<p><strong>Worked example 3 (negative leading coefficient).</strong> Prove that −x² + 2x − 5 &lt; 0 for all x.</p>
<pre><code>a = -1 < 0;  discriminant = 4 - 20 = -16 < 0
no real roots and the parabola opens downward, so it stays below the axis</code></pre>

<h3>Proving statements about sums and sequences</h3>
<p>Closed-form statements about sums are proved by deriving the formula or by induction on the pattern; the derivation is always acceptable and often shorter.</p>
<p><strong>Worked example 1.</strong> Prove that the sum of the first n odd numbers is n².</p>
<pre><code>S = 1 + 3 + 5 + ... + (2n - 1), an arithmetic series
a = 1, d = 2: S = (n/2)[2 + 2(n - 1)] = (n/2)(2n) = n^2</code></pre>
<p><strong>Worked example 2.</strong> Prove that the sum of the first n terms of 2 + 4 + 8 + ... is 2^(n+1) − 2.</p>
<pre><code>geometric with a = 2, r = 2: S = 2(2^n - 1)/(2 - 1) = 2^(n+1) - 2</code></pre>
<p><strong>Worked example 3 (difference of squares).</strong> Prove that every odd number greater than 1 is the difference of two squares.</p>
<pre><code>let the odd number be 2n + 1 = (n + 1)^2 - n^2
since (n + 1)^2 - n^2 = 2n + 1, the representation always exists</code></pre>

<h3>Statements about the roots of a quadratic</h3>
<p>Relations between roots and coefficients are provable from the quadratic formula and are a favourite A2 proof.</p>
<pre><code>for ax^2 + bx + c = 0 with roots alpha and beta:
alpha + beta = -b/a;  alpha beta = c/a</code></pre>
<p><strong>Worked example.</strong> Prove that the sum of the roots of x² + px + q = 0 is −p.</p>
<pre><code>roots: (-p +/- sqrt(p^2 - 4q))/2
sum: [-p + sqrt(...) - p - sqrt(...)]/2 = -2p/2 = -p</code></pre>
<p><strong>Worked example 2.</strong> Prove that if one root of x² + bx + c = 0 is twice the other, then 2b² = 9c.</p>
<pre><code>roots k and 2k: sum 3k = -b, product 2k^2 = c
k = -b/3, so 2b^2/9 = c  ->  2b^2 = 9c</code></pre>
<p><strong>Worked example 3 (discriminant).</strong> Prove that x² + 2x + 2 = 0 has no real roots.</p>
<pre><code>discriminant = 4 - 8 = -4 < 0, so no real solutions
(equivalently (x + 1)^2 + 1 = 0 has no real solution)</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Contradiction)</strong> Prove √3 is irrational. <em>Answer:</em> assume p/q lowest terms, 3q² = p², 3 | p, then 3 | q — contradiction.</li>
<li><strong>(Counter-example)</strong> Disprove "n² − n + 1 is prime for all n". <em>Answer:</em> n = 4 gives 13 (prime) — try n = 5: 21 = 3 × 7, not prime.</li>
<li><strong>(Parity)</strong> Prove the sum of two odd numbers is even. <em>Answer:</em> (2m + 1) + (2n + 1) = 2(m + n + 1).</li>
<li><strong>(Divisibility)</strong> Prove 5n² + 5n is a multiple of 10. <em>Answer:</em> 5n(n + 1); n(n + 1) is even, so 5 × even = 10k.</li>
<li><strong>(Inequality)</strong> Prove x² + 2x + 2 &gt; 0. <em>Answer:</em> (x + 1)² + 1 ≥ 1.</li>
<li><strong>(Constant)</strong> Find k so that x² + 2kx + 9 &gt; 0 always. <em>Answer:</em> 4k² &lt; 36 → −3 &lt; k &lt; 3.</li>
<li><strong>(Exhaustion)</strong> Prove n² + n is even by cases. <em>Answer:</em> n even → 4k² + 2k; n odd → 4k² + 6k + 2; both even.</li>
<li><strong>(Contradiction)</strong> Prove there is no greatest even integer. <em>Answer:</em> if N were greatest, N + 2 is even and larger — contradiction.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Examples offered as proof:</strong> only a general algebraic argument proves a universal claim.</li>
<li><strong>Undefined variables:</strong> "let x be odd" without x = 2k + 1 leaves nothing to manipulate.</li>
<li><strong>Contradiction not closed:</strong> name the contradiction explicitly — "this contradicts lowest terms".</li>
<li><strong>Assuming the conclusion:</strong> starting from the statement to be proved and deriving a truth proves nothing unless every step is reversible.</li>
<li><strong>Divisibility without coprimality:</strong> "divisible by 2 and by 3 hence by 6" needs 2 and 3 coprime; it is true here, but state it.</li>
<li><strong>Exhaustion on an infinite domain:</strong> cases must cover every possibility; a finite sample is not exhaustion.</li>
<li><strong>Counter-example unchecked:</strong> show the arithmetic that breaks the claim.</li>
<li><strong>Conclusion missing:</strong> finish with a sentence; an algebraic derivation alone reads as unfinished.</li>
</ul>
`,
  },
};
