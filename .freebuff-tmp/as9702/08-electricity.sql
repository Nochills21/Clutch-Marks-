UPDATE study_materials SET content = $n$<h2>Electricity: D.C. circuits</h2>
<h3>Current and charge</h3>
<ul>
<li>Current I = charge Q ÷ time t, so Q = It. Unit: ampere (A), where 1 A = 1 C s⁻¹.</li>
<li>Electron drift velocity is very small, but the electric field propagates through the circuit almost at the speed of light.</li>
</ul>
<h3>Potential difference and power</h3>
<ul>
<li>Potential difference V = energy transferred ÷ charge. Unit: volt (V), where 1 V = 1 J C⁻¹.</li>
<li>Power P = VI = I²R = V²/R. Unit: watt (W).</li>
</ul>
<h3>Resistance and resistivity</h3>
<p>R = V/I (Ohm's law for an ohmic conductor, at constant temperature). For a wire of length L and cross-sectional area A, R = ρL/A, where ρ is the resistivity in Ω m. Resistance rises with length and falls with area.</p>
<h3>Practical circuits</h3>
<p>An ammeter is connected in series with the component it measures. A voltmeter is connected in parallel with the component. An ideal ammeter has zero resistance; an ideal voltmeter has infinite resistance.</p>
<h3>Kirchhoff's laws</h3>
<ul>
<li>First law: at a junction, the total current entering equals the total current leaving (conservation of charge).</li>
<li>Second law: around any closed loop, the sum of the emfs equals the sum of the potential differences (conservation of energy).</li>
</ul>
<h3>Potential dividers</h3>
<p>For two resistors R1 and R2 in series across a supply V, the potential difference across R2 is V × R2/(R1 + R2).</p>
<p><strong>Worked example:</strong> a 100 Ω and a 300 Ω resistor are in series across 12 V. The current is 12/400 = 0.030 A, and the voltage across the 300 Ω resistor is 0.030 × 300 = 9.0 V.</p>
<p><strong>Exam tips:</strong> draw the meter in the correct place, in series or in parallel. Apply Kirchhoff's first law to currents and the second law to loops, with consistent signs. Check that units are converted (e.g. mm² to m²) before using ρL/A.</p>$n$
WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'electricity-d-c-circuits');

WITH tp AS (SELECT id FROM topics WHERE slug = 'electricity-d-c-circuits'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A current of 0.50 A flows for 120 s. What charge passes a point in the circuit?$q1$, $o1$["240 C","0.0042 C","60 C","600 C"]$o1$, 2, $e1$Q = It = 0.50 × 120 = 60 C.$e1$, 100, '9.1'),
 ($q2$A lamp operates at 12 V and draws a current of 2.0 A. What is its power?$q2$, $o2$["6.0 W","14 W","24 W","0.17 W"]$o2$, 2, $e2$P = VI = 12 × 2.0 = 24 W.$e2$, 101, '9.2'),
 ($q3$A wire of length 2.0 m and cross-sectional area 1.0 × 10⁻⁶ m² has resistivity 1.7 × 10⁻⁸ Ω m. What is its resistance?$q3$, $o3$["0.034 Ω","3.4 Ω","8.5 × 10⁻³ Ω","34 Ω"]$o3$, 0, $e3$R = ρL/A = (1.7 × 10⁻⁸ × 2.0) ÷ (1.0 × 10⁻⁶) = 0.034 Ω.$e3$, 102, '9.3'),
 ($q4$At a junction in a circuit, 2.0 A flows in and 1.2 A flows out through one branch. What is the current in the other outgoing branch?$q4$, $o4$["0.8 A","1.2 A","3.2 A","2.0 A"]$o4$, 0, $e4$Kirchhoff's first law: current in = current out. So 2.0 = 1.2 + I, giving I = 0.8 A.$e4$, 103, '10.2'),
 ($q5$Two resistors of 100 Ω and 300 Ω are connected in series across a 12 V supply. What is the potential difference across the 300 Ω resistor?$q5$, $o5$["3.0 V","4.0 V","9.0 V","12 V"]$o5$, 2, $e5$The potential divider gives V = 12 × 300 ÷ (100 + 300) = 9.0 V.$e5$, 104, '10.3'),
 ($q6$Which statement about connecting meters in a circuit is correct?$q6$, $o6$["An ammeter is connected in parallel with the component","A voltmeter is connected in parallel with the component","An ammeter is connected in series with a voltmeter","A voltmeter is connected in series with the component"]$o6$, 1, $e6$An ammeter measures current, so it is placed in series. A voltmeter measures potential difference across a component, so it is placed in parallel with that component.$e6$, 105, '10.1')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE slug = 'electricity-d-c-circuits'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Electricity, D.C. circuits', 'Recall current, power, resistivity, meters, Kirchhoff''s laws and potential dividers.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Charge in terms of current$f1$, $b1$Q = It$b1$, 0),
 ($f2$Electrical power (three forms)$f2$, $b2$P = VI = I²R = V²/R$b2$, 1),
 ($f3$Resistance of a wire$f3$, $b3$R = ρL/A; ρ is the resistivity (Ω m)$b3$, 2),
 ($f4$Kirchhoff's first law$f4$, $b4$Total current entering a junction equals total current leaving it$b4$, 3),
 ($f5$Kirchhoff's second law$f5$, $b5$Around a closed loop, the sum of emfs equals the sum of potential differences$b5$, 4),
 ($f6$Potential divider$f6$, $b6$V2 = V × R2 ÷ (R1 + R2) for two resistors in series$b6$, 5)
) v(f, b, so);
