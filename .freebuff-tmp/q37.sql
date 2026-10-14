with r as (select id, title, paper_url, mark_scheme_url, session, year,
  coalesce(substring(title from '\(([0-9A-Z]{4}/[0-9]{2})\)'), substring(title from '\(([0-9]{4}/[0-9]{2})\)'), substring(title from '\(([A-Z]{3}[0-9]{2}/[0-9]{2})\)')) as code from past_papers)
select json_build_object(
 'papers', (select count(*) from past_papers),
 'files', (select count(*) from storage.objects where bucket_id='past-papers'),
 'dup_groups', (select count(*) from (select code, session, year from r where code is not null group by 1,2,3 having count(*)>1) x),
 'no_qp', (select count(*) from past_papers where paper_url is null),
 'no_ms', (select count(*) from past_papers where mark_scheme_url is null),
 'link_checks_ok', (select count(*) filter (where ok) || ' ok / ' || count(*) filter (where not ok) || ' dead' from past_paper_link_checks),
 'pending_candidates', (select count(*) from past_paper_link_checks where slot='candidate' and review_status='pending'),
 'attempts', (select count(*) from past_paper_attempts),
 'attempts_null_paper', (select count(*) from past_paper_attempts where paper_id is null),
 'bucket_mb', (select round(sum((metadata->>'size')::bigint)/1048576.0) from storage.objects where bucket_id='past-papers')
) as report;
