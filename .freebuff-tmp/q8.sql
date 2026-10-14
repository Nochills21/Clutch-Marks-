select json_build_object(
  'new_rows', (select json_agg(t) from (select title, session, year, paper_number, subject_slug, level::text as lvl, paper_url, mark_scheme_url from past_papers order by created_at desc limit 4) t),
  'totals_now', (select json_build_object('papers', count(*), 'with_pdf', count(paper_url), 'with_ms', count(mark_scheme_url)) from past_papers),
  'by_level', (select json_agg(t) from (select subject_slug, level::text as lvl, count(*) n from past_papers where subject_slug is not null group by 1,2 order by 1,2) t),
  'object_check', (select count(*) from storage.objects where name like 'papers/pmt/%')
) as report;
