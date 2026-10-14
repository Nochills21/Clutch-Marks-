-- A2 maths batch: notes top-up (all 18), 1 linked exam question (15 topics at 5), flashcards to 10 per topic

-- binomial-distribution (no linkable statement)
update study_materials set content = content || $n$
<h3>Exam method: binomial probabilities</h3>
<p>If X ~ B(n, p) then X counts successes in n independent trials, each with probability p. P(X = r) = nCr p^r (1 - p)^(n - r) for r = 0, 1, ..., n. The mean is np and the variance is np(1 - p).</p>
<p>Check the conditions first: a fixed number of trials, two outcomes, a constant p and independent trials. If any condition fails, the binomial model does not apply.</p>
$n$ where id = (select sm.id from study_materials sm join topics t on t.id = sm.topic_id where t.slug = 'binomial-distribution' and sm.material_type = 'notes' order by length(sm.content) desc limit 1);

-- complex-numbers (3.9)
update study_materials set content = content || $n$
<h3>Exam method: arithmetic and modulus</h3>
<p>Treat i as a symbol with i² = −1 and collect real and imaginary parts separately. When multiplying complex numbers expand like brackets, then replace i² by −1. To divide, multiply the numerator and denominator by the conjugate of the denominator, which turns the denominator into a real number.</p>
<p>For z = a + bi the modulus is |z| = √(a² + b²) and the argument is the angle θ in the Argand diagram with tan θ = b/a, placed in the correct quadrant. The conjugate z* = a − bi reverses the sign of the imaginary part, and z z* = a² + b², which is always real.</p>
<p>Equal complex numbers have equal real parts and equal imaginary parts. Use this to solve for unknown real values, comparing coefficients on both sides of an equation.</p>
<p><strong>Exam cue:</strong> State the final answer in the form a + bi, and check the sign of the imaginary part after every multiplication.</p>
$n$ where id = (select id from study_materials where topic_id='4a4ae03f-b502-41f7-8136-209e2a811174' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='4a4ae03f-b502-41f7-8136-209e2a811174' limit 1), 'Find (2 + 3i)(1 - 2i).', '["8 - i","-4 + i","8 + 7i","4 - i"]'::jsonb, 0, '(2 + 3i)(1 - 2i) = 2 - 4i + 3i - 6i² = 2 - i + 6 = 8 - i.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='4a4ae03f-b502-41f7-8136-209e2a811174' and ss.code='3.9'));

-- continuous-random-variables (6.3)
update study_materials set content = content || $n$
<h3>Exam method: density functions</h3>
<p>A probability density function f must satisfy f(x) ≥ 0 for all x and the total area under it must equal 1, so the integral of f over its whole domain is 1. Use this to find an unknown constant before asking for any probability.</p>
<p>For a continuous variable, P(a ≤ X ≤ b) is the integral of f(x) from a to b. The endpoints carry no probability, so strict and non-strict inequalities give the same answer. Outside the given domain f(x) = 0.</p>
<p>The cumulative distribution function F(x) = P(X ≤ x) is the integral of f from the lower end of the domain up to x. The median m satisfies F(m) = 0.5, and the mode is where f is largest.</p>
<p>Expected value E(X) is the integral of x f(x) over the domain, and the variance is E(X²) minus the square of E(X). Write each integral with its limits before evaluating.</p>
<p><strong>Exam cue:</strong> Sketch the density over its domain first. A linear density is a triangle or trapezium, and the area of the shape gives the total probability quickly.</p>
$n$ where id = (select id from study_materials where topic_id='0d304099-312f-4f88-8a91-09ff16f5c605' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='0d304099-312f-4f88-8a91-09ff16f5c605' limit 1), 'A continuous random variable X has pdf f(x) = kx for 0 ≤ x ≤ 2 and 0 otherwise. Find k.', '["1/2","1","2","1/4"]'::jsonb, 0, 'The integral of kx from 0 to 2 is [kx²/2] = 2k. Setting 2k = 1 gives k = 1/2.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='0d304099-312f-4f88-8a91-09ff16f5c605' and ss.code='6.3'));

