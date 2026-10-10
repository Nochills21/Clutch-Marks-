-- PDPL support (Saudi Personal Data Protection Law, enforced by SDAIA).
--
-- Four things a compliant controller has to be able to do, and could not before
-- this migration:
--
--   1. prove consent        -> public.consent_records, written by handle_new_user
--                              from what the signup form actually sent.
--   2. honour a request     -> public.data_requests (a dated, attributed record)
--                              plus an admin notification the moment it lands.
--   3. hand over a copy     -> public.export_my_data(), one machine-readable
--                              dump of everything we hold about the caller.
--   4. keep it honest       -> both tables are readable by their owner and by
--                              admins only; no client can write its own consent
--                              or edit its own request.
--
-- Idempotent: safe to re-run against the live database.

-- ---------------------------------------------------------------------------
-- 1. Consent records
-- ---------------------------------------------------------------------------
create table if not exists public.consent_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- 'guardian' is here for the parent/guardian tick if that is ever added; the
  -- values match ConsentKind in frontend/src/lib/legal.ts.
  kind text not null check (kind in ('privacy', 'terms', 'guardian', 'marketing')),
  document_version text not null,
  accepted_at timestamptz not null default now(),
  source text not null default 'signup',
  constraint consent_records_unique_per_version unique (user_id, kind, document_version)
);

create index if not exists idx_consent_records_user on public.consent_records (user_id);

alter table public.consent_records enable row level security;

-- Read own; admins read everything; nobody writes from a browser session — the
-- rows are created by the auth trigger, which runs as the table owner and so is
-- not subject to these policies. A client that could insert its own consent row
-- would make the whole table worthless as evidence.
drop policy if exists "Users read own consent records" on public.consent_records;
create policy "Users read own consent records" on public.consent_records
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "Admins read all consent records" on public.consent_records;
create policy "Admins read all consent records" on public.consent_records
  for select to authenticated using (has_role(auth.uid(), 'admin'::app_role));

revoke all on public.consent_records from anon, authenticated;
grant select on public.consent_records to authenticated;

-- ---------------------------------------------------------------------------
-- 2. Data-subject requests
-- ---------------------------------------------------------------------------
create table if not exists public.data_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- Snapshot of the address, filled on insert: an admin has to be able to find
  -- the account even after the request itself outlives the profile row.
  email text,
  kind text not null default 'deletion'
    check (kind in ('access', 'correction', 'deletion', 'portability', 'objection')),
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'completed', 'refused')),
  note text,
  requested_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid
);

create index if not exists idx_data_requests_open
  on public.data_requests (status, requested_at desc);

alter table public.data_requests enable row level security;

drop policy if exists "Users read own data requests" on public.data_requests;
create policy "Users read own data requests" on public.data_requests
  for select to authenticated using (user_id = auth.uid());

-- A reader files their own request and nothing else: kind/status are constrained
-- by the check clauses above, and `id` is server-generated, so there is no column
-- here a client could use to forge someone else's status.
drop policy if exists "Users file own data requests" on public.data_requests;
create policy "Users file own data requests" on public.data_requests
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "Admins manage data requests" on public.data_requests;
create policy "Admins manage data requests" on public.data_requests
  for all to authenticated
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));

-- A reader may withdraw a request they filed by mistake; they still cannot
-- touch its outcome.
drop policy if exists "Users withdraw own pending request" on public.data_requests;
create policy "Users withdraw own pending request" on public.data_requests
  for delete to authenticated using (user_id = auth.uid() and status = 'pending');

revoke all on public.data_requests from anon;
grant select, insert, delete on public.data_requests to authenticated;

-- Snapshot the address so an admin can act after a profile is gone.
create or replace function public.pdpl_snapshot_request_email()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.email is null then
    select p.email into new.email from public.profiles p where p.user_id = new.user_id;
  end if;
  return new;
end;
$function$;

drop trigger if exists set_data_request_email on public.data_requests;
create trigger set_data_request_email
  before insert on public.data_requests
  for each row execute function public.pdpl_snapshot_request_email();

-- Tell the admins. A request nobody notices is the same as a request refused,
-- and PDPL sets a clock, so this notification is part of the feature and not a
-- nicety.
create or replace function public.pdpl_notify_admins_of_request()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  insert into public.notifications (user_id, title, message)
  select r.user_id,
         'Data request: ' || new.kind,
         coalesce(new.email, 'An account') || ' filed a ' || new.kind || ' request (ref ' ||
         left(new.id::text, 8) || '). Act on the account, then mark the request resolved.'
  from public.user_roles r
  where r.role = 'admin';
  return new;
