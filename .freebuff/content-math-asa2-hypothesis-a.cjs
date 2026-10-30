/**
 * Mathematics A2 hypothesis-testing deepening, pass a: six new h2 sections
 * with 27 h3 subsections in total (13 → 40 h3 headings, above the 36 bar).
 * One figure, the standard normal curve with the lower 5% critical region,
 * in the normal-test section. Inserted before "Equations and symbols" by
 * refine-note-sections.cjs; nothing already in the note is rewritten.
 */

const F = require("./note-figures.cjs");
const { C } = F;

const NOTE = "124279ee-da25-472a-b5f2-53fdcaab4186";

const r4 = (n) => Math.round(n * 10000) / 10000;
const pdf = (x) => Math.exp(-(x * x) / 2) / Math.sqrt(2 * Math.PI);

const curve = [];
for (let x = -4; x <= 4.0001; x += 0.25) curve.push([round2(x), r4(pdf(x))]);
const tail = [];
for (let x = -4; x <= -1.75 + 1e-9; x += 0.25) tail.push([round2(x), r4(pdf(x))]);
tail.push([-1.645, r4(pdf(-1.645))]);

function round2(n) {
  return Math.round(n * 100) / 100;
}

const normalTest = F.plot({
  id: "math-hypothesis-normal-lower-tail",
  title: "Standard normal curve with the lower 5% critical region",
  label: "Figure 1.",
  caption: "The shaded tail holds 5% of the area; the test rejects H₀ when z is at or below −1.645. The observed z = −2 lies inside the tail.",
  x: { min: -4, max: 4, ticks: [-4, -2, 0, 2, 4], label: "z" },
  y: { min: 0, max: 0.45, ticks: [0, 0.1, 0.2, 0.3, 0.4], label: "probability density" },
  series: [
    { points: curve, kind: "line" },
    { points: tail, kind: "area" },
    { points: [[-2, r4(pdf(-2))]], kind: "dots" },
  ],
  annotations: [
    { x: -1.645, y: r4(pdf(-1.645)), text: "−1.645", dx: 14, anchor: "start" },
    { x: -2, y: r4(pdf(-2)), text: "observed z = −2", dy: -12, anchor: "end" },
    { x: -3, y: 0.03, text: "5% tail", anchor: "middle" },
  ],
});

