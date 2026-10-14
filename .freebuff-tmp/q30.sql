select json_agg(t) from (
  select left(title,50) t, session, year, source_url from past_papers where paper_url is null order by title limit 6) t;