-- differentiation-ii (2.4, 3.4)
update study_materials set content = content || $n$
<h3>Exam method: exponential, logarithmic and trigonometric rules</h3>
<p>The derivative of eˣ is eˣ, and the derivative of e^(kx) is k e^(kx). The derivative of ln x is 1/x, and for ln(f(x)) the chain rule gives f′(x)/f(x). The derivative of sin x is cos x and of cos x is −sin x; for a function of kx, multiply by k.</p>
<p>When a product contains an exponential or trigonometric function, use the product rule d/dx(uv) = u dv/dx + v du/dx. Factorising the result, such as eˣ(1 + x), makes it easier to evaluate at a point.</p>
<p>Quotients use d/dx(u/v) = (v du/dx − u dv/dx)/v². Write tan x as sin x/cos x when the quotient rule is easier, and remember that d/dx(tan x) = sec² x.</p>
<p>Second derivatives follow by differentiating again. Use them to classify stationary points, or to check the concavity of a curve, when the question asks for it.</p>
<p><strong>Exam cue:</strong> Show each rule as you apply it. Method marks are awarded for a correct product or chain step even if the final arithmetic is wrong.</p>
$n$ where id = (select id from study_materials where topic_id='b7daf14f-974d-4ad7-a848-07dd64176630' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='b7daf14f-974d-4ad7-a848-07dd64176630' limit 1), 'Find dy/dx at x = 0 when y = x eˣ.', '["0","1","2","e"]'::jsonb, 1, 'By the product rule dy/dx = eˣ + x eˣ. At x = 0 this is 1 + 0 = 1.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='b7daf14f-974d-4ad7-a848-07dd64176630' and ss.code='2.4'));

-- further-algebra (2.1)
update study_materials set content = content || $n$
<h3>Exam method: partial fractions</h3>
<p>Partial fractions split a rational function into simpler fractions whose sum equals the original. Before splitting, check the degrees: if the numerator has degree at least that of the denominator, divide first to get a polynomial plus a proper fraction.</p>
<p>For distinct linear factors (x − p)(x − q), write the expression as A/(x − p) + B/(x − q). Multiply through by the denominator and compare coefficients, or substitute x = p and x = q to find A and B directly. This substitution is the cover-up method and is the fastest route when the factors are linear and distinct.</p>
<p>A repeated factor (x − p)² needs two terms, A/(x − p) + B/(x − p)². An irreducible quadratic factor such as x² + 1 needs a linear numerator over it, (Ax + B)/(x² + 1).</p>
<p>Partial fractions are used to integrate rational functions, so the split is often followed by a logarithmic integral. Check the answer by recombining the fractions at one simple value of x.</p>
<p><strong>Exam cue:</strong> State the form of the partial fractions before finding the constants, because the form is credited separately from the values.</p>
$n$ where id = (select id from study_materials where topic_id='cd2ded77-54dc-4b5f-8f4f-a066f9b40184' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='cd2ded77-54dc-4b5f-8f4f-a066f9b40184' limit 1), 'Express (3x + 5)/((x + 1)(x + 2)) as A/(x + 1) + B/(x + 2). What is A?', '["1","2","3","5"]'::jsonb, 1, 'Write 3x + 5 = A(x + 2) + B(x + 1). Substituting x = -1 gives 2 = A.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='cd2ded77-54dc-4b5f-8f4f-a066f9b40184' and ss.code='2.1'));

-- further-trigonometry (2.3)
update study_materials set content = content || $n$
<h3>Exam method: reciprocal functions and identities</h3>
<p>The reciprocal functions are sec x = 1/cos x, cosec x = 1/sin x and cot x = 1/tan x. Rewrite them in terms of sine and cosine when a question mixes functions, because this usually shows which identity to use.</p>
<p>The Pythagorean identities are sin² x + cos² x = 1, 1 + tan² x = sec² x and 1 + cot² x = cosec² x. Divide the first identity by cos² x or sin² x to obtain the second or third.</p>
<p>To solve an equation such as sec x = 2, first rewrite it as cos x = 1/2, then find the acute angle and the other solutions in the required range. For cos x = k the solutions in 0 to 2π are α and 2π − α, where α is the acute angle.</p>
<p>To prove an identity, work on the more complicated side only, and keep rewriting until it matches the other side.</p>
<p><strong>Exam cue:</strong> Give each solution in the range asked for, using exact values such as π/3 when the angle is standard.</p>
$n$ where id = (select id from study_materials where topic_id='7ea1e393-fa84-4b4d-8673-86465d48e9c4' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='7ea1e393-fa84-4b4d-8673-86465d48e9c4' limit 1), 'Solve sec x = 2 for 0 ≤ x < 2π.', '["π/3 and 5π/3","π/6 and 11π/6","π/3 and 2π/3","π/3 only"]'::jsonb, 0, 'sec x = 2 means cos x = 1/2. The acute angle is π/3, and cosine is also positive in the fourth quadrant, giving 2π − π/3 = 5π/3.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='7ea1e393-fa84-4b4d-8673-86465d48e9c4' and ss.code='2.3'));

