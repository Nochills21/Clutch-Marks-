-- Verification for 20261009140000_content_guards.sql.
--
-- This probe contains writes on purpose, so it must be run in dry-run mode,
-- which wraps the file in BEGIN … ROLLBACK:
--
--   node .freebuff/apply-sql-file.cjs .freebuff/probe-content-guards.sql
--
-- Every damaged write runs in its own subtransaction and is expected to raise
-- check_violation; the handler rolls it back, so even a guard that failed to
-- fire could not leave anything behind. The last two blocks are positive
-- controls: a well-formed question and an audit-log row carrying U+FFFD (the one
-- place that character is a record of what happened, not damage). The probe
-- raises if any damaged write was accepted, or if a valid one was rejected.

do $$
declare
  _quiz     uuid;
  _lesson   uuid;
  _material uuid;
  _card     uuid;
  _set      uuid;
  _topic    uuid;
  _paper    uuid;
  _failures text[] := '{}';
begin
  select id into _quiz     from public.quizzes        limit 1;
  select id into _lesson   from public.lessons        limit 1;
  select id into _material from public.study_materials limit 1;
  select id into _card     from public.flashcards     limit 1;
  select id into _set      from public.flashcard_sets limit 1;
  select id into _topic    from public.topics         limit 1;
  select id into _paper    from public.past_papers    limit 1;

  -- Without rows to write against, every "rejected" case below could pass while
  -- testing nothing (an UPDATE matching no rows succeeds).
  if _quiz is null or _lesson is null or _material is null or _card is null
     or _set is null or _topic is null or _paper is null then
    raise exception 'probe setup: one of the content tables it needs is empty';
  end if;

  -- ── replacement characters, one per guarded shape ─────────────────────────
  begin
    insert into public.questions (quiz_id, question_text, options, correct_option)
    values (_quiz, 'guard probe ' || chr(65533), '["a", "b"]'::jsonb, 0);
    _failures := array_append(_failures, 'questions.question_text accepted U+FFFD');
  exception when check_violation then null;
  end;

  begin
    insert into public.questions (quiz_id, question_text, options, correct_option)
    values (_quiz, 'guard probe', jsonb_build_array('a', 'b' || chr(65533)), 0);
    _failures := array_append(_failures, 'questions.options accepted U+FFFD');
  exception when check_violation then null;
  end;

  begin
    insert into public.questions (quiz_id, question_text, options, correct_option, explanation)
    values (_quiz, 'guard probe', '["a", "b"]'::jsonb, 0, 'because ' || chr(65533));
    _failures := array_append(_failures, 'questions.explanation accepted U+FFFD');
  exception when check_violation then null;
  end;

  begin
    update public.quizzes set description = coalesce(description, '') || chr(65533) where id = _quiz;
    _failures := array_append(_failures, 'quizzes.description accepted U+FFFD');
  exception when check_violation then null;
  end;

  begin
    update public.topics set name = name || chr(65533) where id = _topic;
    _failures := array_append(_failures, 'topics.name accepted U+FFFD');
  exception when check_violation then null;
  end;

  begin
    update public.lessons set content = coalesce(content, '') || chr(65533) where id = _lesson;
    _failures := array_append(_failures, 'lessons.content accepted U+FFFD');
  exception when check_violation then null;
  end;

  begin
    update public.study_materials set content = coalesce(content, '') || chr(65533) where id = _material;
    _failures := array_append(_failures, 'study_materials.content accepted U+FFFD');
  exception when check_violation then null;
  end;

  begin
    update public.flashcards set front = front || chr(65533) where id = _card;
    _failures := array_append(_failures, 'flashcards.front accepted U+FFFD');
  exception when check_violation then null;
  end;

  begin
    update public.flashcard_sets set title = title || chr(65533) where id = _set;
    _failures := array_append(_failures, 'flashcard_sets.title accepted U+FFFD');
  exception when check_violation then null;
  end;

  begin
    update public.past_papers set title = title || chr(65533) where id = _paper;
    _failures := array_append(_failures, 'past_papers.title accepted U+FFFD');
  exception when check_violation then null;
  end;

  begin
    insert into public.announcements (title, content)
    values ('guard probe ' || chr(65533), 'body');
    _failures := array_append(_failures, 'announcements.title accepted U+FFFD');
  exception when check_violation then null;
  end;

  -- ── answer indices that cannot point at an option ─────────────────────────
  begin
    insert into public.questions (quiz_id, question_text, options, correct_option)
    values (_quiz, 'guard probe', '["a", "b"]'::jsonb, 2);
    _failures := array_append(_failures, 'correct_option = option count (the 1-based signature) was accepted');
  exception when check_violation then null;
  end;

  begin
    insert into public.questions (quiz_id, question_text, options, correct_option)
    values (_quiz, 'guard probe', '["a", "b"]'::jsonb, -1);
    _failures := array_append(_failures, 'a negative correct_option was accepted');
  exception when check_violation then null;
  end;

  begin
    insert into public.questions (quiz_id, question_text, options, correct_option)
    values (_quiz, 'guard probe', '[]'::jsonb, 0);
    _failures := array_append(_failures, 'an empty options list was accepted');
  exception when check_violation then null;
  end;

  begin
    insert into public.questions (quiz_id, question_text, options, correct_option)
    values (_quiz, 'guard probe', '{"a": "b"}'::jsonb, 0);
    _failures := array_append(_failures, 'options that are not an array were accepted');
  exception when check_violation then null;
  end;

  -- ── positive controls ─────────────────────────────────────────────────────
  begin
    insert into public.questions (quiz_id, question_text, options, correct_option)
    values (_quiz, 'guard probe: a well-formed question', '["a", "b"]'::jsonb, 1);
  exception when others then
    _failures := array_append(_failures, format('a well-formed question was rejected (%s)', sqlerrm));
  end;

  -- admin_audit_log.details is deliberately unguarded: it records what an admin
  -- action saw, and 146 rows legitimately hold U+FFFD.
  begin
    insert into public.admin_audit_log (action, entity, details)
    values ('create', 'guard_probe', jsonb_build_object('saw', 'value ' || chr(65533)));
  exception when others then
    _failures := array_append(_failures, format('the audit log was wrongly guarded (%s)', sqlerrm));
  end;

  if array_length(_failures, 1) > 0 then
    raise exception 'content guards did not hold: %', array_to_string(_failures, '; ');
  end if;

  raise notice 'content guards verified: 15 damaged writes rejected, 2 valid writes accepted';
end $$;
