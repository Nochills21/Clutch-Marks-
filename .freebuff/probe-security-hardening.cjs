// Regression probe for the 2026-10-29 security hardening.
// Read-only against the live DB; exits 1 on any regression.
//
//   node .freebuff/probe-security-hardening.cjs
//
// Each check is a fact about the catalog, not a copy of the migration: if a
// later migration re-grants PUBLIC EXECUTE (Postgres does that for every new
// function, which is how this class of bug keeps coming back), this fails.
const https = require("https");
const fs = require("fs");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(d));
          } catch {
            reject(new Error(d.slice(0, 300)));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

const checks = [];
function check(name, pass, detail) {
  checks.push({ name, pass, detail });
}

(async () => {
  // 1. Neither maintenance function is reachable by a browser session.
  const rpcs = await query(`
    select p.proname,
           has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can,
           has_function_privilege('authenticated', p.oid, 'EXECUTE') as auth_can,
           has_function_privilege('service_role', p.oid, 'EXECUTE') as service_can
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname in ('notify_admins_of_sensitive_event', 'archive_old_audit_entries')`);

  for (const row of rpcs) {
    check(`${row.proname}: anon cannot execute`, row.anon_can === false, `anon_can=${row.anon_can}`);
    check(
      `${row.proname}: authenticated cannot execute`,
      row.auth_can === false,
      `auth_can=${row.auth_can}`,
    );
    check(
      `${row.proname}: service_role still can`,
      row.service_can === true,
      `service_can=${row.service_can}`,
    );
  }
  check(
    "both maintenance functions are present",
    rpcs.length === 2,
    `found ${rpcs.length}`,
  );

  // 2. content_integrity_findings asks for AAL2, not bare role membership.
  const cif = await query(`
    select position('is_admin(_uid)' in prosrc) > 0 as uses_is_admin,
           position('has_role(_uid' in prosrc) > 0 as still_has_role
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'content_integrity_findings'`);
  check(
    "content_integrity_findings requires AAL2",
    cif.length === 1 && cif[0].uses_is_admin === true,
    JSON.stringify(cif[0] || null),
  );
  check(
    "content_integrity_findings no longer tests bare has_role",
    cif.length === 1 && cif[0].still_has_role === false,
    JSON.stringify(cif[0] || null),
  );

  // 3. No parent-wide profile read: every SELECT on profiles must be scoped.
  const profilePolicies = await query(`
    select policyname, qual
    from pg_policies
    where schemaname = 'public' and tablename = 'profiles' and cmd = 'SELECT'`);
  const wideOpen = profilePolicies.filter((p) => {
    const q = (p.qual || "").replace(/\s+/g, " ");
    // A policy that mentions neither the row owner nor a link cannot be scoped.
    return !/user_id = auth\.uid\(\)|is_admin\(|parent_student_links/.test(q);
  });
  check(
    "every profiles SELECT policy is scoped to the caller",
    wideOpen.length === 0,
    wideOpen.map((p) => p.policyname).join(", ") || "all scoped",
  );

  // 4. The linking RPC exists, is parent-reachable, and is not anon-reachable.
  const link = await query(`
    select has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can,
           has_function_privilege('authenticated', p.oid, 'EXECUTE') as auth_can,
           position('has_role(auth.uid(), ''parent'')' in p.prosrc) > 0 as parent_only,
           position('lower(p.email) = lower(btrim(p_email))' in p.prosrc) > 0 as exact_match
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'lookup_student_for_linking'`);
  check(
    "lookup_student_for_linking exists",
    link.length === 1,
    `found ${link.length}`,
  );
  if (link.length === 1) {
    check("lookup_student_for_linking: parent-only", link[0].parent_only === true, JSON.stringify(link[0]));
    check("lookup_student_for_linking: exact email match, not LIKE", link[0].exact_match === true, JSON.stringify(link[0]));
    check("lookup_student_for_linking: anon cannot execute", link[0].anon_can === false, JSON.stringify(link[0]));
    check("lookup_student_for_linking: authenticated can execute", link[0].auth_can === true, JSON.stringify(link[0]));
  }

  // 5. No public table has RLS switched off.
  const noRls = await query(`
    select c.relname
    from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relkind = 'r' and not c.relrowsecurity`);
  check("every public table has RLS enabled", noRls.length === 0, noRls.map((r) => r.relname).join(", ") || "all on");

  // 6. No anon/`public` policy grants a write.
  const anonWrites = await query(`
    select tablename, policyname, cmd
    from pg_policies
    where schemaname = 'public'
      and cmd in ('INSERT', 'UPDATE', 'DELETE', 'ALL')
      and (roles::text like '%anon%' or roles::text = '{public}')
      and coalesce(with_check, qual, 'true') = 'true'`);
  check(
    "no anon/public write policy allows every row",
    anonWrites.length === 0,
    anonWrites.map((p) => `${p.tablename}/${p.policyname}`).join(", ") || "none",
  );

  // 7. Anon holds no write or destructive grant anywhere in public. RLS filters
  //    DML, but it does not filter TRUNCATE at all, so this grant is the one
  //    place a bug elsewhere becomes a wiped database.
  const anonGrants = await query(`
    select table_name, privilege_type
    from information_schema.role_table_grants
    where table_schema = 'public' and grantee = 'anon'
      and privilege_type in ('INSERT','UPDATE','DELETE','TRUNCATE','REFERENCES','TRIGGER')`);
  check(
    "anon holds no write/TRUNCATE grant on any public table",
    anonGrants.length === 0,
    anonGrants.slice(0, 5).map((g) => `${g.table_name}:${g.privilege_type}`).join(", ") || "none",
  );

  // 8. Same for authenticated on TRUNCATE: no app path needs it.
  const authTruncate = await query(`
    select table_name from information_schema.role_table_grants
    where table_schema = 'public' and grantee = 'authenticated' and privilege_type = 'TRUNCATE'`);
  check(
    "authenticated holds no TRUNCATE grant",
    authTruncate.length === 0,
    authTruncate.map((g) => g.table_name).slice(0, 5).join(", ") || "none",
  );

  // 9. Content restore is an admin write, so it asks is_admin (role AND AAL2),
  //    never a bare user_roles lookup.
  const restore = await query(`
    select position('is_admin(' in prosrc) > 0 as uses_is_admin,
           prosrc ~* 'role\s*=\s*''admin''' as uses_raw_admin_role
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'restore_content_revision'`);
  check(
    "restore_content_revision requires AAL2 (is_admin)",
    restore.length === 1 && restore[0].uses_is_admin === true && restore[0].uses_raw_admin_role === false,
    JSON.stringify(restore[0] || null),
  );

  // 10. A student may not rewrite a grade after the server graded it.
  const selfTamper = await query(`
    select tablename, policyname from pg_policies
    where schemaname = 'public'
      and policyname in ('Users can update own attempts', 'Users can update own practice_attempts',
                         'Users can update own submissions')`);
  check(
    "no self-service UPDATE policy on graded tables",
    selfTamper.length === 0,
    selfTamper.map((p) => `${p.tablename}/${p.policyname}`).join(", ") || "none",
  );

  // 11. Board papers stay linked, never served: no non-admin storage read, and
  //     a parent cannot create a link with a client-supplied student id.
  const bucketRead = await query(`
    select policyname from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and cmd = 'SELECT'
      and coalesce(qual, '') like '%past-papers%'
      and coalesce(qual, '') not like '%is_admin%'`);
  check(
    "no non-admin read policy on the past-papers bucket",
    bucketRead.length === 0,
    bucketRead.map((p) => p.policyname).join(", ") || "none",
  );

  const linkInsert = await query(`
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'parent_student_links' and cmd = 'INSERT'`);
  check(
    "a parent cannot insert a link with a client-supplied student id",
    linkInsert.length === 0,
    linkInsert.map((p) => p.policyname).join(", ") || "none",
  );

  const linkRpc = await query(`
    select has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can,
           has_function_privilege('authenticated', p.oid, 'EXECUTE') as auth_can
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'link_student_by_email'`);
  check(
    "link_student_by_email is registered, parent-session reachable and not anon-reachable",
    linkRpc.length === 1 && linkRpc[0].anon_can === false && linkRpc[0].auth_can === true,
    JSON.stringify(linkRpc[0] || null),
  );

  const failed = checks.filter((c) => !c.pass);
  for (const c of checks) console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.name}${c.pass ? "" : `  (${c.detail})`}`);
  console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
  if (failed.length) process.exit(1);
})().catch((e) => {
  console.error("ERR", e.message);
  process.exit(1);
});
