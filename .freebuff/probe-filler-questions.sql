select 'total_questions' as metric, count(*)::text as value from public.questions
union all
select 'thin_context_prompts', count(*)::text from public.questions
 where question_text ~* 'which (statement|of these) (appears|belongs|is from|is covered|is missing|does the|is NOT part|does.*NOT cover)'
    or question_text ~* 'study notes|notes, which|from the .* notes'
union all
select 'topics_with_any_thin', count(distinct z.topic_id)::text from public.questions q
  join public.quizzes z on z.id = q.quiz_id
 where q.question_text ~* 'notes'
union all
select 'quizzes_named_practice', count(*)::text from public.quizzes where title like 'Practice — %'
union all
select 'questions_in_practice_quizzes', count(*)::text from public.questions q join public.quizzes z on z.id = q.quiz_id where z.title like 'Practice — %'
union all
select 'quizzes_named_solving', count(*)::text from public.quizzes where title ilike 'Solving%'
union all
select 'questions_in_solving_quizzes', count(*)::text from public.questions q join public.quizzes z on z.id = q.quiz_id where z.title ilike 'Solving%'
union all
select 'distinct_question_texts', count(distinct question_text)::text from public.questions
union all
select 'longest_option_chars', max((select max(length(o)) from jsonb_array_elements_text(options) o))::text from public.questions;
