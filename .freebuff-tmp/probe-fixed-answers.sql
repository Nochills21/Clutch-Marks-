with agg as (
  select qu.id as quiz_id, count(*) as n_q, min(qn.correct_option) as mn, max(qn.correct_option) as mx
  from public.quizzes qu
  join public.questions qn on qn.quiz_id = qu.id
  group by qu.id
)
select qu.title, qu.id as quiz_id, qn.id as question_id, qn.sort_order,
       qn.correct_option, jsonb_array_length(qn.options) as n_opts, qn.options
from agg a
join public.quizzes qu on qu.id = a.quiz_id
join public.questions qn on qn.quiz_id = qu.id
where a.n_q >= 5 and a.mn = a.mx
order by qu.title, qn.sort_order;
