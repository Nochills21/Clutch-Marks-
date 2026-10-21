-- Two exam-technique data sets, both account-scoped and additive:
--
--   * question_timings — how long each question actually took in a sitting, so a
--     student can be told where the clock went (the sitting clock has always been
--     shown; nothing ever recorded what it measured);
--   * exam_dates — the papers a student actually sits, so a plan can be built
--     against a date instead of an abstract to-do list.
--
-- Neither table is readable across accounts, and neither is written by a trigger:
-- the client inserts its own rows for its own sitting.

create table if not exists public."question_timings" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "quiz_id" uuid not null,
  "question_id" uuid,
  "ordinal" integer default 0 not null,
  "seconds" integer not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "question_timings_pkey" primary key (id),
  -- A sitting cannot take a negative time, and a single question over an hour is
  -- a stale tab rather than a data point worth keeping.
  constraint "question_timings_seconds_sane" check (seconds >= 0 and seconds <= 3600),
  constraint "question_timings_ordinal_sane" check (ordinal >= 0 and ordinal <= 500)
);

create index if not exists "question_timings_user_quiz_idx"
  on public.question_timings (user_id, quiz_id);

-- Cascade with the account (PDPL deletion) and with the quiz; the question link
-- is SET NULL so a deleted question does not erase the sitting's shape.
alter table public."question_timings"
  drop constraint if exists "question_timings_user_id_fkey";
alter table public."question_timings"
  add constraint "question_timings_user_id_fkey"
  foreign key (user_id) references auth.users(id) on delete cascade;

alter table public."question_timings"
  drop constraint if exists "question_timings_quiz_id_fkey";
alter table public."question_timings"
  add constraint "question_timings_quiz_id_fkey"
  foreign key (quiz_id) references public."quizzes"(id) on delete cascade;

alter table public."question_timings"
  drop constraint if exists "question_timings_question_id_fkey";
alter table public."question_timings"
  add constraint "question_timings_question_id_fkey"
  foreign key (question_id) references public."questions"(id) on delete set null;

alter table public."question_timings" enable row level security;

drop policy if exists "read own question timings" on public."question_timings";
create policy "read own question timings" on public."question_timings"
  for select using (auth.uid() = user_id);

drop policy if exists "insert own question timings" on public."question_timings";
create policy "insert own question timings" on public."question_timings"
  for insert with check (auth.uid() = user_id);

drop policy if exists "admins read all question timings" on public."question_timings";
create policy "admins read all question timings" on public."question_timings"
  for select using (has_role(auth.uid(), 'admin'::app_role));


create table if not exists public."exam_dates" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "subject_level_id" uuid,
  "paper_label" text not null,
  "exam_at" timestamp with time zone not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "exam_dates_pkey" primary key (id),
  -- Same encoding guard as every other student-visible text column: a replacement
  -- character in a paper label is damage, not content.
  constraint "exam_dates_no_replacement_character"
    check (position(chr(65533) in paper_label) = 0),
  constraint "exam_dates_label_length" check (char_length(paper_label) between 1 and 120)
);

create index if not exists "exam_dates_user_when_idx"
  on public.exam_dates (user_id, exam_at);

alter table public."exam_dates"
  drop constraint if exists "exam_dates_user_id_fkey";
alter table public."exam_dates"
  add constraint "exam_dates_user_id_fkey"
  foreign key (user_id) references auth.users(id) on delete cascade;

alter table public."exam_dates"
  drop constraint if exists "exam_dates_subject_level_id_fkey";
alter table public."exam_dates"
  add constraint "exam_dates_subject_level_id_fkey"
  foreign key (subject_level_id) references public."subject_levels"(id) on delete set null;

alter table public."exam_dates" enable row level security;

drop policy if exists "read own exam dates" on public."exam_dates";
create policy "read own exam dates" on public."exam_dates"
  for select using (auth.uid() = user_id);

drop policy if exists "insert own exam dates" on public."exam_dates";
create policy "insert own exam dates" on public."exam_dates"
  for insert with check (auth.uid() = user_id);

drop policy if exists "update own exam dates" on public."exam_dates";
create policy "update own exam dates" on public."exam_dates"
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "delete own exam dates" on public."exam_dates";
create policy "delete own exam dates" on public."exam_dates"
  for delete using (auth.uid() = user_id);
