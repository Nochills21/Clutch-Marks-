/**
 * Mathematics A2 deepening, Poisson distribution, pass a: five new h2
 * sections with six h3 subsections each (9 → 39 h3 headings, above the 36 bar).
 * Prose-only, consistent with the binomial pass. Inserted before
 * "Equations and symbols" by refine-note-sections.cjs; nothing already in the
 * note is rewritten.
 */

const NOTE = "57eaee80-6b7e-424d-b649-06a608be6256";

const sections = [
  {
    id: NOTE,
    slug: "poisson-distribution",
    proseOnly: true,
    heading: "Choosing between a Poisson and a binomial model",
    html: `<h2>Choosing between a Poisson and a binomial model</h2>
<p>Both models count things, and both are discrete, so the choice is a common source of lost marks. The question is always what is fixed: a number of trials, or a length of time, area or volume.</p>
<h3>Fixed trials or a continuous window</h3>
<p>A binomial model counts successes among a fixed number n of trials, such as 20 items inspected or 12 people surveyed. A Poisson model counts events in a continuous interval, such as calls in an hour or flaws along a metre of wire, where there is no fixed number of trials to count out.</p>
<h3>Using the wording of the question</h3>
<p>Phrases such as \u201cout of 40\u201d or \u201cof 15 chosen at random\u201d point to a binomial. Phrases such as \u201cin a period of\u201d, \u201cper kilometre\u201d or \u201cper square metre\u201d point to a Poisson. When the wording is unclear, ask whether you could list the trials in advance; if you could, the model is binomial.</p>
<h3>Variance as a clue</h3>
<p>The binomial variance is np(1 − p), which is smaller than its mean np by the factor 1 − p. The Poisson variance equals its mean. So when p is not small, a Poisson model overstates the spread, and the binomial is the better fit.</p>
<h3>A worked choice: binomial</h3>
<p>A quality checker tests 40 bolts from a line, and each bolt is faulty independently with probability 0.08. The number of bolts is fixed at 40, so X ~ B(40, 0.08). A Poisson with the same mean would have variance 3.2 instead of 2.944, which is close here, but the binomial is the model the question describes.</p>
<h3>A worked choice: Poisson</h3>
<p>Bacteria colonies appear on a plate at random, and the average number per square centimetre is known. The area of the plate is not a number of trials, so the count is a Poisson variable with λ proportional to the area of the region counted. Nothing about the plate fixes how many colonies there will be.</p>
<h3>Stating the choice in the answer</h3>
<p>Write the model as the first line of the solution, with its reason: \u201cX ~ B(40, 0.08), because the sample size is fixed at 40\u201d. A marker can only credit a choice that is written down, and the reason is often worth a mark on its own.</p>`,
  },
  {
    id: NOTE,
    slug: "poisson-distribution",
    proseOnly: true,
    heading: "Setting λ for the interval in the question",
    html: `<h2>Setting λ for the interval in the question</h2>
<p>λ is the mean count for the interval the question asks about, and that interval is often not the one in which the rate is given. Most wrong answers on Poisson questions come from using a rate for the wrong length of time or distance.</p>
<h3>The rate and the interval</h3>
<p>If events occur at a rate r per unit of time and the question concerns an interval of length t in the same unit, then λ = rt. The rate and the interval must use the same unit before you multiply.</p>
<h3>Scaling down to a shorter interval</h3>
<p>Calls arrive at 6 per hour. For a 10-minute interval, the time is one sixth of an hour, so λ = 6 × 10/60 = 1. The probability of no calls in those 10 minutes is then e⁻¹ = 0.3679, not e⁻⁶.</p>
<h3>Scaling up to a longer interval</h3>
<p>Defects occur at 1.5 per kilometre of cable. For a 8 km stretch, λ = 1.5 × 8 = 12. Doubling the length doubles the mean, and the variance doubles with it, so a longer stretch is more spread out as well as higher.</p>
<h3>Rates per area or volume</h3>
<p>Flaws appear at 3 per square metre on a sheet. For a region of 4.5 m², λ = 3 × 4.5 = 13.5. The same method works for volume, provided the rate is given per unit of volume and the region is measured in the same units.</p>
<h3>Keeping λ and the interval together</h3>
<p>λ has no unit of its own because it is a count, but it always refers to a named interval. Writing \u201cλ = 3 for 15 minutes\u201d keeps the reference; writing a bare \u201cλ = 3\u201d invites the wrong interval to be used later in the same question.</p>
<h3>A worked example</h3>
<p>Emails arrive at a server at 12 per hour, at random and independently. Find the probability of exactly 2 arrivals in a 15-minute period. The interval is 0.25 hours, so λ = 12 × 0.25 = 3. Then P(X = 2) = e⁻³ × 3²/2! = 0.2240, which matches the value a student gets by scaling the rate first, not by using 12 directly.</p>`,
  },
  {
    id: NOTE,
    slug: "poisson-distribution",
    proseOnly: true,
    heading: "Estimating λ from data and checking the fit",
    html: `<h2>Estimating λ from data and checking the fit</h2>
<p>Exam questions often give observed counts and ask for an estimate of λ, then ask whether the Poisson model is reasonable. The sample mean does the estimating, and the sample variance does the checking.</p>
<h3>The sample mean as an estimate of λ</h3>
<p>If counts x₁, x₂, … xₙ are observed over equal intervals, the sample mean x̄ is the natural estimate of λ. For a Poisson variable the mean of the population is λ, so the sample mean is the value that best matches the data. The estimate is only meaningful when every observation covers the same interval.</p>
<h3>Comparing the sample mean and variance</h3>
<p>For a Poisson model the sample variance should be close to the sample mean. A variance well above the mean suggests events that cluster, which breaks the independence condition. A variance well below the mean suggests events that are more evenly spaced than chance would give.</p>
<h3>Reading a frequency table</h3>
<p>Suppose 20 one-minute intervals give counts of 0 in 6 intervals, 1 in 9, 2 in 4 and 3 in 1. Then Σfx = 20, so x̄ = 20/20 = 1.0. Also Σfx² = 34, so the sample variance is 34/20 − 1.0² = 0.7. The variance is a little below the mean, which is not strong evidence against the model with only 20 intervals.</p>
<h3>Using the estimate to find a probability</h3>
<p>Once λ is estimated, the fitted model gives probabilities. With λ̂ = 1.0, the fitted probability of no events in one minute is e⁻¹ = 0.368, which can be compared with the observed proportion of intervals with no events, here 6/20 = 0.30. Close agreement supports the model; a large gap is a reason to doubt it.</p>
<h3>Why a poor fit is a conclusion, not a failure</h3>
<p>A question that asks whether the Poisson model is suitable is testing judgement. Say which feature of the data is inconsistent with the model, such as the variance being much larger than the mean, and link it to the condition it breaks. A vague \u201cthe model is not good\u201d earns little credit.</p>
<h3>Sampling over equal intervals</h3>
<p>The method depends on equal intervals. If some counts cover two minutes and others one minute, the counts are not comparable, and they must be rescaled to a common interval before the mean or variance is calculated. Checking the interval for each observation is the first step of the estimate.</p>`,
  },
  {
    id: NOTE,
    slug: "poisson-distribution",
    proseOnly: true,
    heading: "A two-tailed Poisson test",
    html: `<h2>A two-tailed Poisson test</h2>
<p>A two-tailed test asks whether the rate has changed in either direction, so H₁ is λ ≠ λ₀. The method is the same as the one-tailed test, with a critical region in each tail, and the discreteness of the distribution makes the arithmetic less tidy.</p>
<h3>Setting up H₀ and H₁</h3>
<p>H₀ states the rate, λ = λ₀, and H₁ states that the rate differs, λ ≠ λ₀. Write the distribution under H₀ as X ~ Po(λ₀), with λ₀ stated for the interval observed, before any probability is calculated.</p>
<h3>Splitting the significance level</h3>
<p>A 5% two-tailed test puts about 2.5% in each tail. Because the Poisson takes only whole-number values, an exact split is usually impossible. The rule is that each tail probability must be no more than 2.5%, and the critical region is the largest one that satisfies this.</p>
<h3>Finding the two critical regions</h3>
<p>For X ~ Po(6), the lower tail gives P(X ≤ 1) = 0.0174, which is at most 0.025, while P(X ≤ 2) = 0.0620 is too large. The upper tail gives P(X ≥ 11) = 0.0426, which is too large, and P(X ≥ 12) = 0.0201, which is acceptable. The critical region is X ≤ 1 or X ≥ 12.</p>
<h3>Why the actual significance level is below 5%</h3>
<p>The combined probability of the critical region under H₀ is about 0.0174 + 0.0201 = 0.037, or 3.7%. The test is therefore slightly more conservative than 5%, because the next value in either tail would push its probability above 2.5%. State the actual significance level when it differs from the nominal one; a marker looks for this.</p>
<h3>A worked two-tailed example</h3>
<p>A machine usually produces 6 faults per shift. In a shift with 13 faults, test at the 5% level whether the rate has changed. The observed value 13 is greater than 12, so it lies in the upper critical region, and H₀ is rejected. In a shift with 9 faults, the value is outside the region, so the result is not significant.</p>
<h3>Writing the conclusion in context</h3>
<p>Say what the test shows about the rate, not about the individual count: \u201cThere is evidence at the 5% level that the mean number of faults per shift has changed.\u201d Avoid saying that the rate has been shown to be 6, because the test never proves that a hypothesis is true.</p>`,
  },
  {
    id: NOTE,
    slug: "poisson-distribution",
    proseOnly: true,
    heading: "Presenting a Poisson answer in full",
    html: `<h2>Presenting a Poisson answer in full</h2>
<p>A Poisson answer is marked in parts: the model, the value of λ, the calculation and the interpretation. A correct number with no statement of the model often loses several of the available marks, so the layout below is worth practising until it is automatic.</p>
<h3>State the model with its parameter</h3>
<p>Write X ~ Po(λ) with the numerical value of λ, for example X ~ Po(3). The parameter is the mean for the interval in the question, and it must be the value already scaled to that interval.</p>
<h3>Define the random variable</h3>
<p>Say what X counts and over what interval: \u201cX is the number of emails received in a 15-minute period.\u201d This sentence is a communication mark and is also the check that the interval matches the value of λ.</p>
<h3>Show the substitution</h3>
<p>Write the formula with the numbers in place before the result, for example P(X = 2) = e⁻³ × 3²/2!. The substitution is the step a marker checks, and a bare number with no substitution cannot be credited.</p>
<h3>Round sensibly</h3>
<p>Follow the question's instruction on accuracy. If none is given, three significant figures is a safe default, and intermediate values should be kept to more decimal places than the final answer so that rounding does not accumulate.</p>
<h3>Interpret the result</h3>
<p>Finish with a sentence in context: \u201cThe probability of 5 or more calls in an hour is 0.715, so a count of at least 5 is very likely when the mean is 6.\u201d The interpretation is where a numerical answer becomes a reasoned one.</p>
<h3>A complete model answer</h3>
<p>Calls arrive at a helpdesk at a mean rate of 6 per hour. Find the probability of at least 5 calls in one hour. Let X be the number of calls in one hour, so X ~ Po(6). Then P(X ≥ 5) = 1 − P(X ≤ 4) = 1 − 0.2851 = 0.715 to 3 significant figures. So there is a 0.715 probability of at least 5 calls in the hour.</p>`,
  },
];

module.exports = { sections };
