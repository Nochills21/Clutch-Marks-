// Statistics 1 notes. Every worked number here was checked by hand.
module.exports = [
  {
    file: 's1-probability',
    eyebrow: 'Pearson Edexcel International Statistics 1, section 3',
    title: 'Statistics 1: probability',
    syllabus: 'Pearson Edexcel International Statistics 1, section 3: sample spaces, the sum and product laws, conditional probability and independence.',
    sections: [
      {
        h: 'Complementary events',
        why: 'Every outcome either happens or does not, so the probability of the complement is one minus the probability of the event.',
        paras: [
          'The sample space is the set of all possible outcomes, and the probabilities of all outcomes add to 1. An event A is a set of outcomes, and its complement A′ is everything in the sample space that is not in A. Because A and A′ cover the whole sample space without overlapping, P(A′) = 1 − P(A).',
          'Complements are the fastest route to "at least one" questions. "At least one head in three tosses" is the complement of "no heads", so its probability is 1 − (1/2)³ = 7/8, which is much quicker than adding the probabilities of one, two and three heads.',
          'Check that your answers sum to 1 when you list all the outcomes. If they do not, a branch or an outcome has been missed, and that is the most common reason for a wrong answer in this topic.',
        ],
        formulas: ['P(A′) = 1 − P(A)'],
        examples: [
          'two fair dice are thrown. There are 36 equally likely outcomes, and 6 of them have a sum of 7. So P(sum is not 7) = 1 − 6/36 = 5/6.',
        ],
      },
      {
        h: 'The addition law',
        why: 'When two events can both happen, adding their probabilities counts the overlap twice, so the overlap must be subtracted once.',
        paras: [
          'For any two events, P(A ∪ B) = P(A) + P(B) − P(A ∩ B). The union A ∪ B means "A or B or both", and the intersection A ∩ B means "A and B". The term P(A ∩ B) is subtracted because it was included in both P(A) and P(B).',
          'If A and B are mutually exclusive, they cannot happen together, so P(A ∩ B) = 0 and the formula reduces to P(A ∪ B) = P(A) + P(B). A common error is to assume that all events are mutually exclusive. Mutually exclusive events with non-zero probabilities are never independent, as the two events cannot both happen.',
          'Venn diagrams make this clear. Fill in the intersection first, then the parts of A and B outside it, and finally the outside of both. The numbers in each region must add to 1.',
        ],
        formulas: ['P(A ∪ B) = P(A) + P(B) − P(A ∩ B)'],
        examples: [
          'P(A) = 0.4, P(B) = 0.35 and P(A ∩ B) = 0.1. Then P(A ∪ B) = 0.4 + 0.35 − 0.1 = 0.65.',
        ],
      },
      {
        h: 'The product law and conditional probability',
        why: 'The second event is judged within the situation that the first event has already produced, so its probability is conditional on the first.',
        paras: [
          'The conditional probability P(B | A) is the probability of B given that A has happened. It is found from P(B | A) = P(A ∩ B) ÷ P(A). Rearranging gives the product law, P(A ∩ B) = P(A) × P(B | A), which is used for "and" questions in sequences of events.',
          'With no replacement, the probabilities change after each draw, and a tree diagram is the clearest way to show this. Each branch carries the conditional probability for that stage, and the probability of a path is the product along its branches. Different paths that give the same outcome are then added.',
          'Be careful with the wording. "Given that" tells you to use a conditional probability, while "and" tells you to multiply along a path.',
        ],
        formulas: ['P(B | A) = P(A ∩ B) ÷ P(A)', 'P(A ∩ B) = P(A) × P(B | A)'],
        examples: [
          'a bag contains 5 red and 3 blue counters, and two are taken without replacement. P(both red) = 5/8 × 4/7 = 20/56 = 5/14. P(one of each colour) = 5/8 × 3/7 + 3/8 × 5/7 = 30/56 = 15/28.',
        ],
      },
      {
        h: 'Independence',
        why: 'Two events are independent when knowing one has happened does not change the probability of the other.',
        paras: [
          'A and B are independent if and only if P(A ∩ B) = P(A) × P(B). Equivalently, P(B | A) = P(B). This is the test to apply in an exam: if the question asks you to show independence, calculate both sides and compare them.',
          'Independence is an assumption to be justified, not a default. Two events in different trials, such as two separate coin tosses, are usually independent. Two events that share the same draw without replacement are usually not.',
          'Do not confuse independence with mutual exclusivity. Mutually exclusive events have P(A ∩ B) = 0, which equals P(A) × P(B) only when one of the probabilities is zero.',
        ],
        formulas: ['A and B independent ⇔ P(A ∩ B) = P(A) × P(B)'],
        examples: [
          'P(A) = 0.4, P(B) = 0.3 and P(A ∩ B) = 0.12. Since 0.4 × 0.3 = 0.12, the events are independent.',
        ],
      },
      {
        h: 'Tree and Venn diagrams',
        why: 'Diagrams turn a word problem into a set of numbers that can be checked against each other.',
        paras: [
          'In a tree diagram, probabilities on the branches leaving one node add to 1. The probability of a complete path is the product of its branch probabilities, and the probability of an event is the sum of the paths that lead to it. This method extends naturally to three or more stages.',
          'A two-way table or a Venn diagram is often easier when the question gives counts rather than probabilities. Convert the counts into probabilities by dividing by the total, and check that the entries add to the total.',
          'The most useful check is to confirm that the answers reconcile: the probabilities of all outcomes sum to 1, and a probability found two ways gives the same result.',
        ],
        examples: [
          '60% of students study maths (M). Of these, 50% also study science (S). Of the others, 20% study science. Then P(S) = 0.6 × 0.5 + 0.4 × 0.2 = 0.3 + 0.08 = 0.38.',
        ],
      },
    ],
    exam: [
      'Write down the sample space or the probabilities on a tree before calculating anything.',
      'Use the complement for "at least one" questions.',
      'Check that the branch probabilities leaving each node add to 1.',
      'To show independence, compare P(A ∩ B) with P(A) × P(B) and state the conclusion.',
    ],
  },
  {
    file: 's1-discrete-random-variables',
    eyebrow: 'Pearson Edexcel International Statistics 1, sections 5 and 6',
    title: 'Statistics 1: discrete random variables',
    syllabus: 'Pearson Edexcel International Statistics 1, sections 5 and 6: discrete random variables, probability functions, cumulative distribution functions, mean, variance and the discrete uniform distribution.',
    sections: [
      {
        h: 'The probability function',
        why: 'A discrete random variable takes countably many values, and its probability function gives the probability of each value.',
        paras: [
          'A discrete random variable X takes a set of separate values, each with a probability P(X = x). Each probability must lie between 0 and 1, and all the probabilities must add to 1. These two conditions are what make a table a valid probability function.',
          'To find a probability such as P(X ≥ 2), add the probabilities of all the values that satisfy the condition. Write out the values you are adding, because this step is where most mistakes happen when the condition is an inequality.',
          'When the probabilities contain an unknown k, use the condition that they sum to 1 to find k before doing anything else.',
        ],
        examples: [
          'X takes the values 0, 1, 2 and 3 with probabilities 0.1, 0.4, 0.3 and 0.2. These add to 1, so the table is valid. P(X ≥ 2) = 0.3 + 0.2 = 0.5.',
        ],
      },
      {
        h: 'The cumulative distribution function',
        why: 'The cumulative distribution function gives the total probability up to a value, and it steps up at each value the variable can take.',
        paras: [
          'The cumulative distribution function is F(x) = P(X ≤ x). For a discrete variable it is a step function: it is constant between the possible values and jumps by P(X = x) at each one. It is zero below the smallest value and one at and above the largest.',
          'The probability of a single value can be recovered from the function: P(X = x) = F(x) − F(x − 1) when the values are whole numbers. Between two steps, F takes the value of the lower step, so F(1.5) equals F(1).',
          'Tables of F(x) are often given in an exam, and reading the right step is the key skill. Check that the largest value gives F = 1.',
        ],
        formulas: ['F(x) = P(X ≤ x)', 'P(X = x) = F(x) − F(x − 1) for integer values'],
        examples: [
          'using the previous table, F(1) = 0.5 and F(2) = 0.8. So P(X = 2) = F(2) − F(1) = 0.3, and F(1.5) = F(1) = 0.5.',
        ],
      },
      {
        h: 'Mean and variance',
        why: 'The mean is the long-run average of the variable, and the variance measures how far its values typically sit from that average.',
        paras: [
          'The mean, or expectation, is E(X) = Σ x P(X = x). It is a weighted average in which each value counts in proportion to its probability. It is not necessarily one of the possible values, and that is normal.',
          'The variance is most easily found from Var(X) = E(X²) − [E(X)]². Calculate E(X²) = Σ x² P(X = x) by squaring each value before weighting it. Subtracting the square of the mean is the step most often forgotten.',
          'The standard deviation is the square root of the variance. Keep the variance exact if the question asks for it, and round only at the final step.',
        ],
        formulas: ['E(X) = Σ x P(X = x)', 'Var(X) = E(X²) − [E(X)]²'],
        examples: [
          'for the same table, E(X) = 0(0.1) + 1(0.4) + 2(0.3) + 3(0.2) = 1.6. E(X²) = 0 + 0.4 + 1.2 + 1.8 = 3.4. So Var(X) = 3.4 − 1.6² = 0.84.',
        ],
      },
      {
        h: 'Linear transformations',
        why: 'Adding a constant shifts the mean but not the spread; multiplying by a constant scales the mean by that constant and the variance by its square.',
        paras: [
          'If Y = aX + b, then E(Y) = aE(X) + b and Var(Y) = a² Var(X). The constant b changes only the mean, because adding the same amount to every value moves the whole distribution without changing how spread out it is.',
          'The square in the variance formula is the source of most errors. Doubling X doubles the mean but multiplies the variance by four. Only the variance, not the standard deviation, is squared.',
          'Use these results rather than recalculating from a new table, which is slower and more error-prone.',
        ],
        formulas: ['E(aX + b) = aE(X) + b', 'Var(aX + b) = a² Var(X)'],
        examples: [
          'for Y = 2X + 3 with the previous X: E(Y) = 2(1.6) + 3 = 6.2, and Var(Y) = 4(0.84) = 3.36.',
        ],
      },
      {
        h: 'The discrete uniform distribution',
        why: 'When every value from 1 to n is equally likely, the mean and variance have simple formulas that avoid a long sum.',
        paras: [
          'A discrete uniform variable X takes each of the values 1, 2, …, n with probability 1/n. The mean is (n + 1)/2, which is the midpoint of the values, and the variance is (n² − 1)/12.',
          'Recognise the distribution from the wording: a fair die, a random digit, or a card drawn at random from a numbered set. Once recognised, use the formulas directly rather than summing.',
          'The distribution is symmetric about its mean, which is a useful check on any calculated mean.',
        ],
        formulas: ['E(X) = (n + 1)/2', 'Var(X) = (n² − 1)/12'],
        examples: [
          'a fair six-sided die has n = 6, so E(X) = 3.5 and Var(X) = 35/12 ≈ 2.92.',
        ],
      },
    ],
    exam: [
      'Check that the probabilities sum to 1 before using a table.',
      'Use Var(X) = E(X²) − [E(X)]², and remember to square the mean.',
      'For Y = aX + b, scale the variance by a², and do not add b to it.',
      'Recognise the discrete uniform distribution from the wording and use its formulas.',
    ],
  },
  {
    file: 's1-normal-distribution',
    eyebrow: 'Pearson Edexcel International Statistics 1, section 7',
    title: 'Statistics 1: the Normal distribution',
    syllabus: 'Pearson Edexcel International Statistics 1, section 7: the Normal distribution, its mean and variance, and the use of tables.',
    sections: [
      {
        h: 'The distribution',
        why: 'Many continuous quantities cluster symmetrically around a mean, and the Normal distribution models that pattern.',
        paras: [
          'A variable X is Normal, written X ~ N(μ, σ²), when its graph is a symmetric bell-shaped curve centred on μ. The mean, median and mode are all equal to μ, and σ² is the variance. A larger σ gives a wider, flatter curve, and a smaller σ gives a narrower, taller one.',
          'The total area under the curve is 1, so areas represent probabilities. Because the curve is symmetric, the area to the left of μ is 0.5, and the area on each side of μ ± σ is about 0.68 in total. This is a quick check on any answer.',
          'Probabilities are not read from the curve directly. They are found by standardising to the Normal distribution with mean 0 and variance 1, and reading a table of Φ(z), the probability that Z is at most z.',
        ],
        formulas: ['X ~ N(μ, σ²)', 'Mean = median = mode = μ'],
        examples: [
          'X ~ N(50, 16), so μ = 50 and σ = 4. The curve is centred on 50, and about 68% of values lie between 46 and 54.',
        ],
      },
      {
        h: 'Standardising',
        why: 'Converting any Normal variable to the standard Normal Z lets one table serve every problem.',
        paras: [
          'To find P(X < x) for X ~ N(μ, σ²), convert the value to a z-score with Z = (X − μ)/σ, which is N(0, 1). Then P(X < x) = P(Z < z), and this is read from the table. The conversion moves the mean to zero and the standard deviation to one.',
          'Always divide by the standard deviation, not the variance. Using σ² is a frequent error, and it gives a z-value that is too large in magnitude.',
          'Between two values, find the probability as the difference of two table values: P(a < X < b) = P(X < b) − P(X < a).',
        ],
        formulas: ['Z = (X − μ) ÷ σ'],
        examples: [
          'for X ~ N(50, 16), P(X < 58) = P(Z < (58 − 50) ÷ 4) = P(Z < 2) = 0.9772.',
        ],
      },
      {
        h: 'Using symmetry',
        why: 'Only the upper tail of the standard Normal is tabulated, so the lower tail comes from symmetry.',
        paras: [
          'Because the curve is symmetric about zero, Φ(−z) = 1 − Φ(z). This means that a negative z-value is handled by taking the complement of the table value for the positive number with the same magnitude.',
          'The same idea gives P(Z > z) = 1 − Φ(z). Draw a sketch of the curve with the area shaded before you write any probability, because the shaded region tells you whether to subtract from one or not.',
          'Probabilities between two negative values, or straddling zero, need the symmetry rule and a subtraction, so sketch them to keep the signs straight.',
        ],
        formulas: ['Φ(−z) = 1 − Φ(z)', 'P(Z > z) = 1 − Φ(z)'],
        examples: [
          'for X ~ N(50, 16), P(46 < X < 58) = P(−1 < Z < 2) = Φ(2) − (1 − Φ(1)) = 0.9772 − 0.1587 = 0.8185.',
        ],
      },
      {
        h: 'Finding a value from a probability',
        why: 'Running the standardisation in reverse turns a probability back into a value of X.',
        paras: [
          'When the probability is given and the value is unknown, find the z-value first from the table, then convert back with X = μ + zσ. Read the table in reverse: find the probability in the body of the table and read off the z-value from the margins.',
          'Choose the correct z for the tail the question describes. If P(X > a) = 0.1, then P(X < a) = 0.9, so use the z-value with Φ(z) = 0.9, not 0.1.',
          'Give the answer in the same units as X and to the accuracy asked for.',
        ],
        formulas: ['X = μ + zσ'],
        examples: [
          'for X ~ N(50, 16), if P(X > a) = 0.1 then Φ(z) = 0.9, so z ≈ 1.2816. Then a = 50 + 1.2816 × 4 ≈ 55.13.',
        ],
      },
    ],
    exam: [
      'Sketch the curve and shade the required area before choosing a method.',
      'Divide by σ, not σ², when standardising.',
      'For a value from a probability, check which tail the probability refers to.',
      'Round only at the end, and give the answer in the units of X.',
    ],
  },
  {
    file: 's1-correlation-and-regression',
    eyebrow: 'Pearson Edexcel International Statistics 1, section 4',
    title: 'Statistics 1: correlation and regression',
    syllabus: 'Pearson Edexcel International Statistics 1, section 4: scatter diagrams, explanatory and response variables, the product moment correlation coefficient, and linear regression.',
    sections: [
      {
        h: 'Explanatory and response variables',
        why: 'A scatter diagram shows whether two variables are related, and the direction of the relationship depends on which variable is explanatory.',
        paras: [
          'The explanatory variable, usually x, is the one that is set or thought to influence the other. The response variable, usually y, is the one that is measured as a result. Plotting x on the horizontal axis and y on the vertical axis gives the standard scatter diagram.',
          'A scatter diagram can show positive correlation, where y tends to rise with x; negative correlation, where y tends to fall; or no correlation, where the points show no pattern. It can also show a non-linear pattern, which a correlation coefficient will not describe well.',
          'Always describe the diagram in context, mentioning the direction and strength of the relationship. A bare statement that the points are "positively correlated" does not earn full marks.',
        ],
        examples: [
          'a scatter of hours studied (x) against test score (y) with points rising from the bottom left to the top right shows positive correlation: more study tends to go with higher scores.',
        ],
      },
      {
        h: 'The product moment correlation coefficient',
        why: 'The coefficient r gives one number between −1 and 1 that measures how close the points lie to a straight line.',
        paras: [
          'The product moment correlation coefficient is r = Sxy ÷ √(Sxx × Syy), where Sxx = Σ(x − x̄)² = Σx² − n x̄², Syy = Σ(y − ȳ)², and Sxy = Σ(x − x̄)(y − ȳ) = Σxy − n x̄ ȳ. The value is always between −1 and 1, and values near ±1 mean the points lie close to a straight line.',
          'r measures linear association only. A value near zero does not mean no relationship; a strong curved relationship can give r close to zero. And a high r does not mean that x causes y, because a third variable may drive both.',
          'Use the sums in the calculation carefully: subtracting n x̄ ȳ from Σxy is faster than summing deviations, but both give the same answer.',
        ],
        formulas: ['r = Sxy ÷ √(Sxx × Syy)', 'Sxy = Σxy − n x̄ ȳ'],
        examples: [
          'for x = 1, 2, 3, 4, 5 and y = 2, 4, 5, 4, 5: x̄ = 3, ȳ = 4, Sxx = 10, Syy = 6 and Sxy = 66 − 60 = 6. So r = 6 ÷ √60 ≈ 0.77, a fairly strong positive linear correlation.',
        ],
      },
      {
        h: 'Least squares regression',
        why: 'The regression line is the straight line that makes the total squared vertical distance from the points as small as possible.',
        paras: [
          'The regression line of y on x is y = a + bx, where b = Sxy ÷ Sxx and a = ȳ − bx̄. The line always passes through the point of means (x̄, ȳ), which is a useful check on any calculated line.',
          'Regression of y on x is used to predict y from x. Do not swap the variables to predict x from y without recalculating, because the line of y on x and the line of x on y are different lines unless r = ±1.',
          'The gradient b has the same sign as r, so a positive correlation gives a positive gradient. Check the sign before you interpret the slope.',
        ],
        formulas: ['b = Sxy ÷ Sxx', 'a = ȳ − b x̄', 'y = a + bx'],
        examples: [
          'for the same data: b = 6 ÷ 10 = 0.6 and a = 4 − 0.6 × 3 = 2.2. The regression line is y = 2.2 + 0.6x, and it passes through (3, 4).',
        ],
      },
      {
        h: 'Predictions and extrapolation',
        why: 'A regression line is reliable inside the range of the data and becomes unreliable beyond it.',
        paras: [
          'Interpolation predicts a value of y for an x within the range of the data, and it is generally reliable. Extrapolation predicts a value for an x outside the range, and it assumes the linear pattern continues, which is often untrue.',
          'The further the prediction lies from the data, the less confidence you should place in it. An exam answer should say whether a prediction is interpolation or extrapolation and comment on its reliability.',
          'Also remember that a regression line describes the data, not a law. A prediction is an estimate, and a good answer mentions the limitation.',
        ],
        examples: [
          'using y = 2.2 + 0.6x, the prediction at x = 4 is 4.6, which is within the data. At x = 6 it gives 5.8, which is extrapolation just beyond x = 5, so it should be treated with caution; at x = 20 it would be unreliable.',
        ],
      },
    ],
    exam: [
      'Describe a scatter diagram in context, with direction, strength and form.',
      'Calculate Sxy and Sxx carefully, and check that r lies between −1 and 1.',
      'Remember that the regression line passes through (x̄, ȳ).',
      'Say whether a prediction is interpolation or extrapolation, and comment on its reliability.',
    ],
  },
  {
    file: 's1-representation-and-summary',
    eyebrow: 'Pearson Edexcel International Statistics 1, section 2',
    title: 'Statistics 1: representing and summarising data',
    syllabus: 'Pearson Edexcel International Statistics 1, section 2: histograms, stem and leaf diagrams, box plots, measures of location and dispersion, skewness and outliers.',
    sections: [
      {
        h: 'Diagrams for comparing distributions',
        why: 'Each diagram shows the shape of a distribution, and comparing two distributions needs diagrams drawn on the same scale.',
        paras: [
          'A stem and leaf diagram keeps every data value while showing the shape. A histogram uses area to show frequency, so for unequal class widths the height must be the frequency density, which is frequency ÷ class width, not the frequency itself. Mixing the two up is a very common error.',
          'A box plot shows the median, the quartiles and the extremes in one compact picture. Two box plots drawn on the same scale make comparison easy: compare the medians, then the spreads, then the shapes.',
          'When an exam asks you to compare distributions, make at least two statements, each with a number and a context, such as "the median for group B is higher, at 12 against 9".',
        ],
        formulas: ['Frequency density = frequency ÷ class width'],
        examples: [
          'a class of width 5 with frequency 20 has frequency density 4. A class of width 10 with frequency 20 has frequency density 2, so the first class is taller on the histogram even though the frequencies are equal.',
        ],
      },
      {
        h: 'Measures of location',
        why: 'The mean, median and mode each describe a typical value in a different way, and each can be the better choice depending on the data.',
        paras: [
          'The mean is the sum of the values divided by the number of values. It uses every value, but it is pulled by extreme values. The median is the middle value when the data are ordered, and it is not affected by outliers. The mode is the most frequent value and is the only one that works for categorical data.',
          'For n values, the median is the value in position (n + 1) ÷ 2 in the ordered list. For an even number of values, it is the mean of the two middle values. Order the data before finding the median; reading the middle of an unordered list is a common error.',
          'Use the mean for symmetric data with no extreme values and the median when the data are skewed or have outliers. State which you have used and why.',
        ],
        formulas: ['Mean = Σx ÷ n', 'Median position = (n + 1) ÷ 2'],
        examples: [
          'for 3, 5, 7, 8, 9, 12, 15: n = 7, the median is the 4th value, 8, and the mean is 59 ÷ 7 ≈ 8.43. The mean is slightly higher because of the large value 15.',
        ],
      },
      {
        h: 'Measures of dispersion',
        why: 'Two sets of data with the same average can be very different in how spread out they are, so a measure of spread is always needed.',
        paras: [
          'The range is the largest value minus the smallest. It is easy to compute but depends on only two values. The interquartile range (IQR) is Q3 − Q1, the spread of the middle half of the data, and it is resistant to outliers. The standard deviation uses every value and is the usual measure for the mean.',
          'Quartiles split the ordered data into four parts. Q2 is the median. Q1 is the median of the lower half, and Q3 is the median of the upper half. When n is odd, textbooks differ on whether the median is included in the halves, so state the method you use.',
          'Quote the spread with the measure of location you used: the median with the IQR, and the mean with the standard deviation.',
        ],
        formulas: ['IQR = Q3 − Q1'],
        examples: [
          'for 3, 5, 7, 8, 9, 12, 15: the lower half is 3, 5, 7 so Q1 = 5, and the upper half is 9, 12, 15 so Q3 = 12. The IQR is 12 − 5 = 7.',
        ],
      },
      {
        h: 'Skewness and outliers',
        why: 'The shape of the data shows in the relationship between the mean and the median, and outliers are identified with a fixed rule.',
        paras: [
          'A distribution is positively skewed when it has a long tail to the right; then the mean is greater than the median. It is negatively skewed when the long tail is to the left, and then the mean is less than the median. A symmetric distribution has mean and median approximately equal.',
          'An outlier is a value that lies more than 1.5 × IQR beyond the quartiles: below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR. These are the limits used for the whiskers of a box plot, and values beyond them are plotted separately.',
          'Outliers should be reported, not silently deleted. A good answer says whether an outlier is an error or a genuine extreme value, and how it affects the mean.',
        ],
        formulas: ['Outliers: below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR'],
        examples: [
          'for the same data, the upper limit is 12 + 1.5 × 7 = 22.5 and the lower limit is 5 − 10.5 = −5.5. No value lies outside these limits, so there are no outliers. The mean (8.43) is greater than the median (8), suggesting a slight positive skew.',
        ],
      },
      {
        h: 'Interpreting results',
        why: 'A number has no meaning in a statistics answer until it is stated in the context of the question.',
        paras: [
          'Every exam answer on this topic is marked for interpretation as well as calculation. State what the number tells you about the situation, using the units and the variable named in the question.',
          'Compare like with like. If you compare two distributions, use the same measures for both, and compare their location and spread together, because a higher mean with a much larger spread may not mean a better result overall.',
          'Comment on the reliability of a measure when the data are small, skewed or contain outliers, because the choice of measure then matters.',
        ],
        examples: [
          'the mean score for group A is 60 with standard deviation 4, and for group B it is 62 with standard deviation 15. Group B scores higher on average, but its results are far more spread out, so group A is more consistent.',
        ],
      },
    ],
    exam: [
      'Use frequency density, not frequency, for the height of a histogram with unequal class widths.',
      'Order the data before finding the median or quartiles.',
      'Use the 1.5 × IQR rule for outliers and state the limits you used.',
      'Interpret every answer in context, comparing location and spread together.',
    ],
  },
];
