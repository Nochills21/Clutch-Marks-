with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$biology-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organisation$lit$
), upd as (
  update public.study_materials sm
  set content = $lit$<h2>Organisation</h2>
<p>All living things are made of cells, and almost every question in this topic is really asking how a structure suits a job. A root hair cell is long and thin because it absorbs water; a red blood cell has no nucleus because it needs room for haemoglobin; a leaf is thin because gas has a short distance to diffuse. This topic builds that argument from the bottom up: the organelles inside a cell, the specialised cells they make, the tissues those cells form, the organs and systems those tissues build, and finally the three processes — diffusion, osmosis and active transport — by which substances move into, out of and around an organism. Learn the structures and their functions together, because a name without a reason earns half a mark.</p>

<h3>1. Animal and plant cells</h3>
<p>Animal and plant cells are eukaryotic: their genetic material is enclosed in a nucleus, and they contain membrane-bound organelles. A bacterial cell is prokaryotic — smaller, with no nucleus and no membrane-bound organelles, and with its DNA loose in the cytoplasm.</p>
<table border="1">
  <tr><th>Part</th><th>Function</th><th>Animal</th><th>Plant</th></tr>
  <tr><td>Nucleus</td><td>Contains the DNA that controls the cell's activities</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Cytoplasm</td><td>Where most chemical reactions happen</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Cell membrane</td><td>Controls what enters and leaves the cell</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Mitochondria</td><td>Site of aerobic respiration, releasing energy</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Ribosomes</td><td>Site of protein synthesis</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Chloroplasts</td><td>Absorb light energy for photosynthesis</td><td>No</td><td>Yes</td></tr>
  <tr><td>Permanent vacuole</td><td>Filled with cell sap; keeps the cell turgid</td><td>No</td><td>Yes</td></tr>
  <tr><td>Cell wall</td><td>Made of cellulose; strengthens and supports the cell</td><td>No</td><td>Yes</td></tr>
</table>
<p>Two distinctions are examined constantly. A cell wall is not a cell membrane: the membrane controls what passes, while the wall is a strong outer layer that does not. And a bacterial cell has a wall but no cellulose in it, no nucleus, and no mitochondria, which is why "bacteria are just small plant cells" is wrong.</p>

<h3>2. Specialised cells and how their shape suits their job</h3>
<p>A specialised cell has a structure adapted to one function. Exam answers score by naming the adaptation and then explaining the advantage, so each pair below is written that way.</p>
<ul>
  <li><strong>Sperm cell:</strong> a tail for swimming and many mitochondria to supply energy, so it can travel to the egg.</li>
  <li><strong>Nerve cell:</strong> very long, with branches at each end, so it can carry an electrical impulse between distant parts of the body.</li>
  <li><strong>Muscle cell:</strong> contains protein fibres that shorten, so the cell can contract and produce movement.</li>
  <li><strong>Root hair cell:</strong> a long extension that increases surface area, so more water and mineral ions can be absorbed.</li>
  <li><strong>Red blood cell:</strong> a biconcave disc with no nucleus, giving a large surface area and more room for haemoglobin to carry oxygen.</li>
  <li><strong>Palisade cell:</strong> packed with chloroplasts and positioned near the leaf surface, so it absorbs the most light for photosynthesis.</li>
  <li><strong>Ciliated cell:</strong> tiny hairs beat to move mucus, as in the airways, keeping dust and bacteria out of the lungs.</li>
</ul>

<h3>3. Microscopy and magnification</h3>
<p>Light microscopes magnify up to about 2000 times and show colour, but their resolution — the ability to distinguish two close points — is limited by the wavelength of light. Electron microscopes use a beam of electrons, so they resolve much smaller structures and magnify far more, which is how ribosomes and the internal detail of mitochondria were seen.</p>
<p>magnification = image size ÷ actual size</p>
<p><em>Key:</em> magnification = how many times larger the image is (no unit); image size = the measured size of the drawing or photograph (mm or µm); actual size = the real size of the object, in the same unit.</p>
<p>The unit rule is where marks are lost. 1 mm = 1000 µm, and 1 µm = 1000 nm, so a measurement in millimetres must be converted before it is divided by a size given in micrometres. Write the conversion down as its own line; examiners award it.</p>

<h3>4. Worked example: magnification and cell size</h3>
<p>A photograph of a cell is 60 mm across. The magnification is ×1500. Calculate the actual diameter of the cell in micrometres.</p>
<p>actual size = image size ÷ magnification = 60 mm ÷ 1500 = 0.040 mm. Then 0.040 mm × 1000 = 40 µm.</p>
<p><em>Key:</em> image size = 60 mm, the measured width on the photograph; magnification = ×1500, given by the label; 1000 = the number of micrometres in one millimetre.</p>
<p>Check the answer against what you know: a typical animal cell is 10–50 µm across, so 40 µm is sensible. A result of 40 mm or 40 nm would tell you the conversion went the wrong way.</p>

<h3>5. From cells to organ systems</h3>
<p>Cells with a similar function group into a tissue; tissues working together form an organ; organs working together form an organ system; systems make the organism. The order matters, and "organ system" is not a synonym for "organ".</p>
<ul>
  <li><strong>Animal tissues:</strong> muscular tissue contracts, glandular tissue secretes substances such as enzymes, and epithelial tissue covers surfaces and lines cavities.</li>
  <li><strong>The stomach</strong> is an organ built from all three: muscular tissue to churn, glandular tissue to release enzymes and acid, and epithelial tissue to line it.</li>
  <li><strong>The digestive system</strong> is the organ system — stomach, small intestine, large intestine, liver and pancreas — whose organs work together to break down and absorb food.</li>
</ul>

<h3>6. Plant tissues, organs and systems</h3>
<p>A leaf is the plant's main photosynthetic organ, and its tissues are arranged so that light, carbon dioxide and water all arrive where they are needed.</p>
<ul>
  <li><strong>Epidermal tissue</strong> covers the leaf and reduces water loss; the upper surface has a waxy cuticle.</li>
  <li><strong>Palisade mesophyll</strong> sits near the upper surface, packed with chloroplasts for photosynthesis.</li>
  <li><strong>Spongy mesophyll</strong> has air spaces that let carbon dioxide reach the cells.</li>
  <li><strong>Xylem</strong> carries water and mineral ions up from the roots and supports the stem.</li>
  <li><strong>Phloem</strong> carries sugars from the leaves to the rest of the plant.</li>
  <li><strong>Meristem tissue</strong> at the tips of shoots and roots divides to produce new growth.</li>
</ul>
<p>Stomata are pores in the lower epidermis, opened and closed by guard cells. They let carbon dioxide in and water vapour out, which is why a plant in bright light faces a trade: open stomata mean more photosynthesis but also more water lost by transpiration.</p>

<h3>7. Transport in cells: diffusion, osmosis and active transport</h3>
<p>Three processes move substances across a membrane, and the exam distinguishes them by whether energy is needed and whether the movement is random.</p>
<ul>
  <li><strong>Diffusion</strong> is the net movement of particles from a region of higher concentration to one of lower concentration, by random motion. It needs no energy and happens in both directions until the concentrations even out. Oxygen diffuses into cells and carbon dioxide out.</li>
  <li><strong>Osmosis</strong> is the diffusion of water through a partially permeable membrane, from a dilute solution to a more concentrated one. It needs no energy, and only water moves.</li>
  <li><strong>Active transport</strong> moves substances against the concentration gradient, from low to high, and therefore needs energy from respiration. Root hair cells use it to take in mineral ions from soil water that is more dilute than the cell.</li>
</ul>
<p>The rate of diffusion depends on the concentration gradient, the temperature, the surface area available and the distance over which it has to travel. That single sentence explains why the small intestine has villi, why leaves are thin and why lungs have alveoli.</p>

<h3>8. Worked example: surface area to volume ratio</h3>
<p>Two cubes of agar are placed in acid. Cube A is 2 cm on each side; cube B is 1 cm. Calculate the surface area to volume ratio of each and say which decolourises first.</p>
<p>Cube A: surface area = 6 × 2 × 2 = 24 cm²; volume = 2 × 2 × 2 = 8 cm³; ratio = 24 ÷ 8 = 3.0. Cube B: surface area = 6 × 1 × 1 = 6 cm²; volume = 1 cm³; ratio = 6.0.</p>
<p><em>Key:</em> surface area = 6 × side² (cm²); volume = side³ (cm³); the ratio is surface area ÷ volume, with no unit.</p>
<p>Cube B has the larger ratio, so a greater proportion of its material is within reach of the acid and it decolourises first. This is the reasoning behind every "explain why small organisms do not need a transport system" question: as an organism gets bigger, its volume grows faster than its surface area, so diffusion alone cannot supply it.</p>

<h3>9. Typical mistakes</h3>
<ul>
  <li>Saying osmosis is "water moving from high to low concentration" without the membrane and the words "dilute solution". Both are required for the mark.</li>
  <li>Confusing the cell wall with the cell membrane, or claiming an animal cell has a wall.</li>
  <li>Writing "the cell gets bigger" instead of naming the adaptation and its advantage.</li>
  <li>Mixing up units: dividing 60 mm by 1500 and reporting the answer in micrometres without multiplying by 1000.</li>
  <li>Calling active transport "diffusion with energy". Diffusion is passive and follows the gradient; active transport goes against it.</li>
  <li>Saying a plant wilts because its cells lose their cell walls. They lose water and the vacuole no longer presses on the wall, so the cell is no longer turgid.</li>
</ul>

<h3>10. Exam-style questions</h3>
<ol>
  <li>Give two structures present in a plant cell but not in an animal cell, and state one function of each. <em>Answer:</em> A chloroplast, which absorbs light energy for photosynthesis, and a permanent vacuole filled with cell sap, which keeps the cell turgid. A cellulose cell wall also strengthens the cell.</li>
  <li>Explain how the structure of a root hair cell helps it absorb water. <em>Answer:</em> It has a long, thin extension that increases its surface area, so more water can diffuse in across the membrane by osmosis.</li>
  <li>A cell is drawn 45 mm long at a magnification of ×900. Calculate its actual length in micrometres. <em>Answer:</em> 45 mm ÷ 900 = 0.050 mm, and 0.050 × 1000 = 50 µm.</li>
  <li>Explain why a single-celled organism can rely on diffusion but a large animal cannot. <em>Answer:</em> A single cell has a large surface area to volume ratio, so diffusion over a short distance supplies it fast enough. A large animal has a small ratio and a long diffusion distance, so it needs a transport system and exchange surfaces.</li>
  <li>Describe the difference between diffusion and active transport. <em>Answer:</em> Diffusion is passive and moves particles down a concentration gradient, while active transport uses energy from respiration to move substances against the gradient.</li>
  <li>A plant is placed in a concentrated salt solution and wilts. Explain what happens to its cells. <em>Answer:</em> The solution outside is more concentrated than the cell sap, so water leaves the cells by osmosis. The vacuole shrinks, the cells lose turgor and the plant wilts.</li>
  <li>Name the tissue that transports water up a plant and state one other function of it. <em>Answer:</em> Xylem; it also supports the stem.</li>
  <li>Why is the leaf thin? <em>Answer:</em> A thin leaf gives carbon dioxide a short distance to diffuse to the photosynthetic cells and allows light to reach the palisade layer.</li>
</ol>

<h3>11. Revision checklist</h3>
<ul>
  <li>I can label animal, plant and bacterial cells and give each organelle's function.</li>
  <li>I can describe four specialised cells and explain each adaptation.</li>
  <li>I can use magnification = image ÷ actual, with mm, µm and nm converted correctly.</li>
  <li>I can order cells, tissues, organs, systems and organisms.</li>
  <li>I can name the tissues of the stomach and of a leaf and say what each does.</li>
  <li>I can define diffusion, osmosis and active transport and give an example of each.</li>
  <li>I can calculate a surface area to volume ratio and explain its consequences.</li>
  <li>I can explain what happens to a plant cell in pure water and in a concentrated solution.</li>
</ul>
$lit$, material_type = 'notes', updated_at = now()
  from t
  where sm.topic_id = t.id and sm.title = $lit$IGCSE Biology (OxfordAQA): Organisation$lit$
  returning sm.id
)
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, $lit$IGCSE Biology (OxfordAQA): Organisation$lit$, $lit$<h2>Organisation</h2>
<p>All living things are made of cells, and almost every question in this topic is really asking how a structure suits a job. A root hair cell is long and thin because it absorbs water; a red blood cell has no nucleus because it needs room for haemoglobin; a leaf is thin because gas has a short distance to diffuse. This topic builds that argument from the bottom up: the organelles inside a cell, the specialised cells they make, the tissues those cells form, the organs and systems those tissues build, and finally the three processes — diffusion, osmosis and active transport — by which substances move into, out of and around an organism. Learn the structures and their functions together, because a name without a reason earns half a mark.</p>

<h3>1. Animal and plant cells</h3>
<p>Animal and plant cells are eukaryotic: their genetic material is enclosed in a nucleus, and they contain membrane-bound organelles. A bacterial cell is prokaryotic — smaller, with no nucleus and no membrane-bound organelles, and with its DNA loose in the cytoplasm.</p>
<table border="1">
  <tr><th>Part</th><th>Function</th><th>Animal</th><th>Plant</th></tr>
  <tr><td>Nucleus</td><td>Contains the DNA that controls the cell's activities</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Cytoplasm</td><td>Where most chemical reactions happen</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Cell membrane</td><td>Controls what enters and leaves the cell</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Mitochondria</td><td>Site of aerobic respiration, releasing energy</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Ribosomes</td><td>Site of protein synthesis</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Chloroplasts</td><td>Absorb light energy for photosynthesis</td><td>No</td><td>Yes</td></tr>
  <tr><td>Permanent vacuole</td><td>Filled with cell sap; keeps the cell turgid</td><td>No</td><td>Yes</td></tr>
  <tr><td>Cell wall</td><td>Made of cellulose; strengthens and supports the cell</td><td>No</td><td>Yes</td></tr>
