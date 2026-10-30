-- Security hardening, round 2 (2026-10-30 audit).
--
-- Round 1 (20261029200000/20261029210000) closed four anon-executable holes and
-- the parent-wide `profiles` read. This round closes the ones that audit could
-- not see, all of them found by reading the live catalog rather than the
-- migrations folder:
--
--   1. Every public table granted anon (and authenticated) INSERT, UPDATE,
--      DELETE **and TRUNCATE**. RLS does not filter TRUNCATE at all, so the
--      publishable key was one SQL-injection away from wiping the database.
--   2. `restore_content_revision` gated on a raw `user_roles` admin row, so an
--      AAL1 (password-only) admin could rewrite any lesson or note body.
--   3. Three "update own row" policies let a student rewrite their own grade:
--      `quiz_attempts.score`, `practice_attempts.last_correct` and
--      `homework_submissions.grade/feedback`. No client code uses them.
--   4. The `past-papers` bucket was readable by any authenticated user, which
--      contradicts the "board papers are linked, never served" rule.
--   5. A parent could insert a link to ANY `student_id`. Linking is now one
--      RPC that must name the student's exact email, like the dashboard's form.

-- ---------------------------------------------------------------------------
-- 1. Table privileges. Anon holds no writes anywhere: every write policy in
--    the schema tests `auth.uid()` (or a role, which anon lacks), so no anon
--    write can succeed through RLS either way — this closes the path that
--    bypasses RLS entirely (TRUNCATE) and removes the standing grant that a
--    future policy mistake would turn into a full write.
-- ---------------------------------------------------------------------------
revoke insert, update, delete, truncate, references, trigger on all tables in schema public from anon;
revoke truncate, references, trigger on all tables in schema public from authenticated;

-- Future tables must not inherit the same grants. Postgres grants nothing to
-- these roles by default; Supabase's default privileges did, so override them.
alter default privileges in schema public revoke insert, update, delete, truncate, references, trigger on tables from anon;
alter default privileges in schema public revoke truncate, references, trigger on tables from authenticated;

-- ---------------------------------------------------------------------------
-- 2. `restore_content_revision` must ask `is_admin`, which is role AND AAL2.
--    Body is otherwise identical to the live definition.
-- ---------------------------------------------------------------------------
create or replace function public.restore_content_revision(p_revision_id uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  r public.content_revisions%rowtype;
begin
  -- `is_admin` = holds the admin role AND the request is AAL2. A bare
  -- `user_roles` check here let a password-only admin rewrite content, which is
  -- exactly the class of bug the 2FA rewrite exists to prevent.
  if not public.is_admin(auth.uid()) then
    raise exception 'restore_content_revision: only admins signed in with a second factor can restore revisions';
  end if;

  select * into r from public.content_revisions c where c.id = p_revision_id;
  if not found then
    raise exception 'restore_content_revision: revision % not found', p_revision_id;
  end if;

  if r.entity_type = 'lesson' then
    update public.lessons set
      title = r.title,
      content = r.content,
      video_url = r.extra->>'video_url',
      sort_order = coalesce((r.extra->>'sort_order')::integer, sort_order),
      updated_at = now()
    where id = r.entity_id;
  elsif r.entity_type = 'material' then
    update public.study_materials set
      title = r.title,
      content = r.content,
      material_type = coalesce(r.extra->>'material_type', material_type),
      file_url = coalesce(r.extra->>'file_url', file_url),
      updated_at = now()
    where id = r.entity_id;
  else
    raise exception 'restore_content_revision: unsupported entity_type %', r.entity_type;
  end if;
end;
$function$;

revoke all on function public.restore_content_revision(uuid) from public, anon;
grant execute on function public.restore_content_revision(uuid) to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- 3. Self-tampering. A student may write their own rows, but these three
--    policies let them rewrite the outcome after the server graded it. No
--    client path updates any of them (grading happens in `grade_quiz`, and the
--    admin grade book keeps its own policy), so the policies are dropped.
-- ---------------------------------------------------------------------------
drop policy if exists "Users can update own attempts" on public.quiz_attempts;
drop policy if exists "Users can update own practice_attempts" on public.practice_attempts;
drop policy if exists "Users can update own submissions" on public.homework_submissions;

-- The admin grade book does upload corrections to an attempt from the client
-- and had no policy to do it with; give it the least-privilege one it needs.
drop policy if exists "Admins can update attempts" on public.quiz_attempts;
create policy "Admins can update attempts" on public.quiz_attempts
  for update using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- ---------------------------------------------------------------------------
-- 4. Board papers are linked, never served. `serve-material` already refuses
--    the bucket to non-admins; the bucket policy let a student fetch the object
--    directly and bypass that. Admin policies remain.
-- ---------------------------------------------------------------------------
drop policy if exists "Authenticated users can read past paper files" on storage.objects;

-- ---------------------------------------------------------------------------
-- 5. Parent linking. The old INSERT policy checked only that the caller is a
--    parent and that `parent_id` is themselves — `student_id` was unconstrained,
--    so any parent account could link to any student whose id they had. Linking
--    now has to name the student's exact email, which is what the dashboard
--    asked for anyway, and happens in one definer function.
-- ---------------------------------------------------------------------------
drop policy if exists "Parents can create own links" on public.parent_student_links;

create or replace function public.link_student_by_email(p_email text)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  _uid uuid := auth.uid();
  _student uuid;
  _own_email text;
begin
  if _uid is null then
    raise exception 'Not authenticated';
  end if;
  if not public.has_role(_uid, 'parent') then
    raise exception 'Parent only';
  end if;
  if coalesce(btrim(p_email), '') = '' then
    raise exception 'An email is required';
  end if;

  select lower(coalesce(email, '')) into _own_email from public.profiles where user_id = _uid;
  if lower(btrim(p_email)) = _own_email then
    raise exception 'That is your own email';
  end if;

  -- Equality on lower(), never ILIKE: an email local part may contain `_`,
  -- which SQL LIKE reads as "any single character". Exact match also means the
  -- caller learns nothing unless they already know the whole address.
  select p.user_id into _student
  from public.profiles p
  where lower(p.email) = lower(btrim(p_email))
    and exists (
      select 1 from public.user_roles r
      where r.user_id = p.user_id and r.role = 'student'
    )
  limit 1;

  if _student is null then
    return null;
  end if;

  if exists (
    select 1 from public.parent_student_links l
    where l.parent_id = _uid and l.student_id = _student
  ) then
    return _student;
  end if;

  insert into public.parent_student_links (parent_id, student_id)
  values (_uid, _student);

  return _student;
end;
$function$;

-- A new function gets EXECUTE to PUBLIC by default; revoke it, not just anon.
revoke all on function public.link_student_by_email(text) from public, anon;
grant execute on function public.link_student_by_email(text) to authenticated, service_role;
