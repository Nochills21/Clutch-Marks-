-- flashcard_sets.topic_id lacked its FK to topics(id), so PostgREST could not
-- resolve the topics(name) embed used by Flashcards.tsx / AdminFlashcards.tsx
-- (list queries failed with 400 "could not find a relationship").
alter table public.flashcard_sets
  drop constraint if exists flashcard_sets_topic_id_fkey;
alter table public.flashcard_sets
  add constraint flashcard_sets_topic_id_fkey
  foreign key (topic_id) references public.topics(id) on delete set null;
