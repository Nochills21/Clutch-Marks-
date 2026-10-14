UPDATE study_materials SET content = $n$<h2>Quantum Physics</h2>
<h3>Photons and photon energy</h3>
<p>Electromagnetic radiation travels as photons, each with energy E = hf, where h = 6.63 × 10⁻³⁴ J s is the Planck constant. Since c = fλ, the energy is also E = hc/λ. Shorter wavelength means higher energy.</p>
<p><strong>Example:</strong> a photon of wavelength 500 nm has E = (6.63 × 10⁻³⁴ × 3.0 × 10⁸)/(5.0 × 10⁻⁷) ≈ 4.0 × 10⁻¹⁹ J, or about 2.5 eV.</p>
<h3>The photoelectric effect</h3>
<p>When light shines on a metal surface, electrons are emitted only if the frequency of the light is at or above the threshold frequency f₀. Each photon transfers its whole energy to a single electron. Increasing the intensity increases the number of photons per second, so more electrons are emitted, but it does not increase the energy of each electron. The emission is instantaneous, with no time delay.</p>
<p>Wave theory cannot explain the threshold frequency or the lack of a time delay. The photon model explains both.</p>
<h3>Einstein's photoelectric equation</h3>
<p>hf = φ + E_k(max), where φ is the work function of the metal, the minimum energy needed to free an electron. The threshold frequency is f₀ = φ/h. The stopping potential V_s satisfies eV_s = E_k(max).</p>
<p><strong>Example:</strong> a work function of 2.0 eV gives f₀ = (2.0 × 1.6 × 10⁻¹⁹)/(6.63 × 10⁻³⁴) ≈ 4.8 × 10¹⁴ Hz.</p>
<h3>Wave-particle duality</h3>
<p>Particles also have wave properties. The de Broglie wavelength of a particle with momentum p is λ = h/p. Electrons diffract through crystal lattices, showing wave behaviour, while photons show particle behaviour in the photoelectric effect. Both are needed to describe the same entities.</p>
<h3>Energy levels and line spectra</h3>
<p>Electrons in an atom occupy discrete energy levels. When an electron falls from a higher level E₁ to a lower level E₂, it emits a single photon with hf = E₁ − E₂. Absorption happens when a photon with exactly this energy is taken in. Because only specific energies are allowed, the spectrum is a set of sharp lines rather than a continuous band.</p>
<p><strong>Example:</strong> a transition from −3.4 eV to −13.6 eV releases 10.2 eV, a wavelength of about 122 nm.</p>
<p><strong>Exam tips:</strong> convert eV to joules (1 eV = 1.6 × 10⁻¹⁹ J) before using E = hf. Say which quantity the intensity changes and which it does not. Quote hf = φ + E_k(max) in photoelectric questions.</p>$n$
WHERE material_type = 'notes' AND topic_id = '8eef118f-639b-44a5-b503-80241e2bb58e';

WITH tp AS (SELECT id FROM topics WHERE id = '8eef118f-639b-44a5-b503-80241e2bb58e'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$What is the energy of a photon of wavelength 500 nm? (h = 6.63 × 10⁻³⁴ J s, c = 3.0 × 10⁸ m s⁻¹)$q1$, $o1$["4.0 × 10⁻¹⁹ J","6.6 × 10⁻²⁶ J","2.5 × 10⁻¹⁹ J","1.3 × 10⁻¹⁸ J"]$o1$, 0, $e1$E = hc/λ = (6.63 × 10⁻³⁴ × 3.0 × 10⁸)/(5.0 × 10⁻⁷) ≈ 4.0 × 10⁻¹⁹ J.$e1$, 100, '22.1'),
 ($q2$A metal has a work function of 2.0 eV. What is its threshold frequency? (1 eV = 1.6 × 10⁻¹⁹ J, h = 6.63 × 10⁻³⁴ J s)$q2$, $o2$["3.2 × 10¹⁴ Hz","4.8 × 10¹⁴ Hz","1.2 × 10¹⁵ Hz","2.0 × 10¹⁵ Hz"]$o2$, 1, $e2$f₀ = φ/h = (2.0 × 1.6 × 10⁻¹⁹)/(6.63 × 10⁻³⁴) ≈ 4.8 × 10¹⁴ Hz.$e2$, 101, '22.2'),
 ($q3$Which statement about the photoelectric effect is correct?$q3$, $o3$["Increasing the intensity increases the maximum kinetic energy of the electrons","Emission occurs at any frequency if the intensity is high enough","Increasing the intensity increases the number of electrons emitted per second but not their maximum kinetic energy","Electrons are emitted after a time delay that depends on the intensity"]$o3$, 2, $e3$Intensity sets the number of photons per second, so the number of photoelectrons. Each photon's energy depends only on frequency, which sets E_k(max).$e3$, 102, '22.2'),
 ($q4$An electron has a momentum of 3.0 × 10⁻²⁴ kg m s⁻¹. What is its de Broglie wavelength? (h = 6.63 × 10⁻³⁴ J s)$q4$, $o4$["2.2 × 10⁻¹⁰ m","2.2 × 10⁻²⁴ m","4.5 × 10⁻⁹ m","6.6 × 10⁻³⁴ m"]$o4$, 0, $e4$λ = h/p = 6.63 × 10⁻³⁴ / 3.0 × 10⁻²⁴ ≈ 2.2 × 10⁻¹⁰ m.$e4$, 103, '22.3'),
 ($q5$An electron falls from a level at −3.4 eV to a level at −13.6 eV. What is the wavelength of the photon emitted? (1 eV ≈ 1.6 × 10⁻¹⁹ J, h = 6.63 × 10⁻³⁴ J s, c = 3.0 × 10⁸ m s⁻¹)$q5$, $o5$["1.22 × 10⁻⁷ m","1.22 × 10⁻⁶ m","6.5 × 10⁻⁷ m","2.4 × 10⁻⁸ m"]$o5$, 0, $e5$ΔE = 13.6 − 3.4 = 10.2 eV. λ = hc/ΔE = (6.63 × 10⁻³⁴ × 3.0 × 10⁸)/(10.2 × 1.6 × 10⁻¹⁹) ≈ 1.22 × 10⁻⁷ m.$e5$, 104, '22.4'),
 ($q6$Why does an atom produce a line spectrum rather than a continuous spectrum?$q6$, $o6$["Electrons can take any energy, but only at high temperatures","Photons are absorbed in a continuous range of energies","Electrons can only occupy discrete energy levels, so only photons of specific energies are emitted or absorbed","The nucleus emits photons of fixed wavelength"]$o6$, 2, $e6$Only specific energy differences between the discrete levels are possible, so only photons of those energies are emitted or absorbed, giving sharp lines.$e6$, 105, '22.4')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE id = '8eef118f-639b-44a5-b503-80241e2bb58e'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Quantum physics', 'Recall photon energy, the photoelectric equation and energy levels.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Energy of a photon$f1$, $b1$E = hf = hc/λ$b1$, 0),
 ($f2$Threshold frequency$f2$, $b2$f₀ = φ/h, where φ is the work function$b2$, 1),
 ($f3$Einstein's photoelectric equation$f3$, $b3$hf = φ + E_k(max)$b3$, 2),
 ($f4$Effect of increasing intensity in the photoelectric effect$f4$, $b4$More photoelectrons per second, same maximum kinetic energy$b4$, 3),
 ($f5$de Broglie wavelength$f5$, $b5$λ = h/p$b5$, 4),
 ($f6$Line spectrum$f6$, $b6$Emitted or absorbed only at energies equal to differences between discrete energy levels$b6$, 5)
) v(f, b, so);
