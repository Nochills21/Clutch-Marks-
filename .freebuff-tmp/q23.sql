select json_build_object(
 'checks', (select string_agg(slot||'/'||status||'='||n, ' ') from (select slot, status, count(*) n from past_paper_link_checks group by 1,2 order by 1,2) x),
 'open_candidates', (select count(*) from past_paper_link_checks where slot='candidate' and created_paper_id is null),
 'unresolved', (select count(*) from past_paper_link_checks where status not in ('ok','resolved') and slot='candidate'),
 'papers_missing_ms', (select count(*) from past_papers where mark_scheme_url is null),
 'papers_missing_qp', (select count(*) from past_papers where paper_url is null)
) as report;