-- hypothesis-testing (6.5)
update study_materials set content = content || $n$
<h3>Exam method: hypotheses and critical regions</h3>
<p>The null hypothesis H₀ states that there is no change or no difference, and the alternative H₁ states the claim being tested. Choose H₁ with a one-tailed test when the question states a direction (greater than or less than), and with a two-tailed test when it asks whether the value has changed.</p>
<p>At the 5% significance level a one-tailed test uses the critical value z = 1.645 for an upper test, and a two-tailed test splits 5% between two tails, giving z = 1.96. Compare the test statistic with the critical value, and reject H₀ when the statistic lies in the critical region.</p>
<p>For a sample mean, the test statistic is z = (x̄ − μ)/(σ/√n), using the population mean stated in H₀. When the sample is large, the Central Limit Theorem lets you use the normal distribution even if the population is not normal.</p>
<p>State the conclusion in the context of the question, for example: there is sufficient evidence at the 5% level to suggest that the mean has increased.</p>
<p><strong>Exam cue:</strong> Always state H₀ and H₁ in terms of the population parameter, not the sample statistic, and give a conclusion in words.</p>
$n$ where id = (select id from study_materials where topic_id='628446d9-f59a-4542-a298-a0cd8234fc25' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='628446d9-f59a-4542-a298-a0cd8234fc25' limit 1), 'A one-tailed upper test at the 5% significance level uses which critical value of z?', '["1.645","1.96","2.326","1.282"]'::jsonb, 0, 'A 5% upper-tail test has critical value 1.645. The value 1.96 is the two-tailed 5% value, where 2.5% lies in each tail.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='628446d9-f59a-4542-a298-a0cd8234fc25' and ss.code='6.5'));

-- integration-ii (2.5)
update study_materials set content = content || $n$
<h3>Exam method: exponential and reciprocal integrals</h3>
<p>The integral of e^(kx) is (1/k) e^(kx) + c, and the integral of e^x is e^x + c. The integral of 1/(ax + b) is (1/a) ln|ax + b| + c. Dividing by the coefficient of x is the step most often missed, so check it by differentiating your answer.</p>
<p>For a definite integral, evaluate the antiderivative at the upper limit, subtract its value at the lower limit, and write the bracket with its limits, such as [e^(2x)/2] from 0 to 1.</p>
<p>When the integrand is a product, integration by parts gives ∫u dv = uv − ∫v du. Choose u to be the part that becomes simpler when differentiated, such as x in x eˣ.</p>
<p>Substitution changes the limits as well as the variable. Either change the limits to the new variable or substitute back before using the original limits; do not mix the two.</p>
<p><strong>Exam cue:</strong> Give the answer as an exact value, such as (e² − 1)/2, unless the question asks for a decimal.</p>
$n$ where id = (select id from study_materials where topic_id='f1b2a357-bf31-42e4-bd85-5d0dc790bb69' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='f1b2a357-bf31-42e4-bd85-5d0dc790bb69' limit 1), 'Evaluate the integral of e^(2x) dx from 0 to 1.', '["(e² - 1)/2","e² - 1","(e - 1)/2","2(e² - 1)"]'::jsonb, 0, 'The antiderivative is e^(2x)/2, so [e^(2x)/2] from 0 to 1 = (e² − 1)/2.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='f1b2a357-bf31-42e4-bd85-5d0dc790bb69' and ss.code='2.5'));