const sections = [
  {
    id: NOTE,
    slug: "hypothesis-testing",
    proseOnly: true,
    heading: "Setting up the hypotheses before any calculation",
    html: `<h2>Setting up the hypotheses before any calculation</h2>
<p>Hypotheses are the first lines a marker reads, and a wrong direction or a sample statistic written where a parameter belongs loses marks before any arithmetic is checked. The subsections set out how to define the parameter, write H₀ as a single value and read H₁ from the wording of the question.</p>
<h3>Defining the parameter in words first</h3>
<p>Before writing any symbol, say what the parameter measures. Let p be the proportion of seeds that germinate, or let μ be the mean mass of a bag in grams. The parameter belongs to the population the claim is about, not to the sample you were given. The definition is the line that makes the rest of the working easy to follow, so write it first.</p>
<h3>Writing H₀ as a single value</h3>
<p>H₀ names one value for the parameter with an equals sign, such as H₀: p = 0.6 or H₀: μ = 50. It is the value the test assumes is true when it calculates the probability of the data. The probability can only be worked out at one specific value, so the test is always carried out at the value stated in H₀, and the working should say so.</p>
<h3>Reading the direction of H₁ from the wording</h3>
<p>Words map to symbols in a fixed way. “Greater than”, “more than”, “has increased” and “above” give &gt;. “Less than”, “fewer”, “has decreased” and “below” give &lt;. “Different from”, “has changed” and “is not equal to” give ≠. A question that asks whether a proportion has changed, without saying which way, needs H₁: p ≠ p₀, and that choice fixes a two-tailed test.</p>
<h3>Hypotheses for a mean from a normal model</h3>
<p>When X is normal with a known standard deviation, the hypotheses concern μ, and the variance belongs to the model: X ~ N(μ, σ²). Write the assumption that the population is normal with known σ, or that the sample is large enough for the central limit theorem to apply. The hypotheses for a sample mean are the same as for the population mean, because the test is about μ.</p>
<h3>Hypotheses set before the data are used</h3>
<p>The direction of H₁ must come from the claim in the question, not from the sample. If the sample mean is 49 and the claim is μ = 50, it is tempting to choose H₁: μ &lt; 50 after looking at the data. That choice invalidates the test, because it lets the data pick the tail. Settle the direction from the wording, and show it in the working before the test statistic.</p>`,
  },
  {
    id: NOTE,
    slug: "hypothesis-testing",
    proseOnly: true,
    heading: "Critical regions and the significance level",
    html: `<h2>Critical regions and the significance level</h2>
<p>A critical region is the set of outcomes that leads to rejecting H₀. For a discrete distribution it is a set of whole numbers, and for a normal test it is a range of z-values. The subsections show how each is built from the significance level, and where the sign and boundary errors come from.</p>
<h3>Building a critical region from tail probabilities</h3>
<p>For a lower-tail test at level α, find the largest value k with P(X ≤ k) ≤ α, assuming H₀. The critical region is then {0, 1, …, k}. For X ~ B(10, 0.5) at the 5% level, P(X ≤ 1) = 11/1024 = 0.0107 and P(X ≤ 2) = 56/1024 = 0.0547. The second value is greater than 0.05, so k = 1 and the critical region is {0, 1}.</p>
<h3>The actual significance level is rarely the stated level</h3>
<p>Because X takes only whole-number values, the probability in the critical region is usually below the stated level. Here it is 0.0107, about 1.07%, not 5%. Say so in the working, using the phrase “actual significance level”. A discrete test that falls short of 5% is correct; a candidate who claims the level is exactly 5% makes a false statement.</p>
<h3>Critical values for a normal test</h3>
<p>For a normal test with known σ, a critical value of z replaces the critical count. The standard values are 1.645 for a one-tailed test at 5%, 2.326 for one-tailed at 1%, 1.96 for two-tailed at 5% and 2.576 for two-tailed at 1%. A lower-tailed test rejects when z ≤ −1.645; an upper-tailed test rejects when z ≥ 1.645. The normal distribution is continuous, so the actual level equals the stated level exactly.</p>
<h3>Two-tailed critical regions for a discrete test</h3>
<p>For a two-tailed test at 5%, each tail may carry probability at most 0.025. For X ~ B(10, 0.5), P(X ≤ 1) = 0.0107 is at most 0.025, while P(X ≤ 2) = 0.0547 is not. The lower critical region is {0, 1}, and by symmetry the upper one is {9, 10}. The combined probability is 0.0215, which is below 0.05, so the test can reject for 0, 1, 9 or 10 successes.</p>
<h3>Checking the boundary and the sign</h3>
<p>A common slip is to put the boundary in the wrong region or to use the wrong sign. For a lower-tailed normal test at 5%, the boundary z = −1.645 is itself in the critical region, because the test rejects when z ≤ −1.645. A critical value of +1.645 on a lower-tailed test is the commonest sign error. Write the inequality with the boundary included, then check that its sign matches the tail named in H₁.</p>`,
  },
  {
    id: NOTE,
    slug: "hypothesis-testing",
    proseOnly: true,
    heading: "p-values, step by step",
    html: `<h2>p-values, step by step</h2>
<p>A p-value gives the same decision as a critical region, but it reports how unlikely the data are on the assumption that H₀ is true, rather than only whether they fall inside a region. Many A2 questions ask for a p-value directly, and some ask for a comparison with the level in a single sentence.</p>
<h3>What a p-value is and is not</h3>
<p>The p-value is the probability, assuming H₀ is true, of a result at least as extreme as the one observed, in the direction stated in H₁. It is not the probability that H₀ is true, and it is not the probability that the result happened by chance. A p-value of 0.03 means that a result this extreme would occur 3% of the time if H₀ were true.</p>
<h3>A p-value for a lower-tailed binomial test</h3>
<p>For X ~ B(10, 0.5) with H₁: p &lt; 0.5, suppose 2 successes are observed. The p-value is P(X ≤ 2) = 56/1024 = 0.0547. That is greater than 0.05, so the result is not significant at the 5% level. At the 10% level, 0.0547 is less than 0.10, so H₀ is rejected. The same observation gives different decisions at different levels, which is why the level must always be stated.</p>
<h3>A p-value for a two-tailed binomial test</h3>
<p>For the same observation with H₁: p ≠ 0.5, the p-value is twice the smaller tail probability: 2 × 0.0547 = 0.1094. A two-tailed p-value is never the value of one tail alone, and it is capped at 1 if doubling would exceed 1. Here 0.1094 is greater than 0.05, so the result is not significant at 5%. A two-tailed p-value is always at least as large as the one-tailed value, which is why a two-tailed test is the harder one to pass.</p>
<h3>A p-value for a normal test</h3>
<p>Suppose z = −2.1 is found for a lower-tailed normal test. The p-value is Φ(−2.1) = 1 − Φ(2.1) = 1 − 0.9821 = 0.0179. For a two-tailed test the p-value would be 2 × 0.0179 = 0.0357. Use the symmetry of the normal curve, and show the Φ step so that the table lookup can be checked.</p>
<h3>Comparing a p-value with the significance level</h3>
<p>If the p-value is less than or equal to the significance level, reject H₀. Write the comparison as a statement with both numbers, for example 0.0547 &gt; 0.05, so do not reject H₀. Then give the decision in words, in the context of the question. The comparison in numbers is what the working shows, and the sentence is what the conclusion mark asks for.</p>`,
  },
  {
    id: NOTE,
    slug: "hypothesis-testing",
    proseOnly: false,
    heading: "The normal test as a standardised calculation",
    html: `<h2>The normal test as a standardised calculation</h2>
<p>When the population is normal with a known standard deviation, the sample mean is itself normal, and the test standardises it before comparing with a critical value. This section shows the standardisation and the figure that makes the critical region visible.</p>
<h3>Standardising the sample mean</h3>
<p>If X ~ N(μ, σ²), then the mean of n independent values satisfies X̄ ~ N(μ, σ²/n) when H₀ is true. The test statistic is z = (x̄ − μ₀)/(σ/√n), where μ₀ is the value stated in H₀. Standardising converts any normal model to the standard normal distribution, so the critical values in the tables apply to every normal test.</p>
<h3>Using the standard error, not the standard deviation</h3>
<p>The denominator is σ/√n, the standard error of the mean, and not σ on its own. Dividing by σ alone gives a z-value that is √n times too small, and the test becomes too cautious. If σ is given, use it directly. If only the sample standard deviation s is given and the sample is large, use s as an estimate of σ and say so in the working.</p>
<h3>A worked normal test</h3>
<p>A machine fills bags with a mean of 500 g and a known standard deviation of 12 g. A sample of 36 bags has mean 496 g. Test at the 5% level whether the mean fill is less than 500 g. The standard error is 12/√36 = 2, so z = (496 − 500)/2 = −2. The critical value is −1.645, and −2 is less than −1.645, so H₀ is rejected. The p-value is Φ(−2) = 0.0228, which is less than 0.05.</p>
<h3>Reading the critical region from the figure</h3>
<p>The figure shows the standard normal curve with the lower 5% tail shaded. The boundary at −1.645 separates the critical region from the rest of the curve, and the observed z-value of −2 lies inside the shaded tail, which is why the test rejects H₀. Sketching this shape with the boundary and the observed value marked is a quick check that the direction of the test is right.</p>
${normalTest}
<h3>Reading the answer back in the units of the question</h3>
<p>The conclusion must be in the units of the question: “There is evidence at the 5% level that the mean fill is less than 500 g.” Do not write “the mean is less than 500”, because a test never establishes a fact about the population. Name the quantity the evidence is about, the mean fill mass, and state the level.</p>`,
  },
  {
    id: NOTE,
    slug: "hypothesis-testing",
    proseOnly: true,
    heading: "Power and the probability of a Type II error",
    html: `<h2>Power and the probability of a Type II error</h2>
<p>A test that rejects H₀ rarely is also unlikely to detect a real change. The power of a test measures how often it detects a specified change, and it is the quantity that questions about Type II errors ask for.</p>
<h3>Defining power</h3>
<p>The power of a test is the probability of rejecting H₀ when a specified alternative value is true. A power of 0.149 at p = 0.3 means the test rejects H₀ 14.9% of the time when p really is 0.3. The probability of a Type II error at that value is 1 − power, which is 0.851 here. Power is always calculated at a stated alternative, so name the value of the parameter you used.</p>
<h3>Calculating power for a binomial test</h3>
<p>Take the lower-tailed test from the previous section: X ~ B(10, 0.5) with H₀: p = 0.5, H₁: p &lt; 0.5 and critical region {0, 1}. To find the power at p = 0.3, use X ~ B(10, 0.3) and find the probability of the critical region. P(X = 0) = 0.7¹⁰ = 0.02825 and P(X = 1) = 10 × 0.3 × 0.7⁹ = 0.12107. Adding these gives 0.1493, so the power is 0.149 to 3 significant figures.</p>
<h3>Factors that increase power</h3>
<p>Power rises when the sample is larger, when the true value is further from the value in H₀, and when the significance level is larger. A larger sample shrinks the standard error, so a real shift is more likely to land in the critical region. A larger level widens the critical region, but it also raises the chance of a Type I error. This is the trade-off: a test that is hard to pass by chance is also hard to pass when H₁ is true.</p>
<h3>Why a non-significant result is not proof</h3>
<p>If the power is low, a non-significant result is weak evidence. At p = 0.3 the test above fails to reject H₀ with probability 0.851, so that outcome is very likely even though H₀ is false. A result that does not reject H₀ does not show that p = 0.5. It shows only that the data were not strong enough to reject H₀ at this level.</p>
<h3>Sample size and the size of the difference</h3>
<p>A test that must detect a small difference needs a large sample. A difference that is large compared with the standard error is detected easily, while a small difference relative to the standard error may not be. In an exam, the question will say whether the power or the Type II error probability is wanted, so check the wording before you calculate, and state the alternative value you used.</p>`,
  },
  {
    id: NOTE,
    slug: "hypothesis-testing",
    proseOnly: true,
    heading: "Marked questions with full answers",
    html: `<h2>Marked questions with full answers</h2>
<p>Each question below is set at the level an A2 paper uses, with the marks shown. Work the method yourself before reading the answer, and compare the steps you wrote with the answer's steps rather than only its final value.</p>
<h3>Question 1: a binomial test of a seed claim [4 marks]</h3>
<p><strong>Question.</strong> A seed company claims that 80% of its seeds germinate. In a random sample of 15 seeds, 8 germinate. Test at the 5% level whether the proportion that germinate is less than 0.8.</p>
<p><strong>Answer.</strong> Let p be the proportion of seeds that germinate. H₀: p = 0.8 and H₁: p &lt; 0.8. Under H₀, X ~ B(15, 0.8), and the p-value is P(X ≤ 8). Let Y = 15 − X, so Y ~ B(15, 0.2) and P(X ≤ 8) = P(Y ≥ 7) = 1 − P(Y ≤ 6) = 1 − 0.9820 = 0.0180. Since 0.0180 is less than 0.05, reject H₀. There is evidence at the 5% level that the proportion of seeds that germinate is less than 0.8.</p>
<h3>Question 2: a two-tailed normal test with known σ [5 marks]</h3>
<p><strong>Question.</strong> The mass of a bag of sugar is normally distributed with standard deviation 2 g. The manufacturer claims the mean mass is 1000 g. A random sample of 16 bags has mean 1001.5 g. Test the claim at the 5% level.</p>
<p><strong>Answer.</strong> H₀: μ = 1000 and H₁: μ ≠ 1000. Under H₀, X̄ ~ N(1000, 2²/16), so the standard error is 2/4 = 0.5. Then z = (1001.5 − 1000)/0.5 = 3. The two-tailed critical values at 5% are ±1.96, and 3 is greater than 1.96, so reject H₀. The p-value is 2 × (1 − Φ(3)) = 2 × 0.00135 = 0.0027. There is evidence at the 5% level that the mean mass differs from 1000 g.</p>
<h3>Question 3: the critical region for a sample mean [4 marks]</h3>
<p><strong>Question.</strong> X is normal with standard deviation 3. H₀: μ = 20 and H₁: μ &gt; 20 are to be tested at the 5% level using the mean of a sample of 9 values. Find the critical region for the sample mean x̄.</p>
<p><strong>Answer.</strong> Under H₀, X̄ ~ N(20, 3²/9), so the standard error is 3/3 = 1. The upper critical value of z is 1.645, which gives the boundary x̄ = 20 + 1 × 1.645 = 21.645. The critical region is x̄ &gt; 21.645. Stating the region in terms of x̄, not z, is what the mark asks for.</p>
<h3>Question 4: reading a p-value at two levels [2 marks]</h3>
<p><strong>Question.</strong> A test gives a p-value of 0.03. State the conclusion at the 5% level and at the 1% level.</p>
<p><strong>Answer.</strong> At the 5% level, 0.03 is less than 0.05, so reject H₀: there is evidence that the parameter differs from the claimed value. At the 1% level, 0.03 is greater than 0.01, so do not reject H₀: there is not enough evidence at the 1% level. The result is significant at 5% but not at 1%.</p>
<h3>Question 5: false rejections over many tests [3 marks]</h3>
<p><strong>Question.</strong> A test at the 5% level is applied to 200 independent samples, and H₀ is true in every case. (a) State the expected number of samples that lead to rejection of H₀. (b) Show that the probability that at least one sample leads to rejection is 1 − 0.95²⁰⁰, and state its value to 5 decimal places.</p>
<p><strong>Answer.</strong> (a) Each sample rejects H₀ with probability 0.05, so the expected number is 200 × 0.05 = 10. (b) The probability that no sample rejects is 0.95²⁰⁰, so the probability of at least one rejection is 1 − 0.95²⁰⁰ = 1 − 0.0000351 = 0.99996 to 5 decimal places. Rejection on at least one of 200 tests is almost certain, even though each test has only a 5% chance of a false rejection.</p>
<h3>Question 6: a large-sample z-test using s [5 marks]</h3>
<p><strong>Question.</strong> A sample of 100 measurements has mean 52.4 and standard deviation 6. Test at the 1% level whether the population mean is 50, against the alternative that it is not 50.</p>
<p><strong>Answer.</strong> H₀: μ = 50 and H₁: μ ≠ 50. The sample is large, so s = 6 is used as an estimate of σ. The standard error is 6/√100 = 0.6, so z = (52.4 − 50)/0.6 = 4. The two-tailed critical values at 1% are ±2.576, and 4 is greater than 2.576, so reject H₀. There is evidence at the 1% level that the population mean is not 50.</p>`,
  },
];

module.exports = { sections };
