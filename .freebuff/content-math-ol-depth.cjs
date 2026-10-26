// Mathematics OL batch 1: Cambridge IGCSE Mathematics 0580 (2025-2027),
// section 2 Algebra and graphs - statements 2.1/2.2/2.3 (simplifying, expanding,
// algebraic fractions), 2.5 (equations) and 2.6 (inequalities). Foundational
// algebra for Papers 2 (non-calculator) and 4 (calculator). Every manipulation
// is written out line by line. Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-ol-depth.cjs > .freebuff-tmp/mth-ol-depth-1.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/mth-ol-depth-1.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/mth-ol-depth-1.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs mathematics OL
module.exports = {
  expectType: "notes",
  titles: {
    "f87684c4-ab07-4f84-825d-b9fee9f73bc6": "IGCSE Mathematics: Simplifying and Expanding",
    "0922f772-661e-4380-b5a6-141b70f1263c": "IGCSE Mathematics: Equations",
    "a5a88378-f424-47de-9f47-e92967a125cc": "IGCSE Mathematics: Inequalities",
  },
  rows: {
    "f87684c4-ab07-4f84-825d-b9fee9f73bc6": `
<h2>IGCSE Mathematics: Simplifying and Expanding</h2>
<p>Cambridge IGCSE Mathematics 0580 (2025–2027), section 2 Algebra and graphs: statements 2.1 Introduction to algebra, 2.2 Algebraic manipulation and 2.3 Algebraic fractions (Extended). Algebra is the language the rest of the course is written in, and this note is its grammar: what letters mean, how expressions are simplified and expanded, how they are factorised, and how algebraic fractions are handled. Every manipulation below is written out line by line, because on Paper 2 (non-calculator) the method marks are the marks — and on Paper 4 an unexplained jump is where sign errors hide.</p>

<h3>What a letter means: an introduction to algebra</h3>
<p>A letter in algebra is a placeholder for a number whose value can change (a variable) or for a number that is fixed but unknown (a constant). The expression 3x + 2 says: take a number, multiply it by 3, then add 2. Substitution is the reverse: if x = 5, then 3x + 2 = 3 × 5 + 2 = 15 + 2 = 17. Work in the given order — multiplication before addition — because the conventions of algebra are just the conventions of arithmetic with letters standing in for numbers.</p>
<ul>
<li>3x means 3 × x. Writing 3 × x with a multiplication sign is unnecessary, but writing 3x as 3 + x is a serious error.</li>
<li>x² means x × x, and 2x² means 2 × x × x — the index applies only to the x, not to the 2.</li>
<li>xy means x × y, and x(y + 2) means x multiplied by the whole bracket.</li>
<li>A term is a product of numbers and letters, such as 3x²; terms are separated by + and − signs.</li>
<li>Like terms have exactly the same letter part: 3x² and −7x² are like terms; 3x² and 3x are not.</li>
</ul>
<p><strong>Why letters work at all.</strong> A rule like a(b + c) = ab + ac is not a trick to memorise — it is the distributive property of arithmetic, true for every number, so writing it once with letters proves it for all cases at once instead of checking each one. That is the whole power of algebra: one line of symbols replaces a million examples.</p>

<h3>Simplifying: collecting like terms</h3>
<p>To simplify, gather the like terms and add their coefficients (the numbers in front). Work one letter part at a time and keep every sign with its term.</p>
<pre><code>Simplify:  5x + 3y - 2x + 7 - y + 4

Group the x terms, then the y terms, then the numbers:
= 5x - 2x + 3y - y + 7 + 4        [terms rearranged; each sign travels with its term]
= (5 - 2)x + (3 - 1)y + (7 + 4)   [coefficients collected]
= 3x + 2y + 11</code></pre>
<p>For expressions with powers, only identical letter parts can join:</p>
<pre><code>Simplify:  4x^2 + 3x - x^2 + 2x - 9

= 4x^2 - x^2 + 3x + 2x - 9
= (4 - 1)x^2 + (3 + 2)x - 9
= 3x^2 + 5x - 9</code></pre>
<p>The x² and x terms never combine: x² counts squares while x counts lengths, and they are different kinds of quantity — exactly why the index must match before terms are collected.</p>

<h3>Expanding brackets</h3>
<p>Expanding uses the distributive law: every term outside the bracket multiplies every term inside. The golden rule of signs is that a minus sign in front of a bracket changes the sign of everything inside.</p>
<pre><code>Expand:  3(2x - 5)

= 3 x 2x + 3 x (-5)        [each term inside multiplied by 3]
= 6x - 15</code></pre>
<pre><code>Expand:  -(4x - 7)

= -1 x 4x + (-1) x (-7)    [a bracket with no number means x (-1)]
= -4x + 7</code></pre>
<p>Two brackets multiply every term of the first by every term of the second. Writing each product on its own line prevents the classic dropped-term error:</p>
<pre><code>Expand and simplify:  (2x + 3)(x - 5)

= 2x x x + 2x x (-5) + 3 x x + 3 x (-5)     [four products: each term x each term]
= 2x^2 - 10x + 3x - 15
= 2x^2 - 7x - 15</code></pre>
<p>The pattern is sometimes called FOIL (First, Outer, Inner, Last), but the safe habit is the one above: systematic, complete, and it scales to three brackets:</p>
<pre><code>Expand:  (x + 1)(x - 2)(x + 3)

First expand the first two brackets:
(x + 1)(x - 2) = x x x + x x (-2) + 1 x x + 1 x (-2) = x^2 - 2x + x - 2 = x^2 - x - 2
Now multiply by the third bracket, term by term:
(x^2 - x - 2)(x + 3) = x^2 x x + x^2 x 3 + (-x) x x + (-x) x 3 + (-2) x x + (-2) x 3
= x^3 + 3x^2 - x^2 - 3x - 2x - 6
= x^3 + 2x^2 - 5x - 6</code></pre>
<p>Perfect squares deserve instant recognition: (x + 5)² = (x + 5)(x + 5) = x² + 10x + 25. The middle term is 2 × 5 × x = 10x, so (x + a)² = x² + 2ax + a². Writing (x + 5)² as x² + 25 is the single most common error in the whole of algebra.</p>

<h3>Factorising</h3>
<p>Factorising is expanding in reverse: writing a sum as a product. Every factorisation can be checked by expanding again, and on an exam that check costs seconds.</p>
<p><strong>Common factors.</strong> Take out the highest factor of every term:</p>
<pre><code>Factorise:  12x^3 - 8x^2

Highest common factor of 12x^3 and 8x^2 is 4x^2:
= 4x^2(3x) + 4x^2(-2)        [showing the division of each term]
= 4x^2(3x - 2)</code></pre>
<p><strong>Factorising quadratics of the form x² + bx + c.</strong> Find two numbers that multiply to c and add to b:</p>
<pre><code>Factorise:  x^2 + 7x + 12

Two numbers with product +12 and sum +7: 3 and 4 (both positive, since c and b are positive)
Check: 3 x 4 = 12 and 3 + 4 = 7
= (x + 3)(x + 4)

Expand to verify: (x + 3)(x + 4) = x^2 + 4x + 3x + 12 = x^2 + 7x + 12  ✓</code></pre>
<p>Signs follow from the product and sum: for x² − 2x − 15 the product is −15 and the sum is −2, so the numbers are −5 and +3 (the larger number carries the sign of the sum), giving (x − 5)(x + 3).</p>
<p><strong>Factorising ax² + bx + c.</strong> When the coefficient of x² is not 1, multiply a × c and split the middle term:</p>
<pre><code>Factorise:  6x^2 + 11x - 10

a x c = 6 x (-10) = -60; find two numbers with product -60 and sum +11: +15 and -4
Split the middle term:  6x^2 + 15x - 4x - 10
Factorise in pairs:     3x(2x + 5) - 2(2x + 5)        [first pair gives 3x, second gives -2]
Take out (2x + 5):      (2x + 5)(3x - 2)

Expand to verify: 6x^2 - 4x + 15x - 10 = 6x^2 + 11x - 10  ✓</code></pre>
<p><strong>Difference of two squares.</strong> Whenever an expression is two squares subtracted, x² − a² = (x + a)(x − a), because the middle terms cancel when expanded: (x + a)(x − a) = x² − ax + ax − a² = x² − a². So 9x² − 25 = (3x + 5)(3x − 5).</p>
<p><strong>Completing the square (Extended).</strong> Rewrite x² + bx as a square minus a correction:</p>
<pre><code>Write x^2 + 6x - 7 in the form (x + p)^2 + q

x^2 + 6x - 7 = (x + 3)^2 - 3^2 - 7        [half of 6 is 3; (x+3)^2 introduces +9, so subtract 9]
= (x + 3)^2 - 9 - 7
= (x + 3)^2 - 16</code></pre>
<p>This form reads off the turning point at once: the minimum value is −16, at x = −3. For 2x² + 8x − 5, take the 2 out first: 2(x² + 4x) − 5 = 2[(x + 2)² − 4] − 5 = 2(x + 2)² − 13.</p>

<table border="1" cellpadding="6">
<tr><th>Expression</th><th>Factorisation</th><th>How to spot it</th></tr>
<tr><td>ax² + bx</td><td>x(ax + b)</td><td>Common factor: every term shares an x</td></tr>
<tr><td>x² + bx + c</td><td>(x + p)(x + q) with pq = c, p + q = b</td><td>Find the number pair with product c and sum b</td></tr>
<tr><td>ax² + bx + c</td><td>(px + q)(rx + s)</td><td>Split the middle term using a × c, then factorise in pairs</td></tr>
<tr><td>x² − a²</td><td>(x + a)(x − a)</td><td>Difference of two squares: a subtraction of two square terms</td></tr>
<tr><td>x² + 2ax + a²</td><td>(x + a)²</td><td>Perfect square: first and last terms are squares and the middle is twice their product</td></tr>
</table>
<p>The order matters: take out a common factor before looking for any pattern, and check every factorisation by re-expanding. A table like this is worth copying into revision cards, because recognising the shape is faster in the exam than deriving it.</p>

<h3>Algebraic fractions (Extended)</h3>
<p>Algebraic fractions obey exactly the same rules as ordinary fractions — and it is worth knowing why those rules are what they are. Multiplication multiplies tops and bottoms because a fraction is a product. Division asks how many of one fraction fit into another, and the answer is the reciprocal: 3/4 ÷ 1/2 asks how many halves fit into three quarters, and the answer is 1½, which is 3/4 × 2/1 = 3/2. Dividing by a fraction is the same as multiplying by its reciprocal — the rule is not arbitrary; it is what division means.</p>
<pre><code>Simplify:  (x^2 - 9) / (x^2 + 5x + 6)

Factorise top and bottom completely first:
= (x + 3)(x - 3) / [(x + 3)(x + 2)]
Cancel the common factor (x + 3):
= (x - 3) / (x + 2)        valid except where x + 3 = 0</code></pre>
<p>Cancellation divides top and bottom by the same thing, which is legitimate; cancelling individual terms across a sum (writing (x + 3)/(x + 2) as 3/2) is not, because the top is not a product.</p>
<pre><code>Express as a single fraction:  2/(x - 1) - 3/(x + 2)

The lowest common denominator is (x - 1)(x + 2):
= 2(x + 2) / [(x - 1)(x + 2)] - 3(x - 1) / [(x - 1)(x + 2)]     [each fraction multiplied by the missing factor]
= [2(x + 2) - 3(x - 1)] / [(x - 1)(x + 2)]                       [single denominator; brackets protect the signs]
= [2x + 4 - 3x + 3] / [(x - 1)(x + 2)]                           [expanding: -3 x -1 = +3]
= (7 - x) / [(x - 1)(x + 2)]</code></pre>
<pre><code>Multiply and divide:  (x^2 - 4)/(x + 5)  x  (x + 5)/(x + 2)

= [(x + 2)(x - 2)(x + 5)] / [(x + 5)(x + 2)]     [factorise, then multiply tops and bottoms]
= x - 2</code></pre>

<h3>Worked example: a full simplification</h3>
<p>Simplify and factorise completely: 3(x + 2)² − 2(x + 2)(x − 1) − 5x.</p>
<pre><code>Expand (x + 2)^2 first:   (x + 2)(x + 2) = x^2 + 2x + 2x + 4 = x^2 + 4x + 4
So 3(x + 2)^2 = 3x^2 + 12x + 12

Expand (x + 2)(x - 1):    x x x + x x (-1) + 2 x x + 2 x (-1) = x^2 - x + 2x - 2 = x^2 + x - 2
So -2(x + 2)(x - 1) = -2x^2 - 2x + 4

Put everything together:
3x^2 + 12x + 12 - 2x^2 - 2x + 4 - 5x
= 3x^2 - 2x^2 + 12x - 2x - 5x + 12 + 4
= x^2 + 5x + 16

The expression x^2 + 5x + 16 does not factorise over the integers (no pair multiplies to 16 and adds to 5),
so the simplified form is the final answer.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Writing (x + 5)² as x² + 25. Squaring a bracket gives a middle term: x² + 10x + 25.</li>
<li>Dropping a minus sign when expanding a bracket with a minus in front: −(3x − 4) = −3x + 4, not −3x − 4.</li>
<li>Cancelling a single term across a sum: (x + 3)/(x + 2) cannot be simplified by cancelling x.</li>
<li>Collecting unlike terms: 3x² + 5x is already simplified; nothing more can join.</li>
<li>Losing the sign of a term when rearranging: 5 − 2x written as 2x − 5 flips the expression.</li>
<li>Forgetting to divide every term when taking out a common factor: 12x³ − 8x² = 4x²(3x − 2), and the −2 must be checked by re-expanding.</li>
<li>On Paper 2, leaving a decimal where an exact fraction or surd is required — without a calculator, exact answers are the point.</li>
<li>Assuming x² + bx + c always factorises; when no integer pair works (or the discriminant is negative), the expression is already final.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 3 marks).</strong> Simplify fully: 4(2x − 3) − 3(x − 5).</p>
<p>Answer: 8x − 12 − 3x + 15 = 5x + 3. (Distribute the −3 correctly: −3 × −5 = +15.)</p>
<p><strong>Question 2 (Paper 2, 4 marks).</strong> Factorise completely: 3x² − 27.</p>
<p>Answer: Take out the common factor 3: 3(x² − 9). Recognise the difference of two squares inside: 3(x + 3)(x − 3). Taking only one factor loses the second mark.</p>
<p><strong>Question 3 (Paper 4, 4 marks).</strong> Expand and simplify (2x − 1)(x + 4).</p>
<p>Answer: 2x × x + 2x × 4 + (−1) × x + (−1) × 4 = 2x² + 8x − x − 4 = 2x² + 7x − 4.</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> Write (2x − 3)/(x + 1) − 2/(x − 2) as a single fraction in its simplest form.</p>
<p>Answer: Common denominator (x + 1)(x − 2): [(2x − 3)(x − 2) − 2(x + 1)] / [(x + 1)(x − 2)] = [2x² − 4x − 3x + 6 − 2x − 2] / [(x + 1)(x − 2)] = (2x² − 9x + 4) / [(x + 1)(x − 2)], which factorises to (2x − 1)(x − 4)/[(x + 1)(x − 2)] and no longer cancels.</p>
<p><strong>Question 5 (Paper 2, 3 marks).</strong> Express 2x² + 12x − 7 in the form 2(x + a)² + b.</p>
<p>Answer: 2(x² + 6x) − 7 = 2[(x + 3)² − 9] − 7 = 2(x + 3)² − 18 − 7 = 2(x + 3)² − 25. So a = 3, b = −25.</p>
<p><strong>Question 6 (Paper 4, 3 marks).</strong> Given f(x) = (x² − 4)/(x² + x − 2), simplify f(x) and state the value of x for which it is undefined.</p>
<p>Answer: f(x) = (x + 2)(x − 2)/[(x + 2)(x − 1)] = (x − 2)/(x − 1). It is undefined where the original denominator is zero: x² + x − 2 = (x + 2)(x − 1) = 0, so x = −2 or x = 1.</p>
<p>Once expressions are in hand, equations solve for the unknowns they contain.</p>
`,

    "0922f772-661e-4380-b5a6-141b70f1263c": `
<h2>IGCSE Mathematics: Equations</h2>
<p>Cambridge IGCSE Mathematics 0580 (2025–2027), section 2 Algebra and graphs, statement 2.5 Equations — linear equations, changing the subject, simultaneous equations and quadratic equations, with the Extended additions of fractional equations and simultaneous linear–non-linear pairs. Solving an equation is finding the value of an unknown that makes a statement true, and every technique in this note is one idea applied repeatedly: do the same to both sides. The worked lines below are written out in full, because the method marks on both Paper 2 and Paper 4 are earned line by line.</p>

<h3>What solving means: the balance principle</h3>
<p>An equation is a balance. The equals sign says the left and right sides hold the same value, so any operation — add, subtract, multiply, divide — is legal only if it is applied to <strong>both</strong> sides. Solving then uses inverse operations to peel away everything around the unknown: addition undoes subtraction, multiplication undoes division, and a square root undoes a square. The golden rule of order: undo addition and subtraction first, then multiplication and division, then powers and roots.</p>
<pre><code>Solve:  3x + 7 = 22

3x + 7 - 7 = 22 - 7        [subtract 7 from both sides]
3x = 15
3x / 3 = 15 / 3            [divide both sides by 3]
x = 5

Check in the original: 3 x 5 + 7 = 15 + 7 = 22  ✓</code></pre>
<p>The check is not optional decoration: it costs five seconds and catches sign errors, which are the most common mark lost on Paper 2.</p>

<table border="1" cellpadding="6">
<tr><th>If the equation contains...</th><th>First move</th><th>Why</th></tr>
<tr><td>Brackets</td><td>Expand every bracket</td><td>Separate terms can then be collected</td></tr>
<tr><td>Fractions</td><td>Multiply every term by the lowest common denominator</td><td>One step clears all fractions</td></tr>
<tr><td>Unknowns on both sides</td><td>Collect unknowns on one side, numbers on the other</td><td>The equation must end as x = number</td></tr>
<tr><td>Powers of the unknown</td><td>Bring to one side as a quadratic and factorise or use the formula</td><td>Linear methods cannot isolate x inside x²</td></tr>
</table>

<h3>Linear equations with brackets, fractions and unknowns on both sides</h3>
<p>The strategy is always the same: expand, collect, solve. Write one step per line and keep the equation balanced.</p>
<pre><code>Solve:  5(2x - 3) = 3x + 11

10x - 15 = 3x + 11        [expand the bracket]
10x - 3x = 11 + 15        [subtract 3x from both sides, add 15 to both sides]
7x = 26
x = 26/7 = 3 5/7          [exact fraction, not a rounded decimal]</code></pre>
<pre><code>Solve:  (x + 4)/3 - 2 = x/5

Multiply every term by 15, the lowest common denominator of 3 and 5:
15 x (x + 4)/3 - 15 x 2 = 15 x x/5
5(x + 4) - 30 = 3x
5x + 20 - 30 = 3x        [expand]
5x - 10 = 3x             [collect constants]
5x - 3x = 10
2x = 10
x = 5

Check in the original: (5 + 4)/3 - 2 = 3 - 2 = 1 and 5/5 = 1  ✓</code></pre>
<p>Multiplying by the common denominator clears fractions in one step — a technique worth using deliberately, since working with fractions line by line is where slips happen.</p>

<h3>Changing the subject of a formula</h3>
<p>Making x the subject means rearranging until the formula reads x = ... . Unwrap x the same way: undo additions, then multiplications, and if x appears in more than one place, collect all x-terms on one side first and factorise.</p>
<pre><code>Make x the subject:  y = (2x + 3)/(x - 1)

Multiply both sides by (x - 1):
y(x - 1) = 2x + 3
yx - y = 2x + 3          [expand the left side]
yx - 2x = y + 3          [bring x terms left, others right]
x(y - 2) = y + 3         [factorise: x taken out of both terms]
x = (y + 3)/(y - 2)</code></pre>
<p>Every line is a legitimate balanced move, and the final answer is a formula valid for any y except y = 2. Formula rearrangement is a Paper 4 staple — often disguised as a physics or mensuration problem.</p>

<h3>Simultaneous equations</h3>
<p>Two unknowns need two equations. There are two standard methods, and both produce both unknowns.</p>
<p><strong>Elimination</strong> — make one unknown's coefficients match and subtract:</p>
<pre><code>Solve:  3x + 2y = 16   and   5x - 2y = 8

The y coefficients already match (+2 and -2), so add the equations:
(3x + 2y) + (5x - 2y) = 16 + 8
8x = 24
x = 3

Substitute x = 3 into the first equation:
3(3) + 2y = 16
9 + 2y = 16
2y = 7
y = 3.5

Check in the second equation: 5(3) - 2(3.5) = 15 - 7 = 8  ✓</code></pre>
<p><strong>Substitution</strong> — make one unknown the subject of one equation:</p>
<pre><code>Solve:  x + y = 10   and   y = x^2 - 4        [one linear, one non-linear: Extended]

From the first equation: y = 10 - x
Substitute into the second:
10 - x = x^2 - 4
0 = x^2 + x - 14        [rearranged: x^2 - 4 + x - 10 = x^2 + x - 14]
x = [-1 ± √(1 + 56)]/2 = [-1 ± √57]/2       [quadratic formula]

Numerically x ≈ 3.275 or x ≈ -4.275, with the matching y values y = 10 - x ≈ 6.725 and 14.275.</code></pre>
<p>For a pair of straight lines there is exactly one solution unless the lines are parallel (no solution) or identical (infinitely many) — a common Paper 2 short question.</p>

<h3>Quadratic equations</h3>
<p>A quadratic has the form ax² + bx + c = 0 and may have two solutions, one, or none. Three methods are examinable.</p>
<p><strong>1. Factorising.</strong></p>
<pre><code>Solve:  x^2 - 5x + 6 = 0

(x - 2)(x - 3) = 0        [factors of +6 that sum to -5]
A product is zero only when a factor is zero:
x - 2 = 0  or  x - 3 = 0
x = 2  or  x = 3</code></pre>
<p><strong>2. Completing the square.</strong></p>
<pre><code>Solve:  x^2 + 6x + 2 = 0

(x + 3)^2 - 9 + 2 = 0        [(x+3)^2 = x^2 + 6x + 9, so subtract 9 to keep equality]
(x + 3)^2 - 7 = 0
(x + 3)^2 = 7
x + 3 = ±√7                  [both roots, positive and negative]
x = -3 ± √7
x ≈ -0.354  or  x ≈ -5.65</code></pre>
<p><strong>3. The quadratic formula.</strong> It is completing the square, done once and for all. Starting from ax² + bx + c = 0 and dividing by a:</p>
<pre><code>x^2 + (b/a)x + c/a = 0
x^2 + (b/a)x = -c/a
x^2 + (b/a)x + (b/2a)^2 = -c/a + (b/2a)^2        [add the completing-the-square term]
(x + b/2a)^2 = (b^2 - 4ac)/(4a^2)
x + b/2a = ±√(b^2 - 4ac)/(2a)
x = [-b ± √(b^2 - 4ac)] / (2a)</code></pre>
<p>The <strong>discriminant</strong> b² − 4ac decides how many solutions there are before any solving: if it is positive there are two distinct roots, if it is zero there is one repeated root, and if it is negative there are no real roots.</p>
<pre><code>Solve:  2x^2 - 3x - 5 = 0

a = 2, b = -3, c = -5;  b^2 - 4ac = 9 + 40 = 49, so two roots
x = [3 ± √49] / 4 = [3 ± 7]/4
x = (3 + 7)/4 = 2.5    or    x = (3 - 7)/4 = -1</code></pre>

<h3>Fractional equations (Extended)</h3>
<p>An equation with x in a denominator is cleared the same way as any fraction equation — multiply through by the denominator — but the solutions must be checked against it, because a value that makes the denominator zero is not a solution at all.</p>
<pre><code>Solve:  3/(x - 1) + 2 = 5/(x + 2)

Multiply every term by (x - 1)(x + 2):
3(x + 2) + 2(x - 1)(x + 2) = 5(x - 1)
3x + 6 + 2(x^2 + x - 2) = 5x - 5
3x + 6 + 2x^2 + 2x - 4 = 5x - 5
2x^2 + 5x + 2 = 5x - 5
2x^2 + 7 = 0
x^2 = -7/2

No real solutions. (Had a value like x = 1 appeared, it would be rejected as it makes x - 1 = 0.)</code></pre>

<h3>Worked example: an exam-style multi-step equation</h3>
<p>A rectangle has length (2x + 1) cm and width (x − 3) cm. Its area is 30 cm². Find x and the dimensions.</p>
<pre><code>(2x + 1)(x - 3) = 30
2x^2 - 6x + x - 3 = 30        [expand]
2x^2 - 5x - 3 = 30
2x^2 - 5x - 33 = 0            [subtract 30 from both sides]
(x - 3.5)(2x + 11) ... check by formula instead:
Factorise the quadratic: we need two numbers with product 2 x (-33) = -66 and sum -5.
The pair -11 and +6 works: (-11) x 6 = -66 and -11 + 6 = -5.
Split the middle term:  2x^2 + 6x - 11x - 33 = 0
Factorise in pairs:     2x(x + 3) - 11(x + 3) = 0
(x + 3)(2x - 11) = 0
x = -3  or  x = 11/2 = 5.5
x = 22/4 = 5.5   or   x = -12/4 = -3</code></pre>
<p>The negative answer is rejected: a length of x − 3 with x = −3 gives −6 cm, which is impossible. So x = 5.5, the length is 12 cm and the width is 2.5 cm. Checking the area: 12 × 2.5 = 30 ✓. Interpreting the solutions in context is a mark in its own right.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Applying an operation to one side only. The single most common algebraic error; the equation must stay balanced.</li>
<li>Sign errors when expanding: −3(x − 4) = −3x + 12, not −3x − 12.</li>
<li>Forgetting the ± when taking a square root: x² = 9 gives x = 3 or x = −3.</li>
<li>Rejecting or accepting context solutions carelessly: lengths, counts and times must be positive, and the rejected root should be stated as rejected with a reason.</li>
<li>Leaving a fractional answer as a rounded decimal on Paper 2, where exact fractions are expected.</li>
<li>Ignoring the discriminant's role: if b² − 4ac is negative the quadratic has no real roots — say so rather than hunting for errors.</li>
<li>Missing a denominator restriction in a fractional equation and quoting x = 1 as a solution of 1/(x − 1) = ... .</li>
<li>Rounding too early: keep exact values (fractions, surds) until the final line of a multi-step question.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 3 marks).</strong> Solve 4x − 7 = 2x + 9.</p>
<p>Answer: 4x − 2x = 9 + 7, so 2x = 16 and x = 8. Check: 32 − 7 = 25 and 16 + 9 = 25 ✓.</p>
<p><strong>Question 2 (Paper 2, 4 marks).</strong> Solve x² + 2x − 15 = 0.</p>
<p>Answer: (x + 5)(x − 3) = 0, so x = −5 or x = 3. (Factor pairs of −15 summing to +2: +5 and −3.)</p>
<p><strong>Question 3 (Paper 4, 4 marks).</strong> Solve the simultaneous equations 2x + 3y = 12 and 4x − y = 5.</p>
<p>Answer: Multiply the second equation by 3: 12x − 3y = 15. Add to the first: 14x = 27, so x = 27/14. Substitute: 2(27/14) + 3y = 12 gives 27/7 + 3y = 12, so 3y = 12 − 27/7 = 57/7 and y = 19/7.</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> Solve 2x² − 8x + 3 = 0, giving answers to 2 decimal places.</p>
<p>Answer: b² − 4ac = 64 − 24 = 40. x = [8 ± √40]/4 = [8 ± 6.325]/4, so x ≈ 3.58 or x ≈ 0.42.</p>
<p><strong>Question 5 (Paper 4, 5 marks).</strong> Make r the subject of V = (1/3)πr²h.</p>
<p>Answer: 3V = πr²h (multiply by 3); 3V/(πh) = r² (divide by πh); r = √[3V/(πh)] (take the positive square root, since a radius is positive).</p>
<p><strong>Question 6 (Paper 4, 5 marks).</strong> The length of a rectangle is 3 cm more than twice its width. Its perimeter is 54 cm. Find its area.</p>
<p>Answer: Let the width be w; the length is 2w + 3. Perimeter: 2[w + (2w + 3)] = 54, so 2(3w + 3) = 54, 3w + 3 = 27, 3w = 24 and w = 8. The length is 19 cm and the area is 8 × 19 = 152 cm².</p>
<p>Inequalities generalise equations from exact equality to a range of permitted values.</p>
`,

    "a5a88378-f424-47de-9f47-e92967a125cc": `
<h2>IGCSE Mathematics: Inequalities</h2>
<p>Cambridge IGCSE Mathematics 0580 (2025–2027), section 2 Algebra and graphs, statement 2.6 Inequalities — solving and interpreting linear inequalities, listing integer solutions, and (Extended) regions in the coordinate plane. An inequality describes a range of values rather than one exact value, and solving one follows the same balance principle as solving an equation, with one critical difference: multiplying or dividing by a negative number reverses the inequality sign. This note shows why that happens, writes out every solution line by line, and finishes with the region-shading questions that distinguish Paper 4.</p>

<h3>What an inequality says</h3>
<p>The four inequality symbols extend the equals sign: &lt; (strictly less than), &gt; (strictly greater than), ⩽ (less than or equal to), ⩾ (greater than or equal to). A solution is a set of values, drawn on a number line with a hollow circle for strict inequalities (the endpoint is excluded) and a solid circle for inclusive ones (the endpoint is included).</p>
<table border="1" cellpadding="6">
<tr><th>Statement</th><th>Meaning</th><th>Number line</th></tr>
<tr><td>x &gt; 3</td><td>Every value greater than 3, not including 3</td><td>Hollow circle at 3, arrow to the right</td></tr>
<tr><td>x ⩽ −1</td><td>Every value up to and including −1</td><td>Solid circle at −1, arrow to the left</td></tr>
<tr><td>2 ⩽ x &lt; 5</td><td>Values from 2 up to, but not including, 5</td><td>Solid circle at 2, hollow at 5, line between</td></tr>
</table>
<p><strong>Why the sign flips when multiplying by a negative.</strong> Start with the true statement 3 &lt; 5. Multiply both sides by −2 without thinking: −6 &lt; −10 is false, because −10 is further left than −6. The correct statement is −6 &gt; −10. Multiplying by a negative mirrors the number line, which reverses order — so the inequality symbol must reverse too. That single rule causes more lost marks than any other in this topic.</p>

<h3>Solving linear inequalities</h3>
<p>Use the equation methods unchanged, and remember the one reversal rule:</p>
<pre><code>Solve:  5x - 7 > 3x + 1        (give the solution as an inequality)

5x - 3x > 1 + 7               [add 7 to both sides, subtract 3x from both sides]
2x > 8
x > 4                         [divide by +2: the sign does not reverse]</code></pre>
<pre><code>Solve:  3 - 2x ⩽ 11

-2x ⩽ 11 - 3                  [subtract 3 from both sides]
-2x ⩽ 8
x ⩾ -4                        [divide by -2: the sign REVERSES from ⩽ to ⩾]</code></pre>
<p>The check is direct: x = −4 gives 3 − 2(−4) = 11 ⩽ 11 ✓, and x = 0 gives 3 ⩽ 11 ✓ while x = −5 gives 13 ⩽ 11 ✗ — so the boundary and direction are right.</p>
<pre><code>Solve and list the integer solutions:  2 < (5x - 1)/3 ⩽ 8

Multiply every part by 3:
6 < 5x - 1 ⩽ 24
7 < 5x ⩽ 25                   [add 1 to every part]
7/5 < x ⩽ 5                   [divide every part by +5]

The integers are 2, 3, 4 and 5.</code></pre>
<p>Compound inequalities (a value trapped between two bounds) are solved in one line per operation across all three parts — exactly like a three-pan balance.</p>

<h3>Inequalities from word problems</h3>
<p>Many questions ask for the greatest or least integer satisfying a condition. Translate carefully: at least means ⩾, at most means ⩽, more than means &gt;, within or no more than means ⩽.</p>
<pre><code>A cinema ticket costs £8. A group has £100 and must keep at least £12 for travel.
How many tickets can they buy?

Let n be the number of tickets:  8n + 12 ⩽ 100
8n ⩽ 88
n ⩽ 11

They can buy at most 11 tickets.</code></pre>
<p>The final answer is a whole number in context: a group cannot buy a fraction of a ticket, so the solution set is the integers up to 11.</p>

<h3>Regions in the coordinate plane (Extended)</h3>
<p>The line y = mx + c divides the plane into two half-planes: points above it satisfy y &gt; mx + c and points below it satisfy y &lt; mx + c. A region question asks you to shade the set of points satisfying several inequalities at once.</p>
<ul>
<li>Draw the boundary line y = mx + c as a <strong>solid</strong> line when the inequality includes equality (⩽ or ⩾), and as a <strong>dashed</strong> line when it is strict (&lt; or &gt;).</li>
<li>Test one point not on the line — the origin (0, 0) is easiest when the line misses it. Substitute into the inequality; if it is true, shade the side containing the test point.</li>
<li>Shade the side that satisfies <strong>every</strong> inequality; the answer region is the overlap, and the question often asks for the coordinates of a point inside it.</li>
</ul>
<pre><code>Shade the region satisfying:  y ⩽ 2x + 1,  y > -x + 2,  x ⩾ 0

Line 1: y = 2x + 1, solid. Test (0, 0): 0 ⩽ 1 true, so shade below-left of this line.
Line 2: y = -x + 2, dashed. Test (0, 0): 0 > 2 false, so shade the side away from the origin.
Line 3: x = 0 (the y-axis), solid, shade to the right.

The solution region is the triangle-like area satisfying all three, e.g. the point (2, 2):
2 ⩽ 5 ✓, 2 > 0 ✓, 2 ⩾ 0 ✓.</code></pre>
<p>Describing a region in words is the reverse skill: read the boundary lines, note whether each is dashed or solid, and translate the shaded side back into an inequality.</p>

<h3>Maximum and minimum values over a region (Extended)</h3>
<p>Region questions often finish by asking for the largest or smallest value of an expression such as x + 2y for points inside the shaded region. A linear expression grows steadily in one direction across the plane, so over a region bounded by straight lines its extreme values always sit at the corners. The method is therefore exact: find the coordinates of every vertex of the region, substitute each pair into the expression, and pick the largest or smallest result. Do not stop at the corner that looks likely — an untested corner is the usual place a mark is lost.</p>

<h3>Worked example: inequality with a parameter</h3>
<p>Find the set of values of k for which the equation x² + kx + 9 = 0 has two distinct real roots.</p>
<pre><code>Two distinct real roots require a positive discriminant:  b^2 - 4ac > 0
Here a = 1, b = k, c = 9:
k^2 - 36 > 0
k^2 > 36
k > 6  or  k < -6</code></pre>
<p>This is an inequality inside a quadratic-context question — exactly the blend of topics Paper 4 rewards. If the requirement had been at least one real root, the inequality would be k² ⩾ 36, giving k ⩾ 6 or k ⩽ −6.</p>
<p><strong>Corner points in practice.</strong> Take the region x ⩾ 0, y ⩾ 0, x + y ⩽ 6 and y ⩽ x + 2. Its vertices are where the boundary lines meet:</p>
<pre><code>x = 0 with y = 0            gives (0, 0)
y = 0 with x + y = 6        gives (6, 0)
x = 0 with y = x + 2        gives (0, 2)
x + y = 6 with y = x + 2    gives x + (x + 2) = 6, so 2x = 4, x = 2 and y = 4, the corner (2, 4)

Evaluate P = x + 2y at each corner:
(0, 0): P = 0     (6, 0): P = 6     (0, 2): P = 4     (2, 4): P = 10

Maximum P = 10 at (2, 4);  minimum P = 0 at (0, 0).</code></pre>
<p>The minimum sits at the origin only because this region includes it; a region bounded away from the origin puts its minimum at one of the other corners. Substitute every vertex before choosing.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Not reversing the inequality sign after multiplying or dividing by a negative number. −2x &lt; 8 means x &gt; −4.</li>
<li>Reversing the sign when multiplying by a positive number, or reversing when subtracting — only multiplication and division by negatives reverse it.</li>
<li>Hollow versus solid circles: &lt; and &gt; exclude the endpoint; ⩽ and ⩾ include it. Writing x &gt; 4 when x = 4 works is a boundary error.</li>
<li>Flipping the inequality direction mid-solution so the final statement faces the wrong way.</li>
<li>Forgetting to reverse in a compound inequality: every part flips when the whole chain is multiplied by a negative.</li>
<li>In region questions, drawing a solid boundary for a strict inequality (or a dashed one for ⩽), or shading the wrong side because no test point was used.</li>
<li>Reporting a decimal when the question asks for integers: n ⩽ 11.25 means the largest integer is 11, not 11.25.</li>
<li>Treating ⩽ as &lt; in a word problem: at most 5 includes 5.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 3 marks).</strong> Solve 7 − 3x &gt; 1 and show your solution on a number line.</p>
<p>Answer: −3x &gt; −6, so x &lt; 2 (the sign reverses). Number line: hollow circle at 2, shading to the left.</p>
<p><strong>Question 2 (Paper 2, 3 marks).</strong> Solve 2 ⩽ 3x + 5 &lt; 14 and list the integer solutions.</p>
<p>Answer: Subtract 5 throughout: −3 ⩽ 3x &lt; 9. Divide by 3: −1 ⩽ x &lt; 3. The integers are −1, 0, 1, 2.</p>
<p><strong>Question 3 (Paper 4, 4 marks).</strong> Find the values of x for which x² − 5x + 4 &lt; 0.</p>
<p>Answer: Factorise: (x − 1)(x − 4) &lt; 0. The quadratic is negative between its roots, so 1 &lt; x &lt; 4. (Test x = 2: 4 − 10 + 4 = −2 &lt; 0 ✓; test x = 0: 4 &gt; 0 ✗.)</p>
<p><strong>Question 4 (Paper 4, 5 marks).</strong> Shade the region defined by y &gt; x − 1, y ⩽ 3 and x ⩾ 0, and write down the coordinates of one point in the region.</p>
<p>Answer: Draw y = x − 1 dashed (strict), y = 3 solid and x = 0 solid. The origin test for y &gt; x − 1 gives 0 &gt; −1, true, so shade above the dashed line; y ⩽ 3 shades below the horizontal line; x ⩾ 0 shades right of the y-axis. The overlap is a triangle with vertices (0, 3), (4, 3) and (0, −1); the point (1, 1) lies inside: 1 &gt; 0 ✓, 1 ⩽ 3 ✓, 1 ⩾ 0 ✓.</p>
<p><strong>Question 5 (Paper 4, 4 marks).</strong> A rectangle has a perimeter of at most 60 cm and a length of (x + 4) cm. Write an inequality for its width w and find w when x = 8.</p>
<p>Answer: 2[(x + 4) + w] ⩽ 60, so (x + 4) + w ⩽ 30 and w ⩽ 26 − x. With x = 8: w ⩽ 18 cm, and the width must also be positive, so 0 &lt; w ⩽ 18.</p>
<p><strong>Question 6 (Paper 2, 3 marks).</strong> The solutions of 5x + a ⩾ 0 include x = −2. Find the smallest integer value of a.</p>
<p>Answer: Substituting x = −2: −10 + a ⩾ 0, so a ⩾ 10. The smallest integer value is 10.</p>
<p>With equations and inequalities mastered, the next stage of algebra is sequences and functions.</p>
`,
  },
};
