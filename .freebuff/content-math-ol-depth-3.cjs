// Mathematics OL batch 3: written directly from the official Cambridge IGCSE
// Mathematics 0580 (2025-2027 / 2028-2030) subject content list, NOT from the
// site's statement checklist. Section 1 Number: 1.1 Types of number, 1.5
// Ordering, 1.6 The four operations, 1.9 Estimation, 1.10 Limits of accuracy,
// 1.14 Using a calculator, 1.15 Time, 1.16 Money (arithmetic note); 1.4
// Fractions/decimals/percentages, 1.13 Percentages, E1.17 Exponential growth
// and decay (fractions note); 1.3 Powers and roots, 1.7 Indices I, 1.8
// Standard form, E1.18 Surds, E2.4 Indices II (indices note). Every step is
// expanded. Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-ol-depth-3.cjs > .freebuff-tmp/mth-ol-depth-3.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/mth-ol-depth-3.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/mth-ol-depth-3.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs mathematics OL
module.exports = {
  expectType: "notes",
  titles: {
    "fcf12351-d3b1-4ebf-a940-772b1080dca9": "IGCSE Mathematics: Arithmetic and Place Value",
    "7798ea37-c64d-4cc6-a474-c55584ee86a7": "IGCSE Mathematics: Fractions, Decimals and Percentages",
    "e1c1569d-a45c-4ebe-8012-6df10e500034": "IGCSE Mathematics: Indices and Standard Form",
  },
  rows: {
    "fcf12351-d3b1-4ebf-a940-772b1080dca9": `
<h2>IGCSE Mathematics: Arithmetic and Place Value</h2>
<p>Cambridge IGCSE Mathematics 0580 (2025–2027), section 1 Number: statement 1.1 Types of number, 1.5 Ordering, 1.6 The four operations, 1.9 Estimation, 1.10 Limits of accuracy, 1.14 Using a calculator, 1.15 Time and 1.16 Money. This is the foundation of both papers — Paper 2 (non-calculator) rewards exact written methods, and Paper 4 (calculator) rewards knowing what to type and how to check the answer. Everything here is arithmetic you will use in every other topic, so the methods are written out in full.</p>

<h3>Types of number</h3>
<p>The number family has its own vocabulary, and the exam expects it precisely.</p>
<table border="1" cellpadding="6">
<tr><th>Name</th><th>What it means</th><th>Examples</th></tr>
<tr><td>Natural numbers</td><td>The counting numbers</td><td>1, 2, 3, 4, ...</td></tr>
<tr><td>Integers</td><td>Whole numbers, including zero and the negatives</td><td>... −2, −1, 0, 1, 2 ...</td></tr>
<tr><td>Prime numbers</td><td>Numbers with exactly two factors: 1 and themselves</td><td>2, 3, 5, 7, 11, 13 ... (2 is the only even prime; 1 is not prime because it has one factor)</td></tr>
<tr><td>Square and cube numbers</td><td>An integer times itself, once or twice</td><td>Squares 1, 4, 9, 16, 25 ...; cubes 1, 8, 27, 64 ...</td></tr>
<tr><td>Rational numbers</td><td>Any number that can be written as a fraction p/q with q not zero; equivalently a terminating or recurring decimal</td><td>3/4, −5, 0.25, 0.333...</td></tr>
<tr><td>Irrational numbers</td><td>Numbers that cannot be written as a fraction; their decimals never repeat or terminate</td><td>√2, √3, π</td></tr>
</table>
<p><strong>Factors, multiples, HCF and LCM.</strong> A factor divides a whole number exactly; a multiple is a number in that number's times table. The highest common factor and lowest common multiple are found from prime factor trees — write each number as a product of primes first:</p>
<pre><code>Find the HCF and LCM of 60 and 84.

60 = 2 x 30 = 2 x 2 x 15 = 2 x 2 x 3 x 5 = 2^2 x 3 x 5
84 = 2 x 42 = 2 x 2 x 21 = 2 x 2 x 3 x 7 = 2^2 x 3 x 7

HCF: take each COMMON prime at its LOWEST power:  2^2 x 3 = 12
LCM: take EVERY prime at its HIGHEST power:       2^2 x 3 x 5 x 7 = 420

Check: 60 x 84 = HCF x LCM = 12 x 420 = 5040 ✓</code></pre>

<h3>Place value and ordering</h3>
<p>Each digit is worth ten times the digit to its right. In 47 382 the 7 means 7000, the 3 means 300. In a decimal such as 4.703 the digits to the right of the point are tenths (7/10), hundredths (0/100) and thousandths (3/1000). To order numbers, compare digit by digit from the left, padding with zeros so every number has the same number of decimal places:</p>
<pre><code>Order 0.7, 0.67, 0.706, 0.669 from smallest:

Pad to three decimal places:  0.700, 0.670, 0.706, 0.669
Compare: 0.669 < 0.670 < 0.700 < 0.706
So the order is 0.669, 0.67, 0.7, 0.706.</code></pre>
<p>The symbols are = (equal), ≠ (not equal), &gt; (greater than), &lt; (less than), ⩾ (greater than or equal to) and ⩽ (less than or equal to). On a number line a value increases to the right, so −5 &lt; −2 even though 5 is bigger than 2.</p>

<h3>The four operations with integers</h3>
<p>Addition and subtraction of negatives follow one rule worth stating clearly: adding a negative is subtracting, and subtracting a negative is adding. So 3 − (−5) = 3 + 5 = 8 and 3 + (−5) = 3 − 5 = −2.</p>
<p>Multiplication and division signs follow from patterns: 3 × (−4) = −12 because three lots of −4 is −12, and (−3) × (−4) = +12 because reversing both directions restores the original. As a rule: same signs give a positive answer; different signs give a negative answer. So (−3) × (−4) = 12, (−24) ÷ 6 = −4 and (−24) ÷ (−6) = 4.</p>
<p>Written methods keep place value aligned: long multiplication multiplies by each digit in turn and adds the partial products; long division subtracts whole multiples at a time. Every calculation can be checked by the inverse operation (subtraction checks addition, division checks multiplication) or by estimation.</p>

<h3>The four operations with fractions and decimals</h3>
<p>A fraction is a division: 3/4 means 3 divided by 4. Adding and subtracting needs a common denominator; multiplying multiplies tops and bottoms; dividing multiplies by the reciprocal.</p>
<pre><code>Work out  2/3 + 5/8:

The lowest common denominator of 3 and 8 is 24:
2/3 = 8/24        [multiply top and bottom by 8]
5/8 = 15/24       [multiply top and bottom by 3]
8/24 + 15/24 = 23/24</code></pre>
<pre><code>Work out  3/4 x 2/5:

Multiply the numerators and the denominators:
= (3 x 2)/(4 x 5) = 6/20 = 3/10        [cancelled by dividing top and bottom by 2]</code></pre>
<pre><code>Work out  3/4 ÷ 2/5:

Dividing asks how many 2/5 fit into 3/4. Dividing by a fraction is the same as
multiplying by its reciprocal (flip and multiply):
= 3/4 x 5/2 = (3 x 5)/(4 x 2) = 15/8 = 1 7/8</code></pre>
<p><strong>Why flip and multiply works.</strong> Dividing by 2 is the same as multiplying by 1/2, so dividing by 2/5 should be multiplying by the number whose relationship to 2/5 mirrors 1/2's relationship to 2 — that is 5/2. Checking with decimals confirms it: 3/4 ÷ 2/5 = 0.75 ÷ 0.4 = 1.875, and 15/8 = 1.875 ✓. The rule is not a trick; it is what division by a fraction means.</p>
<p>Decimals add and subtract with the decimal points aligned; multiply ignoring the points then replace so the total number of decimal places matches; divide by multiplying both numbers by a power of ten first.</p>

<h3>Order of operations and brackets</h3>
<p>Without a fixed order, an expression like 3 + 4 × 2² would have several answers. The order is: Brackets, Indices, Division and Multiplication (left to right), Addition and Subtraction (left to right).</p>
<pre><code>3 + 4 x 2^2 = 3 + 4 x 4 = 3 + 16 = 19        [indices first, then multiplication, then addition]
(3 + 4) x 2^2 = 7 x 4 = 28                   [brackets first: a completely different answer]</code></pre>
<p>Brackets also collect negatives: 2 + 3 × (−4) = 2 − 12 = −10, never (2 + 3) × (−4) = −20. When translating words into algebra, put brackets around each grouped idea before simplifying.</p>

<h3>Estimation and rounding</h3>
<p>Rounding rules: to a number of decimal places or significant figures, look at the digit after the one you are keeping; 5 or more rounds up, 4 or less stays. Significant figures start at the first non-zero digit. So 0.04752 is 0.048 (2 s.f.), 0.05 (1 s.f.) and 0.0475 (3 s.f.).</p>
<p>Estimation rounds every input to one significant figure before calculating, giving a rough answer that reveals blunders:</p>
<pre><code>Estimate  39.2 x 5.98:

39.2 rounds to 40;  5.98 rounds to 6
40 x 6 = 240

The exact answer 234.416 is close to 240, so it is plausible.</code></pre>

<h3>Limits of accuracy (bounds)</h3>
<p>A rounded measurement is not exact: a length given as 45 cm to the nearest centimetre is somewhere between 44.5 and 45.5 cm. Those are its bounds — the maximum and minimum the true value could take:</p>
<pre><code>upper bound = measured value + half the unit of accuracy
lower bound = measured value - half the unit of accuracy</code></pre>
<p>Extended questions ask for the bounds of a calculated answer. The rule: to make a quotient as large as possible, divide the largest possible numerator by the smallest possible denominator.</p>
<pre><code>A distance of 45 cm (to the nearest cm) is covered in 6 s (to the nearest s).
Find the bounds of the speed = distance / time.

distance: 44.5 cm to 45.5 cm;  time: 5.5 s to 6.5 s
upper bound of speed = 45.5 / 5.5 = 8.27 cm s-1 (3 s.f.)
lower bound of speed = 44.5 / 6.5 = 6.85 cm s-1 (3 s.f.)</code></pre>
<p>So the speed lies between 6.85 and 8.27 cm s⁻¹. The trap is using 44.5 ÷ 5.5 for the lower bound — dividing two small numbers does not give the smallest quotient; the denominator must be as large as possible.</p>

<h3>Time and money</h3>
<p>Time works in mixed bases: 60 seconds in a minute, 60 minutes in an hour, 24 hours in a day, 7 days in a week. Timetables use the 24-hour clock to avoid ambiguity (14:35 not 2:35 pm), and durations cross hour boundaries by splitting the subtraction: from 09:45 to 12:20 is 2 hours 35 minutes (09:45 → 12:45 would be 3 hours; subtract 25 minutes). Money calculations use the same arithmetic in decimal form, with unit pricing deciding best buys: divide each price by its quantity and compare. Currency conversion multiplies by the given rate, and the inverse rate checks the answer.</p>

<h3>Using a calculator</h3>
<p>A scientific calculator follows the order of operations automatically, so use the fraction, bracket and power keys to enter an expression in one go rather than line by line. Know the ×10ˣ key (for standard form), the square and square-root keys, the fraction key and the reciprocal key. Interpret the display: a long decimal may need rounding to 3 s.f., and an answer like 1.23456789e-5 is standard form for 1.23 × 10⁻⁵. Always check a calculator answer against an estimate — that habit catches mistyped entries, which are the most common calculator mark lost.</p>

<h3>Worked example: a multi-step calculation</h3>
<p>A jacket is reduced by 15% from £84 and then a further 10% is taken off at the till. Find the final price.</p>
<pre><code>First reduction: 15% of 84 = 0.15 x 84 = 12.60
Price after first reduction: 84 - 12.60 = 71.40
Second reduction: 10% of 71.40 = 7.14
Final price: 71.40 - 7.14 = 64.26

Estimate check: 84 down by about 15% is about 71; down 10% is about 64 ✓</code></pre>
<p>Doing it in one step with multipliers gives the same answer: 84 × 0.85 × 0.90 = 64.26 — a method worth knowing for Paper 4, and a check worth doing on Paper 2.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Writing (−3) × (−4) = −12. Two negatives multiply to a positive; check the sign before writing the digits.</li>
<li>Evaluating 3 + 4 × 2² as 28 without brackets. Indices and multiplication come before addition.</li>
<li>Aligning decimal points wrongly when adding decimals, or keeping the wrong number of decimal places when multiplying.</li>
<li>Adding fractions across different denominators: 1/2 + 1/3 is not 2/5. Find a common denominator first.</li>
<li>Reversing the bounds rule for division: the minimum quotient divides the smallest numerator by the largest denominator.</li>
<li>Rounding too early in a multi-step question and compounding the error; keep all digits until the final line.</li>
<li>Confusing factors with multiples: 3 is a factor of 12, 12 is a multiple of 3.</li>
<li>Giving 24-hour times as 14.35 rather than 14:35, or treating durations as ordinary decimal hours (2 h 30 min is 2.5 h, but 2 h 45 min is 2.75 h).</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 3 marks).</strong> Work out 3 + 4 × 2².</p>
<p>Answer: Indices first: 2² = 4. Then multiplication: 4 × 4 = 16. Then addition: 3 + 16 = 19.</p>
<p><strong>Question 2 (Paper 2, 4 marks).</strong> Find the highest common factor and lowest common multiple of 48 and 72.</p>
<p>Answer: 48 = 2⁴ × 3; 72 = 2³ × 3². HCF = 2³ × 3 = 24. LCM = 2⁴ × 3² = 144. Check: 48 × 72 = 3456 = 24 × 144 ✓.</p>
<p><strong>Question 3 (Paper 2, 3 marks).</strong> Work out 3/4 − 2/5.</p>
<p>Answer: Common denominator 20: 15/20 − 8/20 = 7/20.</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> A number is rounded to 2 decimal places as 7.35. Write down the bounds of the number and state which of them could be the exact value of 7.350.</p>
<p>Answer: Bounds are 7.345 ⩽ x &lt; 7.355. Any value in that range rounds to 7.35; 7.350 itself lies inside, so it is possible.</p>
<p><strong>Question 5 (Paper 4, 3 marks).</strong> Estimate the value of (29.4 × 5.03)/1.98 and explain your method.</p>
<p>Answer: Round each to 1 s.f.: 30 × 5/2 = 75. The exact value (74.2 to 3 s.f.) is close, so the working is plausible.</p>
<p><strong>Question 6 (Paper 4, 4 marks).</strong> A train leaves at 09:50 and arrives at 12:25. Calculate the journey time and the average speed if the journey is 162 km.</p>
<p>Answer: 09:50 to 12:50 would be 3 h; 12:25 is 25 minutes earlier, so the journey is 2 h 35 min (2.583 h). Average speed = 162/2.583 = 62.7 km h⁻¹.</p>
<p>With the number system in hand, the next step is the language of parts of a whole: fractions, decimals and percentages.</p>
`,

    "7798ea37-c64d-4cc6-a474-c55584ee86a7": `
<h2>IGCSE Mathematics: Fractions, Decimals and Percentages</h2>
<p>Cambridge IGCSE Mathematics 0580 (2025–2027), section 1 Number: statement 1.4 Fractions, decimals and percentages (equivalence and conversion), 1.13 Percentages (including Extended reverse percentages) and E1.17 Exponential growth and decay. These three representations describe the same quantities, and fluent movement between them is one of the biggest sources of marks in both papers. The note explains why the conversion methods work before showing them, then builds percentages as multipliers — the technique behind most Paper 4 percentage problems.</p>

<h3>What a fraction really is</h3>
<p>A fraction is a division: 3/4 means 3 divided by 4, or three quarters of a whole. The top (numerator) counts the parts; the bottom (denominator) says how many equal parts the whole is cut into. A proper fraction has a smaller numerator (3/4); an improper fraction has a larger one (7/4); a mixed number combines a whole number with a proper fraction (1 3/4).</p>
<pre><code>Convert 2 3/5 to an improper fraction:

2 wholes = 10 fifths, and 3 more fifths gives 13 fifths:
2 3/5 = (2 x 5 + 3)/5 = 13/5</code></pre>
<p>Equivalent fractions are the same quantity written differently: 3/4 = 6/8 = 15/20, because multiplying top and bottom by the same number is multiplying by 1 (a form of 1, such as 3/3), which changes the look but not the value. Cancelling is the reverse: dividing top and bottom by a common factor. Only factors of the whole numerator and denominator can be cancelled — (x + 3)/(x + 2) cannot be simplified by cancelling the x's, because the top is a sum, not a product.</p>

<h3>Converting between fractions, decimals and percentages</h3>
<pre><code>Fraction to decimal: divide.  3/8 = 3 ÷ 8 = 0.375
Decimal to fraction: read the place value.  0.47 = 47/100
Fraction to percentage: divide, then multiply by 100.  3/8 = 0.375 = 37.5%
Percentage to fraction: write over 100 and simplify.  45% = 45/100 = 9/20</code></pre>
<p><strong>Recurring decimals.</strong> A fraction always produces either a terminating decimal or a recurring one, and every recurring decimal converts back to a fraction by the algebra method:</p>
<pre><code>Write 0.444... (4 recurring) as a fraction:

Let x = 0.444...
Then 10x = 4.444...        [shift the decimal one place]
Subtract:  10x - x = 4.444... - 0.444...
9x = 4
x = 4/9</code></pre>
<pre><code>Write 0.273636... (36 recurring) as a fraction:

Let x = 0.273636...
Two digits repeat, so shift two places:  100x = 27.363636...
100x - x = 27.3636... - 0.2736... = 27.09
99x = 27.09  ->  x = 27.09/99 = 301/1100 after multiplying top and bottom by 100 and simplifying</code></pre>
<p>Knowing the common conversions by heart saves time: 1/2 = 0.5 = 50%, 1/4 = 0.25 = 25%, 3/4 = 0.75, 1/5 = 0.2 = 20%, 1/8 = 0.125, 1/3 = 0.333... = 33 1/3%.</p>

<table border="1" cellpadding="6">
<tr><th>Fraction</th><th>Decimal</th><th>Percentage</th></tr>
<tr><td>1/2</td><td>0.5</td><td>50%</td></tr>
<tr><td>1/4</td><td>0.25</td><td>25%</td></tr>
<tr><td>3/4</td><td>0.75</td><td>75%</td></tr>
<tr><td>1/5</td><td>0.2</td><td>20%</td></tr>
<tr><td>1/8</td><td>0.125</td><td>12.5%</td></tr>
<tr><td>1/3</td><td>0.333...</td><td>33 1/3%</td></tr>
<tr><td>2/3</td><td>0.666...</td><td>66 2/3%</td></tr>
</table>
<p>These seven values answer a surprising share of Paper 2 questions by inspection, and they anchor every conversion done the long way.</p>

<h3>Percentages: the multiplier method</h3>
<p>A percentage is a fraction out of 100 — literally per cent, per hundred. Every percentage problem is a multiplication, and the fastest method converts straight to a multiplier.</p>
<pre><code>Find 35% of 240:

35% = 35/100 = 0.35, so  0.35 x 240 = 84

Increase 240 by 35%:
the new value is 135% of the old, so multiply by 1.35:  1.35 x 240 = 324

Decrease 240 by 35%:
the new value is 65% of the old, so multiply by 0.65:   0.65 x 240 = 156</code></pre>
<p><strong>Why the multiplier works.</strong> Increasing by 35% means keeping the original 100% and adding 35%, so the result is 135% of the original, which is 1.35 times it. Decreasing by 35% leaves 65%, which is 0.65 times. The multiplier also chains: successive changes multiply, which is why two discounts of 20% are not one discount of 40% (0.8 × 0.8 = 0.64, a 36% total reduction).</p>
<pre><code>One quantity as a percentage of another:  18 out of 60

18/60 x 100 = 30%</code></pre>
<p><strong>Reverse percentages (Extended).</strong> Working backwards from a final value needs division:</p>
<pre><code>A price after a 20% increase is £72. Find the original price.

The original is 100%, the new price is 120% of it, so the multiplier is 1.2:
original = 72 / 1.2 = £60

Check: 60 x 1.2 = 72 ✓</code></pre>
<p>The common error is finding 20% of 72 and subtracting; the percentage must be taken from the original 100%, not the final amount.</p>

<h3>Percentage change and comparisons</h3>
<pre><code>A coat falls from £80 to £56. Find the percentage decrease.

change = 80 - 56 = 24
percentage change = change / original x 100 = 24/80 x 100 = 30%</code></pre>
<p>Percentage change always uses the <strong>original</strong> value as the denominator. Comparing quantities with different sizes — prices per 100 g, speeds, wages per hour — is done by putting both over a common quantity before comparing.</p>

<h3>Exponential growth and decay (Extended)</h3>
<p>When a quantity changes by the same <em>percentage</em> each period, it is multiplied by a fixed factor each time, and the result is exponential growth or decay. The multiplier is 1 + r for growth and 1 − r for decay, where r is the rate as a decimal.</p>
<pre><code>After n periods at rate r:
growth:    final = original x (1 + r)^n
decay:     final = original x (1 - r)^n</code></pre>
<p><strong>Why the power.</strong> Each period multiplies by the same factor, so n periods multiply n times: an investment of £500 growing 3% a year becomes 500 × 1.03 after one year, 500 × 1.03 × 1.03 after two, and 500 × 1.03ⁿ after n years. The power counts the multiplications.</p>
<pre><code>£500 is invested at 3% compound interest per year for 4 years.

500 x 1.03^4 = 500 x 1.12550881 = £562.75 (2 d.p.)

Year by year check: 515.00 -> 530.45 -> 546.36 -> 562.75 ✓</code></pre>
<pre><code>A car worth £18 000 depreciates 15% per year. Value after 3 years:

18 000 x 0.85^3 = 18 000 x 0.614125 = £11 054.25</code></pre>
<p>Exponential growth graphs climb ever faster and never touch zero; exponential decay graphs fall steeply at first and then level off towards — but never reach — zero (a horizontal asymptote). Doubling and halving questions are solved by logs or trial multiplication: for how many years does £500 at 3% exceed £600? Solve 500 × 1.03ⁿ &gt; 600 by testing values of n, since 1.03ⁿ &gt; 1.2 needs n ⩾ 7 years.</p>

<h3>Worked example: a full percentage question</h3>
<p>A shop sells a jacket for £84 after a 20% reduction. A further 10% discount is offered for cash.</p>
<pre><code>Original price before the 20% reduction:
84 = original x 0.80
original = 84 / 0.80 = £105

Cash price after the extra 10%:
84 x 0.90 = £75.60

Total percentage saving against the original:
saving = 105 - 75.60 = 29.40
percentage saving = 29.40/105 x 100 = 28%

Check with multipliers: 0.80 x 0.90 = 0.72, so the cash price is 72% of the
original and the saving is 28% ✓</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Finding a percentage of the wrong amount: increase/decrease percentages apply to the original; reverse percentages divide by the multiplier.</li>
<li>Adding percentage changes: two 20% discounts give 0.8 × 0.8 = 0.64, a 36% reduction, not 40%.</li>
<li>Writing a recurring decimal as a fraction by eye; use the shift-and-subtract method and show it.</li>
<li>Cancelling across a sum: 3/4 is not 3 quarters of the top and bottom separately.</li>
<li>Using 365 days or 12 months inconsistently in compound problems: the power n counts compounding periods, so match it to the rate.</li>
<li>Forgetting that 15% decrease means multiplying by 0.85, not by −0.15 or 0.15.</li>
<li>Confusing 33% with 1/3 exactly: 1/3 = 33 1/3%, and the difference matters in exact answers.</li>
<li>Deciding an exponential decay value reaches zero; it falls below £1 or 0.001 but never reaches zero.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 3 marks).</strong> Express 0.45 as a fraction in its lowest terms.</p>
<p>Answer: 0.45 = 45/100 = 9/20.</p>
<p><strong>Question 2 (Paper 2, 3 marks).</strong> Write 0.27 with the 27 recurring as a fraction.</p>
<p>Answer: Let x = 0.272727...; then 100x = 27.2727...; subtracting gives 99x = 27, so x = 27/99 = 3/11.</p>
<p><strong>Question 3 (Paper 4, 4 marks).</strong> In a sale, a bike is reduced by 15% to £255. Find the original price.</p>
<p>Answer: £255 represents 85% of the original, so the multiplier is 0.85 and the original price is 255/0.85 = £300. Check: 300 × 0.85 = 255 ✓.</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> A bacteria culture starts with 2000 and increases by 8% each hour. Find the size after 5 hours.</p>
<p>Answer: 2000 × 1.08⁵ = 2000 × 1.4693280768 = 2938.7 ≈ 2939 bacteria.</p>
<p><strong>Question 5 (Paper 4, 3 marks).</strong> A town's population falls from 45 000 to 36 000 over a year. Find the percentage decrease.</p>
<p>Answer: Change = 9000; percentage = 9000/45 000 × 100 = 20%.</p>
<p><strong>Question 6 (Paper 4, 5 marks).</strong> A car is bought for £12 000 and depreciates 18% in the first year and 12% in the second. Find its value after two years and the overall percentage loss.</p>
<p>Answer: 12 000 × 0.82 × 0.88 = 12 000 × 0.7216 = £8659.20. Overall loss = £3340.80, which is 3340.80/12 000 × 100 = 27.84% ≈ 27.8%. (Note 0.82 × 0.88 = 0.7216, a 27.84% total fall — not 30%.)</p>
<p>Fractions describe parts; powers and roots describe repeated multiplication — the next topic.</p>
`,

    "e1c1569d-a45c-4ebe-8012-6df10e500034": `
<h2>IGCSE Mathematics: Indices and Standard Form</h2>
<p>Cambridge IGCSE Mathematics 0580 (2025–2027), section 1 Number: statement 1.3 Powers and roots, 1.7 Indices I (with Extended fractional indices), 1.8 Standard form, E1.18 Surds, and section 2 statement E2.4 Indices II (algebraic indices). Indices are shorthand for repeated multiplication, and their laws are the shortcuts that make large and small numbers manageable. This note derives each law from what it counts, covers standard form arithmetic in full, and finishes with surds and rationalising — an Extended favourite that separates the top grades.</p>

<h3>Powers, roots and the vocabulary</h3>
<p>In 5³ the base is 5 and the index (plural: indices) is 3; it means 5 × 5 × 5 = 125. A square root reverses a square: √25 = 5 because 5² = 25. A cube root reverses a cube: ³√64 = 4 because 4³ = 64.</p>
<ul>
<li>√16 = 4, the <strong>principal</strong> (positive) square root, as printed on a calculator. But the equation x² = 16 has two solutions, x = 4 or x = −4, because (−4)² = 16 as well. The question decides which is wanted: a length is positive; a solution of an equation may be negative.</li>
<li>Notation: a² is read a squared, a³ a cubed, and aⁿ a to the power n. a² ≠ 2a — a² = a × a while 2a = a + a.</li>
</ul>

<h3>The index laws</h3>
<p>Each law is a statement about counting multiplications, so each can be checked by writing the multiplications out.</p>
<pre><code>Law 1:  a^m x a^n = a^(m+n)
Why: a^3 x a^2 = (a x a x a) x (a x a) = a^5, and 3 + 2 = 5.
Example: 2^3 x 2^5 = 2^8 = 256; check: 8 x 32 = 256 ✓

Law 2:  a^m ÷ a^n = a^(m-n)
Why: a^5 ÷ a^2 = (a x a x a x a x a)/(a x a) = a x a x a = a^3, and 5 - 2 = 3.
Example: 5^7 ÷ 5^4 = 5^3 = 125

Law 3:  (a^m)^n = a^(m n)
Why: (a^2)^3 = a^2 x a^2 x a^2 = a^6, and 2 x 3 = 6.
Example: (2x^3)^2 = 2^2 x (x^3)^2 = 4x^6        [the power applies to every factor]

Law 4:  a^0 = 1  (a not zero)
Why: a^3 ÷ a^3 = a^(3-3) = a^0, and any number divided by itself is 1.
Example: 7^0 = 1

Law 5:  a^(-n) = 1/(a^n)
Why: a^(-2) = a^(0-2) = a^0 ÷ a^2 = 1/a^2.
Example: 5^(-2) = 1/25 = 0.04</code></pre>
<p><strong>Fractional indices (Extended).</strong> A fractional index is a root: the denominator of the fraction is the root, the numerator is the power.</p>
<pre><code>a^(1/n) = nth root of a        a^(m/n) = (nth root of a)^m

16^(1/2) = √16 = 4
27^(2/3) = (cube root of 27)^2 = 3^2 = 9
Check the second: 27^(2/3) squared three times over should give 27^2 = 729; 9^3 = 729 ✓</code></pre>

<h3>Indices in algebra (Extended)</h3>
<p>The same laws apply when the base is a letter, and every factor in a bracket carries the power:</p>
<pre><code>Simplify:  (2x^3)^2 x^4 ÷ x^5

(2x^3)^2 = 4x^6        [square the 2 and double the index]
4x^6 x x^4 = 4x^10     [Law 1: add indices]
4x^10 ÷ x^5 = 4x^5     [Law 2: subtract indices]</code></pre>
<pre><code>Solve:  2^x = 32

Write both sides with base 2:  32 = 2^5
2^x = 2^5, so x = 5        [matching bases means matching indices]</code></pre>
<p>When the bases differ, rewrite one as a power of the other: 8 = 2³, so 8^x = 2^(3x). Equations like 3^(x+1) = 27^(x−1) become 3^(x+1) = 3^(3x−3), so x + 1 = 3x − 3, giving x = 2.</p>

<table border="1" cellpadding="6">
<tr><th>Law</th><th>Statement</th><th>Worked line</th></tr>
<tr><td>Multiplying</td><td>aᵐ × aⁿ = aᵐ⁺ⁿ</td><td>2³ × 2⁵ = 2⁸ = 256</td></tr>
<tr><td>Dividing</td><td>aᵐ ÷ aⁿ = aᵐ⁻ⁿ</td><td>5⁷ ÷ 5⁴ = 5³ = 125</td></tr>
<tr><td>Power of a power</td><td>(aᵐ)ⁿ = aᵐⁿ</td><td>(2x³)² = 4x⁶</td></tr>
<tr><td>Zero index</td><td>a⁰ = 1 (a not zero)</td><td>7⁰ = 1</td></tr>
<tr><td>Negative index</td><td>a⁻ⁿ = 1/aⁿ</td><td>5⁻² = 1/25</td></tr>
<tr><td>Fractional index</td><td>a^(m/n) = (ⁿ√a)ᵐ</td><td>27^(2/3) = 9</td></tr>
</table>
<p>Two edge cases deserve care. The zero index says nothing about 0⁰: 0⁰ is undefined, because the pattern a⁰ = 1 holds for every non-zero base while the pattern 0ⁿ = 0 holds for every positive power, and the two patterns collide at the origin. And a negative index never makes a value negative: 2⁻³ = 1/8 is positive, because the minus sign belongs to the position of the power, not to the number itself. Finally, every root can be written as a power — √x = x^(1/2), ³√x = x^(1/3) — which is how a calculator evaluates them and how algebraic roots are simplified in one notation.</p>

<h3>Standard form</h3>
<p>Standard form writes a number as a × 10ⁿ where 1 ⩽ a &lt; 10 and n is an integer. It handles very large and very small quantities without long strings of zeros.</p>
<pre><code>Write in standard form:

47 382 = 4.7382 x 10^4        [the decimal point moves 4 places left]
0.0056 = 5.6 x 10^(-3)        [the decimal point moves 3 places right, so n = -3]</code></pre>
<p><strong>Arithmetic in standard form.</strong> Multiply or divide the numbers first, then the powers of ten, and adjust back into standard form if needed:</p>
<pre><code>(3 x 10^5) x (4 x 10^(-2))
= (3 x 4) x (10^5 x 10^(-2))     [regrouped]
= 12 x 10^3
= 1.2 x 10^4                     [12 is not between 1 and 10, so adjust]

(6 x 10^8) ÷ (2 x 10^3)
= (6 ÷ 2) x 10^(8-3) = 3 x 10^5</code></pre>
<p>Addition and subtraction need matching powers first: 3 × 10⁵ + 4 × 10⁴ = 30 × 10⁴ + 4 × 10⁴ = 34 × 10⁴ = 3.4 × 10⁵. Real-world uses: the speed of light is 3 × 10⁸ m s⁻¹, the size of an atom is about 1 × 10⁻¹⁰ m, and masses, distances and populations in physics and chemistry questions are always quoted this way. A calculator's ×10ˣ key enters the power directly; the answer should be given in the form the question asks, often to 3 s.f.</p>

<h3>Surds (Extended)</h3>
<p>A surd is a root that cannot be written exactly as a fraction — √2, √3, 3√5. Exact answers in surds are often required on Paper 2, where a calculator cannot help. The laws:</p>
<pre><code>√a x √b = √(ab)        √a ÷ √b = √(a/b)        (√a)^2 = a</code></pre>
<p><strong>Simplifying.</strong> Take out the largest square factor:</p>
<pre><code>√50 = √(25 x 2) = √25 x √2 = 5√2
√72 = √(36 x 2) = 6√2
√(9/16) = √9 / √16 = 3/4</code></pre>
<p><strong>Adding like surds.</strong> Only like surds combine, exactly like algebraic terms:</p>
<pre><code>√18 + √8 = 3√2 + 2√2 = 5√2        [simplify first]
2√3 + √5 cannot be combined: they are unlike surds.</code></pre>
<p><strong>Rationalising the denominator.</strong> A fraction with a surd underneath is tidied by multiplying top and bottom by the same surd (or its conjugate):</p>
<pre><code>6/√3 = (6 x √3)/(√3 x √3) = 6√3/3 = 2√3

1/(3 + √2): multiply top and bottom by the conjugate (3 - √2):
= (3 - √2)/[(3 + √2)(3 - √2)]
= (3 - √2)/(9 - 2)          [difference of two squares below]
= (3 - √2)/7</code></pre>
<p>The conjugate works because (a + b)(a − b) = a² − b² removes the square root entirely. Expanding surd brackets uses the same identity: (2 + √3)(2 − √3) = 4 − 3 = 1.</p>

<h3>Worked example: a combined index calculation</h3>
<p>Simplify (2³ × 2⁵) ÷ 2⁴ and check it two ways.</p>
<pre><code>Method 1 (indices): 2^3 x 2^5 = 2^8, then 2^8 ÷ 2^4 = 2^4 = 16
Method 2 (arithmetic): 2^3 x 2^5 = 8 x 32 = 256;  256 ÷ 16 = 16
Both routes give 16 ✓</code></pre>
<p>Second example: write (3√2)² − √8 in the form k√2.</p>
<pre><code>(3√2)^2 = 9 x 2 = 18        [square both the 3 and the √2]
√8 = 2√2
18 - 2√2 is already simple; it cannot be written as k√2 because 18 is rational,
so the answer stays 18 - 2√2.</code></pre>
<p><strong>Standard form in a calculation.</strong> A red blood cell is 7 × 10⁻⁶ m across and a vein is 2.4 × 10⁻³ m wide. How many cells fit side by side?</p>
<pre><code>2.4 x 10^(-3) ÷ 7 x 10^(-6)
= (2.4 ÷ 7) x 10^(-3 - (-6))        [divide the numbers, subtract the indices]
= 0.342857 x 10^3
= 3.43 x 10^2 (3 s.f.)  ≈ 343 cells</code></pre>
<p>The index arithmetic is the whole question: subtracting −6 gives +3, and a sense-check on the powers alone (10⁻³ ÷ 10⁻⁶ = 10³) says the answer must be in the hundreds — which catches sign slips before they cost the final mark.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Multiplying the base by the index: 2³ is 8, not 6; (2³)² = 2⁶ = 64, not 2⁵.</li>
<li>Forgetting to square the coefficient: (2x³)² = 4x⁶, not 2x⁶.</li>
<li>Treating a⁻ⁿ as negative rather than reciprocal: 2⁻³ = 1/8.</li>
<li>Writing 0.00047 as 4.7 × 10⁻³; it is 4.7 × 10⁻⁴ — count the places the point moves.</li>
<li>Leaving a standard-form answer as 12 × 10³; the front number must be between 1 and 10.</li>
<li>Giving √16 = ±4 in a simplification; the square root symbol means the principal root, while x² = 16 has both solutions.</li>
<li>Rationalising only the surd and not its conjugate partner: 1/(3 + √2) needs (3 − √2) top and bottom.</li>
<li>Combining unlike surds: 2√3 + √5 is final; only matching surd parts can be added.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 3 marks).</strong> Simplify (3x²)³ ÷ x⁴.</p>
<p>Answer: (3x²)³ = 27x⁶; 27x⁶ ÷ x⁴ = 27x².</p>
<p><strong>Question 2 (Paper 2, 3 marks).</strong> Evaluate 8^(2/3).</p>
<p>Answer: ³√8 = 2, and 2² = 4. So 8^(2/3) = 4.</p>
<p><strong>Question 3 (Paper 4, 4 marks).</strong> Write 0.000 42 and 63 000 in standard form, then find their product.</p>
<p>Answer: 4.2 × 10⁻⁴ and 6.3 × 10⁴. Product = (4.2 × 6.3) × 10⁰ = 26.46 = 2.646 × 10¹.</p>
<p><strong>Question 4 (Paper 2, 4 marks).</strong> Simplify √48 + 3√12.</p>
<p>Answer: √48 = √(16 × 3) = 4√3; 3√12 = 3 × 2√3 = 6√3; total = 10√3.</p>
<p><strong>Question 5 (Paper 2, 4 marks).</strong> Rationalise the denominator of 5/(2 + √3).</p>
<p>Answer: Multiply by the conjugate: 5(2 − √3)/[(2 + √3)(2 − √3)] = 5(2 − √3)/(4 − 3) = 5(2 − √3) = 10 − 5√3.</p>
<p><strong>Question 6 (Paper 4, 4 marks).</strong> Solve 9^x = 27.</p>
<p>Answer: Write both as powers of 3: 3^(2x) = 3³, so 2x = 3 and x = 3/2. Check: 9^(3/2) = (√9)³ = 3³ = 27 ✓.</p>
<p>From the numbers themselves, the course turns to comparing and sharing them: ratio, rate and proportion.</p>
`,
  },
};
