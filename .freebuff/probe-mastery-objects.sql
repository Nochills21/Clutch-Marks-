select 'table' as kind, table_name as name from information_schema.tables
 where table_schema='public' and table_name='objective_reviews'
union all
select 'function', p.proname from pg_proc p join pg_namespace n on n.oid=p.pronamespace
 where n.nspname='public' and p.proname in ('objective_review_interval','record_objective_evidence','trg_practice_attempt_objective','my_objective_mastery','my_next_objective','objective_review_questions')
union all
select 'trigger', tgname from pg_trigger where tgname='practice_attempts_objective_review';
