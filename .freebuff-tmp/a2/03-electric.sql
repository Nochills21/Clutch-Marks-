UPDATE study_materials SET content = $n$<h2>Electric Fields and Capacitance</h2>
<h3>Coulomb's law</h3>
<p>The force between two point charges is F = kQ₁Q₂/r², with k = 8.99 × 10⁹ N m² C⁻². Like charges repel and unlike charges attract. The force acts along the line joining the charges.</p>
<p><strong>Example:</strong> +2.0 μC and −3.0 μC, 0.30 m apart, attract with F = 0.60 N.</p>
<h3>Electric field strength</h3>
<p>Field strength E is the force per unit positive charge: E = F/Q, in N C⁻¹ (or V m⁻¹). For a point charge E = kQ/r², radially outward for positive charge.</p>
<p><strong>Uniform field:</strong> between parallel plates, E = V/d, with the field constant in magnitude and direction. A charge q in it feels F = qE.</p>
<p><strong>Example:</strong> plates 4.0 cm apart with p.d. 600 V have E = 1.5 × 10⁴ V m⁻¹.</p>
<h3>Electric potential and potential energy</h3>
<p>Electric potential V at a point is the work done per unit positive charge in bringing a small charge from infinity to that point: V = kQ/r for a point charge. Potential is a scalar. Field strength is the negative potential gradient, E = −dV/dr, so a steep potential-distance graph means a strong field. The field points from high to low potential.</p>
<h3>Capacitance</h3>
<p>Capacitance C = Q/V, measured in farads (C V⁻¹). The energy stored is W = ½QV = ½CV² = ½Q²/C. The area under a graph of V against Q equals the stored energy.</p>
<p><strong>Example:</strong> a 10 μF capacitor charged to 200 V stores 0.20 J.</p>
<h3>Capacitors in series and parallel</h3>
<ul>
<li>In parallel the capacitances add: C = C₁ + C₂.</li>
<li>In series the reciprocals add: 1/C = 1/C₁ + 1/C₂. The total is smaller than the smallest.</li>
</ul>
<p><strong>Discharge:</strong> through a resistor R, the charge falls exponentially, Q = Q₀e^(−t/RC). The time constant RC is the time for the charge or p.d. to fall to 37% of its initial value.</p>
<p><strong>Exam tips:</strong> convert μF and cm to SI units before calculating. Check whether a question asks for field strength (vector) or potential (scalar). Series capacitors share the charge; parallel capacitors share the p.d.</p>$n$
WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'electric-fields-and-capacitance');

WITH tp AS (SELECT id FROM topics WHERE slug = 'electric-fields-and-capacitance'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A charge of +2.0 μC is 0.30 m from a charge of −3.0 μC. What is the electrostatic force between them?$q1$, $o1$["0.20 N, attractive","6.0 N, attractive","0.60 N, attractive","0.60 N, repulsive"]$o1$, 2, $e1$F = kQ₁Q₂/r² = (8.99 × 10⁹ × 2.0 × 10⁻⁶ × 3.0 × 10⁻⁶)/0.30² ≈ 0.60 N. Opposite charges attract.$e1$, 100, '18.3'),
 ($q2$What is the electric field strength 0.20 m from a point charge of +5.0 nC?$q2$, $o2$["5.6 × 10² N C⁻¹","2.2 × 10³ N C⁻¹","1.1 × 10⁴ N C⁻¹","1.1 × 10³ N C⁻¹"]$o2$, 3, $e2$E = kQ/r² = (8.99 × 10⁹ × 5.0 × 10⁻⁹)/0.20² ≈ 1.1 × 10³ N C⁻¹.$e2$, 101, '18.4'),
 ($q3$Two parallel plates 4.0 cm apart have a potential difference of 600 V between them. What is the field strength between the plates?$q3$, $o3$["2.4 × 10¹ V m⁻¹","1.5 × 10⁴ V m⁻¹","6.7 × 10⁻⁵ V m⁻¹","1.5 × 10² V m⁻¹"]$o3$, 1, $e3$E = V/d = 600 / 0.040 = 1.5 × 10⁴ V m⁻¹.$e3$, 102, '18.2'),
 ($q4$Which statement about electric potential and field strength is correct?$q4$, $o4$["Electric potential is a vector quantity in the direction of the field","Potential is greatest where the field is weakest","Field strength is the negative potential gradient, E = −dV/dr","A charge's potential energy is independent of the potential"]$o4$, 2, $e4$Field strength is the negative gradient of potential with respect to distance. Potential is a scalar, and a steep potential gradient corresponds to a strong field.$e4$, 103, '18.5'),
 ($q5$A capacitor stores 6.0 mC of charge at a potential difference of 12 V. What is its capacitance?$q5$, $o5$["2.0 × 10⁻³ F","5.0 × 10⁻⁵ F","5.0 × 10⁻⁴ F","7.2 × 10⁻² F"]$o5$, 2, $e5$C = Q/V = 6.0 × 10⁻³ / 12 = 5.0 × 10⁻⁴ F (500 μF).$e5$, 104, '19.1'),
 ($q6$A 10 μF capacitor is charged to 200 V. How much energy does it store?$q6$, $o6$["0.1 J","2.0 J","4.0 J","0.2 J"]$o6$, 3, $e6$W = ½CV² = ½ × 10 × 10⁻⁶ × 200² = 0.20 J.$e6$, 105, '19.2')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE slug = 'electric-fields-and-capacitance'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Electric fields and capacitance', 'Recall Coulomb''s law, field strength, potential and capacitance.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Coulomb's law$f1$, $b1$F = kQ₁Q₂/r², with k = 8.99 × 10⁹ N m² C⁻²$b1$, 0),
 ($f2$Field strength of a point charge$f2$, $b2$E = kQ/r², radial$b2$, 1),
 ($f3$Uniform field between plates$f3$, $b3$E = V/d$b3$, 2),
 ($f4$Field strength and potential$f4$, $b4$E = −dV/dr: the field is the negative potential gradient$b4$, 3),
 ($f5$Capacitance$f5$, $b5$C = Q/V, in farads$b5$, 4),
 ($f6$Energy stored in a capacitor$f6$, $b6$W = ½QV = ½CV² = Q²/2C$b6$, 5)
) v(f, b, so);
