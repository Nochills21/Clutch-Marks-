select json_agg(t) from (
  select slot, review_status, count(*) as n,
         min(session) as session_sample, min(source_code) as code_sample, min(file_name) as file_sample,
         count(distinct host) as hosts
  from past_paper_link_checks
  group by 1,2 order by 3 desc
) t;
