select t.slug, ss.code, left(ss.title,100) as title, (select count(*) from questions q where q.statement_id = ss.id) as qs_on_stmt
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
join syllabus_statements ss on ss.topic_id = t.id
where s.name ilike '%physics%' and sl.level::text ilike '%as%'
order by t.sort_order nulls last, ss.sort_order;
