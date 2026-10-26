// Keyed equation sheets, Mathematics AS — fifth tranche: the statistics notes.
//
//   AS  AS Level Mathematics: The Normal Distribution                       (53 formula lines, no key)
//   AS  AS Level Mathematics: Statistics S1 — Correlation and Regression     (51)
//   AS  AS Level Mathematics: Measures of Variation and Standard Deviation   (50)
//   AS  AS Level Mathematics: Numerical Measures of Central Tendency         (36)
//
// Same house rules as content-math-keyed-a..d.cjs: opens with
// `<h2>Equations and symbols</h2>`, one `<p>` per equation, `<em>Key:</em>` inside
// that same paragraph naming every symbol (and its unit where there is one),
// Unicode notation, appended rather than rewritten. Ids are study_materials ids,
// not topic ids — a topic id updates zero rows and still answers 201.
//
// Apply with:
//   node .freebuff/append-note-sections.cjs .freebuff/content-math-keyed-e.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql --apply    (live)

const HEAD = `<h2>Equations and symbols</h2>
<p>Every definition and relation these topics are examined on, gathered into one reference sheet, each written with its real notation and followed by a key naming each symbol and what it stands for. The sections above derive them; this is the sheet you revise from when a question has to be turned into algebra quickly and the marks depend on using the right formula, not a nearly-right one.</p>`;

