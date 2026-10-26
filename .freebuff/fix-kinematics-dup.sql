-- The kinematics keyed sheet repeated one mistakes bullet from the note body,
-- which the depth gate counts as a repeated paragraph. Reword the sheet's copy so
-- the two are distinct rather than deleting the body's own warning. Exact-string
-- replace, guarded, returning the id so a zero-row match is visible.
update study_materials
   set content = replace(content,
        '<li>Forgetting that at the top of a projectile''s flight the vertical velocity is zero but the acceleration is still 9.81 m s⁻² downwards.</li>' || chr(10) || '<li>Feeding km h⁻¹ straight in',
        '<li>Reading "at the top" as "at rest": so long as the flight continues, a is 9.81 m s⁻² downwards even where v_y is momentarily zero.</li>' || chr(10) || '<li>Feeding km h⁻¹ straight in'),
       updated_at = now()
 where id = (select m.id from study_materials m join topics t on t.id = m.topic_id
              where t.slug = 'kinematics' and m.material_type = 'notes' limit 1)
   and content like '%<li>Forgetting that at the top of a projectile''s flight%</li>%<li>Feeding km h⁻¹ straight in%'
returning id;
