select t.id, t.slug, sl.level::text as lvl,
 (select string_agg(ss.code||' '||ss.title, ' ; ' order by ss.code) from syllabus_statements ss where ss.topic_id=t.id) as stmts,
 (select min(z.id::text) from quizzes z where z.topic_id=t.id and z.exam_type='quiz') as quiz
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
where s.name ilike '%computer%' and sl.level::text in ('AS','OL') and t.slug in ('communication-and-networking','data-structures','databases','ethics-and-ai','processor-fundamentals','programming-and-algorithms','system-software-and-security','information-representation','operating-systems','database-systems','programming-concepts','data-representation','networking-communication','hardware-architecture','algorithms-programming','ethics-security-impact','logic-gates-boolean-logic') order by lvl, slug;
