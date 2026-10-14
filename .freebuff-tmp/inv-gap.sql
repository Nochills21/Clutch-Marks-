select s.name||' '||sl.level::text as course, string_agg(t.slug||'[n'||coalesce((select max(length(m.content)) from study_materials m where m.topic_id=t.id and m.material_type in ('notes','summary')),0)||' l'||(select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.statement_id is not null and q.difficulty='exam')||' f'||(select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id)||' s'||(select count(*) from syllabus_statements ss where ss.topic_id=t.id)||']', ', ' order by t.slug) as failing
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
where coalesce((select max(length(m.content)) from study_materials m where m.topic_id=t.id and m.material_type in ('notes','summary')),0) < 2000
 or (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.statement_id is not null and q.difficulty='exam') < 6
 or (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id) < 10
group by s.name, sl.level::text order by 1;