-- measures-of-variation-and-standard-deviation (no linkable statement)
update study_materials set content = content || $n$
<h3>Exam method: variance and standard deviation</h3>
<p>The variance is the mean of the squared deviations, or equivalently Var(x) = Σx²/n − x̄². The standard deviation is its square root, and it is in the same units as the data. Using the second form is quicker when the mean is already known.</p>
<p>Adding a constant to every value shifts the mean by that constant but leaves the standard deviation unchanged. Multiplying every value by a constant k multiplies the standard deviation by |k| and the variance by k². Use these rules to avoid recalculating from scratch.</p>
<p>For grouped data, use the class midpoints and the frequencies. The variance is Σfx²/Σf − x̄², with x̄ = Σfx/Σf.</p>
<p>The standard deviation is a measure of spread. Compare two data sets by stating which has the larger spread and linking that to the context of the data.</p>
<p><strong>Exam cue:</strong> Show the sum of the values and the sum of squares before dividing, because the method marks depend on those totals.</p>
$n$ where id = (select id from study_materials where topic_id='b777d569-655f-4776-95fd-ef3be62361e9' and material_type='notes' order by length(content) desc limit 1);

-- numerical-measures-of-central-tendency (5.1)
update study_materials set content = content || $n$
<h3>Exam method: mean, median and mode</h3>
<p>For ungrouped data, the mean is the sum of the values divided by the number of values. The median is the middle value of the ordered list, at position (n + 1)/2, and the mode is the value that occurs most often. Always order the data before finding the median.</p>
<p>For grouped data, the mean is Σfx/Σf using the class midpoints. The modal class is the class with the highest frequency, and the median class is the one containing the (n + 1)/2 th value.</p>
<p>Each average suits different data. The mean uses every value, so an outlier pulls it away from the centre, while the median is unaffected by extreme values. Say which average is more representative when the question asks you to comment.</p>
<p>Changing one value changes the mean but may not change the median, which is useful to check a calculation.</p>
<p><strong>Exam cue:</strong> When the question gives a mean and asks for a missing value, form the equation Σx = n × mean and solve for the unknown.</p>
$n$ where id = (select id from study_materials where topic_id='52d5c1d0-d6ba-4ae6-9dbd-ece542b7f34c' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='52d5c1d0-d6ba-4ae6-9dbd-ece542b7f34c' limit 1), 'Find the mean of 3, 5, 7, 9 and 11.', '["5","7","9","35"]'::jsonb, 1, 'The sum is 35 and there are 5 values, so the mean is 35/5 = 7.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='52d5c1d0-d6ba-4ae6-9dbd-ece542b7f34c' and ss.code='5.1'));

-- permutations-and-combinations (5.2)
update study_materials set content = content || $n$
<h3>Exam method: arrangements and selections</h3>
<p>The number of arrangements of r objects from n distinct objects is nPr = n!/(n − r)!. The number of ways to select r objects from n, where order does not matter, is nCr = n!/(r!(n − r)!). Ask first whether order matters, because that decides which formula to use.</p>
<p>Arrangements with restrictions are solved by treating a block as one object or by placing the restricted items first. For example, if two people must sit together, treat them as one unit and multiply by 2 for their internal order.</p>
<p>Use the identity nCr = nC(n − r) to check answers, and remember that nC0 = nCn = 1. Pascal's identity nCr = (n−1)C(r−1) + (n−1)Cr links the two formulae.</p>
<p>When a question has several groups with separate conditions, count each part on its own and multiply the results, provided the parts are independent.</p>
<p><strong>Exam cue:</strong> Write the formula with the numbers substituted before simplifying, since method marks are given for the correct expression.</p>
$n$ where id = (select id from study_materials where topic_id='51150c0c-c3dd-4edd-b870-5eba0ce9ffd0' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='51150c0c-c3dd-4edd-b870-5eba0ce9ffd0' limit 1), 'How many ways can a group of 2 be chosen from 6 people?', '["12","15","30","720"]'::jsonb, 1, 'Order does not matter, so 6C2 = 6!/(2! 4!) = 15.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='51150c0c-c3dd-4edd-b870-5eba0ce9ffd0' and ss.code='5.2'));

