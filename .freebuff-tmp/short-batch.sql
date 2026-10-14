select q.id, length(q.explanation) as len, q.question_text, q.options::text as opts, q.correct_option as k, q.explanation
from public.questions q
where length(coalesce(q.explanation,'')) < 40
order by q.id
limit 40 offset 0;
