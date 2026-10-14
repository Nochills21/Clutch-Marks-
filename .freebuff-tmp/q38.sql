select json_build_object(
 'orphan_files', (select count(*) from storage.objects o where o.bucket_id='past-papers'
    and not exists (select 1 from past_papers p where p.paper_url=o.name or p.mark_scheme_url=o.name)
    and o.name not like 'previews/%'),
 'orphan_mb', (select round(coalesce(sum((o.metadata->>'size')::bigint),0)/1048576.0) from storage.objects o where o.bucket_id='past-papers'
    and not exists (select 1 from past_papers p where p.paper_url=o.name or p.mark_scheme_url=o.name)
    and o.name not like 'previews/%'),
 'orphan_sample', (select string_agg(x.name, ' | ') from (select o.name from storage.objects o where o.bucket_id='past-papers'
    and not exists (select 1 from past_papers p where p.paper_url=o.name or p.mark_scheme_url=o.name)
    and o.name not like 'previews/%' limit 5) x)
) as report;
