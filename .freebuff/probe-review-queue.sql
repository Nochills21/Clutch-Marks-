-- Proves the review-queue write shape (phase 3.4) against the real constraints,
-- then rolls everything back by raising. The raised message is the report.
--
-- What it checks that a unit test cannot: flashcard_sets/flashcards/progress
-- NOT NULL columns, the topic FK, and that the composite unique on
-- (user_id, flashcard_id) makes a second queueing of the same miss a no-op
-- rather than a 409 — a student who re-sits a paper must not have their
-- schedule reset.
DO $$
DECLARE
  _topic uuid;
  _topic_name text;
  _user uuid;
  _set uuid;
  _ids uuid[];
  _after_first int;
  _after_second int;
BEGIN
  SELECT t.id, t.name INTO _topic, _topic_name
  FROM topics t WHERE EXISTS (SELECT 1 FROM past_papers p WHERE p.topic_id = t.id)
  LIMIT 1;
  -- profiles.id is the profile's own uuid; profiles.user_id is the auth uid that
  -- flashcard_progress points at (profiles_user_id_fkey → auth.users).
  SELECT user_id INTO _user FROM profiles WHERE user_id IS NOT NULL LIMIT 1;

  INSERT INTO flashcard_sets (topic_id, title, description)
  VALUES (_topic, 'Marking misses: ' || left(_topic_name, 60), 'probe — rolled back')
  RETURNING id INTO _set;

  WITH ins AS (
    INSERT INTO flashcards (set_id, front, back, sort_order) VALUES
      (_set, 'M1 — probe point one', 'probe model answer', 1000),
      (_set, 'M1 — probe point two', 'probe model answer', 1001)
    RETURNING id
  )
  SELECT array_agg(id) INTO _ids FROM ins;

  INSERT INTO flashcard_progress (user_id, flashcard_id, ease_factor, interval_days, repetitions, next_review_at)
  SELECT _user, unnest(_ids), 2.5, 0, 0, now()
  ON CONFLICT (user_id, flashcard_id) DO NOTHING;
  SELECT count(*) INTO _after_first FROM flashcard_progress WHERE user_id = _user AND flashcard_id = ANY(_ids);

  INSERT INTO flashcard_progress (user_id, flashcard_id, ease_factor, interval_days, repetitions, next_review_at)
  SELECT _user, unnest(_ids), 2.5, 0, 0, now()
  ON CONFLICT (user_id, flashcard_id) DO NOTHING;
  SELECT count(*) INTO _after_second FROM flashcard_progress WHERE user_id = _user AND flashcard_id = ANY(_ids);

  RAISE EXCEPTION 'PROBE rolled back: cards=% first=% second=% set=%', array_length(_ids, 1), _after_first, _after_second, _set IS NOT NULL;
END $$;
