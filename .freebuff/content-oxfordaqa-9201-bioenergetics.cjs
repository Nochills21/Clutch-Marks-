// OxfordAQA International GCSE Biology 9201 — topic 3.2 Bioenergetics.
// Statements covered: 3.2.1 Photosynthesis, 3.2.2 Exchange and transport in
// plants, 3.2.3 Circulation in humans, 3.2.4 Digestion, 3.2.5 Breathing,
// 3.2.6 Respiration.
//
// One idea runs through all six subsections: a surface exchanges substances in
// proportion to its area, and an organism's demand grows with its volume. The
// leaf, the root hair, the alveolus, the villus and the capillary are five
// answers to the same problem, so they are taught together and cross-referenced
// rather than listed as five unrelated topics.
module.exports = {
  topicSlug: "bioenergetics",
  title: "IGCSE Biology (OxfordAQA): Bioenergetics",
  html: `<h2>Bioenergetics</h2>
<p>Life needs energy and materials, and this topic is about how a plant captures the first and how both plants and animals move the second around. Five structures in the specification look unrelated — the leaf, the root hair, the alveolus, the villus and the capillary — but they are the same solution to the same problem: a surface must be large, thin and moist, with a steep concentration gradient behind it, or the exchange will be too slow. Photosynthesis makes the sugar, respiration releases the energy, and circulation, digestion and breathing are the transport and supply systems that keep both running. Learn the structures with the reason for their shape and the "explain" questions answer themselves.</p>

<h3>1. Photosynthesis</h3>
<p>Photosynthesis uses light energy to convert carbon dioxide and water into glucose and oxygen, inside chloroplasts, in cells containing chlorophyll.</p>
<p>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ &nbsp; (light energy absorbed by chlorophyll)</p>
<p><em>Key:</em> CO₂ = carbon dioxide (g), taken in through the stomata; H₂O = water (l), absorbed by the roots; C₆H₁₂O₆ = glucose, used for growth, storage as starch, or converted to cellulose; O₂ = oxygen (g), released as a by-product.</p>
<p>Photosynthesis is <strong>endothermic</strong>: it takes energy in from light. Respiration is the opposite in that respect, releasing energy from glucose. A plant does both at once, which is why "plants photosynthesise and animals respire" is wrong — a plant respires all day and all night.</p>
<ul>
  <li><strong>Light intensity</strong> — more light, faster photosynthesis, until another factor becomes limiting.</li>
  <li><strong>Carbon dioxide concentration</strong> — a raw material, so more of it increases the rate up to a point.</li>
  <li><strong>Temperature</strong> — enzymes catalyse the reactions, so the rate rises with temperature until they denature.</li>
  <li><strong>Amount of chlorophyll</strong> — a variegated leaf photosynthesises more slowly in its white areas, which is the classic experiment.</li>
</ul>
<p>Whichever factor is in shortest supply is the <strong>limiting factor</strong>, and that is the one a graph plateaus against. A curve that levels off at high light intensity is limited by carbon dioxide or temperature, not by light.</p>

<h3>2. Worked example: testing a leaf for starch</h3>
<p>A leaf is boiled in ethanol, washed and tested with iodine. Explain why each step is done and predict the result for a leaf kept in the dark for 24 hours.</p>
<p>The leaf is boiled in water to break down the cell membranes, then in ethanol to remove the chlorophyll so the colour change can be seen; iodine solution turns blue-black where starch is present. A leaf kept in the dark cannot photosynthesise, so it uses up its stored starch in respiration and the iodine stays yellow-brown.</p>
<p><em>Key:</em> ethanol = the solvent that removes chlorophyll, heated in a water bath because ethanol is flammable; iodine = the test for starch; blue-black = starch present; yellow-brown = no starch.</p>
<p>The control matters: a destarched plant proves any starch found was made during the experiment, and a variegated leaf shows that only the green parts photosynthesise. Both are worth a mark in a "describe how you would show" question.</p>

<h3>3. Exchange and transport in plants</h3>
<p>Water and mineral ions enter through root hair cells, which are long and thin to give a large surface area, and travel up the stem in the xylem. Sugars made in the leaves travel in the phloem. The two tissues form a transport system in a plant that has no pump, which is why transpiration matters: water evaporating from the leaves pulls more water up behind it.</p>
<ul>
  <li><strong>Transpiration</strong> is the loss of water vapour from leaves, mostly through the stomata. It is fastest when it is warm, dry, windy and bright.</li>
  <li><strong>Translocation</strong> is the movement of sugars and amino acids through the phloem, from sources such as leaves to sinks such as roots, fruits and growing tips.</li>
  <li><strong>Stomata</strong> open in light and close in darkness or drought; guard cells control the pore, balancing carbon dioxide uptake against water loss.</li>
</ul>
<p>The transpiration rate is measured with a potometer, which measures water uptake rather than water loss — a distinction the exam asks for, because some of the water taken up is used in photosynthesis and some stays in the plant.</p>

<h3>4. Circulation in humans</h3>
<p>Humans have a double circulatory system: blood passes through the heart twice for each circuit of the body. The right side pumps deoxygenated blood to the lungs at low pressure, and the left side pumps oxygenated blood around the body at high pressure. Two circuits mean the blood keeps its pressure on the way to the body, which delivers oxygen faster.</p>
<table border="1">
  <tr><th>Blood vessel</th><th>Direction</th><th>Wall and lumen</th><th>Special feature</th></tr>
  <tr><td>Artery</td><td>Away from the heart</td><td>Thick muscular wall, narrow lumen</td><td>Withstands high pressure; elastic recoil maintains flow</td></tr>
  <tr><td>Vein</td><td>Towards the heart</td><td>Thin wall, wide lumen</td><td>Valves prevent backflow at low pressure</td></tr>
  <tr><td>Capillary</td><td>Between the two</td><td>One cell thick</td><td>Short diffusion distance for exchange with tissues</td></tr>
</table>
<p>Blood carries red cells (haemoglobin, no nucleus, biconcave), white cells (defence), platelets (clotting) and plasma (dissolved substances, including carbon dioxide and glucose). The heart has four chambers, with valves between atria and ventricles and at the exits, so blood flows one way; the left ventricle has the thickest wall because it pumps furthest.</p>

<h3>5. Worked example: cardiac output</h3>
<p>A student has a stroke volume of 70 cm³ and a heart rate of 72 beats per minute at rest, and 120 cm³ and 150 beats per minute during exercise. Calculate the cardiac output in each case and in litres per minute.</p>
<p>cardiac output = stroke volume × heart rate = 70 × 72 = 5 040 cm³/min = 5.04 dm³/min, and 120 × 150 = 18 000 cm³/min = 18.0 dm³/min.</p>
<p><em>Key:</em> cardiac output = the volume of blood pumped per minute (cm³/min or dm³/min); stroke volume = the volume pumped per beat (cm³); heart rate = beats per minute (bpm); 1 000 cm³ = 1 dm³ = 1 litre.</p>
<p>During exercise the output roughly triples, and both factors contribute: the heart beats more often and each beat is stronger. That is the physiological reason exercise raises the rate of oxygen delivery to muscles, not just the fact that "the heart beats faster".</p>

<h3>6. Digestion</h3>
<p>Digestion breaks large insoluble molecules into small soluble ones that can be absorbed. Mechanical digestion — chewing and the churning of the stomach — increases surface area; chemical digestion uses enzymes to hydrolyse bonds.</p>
<ul>
  <li><strong>Amylase</strong> (salivary and pancreatic) breaks starch into maltose.</li>
  <li><strong>Protease</strong> (stomach pepsin and pancreatic protease) breaks proteins into amino acids.</li>
  <li><strong>Lipase</strong> (pancreatic) breaks fats into fatty acids and glycerol.</li>
  <li><strong>Bile</strong> is made in the liver, stored in the gall bladder and released into the small intestine. It emulsifies fat into small droplets, increasing surface area for lipase, and neutralises stomach acid so the pancreatic enzymes can work.</li>
</ul>
<p>Absorption happens in the small intestine, whose lining is folded into villi. A villus has a thin wall, a rich blood supply and a lacteal, all of which keep the concentration gradient steep and the diffusion distance short. The colon absorbs water, leaving the remaining material as faeces.</p>
<table border="1">
  <tr><th>Food test</th><th>Reagent</th><th>Positive result</th></tr>
  <tr><td>Starch</td><td>Iodine solution</td><td>Blue-black</td></tr>
  <tr><td>Sugar (reducing)</td><td>Benedict's solution, heated</td><td>Brick-red precipitate</td></tr>
  <tr><td>Protein</td><td>Biuret solution</td><td>Purple</td></tr>
  <tr><td>Fat</td><td>Ethanol and water</td><td>Cloudy white emulsion</td></tr>
</table>

<h3>7. Breathing and gas exchange</h3>
<p>Breathing moves air in and out of the lungs; respiration is the chemical release of energy in cells. Confusing the two is the most common error in this topic.</p>
<ul>
  <li><strong>Inhaling:</strong> the intercostal muscles and diaphragm contract, the ribcage moves up and out, the diaphragm flattens, the thorax volume increases and the pressure falls, so air is drawn in.</li>
  <li><strong>Exhaling:</strong> the muscles relax, the ribcage moves down and in, the diaphragm domes upwards, volume falls and pressure rises, so air is pushed out.</li>
</ul>
<p>Gas exchange happens in the alveoli, which are adapted by having a very large total surface area, walls one cell thick, a moist lining and a dense capillary network. Oxygen diffuses from the air into the blood and carbon dioxide diffuses out, both down their concentration gradients. Smoking damages the alveoli, reducing surface area and causing emphysema.</p>

<h3>8. Respiration</h3>
<p>Respiration releases energy from glucose in every living cell, all the time. Aerobic respiration uses oxygen and releases far more energy per glucose molecule than anaerobic respiration, which does not use oxygen.</p>
<p>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O &nbsp; (aerobic, releases energy)</p>
<p><em>Key:</em> C₆H₁₂O₆ = glucose; O₂ = oxygen; CO₂ = carbon dioxide; H₂O = water; the energy released drives muscle contraction, active transport and the maintenance of body temperature.</p>
<p>During hard exercise the oxygen supply cannot keep up, so muscles respire anaerobically: glucose → lactic acid, releasing much less energy. Lactic acid builds up and contributes to muscle fatigue. The extra oxygen needed afterwards to break the lactic acid down is the <strong>oxygen debt</strong>, which is why breathing stays fast after exercise stops.</p>
<p>In yeast, anaerobic respiration produces ethanol and carbon dioxide — fermentation, which is how bread rises and how beer is brewed.</p>

<h3>9. Typical mistakes</h3>
<ul>
  <li>Saying plants only photosynthesise. They respire continuously as well.</li>
  <li>Writing "breathing releases energy". Breathing is ventilation; respiration releases energy.</li>
  <li>Claiming anaerobic respiration releases more energy because it is faster. It releases much less per glucose molecule.</li>
  <li>Forgetting bile's second job. Emulsification is the one everyone remembers; neutralising acid is the other mark.</li>
  <li>Saying arteries carry oxygenated blood. They carry blood away from the heart — the pulmonary artery carries deoxygenated blood.</li>
  <li>Giving the transpiration rate as water loss when a potometer measures uptake.</li>
  <li>Describing a villus as "thin" without saying what that achieves: a short diffusion distance.</li>
</ul>

<h3>10. Exam-style questions</h3>
<ol>
  <li>State the word equation for photosynthesis and name the organelle where it happens. <em>Answer:</em> Carbon dioxide + water → glucose + oxygen, using light energy absorbed by chlorophyll, in the chloroplast.</li>
  <li>Explain why the rate of photosynthesis stops increasing as light intensity rises. <em>Answer:</em> Light is no longer the limiting factor; another factor such as carbon dioxide concentration or temperature is now in shortest supply.</li>
  <li>Explain how the structure of an alveolus speeds up gas exchange. <em>Answer:</em> It has a very large surface area, a wall one cell thick for a short diffusion distance, a moist lining and a good blood supply to maintain a steep concentration gradient.</li>
  <li>Give two ways the small intestine is adapted for absorption. <em>Answer:</em> Its lining is folded into villi, which increase surface area, and each villus has a thin wall and a rich blood supply to maintain a concentration gradient.</li>
  <li>Calculate the cardiac output of a person with a stroke volume of 80 cm³ and a heart rate of 60 bpm. <em>Answer:</em> cardiac output = stroke volume × heart rate = 80 × 60 = 4 800 cm³/min = 4.8 dm³/min.</li>
  <li>Explain why the heart rate stays high after vigorous exercise. <em>Answer:</em> Muscles respired anaerobically and produced lactic acid; the extra oxygen is needed to break it down, which is the oxygen debt.</li>
  <li>Compare aerobic and anaerobic respiration in humans. <em>Answer:</em> Aerobic uses oxygen and releases much more energy per glucose, producing carbon dioxide and water; anaerobic happens without oxygen, releases less energy and produces lactic acid.</li>
  <li>Explain why a plant wilts faster on a hot, windy day. <em>Answer:</em> High temperature and wind increase the rate of transpiration, so water is lost faster than it is taken up, and the cells lose turgor.</li>
</ol>

<h3>11. Revision checklist</h3>
<ul>
  <li>I can write the photosynthesis equation and name the limiting factors.</li>
  <li>I can describe the starch test and explain why each step is done.</li>
  <li>I can compare xylem and phloem and describe transpiration and translocation.</li>
  <li>I can label the heart and compare arteries, veins and capillaries.</li>
  <li>I can calculate cardiac output and explain what changes during exercise.</li>
  <li>I can name the three digestive enzymes, their substrates and products.</li>
  <li>I can give the four food tests and their positive results.</li>
  <li>I can describe the mechanism of inhaling and exhaling.</li>
  <li>I can compare aerobic and anaerobic respiration and explain oxygen debt.</li>
</ul>
`,
};
