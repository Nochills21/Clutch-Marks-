select t.slug, length(m.content) as notes_len,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.statement_id is not null) as linked
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
left join study_materials m on m.topic_id=t.id and m.material_type='notes'
where s.name ilike '%computer%' and sl.level::text='A2' order by t.slug;
