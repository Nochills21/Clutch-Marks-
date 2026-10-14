UPDATE study_materials SET content = $n$<h2>Superposition</h2>
<h3>Principle of superposition</h3>
<p>When two or more waves meet at a point, the resultant displacement is the vector sum of the individual displacements. Constructive interference occurs where the waves are in phase; destructive interference occurs where they are in antiphase.</p>
<h3>Stationary waves</h3>
<ul>
<li>A stationary wave forms when two progressive waves of the same frequency, amplitude and wavelength travel in opposite directions and superpose.</li>
<li>Nodes are points of zero amplitude; antinodes are points of maximum amplitude. Adjacent nodes (or antinodes) are separated by λ/2.</li>
<li>On a string fixed at both ends, the fundamental frequency is f = v/(2L), so the wavelength is λ = 2L.</li>
</ul>
<h3>Interference</h3>
<p>For coherent sources (same frequency and a constant phase difference) with slit separation a and screen distance D, the fringe spacing is Δx = λD/a.</p>
<h3>Diffraction</h3>
<p>Diffraction is the spreading of a wave after it passes through a gap or round an edge. It is greatest when the gap width is comparable to the wavelength.</p>
<h3>Diffraction grating</h3>
<p>For a grating with slit spacing d, the angle θ of the nth-order maximum satisfies nλ = d sin θ. A grating with more lines per metre gives a smaller d and larger angles of diffraction.</p>
<p><strong>Worked example:</strong> light of wavelength 600 nm passes through two slits 0.30 mm apart, with a screen 1.5 m away. Fringe spacing Δx = λD/a = (600 × 10⁻⁹ × 1.5) ÷ (3.0 × 10⁻⁴) = 3.0 mm.</p>
<p><strong>Exam tips:</strong> convert nm and mm to metres before using Δx = λD/a. Check the order n when using a grating. Coherence is a requirement for interference, so state it.</p>$n$
WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'superposition');

WITH tp AS (SELECT id FROM topics WHERE slug = 'superposition'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$Light of wavelength 600 nm passes through two slits 0.30 mm apart. The screen is 1.5 m from the slits. What is the fringe spacing?$q1$, $o1$["0.30 mm","3.0 mm","30 mm","0.003 nm"]$o1$, 1, $e1$Δx = λD/a = (600 × 10⁻⁹ × 1.5) ÷ (0.30 × 10⁻³) = 3.0 × 10⁻³ m = 3.0 mm.$e1$, 100, '8.3'),
 ($q2$Light of wavelength 500 nm is incident normally on a grating with 600 lines per mm. What is the angle of the first-order maximum?$q2$, $o2$["sin θ = 0.30, so θ ≈ 17°","θ ≈ 3.0°","θ ≈ 30°","θ ≈ 60°"]$o2$, 0, $e2$The slit spacing is d = 1 ÷ 600 mm = 1.67 × 10⁻⁶ m. From nλ = d sin θ with n = 1: sin θ = 500 × 10⁻⁹ ÷ 1.67 × 10⁻⁶ = 0.30, so θ ≈ 17°.$e2$, 101, '8.4'),
 ($q3$What is the distance between two adjacent nodes in a stationary wave?$q3$, $o3$["One wavelength","Half a wavelength","A quarter of a wavelength","Twice the wavelength"]$o3$, 1, $e3$Nodes are separated by λ/2, with an antinode between each pair of adjacent nodes. The nodes are also spaced λ/2 apart from antinodes.$e3$, 102, '8.1'),
 ($q4$Which statement about diffraction is correct?$q4$, $o4$["Diffraction is greatest when the gap is much larger than the wavelength","Diffraction is greatest when the gap width is similar to the wavelength","Diffraction does not depend on the wavelength","Diffraction occurs only for transverse waves"]$o4$, 1, $e4$Diffraction spreads a wave noticeably when the gap is comparable to its wavelength. When the gap is much larger than the wavelength, the wave passes through with little spreading.$e4$, 103, '8.2'),
 ($q5$What is required for two sources to produce a stable interference pattern?$q5$, $o5$["Equal amplitudes only","The same frequency and a constant phase difference","Different frequencies and random phases","The same speed only"]$o5$, 1, $e5$Interference needs coherent sources: the same frequency, and a constant phase difference between them. Coherence is what makes the pattern stable over time.$e5$, 104, '8.3'),
 ($q6$A string of length 0.80 m is fixed at both ends. Waves travel along it at 320 m s⁻¹. What is the fundamental frequency of the stationary wave?$q6$, $o6$["100 Hz","200 Hz","400 Hz","800 Hz"]$o6$, 1, $e6$For the fundamental on a string fixed at both ends, λ = 2L = 1.6 m. f = v/λ = 320 ÷ 1.6 = 200 Hz.$e6$, 105, '8.1')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE slug = 'superposition'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Superposition', 'Recall stationary waves, diffraction, interference and the diffraction grating.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Principle of superposition$f1$, $b1$The resultant displacement is the vector sum of the individual displacements$b1$, 0),
 ($f2$Node$f2$, $b2$A point of zero amplitude in a stationary wave$b2$, 1),
 ($f3$Spacing of adjacent nodes$f3$, $b3$λ/2$b3$, 2),
 ($f4$Coherent sources$f4$, $b4$Same frequency and a constant phase difference$b4$, 3),
 ($f5$Fringe spacing (double slit)$f5$, $b5$Δx = λD/a$b5$, 4),
 ($f6$Diffraction grating equation$f6$, $b6$nλ = d sin θ$b6$, 5)
) v(f, b, so);
