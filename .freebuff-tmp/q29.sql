select json_agg(t) from (
  select title, session, year, (paper_url is not null) as has_file, source_url is not null as has_src
    from past_papers where title like '%WMA11/01%' or title like '%0580/12%' or title like '%WH11%'
   order by title, year, session limit 40) t;
