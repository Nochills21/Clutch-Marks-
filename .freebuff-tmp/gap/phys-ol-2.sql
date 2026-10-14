UPDATE study_materials SET content = content || $n$
<h3>Orbits and the Solar System in more depth</h3>
<p>The planets orbit the Sun because the Sun's gravity provides the centripetal force that keeps them on their paths. A moon is a natural satellite that orbits a planet, and an artificial satellite is launched by people. The Earth rotates once on its axis in one day, and it orbits the Sun once in one year. The phases of the Moon are caused by the changing proportion of its sunlit side that we see as it orbits the Earth.</p>
<p><strong>Exam tip:</strong> state the object that provides the gravitational force when you describe why an orbit is stable.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'earth-space');

UPDATE study_materials SET content = content || $n$
<h3>Magnetic fields and electromagnets</h3>
<p>Like magnetic poles repel and unlike poles attract. Outside a bar magnet, field lines run from the north pole to the south pole. A solenoid is a coil of wire; its field is strengthened by increasing the current, increasing the number of turns, or placing a soft iron core inside it. An electromagnet can be switched on and off by the current, unlike a permanent magnet.</p>
<p>A current-carrying conductor in a magnetic field experiences a force, which is the basis of the motor effect used in electric motors.</p>
<p><strong>Exam tip:</strong> when asked how to make an electromagnet stronger, give two changes, such as more turns and a larger current.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'magnetism-electromagnetism');

UPDATE study_materials SET content = content || $n$
<h3>Nuclear decay and half-life</h3>
<p>Alpha particles are helium nuclei with two protons and two neutrons, and they are strongly ionising but have low penetration. Beta-minus emission happens when a neutron changes into a proton and an electron is emitted. Gamma radiation is electromagnetic, carries no charge and no mass, and has high penetration. Background radiation must be subtracted from measured count rates before a half-life is calculated.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'nuclear-physics');

UPDATE study_materials SET content = content || $n$
<h3>Heat transfer and heat capacity</h3>
<p>Energy transfer by conduction happens through a solid when particles vibrate and pass energy to their neighbours, with free electrons carrying energy in metals. Convection in fluids occurs because hotter, less dense fluid rises and is replaced by cooler, denser fluid. Black, matt surfaces are good absorbers and emitters of infrared radiation.</p>
<p>The energy needed to change the temperature of a substance is Q = mc&Delta;T, where c is the specific heat capacity. Latent heat is the energy absorbed or released during a change of state with no change in temperature.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'thermal-physics');

UPDATE study_materials SET content = content || $n$
<h3>Wave equation and sound</h3>
<p>The wave equation is v = f&lambda;, where v is the wave speed, f the frequency and &lambda; the wavelength. Sound is a longitudinal wave that needs a medium, so it cannot travel through a vacuum. All electromagnetic waves travel at the speed of light in a vacuum, about 3 × 10⁸ m/s. In reflection the angle of incidence equals the angle of reflection. For an echo, the sound travels to the reflecting surface and back, so the distance to the surface is half the total distance travelled.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'waves-sound');

INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT (SELECT z.id FROM quizzes z WHERE z.topic_id = t.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1), v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', (SELECT ss.id FROM syllabus_statements ss WHERE ss.topic_id = t.id AND ss.code = v.code)
FROM (VALUES
 ('earth-space', '6.1', $q01$Which order lists the planets moving outward from the Sun?$q01$, $o01$["Mercury, Venus, Earth, Mars","Earth, Mars, Venus, Mercury","Venus, Mercury, Earth, Mars","Mars, Earth, Venus, Mercury"]$o01$, 0, $e01$Moving outward from the Sun the order is Mercury, Venus, Earth, Mars.$e01$, 400),
 ('earth-space', '6.1', $q02$What is a natural satellite?$q02$, $o02$["An object that orbits a larger body","A star that gives off light","A comet only","A galaxy"]$o02$, 0, $e02$A satellite is an object that orbits a larger body, such as the Moon orbiting the Earth.$e02$, 401),
 ('earth-space', '6.1', $q03$What force keeps the planets in orbit around the Sun?$q03$, $o03$["Friction","Gravity","Magnetism","Tension"]$o03$, 1, $e03$Gravity provides the centripetal force that keeps the planets in orbit.$e03$, 402),
 ('earth-space', '6.2', $q04$How long does the Earth take to rotate once on its axis?$q04$, $o04$["One year","One day (24 hours)","One month","One week"]$o04$, 1, $e04$The Earth rotates once on its axis in one day, which is about 24 hours.$e04$, 403),
 ('earth-space', '6.2', $q05$What causes the phases of the Moon?$q05$, $o05$["The Earth's shadow only","The changing position of the Moon relative to the Sun and Earth","The Moon passing in front of the Sun only","The rotation of the Sun"]$o05$, 1, $e05$The phases depend on how much of the sunlit side of the Moon we can see from Earth as it orbits.$e05$, 404),
 ('earth-space', '6.2', $q06$Which of these is a star?$q06$, $o06$["The Moon","The Sun","Mars","Pluto"]$o06$, 1, $e06$The Sun is a star. The Moon is a natural satellite, and Mars and Pluto are not stars.$e06$, 405),
 ('magnetism-electromagnetism', '4.1', $q07$What happens when two like magnetic poles are brought together?$q07$, $o07$["They attract","They repel","They have no effect","They become neutral"]$o07$, 1, $e07$Like poles repel and unlike poles attract.$e07$, 406),
 ('magnetism-electromagnetism', '4.1', $q08$Which statement describes magnetic field lines outside a bar magnet?$q08$, $o08$["They run from south to north","They run from north to south","They are circles around the edge only","They exist only inside the magnet"]$o08$, 1, $e08$Outside a magnet, field lines run from the north pole to the south pole.$e08$, 407),
 ('magnetism-electromagnetism', '4.5', $q09$Which change makes a solenoid stronger?$q09$, $o09$["Reducing the current","Adding an iron core and increasing the number of turns","Removing the iron core","Using a plastic core"]$o09$, 1, $e09$A larger current, more turns and an iron core all increase the strength of a solenoid.$e09$, 408),
 ('magnetism-electromagnetism', '4.5', $q10$What is the main advantage of an electromagnet over a permanent magnet?$q10$, $o10$["It is permanent","It can be switched on and off by the current","It needs no current","It always points north"]$o10$, 1, $e10$An electromagnet's field exists only while current flows, so it can be switched on and off.$e10$, 409),
 ('magnetism-electromagnetism', '4.5', $q11$What is the motor effect?$q11$, $o11$["A current is induced in a stationary wire","A force acts on a current-carrying conductor in a magnetic field","The current stops in a magnet","The magnetic field becomes zero"]$o11$, 1, $e11$The motor effect is the force on a current-carrying conductor placed in a magnetic field.$e11$, 410),
 ('magnetism-electromagnetism', '4.1', $q12$Why does a compass needle point roughly north?$q12$, $o12$["It is attracted to the Sun","It aligns with the Earth's magnetic field","It is attracted to the Moon","It is pushed by the wind"]$o12$, 1, $e12$A compass needle is a small magnet that aligns with the Earth's magnetic field.$e12$, 411),
 ('nuclear-physics', '5.1', $q13$What does an alpha particle consist of?$q13$, $o13$["Two protons and two neutrons","Two electrons","One proton only","Two neutrons only"]$o13$, 0, $e13$An alpha particle is a helium nucleus with two protons and two neutrons.$e13$, 412),
 ('nuclear-physics', '5.1', $q14$What happens in beta-minus emission?$q14$, $o14$["A proton changes into a neutron","A neutron changes into a proton and an electron is emitted","An alpha particle is emitted","A photon is emitted from the electron shell"]$o14$, 1, $e14$In beta-minus decay a neutron becomes a proton and an electron is emitted from the nucleus.$e14$, 413),
 ('nuclear-physics', '5.1', $q15$Which statement describes gamma radiation?$q15$, $o15$["It has a large positive charge","It has no mass and no charge","It has a negative charge","It has the mass of a proton"]$o15$, 1, $e15$Gamma radiation is electromagnetic, with no mass and no charge.$e15$, 414),
 ('nuclear-physics', '5.2', $q16$What is meant by the half-life of a radioactive isotope?$q16$, $o16$["The time for all nuclei to decay","The time for half the nuclei in a sample to decay","The time for the count rate to double","The time for the source to be removed"]$o16$, 1, $e16$Half-life is the time taken for half of the radioactive nuclei in a sample to decay.$e16$, 415),
 ('nuclear-physics', '5.2', $q17$A sample has a count rate of 800 counts per minute. What is the count rate after one half-life?$q17$, $o17$["200 counts per minute","400 counts per minute","800 counts per minute","1600 counts per minute"]$o17$, 1, $e17$After one half-life the count rate halves: 800 / 2 = 400 counts per minute.$e17$, 416),
 ('nuclear-physics', '5.2', $q18$How should background radiation be treated when measuring a count rate?$q18$, $o18$["Added to the measured count rate","Subtracted from the measured count rate","Ignored always","Used to double the count"]$o18$, 1, $e18$Background radiation is subtracted from the measured count rate to find the count rate from the source.$e18$, 417),
 ('thermal-physics', '2.1', $q19$Which process transfers thermal energy through a solid by vibrating particles passing energy along?$q19$, $o19$["Convection","Conduction","Radiation","Evaporation"]$o19$, 1, $e19$Conduction transfers energy through solids as particles vibrate and pass energy to neighbours.$e19$, 418),
 ('thermal-physics', '2.2', $q20$Why does convection happen in liquids and gases?$q20$, $o20$["Hot fluid is denser and sinks","Less dense hot fluid rises and cooler denser fluid takes its place","Only solids can convect","No particles move during convection"]$o20$, 1, $e20$Hotter fluid is less dense, so it rises, and cooler denser fluid sinks to replace it.$e20$, 419),
 ('thermal-physics', '2.3', $q21$Energy of 4200 J raises the temperature of 1 kg of water by 1 K. What is the specific heat capacity?$q21$, $o21$["4200 J/(kg K)","420 J/(kg K)","4.2 J/(kg K)","42 000 J/(kg K)"]$o21$, 0, $e21$c = Q / (m&Delta;T) = 4200 / (1 × 1) = 4200 J/(kg K).$e21$, 420),
 ('thermal-physics', '2.1', $q22$Which surface is the better absorber of infrared radiation?$q22$, $o22$["A shiny white surface","A matt black surface","Both are equal","Neither absorbs radiation"]$o22$, 1, $e22$Matt black surfaces absorb and emit infrared radiation better than shiny light surfaces.$e22$, 421),
 ('thermal-physics', '2.2', $q23$What is the name for the energy absorbed during a change of state at constant temperature?$q23$, $o23$["Specific heat capacity","Latent heat","Kinetic energy","Work"]$o23$, 1, $e23$Latent heat is absorbed or released during a change of state with no temperature change.$e23$, 422),
 ('thermal-physics', '2.3', $q24$How much energy is needed to heat 2 kg of water by 10 K? (c = 4200 J/(kg K))$q24$, $o24$["8400 J","42 000 J","84 000 J","840 J"]$o24$, 2, $e24$Q = mc&Delta;T = 2 × 4200 × 10 = 84 000 J.$e24$, 423),
 ('waves-sound', '3.1', $q25$A wave has a frequency of 5 Hz and a wavelength of 2 m. What is its speed?$q25$, $o25$["2.5 m/s","10 m/s","7 m/s","0.4 m/s"]$o25$, 1, $e25$v = f&lambda; = 5 × 2 = 10 m/s.$e25$, 424),
 ('waves-sound', '3.1', $q26$What type of wave is sound?$q26$, $o26$["A transverse wave","A longitudinal wave","An electromagnetic wave only","A stationary wave"]$o26$, 1, $e26$Sound is a longitudinal wave, in which particles vibrate parallel to the direction of travel.$e26$, 425),
 ('waves-sound', '3.2', $q27$At what speed do all electromagnetic waves travel in a vacuum?$q27$, $o27$["3 × 10⁵ m/s","3 × 10⁸ m/s","340 m/s","3 × 10³ m/s"]$o27$, 1, $e27$All electromagnetic waves travel at the speed of light, about 3 × 10⁸ m/s in a vacuum.$e27$, 426),
 ('waves-sound', '3.3', $q28$In reflection, how do the angle of incidence and the angle of reflection compare?$q28$, $o28$["They are unequal","They are equal","The reflected angle is double","The reflected angle is zero"]$o28$, 1, $e28$The law of reflection states that the angle of incidence equals the angle of reflection.$e28$, 427),
 ('waves-sound', '3.4', $q29$An echo returns after 2 s. Sound travels at 340 m/s. How far away is the reflecting wall?$q29$, $o29$["340 m","170 m","680 m","85 m"]$o29$, 0, $e29$The sound travels 340 × 2 = 680 m in total there and back, so the wall is 680 / 2 = 340 m away.$e29$, 428),
 ('waves-sound', '3.4', $q30$Through which medium can sound NOT travel?$q30$, $o30$["Air","Water","A vacuum","Steel"]$o30$, 2, $e30$Sound needs a medium to travel through, so it cannot pass through a vacuum.$e30$, 429)
) v(slug, code, qt, opts, ci, ex, so)
JOIN topics t ON t.slug = v.slug;

INSERT INTO flashcard_sets (topic_id, title, description)
SELECT t.id, 'Key terms: ' || t.slug, 'Extra recall for the Cambridge IGCSE physics topic.' FROM topics t WHERE t.slug IN ('earth-space','magnetism-electromagnetism','nuclear-physics','thermal-physics','waves-sound');

INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT fs.id, v.f, v.b, v.so FROM flashcard_sets fs JOIN topics t ON t.id = fs.topic_id
JOIN (VALUES
 ('earth-space','Satellite','an object that orbits a larger body',0),
 ('earth-space','Rotation period of the Earth','one day',1),
 ('earth-space','Orbital period of the Earth','one year',2),
 ('earth-space','Force keeping planets in orbit','gravity',3),
 ('earth-space','Cause of the Moon phases','the changing position of the Moon relative to the Sun and Earth',4),
 ('magnetism-electromagnetism','Like poles','repel',0),
 ('magnetism-electromagnetism','Field direction outside a magnet','north to south',1),
 ('magnetism-electromagnetism','Electromagnet advantage','switched on and off by the current',2),
 ('magnetism-electromagnetism','Motor effect','force on a current-carrying conductor in a magnetic field',3),
 ('magnetism-electromagnetism','Solenoid strength','more turns, larger current, iron core',4),
 ('nuclear-physics','Alpha particle','two protons and two neutrons',0),
 ('nuclear-physics','Beta-minus emission','neutron becomes proton and an electron is emitted',1),
 ('nuclear-physics','Gamma radiation','no mass and no charge',2),
 ('nuclear-physics','Half-life','time for half the nuclei in a sample to decay',3),
 ('nuclear-physics','Background radiation','subtract from the measured count rate',4),
 ('thermal-physics','Conduction','energy passed along by vibrating particles',0),
 ('thermal-physics','Convection','less dense hot fluid rises',1),
 ('thermal-physics','Specific heat capacity','Q = mc&Delta;T',2),
 ('thermal-physics','Latent heat','energy for a change of state at constant temperature',3),
 ('thermal-physics','Best infrared absorber','matt black surface',4),
 ('waves-sound','Wave equation','v = f&lambda;',0),
 ('waves-sound','Sound wave type','longitudinal',1),
 ('waves-sound','Speed of electromagnetic waves in vacuum','3 × 10⁸ m/s',2),
 ('waves-sound','Law of reflection','angle of incidence equals angle of reflection',3),
 ('waves-sound','Sound and vacuum','sound cannot travel through a vacuum',4)
) v(slug, f, b, so) ON v.slug = t.slug AND fs.title = 'Key terms: ' || t.slug
AND fs.description = 'Extra recall for the Cambridge IGCSE physics topic.'
;
