-- Read-only pilot inventory for Computer Science AS / Hardware and Logic Gates.
select jsonb_build_object(
  'topic', (select jsonb_build_object('id', t.id, 'name', t.name, 'slug', t.slug, 'subject', s.name, 'subject_slug', s.slug, 'level', sl.level::text)
    from public.topics t join public.subject_levels sl on sl.id=t.subject_level_id join public.subjects s on s.id=sl.subject_id
    where t.slug='hardware-and-logic-gates' limit 1),
  'statements', (select coalesce(jsonb_agg(jsonb_build_object('id', st.id, 'code', st.code, 'title', st.title, 'tier', st.tier, 'sort_order', st.sort_order) order by st.sort_order), '[]'::jsonb)
    from public.syllabus_statements st join public.topics t on t.id=st.topic_id where t.slug='hardware-and-logic-gates'),
  'materials', (select coalesce(jsonb_agg(jsonb_build_object('id', m.id, 'title', m.title, 'type', m.material_type, 'text', left(regexp_replace(coalesce(m.content,''), '<[^>]+>', ' ', 'g'), 5000), 'content_chars', length(coalesce(m.content,''))) order by m.created_at), '[]'::jsonb)
    from public.study_materials m join public.topics t on t.id=m.topic_id where t.slug='hardware-and-logic-gates' and m.material_type in ('notes','summary')),
  'quizzes', (select coalesce(jsonb_agg(jsonb_build_object('id', z.id, 'title', z.title, 'published', z.is_published, 'question_count', (select count(*) from public.questions q where q.quiz_id=z.id))), '[]'::jsonb)
    from public.quizzes z join public.topics t on t.id=z.topic_id where t.slug='hardware-and-logic-gates'),
  'questions', (select coalesce(jsonb_agg(jsonb_build_object('id', q.id, 'quiz_id', q.quiz_id, 'statement_id', q.statement_id, 'stem', q.question_text, 'options', q.options, 'correct_option', q.correct_option, 'explanation', q.explanation, 'difficulty', q.difficulty) order by q.created_at), '[]'::jsonb)
    from public.questions q join public.quizzes z on z.id=q.quiz_id join public.topics t on t.id=z.topic_id where t.slug='hardware-and-logic-gates'),
  'decks', (select coalesce(jsonb_agg(jsonb_build_object('id', fs.id, 'title', fs.title, 'description', fs.description, 'card_count', (select count(*) from public.flashcards c where c.set_id=fs.id))),'[]'::jsonb)
    from public.flashcard_sets fs join public.topics t on t.id=fs.topic_id where t.slug='hardware-and-logic-gates'),
  'cards', (select coalesce(jsonb_agg(jsonb_build_object('id', c.id, 'set_id', c.set_id, 'front', c.front, 'back', c.back, 'sort_order', c.sort_order) order by c.sort_order),'[]'::jsonb)
    from public.flashcards c join public.flashcard_sets fs on fs.id=c.set_id join public.topics t on t.id=fs.topic_id where t.slug='hardware-and-logic-gates')
) as inventory;
