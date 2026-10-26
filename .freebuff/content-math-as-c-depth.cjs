// Mathematics AS notes, deepened to the depth bar — batch C:
// Exponentials and Logarithms (1.4), Proof (1.1), and the data-handling
// note Numerical Measures of Central Tendency (5.1).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-as-c-depth.cjs > .freebuff-tmp/math-as-c.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-as-c.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-as-c.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "7b88a182-63f2-490e-9fe3-af5bde499827": "AS Level Mathematics: Exponentials and Logarithms",
    "1da2d645-3b35-4626-9a02-59685e70c60a": "AS Level Mathematics: Proof",
    "2c8a9240-8b25-4768-a26d-9bdc7fca0a89": "AS Level Mathematics: Numerical Measures of Central Tendency",
  },
  rows: {
    "7b88a182-63f2-490e-9fe3-af5bde499827": `
<h2>AS Level Mathematics: Exponentials and Logarithms</h2>
<p>Exponentials describe growth and decay — populations, investments, radioactive isotopes, cooling cups of tea — where the change is proportional to the amount present. Logarithms are their inverses: they turn multiplication into addition and, crucially, let you solve equations where the unknown sits in the exponent. This note builds the topic from zero: the meaning of a logarithm, the three laws with derivations, solving exponential and logarithmic equations including quadratics in disguise, the graph properties and transformations, and the applied growth/decay models.</p>

<h3>What a logarithm is</h3>
<pre><code>log_a(x) = n  means  a^n = x\n\ncommon log: log x = log_10 x\nnatural log: ln x = log_e x,  e = 2.71828...</code></pre>
<p>The logarithm answers "to what power must I raise the base to get this number?" So log₂8 = 3 because 2³ = 8, and log₅(1/25) = −2 because 5⁻² = 1/25. Two identities follow immediately and are always true:</p>
<pre><code>log_a(a) = 1\nlog_a(1) = 0\na^(log_a x) = x   and   log_a(a^x) = x</code></pre>
<p><strong>Worked example.</strong> Evaluate log₃81, log₂(1/8) and ln 1.</p>
<pre><code>3^4 = 81  ->  log_3 81 = 4\n2^-3 = 1/8  ->  log_2(1/8) = -3\nanything to the power 0 is 1  ->  ln 1 = 0</code></pre>

<h3>The three laws of logarithms</h3>
<pre><code>product:   log(xy) = log x + log y\nquotient:  log(x/y) = log x - log y\npower:     log(x^n) = n log x\n\nconsequences: log(1/x) = -log x;  log(sqrt x) = (1/2)log x</code></pre>
<p><strong>Why they work.</strong> Write x = a^m and y = a^n, so log x = m and log y = n. Then xy = a^(m+n), so log(xy) = m + n = log x + log y. The quotient law follows from a^(m−n) and the power law from (a^m)^n = a^(mn). Each law is a restatement of an index law, which is why logarithms convert products into sums.</p>
<p><strong>Worked example 1 (combine).</strong> Write 2 log 3 + log 4 − log 6 as a single logarithm.</p>
<pre><code>2 log 3 = log 9\nlog 9 + log 4 = log 36\nlog 36 - log 6 = log 6</code></pre>
<p><strong>Worked example 2 (split).</strong> Express log(x³y/√z) in terms of log x, log y and log z.</p>
<pre><code>= 3 log x + log y - (1/2) log z</code></pre>
<p><strong>Worked example 3 (solve).</strong> Solve log₂x + log₂(x − 2) = 3.</p>
<pre><code>combine: log_2[x(x - 2)] = 3\nx(x - 2) = 2^3 = 8\nx^2 - 2x - 8 = 0  ->  (x - 4)(x + 2) = 0\nx = 4 or x = -2;  reject x = -2 because log of a negative is undefined\nx = 4</code></pre>
<p>Rejecting invalid roots is compulsory: a logarithm only accepts a positive argument, so always check each answer against the original equation.</p>

<h3>Solving exponential equations</h3>
<p>When the unknown is in the exponent, take logs of both sides and use the power law to bring it down.</p>
<p><strong>Worked example 1.</strong> Solve 3^x = 20.</p>
<pre><code>take logs: x log 3 = log 20\nx = log 20 / log 3 = 1.301/0.4771 = 2.73</code></pre>
<p><strong>Worked example 2 (different bases).</strong> Solve 5^(2x−1) = 7^(x+1).</p>
<pre><code>(2x - 1) log 5 = (x + 1) log 7\n2x log 5 - log 5 = x log 7 + log 7\nx(2 log 5 - log 7) = log 7 + log 5\nx = (log 7 + log 5)/(2 log 5 - log 7)\n  = (0.845 + 0.699)/(1.398 - 0.845) = 1.544/0.553 = 2.79</code></pre>
<p><strong>Worked example 3 (quadratic in disguise).</strong> Solve 2^(2x) − 5(2^x) + 4 = 0.</p>
<pre><code>let y = 2^x:  y^2 - 5y + 4 = 0  ->  (y - 1)(y - 4) = 0\ny = 1  ->  2^x = 1  ->  x = 0\ny = 4  ->  2^x = 4  ->  x = 2</code></pre>
<p>The substitution trick is the standard route for any equation where one power is double another: put y = a^x and solve the quadratic, then convert back.</p>

<h3>Graphs of exponential and logarithmic functions</h3>
<table border="1" cellpadding="6">
<tr><th>Function</th><th>Domain</th><th>Range</th><th>Key points</th></tr>
<tr><td>y = e^x</td><td>all real x</td><td>y &gt; 0</td><td>(0, 1); always increasing; asymptote y = 0</td></tr>
<tr><td>y = e^(−x)</td><td>all real x</td><td>y &gt; 0</td><td>(0, 1); always decreasing; decay</td></tr>
<tr><td>y = ln x</td><td>x &gt; 0</td><td>all real y</td><td>(1, 0); increasing; asymptote x = 0</td></tr>
</table>
<p>y = ln x is the reflection of y = e^x in the line y = x, because they are inverse functions. That reflection explains the domain and range swap and the asymptote turning from horizontal to vertical.</p>
<p><strong>Worked example.</strong> Sketch y = e^(x−2) + 1, stating the asymptote and intercepts.</p>
<pre><code>translation 2 right, 1 up\nasymptote y = 1 (was y = 0)\ny-intercept: e^-2 + 1 = 0.135 + 1 = 1.135\nno x-intercept (the curve stays above y = 1)</code></pre>

<h3>Growth and decay models</h3>
<pre><code>exponential model: N = N_0 e^(kt)\n  k > 0 growth;  k < 0 decay\nhalf-life: time for N to halve = ln 2 / |k| (decay)\ndoubling time = ln 2 / k (growth)</code></pre>
<p><strong>Worked example (decay).</strong> A radioactive sample decays as N = 500e^(−0.02t) with t in years. Find the initial amount, the amount after 50 years, and the half-life.</p>
<pre><code>t = 0: N = 500\nat t = 50: 500e^-1 = 500 x 0.3679 = 184\nhalf-life: 500e^(-0.02t) = 250  ->  e^(-0.02t) = 0.5\n-0.02t = ln 0.5 = -0.693  ->  t = 34.7 years</code></pre>
<p><strong>Worked example 2 (growth).</strong> Bacteria grow as N = 200e^(0.15t), t in hours. When does the population reach 1000?</p>
<pre><code>200e^(0.15t) = 1000  ->  e^(0.15t) = 5\n0.15t = ln 5 = 1.609  ->  t = 10.7 hours</code></pre>

<h3>Logarithmic scales in context</h3>
<p>Some quantities span so many orders of magnitude that a logarithmic scale is used: pH for acidity, the Richter scale for earthquakes, decibels for sound. A change of 1 on the Richter scale means 10 times the amplitude, so an increase of 3 means 10³ = 1000 times.</p>
<p><strong>Worked example.</strong> Two earthquakes differ by 2.4 on the Richter scale. How many times larger is the amplitude of the stronger?</p>
<pre><code>difference 2.4 in log_10  ->  10^2.4 = 251 times</code></pre>

<h3>Change of base and log-linearisation</h3>
<p>Calculators offer base 10 and base e only, so any other base is converted with the change-of-base formula. The same formula turns a power law into a straight line, which is how experimental data is tested for exponential behaviour.</p>
<pre><code>change of base: log_a(x) = log_b(x)/log_b(a)
so log_2(7) = ln 7 / ln 2 = log 7 / log 2 = 2.807

if y = a x^n then log y = log a + n log x  (straight line in log-log)
if y = a b^x then log y = log a + x log b  (straight line in log-x)</code></pre>
<p><strong>Worked example 1.</strong> Evaluate log_5(30).</p>
<pre><code>log 30 / log 5 = 1.477/0.699 = 2.113</code></pre>
<p><strong>Worked example 2 (log-linearisation).</strong> Data gives a straight line when log y is plotted against x, with gradient 0.3 and intercept 1.4. Find the model connecting y and x.</p>
<pre><code>log y = 1.4 + 0.3x
so y = 10^1.4 x 10^(0.3x) = 25.1 x 2.00^x
an exponential growth model with a = 25.1 and b = 2.0</code></pre>
<p><strong>Worked example 3 (inequality).</strong> Solve 2^x &lt; 100.</p>
<pre><code>take logs (base 2 is increasing, so the inequality is preserved)
x &lt; log_2 100 = log 100/log 2 = 6.64</code></pre>
<p>Taking logs of both sides is safe for any base greater than 1 because the log function is increasing; a base between 0 and 1 would reverse the inequality, which never arises in these models.</p>

<h3>Rewriting any exponential in base e</h3>
<p>Any exponential a^x can be written as e^(kx), because a = e^(ln a). This is why every growth model in the syllabus uses e: the base is absorbed into the constant.</p>
<pre><code>a^x = e^(x ln a)
so 2^x = e^(0.693x);  5^x = e^(1.609x);  0.8^x = e^(-0.223x)</code></pre>
<p><strong>Worked example.</strong> Express y = 300(1.04)^t in the form y = 300e^(kt), and state the annual percentage rate it represents.</p>
<pre><code>1.04 = e^k  ->  k = ln 1.04 = 0.0392
y = 300e^(0.0392t)
the rate is 3.92 per year in continuous-compounding form, while the
annual multiplier is still 1.04 (4 per cent per year)</code></pre>
<p><strong>Worked example 2.</strong> A model is N = 80e^(0.25t). Rewrite it as N = 80b^t and find the percentage growth per unit time.</p>
<pre><code>b = e^0.25 = 1.284
N = 80(1.284)^t, so growth is 28.4 per cent per unit time</code></pre>
<p>The two forms describe the same curve; the e-form is convenient for calculus, the b-form for reading off a percentage rate. Converting between them is a standard exam demand.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Evaluate)</strong> Find log₄64. <em>Answer:</em> 3, since 4³ = 64.</li>
<li><strong>(Laws)</strong> Simplify log 8 + log 5 − log 2. <em>Answer:</em> log(40/2) = log 20.</li>
<li><strong>(Solve log)</strong> Solve log₃x = 2. <em>Answer:</em> x = 3² = 9.</li>
<li><strong>(Solve exponential)</strong> Solve 2^x = 50. <em>Answer:</em> x = log 50/log 2 = 1.699/0.301 = 5.64.</li>
<li><strong>(Quadratic)</strong> Solve e^(2x) − 3e^x + 2 = 0. <em>Answer:</em> y = e^x → y² − 3y + 2 = 0 → y = 1 or 2 → x = 0 or ln 2 = 0.693.</li>
<li><strong>(Combine)</strong> Write 3 ln 2 − ln 4 as a single logarithm. <em>Answer:</em> ln 8 − ln 4 = ln 2.</li>
<li><strong>(Inverse)</strong> Find the inverse of f(x) = e^(3x). <em>Answer:</em> y = e^(3x) → ln y = 3x → f⁻¹(x) = (ln x)/3.</li>
<li><strong>(Model)</strong> A car's value is V = 15000e^(−0.2t). Find its value after 4 years. <em>Answer:</em> 15000e^(−0.8) = 15000 × 0.4493 = 6740 pounds.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>log(x + y) is not log x + log y:</strong> the product law applies to products only; there is no law for the log of a sum.</li>
<li><strong>Forgetting the domain:</strong> logs need a positive argument. Roots that make an argument negative or zero are rejected, explicitly.</li>
<li><strong>Dividing by log:</strong> log 20/log 3 is not log(20/3); the quotient law is for two logs, not a quotient of logs.</li>
<li><strong>Base consistency:</strong> mixing log₁₀ and ln inside one equation is an error; convert first (ln x = log x / log e).</li>
<li><strong>Power law misuse:</strong> (log x)² is not 2 log x. Only log(x²) = 2 log x.</li>
<li><strong>Quadratic substitution:</strong> after solving for y, the answer is x — convert back and solve the exponential equation.</li>
<li><strong>Half-life sign:</strong> with a decay model k is negative, so half-life = ln 2/|k|; dropping the modulus gives a negative time.</li>
<li><strong>Sketch asymptotes:</strong> state the asymptote after transformations; e^x + c has asymptote y = c, not y = 0.</li>
</ul>
`,
    "1da2d645-3b35-4626-9a02-59685e70c60a": `
<h2>AS Level Mathematics: Proof</h2>
<p>Proof is the difference between "it works for these numbers" and "it must work for all". AS proof covers four methods — direct proof, proof by exhaustion, proof by counter-example (disproof) and proof by deduction from definitions — plus the algebra of odd, even and consecutive numbers, and completing the square as a tool for inequalities. This note builds each method from zero with templates, full worked examples and the precise wording examiners expect, because proof marks are awarded for structure as much as for algebra.</p>

<h3>The language of proof</h3>
<table border="1" cellpadding="6">
<tr><th>Term</th><th>Meaning</th></tr>
<tr><td>Conjecture</td><td>A statement believed true but not yet proved</td></tr>
<tr><td>Theorem</td><td>A statement that has been proved</td></tr>
<tr><td>Proof</td><td>A logical argument from known facts to the conclusion</td></tr>
<tr><td>Disproof</td><td>One counter-example that makes the statement false</td></tr>
<tr><td>Exhaustion</td><td>Checking every possible case</td></tr>
</table>
<p>A single counter-example disproves a "for all" statement; no number of examples proves one. That asymmetry is the heart of the topic and the first thing examiners test.</p>

<h3>Odd, even and consecutive numbers</h3>
<pre><code>even: 2n           (n integer)\nodd:  2n + 1       (or 2n - 1)\nconsecutive integers: n, n + 1, n + 2\nconsecutive even: 2n, 2n + 2\nconsecutive odd: 2n + 1, 2n + 3</code></pre>
<p>These forms are not optional decoration: a proof about parity must start from them, because "let the number be x" proves nothing about oddness.</p>
<p><strong>Worked example 1.</strong> Prove that the sum of two consecutive odd numbers is a multiple of 4.</p>
<pre><code>let the numbers be 2n + 1 and 2n + 3\nsum = 4n + 4 = 4(n + 1)\nwhich is a multiple of 4 for every integer n</code></pre>
<p><strong>Worked example 2.</strong> Prove that the product of two odd numbers is odd.</p>
<pre><code>let them be 2m + 1 and 2n + 1\nproduct = 4mn + 2m + 2n + 1 = 2(2mn + m + n) + 1\nof the form 2k + 1 with k = 2mn + m + n, an integer\nso the product is odd</code></pre>
<p><strong>Worked example 3.</strong> Prove that the difference between the squares of consecutive integers is the sum of the integers.</p>
<pre><code>(n + 1)^2 - n^2 = n^2 + 2n + 1 - n^2 = 2n + 1 = n + (n + 1)</code></pre>

<h3>Direct proof</h3>
<p>Start from the definitions, manipulate algebraically, and arrive at the required form. Write the conclusion explicitly ("hence ... as required") so the argument is closed.</p>
<p><strong>Worked example.</strong> Prove that if x is odd then x² is odd.</p>
<pre><code>let x = 2n + 1\nx^2 = 4n^2 + 4n + 1 = 2(2n^2 + 2n) + 1\nwhich is 2k + 1, hence odd</code></pre>
<p><strong>Worked example 2.</strong> Prove that the sum of any three consecutive integers is divisible by 3.</p>
<pre><code>n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)\nwhich is divisible by 3</code></pre>

<h3>Proof by exhaustion</h3>
<p>When the domain is small enough to list, check every case. The proof is only complete if the list is genuinely exhaustive — state why nothing is missed.</p>
<p><strong>Worked example.</strong> Prove that every prime between 20 and 30 is the sum of two square numbers or state otherwise.</p>
<pre><code>primes in the range: 23, 29\n23 = 9 + 14 (not two squares); 25 + (-2)? no\n23 = 4 + 19? no; squares below 23: 1, 4, 9, 16\n1 + 16 = 17; 4 + 16 = 20; 9 + 16 = 25; 4 + 9 = 13\nso 23 is not a sum of two squares; 29: 4 + 25 = 29  yes\nconclusion: the conjecture fails for 23; the true statement is\n"29 is the only prime between 20 and 30 expressible as a sum of two squares"</code></pre>
<p><strong>Worked example 2.</strong> Prove that n² + n is even for all integers n by exhaustion of the two parity cases.</p>
<pre><code>case 1: n even, n = 2k -> n^2 + n = 4k^2 + 2k = 2(2k^2 + k), even\ncase 2: n odd, n = 2k + 1 -> 4k^2 + 4k + 1 + 2k + 1 = 4k^2 + 6k + 2\n        = 2(2k^2 + 3k + 1), even\nboth cases covered, so the statement holds for all integers</code></pre>
<p>The two-case parity split is exhaustion in its most common exam form: every integer is even or odd, so the cases exhaust the domain.</p>

<h3>Disproof by counter-example</h3>
<p>To disprove a "for all" claim, produce one case where it fails and show the arithmetic. One is enough; a hundred confirming cases prove nothing.</p>
<p><strong>Worked example.</strong> Disprove: "if n² is a multiple of 4 then n is a multiple of 4."</p>
<pre><code>try n = 6: n^2 = 36, a multiple of 4? 36/4 = 9, yes\nbut 6 is not a multiple of 4\nso n = 6 is a counter-example and the statement is false</code></pre>
<p><strong>Worked example 2.</strong> Disprove: "n² − n + 11 is prime for all positive integers n."</p>
<pre><code>n = 11: 121 - 11 + 11 = 121 = 11^2, not prime\ncounter-example n = 11 disproves the conjecture</code></pre>

<h3>Proof by completing the square</h3>
<p>Inequalities about quadratics are proved by completing the square: a squared term is never negative, so the expression's minimum (or maximum) is visible.</p>
<pre><code>x^2 + bx + c = (x + b/2)^2 + c - b^2/4\nsince (x + b/2)^2 >= 0, the minimum value is c - b^2/4</code></pre>
<p><strong>Worked example 1.</strong> Prove that x² + 4x + 7 &gt; 0 for all real x.</p>
<pre><code>x^2 + 4x + 7 = (x + 2)^2 + 3\n(x + 2)^2 >= 0, so the expression is at least 3 > 0</code></pre>
<p><strong>Worked example 2.</strong> Prove that 2x − x² ≤ 1 for all real x.</p>
<pre><code>2x - x^2 = -(x^2 - 2x) = -[(x - 1)^2 - 1] = 1 - (x - 1)^2\nsince (x - 1)^2 >= 0, this is at most 1</code></pre>
<p><strong>Worked example 3.</strong> Find the values of k for which x² + kx + 9 &gt; 0 for all x.</p>
<pre><code>completing the square: (x + k/2)^2 + 9 - k^2/4 > 0 for all x\nrequires the constant term positive: 9 - k^2/4 > 0\nk^2 < 36  ->  -6 < k < 6</code></pre>
<p>That last question is the discriminant argument in disguise: "always positive" means no real roots, so b² − 4ac &lt; 0. Either method earns the marks; the completing-the-square route often reads more clearly.</p>

<h3>Divisibility and multiples</h3>
<p>A statement of the form "is a multiple of k" is proved by putting the expression in the shape k times an integer. Do the algebra first, then identify the factor; never assume the factor exists.</p>
<p><strong>Worked example.</strong> Prove that for any integer n, n(n + 1)(n + 2) is a multiple of 6.</p>
<pre><code>among any three consecutive integers there is at least one even
number and exactly one multiple of 3
so the product contains a factor 2 and a factor 3
since 2 and 3 are coprime, the product is divisible by 6</code></pre>
<p><strong>Worked example 2.</strong> Prove that 3^(2n) - 1 is a multiple of 8 for positive integers n.</p>
<pre><code>3^(2n) - 1 = 9^n - 1 = (9 - 1)(9^(n-1) + ... + 1)
= 8 x (a positive integer), so divisible by 8</code></pre>
<p><strong>Worked example 3.</strong> Prove that the sum of five consecutive integers is always divisible by 5.</p>
<pre><code>n + (n+1) + (n+2) + (n+3) + (n+4) = 5n + 10 = 5(n + 2)</code></pre>

<h3>Proof by contradiction: the irrationality of root 2</h3>
<p>Contradiction assumes the statement is false, derives an impossibility, and concludes the statement is true. The classic example is examinable and worth knowing in full.</p>
<pre><code>assume sqrt(2) is rational: sqrt(2) = p/q in lowest terms, p, q integers
square: 2 = p^2/q^2  ->  p^2 = 2q^2
so p^2 is even  ->  p is even (a square is even only if its root is)
write p = 2k: 4k^2 = 2q^2  ->  q^2 = 2k^2
so q^2 is even  ->  q is even
but p and q cannot both be even if p/q is in lowest terms
contradiction  ->  sqrt(2) is irrational</code></pre>
<p>The two logical hinges are that an even square implies an even root, and that "lowest terms" forbids a common factor of 2. State both; the marks live in them.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Parity)</strong> Prove that the sum of an odd and an even number is odd. <em>Answer:</em> (2m + 1) + 2n = 2(m + n) + 1, which is odd.</li>
<li><strong>(Consecutive)</strong> Prove that the product of two consecutive integers is even. <em>Answer:</em> n(n + 1): one of n, n + 1 is even, so the product is even.</li>
<li><strong>(Direct)</strong> Prove that (3n + 1)² − 1 is a multiple of 3. <em>Answer:</em> 9n² + 6n = 3(3n² + 2n).</li>
<li><strong>(Counter-example)</strong> Disprove "all primes are odd". <em>Answer:</em> 2 is prime and even.</li>
<li><strong>(Counter-example)</strong> Disprove "n² + 1 is prime for all n". <em>Answer:</em> n = 3 gives 10, not prime.</li>
<li><strong>(Completing the square)</strong> Prove x² − 6x + 10 &gt; 0. <em>Answer:</em> (x − 3)² + 1 ≥ 1 &gt; 0.</li>
<li><strong>(Exhaustion)</strong> Prove that n³ − n is divisible by 6 for n = 1, 2, 3, 4. <em>Answer:</em> 0, 6, 24, 60 — each divisible by 6 (a finite check is exhaustion).</li>
<li><strong>(Discriminant)</strong> Find k so that x² + 2kx + 4 = 0 has no real roots. <em>Answer:</em> 4k² − 16 &lt; 0 → k² &lt; 4 → −2 &lt; k &lt; 2.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Proving by example:</strong> two or three numbers never prove a "for all" statement; the argument must use algebra with a general n.</li>
<li><strong>Not defining the variable:</strong> "let n be an integer" and "let n be odd, so n = 2k + 1" are required openings; an undefined x cannot carry a parity argument.</li>
<li><strong>Assuming what you must prove:</strong> working backwards from the result to a true statement does not prove the original unless every step is reversible — say so if it is.</li>
<li><strong>Counter-example not checked:</strong> show the arithmetic that makes the case fail; asserting "n = 6 fails" without the calculation loses the mark.</li>
<li><strong>Incomplete exhaustion:</strong> if the domain has cases you did not cover (e.g. negatives, zero), the proof is incomplete — state the cases and why they exhaust.</li>
<li><strong>Completing the square sign:</strong> a negative leading coefficient flips the inequality; factor out the minus first.</li>
<li><strong>Conclusion missing:</strong> close with "hence ... as required"; an unclosed argument reads as unfinished.</li>
<li><strong>Notation:</strong> write ≡ for identities and ⇒ for implications correctly; mixing them muddles the logic examiners follow.</li>
</ul>
`,
    "2c8a9240-8b25-4768-a26d-9bdc7fca0a89": `
<h2>AS Level Mathematics: Numerical Measures of Central Tendency</h2>
<p>Statistics begins with describing data: where its centre lies and how it is spread. This note covers representation of data — tables, histograms, cumulative frequency curves and box plots — and the three averages with their strengths, plus the quartiles and interquartile range that measure spread robustly. The emphasis throughout is on choosing the right representation for the data type and reading values off a graph with the precision the marks require.</p>

<h3>Types of data and the right representation</h3>
<table border="1" cellpadding="6">
<tr><th>Data type</th><th>Meaning</th><th>Useful displays</th></tr>
<tr><td>Qualitative</td><td>Categories, no order</td><td>Bar chart, pie chart</td></tr>
<tr><td>Discrete</td><td>Countable values</td><td>Bar chart, stem-and-leaf, histogram of counts</td></tr>
<tr><td>Continuous</td><td>Any value in a range</td><td>Histogram, cumulative frequency, box plot</td></tr>
</table>
<p>A histogram is the display for continuous data grouped into classes; unlike a bar chart, the bars touch because the variable is continuous. For unequal class widths the frequency density is plotted, not the frequency:</p>
<pre><code>frequency density = frequency / class width\narea of a bar = frequency (so areas are comparable)</code></pre>
<p><strong>Worked example.</strong> A class of width 10 contains 25 items; another of width 20 contains 30. Find the frequency densities.</p>
<pre><code>25/10 = 2.5;  30/20 = 1.5\nThe narrower class is denser even though it holds fewer items.</code></pre>

<h3>The three averages</h3>
<table border="1" cellpadding="6">
<tr><th>Average</th><th>How to find</th><th>Strength</th><th>Weakness</th></tr>
<tr><td>Mean</td><td>Sum ÷ count</td><td>Uses every value</td><td>Dragged by outliers</td></tr>
<tr><td>Median</td><td>Middle of ordered data</td><td>Resistant to outliers</td><td>Ignores exact values at the ends</td></tr>
<tr><td>Mode</td><td>Most frequent value</td><td>Works for categories</td><td>May not exist or be unique</td></tr>
</table>
<p><strong>Worked example.</strong> Find all three averages of 4, 7, 7, 9, 13.</p>
<pre><code>mean = 40/5 = 8\nmedian = 7 (third of five ordered values)\nmode = 7</code></pre>
<p><strong>Worked example 2 (grouped mean).</strong> Estimate the mean of the grouped data: 0–10 (4), 10–20 (9), 20–30 (7).</p>
<pre><code>use midpoints 5, 15, 25\nsum = 4(5) + 9(15) + 7(25) = 20 + 135 + 175 = 330\ntotal frequency = 20\nestimated mean = 330/20 = 16.5</code></pre>
<p>Grouped means are estimates: the midpoint stands in for every value in its class, so the answer is only as good as the grouping.</p>

<h3>Median, quartiles and the interquartile range</h3>
<pre><code>median position (n data values) = (n + 1)/2\nlower quartile Q1 at position (n + 1)/4\nupper quartile Q3 at position 3(n + 1)/4\ninterquartile range IQR = Q3 - Q1</code></pre>
<p><strong>Worked example.</strong> Find the median and IQR of 3, 5, 7, 8, 10, 12, 15, 18.</p>
<pre><code>n = 8; median position 4.5 -> average of 4th and 5th = (8 + 10)/2 = 9\nQ1 position 2.25 -> 5 + 0.25(7 - 5) = 5.5\nQ3 position 6.75 -> 12 + 0.75(15 - 12) = 14.25\nIQR = 14.25 - 5.5 = 8.75</code></pre>
<p>The IQR is the robust measure of spread: it discards the extreme quarter at each end, so one outlier cannot inflate it the way it inflates the range.</p>

<h3>Cumulative frequency and box plots</h3>
<p>A cumulative frequency curve plots the running total against the upper class boundary. The median, quartiles and any percentile are read off at the corresponding cumulative frequencies.</p>
<pre><code>read the median at n/2, Q1 at n/4, Q3 at 3n/4\n(from a cumulative frequency curve, interpolate on the curve)</code></pre>
<p><strong>Worked example.</strong> A cumulative frequency curve for 80 students gives Q1 = 42 marks, median = 55, Q3 = 66. Describe the distribution.</p>
<pre><code>IQR = 66 - 42 = 24 marks\nthe median sits closer to Q1 than Q3? 55 - 42 = 13; 66 - 55 = 11\nso the middle half is roughly symmetric, slightly longer tail below\nthe upper whisker reaches the maximum; compare its length with the\nlower whisker to judge skew</code></pre>
<p><strong>Box plot construction.</strong> A box from Q1 to Q3 with a line at the median, whiskers to the smallest and largest values that are not outliers. Outliers (beyond 1.5 × IQR from the quartiles) are plotted as separate points.</p>
<pre><code>lower fence = Q1 - 1.5 IQR;  upper fence = Q3 + 1.5 IQR\nvalues outside the fences are outliers</code></pre>

<h3>Comparing distributions</h3>
<p>A comparison answer needs two parts: a measure of location (median or mean) and a measure of spread (IQR or standard deviation), each with a sentence of interpretation. "School A's median is higher, so its typical student scored more; its IQR is smaller, so its results are more consistent."</p>
<p><strong>Worked example.</strong> A: median 62, IQR 18. B: median 58, IQR 9. Compare.</p>
<pre><code>A has the higher typical mark (+4 on the median)\nB is more consistent (IQR 9 vs 18)\nA's spread suggests a wider mix of abilities; B's results cluster</code></pre>

<h3>Choosing and justifying an average</h3>
<p>Exam questions ask which average best represents a data set — the answer is a reasoned choice, not a preference:</p>
<ul>
<li>Skewed data or outliers: the median, because it is not dragged by extremes.</li>
<li>Categorical data: the mode, because a mean of categories is meaningless.</li>
<li>Data where every value should count (e.g. total rainfall per month): the mean.</li>
</ul>
<p><strong>Worked example.</strong> House prices in a street are 180k, 190k, 195k, 200k and 1.2m. Which average represents a typical price?</p>
<pre><code>mean = 393k (dragged up by the 1.2m house)\nmedian = 195k (the middle price)\nthe median is the honest summary; the mean misrepresents the street</code></pre>

<h3>Coding and combined means</h3>
<p>Coding simplifies arithmetic without changing the shape of the data. If every value is transformed by y = (x - a)/b, the mean and standard deviation transform the same way, which is why coded means can be decoded exactly.</p>
<pre><code>coded values: y = (x - a)/b
mean(x) = b mean(y) + a
median(x) = b median(y) + a
IQR(x) = b IQR(y)   (spread scales but does not shift)
</code></pre>
<p><strong>Worked example.</strong> The coded values y = (x - 50)/10 have mean 2.4 and IQR 1.5. Find the mean and IQR of x.</p>
<pre><code>mean x = 10(2.4) + 50 = 74
IQR x = 10(1.5) = 15</code></pre>
<p><strong>Worked example 2 (combined groups).</strong> Class A has 20 students with mean mark 60; class B has 30 with mean 70. Find the combined mean.</p>
<pre><code>total marks = 20(60) + 30(70) = 1200 + 2100 = 3300
combined mean = 3300/50 = 66
not the average of 60 and 70, because the groups differ in size</code></pre>
<p>The combined-mean formula is the weighted average: the group sizes are the weights. Averaging two means without weighting is one of the most common arithmetic errors in statistics questions.</p>

<h3>Stem-and-leaf diagrams</h3>
<p>A stem-and-leaf diagram keeps every value visible while ordering the data, which makes it the quickest route to the median and quartiles without arithmetic. The stem is the leading digit, the leaf the final digit, and a key must be stated.</p>
<pre><code>example key: 3 | 4 means 34

3 | 4 7 9
4 | 1 2 2 5 8
5 | 0 3 6
6 | 1</code></pre>
<p>Reading it: the data are 34, 37, 39, 41, 42, 42, 45, 48, 50, 53, 56, 61. With n = 12, the median sits between the 6th and 7th values, the lower quartile at position 3.25 and the upper at 9.75.</p>
<p><strong>Worked example.</strong> Find the median and IQR of the data above.</p>
<pre><code>median = (42 + 45)/2 = 43.5
Q1 = 37 + 0.25(39 - 37) = 37.5
Q3 = 50 + 0.75(53 - 50) = 52.25
IQR = 14.75</code></pre>
<p><strong>Back-to-back stems</strong> compare two groups: leaves for one group run left of the stem and for the other to the right, sharing the same stems so the shapes line up. Comparison answers then read off both a location and a spread for each group, exactly as with box plots.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Mean)</strong> Find the mean of 12, 15, 9, 18, 16. <em>Answer:</em> 70/5 = 14.</li>
<li><strong>(Median)</strong> Find the median of 4, 9, 2, 7, 11, 6. <em>Answer:</em> ordered 2, 4, 6, 7, 9, 11; median (6 + 7)/2 = 6.5.</li>
<li><strong>(Mode)</strong> Find the mode of 3, 5, 5, 7, 9, 9, 9. <em>Answer:</em> 9.</li>
<li><strong>(Grouped)</strong> Estimate the mean of 0–20 (5), 20–40 (10), 40–60 (5). <em>Answer:</em> (5×10 + 10×30 + 5×50)/20 = 600/20 = 30.</li>
<li><strong>(Quartiles)</strong> Find the IQR of 2, 5, 6, 8, 9, 12, 14, 15. <em>Answer:</em> Q1 = 5.5, Q3 = 13.5, IQR = 8.</li>
<li><strong>(Histogram)</strong> A bar of height 3 has class width 5. What frequency does it represent? <em>Answer:</em> 3 × 5 = 15.</li>
<li><strong>(Comparison)</strong> Two classes: median 55, IQR 10 and median 55, IQR 20. Compare. <em>Answer:</em> same typical mark; the first is more consistent.</li>
<li><strong>(Choice)</strong> Which average suits shoe sizes? <em>Answer:</em> the mode, because sizes are categorical/ordinal and the most common size is what a shop stocks.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Not ordering first:</strong> the median requires sorted data; taking the middle of the raw list is wrong whenever the data is unsorted.</li>
<li><strong>Position versus value:</strong> (n + 1)/2 gives the position, not the median; count to that place.</li>
<li><strong>Midpoint error:</strong> the midpoint of 10–20 is 15, not 10 or 20; open-ended classes make a grouped mean impossible without an assumption, which must be stated.</li>
<li><strong>Histogram heights:</strong> plot frequency density, not frequency, when class widths differ; areas, not heights, compare.</li>
<li><strong>Reading the curve:</strong> cumulative frequency is read against the upper boundary; using the lower boundary shifts every quartile.</li>
<li><strong>IQR arithmetic:</strong> Q3 − Q1, never Q1 − Q3, and never the range.</li>
<li><strong>Comparison without spread:</strong> a comparison that mentions only the median is half an answer.</li>
<li><strong>Mean of grouped data called exact:</strong> call it an estimate and say why.</li>
</ul>
`,
  },
};
