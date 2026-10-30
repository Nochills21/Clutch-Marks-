/**
 * Mathematics A2 deepening, binomial distribution, pass a: five new h2
 * sections with six h3 subsections each (9 → 39 h3 headings, above the 36 bar).
 * Prose-only: the notation is Unicode, no figure is needed. Inserted before
 * "Equations and symbols" by refine-note-sections.cjs; nothing already in the
 * note is rewritten.
 */

const NOTE = "e1a3c834-71a5-46c5-87e6-4700be5beeb8";

const sections = [
  {
    id: NOTE,
    slug: "binomial-distribution",
    proseOnly: true,
    heading: "Recognising a binomial situation in context",
    html: `<h2>Recognising a binomial situation in context</h2>
<p>Most binomial marks are lost before any arithmetic starts, because the question was not identified as binomial. The subsections below give a checklist for reading a question and writing the model in the standard form X ~ B(n, p) before you calculate anything.</p>
<h3>Writing the model in the form X ~ B(n, p)</h3>
<p>Once you decide a situation is binomial, state the model in full: X ~ B(n, p), where X is the number of successes, n is the number of trials and p is the probability of a success on each trial. Define X in words in your answer, for example \u201cX is the number of defective bulbs in a box of 20\u201d. A model with no definition of X loses the communication mark even when the probabilities are right.</p>
<h3>Identifying the number of trials, n</h3>
<p>The value of n is the fixed number of times the experiment is repeated: the number of bulbs tested, the number of patients treated, or the number of games played. Read the question for the phrase that fixes it, such as \u201cof 20 bulbs chosen at random\u201d. If the question keeps going until a result occurs, the number of trials is not fixed and the binomial model does not apply directly.</p>
<h3>Identifying the probability of success, p</h3>
<p>The value of p is the probability of the outcome you have chosen to call a success on one trial. It must stay the same for every trial. A fair coin gives p = 0.5, and a bag where 15% of items are faulty gives p = 0.15 for each item drawn with replacement. If the question gives a percentage, convert it to a decimal before you use it in any formula.</p>
<h3>Checking for fixed trials</h3>
<p>The number of trials must be decided before the experiment starts. Counting the number of successes in a fixed sample is binomial, whereas recording how many trials it takes to get the first success is not. A question about the number of heads in ten tosses is binomial; a question about how many tosses are needed for the first head is a different model. Make the fixed-n check before any other check.</p>
<h3>Checking for independent trials</h3>
<p>Each trial must not affect the next. Independence is what allows you to multiply the probabilities of several outcomes together, and it is the assumption most often ignored. Drawing items with replacement keeps p constant, and that is what the model needs. Drawing without replacement changes p after each draw, so the binomial model is only an approximation when the sample is small compared with the population.</p>
<h3>Worked identification</h3>
<p>A survey finds that 30% of adults own a bicycle. Twelve adults are chosen at random from a large town and asked whether they own one. Let X be the number who own a bicycle. Here n = 12, p = 0.3 and the answer is X ~ B(12, 0.3). The population is large, so the probability for each adult stays close to 0.3 and the model is a reasonable one to use. State that assumption, because a marker looks for it.</p>`,
  },
  {
    id: NOTE,
    slug: "binomial-distribution",
    proseOnly: true,
    heading: "Probabilities of at least one, and of more than r",
    html: `<h2>Probabilities of at least one, and of more than r</h2>
<p>Questions that ask for \u201cat least\u201d or \u201cmore than\u201d are the ones where the complement saves the most time. The subsections set out the choice between a direct sum and the complement, and the checks that stop an off-by-one error.</p>
<h3>Probability of at least one success</h3>
<p>\u201cAt least one\u201d is the complement of \u201cnone\u201d, so P(X ≥ 1) = 1 − P(X = 0) = 1 − qⁿ, where q = 1 − p. For X ~ B(5, 0.2), P(X ≥ 1) = 1 − 0.8⁵ = 1 − 0.32768 = 0.672 to 3 significant figures. Adding the probabilities of X = 1, 2, 3, 4 and 5 gives the same answer but takes five calculations instead of one.</p>
<h3>Probability of more than r successes</h3>
<p>\u201cMore than 3\u201d means 4 or more, so P(X > 3) = 1 − P(X ≤ 3). For X ~ B(10, 0.3), P(X ≤ 3) = 0.6496 to 4 decimal places, so P(X > 3) = 0.3504. The number 3 is included in the part you subtract from 1; forgetting that is the typical error on \u201cmore than\u201d questions.</p>
<h3>Choosing between a direct sum and the complement</h3>
<p>Use the complement when the part you do not want is short: \u201cat least one\u201d, \u201cat most one but not zero\u201d and similar phrases. Use a direct sum when the wanted region has only a few terms, such as P(X = 2) + P(X = 3). With a calculator table of cumulative probabilities, most \u201cat most\u201d and \u201cat least\u201d questions reduce to one lookup and one subtraction.</p>
<h3>Probability of exactly r on a calculator</h3>
<p>For X ~ B(n, p), P(X = r) = ⁿCᵣ pʳ qⁿ⁻ʳ. The combination ⁿCᵣ counts the ways the r successes can be arranged among n trials. For X ~ B(10, 0.3), P(X = 3) = 120 × 0.3³ × 0.7⁷ = 120 × 0.027 × 0.0823543 = 0.2668 to 4 decimal places. Enter the combination with the nCr key so the arrangement count is not mistyped.</p>
<h3>The most likely number of successes (the mode)</h3>
<p>The most likely value of X is the mode. For a binomial distribution it is the whole number part of (n + 1)p, and if (n + 1)p is itself a whole number there are two modes, (n + 1)p − 1 and (n + 1)p. For X ~ B(10, 0.3), (n + 1)p = 3.3, so the mode is 3. Check against the probabilities: P(X = 3) = 0.2668 is larger than P(X = 2) = 0.2335 and P(X = 4) = 0.2001.</p>`,
  },
  {
    id: NOTE,
    slug: "binomial-distribution",
    proseOnly: true,
    heading: "Adding independent binomial variables",
    html: `<h2>Adding independent binomial variables</h2>
<p>A question can combine two or more binomial counts, for example the total number of faults from two machines. The result is binomial only under particular conditions, and the subsections below say what those conditions are and how to check them.</p>
<h3>Same probability, different numbers of trials</h3>
<p>If X ~ B(n, p) and Y ~ B(m, p) are independent, and both use the same probability of success p, then X + Y ~ B(n + m, p). Two batches tested for the same fault, with the same chance of that fault on each item, combine into one larger binomial. The shared p is the key condition: the trials must all be a success or failure with the same chance.</p>
<h3>The rule for X + Y</h3>
<p>Write the result as X + Y ~ B(n + m, p). For example, X ~ B(4, 0.5) and Y ~ B(6, 0.5), independent, give X + Y ~ B(10, 0.5). Add the trial counts, not the probabilities. The probability of success stays the same because each trial still has the same chance of success.</p>
<h3>When the probabilities differ</h3>
<p>If X ~ B(n, p) and Y ~ B(m, q) with p ≠ q, the sum is not binomial, and you cannot use the rule above. The number of successes comes from trials that have different chances, so no single p describes all of them. A question that asks for the distribution in this case expects a table of values, not a single binomial statement.</p>
<h3>Worked example: two batches</h3>
<p>Batch A has 8 items and batch B has 12 items. Each item in either batch is defective with probability 0.05, and the items are independent. Let T be the total number of defective items. Then T ~ B(20, 0.05), because both batches share p = 0.05. The probability of no defective items at all is P(T = 0) = 0.95²⁰ = 0.358 to 3 significant figures.</p>
<h3>Why the mean and variance add</h3>
<p>The mean of a sum is always the sum of the means, whether or not the variables are independent. The variance of a sum is the sum of the variances only when the variables are independent. For the batch example, E(T) = 20 × 0.05 = 1 and Var(T) = 20 × 0.05 × 0.95 = 0.95, which is the same as adding the separate variances 8 × 0.0475 and 12 × 0.0475.</p>`,
  },
  {
    id: NOTE,
    slug: "binomial-distribution",
    proseOnly: true,
    heading: "A one-tailed hypothesis test, step by step",
    html: `<h2>A one-tailed hypothesis test, step by step</h2>
<p>A binomial hypothesis test asks whether an observed count is too unlikely for the claimed probability to be true. The method has the same steps every time, and each step earns its own mark, so write them in order.</p>
<h3>State H₀ and H₁ in terms of the parameter</h3>
<p>H₀ states the claimed value of p, and H₁ states the direction of the alternative. For a claim that a coin or process produces fewer successes than stated, write H₀: p = 0.4 and H₁: p &lt; 0.4 in your working, with the symbols defined. The hypotheses are always about p, never about X, and H₀ always contains the equals sign.</p>
<h3>Find the tail the alternative points to</h3>
<p>The direction of H₁ tells you which tail of the distribution is critical. A \u201cless than\u201d alternative uses the lower tail, which contains small values of X. A \u201cgreater than\u201d alternative uses the upper tail. Decide the tail before you look at the observed value, because choosing it afterwards invalidates the test.</p>
<h3>Compute the probability of the observed value or more extreme</h3>
<p>For a lower-tail test, find P(X ≤ x), where x is the observed count, assuming H₀ is true. Suppose X ~ B(12, 0.4) and 1 success is observed. Then P(X ≤ 1) = 0.6¹² + 12 × 0.4 × 0.6¹¹ = 0.00218 + 0.01741 = 0.0196 to 3 significant figures. The working must show both terms, because a single number with no method earns only a fraction of the method marks.</p>
<h3>Compare the probability with the significance level</h3>
<p>If the probability is less than or equal to the significance level, reject H₀. Here 0.0196 is less than 0.05, so the result is significant at the 5% level and H₀ is rejected. If the question gives a 1% level, the same probability would not be significant, because 0.0196 is greater than 0.01. Always compare with the level the question states.</p>
<h3>Write the conclusion in the context of the question</h3>
<p>A complete conclusion states what the result means for the claim, not just whether H₀ was rejected. For example: \u201cThere is evidence at the 5% level that the proportion of successes is less than 0.4.\u201d Use the word \u201cevidence\u201d and refer to the proportion, because a test gives evidence about a population, not a proof about it.</p>
<h3>Find the critical region and the actual significance level</h3>
<p>The critical region is the set of values of X that lead to rejection. For B(12, 0.4), P(X ≤ 1) = 0.0196 is at most 0.05 but P(X ≤ 2) = 0.0196 + 66 × 0.16 × 0.6¹⁰ = 0.0835 is more than 0.05, so the critical region at the 5% level is {0, 1}. The actual significance level is 0.0196, which is 1.96%, because the discrete distribution cannot be cut at exactly 5%.</p>`,
  },
  {
    id: NOTE,
    slug: "binomial-distribution",
    proseOnly: true,
    heading: "Two-tailed tests and the split significance level",
    html: `<h2>Two-tailed tests and the split significance level</h2>
<p>A two-tailed test asks whether p has changed in either direction. The main difference from a one-tailed test is how the significance level is shared between the two tails, and that is where most marks are lost.</p>
<h3>Why the significance level is split</h3>
<p>A two-tailed test rejects H₀ for a very small or a very large count, so the total probability of rejection must stay at the stated level. The level is split equally, with half in each tail. At the 5% level each tail is allowed a probability of at most 0.025. Using 0.05 in each tail would double the chance of a false rejection and is an error.</p>
<h3>Setting up two-tailed hypotheses</h3>
<p>A two-tailed alternative is written H₁: p ≠ 0.5, with H₀: p = 0.5. The alternative does not say which direction the change will be, so both tails are critical. Use a two-tailed test only when the question asks whether the probability has changed, without saying it has increased or decreased.</p>
<h3>Find the critical region from both tails</h3>
<p>For X ~ B(20, 0.5) at the 5% level, find the largest lower value with P(X ≤ k) ≤ 0.025. Here P(X ≤ 5) = 0.0207, so the lower critical region is X ≤ 5. By symmetry, P(X ≥ 15) = 0.0207, so the upper critical region is X ≥ 15. The combined region {0 to 5} ∪ {15 to 20} has probability 0.0414, which is no more than 0.05.</p>
<h3>Worked two-tailed example</h3>
<p>A coin is tested by tossing it 20 times and getting 4 heads. Test H₀: p = 0.5 against H₁: p ≠ 0.5 at the 5% level. Since 4 is in the lower critical region {0 to 5}, reject H₀. The probability needed is P(X ≤ 4) = 0.0059. The one-tailed value would be smaller, and the shared level makes the test twice as demanding in each tail.</p>
<h3>Reject, or fail to reject: never accept H₀</h3>
<p>If the observed count is outside the critical region, the correct conclusion is that there is not enough evidence to reject H₀. It is not correct to say that H₀ is accepted or that p is 0.5. A test shows only whether the data are inconsistent with H₀ at the chosen level, and a non-significant result is consistent with many values of p.</p>
<h3>Avoiding the common sign error</h3>
<p>The most common error is to compare the observed count with the critical region for the wrong tail. For a high observed count such as 17 out of 20, the test uses the upper tail, P(X ≥ 17), and the probability is (1140 + 190 + 20 + 1)/2²⁰ = 1351/1048576 = 0.0013. Writing the tail you used in words, before the number, makes the error easy to spot when you check your work.</p>`,
  },
];

module.exports = { sections };