</table>
<p>Two distinctions are examined constantly. A cell wall is not a cell membrane: the membrane controls what passes, while the wall is a strong outer layer that does not. And a bacterial cell has a wall but no cellulose in it, no nucleus, and no mitochondria, which is why "bacteria are just small plant cells" is wrong.</p>

<h3>2. Specialised cells and how their shape suits their job</h3>
<p>A specialised cell has a structure adapted to one function. Exam answers score by naming the adaptation and then explaining the advantage, so each pair below is written that way.</p>
<ul>
  <li><strong>Sperm cell:</strong> a tail for swimming and many mitochondria to supply energy, so it can travel to the egg.</li>
  <li><strong>Nerve cell:</strong> very long, with branches at each end, so it can carry an electrical impulse between distant parts of the body.</li>
  <li><strong>Muscle cell:</strong> contains protein fibres that shorten, so the cell can contract and produce movement.</li>
  <li><strong>Root hair cell:</strong> a long extension that increases surface area, so more water and mineral ions can be absorbed.</li>
  <li><strong>Red blood cell:</strong> a biconcave disc with no nucleus, giving a large surface area and more room for haemoglobin to carry oxygen.</li>
  <li><strong>Palisade cell:</strong> packed with chloroplasts and positioned near the leaf surface, so it absorbs the most light for photosynthesis.</li>
  <li><strong>Ciliated cell:</strong> tiny hairs beat to move mucus, as in the airways, keeping dust and bacteria out of the lungs.</li>
</ul>

<h3>3. Microscopy and magnification</h3>
<p>Light microscopes magnify up to about 2000 times and show colour, but their resolution — the ability to distinguish two close points — is limited by the wavelength of light. Electron microscopes use a beam of electrons, so they resolve much smaller structures and magnify far more, which is how ribosomes and the internal detail of mitochondria were seen.</p>
<p>magnification = image size ÷ actual size</p>
<p><em>Key:</em> magnification = how many times larger the image is (no unit); image size = the measured size of the drawing or photograph (mm or µm); actual size = the real size of the object, in the same unit.</p>
<p>The unit rule is where marks are lost. 1 mm = 1000 µm, and 1 µm = 1000 nm, so a measurement in millimetres must be converted before it is divided by a size given in micrometres. Write the conversion down as its own line; examiners award it.</p>

<h3>4. Worked example: magnification and cell size</h3>
<p>A photograph of a cell is 60 mm across. The magnification is ×1500. Calculate the actual diameter of the cell in micrometres.</p>
<p>actual size = image size ÷ magnification = 60 mm ÷ 1500 = 0.040 mm. Then 0.040 mm × 1000 = 40 µm.</p>
<p><em>Key:</em> image size = 60 mm, the measured width on the photograph; magnification = ×1500, given by the label; 1000 = the number of micrometres in one millimetre.</p>
<p>Check the answer against what you know: a typical animal cell is 10–50 µm across, so 40 µm is sensible. A result of 40 mm or 40 nm would tell you the conversion went the wrong way.</p>

<h3>5. From cells to organ systems</h3>
<p>Cells with a similar function group into a tissue; tissues working together form an organ; organs working together form an organ system; systems make the organism. The order matters, and "organ system" is not a synonym for "organ".</p>
<ul>
  <li><strong>Animal tissues:</strong> muscular tissue contracts, glandular tissue secretes substances such as enzymes, and epithelial tissue covers surfaces and lines cavities.</li>
  <li><strong>The stomach</strong> is an organ built from all three: muscular tissue to churn, glandular tissue to release enzymes and acid, and epithelial tissue to line it.</li>
  <li><strong>The digestive system</strong> is the organ system — stomach, small intestine, large intestine, liver and pancreas — whose organs work together to break down and absorb food.</li>
</ul>

<h3>6. Plant tissues, organs and systems</h3>
<p>A leaf is the plant's main photosynthetic organ, and its tissues are arranged so that light, carbon dioxide and water all arrive where they are needed.</p>
<ul>
  <li><strong>Epidermal tissue</strong> covers the leaf and reduces water loss; the upper surface has a waxy cuticle.</li>
  <li><strong>Palisade mesophyll</strong> sits near the upper surface, packed with chloroplasts for photosynthesis.</li>
  <li><strong>Spongy mesophyll</strong> has air spaces that let carbon dioxide reach the cells.</li>
  <li><strong>Xylem</strong> carries water and mineral ions up from the roots and supports the stem.</li>
  <li><strong>Phloem</strong> carries sugars from the leaves to the rest of the plant.</li>
  <li><strong>Meristem tissue</strong> at the tips of shoots and roots divides to produce new growth.</li>
</ul>
<p>Stomata are pores in the lower epidermis, opened and closed by guard cells. They let carbon dioxide in and water vapour out, which is why a plant in bright light faces a trade: open stomata mean more photosynthesis but also more water lost by transpiration.</p>

<h3>7. Transport in cells: diffusion, osmosis and active transport</h3>
<p>Three processes move substances across a membrane, and the exam distinguishes them by whether energy is needed and whether the movement is random.</p>
<ul>
  <li><strong>Diffusion</strong> is the net movement of particles from a region of higher concentration to one of lower concentration, by random motion. It needs no energy and happens in both directions until the concentrations even out. Oxygen diffuses into cells and carbon dioxide out.</li>
  <li><strong>Osmosis</strong> is the diffusion of water through a partially permeable membrane, from a dilute solution to a more concentrated one. It needs no energy, and only water moves.</li>
  <li><strong>Active transport</strong> moves substances against the concentration gradient, from low to high, and therefore needs energy from respiration. Root hair cells use it to take in mineral ions from soil water that is more dilute than the cell.</li>
</ul>
<p>The rate of diffusion depends on the concentration gradient, the temperature, the surface area available and the distance over which it has to travel. That single sentence explains why the small intestine has villi, why leaves are thin and why lungs have alveoli.</p>

<h3>8. Worked example: surface area to volume ratio</h3>
<p>Two cubes of agar are placed in acid. Cube A is 2 cm on each side; cube B is 1 cm. Calculate the surface area to volume ratio of each and say which decolourises first.</p>
<p>Cube A: surface area = 6 × 2 × 2 = 24 cm²; volume = 2 × 2 × 2 = 8 cm³; ratio = 24 ÷ 8 = 3.0. Cube B: surface area = 6 × 1 × 1 = 6 cm²; volume = 1 cm³; ratio = 6.0.</p>
<p><em>Key:</em> surface area = 6 × side² (cm²); volume = side³ (cm³); the ratio is surface area ÷ volume, with no unit.</p>
<p>Cube B has the larger ratio, so a greater proportion of its material is within reach of the acid and it decolourises first. This is the reasoning behind every "explain why small organisms do not need a transport system" question: as an organism gets bigger, its volume grows faster than its surface area, so diffusion alone cannot supply it.</p>

<h3>9. Typical mistakes</h3>
<ul>
  <li>Saying osmosis is "water moving from high to low concentration" without the membrane and the words "dilute solution". Both are required for the mark.</li>
  <li>Confusing the cell wall with the cell membrane, or claiming an animal cell has a wall.</li>
  <li>Writing "the cell gets bigger" instead of naming the adaptation and its advantage.</li>
  <li>Mixing up units: dividing 60 mm by 1500 and reporting the answer in micrometres without multiplying by 1000.</li>
  <li>Calling active transport "diffusion with energy". Diffusion is passive and follows the gradient; active transport goes against it.</li>
  <li>Saying a plant wilts because its cells lose their cell walls. They lose water and the vacuole no longer presses on the wall, so the cell is no longer turgid.</li>
</ul>

<h3>10. Exam-style questions</h3>
<ol>
  <li>Give two structures present in a plant cell but not in an animal cell, and state one function of each. <em>Answer:</em> A chloroplast, which absorbs light energy for photosynthesis, and a permanent vacuole filled with cell sap, which keeps the cell turgid. A cellulose cell wall also strengthens the cell.</li>
  <li>Explain how the structure of a root hair cell helps it absorb water. <em>Answer:</em> It has a long, thin extension that increases its surface area, so more water can diffuse in across the membrane by osmosis.</li>
  <li>A cell is drawn 45 mm long at a magnification of ×900. Calculate its actual length in micrometres. <em>Answer:</em> 45 mm ÷ 900 = 0.050 mm, and 0.050 × 1000 = 50 µm.</li>
  <li>Explain why a single-celled organism can rely on diffusion but a large animal cannot. <em>Answer:</em> A single cell has a large surface area to volume ratio, so diffusion over a short distance supplies it fast enough. A large animal has a small ratio and a long diffusion distance, so it needs a transport system and exchange surfaces.</li>
  <li>Describe the difference between diffusion and active transport. <em>Answer:</em> Diffusion is passive and moves particles down a concentration gradient, while active transport uses energy from respiration to move substances against the gradient.</li>
  <li>A plant is placed in a concentrated salt solution and wilts. Explain what happens to its cells. <em>Answer:</em> The solution outside is more concentrated than the cell sap, so water leaves the cells by osmosis. The vacuole shrinks, the cells lose turgor and the plant wilts.</li>
  <li>Name the tissue that transports water up a plant and state one other function of it. <em>Answer:</em> Xylem; it also supports the stem.</li>
  <li>Why is the leaf thin? <em>Answer:</em> A thin leaf gives carbon dioxide a short distance to diffuse to the photosynthetic cells and allows light to reach the palisade layer.</li>
</ol>

<h3>11. Revision checklist</h3>
<ul>
  <li>I can label animal, plant and bacterial cells and give each organelle's function.</li>
  <li>I can describe four specialised cells and explain each adaptation.</li>
  <li>I can use magnification = image ÷ actual, with mm, µm and nm converted correctly.</li>
  <li>I can order cells, tissues, organs, systems and organisms.</li>
  <li>I can name the tissues of the stomach and of a leaf and say what each does.</li>
  <li>I can define diffusion, osmosis and active transport and give an example of each.</li>
  <li>I can calculate a surface area to volume ratio and explain its consequences.</li>
  <li>I can explain what happens to a plant cell in pure water and in a concentrated solution.</li>
