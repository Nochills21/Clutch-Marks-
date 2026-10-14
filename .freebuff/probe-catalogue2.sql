select
  (select count(*) from public.subjects where is_active) as active_subjects,
  (select count(*) from public.subject_levels) as levels,
  (select count(*) from public.topics) as topics,
  (select count(*) from public.topics where coalesce(btrim(slug), '') = '') as topics_without_slug,
  (select string_agg(distinct upper(level::text), '+') from public.subject_levels) as level_values,
  (select count(distinct subject_id) from public.subject_levels) as subjects_with_levels;
