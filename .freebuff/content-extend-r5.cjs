// Batch r5: deepens seven thin notes toward 3000+ characters.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "7ca83ddb-a38f-4f06-b83c-8381e8e73560": `
<h3>Worked example: tracing a short assembly fragment</h3>
<p>Memory location 10 holds 5 and location 11 holds 7. The program LDA 10, ADD 11, STA 12 is traced as follows. LDA 10 (direct addressing) copies the contents of location 10 into the accumulator, so ACC = 5. ADD 11 adds the contents of location 11 to the accumulator, so ACC = 12. STA 12 stores the accumulator into location 12, which now holds 12. With immediate addressing, LDA #5 would load the number 5 itself rather than the contents of location 5, and that difference is a common exam trap.</p>
<h3>Exam method: naming a paradigm and justifying it</h3>
<p>When asked to describe a paradigm, give one defining feature and one consequence of it. Imperative or procedural programming describes a sequence of statements that change state, object-oriented programming groups data and the methods that act on it into classes, and declarative or functional programming describes what the result should be rather than the step-by-step method. Answers that name a feature without linking it to the question scenario usually earn only part of the mark.</p>
`,
    "fcf12351-d3b1-4ebf-a940-772b1080dca9": `
<h3>Worked example: signs in multiplication and division</h3>
<p>Two negatives multiply to a positive, so (−3) × (−4) = 12. A negative times a positive gives a negative, so −24 ÷ 6 = −4. Subtracting a negative is the same as adding, so 3 − (−5) = 8. Apply the order of operations first: in 2 + 3 × (−4), the multiplication gives 2 − 12 = −10, not (2 + 3) × (−4) = −20.</p>
<h3>Exam method: estimating before calculating</h3>
<p>Round each number to one significant figure to estimate the answer before you use a calculator. For 4.9 × 21.8, the estimate 5 × 20 = 100 tells you that an answer of 10.68 or 1068 is wrong and that the true value, 106.82, is sensible. Writing the estimate down also gives you a check when a key is pressed incorrectly. When a question asks you to show working, write each step on its own line so that method marks can be awarded.</p>
`,
    "e1c1569d-a45c-4ebe-8012-6df10e500034": `
<h3>Worked example: converting to and from standard form</h3>
<p>Write 0.00046 in standard form by moving the decimal point four places to the right, giving 4.6 × 10⁻⁴. The number 3.2 × 10⁵ is 320 000. To multiply, multiply the coefficients and add the powers: (2 × 10⁶) × (4 × 10³) = 8 × 10⁹. To divide, divide the coefficients and subtract the powers: (6 × 10⁸) ÷ (2 × 10³) = 3 × 10⁵. The coefficient must lie between 1 and 10, so 12 × 10⁴ must be rewritten as 1.2 × 10⁵.</p>
<h3>Exam method: checking the size of an answer</h3>
<p>A large number should have a positive power of ten and a small number a negative one, so check the sign of the index after every conversion. If a question asks for an answer in standard form to 3 significant figures, round only at the end and keep all the digits your calculator gives while working. Rounding at each step can change the third figure and cost the accuracy mark.</p>
`,
    "edbbedae-7847-4852-a895-44af0d0b57d5": `
<h3>Worked example: the chain rule</h3>
<p>Differentiate y = (3x − 2)⁵. Treat this as an outer power of an inner linear function. The derivative of the outer function, with the inside kept as a single unit, is 5(3x − 2)⁴. Multiply by the derivative of the inside, which is 3. So dy/dx = 15(3x − 2)⁴. Forgetting the factor 3 from the inside is the most frequent error on this type of question, and it loses the accuracy mark even when the power rule has been applied correctly.</p>
<h3>Worked example: the product rule</h3>
<p>For y = x² sin x, let u = x² and v = sin x. Then dy/dx = u dv/dx + v du/dx = x² cos x + 2x sin x. Write the two products out separately and then collect like terms. If the question asks for the gradient at a particular point, substitute only after the derivative has been simplified, because substituting first makes it harder to spot an algebra slip.</p>
`,
    "3bc168f1-4a43-4e2f-9954-2f256539800e": `
<h3>Worked example: a definite integral</h3>
<p>Evaluate the integral of (2x + 1) from x = 1 to x = 3. The indefinite integral is x² + x, so the value is [x² + x] between 1 and 3, which is (9 + 3) − (1 + 1) = 12 − 2 = 10. The constant of integration cancels when the limits are substituted, so it is not written in a definite integral. Substitute the upper limit first and subtract the lower limit, and do not evaluate the two ends separately and then add them.</p>
<h3>Worked example: integrating a linear bracket</h3>
<p>The integral of (2x + 1)³ with respect to x is (2x + 1)⁴ ÷ 8 + c. You can check this by differentiating: the chain rule gives 4 × 2 × (2x + 1)³ ÷ 8, which equals (2x + 1)³. Dividing by the derivative of the inside, here 2, is the reverse of the chain rule and is the quick method to use in the exam.</p>
`,
    "e04cf551-2c45-4d65-b4b5-bd16e733c938": `
<h3>Worked example: the cumulative distribution function</h3>
<p>Let X have probability density function f(x) = 2x for 0 ≤ x ≤ 1, and zero elsewhere. The cumulative distribution function is F(x) = P(X ≤ x) = ∫ from 0 to x of 2t dt = x² for 0 ≤ x ≤ 1. Then P(0.2 &lt; X &lt; 0.5) = F(0.5) − F(0.2) = 0.25 − 0.04 = 0.21. A probability for a continuous variable is an area under the curve, so the endpoints of an interval do not change its value.</p>
<h3>Exam method: state the range and check the total area</h3>
<p>Always state the range of x for which the formula applies, and write f(x) = 0 outside it. Before using the density, check that the integral over the full range equals 1; if it does not, the unknown constant has been found incorrectly. Make sure the function is non-negative across the whole range, because a negative value means the function cannot be a density.</p>
`,
    "f1f5eeb9-8449-47ac-8dca-bf15caf51664": `
<h3>Worked example: standard deviation from raw data</h3>
<p>For the data 2, 4, 4, 4, 5, 5, 7, 9 there are n = 8 values with mean 5. The sum of the squares is 4 + 16 + 16 + 16 + 25 + 25 + 49 + 81 = 232. The variance is Σx²/n − (x̄)² = 232/8 − 25 = 29 − 25 = 4, and the standard deviation is √4 = 2. Using the formula with the sum of squared deviations gives the same answer and is a useful check on your working.</p>
<h3>Exam method: outliers using the interquartile range</h3>
<p>The interquartile range is Q3 − Q1. Under the usual rule, a value is an outlier if it lies below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR. Use the definition given in the question if one is stated, and show the two boundary values in your working. Writing a conclusion in context, such as \"the value 40 is an outlier for these hours\", gains the communication mark.</p>
`
  },
};
