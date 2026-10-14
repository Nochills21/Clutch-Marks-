select json_build_object(
 'candidates_open_now', (select count(*) from past_paper_link_checks where slot='candidate' and created_paper_id is null),
 'check_status', (select json_agg(t) from (select slot, status, count(*) n from past_paper_link_checks group by 1,2 order by 1,2) t),
 'papers_with_files', (select count(*) from past_papers where paper_url is not null and mark_scheme_url is not null),
 'papers_no_ms', (select count(*) from past_papers where mark_scheme_url is null),
 'per_subject_level', (select json_agg(t) from (select subject_slug, level, count(*) n, count(distinct session) sess from past_papers group by 1,2 order by 1,2) t),
 'questions_total', (select count(*) from questions),
 'questions_by_subject_level', (select json_agg(t) from (select s.slug subj, sl.level, count(q.id) n from questions q join topics t on t.id=q.topic_id join subjects s on s.id=t.subject_id join subject_levels sl on sl.id=t.subject_level_id group by 1,2 order by 1,2) t)
) as report;
