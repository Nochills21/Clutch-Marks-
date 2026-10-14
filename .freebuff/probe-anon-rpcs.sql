select p.proname,
       pg_get_function_identity_arguments(p.oid) as args,
       p.prosecdef as secdef,
       coalesce(array_to_string(p.proacl, ' | '), '(default)') as acl,
       has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can,
       has_function_privilege('authenticated', p.oid, 'EXECUTE') as auth_can,
       (pg_get_functiondef(p.oid) ilike '%auth.uid()%') as uses_uid,
       (pg_get_functiondef(p.oid) ilike '%insert into%' or pg_get_functiondef(p.oid) ilike '%update public%') as writes
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname='public'
  and p.proname in ('browse_questions','get_student_questions','grade_quiz','check_practice_answer','get_practice_questions','get_published_quizzes')
order by p.proname;
