-- Repair one malformed reaction arrow: the note wrote the UV condition inside the
-- arrow itself (CH₄ + Cl₂ --UV light-→ CH₃Cl + HCl), which no reader can parse as
-- "a reaction that needs UV light". The house form puts the condition after the
-- arrow. Guarded by the exact old string and the row id, and it returns the id so
-- the count can be asserted (a 201 from the Management API does not prove a match).
update study_materials
   set content = replace(content,
        'CH₄ + Cl₂  --UV light-→  CH₃Cl + HCl',
        'CH₄ + Cl₂  →  CH₃Cl + HCl (UV light)'),
       updated_at = now()
 where id = (select m.id from study_materials m join topics t on t.id = m.topic_id
              where t.slug = 'organic-chemistry' and m.material_type = 'notes' limit 1)
   and content like '%CH₄ + Cl₂  --UV light-→  CH₃Cl + HCl%'
returning id;
