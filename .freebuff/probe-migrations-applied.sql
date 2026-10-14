select version, name, inserted_at::date as applied
from supabase_migrations.schema_migrations
order by version desc
limit 20;
