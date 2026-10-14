update public.quizzes z
   set is_published = false
 where z.is_published
   and exists (select 1 from public.questions q where q.quiz_id = z.id and q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M')
   and not exists (select 1 from public.questions q where q.quiz_id = z.id and not (q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M'));

delete from public.questions q
 where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M';
