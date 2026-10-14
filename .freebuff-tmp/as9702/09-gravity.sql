UPDATE study_materials SET content = $n$<h2>Motion in a circle and gravity</h2>
<h3>Circular motion</h3>
<ul>
<li>A body moving in a circle at constant speed has a centripetal acceleration of v²/r, directed towards the centre.</li>
<li>The centripetal force is F = mv²/r = mω²r, and it is provided by a real force such as tension, friction or gravity. It does no work on the body, because it is always perpendicular to the velocity.</li>
</ul>
<h3>Gravitational field</h3>
<p>The gravitational field strength at a point is the force per unit mass placed at that point: g = F/m. Unit: N kg⁻¹. Field lines point towards the mass that creates the field.</p>
<h3>Newton's law of gravitation</h3>
<p>F = GMm/r², where r is measured from the centre of each point mass. Doubling the separation reduces the force to one quarter.</p>
<h3>Gravitational field of a point mass</h3>
<p>g = GM/r². Outside a uniform sphere, its field is the same as that of a point mass at its centre.</p>
<h3>Gravitational potential</h3>
<p>Gravitational potential at a point is the work done per unit mass in bringing a small mass from infinity to that point. It is always negative, is zero at infinity, and becomes more negative closer to the mass: V = −GM/r. Gravitational potential energy of a mass m is Ep = mV.</p>
<p><strong>Worked example:</strong> a 2.0 kg object moves in a circle of radius 0.50 m at 3.0 m s⁻¹. The centripetal force is F = mv²/r = (2.0 × 3.0²) ÷ 0.50 = 36 N.</p>
<p><strong>Exam tips:</strong> use r as the distance from the centre, not the surface. State that gravitational potential is negative and rises to zero at infinity. Field strength and potential are different quantities: do not mix their units.</p>$n$
WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'motion-in-a-circle-and-gravity');

WITH tp AS (SELECT id FROM topics WHERE slug = 'motion-in-a-circle-and-gravity'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A 2.0 kg object moves in a circle of radius 0.50 m at a constant speed of 3.0 m s⁻¹. What is the centripetal force on it?$q1$, $o1$["12 N","36 N","6.0 N","18 N"]$o1$, 1, $e1$F = mv²/r = (2.0 × 3.0²) ÷ 0.50 = 36 N, directed towards the centre of the circle.$e1$, 100, '13.1'),
 ($q2$Two point masses are initially a distance r apart. The distance between them is doubled. How does the gravitational force between them change?$q2$, $o2$["It is halved","It is quartered","It is doubled","It is unchanged"]$o2$, 1, $e2$F = GMm/r². If r is doubled, r² increases by a factor of 4, so F falls to one quarter.$e2$, 101, '13.2'),
 ($q3$What is gravitational field strength?$q3$, $o3$["Force per unit mass, in N kg⁻¹","Force per unit volume","Energy per unit mass, in J kg⁻¹","Force per unit charge"]$o3$, 0, $e3$Gravitational field strength at a point is the gravitational force per unit mass placed at that point, measured in N kg⁻¹.$e3$, 102, '13.1'),
 ($q4$Which statement about gravitational potential is correct?$q4$, $o4$["Gravitational potential is always positive","Gravitational potential is zero at infinity and negative elsewhere","Gravitational potential is greatest at the surface of the body","Gravitational potential energy is always positive"]$o4$, 1, $e4$Gravitational potential is defined as zero at infinity and is negative at all finite distances from the mass, since work must be done against gravity to move a mass away from it.$e4$, 103, '13.4'),
 ($q5$Which statement about gravitational field lines is correct?$q5$, $o5$["Field lines point away from the mass","Field lines are directed towards the mass","Field lines are parallel to each other everywhere","Field strength is zero at the surface of the mass"]$o5$, 1, $e5$Gravity is always attractive, so the field lines are directed towards the mass that creates the field.$e5$, 104, '13.1'),
 ($q6$A planet has its gravitational field strength at the surface equal to g. What is the field strength at a distance of twice the planet's radius from its centre?$q6$, $o6$["g/2","g/4","g/8","2g"]$o6$, 1, $e6$g = GM/r². At distance 2R, the field is GM/(2R)² = GM/4R² = g/4.$e6$, 105, '13.3')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE slug = 'motion-in-a-circle-and-gravity'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Motion in a circle and gravity', 'Recall centripetal force, Newton''s law of gravitation, field strength and gravitational potential.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Centripetal force$f1$, $b1$F = mv²/r = mω²r, directed towards the centre of the circle$b1$, 0),
 ($f2$Gravitational field strength$f2$, $b2$g = F/m; unit N kg⁻¹$b2$, 1),
 ($f3$Newton's law of gravitation$f3$, $b3$F = GMm/r², with r measured from the centre of each mass$b3$, 2),
 ($f4$Field strength of a point mass$f4$, $b4$g = GM/r²$b4$, 3),
 ($f5$Gravitational potential$f5$, $b5$V = −GM/r; zero at infinity, negative at finite distances$b5$, 4),
 ($f6$Gravitational potential energy$f6$, $b6$Ep = mV$b6$, 5)
) v(f, b, so);