</ul>
$lit$, 'notes'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$biology-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$bioenergetics$lit$
), upd as (
  update public.study_materials sm
  set content = $lit$<h2>Bioenergetics</h2>
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
$lit$, material_type = 'notes', updated_at = now()
  from t
  where sm.topic_id = t.id and sm.title = $lit$IGCSE Biology (OxfordAQA): Bioenergetics$lit$
  returning sm.id
)
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, $lit$IGCSE Biology (OxfordAQA): Bioenergetics$lit$, $lit$<h2>Bioenergetics</h2>
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
$lit$, 'notes'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$biology-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$ecology$lit$
), upd as (
  update public.study_materials sm
  set content = $lit$<h2>Ecology</h2>
<p>An ecosystem is a community of organisms interacting with each other and with their physical surroundings, and almost every question about one is a question about energy or about a limit. Energy enters as sunlight, is captured by producers, and loses most of itself at every step up a food chain; organisms compete for the rest, and their adaptations decide who wins. This topic also contains two calculations that are easy marks if you keep the units straight — the efficiency of energy transfer and a population estimate from quadrats — and one cycle, carbon, that links every living thing to the atmosphere. The last subsection turns the same ideas on us: what happens to an ecosystem when a forest is cleared or a river is polluted.</p>

<h3>1. Feeding relationships</h3>
<p>Photosynthetic organisms are <strong>producers</strong>: they capture light energy and store it in glucose, which becomes the starting point of every food chain. Organisms that eat others are <strong>consumers</strong>, and decomposers break down dead material and return nutrients to the soil.</p>
<ul>
  <li><strong>Primary consumer</strong> — eats a producer (a herbivore).</li>
  <li><strong>Secondary consumer</strong> — eats a primary consumer (a carnivore).</li>
  <li><strong>Tertiary consumer</strong> — eats a secondary consumer.</li>
  <li><strong>Decomposer</strong> — bacteria and fungi that break down dead organisms and waste, releasing minerals such as nitrates and carbon dioxide.</li>
</ul>
<p>Each step is a <strong>trophic level</strong>. A food chain shows one route; a food web shows all of them, which is why removing one species from a web affects many others — that is <strong>interdependence</strong>. A pyramid of biomass shows the mass of living material at each level and is almost always widest at the bottom.</p>

<h3>2. Energy transfer and efficiency</h3>
<p>Only about 10 % of the energy at one trophic level is passed to the next. The rest is lost as heat from respiration, used in movement, lost in waste materials, or left in parts that are not eaten. This is why food chains rarely have more than four or five levels: there is simply not enough energy left.</p>
<p>efficiency = (energy transferred to the next level ÷ energy available at the previous level) × 100</p>
<p><em>Key:</em> efficiency = the percentage of energy passed on (%); energy transferred = the energy in the organisms at the next trophic level (kJ); energy available = the energy in the organisms being eaten (kJ).</p>
<p>A pyramid of biomass is not the same as a pyramid of energy. Biomass is a snapshot of mass at one moment; energy flow is measured over time. A pyramid of biomass can occasionally be inverted — for example where the producers are tiny phytoplankton that reproduce very fast — while a pyramid of energy never is.</p>

<h3>3. Adaptations, competition and interdependence</h3>
<p>An adaptation is a feature that helps an organism survive in its habitat. Examiners want three words: the feature, the advantage, and the reason it matters.</p>
<ul>
  <li><strong>Structural</strong> — a physical feature. A polar bear's thick fur and fat layer reduce heat loss; a cactus has spines instead of leaves to reduce water loss.</li>
  <li><strong>Behavioural</strong> — what the organism does. Desert animals are active at night to avoid the heat; some birds migrate to find food.</li>
  <li><strong>Functional</strong> — a physiological process. A camel conserves water by producing concentrated urine; some fish can change the amount of salt they excrete.</li>
</ul>
<p><strong>Competition</strong> happens when organisms need the same resource that is in short supply — light, water, space, food or a mate. Organisms that compete successfully are more likely to survive and reproduce, which is natural selection in one sentence. <strong>Extremophiles</strong> are adapted to conditions that would kill most life, such as high temperature, high salt or high pressure.</p>

<h3>4. Sampling: quadrats and transects</h3>
<p>You cannot count every organism, so ecologists sample. A quadrat is a square frame placed at random; counting within several quadrats gives an estimate for the whole area. A transect is a line across a habitat, with quadrats placed along it, used when conditions change from one place to another — for example from a path into a wood.</p>
<p>estimated population = (mean number per quadrat × total area) ÷ area of one quadrat</p>
<p><em>Key:</em> estimated population = the total number in the habitat (individuals); mean per quadrat = the average count from the samples; total area = the area of the whole habitat (m²); area of one quadrat = the area covered by the frame (m²).</p>
<p>Random placement matters. Throwing the quadrat over the shoulder, or always placing it where the flowers are, produces a biased estimate — and "state one way to make the sampling more reliable" wants either random placement or a larger number of samples.</p>

<h3>5. Worked example: population estimate and energy efficiency</h3>
<p>A student places ten 0.25 m² quadrats in a 400 m² field and counts 4, 6, 5, 7, 3, 5, 4, 6, 5, 5 dandelions. Estimate the population.</p>
<p>mean per quadrat = 50 ÷ 10 = 5. Then estimated population = (5 × 400) ÷ 0.25 = 2 000 ÷ 0.25 = 8 000 dandelions.</p>
<p><em>Key:</em> mean per quadrat = the total count divided by the number of quadrats; 400 m² = the area of the field; 0.25 m² = the area of one quadrat.</p>
<p>Now the energy side. If the grass in a field contains 80 000 kJ of energy and the rabbits eating it contain 8 000 kJ, the efficiency is (8 000 ÷ 80 000) × 100 = 10 %. The other 72 000 kJ was lost as heat from respiration, used in movement, or passed out in waste — and it is not available to the foxes.</p>

<h3>6. The carbon cycle</h3>
<p>Carbon moves between the atmosphere, living organisms, the soil and the oceans. The processes are few, and the exam asks you to name the one that moves carbon in a given direction.</p>
<ul>
  <li><strong>Photosynthesis</strong> removes carbon dioxide from the atmosphere and stores the carbon in glucose.</li>
  <li><strong>Respiration</strong> releases carbon dioxide back to the atmosphere from plants, animals and decomposers.</li>
  <li><strong>Feeding</strong> passes carbon compounds along a food chain.</li>
  <li><strong>Decomposition</strong> releases carbon dioxide as microorganisms break down dead material.</li>
  <li><strong>Combustion</strong> of fossil fuels releases carbon that was locked away for millions of years, which is why it adds to the atmospheric store rather than recycling it quickly.</li>
</ul>

<h3>7. Decay</h3>
<p>Decomposers break down dead material faster when the conditions suit them: warm, moist and aerobic. That is why compost heaps are kept damp and turned to add oxygen, and why food lasts longer in a freezer — cold slows the microorganisms down.</p>
<ul>
  <li><strong>Temperature</strong> — warmer means faster decay, up to the point where the microorganisms are killed.</li>
  <li><strong>Water</strong> — decomposers need moisture; a dry compost heap barely decays.</li>
  <li><strong>Oxygen</strong> — most decomposers are aerobic, so turning a heap or leaving it open speeds decay.</li>
</ul>
<p>The standard practical measures the rate of decay of milk or bread at different temperatures, using the time taken for an indicator to change colour. The point of the result is that decay is enzyme-controlled, so it has an optimum rather than simply rising with temperature forever.</p>

<h3>8. Humans and their effects on the environment</h3>
<p>The specification's biology-only subsection asks for the effects, and each effect is best remembered as a cause, a consequence and a cost to biodiversity.</p>
<ul>
  <li><strong>Deforestation</strong> destroys habitats, reduces carbon dioxide uptake and can increase soil erosion and flooding.</li>
  <li><strong>Air pollution</strong> — sulfur dioxide from burning fossil fuels dissolves in rain to form acid rain, which damages leaves and kills aquatic life in acidified lakes.</li>
  <li><strong>Water pollution</strong> — fertiliser run-off adds nitrates, causing eutrophication: algae grow, block light, die, and their decomposition uses up oxygen, killing fish.</li>
  <li><strong>Land pollution</strong> — landfill takes land and releases methane; plastics persist for centuries because they are not biodegradable.</li>
  <li><strong>Greenhouse gases</strong> — carbon dioxide and methane trap heat; rising global temperature shifts habitats and raises sea levels.</li>
</ul>
<p>Biodiversity is the variety of species and of the genetic variation within them. It matters because a more diverse ecosystem is more resilient: if one species fails, others can fill its role. Conservation — protected areas, breeding programmes, hedgerows and seed banks — is the response, and it works best when it protects a whole habitat rather than one animal.</p>

<h3>9. Typical mistakes</h3>
<ul>
  <li>Writing "energy is lost" without saying where: heat from respiration, movement, waste, uneaten parts.</li>
  <li>Confusing a pyramid of biomass with a pyramid of energy, or claiming energy pyramids can be inverted.</li>
  <li>Giving an adaptation without its advantage — "the cactus has spines" earns nothing on its own.</li>
  <li>Sampling only where the plants are obvious, then describing the estimate as accurate.</li>
  <li>Saying plants only take carbon dioxide out of the atmosphere. They also respire, day and night.</li>
  <li>Describing eutrophication as "algae poison the water" rather than the oxygen being used up by decomposers.</li>
  <li>Calling decay "rotting by chemicals" — it is microorganisms, and their enzymes, that do it.</li>
</ul>

<h3>10. Exam-style questions</h3>
<ol>
  <li>Explain why a food chain rarely contains more than five trophic levels. <em>Answer:</em> Only about 10 % of the energy is passed to the next level, the rest being lost as heat from respiration, in movement and in waste, so there is too little energy left for more levels.</li>
  <li>Grass contains 60 000 kJ and the cows eating it contain 6 600 kJ. Calculate the efficiency of energy transfer. <em>Answer:</em> efficiency = (6 600 ÷ 60 000) × 100 = 11 %.</li>
  <li>Give two adaptations of a polar bear and explain each. <em>Answer:</em> Thick fur traps a layer of warm air, reducing heat loss; a thick layer of fat insulates and stores energy for when food is scarce.</li>
  <li>A 0.5 m² quadrat is used 8 times in a 200 m² field, giving a mean of 6 plants. Estimate the population. <em>Answer:</em> estimated population = (mean per quadrat × total area) ÷ area of one quadrat = (6 × 200) ÷ 0.5 = 2 400 plants.</li>
  <li>Describe how carbon dioxide is returned to the atmosphere from a dead tree. <em>Answer:</em> Decomposers such as fungi and bacteria break down the dead wood and respire, releasing carbon dioxide.</li>
  <li>Explain why a compost heap decays faster when it is turned regularly. <em>Answer:</em> Turning adds oxygen, and the decomposers are aerobic, so respiration and therefore decay are faster.</li>
  <li>Explain how fertiliser run-off can kill fish in a river. <em>Answer:</em> Nitrates cause algae to grow and cover the surface, blocking light so plants die; decomposers break them down and use up the dissolved oxygen, so fish suffocate.</li>
  <li>Why does deforestation reduce biodiversity? <em>Answer:</em> It removes the habitat and food sources of many species, so populations fall and some species disappear locally.</li>
</ol>

<h3>11. Revision checklist</h3>
<ul>
  <li>I can define producer, consumer, decomposer and trophic level.</li>
  <li>I can explain the 10 % rule and calculate efficiency.</li>
  <li>I can give structural, behavioural and functional adaptations with their advantages.</li>
  <li>I can describe quadrat and transect sampling and calculate a population estimate.</li>
  <li>I can name every process that moves carbon and say which way it moves.</li>
  <li>I can describe the conditions that speed up decay and explain why.</li>
  <li>I can describe four human effects on ecosystems and their consequences.</li>
  <li>I can explain why biodiversity makes an ecosystem more resilient.</li>
</ul>
$lit$, material_type = 'notes', updated_at = now()
  from t
  where sm.topic_id = t.id and sm.title = $lit$IGCSE Biology (OxfordAQA): Ecology$lit$
  returning sm.id
)
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, $lit$IGCSE Biology (OxfordAQA): Ecology$lit$, $lit$<h2>Ecology</h2>
<p>An ecosystem is a community of organisms interacting with each other and with their physical surroundings, and almost every question about one is a question about energy or about a limit. Energy enters as sunlight, is captured by producers, and loses most of itself at every step up a food chain; organisms compete for the rest, and their adaptations decide who wins. This topic also contains two calculations that are easy marks if you keep the units straight — the efficiency of energy transfer and a population estimate from quadrats — and one cycle, carbon, that links every living thing to the atmosphere. The last subsection turns the same ideas on us: what happens to an ecosystem when a forest is cleared or a river is polluted.</p>

<h3>1. Feeding relationships</h3>
<p>Photosynthetic organisms are <strong>producers</strong>: they capture light energy and store it in glucose, which becomes the starting point of every food chain. Organisms that eat others are <strong>consumers</strong>, and decomposers break down dead material and return nutrients to the soil.</p>
<ul>
  <li><strong>Primary consumer</strong> — eats a producer (a herbivore).</li>
  <li><strong>Secondary consumer</strong> — eats a primary consumer (a carnivore).</li>
  <li><strong>Tertiary consumer</strong> — eats a secondary consumer.</li>
  <li><strong>Decomposer</strong> — bacteria and fungi that break down dead organisms and waste, releasing minerals such as nitrates and carbon dioxide.</li>
</ul>
<p>Each step is a <strong>trophic level</strong>. A food chain shows one route; a food web shows all of them, which is why removing one species from a web affects many others — that is <strong>interdependence</strong>. A pyramid of biomass shows the mass of living material at each level and is almost always widest at the bottom.</p>

<h3>2. Energy transfer and efficiency</h3>
<p>Only about 10 % of the energy at one trophic level is passed to the next. The rest is lost as heat from respiration, used in movement, lost in waste materials, or left in parts that are not eaten. This is why food chains rarely have more than four or five levels: there is simply not enough energy left.</p>
<p>efficiency = (energy transferred to the next level ÷ energy available at the previous level) × 100</p>
<p><em>Key:</em> efficiency = the percentage of energy passed on (%); energy transferred = the energy in the organisms at the next trophic level (kJ); energy available = the energy in the organisms being eaten (kJ).</p>
<p>A pyramid of biomass is not the same as a pyramid of energy. Biomass is a snapshot of mass at one moment; energy flow is measured over time. A pyramid of biomass can occasionally be inverted — for example where the producers are tiny phytoplankton that reproduce very fast — while a pyramid of energy never is.</p>

<h3>3. Adaptations, competition and interdependence</h3>
<p>An adaptation is a feature that helps an organism survive in its habitat. Examiners want three words: the feature, the advantage, and the reason it matters.</p>
<ul>
  <li><strong>Structural</strong> — a physical feature. A polar bear's thick fur and fat layer reduce heat loss; a cactus has spines instead of leaves to reduce water loss.</li>
  <li><strong>Behavioural</strong> — what the organism does. Desert animals are active at night to avoid the heat; some birds migrate to find food.</li>
  <li><strong>Functional</strong> — a physiological process. A camel conserves water by producing concentrated urine; some fish can change the amount of salt they excrete.</li>
</ul>
<p><strong>Competition</strong> happens when organisms need the same resource that is in short supply — light, water, space, food or a mate. Organisms that compete successfully are more likely to survive and reproduce, which is natural selection in one sentence. <strong>Extremophiles</strong> are adapted to conditions that would kill most life, such as high temperature, high salt or high pressure.</p>

<h3>4. Sampling: quadrats and transects</h3>
<p>You cannot count every organism, so ecologists sample. A quadrat is a square frame placed at random; counting within several quadrats gives an estimate for the whole area. A transect is a line across a habitat, with quadrats placed along it, used when conditions change from one place to another — for example from a path into a wood.</p>
<p>estimated population = (mean number per quadrat × total area) ÷ area of one quadrat</p>
<p><em>Key:</em> estimated population = the total number in the habitat (individuals); mean per quadrat = the average count from the samples; total area = the area of the whole habitat (m²); area of one quadrat = the area covered by the frame (m²).</p>
<p>Random placement matters. Throwing the quadrat over the shoulder, or always placing it where the flowers are, produces a biased estimate — and "state one way to make the sampling more reliable" wants either random placement or a larger number of samples.</p>

<h3>5. Worked example: population estimate and energy efficiency</h3>
<p>A student places ten 0.25 m² quadrats in a 400 m² field and counts 4, 6, 5, 7, 3, 5, 4, 6, 5, 5 dandelions. Estimate the population.</p>
<p>mean per quadrat = 50 ÷ 10 = 5. Then estimated population = (5 × 400) ÷ 0.25 = 2 000 ÷ 0.25 = 8 000 dandelions.</p>
<p><em>Key:</em> mean per quadrat = the total count divided by the number of quadrats; 400 m² = the area of the field; 0.25 m² = the area of one quadrat.</p>
<p>Now the energy side. If the grass in a field contains 80 000 kJ of energy and the rabbits eating it contain 8 000 kJ, the efficiency is (8 000 ÷ 80 000) × 100 = 10 %. The other 72 000 kJ was lost as heat from respiration, used in movement, or passed out in waste — and it is not available to the foxes.</p>

