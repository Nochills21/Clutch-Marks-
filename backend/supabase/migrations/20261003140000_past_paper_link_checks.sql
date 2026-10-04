-- Storage surface for the recurring past-paper link check.
--
-- The archive's links rot in two directions: a bucket object can disappear
-- (re-uploaded, renamed, or deleted out of band) and an external URL can start
-- 404ing. Until now the only way to notice was for a student to click and get an
-- error. The past-papers-harvest job re-checks every link on a schedule and
-- records one row per (url, slot) here, so dead links are a single query:
--
--   select * from public.past_paper_link_checks where not ok order by checked_at desc;
--
-- Two kinds of row live in this table:
--   * slot in ('paper','mark_scheme') — a check of a link an archive row uses.
--     paper_id is set. This is the dead-link signal.
--   * slot = 'candidate'              — a PDF the harvest found on a source site
--     that no archive row references yet. paper_id is null. This is how a newly
--     published exam session shows up before an admin adds the row. Candidates
--     are never written into past_papers automatically: a public URL in
--     paper_url bypasses the watermark/entitlement gate, so sourcing is a
--     deliberate ingest, not a side effect of the crawler.
--
-- One row per (url, slot): each run upserts the latest result rather than
-- appending, so the table stays small and reads as a health view rather than a
-- growing log. History belongs in the audit trail, not here.

create table if not exists public.past_paper_link_checks (
  id uuid primary key default gen_random_uuid(),
  paper_id uuid references public.past_papers(id) on delete cascade,
  slot text not null,
  url text not null,
  host text,
  -- Parsed from the source filename (PMT ships "June 2024 (v2) QP.pdf"), so a
  -- candidate row says which sitting it belongs to without re-parsing the URL.
  session text,
  year integer,
  status integer,
  content_type text,
  ok boolean not null default false,
  error text,
  source text not null default 'verify',
  checked_at timestamp with time zone not null default now(),
  constraint past_paper_link_checks_slot_check
    check (slot in ('paper','mark_scheme','candidate')),
  constraint past_paper_link_checks_source_check
    check (source in ('verify','pmt-harvest'))
);

-- One live row per (url, slot); the job upserts on this key.
create unique index if not exists past_paper_link_checks_url_slot_key
  on public.past_paper_link_checks (slot, url);

-- The health view is "show me what's broken"; keep that scan cheap.
create index if not exists past_paper_link_checks_ok_idx
  on public.past_paper_link_checks (ok);

-- ── Audit action ────────────────────────────────────────────────────────────
-- One summary row per run (counts + the dead links), so the check shows up in
-- the existing admin audit viewer next to the other system activity. The
-- per-link detail stays in the checks table above.
alter table public.admin_audit_log
  drop constraint admin_audit_log_action_check;

alter table public.admin_audit_log
  add constraint admin_audit_log_action_check
  check (action in (
    'create','update','delete','approve','reject','role_change','login','download',
    'quiz_attempt','homework_submission','external_link_opened','past_paper_link_check'
  ));

create or replace function public.audit_admin_action(
  p_action text,
  p_entity text,
  p_entity_id uuid default null,
  p_entity_label text default null,
  p_details jsonb default null,
  p_actor_id uuid default null,
  p_actor_username text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor uuid;
  v_username text;
begin
  if p_action not in (
    'create','update','delete','approve','reject','role_change','login','download',
    'quiz_attempt','homework_submission','external_link_opened','past_paper_link_check'
  ) then
    raise exception 'audit_admin_action: invalid action %', p_action;
  end if;
  if p_entity is null or length(p_entity) > 64 then
    raise exception 'audit_admin_action: invalid entity';
  end if;

  select p.user_id, p.username into v_actor, v_username
  from public.profiles p where p.user_id = auth.uid();

  -- Service-role callers (edge functions) run without a user JWT; they must pass
  -- the acting user explicitly. Direct-JWT callers resolve via auth.uid().
  if v_actor is null then
    v_actor := p_actor_id;
    v_username := p_actor_username;
  end if;

  insert into public.admin_audit_log (actor_id, actor_username, action, entity, entity_id, entity_label, details)
  values (v_actor, v_username, p_action, p_entity, p_entity_id, p_entity_label, p_details);
end;
$$;

revoke all on function public.audit_admin_action(text, text, uuid, text, jsonb, uuid, text) from public, anon, authenticated;
grant execute on function public.audit_admin_action(text, text, uuid, text, jsonb, uuid, text) to service_role;

-- ── Access ──────────────────────────────────────────────────────────────────
-- Read-only to approved admins; written only by the service-role job.
alter table public.past_paper_link_checks enable row level security;

drop policy if exists "past paper link checks read - approved admins only" on public.past_paper_link_checks;
create policy "past paper link checks read - approved admins only"
  on public.past_paper_link_checks for select
  using (
    exists (
      select 1 from public.user_roles r
      where r.user_id = auth.uid()
        and r.role = 'admin'
        and r.is_approved = true
    )
  );

revoke all on public.past_paper_link_checks from anon, authenticated;
grant select on public.past_paper_link_checks to authenticated;
