-- Proves the phase 3.2 dispute table's access rules against the live catalog,
-- then rolls everything back by raising. The raised line is the report.
--
-- What must hold:
--   * a student sees only their own claims, and can open one for themselves;
--   * a student cannot write a claim onto another account (the spoof case);
--   * a student cannot resolve their own claim (no UPDATE policy: 0 rows);
--   * the same point cannot be claimed twice on one marking;
--   * a reason under 10 characters and a U+FFFD are refused at the table;
--   * an AAL2 admin sees every claim and can resolve them.
DO $$
DECLARE
  _a uuid; _b uuid; _admin uuid;
  _own int; _others int; _upd int; _admin_vis int; _admin_upd int;
  _spoof text := 'not-run'; _dup text := 'not-run';
  _short text := 'not-run'; _fffd text := 'not-run';
BEGIN
  select user_id into _a from public.profiles where user_id is not null order by created_at limit 1;
  select user_id into _b from public.profiles
    where user_id is not null and user_id <> _a order by created_at limit 1;
  select r.user_id into _admin from public.user_roles r where r.role = 'admin' limit 1;
  if _a is null or _b is null then
    raise exception 'PROBE skipped: needs two existing profiles';
  end if;

  -- Written as the owner of the table (bypasses RLS) so the read checks have rows.
  insert into public.mark_disputes (user_id, audit_ref, question, point, verdict, reason, marks)
  values (_a, 'probe-a', 'Probe question', 'M1 for the probe', 'MISS',
          'My working shows the same substitution throughout.', 1);
  insert into public.mark_disputes (user_id, audit_ref, question, point, verdict, reason, marks)
  values (_b, 'probe-b', 'Probe question B', 'A1 for the probe B', 'MISS',
          'My answer states that value explicitly on the line.', 1);

  -- As student A.
  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', _a, 'role', 'authenticated')::text, true);
  select count(*) into _own from public.mark_disputes where user_id = _a;
  select count(*) into _others from public.mark_disputes where user_id = _b;

  update public.mark_disputes set status = 'upheld', resolved_at = now(), resolved_by = _a
  where user_id = _a;
  get diagnostics _upd = row_count;

  -- A spoofed insert must be refused by the WITH CHECK clause.
  begin
    perform set_config('role', 'authenticated', true);
    perform set_config('request.jwt.claims',
      json_build_object('sub', _a, 'role', 'authenticated')::text, true);
    insert into public.mark_disputes (user_id, audit_ref, question, point, verdict, reason, marks)
    values (_b, 'probe-spoof', 'Spoofed', 'Spoofed point', 'MISS',
            'Trying to write onto another account.', 1);
    _spoof := 'ALLOWED';
  exception when others then _spoof := 'blocked';
  end;

  -- The same point on the same marking cannot be claimed twice.
  begin
    perform set_config('role', 'authenticated', true);
    perform set_config('request.jwt.claims',
      json_build_object('sub', _a, 'role', 'authenticated')::text, true);
    insert into public.mark_disputes (user_id, audit_ref, question, point, verdict, reason, marks)
    values (_a, 'probe-a', 'Probe question', 'M1 for the probe', 'MISS',
            'Same point claimed twice in a row.', 1);
    _dup := 'ALLOWED';
  exception when unique_violation then _dup := 'blocked';
  end;

  begin
    perform set_config('role', 'authenticated', true);
    perform set_config('request.jwt.claims',
      json_build_object('sub', _a, 'role', 'authenticated')::text, true);
    insert into public.mark_disputes (user_id, audit_ref, question, point, verdict, reason, marks)
    values (_a, 'probe-short', 'Q', 'P', 'MISS', 'too short', 1);
    _short := 'ALLOWED';
  exception when check_violation then _short := 'blocked';
  end;

  begin
    perform set_config('role', 'authenticated', true);
    perform set_config('request.jwt.claims',
      json_build_object('sub', _a, 'role', 'authenticated')::text, true);
    insert into public.mark_disputes (user_id, audit_ref, question, point, verdict, reason, marks)
    values (_a, 'probe-fffd', 'Q', 'P', 'MISS',
            'Damaged text ' || chr(65533) || ' right here', 1);
    _fffd := 'ALLOWED';
  exception when check_violation then _fffd := 'blocked';
  end;

  -- As an admin at AAL2 (is_admin requires both the role and the aal claim).
  if _admin is not null then
    perform set_config('role', 'authenticated', true);
    perform set_config('request.jwt.claims',
      json_build_object('sub', _admin, 'role', 'authenticated', 'aal', 'aal2')::text, true);
    select count(*) into _admin_vis from public.mark_disputes;
    update public.mark_disputes set status = 'upheld', resolved_at = now(), resolved_by = _admin
    where user_id in (_a, _b);
    get diagnostics _admin_upd = row_count;
  else
    _admin_vis := -1; _admin_upd := -1;
  end if;

  raise exception 'PROBE rolled back: own=% others=% self_upd=% admin_vis=% admin_upd=% spoof=% dup=% short=% fffd=%',
    _own, _others, _upd, _admin_vis, _admin_upd, _spoof, _dup, _short, _fffd;
END $$;
