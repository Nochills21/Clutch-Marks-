select 'student_prefs'            as obj, to_regclass('public.student_prefs')::text            as present
union all select 'study_sessions',         to_regclass('public.study_sessions')::text
union all select 'past_paper_link_checks', to_regclass('public.past_paper_link_checks')::text
union all select 'feedback_messages',      to_regclass('public.feedback_messages')::text
union all select 'ai_correction',          to_regclass('public.ai_correction')::text
union all select 'email_suppressions',     to_regclass('public.email_suppressions')::text
union all select 'prefs_grants',           (select count(*)::text from information_schema.role_routine_grants where routine_name='set_study_prefs')
union all select 'handle_new_user(oauth)', (select (pg_get_functiondef(p.oid) like '%raw_user_meta_data%' or pg_get_functiondef(p.oid) like '%identities%')::text from pg_proc p join pg_namespace n on n.oid=p.pronamespace where p.proname='handle_new_user' limit 1)
union all select 'papers_total',           (select count(*)::text from public.past_papers)
union all select 'papers_2025',            (select count(*)::text from public.past_papers where year=2025)
union all select 'papers_9618',            (select count(*)::text from public.past_papers where paper_url like '%9618%' or title ilike '%9618%')
union all select 'topics',                 (select count(*)::text from public.topics)
union all select 'anon_topics_grant',      (select count(*)::text from information_schema.table_privileges where table_name='topics' and grantee='anon')
union all select 'anon_lessons_grant',     (select count(*)::text from information_schema.table_privileges where table_name='lessons' and grantee='anon')
union all select 'cron_jobs',              (select count(*)::text from cron.job)
;
