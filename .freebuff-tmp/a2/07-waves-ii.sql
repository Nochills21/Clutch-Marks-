UPDATE study_materials SET content = $n$<h2>Oscillations and Waves II</h2>
<h3>Simple harmonic motion (17.1)</h3>
<p>A body oscillates with simple harmonic motion when its acceleration is proportional to its displacement x and directed towards the equilibrium position: a = −ω²x. The angular frequency is ω = 2πf, and the displacement is x = x₀ sin ωt, where x₀ is the amplitude.</p>
<p>The velocity is v = ±ω√(x₀² − x²), and the maximum acceleration is a₀ = ω²x₀. Velocity is zero at the extremes and maximum at equilibrium. Acceleration is maximum at the extremes and zero at equilibrium.</p>
<p><strong>Example:</strong> amplitude 0.030 m and frequency 2.0 Hz give a₀ = (2π × 2.0)² × 0.030 ≈ 4.7 m s⁻².</p>
<h3>Energy in SHM (17.2)</h3>
<p>Kinetic energy is greatest at the equilibrium position, where speed is greatest. Potential energy is greatest at the extremes. The total energy is constant: E = ½mω²x₀², and it is shared between kinetic and potential energy as the body oscillates.</p>
<p><strong>Example:</strong> a 0.20 kg mass with ω = 10 rad s⁻¹ and x₀ = 0.050 m has E = ½ × 0.20 × 10² × 0.050² = 0.025 J.</p>
<h3>Damping, forced oscillations and resonance (17.3)</h3>
<p>Damping removes energy from an oscillator. Light damping gives decaying oscillations. Critical damping returns the system to equilibrium in the shortest time without oscillating. Heavy damping is also non-oscillatory but slower.</p>
<p>A forced oscillator is driven by a periodic force. When the driving frequency equals the natural frequency, the amplitude is at its maximum, which is resonance. Greater damping lowers the peak and broadens the resonance curve.</p>
<p><strong>Exam tips:</strong> state which quantity is maximum or zero at each point of the cycle. For resonance, always name the driving frequency relative to the natural frequency.</p>
<h2>Waves: the superposition ideas</h2>
<h3>Progressive vs Stationary</h3>
<p>Progressive waves transfer energy; stationary waves store it in loops. Stationary patterns arise from two identical waves travelling in opposite directions (reflections on strings, air columns).</p>
<table border="1" cellpadding="6">
<tr><th>Property</th><th>Progressive</th><th>Stationary</th></tr>
<tr><td>Amplitude</td><td>same for all points</td><td>varies: nodes zero, antinodes max</td></tr>
<tr><td>Phase</td><td>varies along wave</td><td>same within a loop, π flip across nodes</td></tr>
<tr><td>Energy</td><td>transferred</td><td>trapped</td></tr>
</table>
<h3>Harmonics</h3>
<p>A string fixed at both ends: f₁ = v/2L, then 2f₁, 3f₁… Closed pipes resonate at odd multiples; open pipes at all multiples.</p>
<h3>Superposition Applications</h3>
<ul>
<li>Young's double slit: x = λD/a — evidence light is a wave</li>
<li>Diffraction grating: d sin θ = nλ — resolution of spectra</li>
<li>Noise-cancelling headphones: destructive interference of antiphase sound</li>
</ul>
<h3>Polarization Applications</h3>
<p>Polaroid sunglasses cut glare from horizontal surfaces; stress analysis in plastics; LCD screens control light with twisted polarizers. Malus' law I = I₀cos²θ.</p>
<p><strong>Exam tips:</strong> 'explain' marks want the physics: path difference, phase, node/antinode conditions — not just formula substitution.</p>$n$
WHERE material_type = 'notes' AND topic_id = '1b6d51a7-a379-4b4a-9d3b-b461c1cf291a';

WITH tp AS (SELECT id FROM topics WHERE id = '1b6d51a7-a379-4b4a-9d3b-b461c1cf291a'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A particle in simple harmonic motion has an amplitude of 0.030 m and a frequency of 2.0 Hz. What is its maximum acceleration?$q1$, $o1$["0.38 m s⁻²","4.7 m s⁻²","0.24 m s⁻²","9.5 m s⁻²"]$o1$, 1, $e1$a₀ = ω²x₀ = (2π × 2.0)² × 0.030 ≈ 4.7 m s⁻².$e1$, 100, '17.1'),
 ($q2$Which statement describes the acceleration of a body in simple harmonic motion?$q2$, $o2$["Constant and in the direction of motion","Proportional to its displacement and directed towards the equilibrium position","Proportional to its velocity","Zero at the extremes of the motion"]$o2$, 1, $e2$SHM requires a = −ω²x: the acceleration is proportional to the displacement and always points towards equilibrium.$e2$, 101, '17.1'),
 ($q3$Where is the kinetic energy of a body in simple harmonic motion greatest?$q3$, $o3$["At the extremes, where the displacement is greatest","At the equilibrium position","At half the amplitude","It is the same everywhere"]$o3$, 1, $e3$Speed is greatest at equilibrium, so kinetic energy is greatest there. At the extremes the speed is zero and all the energy is potential.$e3$, 102, '17.2'),
 ($q4$A 0.20 kg mass oscillates with ω = 10 rad s⁻¹ and amplitude 0.050 m. What is its total energy?$q4$, $o4$["0.025 J","0.25 J","0.0050 J","0.10 J"]$o4$, 0, $e4$E = ½mω²x₀² = ½ × 0.20 × 10² × 0.050² = 0.025 J.$e4$, 103, '17.2'),
 ($q5$Which damping condition returns a system to equilibrium in the shortest time without oscillating?$q5$, $o5$["Light damping","Critical damping","Heavy damping","No damping"]$o5$, 1, $e5$Critical damping gives the fastest return to equilibrium with no overshoot. Heavy damping also avoids oscillation but is slower.$e5$, 104, '17.3'),
 ($q6$A system is driven at a frequency equal to its natural frequency. What happens to the amplitude?$q6$, $o6$["It is at a minimum","It is at a maximum, which is resonance","It becomes zero","The damping is removed"]$o6$, 1, $e6$When the driving frequency equals the natural frequency, energy is transferred most efficiently and the amplitude is at its maximum. This is resonance.$e6$, 105, '17.3')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE id = '1b6d51a7-a379-4b4a-9d3b-b461c1cf291a'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Oscillations and waves II', 'Recall SHM, energy and resonance.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$SHM condition$f1$, $b1$Acceleration proportional to displacement and directed towards equilibrium: a = −ω²x$b1$, 0),
 ($f2$Maximum acceleration in SHM$f2$, $b2$a₀ = ω²x₀$b2$, 1),
 ($f3$Where kinetic energy is greatest$f3$, $b3$At the equilibrium position, where speed is greatest$b3$, 2),
 ($f4$Total energy in SHM$f4$, $b4$E = ½mω²x₀²$b4$, 3),
 ($f5$Critical damping$f5$, $b5$Returns to equilibrium in the shortest time without oscillating$b5$, 4),
 ($f6$Resonance$f6$, $b6$Amplitude is maximum when the driving frequency equals the natural frequency$b6$, 5)
) v(f, b, so);
