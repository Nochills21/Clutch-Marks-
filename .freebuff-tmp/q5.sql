select json_build_object(
  'level_enum', (select json_agg(unnest::text) from unnest(enum_range(null::subject_levels_level)) unnest),
  'path_samples', (select json_agg(t) from (select paper_url, mark_scheme_url, subject_slug, level::text from past_papers where paper_url is not null order by created_at desc limit 3) t),
  'row_match_keys', (select json_agg(t) from (select subject_slug, level::text as level, count(*) n, count(distinct paper_number) pn from past_papers group by 1,2 order by 1,2) t),
  'titles_sample', (select json_agg(distinct title) from (select distinct title from past_papers limit 12) x)
) as report;
