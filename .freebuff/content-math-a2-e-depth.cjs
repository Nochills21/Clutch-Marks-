// Mathematics A2 notes, deepened to the depth bar — batch E:
// The Poisson Distribution (6.1), Continuous Random Variables (6.3),
// Hypothesis Testing (6.5), Permutations and Combinations (5.2),
// Sampling and Estimation (6.4).
module.exports = {
  titles: {
    "57eaee80-6b7e-424d-b649-06a608be6256": "A Level Mathematics: The Poisson Distribution",
    "e04cf551-2c45-4d65-b4b5-bd16e733c938": "A Level Mathematics: Continuous Random Variables",
    "124279ee-da25-472a-b5f2-53fdcaab4186": "A Level Mathematics: Hypothesis Testing",
    "a8ebc823-3b62-4380-be53-b636ae87d6b4": "A Level Mathematics: Permutations and Combinations",
    "dec61a69-ea89-4236-9ae4-64f25d54c51d": "A Level Mathematics: Sampling and Estimation",
  },
  rows: {
    "57eaee80-6b7e-424d-b649-06a608be6256": `
<h2>A Level Mathematics: The Poisson Distribution</h2>
<p>The Poisson distribution models the number of events that happen in a fixed interval of time, length, area or volume when those events occur randomly and independently at a constant average rate. Where the binomial counts successes in a fixed number of trials, the Poisson counts arrivals in a continuous window: calls reaching a switchboard in an hour, defects along a length of cable, radioactive decays in a minute. This note derives the formula from the binomial, sets out the two conditions that must hold, and then uses the distribution for the probability and hypothesis-test questions the exam sets.</p>

<h3>Where the formula comes from</h3>
<p>Imagine slicing the interval into a very large number of tiny sub-intervals. In each slice the chance of an event is tiny but the number of slices is enormous, so the count is binomial with n huge and p tiny. Taking that limit turns nCr p^r (1−p)^(n−r) into the Poisson formula, with the mean λ = np surviving as the only parameter.</p>
<pre><code>X ~ Po(lambda):  P(X = r) = e^(-lambda) lambda^r / r!
mean E(X) = lambda
variance Var(X) = lambda
so the mean and variance are equal - a diagnostic test for the model</code></pre>
<p>The equality of mean and variance is not a coincidence to memorise; it is the fingerprint of the limit, and it is why an exam question can give you a sample mean and variance and ask whether a Poisson model is plausible.</p>

<h3>The three conditions</h3>
<p>A Poisson model needs randomness, independence and a constant rate. Naming them is worth marks, and each failure has a characteristic symptom.</p>
<pre><code>1. events occur singly (not in pairs or batches)
2. events occur at random, independently of each other
3. the average rate lambda is constant over the interval
then the count in that interval is Poisson</code></pre>
<p><strong>Worked example (checking the model).</strong> A shop counts customers arriving per hour. Explain why a Poisson model may be unsuitable.</p>
<pre><code>the arrival rate is not constant: it peaks at lunchtime and is near zero at night
so condition 3 fails and the mean over a whole day is not a single rate
a better model splits the day into periods of roughly constant rate</code></pre>

<h3>Calculating probabilities</h3>
<p>The formula handles a single value; the cumulative sum handles a range. Because the Poisson has no upper limit, every "at least" question becomes a complement.</p>
<pre><code>P(X = r) = e^(-lambda) lambda^r / r!
P(X &lt;= r) sums from 0 to r (tables or calculator)
P(X &gt;= r) = 1 - P(X &lt;= r - 1)
P(X &lt; r)  = P(X &lt;= r - 1)</code></pre>
<p><strong>Worked example.</strong> X ~ Po(3). Find P(X = 2).</p>
<pre><code>P = e^(-3) x 3^2 / 2!
= 0.049787 x 9 / 2
= 0.2240</code></pre>
<p><strong>Worked example 2 (at least).</strong> For the same X, find P(X ≥ 4).</p>
<pre><code>P(X &gt;= 4) = 1 - P(X &lt;= 3)
P(X &lt;= 3) = 0.049787(1 + 3 + 4.5 + 4.5) = 0.6472
so P(X &gt;= 4) = 0.3528</code></pre>
<p><strong>Worked example 3 (scale change).</strong> Calls arrive at 4 per minute. Find the probability of 10 or more calls in two minutes.</p>
<pre><code>the rate scales with the interval: lambda = 8 for two minutes
P(X &gt;= 10) = 1 - P(X &lt;= 9) = 1 - 0.7170 = 0.2830</code></pre>
<p>Scaling is the most common source of avoidable error: the parameter must be expressed for the interval the question actually asks about.</p>

<h3>Adding independent Poisson variables</h3>
<p>If two independent counts each follow a Poisson distribution, their sum does too, and the parameters add. This is why the distribution is so usable: a total across separate sources needs no convolution.</p>
<pre><code>X ~ Po(l1), Y ~ Po(l2), independent
X + Y ~ Po(l1 + l2)
but X - Y is NOT Poisson</code></pre>
<p><strong>Worked example.</strong> A website gets 5 hits per minute from Europe and 3 per minute from Asia, independently. Find the probability of more than 10 hits in a minute in total.</p>
<pre><code>total ~ Po(8)
P(X &gt; 10) = 1 - P(X &lt;= 10) = 1 - 0.8159 = 0.1841</code></pre>

<h3>The Poisson as an approximation to the binomial</h3>
<p>When n is large and p is small, the binomial is well approximated by a Poisson with λ = np. The rule of thumb used in this course is n &gt; 50 and p &lt; 0.05, or np &lt; 5.</p>
<pre><code>X ~ B(n, p) with n large, p small  ->  X is approximately Po(np)</code></pre>
<p><strong>Worked example.</strong> A factory produces items with a 2% defect rate. In a batch of 200, use a Poisson approximation to find the probability of at most 2 defects.</p>
<pre><code>lambda = 200 x 0.02 = 4
P(X &lt;= 2) = e^(-4)(1 + 4 + 8) = 0.018316 x 13 = 0.2381
the exact binomial gives 0.2351, so the approximation is close</code></pre>
<p><strong>Worked example 2 (justifying the approximation).</strong> State why the approximation is reasonable here.</p>
<pre><code>n = 200 is large and p = 0.02 is small, with np = 4
so the rare-event limit conditions hold</code></pre>

<h3>Hypothesis testing with the Poisson</h3>
<p>The structure is identical to the binomial test: state hypotheses, assume the null rate, compute the tail probability, compare with the significance level. The only new step is that the rate may need scaling to the observed interval.</p>
<pre><code>H0: lambda = lambda0    H1: lambda &gt; lambda0 (or &lt;)
observed count x in the interval
p-value = P(X &gt;= x) or P(X &lt;= x) under Po(lambda0)
reject H0 if the p-value &lt;= the significance level</code></pre>
<p><strong>Worked example.</strong> A call centre historically receives 6 calls per hour. In a new hour it receives 12. Test at the 5% level whether the rate has increased.</p>
<pre><code>H0: lambda = 6;  H1: lambda &gt; 6
X ~ Po(6) under H0
P(X &gt;= 12) = 1 - P(X &lt;= 11) = 1 - 0.9799 = 0.0201
0.0201 &lt; 0.05, so reject H0
there is evidence the rate has increased</code></pre>
<p><strong>Worked example 2 (critical region).</strong> For Po(6), find the 5% one-tailed critical region for an increase.</p>
<pre><code>P(X &gt;= 11) = 0.0426 (below 0.05)
P(X &gt;= 10) = 0.0839 (above 0.05)
critical region: X &gt;= 11</code></pre>
<p><strong>Worked example 3 (two intervals).</strong> The same centre observes 16 calls over two hours. Test for an increase at 5%.</p>
<pre><code>expected over two hours under H0 = 12, so X ~ Po(12)
P(X &gt;= 16) = 1 - P(X &lt;= 15) = 1 - 0.8444 = 0.1556
0.1556 &gt; 0.05, so do not reject H0</code></pre>
<p>Compare the two: twelve calls in one hour was significant, sixteen in two hours is not, because the expected count doubled. The rate, not the raw count, is what is being tested.</p>

<h3>Reading the distribution's shape</h3>
<p>The Poisson is skewed to the right when λ is small and becomes almost symmetric as λ grows, which is why small-rate questions usually live in the lower tail and why the normal approximation becomes usable once λ passes about 20. Knowing the shape tells you at a glance whether an answer is plausible: a probability of 0.4 for "more than 10" when λ = 3 should feel wrong before any arithmetic is checked.</p>
<p>A useful sanity check is that the standard deviation is the square root of the mean. For Po(9) the mean is 9 and the standard deviation 3, so counts between 6 and 12 are ordinary and a count of 20 is roughly three and a half standard deviations out — surprising enough to prompt a hypothesis test. That comparison is what turns a bare probability into an interpretation, and interpretation marks are the easiest ones to lose.</p>
<p>Finally, note that the model is about a count in an interval, so the interval has to be defined in the answer. "Three calls per hour" and "three calls per minute" describe different distributions, and a rate quoted per unit time without its unit is not a λ at all.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Definition)</strong> State two conditions for a Poisson model. <em>Answer:</em> events occur singly at random, independently, at a constant rate.</li>
<li><strong>(Single value)</strong> X ~ Po(2.5): find P(X = 3). <em>Answer:</em> e^(−2.5)(15.625/6) = 0.2138.</li>
<li><strong>(Cumulative)</strong> X ~ Po(4): find P(X ≤ 2). <em>Answer:</em> 0.2381.</li>
<li><strong>(Complement)</strong> X ~ Po(5): find P(X ≥ 3). <em>Answer:</em> 1 − 0.1247 = 0.8753.</li>
<li><strong>(Scaling)</strong> Rate 3 per hour: find P(X = 0) in 20 minutes. <em>Answer:</em> λ = 1, so e^(−1) = 0.3679.</li>
<li><strong>(Sum)</strong> Independent Po(2) and Po(3): find P(total = 4). <em>Answer:</em> Po(5), P(4) = 0.1755.</li>
<li><strong>(Approximation)</strong> B(500, 0.01): approximate P(X = 0). <em>Answer:</em> Po(5), e^(−5) = 0.00674.</li>
<li><strong>(Mean/variance)</strong> A sample has mean 4.2 and variance 9.1. Comment on the Poisson fit. <em>Answer:</em> variance far exceeds the mean, so the model is doubtful (over-dispersed).</li>
<li><strong>(Test)</strong> 9 events observed where 4 expected; test for an increase at 5%. <em>Answer:</em> P(X ≥ 9) = 0.0214 &lt; 0.05, reject H0.</li>
<li><strong>(Critical region)</strong> Po(3), 5% upper tail: find the critical region. <em>Answer:</em> P(X ≥ 7) = 0.0335, P(X ≥ 6) = 0.0839, so X ≥ 7.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Using the wrong interval:</strong> λ must match the window asked about; doubling a time doubles the rate.</li>
<li><strong>Complement off by one:</strong> P(X ≥ 4) = 1 − P(X ≤ 3); subtracting P(X ≤ 4) is the classic error.</li>
<li><strong>Treating a difference as Poisson:</strong> sums of independent Poisson variables are Poisson, differences are not.</li>
<li><strong>Approximation outside its range:</strong> np must be small; with np large the Poisson is a poor fit to the binomial.</li>
<li><strong>Variance assumed equal to the mean without checking:</strong> the test mean = variance is a diagnostic, not a guarantee.</li>
<li><strong>Ignoring clustering:</strong> events that arrive in bursts break the single-event condition and inflate the variance.</li>
<li><strong>r! miscomputed:</strong> 0! = 1 and 1! = 1, and a missing factorial term changes the answer entirely.</li>
<li><strong>p-value direction:</strong> a one-tailed test uses one tail only; doubling it makes a borderline result look significant.</li>
</ul>
`,
    "e04cf551-2c45-4d65-b4b5-bd16e733c938": `
<h2>A Level Mathematics: Continuous Random Variables</h2>
<p>A continuous random variable can take any value in an interval, so the probability of one exact value is zero and probabilities are found by integrating over a range. The probability density function replaces the probability table: area under the curve, not height, is probability. This note builds the density function, the cumulative distribution, the mean, the variance and the median from that single idea, and shows the standard exam moves — normalising a density, finding a constant, and reading probabilities off a piecewise curve.</p>

<h3>Why density, not probability</h3>
<p>If a random variable is a measurement — a length, a waiting time, a mass — there are infinitely many possible values, and giving each a positive probability is impossible because they would have to sum to one. So probability lives in intervals, and the density describes how concentrated it is.</p>
<pre><code>P(a &lt;= X &lt;= b) = integral from a to b of f(x) dx
P(X = c) = 0 for any single value c
f(x) &gt;= 0 everywhere (it is a density, so non-negative)
the total area is 1: integral of f over the whole range = 1</code></pre>
<p>Notice that a density may exceed 1 without contradicting anything: on a narrow support the curve must be tall for its area to reach 1, and no rule forbids that. Only the area is constrained.</p>
<p>The analogy that makes this concrete: the density is like the height of a landscape, and probability is the volume of soil above a patch of ground. A mathematically exact point has no width, so no soil — that is why P(X = c) = 0 even at the peak.</p>

<h3>Finding the constant in a density</h3>
<p>Most first parts of a question give a density with an unknown constant and require the total area to be one. That single condition fixes the constant and is worth a mark on its own.</p>
<pre><code>set the integral of f over its support equal to 1, solve for k
then check f(x) &gt;= 0 on the support</code></pre>
<p><strong>Worked example.</strong> f(x) = kx for 0 ≤ x ≤ 2, and 0 otherwise. Find k.</p>
<pre><code>integral from 0 to 2 of kx dx = k x^2/2 evaluated = k(4/2) = 2k
2k = 1  ->  k = 0.5</code></pre>
<p><strong>Worked example 2 (quadratic density).</strong> f(x) = kx² for 0 ≤ x ≤ 3. Find k and then P(X ≤ 1).</p>
<pre><code>integral = k x^3/3 from 0 to 3 = k(27/3) = 9k = 1  ->  k = 1/9
P(X &lt;= 1) = (1/9) x^3/3 from 0 to 1 = (1/9)(1/3) = 0.0370</code></pre>
<p><strong>Worked example 3 (piecewise).</strong> f(x) = kx for 0 ≤ x ≤ 1 and k(2 − x) for 1 &lt; x ≤ 2. Find k.</p>
<pre><code>first part: k/2
second part: k[2x - x^2/2] from 1 to 2 = k[(4 - 2) - (2 - 0.5)] = k(0.5)
total: k/2 + k/2 = k = 1  ->  k = 1</code></pre>

<h3>The cumulative distribution function</h3>
<p>The cumulative distribution F(x) is the integral of the density up to x, and it answers every "less than" question directly. Differentiating it recovers the density, which is why the two are always presented together.</p>
<pre><code>F(x) = P(X &lt;= x) = integral from the lower limit to x of f(t) dt
F is non-decreasing, F(lower) = 0, F(upper) = 1
f(x) = F'(x) where F is differentiable</code></pre>
<p><strong>Worked example.</strong> For f(x) = x/2 on 0 ≤ x ≤ 2, find F(x) and hence P(X ≤ 1.5).</p>
<pre><code>F(x) = integral of t/2 from 0 to x = x^2/4
P(X &lt;= 1.5) = 2.25/4 = 0.5625
check: F(2) = 1</code></pre>
<p><strong>Worked example 2 (from F back to f).</strong> Given F(x) = x²/9 on 0 ≤ x ≤ 3, find f(x) and P(1 ≤ X ≤ 2).</p>
<pre><code>f(x) = F'(x) = 2x/9
P(1 &lt;= X &lt;= 2) = F(2) - F(1) = 4/9 - 1/9 = 1/3</code></pre>

<h3>The mean and variance</h3>
<p>For a continuous variable the sums of the discrete case become integrals, with the same structure: mean is the first moment, variance is the second moment minus the square of the mean.</p>
<pre><code>E(X) = integral of x f(x) dx over the support
E(X^2) = integral of x^2 f(x) dx
Var(X) = E(X^2) - [E(X)]^2</code></pre>
<p><strong>Worked example.</strong> f(x) = x/2 on 0 ≤ x ≤ 2. Find E(X) and Var(X).</p>
<pre><code>E(X) = integral of x(x/2) = x^3/6 from 0 to 2 = 8/6 = 1.333
E(X^2) = integral of x^2(x/2) = x^4/8 from 0 to 2 = 16/8 = 2
Var(X) = 2 - (1.333)^2 = 2 - 1.778 = 0.222</code></pre>
<p><strong>Worked example 2 (uniform special case).</strong> For X uniform on [a, b], show E(X) = (a + b)/2.</p>
<pre><code>f(x) = 1/(b - a)
E(X) = (1/(b-a)) integral of x from a to b = (1/(b-a))(b^2 - a^2)/2 = (a + b)/2</code></pre>
<p>The uniform result is worth remembering: the mean is the midpoint and the variance is (b − a)²/12, so a question about a uniform variable can be answered without any integration.</p>

<h3>The median and quartiles</h3>
<p>The median is the value m with F(m) = 0.5, the lower quartile has F = 0.25 and the upper 0.75. Because a continuous distribution has no lumpy probabilities, these are always found by solving an equation.</p>
<pre><code>median m: F(m) = 0.5
lower quartile: F(q1) = 0.25
upper quartile: F(q3) = 0.75
interquartile range = q3 - q1</code></pre>
<p><strong>Worked example.</strong> Find the median of the distribution with f(x) = x/2 on 0 ≤ x ≤ 2.</p>
<pre><code>F(m) = m^2/4 = 0.5
m^2 = 2  ->  m = 1.414</code></pre>
<p><strong>Worked example 2 (quartiles).</strong> Find the quartiles of the same distribution.</p>
<pre><code>q1^2/4 = 0.25  ->  q1 = 1
q3^2/4 = 0.75  ->  q3 = sqrt 3 = 1.732
IQR = 0.732</code></pre>
<p><strong>Worked example 3 (median of a uniform).</strong> X is uniform on [2, 10]. State the median and the IQR.</p>
<pre><code>median = 6;  q1 = 4;  q3 = 8;  IQR = 4
for a uniform, the quartiles split the interval into four equal parts</code></pre>

<h3>The mode and the shape</h3>
<p>The mode of a continuous distribution is where the density is largest — the peak of the curve. It is found by differentiating and setting the derivative to zero, or by inspection when the density is increasing or decreasing throughout.</p>
<pre><code>mode: maximise f(x) on the support
compare f(peak) with the endpoint values, because a density can be largest at an endpoint</code></pre>
<p><strong>Worked example.</strong> Find the mode of f(x) = 6x(1 − x) on 0 ≤ x ≤ 1.</p>
<pre><code>f(x) = 6x - 6x^2
f'(x) = 6 - 12x = 0  ->  x = 0.5
f(0.5) = 1.5, larger than f(0) = f(1) = 0, so the mode is 0.5</code></pre>
<p><strong>Worked example 2 (no stationary point).</strong> Find the mode of f(x) = 2x on 0 ≤ x ≤ 1.</p>
<pre><code>f increases throughout the support, so there is no interior maximum
the mode is at the endpoint x = 1</code></pre>

<h3>Working backwards from a probability</h3>
<p>A frequent final part gives a probability and asks for the value of x that produces it. The method is to set F(k) equal to that probability and solve for k, remembering that the result is a position on the axis, not a probability, so it should carry the units of the variable.</p>
<p><strong>Worked example.</strong> For f(x) = x/2 on 0 ≤ x ≤ 2, find the value of k with P(X ≤ k) = 0.8.</p>
<pre><code>F(k) = k^2/4 = 0.8
k^2 = 3.2  ->  k = 1.789</code></pre>
<p><strong>Worked example 2 (two-sided).</strong> For the same distribution, find the interquartile range directly from the density rather than a table.</p>
<pre><code>q1: q1^2/4 = 0.25  ->  q1 = 1
q3: q3^2/4 = 0.75  ->  q3 = 1.732
IQR = 0.732</code></pre>
<p>Percentile questions are the same calculation with a different probability, and a question that says "the 90th percentile" is asking for k with F(k) = 0.9. Reading the wording as a cumulative condition is the whole skill.</p>
<p>One more variant deserves attention: the density may be defined in two pieces, and then P(X ≤ k) depends on which piece k sits in. The routine is to evaluate F at the join first — if the probability asked for is larger than the value at the join, the answer lies in the second piece and the integral starts from the join, carrying the accumulated probability forward. Getting the join wrong is the one error in this topic that produces a plausible but completely wrong number.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Constant)</strong> f(x) = k on [0, 5]: find k. <em>Answer:</em> 5k = 1, k = 0.2.</li>
<li><strong>(Probability)</strong> For that f, find P(1 ≤ X ≤ 3). <em>Answer:</em> 0.2 × 2 = 0.4.</li>
<li><strong>(Constant)</strong> f(x) = kx² on [0, 2]: find k. <em>Answer:</em> 8k/3 = 1, k = 0.375.</li>
<li><strong>(CDF)</strong> F(x) = x³/8 on [0, 2]: find f(x). <em>Answer:</em> 3x²/8.</li>
<li><strong>(Mean)</strong> f(x) = 0.5 on [0, 2]: find E(X). <em>Answer:</em> 1.</li>
<li><strong>(Variance)</strong> Uniform on [0, 4]: find Var(X). <em>Answer:</em> 16/12 = 1.333.</li>
<li><strong>(Median)</strong> F(x) = x²/16 on [0, 4]: find the median. <em>Answer:</em> m² = 8, m = 2.828.</li>
<li><strong>(Quartiles)</strong> Same F: find the IQR. <em>Answer:</em> q1 = 2, q3 = 3.464, IQR = 1.464.</li>
<li><strong>(Mode)</strong> f(x) = 12x²(1 − x) on [0, 1]: find the mode. <em>Answer:</em> f' = 24x − 36x², x = 2/3.</li>
<li><strong>(Interpretation)</strong> Explain why P(X = 1.5) = 0 for a continuous variable. <em>Answer:</em> probability is area, and a single point has zero width.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Reading probability off the height:</strong> f(x) is a density; only the area is a probability, and f(x) can exceed 1.</li>
<li><strong>Integration limits ignored:</strong> outside the support the density is zero, so an integral that strays outside must be split.</li>
<li><strong>Forgetting the normalising condition:</strong> the first mark of a constant question is the integral equal to one.</li>
<li><strong>Variance formula misremembered:</strong> it is E(X²) − [E(X)]², not E(X²) − E(X) or E(X²) + [E(X)]².</li>
<li><strong>Median found by averaging:</strong> for a continuous distribution the median solves F(m) = 0.5; it is not the midpoint unless the distribution is uniform.</li>
<li><strong>Mode at a stationary point assumed:</strong> check the endpoints, because a monotone density peaks at the boundary.</li>
<li><strong>F and f confused:</strong> F is cumulative (a probability), f is the density; F is the integral of f, not the other way round.</li>
<li><strong>Piecewise densities integrated as one piece:</strong> a density defined in two parts needs two integrals, one per part.</li>
</ul>
`,
    "124279ee-da25-472a-b5f2-53fdcaab4186": `
<h2>A Level Mathematics: Hypothesis Testing</h2>
<p>A hypothesis test is a formal way of deciding whether data are surprising enough to overturn an assumption. The logic is legal rather than mathematical in spirit: assume the claim is true, compute how unlikely the observed evidence would be under that assumption, and reject the claim only if the evidence is unlikely enough. This note sets out the machinery — null and alternative hypotheses, significance levels, tails, critical regions — and then applies it to the binomial and normal cases the exam uses.</p>

<h3>The logic of a test</h3>
<p>The null hypothesis H0 is the assumption of no change, no effect, no bias: the status quo. The alternative H1 is what you would conclude if the data are too extreme. The significance level α is the risk of rejecting a true H0 that you are willing to accept.</p>
<pre><code>H0: the parameter equals its old value
H1: the parameter is greater, less, or simply different
alpha: the maximum acceptable probability of a Type I error (often 0.05 or 0.01)
test statistic: the observed value computed from the sample
p-value: probability of a result at least as extreme, assuming H0</code></pre>
<p>The analogy that makes the asymmetry clear: a criminal trial presumes innocence. The presumption is not a belief, it is the default that evidence must overcome. Failing to reject H0 is not proof of H0 — it is a verdict of "not proven".</p>

<h3>One-tailed and two-tailed tests</h3>
<p>The alternative decides the tail. A one-tailed test is used when the direction of the change is specified in advance; a two-tailed test when any change would matter.</p>
<table>
<tr><th>Alternative</th><th>Test type</th><th>p-value</th></tr>
<tr><td>p &gt; p0</td><td>one-tailed, upper</td><td>P(X ≥ observed)</td></tr>
<tr><td>p &lt; p0</td><td>one-tailed, lower</td><td>P(X ≤ observed)</td></tr>
<tr><td>p ≠ p0</td><td>two-tailed</td><td>2 × the smaller tail</td></tr>
</table>
<p><strong>Worked example (choosing the alternative).</strong> A coin is suspected of favouring heads. Which alternative applies?</p>
<pre><code>the suspicion has a direction, so H1: p &gt; 0.5, a one-tailed upper test
a two-tailed test would be right only if any bias mattered</code></pre>

<h3>Errors and their consequences</h3>
<p>Every test can go wrong in two ways, and the significance level controls only one of them. Understanding which is which is a frequent exam question and a genuine conceptual point.</p>
<pre><code>Type I error: reject H0 when it is true  (probability alpha)
Type II error: fail to reject H0 when it is false
reducing alpha reduces Type I errors but increases Type II errors
increasing the sample size reduces both</code></pre>
<p><strong>Worked example.</strong> A test at the 5% level concludes a die is biased when it is fair. Which error is this?</p>
<pre><code>H0 (fair) was true and was rejected
that is a Type I error, with probability at most 5%</code></pre>
<p><strong>Worked example 2 (effect of sample size).</strong> Explain why the same observed proportion can be significant in a large sample and not in a small one.</p>
<pre><code>a larger sample reduces the standard error, so the same deviation
becomes more standard errors away from the null value
the evidence is measured in standard errors, not in raw counts</code></pre>

<h3>Testing a binomial proportion</h3>
<p>The test statistic is the observed number of successes, the null distribution is binomial, and the p-value is a cumulative binomial probability.</p>
<pre><code>H0: p = p0;  X ~ B(n, p0)
upper tail p-value = P(X &gt;= x)
lower tail p-value = P(X &lt;= x)
reject H0 if p-value &lt;= alpha</code></pre>
<p><strong>Worked example.</strong> A manufacturer claims 90% of components are fault-free. In a sample of 20, only 15 are fault-free. Test at the 5% level whether the claim is too high.</p>
<pre><code>H0: p = 0.9;  H1: p &lt; 0.9
X ~ B(20, 0.9)
P(X &lt;= 15) = 0.0432
0.0432 &lt; 0.05, so reject H0
there is evidence the fault-free rate is below 90%</code></pre>
<p><strong>Worked example 2 (critical region).</strong> Find the 5% critical region for that test.</p>
<pre><code>P(X &lt;= 15) = 0.0432 (below 0.05)
P(X &lt;= 16) = 0.1330 (above 0.05)
critical region: X &lt;= 15</code></pre>
<p><strong>Worked example 3 (actual significance level).</strong> State the actual significance level of that test.</p>
<pre><code>the probability of a Type I error is P(X &lt;= 15) under H0 = 0.0432
so the actual level is 4.32%, just inside the 5% requirement</code></pre>

<h3>Testing a normal mean</h3>
<p>When the variable is continuous and the population is normal — or the sample is large — the test statistic is standardised with a z-score and compared with critical values.</p>
<pre><code>test statistic z = (x-bar - mu)/(sigma/sqrt n)   (sigma known)
or z = (x-bar - mu)/(s/sqrt n)                  (sigma estimated, large n)
critical values at 5% one-tailed: 1.6449;  two-tailed: 1.96
at 1% one-tailed: 2.3263;  two-tailed: 2.5758</code></pre>
<p><strong>Worked example.</strong> A machine fills bags with a mean of 500 g and standard deviation 8 g. A sample of 16 bags has mean 496 g. Test at the 5% level whether the mean has fallen.</p>
<pre><code>H0: mu = 500;  H1: mu &lt; 500
standard error = 8/sqrt 16 = 2
z = (496 - 500)/2 = -2
critical value at 5% one-tailed is -1.6449
-2 &lt; -1.6449, so reject H0: the mean has fallen</code></pre>
<p><strong>Worked example 2 (two-tailed).</strong> Same data, tested two-tailed at 5%.</p>
<pre><code>critical values are +/-1.96
|-2| &gt; 1.96, so still reject H0
the evidence is that the mean is not 500, in either direction</code></pre>
<p><strong>Worked example 3 (interpreting a p-value).</strong> A test gives z = 1.72 for H1: μ &gt; μ0. Find the p-value and conclude at 5%.</p>
<pre><code>p-value = P(Z &gt; 1.72) = 0.0427
0.0427 &lt; 0.05, so reject H0
the result is significant at the 5% level but not at 1%</code></pre>

<h3>Choosing the right test</h3>
<p>The exam does not label the test; the shape of the data decides it. Getting the distribution wrong makes every later mark unreachable, so the decision is worth making explicitly.</p>
<pre><code>count of successes in n trials with constant p  ->  binomial test
count of events in an interval at a constant rate  ->  Poisson test
mean of a continuous measurement  ->  normal test (z)
correlation between two variables  ->  product-moment test</code></pre>
<p><strong>Worked example.</strong> A nurse records the number of patients arriving in an hour on 30 separate days. Which test?</p>
<pre><code>counts of arrivals in equal intervals at a roughly constant rate
use a Poisson test on the mean count, not a binomial test
a normal test on the mean of the 30 counts is also defensible for large n</code></pre>

<h3>Writing a conclusion that earns the marks</h3>
<p>The final mark of a hypothesis test is for the conclusion, and it has three components: a decision about H0, a reference to the significance level, and the finding stated in the context of the question. Dropping any one of them costs a mark even when the arithmetic is perfect.</p>
<p>Compare these two endings. "0.0201 &lt; 0.05, so reject H0" scores the comparison. "There is sufficient evidence at the 5% level that the call rate has increased" scores the comparison and the interpretation. "The rate has increased" scores neither, because it reports a certainty the test cannot deliver.</p>
<p>The opposite case is often mishandled too. When the p-value is above the level the correct wording is that there is insufficient evidence to reject H0 — never that H0 is true, and never that nothing has happened. A non-significant result from a small sample is weak evidence either way, and saying so is better than overclaiming in either direction.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Hypotheses)</strong> A coin might be biased against heads. State H0 and H1. <em>Answer:</em> H0: p = 0.5; H1: p &lt; 0.5.</li>
<li><strong>(Error)</strong> Define a Type II error. <em>Answer:</em> failing to reject H0 when it is false.</li>
<li><strong>(Binomial)</strong> 8 of 20 seeds germinate; test p = 0.6 against p &lt; 0.6 at 5%. <em>Answer:</em> P(X ≤ 8) = 0.0565, not significant.</li>
<li><strong>(Critical region)</strong> X ~ B(15, 0.4): 5% lower critical region. <em>Answer:</em> P(X ≤ 2) = 0.0271, P(X ≤ 3) = 0.0905, so X ≤ 2.</li>
<li><strong>(Actual level)</strong> For that region, state the actual significance level. <em>Answer:</em> 2.71%.</li>
<li><strong>(Normal)</strong> μ0 = 20, σ = 4, n = 25, mean 21.5: test at 5% one-tailed. <em>Answer:</em> z = 1.875 &gt; 1.6449, reject.</li>
<li><strong>(Two-tailed)</strong> Same data two-tailed: <em>Answer:</em> 1.875 &lt; 1.96, do not reject.</li>
<li><strong>(p-value)</strong> z = 2.4, H1: μ &gt; μ0. Find the p-value. <em>Answer:</em> 0.0082.</li>
<li><strong>(Sample size)</strong> Why can a larger sample turn a non-significant result significant? <em>Answer:</em> the standard error shrinks, so the same deviation is more standard errors away.</li>
<li><strong>(Conclusion wording)</strong> Write a valid conclusion for a rejected H0. <em>Answer:</em> there is sufficient evidence at the 5% level that the mean has fallen.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Concluding H0 is true:</strong> failing to reject means the evidence is insufficient; it is never proof of the null.</li>
<li><strong>Wrong tail:</strong> compute P(X ≥ x) for an increase and P(X ≤ x) for a decrease; using the other tail inverts the conclusion.</li>
<li><strong>Doubling without a two-tailed alternative:</strong> the p-value is doubled only when H1 is "not equal".</li>
<li><strong>p-value compared with the wrong threshold:</strong> 5% is 0.05; comparing 0.043 with 5 instead of 0.05 reverses the verdict.</li>
<li><strong>Standard error omitted:</strong> the z-score divides by σ/√n, not by σ.</li>
<li><strong>Critical value for the wrong tail:</strong> the 5% one-tailed value is 1.6449, the two-tailed is 1.96; the sign matters too.</li>
<li><strong>Type I and Type II swapped:</strong> Type I is rejecting a true null — the error the significance level controls.</li>
<li><strong>Conclusion beyond the data:</strong> a rejected H0 says the parameter has changed, not why, and never that the change is important.</li>
</ul>
`,
    "a8ebc823-3b62-4380-be53-b636ae87d6b4": `
<h2>A Level Mathematics: Permutations and Combinations</h2>
<p>Counting is the part of probability that requires no formula to start with, only a decision: does the order matter? Every question in this topic is answered by that one question. If order matters the count is a permutation; if it does not the count is a combination. Everything else — repetitions, restrictions, arrangements around a circle — is a variation on the same counting principle, and this note sets out each variation with the reasoning behind it.</p>

<h3>The multiplication principle</h3>
<p>If a choice can be made in a ways and, independently, a second choice in b ways, the pair can be made in a × b ways. That is the whole foundation; the formulas are shortcuts for repeated applications of it.</p>
<pre><code>arrangements of n distinct objects in a row: n! = n x (n-1) x ... x 2 x 1
0! = 1 by convention, so that formulas stay consistent
choosing r from n with order: nPr = n!/(n - r)!
choosing r from n without order: nCr = n!/(r!(n - r)!)</code></pre>
<p><strong>Worked example.</strong> A password is 4 distinct letters from the 26-letter alphabet. How many passwords are possible?</p>
<pre><code>order matters, so 26P4 = 26 x 25 x 24 x 23 = 358,800</code></pre>
<p><strong>Worked example 2 (no order).</strong> How many ways can 4 students be chosen from 26?</p>
<pre><code>order does not matter, so 26C4 = 14,950</code></pre>
<p><strong>Worked example 3 (a leading zero is not allowed).</strong> A code uses four distinct digits from 0 to 9 and cannot begin with zero. How many codes?</p>
<pre><code>first digit: 9 choices (1 to 9)
remaining three: 9P3 = 9 x 8 x 7 = 504
total = 9 x 504 = 4536</code></pre>
<p><strong>Worked example 4 (the link).</strong> Explain why nPr = nCr × r!.</p>
<pre><code>every unordered selection of r objects can be arranged in r! orders
so counting ordered selections = counting unordered ones then arranging them</code></pre>

<h3>Deciding whether order matters</h3>
<p>The decision is not about the words "choose" or "arrange" in the question — those are hints, not rules. The safe test is to imagine two selections differing only by swapping two items: if that counts as a different outcome, order matters.</p>
<table>
<tr><th>Situation</th><th>Order?</th><th>Count</th></tr>
<tr><td>finishing order of a race</td><td>yes</td><td>nPr</td></tr>
<tr><td>a committee of 3</td><td>no</td><td>nCr</td></tr>
<tr><td>a 4-digit PIN</td><td>yes</td><td>permutation, with repetition allowed</td></tr>
<tr><td>a hand of cards</td><td>no</td><td>nCr</td></tr>
<tr><td>seating 5 people in a row</td><td>yes</td><td>5!</td></tr>
</table>
<p><strong>Worked example.</strong> A team of 11 is chosen from 16 players, and one of the 11 is captain. Count the possibilities.</p>
<pre><code>choose the 11: 16C11 = 4368
choose the captain from them: 11 ways
total = 4368 x 11 = 48,048</code></pre>
<p>The multiplication principle is doing the work here: two independent choices, multiplied.</p>

<h3>Repetition and identical items</h3>
<p>When some objects are identical, arranging them as if all were distinct overcounts by the number of ways the identical ones can be swapped. Dividing by those factorials corrects it.</p>
<pre><code>arrangements of n items with groups of identical items:
n!/(a! b! c! ...) where a, b, c are the group sizes
with repetition allowed, choosing r from n: n^r</code></pre>
<p><strong>Worked example.</strong> How many distinct arrangements of the letters in BANANA?</p>
<pre><code>6 letters: B once, A three times, N twice
6!/(1! 3! 2!) = 720/12 = 60</code></pre>
<p><strong>Worked example 2 (repetition allowed).</strong> A 3-digit code uses digits 0-9, repeats allowed. How many codes?</p>
<pre><code>10 x 10 x 10 = 1000
if repeats were not allowed: 10 x 9 x 8 = 720</code></pre>
<p><strong>Worked example 3 (identical plus restriction).</strong> How many arrangements of the letters of LEVEL begin with L?</p>
<pre><code>fix L at the front; remaining letters E, V, E, L
that is 4 letters with E twice: 4!/2! = 12
but the leading L is one of the two Ls, so there is only one choice for the front
answer 12</code></pre>

<h3>Restrictions: the "glue" method</h3>
<p>When certain items must be together, treat the group as a single object, arrange the objects, then arrange within the group. When certain items must not be together, count the total and subtract the "together" case.</p>
<pre><code>together: glue the group, arrange the objects, multiply by the internal arrangements
not together: total arrangements minus the together arrangements
specific positions: fix those items first, then arrange the rest</code></pre>
<p><strong>Worked example.</strong> Five books, two of which must stand together, are arranged on a shelf. How many orders?</p>
<pre><code>glue the pair: now 4 objects, arranged in 4! = 24 ways
the pair interchange in 2! = 2 ways
total = 48</code></pre>
<p><strong>Worked example 2 (not together).</strong> The same five books with the pair not together.</p>
<pre><code>total arrangements = 5! = 120
together = 48
not together = 120 - 48 = 72</code></pre>
<p><strong>Worked example 3 (fixed positions).</strong> Four men and three women sit in a row of seven. How many arrangements have all three women together?</p>
<pre><code>glue the women into one block: now 5 objects (4 men + block), 5! = 120
internal arrangements of the women: 3! = 6
total = 720</code></pre>

<h3>Circular arrangements</h3>
<p>Around a circle, rotations of the same arrangement are not distinguishable, so fixing one item removes the rotational symmetry and the count drops by a factor of n.</p>
<pre><code>n distinct items around a circle: (n - 1)!
a necklace (where reflection also counts as the same): (n - 1)!/2</code></pre>
<p><strong>Worked example.</strong> In how many ways can 6 people sit around a round table?</p>
<pre><code>(6 - 1)! = 5! = 120</code></pre>
<p><strong>Worked example 2 (with a fixed seat).</strong> How many ways if one particular person must sit in a specified chair?</p>
<pre><code>fix that person, arrange the other 5 around: 5! = 120
the specified chair removes the rotational freedom entirely, so the answer is unchanged here</code></pre>
<p><strong>Worked example 3 (two people together at a round table).</strong> Six people, two of whom must sit together.</p>
<pre><code>glue the pair: 5 objects around a circle = 4! = 24
internal order of the pair: 2
total = 48</code></pre>

<h3>Combinations with conditions</h3>
<p>Committee questions combine cases: choose so many from one group and so many from another, then add the disjoint alternatives. The discipline is to make the cases genuinely disjoint, or the same selection gets counted twice.</p>
<pre><code>choose a from group A and b from group B: C(a-group, a) x C(b-group, b)
several allowed compositions: add the separate cases
at least one: total minus none</code></pre>
<p><strong>Worked example.</strong> From 6 men and 5 women, how many committees of 4 contain exactly 2 women?</p>
<pre><code>choose 2 women from 5: 10
choose 2 men from 6: 15
total = 150</code></pre>
<p><strong>Worked example 2 (at least one).</strong> How many committees of 4 contain at least one woman?</p>
<pre><code>total committees: 11C4 = 330
none: 6C4 = 15
at least one = 330 - 15 = 315</code></pre>
<p><strong>Worked example 3 (cases added).</strong> How many committees of 3 contain more women than men?</p>
<pre><code>3 women: 5C3 = 10
2 women and 1 man: 5C2 x 6C1 = 10 x 6 = 60
total = 70</code></pre>

<h3>Counting inside probability</h3>
<p>Combinations are usually the denominator of a probability question: count the favourable selections, count all selections, divide. Doing the counting separately from the probability keeps both parts clean and makes partial credit possible.</p>
<p><strong>Worked example.</strong> A bag holds 5 red and 7 blue counters. Four are drawn at random. Find the probability of exactly 2 red.</p>
<pre><code>total selections: 12C4 = 495
favourable: 5C2 x 7C2 = 10 x 21 = 210
probability = 210/495 = 0.4242</code></pre>
<p><strong>Worked example 2 (at least one).</strong> For the same bag, find the probability of at least one red.</p>
<pre><code>complement: no red means all four blue
7C4 = 35
P(no red) = 35/495 = 0.0707
P(at least one red) = 1 - 0.0707 = 0.9293</code></pre>
<p><strong>Worked example 3 (order matters in the numerator).</strong> Three cards are drawn from a standard deck without replacement. Find the probability they are drawn in increasing order of value.</p>
<pre><code>every set of three distinct cards has exactly one increasing order out of 3! orders
so the probability is 1/6, independent of the deck</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Factorial)</strong> Evaluate 7!. <em>Answer:</em> 5040.</li>
<li><strong>(Permutation)</strong> In how many orders can 5 runners finish? <em>Answer:</em> 5! = 120.</li>
<li><strong>(Combination)</strong> Evaluate 10C3. <em>Answer:</em> 120.</li>
<li><strong>(Choice)</strong> From 8 books, how many ways to choose 3? <em>Answer:</em> 56.</li>
<li><strong>(Arrangement)</strong> How many arrangements of the letters of STATISTICS? <em>Answer:</em> 10!/(3!3!2!) = 50,400.</li>
<li><strong>(Glue)</strong> 6 people in a row with two together: <em>Answer:</em> 5! × 2 = 240.</li>
<li><strong>(Not together)</strong> Same 6, not together: <em>Answer:</em> 720 − 240 = 480.</li>
<li><strong>(Circle)</strong> 7 people around a table: <em>Answer:</em> 6! = 720.</li>
<li><strong>(Committee)</strong> 3 from 5 men and 4 women, exactly 2 men: <em>Answer:</em> 5C2 × 4C1 = 40.</li>
<li><strong>(At least)</strong> 4 from the same 9 with at least one woman: <em>Answer:</em> 9C4 − 5C4 = 126 − 5 = 121.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Using nPr where order does not matter:</strong> a committee is unordered; using permutations overcounts by r!.</li>
<li><strong>Forgetting to divide by repeated factorials:</strong> identical letters need the divisor or the count is inflated.</li>
<li><strong>Glue method without the internal factor:</strong> the block also has an internal arrangement, and dropping the 2! halves the answer.</li>
<li><strong>Circular arrangements with n! instead of (n − 1)!:</strong> rotations are the same seating.</li>
<li><strong>Adding what should be multiplied:</strong> independent stages multiply; alternative cases add.</li>
<li><strong>Overlapping cases:</strong> cases must be disjoint, or selections are counted twice.</li>
<li><strong>"At least one" counted directly:</strong> the complement is almost always faster and safer.</li>
<li><strong>Restrictions applied after the count:</strong> fix the restricted positions first, then count what remains.</li>
</ul>
`,
    "dec61a69-ea89-4236-9ae4-64f25d54c51d": `
<h2>A Level Mathematics: Sampling and Estimation</h2>
<p>Statistics works by measuring a sample and reasoning about a population that was never fully measured. That inference is only as good as the sample: a biased sample cannot be rescued by a larger one. This note covers how samples are drawn, what the sampling distribution of the mean is, why the central limit theorem makes normal methods work for almost any population, and how to build and interpret a confidence interval.</p>

<h3>Populations, samples and parameters</h3>
<p>A parameter describes the population and is usually unknown; a statistic describes the sample and is known. The whole of estimation is the attempt to learn a parameter from a statistic, and naming the two correctly is the first mark in many questions.</p>
<pre><code>parameter: mu (population mean), sigma (population sd), p (proportion)
statistic: x-bar (sample mean), s (sample sd), p-hat (sample proportion)
an estimator is unbiased if its expected value equals the parameter</code></pre>
<p><strong>Worked example.</strong> A sample of 40 light bulbs has mean life 1,020 hours. Identify the parameter and the statistic.</p>
<pre><code>statistic: x-bar = 1020 hours (known, from the sample)
parameter: mu, the mean life of all bulbs produced (unknown)
the estimate of mu is 1020 hours, with an uncertainty to be quantified</code></pre>

<h3>Sampling methods and bias</h3>
<p>The method determines whether the sample can speak for the population at all. Every named method is a compromise between practicality and representativeness, and the exam asks you to identify which compromise a described survey has made.</p>
<table>
<tr><th>Method</th><th>How it works</th><th>Weakness</th></tr>
<tr><td>simple random</td><td>every member equally likely, chosen by number</td><td>needs a complete list</td></tr>
<tr><td>systematic</td><td>every k-th member from a random start</td><td>periodic patterns can bias it</td></tr>
<tr><td>stratified</td><td>sample each subgroup in proportion</td><td>needs known subgroup sizes</td></tr>
<tr><td>quota</td><td>fill fixed categories by interviewer choice</td><td>interviewer bias, not random</td></tr>
<tr><td>opportunity</td><td>whoever is available</td><td>strongly unrepresentative</td></tr>
</table>
<p><strong>Worked example.</strong> A surveyor interviews shoppers in a town centre on a weekday morning about working hours. Identify the bias.</p>
<pre><code>people free on a weekday morning are systematically different from the
population: the employed, the housebound and shift workers are under-represented
this is an opportunity sample with selection bias, and no sample size fixes it</code></pre>

<h3>The sampling distribution of the mean</h3>
<p>Take many samples of size n, compute each mean, and plot them: the result is the sampling distribution, and its spread is smaller than the population's by a factor of √n.</p>
<pre><code>if X has mean mu and variance sigma^2, then x-bar has
mean = mu
variance = sigma^2/n
standard error = sigma/sqrt n</code></pre>
<p><strong>Worked example.</strong> A population has mean 50 and standard deviation 12. For samples of 36, find the mean and standard error of the sample mean.</p>
<pre><code>mean of x-bar = 50
standard error = 12/6 = 2</code></pre>
<p><strong>Worked example 2 (effect of quadrupling n).</strong> What happens to the standard error if the sample size is quadrupled?</p>
<pre><code>standard error = sigma/sqrt(4n) = (sigma/sqrt n)/2
it halves; quadrupling the sample buys a factor of two in precision</code></pre>
<p>That square-root relationship is why doubling precision costs four times the data, and it is a standard exam comment.</p>

<h3>The central limit theorem</h3>
<p>Whatever shape the population has, the distribution of the sample mean becomes approximately normal as n grows. That is what licenses normal methods for non-normal populations, and it is the single most important result in the topic.</p>
<pre><code>for large n (in practice n &gt;= 30), x-bar is approximately N(mu, sigma^2/n)
the population itself need not be normal
if the population is already normal, the result is exact for any n</code></pre>
<p><strong>Worked example.</strong> A population is strongly skewed with mean 20 and standard deviation 10. Describe the distribution of the mean of samples of 50.</p>
<pre><code>by the central limit theorem, approximately normal
mean 20, standard error 10/sqrt 50 = 1.414
so x-bar is approximately N(20, 2.0)</code></pre>

<h3>Confidence intervals for a mean</h3>
<p>A confidence interval gives a range of plausible values for the parameter, with a stated long-run success rate. It is not a probability that the parameter lies in this particular interval — the parameter is fixed, the interval is random.</p>
<pre><code>95% interval for mu: x-bar +/- 1.96 (sigma/sqrt n)
99% interval: x-bar +/- 2.5758 (sigma/sqrt n)
with s estimated from the sample, replace sigma by s (large n)
wider interval: more confidence, less precision</code></pre>
<p><strong>Worked example.</strong> A sample of 64 measurements has mean 25.4 and known standard deviation 4. Find a 95% confidence interval for the population mean.</p>
<pre><code>standard error = 4/8 = 0.5
margin = 1.96 x 0.5 = 0.98
interval: 25.4 +/- 0.98 = (24.42, 26.38)</code></pre>
<p><strong>Worked example 2 (99%).</strong> The same data at 99%.</p>
<pre><code>margin = 2.5758 x 0.5 = 1.288
interval: (24.11, 26.69), wider as expected</code></pre>
<p><strong>Worked example 3 (required sample size).</strong> How large a sample is needed for the 95% margin to be at most 0.2?</p>
<pre><code>1.96 x 4/sqrt n &lt;= 0.2
sqrt n &gt;= 39.2
n &gt;= 1537, so the sample must be at least 1537</code></pre>

<h3>Confidence intervals for a proportion</h3>
<p>The sample proportion is a mean in disguise: each observation is a 0 or 1, so the same machinery applies with p in place of μ.</p>
<pre><code>p-hat = r/n;  standard error = sqrt(p-hat(1 - p-hat)/n)
95% interval: p-hat +/- 1.96 x standard error
valid when n p-hat and n(1 - p-hat) are both at least 5</code></pre>
<p><strong>Worked example.</strong> In a sample of 200 voters, 84 support a candidate. Find a 95% confidence interval for the support.</p>
<pre><code>p-hat = 0.42
standard error = sqrt(0.42 x 0.58/200) = sqrt(0.001218) = 0.0349
margin = 1.96 x 0.0349 = 0.0684
interval: (0.352, 0.488)</code></pre>
<p><strong>Worked example 2 (interpretation).</strong> A rival claims support is 50%. Does the interval support that claim?</p>
<pre><code>0.5 lies outside (0.352, 0.488)
so at the 95% level the data are not consistent with 50% support</code></pre>

<h3>Estimators and their properties</h3>
<p>Two properties decide whether an estimator is worth using: unbiasedness (correct on average) and low variance (consistent from sample to sample). The sample mean is unbiased for μ; the sample variance with divisor n is biased, which is why the divisor n − 1 appears.</p>
<pre><code>E(x-bar) = mu  (unbiased)
E(s^2) with divisor n underestimates sigma^2 by a factor (n-1)/n
divisor n - 1 corrects the bias</code></pre>
<p><strong>Worked example.</strong> Explain why the divisor n − 1 is used in the sample variance.</p>
<pre><code>deviations are measured from the sample mean, which is itself fitted to the data
that fitting uses up one degree of freedom, so the sum of squares is
systematically too small; dividing by n - 1 instead of n corrects it</code></pre>

<h3>Why the standard error is the whole story</h3>
<p>Every formula in this topic contains σ/√n somewhere, and the reason is that estimating a mean averages away noise: independent errors partly cancel, and they cancel in proportion to the square root of how many there are. That is why precision is expensive — halving the standard error needs four times the data — and why a very precise interval from a biased sample is worse than useless, since it states a wrong answer with confidence.</p>
<p>The habitual check before trusting any interval is therefore two questions, not one: is the sample random, and is the sample large enough for the approximation used? An interval built from a quota sample answers a question about that quota, not about the population, however narrow it looks.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Parameter)</strong> Distinguish a parameter from a statistic. <em>Answer:</em> a parameter describes the population and is unknown; a statistic comes from the sample.</li>
<li><strong>(Method)</strong> Name a method that guarantees every member is equally likely. <em>Answer:</em> simple random sampling.</li>
<li><strong>(Bias)</strong> Give one weakness of a quota sample. <em>Answer:</em> the interviewer chooses who fills each quota, so selection bias remains.</li>
<li><strong>(Standard error)</strong> σ = 15, n = 25: find the standard error. <em>Answer:</em> 3.</li>
<li><strong>(Effect)</strong> n increases from 25 to 100: what happens to the standard error? <em>Answer:</em> it halves, from 3 to 1.5.</li>
<li><strong>(CLT)</strong> State the central limit theorem. <em>Answer:</em> for large n the sample mean is approximately normal whatever the population shape.</li>
<li><strong>(CI)</strong> x̄ = 40, σ = 6, n = 36: 95% interval. <em>Answer:</em> 40 ± 1.96 = (38.04, 41.96).</li>
<li><strong>(Width)</strong> How can the interval be made narrower? <em>Answer:</em> increase n, or lower the confidence level.</li>
<li><strong>(Proportion)</strong> 60 of 400: 95% interval. <em>Answer:</em> 0.15 ± 1.96(0.01785) = (0.115, 0.185).</li>
<li><strong>(Estimator)</strong> Why divide by n − 1? <em>Answer:</em> to correct the bias caused by measuring deviations from the sample mean.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Dividing by n instead of √n:</strong> the standard error is σ/√n; using σ/n makes intervals far too narrow.</li>
<li><strong>Reading a CI as a probability:</strong> the parameter is fixed; the 95% refers to the long-run performance of the method.</li>
<li><strong>Assuming normality of the data:</strong> it is the sample mean that is approximately normal, by the central limit theorem, not the population.</li>
<li><strong>Bias described as variance:</strong> a biased sample is wrong however large; a variable one is merely imprecise.</li>
<li><strong>Stratified confused with quota:</strong> stratified is random within known groups; quota is interviewer-selected.</li>
<li><strong>Wrong z for 99%:</strong> it is 2.5758, not 2.33 (that is the one-tailed 1% value).</li>
<li><strong>Confidence level and sample size traded silently:</strong> a narrower interval at the same confidence costs a larger sample.</li>
<li><strong>Proportion interval outside [0, 1]:</strong> check the validity conditions and truncate, or report that the normal approximation is unsuitable.</li>
</ul>
`,
  },
};
