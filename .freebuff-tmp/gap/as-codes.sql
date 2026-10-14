select t.slug, sl.level::text lvl, (select string_agg(ss.code, ',' order by ss.code) from syllabus_statements ss where ss.topic_id=t.id) codes, (select z.id from quizzes z where z.topic_id=t.id order by z.created_at limit 1) quiz_id, (select length(sm.content) from study_materials sm where sm.topic_id=t.id and sm.material_type='notes' order by length(sm.content) desc limit 1) notes
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
where s.name ilike '%math%' and sl.level::text in ('AS','A2') order by lvl, t.slug;
