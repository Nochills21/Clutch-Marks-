select json_build_object(
  'past_papers_cols', (select json_agg(json_build_object('col', column_name, 'type', data_type) order by ordinal_position) from information_schema.columns where table_name='past_papers'),
  'link_check_cols', (select json_agg(json_build_object('col', column_name, 'type', data_type) order by ordinal_position) from information_schema.columns where table_name='past_paper_link_checks'),
  'link_check_summary', (select json_agg(t) from (select slot, status, source, count(*) as n from past_paper_link_checks group by 1,2,3 order by 4 desc) t)
) as report;
