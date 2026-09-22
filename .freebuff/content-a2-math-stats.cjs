// A2 Mathematics (CAIE 9709) — Probability & Statistics content for the new
// split A2 structure. 10 topics: 5 covering the S1 (P1-coupled) syllabus and
// 5 covering S2. Lessons are markdown (the seeder converts to HTML); no
// backticks inside lessons (template-literal safety). Questions use 0-based
// `correct` indices spread across the four options.
module.exports = [
  {
    name: 'Permutations and Combinations',
    description: 'Counting arrangements and selections: permutations, combinations, restricted arrangements and grouped items.',
    lesson: `# Permutations and Combinations

### The Multiplication Principle
If a task is done in successive stages with m, n, ... choices at each stage, the total is the product of the choices. This underpins every counting problem: a menu with 4 starters and 6 mains gives 24 meals.

### Permutations — Order Matters
The number of ways of arranging r objects from n distinct objects is

- ⁿPᵣ = n!/(n − r)!

The number of arrangements of n distinct objects is n!. Five books on a shelf: 5! = 120 ways.

### Combinations — Order Irrelevant
The number of ways of choosing r objects from n is

- ⁿCᵣ = n!/(r!(n − r)!)

Choosing a committee of 3 from 8 people: ⁸C₃ = 56. Choosing is not arranging — a committee has no internal order, so we divide by r!.

### Restricted Permutations
- No two specified people adjacent: arrange everyone else, then slot the restricted people into gaps. For n people with 2 who must be separated: arrange the other n − 2 (ways), then place 2 people in distinct gaps between them.
- Specified people together: bundle them as one item, arrange the bundle, then multiply by the internal arrangements of the bundle.
- Words with repeated letters: divide by the factorials of each repeat count. ARRANGE has 7 letters with A appearing twice and R twice, so 7!/(2!·2!) = 1260.

### Combinations with Constraints
- At least / at most: split into cases and add. A team of 5 from 6 boys and 5 girls with at least 3 girls is ⁵C₃⁶C₂ + ⁵C₄⁶C₁ + ⁵C₅⁶C₀.
- "Must include" pairs: choose the required items first, then choose freely from the remainder.

**Exam tips:** state whether a scenario is a permutation or combination before computing anything. Most lost marks come from counting an arrangement where order does not actually matter. Check every answer against a small case you can enumerate by hand.`,
    questions: [
      { q: '⁸P₃ =', opts: ['336', '56', '24', '512'], correct: 0, explain: '8!/(8−3)! = 8×7×6 = 336.' },
      { q: 'A committee of 4 is chosen from 7 people. The number of committees is:', opts: ['35', '840', '28', '210'], correct: 0, explain: '⁷C₄ = 35; a committee has no internal order.' },
      { q: 'How many distinct arrangements of the letters of LEVEL are there?', opts: ['30', '120', '60', '20'], correct: 0, explain: '5 letters with L twice and E twice: 5!/(2!·2!) = 30.' },
      { q: '3 boys and 3 girls sit in a row with the 3 girls together. The number of arrangements is:', opts: ['144', '720', '72', '36'], correct: 0, explain: 'Bundle the girls: 4 items arranged in 4! ways, times 3! internal: 24×6 = 144.' },
      { q: 'A team of 5 from 6 boys and 5 girls must contain exactly 2 girls. The number of teams is:', opts: ['200', '150', '462', '120'], correct: 0, explain: '⁵C₂ × ⁶C₃ = 10 × 20 = 200.' },
      { q: 'ⁿC₂ = 15. Then n =', opts: ['6', '5', '15', '30'], correct: 0, explain: 'n(n−1)/2 = 15 gives n = 6 (or −5, rejected).' },
      { q: '5 people sit in a row and 2 specified people must NOT sit together. The number of arrangements is:', opts: ['72', '120', '48', '96'], correct: 0, explain: 'Total 5! = 120 minus together cases 4!×2 = 48: 120 − 48 = 72.' },
      { q: 'The number of ways of choosing 2 pens from 5 distinct pens is:', opts: ['10', '20', '25', '5'], correct: 0, explain: '⁵C₂ = 10.' },
      { q: 'Codes of 3 letters are made from A, B, C, D, E without repetition. The number of codes is:', opts: ['60', '125', '20', '10'], correct: 0, explain: '⁵P₃ = 5×4×3 = 60; order matters in a code.' },
      { q: 'A team of 6 from 9 players must include the captain. The number of teams is:', opts: ['28', '84', '56', '9'], correct: 0, explain: 'Captain is fixed, choose 5 from the other 8: ⁸C₅ = 56.' },
    ],
  },
  {
    name: 'Probability',
    description: 'Probability rules, Venn diagrams, tree diagrams, conditional probability and independence.',
    lesson: `# Probability

### Basic Rules
For an event A with P(A) = p: 0 ≤ p ≤ 1, and P(A′) = 1 − P(A). For mutually exclusive events, probabilities add: P(A ∪ B) = P(A) + P(B). For events that can occur together, subtract the overlap:

- P(A ∪ B) = P(A) + P(B) − P(A ∩ B)

### Venn Diagrams
Draw the universe first, then the events. Fill from the intersection outwards: if P(A) = 0.6, P(B) = 0.5 and P(A ∩ B) = 0.25, then only-A = 0.35, only-B = 0.25, neither = 0.15. Every region must sum to 1.

### Tree Diagrams
Branch probabilities multiply along a path; outcomes at the end of complete paths add. Draw one branch set per stage of the experiment. For two draws without replacement from a bag of 5 red and 3 blue: P(RR) = (5/8)(4/7) = 20/56.

### Conditional Probability
P(A | B) = P(A ∩ B)/P(B) — the probability of A given that B has occurred. The condition shrinks the sample space.

**Example:** P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2. Then P(A | B) = 0.2/0.4 = 0.5, so A and B are independent since P(A | B) = P(A).

### Independence
A and B are independent exactly when P(A ∩ B) = P(A)·P(B). Do not confuse independent (no influence on probabilities) with mutually exclusive (cannot co-occur). Mutually exclusive events with non-zero probabilities are never independent.

**Exam tips:** convert every "given that" into a conditional. With trees, label the second-stage branches with conditional probabilities; they are usually different from the first stage when drawing without replacement.`,
    questions: [
      { q: 'P(A) = 0.7 and P(B) = 0.4 with A, B independent. P(A ∪ B) =', opts: ['0.82', '1.1', '0.28', '0.3'], correct: 0, explain: '0.7 + 0.4 − 0.7×0.4 = 0.82.' },
      { q: 'P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.15. P(A | B) =', opts: ['0.375', '0.3', '0.075', '0.5'], correct: 0, explain: '0.15/0.4 = 0.375.' },
      { q: 'Two fair dice. P(sum is 8) =', opts: ['5/36', '1/6', '1/9', '7/36'], correct: 0, explain: 'Favourable: (2,6) (3,5) (4,4) (5,3) (6,2) — 5 of 36.' },
      { q: 'A bag has 4 red and 6 blue balls; two are drawn without replacement. P(both red) =', opts: ['2/15', '4/25', '1/5', '16/100'], correct: 0, explain: '(4/10)(3/9) = 12/90 = 2/15.' },
      { q: 'If A and B are mutually exclusive with P(A) = 0.3, P(B) = 0.45, then P(A ∪ B) =', opts: ['0.75', '0.135', '0.15', '1'], correct: 0, explain: 'No overlap: probabilities add directly.' },
      { q: 'P(A) = 0.6. P(A′) =', opts: ['0.4', '0.6', '0.24', 'cannot be determined'], correct: 0, explain: 'P(A′) = 1 − P(A) = 0.4.' },
      { q: 'A and B are independent with P(A) = 0.5, P(B) = 0.8. P(A ∩ B) =', opts: ['0.4', '0.9', '0.3', '0.65'], correct: 0, explain: 'Independence multiplies: 0.5 × 0.8 = 0.4.' },
      { q: 'P(A | B) = 0.6 and P(B) = 0.5. P(A ∩ B) =', opts: ['0.3', '1.1', '0.1', '0.83'], correct: 0, explain: 'Rearrange: P(A ∩ B) = P(A | B)·P(B) = 0.6×0.5 = 0.3.' },
      { q: 'In a class 60% study French, 40% study Spanish and 25% study both. P(studies neither) =', opts: ['0.25', '0.15', '0.05', '0.35'], correct: 0, explain: 'P(F ∪ S) = 0.6 + 0.4 − 0.25 = 0.75, so neither = 0.25.' },
      { q: 'Events A and B with P(A)P(B) ≠ P(A ∩ B) are:', opts: ['not independent', 'mutually exclusive', 'independent', 'exhaustive'], correct: 0, explain: 'Failing the product test means dependence (unless an event has probability 0).' },
    ],
  },
  {
    name: 'Numerical Measures of Central Tendency',
    description: 'Mean, median and mode for raw and grouped data; effect of data changes; coding.',
    lesson: `# Central Tendency: Mean, Median and Mode

### The Mean
For data x₁, ..., xₙ the mean is

- x̄ = Σx/n

For a frequency table with midpoints x and frequencies f: x̄ = Σfx/Σf. The mean uses every value, so a single extreme value drags it — that is its main weakness.

### The Median
The median is the middle value: position (n + 1)/2 for ordered raw data. With n even, average the two middle values. The median ignores the size of extreme values, so it describes skewed data more honestly. For grouped data, estimate the median by linear interpolation within the median class.

### The Mode
The most frequent value. A dataset may have no mode or several. For grouped data the modal class is the one with the highest frequency density (frequency ÷ class width), not the highest frequency.

### Effects of Data Changes
Adding a constant a to every value adds a to the mean and median (the mode too) but leaves the spread untouched. Multiplying every value by b multiplies mean and median by b.

### Coding
Subtract a constant and divide by a convenient width: y = (x − a)/b. Then x̄ = b·ȳ + a. Coding simplifies arithmetic and always preserves the relationship — the coded mean decodes exactly.

**Example:** data 2, 4, 4, 10: mean = 5, median = 4, mode = 4. Change 10 to 100: mean = 27.5, median and mode unchanged — the mean chased the outlier.

**Exam tips:** always state which average you used and why. When asked to compare two distributions, pair a central measure with a spread measure; a mean without a spread is only half an answer.`,
    questions: [
      { q: 'The mean of 3, 7, 8, 10, 12 is:', opts: ['8', '7', '9', '10'], correct: 0, explain: 'Σx = 40, n = 5, mean = 8.' },
      { q: 'The median of 2, 5, 9, 11 is:', opts: ['7', '9', '6.5', '8'], correct: 0, explain: 'Average the middle two: (5 + 9)/2 = 7.' },
      { q: 'Adding 5 to every value in a dataset:', opts: ['increases the mean by 5', 'increases the mean by 5n', 'leaves the mean unchanged', 'multiplies the mean by 5'], correct: 0, explain: 'Shifts translate the mean: x̄ + 5.' },
      { q: 'Σfx = 420 and Σf = 30. The grouped mean is:', opts: ['14', '12', '450', '0.071'], correct: 0, explain: 'x̄ = Σfx/Σf = 420/30 = 14.' },
      { q: 'Which average is least affected by an outlier?', opts: ['median', 'mean', 'mode weighted mean', 'sum'], correct: 0, explain: 'The median depends on position, not magnitude.' },
      { q: 'Coding y = (x − 10)/2 gives ȳ = 4. Then x̄ =', opts: ['18', '8', '12', '9'], correct: 0, explain: 'Decode: x̄ = 2·4 + 10 = 18.' },
      { q: 'Multiplying every value by 3:', opts: ['multiplies the mean by 3', 'adds 3 to the mean', 'leaves the mean unchanged', 'multiplies the mean by 9'], correct: 0, explain: 'Scaling scales the mean.' },
      { q: 'The modal class of grouped data is the class with the greatest:', opts: ['frequency density', 'upper boundary', 'frequency density width', 'midpoint'], correct: 0, explain: 'With unequal widths, frequency density — not raw frequency — is comparable.' },
      { q: 'The mean of five values is 8. A sixth value of 20 is added. The new mean is:', opts: ['10', '8', '14', '12'], correct: 0, explain: 'New sum = 40 + 20 = 60 over 6 values: 10.' },
      { q: 'For a slightly skewed salary distribution, the most representative average is the:', opts: ['median', 'mean', 'mode', 'range'], correct: 0, explain: 'Skew drags the mean; the median resists outliers.' },
    ],
  },
  {
    name: 'Measures of Variation and Standard Deviation',
    description: 'Range, interquartile range, variance and standard deviation for raw and grouped data.',
    lesson: `# Measures of Variation

### Range and Quartiles
The range is max − min — quick but destroyed by a single outlier. Quartiles split ordered data into quarters: Q₁ at position (n + 1)/4, Q₃ at 3(n + 1)/4 (raw data). The interquartile range, IQR = Q₃ − Q₁, is the spread of the middle 50% and resists outliers. Outliers are commonly flagged as values beyond Q₁ − 1.5·IQR or Q₃ + 1.5·IQR.

### Variance and Standard Deviation
For raw data:

- variance s² = Σ(x − x̄)²/n (the definitional form)
- equivalently s² = Σx²/n − x̄² (the computational form)
- standard deviation s = √(variance)

The standard deviation shares the units of the data; the variance does not. For frequency tables use Σf(x − x̄)²/Σf, or Σfx²/Σf − x̄².

### Grouped Data
Use class midpoints as x. The result is an estimate — grouping discards within-class detail.

### Combining and Scaling Datasets
Multiplying every value by b multiplies s by |b| and the variance by b². Adding a constant changes nothing in the spread. Two merged datasets: compute combined Σx and Σx² from each part, then apply the computational formula.

**Example:** data 1, 3, 4, 5, 7: mean 4, Σx² = 100, so variance = 100/5 − 16 = 4 and s = 2.

**Exam tips:** state units for s. When comparing consistency, the dataset with the smaller standard deviation (relative to its mean) is the more consistent. Always give the comparison sentence, not just the two numbers.`,
    questions: [
      { q: 'The variance of 2, 4, 6, 8 is:', opts: ['5', '4', '20', '2.24'], correct: 0, explain: 'Mean 5, Σx² = 120: 120/4 − 25 = 5.' },
      { q: 'If s = 3, the variance is:', opts: ['9', '6', '1.73', '27'], correct: 0, explain: 'Variance is s² = 9.' },
      { q: 'Adding 10 to every value:', opts: ['leaves the standard deviation unchanged', 'increases s by 10', 'multiplies s by 10', 'increases s by 100'], correct: 0, explain: 'Shifts do not change spread.' },
      { q: 'For data with Q₁ = 12 and Q₃ = 20, the IQR is:', opts: ['8', '32', '16', '6'], correct: 0, explain: 'IQR = Q₃ − Q₁ = 8.' },
      { q: 'Multiplying every value by 4 multiplies the variance by:', opts: ['16', '4', '8', '2'], correct: 0, explain: 'Variance scales by b²: 4² = 16.' },
      { q: 'Σx = 60, Σx² = 1000, n = 5. The variance is:', opts: ['40', '200', '24', '12'], correct: 0, explain: '1000/5 − 12² = 200 − 144 = 40.' },
      { q: 'Values beyond Q₁ − 1.5×IQR are usually called:', opts: ['outliers', 'quartiles', 'medians', 'modes'], correct: 0, explain: 'That is the standard 1.5×IQR fence.' },
      { q: 'The standard deviation of 4, 4, 4, 4 is:', opts: ['0', '4', '1', '16'], correct: 0, explain: 'No deviation from the mean at all.' },
      { q: 'A dataset has mean 20 and s 4. Multiplying all values by 2 gives mean and s:', opts: ['40 and 8', '40 and 4', '22 and 8', '40 and 16'], correct: 0, explain: 'Mean scales by 2, s scales by 2: 40 and 8.' },
      { q: 'Which pair best compares two distributions?', opts: ['mean and standard deviation', 'range and mode', 'median and n', 'sum and count'], correct: 0, explain: 'One central measure paired with one spread measure is the standard comparison.' },
    ],
  },
  {
    name: 'Probability Distributions',
    description: 'Discrete random variables: expectation, variance, E(aX+b), and combining independent variables.',
    lesson: `# Discrete Random Variables

### Probability Distributions
A discrete random variable X takes values xᵢ with probabilities pᵢ where each pᵢ ≥ 0 and Σpᵢ = 1. A probability distribution can be given as a table, a formula, or a function. Any missing probability is found by subtraction.

**Example:** X = number of heads in 2 fair tosses: P(0) = 1/4, P(1) = 1/2, P(2) = 1/4.

### Expectation
The mean of X is

- E(X) = Σxᵢpᵢ

It is a weighted average — the long-run average value over many repetitions. E(X) need not equal any value X can actually take.

### Variance
- Var(X) = E(X²) − (E(X))²

where E(X²) = Σxᵢ²pᵢ — square the values before multiplying by probabilities. The standard deviation is √Var(X).

### Linear Transforms
For constants a and b:

- E(aX + b) = a·E(X) + b and Var(aX + b) = a²·Var(X)

Adding a constant shifts but does not spread; multiplying scales the spread by |a|.

### Independent Variables
If X and Y are independent: E(X + Y) = E(X) + E(Y) and Var(X + Y) = Var(X) + Var(Y). The addition rule for expectation always holds; the variance addition needs independence. The same applies to differences: Var(X − Y) = Var(X) + Var(Y) — the subtraction does not cancel spread.

**Exam tips:** first verify Σp = 1 in any given table. Write E(X²) and (E(X))² separately; merging them is the most common exam error. In games of chance, set the expected profit to zero to find a fair entry fee.`,
    questions: [
      { q: 'X: 0, 1, 2 with p: 0.2, 0.5, 0.3. E(X) =', opts: ['1.1', '1', '0.6', '1.5'], correct: 0, explain: '0×0.2 + 1×0.5 + 2×0.3 = 1.1.' },
      { q: 'For the same X, E(X²) =', opts: ['1.7', '1.21', '1.1', '2.9'], correct: 0, explain: '0 + 1×0.5 + 4×0.3 = 1.7.' },
      { q: 'Var(X) for the distribution above is:', opts: ['0.49', '1.7', '0.7', '0.59'], correct: 0, explain: '1.7 − 1.1² = 0.49.' },
      { q: 'E(X) = 4 and Var(X) = 2. E(3X + 1) =', opts: ['13', '12', '7', '4'], correct: 0, explain: '3×4 + 1 = 13.' },
      { q: 'E(X) = 4 and Var(X) = 2. Var(3X + 1) =', opts: ['18', '6', '19', '9'], correct: 0, explain: 'a²Var: 9×2 = 18; the +1 contributes nothing.' },
      { q: 'A table lists p: 0.1, 0.4, 0.2 for three values. The missing probability is:', opts: ['0.3', '0.7', '0.2', '1.0'], correct: 0, explain: '1 − 0.7 = 0.3; probabilities must total 1.' },
      { q: 'X, Y independent: Var(X) = 3, Var(Y) = 5. Var(X − Y) =', opts: ['8', '2', '15', '−2'], correct: 0, explain: 'Variances add for differences of independent variables: 3 + 5.' },
      { q: 'E(X) = −2. Then E(5 − 2X) =', opts: ['9', '1', '−9', '−4'], correct: 0, explain: '5 − 2(−2) = 9.' },
      { q: 'E(X²) = 10, E(X) = 3. Var(X) =', opts: ['1', '9', '19', '3'], correct: 0, explain: '10 − 9 = 1.' },
      { q: 'The expected value of a fair £1 coin toss win is £0. The game with E(winnings) = 0 is:', opts: ['fair', 'biased to the player', 'impossible', 'always profitable'], correct: 0, explain: 'Fair means zero expected gain.' },
    ],
  },
  {
    name: 'Binomial Distribution',
    description: 'Bernoulli trials, the binomial model B(n, p), expectation and variance, and modelling decisions.',
    lesson: `# The Binomial Distribution

### When Binomial Applies
X ~ B(n, p) counts successes in n independent trials when:

1. a fixed number n of identical trials,
2. each trial ends in success or failure,
3. constant success probability p,
4. trials are independent.

Check all four before using the model — "justifying a binomial model" is a real exam question.

### The Formula
P(X = r) = ⁿCᵣ pʳ(1 − p)ⁿ⁻ʳ for r = 0, 1, ..., n. The ⁿCᵣ counts which r of the n trials were the successes.

**Example:** X ~ B(5, 0.3). P(X = 2) = ¹⁰C₂? No — ⁵C₂ × 0.3² × 0.7³ = 10 × 0.09 × 0.343 = 0.3087.

### Cumulative Probabilities
P(X ≤ 2) = P(0) + P(1) + P(2). "At least" questions convert by the complement: P(X ≥ 2) = 1 − P(X ≤ 1). Keep one extra decimal place in intermediate steps to avoid rounding drift.

### Expectation and Variance
- E(X) = np and Var(X) = np(1 − p)

For X ~ B(20, 0.4): E(X) = 8 and Var(X) = 4.8.

### Modelling Decisions
If trials are dependent (drawing without replacement from a small population) binomial is not appropriate. If p changes between trials it is not binomial. When n is large and p small, the binomial is approximately Poisson — but at A2 you usually stay exact.

**Exam tips:** identify n and p in words before touching the calculator. For P(X ≥ k) always rewrite as 1 − P(X ≤ k − 1). Tables give cumulative values — use them rather than summing by hand.`,
    questions: [
      { q: 'X ~ B(6, 0.25). P(X = 0) =', opts: ['0.178', '0.25', '0.0156', '0.75'], correct: 0, explain: '(1 − p)⁶ = 0.75⁶ ≈ 0.178.' },
      { q: 'X ~ B(10, 0.4). E(X) =', opts: ['4', '2.4', '0.4', '10'], correct: 0, explain: 'np = 10 × 0.4 = 4.' },
      { q: 'X ~ B(10, 0.4). Var(X) =', opts: ['2.4', '4', '0.24', '6'], correct: 0, explain: 'np(1 − p) = 10 × 0.4 × 0.6 = 2.4.' },
      { q: 'Which is NOT a binomial condition?', opts: ['variable probability p', 'fixed n', 'independent trials', 'success or failure'], correct: 0, explain: 'p must stay constant across trials.' },
      { q: 'X ~ B(5, 0.3). P(X = 2) =', opts: ['0.3087', '0.3', '0.15', '0.4437'], correct: 0, explain: '⁵C₂ × 0.3² × 0.7³ = 10 × 0.09 × 0.343 = 0.3087.' },
      { q: 'X ~ B(8, 0.5). P(X ≥ 1) =', opts: ['0.9961', '0.5', '0.0039', '0.9375'], correct: 0, explain: '1 − P(0) = 1 − 0.5⁸ = 0.9961.' },
      { q: '20 independent free throws with p = 0.7. The expected number scored is:', opts: ['14', '7', '20', '0.7'], correct: 0, explain: 'np = 14.' },
      { q: 'Drawing 3 balls without replacement from a bag of 10 — binomial?', opts: ['No — trials are not independent', 'Yes — two outcomes exist', 'Yes — n is fixed', 'Only if p = 0.5'], correct: 0, explain: 'Without replacement changes p each draw.' },
      { q: 'X ~ B(12, 0.2). Var(X) =', opts: ['1.92', '2.4', '2.76', '0.2'], correct: 0, explain: '12 × 0.2 × 0.8 = 1.92.' },
      { q: 'P(X = 3) for X ~ B(4, 0.5) is:', opts: ['0.25', '0.0625', '0.375', '0.5'], correct: 0, explain: '⁴C₃ × 0.5³ × 0.5 = 4 × 0.0625 = 0.25.' },
    ],
  },
  {
    name: 'The Normal Distribution',
    description: 'The normal model N(μ, σ²), standardising, and using the normal approximation to the binomial.',
    lesson: `# The Normal Distribution

### The Model
A continuous distribution with the familiar bell shape, symmetric about the mean, described by two parameters: X ~ N(μ, σ²). The curve is fully determined by μ (centre) and σ (width). Total probability is 1, and because X is continuous, P(X = a) = 0 for any single point — inequalities do not need strictness.

### Standardising
Convert any normal variable to the standard normal Z ~ N(0, 1) with

- Z = (X − μ)/σ

Then read probabilities from the normal table. For X ~ N(50, 4²): P(X > 56) = P(Z > 1.5) = 1 − 0.9332 = 0.0668.

### Backwards Problems
Given a probability, find μ or σ. Convert the target percentile to a z-value from the table, then solve (x − μ)/σ = z.

**Example:** P(X < 30) = 0.15 with unknown σ. From tables z = −1.036, so (30 − μ)/σ = −1.036 — one equation per unknown; use a second condition if both are missing.

### Symmetry Shortcuts
P(X > μ) = 0.5. P(X < a) for a above the mean uses the complement. Tables usually give Φ(z) for z ≥ 0 only; use Φ(−z) = 1 − Φ(z).

### Normal Approximation to the Binomial
For large n with p near ½, X ~ B(n, p) ≈ N(np, np(1 − p)). The condition usually quoted at this level is np > 5 and n(1 − p) > 5. Apply a continuity correction: to approximate P(X ≥ 12) for a binomial, compute P(Y > 11.5) for the normal Y.

**Example:** B(100, 0.5) ≈ N(50, 25). P(X ≥ 55) ≈ P(Y > 54.5) = P(Z > 0.9) = 0.1841.

**Exam tips:** always sketch and shade — the picture prevents complement errors. State the standardisation step explicitly; marks sit in the working. Check whether a question says "mean and standard deviation" (σ) or "variance" (σ²) before standardising.`,
    questions: [
      { q: 'X ~ N(50, 25). P(X > 60) ≈', opts: ['0.0228', '0.1587', '0.4772', '0.9772'], correct: 0, explain: 'Z = (60 − 50)/5 = 2: P(Z > 2) = 0.0228.' },
      { q: 'For any normal distribution P(X < μ) =', opts: ['0.5', '0.3413', '1', '0'], correct: 0, explain: 'Symmetry about the mean.' },
      { q: 'X ~ N(10, 4). P(X < 8) ≈', opts: ['0.1587', '0.8413', '0.5', '0.0228'], correct: 0, explain: 'Z = (8 − 10)/2 = −1: Φ(−1) = 0.1587.' },
      { q: 'Φ(−z) equals:', opts: ['1 − Φ(z)', 'Φ(z)', '−Φ(z)', '0.5 − Φ(z)'], correct: 0, explain: 'Standard normal symmetry.' },
      { q: 'B(100, 0.5) approximated by normal has mean and variance:', opts: ['50 and 25', '50 and 50', '25 and 25', '100 and 50'], correct: 0, explain: 'N(np, np(1−p)) = N(50, 25).' },
      { q: 'The continuity correction for P(X ≥ 12) is:', opts: ['P(Y > 11.5)', 'P(Y > 12)', 'P(Y ≥ 12.5)', 'P(Y < 11.5)'], correct: 0, explain: 'The discrete value 12 becomes the interval 11.5 to 12.5.' },
      { q: 'X ~ N(μ, σ²) with P(X < 40) = 0.05 and z = −1.645. Then μ =', opts: ['cannot be found without σ', '40 − 1.645σ', '40 + 1.645σ', '40σ − 1.645'], correct: 0, explain: '(40 − μ)/σ = −1.645 has two unknowns; one condition is not enough.' },
      { q: 'Which is a valid reason to use a normal approximation to B(50, 0.5)?', opts: ['np > 5 and n(1−p) > 5', 'n < 30', 'p is very small', 'the data is discrete'], correct: 0, explain: 'Both products exceed 5, so the shape is close to normal.' },
      { q: 'X ~ N(0, 1). P(Z > 1.96) ≈', opts: ['0.025', '0.975', '0.05', '0.475'], correct: 0, explain: 'The classic two-tail critical value: 2.5% in the upper tail.' },
      { q: 'For a continuous random variable, P(X = 3) is:', opts: ['0', '1/3', 'undefined', '0.3'], correct: 0, explain: 'Single points have zero probability under a density.' },
    ],
  },
  {
    name: 'Poisson Distribution',
    description: 'Counting rare random events per unit interval: the Poisson model, its mean and variance.',
    lesson: `# The Poisson Distribution

### The Model
X ~ Po(λ) counts events in a fixed interval of time or space when events occur independently, at a constant average rate λ, and never twice at the same instant. Classic settings: calls per hour at a helpdesk, typos per page, cars per minute at a quiet junction.

### The Formula
P(X = r) = e^(−λ) λʳ / r! for r = 0, 1, 2, ...

**Example:** X ~ Po(2). P(X = 0) = e⁻² ≈ 0.1353. P(X = 1) = 2e⁻² ≈ 0.2707.

### Mean and Variance
The defining signature of the Poisson:

- E(X) = λ and Var(X) = λ — the mean and variance are equal.

If a question gives a mean m, then λ = m; the variance is also m.

### Scaling the Interval
If X ~ Po(λ) per hour, then 3 hours gives Y ~ Po(3λ). Rates must be adjusted to the same interval before computing anything. Halving an interval halves λ.

### Adding Poissons
If X ~ Po(λ₁) and Y ~ Po(λ₂) are independent, then X + Y ~ Po(λ₁ + λ₂). Two independent queues merging into one server produce a Poisson with summed rate.

**Exam tips:** check independence and constant rate before modelling — if events cluster (rush hours), Poisson fails. Convert the interval first: a rate of 8 per 20 minutes becomes 24 per hour. In "at least" questions use the complement exactly as with the binomial.`,
    questions: [
      { q: 'X ~ Po(3). P(X = 0) =', opts: ['e⁻³ ≈ 0.0498', '0.15', '1', 'e³'], correct: 0, explain: 'P(0) = e^(−λ) = e⁻³.' },
      { q: 'X ~ Po(2.5). Var(X) =', opts: ['2.5', '5', '1.58', '6.25'], correct: 0, explain: 'Poisson variance equals its mean.' },
      { q: 'Calls arrive at 4 per hour. The expected calls in 30 minutes is:', opts: ['2', '4', '8', '0.5'], correct: 0, explain: 'Scale the rate: 4 × 0.5 = 2.' },
      { q: 'X ~ Po(1.2) and Y ~ Po(0.8) independent. X + Y ~', opts: ['Po(2)', 'Po(0.96)', 'Po(1.2)', 'B(2, 0.8)'], correct: 0, explain: 'Independent Poissons add rates: 1.2 + 0.8.' },
      { q: 'Which violates the Poisson model?', opts: ['buses arriving in clumps', 'typos per page at a steady rate', 'calls per hour at random', ' radioactive decays per second'], correct: 0, explain: 'Clustering breaks the constant-rate/independence assumptions.' },
      { q: 'X ~ Po(2). P(X = 1) ≈', opts: ['0.2707', '0.1353', '0.5', '0.7358'], correct: 0, explain: 'e⁻² × 2 = 0.2707.' },
      { q: 'A Poisson with mean 6 has standard deviation:', opts: ['√6 ≈ 2.449', '6', '36', '3'], correct: 0, explain: 'Var = 6, so s = √6.' },
      { q: 'X ~ Po(0.5). P(X ≥ 1) ≈', opts: ['0.3935', '0.5', '0.6065', '0.1065'], correct: 0, explain: '1 − P(0) = 1 − e⁻⁰·⁵ ≈ 0.3935.' },
      { q: 'The Poisson is a good approximation to B(n, p) when:', opts: ['n large and p small', 'n small and p large', 'p = 0.5 exactly', 'n = 2'], correct: 0, explain: 'Rare events in many trials: np ≈ λ.' },
      { q: 'For Po(4) per minute, the rate per 10 minutes is:', opts: ['40', '0.4', '4', '10'], correct: 0, explain: 'Multiply λ by the interval factor: 4 × 10.' },
    ],
  },
  {
    name: 'Continuous Random Variables',
    description: 'Probability density functions, probabilities as areas, and E(X), Var(X) for continuous variables.',
    lesson: `# Continuous Random Variables

### Probability Density Functions
A continuous variable X is described by a density f(x) with f(x) ≥ 0 and ∫f(x)dx = 1 over all x. Probabilities are areas:

- P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx

Single points have zero probability, so strict or loose inequalities make no difference: P(X < 2) = P(X ≤ 2).

### Finding Unknown Constants
Piecewise densities carry an unknown k: impose that the total area is 1 (and continuity at joins where required). One equation, one unknown.

**Example:** f(x) = kx on 0 ≤ x ≤ 2. Total area: k·(2²/2) = 2k = 1, so k = ½.

### Expectation and Variance
- E(X) = ∫x·f(x) dx
- E(X²) = ∫x²·f(x) dx
- Var(X) = E(X²) − (E(X))²

The mean is the balancing point of the area under the density. For symmetric densities the mean sits at the symmetry point — worth spotting before integrating.

### The Median and Mode
The median m solves ∫₋∞ᵐ f(x) dx = 0.5 (left half of the area). The mode is the x maximising f(x). For uniform densities the median is the midpoint.

### Uniform Distribution
If f(x) = 1/(b − a) on [a, b], every point is equally likely. Then E(X) = (a + b)/2 and Var(X) = (b − a)²/12 — memorise both; they are quick exam marks.

**Exam tips:** always verify ∫f = 1 before computing anything else. Sketch the density — area intuitions catch algebra slips. Median questions are integration-to-0.5 questions; set them up before calculating.`,
    questions: [
      { q: 'f(x) = 2x on 0 ≤ x ≤ 1. P(X < 0.5) =', opts: ['0.25', '0.5', '0.125', '1'], correct: 0, explain: '∫₀^0.5 2x dx = 0.5² = 0.25.' },
      { q: 'A valid density must satisfy:', opts: ['f ≥ 0 and total area 1', 'f ≤ 1 everywhere', 'f symmetric', 'f continuous only'], correct: 0, explain: 'Non-negativity and unit total area.' },
      { q: 'f(x) = k on 0 ≤ x ≤ 4. k =', opts: ['0.25', '4', '1', '0.5'], correct: 0, explain: '4k = 1 so k = 0.25 (the uniform density).' },
      { q: 'For a continuous variable, P(X = 2) =', opts: ['0', '2', 'f(2)', '0.5'], correct: 0, explain: 'Points carry zero probability; only intervals have area.' },
      { q: 'E(X) = 2, E(X²) = 8. Var(X) =', opts: ['4', '6', '10', '2'], correct: 0, explain: '8 − 2² = 4.' },
      { q: 'The median m of a density satisfies:', opts: ['area to the left of m is 0.5', 'f(m) = 0.5', 'm is the maximum point', 'E(X) = m always'], correct: 0, explain: 'Half the probability lies below the median.' },
      { q: 'X uniform on [1, 5]. E(X) =', opts: ['3', '2', '4', '2.5'], correct: 0, explain: '(1 + 5)/2 = 3.' },
      { q: 'X uniform on [1, 5]. Var(X) =', opts: ['4/3', '1', '16', '2'], correct: 0, explain: '(b − a)²/12 = 16/12 = 4/3.' },
      { q: 'f(x) = x/2 on 0 ≤ x ≤ 2. E(X) =', opts: ['4/3', '1', '1.5', '2'], correct: 0, explain: '∫ x·(x/2) dx from 0 to 2 = 8/6 = 4/3.' },
      { q: 'P(1 < X < 2) and P(1 ≤ X ≤ 2) for a continuous X are:', opts: ['equal', 'different by f(1)', 'different by f(2)', 'undefined'], correct: 0, explain: 'Endpoints have zero probability, so the inequalities are equivalent.' },
    ],
  },
  {
    name: 'Sampling and Estimation',
    description: 'Unbiased estimators, the sample mean distribution, the central limit theorem and confidence ideas.',
    lesson: `# Sampling and Estimation

### Populations, Samples, Statistics
A parameter describes the population (μ, σ²); a statistic describes the sample (x̄, s²). A statistic is unbiased if its expectation equals the population parameter: E(x̄) = μ always holds for the sample mean.

### Unbiased Variance
The estimator with divisor (n − 1) is the unbiased sample variance:

- s² = Σ(x − x̄)²/(n − 1)

Why n − 1: deviations are measured from x̄ rather than μ, slightly underestimating spread; the smaller divisor corrects it. At A2, state which estimator you are using — the unbiased one is the default.

### Distribution of the Sample Mean
For a sample of size n from a population with mean μ and variance σ²:

- E(x̄) = μ and Var(x̄) = σ²/n

Averaging shrinks spread — bigger samples give steadier estimates.

### Central Limit Theorem
Whatever the population shape, for large n (rule of thumb n ≥ 30) the sample mean is approximately normal: x̄ ~ N(μ, σ²/n). This is why the normal appears constantly in inference.

**Example:** population mean 50, s.d. 12, n = 36. Then x̄ ~ N(50, 4) and P(x̄ > 51) = P(Z > 0.5) = 0.3085.

### Using x̄ to Estimate
Given sample data, estimate μ by x̄ and σ² by the unbiased s². When the population is normal, x̄ is exactly normal for any n — the CLT is only needed for non-normal populations.

**Exam tips:** distinguish σ²/σ (population) from s²/s (sample) in notation. Standard error means √(σ²/n) — smaller with larger n. Quote probabilities for x̄ with the variance divided by n; forgetting that division is the classic error.`,
    questions: [
      { q: 'E(x̄) for any population with mean μ is:', opts: ['μ', 'μ/n', 'σ²/n', 'μ²'], correct: 0, explain: 'The sample mean is unbiased for μ.' },
      { q: 'Var(x̄) with population variance σ² and sample size n is:', opts: ['σ²/n', 'σ²', 'nσ²', 'σ/n'], correct: 0, explain: 'Averaging divides the variance by n.' },
      { q: 'The unbiased sample variance uses divisor:', opts: ['n − 1', 'n', 'n + 1', '2n'], correct: 0, explain: 'Bessel correction (n − 1).' },
      { q: 'σ = 12, n = 36. The standard error of x̄ is:', opts: ['2', '12', '0.33', '6'], correct: 0, explain: 'σ/√n = 12/6 = 2.' },
      { q: 'The CLT says for large n the sample mean is approximately:', opts: ['normal regardless of population shape', 'uniform', 'Poisson', 'exactly the population distribution'], correct: 0, explain: 'That is the power of the theorem.' },
      { q: 'x̄ ~ N(50, 4). P(x̄ > 51) ≈', opts: ['0.3085', '0.5', '0.1587', '0.6915'], correct: 0, explain: 'Z = (51 − 50)/2 = 0.5.' },
      { q: 'Doubling the sample size multiplies the variance of x̄ by:', opts: ['0.5', '2', '4', '0.25'], correct: 0, explain: 'σ²/(2n) halves the variance.' },
      { q: 'A statistic is unbiased when:', opts: ['its expectation equals the parameter', 'it equals the parameter in every sample', 'its variance is zero', 'the sample is large'], correct: 0, explain: 'Unbiasedness is about the average across samples.' },
      { q: 'The population is normal. The distribution of x̄ is:', opts: ['normal for every n', 'normal only for n ≥ 30', 'Poisson', 'unknown'], correct: 0, explain: 'Normal population gives exact normal sample means; the CLT is for non-normal cases.' },
      { q: 'A larger sample gives a sampling distribution that is:', opts: ['narrower around μ', 'wider around μ', 'shifted right', 'unchanged'], correct: 0, explain: 'More data tightens the estimate.' },
    ],
  },
  {
    name: 'Hypothesis Testing',
    description: 'Null and alternative hypotheses, test statistics, significance levels and one/two-tailed tests.',
    lesson: `# Hypothesis Testing

### The Framework
The null hypothesis H₀ is the default claim (no change, p = p₀). The alternative H₁ is what a suspicious observation suggests (p > p₀, p < p₀, or p ≠ p₀). The significance level α is the probability of rejecting a true H₀ — the false-alarm rate, usually 5% or 1%.

### Test for a Binomial Proportion
With X ~ B(n, p₀) under H₀, compute the probability of results at least as extreme as the observed count in the direction of H₁.

**Example:** H₀: p = 0.3 against H₁: p > 0.3, observed 10 successes in n = 20. Compute P(X ≥ 10) under B(20, 0.3). If that tail probability is below α, reject H₀.

### One-Tailed vs Two-Tailed
One-tailed tests take the whole α in one direction. Two-tailed tests split α across both tails: compare against α/2 on each side, or equivalently check whether the observation falls in the extreme 2.5% (for α = 5%). Choose the tails from the wording of H₁, not from the data.

### Critical Regions
The critical region is the set of values of the test statistic that would lead to rejection. Its boundary is the critical value. For B(20, 0.3) at the 5% level with H₁: p > 0.3, find the smallest k with P(X ≥ k) < 0.05 — that k opens the critical region.

### Conclusions in Context
Never just say "reject H₀". Conclude in the language of the problem: "there is sufficient evidence at the 5% level that the proportion has increased". State the significance level, the direction, and the real-world quantity.

**Exam tips:** define H₀ and H₁ with symbols AND words. Verify which tail the observation sits in before computing. If the observed value lies in the critical region, evidence supports H₁; otherwise there is insufficient evidence — never "prove H₀ true".`,
    questions: [
      { q: 'The significance level α is the probability of:', opts: ['rejecting H₀ when it is true', 'accepting H₀', 'a wrong H₁', 'sampling error'], correct: 0, explain: 'That is the definition of a Type I error rate.' },
      { q: 'H₀: p = 0.4 vs H₁: p ≠ 0.4 at 5%. The tail comparison uses:', opts: ['0.025 in each tail', '0.05 in each tail', '0.05 in one tail', '0.1 total'], correct: 0, explain: 'Two-tailed tests split α equally.' },
      { q: 'Under H₀: p = 0.3, P(X ≥ 10) = 0.048 for n = 20. At the 5% level with H₁: p > 0.3, we:', opts: ['reject H₀', 'accept H₀ as proven', 'raise α', 'cannot conclude'], correct: 0, explain: '0.048 < 0.05: the result is significant.' },
      { q: 'A one-tailed test with H₁: p < p₀ uses:', opts: ['the lower tail only', 'both tails', 'the upper tail only', 'no tails'], correct: 0, explain: 'The direction in H₁ picks the tail.' },
      { q: 'The critical region is:', opts: ['values of the statistic leading to rejection of H₀', 'the region where H₀ is true', 'the acceptance zone', 'the p-value'], correct: 0, explain: 'It is the rejection zone of the test statistic.' },
      { q: '"Insufficient evidence to reject H₀" means:', opts: ['H₀ is not proven, just not contradicted', 'H₀ is true', 'H₁ is true', 'α was wrong'], correct: 0, explain: 'Absence of evidence is not proof of the null.' },
      { q: 'For B(20, 0.3), the smallest k with P(X ≥ k) < 0.05 is the:', opts: ['critical value', 'mean', 'p-value', 'variance'], correct: 0, explain: 'That boundary value defines the critical region start.' },
      { q: 'A p-value of 0.12 at α = 0.05 means:', opts: ['do not reject H₀', 'reject H₀', 'α must change', 'H₁ is proven'], correct: 0, explain: '0.12 > 0.05: not significant.' },
      { q: 'Which pair states hypotheses correctly?', opts: ['H₀: p = 0.5, H₁: p > 0.5', 'H₀: p > 0.5, H₁: p = 0.5', 'H₀: x̄ = 0.5', 'H₀: p ≠ 0.5'], correct: 0, explain: 'The null always carries the equality.' },
      { q: 'Reducing α from 5% to 1% makes rejection:', opts: ['harder', 'easier', 'impossible', 'automatic'], correct: 0, explain: 'A smaller false-alarm allowance demands stronger evidence.' },
    ],
  },
];
