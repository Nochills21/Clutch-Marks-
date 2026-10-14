select t.id as topic_id, (select z.id from quizzes z where z.topic_id=t.id limit 1) as quiz_id,
 (select json_agg(json_build_object('code',ss.code,'id',ss.id,'title',left(ss.title,100)) order by ss.code) from syllabus_statements ss where ss.topic_id=t.id) as stmts
from topics t where t.slug='simulation-sensors-and-real-data';
