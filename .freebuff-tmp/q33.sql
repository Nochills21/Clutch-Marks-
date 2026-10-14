with r as (
  select id, title, paper_url, mark_scheme_url, session, year,
         coalesce(substring(title from '\(([0-9A-Z]{4}/[0-9]{2})\)'), substring(title from '\(([0-9]{4}/[0-9]{2})\)'), substring(title from '\(([A-Z]{3}[0-9]{2}/[0-9]{2})\)')) as code
    from past_papers
), g as (
  select code, session, year, count(*) n, count(*) filter (where paper_url is null) dead
    from r where code is not null group by 1,2,3 having count(*) > 1
)
select json_build_object(
 'dup_groups', (select count(*) from g),
 'dup_rows', (select coalesce(sum(n),0) from g),
 'dup_rows_dead', (select coalesce(sum(dead),0) from g),
 'sample', (select string_agg(x.code||' '||coalesce(x.session,'?')||' '||coalesce(x.year::text,'?')||' n='||x.n||' dead='||x.dead, ' | ') from (select * from g order by dead desc, n desc limit 6) x)
) as report;