-- poisson-distribution (6.1)
update study_materials set content = content || $n$
<h3>Exam method: Poisson probabilities</h3>
<p>If X ~ Po(λ), then P(X = r) = e^(−λ) λʳ / r! for r = 0, 1, 2, … The mean and the variance are both equal to λ, so the parameter is found directly from either quantity given in the question.</p>
<p>Use the calculator's Poisson function or the formula with the exact value of e^(−λ). When a question asks for P(X ≤ r) or P(X ≥ r), add the separate probabilities, or subtract the complement from 1.</p>
<p>The rate must match the interval. If events occur at 4 per hour and the question asks about a 30-minute period, the new mean is 2. Always rescale λ to the period in the question.</p>
<p>A Poisson model is appropriate for counts of events that occur randomly and independently at a constant average rate.</p>
<p><strong>Exam cue:</strong> Check the rescaling of λ first; it is the most common error in Poisson questions, and it costs the whole question.</p>
$n$ where id = (select id from study_materials where topic_id='9b5eb0a4-aa5e-48cb-9dda-3af34851da61' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='9b5eb0a4-aa5e-48cb-9dda-3af34851da61' limit 1), 'X ~ Po(2). Find P(X = 0).', '["e^-2","2e^-2","1 - e^-2","e^2"]'::jsonb, 0, 'P(X = 0) = e^(−λ) λ⁰ / 0! = e^(−2).', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='9b5eb0a4-aa5e-48cb-9dda-3af34851da61' and ss.code='6.1'));

-- probability (5.3)
update study_materials set content = content || $n$
<h3>Exam method: combined events</h3>
<p>The addition rule gives P(A ∪ B) = P(A) + P(B) − P(A ∩ B). For mutually exclusive events the intersection is empty, so P(A ∪ B) = P(A) + P(B). Draw a Venn diagram to place each probability in its region before calculating.</p>
<p>Independent events satisfy P(A ∩ B) = P(A) × P(B). Test independence by checking this equation rather than assuming it, because the question may give the joint probability and ask you to decide.</p>
<p>The conditional probability P(A | B) = P(A ∩ B)/P(B). Events are independent exactly when P(A | B) = P(A).</p>
<p>Tree diagrams suit sequential events without replacement. Multiply along each branch and add the branches that give the outcome required.</p>
<p><strong>Exam cue:</strong> State whether events are independent or mutually exclusive, because the two are different and the formula depends on it.</p>
$n$ where id = (select id from study_materials where topic_id='f08508a7-5ca2-4527-97d4-cd63ac22309e' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='f08508a7-5ca2-4527-97d4-cd63ac22309e' limit 1), 'P(A) = 0.4, P(B) = 0.5 and A and B are independent. Find P(A ∪ B).', '["0.9","0.7","0.2","0.1"]'::jsonb, 1, 'P(A ∩ B) = 0.4 × 0.5 = 0.2, so P(A ∪ B) = 0.4 + 0.5 − 0.2 = 0.7.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='f08508a7-5ca2-4527-97d4-cd63ac22309e' and ss.code='5.3'));

-- probability-distributions (5.4, 6.2)
update study_materials set content = content || $n$
<h3>Exam method: discrete distributions</h3>
<p>A discrete probability distribution gives P(X = x) for each value x. Each probability lies between 0 and 1, and the probabilities sum to 1. Use the sum to find an unknown constant before calculating any other probability.</p>
<p>The expected value is E(X) = Σ x P(X = x), and E(X²) = Σ x² P(X = x). The variance is Var(X) = E(X²) − [E(X)]². Set out the values, probabilities and products in a table to keep the working clear.</p>
<p>For a function of X, such as Y = 2X + 3, the expected value is E(Y) = 2E(X) + 3. The variance changes as Var(2X + 3) = 4 Var(X), because adding a constant does not change the spread.</p>
<p>When a question asks for P(X ≤ x) or P(X ≥ x), add the probabilities for the values in the range.</p>
<p><strong>Exam cue:</strong> Check that the probabilities sum to 1 before reporting any expected value, because a missing or wrong probability makes the rest of the answer wrong.</p>
$n$ where id = (select id from study_materials where topic_id='9a277064-37cf-40c5-a484-34372e2f058b' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='9a277064-37cf-40c5-a484-34372e2f058b' limit 1), 'P(X = x) = kx for x = 1, 2, 3 and 0 otherwise. Find k.', '["1/6","1/3","1/2","1/4"]'::jsonb, 0, 'The probabilities sum to 1: k(1 + 2 + 3) = 6k = 1, so k = 1/6.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='9a277064-37cf-40c5-a484-34372e2f058b' and ss.code='5.4'));

