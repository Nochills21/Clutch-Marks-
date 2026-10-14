UPDATE study_materials SET content = $n$<h2>Astronomy and Cosmology</h2>
<h3>Luminosity and Intensity</h3>
<p>Luminosity L is total power radiated (W). Intensity at distance d: I = L/(4πd²) — the key to distances.</p>
<p><strong>Standard candles</strong> (Cepheid variables, Type Ia supernovae) have known L, so measuring I gives d.</p>
<p><strong>Example:</strong> the Sun: I = 1370 W m⁻² at d = 1.5 × 10¹¹ m gives L ≈ 3.9 × 10²⁶ W.</p>
<h3>Stellar radii (25.2)</h3>
<p>A star radiates as a black body of surface temperature T, so L = 4πR²σT⁴. Rearranged, R = √(L / 4πσT⁴). Luminosity therefore depends on both radius and temperature.</p>
<p><strong>Example:</strong> with L = 3.9 × 10²⁶ W and T = 5800 K, R = √(3.9 × 10²⁶ / (4π × 5.67 × 10⁻⁸ × 5800⁴)) ≈ 7.0 × 10⁸ m.</p>
<p>Doubling the temperature at fixed radius multiplies L by 2⁴ = 16. A cool red giant can be far more luminous than the Sun because its radius is very large.</p>
<h3>Wien and Stefan–Boltzmann</h3>
<ul>
<li>Wien: λ_max T = 2.9 × 10⁻³ m K — hotter stars are bluer</li>
<li>Stefan: L = σAT⁴, σ = 5.67 × 10⁻⁸</li>
</ul>
<h3>Hubble's Law</h3>
<p>Galaxies recede with v = Hd, H₀ ≈ 2.2 × 10⁻¹⁸ s⁻¹. Redshift z = Δλ/λ ≈ v/c for small z.</p>
<p><strong>Example:</strong> a galaxy at 100 Mpc recedes at v = 2.2 × 10⁻¹⁸ × 100 × 3.09 × 10²² ≈ 6800 km s⁻¹.</p>
<h3>The Big Bang</h3>
<p>Evidence: Hubble expansion, cosmic microwave background (2.7 K), hydrogen/helium abundance. Age estimate: t ≈ 1/H₀ ≈ 14 billion years. The fate question: critical density, Ω.</p>
<p><strong>Exam tips:</strong> convert Mpc to metres (×3.09 × 10²²) before Hubble arithmetic; distinguish redshift of light from distance ladder methods.</p>$n$
WHERE material_type = 'notes' AND topic_id = '68a0c8be-5eba-4a82-a948-a4baef78c57d';

WITH tp AS (SELECT id FROM topics WHERE id = '68a0c8be-5eba-4a82-a948-a4baef78c57d'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A star has a luminosity of 3.9 × 10²⁶ W. What is the intensity of its radiation at a distance of 1.0 × 10¹⁷ m?$q1$, $o1$["3.1 × 10⁻⁹ W m⁻²","1.0 × 10⁻¹⁷ W m⁻²","3.9 × 10⁻²⁶ W m⁻²","1.2 × 10⁻³⁵ W m⁻²"]$o1$, 0, $e1$I = L/(4πd²) = 3.9 × 10²⁶ / (4π × 10³⁴) ≈ 3.1 × 10⁻⁹ W m⁻².$e1$, 100, '25.1'),
 ($q2$Which object is a standard candle?$q2$, $o2$["A Cepheid variable star","A main-sequence star of unknown mass","A spiral arm of a galaxy","A planet in the Solar System"]$o2$, 0, $e2$A standard candle has a known luminosity. Cepheid variables follow a period–luminosity relation, so their luminosity can be found from their period.$e2$, 101, '25.1'),
 ($q3$A star has a luminosity of 3.9 × 10²⁶ W and a surface temperature of 5800 K. What is its radius? (σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴)$q3$, $o3$["7.0 × 10⁸ m","3.5 × 10⁸ m","4.9 × 10¹⁷ m","2.2 × 10¹² m"]$o3$, 0, $e3$R = √(L / 4πσT⁴) = √(3.9 × 10²⁶ / (4π × 5.67 × 10⁻⁸ × 5800⁴)) ≈ 7.0 × 10⁸ m.$e3$, 102, '25.2'),
 ($q4$A star keeps the same radius but its surface temperature doubles. By what factor does its luminosity increase?$q4$, $o4$["2","4","8","16"]$o4$, 3, $e4$L = 4πR²σT⁴. Doubling T multiplies T⁴ by 2⁴ = 16, so L increases 16 times.$e4$, 103, '25.2'),
 ($q5$A galaxy is 50 Mpc away and H₀ = 2.2 × 10⁻¹⁸ s⁻¹. What is its recession velocity? (1 Mpc = 3.09 × 10²² m)$q5$, $o5$["3400 km s⁻¹","6800 km s⁻¹","68 km s⁻¹","340 km s⁻¹"]$o5$, 0, $e5$v = H₀d = 2.2 × 10⁻¹⁸ × 50 × 3.09 × 10²² ≈ 3.4 × 10⁶ m s⁻¹ = 3400 km s⁻¹.$e5$, 104, '25.3'),
 ($q6$Which observation is evidence for the Big Bang theory?$q6$, $o6$["The cosmic microwave background radiation","Stars appearing fixed in position","Galaxies moving towards the Earth in all directions","The Sun lying at the centre of the universe"]$o6$, 0, $e6$The cosmic microwave background is the relic radiation from the early hot, dense universe. Galaxies receding from us in all directions is Hubble expansion, not evidence that we are at the centre.$e6$, 105, '25.3')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE id = '68a0c8be-5eba-4a82-a948-a4baef78c57d'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Astronomy and cosmology', 'Recall intensity, stellar radius and Hubble''s law.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Intensity at distance d$f1$, $b1$I = L / (4πd²)$b1$, 0),
 ($f2$Standard candle$f2$, $b2$An object of known luminosity, such as a Cepheid or a Type Ia supernova$b2$, 1),
 ($f3$Stellar radius from L and T$f3$, $b3$L = 4πR²σT⁴, so R = √(L / 4πσT⁴)$b3$, 2),
 ($f4$Hubble's law$f4$, $b4$v = H₀d$b4$, 3),
 ($f5$Redshift$f5$, $b5$z = Δλ/λ ≈ v/c for small z$b5$, 4),
 ($f6$Evidence for the Big Bang$f6$, $b6$Hubble expansion, the cosmic microwave background and the hydrogen/helium abundance$b6$, 5)
) v(f, b, so);
