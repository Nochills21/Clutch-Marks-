select json_build_object(
 'no_qp', (select string_agg(left(title,45)||' ['||session||']', ' | ' order by title) from (select title, session from past_papers where paper_url is null order by title limit 12) x),
 'no_qp_n', (select count(*) from past_papers where paper_url is null),
 'no_ms_sample', (select string_agg(left(title,45)||' ['||session||']', ' | ' order by title) from (select title, session from past_papers where mark_scheme_url is null order by title limit 8) x),
 'orphan_files', (select count(*) from storage.objects o where o.bucket_id='past-papers' and o.name not like 'previews/%' and not exists (select 1 from past_papers p where p.paper_url=o.name or p.mark_scheme_url=o.name))
) as report;
