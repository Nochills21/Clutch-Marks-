select json_agg(t) from (
  select title, session, year, paper_number, paper_url, mark_scheme_url, source_url
    from past_papers
   where paper_url is not null
     and title like '%WME01/01%' and session = 'May/June' and year = 2023
   order by paper_url) t;
