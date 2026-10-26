// Mathematics AS notes, deepened to the depth bar — batch E:
// The Normal Distribution (5.5), Statistics (S1) as a unit overview with
// correlation and regression, and Mechanics (M1) as a unit overview.
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-as-e-depth.cjs > .freebuff-tmp/math-as-e.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-as-e.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-as-e.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "58ecfd82-cac6-4371-8ec0-1f303808c592": "AS Level Mathematics: The Normal Distribution",
    "5ad98814-ed87-4998-9623-110870576cd3": "AS Level Mathematics: Statistics S1 — Correlation and Regression",
    "cb996b1e-2ddd-4e29-87e4-a19c3f0a97db": "AS Level Mathematics: Mechanics M1 — Kinematics, Dynamics and Statics",
  },
  rows: {
    "58ecfd82-cac6-4371-8ec0-1f303808c592": `
<h2>AS Level Mathematics: The Normal Distribution</h2>
<p>Many measurements cluster symmetrically about a mean: heights, reaction times, measurement errors, the fill of a production line. The normal distribution is the mathematical shape of that clustering — a symmetric bell curve defined entirely by its mean and standard deviation. This note builds the topic from zero: the shape and its properties, standardising to the standard normal, reading probabilities from tables, working backwards from a probability to an unknown mean or standard deviation, and combining normal variables.</p>

<h3>Properties of the normal distribution</h3>
<pre><code>X ~ N(mu, sigma^2)   (mean mu, variance sigma^2)\n\nsymmetric about the mean: P(X < mu) = P(X > mu) = 0.5\ntotal area under the curve = 1\ninflection points at mu +/- sigma\nabout 68 per cent within 1 sd, 95 per cent within 2, 99.7 within 3</code></pre>
<p>The notation takes the <em>variance</em>, not the standard deviation: N(10, 4) means mean 10 and standard deviation 2. Writing N(10, 4) while treating 4 as the standard deviation is the single commonest error in the topic.</p>
<p><strong>Worked example.</strong> X ~ N(20, 9). State the mean and standard deviation and find P(X &lt; 20).</p>
<pre><code>mu = 20, sigma = 3\nP(X < 20) = 0.5 by symmetry</code></pre>

<h3>Standardising</h3>
<pre><code>z = (x - mu)/sigma\n\nZ ~ N(0, 1), the standard normal, tabulated in most formula booklets\nP(X < x) = P(Z < z) = Phi(z)</code></pre>
<p>Standardising answers "how many standard deviations above the mean is this value?" Every normal probability question reduces to that one number.</p>
<p><strong>Worked example.</strong> X ~ N(50, 16). Find P(X &lt; 58).</p>
<pre><code>sigma = 4;  z = (58 - 50)/4 = 2\nP(Z < 2) = 0.9772</code></pre>
<p><strong>Worked example 2 (above).</strong> For the same X, find P(X &gt; 45).</p>
<pre><code>z = (45 - 50)/4 = -1.25\nP(Z > -1.25) = P(Z < 1.25) = 0.8944</code></pre>

<h3>Between two values</h3>
<pre><code>P(a < X < b) = Phi(z_b) - Phi(z_a)\n\nbelow a value, subtract from 1\nbetween two values, subtract the smaller cumulative from the larger</code></pre>
<p><strong>Worked example.</strong> X ~ N(100, 225). Find P(85 &lt; X &lt; 115).</p>
<pre><code>sigma = 15\nz1 = (85 - 100)/15 = -1;  z2 = (115 - 100)/15 = 1\nP = Phi(1) - Phi(-1) = 0.8413 - 0.1587 = 0.6826</code></pre>
<p><strong>Worked example 2 (both tails).</strong> X ~ N(30, 25). Find P(X &lt; 25 or X &gt; 38).</p>
<pre><code>sigma = 5\nz1 = -1  ->  Phi = 0.1587\nz2 = 1.6  ->  Phi = 0.9452, so upper tail = 0.0548\ntotal = 0.2135</code></pre>

<h3>Working backwards: finding x from a probability</h3>
<pre><code>given P(X < x) = p, find z from the inverse table, then\nx = mu + z sigma</code></pre>
<p><strong>Worked example.</strong> X ~ N(40, 64). Find the value exceeded by 10 per cent of the distribution.</p>
<pre><code>P(X > x) = 0.10  ->  P(X < x) = 0.90  ->  z = 1.2816\nx = 40 + 1.2816(8) = 50.25</code></pre>
<p><strong>Worked example 2 (middle 80 per cent).</strong> X ~ N(50, 100). Find the range containing the middle 80 per cent.</p>
<pre><code>tails of 10 per cent each: z = +/-1.2816\nx = 50 +/- 1.2816(10)  ->  37.2 to 62.8</code></pre>

<h3>Finding the mean or standard deviation</h3>
<p>When mu or sigma is unknown, each probability statement gives an equation in z, and two statements give simultaneous equations.</p>
<p><strong>Worked example 1 (find sigma).</strong> X ~ N(20, sigma²) and P(X &gt; 26) = 0.05. Find sigma.</p>
<pre><code>P(X < 26) = 0.95  ->  z = 1.6449\n(26 - 20)/sigma = 1.6449  ->  sigma = 6/1.6449 = 3.648</code></pre>
<p><strong>Worked example 2 (simultaneous).</strong> X ~ N(mu, sigma²) with P(X &lt; 10) = 0.20 and P(X &lt; 20) = 0.90. Find mu and sigma.</p>
<pre><code>z values: -0.8416 and 1.2816\n(mu - 0.8416 sigma) = 10\n(mu + 1.2816 sigma) = 20\nsubtract: 2.1232 sigma = 10  ->  sigma = 4.71\nmu = 10 + 0.8416(4.71) = 13.96</code></pre>
<p>The signs matter: a value below the mean has a negative z, so 10 = mu − 0.8416 sigma. Setting both equations up with the same sign convention is what makes the simultaneous solve work.</p>

<h3>Combining normal variables</h3>
<pre><code>if X ~ N(m1, s1^2) and Y ~ N(m2, s2^2) are independent:\nX + Y ~ N(m1 + m2, s1^2 + s2^2)\nX - Y ~ N(m1 - m2, s1^2 + s2^2)\naX + b ~ N(a m1 + b, a^2 s1^2)</code></pre>
<p>The variance of a difference adds, exactly as in the probability-distributions topic: independent uncertainties compound in either direction.</p>
<p><strong>Worked example.</strong> The masses of apples are N(120, 100) grams and of pears N(150, 144), independent. Find the probability that a random apple and pear together weigh more than 300 g.</p>
<pre><code>T = A + P ~ N(270, 244)\nsigma_T = 15.62\nz = (300 - 270)/15.62 = 1.921\nP(T > 300) = 1 - Phi(1.921) = 0.0274</code></pre>
<p><strong>Worked example 2 (difference).</strong> Two machines fill bottles: A ~ N(500, 25) ml, B ~ N(505, 36) ml, independent. Find P(A's fill exceeds B's).</p>
<pre><code>D = A - B ~ N(-5, 61);  sigma = 7.81\nP(D > 0):  z = (0 + 5)/7.81 = 0.640\nP = 1 - 0.7389 = 0.261</code></pre>

<h3>Normal approximations and modelling assumptions</h3>
<p>The normal model is used for continuous measurements that arise from many small independent influences. Before applying it, check the assumptions: the variable is continuous (or discrete with enough values to ignore the gaps), the distribution is roughly symmetric, and the mean and standard deviation are known or estimable.</p>
<p><strong>Worked example (quality control).</strong> A machine produces rods of mean 25.0 mm and standard deviation 0.2 mm. Rods outside 24.7–25.3 mm are scrapped. Find the proportion scrapped.</p>
<pre><code>z1 = (24.7 - 25.0)/0.2 = -1.5  ->  0.0668\nz2 = (25.3 - 25.0)/0.2 = 1.5   ->  upper tail 0.0668\ntotal scrapped = 0.1336, about 13.4 per cent</code></pre>
<p>Interpretation matters: state the proportion and, where asked, the expected number in a batch — 13.4 per cent of 1000 rods is about 134 rods.</p>

<h3>Reading the table and using symmetry</h3>
<p>The standard normal table gives Phi(z) = P(Z &lt; z) only for positive z. Two symmetries cover every other case:</p>
<pre><code>Phi(-z) = 1 - Phi(z)
P(Z > z) = 1 - Phi(z)
P(-z < Z < z) = 2 Phi(z) - 1</code></pre>
<p><strong>Worked example.</strong> Find P(-1.5 &lt; Z &lt; 0.5).</p>
<pre><code>Phi(0.5) = 0.6915;  Phi(-1.5) = 1 - 0.9332 = 0.0668
P = 0.6915 - 0.0668 = 0.6247</code></pre>
<p><strong>Worked example 2 (inverse with symmetry).</strong> Find z such that P(Z &gt; z) = 0.75.</p>
<pre><code>Phi(z) = 0.25, so z is negative
z = -0.6745  (the value with Phi = 0.6745 is 0.6745)
check: P(Z > -0.6745) = 1 - 0.25 = 0.75</code></pre>
<p>A rough sketch of the bell with the required region shaded prevents sign errors; the area asked for must match the area you extract from the table.</p>

<h3>Normal approximation to the binomial</h3>
<p>For a large number of trials the binomial distribution becomes bell-shaped and can be approximated by a normal with the same mean and variance, with a continuity correction because the binomial is discrete.</p>
<pre><code>X ~ B(n, p):  mu = np,  sigma^2 = np(1 - p)
use the normal when np > 5 and n(1 - p) > 5
continuity correction: X >= k becomes X > k - 0.5
                        X <= k becomes X < k + 0.5</code></pre>
<p><strong>Worked example.</strong> X ~ B(100, 0.3). Estimate P(X ≥ 35).</p>
<pre><code>mu = 30, sigma^2 = 21, sigma = 4.583
with continuity: P(X > 34.5)
z = (34.5 - 30)/4.583 = 0.982
P = 1 - 0.8370 = 0.163</code></pre>
<p>Without the 0.5 shift the estimate is noticeably worse, and the correction is explicitly credited in mark schemes. State both the approximation and the correction.</p>

<h3>Is the normal model appropriate?</h3>
<p>Before using the bell curve, check four things: the variable is continuous (or a discrete variable with many values); the distribution is roughly symmetric with a single peak; the mean and standard deviation are known or estimated from a large sample; and the values extend, in principle, in both directions. Heights and measurement errors satisfy these; incomes and waiting times do not, because they are skewed.</p>
<p><strong>Worked example.</strong> A shop's daily sales figures have a mean of 400 pounds and an sd of 250 pounds, and the normal model gives P(sales &lt; 0) = 0.055. Is the model appropriate?</p>
<pre><code>the calculation implies a 5.5 per cent chance of negative sales,
which is impossible, so the normal model is a poor fit here
sales are right-skewed with a floor at zero; a model with a lower
bound, or a transformation, would be more honest</code></pre>
<p>Recognising when a model fails is examinable: the arithmetic can be flawless and the modelling still wrong, and the marks for that judgement are separate.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Notation)</strong> X ~ N(12, 25). State the sd. <em>Answer:</em> 5.</li>
<li><strong>(Standardise)</strong> X ~ N(12, 25): find P(X &lt; 17). <em>Answer:</em> z = 1; 0.8413.</li>
<li><strong>(Above)</strong> X ~ N(12, 25): find P(X &gt; 9). <em>Answer:</em> z = −0.6; 0.7257.</li>
<li><strong>(Between)</strong> X ~ N(12, 25): find P(10 &lt; X &lt; 15). <em>Answer:</em> z = −0.4 and 0.6; 0.7257 − 0.3446 = 0.3811.</li>
<li><strong>(Inverse)</strong> X ~ N(12, 25): find the 90th percentile. <em>Answer:</em> z = 1.2816; x = 18.4.</li>
<li><strong>(Unknown sigma)</strong> X ~ N(50, s²), P(X &gt; 60) = 0.10. Find s. <em>Answer:</em> z = 1.2816; s = 10/1.2816 = 7.80.</li>
<li><strong>(Combination)</strong> X ~ N(10, 4), Y ~ N(15, 9), independent. Find P(X + Y &lt; 30). <em>Answer:</em> sum ~ N(25, 13), sd 3.606, z = 1.387, P = 0.917.</li>
<li><strong>(Difference)</strong> Same X, Y: find P(Y − X &gt; 10). <em>Answer:</em> D ~ N(5, 13), z = (10 − 5)/3.606 = 1.387; P = 0.083.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Variance mistaken for sd:</strong> N(mu, sigma²) — square-root the second parameter before standardising.</li>
<li><strong>Forgetting the tails:</strong> P(X &gt; x) = 1 − Phi(z); the table gives "less than".</li>
<li><strong>Wrong z sign:</strong> values below the mean have negative z; symmetrise using Phi(−z) = 1 − Phi(z).</li>
<li><strong>Subtracting variances of a difference:</strong> Var(X − Y) = Var(X) + Var(Y) when independent.</li>
<li><strong>Not stating independence:</strong> combinations need it; without the assumption the variance rule does not hold.</li>
<li><strong>Continuity:</strong> for a discrete variable approximated by the normal, use a continuity correction (P(X ≥ 5) becomes P(X &gt; 4.5)) — required in A2, and stating it early avoids the habit.</li>
<li><strong>Rounding z:</strong> use four decimal places from tables or the full calculator value; rounding z to 2 d.p. shifts the probability noticeably.</li>
<li><strong>Answer without context:</strong> convert the probability into a proportion, a number of items or a percentage, as the question asks.</li>
</ul>
`,
    "5ad98814-ed87-4998-9623-110870576cd3": `
<h2>AS Level Mathematics: Statistics S1 — Correlation and Regression</h2>
<p>Statistics S1 turns data into claims about relationships. Two variables measured together can be displayed on a scatter diagram; the strength of any straight-line relationship is measured by the product-moment correlation coefficient; and the line of best fit — the regression line — predicts one variable from the other. This note builds the unit from zero: bivariate data and scatter diagrams, the correlation coefficient with its calculation and interpretation, regression lines and their equations, and the assumptions that make prediction honest.</p>

<h3>Bivariate data and scatter diagrams</h3>
<pre><code>each observation gives a pair (x, y)\nplot y against x; look for direction, strength and shape</code></pre>
<table border="1" cellpadding="6">
<tr><th>Pattern</th><th>Meaning</th></tr>
<tr><td>Points rise left to right</td><td>Positive correlation</td></tr>
<tr><td>Points fall left to right</td><td>Negative correlation</td></tr>
<tr><td>No pattern</td><td>Little or no linear correlation</td></tr>
<tr><td>Curved pattern</td><td>A relationship, but not linear</td></tr>
</table>
<p>An outlier is a point far from the pattern. It can dominate both the correlation coefficient and the regression line, so it should be identified and its effect discussed, not silently deleted.</p>

<h3>The product-moment correlation coefficient</h3>
<pre><code>r = Sxy / sqrt(Sxx Syy)\n\nSxx = sum x^2 - (sum x)^2/n\nSyy = sum y^2 - (sum y)^2/n\nSxy = sum xy - (sum x)(sum y)/n\n\n-1 <= r <= 1</code></pre>
<p><strong>Worked example (full calculation).</strong> Five pairs give sum x = 20, sum y = 30, sum x² = 90, sum y² = 220, sum xy = 140, n = 5. Find r.</p>
<pre><code>Sxx = 90 - 400/5 = 10\nSyy = 220 - 900/5 = 40\nSxy = 140 - 600/5 = 20\nr = 20/sqrt(10 x 40) = 20/20 = 1.0  (perfect positive)</code></pre>
<p><strong>Worked example 2.</strong> With sum x = 15, sum y = 24, sum x² = 55, sum y² = 130, sum xy = 60, n = 5.</p>
<pre><code>Sxx = 55 - 45 = 10;  Syy = 130 - 115.2 = 14.8\nSxy = 60 - 72 = -12\nr = -12/sqrt(148) = -12/12.166 = -0.986</code></pre>
<p>Interpretation is a required sentence, not a number: r = 0.986 means a strong positive linear relationship; r = 0.2 means a weak positive one. Also state that r measures only linear association — a strong curve can give r near zero.</p>

<h3>The regression line</h3>
<pre><code>y on x:  y = a + bx  with b = Sxy/Sxx and a = ybar - b xbar\n\nx on y (the other regression): x = c + dy with d = Sxy/Syy</code></pre>
<p>There are two regression lines because minimising vertical distances is not the same as minimising horizontal distances. The line of y on x is the one used to predict y from x, and its gradient is always steeper (for |r| &lt; 1) than the x-on-y line.</p>
<p><strong>Worked example.</strong> Using the second data set above, find the regression line of y on x.</p>
<pre><code>xbar = 3, ybar = 4.8\nb = -12/10 = -1.2\na = 4.8 - (-1.2)(3) = 8.4\ny = 8.4 - 1.2x</code></pre>
<p><strong>Worked example 2 (prediction).</strong> Use that line to predict y when x = 4, and comment on a prediction at x = 20.</p>
<pre><code>at x = 4: y = 8.4 - 4.8 = 3.6\nat x = 20: y = 8.4 - 24 = -15.6, and 20 lies far outside the data\nrange (1 to 5), so this is extrapolation and unreliable</code></pre>
<p>Interpolation is prediction inside the observed range; extrapolation is outside it. Extrapolation assumes the straight-line pattern continues, which the data cannot support — say so.</p>

<h3>Interpreting the gradient and intercept</h3>
<p>In context, b is the change in y per unit increase in x, and a is the predicted y when x = 0 (often meaningless: no one weighs 0 kg at 0 cm).</p>
<p><strong>Worked example.</strong> A regression of exam mark (y) on hours studied (x) gives y = 30 + 5x. Interpret.</p>
<pre><code>each extra hour of study is associated with 5 more marks\n(b is an association, not proof of causation)\nthe intercept 30 is the predicted mark with no study, but x = 0\nmay lie outside the data range, so treat it cautiously</code></pre>

<h3>Correlation, causation and reliability</h3>
<p>A strong correlation never establishes causation. Two variables can move together because a third drives both (ice-cream sales and drowning both rise with temperature), or by coincidence in a small sample.</p>
<pre><code>r measures linear association only\nr is unaffected by changing units or swapping x and y\nr is sensitive to outliers\nr = 0 does not mean no relationship: a symmetric curve can give r = 0</code></pre>
<p><strong>Worked example.</strong> A study finds r = 0.85 between shoe size and reading age in children. Explain why this does not mean bigger feet cause better reading.</p>
<pre><code>both increase with age; age is a lurking variable\nthe correlation is real but confounded, so a causal claim needs a\ncontrolled comparison at a fixed age</code></pre>

<h3>Choosing the right summary</h3>
<p>S1 questions ask you to select and justify the statistic. The decision table is worth memorising:</p>
<table border="1" cellpadding="6">
<tr><th>Situation</th><th>Best choice</th><th>Reason</th></tr>
<tr><td>Outliers present</td><td>Median, IQR</td><td>Robust to extremes</td></tr>
<tr><td>All values should count</td><td>Mean, sd</td><td>Uses every observation</td></tr>
<tr><td>Two variables, linear pattern</td><td>r and the regression line</td><td>Measures strength and predicts</td></tr>
<tr><td>Curved pattern</td><td>Transform, or do not use r</td><td>r assumes linearity</td></tr>
</table>
<p><strong>Worked example.</strong> A data set of salaries has one director earning ten times the rest. Which average and spread should summarise it, and why?</p>
<pre><code>median and IQR: the director's salary drags the mean upward and\ninflates the sd, so neither represents a typical employee</code></pre>

<h3>Where the least-squares coefficients come from</h3>
<p>The regression line is chosen to minimise the sum of squared vertical distances from the points. That criterion produces the formulas already quoted, and knowing why makes them far easier to recall.</p>
<pre><code>minimise sum (y - a - bx)^2 over a and b
differentiate with respect to a: -2 sum (y - a - bx) = 0
  ->  ybar = a + b xbar   (the line passes through the mean point)
differentiate with respect to b: -2 sum x(y - a - bx) = 0
  ->  Sxy = b Sxx  ->  b = Sxy/Sxx</code></pre>
<p>Two consequences worth stating in an exam: the line always passes through (x̄, ȳ), and if Sxy is zero the gradient is zero — no linear trend, so r = 0 and prediction by the line is useless.</p>
<p><strong>Worked example.</strong> Show that the line passes through the mean point for y = 8.4 − 1.2x with x̄ = 3.</p>
<pre><code>y at x = 3: 8.4 - 3.6 = 4.8 = ybar, as the derivation requires</code></pre>

<h3>Answering S1 questions the way mark schemes reward</h3>
<p>The statistics marks are split between calculation and commentary, and the commentary is where candidates lose most. Four habits cover almost every question:</p>
<ul>
<li>State the statistic with its units and three significant figures.</li>
<li>Interpret in context, naming the variables rather than x and y.</li>
<li>Qualify every causal claim as an association.</li>
<li>For a prediction, say whether it is interpolation or extrapolation.</li>
</ul>
<p><strong>Worked example.</strong> A regression of height y (cm) on age x (years) for 8- to 12-year-olds gives y = 90 + 6x, r = 0.96. Write a full interpretation.</p>
<pre><code>strong positive linear correlation (r = 0.96) between age and height
in this sample; on average each additional year of age is associated
with 6 cm more height; the line explains the data well within the
8-12 range, and a prediction at age 20 would be extrapolation and
unreliable because growth does not continue linearly</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(r meaning)</strong> r = −0.9. Interpret. <em>Answer:</em> strong negative linear correlation; as x increases y tends to decrease.</li>
<li><strong>(r range)</strong> Can r = 1.2? <em>Answer:</em> no; r lies between −1 and 1.</li>
<li><strong>(Calculation)</strong> Sxx = 20, Syy = 45, Sxy = 27. Find r. <em>Answer:</em> r = 27/√900 = 0.9.</li>
<li><strong>(Gradient)</strong> Sxy = 27, Sxx = 20. Find b. <em>Answer:</em> 1.35.</li>
<li><strong>(Intercept)</strong> b = 1.35, x̄ = 5, ȳ = 10. Find a. <em>Answer:</em> a = 10 − 6.75 = 3.25.</li>
<li><strong>(Prediction)</strong> y = 3.25 + 1.35x. Predict y at x = 8. <em>Answer:</em> 14.05.</li>
<li><strong>(Extrapolation)</strong> Data covers x = 1 to 10. Is a prediction at x = 50 reliable? <em>Answer:</em> no; extrapolation beyond the data range.</li>
<li><strong>(Causation)</strong> r = 0.95 between umbrella sales and rainfall. Does buying umbrellas cause rain? <em>Answer:</em> no; rainfall drives sales, so the correlation is not causal in that direction.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Using the wrong regression line:</strong> predict y from x with the y-on-x line, not the x-on-y line.</li>
<li><strong>Confusing b and r:</strong> the gradient is a rate of change; r is a unitless strength between −1 and 1.</li>
<li><strong>Claiming causation:</strong> always qualify — "associated with" rather than "causes".</li>
<li><strong>Ignoring the outlier:</strong> one extreme point can lift or destroy r; comment on its effect.</li>
<li><strong>Extrapolating silently:</strong> state when a prediction lies outside the data range and that it is unreliable.</li>
<li><strong>Rounding r:</strong> quote three significant figures and keep full accuracy in Sxy, Sxx, Syy.</li>
<li><strong>Swapping Sxy and Syy:</strong> the y-on-x gradient divides by Sxx; the x-on-y gradient divides by Syy.</li>
<li><strong>Forgetting units in interpretation:</strong> "5 more marks per hour" reads as a real claim; "y increases by 5" does not.</li>
</ul>

<h3>Formula summary</h3>
<pre><code>Sxx = sum x^2 - (sum x)^2/n;  Syy = sum y^2 - (sum y)^2/n
Sxy = sum xy - (sum x)(sum y)/n
r = Sxy/sqrt(Sxx Syy)
y on x: b = Sxy/Sxx,  a = ybar - b xbar</code></pre>
<p>Compute Sxx, Syy and Sxy first and keep them to four significant figures; every later statistic is a combination of those three, so an early rounding error propagates into r, the gradient and the prediction alike.</p>
`,
    "cb996b1e-2ddd-4e29-87e4-a19c3f0a97db": `
<h2>AS Level Mathematics: Mechanics M1 — Kinematics, Dynamics and Statics</h2>
<p>Mechanics describes motion and the forces causing it. M1 covers three linked strands: kinematics (describing motion with graphs and the constant-acceleration equations), dynamics (Newton's second law applied to single particles and connected bodies), and statics (equilibrium of a particle and moments of forces). This note builds each from zero, with the modelling assumptions stated, the sign conventions fixed, and worked examples written out line by line — because in mechanics the marks are in the diagram and the equation, not the answer.</p>

<h3>Modelling assumptions and units</h3>
<pre><code>standard assumptions unless told otherwise:\n  the object is a particle (no size, no rotation)\n  air resistance is negligible\n  the string is light and inextensible; the pulley is smooth\n  g = 9.8 m s^-2 (use 9.81 if the question says so)</code></pre>
<p>State the assumption when you use it: "modelling the stone as a particle, so air resistance is ignored". Marks are awarded for identifying what the model simplifies.</p>

<h3>Kinematics: the constant-acceleration equations</h3>
<pre><code>v = u + at\ns = ut + (1/2) a t^2\nv^2 = u^2 + 2as\ns = ((u + v)/2) t\n\nu initial velocity, v final velocity, a acceleration,\ns displacement, t time</code></pre>
<p>The equations hold only for constant acceleration. Choose the equation by listing what you know and what you want: exactly one equation omits the quantity you neither know nor need.</p>
<p><strong>Worked example 1.</strong> A car accelerates uniformly from 8 m/s to 20 m/s in 6 s. Find the acceleration and the distance.</p>
<pre><code>a = (v - u)/t = (20 - 8)/6 = 2 m/s^2\ns = ((u + v)/2)t = 14 x 6 = 84 m</code></pre>
<p><strong>Worked example 2 (falling).</strong> A stone is dropped from rest from a cliff and takes 3 s to land. Find the height, taking g = 9.8.</p>
<pre><code>u = 0, a = 9.8 (downward positive), t = 3\ns = 0 + (1/2)(9.8)(9) = 44.1 m</code></pre>
<p><strong>Worked example 3 (upward).</strong> A ball is thrown vertically upwards at 15 m/s. Find the maximum height and the total time in the air.</p>
<pre><code>at the top v = 0: 0 = 225 - 2(9.8)s  ->  s = 11.48 m\ntime up: 0 = 15 - 9.8t  ->  t = 1.53 s\ntotal time = 3.06 s (symmetric flight)</code></pre>
<p>Fix the positive direction before substituting. Upward-positive makes g = −9.8; the alternative is consistent arithmetic but must not be mixed mid-question.</p>

<h3>Velocity-time and displacement-time graphs</h3>
<pre><code>displacement-time: gradient = velocity\nvelocity-time: gradient = acceleration; area = displacement\nspeed-time: area = distance</code></pre>
<p><strong>Worked example.</strong> A cyclist accelerates from rest to 12 m/s in 5 s, travels at 12 m/s for 10 s, then decelerates to rest in 4 s. Find the total distance.</p>
<pre><code>area 1: (1/2)(5)(12) = 30\narea 2: 12 x 10 = 120\narea 3: (1/2)(4)(12) = 24\ntotal = 174 m</code></pre>
<p>Area below the time axis is negative displacement: the particle has reversed direction, and distance sums the magnitudes.</p>

<h3>Newton's second law and forces</h3>
<pre><code>resultant force F = m a\nweight W = m g\nfriction opposes motion: F <= mu R (limiting case F = mu R)\nnormal reaction R acts perpendicular to the surface</code></pre>
<p><strong>Worked example 1 (horizontal).</strong> A 5 kg box is pushed with 30 N along a rough floor with friction 8 N. Find the acceleration.</p>
<pre><code>resultant = 30 - 8 = 22 N\na = 22/5 = 4.4 m/s^2</code></pre>
<p><strong>Worked example 2 (on a slope).</strong> A 4 kg particle slides down a smooth slope inclined at 30°. Find its acceleration.</p>
<pre><code>component of weight along the slope = 4g sin 30 = 19.6 N\na = 19.6/4 = 4.9 m/s^2  (= g sin 30)</code></pre>
<p><strong>Worked example 3 (with friction on a slope).</strong> Same slope, friction 6 N.</p>
<pre><code>resultant = 19.6 - 6 = 13.6 N\na = 3.4 m/s^2</code></pre>

<h3>Connected particles</h3>
<p>Two bodies joined by a string have the same magnitude of acceleration (the string is inextensible) and the same tension throughout (the string is light and the pulley smooth). Write one equation per body and add them to eliminate T.</p>
<p><strong>Worked example (pulley).</strong> Masses 5 kg and 3 kg hang either side of a smooth pulley. Find the acceleration and the tension.</p>
<pre><code>for 5 kg (downward positive): 5g - T = 5a\nfor 3 kg (upward positive):   T - 3g = 3a\nadd: 2g = 8a  ->  a = 2.45 m/s^2\nT = 3(g + a) = 3(9.8 + 2.45) = 36.75 N</code></pre>
<p><strong>Worked example 2 (on a table).</strong> A 4 kg block on a smooth table is connected over a pulley to a 2 kg hanging mass. Find the acceleration.</p>
<pre><code>hanging mass: 2g - T = 2a\nblock: T = 4a\nadd: 2g = 6a  ->  a = 3.27 m/s^2</code></pre>
<p><strong>Worked example 3 (lift).</strong> A 60 kg person stands in a lift accelerating upward at 2 m/s². Find the reaction force.</p>
<pre><code>R - 60g = 60(2)  ->  R = 60(11.8) = 708 N\nthe person feels heavier; in free fall R would be zero</code></pre>

<h3>Statics: equilibrium of a particle</h3>
<pre><code>equilibrium: the resultant force is zero\nresolve horizontally and vertically, or along and perpendicular to\na slope, and set each total to zero</code></pre>
<p><strong>Worked example.</strong> A 10 N weight hangs from two strings making 40° and 50° with the horizontal. Find the tensions.</p>
<pre><code>horizontal: T1 cos 40 = T2 cos 50\nvertical: T1 sin 40 + T2 sin 50 = 10\nfrom the first: T2 = T1 cos40/cos50 = 1.1918 T1\nT1(0.6428) + 1.1918 T1(0.7660) = 10\nT1(0.6428 + 0.9129) = 10  ->  T1 = 6.43 N, T2 = 7.66 N</code></pre>

<h3>Moments</h3>
<pre><code>moment = force x perpendicular distance from the pivot\nfor equilibrium of a rigid body: sum of clockwise moments = sum of\nanticlockwise moments</code></pre>
<p><strong>Worked example.</strong> A uniform plank 4 m long of weight 200 N rests on two supports 1 m from each end. A 300 N load is placed 0.5 m from the left end. Find the reactions.</p>
<pre><code>supports at 1 m and 3 m from the left; load at 0.5 m\nmoments about the left support:\n  load: 300 x 0.5 = 150 anticlockwise\n  weight: 200 x 1 = 200 clockwise (weight acts at the centre, 2 m)\n  right reaction R2 at 2 m: clockwise\n  150 = 200 + 2 R2  ->  R2 = -25 N, so the plank would tip\ncheck total: R1 + R2 = 500 needed; with R2 negative the support\ncannot hold, so the load must be moved inward - a tipping question\n</code></pre>
<p>Moments about a support is the standard trick: it eliminates that support's reaction, leaving one unknown. If the required reaction is negative, the body is not in equilibrium and tipping is the intended conclusion.</p>

<h3>Friction and limiting equilibrium</h3>
<p>Friction is a variable force: it takes whatever value is needed to prevent motion, up to a maximum. Only at the point of slipping does it reach its limiting value.</p>
<pre><code>F <= mu R  on a rough surface
limiting friction: F = mu R   (on the point of moving)
R is found by resolving perpendicular to the surface</code></pre>
<p><strong>Worked example 1 (horizontal, limiting).</strong> A 10 kg block rests on a rough horizontal floor with mu = 0.4. Find the smallest horizontal force needed to move it.</p>
<pre><code>R = 10g = 98 N
limiting friction = 0.4 x 98 = 39.2 N
so a force just above 39.2 N starts it moving</code></pre>
<p><strong>Worked example 2 (slope).</strong> A block sits on a rough slope inclined at 25° with mu = 0.5. Does it slide?</p>
<pre><code>component down the slope: mg sin 25 = 0.4226 mg
maximum friction: mu mg cos 25 = 0.5 x 0.9063 mg = 0.4531 mg
maximum friction exceeds the driving component, so it stays at rest
and friction takes the value 0.4226 mg</code></pre>
<p>The comparison is the answer: if mu &gt;= tan θ the particle remains in equilibrium on the slope, because the friction ceiling covers the driving component. That inequality is a standard exam demand.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(suvat)</strong> u = 4, a = 3, t = 5. Find s. <em>Answer:</em> 20 + 37.5 = 57.5 m.</li>
<li><strong>(suvat)</strong> u = 10, v = 30, s = 100. Find a. <em>Answer:</em> 900 = 100 + 200a → a = 4 m/s².</li>
<li><strong>(graph)</strong> A v–t graph rises 0 to 20 m/s in 4 s, then falls to 0 in 2 s. Distance? <em>Answer:</em> 40 + 20 = 60 m.</li>
<li><strong>(F = ma)</strong> 12 kg, resultant 36 N. Find a. <em>Answer:</em> 3 m/s².</li>
<li><strong>(slope)</strong> Smooth slope at 20°, mass 5 kg. Find a. <em>Answer:</em> g sin 20 = 3.35 m/s².</li>
<li><strong>(pulley)</strong> 6 kg and 4 kg over a smooth pulley. Find a. <em>Answer:</em> 2g = 10a → 1.96 m/s².</li>
<li><strong>(tension)</strong> For that pulley, find T. <em>Answer:</em> T = 4(9.8 + 1.96) = 47.0 N.</li>
<li><strong>(moments)</strong> A 2 m lever with a 50 N force at 1.5 m from the pivot balances a force F at 0.5 m. Find F. <em>Answer:</em> 50 × 1.5 = 0.5F → F = 150 N.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>No diagram:</strong> draw the forces before writing equations; nearly every mechanics error is a missing or misdirected force.</li>
<li><strong>Sign convention drift:</strong> fix positive direction once and keep it; a sign flip mid-question produces a wrong acceleration.</li>
<li><strong>Using suvat with varying acceleration:</strong> the equations need constant a; if a changes, split into stages or use a graph.</li>
<li><strong>Forgetting weight on a slope:</strong> the component along the slope is mg sin θ; the perpendicular component mg cos θ is balanced by the reaction on a smooth slope.</li>
<li><strong>Tension assumed equal to weight:</strong> in an accelerating system T ≠ mg; solve the equations.</li>
<li><strong>Adding instead of eliminating T:</strong> write one equation per body with consistent directions, then add to cancel T.</li>
<li><strong>Moments with the wrong distance:</strong> the perpendicular distance from the pivot, not the distance along the rod.</li>
<li><strong>Units and g:</strong> use the g the question gives; mixing 9.8 and 9.81 changes answers at the third figure.</li>
</ul>

<h3>Formula summary</h3>
<pre><code>v = u + at;  s = ut + at^2/2;  v^2 = u^2 + 2as;  s = (u + v)t/2
F = ma;  W = mg;  F = mu R at limiting friction
moment = force x perpendicular distance</code></pre>
<p>Every M1 calculation begins with a diagram showing the forces, the chosen positive direction and the known quantities. The formula is the last step; the model is the first.</p>
`,
  },
};
