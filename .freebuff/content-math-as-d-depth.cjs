// Mathematics AS notes, deepened to the depth bar — batch D:
// Measures of Variation and Standard Deviation (5.2), Probability (5.3) and
// Probability Distributions (5.4 discrete random variables, 6.2 linear
// combinations of random variables).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-as-d-depth.cjs > .freebuff-tmp/math-as-d.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-as-d.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-as-d.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "f1f5eeb9-8449-47ac-8dca-bf15caf51664": "AS Level Mathematics: Measures of Variation and Standard Deviation",
    "d7503fbf-4726-4fd0-97ad-92a64510499b": "AS Level Mathematics: Probability",
    "9c77bccd-7dc1-4b5a-8498-f45f5af99624": "AS Level Mathematics: Probability Distributions",
  },
  rows: {
    "f1f5eeb9-8449-47ac-8dca-bf15caf51664": `
<h2>AS Level Mathematics: Measures of Variation and Standard Deviation</h2>
<p>Two data sets can share a mean and behave completely differently: one tightly clustered, one wildly spread. Measures of variation quantify that difference. This note builds the topic from zero: the range and interquartile range, the variance and standard deviation with the full calculation from first principles, the frequency-table and coded forms, outliers, and how to compare distributions fairly. Every formula is derived once, because the derivation is what makes it stick.</p>

<h3>Why spread matters</h3>
<p>Location alone is a half-description. A machine filling 500 g bags with a standard deviation of 2 g is trustworthy; one with a standard deviation of 30 g is not, though both may average 500 g. Spread measures consistency, risk and reliability, and every comparison question rewards naming both a location and a spread.</p>

<h3>Range and interquartile range</h3>
<pre><code>range = largest - smallest\ninterquartile range IQR = Q3 - Q1\nsemi-interquartile range = (Q3 - Q1)/2</code></pre>
<table border="1" cellpadding="6">
<tr><th>Measure</th><th>Uses</th><th>Weakness</th></tr>
<tr><td>Range</td><td>Only the two extremes</td><td>Destroyed by one outlier</td></tr>
<tr><td>IQR</td><td>The middle half</td><td>Ignores the tails entirely</td></tr>
<tr><td>Standard deviation</td><td>Every value</td><td>Dragged by outliers; more arithmetic</td></tr>
</table>
<p><strong>Worked example.</strong> Find the range, IQR and semi-IQR of 12, 15, 18, 21, 25, 30, 44.</p>
<pre><code>range = 44 - 12 = 32\nn = 7; median = 21; Q1 = 15; Q3 = 30\nIQR = 15;  semi-IQR = 7.5</code></pre>
<p>The 44 stretches the range to 32 while leaving the IQR untouched: exactly the robustness the IQR is chosen for.</p>

<h3>Variance and standard deviation defined</h3>
<pre><code>variance = mean of the squared deviations from the mean\nstandard deviation = sqrt(variance)\n\npopulation form:  sigma^2 = (sum of (x - mu)^2)/n\nsample form:      s^2 = (sum of (x - xbar)^2)/(n - 1)</code></pre>
<p>Why square the deviations? Signed deviations always sum to zero, so they cannot measure spread; squaring removes the signs and penalises large gaps heavily. The square root returns the answer to the original units, which is why standard deviation, not variance, is quoted in context.</p>
<p><strong>Worked example (full working).</strong> Find the standard deviation of 4, 7, 9, 10, 10.</p>
<pre><code>mean = 40/5 = 8\ndeviations: -4, -1, 1, 2, 2\nsquares: 16, 1, 1, 4, 4  ->  sum 26\nvariance = 26/5 = 5.2\nstandard deviation = sqrt(5.2) = 2.28</code></pre>

<h3>The computational formula</h3>
<pre><code>sigma^2 = (sum of x^2)/n - (mean)^2\n\nthis is algebraically identical to the deviation form but far quicker</code></pre>
<p><strong>Worked example.</strong> Repeat the previous calculation with the computational form.</p>
<pre><code>sum x = 40;  mean = 8\nsum x^2 = 16 + 49 + 81 + 100 + 100 = 346\nvariance = 346/5 - 64 = 69.2 - 64 = 5.2\nstandard deviation = 2.28  (identical, as it must be)</code></pre>

<h3>Frequency tables</h3>
<pre><code>mean = (sum of f x)/(sum of f)\nvariance = (sum of f x^2)/(sum of f) - (mean)^2</code></pre>
<p><strong>Worked example.</strong> Find the mean and standard deviation of the distribution x: 1, 2, 3, 4 with frequencies 2, 5, 8, 5.</p>
<pre><code>sum f = 20\nsum fx = 2(1) + 5(2) + 8(3) + 5(4) = 2 + 10 + 24 + 20 = 56  ->  mean 2.8\nsum fx^2 = 2(1) + 5(4) + 8(9) + 5(16) = 2 + 20 + 72 + 80 = 174\nvariance = 174/20 - 7.84 = 8.7 - 7.84 = 0.86\nstandard deviation = 0.927</code></pre>
<p>For grouped data the midpoint stands in for each class, so the standard deviation is an estimate, like the grouped mean.</p>
<p><strong>Worked example 2 (grouped).</strong> Estimate the standard deviation of 0–10 (3), 10–20 (7), 20–30 (10).</p>
<pre><code>midpoints 5, 15, 25;  sum f = 20\nsum fx = 15 + 105 + 250 = 370  ->  mean 18.5\nsum fx^2 = 3(25) + 7(225) + 10(625) = 75 + 1575 + 6250 = 7900\nvariance = 7900/20 - 342.25 = 395 - 342.25 = 52.75\nstandard deviation = 7.26</code></pre>

<h3>Coding and the effect on spread</h3>
<pre><code>if y = (x - a)/b then:\n  mean(y) = (mean(x) - a)/b\n  sd(y) = sd(x)/|b|\n  variance(y) = variance(x)/b^2\n\nshifts (a) do not change spread; scaling (b) scales it</code></pre>
<p><strong>Worked example.</strong> The coded values y = (x − 100)/5 have mean 4 and standard deviation 1.2. Find the mean and standard deviation of x.</p>
<pre><code>mean x = 5(4) + 100 = 120\nsd x = 5(1.2) = 6</code></pre>
<p>The intuition: adding a constant slides the whole distribution without stretching it; multiplying stretches every gap by the same factor.</p>

<h3>Outliers</h3>
<pre><code>lower fence = Q1 - 1.5 IQR\nupper fence = Q3 + 1.5 IQR\nvalues beyond the fences are outliers</code></pre>
<p><strong>Worked example.</strong> With Q1 = 20, Q3 = 32 and a maximum of 60, is 60 an outlier?</p>
<pre><code>IQR = 12; upper fence = 32 + 18 = 50\n60 > 50, so yes, 60 is an outlier</code></pre>
<p>Outliers are not automatically errors: they may be genuine extreme values, which is why the median and IQR often summarise skewed data better than the mean and standard deviation.</p>

<h3>Comparing distributions properly</h3>
<p>A full comparison answers four points: which has the higher typical value, which is more spread, whether either has outliers, and what that means in context.</p>
<p><strong>Worked example.</strong> Boys: mean 62, sd 8. Girls: mean 68, sd 4. Compare.</p>
<pre><code>girls have the higher typical mark (68 vs 62)\ngirls are more consistent (sd 4 vs 8; roughly half the spread)\nboys' marks are more widely dispersed, so their range of performance\nis broader; the sd ratio 2 suggests boys' marks vary twice as much\nabout their mean</code></pre>
<p>Never compare standard deviations of data measured in different units or on different scales without converting; here both are marks, so the comparison is valid.</p>

<h3>Standard deviation in context</h3>
<p><strong>Worked example (quality control).</strong> A machine fills bags with mean 500 g and sd 3 g. Assuming a roughly symmetric distribution, about what proportion lies within one standard deviation of the mean?</p>
<pre><code>one sd either side: 497 to 503 g\nfor a roughly normal shape, about 68 per cent of bags fall in this band\n(and about 95 per cent within two sds: 494 to 506 g)</code></pre>
<p>The 68/95/99.7 guide is approximate and only valid for roughly bell-shaped data; stating that condition is part of the answer.</p>

<h3>Comparing spread across different units</h3>
<p>Standard deviations cannot be compared directly when the scales differ. The coefficient of variation puts them on a common footing by expressing the spread as a fraction of the mean:</p>
<pre><code>coefficient of variation = 100 x sd/mean  (per cent)

A: mean 50 kg, sd 4 kg   ->  CV = 8 per cent
B: mean 8000 pounds, sd 400 pounds  ->  CV = 5 per cent
B is relatively more consistent despite the larger absolute sd</code></pre>
<p><strong>Worked example.</strong> Two athletes' times over a season: A has mean 12.0 s, sd 0.15 s; B has mean 60.0 s, sd 0.60 s (different events). Which is more consistent relative to their event?</p>
<pre><code>CV(A) = 0.15/12.0 x 100 = 1.25 per cent
CV(B) = 0.60/60.0 x 100 = 1.00 per cent
B is relatively more consistent, even though the absolute sd is 4 times larger</code></pre>
<p>Without the coefficient of variation, the comparison would favour A for the wrong reason. State the units and the ratio when answering.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Range)</strong> Find the range of 3, 8, 12, 15, 22. <em>Answer:</em> 19.</li>
<li><strong>(IQR)</strong> Find the IQR of 5, 6, 9, 11, 14, 18. <em>Answer:</em> Q1 = 6.75, Q3 = 15, IQR = 8.25.</li>
<li><strong>(SD)</strong> Find the standard deviation of 2, 4, 4, 6, 9. <em>Answer:</em> mean 5; deviations −3, −1, −1, 1, 4; squares 9, 1, 1, 1, 16 = 28; variance 5.6; sd 2.37.</li>
<li><strong>(Computational)</strong> For sum x = 60, sum x² = 800, n = 10, find the sd. <em>Answer:</em> variance = 80 − 36 = 44; sd = 6.63.</li>
<li><strong>(Frequency)</strong> x: 0, 1, 2 with f: 4, 3, 3. Find the mean. <em>Answer:</em> 9/10 = 0.9.</li>
<li><strong>(Coding)</strong> y = (x − 20)/4 has sd 2.5. Find the sd of x. <em>Answer:</em> 10.</li>
<li><strong>(Outlier)</strong> Q1 = 12, Q3 = 20, maximum 45. Is 45 an outlier? <em>Answer:</em> IQR = 8, fence = 32; yes.</li>
<li><strong>(Compare)</strong> A: mean 40, sd 5. B: mean 40, sd 12. What differs? <em>Answer:</em> same centre, different spread; B is far more variable.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Forgetting to root:</strong> the variance is in squared units; the standard deviation is its square root. Quoting the variance as the sd is a units error.</li>
<li><strong>Dividing by n or n − 1:</strong> use the convention the question implies; for a population divide by n, for a sample estimate divide by n − 1. Mixing them shifts the answer.</li>
<li><strong>Deviation sign errors:</strong> the deviations must sum to zero — if they do not, the mean was copied wrongly.</li>
<li><strong>Coding with the wrong operation:</strong> sd divides by |b|, never subtracts a; shifts do not affect spread.</li>
<li><strong>Comparing different units:</strong> an sd of 5 marks and an sd of 5 kg are not comparable; convert or use the coefficient of variation.</li>
<li><strong>Outlier fences:</strong> 1.5 × IQR beyond the quartiles, not beyond the range or the median.</li>
<li><strong>Grouped estimates:</strong> call them estimates and note that midpoints are assumed uniform within each class.</li>
<li><strong>One-sided comparison:</strong> a comparison naming only the mean earns half the marks; always add the spread and its interpretation.</li>
</ul>

<h3>Formula summary</h3>
<pre><code>range = max - min;  IQR = Q3 - Q1
variance = (sum of x^2)/n - (mean)^2
standard deviation = sqrt(variance)
coded: mean(x) = b mean(y) + a;  sd(x) = |b| sd(y)
CV = 100 sd/mean</code></pre>
<p>Learn the computational variance form rather than the deviation form: it needs one pass for the sum and one for the sum of squares, and it fails loudly when the mean is wrong because the deviations then do not sum to zero.</p>
`,
    "d7503fbf-4726-4fd0-97ad-92a64510499b": `
<h2>AS Level Mathematics: Probability</h2>
<p>Probability assigns numbers to uncertainty on a scale from 0 (impossible) to 1 (certain). This note builds the topic from zero: the basic rules, sample spaces and Venn diagrams, mutually exclusive and independent events, tree diagrams for sequences including without-replacement problems, conditional probability in two-way tables, and the counting that makes "equally likely" precise. Every rule is stated with its condition, because most probability errors are conditions applied where they do not hold.</p>

<h3>The basic rules</h3>
<pre><code>0 <= P(A) <= 1\nP(not A) = 1 - P(A)\nP(A or B) = P(A) + P(B) - P(A and B)   (the addition rule)\nP(A and B) = P(A) x P(B|A)            (the multiplication rule)\n\nmutually exclusive: P(A and B) = 0  ->  P(A or B) = P(A) + P(B)\nindependent: P(A and B) = P(A) P(B)</code></pre>
<p>The subtraction of the overlap is the whole point of the addition rule: counting A and B separately counts their intersection twice.</p>
<p><strong>Worked example.</strong> In a class of 30, 18 study French, 12 study German and 6 study both. Find the probability a student studies at least one.</p>
<pre><code>P(F or G) = 18/30 + 12/30 - 6/30 = 24/30 = 0.8\nso 6 students study neither</code></pre>

<h3>Sample spaces and equally likely outcomes</h3>
<pre><code>P(event) = (number of favourable outcomes)/(total outcomes)\nvalid only when all outcomes are equally likely</code></pre>
<p><strong>Worked example.</strong> Two fair dice are thrown. Find the probability the total is 7.</p>
<pre><code>36 equally likely pairs; totals of 7: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1)\nP = 6/36 = 1/6</code></pre>
<p><strong>Worked example 2 (systematic listing).</strong> A bag holds 2 red and 3 blue counters; two are drawn without replacement. List the sample space and find P(both red).</p>
<pre><code>P(RR) = 2/5 x 1/4 = 2/20 = 1/10\nsystematic listing confirms 20 ordered pairs, 2 of them RR</code></pre>

<h3>Venn diagrams</h3>
<p>Two overlapping circles inside a rectangle: the rectangle is the sample space, the overlap is "both", the outside is "neither". Every region should be filled so that the totals match.</p>
<pre><code>|A only| = |A| - |A and B|\n|neither| = total - |A or B|</code></pre>
<p><strong>Worked example.</strong> 40 students: 22 play football, 15 play hockey, 8 play both. Find P(plays exactly one) and P(plays neither).</p>
<pre><code>football only 14; hockey only 7; both 8; neither 40 - 29 = 11\nP(exactly one) = 21/40\nP(neither) = 11/40</code></pre>

<h3>Tree diagrams</h3>
<p>Trees handle sequences of events. Multiply along a branch for "and", add across branches for "or". The second-stage probabilities change when items are not replaced.</p>
<p><strong>Worked example (with replacement).</strong> A bag holds 3 red and 2 blue counters. Two are drawn with replacement. Find P(exactly one red).</p>
<pre><code>P(RB) = 3/5 x 2/5 = 6/25\nP(BR) = 2/5 x 3/5 = 6/25\nP(exactly one red) = 12/25</code></pre>
<p><strong>Worked example 2 (without replacement).</strong> Same bag, two draws without replacement.</p>
<pre><code>P(RB) = 3/5 x 2/4 = 6/20\nP(BR) = 2/5 x 3/4 = 6/20\nP(exactly one red) = 12/20 = 3/5\nP(both red) = 3/5 x 2/4 = 3/10</code></pre>
<p>Both branches for "exactly one" are needed: the event can happen in either order, and omitting one branch halves the answer.</p>

<h3>Conditional probability</h3>
<pre><code>P(B | A) = P(A and B)/P(A)\n\nrestricting the sample space to A is the same calculation done\nby counting within the row of a two-way table</code></pre>
<p><strong>Worked example (two-way table).</strong> 50 students: 30 pass maths, 25 pass physics, 20 pass both. Given a student passed maths, find P(they passed physics).</p>
<pre><code>P(P | M) = 20/30 = 2/3\nnot 20/50: conditioning has already restricted the sample space to the\n30 who passed maths</code></pre>
<p><strong>Worked example 2 (tree).</strong> Using the without-replacement bag, find the probability the second is red given the first was blue.</p>
<pre><code>after a blue is removed, 3 red and 1 blue remain\nP(R | B) = 3/4</code></pre>

<h3>Independence and mutual exclusivity</h3>
<p>These two ideas are constantly confused and are logically opposite: mutually exclusive events cannot happen together, while independent events do not influence each other.</p>
<pre><code>mutually exclusive: P(A and B) = 0\nindependent: P(A and B) = P(A) P(B)\n\nif two events with positive probability are mutually exclusive,\nthey are NOT independent (knowing one happened rules out the other)</code></pre>
<p><strong>Worked example.</strong> A fair coin and a fair die are thrown. Show the events are independent.</p>
<pre><code>P(head) = 1/2;  P(six) = 1/6;  P(head and six) = 1/12\n(1/2)(1/6) = 1/12, so the product rule holds: independent</code></pre>

<h3>Counting and arrangements</h3>
<p>When outcomes are equally likely but numerous, counting techniques are quicker than listing.</p>
<pre><code>product rule for choices: m x n ways for two independent choices\narrangements of n distinct items: n!\narrangements of a selection: n!/(n - r)!</code></pre>
<p><strong>Worked example.</strong> A password is 2 letters followed by 2 digits. How many passwords are possible, and what is P(all four characters are distinct)?</p>
<pre><code>total = 26 x 26 x 10 x 10 = 67600\nfirst letter has 26 options, second 25; first digit 10, second 9\nfavourable = 26 x 25 x 10 x 9 = 58500\nP = 58500/67600 = 0.865</code></pre>

<h3>Set notation and three-region problems</h3>
<p>Exam questions use set notation throughout: A ∩ B for "both", A ∪ B for "either", A′ for "not A". Read every symbol before calculating, and fill a Venn diagram innermost region first.</p>
<pre><code>P(A and B) = P(A ∩ B)
P(A or B) = P(A ∪ B)
P(not A) = P(A′)
P(A only) = P(A) - P(A ∩ B)
P(exactly one) = P(A) + P(B) - 2P(A ∩ B)</code></pre>
<p><strong>Worked example.</strong> P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2. Find P(A′ ∩ B′) and P(exactly one).</p>
<pre><code>P(A ∪ B) = 0.5 + 0.4 - 0.2 = 0.7
P(A′ ∩ B′) = 1 - 0.7 = 0.3
P(exactly one) = 0.5 + 0.4 - 2(0.2) = 0.5</code></pre>
<p><strong>Worked example 2 (three sets).</strong> 100 students: 50 study maths, 40 physics, 30 chemistry; 20 study maths and physics, 15 physics and chemistry, 10 maths and chemistry, 5 study all three. How many study none?</p>
<pre><code>union = 50 + 40 + 30 - 20 - 15 - 10 + 5 = 80
the +5 adds back the triple overlap, which the three pairwise
subtractions removed three times and the three singles added
twice too many
none = 100 - 80 = 20</code></pre>
<p>The inclusion-exclusion pattern generalises: add the singles, subtract the pairs, add back the triples. Drawing the three-circle diagram and filling from the centre outward is the safest check.</p>

<h3>Expected frequency and fairness</h3>
<p>Probability becomes practical when multiplied by the number of trials: expected frequency = probability × trials. A large gap between observed and expected frequency is evidence that the model is wrong — the basis of every fairness question.</p>
<pre><code>expected frequency = n P(event)

fair die, 600 rolls: expected sixes = 600 x 1/6 = 100
</code></pre>
<p><strong>Worked example.</strong> A die is rolled 600 times and a six appears 130 times. Comment on fairness.</p>
<pre><code>expected = 100;  observed = 130
observed exceeds expected by 30 per cent, a large gap
suggesting the die may be biased towards six, though a formal test
would be needed to judge whether the gap is within natural chance
variation</code></pre>
<p><strong>Worked example 2 (expected profit).</strong> A raffle sells 500 tickets at 2 pounds; one prize of 300 pounds. Find the organiser's expected profit.</p>
<pre><code>revenue 1000; expected payout = 300 (certain)
expected profit = 700 pounds, i.e. 1.40 pounds per ticket</code></pre>
<p>When a game's expected payout exceeds its cost the player profits in the long run; comparing expected value with price is the standard modelling question.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Complement)</strong> P(A) = 0.35. Find P(not A). <em>Answer:</em> 0.65.</li>
<li><strong>(Addition)</strong> P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2. Find P(A∪B). <em>Answer:</em> 0.7.</li>
<li><strong>(Mutually exclusive)</strong> P(A) = 0.3, P(B) = 0.4, A and B exclusive. Find P(A or B). <em>Answer:</em> 0.7.</li>
<li><strong>(Independent)</strong> P(A) = 0.5, P(B) = 0.3, independent. Find P(A and B). <em>Answer:</em> 0.15.</li>
<li><strong>(Dice)</strong> Two dice: P(total ≥ 10). <em>Answer:</em> 6/36 = 1/6.</li>
<li><strong>(Tree)</strong> 4 red, 6 blue; two without replacement: P(both blue). <em>Answer:</em> 6/10 × 5/9 = 1/3.</li>
<li><strong>(Conditional)</strong> From a two-way table, P(A|B) = 0.4 and P(B) = 0.5. Find P(A and B). <em>Answer:</em> 0.2.</li>
<li><strong>(Counting)</strong> How many ways can 3 of 5 books be arranged on a shelf? <em>Answer:</em> 5 × 4 × 3 = 60.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Adding without subtracting the overlap:</strong> P(A) + P(B) overcounts the intersection; use the full addition rule.</li>
<li><strong>Conditional versus joint:</strong> P(A|B) restricts the sample space to B; it is not P(A and B)/P(B) with the wrong denominator.</li>
<li><strong>Missing branches:</strong> "exactly one" usually has two orders; draw the tree and add both paths.</li>
<li><strong>Replacement errors:</strong> without replacement, both the numerator and the denominator change on the second draw.</li>
<li><strong>Independence assumed:</strong> the product rule needs independence, which must be justified (or follows from separate random mechanisms).</li>
<li><strong>Mutually exclusive confused with independent:</strong> exclusive events with positive probability are dependent.</li>
<li><strong>Probabilities not summing:</strong> the branches from any node must sum to 1; a total that does not is an arithmetic signal.</li>
<li><strong>Decimal rounding:</strong> keep exact fractions where asked, and do not round intermediate probabilities.</li>
</ul>

<h3>Formula summary</h3>
<pre><code>P(not A) = 1 - P(A)
P(A or B) = P(A) + P(B) - P(A and B)
P(A and B) = P(A) P(B|A);  independent: P(A) P(B)
P(B|A) = P(A and B)/P(A)
expected frequency = n P(event)</code></pre>
<p>Every one of these is a rearrangement of the multiplication rule or the addition rule. When a question stalls, ask which two of the three quantities — joint, conditional, marginal — you have, and which the question wants.</p>
`,
    "9c77bccd-7dc1-4b5a-8498-f45f5af99624": `
<h2>AS Level Mathematics: Probability Distributions</h2>
<p>A discrete random variable takes a countable set of values, each with a probability. The probability distribution is the complete list of values and probabilities, and from it come the two summaries that matter: the expected value (the long-run average) and the variance (the typical squared spread about it). This note builds the topic from zero: constructing and checking a distribution, E(X) and Var(X) from first principles, the effect of linear transformations, and the linear combinations of random variables that let you combine independent quantities with confidence.</p>

<h3>Discrete random variables</h3>
<pre><code>X takes values x1, x2, ... with probabilities p1, p2, ...\nconditions: 0 <= p_i <= 1 and the probabilities sum to 1</code></pre>
<p><strong>Worked example.</strong> A fair die is rolled and X is the score. Write the distribution and verify it.</p>
<pre><code>P(X = k) = 1/6 for k = 1..6\nsum = 6 x 1/6 = 1, so it is a valid distribution</code></pre>
<p><strong>Worked example 2 (unknown constant).</strong> P(X = 1) = k, P(X = 2) = 2k, P(X = 3) = 3k. Find k.</p>
<pre><code>k + 2k + 3k = 1  ->  6k = 1  ->  k = 1/6\nso P(X = 1) = 1/6, P(X = 2) = 1/3, P(X = 3) = 1/2</code></pre>

<h3>Expectation</h3>
<pre><code>E(X) = sum of x P(X = x)\n\nthe expected value need not be a possible value of X:\nthe mean of a die is 3.5</code></pre>
<p><strong>Worked example.</strong> Find E(X) for the die.</p>
<pre><code>E(X) = (1 + 2 + 3 + 4 + 5 + 6)/6 = 21/6 = 3.5</code></pre>
<p><strong>Worked example 2 (unequal probabilities).</strong> X takes 0, 1, 2 with probabilities 0.2, 0.5, 0.3. Find E(X).</p>
<pre><code>E(X) = 0(0.2) + 1(0.5) + 2(0.3) = 0.5 + 0.6 = 1.1</code></pre>
<p>Interpretation: over many repetitions the average outcome approaches 1.1. That long-run reading is what applied questions ("expected profit", "expected number of defects") ask for.</p>

<h3>Variance of a discrete random variable</h3>
<pre><code>Var(X) = E(X^2) - [E(X)]^2\nwhere E(X^2) = sum of x^2 P(X = x)\n\nstandard deviation = sqrt(Var(X))</code></pre>
<p><strong>Worked example.</strong> Find Var(X) for the die.</p>
<pre><code>E(X^2) = (1 + 4 + 9 + 16 + 25 + 36)/6 = 91/6 = 15.167\nVar(X) = 15.167 - 12.25 = 2.917\nsd = 1.708</code></pre>
<p><strong>Worked example 2.</strong> For X = 0, 1, 2 with probabilities 0.2, 0.5, 0.3, find Var(X).</p>
<pre><code>E(X) = 1.1\nE(X^2) = 0 + 0.5 + 4(0.3) = 1.7\nVar(X) = 1.7 - 1.21 = 0.49\nsd = 0.7</code></pre>

<h3>Linear transformations</h3>
<pre><code>E(aX + b) = a E(X) + b\nVar(aX + b) = a^2 Var(X)\n\nsd(aX + b) = |a| sd(X)</code></pre>
<p>The asymmetry is the key idea: adding a constant shifts every value and so shifts the mean but leaves the spread unchanged; multiplying by a scales the mean by a and the spread by |a|, so the variance scales by a².</p>
<p><strong>Worked example.</strong> E(X) = 5, Var(X) = 4. Find E(3X + 2) and Var(3X + 2).</p>
<pre><code>E = 3(5) + 2 = 17\nVar = 9(4) = 36;  sd = 6</code></pre>
<p><strong>Worked example 2 (finding the transformation).</strong> E(Y) = 20 and Var(Y) = 25, where Y = aX + b, E(X) = 4 and Var(X) = 1. Find a and b.</p>
<pre><code>Var: a^2 (1) = 25  ->  a = 5 or -5\nif a = 5: 20 = 5(4) + b  ->  b = 0\nif a = -5: 20 = -20 + b  ->  b = 40\nboth are valid; the sign of a is fixed by context (a positive\nscaling is usually implied)</code></pre>

<h3>Linear combinations of random variables</h3>
<pre><code>E(aX + bY) = a E(X) + b E(Y)          (always, no independence needed)\nVar(aX + bY) = a^2 Var(X) + b^2 Var(Y)   (only if X, Y independent)\nVar(aX - bY) = a^2 Var(X) + b^2 Var(Y)   (the variances still add)</code></pre>
<p>The minus sign is where most marks are lost: subtracting random variables adds their variances, because the uncertainty compounds whichever direction the values move.</p>
<p><strong>Worked example.</strong> X and Y are independent with E(X) = 10, Var(X) = 9, E(Y) = 4, Var(Y) = 4. Find E(X − Y) and Var(X − Y).</p>
<pre><code>E(X - Y) = 10 - 4 = 6\nVar(X - Y) = 9 + 4 = 13   (not 9 - 4)\nsd = 3.606</code></pre>
<p><strong>Worked example 2 (three variables).</strong> Independent X, Y, Z with variances 2, 3, 5. Find Var(2X + 3Y − Z).</p>
<pre><code>= 4(2) + 9(3) + 1(5) = 8 + 27 + 5 = 40</code></pre>
<p><strong>Worked example 3 (total of identical variables).</strong> A fair die is rolled twice; T is the total. Find E(T) and Var(T).</p>
<pre><code>each roll: E = 3.5, Var = 35/12 = 2.917\nE(T) = 7;  Var(T) = 2 x 2.917 = 5.833\nsd(T) = 2.415  (the spread of a total grows, but by sqrt(2), not 2)</code></pre>

<h3>Discrete uniform distribution</h3>
<pre><code>X uniform on 1..n: P(X = k) = 1/n\nE(X) = (n + 1)/2\nVar(X) = (n^2 - 1)/12</code></pre>
<p><strong>Worked example.</strong> X is uniform on 1 to 10. Find E(X) and Var(X).</p>
<pre><code>E(X) = 11/2 = 5.5\nVar(X) = (100 - 1)/12 = 8.25</code></pre>

<h3>Cumulative distribution functions</h3>
<p>The cumulative distribution function F(x) gives the probability that X is at most x. It is a step function for a discrete variable: constant between values, jumping at each value by that value's probability.</p>
<pre><code>F(x) = P(X <= x) = sum of P(X = k) for k <= x

P(X = k) = F(k) - F(k - 1)
P(a < X <= b) = F(b) - F(a)</code></pre>
<p><strong>Worked example.</strong> X takes 1, 2, 3 with probabilities 0.2, 0.5, 0.3. Write F(x) and use it to find P(X &gt; 1).</p>
<pre><code>F(1) = 0.2;  F(2) = 0.7;  F(3) = 1
P(X > 1) = 1 - F(1) = 0.8  (equivalently 0.5 + 0.3)</code></pre>
<p><strong>Worked example 2 (recovering probabilities).</strong> F(2) = 0.35 and F(3) = 0.8. Find P(X = 3).</p>
<pre><code>P(X = 3) = F(3) - F(2) = 0.8 - 0.35 = 0.45</code></pre>
<p>Reading F correctly requires attention to the inequality: P(X &lt; 3) = F(2) for a discrete variable, while P(X ≤ 3) = F(3). One unit of difference changes the answer.</p>

<h3>Expectation from a table and applied profit</h3>
<p>When the distribution is given as a table, the calculation is a single weighted total; when it is described in words, the table must be built first.</p>
<p><strong>Worked example.</strong> A fair coin is tossed three times and X counts the heads. Find E(X) and Var(X).</p>
<pre><code>X ~ Binomial(3, 1/2) in effect: probabilities 1/8, 3/8, 3/8, 1/8 for 0..3
E(X) = 0 + 3/8 + 6/8 + 3/8 = 12/8 = 1.5
E(X^2) = 0 + 3/8 + 12/8 + 9/8 = 24/8 = 3
Var(X) = 3 - 2.25 = 0.75</code></pre>
<p><strong>Worked example 2 (profit).</strong> A stall pays 4 pounds to play a game that returns 0, 5 or 20 pounds with probabilities 0.6, 0.3 and 0.1. Find the expected profit per game and whether the stall makes money.</p>
<pre><code>E(return) = 0 + 1.5 + 2.0 = 3.5
profit = return - 4, so E(profit) = 3.5 - 4 = -0.5
players lose 50 pence per game on average, so the stall profits</code></pre>
<p>The transformation rule does the work: E(X − c) = E(X) − c. State the interpretation, not just the number.</p>

<h3>Why variances add for independent variables</h3>
<p>For independent X and Y, the variance of a sum is the sum of the variances. The proof rests on the fact that independence makes E(XY) = E(X)E(Y), so the cross term in the expansion vanishes:</p>
<pre><code>Var(X + Y) = E[(X + Y)^2] - [E(X + Y)]^2
           = E(X^2) + 2E(XY) + E(Y^2) - [E(X)]^2 - 2E(X)E(Y) - [E(Y)]^2
independence: E(XY) = E(X)E(Y), so the cross terms cancel
           = Var(X) + Var(Y)</code></pre>
<p>For the difference, the same expansion gives Var(X − Y) = Var(X) + Var(Y): the cross term is −2E(XY) + 2E(X)E(Y), which also vanishes. The intuition is that independent errors cannot cancel — a positive error in one is just as likely to meet a positive or negative error in the other, so the uncertainties compound.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Valid distribution)</strong> P(X = 1) = 0.3, P(X = 2) = 0.4, P(X = 3) = k. Find k. <em>Answer:</em> 0.3.</li>
<li><strong>(E)</strong> X = 1, 3, 5 with probabilities 0.2, 0.5, 0.3. Find E(X). <em>Answer:</em> 0.2 + 1.5 + 1.5 = 3.2.</li>
<li><strong>(Var)</strong> For the same X, find Var(X). <em>Answer:</em> E(X²) = 0.2 + 4.5 + 7.5 = 12.2; Var = 12.2 − 10.24 = 1.96.</li>
<li><strong>(Transform)</strong> E(X) = 6, Var(X) = 5. Find E(4X − 1) and Var(4X − 1). <em>Answer:</em> 23 and 80.</li>
<li><strong>(Combination)</strong> Independent X, Y: Var(X) = 6, Var(Y) = 8. Find Var(2X + Y). <em>Answer:</em> 24 + 8 = 32.</li>
<li><strong>(Combination difference)</strong> Same X, Y: Var(X − Y). <em>Answer:</em> 6 + 8 = 14.</li>
<li><strong>(Uniform)</strong> X uniform on 1..6. Find Var(X). <em>Answer:</em> (36 − 1)/12 = 2.917.</li>
<li><strong>(Applied)</strong> A game pays X with E(X) = 2 and costs 3 to play. Find the expected profit. <em>Answer:</em> E(X − 3) = −1, a loss of 1 per game.</em></li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Var(aX) = a Var(X):</strong> wrong — the variance scales by a², the standard deviation by |a|.</li>
<li><strong>Subtracting variances:</strong> Var(X − Y) = Var(X) + Var(Y) for independent variables; subtraction never reduces uncertainty.</li>
<li><strong>Assuming independence:</strong> the variance-addition rule requires it; the expectation rule does not.</li>
<li><strong>Using E(X²) as [E(X)]²:</strong> they differ by the variance; compute E(X²) from the distribution.</li>
<li><strong>Probabilities not summing to 1:</strong> the first check on any distribution, and often the way to find an unknown constant.</li>
<li><strong>Expectation as a possible value:</strong> E(X) need not be attainable (3.5 on a die); say "on average over many trials".</li>
<li><strong>Standard deviation units:</strong> the variance is in squared units; compare and quote the sd.</li>
<li><strong>Negative scaling:</strong> if a is negative, E flips sign and sd uses |a|; forgetting the modulus produces a negative standard deviation.</li>
</ul>

<h3>Formula summary</h3>
<pre><code>E(X) = sum of x P(X = x);  E(X^2) = sum of x^2 P(X = x)
Var(X) = E(X^2) - [E(X)]^2
E(aX + b) = a E(X) + b;  Var(aX + b) = a^2 Var(X)
E(aX + bY) = a E(X) + b E(Y)
Var(aX + bY) = a^2 Var(X) + b^2 Var(Y)   (independent)
F(x) = P(X <= x);  P(X = k) = F(k) - F(k - 1)</code></pre>
<p>Two conditions separate the whole topic: expectations always combine linearly, variances combine linearly only when the variables are independent — and then always with plus signs, whatever the signs in front of the variables. Write the condition before applying the variance rule; it is worth a mark on its own and prevents the commonest mistake in the topic.</p>
`,
  },
};