<h3>6. The carbon cycle</h3>
<p>Carbon moves between the atmosphere, living organisms, the soil and the oceans. The processes are few, and the exam asks you to name the one that moves carbon in a given direction.</p>
<ul>
  <li><strong>Photosynthesis</strong> removes carbon dioxide from the atmosphere and stores the carbon in glucose.</li>
  <li><strong>Respiration</strong> releases carbon dioxide back to the atmosphere from plants, animals and decomposers.</li>
  <li><strong>Feeding</strong> passes carbon compounds along a food chain.</li>
  <li><strong>Decomposition</strong> releases carbon dioxide as microorganisms break down dead material.</li>
  <li><strong>Combustion</strong> of fossil fuels releases carbon that was locked away for millions of years, which is why it adds to the atmospheric store rather than recycling it quickly.</li>
</ul>

<h3>7. Decay</h3>
<p>Decomposers break down dead material faster when the conditions suit them: warm, moist and aerobic. That is why compost heaps are kept damp and turned to add oxygen, and why food lasts longer in a freezer — cold slows the microorganisms down.</p>
<ul>
  <li><strong>Temperature</strong> — warmer means faster decay, up to the point where the microorganisms are killed.</li>
  <li><strong>Water</strong> — decomposers need moisture; a dry compost heap barely decays.</li>
  <li><strong>Oxygen</strong> — most decomposers are aerobic, so turning a heap or leaving it open speeds decay.</li>
</ul>
<p>The standard practical measures the rate of decay of milk or bread at different temperatures, using the time taken for an indicator to change colour. The point of the result is that decay is enzyme-controlled, so it has an optimum rather than simply rising with temperature forever.</p>

<h3>8. Humans and their effects on the environment</h3>
<p>The specification's biology-only subsection asks for the effects, and each effect is best remembered as a cause, a consequence and a cost to biodiversity.</p>
<ul>
  <li><strong>Deforestation</strong> destroys habitats, reduces carbon dioxide uptake and can increase soil erosion and flooding.</li>
  <li><strong>Air pollution</strong> — sulfur dioxide from burning fossil fuels dissolves in rain to form acid rain, which damages leaves and kills aquatic life in acidified lakes.</li>
  <li><strong>Water pollution</strong> — fertiliser run-off adds nitrates, causing eutrophication: algae grow, block light, die, and their decomposition uses up oxygen, killing fish.</li>
  <li><strong>Land pollution</strong> — landfill takes land and releases methane; plastics persist for centuries because they are not biodegradable.</li>
  <li><strong>Greenhouse gases</strong> — carbon dioxide and methane trap heat; rising global temperature shifts habitats and raises sea levels.</li>
</ul>
<p>Biodiversity is the variety of species and of the genetic variation within them. It matters because a more diverse ecosystem is more resilient: if one species fails, others can fill its role. Conservation — protected areas, breeding programmes, hedgerows and seed banks — is the response, and it works best when it protects a whole habitat rather than one animal.</p>

<h3>9. Typical mistakes</h3>
<ul>
  <li>Writing "energy is lost" without saying where: heat from respiration, movement, waste, uneaten parts.</li>
  <li>Confusing a pyramid of biomass with a pyramid of energy, or claiming energy pyramids can be inverted.</li>
  <li>Giving an adaptation without its advantage — "the cactus has spines" earns nothing on its own.</li>
  <li>Sampling only where the plants are obvious, then describing the estimate as accurate.</li>
  <li>Saying plants only take carbon dioxide out of the atmosphere. They also respire, day and night.</li>
  <li>Describing eutrophication as "algae poison the water" rather than the oxygen being used up by decomposers.</li>
  <li>Calling decay "rotting by chemicals" — it is microorganisms, and their enzymes, that do it.</li>
</ul>

<h3>10. Exam-style questions</h3>
<ol>
  <li>Explain why a food chain rarely contains more than five trophic levels. <em>Answer:</em> Only about 10 % of the energy is passed to the next level, the rest being lost as heat from respiration, in movement and in waste, so there is too little energy left for more levels.</li>
  <li>Grass contains 60 000 kJ and the cows eating it contain 6 600 kJ. Calculate the efficiency of energy transfer. <em>Answer:</em> efficiency = (6 600 ÷ 60 000) × 100 = 11 %.</li>
  <li>Give two adaptations of a polar bear and explain each. <em>Answer:</em> Thick fur traps a layer of warm air, reducing heat loss; a thick layer of fat insulates and stores energy for when food is scarce.</li>
  <li>A 0.5 m² quadrat is used 8 times in a 200 m² field, giving a mean of 6 plants. Estimate the population. <em>Answer:</em> estimated population = (mean per quadrat × total area) ÷ area of one quadrat = (6 × 200) ÷ 0.5 = 2 400 plants.</li>
  <li>Describe how carbon dioxide is returned to the atmosphere from a dead tree. <em>Answer:</em> Decomposers such as fungi and bacteria break down the dead wood and respire, releasing carbon dioxide.</li>
  <li>Explain why a compost heap decays faster when it is turned regularly. <em>Answer:</em> Turning adds oxygen, and the decomposers are aerobic, so respiration and therefore decay are faster.</li>
  <li>Explain how fertiliser run-off can kill fish in a river. <em>Answer:</em> Nitrates cause algae to grow and cover the surface, blocking light so plants die; decomposers break them down and use up the dissolved oxygen, so fish suffocate.</li>
  <li>Why does deforestation reduce biodiversity? <em>Answer:</em> It removes the habitat and food sources of many species, so populations fall and some species disappear locally.</li>
</ol>

<h3>11. Revision checklist</h3>
<ul>
  <li>I can define producer, consumer, decomposer and trophic level.</li>
  <li>I can explain the 10 % rule and calculate efficiency.</li>
  <li>I can give structural, behavioural and functional adaptations with their advantages.</li>
  <li>I can describe quadrat and transect sampling and calculate a population estimate.</li>
  <li>I can name every process that moves carbon and say which way it moves.</li>
  <li>I can describe the conditions that speed up decay and explain why.</li>
  <li>I can describe four human effects on ecosystems and their consequences.</li>
  <li>I can explain why biodiversity makes an ecosystem more resilient.</li>
</ul>
$lit$, 'notes'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$biology-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organisms-interaction-with-the-environment$lit$
), upd as (
  update public.study_materials sm
  set content = $lit$<h2>Response and Homeostasis</h2>
<p>Organisms survive by responding to change, and the body does most of that without asking. This topic covers the two systems that produce the response — nerves, which act in milliseconds, and hormones, which act over minutes or hours — and then the four conditions the body fights to keep constant: water and ion content, temperature, blood glucose, and the internal environment that pathogens threaten. Every one of those is the same loop: a receptor detects a change, a coordination centre compares it with a set point, and an effector reverses the change. Learn the loop once and the four examples become applications rather than four separate lists to memorise.</p>

<h3>1. The nervous system</h3>
<p>The nervous system has two parts: the central nervous system (brain and spinal cord), which coordinates the response, and the peripheral nerves, which carry information to and from it. Information travels as electrical impulses along neurones.</p>
<ul>
  <li><strong>Sensory neurone</strong> — carries an impulse from a receptor to the central nervous system.</li>
  <li><strong>Relay neurone</strong> — inside the spinal cord or brain, connecting sensory to motor neurones.</li>
  <li><strong>Motor neurone</strong> — carries an impulse from the central nervous system to an effector, a muscle or gland.</li>
  <li><strong>Synapse</strong> — the gap between two neurones. A chemical neurotransmitter diffuses across it, which slows the impulse slightly but allows signals to be passed in one direction only.</li>
</ul>
<p>A <strong>reflex action</strong> is an automatic, rapid response that does not involve conscious thought, and it protects the body. The reflex arc runs: stimulus → receptor → sensory neurone → relay neurone in the spinal cord → motor neurone → effector → response. Because the relay neurone sits in the spinal cord, the response happens before the brain has processed the pain, which is why you snatch your hand back from a hot pan before you feel it.</p>

<h3>2. Homeostasis and negative feedback</h3>
<p>Homeostasis is the maintenance of a constant internal environment. It matters because enzymes and cells work within narrow limits: a few degrees too warm and enzymes denature, too little water and cells lose their shape.</p>
<p>A <strong>negative feedback</strong> loop reverses any change from the set point. If blood glucose rises, the body responds in a way that lowers it; if it falls, the body responds in a way that raises it. A <strong>positive feedback</strong> loop would amplify the change, and the body avoids those except in specific events such as childbirth.</p>
<p>The three components are worth naming in every answer: a <strong>receptor</strong> detects the change, a <strong>coordination centre</strong> (brain, spinal cord or a gland) processes it, and an <strong>effector</strong> produces the response. "The body reacts" earns nothing; "the pancreas detects the rise and secretes insulin, which causes the liver to store glucose" earns all three marks.</p>

<h3>3. Water and ion balance</h3>
<p>Water enters in food and drink and leaves in urine, sweat, exhaled air and faeces. The kidneys keep the balance by filtering the blood and reabsorbing what the body needs, and the volume and concentration of urine is the visible output of that decision.</p>
<ul>
  <li><strong>Too little water</strong> (or much sweating): the pituitary gland releases more ADH, the kidneys reabsorb more water, and urine becomes small in volume and concentrated.</li>
  <li><strong>Too much water</strong> (after drinking a lot): less ADH is released, less water is reabsorbed, and urine becomes large in volume and dilute.</li>
  <li><strong>Ions</strong> are regulated the same way: excess ions are excreted in urine, and ions lost in sweat are replaced from the diet.</li>
</ul>
<p>Kidney failure is treated by dialysis, which removes waste and excess water by diffusion across a partially permeable membrane, or by a transplant. Dialysis has to be repeated several times a week because it works intermittently; a working transplanted kidney does the job continuously, but the immune system must be suppressed to stop rejection.</p>

<h3>4. Temperature control</h3>
<p>The body's core temperature is held near 37 °C. A part of the brain called the hypothalamus is the coordination centre, and the effectors are the skin's blood vessels, sweat glands and muscles.</p>
<table border="1">
  <tr><th>Too hot</th><th>Effect</th><th>Too cold</th><th>Effect</th></tr>
  <tr><td>Vasodilation</td><td>Blood vessels near the skin widen, so more blood flows there and more heat is lost by radiation</td><td>Vasoconstriction</td><td>Vessels narrow, so less blood reaches the surface and less heat is lost</td></tr>
  <tr><td>Sweating</td><td>Water evaporates from the skin, taking heat energy with it</td><td>Shivering</td><td>Muscles contract rapidly, and respiration in them releases heat</td></tr>
  <tr><td>Hairs lie flat</td><td>Less air is trapped, so less insulation</td><td>Hairs stand up</td><td>Air is trapped as insulation</td></tr>
</table>
<p>Fever is the same mechanism working to a different set point, which is why a feverish person shivers even though their temperature is high: the body is trying to reach the new, higher set point.</p>

<h3>5. Blood glucose</h3>
<p>The pancreas monitors blood glucose and releases two hormones with opposite effects. Insulin lowers glucose; glucagon raises it.</p>
<ul>
  <li><strong>After a meal</strong>, glucose rises. The pancreas releases insulin, which makes the liver and muscles take up glucose and store it as glycogen, and fat cells store it as fat. Glucose falls.</li>
  <li><strong>During exercise or fasting</strong>, glucose falls. The pancreas releases glucagon, which makes the liver break glycogen down into glucose and release it into the blood. Glucose rises.</li>
  <li><strong>Type 1 diabetes</strong> — the pancreas does not produce enough insulin, so glucose stays high. It is treated with insulin injections, diet and exercise.</li>
  <li><strong>Type 2 diabetes</strong> — the body's cells stop responding to insulin. It is managed mainly by diet, weight loss and exercise, and is linked to obesity.</li>
</ul>
<p>Both types cause glucose to appear in urine, because the kidney cannot reabsorb it all. That is why urine testing was the original diagnostic test.</p>

<h3>6. Worked example: water balance</h3>
<p>A student drinks 2.0 dm³ of water in a day and loses 0.6 dm³ in urine, 1.0 dm³ in sweat and 0.4 dm³ in exhaled air. Calculate the net water balance, and predict what happens to ADH release if sweating then doubles.</p>
<p>total loss = 0.6 + 1.0 + 0.4 = 2.0 dm³, so the balance is 2.0 − 2.0 = 0 dm³ and the body is in balance. If sweat loss rises to 2.0 dm³, total loss becomes 3.0 dm³, so 1.0 dm³ more water has been lost than taken in.</p>
<p><em>Key:</em> intake = water taken in (dm³); total loss = urine + sweat + exhaled water (dm³); balance = intake − total loss; a negative balance means the body must conserve water.</p>
<p>With a negative balance, more ADH is released, the kidneys reabsorb more water and the urine becomes smaller in volume and more concentrated. That single sentence answers most of the water-balance questions in this topic.</p>

<h3>7. Behaviour</h3>
<p>Not every response is internal. Behaviour is a response that involves the whole organism moving or acting, and it is often the fastest way to cope with a change.</p>
<ul>
  <li><strong>Courtship behaviour</strong> helps individuals recognise a mate of the same species, synchronise breeding and choose a healthy partner.</li>
  <li><strong>Taxes and kineses</strong> are directed or undirected movements in response to a stimulus: woodlice move away from light and towards damp, which keeps them from drying out.</li>
  <li><strong>Circadian rhythms</strong> are daily cycles, such as sleeping at night, controlled by internal clocks that light resets.</li>
  <li><strong>Social behaviour</strong>, such as a warning call, can protect relatives, which is why it persists despite the risk to the caller.</li>
</ul>

<h3>8. Infection and response</h3>
<p>A pathogen is a microorganism that causes disease — bacteria, viruses, fungi or protists. Diseases spread by direct contact, in the air, in water, in food, or through vectors such as mosquitoes.</p>
<ul>
  <li><strong>The body's first line:</strong> skin, mucus, cilia, stomach acid and tears, which stop pathogens entering.</li>
  <li><strong>The immune response:</strong> white blood cells engulf pathogens (phagocytosis), produce antibodies that are specific to one antigen, and produce antitoxins that neutralise toxins.</li>
  <li><strong>Vaccination</strong> introduces a dead or inactive pathogen so the body makes antibodies and memory cells; a later infection is fought before symptoms appear.</li>
  <li><strong>Antibiotics</strong> kill bacteria but not viruses, which is why antibiotics do not treat a cold.</li>
  <li><strong>Antibiotic resistance</strong> develops because bacteria vary, and the ones that survive treatment reproduce — which is why the full course must be completed and antibiotics should not be used for viral infections.</li>
</ul>
<p>Because antibodies are specific, a person who has had measles has memory cells for measles and is unlikely to catch it again, but has no protection against mumps. That specificity is also why a new vaccine is needed for each strain of a virus that mutates quickly.</p>

<h3>9. Typical mistakes</h3>
<ul>
  <li>Saying a reflex "goes to the brain and back". The relay neurone is in the spinal cord; that is what makes the response fast.</li>
  <li>Confusing insulin and glucagon. Insulin lowers glucose; glucagon raises it.</li>
  <li>Describing vasodilation as "blood vessels get wider to cool the blood" without saying that more blood reaches the surface and more heat is radiated.</li>
  <li>Claiming sweat cools the body because it is cold. It cools by evaporating, which takes heat from the skin.</li>
  <li>Saying antibiotics cure flu, or that a vaccine kills the pathogen directly. A vaccine trains the immune response.</li>
  <li>Writing "white blood cells eat germs" without naming antibodies, antigens or memory cells where the question asks for the immune response.</li>
  <li>Forgetting that ADH makes urine more concentrated, not more dilute.</li>
</ul>

<h3>10. Exam-style questions</h3>
<ol>
  <li>Describe the pathway of a reflex arc when a hand touches a hot pan. <em>Answer:</em> The temperature receptor in the skin detects the heat, a sensory neurone carries the impulse to the spinal cord, a relay neurone passes it to a motor neurone, which carries it to the arm muscle, and the muscle contracts to pull the hand away.</li>
  <li>Explain why reflex actions are useful. <em>Answer:</em> They are automatic and rapid because they do not involve conscious thought, so the body avoids damage before the brain has processed the pain.</li>
  <li>Explain what happens to ADH release after a person sweats heavily. <em>Answer:</em> Water loss lowers blood water content, so more ADH is released from the pituitary gland, the kidneys reabsorb more water and urine becomes smaller in volume and more concentrated.</li>
  <li>Explain how the body cools itself on a hot day. <em>Answer:</em> Vasodilation brings more blood to the skin surface so more heat is radiated, and sweating increases so evaporation removes heat energy from the skin.</li>
  <li>Compare insulin and glucagon. <em>Answer:</em> Both are released by the pancreas; insulin lowers blood glucose by making the liver store it as glycogen, while glucagon raises it by making the liver break glycogen down.</li>
  <li>Explain why antibiotics are not prescribed for viral infections. <em>Answer:</em> Antibiotics kill bacteria and have no effect on viruses, so they would not treat the infection and would increase the risk of antibiotic resistance.</li>
  <li>Explain how vaccination protects a person against a disease. <em>Answer:</em> It introduces a dead or inactive pathogen, so white blood cells produce antibodies and memory cells; on later infection the memory cells make antibodies quickly, before symptoms develop.</li>
  <li>A person loses 1.8 dm³ of water in sweat, 0.5 dm³ in urine and 0.4 dm³ in exhaled air, and drinks 2.4 dm³. Calculate the net balance. <em>Answer:</em> total loss = 1.8 + 0.5 + 0.4 = 2.7 dm³; balance = 2.4 − 2.7 = −0.3 dm³, so the body has lost 0.3 dm³ more than it took in.</li>
</ol>

<h3>11. Revision checklist</h3>
<ul>
  <li>I can name the three neurone types and describe a synapse.</li>
  <li>I can order a reflex arc and explain why it is fast.</li>
  <li>I can define homeostasis and describe a negative feedback loop.</li>
  <li>I can explain how ADH controls water reabsorption.</li>
  <li>I can describe vasodilation, vasoconstriction, sweating and shivering.</li>
  <li>I can explain insulin, glucagon and the difference between type 1 and type 2 diabetes.</li>
  <li>I can give examples of behavioural responses and their value.</li>
  <li>I can describe the body's defences, the immune response, vaccination and antibiotic resistance.</li>
</ul>
$lit$, material_type = 'notes', updated_at = now()
  from t
  where sm.topic_id = t.id and sm.title = $lit$IGCSE Biology (OxfordAQA): Response and Homeostasis$lit$
  returning sm.id
)
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, $lit$IGCSE Biology (OxfordAQA): Response and Homeostasis$lit$, $lit$<h2>Response and Homeostasis</h2>
<p>Organisms survive by responding to change, and the body does most of that without asking. This topic covers the two systems that produce the response — nerves, which act in milliseconds, and hormones, which act over minutes or hours — and then the four conditions the body fights to keep constant: water and ion content, temperature, blood glucose, and the internal environment that pathogens threaten. Every one of those is the same loop: a receptor detects a change, a coordination centre compares it with a set point, and an effector reverses the change. Learn the loop once and the four examples become applications rather than four separate lists to memorise.</p>

