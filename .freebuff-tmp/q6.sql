select json_build_object(
  'level_col', (select json_agg(json_build_object('udt', udt_name, 'typname', (select typname from pg_type where typname = udt_name))) from information_schema.columns where table_name='past_papers' and column_name='level'),
  'paths', (select json_agg(t) from (select paper_url, mark_scheme_url, subject_slug, level::text, title, paper_number, session, year, source_url from past_papers where paper_url is not null order by created_at desc limit 2) t),
  'levels_in_use', (select json_agg(t) from (select subject_slug, level::text as lvl, count(*) n from past_papers group by 1,2) t),
  'review_status_values', (select json_agg(distinct review_status) from past_paper_link_checks),
  'titles', (select json_agg(distinct title) from (select title from past_papers limit 10) x)
) as report;
