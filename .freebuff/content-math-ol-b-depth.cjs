// Mathematics OL notes, deepened to the depth bar — Ratio, Rate and Proportion
// (statements 1.11, 1.12, 2.8), Sets (1.2) and Scatter Diagrams (9.5).
// Cambridge IGCSE Mathematics 0580 Extended, Papers 2 and 4.
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-ol-b-depth.cjs > .freebuff-tmp/math-ol-b.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-ol-b.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-ol-b.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "37923030-dd6a-49eb-b200-0cdfef605eea": "Cambridge IGCSE Mathematics: Ratio, Rate and Proportion",
    "dcbbe01b-cbb0-4e90-bf61-0ecc971a9467": "Cambridge IGCSE Mathematics: Sets and Venn Diagrams",
    "985e5e58-2c70-4482-a993-72769a2c63d1": "Cambridge IGCSE Mathematics: Scatter Diagrams and Correlation",
  },
  rows: {
    "37923030-dd6a-49eb-b200-0cdfef605eea": `
<h2>Cambridge IGCSE Mathematics: Ratio, Rate and Proportion</h2>
<p>Ratio, rate and proportion are the mathematics of comparison: how two quantities share a whole, how fast one changes with another, and what happens when one stays on the same path to infinity. They appear in nearly every Paper 2, usually as multi-step word problems where the arithmetic is easy and the interpretation is not. This note builds the topic from zero: simplifying and dividing in ratios, the unitary method for direct and inverse proportion, the algebra forms y = kx and y = k/x, and rates — speed, density, flow — with their unit conversions.</p>

<h3>Ratio fundamentals</h3>
<p>A ratio compares quantities of the same kind. The notation a : b means "a for every b". Equivalent ratios are made by multiplying or dividing all parts by the same number; the simplified ratio has no common factor (other than 1) and, for measurements, the same units.</p>
<ul>
<li><strong>Simplify:</strong> 24 : 36 = 2 : 3 (divide both by 12).</li>
<li><strong>Three-part:</strong> 2 : 3 : 5 means five shares in total; each share is total ÷ 10.</li>
<li><strong>Units first:</strong> 500 g : 1.5 kg = 500 : 1500 = 1 : 3. Convert before simplifying, never after.</li>
</ul>
<p><strong>Worked example.</strong> Share £84 in the ratio 3 : 4.</p>
<pre><code>total parts = 3 + 4 = 7
one part = 84/7 = 12
shares = 3 x 12 = 36 and 4 x 12 = 48
check: 36 + 48 = 84</code></pre>
<p><strong>Worked example 2 (three parts).</strong> A sum of $240 is divided among A, B and C in the ratio 2 : 3 : 5. Find each share.</p>
<pre><code>parts = 2 + 3 + 5 = 10
one part = 240/10 = 24
A = 2 x 24 = 48, B = 3 x 24 = 72, C = 5 x 24 = 120</code></pre>

<h3>Combining ratios and ratio changes</h3>
<p>Two ratios sharing a middle term can be combined by making that term common:</p>
<pre><code>A : B = 2 : 3 and B : C = 4 : 5
LCM of the B terms (3 and 4) is 12:
A : B = 8 : 12 and B : C = 12 : 15
so A : B : C = 8 : 12 : 15</code></pre>
<p><strong>Worked example (change).</strong> A bag contains red and blue counters in the ratio 5 : 3. After 6 red counters are removed, the ratio becomes 1 : 1. Find the original numbers.</p>
<pre><code>let red = 5x, blue = 3x
(5x - 6)/3x = 1  ->  5x - 6 = 3x  ->  2x = 6  ->  x = 3
original: red = 15, blue = 9
check: after removing 6 red, 9 : 9 = 1 : 1</code></pre>

<h3>Direct proportion</h3>
<p>Two quantities are in direct proportion when one is a constant multiple of the other: double one, double the other. The algebra form is y = kx, a straight line through the origin.</p>
<pre><code>y = k x        k = y/x (the constant of proportionality)
unitary method: find the value of one unit, then multiply</code></pre>
<p><strong>Worked example.</strong> 5 pens cost $3.25. Find the cost of 12 pens.</p>
<pre><code>one pen = 3.25/5 = $0.65
12 pens = 12 x 0.65 = $7.80</code></pre>
<p><strong>Worked example 2 (algebra form).</strong> y is directly proportional to x, and y = 18 when x = 6. Find y when x = 11.</p>
<pre><code>y = kx  ->  18 = 6k  ->  k = 3
y = 3 x 11 = 33</code></pre>
<p><strong>Worked example 3 (proportion with powers).</strong> The mass of a sphere is proportional to the cube of its radius; a sphere of radius 2 cm has mass 40 g. Find the mass of a sphere of radius 3 cm.</p>
<pre><code>m = k r^3  ->  40 = k x 8  ->  k = 5
m = 5 x 27 = 135 g</code></pre>

<h3>Inverse proportion</h3>
<p>Inverse proportion means one quantity falls as the other rises: double one, halve the other. The algebra form is y = k/x (the product xy is constant).</p>
<pre><code>y = k/x        x y = k
unitary method: find the total "work" (product), then divide</code></pre>
<p><strong>Worked example.</strong> Six workers build a wall in 8 days. How long will 4 workers take (same rate)?</p>
<pre><code>total work = 6 x 8 = 48 worker-days
time for 4 = 48/4 = 12 days</code></pre>
<p><strong>Worked example 2 (algebra).</strong> y is inversely proportional to x; y = 5 when x = 4. Find y when x = 10.</p>
<pre><code>xy = k  ->  4 x 5 = 20  ->  y = 20/10 = 2</code></pre>
<p>The shape on a graph distinguishes the two: direct proportion is a straight line through the origin; inverse proportion is a curve that never touches either axis (a hyperbola).</p>

<h3>Rates</h3>
<p>A rate compares quantities with different units: speed (distance per time), density (mass per volume), pressure (force per area), flow rate (volume per time). Each is a division, and each can be rearranged.</p>
<pre><code>speed = distance/time        density = mass/volume
pressure = force/area        flow rate = volume/time

average speed over a journey = total distance/total time
(not the average of the speeds, unless the times are equal)</code></pre>
<p><strong>Worked example 1 (speed).</strong> A car travels 150 km in 2 hours 30 minutes. Find its average speed in km/h and m/s.</p>
<pre><code>time = 2.5 h
speed = 150/2.5 = 60 km/h
in m/s: 60 x 1000/3600 = 16.7 m/s</code></pre>
<p><strong>Worked example 2 (density).</strong> A block of volume 250 cm³ has mass 675 g. Find its density, and the mass of 400 cm³ of the same material.</p>
<pre><code>density = 675/250 = 2.7 g/cm3
mass = 2.7 x 400 = 1080 g = 1.08 kg</code></pre>
<p><strong>Worked example 3 (average speed trap).</strong> A cyclist rides 20 km at 20 km/h, then 20 km at 10 km/h. Find the average speed for the whole journey.</p>
<pre><code>time 1 = 20/20 = 1 h;  time 2 = 20/10 = 2 h
total distance = 40 km; total time = 3 h
average speed = 40/3 = 13.3 km/h (not 15!)</code></pre>

<h3>Flow rates and filling problems</h3>
<p>Flow-rate questions combine a rate with a volume: a tap fills at 4 litres per minute, a pump empties at 6 litres per minute, a pipe delivers water at 2.5 m s⁻¹ through a cross-section. The method is the same division, but the units demand attention — litres per minute into litres and minutes, cubic metres per second into m³ and s, with 1 m³ = 1000 litres and 1 minute = 60 s.</p>
<p><strong>Worked example.</strong> A bath holds 180 litres. A tap fills it at 9 litres per minute, but the plug leaks 1.5 litres per minute. How long does the bath take to fill?</p>
<pre><code>net rate = 9 - 1.5 = 7.5 litres per minute
time = 180/7.5 = 24 minutes</code></pre>

<h3>Best buys and multi-step comparisons</h3>
<p>Ratio reasoning powers the practical comparison questions: which packet is better value, which journey is faster per kilometre, which contract costs less per month. The method is always to reduce both options to the same unit before comparing, and to compare like with like (price per 100 g, cost per km, cost per month).</p>
<p><strong>Worked example.</strong> A 750 g box of cereal costs $3.60 and a 1.2 kg box costs $5.28. Which is better value?</p>
<pre><code>large: 5.28/1.2 = $4.40 per kg
small: 3.60/0.75 = $4.80 per kg
better value: the 1.2 kg box (lower cost per kg)</code></pre>
<p><strong>Worked example 2 (multi-step).</strong> Two phone contracts: A charges $12 per month plus $0.10 per GB; B charges $20 per month with 15 GB included. For someone using 20 GB per month, which is cheaper over a year?</p>
<pre><code>A: 12 + 0.10 x 20 = $14 per month; yearly = 168
B: $20 per month; yearly = 240
A is cheaper for a 20 GB user by $72 per year.
(check the crossover: 12 + 0.1g = 20 -> g = 80 GB, so B
only wins for very heavy users)</code></pre>
<p>The crossover point is a favourite extension: set the two cost expressions equal and solve, then interpret which side of the crossing each customer sits on.</p>

<h3>Worked examples: mixed problems</h3>
<p><strong>Worked example.</strong> A recipe for 4 people uses 300 g of rice. How much is needed for 10 people, and how many people can be served with 2.1 kg?</p>
<pre><code>per person = 300/4 = 75 g
for 10: 750 g
2100 g / 75 = 28 people</code></pre>
<p><strong>Worked example 2 (currency).</strong> An exchange rate is £1 = $1.25. Convert £240 to dollars and $500 to pounds.</p>
<pre><code>240 x 1.25 = $300
500/1.25 = £400</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Divide)</strong> Share 360 in the ratio 5 : 7. <em>Answer:</em> parts 12; one part 30; shares 150 and 210.</li>
<li><strong>(Simplify with units)</strong> Simplify 40 minutes : 2 hours. <em>Answer:</em> 40 : 120 = 1 : 3.</li>
<li><strong>(Direct)</strong> 8 m of cloth costs $52. Find the cost of 13 m. <em>Answer:</em> per metre $6.50; 13 × 6.50 = $84.50.</li>
<li><strong>(Inverse)</strong> 4 taps fill a tank in 45 minutes. How long for 6 taps? <em>Answer:</em> total = 4 × 45 = 180 tap-minutes; 180/6 = 30 minutes.</li>
<li><strong>(Algebra)</strong> y ∝ x² and y = 50 when x = 5. Find y when x = 8. <em>Answer:</em> 50 = k × 25 → k = 2; y = 2 × 64 = 128.</li>
<li><strong>(Rate)</strong> A train covers 210 km in 2 h 20 min. Find its average speed. <em>Answer:</em> 2⅓ h; 210 ÷ 7/3 = 90 km/h.</li>
<li><strong>(Density)</strong> 150 cm³ of a liquid has mass 120 g. Find the mass of 1 litre. <em>Answer:</em> density 0.8 g/cm³; 1000 cm³ × 0.8 = 800 g.</li>
<li><strong>(Reverse)</strong> A map scale is 1 : 50 000. Two points are 7 cm apart on the map. Find the real distance in km. <em>Answer:</em> 7 × 50 000 = 350 000 cm = 3.5 km.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Averaging speeds:</strong> average speed is total distance over total time, never the mean of the two speeds unless the times are equal. The classic 20/10 km/h trap answers 15 instead of 13.3.</li>
<li><strong>Ratio direction:</strong> dividing 84 in 3 : 4 is not 84 × 3/4 for both shares; identify which share is which before writing the answer.</li>
<li><strong>Units in ratios:</strong> 500 g : 1.5 kg simplifies only after conversion to 500 : 1500 = 1 : 3. Mixing units gives 1 : 0.003.</li>
<li><strong>Direct versus inverse:</strong> ask "if one doubles, what happens to the other?" Doubling both means direct; one doubling while the other halves means inverse.</li>
<li><strong>Proportional to a power:</strong> for y ∝ x², doubling x multiplies y by 4; for y ∝ √x it multiplies by √2. Find k from the given pair first.</li>
<li><strong>Currency direction:</strong> multiplying by the rate converts one way; the reverse needs division. Check with a rough estimate.</li>
<li><strong>Time units:</strong> 2 h 30 min is 2.5 h, not 2.3 h. Convert minutes to a decimal fraction of an hour before dividing.</li>
<li><strong>Rounding mid-calculation:</strong> keep full accuracy until the final answer, then round to 3 s.f. or as instructed; money answers usually need 2 decimal places.</li>
</ul>
`,
    "dcbbe01b-cbb0-4e90-bf61-0ecc971a9467": `
<h2>Cambridge IGCSE Mathematics: Sets and Venn Diagrams</h2>
<p>Set notation is the language of sorting: it describes which elements belong together, which belong to both groups, and which belong to neither. The IGCSE questions are almost always Venn-diagram problems in disguise — a survey of students, a group of numbers, a club membership — and the marks come from filling every region correctly. This note builds the topic from zero: the notation and symbols, the two-set and three-set Venn diagrams and how to shade them, the counting formulas, and the word-problem method that never misses a region.</p>

<h3>Set notation and vocabulary</h3>
<table border="1" cellpadding="6">
<tr><th>Symbol</th><th>Meaning</th><th>Example</th></tr>
<tr><td>∈</td><td>is an element of</td><td>3 ∈ {1, 2, 3}</td></tr>
<tr><td>∉</td><td>is not an element of</td><td>5 ∉ {1, 2, 3}</td></tr>
<tr><td>ξ (or U)</td><td>the universal set — everything under discussion</td><td>ξ = {1, 2, ..., 12}</td></tr>
<tr><td>∅</td><td>the empty set</td><td>odd multiples of 2 = ∅</td></tr>
<tr><td>A′</td><td>the complement of A — everything in ξ not in A</td><td>A′ = ξ \ A</td></tr>
<tr><td>A ∪ B</td><td>union — in A or B or both</td><td>{1,2} ∪ {2,3} = {1,2,3}</td></tr>
<tr><td>A ∩ B</td><td>intersection — in both</td><td>{1,2} ∩ {2,3} = {2}</td></tr>
<tr><td>n(A)</td><td>the number of elements of A</td><td>n({2, 4, 6}) = 3</td></tr>
</table>
<p>Two rules follow directly: A ∩ A′ = ∅ (nothing is both in and out), and A ∪ A′ = ξ (everything is one or the other). Subsets: A ⊂ B means every element of A is also in B. The empty set has no elements, so n(∅) = 0, and it is a subset of every set — a fact worth stating explicitly when a question asks whether ∅ ⊂ A is true.</p>

<h3>Two-set Venn diagrams</h3>
<p>A two-set diagram divides the universal set into four regions: only A, only B, both, and neither. Filling them from the inside out is the reliable method:</p>
<ol>
<li>Write the number in the intersection (both) first.</li>
<li>Work outward: only A = n(A) − both; only B = n(B) − both.</li>
<li>Neither = total − (only A + only B + both).</li>
</ol>
<p><strong>Worked example.</strong> In a class of 32, 18 study French, 15 study Spanish, and 7 study both. Find the number studying only French, only Spanish, and neither.</p>
<pre><code>both = 7
only French = 18 - 7 = 11
only Spanish = 15 - 7 = 8
neither = 32 - (11 + 8 + 7) = 32 - 26 = 6</code></pre>
<p><strong>Worked example 2 (reverse).</strong> In a group, 20 like tea, 14 like coffee and 5 like neither. Everyone likes at least one of the two? Then find n(tea ∩ coffee).</p>
<pre><code>n(T union C) = 20 + 14 - both
total = 20 + 14 - both + 5 = 39 - both
If the group has 30 people: 30 = 39 - both -> both = 9</code></pre>

<h3>The inclusion–exclusion formula</h3>
<pre><code>n(A union B) = n(A) + n(B) - n(A intersection B)

for three sets:
n(A u B u C) = n(A) + n(B) + n(C)
             - n(A n B) - n(A n C) - n(B n C)
             + n(A n B n C)</code></pre>
<p>The subtraction corrects double counting; the final addition corrects the triple-counted centre. Knowing the formula lets you answer "how many in total" questions without a full diagram, but a diagram is still the safer route for word problems.</p>
<p><strong>Worked example.</strong> A survey of 50 people: 30 read newspapers, 25 read magazines, 12 read both. How many read at least one?</p>
<pre><code>n(N union M) = 30 + 25 - 12 = 43
neither = 50 - 43 = 7</code></pre>

<h3>Three-set Venn diagrams</h3>
<p>The three-set diagram has eight regions (counting "none of the three"). The fill order that never fails:</p>
<ol>
<li>Start with the triple intersection (all three).</li>
<li>Find the "exactly two" regions by subtracting the triple from each pair.</li>
<li>Find the "only one" regions by subtracting the pair and triple totals from each set total.</li>
<li>Find "none" from the grand total.</li>
</ol>
<p><strong>Worked example.</strong> 40 students choose subjects: 20 take Maths, 18 take Physics, 15 take Chemistry; 8 take Maths and Physics, 6 take Maths and Chemistry, 5 take Physics and Chemistry; 3 take all three. Find how many take exactly one subject and how many take none.</p>
<pre><code>triple = 3
exactly M and P = 8 - 3 = 5
exactly M and C = 6 - 3 = 3
exactly P and C = 5 - 3 = 2
only M = 20 - (5 + 3 + 3) = 9
only P = 18 - (5 + 2 + 3) = 8
only C = 15 - (3 + 2 + 3) = 7
exactly one = 9 + 8 + 7 = 24
total counted = 24 + 5 + 3 + 2 + 3 = 37
none = 40 - 37 = 3</code></pre>

<h3>Sets of numbers and shading</h3>
<p>Questions often use number sets inside the universal set: ξ = {1, 2, ..., 20}, A = multiples of 3, B = multiples of 4. List them, then use the same four regions:</p>
<pre><code>A = {3, 6, 9, 12, 15, 18}
B = {4, 8, 12, 16, 20}
A n B = {12}
A u B = {3, 4, 6, 8, 9, 12, 15, 16, 18, 20}
neither = {1, 2, 5, 7, 10, 11, 13, 14, 17, 19}</code></pre>
<p>Shading questions ask for a region described in symbols. Translate the symbols into words first: A′ ∩ B means "not in A, but in B" — the part of B outside A. A ∪ B′ means "in A, or outside B" — everything except the part of B that is not in A.</p>

<h3>Listing sets and set-builder notation</h3>
<p>Sets can be written in three ways, and questions move between them. The roster method lists the elements: A = {2, 4, 6, 8}. The description method states the rule in words: A is the set of even numbers from 2 to 8. Set-builder notation states the rule symbolically: A = {x : x is an even number, 2 ≤ x ≤ 8} — read as "the set of all x such that x is even and between 2 and 8".</p>
<ul>
<li><strong>Roster for finite sets:</strong> list every element once, in braces, separated by commas; order does not matter and repeats are not counted twice.</li>
<li><strong>Description for patterns:</strong> "multiples of 3 less than 30" is clearer than listing ten numbers.</li>
<li><strong>Set-builder for precision:</strong> the colon means "such that"; the condition after it does the work.</li>
</ul>
<p><strong>Worked example.</strong> Write the set of odd numbers between 1 and 11 in roster and set-builder form, and find its size.</p>
<pre><code>roster: {3, 5, 7, 9}  (strictly between, so 1 and 11 excluded)
set-builder: {x : x odd, 1 < x < 11}
n(A) = 4</code></pre>
<p>Reading the inequalities is the trap: "between" usually excludes the endpoints, "from ... to ..." usually includes them, and the question's wording decides. When in doubt, list both interpretations and choose the one consistent with the other numbers in the question.</p>

<h3>Worked examples: word problems</h3>
<p><strong>Worked example.</strong> In a hostel of 60 students, 35 play football, 28 play basketball, and 12 play both. How many play neither?</p>
<pre><code>at least one = 35 + 28 - 12 = 51
neither = 60 - 51 = 9</code></pre>
<p><strong>Worked example 2 (with a variable).</strong> In a group of 25, x people like both tea and coffee, 12 like tea only and 8 like coffee only. Find x if everyone likes at least one.</p>
<pre><code>12 + 8 + x = 25  ->  x = 5</code></pre>
<p><strong>Worked example 3 (conditional language).</strong> Of 40 students, 24 study History, 18 study Geography and 6 study neither. How many study both?</p>
<pre><code>at least one = 40 - 6 = 34
34 = 24 + 18 - both  ->  both = 42 - 34 = 8</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Notation)</strong> ξ = {1, 2, 3, 4, 5, 6, 7, 8}; A = {2, 4, 6, 8}; B = {1, 3, 5, 7}. Find A ∩ B and A ∪ B. <em>Answer:</em> A ∩ B = ∅; A ∪ B = ξ.</li>
<li><strong>(Complement)</strong> With A = {2, 4, 6, 8} in ξ above, list A′. <em>Answer:</em> {1, 3, 5, 7}.</li>
<li><strong>(Two sets)</strong> n(A) = 14, n(B) = 9, n(A ∩ B) = 4. Find n(A ∪ B). <em>Answer:</em> 14 + 9 − 4 = 19.</li>
<li><strong>(Neither)</strong> In a class of 30, 17 like cricket, 12 like tennis and 5 like both. Find the number who like neither. <em>Answer:</em> at least one = 24; neither = 6.</li>
<li><strong>(Three sets)</strong> 30 students: 15 like Maths, 12 like Physics, 10 like Chemistry; 5 like Maths and Physics, 4 like Maths and Chemistry, 3 like Physics and Chemistry, 2 like all three. Find the number who like exactly one. <em>Answer:</em> only M = 15 − (3 + 2 + 2) = 8; only P = 12 − (3 + 1 + 2) = 6; only C = 10 − (2 + 1 + 2) = 5; total = 19 (with exactly-two counts 3, 2, 1 and triple 2).</li>
<li><strong>(Shading)</strong> Describe the region A′ ∩ B in words. <em>Answer:</em> Elements in B but not in A — the part of B outside A.</li>
<li><strong>(Numbers)</strong> ξ = {1, ..., 20}; A = even numbers; B = multiples of 5. Find n(A ∩ B). <em>Answer:</em> multiples of 10 in the set = {10, 20}, so 2.</li>
<li><strong>(Reasoning)</strong> Explain why n(A ∪ B) = n(A) + n(B) is wrong when A and B overlap. <em>Answer:</em> The elements in both sets are counted twice in n(A) + n(B), so the intersection must be subtracted once: n(A ∪ B) = n(A) + n(B) − n(A ∩ B).</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Filling the intersection last:</strong> start at the centre. Adding both set totals and forgetting the overlap counts shared elements twice.</li>
<li><strong>Forgetting the "neither" region:</strong> the universal set includes elements outside all named sets; if the question gives a total, subtract to find them.</li>
<li><strong>Confusing ∪ and ∩:</strong> union is "or" (everything), intersection is "and" (only the middle). A quick mnemonic: ∪ looks like a cup that holds everything.</li>
<li><strong>Shading the wrong side for A′:</strong> the complement is everything outside A, including parts of other sets and the region outside them all.</li>
<li><strong>Triple intersection double subtraction:</strong> when subtracting pairs, remember each pair already includes the triple; subtract the triple from each pair before using them.</li>
<li><strong>Reading "only":</strong> "only A" means A and nothing else — exclude the overlaps. The word only is a region instruction, not decoration.</li>
<li><strong>Notation in answers:</strong> list elements with braces and commas; do not write 1, 2, 3 as an unbraced list when the answer is a set.</li>
<li><strong>Assuming everyone likes something:</strong> unless stated, some may be outside both sets — check whether the total equals the sum of the regions.</li>
</ul>
`,
    "985e5e58-2c70-4482-a993-72769a2c63d1": `
<h2>Cambridge IGCSE Mathematics: Scatter Diagrams and Correlation</h2>
<p>A scatter diagram plots two measurements for each person or object, one on each axis, and reveals whether they move together. The IGCSE questions ask you to describe that relationship — correlation — draw a line of best fit, and use it to estimate. The arithmetic is light; the marks come from precise language and from the discipline of drawing and reading the line correctly. This note builds the topic from zero: what correlation means and how to describe it, how to draw a line of best fit that earns the marks, how to use it for interpolation and extrapolation, and why correlation is not causation.</p>

<h3>What a scatter diagram shows</h3>
<p>Each point represents one individual: its horizontal coordinate is one variable (say, hours of revision) and its vertical coordinate the other (say, test score). The pattern of points — the scatter — is the data's message. Bivariate data means two variables measured on the same individuals; the diagram is the quickest way to see whether a relationship exists.</p>
<ul>
<li><strong>Positive correlation:</strong> as one variable increases, the other tends to increase (revision time and score).</li>
<li><strong>Negative correlation:</strong> as one increases, the other tends to decrease (car age and value).</li>
<li><strong>No correlation:</strong> no pattern — the points form a cloud (shoe size and score).</li>
<li><strong>Strength:</strong> strong correlation means the points lie close to a line; weak means they are widely scattered around it.</li>
</ul>

<h3>Describing correlation precisely</h3>
<p>The mark scheme wants three things in a description: direction (positive or negative), strength (strong, moderate or weak), and the variables named. "There is a strong positive correlation between hours of revision and test score" earns the mark; "the graph goes up" does not.</p>
<p><strong>Worked example.</strong> A scatter diagram of 30 cars shows points tightly clustered around a line falling from top-left to bottom-right. Describe the correlation and interpret it.</p>
<pre><code>Strong negative correlation between age and value:
older cars tend to be worth less. The tightness of the
cluster means the relationship is consistent, but individual
cars can still deviate (condition, mileage).</code></pre>

<h3>Drawing the line of best fit</h3>
<p>A line of best fit summarises the trend. The marks are awarded for a straight line that:</p>
<ol>
<li><strong>Passes through the middle of the cloud</strong> — roughly equal numbers of points above and below.</li>
<li><strong>Follows the trend direction</strong> (rising for positive, falling for negative correlation).</li>
<li><strong>Is drawn with a ruler</strong> and extends across the plotted range.</li>
</ol>
<p>A useful anchor: the line should pass close to the mean point (the mean of the x-values, mean of the y-values). It does not have to pass through the origin, and it should not be forced through any single point.</p>
<p><strong>Worked example.</strong> Points cluster with mean x = 12 and mean y = 60, trending upward. Describe where the line of best fit should pass and how to check it.</p>
<pre><code>The line should pass through (12, 60) and follow the upward
trend; check by counting points above and below - roughly equal
numbers on each side, with the line through the middle of the
vertical spread at each x.</code></pre>

<h3>Using the line: interpolation and extrapolation</h3>
<p>Once the line is drawn, estimates are read from it — not from individual points:</p>
<ul>
<li><strong>Interpolation:</strong> estimating within the range of the data. Reliable, because the trend is supported by nearby points.</li>
<li><strong>Extrapolation:</strong> estimating beyond the plotted range. Risky, because nothing guarantees the relationship continues — a straight line cannot describe a curve that turns.</li>
</ul>
<p><strong>Worked example.</strong> A line of best fit passes through (4, 30) and (10, 54). Estimate y when x = 7, and comment on estimating y when x = 30.</p>
<pre><code>gradient = (54 - 30)/(10 - 4) = 24/6 = 4
equation: y = 4x + c; using (4, 30): 30 = 16 + c -> c = 14
y = 4x + 14
at x = 7: y = 28 + 14 = 42  (interpolation - reliable)
at x = 30: y = 134 (extrapolation - unreliable; the trend may
not continue that far)</code></pre>

<h3>Worked example: from table to diagram to estimate</h3>
<p>Data: hours studied (x): 1, 2, 3, 4, 5, 6; marks (y): 35, 42, 50, 55, 63, 70.</p>
<pre><code>Step 1: plot each pair as a point (x horizontal, y vertical).
Step 2: describe - strong positive correlation.
Step 3: draw the line through the middle: the points rise
        about 7 marks per hour; a line from (1, 35) to (6, 70)
        passes through the centre of the cloud.
Step 4: estimate the mark for 3.5 hours: read up from x = 3.5
        to the line, then across: about 53 marks.
Step 5: estimate the hours for 60 marks: read across from y = 60
        to the line, then down: about 4.6 hours.</code></pre>
<p>Note the wording in answers: "from the line of best fit, approximately 53 marks" — the word approximately signals that it is an estimate, which the mark scheme expects.</p>

<h3>Correlation and causation</h3>
<p>Correlation does not prove cause. Two variables can move together because a third factor drives both (ice-cream sales and drowning rates both rise in summer — heat causes both), or by coincidence in a small sample. Exam questions reward this caution explicitly: state that the correlation shows an association, not that one variable causes the other, unless the data come from a controlled experiment.</p>
<p><strong>Worked example.</strong> A study finds a strong positive correlation between the number of books in a home and children's reading scores. Does buying books raise scores?</p>
<pre><code>Not necessarily: households with more books may also have more
educated parents, more time for reading, or higher income - all
of which could raise scores. The correlation is real, but the
causal claim is unsupported by this evidence alone.</code></pre>
<p>A second discipline follows: when a question asks you to comment on a study, name the possible confounding variable rather than simply denying causation. In the books example, income, parental education and available time are all plausible common causes; naming one shows the examiner you understand what a confounding factor is. The same reasoning explains why a strong correlation from a small sample deserves caution: with only a handful of points, a pattern can appear by chance, and a single outlier can create or destroy the apparent trend.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Describe)</strong> Points on a scatter diagram trend downward and are tightly clustered. Describe the correlation. <em>Answer:</em> Strong negative correlation — as one variable increases, the other tends to decrease consistently.</li>
<li><strong>(No correlation)</strong> Describe a scatter diagram whose points form a random cloud. <em>Answer:</em> No correlation — there is no clear trend between the variables.</li>
<li><strong>(Line)</strong> State two features of a correctly drawn line of best fit. <em>Answer:</em> A straight line through the middle of the points with roughly equal numbers above and below, following the trend and drawn with a ruler.</li>
<li><strong>(Estimate)</strong> A line of best fit passes through (2, 10) and (6, 26). Estimate y at x = 4. <em>Answer:</em> gradient 4; y = 4x + 2; at x = 4, y = 18.</li>
<li><strong>(Interpolation)</strong> Explain why an estimate inside the data range is more reliable than one outside it. <em>Answer:</em> Inside the range the trend is supported by nearby data points (interpolation); outside it (extrapolation) there is no evidence that the relationship continues in the same way.</li>
<li><strong>(Causation)</strong> A shop finds that sales of umbrellas and sales of coats rise together. Explain the correlation without claiming that umbrellas cause coat sales. <em>Answer:</em> Both are driven by a third variable — rainy weather — which increases demand for both; the correlation is association, not causation.</li>
<li><strong>(Outlier)</strong> One point sits far from the trend. What should you do with it when drawing the line? <em>Answer:</em> Note it as an outlier and draw the line through the main body of points; do not let one point pull the line away from the trend.</li>
<li><strong>(Strength)</strong> Two scatter diagrams both show positive correlation; in one the points are close to the line. Compare them. <em>Answer:</em> The tighter diagram shows stronger positive correlation; the looser one shows weaker positive correlation.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Joining the dots:</strong> a line of best fit is a single straight line through the trend, never a zigzag connecting points.</li>
<li><strong>Forcing through the origin:</strong> the line passes through the middle of the cloud; there is no reason for it to start at (0, 0).</li>
<li><strong>Reading a point instead of the line:</strong> estimates come from the line of best fit, not from the nearest plotted point.</li>
<li><strong>Ignoring outliers:</strong> one extreme point should not swing the line; note it and fit the main cluster.</li>
<li><strong>Weak description:</strong> "positive" alone is incomplete — direction and strength, with variables named.</li>
<li><strong>Causal language:</strong> "revision causes higher scores" overclaims from observational data; write "is associated with" and mention confounding factors.</li>
<li><strong>Extrapolating confidently:</strong> beyond the data range, state the estimate is unreliable.</li>
<li><strong>Axes:</strong> plot the explanatory variable on the horizontal axis and the response on the vertical, label both with units, and use the given scales exactly.</li>
</ul>
`,
  },
};