<h3>1. The nervous system</h3>
<p>The nervous system has two parts: the central nervous system (brain and spinal cord), which coordinates the response, and the peripheral nerves, which carry information to and from it. Information travels as electrical impulses along neurones.</p>
<ul>
  <li><strong>Sensory neurone</strong> — carries an impulse from a receptor to the central nervous system.</li>
  <li><strong>Relay neurone</strong> — inside the spinal cord or brain, connecting sensory to motor neurones.</li>
  <li><strong>Motor neurone</strong> — carries an impulse from the central nervous system to an effector, a muscle or gland.</li>
  <li><strong>Synapse</strong> — the gap between two neurones. A chemical neurotransmitter diffuses across it, which slows the impulse slightly but allows signals to be passed in one direction only.</li>
</ul>
<p>A <strong>reflex action</strong> is an automatic, rapid response that does not involve conscious thought, and it protects the body. The reflex arc runs: stimulus → receptor → sensory neurone → relay neurone in the spinal cord → motor neurone → effector → response. Because the relay neurone sits in the spinal cord, the response happens before the brain has processed the pain, which is why you snatch your hand back from a hot pan before you feel it.</p>

<h3>2. Homeostasis and negative feedback</h3>
<p>Homeostasis is the maintenance of a constant internal environment. It matters because enzymes and cells work within narrow limits: a few degrees too warm and enzymes denature, too little water and cells lose their shape.</p>
<p>A <strong>negative feedback</strong> loop reverses any change from the set point. If blood glucose rises, the body responds in a way that lowers it; if it falls, the body responds in a way that raises it. A <strong>positive feedback</strong> loop would amplify the change, and the body avoids those except in specific events such as childbirth.</p>
<p>The three components are worth naming in every answer: a <strong>receptor</strong> detects the change, a <strong>coordination centre</strong> (brain, spinal cord or a gland) processes it, and an <strong>effector</strong> produces the response. "The body reacts" earns nothing; "the pancreas detects the rise and secretes insulin, which causes the liver to store glucose" earns all three marks.</p>

<h3>3. Water and ion balance</h3>
<p>Water enters in food and drink and leaves in urine, sweat, exhaled air and faeces. The kidneys keep the balance by filtering the blood and reabsorbing what the body needs, and the volume and concentration of urine is the visible output of that decision.</p>
<ul>
  <li><strong>Too little water</strong> (or much sweating): the pituitary gland releases more ADH, the kidneys reabsorb more water, and urine becomes small in volume and concentrated.</li>
  <li><strong>Too much water</strong> (after drinking a lot): less ADH is released, less water is reabsorbed, and urine becomes large in volume and dilute.</li>
  <li><strong>Ions</strong> are regulated the same way: excess ions are excreted in urine, and ions lost in sweat are replaced from the diet.</li>
</ul>
<p>Kidney failure is treated by dialysis, which removes waste and excess water by diffusion across a partially permeable membrane, or by a transplant. Dialysis has to be repeated several times a week because it works intermittently; a working transplanted kidney does the job continuously, but the immune system must be suppressed to stop rejection.</p>

<h3>4. Temperature control</h3>
<p>The body's core temperature is held near 37 °C. A part of the brain called the hypothalamus is the coordination centre, and the effectors are the skin's blood vessels, sweat glands and muscles.</p>
<table border="1">
  <tr><th>Too hot</th><th>Effect</th><th>Too cold</th><th>Effect</th></tr>
  <tr><td>Vasodilation</td><td>Blood vessels near the skin widen, so more blood flows there and more heat is lost by radiation</td><td>Vasoconstriction</td><td>Vessels narrow, so less blood reaches the surface and less heat is lost</td></tr>
  <tr><td>Sweating</td><td>Water evaporates from the skin, taking heat energy with it</td><td>Shivering</td><td>Muscles contract rapidly, and respiration in them releases heat</td></tr>
  <tr><td>Hairs lie flat</td><td>Less air is trapped, so less insulation</td><td>Hairs stand up</td><td>Air is trapped as insulation</td></tr>
</table>
<p>Fever is the same mechanism working to a different set point, which is why a feverish person shivers even though their temperature is high: the body is trying to reach the new, higher set point.</p>

<h3>5. Blood glucose</h3>
<p>The pancreas monitors blood glucose and releases two hormones with opposite effects. Insulin lowers glucose; glucagon raises it.</p>
<ul>
  <li><strong>After a meal</strong>, glucose rises. The pancreas releases insulin, which makes the liver and muscles take up glucose and store it as glycogen, and fat cells store it as fat. Glucose falls.</li>
  <li><strong>During exercise or fasting</strong>, glucose falls. The pancreas releases glucagon, which makes the liver break glycogen down into glucose and release it into the blood. Glucose rises.</li>
  <li><strong>Type 1 diabetes</strong> — the pancreas does not produce enough insulin, so glucose stays high. It is treated with insulin injections, diet and exercise.</li>
  <li><strong>Type 2 diabetes</strong> — the body's cells stop responding to insulin. It is managed mainly by diet, weight loss and exercise, and is linked to obesity.</li>
</ul>
<p>Both types cause glucose to appear in urine, because the kidney cannot reabsorb it all. That is why urine testing was the original diagnostic test.</p>

<h3>6. Worked example: water balance</h3>
<p>A student drinks 2.0 dm³ of water in a day and loses 0.6 dm³ in urine, 1.0 dm³ in sweat and 0.4 dm³ in exhaled air. Calculate the net water balance, and predict what happens to ADH release if sweating then doubles.</p>
<p>total loss = 0.6 + 1.0 + 0.4 = 2.0 dm³, so the balance is 2.0 − 2.0 = 0 dm³ and the body is in balance. If sweat loss rises to 2.0 dm³, total loss becomes 3.0 dm³, so 1.0 dm³ more water has been lost than taken in.</p>
<p><em>Key:</em> intake = water taken in (dm³); total loss = urine + sweat + exhaled water (dm³); balance = intake − total loss; a negative balance means the body must conserve water.</p>
<p>With a negative balance, more ADH is released, the kidneys reabsorb more water and the urine becomes smaller in volume and more concentrated. That single sentence answers most of the water-balance questions in this topic.</p>

<h3>7. Behaviour</h3>
<p>Not every response is internal. Behaviour is a response that involves the whole organism moving or acting, and it is often the fastest way to cope with a change.</p>
<ul>
  <li><strong>Courtship behaviour</strong> helps individuals recognise a mate of the same species, synchronise breeding and choose a healthy partner.</li>
  <li><strong>Taxes and kineses</strong> are directed or undirected movements in response to a stimulus: woodlice move away from light and towards damp, which keeps them from drying out.</li>
  <li><strong>Circadian rhythms</strong> are daily cycles, such as sleeping at night, controlled by internal clocks that light resets.</li>
  <li><strong>Social behaviour</strong>, such as a warning call, can protect relatives, which is why it persists despite the risk to the caller.</li>
</ul>

<h3>8. Infection and response</h3>
<p>A pathogen is a microorganism that causes disease — bacteria, viruses, fungi or protists. Diseases spread by direct contact, in the air, in water, in food, or through vectors such as mosquitoes.</p>
<ul>
  <li><strong>The body's first line:</strong> skin, mucus, cilia, stomach acid and tears, which stop pathogens entering.</li>
  <li><strong>The immune response:</strong> white blood cells engulf pathogens (phagocytosis), produce antibodies that are specific to one antigen, and produce antitoxins that neutralise toxins.</li>
  <li><strong>Vaccination</strong> introduces a dead or inactive pathogen so the body makes antibodies and memory cells; a later infection is fought before symptoms appear.</li>
  <li><strong>Antibiotics</strong> kill bacteria but not viruses, which is why antibiotics do not treat a cold.</li>
  <li><strong>Antibiotic resistance</strong> develops because bacteria vary, and the ones that survive treatment reproduce — which is why the full course must be completed and antibiotics should not be used for viral infections.</li>
</ul>
<p>Because antibodies are specific, a person who has had measles has memory cells for measles and is unlikely to catch it again, but has no protection against mumps. That specificity is also why a new vaccine is needed for each strain of a virus that mutates quickly.</p>

<h3>9. Typical mistakes</h3>
<ul>
  <li>Saying a reflex "goes to the brain and back". The relay neurone is in the spinal cord; that is what makes the response fast.</li>
  <li>Confusing insulin and glucagon. Insulin lowers glucose; glucagon raises it.</li>
  <li>Describing vasodilation as "blood vessels get wider to cool the blood" without saying that more blood reaches the surface and more heat is radiated.</li>
  <li>Claiming sweat cools the body because it is cold. It cools by evaporating, which takes heat from the skin.</li>
  <li>Saying antibiotics cure flu, or that a vaccine kills the pathogen directly. A vaccine trains the immune response.</li>
  <li>Writing "white blood cells eat germs" without naming antibodies, antigens or memory cells where the question asks for the immune response.</li>
  <li>Forgetting that ADH makes urine more concentrated, not more dilute.</li>