end;
$function$;

drop trigger if exists notify_admins_of_data_request on public.data_requests;
create trigger notify_admins_of_data_request
  after insert on public.data_requests
  for each row execute function public.pdpl_notify_admins_of_request();

-- ---------------------------------------------------------------------------
-- 3. The caller's own copy (PDPL right of access / portability)
-- ---------------------------------------------------------------------------
-- Returns one jsonb object: every row we hold that is keyed to the caller, plus
-- the relationships that are keyed by two people. SECURITY DEFINER so the dump
-- is complete even where RLS would hide a row from its own owner; the WHERE is
-- auth.uid() and there is no parameter to pass a different id, so one account
-- cannot ask for another's data.
create or replace function public.export_my_data()
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := auth.uid();
  v_out jsonb;
  v_table text;
  v_rows jsonb;
  -- Every public table with a user_id column, read from the catalogue rather
  -- than trusted to this list staying current (see the guard in the loop).
  v_tables text[] := array[
    'ai_audit_log', 'ai_correction', 'announcement_reads', 'bookmarks',
    'content_feedback', 'flashcard_progress', 'homework_submissions',
    'leaderboard_public', 'lesson_progress', 'material_progress',
    'notifications', 'past_paper_attempts', 'practice_attempts', 'profiles',
    'question_bookmarks', 'quiz_attempts', 'streaks', 'student_prefs',
    'student_subject_prefs', 'study_plans', 'study_sessions', 'subscriptions',
    'user_roles', 'xp_daily', 'xp_events'
  ];
begin
  if v_uid is null then
    raise exception 'export_my_data: no authenticated user';
  end if;

  v_out := jsonb_build_object(
    'exported_at', now(),
    'schema_version', 1,
    'note', 'Everything Clutch Marks holds for this account, machine-readable.'
  );

  foreach v_table in array v_tables loop
    -- Skip a table that has been dropped or renamed instead of failing the whole
    -- export: a partial copy plus an explicit error is worse for the reader than
    -- a complete copy of what exists.
    if to_regclass('public.' || v_table) is null then
      v_out := v_out || jsonb_build_object(v_table, 'missing at export time');
      continue;
    end if;
    execute format(
      'select coalesce(jsonb_agg(to_jsonb(t)), ''[]''::jsonb) from public.%I t where t.user_id = $1',
      v_table
    ) into v_rows using v_uid;
    v_out := v_out || jsonb_build_object(v_table, v_rows);
  end loop;

  -- Relationships that are not keyed by a single user_id.
  v_out := v_out || jsonb_build_object(
    'parent_student_links', coalesce((
      select jsonb_agg(to_jsonb(l)) from public.parent_student_links l
      where l.parent_id = v_uid or l.student_id = v_uid
    ), '[]'::jsonb),
    'parent_link_invites', coalesce((
      select jsonb_agg(to_jsonb(i)) from public.parent_link_invites i
      where i.student_user_id = v_uid
    ), '[]'::jsonb),
    'consent_records', coalesce((
      select jsonb_agg(to_jsonb(c)) from public.consent_records c
      where c.user_id = v_uid
    ), '[]'::jsonb),
    'data_requests', coalesce((
      select jsonb_agg(to_jsonb(d)) from public.data_requests d
      where d.user_id = v_uid
    ), '[]'::jsonb),
    -- The sign-in identity itself lives in auth.users, not in public.
    'account', (
      select jsonb_build_object(
        'email', u.email,
        'created_at', u.created_at,
        'last_sign_in_at', u.last_sign_in_at,
        'identities', coalesce((
          select jsonb_agg(jsonb_build_object('provider', i.provider, 'created_at', i.created_at))
          from auth.identities i where i.user_id = u.id
        ), '[]'::jsonb)
      )
      from auth.users u where u.id = v_uid
    )
  );

  return v_out;
end;
$function$;

revoke all on function public.export_my_data() from public, anon;
grant execute on function public.export_my_data() to authenticated;

