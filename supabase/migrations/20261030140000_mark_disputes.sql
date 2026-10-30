-- Phase 3.2 — self-override disputes: "my phrasing is equivalent — award and flag".
--
-- The checklist (3.1) made every mark point visible, which makes it obvious when
-- the marker gets one wrong: a live run marked M1 for `2000 ÷ 5.087` as MISS when
-- the student had written `2000 ÷ 5.1`, and a real examiner would very likely
-- have awarded it. Without somewhere to say so, the only options are "trust the
-- black box" or "stop using it".
--
-- So a student can award a missed point themselves. The mark moves in their view
-- immediately, and the same click writes a row here that an admin reviews. The
-- record the marker produced (`ai_correction.corrected_papers`) is never
-- rewritten — an override is a *claim*, and the claim is what this table stores.
-- Nothing is lost either way: a rejected claim leaves the marker's mark intact,
-- and an upheld one tells us the marker was wrong about that point.
--
-- Who can do what:
--   * a student reads and opens only their own disputes, and only as `pending`;
--     there is no update policy for them, so they cannot resolve or reopen one
--   * an admin (role AND AAL2, via `is_admin`) reads all and resolves them
--
-- Guards mirror the content rules elsewhere in the schema: the replacement
-- character is refused at the table, and a resolution must carry a timestamp.

create table if not exists public.mark_disputes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- The persisted marking this claim belongs to, when the client had one.
  correction_id uuid references public.ai_correction(id) on delete set null,
  -- The marking's audit reference: the stable key back to the run.
  audit_ref text not null,
  question text not null,
  point text not null,
  verdict text not null default 'MISS',
  -- The student's argument, in their own words.
  reason text not null,
  -- One checklist entry is one mark in the marker's contract; kept as a column
  -- so a future two-mark entry can be awarded without a schema change.
  marks integer not null default 1,
  status text not null default 'pending',
  resolution_note text,
  resolved_by uuid references auth.users(id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),

  constraint mark_disputes_status_check check (status in ('pending', 'upheld', 'rejected')),
  constraint mark_disputes_verdict_check check (verdict in ('PASS', 'MISS')),
  constraint mark_disputes_marks_range check (marks between 1 and 5),
  constraint mark_disputes_reason_length check (char_length(btrim(reason)) between 10 and 1000),
  constraint mark_disputes_reason_no_replacement_character
    check (position(chr(65533) in reason) = 0),
  constraint mark_disputes_point_no_replacement_character
    check (position(chr(65533) in point) = 0),
  constraint mark_disputes_question_no_replacement_character
    check (position(chr(65533) in question) = 0),
  -- A resolved claim must say when; a pending one must not pretend to be resolved.
  constraint mark_disputes_resolution_shape check (
    (status = 'pending' and resolved_at is null)
    or (status <> 'pending' and resolved_at is not null and resolved_by is not null)
  )
);

-- One claim per mark point of one marking. md5 keeps the index row small: a
-- question and a scheme point are both long text, and a btree entry built from
-- them directly can exceed the 2704-byte limit.
create unique index if not exists mark_disputes_once_per_point
  on public.mark_disputes (user_id, audit_ref, md5(question), md5(point));

create index if not exists mark_disputes_pending_idx
  on public.mark_disputes (created_at desc) where status = 'pending';

alter table public.mark_disputes enable row level security;

-- Supabase's default privileges still hand a new table to anon; take it back.
revoke all on table public.mark_disputes from anon;
grant select, insert on table public.mark_disputes to authenticated;
-- Update is needed for the admin resolve path only; the policies below are what
-- actually limit it, and no student can reach it.
grant update on table public.mark_disputes to authenticated;
grant all on table public.mark_disputes to service_role;

drop policy if exists "Students can read own mark disputes" on public.mark_disputes;
create policy "Students can read own mark disputes"
  on public.mark_disputes for select
  using (user_id = auth.uid());

drop policy if exists "Students can open own mark disputes" on public.mark_disputes;
create policy "Students can open own mark disputes"
  on public.mark_disputes for insert
  with check (
    user_id = auth.uid()
    and status = 'pending'
    and resolved_at is null
    and resolved_by is null
    -- A student may only claim a point that was actually missed; there is
    -- nothing to award in a PASS, and claiming one would look like tampering.
    and verdict = 'MISS'
  );

drop policy if exists "Admins can read all mark disputes" on public.mark_disputes;
create policy "Admins can read all mark disputes"
  on public.mark_disputes for select
  using (public.is_admin(auth.uid()));

drop policy if exists "Admins can resolve mark disputes" on public.mark_disputes;
create policy "Admins can resolve mark disputes"
  on public.mark_disputes for update
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

comment on table public.mark_disputes is
  'Phase 3.2 self-override claims: a student asserts a missed mark-scheme point was actually earned. Awarded in the marker panel immediately; reviewed here. Never rewrites ai_correction.';