</ul>

<h3>10. Exam-style questions</h3>
<ol>
  <li>Describe the pathway of a reflex arc when a hand touches a hot pan. <em>Answer:</em> The temperature receptor in the skin detects the heat, a sensory neurone carries the impulse to the spinal cord, a relay neurone passes it to a motor neurone, which carries it to the arm muscle, and the muscle contracts to pull the hand away.</li>
  <li>Explain why reflex actions are useful. <em>Answer:</em> They are automatic and rapid because they do not involve conscious thought, so the body avoids damage before the brain has processed the pain.</li>
  <li>Explain what happens to ADH release after a person sweats heavily. <em>Answer:</em> Water loss lowers blood water content, so more ADH is released from the pituitary gland, the kidneys reabsorb more water and urine becomes smaller in volume and more concentrated.</li>
  <li>Explain how the body cools itself on a hot day. <em>Answer:</em> Vasodilation brings more blood to the skin surface so more heat is radiated, and sweating increases so evaporation removes heat energy from the skin.</li>
  <li>Compare insulin and glucagon. <em>Answer:</em> Both are released by the pancreas; insulin lowers blood glucose by making the liver store it as glycogen, while glucagon raises it by making the liver break glycogen down.</li>
  <li>Explain why antibiotics are not prescribed for viral infections. <em>Answer:</em> Antibiotics kill bacteria and have no effect on viruses, so they would not treat the infection and would increase the risk of antibiotic resistance.</li>
  <li>Explain how vaccination protects a person against a disease. <em>Answer:</em> It introduces a dead or inactive pathogen, so white blood cells produce antibodies and memory cells; on later infection the memory cells make antibodies quickly, before symptoms develop.</li>
  <li>A person loses 1.8 dm³ of water in sweat, 0.5 dm³ in urine and 0.4 dm³ in exhaled air, and drinks 2.4 dm³. Calculate the net balance. <em>Answer:</em> total loss = 1.8 + 0.5 + 0.4 = 2.7 dm³; balance = 2.4 − 2.7 = −0.3 dm³, so the body has lost 0.3 dm³ more than it took in.</li>
</ol>

<h3>11. Revision checklist</h3>
<ul>
  <li>I can name the three neurone types and describe a synapse.</li>
  <li>I can order a reflex arc and explain why it is fast.</li>
  <li>I can define homeostasis and describe a negative feedback loop.</li>
  <li>I can explain how ADH controls water reabsorption.</li>
  <li>I can describe vasodilation, vasoconstriction, sweating and shivering.</li>
  <li>I can explain insulin, glucagon and the difference between type 1 and type 2 diabetes.</li>
  <li>I can give examples of behavioural responses and their value.</li>
  <li>I can describe the body's defences, the immune response, vaccination and antibiotic resistance.</li>
</ul>
$lit$, 'notes'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$biology-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$inheritance$lit$
), upd as (
  update public.study_materials sm
  set content = $lit$<h2>Inheritance</h2>
<p>Every cell in your body carries the same set of instructions, written in DNA and packaged into chromosomes, and this topic is about how that set is copied, halved, shuffled and sometimes changed. Two divisions do the copying and halving; alleles decide which version of a characteristic appears; a genetic cross predicts the odds; and genetic engineering and cloning are the technologies that follow once you can read and cut DNA. The exam treats the cross as arithmetic — set out the gametes, fill the grid, read the ratio — so the worked examples below are the ones to practise rather than the vocabulary.</p>

<h3>1. Sexual and asexual reproduction</h3>
<p>Sexual reproduction involves two parents and the fusion of gametes, so the offspring are genetically different from each other and from their parents. Asexual reproduction involves one parent and no gamete fusion, so the offspring are genetically identical clones.</p>
<table border="1">
  <tr><th>Feature</th><th>Sexual</th><th>Asexual</th></tr>
  <tr><td>Parents</td><td>Two</td><td>One</td></tr>
  <tr><td>Gametes</td><td>Fused (sperm and egg)</td><td>None</td></tr>
  <tr><td>Offspring</td><td>Genetically varied</td><td>Genetically identical clones</td></tr>
  <tr><td>Examples</td><td>Humans, flowering plants</td><td>Bacteria, strawberry runners, potato tubers</td></tr>
  <tr><td>Advantage</td><td>Variation helps a population survive a change</td><td>Fast, and needs only one parent</td></tr>
</table>
<p>Some organisms do both depending on conditions — aphids reproduce asexually in summer when food is plentiful and sexually in autumn, which is variation exactly when it is useful.</p>

<h3>2. Cell division: mitosis and meiosis</h3>
<p>Mitosis produces two genetically identical diploid cells and is used for growth, repair and asexual reproduction. Meiosis produces four genetically different haploid gametes and happens only in the reproductive organs.</p>
<ul>
  <li><strong>Diploid</strong> means two copies of each chromosome, one from each parent; human body cells are diploid with 46 chromosomes.</li>
  <li><strong>Haploid</strong> means one copy of each chromosome; human gametes are haploid with 23.</li>
  <li><strong>Meiosis</strong> halves the chromosome number so that fertilisation restores the diploid number, and it shuffles the chromosomes and their alleles, which is where genetic variation comes from.</li>
  <li><strong>Mitosis</strong> copies the chromosomes first, then divides once, so each new cell has the full set.</li>
</ul>
<p>The order of events matters: in meiosis the chromosomes line up in pairs and are pulled apart twice, so four cells result; in mitosis they line up singly and are pulled apart once, so two cells result.</p>

<h3>3. Genetic variation</h3>
<p>A gene is a section of DNA that codes for a characteristic. Different versions of the same gene are <strong>alleles</strong>, and the combination an organism carries is its <strong>genotype</strong>; the characteristic you can see is its <strong>phenotype</strong>.</p>
<ul>
  <li><strong>Dominant</strong> alleles are expressed even when only one copy is present, written with a capital letter.</li>
  <li><strong>Recessive</strong> alleles are expressed only when two copies are present, written with a lower-case letter.</li>
  <li><strong>Homozygous</strong> means two identical alleles (AA or aa); <strong>heterozygous</strong> means two different alleles (Aa).</li>
  <li><strong>Co-dominance</strong> means both alleles are expressed, as in AB blood group or a roan coat.</li>
</ul>
<p>Variation comes from three sources: the genes inherited from two parents, meiosis shuffling the alleles, and mutation. Environmental factors such as diet and exercise also affect phenotype, which is why identical twins are not perfectly identical.</p>

<h3>4. Worked example: a monohybrid cross</h3>
<p>Two heterozygous parents (Aa × Aa) have children. A is the dominant allele for free earlobes; a gives attached earlobes. Predict the ratio of phenotypes and the probability that a child has attached earlobes.</p>
<p>Each parent's gametes are A and a, so the grid gives AA, Aa, Aa and aa: the ratio is 1 AA : 2 Aa : 1 aa. Three of the four combinations carry at least one A, so 3 have free earlobes and 1 has attached — a phenotype ratio of 3 : 1. The probability of attached earlobes is 1 in 4, or 25 %.</p>
<p><em>Key:</em> A = dominant allele (free earlobes); a = recessive allele (attached earlobes); AA and Aa = free earlobes because A is expressed; aa = attached earlobes because both alleles are recessive.</p>
<p>Now run it the other way. If the couple has four children, each child independently has a 25 % chance, so the expected number with attached earlobes is 4 × 0.25 = 1 — but a family of four can easily have none or two. Expected numbers are probabilities multiplied by the number of children, not a promise.</p>

<h3>5. Genetic disorders</h3>
<p>Some disorders are caused by a single gene and are inherited in a predictable pattern, which is why a genetic cross can estimate the risk.</p>
<ul>
  <li><strong>Cystic fibrosis</strong> is caused by a recessive allele. A person inherits it only with two copies (cc); a carrier (Cc) has one copy and no symptoms, so two carrier parents have a 1 in 4 chance of an affected child.</li>
  <li><strong>Polydactyly</strong> — extra fingers or toes — is caused by a dominant allele, so a person with one copy has the condition and can pass it to half their children.</li>
</ul>
<p>Genetic screening tests for these alleles before or during pregnancy, and for embryos during IVF. It gives parents information, and raises the ethical question of what to do with it; the exam asks for both sides, so give one benefit and one concern rather than a verdict.</p>

<h3>6. Genetic manipulation and cloning</h3>
<p>Genetic engineering moves a gene from one organism to another. A human gene for insulin, for example, is cut out with an enzyme, inserted into a bacterial plasmid using another enzyme, and the bacteria are grown in a fermenter to produce insulin.</p>
<ul>
  <li><strong>Advantages:</strong> insulin is produced in large quantities, is identical to human insulin so fewer reactions occur, and the process does not depend on animal pancreases.</li>
  <li><strong>Concerns:</strong> the long-term effects of genetically modified organisms on ecosystems are uncertain, and some people object on ethical or religious grounds.</li>
  <li><strong>Cloning</strong> by embryo transplant takes a fertilised egg, splits it into several embryos and implants them into surrogates, producing identical offspring. Adult cell cloning transfers the nucleus of a body cell into an egg cell with its nucleus removed.</li>
  <li><strong>Cloning plants</strong> by cuttings or tissue culture is cheap and preserves a desirable variety, but the whole crop is equally vulnerable to one disease.</li>
</ul>

<h3>7. Typical mistakes</h3>
<ul>
  <li>Saying meiosis produces two cells. It produces four, each with half the chromosome number.</li>
  <li>Writing "a recessive allele is weaker". It is not weaker; it is simply not expressed when a dominant allele is present.</li>
  <li>Giving a genotype ratio when the question asks for a phenotype ratio, or forgetting to say which phenotype is which.</li>
  <li>Claiming a 3 : 1 ratio guarantees three of one and one of the other in a family of four.</li>
  <li>Confusing a carrier with an affected person. A carrier has one copy of a recessive allele and no symptoms.</li>
  <li>Describing genetic engineering as "breeding". Breeding selects existing alleles; engineering moves a gene between species.</li>
  <li>Saying clones are "identical in every way". They share genotype, but environment still affects phenotype.</li>
</ul>

<h3>8. Exam-style questions</h3>
<ol>
  <li>Compare mitosis and meiosis in terms of the cells produced. <em>Answer:</em> Mitosis gives two genetically identical diploid cells; meiosis gives four genetically different haploid gametes.</li>
  <li>Explain why meiosis is important for sexual reproduction. <em>Answer:</em> It halves the chromosome number so that fertilisation restores the diploid number, and it creates genetic variation by shuffling alleles.</li>
  <li>A heterozygous brown-eyed parent (Bb) has children with a blue-eyed parent (bb). What proportion of the children would be expected to have blue eyes? <em>Answer:</em> The gametes are B and b from one parent and b and b from the other, giving Bb, Bb, bb and bb — so 50 % would be expected to have blue eyes.</li>
  <li>Two carriers of cystic fibrosis have a child. State the probability the child is affected and explain. <em>Answer:</em> 1 in 4, or 25 %: both parents are Cc, so one combination in four is cc, and cc is the only genotype that gives the condition.</li>
  <li>Explain why two parents with the same phenotype can have a child with a different one. <em>Answer:</em> Both parents may be heterozygous carriers of a recessive allele, so the child can inherit the recessive allele from each and show the recessive phenotype.</li>
  <li>Give one advantage and one concern of genetic engineering. <em>Answer:</em> Advantage: insulin can be produced in large amounts and is identical to human insulin. Concern: the long-term effects of releasing genetically modified organisms into the environment are uncertain.</li>
  <li>Explain why cloning a plant produces a crop that is uniformly vulnerable. <em>Answer:</em> The plants are genetically identical, so none of them carries resistance to a disease that the others lack, and the whole crop can be lost together.</li>
</ol>

<h3>9. Revision checklist</h3>
<ul>
  <li>I can compare sexual and asexual reproduction.</li>
  <li>I can compare mitosis and meiosis and say where each happens.</li>
  <li>I can define gene, allele, genotype, phenotype, homozygous and heterozygous.</li>
  <li>I can complete a Punnett square and give a phenotype ratio and a probability.</li>
  <li>I can explain cystic fibrosis and polydactyly as recessive and dominant inheritance.</li>
  <li>I can describe genetic engineering of insulin and give one advantage and one concern.</li>
  <li>I can describe embryo transplant and adult cell cloning.</li>
</ul>
$lit$, material_type = 'notes', updated_at = now()
  from t
  where sm.topic_id = t.id and sm.title = $lit$IGCSE Biology (OxfordAQA): Inheritance$lit$
  returning sm.id
)
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, $lit$IGCSE Biology (OxfordAQA): Inheritance$lit$, $lit$<h2>Inheritance</h2>
<p>Every cell in your body carries the same set of instructions, written in DNA and packaged into chromosomes, and this topic is about how that set is copied, halved, shuffled and sometimes changed. Two divisions do the copying and halving; alleles decide which version of a characteristic appears; a genetic cross predicts the odds; and genetic engineering and cloning are the technologies that follow once you can read and cut DNA. The exam treats the cross as arithmetic — set out the gametes, fill the grid, read the ratio — so the worked examples below are the ones to practise rather than the vocabulary.</p>

<h3>1. Sexual and asexual reproduction</h3>
<p>Sexual reproduction involves two parents and the fusion of gametes, so the offspring are genetically different from each other and from their parents. Asexual reproduction involves one parent and no gamete fusion, so the offspring are genetically identical clones.</p>
<table border="1">
  <tr><th>Feature</th><th>Sexual</th><th>Asexual</th></tr>
  <tr><td>Parents</td><td>Two</td><td>One</td></tr>
  <tr><td>Gametes</td><td>Fused (sperm and egg)</td><td>None</td></tr>
  <tr><td>Offspring</td><td>Genetically varied</td><td>Genetically identical clones</td></tr>
  <tr><td>Examples</td><td>Humans, flowering plants</td><td>Bacteria, strawberry runners, potato tubers</td></tr>
  <tr><td>Advantage</td><td>Variation helps a population survive a change</td><td>Fast, and needs only one parent</td></tr>
