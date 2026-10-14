select jsonb_build_object(
  'topic', (select t.name from public.topics t where t.slug='hardware-and-logic-gates'),
  'notes', (select jsonb_build_object(
    'title',m.title,
    'html_chars',length(m.content),
    'text_chars',length(regexp_replace(regexp_replace(coalesce(m.content,''),'<[^>]+>',' ','g'),'&[[:alnum:]#]+;',' ','g')),
    'heading_count',(length(m.content)-length(replace(m.content,'<h3>','')))/4,
    'includes_2026_syllabus_basis',position('9618 syllabus for 2026' in m.content)>0
  ) from public.study_materials m where m.id='a5a4ad94-c42a-4993-87dc-62e555d836b9'),
  'practice_quiz', (select jsonb_build_object(
    'questions',count(*),
    'mapped_to_topic_statements',count(*) filter (where q.statement_id is not null),
    'keys_point_to_existing_options',count(*) filter (where q.correct_option>=0 and q.correct_option<jsonb_array_length(q.options) and q.options->q.correct_option is not null),
    'explanations_ge_80_chars',count(*) filter (where length(coalesce(q.explanation,''))>=80),
    'new_pilot_questions',count(*) filter (where q.sort_order between 20 and 35),
    'unmapped',count(*) filter (where q.statement_id is null),
    'duplicate_stems',count(*)-count(distinct lower(q.question_text)),
    'correct_option_distribution',jsonb_build_object(
      '0',count(*) filter (where q.correct_option=0),
      '1',count(*) filter (where q.correct_option=1),
      '2',count(*) filter (where q.correct_option=2),
      '3',count(*) filter (where q.correct_option=3)
    )
  ) from public.questions q where q.quiz_id='bde4696a-d22a-4751-bc0e-8add89f628a5'),
  'cards', (select jsonb_build_object(
    'total',count(*),
    'new_pilot_cards',count(*) filter (where c.sort_order between 10 and 21),
    'duplicate_fronts',count(*)-count(distinct lower(c.front)),
    'fronts',jsonb_agg(c.front order by c.sort_order)
  ) from public.flashcards c where c.set_id='6da7364a-3c81-4086-8889-aad04e614628'),
  'statement_coverage', (select jsonb_agg(jsonb_build_object('code',st.code,'linked_questions',coalesce(x.n,0)) order by st.sort_order)
    from public.syllabus_statements st left join lateral (
      select count(*) n from public.questions q where q.statement_id=st.id
    ) x on true where st.topic_id='532f32af-de30-4ad5-a9be-33e0d552a831')
) as audit;
