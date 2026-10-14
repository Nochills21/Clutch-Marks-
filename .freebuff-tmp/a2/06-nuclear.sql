UPDATE study_materials SET content = $n$<h2>Nuclear Physics</h2>
<h3>The nucleus</h3>
<p>The nucleus holds protons and neutrons, collectively nucleons. Nuclide notation ᴬZX gives Z protons and A nucleons, so N = A − Z neutrons. Isotopes share Z and differ in N. Nuclear densities are about 10¹⁷ kg m⁻³, so nearly all the mass of an atom sits in a tiny volume.</p>
<h3>Mass defect and binding energy (23.1)</h3>
<p>The mass of a nucleus is less than the sum of the masses of its separate nucleons. This difference is the mass defect Δm. Energy equivalent to Δm, given by E = Δmc², is the binding energy: the energy released when the nucleus is assembled from separate nucleons, and the energy needed to separate it. In nuclear work, 1 u = 931 MeV.</p>
<p><strong>Example:</strong> a mass defect of 0.0300 u corresponds to E = 0.0300 × 931 ≈ 27.9 MeV.</p>
<p>The binding energy per nucleon peaks near iron-56, the most tightly bound nucleus. Energy is released when the nucleons move toward this peak, by fission of heavy nuclei or by fusion of light ones.</p>
<h3>Radioactive decay (23.2)</h3>
<p>Decay is random and spontaneous. The effect of each type on the nucleus and its penetration are:</p>
<table border="1" cellpadding="6">
<tr><th>Type</th><th>What changes</th><th>Stopped by</th></tr>
<tr><td>alpha</td><td>Z − 2, A − 4</td><td>paper</td></tr>
<tr><td>beta-minus</td><td>Z + 1, A unchanged</td><td>a few mm of aluminium</td></tr>
<tr><td>gamma</td><td>no change to Z or A</td><td>thick lead</td></tr>
</table>
<p>The activity A = λN is the rate of decay, in becquerel (Bq). The decay constant λ and the half-life t½ are related by λ = ln 2 / t½. The number of nuclei left after time t is N = N₀e^(−λt).</p>
<p><strong>Example:</strong> a sample with t½ = 10 days has 1/8 of its original activity after 30 days, since three half-lives have passed.</p>
<p><strong>Example:</strong> with t½ = 5.0 h = 1.8 × 10⁴ s, λ = 0.693 / 1.8 × 10⁴ ≈ 3.9 × 10⁻⁵ s⁻¹.</p>
<h3>Fission and fusion</h3>
<p>Heavy nuclei split (fission) into lighter nuclei of greater binding energy per nucleon, which releases energy in reactors. Light nuclei merge (fusion), which releases energy in stars.</p>
<p><strong>Exam tips:</strong> balance Z and A on both sides of every decay equation. Convert the half-life to seconds before finding λ. Use A = λN, not guesswork with halves, when the number of nuclei is needed.</p>$n$
WHERE material_type = 'notes' AND topic_id = '9c985dc8-bbb0-4506-9dfc-2f49b774fc24';

WITH tp AS (SELECT id FROM topics WHERE id = '9c985dc8-bbb0-4506-9dfc-2f49b774fc24'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A nucleus has a mass defect of 0.0300 u. What is its binding energy? (1 u = 931 MeV)$q1$, $o1$["27.9 MeV","0.0300 MeV","931 MeV","2.79 MeV"]$o1$, 0, $e1$E = Δmc² = 0.0300 × 931 ≈ 27.9 MeV.$e1$, 100, '23.1'),
 ($q2$Which statement about binding energy per nucleon is correct?$q2$, $o2$["Iron-56 has the lowest binding energy per nucleon","Binding energy per nucleon peaks near iron-56, so both fission of heavy nuclei and fusion of light nuclei release energy","Heavy nuclei are the most tightly bound","Hydrogen has the largest binding energy per nucleon"]$o2$, 1, $e2$The binding energy per nucleon is greatest near iron-56. Energy is released when nucleons move toward that peak, by fission of heavy nuclei or fusion of light nuclei.$e2$, 101, '23.1'),
 ($q3$A sample has a half-life of 10 days. What fraction of its original activity remains after 30 days?$q3$, $o3$["1/3","1/8","1/10","1/30"]$o3$, 1, $e3$Three half-lives have passed, so the fraction remaining is (1/2)³ = 1/8.$e3$, 102, '23.2'),
 ($q4$A radioactive isotope has a half-life of 5.0 hours. What is its decay constant? (1 h = 3600 s)$q4$, $o4$["3.9 × 10⁻⁵ s⁻¹","1.4 × 10⁻⁴ s⁻¹","2.8 × 10⁻⁵ s⁻¹","1.7 × 10⁻⁵ s⁻¹"]$o4$, 0, $e4$λ = ln 2 / t½ = 0.693 / (5.0 × 3600) ≈ 3.9 × 10⁻⁵ s⁻¹.$e4$, 103, '23.2'),
 ($q5$A nucleus undergoes beta-minus decay. Which change occurs?$q5$, $o5$["Z increases by 1 and A is unchanged","Z decreases by 2 and A decreases by 4","Z is unchanged and A decreases by 1","Z decreases by 1 and A is unchanged"]$o5$, 0, $e5$In beta-minus decay a neutron becomes a proton and an electron is emitted. Z increases by 1 and the nucleon number A is unchanged.$e5$, 104, '23.2'),
 ($q6$Which statement about isotopes is correct?$q6$, $o6$["Isotopes have the same number of neutrons but different numbers of protons","Isotopes have the same proton number Z but different nucleon numbers A","Isotopes have the same nucleon number but different proton numbers","Isotopes are nuclei with different numbers of electrons"]$o6$, 1, $e6$Isotopes of an element share Z, so they have the same chemical identity, but differ in the number of neutrons and therefore in A.$e6$, 105, '11.1')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE id = '9c985dc8-bbb0-4506-9dfc-2f49b774fc24'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Nuclear physics', 'Recall binding energy, half-life and decay rules.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Mass defect$f1$, $b1$The difference between the mass of a nucleus and the sum of its separate nucleons$b1$, 0),
 ($f2$Binding energy$f2$, $b2$E = Δmc², the energy released when the nucleus is assembled from nucleons$b2$, 1),
 ($f3$Decay constant and half-life$f3$, $b3$λ = ln 2 / t½$b3$, 2),
 ($f4$Activity$f4$, $b4$A = λN, measured in becquerel (Bq)$b4$, 3),
 ($f5$Beta-minus decay$f5$, $b5$Z increases by 1, A unchanged; a neutron becomes a proton and an electron is emitted$b5$, 4),
 ($f6$Isotopes$f6$, $b6$Same proton number Z, different nucleon number A$b6$, 5)
) v(f, b, so);
