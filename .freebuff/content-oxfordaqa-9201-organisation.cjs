// OxfordAQA International GCSE Biology 9201 — topic 3.1 Organisation.
// Statements covered: 3.1.1 Cell structure, 3.1.2 Principles of organisation,
// 3.1.3 Animal tissues, organs and systems, 3.1.4 Plant tissues, organs and
// systems, 3.1.5 Transport in cells.
//
// The specification's own words are "cells are differentiated according to their
// function", so the note is built as one chain: organelle → specialised cell →
// tissue → organ → system, and then the three ways substances cross a membrane.
// That order is what lets a student answer both "name the organelle" and "explain
// why the villus is shaped like that" from the same understanding.
module.exports = {
  topicSlug: "organisation",
  title: "IGCSE Biology (OxfordAQA): Organisation",
  html: `<h2>Organisation</h2>
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
`,
};
