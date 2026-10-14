-- AS maths: notes top-up + 2 exam questions (linked to the topic's 9709 statement)

-- coordinate-geometry (1.3)
update study_materials set content = content || $n$
<h3>Key results and exam method</h3>
<p>Distance between (x₁, y₁) and (x₂, y₂) is √((x₂ − x₁)² + (y₂ − y₁)²). The midpoint is ((x₁ + x₂)/2, (y₁ + y₂)/2). The gradient is (y₂ − y₁)/(x₂ − x₁); a vertical line has no gradient and a horizontal line has gradient 0.</p>
<p>Parallel lines have equal gradients. Perpendicular lines have gradients m₁ and m₂ with m₁m₂ = −1, so a line perpendicular to gradient 3/4 has gradient −4/3. The perpendicular bisector of a chord passes through the midpoint of the chord, is perpendicular to it, and always passes through the centre of the circle.</p>
<p>A circle with centre (a, b) and radius r has equation (x − a)² + (y − b)² = r². Expand and compare with x² + y² + 2gx + 2fy + c = 0 to read the centre (−g, −f) and the radius √(g² + f² − c). To test whether a line meets a circle, substitute the line into the circle equation and examine the discriminant.</p>
<p><strong>Exam cue:</strong> Sketch the situation first. Many marks are for stating which point is the midpoint, which gradient is perpendicular, and which radius is used.</p>
$n$ where id = (select id from study_materials where topic_id='26473ecc-28e3-439a-9b19-a50032d1eef7' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
('2835673e-a45d-48ec-84bb-8457577ff1b3', 'Find the gradient of the line through A(1, 2) and B(5, 10).', '["1/2","2","4","-2"]'::jsonb, 1, 'Gradient = (10 − 2)/(5 − 1) = 8/4 = 2.', 100, 'exam', '4d292205-f662-45fa-8ec3-5d2d69ec0d29'),
('2835673e-a45d-48ec-84bb-8457577ff1b3', 'Find the distance between the points A(2, 1) and B(8, 9).', '["6","8","12","10"]'::jsonb, 3, 'Distance = √(6² + 8²) = √100 = 10.', 101, 'exam', '4d292205-f662-45fa-8ec3-5d2d69ec0d29');

-- differentiation (1.7)
update study_materials set content = content || $n$
<h3>Rules and exam method</h3>
<p>For y = axⁿ, dy/dx = naxⁿ⁻¹. Differentiate each term of a polynomial separately; a constant term differentiates to zero. Rewrite roots and reciprocals as powers first: √x = x^(1/2) and 1/x² = x⁻².</p>
<p>Product rule: d/dx(uv) = u dv/dx + v du/dx. Quotient rule: d/dx(u/v) = (v du/dx − u dv/dx)/v². Chain rule: dy/dx = dy/du × du/dx. For (ax + b)ⁿ the result is na(ax + b)ⁿ⁻¹.</p>
<p>Stationary points occur where dy/dx = 0. Classify them by the sign of dy/dx either side of the point, or with d²y/dx²: positive gives a minimum, negative a maximum, and zero means use the sign change. The gradient at a point gives the tangent; the normal has the negative reciprocal gradient.</p>
<p><strong>Exam cue:</strong> Give the tangent or normal as y − y₁ = m(x − x₁), or simplified to y = mx + c, as the question asks. Check it by substituting the point back into the line.</p>
$n$ where id = (select id from study_materials where topic_id='cd7deaf4-1e3a-42af-9f1d-19aa44a2bb36' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
('765f26c6-a5b4-488f-a520-168863daeb8f', 'Find dy/dx at x = 1 when y = 3x⁴ − 2x² + 5.', '["4","6","8","10"]'::jsonb, 2, 'dy/dx = 12x³ − 4x, so at x = 1 it is 12 − 4 = 8.', 100, 'exam', '235fd725-8b22-4a07-99db-67f7ccd60c25'),
('765f26c6-a5b4-488f-a520-168863daeb8f', 'Find the x-coordinate of the stationary point of y = x² − 6x + 4.', '["2","3","6","-3"]'::jsonb, 1, 'dy/dx = 2x − 6 = 0 gives x = 3.', 101, 'exam', '235fd725-8b22-4a07-99db-67f7ccd60c25');

-- functions (1.2)
update study_materials set content = content || $n$
<h3>Composite and inverse functions: exam method</h3>
<p>fg(x) means f(g(x)): apply g first, then f, so read the composite from the right. Check that the output of g lies in the domain of f before you combine them; restricted domains are a common examiner target.</p>
<p>To find f⁻¹(x), write y = f(x), swap x and y, then rearrange to make y the subject. The domain of f⁻¹ is the range of f. A function has an inverse only if it is one-to-one on the domain given; restrict the domain (for example x ≥ 0 for a quadratic) when the question asks for it.</p>
<p>The graph of f⁻¹ is the reflection of the graph of f in the line y = x, so the point (a, b) on f becomes (b, a) on f⁻¹. Use this to check an answer.</p>
<p><strong>Exam cue:</strong> State the domain and range of an inverse when asked, and write fg and gf separately when order matters.</p>
$n$ where id = (select id from study_materials where topic_id='d2429c9a-82ec-4a86-8bdc-a119666cecef' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
('1588f721-f014-448f-84b8-cb82cbf6a2ee', 'f(x) = 2x + 3 and g(x) = x². Find fg(2).', '["11","7","14","19"]'::jsonb, 0, 'g(2) = 4, then f(4) = 2(4) + 3 = 11.', 100, 'exam', '76e9db35-acfb-49ec-85d3-493fa2c9caf8'),
('1588f721-f014-448f-84b8-cb82cbf6a2ee', 'f(x) = x² − 4 for x ≥ 0. Find f⁻¹(5).', '["1","9","21","3"]'::jsonb, 3, 'Inverse is f⁻¹(x) = √(x + 4), so f⁻¹(5) = √9 = 3.', 101, 'exam', '76e9db35-acfb-49ec-85d3-493fa2c9caf8');

-- integration (1.8)
update study_materials set content = content || $n$
<h3>Rules and exam method</h3>
<p>For xⁿ with n ≠ −1, ∫xⁿ dx = xⁿ⁺¹/(n + 1) + c. Integrate term by term. The special case is ∫(1/x) dx = ln|x| + c. An indefinite integral needs + c; a definite integral does not.</p>
<p>For a definite integral, ∫ₐᵇ f(x) dx = F(b) − F(a), where F is any antiderivative. Write the limits as [F(x)] between a and b, and substitute carefully: a negative limit raised to a power needs brackets.</p>
<p>The area between a curve and the x-axis is ∫ y dx when y ≥ 0 over the interval. If the curve lies below the axis the integral is negative, so take the modulus. If the curve crosses the axis, find the root and integrate each part separately, adding the moduli of the parts.</p>
<p>The area between two curves is the integral of (upper − lower) between their intersection points, found by solving the equations simultaneously.</p>
<p><strong>Exam cue:</strong> Show the expanded antiderivative before substituting limits; method marks are given for a correct integration even when the arithmetic later slips.</p>
$n$ where id = (select id from study_materials where topic_id='5fa07820-06cf-4f42-85a4-74f5a3da9bde' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
('032754ba-c243-4c7e-b57f-966729613a00', 'Evaluate the integral of (3x² + 2) dx from 0 to 2.', '["8","10","12","16"]'::jsonb, 2, '[x³ + 2x] from 0 to 2 = (8 + 4) − 0 = 12.', 100, 'exam', 'a179eaa4-7294-4981-b410-b3839a031d67'),
('032754ba-c243-4c7e-b57f-966729613a00', 'Evaluate the integral of 1/x dx from 1 to 3.', '["ln 3","ln 2","2 ln 3","1/3"]'::jsonb, 0, 'The integral of 1/x is ln|x|, so the value is ln 3 − ln 1 = ln 3.', 101, 'exam', 'a179eaa4-7294-4981-b410-b3839a031d67');

-- quadratics (1.1)
update study_materials set content = content || $n$
<h3>Discriminant and inequalities: exam method</h3>
<p>For ax² + bx + c = 0 the discriminant is b² − 4ac. Positive gives two distinct real roots, zero gives one repeated root, and negative gives no real roots. Use this without solving the equation when the question asks about the nature of the roots.</p>
<p>To find the values of k for which a quadratic has no real roots, require b² − 4ac &lt; 0 and solve the resulting inequality in k.</p>
<p>To solve a quadratic inequality, find the roots, sketch the U-shaped (a &gt; 0) or inverted-U (a &lt; 0) curve, and read off the region above or below the axis. For x² − 5x + 6 &lt; 0 the roots are 2 and 3, and the solution is 2 &lt; x &lt; 3.</p>
<p><strong>Exam cue:</strong> Completing the square gives the turning point (p, q) and shows the minimum or maximum value directly.</p>
$n$ where id = (select id from study_materials where topic_id='5883f323-f4cd-4741-a6bc-a9c051b11ebf' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
('946628c9-a5f0-444f-b6c1-c8aa8fe048a9', 'How many real roots does 2x² − 4x + 5 = 0 have?', '["two distinct real roots","one repeated root","no real roots","two equal rational roots"]'::jsonb, 2, 'Discriminant = (−4)² − 4(2)(5) = 16 − 40 = −24 < 0, so there are no real roots.', 100, 'exam', '7ea343c6-b4d4-4655-8d28-b760a9fcd8bb'),
('946628c9-a5f0-444f-b6c1-c8aa8fe048a9', 'Solve x² − 5x + 6 < 0.', '["x<2 or x>3","2<x<3","-3<x<-2","x<3"]'::jsonb, 1, 'x² − 5x + 6 = (x − 2)(x − 3); the quadratic is negative between the roots.', 101, 'exam', '7ea343c6-b4d4-4655-8d28-b760a9fcd8bb');

-- sequences-and-series (1.6)
update study_materials set content = content || $n$
<h3>Formulae and exam method</h3>
<p>Arithmetic progression: the nth term is Tₙ = a + (n − 1)d, where a is the first term and d the common difference. The sum of the first n terms is Sₙ = n/2 [2a + (n − 1)d], or Sₙ = n/2 (a + l) when the last term l is known.</p>
<p>Geometric progression: Tₙ = arⁿ⁻¹, and Sₙ = a(1 − rⁿ)/(1 − r) for r ≠ 1. The sum to infinity exists only when |r| &lt; 1, and then S∞ = a/(1 − r).</p>
<p>To find the number of terms, substitute the known sum or term and solve for n. When n sits in an exponent, take logarithms. Check that n is a positive integer.</p>
<p>Sigma notation: Σ from r = 1 to n of (ar + b) is evaluated with the standard sums, but write out the first few terms when the pattern is unclear.</p>
<p><strong>Exam cue:</strong> Identify whether the question is AP or GP before choosing a formula, and state the value of r when using the sum to infinity.</p>
$n$ where id = (select id from study_materials where topic_id='ebe3caea-37e6-47ae-ba8e-1a5cb713196b' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
('8b04284d-b223-4f5e-b755-59a1c5f75705', 'An arithmetic progression has a = 5 and d = 3. Find the sum of the first 10 terms.', '["155","190","215","185"]'::jsonb, 3, 'S₁₀ = 10/2 [2(5) + 9(3)] = 5 × 37 = 185.', 100, 'exam', '9cde06dc-9e9a-4b3a-a910-b398886d17cc'),
('8b04284d-b223-4f5e-b755-59a1c5f75705', 'A geometric progression has first term 6 and common ratio 1/2. Find the sum to infinity.', '["6","9","12","18"]'::jsonb, 2, 'S∞ = a/(1 − r) = 6/(1 − 1/2) = 12.', 101, 'exam', '9cde06dc-9e9a-4b3a-a910-b398886d17cc');

-- trigonometry (1.5)
update study_materials set content = content || $n$
<h3>Exact values and exam method</h3>
<p>Use CAST to find the quadrant signs: all positive in the first quadrant, sine in the second, tangent in the third, cosine in the fourth. Find the acute angle first, then the other solutions in the range the question specifies.</p>
<p>For sin x = k, the solutions in 0° to 360° are α and 180° − α, where α is the acute angle with sin α = |k|. For cos x = k they are α and 360° − α. Always check the range; an answer outside it earns no mark.</p>
<p>Write a sin x + b cos x as R sin(x + α) or R cos(x − α). Expanding gives R = √(a² + b²), and for the sine form tan α = b/a. The maximum value is R, which gives the turning points that exam questions often ask for.</p>
<p>Reciprocal functions: sec x = 1/cos x, cosec x = 1/sin x, cot x = 1/tan x. Use sin²x + cos²x = 1 and 1 + tan²x = sec²x to simplify.</p>
<p><strong>Exam cue:</strong> Show the working that gives the acute angle before stating the answers in the required range.</p>
$n$ where id = (select id from study_materials where topic_id='4149e92f-7b66-43ee-af8a-cab08f65524a' and material_type='notes' order by length(content) desc limit 1);

insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id) values
('79267351-722b-4622-b1a7-4a8437a4ff2f', 'Solve sin x = 1/2 for 0° ≤ x ≤ 360°.', '["30° only","30° and 150°","150° and 210°","30°, 150°, 210° and 330°"]'::jsonb, 1, 'The acute angle is 30°; sine is positive in the first and second quadrants, giving 30° and 150°.', 100, 'exam', '8807feed-d137-47bc-851d-a64c12a048c0'),
('79267351-722b-4622-b1a7-4a8437a4ff2f', 'Write 3 sin x + 4 cos x in the form R sin(x + α) with R > 0. What is R?', '["7","5","1","25"]'::jsonb, 1, 'R = √(3² + 4²) = √25 = 5.', 101, 'exam', '8807feed-d137-47bc-851d-a64c12a048c0');
