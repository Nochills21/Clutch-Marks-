-- Read-only baseline before adding the content guards. Two questions answered:
--   1. which public table columns (text-like or json) currently contain U+FFFD —
--      a CHECK constraint can only be added as VALID if nothing violates it, and
--      this also shows which columns are legitimately allowed to keep it;
--   2. whether any question row would violate an options/answer-index constraint.
with hits as (
  select c.table_name, c.column_name,
         (xpath('/row/c/text()',
                query_to_xml(
                  format('select count(*) as c from public.%I where %I::text like %L',
                         c.table_name, c.column_name, '%' || chr(65533) || '%'),
                  false, true, '')))[1]::text::int as rows_with_fffd
    from information_schema.columns c
   where c.table_schema = 'public'
     and c.data_type in ('text', 'character varying', 'jsonb', 'json')
)
select (select coalesce(json_agg(h order by h.table_name, h.column_name), '[]'::json)
          from (select * from hits where rows_with_fffd > 0) h) as columns_with_fffd,
       (select count(*) from public.questions q where jsonb_typeof(q.options) <> 'array') as options_not_array,
       (select count(*) from public.questions q where jsonb_array_length(q.options) < 2) as fewer_than_two_options,
       (select count(*) from public.questions q
         where q.correct_option < 0 or q.correct_option >= jsonb_array_length(q.options)) as answer_out_of_range,
       (select count(*) from public.questions) as questions_total,
       (select count(*) from pg_constraint pc
          join pg_class t on t.oid = pc.conrelid
          join pg_namespace n on n.oid = t.relnamespace
         where n.nspname = 'public' and pc.contype = 'c') as existing_check_constraints;
