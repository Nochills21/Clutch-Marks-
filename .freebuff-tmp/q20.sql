select json_build_object(
 'per_sl', (select string_agg(x.subj||'/'||x.level||': papers='||x.papers||' sessions='||x.sess||' ms='||x.with_ms, ' | ' order by x.subj, x.level) from (
    select subject_slug subj, level, count(*) papers, count(distinct session) sess, count(*) filter (where mark_scheme_url is not null) with_ms
      from past_papers group by 1,2) x),
 'distinct_titles', (select count(distinct title) from past_papers),
 'sample', (select string_agg(p.title||' · '||p.session, ' | ') from (select title, session from past_papers order by random() limit 5) p)
) as report;
