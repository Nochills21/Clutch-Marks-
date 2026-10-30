-- Proves study-planner's dueTopicNames() walk works for a real student under
-- RLS: progress (own rows only) → flashcards → flashcard_sets → topics.
-- Runs as `authenticated` with that student's JWT claims, then raises so
-- nothing (not even the role/claim GUCs) survives.
DO $$
DECLARE
  _user uuid;
  _due int;
  _topic text;
BEGIN
  select p.user_id into _user
  from public.flashcard_progress p
  where p.user_id is not null
  limit 1;
  if _user is null then
    raise exception 'PROBE skipped: no student has any flashcard_progress rows';
  end if;

  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claims', json_build_object('sub', _user, 'role', 'authenticated')::text, true);

  select count(*) into _due
  from public.flashcard_progress
  where next_review_at <= now();

  select t.name into _topic
  from public.flashcard_progress p
  join public.flashcards c on c.id = p.flashcard_id
  join public.flashcard_sets s on s.id = c.set_id
  join public.topics t on t.id = s.topic_id
  where p.next_review_at <= now()
  limit 1;

  raise exception 'PROBE rolled back: due_visible=% topic=%', _due, coalesce(_topic, '(none)');
END $$;