</table>
<p>Some organisms do both depending on conditions — aphids reproduce asexually in summer when food is plentiful and sexually in autumn, which is variation exactly when it is useful.</p>

<h3>2. Cell division: mitosis and meiosis</h3>
<p>Mitosis produces two genetically identical diploid cells and is used for growth, repair and asexual reproduction. Meiosis produces four genetically different haploid gametes and happens only in the reproductive organs.</p>
<ul>
  <li><strong>Diploid</strong> means two copies of each chromosome, one from each parent; human body cells are diploid with 46 chromosomes.</li>
  <li><strong>Haploid</strong> means one copy of each chromosome; human gametes are haploid with 23.</li>
  <li><strong>Meiosis</strong> halves the chromosome number so that fertilisation restores the diploid number, and it shuffles the chromosomes and their alleles, which is where genetic variation comes from.</li>
  <li><strong>Mitosis</strong> copies the chromosomes first, then divides once, so each new cell has the full set.</li>
</ul>
<p>The order of events matters: in meiosis the chromosomes line up in pairs and are pulled apart twice, so four cells result; in mitosis they line up singly and are pulled apart once, so two cells result.</p>

<h3>3. Genetic variation</h3>
<p>A gene is a section of DNA that codes for a characteristic. Different versions of the same gene are <strong>alleles</strong>, and the combination an organism carries is its <strong>genotype</strong>; the characteristic you can see is its <strong>phenotype</strong>.</p>
<ul>
  <li><strong>Dominant</strong> alleles are expressed even when only one copy is present, written with a capital letter.</li>
  <li><strong>Recessive</strong> alleles are expressed only when two copies are present, written with a lower-case letter.</li>
  <li><strong>Homozygous</strong> means two identical alleles (AA or aa); <strong>heterozygous</strong> means two different alleles (Aa).</li>
  <li><strong>Co-dominance</strong> means both alleles are expressed, as in AB blood group or a roan coat.</li>
</ul>
<p>Variation comes from three sources: the genes inherited from two parents, meiosis shuffling the alleles, and mutation. Environmental factors such as diet and exercise also affect phenotype, which is why identical twins are not perfectly identical.</p>

<h3>4. Worked example: a monohybrid cross</h3>
<p>Two heterozygous parents (Aa × Aa) have children. A is the dominant allele for free earlobes; a gives attached earlobes. Predict the ratio of phenotypes and the probability that a child has attached earlobes.</p>
<p>Each parent's gametes are A and a, so the grid gives AA, Aa, Aa and aa: the ratio is 1 AA : 2 Aa : 1 aa. Three of the four combinations carry at least one A, so 3 have free earlobes and 1 has attached — a phenotype ratio of 3 : 1. The probability of attached earlobes is 1 in 4, or 25 %.</p>
<p><em>Key:</em> A = dominant allele (free earlobes); a = recessive allele (attached earlobes); AA and Aa = free earlobes because A is expressed; aa = attached earlobes because both alleles are recessive.</p>
<p>Now run it the other way. If the couple has four children, each child independently has a 25 % chance, so the expected number with attached earlobes is 4 × 0.25 = 1 — but a family of four can easily have none or two. Expected numbers are probabilities multiplied by the number of children, not a promise.</p>

<h3>5. Genetic disorders</h3>
<p>Some disorders are caused by a single gene and are inherited in a predictable pattern, which is why a genetic cross can estimate the risk.</p>
<ul>
  <li><strong>Cystic fibrosis</strong> is caused by a recessive allele. A person inherits it only with two copies (cc); a carrier (Cc) has one copy and no symptoms, so two carrier parents have a 1 in 4 chance of an affected child.</li>
  <li><strong>Polydactyly</strong> — extra fingers or toes — is caused by a dominant allele, so a person with one copy has the condition and can pass it to half their children.</li>
</ul>
<p>Genetic screening tests for these alleles before or during pregnancy, and for embryos during IVF. It gives parents information, and raises the ethical question of what to do with it; the exam asks for both sides, so give one benefit and one concern rather than a verdict.</p>

<h3>6. Genetic manipulation and cloning</h3>
<p>Genetic engineering moves a gene from one organism to another. A human gene for insulin, for example, is cut out with an enzyme, inserted into a bacterial plasmid using another enzyme, and the bacteria are grown in a fermenter to produce insulin.</p>
<ul>
  <li><strong>Advantages:</strong> insulin is produced in large quantities, is identical to human insulin so fewer reactions occur, and the process does not depend on animal pancreases.</li>
  <li><strong>Concerns:</strong> the long-term effects of genetically modified organisms on ecosystems are uncertain, and some people object on ethical or religious grounds.</li>
  <li><strong>Cloning</strong> by embryo transplant takes a fertilised egg, splits it into several embryos and implants them into surrogates, producing identical offspring. Adult cell cloning transfers the nucleus of a body cell into an egg cell with its nucleus removed.</li>
  <li><strong>Cloning plants</strong> by cuttings or tissue culture is cheap and preserves a desirable variety, but the whole crop is equally vulnerable to one disease.</li>
</ul>

<h3>7. Typical mistakes</h3>
<ul>
  <li>Saying meiosis produces two cells. It produces four, each with half the chromosome number.</li>
  <li>Writing "a recessive allele is weaker". It is not weaker; it is simply not expressed when a dominant allele is present.</li>
  <li>Giving a genotype ratio when the question asks for a phenotype ratio, or forgetting to say which phenotype is which.</li>
  <li>Claiming a 3 : 1 ratio guarantees three of one and one of the other in a family of four.</li>
  <li>Confusing a carrier with an affected person. A carrier has one copy of a recessive allele and no symptoms.</li>
  <li>Describing genetic engineering as "breeding". Breeding selects existing alleles; engineering moves a gene between species.</li>
  <li>Saying clones are "identical in every way". They share genotype, but environment still affects phenotype.</li>
</ul>

<h3>8. Exam-style questions</h3>
<ol>
  <li>Compare mitosis and meiosis in terms of the cells produced. <em>Answer:</em> Mitosis gives two genetically identical diploid cells; meiosis gives four genetically different haploid gametes.</li>
  <li>Explain why meiosis is important for sexual reproduction. <em>Answer:</em> It halves the chromosome number so that fertilisation restores the diploid number, and it creates genetic variation by shuffling alleles.</li>
  <li>A heterozygous brown-eyed parent (Bb) has children with a blue-eyed parent (bb). What proportion of the children would be expected to have blue eyes? <em>Answer:</em> The gametes are B and b from one parent and b and b from the other, giving Bb, Bb, bb and bb — so 50 % would be expected to have blue eyes.</li>
  <li>Two carriers of cystic fibrosis have a child. State the probability the child is affected and explain. <em>Answer:</em> 1 in 4, or 25 %: both parents are Cc, so one combination in four is cc, and cc is the only genotype that gives the condition.</li>
  <li>Explain why two parents with the same phenotype can have a child with a different one. <em>Answer:</em> Both parents may be heterozygous carriers of a recessive allele, so the child can inherit the recessive allele from each and show the recessive phenotype.</li>
  <li>Give one advantage and one concern of genetic engineering. <em>Answer:</em> Advantage: insulin can be produced in large amounts and is identical to human insulin. Concern: the long-term effects of releasing genetically modified organisms into the environment are uncertain.</li>
  <li>Explain why cloning a plant produces a crop that is uniformly vulnerable. <em>Answer:</em> The plants are genetically identical, so none of them carries resistance to a disease that the others lack, and the whole crop can be lost together.</li>
</ol>

<h3>9. Revision checklist</h3>
<ul>
  <li>I can compare sexual and asexual reproduction.</li>
  <li>I can compare mitosis and meiosis and say where each happens.</li>
  <li>I can define gene, allele, genotype, phenotype, homozygous and heterozygous.</li>
  <li>I can complete a Punnett square and give a phenotype ratio and a probability.</li>
  <li>I can explain cystic fibrosis and polydactyly as recessive and dominant inheritance.</li>
  <li>I can describe genetic engineering of insulin and give one advantage and one concern.</li>
  <li>I can describe embryo transplant and adult cell cloning.</li>
</ul>
$lit$, 'notes'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$biology-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$variation-and-evolution$lit$
), upd as (
  update public.study_materials sm
  set content = $lit$<h2>Variation and Evolution</h2>
<p>No two individuals are identical, and that difference is the raw material of evolution. This topic separates the two kinds of variation an exam can ask you to plot, explains where variation comes from, and then walks through natural selection as a sequence rather than a slogan: variation exists, competition follows, some variants survive, they reproduce, and their alleles become more common. Once that chain is clear, selective breeding, antibiotic resistance and the fossil record are all the same argument applied to different timescales — and the answer to "explain how" becomes a list of five steps instead of a guess.</p>

<h3>1. Continuous and discontinuous variation</h3>
<p>Variation is the difference between individuals of the same species. It is either continuous or discontinuous, and the distinction decides which graph you draw.</p>
<table border="1">
  <tr><th>Feature</th><th>Continuous</th><th>Discontinuous</th></tr>
  <tr><td>Values</td><td>Any value in a range</td><td>Distinct categories, with no intermediate values</td></tr>
  <tr><td>Graph</td><td>A line graph or histogram</td><td>A bar chart</td></tr>
  <tr><td>Controlled by</td><td>Many genes, plus the environment</td><td>Usually one gene, or a few</td></tr>
  <tr><td>Examples</td><td>Height, mass, leaf length, hand span</td><td>Blood group, eye colour, earlobe type, tongue rolling</td></tr>
</table>
<p>A person's height is not "tall" or "short" — it falls somewhere on a smooth continuum, and it depends on diet as well as genes. Blood group has no in-between: you are A, B, AB or O, and no environment changes that.</p>

<h3>2. Where variation comes from</h3>
<p>Variation has three genetic sources and one environmental one, and most characteristics are a mixture.</p>
<ul>
  <li><strong>Inherited alleles</strong> — different combinations from two parents.</li>
  <li><strong>Meiosis</strong> — shuffles chromosomes into gametes, so each gamete is different.</li>
  <li><strong>Mutation</strong> — a change in the DNA sequence, which creates new alleles. Most mutations have no effect or are harmful; a few are useful.</li>
  <li><strong>Environment</strong> — diet, exercise, sunlight and disease all change phenotype. A plant grown in shade is taller and thinner than its genetically identical twin in full sun.</li>
</ul>
<p>Identical twins share every allele, so any difference between them is environmental. That is the cleanest evidence for the environmental component of variation, and it is a common exam item.</p>

<h3>3. Worked example: describing continuous data</h3>
<p>A student measures the hand span of 10 classmates in centimetres: 18, 19, 19, 20, 20, 20, 21, 22, 22, 23. Calculate the mean and the range, and say which graph should display the data.</p>
<p>mean = total ÷ number of values = 204 ÷ 10 = 20.4 cm. Range = largest − smallest = 23 − 18 = 5 cm. The data are continuous, so a histogram or line graph is appropriate, with hand span on the x-axis and frequency on the y-axis.</p>
<p><em>Key:</em> mean = the sum of the measurements divided by how many there are (cm); range = the difference between the largest and smallest values (cm); frequency = how many individuals fall in each group.</p>
<p>Now suppose 5 % of a moth population is dark and the rest pale. In a population of 2 000 moths, that is 0.05 × 2 000 = 100 dark moths. If pollution darkens the trees and the dark proportion rises to 60 % in the next generation, that is 1 200 dark moths — a change in allele frequency, which is evolution measurable in one line.</p>

<h3>4. Natural selection</h3>
<p>Natural selection is the mechanism of evolution, and it is marked as a sequence. Learn the five steps in order.</p>
<ol>
  <li>Individuals in a population vary, because of mutation and the shuffling of alleles.</li>
  <li>More offspring are produced than can survive, so there is competition for resources.</li>
  <li>Individuals with variations that suit the environment are more likely to survive and reproduce.</li>
  <li>They pass those advantageous alleles to their offspring.</li>
  <li>Over many generations the proportion of individuals with the advantageous allele increases, and the population changes.</li>
</ol>
<p>The peppered moth is the standard example: pale moths were camouflaged on lichen-covered trees, but industrial pollution killed the lichen and blackened the bark, so dark moths were less visible to birds, survived, and became common. When clean-air legislation returned the lichen, the pale form increased again — which shows the process tracks the environment rather than moving in one direction.</p>

<h3>5. Antibiotic resistance</h3>
<p>Antibiotic resistance is natural selection happening in days rather than millennia, and it is the example the specification expects you to be able to explain.</p>
<ul>
  <li>Bacteria vary: a random mutation gives some individuals resistance to an antibiotic.</li>
  <li>The antibiotic kills the non-resistant bacteria, removing the competition.</li>
  <li>The resistant bacteria survive, reproduce and pass on the resistance allele.</li>
  <li>The population becomes resistant, so the antibiotic stops working.</li>
</ul>
<p>Because of this, doctors prescribe antibiotics only when they are needed, patients complete the full course, and antibiotics are not used for viral infections. Those three rules are the answer to "how can resistance be reduced".</p>

<h3>6. Speciation</h3>
<p>A species is a group of organisms that can breed together to produce fertile offspring. Speciation happens when populations become isolated — by a river, a mountain range or an ocean — so they stop interbreeding.</p>
<ul>
  <li>Each population experiences different selection pressures, so different alleles become common.</li>
  <li>Over many generations the populations become so different that they can no longer interbreed successfully.</li>
  <li>They are now separate species, even if they meet again.</li>
</ul>
<p>Isolation is the key word: without it, the two populations would keep mixing and the differences would not accumulate.</p>

<h3>7. Selective breeding and extinction</h3>
<p>Selective breeding is artificial selection: humans choose which individuals reproduce, so the desirable alleles become common.</p>
<ul>
  <li><strong>Method:</strong> choose parents with the desired characteristic, breed them, select the best offspring, and repeat over many generations.</li>
  <li><strong>Examples:</strong> high-yield wheat, disease-resistant crops, dairy cattle that produce more milk, dogs bred for particular traits.</li>
  <li><strong>Drawbacks:</strong> the population becomes genetically similar, so a single disease can wipe it out; and inbreeding can produce inherited health problems.</li>
  <li><strong>Extinction</strong> happens when a species cannot adapt to a change — a new predator, a lost habitat, a disease or climate change — and every individual dies.</li>
</ul>
<p>The fossil record provides evidence for evolution: it shows organisms that no longer exist, and sequences of change such as the increasing size of horse ancestors. It is incomplete, because most organisms do not fossilise, which is why the record is evidence rather than a complete account.</p>

<h3>8. Typical mistakes</h3>
<ul>
  <li>Plotting continuous data as a bar chart, or discontinuous data as a line graph.</li>
  <li>Writing "the moth wanted to be dark" or "the bacteria learned to resist". Individuals do not adapt on purpose; the population changes because some individuals already have the allele.</li>
  <li>Saying an individual evolves. Individuals do not evolve; populations do, over generations.</li>
  <li>Giving only "survival of the fittest" without the variation, inheritance and generations that make it a mechanism.</li>
  <li>Confusing natural selection with selective breeding. One is driven by the environment, the other by humans.</li>
  <li>Claiming the fossil record is complete, or that a gap disproves evolution.</li>
  <li>Forgetting that a species must produce fertile offspring. A horse and a donkey produce a mule, which is infertile, so they are separate species.</li>
</ul>

<h3>9. Exam-style questions</h3>
<ol>
  <li>Explain whether human height shows continuous or discontinuous variation. <em>Answer:</em> Continuous: height can take any value in a range, is controlled by many genes and is also affected by the environment such as diet.</li>
  <li>Give two sources of genetic variation. <em>Answer:</em> Mutation, which creates new alleles, and meiosis, which shuffles alleles into different gametes.</li>
  <li>Explain how a population of bacteria becomes resistant to an antibiotic. <em>Answer:</em> A random mutation gives some bacteria resistance; the antibiotic kills the non-resistant ones; the resistant bacteria survive, reproduce and pass the allele on, so the proportion of resistant bacteria increases.</li>
  <li>Describe how natural selection could produce darker moths in a polluted area. <em>Answer:</em> The population varies in colour; on soot-blackened bark, dark moths are better camouflaged and less likely to be eaten; they survive, reproduce and pass on the dark allele; over generations the dark form becomes common.</li>
  <li>Explain why two populations on opposite sides of a mountain might become separate species. <em>Answer:</em> They are isolated and cannot interbreed, so they experience different selection pressures and their allele frequencies diverge until they can no longer produce fertile offspring together.</li>
  <li>Give one advantage and one drawback of selective breeding. <em>Answer:</em> Advantage: it produces crops or animals with higher yield or disease resistance. Drawback: the population becomes genetically similar, so a single disease could destroy the whole crop.</li>
  <li>A student records hand spans of 19, 20, 20, 21 and 25 cm. Calculate the mean and state what the 25 cm value is called. <em>Answer:</em> mean = 105 ÷ 5 = 21 cm; 25 cm is an outlier, far from the rest of the data.</li>
</ol>

<h3>10. Revision checklist</h3>
<ul>
  <li>I can distinguish continuous and discontinuous variation and choose the right graph.</li>
  <li>I can name the sources of genetic and environmental variation.</li>
  <li>I can calculate a mean and a range.</li>
  <li>I can give the five steps of natural selection in order.</li>
  <li>I can explain antibiotic resistance as natural selection.</li>
  <li>I can explain speciation through isolation.</li>
  <li>I can describe selective breeding and its drawbacks.</li>
  <li>I can explain extinction and the evidence from fossils.</li>
</ul>
$lit$, material_type = 'notes', updated_at = now()
  from t
  where sm.topic_id = t.id and sm.title = $lit$IGCSE Biology (OxfordAQA): Variation and Evolution$lit$
  returning sm.id
)
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, $lit$IGCSE Biology (OxfordAQA): Variation and Evolution$lit$, $lit$<h2>Variation and Evolution</h2>
<p>No two individuals are identical, and that difference is the raw material of evolution. This topic separates the two kinds of variation an exam can ask you to plot, explains where variation comes from, and then walks through natural selection as a sequence rather than a slogan: variation exists, competition follows, some variants survive, they reproduce, and their alleles become more common. Once that chain is clear, selective breeding, antibiotic resistance and the fossil record are all the same argument applied to different timescales — and the answer to "explain how" becomes a list of five steps instead of a guess.</p>