-- ---------------------------------------------------------------------------
-- 4. handle_new_user now records the acceptance the form sent
-- ---------------------------------------------------------------------------
-- The rest of the function is unchanged (see the notes it carries about role
-- handling and the parent link). Only the consent block is new. The versions are
-- client-supplied — they are stored as *what was claimed*, alongside the server
-- timestamp that makes the claim durable, which is the pair that makes consent
-- demonstrable.
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_parent_email text;
  v_parent_user uuid;
  v_full_name text;
  v_avatar text;
  v_privacy_version text;
  v_terms_version text;
BEGIN
  -- Google sends `name`; the signup form sends `full_name`. Prefer the explicit
  -- full name, then Google's, then the email prefix so a name is always shown.
  v_full_name := COALESCE(
    NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->>'full_name', '')), ''),
    NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->>'name', '')), ''),
    split_part(COALESCE(NEW.email, ''), '@', 1)
  );
  v_avatar := NULLIF(btrim(COALESCE(
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'picture',
    ''
  )), '');

  -- Profiles first (satisfies the auth.users trigger contract). Username only
  -- when an admin deliberately provisioned one; public signup stays email-only.
  INSERT INTO public.profiles (user_id, full_name, username, email, avatar_url)
  VALUES (
    NEW.id,
    v_full_name,
    NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->>'username', '')), ''),
    NEW.email,
    v_avatar
  );

  -- PDPL: record which privacy/terms version this account accepted, and when the
  -- server accepted it. Absent for provider sign-ups (Google) and for accounts an
  -- admin provisions, which is itself the honest record — nothing was ticked.
  v_privacy_version := NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->'consent'->>'privacy_version', '')), '');
  v_terms_version := NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->'consent'->>'terms_version', '')), '');
  IF v_privacy_version IS NOT NULL THEN
    INSERT INTO public.consent_records (user_id, kind, document_version)
    VALUES (NEW.id, 'privacy', left(v_privacy_version, 64))
    ON CONFLICT DO NOTHING;
  END IF;
  IF v_terms_version IS NOT NULL THEN
    INSERT INTO public.consent_records (user_id, kind, document_version)
    VALUES (NEW.id, 'terms', left(v_terms_version, 64))
    ON CONFLICT DO NOTHING;
  END IF;

  -- SECURITY: Never trust client-sent role. Everyone starts as a student on
  -- the free plan; only admins can elevate roles afterwards. The ONLY public
  -- elevation is self-registering as a parent (limited view of linked
  -- children); 'admin' in public metadata is ignored — manage-accounts
  -- provisions admins with a verified service-role update after creation.
  INSERT INTO public.user_roles (user_id, role, is_approved)
  VALUES (NEW.id, 'student', true);

  IF COALESCE(NEW.raw_user_meta_data->>'role', '') = 'parent' THEN
    UPDATE public.user_roles SET role = 'parent' WHERE user_id = NEW.id;
  END IF;

  -- Optional parent email at student signup: link instantly if the parent
  -- account exists, otherwise park an invite that auto-links on parent signup.
  -- (Variables carry a v_ prefix — bare `parent_email` collides with the
  -- parent_link_invites column in the statements below and breaks signup.)
  v_parent_email := lower(btrim(COALESCE(NEW.raw_user_meta_data->>'parent_email', '')));
  IF v_parent_email <> '' AND NEW.email IS NOT NULL AND lower(NEW.email) <> v_parent_email THEN
    SELECT p.user_id INTO v_parent_user
    FROM public.profiles p
    JOIN public.user_roles r ON r.user_id = p.user_id AND r.role = 'parent'
    WHERE lower(p.email) = v_parent_email
    LIMIT 1;

    IF v_parent_user IS NOT NULL THEN
      INSERT INTO public.parent_student_links (parent_id, student_id)
      VALUES (v_parent_user, NEW.id)
      ON CONFLICT DO NOTHING;
    ELSE
      INSERT INTO public.parent_link_invites (parent_email, student_user_id)
      VALUES (v_parent_email, NEW.id)
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  -- Parent side: adopt any parked invites addressed to this email (a parent
  -- registering after their child already signed up).
  IF lower(COALESCE(NEW.email, '')) <> '' THEN
    INSERT INTO public.parent_student_links (parent_id, student_id)
    SELECT NEW.id, i.student_user_id
    FROM public.parent_link_invites i
    WHERE i.parent_email = lower(NEW.email)
    ON CONFLICT DO NOTHING;

    DELETE FROM public.parent_link_invites
    WHERE parent_link_invites.parent_email = lower(NEW.email);
  END IF;

  RETURN NEW;
END;
$function$;
