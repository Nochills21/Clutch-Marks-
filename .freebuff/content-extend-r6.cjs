// Batch r6: deepens the last seven thin notes toward 3000+ characters.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "2c8a9240-8b25-4768-a26d-9bdc7fca0a89": `
<h3>Worked example: the mean of grouped data</h3>
<p>A frequency table gives class intervals, not individual values, so each class is represented by its midpoint. For the classes 0 to 10 with frequency 4, 10 to 20 with frequency 9 and 20 to 30 with frequency 7, the midpoints are 5, 15 and 25. The estimated total is 4 × 5 + 9 × 15 + 7 × 25 = 20 + 135 + 175 = 330, and the total frequency is 20, so the estimated mean is 330 ÷ 20 = 16.5. Because the midpoints replace the true values, this is an estimate, and the answer should be stated as approximately 16.5.</p>
<h3>Worked example: the median from a cumulative frequency table</h3>
<p>With n = 20 the median is the value of the 10.5th item. Read the cumulative frequency up to the class that contains the 10.5th item, which is the class 10 to 20 here, and interpolate within that class using the proportion of its frequency that lies before the median. The median is the lower boundary of the class plus the class width multiplied by (10.5 − 4) ÷ 9. Here that is 10 + 10 × 6.5 ÷ 9, which gives a median of approximately 17.2.</p>
<h3>Choosing a measure</h3>
<p>The mean uses every value, so one extreme value moves it. The median is unaffected by extreme values and is the better choice for skewed data such as house prices. The mode is the most common value and is the only measure that can be used for categorical data. A question that asks which average is most representative should be answered by giving a reason tied to the shape of the data.</p>
`,
    "9c77bccd-7dc1-4b5a-8498-f45f5af99624": `
<h3>Worked example: expectation and variance of a discrete variable</h3>
<p>Let X take the values 0, 1, 2 and 3 with probabilities 0.1, 0.4, 0.3 and 0.2. The expectation is E(X) = 0(0.1) + 1(0.4) + 2(0.3) + 3(0.2) = 0 + 0.4 + 0.6 + 0.6 = 1.6. To find the variance, first find E(X²) = 0 + 0.4 + 1.2 + 1.8 = 3.4, then Var(X) = E(X²) − [E(X)]² = 3.4 − 2.56 = 0.84. Calculating E(X²) directly and subtracting the square of the mean is quicker than summing squared deviations, and it is the method to use when the probabilities are given as a table.</p>
<h3>Checking a probability distribution</h3>
<p>Every probability must lie between 0 and 1 inclusive, and the probabilities must sum to 1. If a question gives an unknown probability, use the sum to find it before calculating any expectation. Writing the check on the page shows the examiner that the distribution is valid, and it protects you from losing the later method marks when a slip appears in the first line.</p>
<h3>The binomial distribution</h3>
<p>If X is the number of successes in n independent trials, each with success probability p, then X follows a binomial distribution. Its mean is np and its variance is np(1 − p). The probability of exactly r successes is the binomial coefficient multiplied by p to the power r and by (1 − p) to the power n − r. State the conditions of independence and constant probability when you use this model.</p>
`,
    "dec61a69-ea89-4236-9ae4-64f25d54c51d": `
<h3>Population and sample</h3>
<p>A population is the complete set of items being studied, and a sample is the subset that is actually measured. A sample is used because measuring the whole population is too slow or too costly. A random sample gives every member an equal chance of selection, and a sample that is not random may be biased. A sample statistic, such as the sample mean, is used to estimate a population parameter, such as the population mean.</p>
<h3>Worked example: an unbiased estimate of the population variance</h3>
<p>A sample of size 5 has values 4, 6, 7, 8 and 10. The sample mean is 35 ÷ 5 = 7. The sum of squared deviations from the mean is 9 + 1 + 0 + 1 + 9 = 20. Dividing by n gives 4, but the unbiased estimate of the population variance divides by n − 1, which gives s² = 20 ÷ 4 = 5. The divisor n − 1 is used because the sample mean is itself estimated from the data, and it corrects the tendency of the divisor n to underestimate the population variance.</p>
<h3>Confidence intervals for a mean</h3>
<p>For a large sample from a population with known standard deviation σ, a 95% confidence interval for the population mean is the sample mean plus or minus 1.96 multiplied by σ divided by the square root of n. The quantity σ divided by the square root of n is the standard error. A wider interval means less precision, and increasing the sample size narrows the interval. Give the interval as two values and state the confidence level in the conclusion.</p>
`,
    "58ecfd82-cac6-4371-8ec0-1f303808c592": `
