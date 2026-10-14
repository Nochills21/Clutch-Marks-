select json_build_object(
 'refs', (select json_agg(json_build_object('table', ccu.table_name, 'col', kcu.column_name, 'on_delete', rc.delete_rule))
            from information_schema.table_constraints tc
            join information_schema.key_column_usage kcu on kcu.constraint_name = tc.constraint_name
            join information_schema.constraint_column_usage ccu on ccu.constraint_name = tc.constraint_name
            join information_schema.referential_constraints rc on rc.constraint_name = tc.constraint_name
           where tc.constraint_type='FOREIGN KEY' and ccu.table_name='past_papers'),
 'exact_dup_rows', (select count(*) from (
     select 1 from past_papers where paper_url is not null and mark_scheme_url is not null
      group by paper_url, mark_scheme_url having count(*) > 1) x),
 'exact_dup_extra', (select coalesce(sum(n-1),0) from (
     select count(*) n from past_papers where paper_url is not null and mark_scheme_url is not null
      group by paper_url, mark_scheme_url having count(*) > 1) x),
 'legacy_superseded', (select count(*) from past_papers l where l.paper_url like 'papers/%' and l.paper_url not like 'papers/pmt/%'
     and exists (select 1 from past_papers p where p.paper_url like 'papers/pmt/%' and p.mark_scheme_url is not null
                   and p.session is not distinct from l.session and p.year is not distinct from l.year
                   and coalesce(substring(p.title from '\(([0-9A-Z]{4}/[0-9]{2})\)'), substring(p.title from '\(([0-9]{4}/[0-9]{2})\)'), substring(p.title from '\(([A-Z]{3}[0-9]{2}/[0-9]{2})\)'))
                     = coalesce(substring(l.title from '\(([0-9A-Z]{4}/[0-9]{2})\)'), substring(l.title from '\(([0-9]{4}/[0-9]{2})\)'), substring(l.title from '\(([A-Z]{3}[0-9]{2}/[0-9]{2})\)'))))
) as report;
