-- RLS evidence for the signed-in path: become `authenticated` with a real
-- student's sub, then count what that role can actually read. Transaction-local,
-- so nothing is left behind.
select set_config(
  'request.jwt.claims',
  json_build_object(
    'sub', (select id::text from public.profiles order by created_at limit 1),
    'role', 'authenticated'
  )::text,
  true
) as _claims;

set local role authenticated;

select 'lessons' as tbl, count(*)::int as visible_rows from public.lessons
union all select 'quizzes', count(*)::int from public.quizzes
union all select 'past_papers', count(*)::int from public.past_papers
union all select 'study_materials', count(*)::int from public.study_materials
union all select 'admin_only_should_be_0', count(*)::int from public.profiles
union all select 'questions_should_be_visible', count(*)::int from public.questions;
