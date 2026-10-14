UPDATE study_materials SET content = content || $n$
<h3>Standard candles and the cosmic distance ladder</h3>
<p>A standard candle is an object whose luminosity is known, such as a Type Ia supernova or a Cepheid variable star. Comparing its known luminosity with its observed brightness gives its distance, using the inverse-square law. Stellar radii can be found in the same way: the luminosity L = 4&pi;R<sup>2</sup>&sigma;T<sup>4</sup> links radius, surface temperature and output power.</p>
<p><strong>Exam tip:</strong> state which assumption you are making, such as that the star radiates as a black body, before you calculate the radius.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'astronomy-and-cosmology');

UPDATE study_materials SET content = content || $n$
<h3>Resistivity and temperature</h3>
<p>For a metallic conductor at constant temperature, resistance is proportional to length and inversely proportional to cross-sectional area. Resistivity, &rho; = RA/L, is a property of the material. As temperature rises, the ions in a metal vibrate more and impede the flow of electrons, so resistivity increases. A thermistor behaves differently: its resistance falls as temperature rises, because more charge carriers are released.</p>
<p><strong>Exam tip:</strong> when asked to explain a resistance change, relate it to charge carriers and collisions, not just to the formula.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'electricity-d-c-circuits');

UPDATE study_materials SET content = content || $n$
<h3>Conditions for equilibrium</h3>
<p>A body is in equilibrium when the resultant force on it is zero and the resultant moment about any point is zero. For a body in equilibrium under three coplanar forces, the lines of action meet at a single point. The moment of a force about a pivot is Fd, where d is the perpendicular distance from the pivot to the line of action. Taking moments about the pivot removes the unknown reaction force, which makes this a useful method in exam questions.</p>
<p><strong>Exam tip:</strong> show the resolution of forces into horizontal and vertical components before you apply the equilibrium equations.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'forces-and-equilibrium');

UPDATE study_materials SET content = content || $n$
<h3>Stored elastic energy and Hooke's law</h3>
<p>Within the limit of proportionality, extension is proportional to force, F = kx, and the stiffness k depends on the material and its dimensions. The elastic strain energy stored in a stretched wire is equal to the area under the force-extension graph, E = &frac12;Fx. For a material, the Young modulus E = stress / strain. Beyond the elastic limit the material deforms plastically and does not return to its original length.</p>
<p><strong>Exam tip:</strong> state the limit of proportionality on the graph, because the energy formula only applies while the material obeys Hooke's law.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'materials-deformation');

UPDATE study_materials SET content = content || $n$
<h3>Gravitational potential and escape velocity</h3>
<p>Gravitational potential at a point is the work done per unit mass in moving a small mass from infinity to that point, so &phi; = -GM/r. Potential is negative because work must be done against gravity to remove a mass to infinity. The change in gravitational potential energy between two radii is GMm(1/r1 - 1/r2). A body escapes a planet when its kinetic energy equals the potential energy needed to reach infinity, which gives the escape speed v = &radic;(2GM/r).</p>
<p><strong>Exam tip:</strong> use the zero of potential at infinity, and keep the sign of the potential negative in every calculation.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'motion-in-a-circle-and-gravity');

UPDATE study_materials SET content = content || $n$
<h3>The diffraction grating equation</h3>
<p>A diffraction grating has many closely spaced slits. Light of wavelength &lambda; leaves the grating at angle &theta; to form bright maxima when d sin &theta; = n&lambda;, where d is the slit spacing and n is the order of the maximum. Each order is sharper and more widely separated than a double slit, because the many slits reinforce the bright positions. The number of orders visible is limited by the condition that sin &theta; cannot exceed 1.</p>
<p><strong>Exam tip:</strong> convert the slit spacing to metres before using the grating equation, and note that the central maximum is n = 0.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'superposition');

UPDATE study_materials SET content = content || $n$
<h3>Polarisation and the Doppler effect</h3>
<p>Only transverse waves can be polarised, because their oscillations can be restricted to one plane. A polariser passes only the component of the oscillation along its transmission axis. Light from a sky or a reflection is partly polarised, which is why polarising filters reduce glare. The Doppler effect for a moving source gives an observed frequency f' = f v/(v &plusmn; v<sub>s</sub>), where the upper sign applies when the source moves away from the observer and the lower sign when it approaches.</p>
<p><strong>Exam tip:</strong> longitudinal waves such as sound cannot be polarised, so say so explicitly if a question asks about it.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'waves');

UPDATE study_materials SET content = content || $n$
<h3>Power, efficiency and energy transfer</h3>
<p>Power is the rate at which work is done or energy is transferred, P = W/t = Fv for a force moving at constant velocity. Efficiency is the useful energy output divided by the total energy input, and it is always less than 1 because some energy is dissipated, usually as thermal energy from friction. When a body is raised, its gain in gravitational potential energy is mgh, and a kinetic energy change is &frac12;m(v<sup>2</sup> - u<sup>2</sup>). Both can be used to find the work done against resistive forces.</p>
<p><strong>Exam tip:</strong> state the percentage efficiency with units, and check that it is below 100 percent.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'work-energy-and-power');
