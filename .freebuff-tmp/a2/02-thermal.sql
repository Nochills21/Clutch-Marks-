UPDATE study_materials SET content = $n$<h2>Thermal Physics</h2>
<h3>Temperature and scales</h3>
<p>Thermodynamic temperature is measured in kelvin. The kelvin and Celsius scales have the same size of degree, with T/K = θ/°C + 273. Absolute zero (0 K) is the lowest possible temperature, at which the particles of an ideal gas have minimum kinetic energy.</p>
<p><strong>Example:</strong> 25 °C = 298 K.</p>
<h3>Specific heat capacity and latent heat</h3>
<p>Specific heat capacity c is the energy needed to raise the temperature of 1 kg of a substance by 1 K: Q = mcΔθ. Latent heat is the energy needed to change the state of 1 kg without a change in temperature: Q = mL. Melting and boiling absorb energy without a temperature rise, because the energy goes into breaking intermolecular bonds, not into kinetic energy.</p>
<p><strong>Example:</strong> warming 2.0 kg of water (c = 4200 J kg⁻¹ K⁻¹) by 10 K needs 84 kJ. Melting 0.20 kg of ice (L = 334 kJ kg⁻¹) needs 67 kJ.</p>
<h3>The mole and Avogadro constant</h3>
<p>One mole contains N_A = 6.02 × 10²³ particles. The number of particles is N = nN_A, where n is the amount in moles. Molar mass is the mass of one mole, in kg mol⁻¹ in SI units.</p>
<h3>Equation of state for an ideal gas</h3>
<p>pV = nRT, where R = 8.31 J mol⁻¹ K⁻¹ and T must be absolute. Equivalently pV = NkT, with k = R/N_A = 1.38 × 10⁻²³ J K⁻¹.</p>
<p><strong>Example:</strong> 0.10 mol at 300 K in 2.0 × 10⁻³ m³ has p = nRT/V ≈ 1.2 × 10⁵ Pa.</p>
<h3>Kinetic theory</h3>
<p>The pressure of an ideal gas comes from molecules colliding with the container walls. The mean kinetic energy of a molecule is ⟨Ek⟩ = 3kT/2, so it depends only on the absolute temperature. At 300 K it is about 6.2 × 10⁻²¹ J.</p>
<h3>Internal energy and the first law</h3>
<p>The internal energy of an ideal gas is the sum of the kinetic and potential energies of its molecules. For an ideal gas there are no intermolecular forces, so internal energy depends only on temperature. The first law of thermodynamics is ΔU = Q + W, where Q is heat added to the system and W is work done on the system. Heat lost by a system is therefore negative.</p>
<p><strong>Example:</strong> a gas has 500 J of work done on it and loses 200 J of heat. ΔU = −200 + 500 = +300 J.</p>
<p><strong>Exam tips:</strong> convert to kelvin before using pV = nRT or the kinetic-energy formula. Check the sign convention for W in the question. Use latent heat only when the temperature is constant.</p>$n$
WHERE material_type = 'notes' AND topic_id = '52889198-3121-4be7-8cd7-e3bd37e97430';

WITH tp AS (SELECT id FROM topics WHERE id = '52889198-3121-4be7-8cd7-e3bd37e97430'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$What is 25 °C in kelvin?$q1$, $o1$["248 K","25 K","298 K","273 K"]$o1$, 2, $e1$T = θ + 273 = 25 + 273 = 298 K. Subtracting 273 is the conversion from kelvin to Celsius.$e1$, 100, '14.2'),
 ($q2$How much energy is needed to warm 2.0 kg of water (c = 4200 J kg⁻¹ K⁻¹) by 10 K?$q2$, $o2$["8.4 kJ","42 kJ","840 kJ","84 kJ"]$o2$, 3, $e2$Q = mcΔθ = 2.0 × 4200 × 10 = 84 000 J = 84 kJ.$e2$, 101, '14.3'),
 ($q3$How many molecules are in 0.50 mol of an ideal gas?$q3$, $o3$["6.02 × 10²³","1.20 × 10²⁴","1.20 × 10²³","3.01 × 10²³"]$o3$, 3, $e3$N = nN_A = 0.50 × 6.02 × 10²³ = 3.01 × 10²³.$e3$, 102, '15.1'),
 ($q4$0.10 mol of an ideal gas is at 300 K in a container of volume 2.0 × 10⁻³ m³. What is its pressure?$q4$, $o4$["2.5 × 10⁵ Pa","5.0 × 10⁴ Pa","1.2 × 10⁵ Pa","1.2 × 10³ Pa"]$o4$, 2, $e4$p = nRT/V = (0.10 × 8.31 × 300) / (2.0 × 10⁻³) ≈ 1.2 × 10⁵ Pa.$e4$, 103, '15.2'),
 ($q5$What is the mean kinetic energy of a molecule of an ideal gas at 300 K? (k = 1.38 × 10⁻²³ J K⁻¹)$q5$, $o5$["4.1 × 10⁻²¹ J","6.2 × 10⁻²¹ J","1.4 × 10⁻²³ J","2.1 × 10⁻²⁰ J"]$o5$, 1, $e5$⟨Ek⟩ = (3/2)kT = 1.5 × 1.38 × 10⁻²³ × 300 ≈ 6.2 × 10⁻²¹ J.$e5$, 104, '15.3'),
 ($q6$A gas has 500 J of work done on it and loses 200 J of heat to its surroundings. What is the change in its internal energy?$q6$, $o6$["+700 J","−300 J","−700 J","+300 J"]$o6$, 3, $e6$Using ΔU = Q + W with Q = −200 J (heat lost) and W = +500 J (work done on the gas): ΔU = −200 + 500 = +300 J.$e6$, 105, '16.2')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE id = '52889198-3121-4be7-8cd7-e3bd37e97430'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Thermal physics', 'Recall the gas equation, kinetic theory and the first law.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Kelvin to Celsius$f1$, $b1$T/K = θ/°C + 273$b1$, 0),
 ($f2$Specific heat capacity$f2$, $b2$Energy per kg per kelvin: Q = mcΔθ$b2$, 1),
 ($f3$Ideal gas equation$f3$, $b3$pV = nRT, with T in kelvin and R = 8.31 J mol⁻¹ K⁻¹$b3$, 2),
 ($f4$Avogadro constant$f4$, $b4$N_A = 6.02 × 10²³ particles per mole$b4$, 3),
 ($f5$Mean kinetic energy of a gas molecule$f5$, $b5$(3/2)kT, depends only on absolute temperature$b5$, 4),
 ($f6$First law of thermodynamics$f6$, $b6$ΔU = Q + W, with Q heat into the system and W work done on it$b6$, 5)
) v(f, b, so);
