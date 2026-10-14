select json_build_object(
 'sample_rows', (select json_agg(t) from (select id, title, year, session, paper_number, subject_slug, level, paper_url, mark_scheme_url, topic_id, created_at, updated_at from past_papers where paper_url is null order by created_at limit 3) t),
 'created_window', (select string_agg(distinct to_char(created_at,'YYYY-MM-DD HH24:MI'), ' | ') from past_papers where paper_url is null),
 'check_links_for_these', (select json_agg(t) from (select c.slot, c.url, c.checked_at, c.created_paper_id, c.source_code, p.title, p.paper_url from past_paper_link_checks c left join past_papers p on p.id=c.created_paper_id where c.slot='candidate' limit 3) t)
) as report;
