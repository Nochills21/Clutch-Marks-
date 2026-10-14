UPDATE study_materials SET content = $n$<h2>Dynamics</h2>
<h3>Momentum</h3>
<ul>
<li>Momentum p = mv. It is a vector, with unit kg m s⁻¹, and it has the same direction as the velocity.</li>
<li>Momentum and kinetic energy are different. Momentum is a vector and changes sign with direction. Kinetic energy is a scalar.</li>
</ul>
<h3>Newton's laws of motion</h3>
<ul>
<li><strong>First law:</strong> a body stays at rest or keeps moving at constant velocity unless a resultant (net) force acts on it.</li>
<li><strong>Second law:</strong> the resultant force equals the rate of change of momentum, F = ma for constant mass. The acceleration is in the direction of the resultant force.</li>
<li><strong>Third law:</strong> when body A exerts a force on body B, B exerts an equal and opposite force on A. The two forces are the same type and act on different bodies, so they never cancel.</li>
</ul>
<h3>Weight and mass</h3>
<p>Mass is the amount of matter (scalar, kg). Weight is the gravitational force on it, W = mg (vector, N). Mass is the same everywhere; weight changes with the value of g.</p>
<h3>Impulse</h3>
<p>Impulse = FΔt = Δp = m(v − u). The area under a force–time graph equals the impulse. A longer contact time for the same change in momentum means a smaller average force, which is why airbags and crumple zones work.</p>
<h3>Conservation of linear momentum</h3>
<p>For a system with no resultant external force, the total momentum before an event equals the total momentum after. In an <strong>elastic</strong> collision momentum and kinetic energy are both conserved. In an <strong>inelastic</strong> collision only momentum is conserved. In a collision where the bodies stick together, the kinetic energy lost is greatest.</p>
<p><strong>Worked example:</strong> a 0.5 kg trolley moving at 4 m s⁻¹ hits a stationary 1.0 kg trolley and they stick together. Total momentum before = 0.5 × 4 = 2.0 kg m s⁻¹. Common velocity = 2.0 / 1.5 ≈ 1.3 m s⁻¹.</p>
<p><strong>Exam tips:</strong> choose a positive direction and keep signs consistent in every momentum term. State that the system is isolated before applying conservation. For a recoil question, the two momenta are equal and opposite.</p>$n$
WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'dynamics');

WITH tp AS (SELECT id FROM topics WHERE slug = 'dynamics'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A resultant force of 10 N acts on a 2.0 kg object. What is its acceleration?$q1$, $o1$["0.2 m s⁻²","5 m s⁻²","12 m s⁻²","20 m s⁻²"]$o1$, 1, $e1$From F = ma, a = F / m = 10 / 2.0 = 5 m s⁻², in the direction of the resultant force.$e1$, 100, '3.1'),
 ($q2$What is the weight of a 5.0 kg mass on the Earth's surface, taking g = 9.81 m s⁻²?$q2$, $o2$["0.51 N","5.0 N","9.81 N","49 N"]$o2$, 3, $e2$Weight W = mg = 5.0 × 9.81 ≈ 49 N. Weight is a force, so it is measured in newtons, not kilograms.$e2$, 101, '3.1'),
 ($q3$A table pushes a book upwards with a normal contact force. Which force is its Newton's third law pair?$q3$, $o3$["The Earth pulls the book down (weight)","The book pushes the table down","The table pulls the book down","The Earth pulls the table up"]$o3$, 1, $e3$The pair must be the same type of force (contact), equal and opposite, and act on different bodies. The book pushing the table down is that pair. Weight is not, because it is the gravitational pull between the book and the Earth.$e3$, 102, '3.1'),
 ($q4$A 0.50 kg trolley moving at 4.0 m s⁻¹ collides with and sticks to a stationary 1.0 kg trolley. What is their common velocity after the collision?$q4$, $o4$["2.0 m s⁻¹","1.3 m s⁻¹","4.0 m s⁻¹","0.67 m s⁻¹"]$o4$, 1, $e4$Momentum is conserved: 0.50 × 4.0 = (0.50 + 1.0) v, so v = 2.0 / 1.5 ≈ 1.3 m s⁻¹.$e4$, 103, '3.3'),
 ($q5$A 3.0 kg rifle fires a 0.010 kg bullet at 400 m s⁻¹. What is the recoil velocity of the rifle?$q5$, $o5$["0.013 m s⁻¹ backwards","1.3 m s⁻¹ forwards","1.3 m s⁻¹ backwards","40 m s⁻¹ backwards"]$o5$, 2, $e5$Total momentum is zero before firing. 0.010 × 400 = 3.0 × v, so v = 1.33 m s⁻¹. The rifle recoils in the opposite direction to the bullet.$e5$, 104, '3.3'),
 ($q6$In an inelastic collision, which quantities are conserved?$q6$, $o6$["Kinetic energy only","Neither momentum nor kinetic energy","Momentum only","Both momentum and kinetic energy"]$o6$, 2, $e6$Linear momentum is conserved in every collision with no resultant external force. Kinetic energy is not conserved in an inelastic collision, since some is transferred to heat, sound or deformation.$e6$, 105, '3.3')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE slug = 'dynamics'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Dynamics', 'Recall Newton''s laws, momentum, impulse and collision rules.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Newton's second law$f1$, $b1$F = ma for the resultant force; acceleration is in the same direction as the resultant force$b1$, 0),
 ($f2$Newton's third law$f2$, $b2$Equal and opposite forces of the same type, acting on different bodies$b2$, 1),
 ($f3$Momentum$f3$, $b3$p = mv (vector, kg m s⁻¹)$b3$, 2),
 ($f4$Impulse$f4$, $b4$FΔt = Δp = m(v − u)$b4$, 3),
 ($f5$Principle of conservation of linear momentum$f5$, $b5$Total momentum before = total momentum after, when there is no resultant external force$b5$, 4),
 ($f6$Elastic collision$f6$, $b6$Momentum and kinetic energy are both conserved$b6$, 5)
) v(f, b, so);
