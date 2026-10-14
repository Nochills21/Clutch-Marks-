with d as (
  select id, title, coalesce(substring(title from '\(([0-9A-Z]{4}/[0-9]{2})\)'), substring(title from '\(([0-9]{4}/[0-9]{2})\)'), substring(title from '\(([A-Z]{3}[0-9]{2}/[0-9]{2})\)')) as code, session, year, source_url, topic_id
    from past_papers where paper_url is null
), f as (
  select coalesce(substring(title from '\(([0-9A-Z]{4}/[0-9]{2})\)'), substring(title from '\(([0-9]{4}/[0-9]{2})\)'), substring(title from '\(([A-Z]{3}[0-9]{2}/[0-9]{2})\)')) as code, session, year, count(*) n
    from past_papers where paper_url is not null group by 1,2,3
)
select json_build_object(
 'dead', (select count(*) from d),
 'dead_coded', (select count(*) from d where code is not null),
 'dead_with_source', (select count(*) from d where source_url is not null),
 'dead_twin_by_code_session_year', (select count(*) from d join f on f.code=d.code and f.session is not distinct from d.session and f.year is not distinct from d.year),
 'dead_codes_sample', (select string_agg(distinct coalesce(code,'?')||'|'||coalesce(session,'?')||'|'||coalesce(year::text,'?'), ' , ') from d),
 'have_codes', (select string_agg(distinct code, ' , ') from f where code is not null)
) as report;
