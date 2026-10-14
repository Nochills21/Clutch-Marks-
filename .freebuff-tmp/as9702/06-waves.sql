UPDATE study_materials SET content = $n$<h2>Waves</h2>
<h3>Progressive waves</h3>
<ul>
<li>A progressive wave transfers energy without transferring matter. Its speed is v = fλ, where f is the frequency and λ the wavelength. Period T = 1/f.</li>
<li>Phase difference: two points separated by one wavelength are in phase. Points separated by half a wavelength are in antiphase.</li>
</ul>
<h3>Transverse and longitudinal waves</h3>
<ul>
<li>Transverse: the oscillations are perpendicular to the direction of energy transfer (e.g. light, waves on a string).</li>
<li>Longitudinal: the oscillations are parallel to the direction of energy transfer (e.g. sound in air, compressions and rarefactions).</li>
</ul>
<h3>Doppler effect for sound</h3>
<p>When a source moves towards an observer, the observed frequency is higher and the wavelength is shorter. When it moves away, the observed frequency is lower and the wavelength is longer. The speed of sound in the medium does not change.</p>
<h3>Electromagnetic spectrum</h3>
<p>All electromagnetic waves travel at the same speed in a vacuum. In order of increasing wavelength: gamma rays, X-rays, ultraviolet, visible light, infrared, microwaves, radio waves. Frequency increases in the reverse order.</p>
<h3>Polarisation</h3>
<p>Only transverse waves can be polarised. Polarisation restricts the oscillations to a single plane. Longitudinal waves such as sound cannot be polarised.</p>
<p><strong>Worked example:</strong> a wave has frequency 50 Hz and wavelength 6.0 m. Its speed is v = fλ = 50 × 6.0 = 300 m s⁻¹.</p>
<p><strong>Exam tips:</strong> learn the spectrum order in terms of wavelength, not frequency. For the Doppler effect, state which way the source moves relative to the observer. Only transverse waves can show polarisation.</p>$n$
WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'waves');

WITH tp AS (SELECT id FROM topics WHERE slug = 'waves'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A progressive wave has a frequency of 50 Hz and a wavelength of 6.0 m. What is its speed?$q1$, $o1$["0.12 m s⁻¹","8.3 m s⁻¹","300 m s⁻¹","3000 m s⁻¹"]$o1$, 2, $e1$v = fλ = 50 × 6.0 = 300 m s⁻¹.$e1$, 100, '7.1'),
 ($q2$Which statement about sound waves in air is correct?$q2$, $o2$["Sound is a transverse wave","Sound is a longitudinal wave","Sound is an electromagnetic wave","Sound waves can be polarised"]$o2$, 1, $e2$Sound in air consists of compressions and rarefactions, with the particles oscillating parallel to the direction of energy transfer. It is a longitudinal wave, and it is not electromagnetic.$e2$, 101, '7.2'),
 ($q3$A sound source moves towards a stationary observer. Which statement is correct?$q3$, $o3$["The observed frequency is lower and the wavelength is longer","The observed frequency is higher and the wavelength is shorter","The observed frequency and wavelength are unchanged","The speed of sound increases"]$o3$, 1, $e3$As the source approaches, each successive wave crest is emitted closer to the observer. The observed frequency increases and the wavelength decreases. The speed of sound in air is unchanged.$e3$, 102, '7.3'),
 ($q4$Which list gives the electromagnetic waves in order of increasing wavelength?$q4$, $o4$["Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma","Gamma, X-ray, ultraviolet, visible, infrared, microwave, radio","Gamma, radio, microwave, visible, X-ray","Visible, ultraviolet, infrared, X-ray, gamma, radio"]$o4$, 1, $e4$Increasing wavelength runs gamma, X-ray, ultraviolet, visible, infrared, microwave, radio. Option 2 lists them in that order, and option 1 is the reverse order.$e4$, 103, '7.4'),
 ($q5$Which statement about polarisation is correct?$q5$, $o5$["Only transverse waves can be polarised","Only longitudinal waves can be polarised","Sound waves in air can be polarised","Transverse and longitudinal waves can be polarised equally"]$o5$, 0, $e5$Polarisation restricts the oscillations to one plane. Only transverse waves have oscillations that can be restricted in this way. Longitudinal waves such as sound cannot be polarised.$e5$, 104, '7.5'),
 ($q6$A wave has a period of 0.020 s. What is its frequency?$q6$, $o6$["0.02 Hz","50 Hz","0.5 Hz","2.0 Hz"]$o6$, 1, $e6$f = 1 ÷ T = 1 ÷ 0.020 = 50 Hz.$e6$, 105, '7.1')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE slug = 'waves'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Waves', 'Recall wave speed, transverse and longitudinal waves, Doppler effect, the spectrum and polarisation.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Wave speed$f1$, $b1$v = fλ (frequency × wavelength)$b1$, 0),
 ($f2$Transverse wave$f2$, $b2$Oscillations perpendicular to the direction of energy transfer, e.g. light$b2$, 1),
 ($f3$Longitudinal wave$f3$, $b3$Oscillations parallel to the direction of energy transfer, e.g. sound in air$b3$, 2),
 ($f4$Doppler effect (source approaching)$f4$, $b4$Observed frequency increases and wavelength decreases$b4$, 3),
 ($f5$Order of EM spectrum (increasing wavelength)$f5$, $b5$Gamma, X-ray, UV, visible, infrared, microwave, radio$b5$, 4),
 ($f6$Polarisation$f6$, $b6$Restricting oscillations to one plane; possible only for transverse waves$b6$, 5)
) v(f, b, so);
