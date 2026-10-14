-- Read-only: what the panel will show, as a compact message (the Management API
-- truncates long raised messages, so this stays short on purpose).
do $$
declare
  _admin uuid;
  _total int;
  _cats text;
  _examples text;
begin
  select r.user_id into _admin
    from public.user_roles r where r.role = 'admin' order by r.id limit 1;

  perform set_config('role', 'authenticated', true);
  perform set_config(
    'request.jwt.claims',
    json_build_object('sub', _admin::text, 'role', 'authenticated')::text,
    true
  );

  select count(*) into _total from public.content_integrity_findings();

  select string_agg(c.category || '=' || c.n, ' ' order by c.category) into _cats
    from (
      select category, count(*) as n
        from public.content_integrity_findings()
       group by category
    ) c;

  select string_agg(left(x.category || ':' || x.table_name || ':' || x.detail, 70), ' | ')
    into _examples
    from (
      select category, table_name, detail
        from public.content_integrity_findings()
       order by category, table_name
       limit 3
    ) x;

  perform set_config('role', 'postgres', true);

  raise exception 'REPORT total=% cats=[%] ex=[%]', _total, _cats, _examples;
end $$;
