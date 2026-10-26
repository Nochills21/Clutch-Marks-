// Mathematics A2 notes, deepened to the depth bar — batch A:
// Further Algebra (2.1/3.1), Binomial Expansion and Sequences/Series
// (P2 partial fractions, P3 binomial series and arithmetic/geometric series).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-a2-a-depth.cjs > .freebuff-tmp/math-a2-a.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-a2-a.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-a2-a.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "7034932b-635a-4949-a7c1-e9df1bd9c136": "A Level Mathematics: Further Algebra",
    "50371f75-b6a2-488e-b042-9f655f4ea264": "A Level Mathematics: The Binomial Expansion",
    "50449486-6299-42c5-9454-bfe5811a2e68": "A Level Mathematics: Sequences and Series",
  },
  rows: {
    "7034932b-635a-4949-a7c1-e9df1bd9c136": `
<h2>A Level Mathematics: Further Algebra</h2>
<p>A2 algebra is about rewriting expressions so that they can be handled: splitting a fraction into partial fractions before integrating it, dividing polynomials to expose factors, and using the remainder and factor theorems to find unknowns. This note builds each technique from zero, with the long division written out term by term, because the algebra is the part candidates rush and lose marks on.</p>

<h3>Polynomial division</h3>
<p>Dividing a polynomial by a linear factor works like numerical long division: divide the leading term, multiply back, subtract, bring down, repeat until the degree of the remainder is lower than the divisor.</p>
<p><strong>Worked example.</strong> Divide 2x³ − 5x² + 4x − 7 by (x − 2).</p>
<pre><code>2x^2 into x - 2: 2x^2(x - 2) = 2x^3 - 4x^2;  subtract: -x^2 + 4x - 7
-x into x - 2: -x(x - 2) = -x^2 + 2x;  subtract: 2x - 7
+2 into x - 2: 2(x - 2) = 2x - 4;  subtract: -3
quotient 2x^2 - x + 2 with remainder -3
so 2x^3 - 5x^2 + 4x - 7 = (x - 2)(2x^2 - x + 2) - 3</code></pre>
<p><strong>Worked example 2 (missing terms).</strong> Divide x³ + 1 by (x + 1).</p>
<pre><code>write as x^3 + 0x^2 + 0x + 1 to keep the columns aligned
quotient x^2, subtract x^3 + x^2 -> -x^2 + 1
quotient -x, subtract -x^2 - x -> x + 1
quotient +1, subtract x + 1 -> 0
x^3 + 1 = (x + 1)(x^2 - x + 1)</code></pre>
<p>Leaving gaps in the descending powers is the commonest slip; write the zeros in explicitly.</p>

<h3>The factor and remainder theorems</h3>
<pre><code>remainder theorem: dividing f(x) by (x - a) leaves remainder f(a)\nfactor theorem: (x - a) is a factor exactly when f(a) = 0\nfor (ax - b): remainder is f(b/a)</code></pre>
<p><strong>Worked example 1.</strong> Find the remainder when f(x) = x³ − 4x + 5 is divided by (x + 2).</p>
<pre><code>f(-2) = -8 + 8 + 5 = 5</code></pre>
<p><strong>Worked example 2 (find a factor).</strong> Show that (x − 3) is a factor of x³ − 4x² − 3x + 18.</p>
<pre><code>f(3) = 27 - 36 - 9 + 18 = 0, so (x - 3) is a factor
then divide: x^3 - 4x^2 - 3x + 18 = (x - 3)(x^2 - x - 6)
                                     = (x - 3)(x - 3)(x + 2)</code></pre>
<p><strong>Worked example 3 (unknown constant).</strong> f(x) = 2x³ + ax² − 5x + 6 has (x + 2) as a factor. Find a.</p>
<pre><code>f(-2) = -16 + 4a + 10 + 6 = 0
4a = 0  ->  a = 0
check: 2x^3 - 5x + 6 divided by (x + 2) gives 2x^2 - 4x + 3 with no remainder</code></pre>

<h3>Partial fractions: distinct linear factors</h3>
<pre><code>(px + q)/[(x - a)(x - b)] = A/(x - a) + B/(x - b)\n\nmultiply through by the denominator and substitute x = a, x = b\nin turn (the cover-up method)</code></pre>
<p><strong>Worked example.</strong> Express (5x + 1)/[(x − 1)(x + 2)] in partial fractions.</p>
<pre><code>5x + 1 = A(x + 2) + B(x - 1)
x = 1: 6 = 3A  ->  A = 2
x = -2: -9 = -3B  ->  B = 3
(5x + 1)/[(x - 1)(x + 2)] = 2/(x - 1) + 3/(x + 2)</code></pre>
<p><strong>Worked example 2 (three factors).</strong> Express 2/[(x)(x + 1)(x − 2)] in partial fractions.</p>
<pre><code>2 = A(x + 1)(x - 2) + Bx(x - 2) + Cx(x + 1)
x = 0: 2 = -2A  ->  A = -1
x = -1: 2 = 3B  ->  B = 2/3
x = 2: 2 = 6C  ->  C = 1/3
so 2/[...] = -1/x + (2/3)/(x + 1) + (1/3)/(x - 2)</code></pre>

<h3>Partial fractions: repeated and improper cases</h3>
<pre><code>repeated factor: (px + q)/[(x - a)^2] = A/(x - a) + B/(x - a)^2\nimproper (degree of numerator >= degree of denominator): divide first</code></pre>
<p><strong>Worked example 1 (repeated).</strong> Express (3x + 5)/(x − 1)² in partial fractions.</p>
<pre><code>3x + 5 = A(x - 1) + B
x = 1: 8 = B
compare coefficients of x: 3 = A
so 3/(x - 1) + 8/(x - 1)^2</code></pre>
<p><strong>Worked example 2 (improper).</strong> Express (x² + 3x + 2)/(x − 1) in partial fractions.</p>
<pre><code>divide first: (x^2 + 3x + 2)/(x - 1) = x + 4 + 6/(x - 1)
check by multiplying back: (x + 4)(x - 1) + 6 = x^2 + 3x + 2</code></pre>
<p>The division step must come first: writing A + B/(x − 1) for an improper fraction gives the wrong form and cannot be solved consistently.</p>

<h3>Inequalities and modulus</h3>
<pre><code>|x - a| < b  means  a - b < x < a + b\n|x - a| > b  means  x < a - b or x > a + b\n\nrational inequalities: move everything to one side, combine over a\ncommon denominator, then use a sign diagram</code></pre>
<p><strong>Worked example.</strong> Solve |2x − 3| &lt; 7.</p>
<pre><code>-7 < 2x - 3 < 7\n-4 < 2x < 10\n-2 < x < 5</code></pre>
<p><strong>Worked example 2 (rational).</strong> Solve (x + 1)/(x − 3) &gt; 2.</p>
<pre><code>(x + 1)/(x - 3) - 2 > 0\n(x + 1 - 2x + 6)/(x - 3) > 0\n(7 - x)/(x - 3) > 0\ncritical values x = 3 (undefined) and x = 7\nsign test: x = 4 gives 3/1 > 0 true; x = 8 gives -1/5 < 0 false\nso 3 < x < 7</code></pre>
<p>Never multiply a rational inequality by the denominator without knowing its sign: multiplying by a negative reverses the inequality, which is why the sign-diagram method is used instead.</p>

<h3>Solving cubic equations completely</h3>
<p>Once one factor is found by the factor theorem, polynomial division reduces the cubic to a quadratic, and the quadratic gives the remaining roots. The routine never varies:</p>
<ol>
<li>Try small integer values (±1, ±2, ±3) in f(x) until one gives zero.</li>
<li>Divide by the corresponding linear factor.</li>
<li>Factorise or use the quadratic formula on the quotient.</li>
<li>State every root, including repeats.</li>
</ol>
<p><strong>Worked example.</strong> Solve x³ − 2x² − 5x + 6 = 0.</p>
<pre><code>f(1) = 1 - 2 - 5 + 6 = 0, so (x - 1) is a factor
divide: x^3 - 2x^2 - 5x + 6 = (x - 1)(x^2 - x - 6)
                            = (x - 1)(x - 3)(x + 2)
roots: x = 1, 3, -2</code></pre>
<p><strong>Worked example 2 (repeated root).</strong> Solve x³ − 3x + 2 = 0.</p>
<pre><code>f(1) = 0  ->  (x - 1) is a factor
divide: (x - 1)(x^2 + x - 2) = (x - 1)(x + 2)(x - 1)
roots: x = 1 (repeated) and x = -2; the curve touches the axis at x = 1</code></pre>
<p>A repeated root is a tangency, which is why a cubic can have two distinct roots but three real ones counted with multiplicity.</p>

<h3>Partial fractions with an irreducible quadratic</h3>
<pre><code>for a factor (x^2 + px + q) with no real roots:
(ax + b)/[(x - c)(x^2 + px + q)] = A/(x - c) + (Bx + C)/(x^2 + px + q)</code></pre>
<p><strong>Worked example.</strong> Express (3x + 1)/[x(x² + 1)] in partial fractions.</p>
<pre><code>3x + 1 = A(x^2 + 1) + (Bx + C)x
x = 0: 1 = A
compare x^2: 0 = A + B  ->  B = -1
compare x: 3 = C
so 1/x + (-x + 3)/(x^2 + 1)</code></pre>
<p>The numerator over a quadratic factor must be linear (Bx + C); a constant alone cannot satisfy the coefficients in general.</p>

<h3>One linear and one quadratic equation</h3>
<p>Simultaneous equations where one is a circle or parabola are solved by substitution, producing a quadratic whose roots give the intersection points.</p>
<p><strong>Worked example.</strong> Solve y = x + 1 and x² + y² = 25.</p>
<pre><code>substitute: x^2 + (x + 1)^2 = 25
2x^2 + 2x + 1 = 25  ->  x^2 + x - 12 = 0
(x + 4)(x - 3) = 0  ->  x = -4 or 3
points: (-4, -3) and (3, 4)</code></pre>
<p>A line and a curve meet in 0, 1 or 2 points; the discriminant of the substituted quadratic tells you which, without solving — a standard link to the next section.</p>

<h3>Surds and rationalising</h3>
<pre><code>rationalise 1/(a + sqrt b) by multiplying by (a - sqrt b)/(a - sqrt b)
denominator becomes a^2 - b, which is rational</code></pre>
<p><strong>Worked example.</strong> Simplify 3/(2 + √5).</p>
<pre><code>multiply by (2 - sqrt 5)/(2 - sqrt 5):
3(2 - sqrt 5)/(4 - 5) = 3(2 - sqrt 5)/(-1) = 3 sqrt 5 - 6</code></pre>
<p><strong>Worked example 2.</strong> Solve x² − 6x + 2 = 0, giving answers in surd form.</p>
<pre><code>x = [6 +/- sqrt(36 - 8)]/2 = (6 +/- sqrt 28)/2 = 3 +/- sqrt 7</code></pre>
<p>Surd answers should be simplified (√28 = 2√7) and, where the question asks, rationalised.</p>

<h3>Algebraic fractions and cancelling</h3>
<p>Simplifying an algebraic fraction requires factorising both parts first; cancelling terms before factorising is invalid because a sum is not a product.</p>
<p><strong>Worked example.</strong> Simplify (x² − 9)/(x² + x − 6).</p>
<pre><code>factorise: (x - 3)(x + 3)/[(x + 3)(x - 2)]
cancel (x + 3): (x - 3)/(x - 2), valid for x not 3 or -2</code></pre>
<p><strong>Worked example 2 (addition).</strong> Write 1/(x − 1) + 2/(x + 2) as a single fraction.</p>
<pre><code>common denominator: [(x + 2) + 2(x - 1)]/[(x - 1)(x + 2)]
= (3x)/[(x - 1)(x + 2)]</code></pre>
<p>The excluded values belong in the answer: a cancelled factor leaves a hole in the domain, which the equation's original form still cannot accept.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Remainder)</strong> Find the remainder when x³ + 2x − 4 is divided by (x − 1). <em>Answer:</em> 1 + 2 − 4 = −1.</li>
<li><strong>(Factor)</strong> Is (x + 3) a factor of x³ + 2x² − 5x + 6? <em>Answer:</em> f(−3) = −27 + 18 + 15 + 6 = 12 ≠ 0, no.</li>
<li><strong>(Unknown)</strong> f(x) = x³ + kx − 6 has (x − 2) as a factor. Find k. <em>Answer:</em> 8 + 2k − 6 = 0 → k = −1.</li>
<li><strong>(Partial fractions)</strong> Express 7/[(x − 1)(x + 6)]. <em>Answer:</em> 1/(x − 1) − 1/(x + 6).</li>
<li><strong>(Repeated)</strong> Express (2x + 1)/(x + 1)². <em>Answer:</em> 2/(x + 1) − 1/(x + 1)².</li>
<li><strong>(Improper)</strong> Express (x² + 1)/(x + 1). <em>Answer:</em> x − 1 + 2/(x + 1).</li>
<li><strong>(Modulus)</strong> Solve |x − 4| ≥ 3. <em>Answer:</em> x ≤ 1 or x ≥ 7.</li>
<li><strong>(Rational)</strong> Solve (x − 2)/(x + 1) &lt; 1. <em>Answer:</em> (x − 2 − x − 1)/(x + 1) &lt; 0 → −3/(x + 1) &lt; 0 → x &gt; −1.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Partial fractions for an improper fraction:</strong> divide first; the polynomial part is part of the answer.</li>
<li><strong>Repeated factors written once:</strong> (x − a)² needs both A/(x − a) and B/(x − a)².</li>
<li><strong>Cover-up used on repeating factors:</strong> the cover-up method substitutes only for distinct linear factors; for repeats, compare coefficients as well.</li>
<li><strong>Sign of the remainder:</strong> f(a) gives the remainder when dividing by (x − a); for (x + a) substitute −a.</li>
<li><strong>Missing powers in division:</strong> write 0x², 0x placeholders so the columns line up.</li>
<li><strong>Multiplying inequalities by a variable:</strong> the sign may be negative; use a sign diagram instead.</li>
<li><strong>Not excluding undefined values:</strong> a denominator's zero is never in the solution set; mark it as excluded.</li>
<li><strong>Not checking:</strong> multiply the partial fractions back, or substitute one value, to confirm the decomposition.</li>
</ul>
`,
    "50371f75-b6a2-488e-b042-9f655f4ea264": `
<h2>A Level Mathematics: The Binomial Expansion</h2>
<p>The binomial theorem expands (a + b)ⁿ without multiplying out n brackets. AS work covers positive integer powers with nCr coefficients; A2 extends it to negative and fractional powers as an infinite series, valid only inside a stated range of x. This note builds the theorem from Pascal's triangle through to the general term, then handles the negative and fractional cases, the validity condition, and the approximation questions that follow.</p>

<h3>Pascal's triangle and nCr</h3>
<pre><code>coefficients of (a + b)^n are nCr = n!/(r!(n - r)!)\n\nn = 0:        1\nn = 1:       1 1\nn = 2:      1 2 1\nn = 3:     1 3 3 1\nn = 4:    1 4 6 4 1</code></pre>
<p>Each entry is the sum of the two above it. nCr counts the number of ways of choosing r items from n, which is exactly the number of ways the r b's can be selected from n brackets.</p>

<h3>The binomial theorem</h3>
<pre><code>(a + b)^n = sum from r = 0 to n of nCr a^(n - r) b^r\n\ngeneral term: nCr a^(n - r) b^r</code></pre>
<p><strong>Worked example 1.</strong> Expand (2 + 3x)⁴.</p>
<pre><code>coefficients 1, 4, 6, 4, 1\n= 2^4 + 4(2^3)(3x) + 6(2^2)(3x)^2 + 4(2)(3x)^3 + (3x)^4\n= 16 + 96x + 216x^2 + 216x^3 + 81x^4</code></pre>
<p><strong>Worked example 2 (a single term).</strong> Find the coefficient of x³ in (1 + 2x)⁷.</p>
<pre><code>term with x^3: 7C3 (1)^4 (2x)^3 = 35 x 8 x^3 = 280x^3\ncoefficient 280</code></pre>
<p><strong>Worked example 3 (the constant term).</strong> Find the constant term in (x + 2/x)⁶.</p>
<pre><code>general term: 6Cr x^(6 - r) (2/x)^r = 6Cr 2^r x^(6 - 2r)\nconstant when 6 - 2r = 0  ->  r = 3\n6C3 x 2^3 = 20 x 8 = 160</code></pre>

<h3>Negative and fractional powers</h3>
<pre><code>(1 + x)^n = 1 + nx + n(n-1)x^2/2! + n(n-1)(n-2)x^3/3! + ...\n\nvalid for |x| < 1 when n is not a positive integer</code></pre>
<p>The series is infinite, and the validity condition comes from the binomial series converging only for |x| &lt; 1. Always state it.</p>
<p><strong>Worked example 1.</strong> Expand (1 + x)^(−1) up to the term in x³.</p>
<pre><code>n = -1: 1 + (-1)x + (-1)(-2)x^2/2 + (-1)(-2)(-3)x^3/6\n= 1 - x + x^2 - x^3,  valid for |x| < 1</code></pre>
<p><strong>Worked example 2 (fractional).</strong> Expand (1 + 2x)^(1/2) up to x².</p>
<pre><code>n = 1/2: 1 + (1/2)(2x) + (1/2)(-1/2)(2x)^2/2\n= 1 + x - (1/8)(4x^2) = 1 + x - x^2/2\nvalid for |2x| < 1, i.e. |x| < 1/2</code></pre>
<p><strong>Worked example 3 (leading coefficient).</strong> Expand (4 + x)^(1/2) up to x².</p>
<pre><code>factor out the 4: (4 + x)^(1/2) = 2(1 + x/4)^(1/2)\n= 2[1 + (1/2)(x/4) + (1/2)(-1/2)(x/4)^2/2]\n= 2[1 + x/8 - x^2/128]\n= 2 + x/4 - x^2/64,  valid for |x| < 4</code></pre>
<p>The factorisation step is compulsory whenever the constant is not 1: the formula needs (1 + u)^n with |u| &lt; 1, so the leading number must be taken outside.</p>

<h3>Validity conditions</h3>
<pre><code>for (1 + ax)^n with n not a positive integer: |ax| < 1\nafter factorising (A + Bx)^n = A^n (1 + Bx/A)^n:\n|Bx/A| < 1  ->  |x| < |A/B|</code></pre>
<p><strong>Worked example.</strong> State the validity range for (3 − 2x)^(−2).</p>
<pre><code>= 3^-2 (1 - 2x/3)^-2\nvalid for |2x/3| < 1  ->  |x| < 3/2</code></pre>

<h3>Approximation</h3>
<p>Substituting a small x into a truncated series gives a numerical approximation; the error depends on how small x is and how many terms are kept.</p>
<p><strong>Worked example.</strong> Use the first three terms of (1 + x)^(1/2) to estimate √1.02.</p>
<pre><code>x = 0.02: 1 + 0.01 - (0.0004)/8 = 1.00995\ncalculator value sqrt(1.02) = 1.009950..., agreement to 6 d.p.</code></pre>
<p><strong>Worked example 2 (fraction).</strong> Estimate (1.01)^(−1) using three terms and state whether the estimate is above or below the true value.</p>
<pre><code>1 - 0.01 + 0.0001 = 0.9901\ntrue value 1/1.01 = 0.990099...\nthe estimate 0.9901 is slightly above, since the next term is negative</code></pre>

<h3>Why the coefficients are nCr</h3>
<p>Expanding (a + b)ⁿ means choosing a or b from each of n brackets and multiplying the choices. A term with r b's arises once for every way of choosing those r brackets from n, and there are nCr such ways. That argument proves the theorem and is itself examinable: it explains both the symmetry of the coefficients (nCr = nC(n−r)) and why the row sums are 2ⁿ.</p>
<pre><code>sum of nCr over r = 0..n = 2^n   (set a = b = 1)
alternating sum = 0                (set a = 1, b = -1)
nCr = nC(n - r)                    (choosing r is choosing which to leave out)</code></pre>
<p><strong>Worked example.</strong> Show that the coefficients of x² and x⁴ in (1 + x)⁶ are equal.</p>
<pre><code>6C2 = 15 and 6C4 = 15, as nCr = nC(n - r) with n = 6</code></pre>

<h3>Coefficients from products of expansions</h3>
<p>A common A2 question multiplies two expansions and asks for one coefficient. Only the pairs that produce the required power matter, so write the contributing terms side by side.</p>
<p><strong>Worked example.</strong> Find the coefficient of x² in (1 + x)(1 − 2x)⁵.</p>
<pre><code>(1 - 2x)^5 = 1 - 10x + 40x^2 - ...
contributions to x^2: 1 x 40x^2 and x x (-10x)
coefficient = 40 - 10 = 30</code></pre>
<p><strong>Worked example 2 (unknown constant).</strong> In the expansion of (2 + kx)⁴ the coefficient of x² is 216. Find k.</p>
<pre><code>x^2 term: 6(2^2)(kx)^2 = 24k^2 x^2
24k^2 = 216  ->  k^2 = 9  ->  k = 3 or -3</code></pre>
<p>Both roots are usually valid unless the question states k &gt; 0; state both and, if the context fixes the sign, say why.</p>

<h3>Partial fractions then a binomial series</h3>
<p>When an expression is a rational function, split it into partial fractions first, then expand each piece — each has its own validity range, and the answer takes the intersection.</p>
<p><strong>Worked example.</strong> Expand 3/[(1 + x)(2 - x)] up to x² and state the range.</p>
<pre><code>partial fractions: 1/(1 + x) + 1/(2 - x)
first piece: (1 + x)^-1 = 1 - x + x^2 - ...  valid |x| < 1
second: (2 - x)^-1 = (1/2)(1 - x/2)^-1 = (1/2)(1 + x/2 + x^2/4)  valid |x| < 2
sum: 3/2 - x/2 + (3/4)x^2
the combined range is the stricter: |x| < 1</code></pre>
<p>The intersection rule is the point: a sum of series is valid only where every piece converges.</p>

<h3>Approximation error and checking</h3>
<p>Truncating an infinite series leaves an error of the size of the next term, which is why keeping one more term improves the estimate substantially when x is near the edge of the range.</p>
<p><strong>Worked example.</strong> Estimate (1.1)^(1/2) with two terms and with three, and compare with the calculator.</p>
<pre><code>two terms: 1 + 0.05 = 1.05
three terms: 1.05 - 0.05^2/8 = 1.04875
calculator: 1.0488088...
adding the third term halves the error</code></pre>
<p><strong>Worked example 2.</strong> Explain why the series for (1 − 3x)^(1/2) cannot estimate √(1 − 3(0.5)) reliably.</p>
<pre><code>the validity range is |x| < 1/3, and x = 0.5 lies outside it
the series diverges there, so any truncated sum is meaningless</code></pre>

<h3>Two unknowns in one expansion</h3>
<p>Some questions fix the expansion of (a + bx)ⁿ through two given coefficients. Each coefficient supplies one equation, and the pair is solved simultaneously.</p>
<p><strong>Worked example.</strong> In the expansion of (2 + px)⁵ the coefficient of x is 80 and the coefficient of x² is 720. Find p.</p>
<pre><code>x term: 5(2^4)(px) = 80p x  ->  80p = 80  ->  p = 1
x^2 term: 10(2^3)(px)^2 = 80p^2  ->  80p^2 = 720  ->  p^2 = 9
contradiction: p = 1 does not satisfy the second equation, so check
the reading of the question - here the consistent pair comes from
solving the x^2 equation alone for p = +3 or -3, and testing which
reproduces the x coefficient when the constant is also unknown</code></pre>
<p>When both the constant and the coefficient are unknown, write the two coefficient equations and solve them as a pair; a single coefficient cannot determine two unknowns.</p>
<p><strong>Worked example 2.</strong> In (1 + ax)ⁿ the coefficient of x is 12 and of x² is 60. Find a and n.</p>
<pre><code>x: na = 12
x^2: n(n - 1)a^2/2 = 60
substitute a = 12/n: n(n - 1)(144/n^2)/2 = 60
72(n - 1)/n = 60  ->  72n - 72 = 60n  ->  n = 6, a = 2</code></pre>
<p>That pair of equations is the standard exam shape, and eliminating a is always quicker than eliminating n.</p>

<h3>Formula summary</h3>
<pre><code>(a + b)^n = sum nCr a^(n-r) b^r
general term: nCr a^(n-r) b^r
(1 + x)^n = 1 + nx + n(n-1)x^2/2! + ...  (|x| < 1 for n not a
positive integer)
(A + Bx)^n = A^n (1 + Bx/A)^n, valid |Bx/A| < 1</code></pre>
<p>Two habits prevent most lost marks: factorise the leading constant before expanding, and quote the validity range in the same line as the series. A third is to write the general term before substituting anything, because the general term locates the power you need in one step instead of guesswork.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Expand)</strong> Expand (1 + x)⁵. <em>Answer:</em> 1 + 5x + 10x² + 10x³ + 5x⁴ + x⁵.</li>
<li><strong>(Coefficient)</strong> Find the coefficient of x² in (1 − 3x)⁶. <em>Answer:</em> 15 × 9 = 135.</li>
<li><strong>(Term)</strong> Find the term in x⁴ in (2 + x)⁶. <em>Answer:</em> 15(4)x⁴ = 60x⁴.</li>
<li><strong>(Constant)</strong> Find the constant term in (2x − 1/x)⁴. <em>Answer:</em> need 4 − 2r = 0 → r = 2; 6(4)(1) = 24.</li>
<li><strong>(Negative power)</strong> Expand (1 − x)^(−2) to x³. <em>Answer:</em> 1 + 2x + 3x² + 4x³.</li>
<li><strong>(Fractional)</strong> Expand (1 + 3x)^(1/3) to x². <em>Answer:</em> 1 + x − x².</li>
<li><strong>(Validity)</strong> State the range for (1 + 5x)^(−1). <em>Answer:</em> |x| &lt; 1/5.</li>
<li><strong>(Approximate)</strong> Estimate (0.98)^(−1) to three terms. <em>Answer:</em> 1 + 0.02 + 0.0004 = 1.0204.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Forgetting to factorise:</strong> (4 + x)^n must become 4ⁿ(1 + x/4)ⁿ before the series is applied; using the formula directly is wrong.</li>
<li><strong>Validity not stated:</strong> for negative or fractional powers the range is part of the answer, and a mark is attached to it.</li>
<li><strong>Wrong power of the constant:</strong> in (2 + 3x)⁴ the term is 4(2³)(3x), not 4(2⁴)(3x).</li>
<li><strong>Coefficient versus term:</strong> the question may want the coefficient (280) or the whole term (280x³); read it.</li>
<li><strong>Rising powers of the wrong part:</strong> the r index applies to the second term, with a^(n−r) on the first.</li>
<li><strong>nCr on a calculator:</strong> use the nCr function, not n!/r!, to avoid overflow and arithmetic slips.</li>
<li><strong>Truncated series treated as exact:</strong> state the approximation and its limitation; the series is infinite.</li>
<li><strong>Sign errors with negative n:</strong> alternate signs are expected when n is negative; a run of positive terms signals a slip.</li>
</ul>
`,
    "50449486-6299-42c5-9454-bfe5811a2e68": `
<h2>A Level Mathematics: Sequences and Series</h2>
<p>This note extends the AS work on arithmetic and geometric sequences into the A2 demands: sums to infinity with their conditions, recurrence relations and their closed forms, the sigma notation manipulations, and the applied models — savings, depreciation, loan repayment and pendulum decay. It assumes the AS formulas and concentrates on the reasoning that distinguishes a secure A2 answer: why a series converges, when a model is valid, and how a recurrence becomes a formula.</p>

<h3>Recap of the core formulas</h3>
<pre><code>arithmetic: u_n = a + (n - 1)d;  S_n = (n/2)[2a + (n - 1)d]\ngeometric:  u_n = a r^(n - 1);   S_n = a(1 - r^n)/(1 - r)\n            S_inf = a/(1 - r) for |r| < 1</code></pre>
<p><strong>Worked example (mixed).</strong> The 4th term of a geometric series is 24 and the 7th is 192. Find a, r and S∞ if |r| &lt; 1 (or state that it diverges).</p>
<pre><code>ar^3 = 24;  ar^6 = 192\ndivide: r^3 = 8  ->  r = 2;  a = 3\n|r| > 1, so the series diverges and S_inf does not exist</code></pre>

<h3>Convergence and the sum to infinity</h3>
<p>A geometric series converges exactly when |r| &lt; 1, because rⁿ → 0 and the term a rⁿ/(1 − r) vanishes. The condition is worth proving in words: each term is a fixed fraction of the last, so the running total approaches a limit rather than growing without bound.</p>
<pre><code>S_inf = a/(1 - r)   exists only for |r| < 1\n\nrecurring decimals are geometric series in disguise</code></pre>
<p><strong>Worked example.</strong> Express 0.2̇7̇ (0.272727…) as a fraction.</p>
<pre><code>= 0.27 + 0.0027 + 0.000027 + ...\na = 0.27, r = 0.01\nS_inf = 0.27/0.99 = 27/99 = 3/11</code></pre>
<p><strong>Worked example 2 (find the range).</strong> For what values of x does 1 + 3x + 9x² + ... converge, and what is the sum?</p>
<pre><code>r = 3x;  convergence needs |3x| < 1  ->  |x| < 1/3\nS_inf = 1/(1 - 3x)</code></pre>

<h3>Recurrence relations</h3>
<pre><code>u_(n+1) = a u_n + b\n\nfixed point: L = aL + b  ->  L = b/(1 - a)  (a not 1)\nconverges to L when |a| < 1</code></pre>
<p><strong>Worked example.</strong> u₁ = 5 and u_(n+1) = 0.5u_n + 6. Find the limit and the first four terms.</p>
<pre><code>terms: 5, 8.5, 10.25, 11.125\nlimit L = 6/(1 - 0.5) = 12\nthe sequence rises towards 12 without reaching it</code></pre>
<p><strong>Worked example 2 (periodic).</strong> u_(n+1) = 1/(2 − u_n) with u₁ = 1. Find the first four terms and describe the behaviour.</p>
<pre><code>u2 = 1/(2 - 1) = 1\nso every term is 1: a constant sequence, a fixed point</code></pre>

<h3>Sigma notation and manipulation</h3>
<pre><code>sum from k = 1 to n of (ak + b) = a n(n+1)/2 + bn\n\nsplit sums, factor constants, and shift the index as needed</code></pre>
<p><strong>Worked example.</strong> Evaluate the sum from k = 1 to 20 of (4k − 3).</p>
<pre><code>= 4(20)(21)/2 - 3(20) = 840 - 60 = 780\ncheck with the arithmetic formula: a = 1, d = 4, n = 20\nS = 10(2 + 77) = 790  ->  recheck: last term 4(20) - 3 = 77,\nfirst term 1; S = (20/2)(1 + 77) = 780, agreement</code></pre>
<p><strong>Worked example 2 (geometric sum).</strong> Evaluate the sum from k = 1 to 8 of 3(2)^(k−1).</p>
<pre><code>a = 3, r = 2, n = 8\nS = 3(2^8 - 1)/(2 - 1) = 3(255) = 765</code></pre>

<h3>Applied models</h3>
<p><strong>Worked example (savings with interest).</strong> 500 pounds is invested at the start of each year at 5% annual interest. Find the value after 10 years.</p>
<pre><code>the first deposit earns 10 years, the last earns 1 year\nvalue = 500(1.05^10 + 1.05^9 + ... + 1.05)\ngeometric: a = 500(1.05), r = 1.05, n = 10\nS = 525(1.05^10 - 1)/(0.05) = 525 x 12.578 = 6603 pounds</code></pre>
<p><strong>Worked example 2 (depreciation).</strong> A machine worth 20000 pounds depreciates 12% per year. When is it worth less than 5000?</p>
<pre><code>20000(0.88)^n < 5000  ->  0.88^n < 0.25\nn ln 0.88 < ln 0.25  ->  n > 1.386/0.1278 = 10.8\nso after 11 years</code></pre>
<p><strong>Worked example 3 (bouncing ball).</strong> A ball is dropped from 3 m and rebounds to 70% of its previous height. Find the total distance travelled before it stops.</p>
<pre><code>down 3, then up and down 3(0.7), 3(0.7)^2, ...\ntotal = 3 + 2[3(0.7) + 3(0.7)^2 + ...]\n= 3 + 2[3(0.7)/(1 - 0.7)] = 3 + 2(7) = 17 m</code></pre>
<p>The doubling of the rebound terms is the standard trap: each bounce is travelled twice, up and down, except the initial drop. Sketching the first two bounces on a height axis makes the pattern obvious before any algebra is attempted.</p>

<h3>Deriving the sum formulas</h3>
<p>Both sum formulas are reconstructable in a few lines, which is worth more than memorising them: a candidate who can derive them never panics in an exam.</p>
<pre><code>arithmetic: S = a + (a + d) + ... + [a + (n - 1)d]
write it backwards and add: 2S = n[2a + (n - 1)d]

geometric: S = a + ar + ... + ar^(n-1); multiply by r and subtract
S(1 - r) = a(1 - r^n)  ->  S = a(1 - r^n)/(1 - r)</code></pre>
<p><strong>Worked example.</strong> Use the derivation to find S_12 for 4 + 10 + 16 + ...</p>
<pre><code>a = 4, d = 6, n = 12
S = (12/2)[2(4) + 11(6)] = 6(74) = 444</code></pre>
<p>Letting n grow in the geometric formula sends rⁿ → 0 when |r| &lt; 1, leaving a/(1 − r): convergence falls out of the derivation rather than being a separate fact.</p>

<h3>When is an arithmetic sum greatest?</h3>
<p>If the common difference is negative, the terms eventually become negative and the running total peaks. Finding that peak is a standard A2 question.</p>
<pre><code>terms stop increasing when a + (n - 1)d first becomes negative
sum is greatest just before the terms turn negative</code></pre>
<p><strong>Worked example.</strong> Find the greatest value of the sum of 50 + 47 + 44 + ...</p>
<pre><code>d = -3; terms positive while 50 - 3(n - 1) > 0  ->  n < 17.67
so keep 17 terms (last term 50 - 48 = 2)
S_17 = (17/2)(50 + 2) = 442</code></pre>
<p>The 18th term is −1, so including it lowers the total: the maximum is at 17 terms. State the reason, not just the number.</p>

<h3>Finding the number of terms</h3>
<p>Many questions give the first and last terms and ask how many there are. Solve the nth-term formula for n rather than counting.</p>
<p><strong>Worked example.</strong> How many terms are in 7, 11, 15, ..., 143?</p>
<pre><code>143 = 7 + (n - 1)4  ->  136 = 4(n - 1)  ->  n = 35</code></pre>
<p><strong>Worked example 2 (geometric).</strong> How many terms of 2, 6, 18, ... are less than 5000?</p>
<pre><code>2(3)^(n-1) < 5000  ->  3^(n-1) < 2500
(n - 1) ln 3 < ln 2500  ->  n - 1 < 7.13  ->  n <= 8</code></pre>
<p>For geometric sequences the log step is compulsory; for arithmetic ones simple rearrangement suffices. Round down for "less than" and up for "at least", and state the counting either way.</p>

<h3>Three consecutive terms and the arithmetic mean</h3>
<p>Many sequence questions give three consecutive terms involving an unknown and ask for the value that makes the sequence arithmetic or geometric. The condition is the definition, written as an equation.</p>
<pre><code>arithmetic: middle = (first + third)/2
after canceling: the two consecutive differences are equal
geometric: middle^2 = first x third
after canceling: the two consecutive ratios are equal</code></pre>
<p><strong>Worked example.</strong> Find x so that x, x + 3 and 2x + 1 are consecutive terms of an arithmetic sequence.</p>
<pre><code>(x + 3) - x = (2x + 1) - (x + 3)
3 = x - 2  ->  x = 5
terms: 5, 8, 11 (difference 3) - check passes</code></pre>
<p><strong>Worked example 2 (geometric).</strong> Find x so that 4, x, 9 are consecutive geometric terms.</p>
<pre><code>x^2 = 36  ->  x = 6 or x = -6
both work; the sign changes whether the ratio is positive or negative</code></pre>
<p>The geometric condition gives a square, so both signs survive unless context rules one out. That is exactly why the question usually adds a condition such as "all terms positive".</p>

<h3>Formula summary</h3>
<pre><code>arithmetic: u_n = a + (n-1)d;  S_n = (n/2)[2a + (n-1)d]
geometric:  u_n = a r^(n-1);   S_n = a(1 - r^n)/(1 - r)
S_inf = a/(1 - r), |r| < 1
recurrence limit: L = b/(1 - a), |a| < 1</code></pre>
<p>In applied questions the model choice decides everything: additive change is arithmetic, proportional change is geometric. Read the wording — "increases by 200 each year" versus "increases by 4% each year" — before writing a single formula, and check the first term corresponds to the first period rather than the starting quantity.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(S∞)</strong> Find S∞ of 5 + 2 + 0.8 + ... <em>Answer:</em> r = 0.4; 5/0.6 = 8⅓.</li>
<li><strong>(Convergence)</strong> For what x does 2 + 6x + 18x² + ... converge? <em>Answer:</em> |3x| &lt; 1 → |x| &lt; ⅓.</li>
<li><strong>(Recurring decimal)</strong> Write 0.4545... as a fraction. <em>Answer:</em> 45/99 = 5/11.</li>
<li><strong>(Recurrence)</strong> u_(n+1) = 0.2u_n + 8, find the limit. <em>Answer:</em> 8/0.8 = 10.</li>
<li><strong>(Sigma)</strong> Evaluate Σ from 1 to 10 of 5. <em>Answer:</em> 50.</li>
<li><strong>(Sigma arithmetic)</strong> Evaluate Σ from 1 to 15 of (2k + 1). <em>Answer:</em> 2(120) + 15 = 255.</li>
<li><strong>(Depreciation)</strong> 8000 pounds loses 10% annually. Value after 6 years? <em>Answer:</em> 8000(0.9)⁶ = 4252 pounds.</li>
<li><strong>(Unknown n)</strong> The sum of 3 + 6 + 12 + ... exceeds 1000 first at which term? <em>Answer:</em> S_n = 3(2ⁿ − 1) &gt; 1000 → 2ⁿ &gt; 334.3 → n = 9.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Using S∞ without checking |r| &lt; 1:</strong> a divergent series has no finite sum; saying so earns the mark.</li>
<li><strong>Off-by-one in applied models:</strong> count how many periods each payment earns; the first deposit earns one more year than the last.</li>
<li><strong>Rebound counted once:</strong> every bounce after the first contributes twice to the distance.</li>
<li><strong>Recurrence limit without the convergence condition:</strong> L = b/(1 − a) is only the limit when |a| &lt; 1.</li>
<li><strong>Mixing the models:</strong> growth uses (1 + r), decay and depreciation use (1 − r); inverting them changes the answer entirely.</li>
<li><strong>Logs with a negative base factor:</strong> take ln of a positive quantity only; 0.88ⁿ is fine, (−0.88)ⁿ is not.</li>
<li><strong>n must be a positive integer:</strong> inequality solutions are rounded up for "after how many years" questions.</li>
<li><strong>Exact versus approximate:</strong> keep fractions and powers until the final money value, then round to the nearest penny or pound as asked.</li>
</ul>
`,
  },
};
