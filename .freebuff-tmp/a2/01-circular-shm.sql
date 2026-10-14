UPDATE study_materials SET content = $n$<h2>Circular Motion and SHM</h2>
<h3>Uniform circular motion</h3>
<p>A particle moving in a circle of radius r at constant speed has a constantly changing velocity, because its direction changes. Angular speed ω is the rate of change of angle in radians per second: ω = 2π/T = 2πf. The linear speed is v = ωr.</p>
<h3>Centripetal acceleration and force</h3>
<p>The acceleration is directed towards the centre: a = v²/r = ω²r. The resultant force providing it is F = mv²/r = mω²r, also towards the centre. This force does no work, because it is always perpendicular to the velocity, so the kinetic energy stays constant.</p>
<p><strong>Example:</strong> a particle on a 0.40 m radius with T = 2.0 s has ω = π rad s⁻¹, v = 1.26 m s⁻¹ and a = π² × 0.40 ≈ 3.9 m s⁻².</p>
<h3>Simple harmonic motion as projected circular motion</h3>
<p>The displacement of a point moving on a circle, projected onto a diameter, is x = x₀ sin ωt (or cos ωt). Its acceleration is a = −ω²x, always opposite to the displacement, so the defining condition for SHM is that acceleration is proportional to and opposite to displacement.</p>
<p>Solutions: x = x₀ sin ωt starts at the centre; x = x₀ cos ωt starts at an extreme. Time period T = 2π/ω.</p>
<p><strong>Velocity and acceleration:</strong></p>
<ul>
<li>v = ±ω√(x₀² − x²); v_max = ωx₀ at the centre</li>
<li>a_max = ω²x₀ at the extremes; a = 0 at the centre</li>
</ul>
<p><strong>Example:</strong> a pendulum with x₀ = 0.02 m and f = 0.5 Hz has a_max = (2π × 0.5)² × 0.02 ≈ 0.20 m s⁻².</p>
<h3>Energy in SHM</h3>
<p>The total energy is E = ½mω²x₀², constant. It is exchanged between kinetic energy (maximum at the centre) and potential energy (maximum at the extremes). Kinetic energy is at a maximum when displacement is zero, not when acceleration is largest.</p>
<h3>Damping and resonance</h3>
<p>Damping removes energy from the oscillator. Light damping gives slow decay of amplitude; critical damping returns the system to equilibrium in the shortest time without oscillating; heavy damping is slower still. A system driven at its natural frequency resonates, giving maximum amplitude (playground swings, microwave ovens, bridges that must avoid the wind frequency).</p>
<p><strong>Exam tips:</strong> quote a = −ω²x as the defining condition in SHM questions. Time-period questions often need only T = 2π/ω. State which energy is at a maximum and where.</p>$n$
WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'circular-motion-and-shm');

WITH tp AS (SELECT id FROM topics WHERE slug = 'circular-motion-and-shm'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A particle moves in a circle of radius 0.40 m with a period of 2.0 s. What is its angular speed?$q1$, $o1$["2π rad s⁻¹","0.5 rad s⁻¹","π rad s⁻¹","4π rad s⁻¹"]$o1$, 2, $e1$ω = 2π/T = 2π/2.0 = π rad s⁻¹.$e1$, 100, '12.1'),
 ($q2$For the particle in the previous question, what is its linear speed?$q2$, $o2$["0.80 m s⁻¹","1.26 m s⁻¹","2.51 m s⁻¹","0.13 m s⁻¹"]$o2$, 1, $e2$v = ωr = π × 0.40 ≈ 1.26 m s⁻¹.$e2$, 101, '12.1'),
 ($q3$A particle moves in a circle of radius 0.40 m with angular speed π rad s⁻¹. What is its centripetal acceleration?$q3$, $o3$["7.9 m s⁻²","1.6 m s⁻²","0.20 m s⁻²","3.9 m s⁻²"]$o3$, 3, $e3$a = ω²r = π² × 0.40 ≈ 3.9 m s⁻², directed towards the centre.$e3$, 102, '12.2'),
 ($q4$Which statement about the resultant force in uniform circular motion is correct?$q4$, $o4$["It acts tangentially to the path and does work on the particle","It is directed towards the centre and does no work","It is equal to a centrifugal force acting outwards","It increases the kinetic energy of the particle"]$o4$, 1, $e4$The resultant force is centripetal, directed towards the centre. It is always perpendicular to the velocity, so it does no work and the speed stays constant.$e4$, 103, '12.2'),
 ($q5$A car of mass 1200 kg rounds a bend of radius 50 m at 15 m s⁻¹. What friction force provides the centripetal force?$q5$, $o5$["90 N","5.4 kN","270 N","0.36 kN"]$o5$, 1, $e5$F = mv²/r = 1200 × 15² / 50 = 5400 N = 5.4 kN.$e5$, 104, '12.2'),
 ($q6$A wheel makes 300 revolutions per minute. What is the angular speed of a point on its rim?$q6$, $o6$["300 rad s⁻¹","5.0 rad s⁻¹","31.4 rad s⁻¹","0.20 rad s⁻¹"]$o6$, 2, $e6$f = 300/60 = 5.0 Hz, so ω = 2πf = 2π × 5.0 ≈ 31.4 rad s⁻¹.$e6$, 105, '12.1')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE slug = 'circular-motion-and-shm'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Circular motion and SHM', 'Recall angular speed, centripetal force and the SHM condition.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Angular speed$f1$, $b1$ω = 2π/T = 2πf, in rad s⁻¹$b1$, 0),
 ($f2$Centripetal acceleration$f2$, $b2$a = v²/r = ω²r, directed towards the centre$b2$, 1),
 ($f3$Centripetal force does work?$f3$, $b3$No: it is always perpendicular to the velocity, so the kinetic energy is constant$b3$, 2),
 ($f4$SHM defining condition$f4$, $b4$Acceleration is proportional to displacement and opposite in direction: a = −ω²x$b4$, 3),
 ($f5$Where is kinetic energy maximum in SHM?$f5$, $b5$At the centre (equilibrium position), where displacement is zero$b5$, 4),
 ($f6$Resonance$f6$, $b6$Maximum amplitude when the driving frequency equals the natural frequency$b6$, 5)
) v(f, b, so);
