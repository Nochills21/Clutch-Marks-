select q.id, left(q.question_text,80) as stem, q.options::text as opts, q.correct_option as k, q.explanation as expl
from public.questions q
where length(coalesce(q.explanation,'')) < 40
order by q.id
limit 50;