-- sampling-and-estimation (6.4)
update study_materials set content = content || $n$
<h3>Exam method: estimators and sample variance</h3>
<p>The sample mean x̄ is an unbiased estimate of the population mean μ. The unbiased estimate of the population variance is s² = Σ(x − x̄)²/(n − 1), which divides by n − 1 rather than n. Using n gives the population variance of the sample, which tends to underestimate the true value.</p>
<p>When the sum of squared deviations is given, divide it by n − 1 directly. When the raw data are given, it is quicker to compute s² = (Σx² − n x̄²)/(n − 1).</p>
<p>A random sample gives each member of the population an equal chance of selection. Bias means the estimator does not equal the parameter on average, so the sample must be random to make the estimate reliable.</p>
<p>The standard error of the sample mean is σ/√n. It decreases as the sample size grows, so larger samples give more precise estimates.</p>
<p><strong>Exam cue:</strong> Name the estimator and state whether it is unbiased, because the question often asks for both the value and the reason.</p>
$n$ where id = (select id from study_materials where topic_id='bebaa1ac-0640-4b08-8f4e-425b352daaa7' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='bebaa1ac-0640-4b08-8f4e-425b352daaa7' limit 1), 'A sample of 5 values has a sum of squared deviations from the mean of 20. What is the unbiased estimate of the population variance?', '["4","5","20","4.47"]'::jsonb, 1, 's² = Σ(x − x̄)²/(n − 1) = 20/(5 − 1) = 5.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='bebaa1ac-0640-4b08-8f4e-425b352daaa7' and ss.code='6.4'));

-- the-normal-distribution (5.5)
update study_materials set content = content || $n$
<h3>Exam method: standardising and symmetry</h3>
<p>For X ~ N(μ, σ²) the standard score is z = (x − μ)/σ, and Z ~ N(0, 1). Note that the second parameter is the variance, so take the square root to get σ before standardising. Many errors come from using 25 instead of 5 when the variance is 25.</p>
<p>Probabilities are found from the standard normal table or calculator using Φ(z) = P(Z ≤ z). Because the curve is symmetric about 0, Φ(−z) = 1 − Φ(z), and P(Z > z) = 1 − Φ(z).</p>
<p>For a probability between two values, P(a < X < b) = Φ(z_b) − Φ(z_a). Standardise each limit separately and subtract.</p>
<p>To find a value from a probability, read the z-value from the table with the required area, and then rearrange z = (x − μ)/σ to find x.</p>
<p><strong>Exam cue:</strong> Sketch the curve and shade the area asked for, then match it to the table value, since the sketch catches sign errors.</p>
$n$ where id = (select id from study_materials where topic_id='3e08bf8f-4227-40a9-b6af-783b81e8b31f' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='3e08bf8f-4227-40a9-b6af-783b81e8b31f' limit 1), 'X ~ N(50, 25), where 25 is the variance. Find the z-value for x = 60.', '["2","10","5","1.2"]'::jsonb, 0, 'σ = √25 = 5, so z = (60 − 50)/5 = 2.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='3e08bf8f-4227-40a9-b6af-783b81e8b31f' and ss.code='5.5'));

