select 'q_total' as check, count(*)::text as n from questions
union all select 'q_key_out_of_range', count(*)::text from questions q
  where q.correct_option is null or q.correct_option < 0 or q.correct_option >= jsonb_array_length(to_jsonb(q.options))
union all select 'q_option_count_not_4', count(*)::text from questions q where jsonb_array_length(to_jsonb(q.options)) <> 4
union all select 'q_empty_explanation', count(*)::text from questions q where coalesce(trim(q.explanation),'') = ''
union all select 'q_no_statement_id', count(*)::text from questions q where q.statement_id is null
union all select 'q_has_fffd', count(*)::text from questions q where q.question_text like '%' || chr(65533) || '%' or q.explanation like '%' || chr(65533) || '%'
union all select 'f_total', count(*)::text from flashcards
union all select 'f_empty_side', count(*)::text from flashcards f where coalesce(trim(f.front),'') = '' or coalesce(trim(f.back),'') = ''
union all select 'f_dup_front_in_set', count(*)::text from (select set_id, lower(trim(front)) from flashcards group by 1,2 having count(*) > 1) d
union all select 'notes_under_1000', count(*)::text from study_materials sm where sm.material_type in ('notes','summary') and length(sm.content) < 1000
union all select 'notes_total', count(*)::text from study_materials sm where sm.material_type in ('notes','summary')
