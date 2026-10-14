-- Read-only: the gate, asserted per call site. The claims are set INSIDE each
-- exception block because a caught exception reverts settings made earlier in
-- the same transaction; setting them in the block the call is made from means
-- the call always sees them.
do $$
declare
  _no_jwt text;
  _as_student text;
  _as_anon text;
  _admin_ok text;
  _student uuid;
  _admin uuid;
begin
  -- (a) no JWT at all
  begin
    perform set_config('role', 'authenticated', true);
    perform set_config('request.jwt.claims', '{}', true);
    perform count(*) from public.content_integrity_findings();
    _no_jwt := 'LEAK';
  exception when others then _no_jwt := sqlerrm;
  end;

  -- (b) a signed-in student
  select r.user_id into _student
    from public.user_roles r where r.role = 'student' order by r.id limit 1;
  begin
    perform set_config('role', 'authenticated', true);
    perform set_config(
      'request.jwt.claims',
      json_build_object('sub', _student::text, 'role', 'authenticated')::text,
      true
    );
    perform count(*) from public.content_integrity_findings();
    _as_student := 'LEAK';
  exception when others then _as_student := sqlerrm;
  end;

  -- (c) anon (no execute grant)
  begin
    perform set_config('role', 'anon', true);
    perform set_config('request.jwt.claims', '{}', true);
    perform count(*) from public.content_integrity_findings();
    _as_anon := 'LEAK';
  exception when others then _as_anon := sqlerrm;
  end;

  -- (d) an approved admin reaches the body
  select r.user_id into _admin
    from public.user_roles r where r.role = 'admin' order by r.id limit 1;
  begin
    perform set_config('role', 'authenticated', true);
    perform set_config(
      'request.jwt.claims',
      json_build_object('sub', _admin::text, 'role', 'authenticated')::text,
      true
    );
    perform count(*) from public.content_integrity_findings();
    _admin_ok := 'ok';
  exception when others then _admin_ok := 'FAILED: ' || sqlerrm;
  end;

  perform set_config('role', 'postgres', true);
  raise exception 'GATE student=[%] admin=[%] nojwt=[%] anon=[%]',
    _as_student, _admin_ok, _no_jwt, _as_anon;
end $$;
