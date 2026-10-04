-- Admin review of the recurring past-paper link-health job's findings.
--
-- The job (past-papers-harvest) already records two kinds of finding in
-- public.past_paper_link_checks, but until now nobody could act on them:
--   * slot = 'candidate'  — a newly published sitting found on a source site
--   * ok = false          — a link the archive uses that no longer resolves
--
-- This migration adds a review state and the RPCs an admin uses to triage:
--   * approve_candidate  — turn a candidate into a HIDDEN, untagged past_papers
--     draft row (source_url set, no topic/level) so the real file can be
--     attached and the row tagged later. Students never see untagged rows, so
--     approving never leaks an unwatermarked external link into the archive.
--   * dismiss_candidate  — retire a candidate without touching the archive.
--   * resolve_link       — mark a dead link handled (its file/link was fixed).
--
-- The job's upsert never writes review_status, so a dismissed candidate stays
-- dismissed on the next run instead of reappearing.

alter table public.past_paper_link_checks
  add column if not exists review_status text not null default 'pending',
  add column if not exists reviewed_at timestamptz,
  add column if not exists reviewed_by uuid,
  add column if not exists created_paper_id uuid references public.past_papers(id) on delete set null,
  -- Populated by the harvester for candidate rows so an approval can build a
  -- real title (e.g. "0625 — March 2025 (v2) QP") instead of a bare URL.
  add column if not exists source_code text,
  add column if not exists file_name text;

alter table public.past_paper_link_checks
  drop constraint if exists past_paper_link_checks_review_status_check;
alter table public.past_paper_link_checks
  add constraint past_paper_link_checks_review_status_check
  check (review_status in ('pending', 'approved', 'dismissed', 'resolved'));

-- The admin queue reads "pending candidates" and "dead links not yet resolved".
create index if not exists past_paper_link_checks_review_idx
  on public.past_paper_link_checks (review_status, slot, ok);

-- ── Approve a new-session candidate ─────────────────────────────────────────
create or replace function public.approve_paper_candidate(p_check_id uuid)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  _uid uuid := auth.uid();
  _c record;
  _title text;
  _paper_id uuid;
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if not public.has_role(_uid, 'admin') then raise exception 'Admin only'; end if;

  select * into _c from public.past_paper_link_checks where id = p_check_id for update;
  if _c.id is null then raise exception 'Candidate not found'; end if;
  if _c.slot <> 'candidate' then raise exception 'Not a candidate row'; end if;
  if _c.review_status <> 'pending' then raise exception 'Already reviewed'; end if;
  if _c.year is null then raise exception 'Candidate has no year to place it in the archive'; end if;

  _title := coalesce(
    nullif(
      concat_ws(
        ' — ',
        nullif(trim(coalesce(_c.source_code, '')), ''),
        nullif(trim(regexp_replace(coalesce(_c.file_name, ''), '\.pdf$', '', 'i')), '')
      ),
      ''
    ),
    'New sitting' || case when _c.session is not null then ' ' || _c.session else '' end
  );

  -- Untagged draft: hidden from students (the student list drops rows with no
  -- topic_id) and the file is still ours to attach.
  insert into public.past_papers (title, year, session, paper_number, topic_id, subject_slug, level, paper_url, mark_scheme_url, source_url)
  values (_title, _c.year, _c.session, null, null, null, null, null, null, _c.url)
  returning id into _paper_id;

  update public.past_paper_link_checks
    set review_status = 'approved', reviewed_at = now(), reviewed_by = _uid, created_paper_id = _paper_id
    where id = p_check_id;

  perform public.audit_admin_action(
    p_action := 'approve',
    p_entity := 'past_paper_candidate',
    p_entity_id := _paper_id,
    p_entity_label := left(_title, 200),
    p_details := jsonb_build_object(
      'check_id', p_check_id,
      'url', _c.url,
      'session', _c.session,
      'year', _c.year,
      'source_code', _c.source_code
    ),
    p_actor_id := _uid,
    p_actor_username := null
  );

  return jsonb_build_object('paper_id', _paper_id, 'title', _title);
end;
$$;

revoke all on function public.approve_paper_candidate(uuid) from public, anon;
grant execute on function public.approve_paper_candidate(uuid) to authenticated;

-- ── Dismiss a candidate ─────────────────────────────────────────────────────
create or replace function public.dismiss_paper_candidate(p_check_id uuid)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  _uid uuid := auth.uid();
  _c record;
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if not public.has_role(_uid, 'admin') then raise exception 'Admin only'; end if;

  select * into _c from public.past_paper_link_checks where id = p_check_id for update;
  if _c.id is null then raise exception 'Candidate not found'; end if;
  if _c.slot <> 'candidate' then raise exception 'Not a candidate row'; end if;
  if _c.review_status <> 'pending' then raise exception 'Already reviewed'; end if;

  update public.past_paper_link_checks
    set review_status = 'dismissed', reviewed_at = now(), reviewed_by = _uid
    where id = p_check_id;

  perform public.audit_admin_action(
    p_action := 'reject',
    p_entity := 'past_paper_candidate',
    p_entity_id := p_check_id,
    p_entity_label := coalesce(nullif(concat_ws(' — ', _c.source_code, _c.file_name), ''), _c.url),
    p_details := jsonb_build_object('check_id', p_check_id, 'url', _c.url, 'session', _c.session, 'year', _c.year),
    p_actor_id := _uid,
    p_actor_username := null
  );

  return jsonb_build_object('check_id', p_check_id, 'review_status', 'dismissed');
end;
$$;

revoke all on function public.dismiss_paper_candidate(uuid) from public, anon;
grant execute on function public.dismiss_paper_candidate(uuid) to authenticated;

-- ── Resolve a dead link ─────────────────────────────────────────────────────
create or replace function public.resolve_paper_link(p_check_id uuid)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  _uid uuid := auth.uid();
  _c record;
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if not public.has_role(_uid, 'admin') then raise exception 'Admin only'; end if;

  select * into _c from public.past_paper_link_checks where id = p_check_id for update;
  if _c.id is null then raise exception 'Link check not found'; end if;
  if _c.slot = 'candidate' then raise exception 'Use approve/dismiss for a candidate'; end if;
  if _c.review_status = 'resolved' then raise exception 'Already resolved'; end if;

  update public.past_paper_link_checks
    set review_status = 'resolved', reviewed_at = now(), reviewed_by = _uid
    where id = p_check_id;

  perform public.audit_admin_action(
    p_action := 'update',
    p_entity := 'past_paper_link',
    p_entity_id := _c.paper_id,
    p_entity_label := left(coalesce(_c.url, 'link'), 200),
    p_details := jsonb_build_object('check_id', p_check_id, 'slot', _c.slot, 'status', _c.status, 'error', _c.error),
    p_actor_id := _uid,
    p_actor_username := null
  );

  return jsonb_build_object('check_id', p_check_id, 'review_status', 'resolved');
end;
$$;

revoke all on function public.resolve_paper_link(uuid) from public, anon;
grant execute on function public.resolve_paper_link(uuid) to authenticated;