const sections = {
  /* ── Mathematics AS: The Normal Distribution ──────────────────────────── */
  "58ecfd82-cac6-4371-8ec0-1f303808c592": {
    slug: "maths-as-normal-distribution",
    html: `${HEAD}
<h3>The model and its notation</h3>
<p><strong>X ~ N(μ, σ²)</strong><br><em>Key:</em> X = the random variable being modelled (a height in cm, a mass in g, a time in s); N = the normal distribution; μ (mu) = the mean, in the same unit as X, which fixes where the bell sits; σ² (sigma squared) = the variance, in the square of that unit; σ = the standard deviation, in the original unit. The bracket always takes the <em>variance</em>: N(10, 4) is a mean of 10 with σ = 2, and reading the 4 as σ is the classic error of the topic.</p>
<p><strong>P(X &lt; μ) = P(X &gt; μ) = 0.5 and P(X &lt; μ − a) = P(X &gt; μ + a)</strong><br><em>Key:</em> μ = the mean; a = any positive distance from the mean, in the unit of X; the two halves of the curve have equal area, and the curve is a mirror image about x = μ. The second identity is what turns a "greater than" question into a "less than" one without arithmetic: the area above μ + a equals the area below μ − a.</p>
<p><strong>P(μ − σ &lt; X &lt; μ + σ) ≈ 0.6827, P(μ − 2σ &lt; X &lt; μ + 2σ) ≈ 0.9545, P(μ − 3σ &lt; X &lt; μ + 3σ) ≈ 0.9973</strong><br><em>Key:</em> μ = the mean; σ = the standard deviation; the percentages are of the total area, so 0.6827 of all observations lie within one standard deviation. These are the sanity checks on any computed probability — a result that puts 40% of a distribution within one σ is wrong.</p>

<h3>Standardising, the only step most questions need</h3>
<p><strong>z = (x − μ)/σ</strong><br><em>Key:</em> z = the standardised value, in standard deviations from the mean, so it is dimensionless; x = the value of X being converted, in the unit of X; μ = the mean, same unit; σ = the standard deviation, same unit, σ &gt; 0. Positive z is above the mean, negative below; z measures how many σ the value sits from μ.</p>
<p><strong>Z ~ N(0, 1) and P(X &lt; x) = P(Z &lt; z) = Φ(z)</strong><br><em>Key:</em> Z = the standard normal variable, with mean 0 and standard deviation 1, which is the one tabulated; Φ (capital phi) = the cumulative distribution function, giving the area to the left of z. The tables are cumulative, so every other shape of question is rearranged into this one.</p>
<p><strong>P(X &gt; x) = 1 − Φ(z) and P(a &lt; X &lt; b) = Φ(z_b) − Φ(z_a)</strong><br><em>Key:</em> a, b = the two limits of the interval, in the unit of X; z_a, z_b = their standardised values; Φ = the cumulative area. The area between two values is the difference of two cumulative areas, and an upper tail is one minus the cumulative area below — subtracting from the wrong side is the commonest mark lost.</p>
<p><strong>Φ(−z) = 1 − Φ(z)</strong><br><em>Key:</em> z = any standardised value; Φ = the cumulative area. It lets a table that only prints positive z answer a negative one, and it is the algebraic form of the curve's symmetry.</p>

<h3>Working backwards from a probability</h3>
<p><strong>x = μ + σΦ⁻¹(p), where Φ⁻¹(p) is the z with area p to its left</strong><br><em>Key:</em> p = the probability (area) below the required value, between 0 and 1; Φ⁻¹ = the inverse cumulative function, read from the percentage points table; μ, σ = the parameters of the distribution; x = the value in the unit of X. The sign of Φ⁻¹ carries the answer: p &lt; 0.5 gives a negative z and an x below the mean.</p>
<p><strong>P(X &gt; x) = q ⇒ use p = 1 − q before inverting</strong><br><em>Key:</em> q = the upper-tail probability stated in the question; p = the cumulative probability the tables need. Skipping this step puts the answer on the wrong side of the mean and is the most frequent single-mark loss in the topic.</p>
<p><strong>the middle 100(1 − 2α)% of the distribution spans μ ± σΦ⁻¹(1 − α)</strong><br><em>Key:</em> α = the tail probability on each side, so a middle 80% has α = 0.10 and Φ⁻¹(0.90) = 1.2816; μ, σ = the mean and standard deviation; the interval is symmetric about μ by construction. State the two z values explicitly — the marks are for ±1.2816, not for a remembered decimal.</p>

<h3>Unknown parameters, and combining variables</h3>
<p><strong>P(X &lt; x₁) = p₁ and P(X &lt; x₂) = p₂ ⇒ μ + σz₁ = x₁, μ + σz₂ = x₂</strong><br><em>Key:</em> x₁, x₂ = the two given values of X; p₁, p₂ = their cumulative probabilities, giving z₁, z₂ from the inverse table; μ, σ = the two unknowns. Subtract the equations to eliminate μ and get σ, then substitute back: σ = (x₂ − x₁)/(z₂ − z₁).</p>
<p><strong>X + Y ~ N(μ_X + μ_Y, σ_X² + σ_Y²) and X − Y ~ N(μ_X − μ_Y, σ_X² + σ_Y²)</strong><br><em>Key:</em> X, Y = two independent normal variables; μ_X, μ_Y = their means; σ_X², σ_Y² = their variances. Means add and subtract, but variances always <em>add</em> — subtracting variables does not subtract their variances, because spread from both sources always increases the total.</p>
<p><strong>aX + b ~ N(aμ + b, a²σ²)</strong><br><em>Key:</em> a = a constant multiplier (a currency conversion, a scale factor), which may be negative; b = a constant added; μ, σ² = the mean and variance of X. The mean is transformed directly, the variance by a squared — a negative a flips the order of every percentile but leaves the spread unchanged.</p>
<p><strong>P(X &gt; x) = P(X &lt; 2μ − x)</strong><br><em>Key:</em> μ = the mean; x = a value above the mean; 2μ − x = its mirror image below. The identity converts an upper tail into a lower one at the same distance, which is how a symmetry argument is written out for a mark.</p>`,
  },

  /* ── Mathematics AS: Statistics S1 — correlation and regression ───────── */
  "5ad98814-ed87-4998-9623-110870576cd3": {
    slug: "maths-as-statistics-s1",
    html: `${HEAD}
<h3>The three sums of squares everything is built from</h3>
<p><strong>S_xx = Σx² − (Σx)²/n</strong><br><em>Key:</em> S_xx = the corrected sum of squares of x, in the square of x's unit; Σx² = the sum of the squared observations; (Σx)² = the square of the sum; n = the number of pairs. It measures how much x varies, and it is the denominator of the y-on-x gradient, so it must never be negative — a negative value means an arithmetic slip.</p>
<p><strong>S_yy = Σy² − (Σy)²/n</strong><br><em>Key:</em> S_yy = the corrected sum of squares of y, in the square of y's unit; the same construction on the second variable; n = the number of pairs. It is the denominator of the x-on-y gradient.</p>
<p><strong>S_xy = Σxy − (Σx)(Σy)/n</strong><br><em>Key:</em> S_xy = the corrected sum of cross-products, in the product of the two units; Σxy = the sum of each pair multiplied together; n = the number of pairs. Its sign is the sign of the correlation: positive means the variables rise together, negative means one falls as the other rises.</p>

<h3>The product-moment correlation coefficient</h3>
<p><strong>r = S_xy/√(S_xx × S_yy)</strong><br><em>Key:</em> r = the product-moment correlation coefficient, a pure number with no unit; S_xx, S_yy, S_xy = the three corrected sums above. The denominator is always positive, so the sign of r is the sign of S_xy; the value always lies in −1 ≤ r ≤ 1.</p>
<p><strong>−1 ≤ r ≤ 1, and r = ±1 exactly when every point lies on a straight line</strong><br><em>Key:</em> r = the correlation coefficient; the endpoints are perfect negative and perfect positive linear relationships, and r = 0 means no <em>linear</em> association. A strong curve can give r close to 0, so a value near zero is not evidence that no relationship exists — only that no straight one does.</p>
<p><strong>r is unchanged by coding y = (x − a)/b, and unchanged if the two variables are swapped</strong><br><em>Key:</em> a = a constant shift; b = a non-zero constant multiplier (b &lt; 0 reverses the sign of the gradient but r changes sign, so state the sign in context); r measures linear association only, and association is symmetric between the two variables. This is why a question that changes the units of measurement expects the same r.</p>

<h3>The two regression lines</h3>
<p><strong>y on x: y = a + bx, with b = S_xy/S_xx and a = ȳ − b x̄</strong><br><em>Key:</em> y = the predicted value of the dependent variable; x = the explanatory variable; b = the gradient, in units of y per unit of x; a = the intercept, in units of y, the prediction at x = 0; x̄, ȳ = the two sample means. This is the line that minimises the vertical distances and the one to use when predicting y from x.</p>
<p><strong>x on y: x = c + dy, with d = S_xy/S_yy and c = x̄ − d ȳ</strong><br><em>Key:</em> the symbols mirror the first line with the roles swapped: d = units of x per unit of y, c = the x-intercept in units of x. It minimises horizontal distances, so it is a different line unless r = ±1; predicting x from y requires this one, not a rearrangement of the other.</p>
<p><strong>both lines pass through (x̄, ȳ), and b × d = r²</strong><br><em>Key:</em> x̄, ȳ = the sample means; b, d = the two gradients; r = the correlation coefficient. The product of the gradients is r² ≤ 1, which is why the y-on-x line is the steeper of the two whenever |r| &lt; 1 — a free check on both gradients.</p>
<p><strong>residual = observed y − predicted y = y − (a + bx)</strong><br><em>Key:</em> y = the observed value; a + bx = the value on the fitted line at the same x; the residual is in the unit of y, and the sum of all residuals is exactly zero. A residual plot that curves means a straight line is the wrong model, however high r is.</p>

<h3>Interpreting a fitted line honestly</h3>
<p><strong>b = the change in y per unit increase in x, a = the predicted y when x = 0</strong><br><em>Key:</em> b = the gradient, in y-units per x-unit; a = the intercept, in y-units; both are estimates from the sample and the interpretation must name the variables, not just say "gradient". The intercept is often meaningless — a predicted mass at zero height — so say when x = 0 lies outside the data.</p>
<p><strong>interpolation: x within the observed range; extrapolation: x outside it</strong><br><em>Key:</em> the observed range is the smallest to largest x in the data; a prediction inside it is supported by the data, one outside assumes the straight-line pattern continues where nothing was measured. An extrapolation is not wrong arithmetic, it is unjustified inference — that sentence is what the mark is for.</p>
<p><strong>a strong r does not establish causation</strong><br><em>Key:</em> r = the correlation coefficient; causation would require the change in one variable to produce the change in the other, which correlation cannot show — a lurking third variable can drive both. Write the distinction explicitly; examiners award it as a separate mark from the calculation.</p>`,
  },

  /* ── Mathematics AS: measures of variation ────────────────────────────── */
  "f1f5eeb9-8449-47ac-8dca-bf15caf51664": {
    slug: "maths-as-measures-of-variation",
    html: `${HEAD}
<h3>Range, quartiles and the interquartile range</h3>
<p><strong>range = largest − smallest</strong><br><em>Key:</em> largest and smallest = the two extreme observations, in the unit of the data; the range is in that same unit and uses only two of the values. That is its weakness as well as its speed: one outlier can double it.</p>
<p><strong>IQR = Q₃ − Q₁ and semi-interquartile range = (Q₃ − Q₁)/2</strong><br><em>Key:</em> Q₁ = the lower quartile, the value with a quarter of the data below it; Q₃ = the upper quartile, three quarters below it; IQR = the spread of the middle half, in the data's unit. It ignores the tails entirely, which is why it survives outliers that wreck the range and the standard deviation.</p>
<p><strong>outlier rule: a value below Q₁ − 1.5 × IQR or above Q₃ + 1.5 × IQR</strong><br><em>Key:</em> Q₁, Q₃ = the quartiles; IQR = Q₃ − Q₁; 1.5 = the conventional multiplier. An outlier is flagged, not deleted: a question that asks for its effect wants the sentence "with the outlier removed the mean falls and the standard deviation falls sharply".</p>

<h3>Variance and standard deviation from first principles</h3>
<p><strong>σ² = Σ(x − μ)²/n and σ = √(σ²)</strong><br><em>Key:</em> σ² (sigma squared) = the population variance, in the square of the data's unit; x = each observation; μ = the population mean; n = the number of observations; σ = the standard deviation, back in the original unit. Squaring first is essential: signed deviations always sum to zero, so they cannot measure spread on their own.</p>
<p><strong>s² = Σ(x − x̄)²/(n − 1)</strong><br><em>Key:</em> s² = the sample variance, an unbiased estimate of σ²; x̄ = the sample mean; n − 1 = the degrees of freedom, because one degree was spent estimating the mean. The two forms differ only in the denominator, and the question's wording ("the data" versus "a sample of") decides which to use.</p>
<p><strong>σ² = Σx²/n − μ² and s² = (Σx² − n x̄²)/(n − 1)</strong><br><em>Key:</em> Σx² = the sum of the squared observations; μ, x̄ = the mean; n = the number of observations. The computational forms are algebraically identical to the deviation forms and far quicker — one pass for the sum, one for the squares, no list of deviations.</p>
<p><strong>frequency form: mean = Σfx/Σf, variance = Σfx²/Σf − (mean)²</strong><br><em>Key:</em> f = the frequency of each value or class; x = the value, or the midpoint of a class; Σf = the total frequency. For grouped data the midpoint stands in for every value in the class, so both the mean and the standard deviation are estimates and should be described as such.</p>

<h3>Coding, combining and comparing</h3>
<p><strong>y = (x − a)/b ⇒ ȳ = (x̄ − a)/b, s_y = s_x/|b|, s_y² = s_x²/b²</strong><br><em>Key:</em> x = the original variable; a = a constant subtracted (a shift, such as removing 1000 from every salary); b = a constant divisor (a unit change, such as pence to pounds); ȳ, s_y = the mean and standard deviation after coding. A shift moves every value equally and leaves spread untouched; a scale changes the spread by the factor and the variance by its square. The modulus matters because a b &lt; 0 reverses the order of the data but cannot make spread negative.</p>
<p><strong>z = (x − x̄)/s</strong><br><em>Key:</em> z = the number of standard deviations a value sits from the mean, dimensionless; x = the value; x̄ = the mean; s = the standard deviation. It is the standardising step of the normal distribution, and it is how two data sets measured in different units are compared fairly.</p>
<p><strong>coefficient of variation = (s/x̄) × 100%</strong><br><em>Key:</em> s = the standard deviation; x̄ = the mean, which must be positive and non-zero for the ratio to mean anything; the result is a percentage, dimensionless. It compares relative spread across data sets with different units or very different means, where comparing s directly would mislead.</p>
<p><strong>combined mean = (n₁x̄₁ + n₂x̄₂)/(n₁ + n₂)</strong><br><em>Key:</em> n₁, n₂ = the two group sizes; x̄₁, x̄₂ = the two group means; the combination is weighted by size, not a midpoint of the two means. Two classes averaging 60 and 80 do not average 70 unless they have the same number of students.</p>
<p><strong>s² combined = [n₁(s₁² + (x̄₁ − x̄)²) + n₂(s₂² + (x̄₂ − x̄)²)]/(n₁ + n₂)</strong><br><em>Key:</em> s₁², s₂² = the within-group variances; x̄₁, x̄₂ = the group means; x̄ = the combined mean; n₁, n₂ = the group sizes. Each group's spread contributes twice: its own variance, plus the squared distance of its mean from the overall mean. The second term is why the combined standard deviation can exceed both group values.</p>`,
  },

  /* ── Mathematics AS: measures of central tendency ─────────────────────── */
  "2c8a9240-8b25-4768-a26d-9bdc7fca0a89": {
    slug: "maths-as-central-tendency",
    html: `${HEAD}
<h3>The three averages</h3>
<p><strong>mean x̄ = Σx/n and, for a frequency table, x̄ = Σfx/Σf</strong><br><em>Key:</em> x̄ = the arithmetic mean, in the unit of the data; x = each observation, or the midpoint of a class; f = its frequency; n = Σf = the number of observations. It uses every value, which makes it the most informative average and the one an outlier distorts most.</p>
<p><strong>median: the ((n + 1)/2)th value in order for n odd; the average of the (n/2)th and (n/2 + 1)th for n even</strong><br><em>Key:</em> n = the number of observations; the data must be sorted first, ascending or descending. The median is the value with half the data on each side, so it is unaffected by how extreme the extremes are — the reason it is preferred for incomes, house prices and any skewed data.</p>
<p><strong>mode = the most frequent value; modal class = the class with the highest frequency</strong><br><em>Key:</em> mode applies to the raw values (it can be non-numeric, such as the most common colour); the modal class is the grouped equivalent and reports the interval, not a single number. A data set can have no mode or several, and both are acceptable answers when stated.</p>
<p><strong>weighted mean = Σwx/Σw</strong><br><em>Key:</em> w = the weight of each value (a frequency, a credit rating, a number of items); x = the value; the denominator is the sum of the weights. It is the general form of the frequency-table mean, and it is what a "mean mark across classes of different sizes" question is asking for.</p>

<h3>Quartiles and the spread that goes with them</h3>
<p><strong>Q₁ position = (n + 1)/4, Q₃ position = 3(n + 1)/4</strong><br><em>Key:</em> n = the number of observations; the positions count from the smallest value upwards, and with n not a multiple of four the position falls between two values, so interpolate between them. Q₁ and Q₃ are in the unit of the data; the interquartile range is Q₃ − Q₁.</p>
<p><strong>grouped quartiles: value = L + ((n/4 − cumulative before)/frequency of class) × class width</strong><br><em>Key:</em> L = the lower boundary of the quartile's class; n = the total frequency; the cumulative-before count is the total frequency below that class; the class width is the interval's size. The same linear-interpolation shape gives any percentile, with n/4 replaced by the relevant fraction of n.</p>

<h3>Representations: histograms, cumulative frequency and box plots</h3>
<p><strong>frequency density = frequency/class width</strong><br><em>Key:</em> frequency = the number of observations in the class; class width = the size of the interval (in the variable's unit); frequency density is in observations per unit of the variable, which is what the vertical axis of an unequal-width histogram carries. Area, not height, represents frequency: area = frequency density × class width = frequency.</p>
<p><strong>cumulative frequency at an upper boundary = the running total of all classes up to and including it</strong><br><em>Key:</em> the axes are the variable (x) and the cumulative count (n); the curve never decreases and reaches the total frequency at the top boundary. The median is read where the curve crosses n/2, the quartiles where it crosses n/4 and 3n/4, and the readings are interpolated horizontally to the required precision.</p>
<p><strong>box plot: whiskers to the minimum and maximum, box from Q₁ to Q₃, line at the median</strong><br><em>Key:</em> Q₁, median, Q₃ = the three summary values, all in the data's unit; the box length is the IQR and each whisker the relevant quarter of the range. Two box plots side by side compare location (median line) and spread (box length) in one glance — the comparison sentence a question always wants.</p>

<h3>Choosing an average, and how the shape decides</h3>
<p><strong>mean &gt; median &gt; mode for positive skew; mean &lt; median &lt; mode for negative skew; all three equal for a symmetric distribution</strong><br><em>Key:</em> the three averages, in the unit of the data; skew is the direction of the long tail, not the side where the bulk of the data sits. The mean is dragged towards the tail, so it sits furthest out; that ordering is the quickest read of a histogram and the answer to "which average best represents the data".</p>
<p><strong>adding a constant a to every value adds a to the mean and median and leaves the mode shifted equally: no change in spread</strong><br><em>Key:</em> a = the constant added, in the data's unit; the mean, median and mode all move by a, while the range, IQR and standard deviation are unchanged. Multiplying every value by b multiplies each average and every measure of spread by |b| — the reason a unit conversion never changes the shape of a distribution.</p>`,
  },
};

module.exports = { sections };
