-- Which question rows actually carry the replacement character, and where?
-- Show the raw JSONB so the intended character can be recovered from context.
select
  q.id,
  q.quiz_id,
  left(q.question_text, 90) as question_text,
  jsonb_pretty(q.options) as options,
  left(coalesce(q.explanation, ''), 120) as explanation,
  z.title as quiz_title
from questions q
left join quizzes z on z.id = q.quiz_id
where q.options::text like '%' || chr(65533) || '%'
   or coalesce(q.explanation, '') like '%' || chr(65533) || '%'
order by q.quiz_id, q.sort_order;
