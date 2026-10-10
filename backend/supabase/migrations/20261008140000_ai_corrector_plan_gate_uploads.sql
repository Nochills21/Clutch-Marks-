-- AI paper auto-correction, take two: a plan-gated marked-script service.
--
-- Three things the first cut got wrong, all fixed here:
--
--   1. Nothing checked the plan. The `ai-correction` worker only asked whether
--      the account was approved, so AI marking was live for every free
--      account. Plan state lives in `subscriptions`, whose RLS is scoped to
--      the row owner — the worker runs with service_role *on behalf of* the
--      caller, so it cannot read the caller's subscription through the
--      caller's token. `has_active_plan()` is the one place that answers it.
--
--   2. `ai_audit_log_action_check` allowed only ('plan','correction'), but the
--      worker has always written 'paper_correction'. Every audit insert was
--      rejected, so the correction trail was empty and the silent failure was
--      logged as "audit log failed" and ignored. (Same class of bug as the
--      'external_link' action, fixed in 20261003130000.)
--
--   3. A corrected paper could only be pasted text. Students now upload photos
--      or PDFs of their handwritten script, so the row records which objects
--      were marked and where they came from.

-- ───────── 1. the plan predicate ─────────
-- SECURITY DEFINER because the caller (service_role on behalf of a student)
-- must read `subscriptions`/`user_roles` without inheriting the student's RLS.
-- EXECUTE is granted to service_role only: taking an arbitrary user id as an
-- argument means an authenticated grant would let anyone probe anyone else's
-- plan state. RLS policies inline the same predicate instead of calling this.
create or replace function public.has_active_plan(_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select
    -- Admins own the content and must be able to exercise the marker they ship.
    exists (
      select 1 from public.user_roles
       where user_id = _user_id
         and role = 'admin'
         and is_approved = true
    )
    or exists (
      select 1 from public.subscriptions
       where user_id = _user_id
         and status = 'active'
         and (ends_at is null or ends_at > now())
    );
$function$;

revoke all on function public.has_active_plan(uuid) from public, anon, authenticated;
grant execute on function public.has_active_plan(uuid) to service_role;

-- ───────── 2. let the worker write its audit rows ─────────
alter table public.ai_audit_log drop constraint if exists "ai_audit_log_action_check";
alter table public.ai_audit_log add constraint "ai_audit_log_action_check"
  check (action = any (array['plan'::text, 'correction'::text, 'paper_correction'::text]));

-- ───────── 3. record where a corrected paper came from ─────────
alter table public.ai_correction add column if not exists source text not null default 'paste';
alter table public.ai_correction add column if not exists answer_files jsonb;
alter table public.ai_correction add column if not exists paper_ref jsonb;

alter table public.ai_correction drop constraint if exists "ai_correction_source_check";
alter table public.ai_correction add constraint "ai_correction_source_check"
  check (source = any (array['paste'::text, 'upload'::text, 'mixed'::text]));

-- Defense in depth: even a direct PostgREST insert (bypassing the worker) is a
-- paid feature. The worker itself writes as service_role and is unaffected.
drop policy if exists "Students can insert own AI corrections" on public.ai_correction;
create policy "Students can insert own AI corrections" on public.ai_correction
  for insert to authenticated
  with check (
    user_id = auth.uid()
    and (
      exists (
        select 1 from public.user_roles
         where user_id = auth.uid() and role = 'admin' and is_approved = true
      )
      or exists (
        select 1 from public.subscriptions
         where user_id = auth.uid()
           and status = 'active'
           and (ends_at is null or ends_at > now())
      )
    )
  );

-- ───────── 4. students may remove their own uploaded scripts ─────────
-- Answer scripts are personal data and can be large; without a DELETE policy a
-- student had no way to withdraw an upload (PDPL erasure requests would always
-- need an admin). Scoped to their own folder, exactly like the insert policy.
drop policy if exists "Users can delete own homework files" on "storage"."objects";
create policy "Users can delete own homework files" on "storage"."objects"
  for delete to authenticated
  using (
    (bucket_id = 'homework-uploads'::text)
    and ((auth.uid())::text = (storage.foldername(name))[1])
  );
