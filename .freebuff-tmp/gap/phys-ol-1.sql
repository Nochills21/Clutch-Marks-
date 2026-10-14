UPDATE study_materials SET content = content || $n$
<h3>Density in more depth</h3>
<p>Density is mass per unit volume, &rho; = m/V. Its SI unit is kg/m³, and 1 g/cm³ = 1000 kg/m³. An object of a given density will float in a fluid only if the fluid has a higher density. To find the density of an irregular solid, measure its mass on a balance and its volume by displacement of water in a measuring cylinder.</p>
<h3>Pressure and depth</h3>
<p>Pressure is force per unit area, p = F/A, with unit the pascal (Pa = N/m²). In a liquid, the pressure increases with depth, p = h&rho;g, and acts equally in all directions at a given depth. Atmospheric pressure at sea level is about 1.0 × 10⁵ Pa.</p>
<p><strong>Exam tip:</strong> convert the area to m² before you calculate pressure, and use the density in kg/m³ in p = h&rho;g.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'pressure-density');

UPDATE study_materials SET content = content || $n$
<h3>Work, power and energy transfer</h3>
<p>Work is done when a force moves an object through a distance in the direction of the force, W = Fd, measured in joules. Power is the rate of doing work, P = W/t, measured in watts. Energy is conserved: it is transferred from one store to another, and the total stays the same. The efficiency of a device is the useful energy output as a percentage of the total energy input, and it is always less than 100 percent.</p>
<p>Kinetic energy is &frac12;mv², and gravitational potential energy is mgh, which is the energy a mass gains when it is raised through height h near the Earth's surface.</p>
<p><strong>Exam tip:</strong> show the energy store changes in order, for example chemical to kinetic to thermal, when a question asks you to describe energy transfer.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'energy-work-power');

UPDATE study_materials SET content = content || $n$
<h3>Newton's laws in practice</h3>
<p>Weight is the gravitational force on a mass, W = mg, and it is measured in newtons. Mass is measured in kilograms and does not change with location, whereas weight does. Newton's second law states that F = ma, so a resultant force causes an acceleration in the same direction. Newton's third law states that when body A exerts a force on body B, B exerts an equal and opposite force on A, and the two forces act on different bodies.</p>
<p>Momentum is the product of mass and velocity, p = mv. In a closed system with no external force, the total momentum before and after a collision is the same.</p>
<p><strong>Exam tip:</strong> the reaction force in Newton's third law acts on the other body, so it cannot cancel the force you are analysing.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'forces-motion');

UPDATE study_materials SET content = content || $n$
<h3>Ohm's law and resistors</h3>
<p>For a conductor at constant temperature, the current is proportional to the potential difference across it, V = IR. In a series circuit, the current is the same at every point and the total resistance is the sum of the individual resistances. In a parallel circuit, the potential difference across each branch is the same and the current divides between the branches.</p>
<p>For two equal resistors in parallel, the combined resistance is half the value of one resistor. A fuse or circuit breaker protects the wiring by breaking the circuit when the current exceeds a safe value.</p>
<p><strong>Exam tip:</strong> state whether the circuit is series or parallel before applying a resistance rule.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'electricity-circuits');

UPDATE study_materials SET content = content || $n$
<h3>Making accurate measurements</h3>
<p>The SI base unit of length is the metre (m), and common multiples and submultiples are given in kilometres, centimetres and millimetres. A micrometer screw gauge measures small lengths to about 0.01 mm. A zero error is a reading that is not zero when it should be, and every reading must be corrected by it. Parallax error occurs when the eye is not directly in line with the scale, and it is avoided by reading the scale straight on.</p>
<p>Repeating a measurement and calculating the mean reduces random error. Time many oscillations of a pendulum and divide by the number, to reduce the effect of reaction time on a stopwatch.</p>
<p><strong>Exam tip:</strong> give a reading to the same precision as the instrument, and state the unit.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'measurement-units');

INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT (SELECT z.id FROM quizzes z WHERE z.topic_id = t.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1), v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', (SELECT ss.id FROM syllabus_statements ss WHERE ss.topic_id = t.id AND ss.code = v.code)
FROM (VALUES
 ('pressure-density', '1.4', $q01$A sample has a mass of 200 g and a volume of 50 cm³. What is its density?$q01$, $o01$["0.25 g/cm³","4 g/cm³","150 g/cm³","10 000 g/cm³"]$o01$, 1, $e01$Density = mass / volume = 200 / 50 = 4 g/cm³.$e01$, 300),
 ('pressure-density', '1.8', $q02$A force of 600 N acts normally on an area of 2 m². What is the pressure?$q02$, $o02$["1200 Pa","0.003 Pa","300 Pa","602 Pa"]$o02$, 2, $e02$p = F/A = 600 / 2 = 300 Pa.$e02$, 301),
 ('pressure-density', '1.8', $q03$Which statement about the pressure in a liquid is correct?$q03$, $o03$["It decreases with depth","It depends on depth and the density of the liquid","It does not depend on the density of the liquid","It acts only downwards"]$o03$, 1, $e03$The pressure in a liquid is p = h&rho;g, so it increases with depth and with density, and it acts in all directions.$e03$, 302),
 ('pressure-density', '1.8', $q04$An object floats in a liquid. What must be true about its density compared with the liquid?$q04$, $o04$["It is greater than the liquid","It is less than the liquid","It is equal to the liquid density and sinks","It is always 1000 kg/m³"]$o04$, 1, $e04$An object floats when its density is less than that of the fluid, so the weight of the fluid it displaces is equal to its weight.$e04$, 303),
 ('pressure-density', '1.4', $q05$What is 1 g/cm³ expressed in kg/m³?$q05$, $o05$["1","100","1000","10 000"]$o05$, 2, $e05$1 g/cm³ = 1 g / (10⁻² m)³ = 10⁻³ kg / 10⁻⁶ m³ = 1000 kg/m³.$e05$, 304),
 ('pressure-density', '1.4', $q06$A block has a volume of 0.5 m³ and a mass of 4000 kg. What is its density?$q06$, $o06$["2000 kg/m³","8000 kg/m³","800 kg/m³","0.000125 kg/m³"]$o06$, 1, $e06$Density = 4000 / 0.5 = 8000 kg/m³.$e06$, 305),
 ('energy-work-power', '1.7', $q07$A force of 20 N moves an object 5 m in the direction of the force. How much work is done?$q07$, $o07$["4 J","25 J","100 J","15 J"]$o07$, 2, $e07$W = Fd = 20 × 5 = 100 J.$e07$, 306),
 ('energy-work-power', '1.7', $q08$A machine does 500 J of work in 10 s. What is its power?$q08$, $o08$["5000 W","0.02 W","50 W","510 W"]$o08$, 2, $e08$P = W/t = 500 / 10 = 50 W.$e08$, 307),
 ('energy-work-power', '1.7', $q09$What is the kinetic energy of a 2 kg object moving at 3 m/s?$q09$, $o09$["3 J","6 J","12 J","9 J"]$o09$, 3, $e09$Ek = ½mv² = ½ × 2 × 3² = 9 J.$e09$, 308),
 ('energy-work-power', '1.7', $q10$A 2 kg mass is lifted through 5 m. What is its gain in gravitational potential energy? (g = 10 N/kg)$q10$, $o10$["100 J","10 J","50 J","20 J"]$o10$, 0, $e10$Ep = mgh = 2 × 10 × 5 = 100 J.$e10$, 309),
 ('energy-work-power', '1.7', $q11$A device has a useful output of 300 J from a total input of 500 J. What is its efficiency?$q11$, $o11$["167%","40%","60%","600%"]$o11$, 2, $e11$Efficiency = useful output / input × 100 = 300 / 500 × 100 = 60%.$e11$, 310),
 ('energy-work-power', '1.7', $q12$Which statement is a principle of energy?$q12$, $o12$["Energy can be created when work is done","Energy cannot be created or destroyed, only transferred or transformed","Energy is lost whenever a machine operates","Power and energy are the same quantity"]$o12$, 1, $e12$Energy is conserved. Work is a transfer of energy, and some energy is dissipated but not destroyed.$e12$, 311),
 ('forces-motion', '1.3', $q13$A 5 kg mass is in a gravitational field of 10 N/kg. What is its weight?$q13$, $o13$["0.5 N","5 N","50 N","500 N"]$o13$, 2, $e13$W = mg = 5 × 10 = 50 N.$e13$, 312),
 ('forces-motion', '1.5', $q14$A resultant force of 12 N acts on a 4 kg object. What is its acceleration?$q14$, $o14$["1.33 m/s²","7 m/s²","3 m/s²","0.75 m/s²"]$o14$, 2, $e14$a = F/m = 12 / 4 = 3 m/s².$e14$, 313),
 ('forces-motion', '1.6', $q15$A 2 kg object moves at 6 m/s. What is its momentum?$q15$, $o15$["3 kg m/s","8 kg m/s","12 kg m/s","6 kg m/s"]$o15$, 2, $e15$p = mv = 2 × 6 = 12 kg m/s.$e15$, 314),
 ('forces-motion', '1.2', $q16$A runner covers 100 m in 20 s. What is the average speed?$q16$, $o16$["2000 m/s","0.2 m/s","80 m/s","5 m/s"]$o16$, 3, $e16$Speed = distance / time = 100 / 20 = 5 m/s.$e16$, 315),
 ('forces-motion', '1.3', $q17$What is the unit of weight?$q17$, $o17$["kilogram","newton","metre","second"]$o17$, 1, $e17$Weight is a force, so its unit is the newton (N). The kilogram is the unit of mass.$e17$, 316),
 ('forces-motion', '1.5', $q18$According to Newton's third law, which statement is correct?$q18$, $o18$["Both forces act on the same body","The two forces are equal in size and opposite in direction, and act on different bodies","The two forces are unequal","Only the larger force acts"]$o18$, 1, $e18$Newton's third law pairs are equal, opposite and act on different bodies.$e18$, 317),
 ('electricity-circuits', '4.2', $q19$A current of 2 A flows through a 6 Ω resistor. What is the potential difference across it?$q19$, $o19$["3 V","8 V","12 V","0.33 V"]$o19$, 2, $e19$V = IR = 2 × 6 = 12 V.$e19$, 318),
 ('electricity-circuits', '4.3', $q20$A 4 Ω and a 6 Ω resistor are connected in series. What is the combined resistance?$q20$, $o20$["2.4 Ω","10 Ω","24 Ω","2 Ω"]$o20$, 1, $e20$In series the resistances add: 4 + 6 = 10 Ω.$e20$, 319),
 ('electricity-circuits', '4.3', $q21$Two 4 Ω resistors are connected in parallel. What is their combined resistance?$q21$, $o21$["8 Ω","4 Ω","0.5 Ω","2 Ω"]$o21$, 3, $e21$For two equal resistors in parallel, R = 4 × 4 / (4 + 4) = 2 Ω.$e21$, 320),
 ('electricity-circuits', '4.4', $q22$What is the purpose of a fuse in a circuit?$q22$, $o22$["To increase the current","To store electrical charge","To break the circuit if the current becomes too large","To reduce the potential difference"]$o22$, 2, $e22$A fuse melts and breaks the circuit when the current exceeds its rating, which protects the wiring.$e22$, 321),
 ('electricity-circuits', '4.4', $q23$Why is the earth wire of a three-pin plug connected to the metal casing of an appliance?$q23$, $o23$["To add extra voltage","To carry current away safely if a live wire touches the casing","To stop current flowing","To switch the appliance on"]$o23$, 1, $e23$If a live wire touches the metal casing, the earth wire carries the current away, which makes the fuse blow.$e23$, 322),
 ('electricity-circuits', '4.3', $q24$Which statement about current in a series circuit is correct?$q24$, $o24$["The current is the same at all points","The current is larger after each component","The current is shared equally between components","The voltage is the same across every component"]$o24$, 0, $e24$In a series circuit there is only one path, so the current is the same at every point.$e24$, 323),
 ('measurement-units', '1.1', $q25$What is the SI unit of length?$q25$, $o25$["centimetre","metre","millimetre","kilometre"]$o25$, 1, $e25$The SI base unit of length is the metre.$e25$, 324),
 ('measurement-units', '1.1', $q26$Convert 2.5 km to metres.$q26$, $o26$["25 m","250 m","2500 m","25 000 m"]$o26$, 2, $e26$1 km = 1000 m, so 2.5 km = 2500 m.$e26$, 325),
 ('measurement-units', '1.1', $q27$Which instrument measures very small lengths most accurately?$q27$, $o27$["A metre rule","A micrometer screw gauge","A stopwatch","A thermometer"]$o27$, 1, $e27$A micrometer screw gauge measures to about 0.01 mm, which is more precise than a ruler.$e27$, 326),
 ('measurement-units', '1.1', $q28$Why is the time for many pendulum swings measured and then divided by the number of swings?$q28$, $o28$["To reduce the effect of reaction time on the reading","To increase the length of the pendulum","To remove all systematic errors","To avoid using a stopwatch"]$o28$, 0, $e28$Timing many swings reduces the relative effect of the reaction time, which is a random error.$e28$, 327),
 ('measurement-units', '1.1', $q29$A balance reads 0.2 g when nothing is on it. What type of error is this?$q29$, $o29$["A random error that must be averaged out","A zero error that must be corrected","A parallax error","No error"]$o29$, 1, $e29$A reading that is not zero when it should be is a zero error, and each reading must be corrected by it.$e29$, 328),
 ('measurement-units', '1.1', $q30$A student reads a scale from an angle rather than straight on. What error is this?$q30$, $o30$["Parallax error","Zero error","Random error","Systematic error from the instrument calibration"]$o30$, 0, $e30$Reading from an angle causes parallax error. Reading the scale straight on, with the eye level with the mark, avoids it.$e30$, 329)
) v(slug, code, qt, opts, ci, ex, so)
JOIN topics t ON t.slug = v.slug;

