select ss.spec_code as spec, count(*) as statements,
 count(ss.topic_id) as mapped,
 (select count(*) from questions q where q.statement_id in (select id from syllabus_statements x where x.spec_code = ss.spec_code)) as linked_questions
from syllabus_statements ss
where ss.spec_code in ('9709','9702')
group by ss.spec_code
order by ss.spec_code;
