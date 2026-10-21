-- Read-only, compact recon for the five features being added.
with cols as (
  select table_name, string_agg(column_name, ', ' order by ordinal_position) as columns
  from information_schema.columns
  where table_schema = 'public'
    and table_name in ('ai_correction', 'quiz_attempts', 'practice_attempts', 'past_papers')
  group by table_name
)
select
  (select string_agg(table_name || ': ' || columns, E'\n' order by table_name) from cols) as tables,
  (select count(*) from information_schema.tables
     where table_schema = 'public'
       and table_name in ('question_timings', 'exam_dates', 'lost_mark_causes')) as new_tables_present,
  (select count(*) from information_schema.routines
     where routine_schema = 'public'
       and routine_name in ('my_lost_mark_profile', 'my_pacing_profile')) as new_rpcs_present;
