// Golden dump generator: introspects the LIVE Supabase database and emits a single
// idempotent base.sql that bootstraps a brand-new project to the identical schema.
//
// Sections (dependency-safe order):
//   0. header + pragmas
//   1. extensions
//   2. enums
//   3. tables + PK/unique/check constraints (FKs later, no table-rewrites needed)
//   4. indexes
//   5. foreign keys
//   6. functions (CREATE OR REPLACE, single pass)
//   7. triggers
//   8. row level security (enable + policies)
//   9. grants
//  10. storage buckets + bucket policies
//  11. realtime publication membership
//  12. comments
const https = require("https");
const fs = require("fs");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

function sqlq(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request({ hostname: "api.supabase.com", path: `/v1/projects/${REF}/database/query`, method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) } },
      (res) => { let d = ""; res.on("data", (c) => (d += c)); res.on("end", () => { if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${d.slice(0, 300)}`)); try { resolve(JSON.parse(d)); } catch { resolve(d); } }); });
    req.on("error", reject); req.write(body); req.end();
  });
}
const rows = (r) => (Array.isArray(r) ? r : r.rows ?? []);
const qid = (s) => `"${String(s).replace(/"/g, '""')}"`;
const qlit = (s) => `'${String(s).replace(/'/g, "''")}'`;
const dlq = (s) => {
  let tag = "$dd$";
  while (s.includes(tag)) tag = `$dd${Math.random().toString(36).slice(2)}$`;
  return tag + s + tag;
};
const schemaExpr = (schema, name) =>
  schema === "public" ? `public.${qid(name)}` : `${qid(schema)}.${qid(name)}`;

const out = [];

// ───────── 0. header ─────────
out.push(`-- ============================================================`);
out.push(`-- Clutch Marks — golden base schema`);
out.push(`-- Generated ${new Date().toISOString()} from the live project (ref ${REF}).`);
out.push(`-- Bootstraps a brand-new Supabase project to the identical schema:
--   structure, constraints, functions, triggers, RLS, grants, storage buckets.
-- NO row data (student records, content) is included by design.`);
out.push(`-- Idempotent: safe to re-run; IF NOT EXISTS / OR REPLACE throughout.`);
out.push(`-- ============================================================`);
out.push(``);
out.push(`create extension if not exists "uuid-ossp" with schema extensions;`);
out.push(`create extension if not exists pgcrypto with schema extensions;`);
out.push(`create extension if not exists moddatetime with schema extensions;`);
out.push(``);

// ───────── 2. enums ─────────
const enums = rows(await sqlq(`
  select t.typname, string_agg(e.enumlabel, ',' order by e.enumsortorder) as labels
  from pg_type t join pg_enum e on e.enumtypid = t.oid
  join pg_namespace n on n.oid = t.typnamespace
  where n.nspname = 'public' group by t.typname, t.oid order by t.typname`));
out.push(`-- ============ enums ============`);
for (const e of enums) {
  const labels = String(e.labels).split(",").map((l) => `'${l}'`).join(", ");
  out.push(`do $enum$ begin`);
  out.push(`  if not exists (select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace where n.nspname = 'public' and t.typname = '${e.typname}') then`);
  out.push(`    create type public.${qid(e.typname)} as enum (${labels});`);
  out.push(`  end if;`);
  out.push(`end $enum$;`);
}
out.push(``);

// ───────── 3. tables ─────────
const tables = rows(await sqlq(`
  select c.relname as table_name, c.relreplident,
    pg_get_userbyid(c.relowner) as owner
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind = 'r'
  order by c.relname`));

const tableDeps = {}; // table -> set of tables it FKs (for reference order hints)
const fksRaw = rows(await sqlq(`
  select con.conname, con.conrelid::regclass::text as tbl, con.confrelid::regclass::text as ref,
    pg_get_constraintdef(con.oid, true) as def
  from pg_constraint con join pg_namespace n on n.oid = con.connamespace
  where n.nspname='public' and con.contype='f' order by con.conname`));
for (const fk of fksRaw) {
  const t = fk.tbl.replace(/^public\./, "").replace(/"/g, "");
  const r = fk.ref.replace(/^public\./, "").replace(/"/g, "");
  (tableDeps[t] ||= new Set()).add(r);
}

// topological-ish order: tables with no deps first
const ordered = [...tables.map((t) => t.table_name)];
const placed = new Set();
const orderedTables = [];
const pending = new Set(ordered);
let progress = true;
while (pending.size && progress) {
  progress = false;
  for (const t of [...pending]) {
    const deps = [...(tableDeps[t] ?? [])].filter((d) => pending.has(d) && d !== t);
    if (deps.length === 0) { orderedTables.push(t); placed.add(t); pending.delete(t); progress = true; }
  }
}
for (const t of pending) orderedTables.push(t); // cycles: FKs come later anyway

const colInfo = rows(await sqlq(`
  select c.table_name, c.column_name, c.ordinal_position, c.is_nullable, c.data_type,
    c.character_maximum_length, c.numeric_precision, c.numeric_scale, c.column_default,
    c.udt_schema, c.udt_name, c.is_identity, c.identity_generation,
    case when c.data_type = 'ARRAY' then true else false end as is_array
  from information_schema.columns c
  where c.table_schema = 'public'
  order by c.table_name, c.ordinal_position`));

function colDef(c) {
  let type;
  if (c.data_type === "ARRAY") type = (c.udt_name.startsWith("_") ? c.udt_name.slice(1) : c.udt_name) + "[]";
  else if (c.udt_schema === "public" && ["app_role", "subject_level"].includes(c.udt_name)) type = `public.${qid(c.udt_name)}`;
  else if (c.data_type === "USER-DEFINED") type = `${c.udt_schema === "public" ? "" : qid(c.udt_schema) + "."}${c.udt_name}`;
  else if (c.data_type === "character varying") type = c.character_maximum_length ? `character varying(${c.character_maximum_length})` : `character varying`;
  else if (c.data_type === "numeric") type = `numeric(${c.numeric_precision ?? 10},${c.numeric_scale ?? 0})`;
  else type = c.data_type;

  const parts = [qid(c.column_name), type];
  if (c.column_default) parts.push(`default ${c.column_default}`);
  if (c.is_nullable === "NO") parts.push(`not null`);
  if (c.is_identity === "YES") {
    parts.push(`generated ${c.identity_generation === "ALWAYS" ? "always" : "by default"} as identity`);
  }
  return parts.join(" ");
}

// constraints: p/u/c inline with table; f later
const cons = rows(await sqlq(`
  select con.conrelid::regclass::text as tbl, con.conname, con.contype, pg_get_constraintdef(con.oid, true) as def
  from pg_constraint con join pg_namespace n on n.oid = con.connamespace
  where n.nspname='public' and con.contype in ('p','u','c') order by con.conrelid::regclass::text, con.conname`));
const consByTable = {};
for (const c of cons) {
  const t = c.tbl.replace(/^public\./, "").replace(/"/g, "");
  (consByTable[t] ||= []).push(c);
}

out.push(`-- ============ tables ============`);
for (const t of orderedTables) {
  const cols = colInfo.filter((c) => c.table_name === t).sort((a, b) => a.ordinal_position - b.ordinal_position);
  const lines = cols.map((c) => `  ${colDef(c)}`);
  for (const c of (consByTable[t] ?? [])) {
    lines.push(`  constraint ${qid(c.conname)} ${c.def}`);
  }
  out.push(`create table if not exists ${schemaExpr("public", t)} (`);
  out.push(lines.join(",\n"));
  out.push(`);`);
}
out.push(``);

// ───────── 4. indexes ─────────
const indexes = rows(await sqlq(`
  select tablename, indexname, indexdef
  from pg_indexes where schemaname = 'public'
    and indexname not in (
      select conname from pg_constraint where contype in ('p','u') and connamespace = 'public'::regnamespace
    )
  order by tablename, indexname`));
out.push(`-- ============ indexes ============`);
for (const ix of indexes) out.push(`${ix.indexdef.replace(/^CREATE (UNIQUE )?INDEX /, "create $1index if not exists ")};`);
out.push(``);

// ───────── 5. foreign keys ─────────
out.push(`-- ============ foreign keys ============`);
for (const fk of fksRaw) {
  out.push(`alter table ${fk.tbl.includes(".") ? fk.tbl : "public." + qid(fk.tbl)} drop constraint if exists ${qid(fk.conname)};`);
  out.push(`alter table ${fk.tbl.includes(".") ? fk.tbl : "public." + qid(fk.tbl)} add constraint ${qid(fk.conname)} ${fk.def};`);
}
out.push(``);

// ───────── 6. functions ─────────
const fns = rows(await sqlq(`
  select p.proname, p.oid,
    pg_get_function_identity_arguments(p.oid) as args,
    pg_get_function_result(p.oid) as result,
    p.prokind, p.prosecdef, p.proconfig, p.proretset,
    pg_get_functiondef(p.oid) as def
  from pg_proc p join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public' and p.prokind = 'f'
  order by p.proname, 3`));
out.push(`-- ============ functions ============`);
const seenSig = new Set();
for (const f of fns) {
  const sig = `${f.proname}(${f.args})`;
  if (seenSig.has(sig)) continue;
  seenSig.add(sig);
  let def = f.def.trim();
  // make CREATE → CREATE OR REPLACE
  def = def.replace(/^CREATE OR REPLACE FUNCTION/, "CREATE OR REPLACE FUNCTION");
  def = def.replace(/^CREATE FUNCTION/, "CREATE OR REPLACE FUNCTION");
  out.push(def.endsWith(";") ? def : def + ";");
  out.push(``);
}
out.push(``);

// ───────── 7. triggers ─────────
const trgs = rows(await sqlq(`
  select c.relname as table_name, t.tgname, pg_get_triggerdef(t.oid, true) as def
  from pg_trigger t join pg_class c on c.oid = t.tgrelid
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and not t.tgisinternal
  order by c.relname, t.tgname`));
out.push(`-- ============ triggers ============`);
for (const t of trgs) {
  const schema = "public";
  const tname = t.table_name;
  out.push(`drop trigger if exists ${qid(t.tgname)} on ${schemaExpr(schema, tname)};`);
  out.push(`${t.def.replace(/^CREATE TRIGGER/, "CREATE TRIGGER")};`);
}
out.push(``);

// ───────── 8. RLS ─────────
const rlsEnabled = rows(await sqlq(`
  select c.relname as table_name, c.relrowsecurity, c.relforcerowsecurity
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind = 'r' and c.relrowsecurity`));
const policies = rows(await sqlq(`
  select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
  from pg_policies where schemaname = 'public' order by tablename, policyname`));
out.push(`-- ============ row level security ============`);
for (const t of rlsEnabled) {
  out.push(`alter table ${schemaExpr("public", t.table_name)} enable row level security;`);
  if (t.relforcerowsecurity) out.push(`alter table ${schemaExpr("public", t.table_name)} force row level security;`);
}
out.push(``);
for (const p of policies) {
  const cmdMap = { ALL: "all", SELECT: "select", INSERT: "insert", UPDATE: "update", DELETE: "delete" };
  const cmd = cmdMap[p.cmd] ?? p.cmd.toLowerCase();
  const roles = String(p.roles ?? "").replace(/^{|}$/g, "").split(",").filter(Boolean)
    .map((r) => (r === "public" ? "public" : qid(r))).join(", ");
  const permissive = p.permissive === "PERMISSIVE" ? "" : " as restrictive";
  let stmt = `create policy ${qid(p.policyname)} on ${schemaExpr(p.schemaname, p.tablename)}${permissive} for ${cmd}`;
  if (roles && roles !== "public") stmt += ` to ${roles}`;
  if (p.qual && p.cmd !== "ALL") stmt += ` using (${p.qual});`;
  else if (p.qual && p.cmd === "ALL") stmt += ` using (${p.qual})`;
  if (p.with_check) stmt += p.qual && p.cmd === "ALL" ? ` with check (${p.with_check});` : ` with check (${p.with_check});`;
  else if (p.qual && p.cmd === "ALL") stmt += `;`;
  out.push(`drop policy if exists ${qid(p.policyname)} on ${schemaExpr(p.schemaname, p.tablename)};`);
  out.push(stmt);
}
out.push(``);

// ───────── 9. grants ─────────
const grants = rows(await sqlq(`
  select grantee, table_name, string_agg(privilege_type, ',' order by privilege_type) as privs
  from information_schema.role_table_grants
  where table_schema = 'public'
    and grantee in ('anon','authenticated','service_role')
  group by grantee, table_name
  order by table_name, grantee`));
out.push(`-- ============ grants ============`);
for (const g of grants) {
  const privs = g.privs.split(",").join(", ");
  out.push(`grant ${privs} on ${schemaExpr("public", g.table_name)} to ${g.grantee};`);
}
// function grants for critical functions (non-default)
const fnGrants = rows(await sqlq(`
  select p.proname, p.proacl
  from pg_proc p join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public' and p.proacl is not null`));
for (const f of fnGrants) {
  const acl = f.proacl;
  for (const a of acl) {
    const m = a.match(/^(\w+)=(.*)\/\w+$/);
    if (!m) continue;
    const [, grantee, privsRaw] = m;
    if (!["anon", "authenticated", "service_role", "public"].includes(grantee)) continue;
    if (privsRaw === "X") {
      out.push(`grant execute on function public.${qid(f.proname)}(${f.args || ""}) to ${grantee};`);
    }
  }
}
out.push(``);

// ───────── 10. storage ─────────
const buckets = rows(await sqlq(`
  select name, public, file_size_limit, allowed_mime_types, owner
  from storage.buckets order by name`));
out.push(`-- ============ storage buckets ============`);
for (const b of buckets) {
  const mimes = b.allowed_mime_types
    ? `array[${String(b.allowed_mime_types).replace(/^{|}$/g, "").split(",").map((m) => qlit(m)).join(",")}]::text[]`
    : "null";
  out.push(`insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)`);
  out.push(`values (${qlit(b.name)}, ${qlit(b.name)}, ${b.public}, ${b.file_size_limit ?? "null"}, ${mimes})`);
  out.push(`on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;`);
}
const storagePolicies = rows(await sqlq(`
  select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
  from pg_policies where schemaname = 'storage' order by tablename, policyname`));
for (const p of storagePolicies) {
  const cmdMap = { ALL: "all", SELECT: "select", INSERT: "insert", UPDATE: "update", DELETE: "delete" };
  const cmd = cmdMap[p.cmd] ?? p.cmd.toLowerCase();
  const roles = String(p.roles ?? "").replace(/^{|}$/g, "").split(",").filter(Boolean)
    .map((r) => (r === "public" ? "public" : qid(r))).join(", ");
  out.push(`drop policy if exists ${qid(p.policyname)} on ${qid(p.schemaname)}.${qid(p.tablename)};`);
  let stmt = `create policy ${qid(p.policyname)} on ${qid(p.schemaname)}.${qid(p.tablename)} for ${cmd}`;
  if (roles && roles !== "public") stmt += ` to ${roles}`;
  if (p.qual) stmt += ` using (${p.qual})`;
  if (p.with_check) stmt += ` with check (${p.with_check})`;
  out.push(stmt + ";");
}
out.push(``);

// ───────── 11. realtime ─────────
const realtimeTables = rows(await sqlq(`
  select schemaname, tablename from pg_publication_tables
  where pubname = 'supabase_realtime' and schemaname = 'public' order by tablename`));
if (realtimeTables.length) {
  out.push(`-- ============ realtime ============`);
  for (const t of realtimeTables) {
    out.push(`alter publication supabase_realtime add table ${schemaExpr(t.schemaname, t.tablename)};`);
  }
  out.push(``);
}

// ───────── 12. comments ─────────
const comments = rows(await sqlq(`
  select c.relname as obj, d.description
  from pg_description d join pg_class c on c.oid = d.objoid
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and d.objsubid = 0 and d.description is not null`));
if (comments.length) {
  out.push(`-- ============ comments ============`);
  for (const c of comments) out.push(`comment on table ${schemaExpr("public", c.obj)} is ${dlq(c.description)};`);
  out.push(``);
}

fs.mkdirSync("supabase", { recursive: true });
fs.writeFileSync("supabase/base.sql", out.join("\n") + "\n");
console.log(`Wrote supabase/base.sql: ${out.length} lines, ${(fs.statSync("supabase/base.sql").size / 1024).toFixed(1)} KB`);
console.log(`tables: ${tables.length}, fks: ${fksRaw.length}, functions: ${seenSig.size}, triggers: ${trgs.length}, policies: ${policies.length}, storage policies: ${storagePolicies.length}, indexes: ${indexes.length}`);
