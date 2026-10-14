select s.name as subj, sl.level::text as lvl, t.slug, t.id as topic_id,
 (select z.id from quizzes z where z.topic_id=t.id limit 1) as quiz_id,
 (select json_agg(json_build_object('code',ss.code,'id',ss.id) order by ss.code) from syllabus_statements ss where ss.topic_id=t.id) as stmts,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id) as total_q
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
where t.slug in ('circular-measure','trigonometry-right-angled-triangles','trigonometry-sine-and-cosine-rules','algebra-equations','transformations-and-vectors')
order by lvl, slug;
