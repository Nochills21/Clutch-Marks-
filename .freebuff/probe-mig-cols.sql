select column_name from information_schema.columns
where table_schema='supabase_migrations' and table_name='schema_migrations' order by ordinal_position;
