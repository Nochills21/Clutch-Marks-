with dead as (select * from past_papers where paper_url is null)
select json_build_object(
 'dead_total', (select count(*) from dead),
 'dead_with_twin', (select count(*) from dead d where exists (select 1 from past_papers p where p.id<>d.id and p.paper_url is not null and p.title=d.title and p.year=d.year and p.session=d.session)),
 'dead_titles', (select string_agg(distinct left(title,50), ' | ') from dead),
 'dead_topic_linked', (select count(*) from dead where topic_id is not null),
 'dead_sample_paper_number', (select string_agg(distinct coalesce(paper_number,'null'), ' , ') from dead)
) as report;
