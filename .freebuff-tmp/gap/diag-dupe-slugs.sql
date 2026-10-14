select t.slug, t.id, sl.level::text as lvl, s.name as subj,
 (select length(sm.content) from study_materials sm where sm.topic_id=t.id and sm.material_type='notes' order by length(sm.content) desc limit 1) as notes,
 (select position('Nuclear decay and half-life' in sm.content) from study_materials sm where sm.topic_id=t.id and sm.material_type='notes' order by length(sm.content) desc limit 1) as p_nuc,
 (select position('Heat transfer and heat capacity' in sm.content) from study_materials sm where sm.topic_id=t.id and sm.material_type='notes' order by length(sm.content) desc limit 1) as p_heat,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.created_at > now() - interval '3 hours') as new_q,
 (select count(*) from flashcard_sets fs where fs.topic_id=t.id and fs.created_at > now() - interval '3 hours') as new_sets
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
where t.slug in (select slug from topics group by slug having count(*) > 1) or t.slug in ('earth-space','magnetism-electromagnetism','nuclear-physics','thermal-physics','waves-sound','pressure-density','energy-work-power','forces-motion','electricity','measurement-units')
order by t.slug, lvl;
