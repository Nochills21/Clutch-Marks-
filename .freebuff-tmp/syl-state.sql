select s.spec_code, s.board, s.level, count(*) as statements, count(s.topic_id) as mapped
from public.syllabus_statements s
group by s.spec_code, s.board, s.level
order by s.spec_code, s.level;