INSERT INTO flashcard_sets (topic_id, title, description)
SELECT t.id, 'Key terms: ' || t.slug, 'Extra recall for the Cambridge IGCSE physics topic.' FROM topics t WHERE t.slug IN ('pressure-density','energy-work-power','forces-motion','electricity-circuits','measurement-units');

INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT fs.id, v.f, v.b, v.so FROM flashcard_sets fs JOIN topics t ON t.id = fs.topic_id
JOIN (VALUES
 ('pressure-density','Density formula','density = mass / volume',0),
 ('pressure-density','Pressure in a liquid','p = h&rho;g',1),
 ('pressure-density','Pressure definition','force per unit area, measured in pascals',2),
 ('pressure-density','Unit conversion for density','1 g/cm³ = 1000 kg/m³',3),
 ('pressure-density','When an object floats','its density is less than the fluid density',4),
 ('energy-work-power','Work done','W = Fd, in joules',0),
 ('energy-work-power','Power','P = W/t, in watts',1),
 ('energy-work-power','Kinetic energy','Ek = ½mv²',2),
 ('energy-work-power','Gravitational potential energy','Ep = mgh',3),
 ('energy-work-power','Efficiency','useful output / total input × 100',4),
 ('forces-motion','Newton second law','F = ma',0),
 ('forces-motion','Weight','W = mg, in newtons',1),
 ('forces-motion','Momentum','p = mv',2),
 ('forces-motion','Speed','distance / time',3),
 ('forces-motion','Newton third law','equal and opposite forces acting on different bodies',4),
 ('electricity-circuits','Ohm law','V = IR',0),
 ('electricity-circuits','Series resistance','resistances add',1),
 ('electricity-circuits','Parallel resistance','1/R = 1/R1 + 1/R2',2),
 ('electricity-circuits','Purpose of a fuse','breaks the circuit if the current is too large',3),
 ('electricity-circuits','Earth wire','carries current away if a live wire touches the casing',4),
 ('measurement-units','SI unit of length','metre',0),
 ('measurement-units','Parallax error','reading a scale from an angle',1),
 ('measurement-units','Zero error','a reading that is not zero when it should be',2),
 ('measurement-units','Micrometer screw gauge','measures small lengths to about 0.01 mm',3),
 ('measurement-units','Reducing random error','repeat and take a mean',4)
) v(slug, f, b, so) ON v.slug = t.slug AND fs.title = 'Key terms: ' || t.slug
AND fs.description = 'Extra recall for the Cambridge IGCSE physics topic.'
;
