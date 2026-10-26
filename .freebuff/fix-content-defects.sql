-- Content-defect repair pass: every fix is an exact-string replace guarded by
-- the row id (and a distinctive pattern where it has no LIKE wildcards), each
-- statement returns the id so the count can be asserted — a 201 from the
-- Management API does not prove a match. Post-verified by
-- .freebuff-tmp/scan-markup-defects.cjs and the formula audit.

-- ── 1. Alkenes notes: <div> used where <li> belongs inside <ul> (4 places),
--       and the general formula written without subscripts (3 places).
update study_materials
   set content = replace(replace(replace(replace(replace(content,
        '<div>Oxidation: Alkene + acidified KMnO4 produces a diol with a purple to colourless transition</div>',
        '<li>Oxidation: Alkene + acidified KMnO4 produces a diol with a purple to colourless transition</li>'),
        '<div>Observation with an alkene: Colour changes from orange-brown to colourless</div>',
        '<li>Observation with an alkene: Colour changes from orange-brown to colourless</li>'),
        '<div>Carbocation stability order: tertiary > secondary > primary</div>',
        '<li>Carbocation stability order: tertiary > secondary > primary</li>'),
        '<div>Polymerisation type: Addition polymerisation of alkenes</div>',
        '<li>Polymerisation type: Addition polymerisation of alkenes</li>'),
        'CnH2n', 'C<sub>n</sub>H<sub>2n</sub>'),
       updated_at = now()
 where id = '3f80c4ce-e7f1-4af5-bb03-bc27da874e5f'
   and content like '%<div>Oxidation: Alkene%'
returning id;

-- same un-subscripted general formula in the Alkenes summary
update study_materials
   set content = replace(content, 'CnH2n', 'C<sub>n</sub>H<sub>2n</sub>'),
       updated_at = now()
 where id = (select id from study_materials where title = 'Alkenes Quick Revision' limit 1)
   and content like '%CnH2n%'
returning id;

-- ── 2. Plant Nutrition: condition written inside the arrow. House form puts
--       the condition after the arrow (see fix-uv-arrow.sql).
update study_materials
   set content = replace(replace(content,
        'carbon dioxide + water --(light energy, chlorophyll)-→ glucose + oxygen',
        'carbon dioxide + water → glucose + oxygen (light energy, chlorophyll)'),
        '6CO₂ + 6H₂O --(light)-→ C₆H₁₂O₆ + 6O₂',
        '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light)'),
       updated_at = now()
 where id = '5c9c13d2-f88c-4c1d-9e08-7e23f9596e78'
   and content like '%--(light)-→%'
returning id;

-- ── 3. Organic Chemistry route map: four condition-arrows in one <pre> block.
update study_materials
   set content = replace(replace(replace(replace(content,
        'ethane --(cracking/heat)-→ ethene',
        'ethane → ethene (cracking/heat)'),
        'ethene + steam --(H₃PO₄, 300 °C)-→ ethanol',
        'ethene + steam → ethanol (H₃PO₄, 300 °C)'),
        'ethanol + [O] --(bacterial)-→ ethanoic acid',
        'ethanol + [O] → ethanoic acid (bacterial)'),
        'ethanol + ethanoic acid --(conc. H₂SO₄)-→ ethyl ethanoate',
        'ethanol + ethanoic acid → ethyl ethanoate (conc. H₂SO₄)'),
       updated_at = now()
 where id = (select id from study_materials where left(id::text,8) = 'b3609283' limit 1)
   and content like '%--(cracking/heat)-→%'
returning id;

-- ── 4. Sensor/actuator note: stray hyphen left in front of two arrows (the
--       arrow pass converted '-->' to '-→'; a clean arrow is what was meant).
update study_materials
   set content = replace(content, '-→', '→'),
       updated_at = now()
 where id = (select id from study_materials where left(id::text,8) = 'f4ec1c0b' limit 1)
   and content like '%quantity -→%'
returning id;

-- ── 5. Four bodies left a <p> unclosed, which swallows the heading after it.
update study_materials
   set content = replace(content,
        'to check yourself.' || chr(10) || '<h3>Heterogeneous Systems',
        'to check yourself.</p>' || chr(10) || '<h3>Heterogeneous Systems'),
       updated_at = now()
 where id = (select id from study_materials where left(id::text,8) = '1f2c0b24' limit 1)
   and content like '%Heterogeneous Systems%'
returning id;

update study_materials
   set content = replace(content,
        'to check yourself.' || chr(10) || '<h3>Born-Haber',
        'to check yourself.</p>' || chr(10) || '<h3>Born-Haber'),
       updated_at = now()
 where id = (select id from study_materials where left(id::text,8) = '8789fc33' limit 1)
   and content like '%Born-Haber%'
returning id;

update study_materials
   set content = replace(content,
        'that trade is the mark.' || chr(10) || chr(10) || '<h3>Linear structures</h3>',
        'that trade is the mark.</p>' || chr(10) || chr(10) || '<h3>Linear structures</h3>'),
       updated_at = now()
 where id = (select id from study_materials where left(id::text,8) = 'c015774f' limit 1)
   and content like '%Linear structures%'
returning id;

update study_materials
   set content = replace(content,
        'your understanding of the topic.' || chr(10) || '<h3>Detailed Mechanisms',
        'your understanding of the topic.</p>' || chr(10) || '<h3>Detailed Mechanisms'),
       updated_at = now()
 where id = (select id from study_materials where left(id::text,8) = '46db98e1' limit 1)
   and content like '%Detailed Mechanisms%'
returning id;

-- ── 6. Entropy summary: spelled Greek with an underscore, which the notation
--       normaliser cannot see (its word boundary stops at '_'). Longest first.
update study_materials
   set content = replace(replace(replace(replace(replace(replace(replace(content,
        'delta_S surroundings', 'ΔS_surroundings'),
        'delta_S system', 'ΔS_system'),
        'delta_S total', 'ΔS_total'),
        '− delta_H / T', '−ΔH/T'),
        'delta_at H', 'ΔH_at'),
        'delta_hyd H', 'ΔH_hyd'),
        'delta_sol H', 'ΔH_sol'),
       updated_at = now()
 where id = (select id from study_materials where left(id::text,8) = '8789fc33' limit 1)
   and content like '%delta\_%' escape '\'
returning id;

-- ── 7. Normal Distribution summary: the worked example states Z = (X − μ)/σ
--       with no symbol key.
update study_materials
   set content = replace(content,
        'about 95% within two.',
        'about 95% within two.<p><em>Key:</em> X = the value being tested; μ = mean of the distribution; σ² = variance, so σ = standard deviation; Z = how many standard deviations X sits from the mean, and it has no units because it is a distance in σ.</p>'),
       updated_at = now()
 where id = '887eb0dc-eb5d-47ea-81ab-4d527cbcb3e1'
   and content like '%95\% within two.%' escape '\'
returning id;