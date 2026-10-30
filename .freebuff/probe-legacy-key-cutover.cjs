// Before/after probe for deactivating the legacy anon + service_role JWTs.
//
//   node .freebuff/probe-legacy-key-cutover.cjs snapshot before
//   node .freebuff/probe-legacy-key-cutover.cjs snapshot after
//   node .freebuff/probe-legacy-key-cutover.cjs compare before after
//
// The question this answers is not "does the site load" but "does every refusal
// stay a refusal, and does every allowed call stay allowed". It records, for
// every deployed edge function, the status returned under four auth shapes:
//
//   none       no headers at all
//   key        the publishable key on `apikey` only
//   keybearer  publishable key on `apikey` AND on `Authorization: Bearer …`
//              (what supabase-js sends for a signed-out caller)
//   user       publishable key on `apikey` and a real user access token on
//              `Authorization` (what supabase-js sends for a signed-in one)
//
// plus the REST, RPC, storage and GoTrue paths the app actually depends on.
// `compare` then prints every status that moved, so a break cannot hide inside
// a summary. Bodies are truncated to 90 chars and no key is ever printed.
//
// It creates and deletes one throwaway student, so it needs the service key.
const fs = require("fs");
const path = require("path");
const https = require("https");
const { createClient } = require("@supabase/supabase-js");