-- vectors (3.7)
update study_materials set content = content || $n$
<h3>Exam method: components, magnitude and scalar product</h3>
<p>A vector in two dimensions is written as a column (x; y), and in three dimensions as (x; y; z) or in unit vector form xi + yj + zk. The magnitude is |a| = √(x² + y² + z²), which is Pythagoras applied in each direction.</p>
<p>The scalar product a · b = a₁b₁ + a₂b₂ + a₃b₃ is a number, not a vector. It also equals |a||b| cos θ, where θ is the angle between the vectors. Two vectors are perpendicular exactly when their scalar product is zero.</p>
<p>Use the scalar product to find the angle between two vectors: cos θ = (a · b)/(|a||b|). Give the angle in degrees or radians as the question asks.</p>
<p>A unit vector has magnitude 1. Divide a vector by its magnitude to find the unit vector in the same direction.</p>
<p><strong>Exam cue:</strong> Write each component with its sign before adding, because a sign slip in the scalar product changes the answer without changing the method.</p>
$n$ where id = (select id from study_materials where topic_id='33c4669d-3ed3-4432-9bb5-8e96aa3beb01' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
((select id from quizzes where topic_id='33c4669d-3ed3-4432-9bb5-8e96aa3beb01' limit 1), 'a = (1; 2) and b = (3; -1). Find a · b.', '["1","5","-1","7"]'::jsonb, 0, 'a · b = 1 × 3 + 2 × (−1) = 3 − 2 = 1.', 100, 'exam', (select ss.id from syllabus_statements ss where ss.topic_id='33c4669d-3ed3-4432-9bb5-8e96aa3beb01' and ss.code='3.7'));

-- Flashcards: bring each A2 maths topic to 10 cards (adds to its existing set)
insert into flashcards (set_id, front, back, sort_order) values
((select id from flashcard_sets where topic_id='4be1bf79-d264-44d6-84e3-4a5db1319923' order by created_at limit 1), 'Mean and variance of X ~ B(n, p)?', 'Mean = np and variance = np(1 − p).', 100),
((select id from flashcard_sets where topic_id='4be1bf79-d264-44d6-84e3-4a5db1319923' order by created_at limit 1), 'P(X = r) for X ~ B(n, p)?', 'nCr p^r (1 − p)^(n − r).', 101),
((select id from flashcard_sets where topic_id='4a4ae03f-b502-41f7-8136-209e2a811174' order by created_at limit 1), 'Modulus of z = a + bi?', '|z| = √(a² + b²).', 100),
((select id from flashcard_sets where topic_id='0d304099-312f-4f88-8a91-09ff16f5c605' order by created_at limit 1), 'Two conditions a probability density function f must satisfy?', 'f(x) ≥ 0 for all x, and the integral of f over its whole domain equals 1.', 100),
((select id from flashcard_sets where topic_id='0d304099-312f-4f88-8a91-09ff16f5c605' order by created_at limit 1), 'How is P(a ≤ X ≤ b) found for a continuous variable?', 'Integrate f(x) from a to b. The endpoints carry no probability.', 101),
((select id from flashcard_sets where topic_id='b7daf14f-974d-4ad7-a848-07dd64176630' order by created_at limit 1), 'Derivative of e^(kx)?', 'k e^(kx).', 100),
((select id from flashcard_sets where topic_id='cd2ded77-54dc-4b5f-8f4f-a066f9b40184' order by created_at limit 1), 'Partial fraction form of (ax + b)/((x − p)(x − q)) with p ≠ q?', 'A/(x − p) + B/(x − q).', 100),
((select id from flashcard_sets where topic_id='cd2ded77-54dc-4b5f-8f4f-a066f9b40184' order by created_at limit 1), 'When must you divide before splitting into partial fractions?', 'When the numerator degree is at least the denominator degree. Divide first to get a polynomial plus a proper fraction.', 101),
((select id from flashcard_sets where topic_id='cd2ded77-54dc-4b5f-8f4f-a066f9b40184' order by created_at limit 1), 'What is the cover-up method?', 'Substitute the root of each linear factor into the rest of the expression to find its constant directly.', 102),
((select id from flashcard_sets where topic_id='7ea1e393-fa84-4b4d-8673-86465d48e9c4' order by created_at limit 1), 'sec x in terms of cos x?', 'sec x = 1/cos x.', 100),
((select id from flashcard_sets where topic_id='7ea1e393-fa84-4b4d-8673-86465d48e9c4' order by created_at limit 1), '1 + tan² x equals?', 'sec² x.', 101),
((select id from flashcard_sets where topic_id='7ea1e393-fa84-4b4d-8673-86465d48e9c4' order by created_at limit 1), 'cot x in terms of tan x?', 'cot x = 1/tan x.', 102),
((select id from flashcard_sets where topic_id='628446d9-f59a-4542-a298-a0cd8234fc25' order by created_at limit 1), 'What does the null hypothesis H₀ state?', 'That there is no change or no difference. It is the statement assumed true until the test rejects it.', 100),
((select id from flashcard_sets where topic_id='628446d9-f59a-4542-a298-a0cd8234fc25' order by created_at limit 1), 'Upper-tail critical z for a one-tailed test at 5%?', 'z = 1.645.', 101),
((select id from flashcard_sets where topic_id='f1b2a357-bf31-42e4-bd85-5d0dc790bb69' order by created_at limit 1), 'Integral of e^(kx)?', '(1/k) e^(kx) + c.', 100),
((select id from flashcard_sets where topic_id='f1b2a357-bf31-42e4-bd85-5d0dc790bb69' order by created_at limit 1), 'Integral of 1/(ax + b)?', '(1/a) ln|ax + b| + c.', 101),
((select id from flashcard_sets where topic_id='b777d569-655f-4776-95fd-ef3be62361e9' order by created_at limit 1), 'Shortcut formula for variance?', 'Var(x) = Σx²/n − x̄².', 100),
((select id from flashcard_sets where topic_id='b777d569-655f-4776-95fd-ef3be62361e9' order by created_at limit 1), 'Effect of adding a constant to every value on the standard deviation?', 'No change. Adding a constant shifts the data but does not change the spread.', 101),
((select id from flashcard_sets where topic_id='b777d569-655f-4776-95fd-ef3be62361e9' order by created_at limit 1), 'Effect of multiplying every value by k on the variance?', 'The variance is multiplied by k².', 102),
((select id from flashcard_sets where topic_id='52d5c1d0-d6ba-4ae6-9dbd-ece542b7f34c' order by created_at limit 1), 'Mean of grouped data?', 'Σfx/Σf, using the class midpoints as x.', 100),
((select id from flashcard_sets where topic_id='52d5c1d0-d6ba-4ae6-9dbd-ece542b7f34c' order by created_at limit 1), 'Position of the median for n ordered values?', 'The (n + 1)/2 th value.', 101),
((select id from flashcard_sets where topic_id='51150c0c-c3dd-4edd-b870-5eba0ce9ffd0' order by created_at limit 1), 'nPr formula?', 'n!/(n − r)!.', 100),
((select id from flashcard_sets where topic_id='51150c0c-c3dd-4edd-b870-5eba0ce9ffd0' order by created_at limit 1), 'nCr formula?', 'n!/(r!(n − r)!).', 101),
((select id from flashcard_sets where topic_id='9b5eb0a4-aa5e-48cb-9dda-3af34851da61' order by created_at limit 1), 'Mean and variance of Po(λ)?', 'Both equal λ.', 100),
((select id from flashcard_sets where topic_id='f08508a7-5ca2-4527-97d4-cd63ac22309e' order by created_at limit 1), 'Addition rule for P(A ∪ B)?', 'P(A) + P(B) − P(A ∩ B).', 100),
((select id from flashcard_sets where topic_id='f08508a7-5ca2-4527-97d4-cd63ac22309e' order by created_at limit 1), 'Test for independent events A and B?', 'P(A ∩ B) = P(A) × P(B).', 101),
((select id from flashcard_sets where topic_id='9a277064-37cf-40c5-a484-34372e2f058b' order by created_at limit 1), 'Expected value of a discrete X?', 'E(X) = Σ x P(X = x).', 100),
((select id from flashcard_sets where topic_id='9a277064-37cf-40c5-a484-34372e2f058b' order by created_at limit 1), 'Two conditions for a discrete probability distribution?', 'Each probability lies between 0 and 1, and the probabilities sum to 1.', 101),
((select id from flashcard_sets where topic_id='bebaa1ac-0640-4b08-8f4e-425b352daaa7' order by created_at limit 1), 'Unbiased estimate of the population mean?', 'The sample mean x̄.', 100),
((select id from flashcard_sets where topic_id='3e08bf8f-4227-40a9-b6af-783b81e8b31f' order by created_at limit 1), 'z-score formula?', 'z = (x − μ)/σ.', 100),
((select id from flashcard_sets where topic_id='3e08bf8f-4227-40a9-b6af-783b81e8b31f' order by created_at limit 1), 'Symmetry identity for the standard normal?', 'Φ(−z) = 1 − Φ(z).', 101),
((select id from flashcard_sets where topic_id='33c4669d-3ed3-4432-9bb5-8e96aa3beb01' order by created_at limit 1), 'Magnitude of (x; y; z)?', '√(x² + y² + z²).', 100),
((select id from flashcard_sets where topic_id='33c4669d-3ed3-4432-9bb5-8e96aa3beb01' order by created_at limit 1), 'Scalar product a · b in components?', 'a₁b₁ + a₂b₂ + a₃b₃.', 101);
