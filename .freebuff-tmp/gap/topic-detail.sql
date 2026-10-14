select
  (select json_agg(x) from (
     select id, code, title, tier, level, sort_order from public.syllabus_statements
     where topic_id = '2232b534-eded-4d6f-8ca5-54ad3a4a7ba4' order by sort_order) x) as statements,
  (select json_agg(x) from (
     select * from public.quizzes
     where topic_id = '2232b534-eded-4d6f-8ca5-54ad3a4a7ba4') x) as quizzes,
  (select json_agg(x) from (
     select q.id, q.quiz_id, q.question_text, q.options, q.correct_option, q.difficulty, q.statement_id, q.sort_order
     from public.questions q join public.quizzes z on z.id = q.quiz_id
     where z.topic_id = '2232b534-eded-4d6f-8ca5-54ad3a4a7ba4' order by q.sort_order) x) as questions;
