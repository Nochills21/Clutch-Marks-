-- Verify the AI-corrector migration landed on the live project (read-only).
select 'has_active_plan exists' as check,
       exists (
         select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
          where n.nspname = 'public' and p.proname = 'has_active_plan'
       ) as ok
union all
select 'audit check allows paper_correction',
       exists (
         select 1 from pg_constraint
          where conname = 'ai_audit_log_action_check'
            and pg_get_constraintdef(oid) like '%paper_correction%'
       )
union all
select 'ai_correction.source column',
       exists (
         select 1 from information_schema.columns
          where table_schema = 'public' and table_name = 'ai_correction' and column_name = 'source'
       )
union all
select 'ai_correction.answer_files column',
       exists (
         select 1 from information_schema.columns
          where table_schema = 'public' and table_name = 'ai_correction' and column_name = 'answer_files'
       )
union all
select 'homework-uploads delete policy',
       exists (
         select 1 from pg_policies
          where schemaname = 'storage' and tablename = 'objects'
            and policyname = 'Users can delete own homework files'
       )
union all
select 'has_active_plan: approved admin -> true',
       coalesce((
         select public.has_active_plan(user_id) from public.user_roles
          where role = 'admin' and is_approved = true limit 1
       ), false)
union all
select 'has_active_plan: planless account -> false',
       coalesce((
         select not public.has_active_plan(ur.user_id) from public.user_roles ur
          where not exists (
            select 1 from public.subscriptions s
             where s.user_id = ur.user_id and s.status = 'active' and (s.ends_at is null or s.ends_at > now())
          )
          limit 1
       ), false)
union all
select 'has_active_plan: active subscriber -> true',
       coalesce((
         select public.has_active_plan(user_id) from public.subscriptions
          where status = 'active' and (ends_at is null or ends_at > now()) limit 1
       ), false)
order by 1;
