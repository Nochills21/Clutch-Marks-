UPDATE study_materials SET content = $n$<h2>Magnetic Fields and Electromagnetism</h2>
<h3>Magnetic flux density</h3>
<p>A magnetic field is a region where a magnetic force acts on a magnet, a current-carrying conductor or a moving charge. Its strength is the magnetic flux density B, measured in tesla (T). Field lines run from north to south outside a magnet and never cross.</p>
<h3>Force on a current-carrying conductor</h3>
<p>A conductor of length L carrying current I at right angles to a field B feels F = BIL. In general F = BIL sin θ, where θ is the angle between the conductor and the field. The force is zero when the conductor is parallel to the field.</p>
<p><strong>Fleming's left-hand rule:</strong> First finger = Field (from north to south), seCond finger = Current (conventional, positive to negative), thuMb = Motion (the force). Hold the hand so the three fingers are mutually perpendicular. Check the current direction: it is conventional current, from + to −, not electron flow.</p>
<p><strong>Example:</strong> a 0.25 m wire carrying 3.0 A at right angles to a 0.40 T field feels F = 0.40 × 3.0 × 0.25 = 0.30 N.</p>
<h3>Force on a moving charge</h3>
<p>A charge Q moving with speed v at right angles to B feels F = BQv. The force is always perpendicular to the velocity, so the speed does not change, only the direction. In a uniform field the charge follows a circular path of radius r = mv/BQ. The period T = 2πm/BQ does not depend on the speed.</p>
<p><strong>Velocity selector:</strong> crossed electric and magnetic fields give undeflected motion when qE = qvB, so v = E/B.</p>
<h3>Magnetic field due to a current</h3>
<p>A long straight wire gives B = μ₀I/(2πd), with μ₀ = 4π × 10⁻⁷ T m A⁻¹. Inside a long solenoid of n turns per metre, B = μ₀nI. The field is uniform inside the solenoid and weak outside it.</p>
<h3>Electromagnetic induction</h3>
<p>Magnetic flux is Φ = BA cos θ, measured in weber (Wb). Faraday's law states that the induced e.m.f. equals the rate of change of flux linkage: ε = −N ΔΦ/Δt. Lenz's law gives the direction: the induced e.m.f. opposes the change that produces it. This is the energy conservation principle, which is why the minus sign appears.</p>
<p><strong>Example:</strong> a 200-turn coil whose flux changes by 2.0 mWb in 0.10 s has a mean e.m.f. of 4.0 V.</p>
<h3>Alternating currents</h3>
<p>For a sinusoidal current, the root-mean-square value is I_rms = I₀/√2, and similarly V_rms = V₀/√2. The mean power is P = I_rms²R = V_rms²/R, and it is the rms value that equals the d.c. value for the same heating effect.</p>
<h3>Rectification and smoothing</h3>
<p>A diode passes current in one direction only. A half-wave rectifier gives pulses for half of each cycle. A full-wave bridge rectifier uses all of the input, so its output frequency is twice the input frequency. A smoothing capacitor across the output charges at each peak and discharges between peaks, reducing the ripple.</p>
<p><strong>Exam tips:</strong> use the rms value for power calculations, not the peak. For Lenz's law, always state the opposing effect in words. Show the angle when the field is not perpendicular to the wire.</p>$n$
WHERE material_type = 'notes' AND topic_id = '98dfbd94-3f76-4fa5-8e2e-c72c0c9a154a';

WITH tp AS (SELECT id FROM topics WHERE id = '98dfbd94-3f76-4fa5-8e2e-c72c0c9a154a'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A 0.25 m straight wire carries a current of 3.0 A at right angles to a uniform magnetic field of flux density 0.40 T. What is the force on the wire?$q1$, $o1$["0.030 N","0.30 N","3.3 N","1.2 N"]$o1$, 1, $e1$F = BIL = 0.40 × 3.0 × 0.25 = 0.30 N.$e1$, 100, '20.2'),
 ($q2$A proton (charge 1.6 × 10⁻¹⁹ C) moves at 2.0 × 10⁵ m s⁻¹ at right angles to a magnetic field of flux density 0.50 T. What is the magnetic force on it?$q2$, $o2$["1.6 × 10⁻¹⁴ N","1.6 × 10⁻¹⁹ N","6.4 × 10⁻¹⁴ N","8.0 × 10⁻¹⁴ N"]$o2$, 0, $e2$F = BQv = 0.50 × 1.6 × 10⁻¹⁹ × 2.0 × 10⁵ = 1.6 × 10⁻¹⁴ N.$e2$, 101, '20.3'),
 ($q3$What is the flux density 0.010 m from a long straight wire carrying a current of 2.0 A?$q3$, $o3$["4.0 × 10⁻⁵ T","4.0 × 10⁻⁷ T","2.0 × 10⁻⁵ T","1.3 × 10⁻⁴ T"]$o3$, 0, $e3$B = μ₀I/(2πd) = (4π × 10⁻⁷ × 2.0)/(2π × 0.010) = 4.0 × 10⁻⁵ T.$e3$, 102, '20.4'),
 ($q4$Which statement about the induced e.m.f. in electromagnetic induction is correct?$q4$, $o4$["The induced e.m.f. aids the change that produces it","The induced e.m.f. is independent of the rate of change of flux","The induced e.m.f. opposes the change that produces it","The induced current always flows in the direction that increases the flux"]$o4$, 2, $e4$This is Lenz's law. The induced e.m.f. opposes the change producing it, which is the energy conservation principle behind the minus sign in Faraday's law.$e4$, 103, '20.5'),
 ($q5$The peak voltage of a sinusoidal mains supply is 325 V. What is its root-mean-square voltage?$q5$, $o5$["325 V","460 V","230 V","163 V"]$o5$, 2, $e5$V_rms = V₀/√2 = 325/√2 ≈ 230 V.$e5$, 104, '21.1'),
 ($q6$What is the effect of adding a smoothing capacitor across the output of a rectifier?$q6$, $o6$["It increases the frequency of the output","It converts the d.c. output into a.c.","It reduces the ripple by storing charge between the peaks","It halves the average output voltage"]$o6$, 2, $e6$The capacitor charges at each peak and discharges between peaks, so the output varies less. This reduces the ripple but does not change the frequency or make the output a.c.$e6$, 105, '21.2')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE id = '98dfbd94-3f76-4fa5-8e2e-c72c0c9a154a'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Magnetic fields and electromagnetism', 'Recall the force laws, Lenz''s law and rectification.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Force on a current-carrying conductor$f1$, $b1$F = BIL sin θ$b1$, 0),
 ($f2$Fleming's left-hand rule$f2$, $b2$First finger = Field, seCond finger = Current, thuMb = Motion (force)$b2$, 1),
 ($f3$Force on a moving charge$f3$, $b3$F = BQv sin θ, perpendicular to the velocity$b3$, 2),
 ($f4$Flux density of a long straight wire$f4$, $b4$B = μ₀I/(2πd)$b4$, 3),
 ($f5$Lenz's law$f5$, $b5$The induced e.m.f. opposes the change producing it$b5$, 4),
 ($f6$rms value of a sinusoidal voltage$f6$, $b6$V_rms = V₀/√2$b6$, 5)
) v(f, b, so);
