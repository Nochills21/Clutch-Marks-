-- Email suppression list: give approved admins a console to review it and
-- clear addresses that were suppressed in error (a bounced mailbox that got
-- fixed, or a complaint that shouldn't block a paying parent), while keeping
-- the table itself out of reach for students, parents and anon.
--
-- The original lockdown revoked everything from `authenticated`, so the
-- existing SELECT policy was unreachable from the app. This restores only the
-- two privileges an admin console needs — read and remove — and leaves all
-- writes to the service-role webhook path.
--
-- Every removal is audit-logged so "who unsuppressed this bouncing address?"
-- has an answer: silent deletions on a deliverability list are how a domain
-- ends up in a reputation hole with no trail.

revoke all on public.email_suppressions from anon;
grant select, delete on public.email_suppressions to authenticated;

-- Read access for approved admins only (matches the audit-log policy).
drop policy if exists "admins_view_suppressions" on public.email_suppressions;
create policy "admins_view_suppressions"
  on public.email_suppressions for select
  to authenticated
  using (
    exists (
      select 1 from public.user_roles r
      where r.user_id = auth.uid()
        and r.role = 'admin'
        and r.is_approved = true
    )
  );

-- Removal is the only client-side mutation allowed.
drop policy if exists "admins_clear_suppressions" on public.email_suppressions;
create policy "admins_clear_suppressions"
  on public.email_suppressions for delete
  to authenticated
  using (
    exists (
      select 1 from public.user_roles r
      where r.user_id = auth.uid()
        and r.role = 'admin'
        and r.is_approved = true
    )
  );

-- Audit trail: matches every other admin-mutable table (see
-- 20260920200000_admin_audit_log.sql). entity_id stays null because this table
-- is keyed by email; the address lands in details.before.email.
drop trigger if exists audit_email_suppressions_changes on public.email_suppressions;
create trigger audit_email_suppressions_changes
  after insert or update or delete on public.email_suppressions
  for each row execute function public.write_admin_audit_log();
