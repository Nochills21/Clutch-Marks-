select tablename, policyname, roles::text as roles, cmd,
       coalesce(qual, '') as using_expr
from pg_policies
where schemaname = 'public'
  and tablename in ('lessons','quizzes','past_papers','study_materials')
order by tablename, policyname;