<h3>Standardising a normal variable</h3>
<p>If X follows a normal distribution with mean μ and standard deviation σ, then Z = (X − μ) ÷ σ follows the standard normal distribution with mean 0 and standard deviation 1. Standardising allows any normal probability to be read from the standard normal table. For example, if X is normal with mean 50 and standard deviation 4, then P(X &gt; 54) = P(Z &gt; 1), which the table gives as about 0.1587.</p>
<h3>Worked example: finding a value from a probability</h3>
<p>Suppose P(X &lt; k) = 0.9 for a normal variable with mean 20 and standard deviation 3. The table gives the z-value 1.2816 for a probability of 0.9, so k = 20 + 1.2816 × 3 = 23.85. When the probability is less than 0.5, the z-value is negative, so take care with the sign. Sketch the normal curve and shade the area you need before you use the table, because the sketch shows whether the answer should be above or below the mean.</p>
<h3>Symmetry and the 68-95-99 rule</h3>
<p>The normal curve is symmetric about the mean, so P(Z &lt; −a) = P(Z &gt; a). Roughly 68% of values lie within one standard deviation of the mean, 95% within two and 99.7% within three. These approximate figures are useful for checking whether a calculated probability is reasonable.</p>
`,
    "944a7eb4-3cc4-4439-bc06-3250049bf117": `
<h3>Significant figures and decimal places</h3>
<p>Significant figures count from the first non-zero digit. The number 0.00304 has three significant figures, and 4500 to two significant figures is written as 4.5 × 10³. Decimal places count digits after the point. When rounding a measurement, give the answer to the precision of the least precise measurement used in the calculation, and do not show more digits than the data justify.</p>
<h3>Worked example: converting between units</h3>
<p>To convert 2.5 km into metres, multiply by 1000 to get 2500 m. To convert 450 cm² into m², divide by 10 000, because one square metre is 100 cm × 100 cm, which gives 0.045 m². A common error is to convert a length by 100 when an area or a volume is required. For volume, one cubic metre is 1 000 000 cm³, so 3 m³ is 3 000 000 cm³.</p>
<h3>Reading scales and measuring accurately</h3>
<p>To read an analogue scale, identify the value of the smallest division, then estimate the reading to a tenth of that division. Record every reading with the same number of decimal places as the scale. A measurement of the thickness of a sheet of paper is made more accurate by measuring many sheets together and dividing by their number, which reduces the effect of the reading error on a single sheet.</p>
`,
    "944cae75-d042-4e44-adb7-84ee5a7e4f18": `
<h3>Worked example: heating a substance</h3>
<p>A 2 kg block of aluminium with specific heat capacity 900 J/(kg °C) is heated from 20 °C to 70 °C. The energy supplied is Q = mcΔθ = 2 × 900 × 50 = 90 000 J, which is 90 kJ. The specific heat capacity is the energy needed to raise the temperature of 1 kg of the substance by 1 °C, so the same calculation with a different material gives a different energy for the same mass and temperature rise.</p>
<h3>Worked example: melting ice</h3>
<p>The specific latent heat of fusion of ice is the energy needed to change 1 kg of ice at 0 °C into water at 0 °C without any change in temperature. For 0.5 kg of ice with latent heat 334 000 J/kg, the energy needed is Q = mL = 0.5 × 334 000 = 167 000 J. During melting the temperature stays constant, so the energy goes into breaking the bonds between molecules rather than raising the temperature.</p>
<h3>Conduction, convection and radiation</h3>
<p>Conduction transfers thermal energy through a solid by particles passing on kinetic energy to their neighbours, and metals conduct well because of their free electrons. Convection transfers energy through a fluid, because warmer, less dense fluid rises and cooler fluid sinks. Radiation transfers energy as infrared waves, which need no medium, and a dark matt surface is both the best absorber and the best emitter of radiation. Name the process in the question and link it to the property of the material that controls it.</p>
`,
    "b019737f-148f-4517-90eb-36528c45eb85": `
<h3>Worked example: resistors in series and in parallel</h3>
<p>Two resistors of 4 Ω and 6 Ω in series have a combined resistance of 10 Ω, and the same current flows through each. In parallel, the same two resistors have a combined resistance found from 1/R = 1/4 + 1/6 = 5/12, so R = 2.4 Ω. The combined resistance in parallel is always less than the smallest individual resistance, and adding a branch to a parallel circuit always reduces the total resistance.</p>
<h3>Worked example: EMF and internal resistance</h3>
<p>A cell with EMF 1.5 V and internal resistance 0.5 Ω supplies a current of 2 A. The terminal potential difference is V = E − Ir = 1.5 − (2 × 0.5) = 0.5 V. Writing V = E − Ir before substituting shows that the energy lost inside the cell is the difference between the EMF and the terminal voltage. A cell with a larger current supplied has a smaller terminal voltage.</p>
<h3>The potential divider</h3>
<p>Two resistors in series across a supply give an output voltage across one of them that depends on the ratio of the resistances. For a supply of 12 V with resistors of 2 kΩ and 4 kΩ in series, the voltage across the 4 kΩ resistor is 12 × 4 ÷ 6 = 8 V. A thermistor or light-dependent resistor in place of one of the resistors makes this arrangement a sensor, because the output voltage changes with temperature or light level.</p>
`
  },
};
