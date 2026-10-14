select json_build_object(
  'candidates_open', (select count(*) from past_paper_link_checks where slot='candidate' and created_paper_id is null),
  'matchable_now', (select count(*) from past_paper_link_checks c
      where c.slot='candidate' and c.created_paper_id is null
        and exists (select 1 from past_papers p where p.title like '%'||c.source_code||'%'
                    and p.session is not distinct from c.session and p.year is not distinct from c.year and p.paper_url is not null)),
  'totals', (select json_build_object('rows', (select count(*) from past_papers), 'files', (select count(*) from storage.objects where bucket_id='past-papers')))
) as report;
