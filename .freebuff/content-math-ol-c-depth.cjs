// Mathematics OL notes, deepened to the depth bar — Statistics and Data Handling
// (statements 9.1-9.4, 9.6, 9.7), Probability (8.1-8.4), Transformations and Vectors
// (7.1-7.4) and Right-Angled Trigonometry (6.1-6.3, 6.6).
// Cambridge IGCSE Mathematics 0580 Extended, Papers 2 and 4.
// Column vectors follow the house convention: (x; y).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-ol-c-depth.cjs > .freebuff-tmp/math-ol-c.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-ol-c.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-ol-c.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "c4de73c5-5ba1-4192-a207-71e25ddd6870": "Cambridge IGCSE Mathematics: Statistics and Data Handling",
    "120ecca6-69da-44e7-8537-beda4c42532d": "Cambridge IGCSE Mathematics: Probability",
    "6103544a-0080-4c85-af53-ddbb12284c25": "Cambridge IGCSE Mathematics: Transformations and Vectors",
    "dcb48bc6-ebfa-4469-9a47-d9fc8394172f": "Cambridge IGCSE Mathematics: Right-Angled Trigonometry",
  },
  rows: {
    "c4de73c5-5ba1-4192-a207-71e25ddd6870": `
<h2>Cambridge IGCSE Mathematics: Statistics and Data Handling</h2>
<p>Statistics is the art of describing a pile of numbers with a few well-chosen ones: an average to say where the middle lies, a spread to say how tightly the data cluster, and a chart to make the shape visible. The IGCSE questions test exactly that pipeline — classify the data, compute the averages and spread, draw or read the chart, and compare two distributions. This note builds the whole subject from zero: the data types, every average and measure of spread with the frequency-table method, the standard charts, cumulative frequency curves, and histograms with unequal class widths.</p>

<h3>Classifying statistical data</h3>
<table border="1" cellpadding="6">
<tr><th>Type</th><th>Meaning</th><th>Examples</th></tr>
<tr><td>Qualitative (categorical)</td><td>describes a quality, not a number</td><td>favourite colour, blood group</td></tr>
<tr><td>Quantitative</td><td>measured or counted as a number</td><td>height, number of siblings</td></tr>
<tr><td>Discrete</td><td>countable, separate values (usually integers)</td><td>number of children, shoe size</td></tr>
<tr><td>Continuous</td><td>can take any value in a range (measured)</td><td>height, time, mass</td></tr>
</table>
<p>The classification decides which charts and averages are legal: a mode for categorical data, a median for ordered data, class intervals for continuous data. Discrete data are plotted as bar charts with gaps; continuous data as histograms with no gaps (and frequency density on the vertical axis).</p>

<h3>Averages and range</h3>
<pre><code>mean = sum of values / number of values
median = middle value when ordered (mean of the two middle
         values for an even count)
mode = most frequent value (or class); none if no repeats
range = largest - smallest

quartiles: Q1 = lower quartile (25%), Q3 = upper quartile (75%)
interquartile range (IQR) = Q3 - Q1  (spread of the middle 50%)</code></pre>
<p>The mean uses every value (sensitive to outliers); the median ignores extreme values (robust); the mode is the only average available for categorical data. When comparing two data sets, quote an average and a spread: "school A has a higher median but a larger IQR, so its results are higher on average but less consistent."</p>
<p><strong>Worked example.</strong> Find the mean, median, mode and range of: 4, 7, 7, 9, 12, 15, 18.</p>
<pre><code>mean = (4+7+7+9+12+15+18)/7 = 72/7 = 10.3 (3 s.f.)
median = 4th value = 9
mode = 7 (appears twice)
range = 18 - 4 = 14</code></pre>
<p><strong>Worked example 2 (even count).</strong> Find the median of 3, 5, 8, 10, 12, 15.</p>
<pre><code>even count: average the 3rd and 4th values
median = (8 + 10)/2 = 9</code></pre>

<h3>Averages from frequency tables</h3>
<pre><code>mean = sum of (value x frequency) / sum of frequencies
median = the value at position (n + 1)/2 in cumulative order
mode = the value with the highest frequency</code></pre>
<p><strong>Worked example.</strong> The table shows goals scored: 0 (5 players), 1 (8), 2 (6), 3 (2). Find the mean and the median.</p>
<pre><code>total players = 5 + 8 + 6 + 2 = 21
total goals = 0x5 + 1x8 + 2x6 + 3x2 = 0 + 8 + 12 + 6 = 26
mean = 26/21 = 1.24 (3 s.f.)
median position = (21 + 1)/2 = 11th value
cumulative: 5 (0 goals), 13 (1 goal) - the 11th value is 1
median = 1</code></pre>
<p>For grouped data, use midpoints: the mean = Σ(midpoint × frequency)/Σfrequency, and the median comes from the cumulative frequency curve (below). The grouped mean is an estimate because the midpoint stands in for every value in the class.</p>

<h3>Charts and diagrams</h3>
<ul>
<li><strong>Bar chart:</strong> bars with gaps for categorical or discrete data; height = frequency.</li>
<li><strong>Pie chart:</strong> angle = (frequency/total) × 360°; label the sectors with the category.</li>
<li><strong>Pictogram:</strong> a symbol represents a fixed number; a half symbol represents half that number.</li>
<li><strong>Stem-and-leaf:</strong> a sorted display that keeps the actual values; the key explains the split (e.g. 3|4 means 34).</li>
<li><strong>Frequency polygon:</strong> plot frequency against the midpoint of each class and join with straight lines.</li>
</ul>
<p><strong>Worked example (pie chart).</strong> 40 students choose a sport: football 16, tennis 10, swimming 8, other 6. Find the angle for football.</p>
<pre><code>angle = (16/40) x 360 = 144 deg</code></pre>
<p><strong>Worked example 2 (pie chart reverse).</strong> A sector of 72° represents 9 students. How many students in total?</p>
<pre><code>72 deg represents 9  ->  360 deg represents 9 x 360/72 = 45 students</code></pre>

<h3>Cumulative frequency diagrams</h3>
<p>A cumulative frequency table adds frequencies as you move up the classes. Plot cumulative frequency against the upper class boundary and join with a smooth curve; then read positions:</p>
<pre><code>median at n/2
lower quartile at n/4
upper quartile at 3n/4
IQR = Q3 - Q1</code></pre>
<p><strong>Worked example.</strong> A cumulative frequency curve for 60 students' marks: Q1 = 42, median = 55, Q3 = 68. Find the IQR and interpret it.</p>
<pre><code>IQR = 68 - 42 = 26 marks
The middle 50% of students scored within 26 marks of each other;</code></pre>
<p>Always read across to the curve and then down to the horizontal axis — and use the class boundaries, not the midpoints, for the plot positions.</p>

<h3>Histograms and frequency density</h3>
<p>When class widths differ, the height of a bar cannot be the frequency — a wide class would dominate unfairly. Instead, the <em>area</em> of each bar is proportional to the frequency:</p>
<pre><code>frequency density = frequency / class width
frequency = frequency density x class width (area of the bar)</code></pre>
<p><strong>Worked example.</strong> Class 0–10 has frequency 20; 10–20 has frequency 30; 20–40 has frequency 40. Find the frequency densities.</p>
<pre><code>0-10: 20/10 = 2.0
10-20: 30/10 = 3.0
20-40: 40/20 = 2.0</code></pre>
<p>Reading a histogram backwards is the standard question: measure a bar's width and height, multiply to get the frequency, and read the class from the horizontal axis. Remember that the axes often use class boundaries, so a bar from 20 to 40 covers width 20.</p>

<h3>Stem-and-leaf diagrams and frequency polygons</h3>
<p>A stem-and-leaf diagram sorts data while keeping every value visible: the stem is the leading digit and the leaf the final digit, with a key such as 3|4 meaning 34. Interpreting one means reading the ordered leaves to find the median, the quartiles and the shape: the median is the middle leaf, Q1 and Q3 sit at the quarter and three-quarter positions, and the distribution's skew shows in where the leaves bunch.</p>
<p>A frequency polygon plots frequency against the midpoint of each class and joins the points with straight lines; it is the grouped-data equivalent of a line graph and makes comparisons between two distributions easy (plot both polygons on the same axes).</p>
<p><strong>Worked example.</strong> The leaves for stem 4 are 1, 3, 3, 6, 8 and for stem 5 are 0, 2, 5. List the data in order and find the median.</p>
<pre><code>values: 41, 43, 43, 46, 48, 50, 52, 55
n = 8, so the median is the mean of the 4th and 5th values:
(46 + 48)/2 = 47</code></pre>
<p><strong>Worked example 2 (interpreting).</strong> Explain what a long right-hand tail of leaves in a stem-and-leaf diagram indicates.</p>
<pre><code>A long right tail means a few unusually high values: the data
are positively skewed, and the mean will be greater than the
median because the high values pull it upward.</code></pre>

<h3>Comparing distributions</h3>
<p>Comparison questions want two statements: one about the average (which is higher) and one about the spread (which is more consistent). Use median and IQR together — they are robust to outliers — or mean and standard deviation when the data are symmetric and the syllabus supplies it.</p>
<p><strong>Worked example.</strong> Class A: median 62, IQR 18. Class B: median 58, IQR 9. Compare.</p>
<pre><code>Class A has the higher typical score (median 62 vs 58), but its
results are more spread out (IQR 18 vs 9), so Class B is more
consistent even though its middle score is lower.</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Averages)</strong> Find the mean and range of 12, 15, 11, 19, 13. <em>Answer:</em> mean = 70/5 = 14; range = 19 − 11 = 8.</li>
<li><strong>(Frequency table)</strong> Values 1, 2, 3 with frequencies 4, 7, 9. Find the mean. <em>Answer:</em> (4 + 14 + 27)/20 = 45/20 = 2.25.</li>
<li><strong>(Median)</strong> Find the median of 2, 4, 4, 6, 9, 10. <em>Answer:</em> (4 + 6)/2 = 5.</li>
<li><strong>(Pie chart)</strong> A sector of 90° represents 15 people. Find the total. <em>Answer:</em> 15 × 360/90 = 60.</li>
<li><strong>(Cumulative frequency)</strong> For 80 values, where do you read the median? <em>Answer:</em> At cumulative frequency 40, reading across to the curve and down to the axis.</li>
<li><strong>(Histogram)</strong> A bar of width 5 has frequency density 4. Find its frequency. <em>Answer:</em> 5 × 4 = 20.</li>
<li><strong>(Frequency density)</strong> Class 30–50 has frequency 24. Find the frequency density. <em>Answer:</em> 24/20 = 1.2.</li>
<li><strong>(Compare)</strong> Two runners' times: A median 42 s, IQR 3 s; B median 40 s, IQR 8 s. Compare. <em>Answer:</em> B is faster typically (lower median) but less consistent (larger IQR); A is more reliable.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Median without ordering:</strong> the median is the middle of the <em>ordered</em> list. Forgetting to sort is the commonest data-handling error.</li>
<li><strong>Even-count median:</strong> average the two middle values; do not pick one of them.</li>
<li><strong>Grouped mean:</strong> use midpoints and label the answer an estimate — the midpoint is not the actual mean of the class.</li>
<li><strong>Histogram heights:</strong> the vertical axis is frequency density, not frequency; area is the frequency. Reading the height as the frequency is the classic histogram error.</li>
<li><strong>Cumulative frequency positions:</strong> plot against upper class boundaries and read the median at n/2 (not (n+1)/2 on the graph).</li>
<li><strong>Pie chart arithmetic:</strong> check that the angles sum to 360° before answering the next part.</li>
<li><strong>IQR direction:</strong> IQR = upper − lower quartile; a negative IQR means the quartiles are swapped.</li>
<li><strong>Comparison claims:</strong> quote actual values ("median 62 vs 58"), not "better" without evidence.</li>
</ul>
`,
    "120ecca6-69da-44e7-8537-beda4c42532d": `
<h2>Cambridge IGCSE Mathematics: Probability</h2>
<p>Probability measures how likely an event is on a scale from 0 (impossible) to 1 (certain). The IGCSE questions build from single events to combined ones — two dice, two draws without replacement, "at least one" — and the toolkit is small but must be used precisely: the complement rule, the addition rule for mutually exclusive events, the multiplication rule for independent ones, and tree diagrams for everything with stages. This note builds the topic from zero with every rule justified and every standard question type worked.</p>

<h3>The probability scale and notation</h3>
<pre><code>P(event) = number of favourable outcomes / total outcomes
         (when outcomes are equally likely)

0 <= P(A) <= 1
P(not A) = 1 - P(A)        (the complement rule)</code></pre>
<p>Probabilities are written as fractions, decimals or percentages — but keep one form within a question. The complement rule is the most powerful single line in the topic: "at least one" is almost always easier as 1 − P(none).</p>
<p><strong>Worked example.</strong> A bag has 5 red, 3 blue and 2 green counters. Find P(red) and P(not red).</p>
<pre><code>total = 10
P(red) = 5/10 = 1/2
P(not red) = 1 - 1/2 = 1/2  (check: 3 + 2 = 5 of 10)</code></pre>

<h3>Relative frequency and expected frequency</h3>
<pre><code>relative frequency = number of times the event occurred
                     / total number of trials

expected number = probability x number of trials</code></pre>
<p>Relative frequency estimates probability from experiment; it approaches the theoretical value as trials increase (the law of large numbers). Questions ask you to compare an experimental relative frequency with a theoretical probability and comment on the discrepancy — small samples fluctuate, large samples converge.</p>
<p><strong>Worked example.</strong> A biased die is rolled 200 times; a six appears 50 times. Estimate P(six) and predict the number of sixes in 500 rolls.</p>
<pre><code>relative frequency = 50/200 = 0.25
expected in 500 = 0.25 x 500 = 125</code></pre>

<h3>Combined events: the two rules</h3>
<table border="1" cellpadding="6">
<tr><th>Rule</th><th>When to use it</th><th>Formula</th></tr>
<tr><td>Addition (OR)</td><td>mutually exclusive events — cannot both happen</td><td>P(A or B) = P(A) + P(B)</td></tr>
<tr><td>Multiplication (AND)</td><td>independent events — one does not affect the other</td><td>P(A and B) = P(A) × P(B)</td></tr>
</table>
<p>The words "or" and "and" map onto add and multiply, but the conditions matter: if events are not mutually exclusive, subtract the overlap; if they are not independent, the second probability changes (see trees below).</p>
<p><strong>Worked example 1.</strong> A fair die is rolled once. Find P(3 or 4).</p>
<pre><code>mutually exclusive: 1/6 + 1/6 = 2/6 = 1/3</code></pre>
<p><strong>Worked example 2.</strong> Two fair coins are tossed. Find P(both heads).</p>
<pre><code>independent: 1/2 x 1/2 = 1/4</code></pre>
<p><strong>Worked example 3 (not mutually exclusive).</strong> From a standard pack, find P(a heart or a king).</p>
<pre><code>P(heart) = 13/52, P(king) = 4/52, P(heart and king) = 1/52
P(heart or king) = 13/52 + 4/52 - 1/52 = 16/52 = 4/13</code></pre>

<h3>Tree diagrams</h3>
<p>Trees handle multi-stage experiments, especially without replacement. Multiply along the branches for a sequence, add between branches for alternative ways to get the same outcome.</p>
<p><strong>Worked example 1 (with replacement).</strong> A bag has 3 red and 2 blue counters. Two are drawn with replacement. Find P(two red) and P(one of each).</p>
<pre><code>P(RR) = 3/5 x 3/5 = 9/25
P(RB) = 3/5 x 2/5 = 6/25;  P(BR) = 2/5 x 3/5 = 6/25
P(one of each) = 6/25 + 6/25 = 12/25</code></pre>
<p><strong>Worked example 2 (without replacement).</strong> Same bag, two counters drawn without replacement. Find P(two red) and P(one of each).</p>
<pre><code>P(RR) = 3/5 x 2/4 = 6/20 = 3/10
P(RB) = 3/5 x 2/4 = 6/20;  P(BR) = 2/5 x 3/4 = 6/20
P(one of each) = 12/20 = 3/5</code></pre>
<p>The denominators drop by one on the second draw without replacement — that is the entire difference, and forgetting it is the standard error.</p>

<h3>Sample space diagrams</h3>
<p>A sample space diagram lists every possible outcome, so probabilities can be counted rather than guessed. For two dice, a two-way grid of 36 cells shows each pair; shading the cells that satisfy an event turns the question into counting squares. The method protects against the commonest combined-event error — treating non-equally-likely outcomes as equally likely.</p>
<p><strong>Worked example.</strong> Two fair dice are rolled. Find P(total = 7).</p>
<pre><code>total outcomes = 6 x 6 = 36
totals of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes
P(total 7) = 6/36 = 1/6</code></pre>
<p><strong>Worked example 2 (sums).</strong> From the same grid, find P(total is more than 10).</p>
<pre><code>totals 11 or 12: (5,6), (6,5), (6,6) = 3 outcomes
P = 3/36 = 1/12</code></pre>
<p>The grid also answers difference and product questions: mark the cells whose difference is 2, or whose product is even, and count. Writing the grid out takes a minute and removes the guesswork from every part of the question.</p>

<h3>Two-way tables and Venn diagrams</h3>
<p>A two-way table classifies individuals by two attributes at once — boys and girls against glasses and no glasses — with totals in the margins. Reading probabilities from it is a matter of restricting attention to the right row, column or cell:</p>
<ul>
<li><strong>P(A and B):</strong> the cell where the row and column meet, over the grand total.</li>
<li><strong>P(A or B):</strong> the sum of the cells in A plus the cells in B minus the overlap, over the grand total.</li>
<li><strong>P(A | B):</strong> the A-cell inside B's row (or column) over B's total.</li>
</ul>
<p>Venn diagrams do the same job for sets: the intersection is "and" (multiply along a branch or read the overlap), the union is "or" (add the regions). Choosing between the two representations is a matter of what the question gives; both are equally valid, and the arithmetic is identical once the numbers sit in the right places.</p>

<h3>Conditional probability</h3>
<p>Conditional probability asks for the chance of A given that B has happened:</p>
<pre><code>P(A | B) = P(A and B) / P(B)</code></pre>
<p>Two-way tables are the friendliest setting: restrict attention to the row or column named by the condition, then divide by that row or column's total.</p>
<p><strong>Worked example.</strong> 60 students: 25 study French, 35 study Spanish, 15 study both. Find P(studies French | studies Spanish).</p>
<pre><code>given Spanish: restrict to the 35 Spanish students
of those, 15 also study French
P(French | Spanish) = 15/35 = 3/7</code></pre>
<p><strong>Worked example 2 (two-way table).</strong> A table shows 40 boys (12 play chess) and 30 girls (18 play chess). Find P(plays chess | girl).</p>
<pre><code>restrict to girls: 30; chess players among them: 18
P = 18/30 = 3/5</code></pre>

<h3>Independent events and the multiplication rule</h3>
<p>Two events are independent when the outcome of one does not change the probability of the other. The test is arithmetic: P(A and B) = P(A) × P(B) exactly when they are independent. Questions often give the separate probabilities and ask you to check independence, or give P(A), P(B) and P(A and B) and ask whether the events are independent.</p>
<pre><code>if P(A and B) = P(A) x P(B)  ->  independent
if not                        ->  not independent (associated)</code></pre>
<p><strong>Worked example.</strong> P(rain) = 0.3, P(late) = 0.2, P(rain and late) = 0.06. Are the events independent?</p>
<pre><code>P(rain) x P(late) = 0.3 x 0.2 = 0.06
0.06 = 0.06, so the events are independent.</code></pre>

<h3>"At least one" problems</h3>
<p>The complement trick: P(at least one) = 1 − P(none).</p>
<p><strong>Worked example.</strong> A die is rolled twice. Find P(at least one six).</p>
<pre><code>P(no six) = (5/6) x (5/6) = 25/36
P(at least one six) = 1 - 25/36 = 11/36</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Complement)</strong> P(A) = 0.35. Find P(not A). <em>Answer:</em> 0.65.</li>
<li><strong>(Single event)</strong> A bag has 4 green and 6 yellow balls. Find P(green). <em>Answer:</em> 4/10 = 2/5.</li>
<li><strong>(Mutually exclusive)</strong> A spinner has probabilities 0.2, 0.3, 0.4 and x. Find x. <em>Answer:</em> 1 − 0.9 = 0.1.</li>
<li><strong>(Independent)</strong> P(A) = 0.6, P(B) = 0.5, independent. Find P(A and B) and P(A or B). <em>Answer:</em> 0.30; 0.6 + 0.5 − 0.3 = 0.8.</li>
<li><strong>(Tree)</strong> Two draws without replacement from 5 red, 3 blue. Find P(both blue). <em>Answer:</em> 3/8 × 2/7 = 6/56 = 3/28.</li>
<li><strong>(At least one)</strong> A biased coin has P(head) = 0.4. Tossed twice, find P(at least one head). <em>Answer:</em> 1 − 0.6² = 1 − 0.36 = 0.64.</li>
<li><strong>(Relative frequency)</strong> 400 seeds are planted; 340 germinate. Estimate the germination probability. <em>Answer:</em> 340/400 = 0.85.</li>
<li><strong>(Conditional)</strong> In a class, 12 of 20 boys and 8 of 15 girls wear glasses. Find P(wears glasses | boy). <em>Answer:</em> 12/20 = 3/5.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Adding when you should multiply:</strong> "or" adds (for exclusive events), "and" multiplies (for independent ones). Mixed-up rules produce impossible answers above 1 — a check worth making.</li>
<li><strong>Forgetting non-replacement:</strong> the second denominator drops by one and the numerator of the taken colour drops too.</li>
<li><strong>Probabilities above 1:</strong> an answer of 1.2 is always wrong; re-check the rule used.</li>
<li><strong>Counting without equally likely outcomes:</strong> P = favourable/total only when every outcome is equally likely; loaded dice and biased spinners need empirical or given probabilities.</li>
<li><strong>"At least one" done the long way:</strong> summing every case wastes time and invites errors; use 1 − P(none).</li>
<li><strong>Conditional without restricting:</strong> P(A | B) uses the total of B's group, not the grand total. The word "given" is the signal.</li>
<li><strong>Not adding alternative branches:</strong> one-of-each has two orders (RB and BR); both must be included.</li>
<li><strong>Mixing forms:</strong> fractions, decimals and percentages within one calculation invite arithmetic slips; choose one form and stay with it.</li>
</ul>
`,
    "6103544a-0080-4c85-af53-ddbb12284c25": `
<h2>Cambridge IGCSE Mathematics: Transformations and Vectors</h2>
<p>Transformations move shapes on a grid, and vectors describe those moves with numbers. The exam asks two things: perform a transformation and, more often, describe one completely — with its centre, angle, direction, line or scale factor. This note builds the topic from zero: the four transformations and the full-description checklist for each, enlargement and its effect on area, vector notation with the house column-vector form (x; y), vector arithmetic, and the vector-geometry proofs that show lines are parallel or points are collinear.</p>

<h3>The four transformations</h3>
<table border="1" cellpadding="6">
<tr><th>Transformation</th><th>What changes</th><th>What must be stated in a description</th></tr>
<tr><td>Translation</td><td>position only, no rotation or resize</td><td>the column vector of the move</td></tr>
<tr><td>Reflection</td><td>mirror image</td><td>the line of reflection (e.g. x = 2, y = x)</td></tr>
<tr><td>Rotation</td><td>turns about a point</td><td>centre, angle, and direction (clockwise or anticlockwise)</td></tr>
<tr><td>Enlargement</td><td>resizes about a point</td><td>centre and scale factor</td></tr>
</table>
<p>The complete description is the mark: "rotation" alone scores nothing; "rotation 90° anticlockwise about (2, 1)" scores fully.</p>

<h3>Translation</h3>
<p>A translation moves every point by the same vector. In column form (x; y), x is the horizontal move and y the vertical move; right and up are positive.</p>
<p><strong>Worked example.</strong> Triangle A has vertices (1, 1), (3, 1), (1, 4). Translate by (4; −2) and give the image coordinates.</p>
<pre><code>(1, 1) -> (5, -1)
(3, 1) -> (7, -1)
(1, 4) -> (5, 2)</code></pre>
<p>The shape is congruent to the original (same size and shape), and the orientation is unchanged.</p>

<h3>Reflection</h3>
<p>A reflection flips a shape across a line; the line is the perpendicular bisector of the segment joining each point to its image. Common lines: x = a (vertical), y = b (horizontal), y = x, y = −x.</p>
<p><strong>Worked example.</strong> Reflect the point (3, 5) in the line y = x.</p>
<pre><code>reflection in y = x swaps the coordinates: (3, 5) -> (5, 3)</code></pre>
<p><strong>Worked example 2.</strong> Reflect (2, 4) in the line x = 1.</p>
<pre><code>the line x = 1 is vertical; the distance of x = 2 from it is 1,
so the image is 1 unit on the other side: (0, 4)</code></pre>
<p>To find the mirror line from a shape and its image, join a point to its image and draw the perpendicular bisector of that segment.</p>

<h3>Rotation</h3>
<p>A rotation turns a shape about a fixed centre through a given angle. The four standard angles are 90° and 180° in either direction; 90° clockwise equals 270° anticlockwise.</p>
<p><strong>Worked example.</strong> Rotate the point (3, 1) 90° clockwise about the origin.</p>
<pre><code>90 deg clockwise about O: (x, y) -> (y, -x)
(3, 1) -> (1, -3)</code></pre>
<p><strong>Worked example 2.</strong> Rotate (2, 5) 180° about the origin.</p>
<pre><code>180 deg: (x, y) -> (-x, -y)
(2, 5) -> (-2, -5)</code></pre>
<p>For a centre other than the origin, translate the centre to the origin, rotate, then translate back — or count the grid squares from the centre.</p>

<h3>Enlargement</h3>
<p>An enlargement with centre C and scale factor k maps every point so that its distance from C is multiplied by k. Negative scale factors put the image on the far side of the centre; fractional factors between 0 and 1 shrink the shape.</p>
<pre><code>image distance from centre = k x object distance from centre
area of image = k^2 x area of object</code></pre>
<p><strong>Worked example.</strong> Enlarge the point (2, 3) by scale factor 3 about the origin.</p>
<pre><code>(2, 3) -> (6, 9)</code></pre>
<p><strong>Worked example 2 (area).</strong> A triangle of area 12 cm² is enlarged by scale factor 2.5. Find the image area.</p>
<pre><code>area factor = k^2 = 6.25
new area = 12 x 6.25 = 75 cm^2</code></pre>
<p>Enlargement is the only transformation that changes area (unless k = 1 or −1); translations, reflections and rotations preserve both shape and size.</p>

<h3>Vectors: notation and magnitude</h3>
<p>A vector has magnitude and direction. In this course it is written as a column vector (x; y): x is the horizontal component, y the vertical. The same vector can be written as a bold letter a with an arrow above it.</p>
<pre><code>column vector (x; y)
magnitude = sqrt(x^2 + y^2)
direction angle to the horizontal: tan(theta) = y/x
equal vectors have the same components; opposite vectors
negate both components</code></pre>
<p><strong>Worked example.</strong> Find the magnitude and direction of the vector (3; 4).</p>
<pre><code>magnitude = sqrt(9 + 16) = 5
tan(theta) = 4/3  ->  theta = 53.1 deg above the horizontal</code></pre>

<h3>Vector arithmetic and geometry</h3>
<pre><code>addition: (a; b) + (c; d) = (a + c; b + d)
subtraction: (a; b) - (c; d) = (a - c; b - d)
scalar multiple: k(a; b) = (ka; kb)

position vector of A relative to O: OA
AB = OB - OA
midpoint of AB: (OA + OB)/2</code></pre>
<p><strong>Worked example.</strong> OA = (2; 1), OB = (7; 5). Find AB and the midpoint of AB.</p>
<pre><code>AB = OB - OA = (7 - 2; 5 - 1) = (5; 4)
midpoint = ((2 + 7)/2; (1 + 5)/2) = (4.5; 3)</code></pre>
<p><strong>Worked example 2 (parallel).</strong> Show that AB is parallel to CD given A(1, 2), B(5, 8), C(0, 1), D(6, 10).</p>
<pre><code>AB = (5 - 1; 8 - 2) = (4; 6)
CD = (6 - 0; 10 - 1) = (6; 9)
(6; 9) = 1.5 x (4; 6), so CD = 1.5 AB: parallel (and longer)</code></pre>
<p>Parallel vectors are scalar multiples of each other; collinear points occur when AB and AC (or AB and BC) are parallel and share a point.</p>

<h3>Combining transformations and invariant points</h3>
<p>Two transformations applied in sequence are not the same as the reverse order: a reflection followed by a rotation generally differs from the rotation followed by the reflection. When a question asks for the single transformation equivalent to two, apply both to a convenient point (the origin or a vertex) and to a second point, then identify the transformation that maps the original to the final image. Invariant points are points that do not move: every point on a mirror line is invariant under a reflection, the centre of a rotation is invariant, and no point is invariant under a translation.</p>
<p><strong>Worked example.</strong> A shape is reflected in the x-axis and then translated by (0; 3). Find the image of (2, 1) and identify any invariant points.</p>
<pre><code>reflection in the x-axis: (2, 1) -> (2, -1)
translation by (0; 3): (2, -1) -> (2, 2)
No invariant points: the reflection moved every point off the
axis, and the translation then moved everything upward.</code></pre>
<p><strong>Worked example 2 (invariant line).</strong> State the invariant points of a reflection in the line y = 2.</p>
<pre><code>Every point with y-coordinate 2 lies on the mirror line and does
not move: the whole line y = 2 is invariant.</code></pre>

<h3>Vectors in context: displacement and velocity</h3>
<p>Column vectors describe any quantity with magnitude and direction in two dimensions: displacement (a move from one point to another), velocity (displacement per second) and force (a push in a direction). The arithmetic is identical; only the interpretation changes.</p>
<ul>
<li><strong>Displacement:</strong> AB is the vector from A to B; a round trip returns to the start, so the sum of the vectors around a closed polygon is zero.</li>
<li><strong>Velocity:</strong> a velocity vector (3; −2) means 3 units per second right and 2 units per second down; position after t seconds is the starting position plus t × velocity.</li>
<li><strong>Resultant:</strong> the sum of two vectors; a vector and its negative cancel.</li>
</ul>
<p><strong>Worked example.</strong> A particle starts at (1, 2) and moves with velocity (3; −1) for 4 seconds. Find its final position.</p>
<pre><code>displacement = 4 x (3; -1) = (12; -4)
final position = (1 + 12; 2 - 4) = (13; -2)</code></pre>

<h3>Worked examples: vector proofs</h3>
<p><strong>Worked example.</strong> In triangle OAB, P is the midpoint of OA and Q is the midpoint of OB. Prove PQ is parallel to AB.</p>
<pre><code>OP = (1/2) OA, OQ = (1/2) OB
PQ = OQ - OP = (1/2)(OB - OA) = (1/2) AB
PQ is a scalar multiple of AB, so PQ is parallel to AB
(and half its length).</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Translation)</strong> Translate (2, 3) by (−1; 4). <em>Answer:</em> (1, 7).</li>
<li><strong>(Reflection)</strong> Reflect (4, 1) in the x-axis. <em>Answer:</em> (4, −1).</li>
<li><strong>(Rotation)</strong> Rotate (5, 2) 90° anticlockwise about the origin. <em>Answer:</em> (−2, 5).</li>
<li><strong>(Enlargement)</strong> Enlarge (1, 2) by factor −2 about the origin. <em>Answer:</em> (−2, −4).</li>
<li><strong>(Description)</strong> Describe fully the transformation mapping (1, 1) to (3, 5). <em>Answer:</em> Translation by (2; 4) — one of many correct complete descriptions.</li>
<li><strong>(Magnitude)</strong> Find the magnitude of (6; 8). <em>Answer:</em> √(36 + 64) = 10.</li>
<li><strong>(Position vectors)</strong> OA = (1; 4), OB = (5; 2). Find AB. <em>Answer:</em> (4; −2).</li>
<li><strong>(Collinear)</strong> Show A(1, 1), B(3, 4), C(7, 10) are collinear. <em>Answer:</em> AB = (2; 3), AC = (6; 9) = 3 AB — parallel and share A, so collinear.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Incomplete descriptions:</strong> "enlargement by 2" omits the centre and loses marks; "reflection" omits the line. State every attribute.</li>
<li><strong>Direction of rotation:</strong> clockwise and anticlockwise are different transformations; a 90° rotation clockwise is not the same as anticlockwise.</li>
<li><strong>Area under enlargement:</strong> area scales by k², not k. Doubling the sides quadruples the area.</li>
<li><strong>Vector direction:</strong> AB = OB − OA, not OA − OB. Reversing the subtraction negates the vector.</li>
<li><strong>Column order:</strong> (x; y) is horizontal then vertical. Swapping produces a reflection in y = x, not the intended vector.</li>
<li><strong>Parallelogram assumptions:</strong> equal magnitudes do not imply equal vectors — direction matters too.</li>
<li><strong>Negative scale factors:</strong> the image lies on the opposite side of the centre; it is not simply "smaller".</li>
<li><strong>Collinearity proof:</strong> showing parallel is not enough — the segments must also share a point. State it.</li>
</ul>
`,
    "dcb48bc6-ebfa-4469-9a47-d9fc8394172f": `
<h2>Cambridge IGCSE Mathematics: Right-Angled Trigonometry</h2>
<p>Right-angled triangles are the most useful triangles in mathematics: Pythagoras relates the three sides, and the sine, cosine and tangent ratios relate sides to angles. Between them they solve every distance and angle problem the IGCSE sets, from ladders against walls to angles of elevation and three-figure bearings. This note builds the topic from zero: Pythagoras with its converse and 3D use, the SOHCAHTOA ratios with the selection method, exact values derived rather than memorised, and the multi-step problems that combine Pythagoras with trigonometry.</p>

<h3>Pythagoras' theorem</h3>
<pre><code>in a right-angled triangle: a^2 + b^2 = c^2
where c is the hypotenuse (the side opposite the right angle)</code></pre>
<p>The theorem is a statement about areas: the square on the hypotenuse equals the sum of the squares on the other two sides. The converse identifies right angles: if a² + b² = c² for the longest side c, the triangle is right-angled — the standard test for 3-4-5 and 5-12-13 triangles.</p>
<p><strong>Worked example 1.</strong> A right-angled triangle has legs 6 cm and 8 cm. Find the hypotenuse.</p>
<pre><code>c^2 = 6^2 + 8^2 = 36 + 64 = 100
c = 10 cm</code></pre>
<p><strong>Worked example 2 (finding a leg).</strong> The hypotenuse is 13 cm and one leg is 5 cm. Find the other leg.</p>
<pre><code>a^2 = 13^2 - 5^2 = 169 - 25 = 144
a = 12 cm</code></pre>
<p><strong>Worked example 3 (converse).</strong> Is a triangle with sides 7, 24, 25 right-angled?</p>
<pre><code>7^2 + 24^2 = 49 + 576 = 625 = 25^2
yes - right-angled, with the right angle opposite the 25 side</code></pre>

<h3>Pythagoras in three dimensions</h3>
<p>In a cuboid, the space diagonal uses Pythagoras twice: first across the base, then up the height.</p>
<pre><code>space diagonal = sqrt(l^2 + w^2 + h^2)</code></pre>
<p><strong>Worked example.</strong> A cuboid is 3 cm by 4 cm by 12 cm. Find the length of the space diagonal.</p>
<pre><code>d = sqrt(9 + 16 + 144) = sqrt(169) = 13 cm</code></pre>

<h3>The three ratios: SOHCAHTOA</h3>
<pre><code>sin(theta) = opposite/hypotenuse      (SOH)
cos(theta) = adjacent/hypotenuse      (CAH)
tan(theta) = opposite/adjacent       (TOA)</code></pre>
<p>Label the sides relative to the angle in question: the hypotenuse is always opposite the right angle; the opposite is across from the angle; the adjacent is the remaining side touching the angle. The selection method: mark the known side and the wanted side, then ask which ratio contains both.</p>
<p><strong>Worked example 1 (finding a side).</strong> In a right-angled triangle, the angle is 35° and the hypotenuse is 12 cm. Find the opposite side.</p>
<pre><code>known: hypotenuse; want: opposite  ->  sine
sin(35) = opposite/12
opposite = 12 sin(35) = 12 x 0.574 = 6.88 cm</code></pre>
<p><strong>Worked example 2 (finding a side with cosine).</strong> Angle 40°, hypotenuse 20 cm; find the adjacent side.</p>
<pre><code>cos(40) = adjacent/20
adjacent = 20 cos(40) = 20 x 0.766 = 15.3 cm</code></pre>
<p><strong>Worked example 3 (finding an angle).</strong> Opposite 5 cm, adjacent 9 cm. Find the angle.</p>
<pre><code>tan(theta) = 5/9 = 0.5556
theta = tan-1(0.5556) = 29.1 deg</code></pre>
<p>For angles, use the inverse functions (sin⁻¹, cos⁻¹, tan⁻¹) and check the calculator is in degree mode — a radian-mode calculator turns 90° into 1.57 and ruins the paper.</p>

<h3>Exact trigonometric values</h3>
<p>Three angles have exact values worth knowing, derived from two special triangles:</p>
<table border="1" cellpadding="6">
<tr><th>Angle</th><th>sin</th><th>cos</th><th>tan</th></tr>
<tr><td>30°</td><td>1/2</td><td>√3/2</td><td>1/√3</td></tr>
<tr><td>45°</td><td>1/√2</td><td>1/√2</td><td>1</td></tr>
<tr><td>60°</td><td>√3/2</td><td>1/2</td><td>√3</td></tr>
</table>
<p>Derivation: a 45-45-90 triangle with legs 1 has hypotenuse √2 (Pythagoras), giving sin 45 = 1/√2. An equilateral triangle of side 2 split in half gives a 30-60-90 triangle with sides 1, √3, 2, giving all six values. Deriving them once beats memorising them badly.</p>
<p>Two sanity checks keep the table honest: sine increases from 0 to 1 as the angle grows from 0° to 90°, so sin 30 must be smaller than sin 60; and cosine runs the other way, so cos 30 must be larger than cos 60. If an exact value breaks either ordering, the table has been misremembered.</p>
<p><strong>Worked example.</strong> Find the exact value of sin 60° × tan 30°.</p>
<pre><code>sin 60 = sqrt(3)/2;  tan 30 = 1/sqrt(3)
product = (sqrt(3)/2) x (1/sqrt(3)) = 1/2</code></pre>

<h3>Angles of elevation and depression</h3>
<p>An angle of elevation is measured upward from the horizontal to an object; an angle of depression is measured downward. Both are measured from the observer's eye line, and the angle of depression from A to B equals the angle of elevation from B to A (alternate angles).</p>
<p><strong>Worked example.</strong> From a point 40 m from the base of a tower, the angle of elevation to the top is 32°. Find the tower's height.</p>
<pre><code>tan(32) = height/40
height = 40 tan(32) = 40 x 0.625 = 25.0 m</code></pre>
<p><strong>Worked example 2 (depression).</strong> A cliff is 60 m high; the angle of depression to a boat is 25°. Find the horizontal distance to the boat.</p>
<pre><code>the angle at the boat is also 25 deg (alternate)
tan(25) = 60/d  ->  d = 60/tan(25) = 60/0.466 = 128.7 m</code></pre>

<h3>Choosing the method: a decision routine</h3>
<p>Most lost trigonometry marks come from choosing the wrong tool, not from arithmetic. The routine below takes ten seconds and removes the guesswork:</p>
<ol>
<li><strong>Is there a right angle?</strong> If not, the question needs the sine or cosine rule (a different topic) — do not force SOHCAHTOA onto a triangle without a right angle.</li>
<li><strong>What do you know — two sides, or a side and an angle?</strong> Two sides with no angle means Pythagoras. A side and an angle means trigonometry.</li>
<li><strong>Which ratio?</strong> Mark the known side and the target relative to the given angle, then pick the ratio containing both: sin uses opposite and hypotenuse, cos uses adjacent and hypotenuse, tan uses opposite and adjacent.</li>
<li><strong>What is the unknown — a side or an angle?</strong> A side comes from multiplying; an angle needs the inverse function.</li>
</ol>
<p><strong>Worked example.</strong> A roof rafter is 4.5 m long and meets the horizontal at 38°. Find the vertical rise and the horizontal run.</p>
<pre><code>rise: sin(38) = rise/4.5  ->  rise = 4.5 sin(38) = 2.77 m
run:  cos(38) = run/4.5   ->  run = 4.5 cos(38) = 3.55 m
check: 2.77^2 + 3.55^2 = 7.67 + 12.60 = 20.27 ~ 4.5^2</code></pre>
<p><strong>Worked example 2 (finding the angle of a ladder).</strong> A 6 m ladder reaches 5.2 m up a wall. Find the angle it makes with the ground.</p>
<pre><code>sin(theta) = 5.2/6 = 0.867  ->  theta = 60.1 deg</code></pre>

<h3>Multi-step problems: Pythagoras and trigonometry together</h3>
<p>Many questions need both tools: Pythagoras to find a side in one triangle, trigonometry to use it in another. The method: draw and label every triangle, find the shared side first, then proceed.</p>
<p><strong>Worked example.</strong> A ladder 5 m long leans against a wall, with its foot 2 m from the wall. Find the height reached and the angle the ladder makes with the ground.</p>
<pre><code>height: h^2 = 5^2 - 2^2 = 25 - 4 = 21  ->  h = 4.58 m
angle: cos(theta) = 2/5 = 0.4  ->  theta = 66.4 deg</code></pre>
<p><strong>Worked example 2 (two triangles).</strong> From a point P, the angle of elevation to the top of a building is 30°; from a point Q, 20 m closer, it is 45°. Find the height.</p>
<pre><code>let h be the height and x the distance from Q to the base.
tan(45) = h/x  ->  h = x
tan(30) = h/(x + 20)
h = (x + 20) tan(30) = (h + 20)(1/sqrt(3))
h sqrt(3) = h + 20  ->  h(sqrt(3) - 1) = 20
h = 20/(1.732 - 1) = 20/0.732 = 27.3 m</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Pythagoras)</strong> A right-angled triangle has legs 9 and 12. Find the hypotenuse. <em>Answer:</em> √(81 + 144) = √225 = 15.</li>
<li><strong>(Leg)</strong> Hypotenuse 17, one leg 8. Find the other. <em>Answer:</em> √(289 − 64) = 15.</li>
<li><strong>(Ratio)</strong> Angle 28°, adjacent 15 cm. Find the opposite side. <em>Answer:</em> tan 28 = o/15 → o = 15 × 0.532 = 7.98 cm.</li>
<li><strong>(Angle)</strong> Opposite 7, hypotenuse 10. Find the angle. <em>Answer:</em> sin θ = 0.7 → θ = 44.4°.</li>
<li><strong>(Exact)</strong> Find cos 30° exactly. <em>Answer:</em> √3/2.</li>
<li><strong>(Elevation)</strong> From 25 m away, the angle of elevation to a tree top is 40°. Find the height. <em>Answer:</em> 25 tan 40 = 25 × 0.839 = 21.0 m.</li>
<li><strong>(3D)</strong> A cuboid is 2 cm by 3 cm by 6 cm. Find its space diagonal. <em>Answer:</em> √(4 + 9 + 36) = √49 = 7 cm.</li>
<li><strong>(Combined)</strong> A ship sails 30 km east then 40 km north. Find its distance from the start and the bearing of its final position. <em>Answer:</em> distance = 50 km; tan θ = 40/30 → θ = 53.1°, bearing 053°.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Calculator mode:</strong> check DEG, not RAD or GRAD, before any trigonometric calculation. A radian answer is usually obviously wrong (tiny or huge), but only if you check.</li>
<li><strong>Wrong ratio:</strong> label the sides relative to the angle before choosing SOH, CAH or TOA; picking by habit is the commonest trigonometry error.</li>
<li><strong>Hypotenuse identification:</strong> the hypotenuse is opposite the right angle, not necessarily the longest-looking side on the diagram.</li>
<li><strong>Pythagoras with the hypotenuse as a leg:</strong> c² = a² + b² only when c is the hypotenuse; finding a leg requires subtraction.</li>
<li><strong>Rounding early:</strong> keep full calculator accuracy until the final answer; round to 3 s.f. (or 1 d.p. for angles unless told otherwise).</li>
<li><strong>Angle of depression drawn from the wrong line:</strong> it is measured from the horizontal, not from the cliff face; the alternate-angle equality fixes the geometry.</li>
<li><strong>Exact values with decimals:</strong> "exact" means surds and fractions, not 0.866; leaving √3/2 is required.</li>
<li><strong>Missing units and labels:</strong> state cm, m, km and degrees; name the side or angle found, especially in multi-step problems.</li>
</ul>
`,
  },
};
