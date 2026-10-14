select tablename, policyname, roles::text, cmd, qual, with_check
from pg_policies where schemaname='public' and tablename='material_progress';
