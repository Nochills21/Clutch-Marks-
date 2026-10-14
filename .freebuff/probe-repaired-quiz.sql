-- Read-only verification for 20261009120000.
select q.sort_order, q.correct_option,
       q.options ->> q.correct_option as correct_text,
       q.question_text, q.options::text as options_text, q.explanation,
       jsonb_array_length(q.options) as n_options,
       (select count(*) from (
          select e.value from jsonb_array_elements_text(q.options) e(value)
           group by e.value having count(*) > 1) d) as dupes
  from public.questions q
  join public.quizzes z on z.id = q.quiz_id
 where z.title = 'Transformations and Vectors'
 order by q.sort_order;
