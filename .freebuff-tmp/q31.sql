select string_agg(x.v, ' || ' order by x.v) as report from (
  select left(title,40)||' | '||coalesce(session,'?')||' '||coalesce(year::text,'?')||' | '||coalesce(source_url,'none') as v
    from past_papers where paper_url is null order by title limit 8) x;
