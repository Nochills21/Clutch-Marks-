UPDATE study_materials SET content = $n$<h2>Work, energy and power</h2>
<h3>Work</h3>
<ul>
<li>Work done = force × displacement in the direction of the force, W = Fs cos θ. Unit: joule (J), where 1 J = 1 N m.</li>
<li>No work is done by a force that acts perpendicular to the displacement, such as the normal contact force on a body moving along a horizontal surface.</li>
</ul>
<h3>Energy stores and transfers</h3>
<p>Gravitational potential energy, kinetic energy, elastic potential energy, chemical energy and thermal energy are energy stores. Work done transfers energy from one store to another.</p>
<h3>Conservation of energy</h3>
<p>Energy cannot be created or destroyed, only transferred. Where only conservative forces such as gravity act, the total mechanical energy is constant. Where non-conservative forces such as friction or air resistance act, the energy they dissipate appears as thermal energy.</p>
<h3>Kinetic and gravitational potential energy</h3>
<ul>
<li>Kinetic energy: Ek = ½mv².</li>
<li>Gravitational potential energy change near the Earth's surface: ΔEp = mgΔh.</li>
</ul>
<h3>Power and efficiency</h3>
<ul>
<li>Power = work done ÷ time = energy transferred ÷ time. Unit: watt (W), where 1 W = 1 J s⁻¹.</li>
<li>Efficiency = useful energy output ÷ total energy input × 100%. It is always less than 100%.</li>
</ul>
<p><strong>Worked example:</strong> a 2.0 kg object falls freely from rest through 5.0 m. Its speed at the bottom, from energy conservation: ½mv² = mgh, so v = √(2gh) = √(2 × 9.81 × 5.0) ≈ 9.9 m s⁻¹.</p>
<p><strong>Exam tips:</strong> check whether the question says air resistance is negligible before using conservation of energy. Always convert minutes to seconds in power calculations. Give efficiency as a percentage.</p>$n$
WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'work-energy-and-power');

WITH tp AS (SELECT id FROM topics WHERE slug = 'work-energy-and-power'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A 2.0 kg object moves at 3.0 m s⁻¹. What is its kinetic energy?$q1$, $o1$["3.0 J","6.0 J","9.0 J","18 J"]$o1$, 2, $e1$Ek = ½mv² = ½ × 2.0 × 3.0² = 9.0 J.$e1$, 100, '5.2'),
 ($q2$A 5.0 kg mass is raised vertically through 4.0 m. What is the increase in its gravitational potential energy? Take g = 9.81 m s⁻².$q2$, $o2$["20 J","49 J","196 J","392 J"]$o2$, 2, $e2$ΔEp = mgΔh = 5.0 × 9.81 × 4.0 = 196 J.$e2$, 101, '5.2'),
 ($q3$A motor does 600 J of work in 20 s. What is its power output?$q3$, $o3$["12 000 W","30 W","0.033 W","620 W"]$o3$, 1, $e3$Power = work ÷ time = 600 ÷ 20 = 30 W.$e3$, 102, '5.1'),
 ($q4$A device receives 500 J of energy and delivers 350 J as useful output. What is its efficiency?$q4$, $o4$["35%","70%","143%","30%"]$o4$, 1, $e4$Efficiency = useful output ÷ input × 100% = 350 ÷ 500 × 100% = 70%. The 150 J lost is transferred to thermal energy.$e4$, 103, '5.1'),
 ($q5$A ball is dropped from rest from a height of 5.0 m and air resistance is negligible. What is its speed just before it hits the ground? Take g = 9.81 m s⁻².$q5$, $o5$["5.0 m s⁻¹","9.9 m s⁻¹","49 m s⁻¹","98 m s⁻¹"]$o5$, 1, $e5$Loss of gravitational potential energy = gain of kinetic energy: mgh = ½mv², so v = √(2gh) = √(2 × 9.81 × 5.0) ≈ 9.9 m s⁻¹.$e5$, 104, '5.2'),
 ($q6$Which of the following forces is non-conservative?$q6$, $o6$["Gravitational force","Electrostatic force","Air resistance","Spring (elastic) force"]$o6$, 2, $e6$A conservative force does the same work regardless of the path, and the energy it stores can be recovered. Air resistance and friction are non-conservative because the energy they remove becomes thermal energy and cannot be fully recovered.$e6$, 105, '5.1')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE slug = 'work-energy-and-power'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Work, energy and power', 'Recall work, energy stores, conservation of energy, power and efficiency.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Work done$f1$, $b1$Force × displacement in the direction of the force; unit J (1 J = 1 N m)$b1$, 0),
 ($f2$Kinetic energy$f2$, $b2$Ek = ½mv²$b2$, 1),
 ($f3$Change in gravitational potential energy$f3$, $b3$ΔEp = mgΔh near the Earth's surface$b3$, 2),
 ($f4$Power$f4$, $b4$Work done ÷ time (or energy transferred ÷ time); unit W = J s⁻¹$b4$, 3),
 ($f5$Efficiency$f5$, $b5$Useful energy output ÷ total energy input × 100%$b5$, 4),
 ($f6$Principle of conservation of energy$f6$, $b6$Energy cannot be created or destroyed, only transferred or dissipated$b6$, 5)
) v(f, b, so);