<h3>1. Continuous and discontinuous variation</h3>
<p>Variation is the difference between individuals of the same species. It is either continuous or discontinuous, and the distinction decides which graph you draw.</p>
<table border="1">
  <tr><th>Feature</th><th>Continuous</th><th>Discontinuous</th></tr>
  <tr><td>Values</td><td>Any value in a range</td><td>Distinct categories, with no intermediate values</td></tr>
  <tr><td>Graph</td><td>A line graph or histogram</td><td>A bar chart</td></tr>
  <tr><td>Controlled by</td><td>Many genes, plus the environment</td><td>Usually one gene, or a few</td></tr>
  <tr><td>Examples</td><td>Height, mass, leaf length, hand span</td><td>Blood group, eye colour, earlobe type, tongue rolling</td></tr>
</table>
<p>A person's height is not "tall" or "short" — it falls somewhere on a smooth continuum, and it depends on diet as well as genes. Blood group has no in-between: you are A, B, AB or O, and no environment changes that.</p>

<h3>2. Where variation comes from</h3>
<p>Variation has three genetic sources and one environmental one, and most characteristics are a mixture.</p>
<ul>
  <li><strong>Inherited alleles</strong> — different combinations from two parents.</li>
  <li><strong>Meiosis</strong> — shuffles chromosomes into gametes, so each gamete is different.</li>
  <li><strong>Mutation</strong> — a change in the DNA sequence, which creates new alleles. Most mutations have no effect or are harmful; a few are useful.</li>
  <li><strong>Environment</strong> — diet, exercise, sunlight and disease all change phenotype. A plant grown in shade is taller and thinner than its genetically identical twin in full sun.</li>
</ul>
<p>Identical twins share every allele, so any difference between them is environmental. That is the cleanest evidence for the environmental component of variation, and it is a common exam item.</p>

<h3>3. Worked example: describing continuous data</h3>
<p>A student measures the hand span of 10 classmates in centimetres: 18, 19, 19, 20, 20, 20, 21, 22, 22, 23. Calculate the mean and the range, and say which graph should display the data.</p>
<p>mean = total ÷ number of values = 204 ÷ 10 = 20.4 cm. Range = largest − smallest = 23 − 18 = 5 cm. The data are continuous, so a histogram or line graph is appropriate, with hand span on the x-axis and frequency on the y-axis.</p>
<p><em>Key:</em> mean = the sum of the measurements divided by how many there are (cm); range = the difference between the largest and smallest values (cm); frequency = how many individuals fall in each group.</p>
<p>Now suppose 5 % of a moth population is dark and the rest pale. In a population of 2 000 moths, that is 0.05 × 2 000 = 100 dark moths. If pollution darkens the trees and the dark proportion rises to 60 % in the next generation, that is 1 200 dark moths — a change in allele frequency, which is evolution measurable in one line.</p>

<h3>4. Natural selection</h3>
<p>Natural selection is the mechanism of evolution, and it is marked as a sequence. Learn the five steps in order.</p>
<ol>
  <li>Individuals in a population vary, because of mutation and the shuffling of alleles.</li>
  <li>More offspring are produced than can survive, so there is competition for resources.</li>
  <li>Individuals with variations that suit the environment are more likely to survive and reproduce.</li>
  <li>They pass those advantageous alleles to their offspring.</li>
  <li>Over many generations the proportion of individuals with the advantageous allele increases, and the population changes.</li>
</ol>
<p>The peppered moth is the standard example: pale moths were camouflaged on lichen-covered trees, but industrial pollution killed the lichen and blackened the bark, so dark moths were less visible to birds, survived, and became common. When clean-air legislation returned the lichen, the pale form increased again — which shows the process tracks the environment rather than moving in one direction.</p>

<h3>5. Antibiotic resistance</h3>
<p>Antibiotic resistance is natural selection happening in days rather than millennia, and it is the example the specification expects you to be able to explain.</p>
<ul>
  <li>Bacteria vary: a random mutation gives some individuals resistance to an antibiotic.</li>
  <li>The antibiotic kills the non-resistant bacteria, removing the competition.</li>
  <li>The resistant bacteria survive, reproduce and pass on the resistance allele.</li>
  <li>The population becomes resistant, so the antibiotic stops working.</li>
</ul>
<p>Because of this, doctors prescribe antibiotics only when they are needed, patients complete the full course, and antibiotics are not used for viral infections. Those three rules are the answer to "how can resistance be reduced".</p>

<h3>6. Speciation</h3>
<p>A species is a group of organisms that can breed together to produce fertile offspring. Speciation happens when populations become isolated — by a river, a mountain range or an ocean — so they stop interbreeding.</p>
<ul>
  <li>Each population experiences different selection pressures, so different alleles become common.</li>
  <li>Over many generations the populations become so different that they can no longer interbreed successfully.</li>
  <li>They are now separate species, even if they meet again.</li>
</ul>
<p>Isolation is the key word: without it, the two populations would keep mixing and the differences would not accumulate.</p>

<h3>7. Selective breeding and extinction</h3>
<p>Selective breeding is artificial selection: humans choose which individuals reproduce, so the desirable alleles become common.</p>
<ul>
  <li><strong>Method:</strong> choose parents with the desired characteristic, breed them, select the best offspring, and repeat over many generations.</li>
  <li><strong>Examples:</strong> high-yield wheat, disease-resistant crops, dairy cattle that produce more milk, dogs bred for particular traits.</li>
  <li><strong>Drawbacks:</strong> the population becomes genetically similar, so a single disease can wipe it out; and inbreeding can produce inherited health problems.</li>
  <li><strong>Extinction</strong> happens when a species cannot adapt to a change — a new predator, a lost habitat, a disease or climate change — and every individual dies.</li>
</ul>
<p>The fossil record provides evidence for evolution: it shows organisms that no longer exist, and sequences of change such as the increasing size of horse ancestors. It is incomplete, because most organisms do not fossilise, which is why the record is evidence rather than a complete account.</p>

<h3>8. Typical mistakes</h3>
<ul>
  <li>Plotting continuous data as a bar chart, or discontinuous data as a line graph.</li>
  <li>Writing "the moth wanted to be dark" or "the bacteria learned to resist". Individuals do not adapt on purpose; the population changes because some individuals already have the allele.</li>
  <li>Saying an individual evolves. Individuals do not evolve; populations do, over generations.</li>
  <li>Giving only "survival of the fittest" without the variation, inheritance and generations that make it a mechanism.</li>
  <li>Confusing natural selection with selective breeding. One is driven by the environment, the other by humans.</li>
  <li>Claiming the fossil record is complete, or that a gap disproves evolution.</li>
  <li>Forgetting that a species must produce fertile offspring. A horse and a donkey produce a mule, which is infertile, so they are separate species.</li>
</ul>

<h3>9. Exam-style questions</h3>
<ol>
  <li>Explain whether human height shows continuous or discontinuous variation. <em>Answer:</em> Continuous: height can take any value in a range, is controlled by many genes and is also affected by the environment such as diet.</li>
  <li>Give two sources of genetic variation. <em>Answer:</em> Mutation, which creates new alleles, and meiosis, which shuffles alleles into different gametes.</li>
  <li>Explain how a population of bacteria becomes resistant to an antibiotic. <em>Answer:</em> A random mutation gives some bacteria resistance; the antibiotic kills the non-resistant ones; the resistant bacteria survive, reproduce and pass the allele on, so the proportion of resistant bacteria increases.</li>
  <li>Describe how natural selection could produce darker moths in a polluted area. <em>Answer:</em> The population varies in colour; on soot-blackened bark, dark moths are better camouflaged and less likely to be eaten; they survive, reproduce and pass on the dark allele; over generations the dark form becomes common.</li>
  <li>Explain why two populations on opposite sides of a mountain might become separate species. <em>Answer:</em> They are isolated and cannot interbreed, so they experience different selection pressures and their allele frequencies diverge until they can no longer produce fertile offspring together.</li>
  <li>Give one advantage and one drawback of selective breeding. <em>Answer:</em> Advantage: it produces crops or animals with higher yield or disease resistance. Drawback: the population becomes genetically similar, so a single disease could destroy the whole crop.</li>
  <li>A student records hand spans of 19, 20, 20, 21 and 25 cm. Calculate the mean and state what the 25 cm value is called. <em>Answer:</em> mean = 105 ÷ 5 = 21 cm; 25 cm is an outlier, far from the rest of the data.</li>
</ol>

<h3>10. Revision checklist</h3>
<ul>
  <li>I can distinguish continuous and discontinuous variation and choose the right graph.</li>
  <li>I can name the sources of genetic and environmental variation.</li>
  <li>I can calculate a mean and a range.</li>
  <li>I can give the five steps of natural selection in order.</li>
  <li>I can explain antibiotic resistance as natural selection.</li>
  <li>I can explain speciation through isolation.</li>
  <li>I can describe selective breeding and its drawbacks.</li>
  <li>I can explain extinction and the evidence from fossils.</li>
</ul>
$lit$, 'notes'
from t
where not exists (select 1 from upd);
