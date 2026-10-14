UPDATE study_materials SET content = $n$<h2>Forces and equilibrium</h2>
<h3>Moment of a force</h3>
<ul>
<li>The moment of a force about a point is the force multiplied by the perpendicular distance from the point to the line of action of the force: moment = F × d⊥. Unit: N m.</li>
<li>Only the perpendicular component of the force produces a turning effect. A force that passes through the pivot has zero moment.</li>
</ul>
<h3>Principle of moments</h3>
<p>For a body in equilibrium the sum of the clockwise moments about any point equals the sum of the anticlockwise moments about that point.</p>
<h3>Couples</h3>
<p>A couple is two equal and opposite parallel forces whose lines of action do not coincide. It produces a turning effect without a resultant force. The moment of a couple is F × d, where d is the perpendicular separation, and it is the same about every point.</p>
<h3>Conditions for equilibrium</h3>
<ul>
<li>The resultant force in every direction is zero.</li>
<li>The resultant moment about any point is zero.</li>
</ul>
<p>For three coplanar, non-parallel forces in equilibrium, the lines of action must meet at a single point.</p>
<h3>Centre of gravity</h3>
<p>The centre of gravity is the point through which the weight of a body appears to act. For a uniform symmetrical body it lies at the geometric centre.</p>
<p><strong>Worked example:</strong> a uniform beam of weight 100 N rests horizontally on two supports at its ends. Each support carries half the weight, 50 N, because the beam is symmetrical and in equilibrium.</p>
<p><strong>Exam tips:</strong> state the pivot you take moments about. Draw the perpendicular distance, not the slant distance. Show that the resultant force is zero in each direction before you use the principle of moments.</p>$n$
WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'forces-and-equilibrium');

WITH tp AS (SELECT id FROM topics WHERE slug = 'forces-and-equilibrium'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A 20 N force acts on a spanner at a perpendicular distance of 0.30 m from the bolt. What is the moment of the force about the bolt?$q1$, $o1$["6.0 N m","0.67 N m","60 N m","20.3 N m"]$o1$, 0, $e1$Moment = F × d⊥ = 20 × 0.30 = 6.0 N m.$e1$, 100, '4.1'),
 ($q2$A 30 N weight hangs 0.40 m from a pivot on a balanced beam. At what distance on the other side must a 60 N weight hang to balance it?$q2$, $o2$["0.20 m","0.80 m","0.40 m","0.05 m"]$o2$, 0, $e2$Principle of moments: 30 × 0.40 = 60 × d, so d = 12 / 60 = 0.20 m.$e2$, 101, '4.1'),
 ($q3$Which statement is correct about a body in equilibrium under three coplanar, non-parallel forces?$q3$, $o3$["The three forces must be equal in magnitude","The lines of action of the three forces must meet at a single point","The sum of the magnitudes of the forces must be zero","The forces must all act through the centre of mass"]$o3$, 1, $e3$For three non-parallel coplanar forces to be in equilibrium, their lines of action must be concurrent. The forces need not be equal, and magnitudes are added as vectors, not as scalars.$e3$, 102, '4.2'),
 ($q4$A 3.0 N force acts due east and a 4.0 N force acts due north on the same particle. What is the magnitude of the resultant force?$q4$, $o4$["7.0 N","1.0 N","5.0 N","3.5 N"]$o4$, 2, $e4$The forces are perpendicular, so the resultant is √(3.0² + 4.0²) = √25 = 5.0 N.$e4$, 103, '4.2'),
 ($q5$Two equal and opposite parallel forces of 5.0 N act on a body with a perpendicular separation of 0.20 m. What is the moment of this couple?$q5$, $o5$["0 N m (the forces cancel)","1.0 N m","2.5 N m","10 N m"]$o5$, 1, $e5$The moment of a couple is F × d = 5.0 × 0.20 = 1.0 N m. The forces do not cancel because they do not act along the same line; their turning effects add.$e5$, 104, '4.1'),
 ($q6$A uniform beam of weight 100 N rests horizontally on two supports, one at each end. What is the reaction force at each support?$q6$, $o6$["25 N","50 N","100 N","200 N"]$o6$, 1, $e6$The beam is in equilibrium, so the two upward reactions total 100 N. The beam is uniform and symmetrical, so the weight acts at its centre and the reactions are equal: 50 N each.$e6$, 105, '4.2')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE slug = 'forces-and-equilibrium'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Forces and equilibrium', 'Recall moments, couples and the conditions for equilibrium.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Moment of a force$f1$, $b1$Force × perpendicular distance from the pivot to the line of action (N m)$b1$, 0),
 ($f2$Principle of moments$f2$, $b2$For a body in equilibrium, the total clockwise moment equals the total anticlockwise moment about any point$b2$, 1),
 ($f3$Couple$f3$, $b3$Two equal and opposite parallel forces with different lines of action; moment = F × d, the same about every point$b3$, 2),
 ($f4$Conditions for equilibrium$f4$, $b4$Zero resultant force in every direction and zero resultant moment about any point$b4$, 3),
 ($f5$Three forces in equilibrium$f5$, $b5$Non-parallel coplanar forces: their lines of action meet at one point$b5$, 4),
 ($f6$Centre of gravity$f6$, $b6$The point through which the weight of a body appears to act$b6$, 5)
) v(f, b, so);
