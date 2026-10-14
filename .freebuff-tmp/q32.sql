select json_build_object(
 'questions_total', (select count(*) from questions),
 'notes_recall', (select count(*) from questions q where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M'),
 'statement_linked', (select count(*) from questions where statement_id is not null),
 'exam_tier', (select count(*) from questions where difficulty='exam'),
 'exam_technique_materials', (select count(*) from study_materials where lower(replace(coalesce(material_type,''),'_','-'))='exam-technique'),
 'per_sl', (select string_agg(x.subj||'/'||x.level||'='||x.n, ' ' order by x.n desc) from (select s.slug subj, sl.level, count(q.id) n from questions q join quizzes z on z.id=q.quiz_id join topics t on t.id=z.topic_id join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id group by 1,2) x)
) as report;
