select q.id, left(q.question_text,90) as stem, q.options::text as opts, q.correct_option as k, left(q.explanation,90) as expl
from public.questions q
where length(coalesce(q.explanation,'')) < 40
order by q.id
limit 40;
