select policyname, roles::text, cmd, qual, with_check
from pg_policies
where schemaname='public' and tablename in ('questions','learning_objectives')
order by tablename, policyname;