const ROOT = path.resolve(__dirname, "..");
const TOKEN = (fs.readFileSync(path.join(ROOT, ".freebuff/get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const ENV = fs.readFileSync(path.join(ROOT, ".env"), "utf8");
const REF = (ENV.match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const ANON = (ENV.match(/VITE_SUPABASE_PUBLISHABLE_KEY\s*=\s*"?([^"\n]+)"?/) || [])[1];
const ORIGIN = `https://${REF}.supabase.co`;
const OUT_DIR = path.join(ROOT, ".freebuff-tmp");
const MATRIX_FILE = (tag) => path.join(OUT_DIR, `auth-matrix-${tag}.json`);

const FUNCTIONS = [
  "ai-correction", "billing", "draft-content", "email-events", "feedback-alert",
  "generate-questions", "login-with-username", "manage-accounts", "past-papers-harvest",
  "quiz-feedback", "resolve-login-email", "serve-external-paper", "serve-material",
  "stripe-webhook", "study-planner", "weekly-digest", "welcome-email",
];

// study-planner would spend an AI call if a signed-in request got through, so
// it is measured in the three shapes that cannot reach the model.
const NO_USER_SHAPE = new Set(["study-planner"]);

const mgmt = (method, p) =>
  new Promise((resolve, reject) => {
    const req = https.request(
      { hostname: "api.supabase.com", path: `/v1/projects/${REF}${p}`, method, headers: { Authorization: `Bearer ${TOKEN}` } },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve({ status: res.statusCode, body: d }));
      },
    );
    req.on("error", reject);
    req.end();
  });

const clean = (t) => String(t ?? "").replace(/\s+/g, " ").slice(0, 90);

async function hit(url, { apikey, bearer, method = "POST", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (apikey) headers.apikey = apikey;
  if (bearer) headers.Authorization = `Bearer ${bearer}`;
  try {
    const res = await fetch(url, { method, headers, body: method === "POST" ? (body ?? "{}") : undefined });
    const text = await res.text();
    let extra = "";
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) extra = ` rows=${parsed.length}`;
      else if (parsed && typeof parsed === "object") extra = ` code=${parsed.code ?? parsed.error ?? "-"}`;
    } catch { /* not JSON */ }
    return { status: res.status, detail: clean(text) + extra };
  } catch (e) {
    return { status: -1, detail: clean(e.message) };
  }
}

async function snapshot(tag) {
  const keys = JSON.parse((await mgmt("GET", "/api-keys")).body);
  const serviceKey = keys.find((k) => k.name === "service_role" && k.type === "legacy")?.api_key
    ?? keys.find((k) => k.type === "secret")?.api_key;
  const admin = createClient(ORIGIN, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

  // ── one throwaway user, so the `user` column is a real access token ──────
  const email = `key-cutover-${crypto.randomUUID().slice(0, 8)}@igcse-platform.local`;
  const password = `Kc_${crypto.randomUUID()}`;
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email, password, email_confirm: true, user_metadata: { full_name: "Key cutover probe" },
  });
  if (createErr || !created.user) throw new Error(`createUser: ${createErr?.message}`);
  const uid = created.user.id;

  const matrix = { tag, at: new Date().toISOString(), functions: {}, paths: {} };
  try {
    const client = createClient(ORIGIN, ANON, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: session, error: signInErr } = await client.auth.signInWithPassword({ email, password });
    if (signInErr) throw new Error(`signIn: ${signInErr.message}`);
    const jwt = session.session.access_token;

    // ── 1. every function, in every auth shape ────────────────────────────
    for (const slug of FUNCTIONS) {
      const url = `${ORIGIN}/functions/v1/${slug}`;
      const row = {};
      row.none = await hit(url, {});
      row.key = await hit(url, { apikey: ANON });
      row.keybearer = await hit(url, { apikey: ANON, bearer: ANON });
      if (!NO_USER_SHAPE.has(slug)) row.user = await hit(url, { apikey: ANON, bearer: jwt });
      matrix.functions[slug] = row;
      const shape = Object.entries(row).map(([k, v]) => `${k}:${v.status}`).join(" ");
      console.log(`  ${slug.padEnd(22)} ${shape}`);
    }

    // ── 2. the data paths ─────────────────────────────────────────────────
    const P = (name) => `${ORIGIN}${name}`;
    const paths = {
      "rest public read (apikey)": await hit(P("/rest/v1/subjects?select=id&limit=1"), { apikey: ANON, method: "GET" }),
      "rest public read (apikey + bearer key)": await hit(P("/rest/v1/subjects?select=id&limit=1"), { apikey: ANON, bearer: ANON, method: "GET" }),
      "rest authed read own profile": await hit(P("/rest/v1/profiles?select=user_id&limit=1"), { apikey: ANON, bearer: jwt, method: "GET" }),
      "rest anon write attempt (topics insert)": await hit(P("/rest/v1/topics"), { apikey: ANON, bearer: ANON, method: "POST", body: JSON.stringify({ name: "should not exist" }) }),
      "rpc has_active_plan (must stay closed)": await hit(P("/rest/v1/rpc/has_active_plan"), { apikey: ANON, bearer: ANON, method: "POST", body: JSON.stringify({ _user_id: uid }) }),
      "storage private object signed out": await hit(P("/storage/v1/object/past-papers/mark-schemes/pmt/0580-paper-2-22--may-june-2016-v1-ms.pdf"), { apikey: ANON, method: "GET" }),
      "auth health": await hit(P("/auth/v1/health"), { method: "GET" }),
      "auth password sign-in (anon apikey)": await hit(P("/auth/v1/token?grant_type=password"), {
        apikey: ANON,
        body: JSON.stringify({ email, password }),
      }),
      "auth password sign-in (no apikey)": await hit(P("/auth/v1/token?grant_type=password"), {
        body: JSON.stringify({ email, password }),
      }),
    };
    matrix.paths = paths;
    console.log("");
    for (const [name, v] of Object.entries(paths)) console.log(`  ${name.padEnd(44)} ${v.status}`);
  } finally {
    const { error } = await admin.auth.admin.deleteUser(uid);
    if (error) console.error(`WARNING: could not delete throwaway user: ${error.message}`);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(MATRIX_FILE(tag), JSON.stringify(matrix, null, 1));
  console.log(`\nsnapshot written: ${path.relative(ROOT, MATRIX_FILE(tag))}`);
}

function compare(aTag, bTag) {
  const a = JSON.parse(fs.readFileSync(MATRIX_FILE(aTag), "utf8"));
  const b = JSON.parse(fs.readFileSync(MATRIX_FILE(bTag), "utf8"));
  let moved = 0;
  const rows = [];
  for (const slug of Object.keys(a.functions)) {
    for (const shape of Object.keys(a.functions[slug])) {
      const before = a.functions[slug][shape];
      const after = b.functions[slug]?.[shape] ?? { status: "missing", detail: "" };
      if (before.status !== after.status) {
        moved += 1;
        rows.push(`  ${slug.padEnd(22)} ${shape.padEnd(10)} ${before.status} → ${after.status}   ${after.detail || before.detail}`);
      }
    }
  }
  for (const name of Object.keys(a.paths)) {
    const before = a.paths[name];
    const after = b.paths[name] ?? { status: "missing", detail: "" };
    if (before.status !== after.status) {
      moved += 1;
      rows.push(`  ${name.padEnd(48)} ${before.status} → ${after.status}   ${after.detail || before.detail}`);
    }
  }
  console.log(`\n${moved === 0 ? "NO STATUS MOVED" : `${moved} STATUS CHANGE(S)`}:`);
  for (const row of rows) console.log(row);
  process.exit(moved === 0 ? 0 : 2);
}

const mode = process.argv[2];
if (mode === "snapshot") snapshot(process.argv[3]).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
else if (mode === "compare") compare(process.argv[3], process.argv[4]);
else { console.error("usage: snapshot <tag> | compare <a> <b>"); process.exit(1); }
