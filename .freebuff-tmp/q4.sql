select json_agg(t) from (
  select url, host, session, year, source_code, file_name, review_status, created_paper_id
  from past_paper_link_checks where slot = 'candidate' order by year desc nulls last, file_name limit 12
) t;
