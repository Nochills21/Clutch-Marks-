UPDATE study_materials SET content = content || $n$
<h3>Worked method for pressure questions</h3>
<p>Step 1: write down the force in newtons and the area in m². Step 2: divide, p = F/A. Step 3: if the question is about a liquid, use p = h&rho;g with h in metres, &rho; in kg/m³ and g = 10 N/kg, and remember that the pressure is the same at equal depths in the same liquid. Atmospheric pressure is added to the liquid pressure when a question asks for total pressure at depth.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'pressure-density');
