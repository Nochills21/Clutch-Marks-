// Before/after probe for deactivating the legacy anon + service_role JWTs.
//
//   node .freebuff/probe-legacy-key-cutover.cjs snapshot before
//   node .freebuff/probe-legacy-key-cutover.cjs snapshot after
//   node .freebuff/probe-legacy-key-cutover.cjs compare before after
//   node .freebuff/probe-legacy-key-cutover.cjs verify
//
// The question this answers is not "does the site load" but "does every refusal
// stay a refusal, and does every allowed call stay allowed". `snapshot` records,
// for every deployed edge function, the status returned under four auth shapes:
//
//   none       no headers at all
//   key        the publishable key on `apikey` only
//   keybearer  publishable key on `apikey` AND on `Authorization: Bearer …`
//              (what supabase-js sends for a signed-out caller)
//   user       publishable key on `apikey` and a real user access token on
//              `Authorization` (what supabase-js sends for a signed-in one)
//
// plus the REST, RPC, storage and GoTrue paths the app actually depends on.
// `compare` prints every status that moved, so a break cannot hide in a summary.
//
// `verify` is the end-to-end check with no admin credential: it signs up through
// GoTrue with the publishable key, signs in, and then proves the *service-key*
// path inside a function still works by asking `ai-correction` for a marking
// without a plan — 403 `plan_required` means its `has_active_plan` service-key
// call succeeded, where a dead key would answer 503.
//
// The throwaway account is removed through the Management API. Bodies are
// truncated to 90 chars and no key value is ever printed.
const fs = require("fs");
const path = require("path");
const https = require("https");

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

/** Delete a throwaway account without needing a service key. */
const deleteThrowaway = (uid) =>
  new Promise((resolve) => {
    const body = JSON.stringify({
      query: `delete from auth.users where id = '${uid}' and email like '%@igcse-platform.local'`,
    });
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
        res.on("data", () => {});
        res.on("end", () => resolve());
      },
    );
    req.on("error", () => resolve());
    req.write(body);
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

/** A throwaway student, created the way a real one is: signup, then sign-in. */
async function throwawayUser(prefix) {
  const email = `${prefix}-${crypto.randomUUID().slice(0, 8)}@igcse-platform.local`;
  const password = `${prefix === "key-verify" ? "Kv" : "Kc"}_${crypto.randomUUID()}a1!`;
  const signupRes = await fetch(`${ORIGIN}/auth/v1/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON },
    body: JSON.stringify({ email, password }),
  });
  const signup = await signupRes.json().catch(() => ({}));
  const uid = signup.user?.id ?? signup.id;
  return { email, password, uid, status: signupRes.status, body: signup };
}

async function signIn(email, password) {
  const res = await fetch(`${ORIGIN}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON },
    body: JSON.stringify({ email, password }),
  });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, token: body.access_token, body };
}

async function snapshot(tag) {
  const user = await throwawayUser("key-cutover");
  if (!user.uid) throw new Error(`signup: ${user.status} ${JSON.stringify(user.body).slice(0, 200)}`);

  const matrix = { tag, at: new Date().toISOString(), functions: {}, paths: {} };
  try {
    // Signing in is also the explicit check that the password grant still works.
    const session = await signIn(user.email, user.password);
    if (!session.token) throw new Error(`signIn: ${session.status} ${JSON.stringify(session.body).slice(0, 200)}`);
    const jwt = session.token;

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
    matrix.paths = {
      "rest public read (apikey)": await hit(P("/rest/v1/subjects?select=id&limit=1"), { apikey: ANON, method: "GET" }),
      "rest public read (apikey + bearer key)": await hit(P("/rest/v1/subjects?select=id&limit=1"), { apikey: ANON, bearer: ANON, method: "GET" }),
      "rest authed read own profile": await hit(P("/rest/v1/profiles?select=user_id&limit=1"), { apikey: ANON, bearer: jwt, method: "GET" }),
      "rest anon write attempt (topics insert)": await hit(P("/rest/v1/topics"), { apikey: ANON, bearer: ANON, method: "POST", body: JSON.stringify({ name: "should not exist" }) }),
      "rpc has_active_plan (must stay closed)": await hit(P("/rest/v1/rpc/has_active_plan"), { apikey: ANON, bearer: ANON, method: "POST", body: JSON.stringify({ _user_id: user.uid }) }),
      "storage private object signed out": await hit(P("/storage/v1/object/past-papers/mark-schemes/pmt/0580-paper-2-22--may-june-2016-v1-ms.pdf"), { apikey: ANON, method: "GET" }),
      "auth health": await hit(P("/auth/v1/health"), { method: "GET" }),
      "auth password sign-in (anon apikey)": await hit(P("/auth/v1/token?grant_type=password"), { apikey: ANON, body: JSON.stringify({ email: user.email, password: user.password }) }),
      "auth password sign-in (no apikey)": await hit(P("/auth/v1/token?grant_type=password"), { body: JSON.stringify({ email: user.email, password: user.password }) }),
    };
    console.log("");
    for (const [name, v] of Object.entries(matrix.paths)) console.log(`  ${name.padEnd(44)} ${v.status}`);
  } finally {
    await deleteThrowaway(user.uid);
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

// ── verify: does a function's own service-key work survive the cutover? ────
async function verify() {
  let failures = 0;
  const check = (ok, label, detail = "") => {
    console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? "  — " + detail : ""}`);
    if (!ok) failures += 1;
  };

  const user = await throwawayUser("key-verify");
  check(user.status === 200 && Boolean(user.uid), "a new student can sign up", `${user.status}`);
  if (!user.uid) return failures;

  try {
    const session = await signIn(user.email, user.password);
    check(session.status === 200 && Boolean(session.token), "password sign-in works", `${session.status}`);
    const jwt = session.token;
    if (!jwt) return failures;

    // 1. the service-key path inside a function (403 = auth worked, 503 = key dead)
    const ai = await hit(`${ORIGIN}/functions/v1/ai-correction`, {
      apikey: ANON,
      bearer: jwt,
      body: JSON.stringify({ paper: "1 + 1 = 2" }),
    });
    check(ai.status === 403, "a plan-less call is refused as plan_required, not as a broken key", `${ai.status} ${ai.detail}`);

    // 2. RLS still scopes a student to their own rows
    const own = await hit(`${ORIGIN}/rest/v1/profiles?select=user_id&limit=5`, { apikey: ANON, bearer: jwt, method: "GET" });
    check(own.status === 200, "the student can read their own profile", `${own.status}`);

    // 3. storage accepts a student's own upload and refuses another folder.
    // application/pdf because `homework-uploads` allows only PDF, images and
    // Word documents — a text/plain upload is refused 415 before any policy is
    // consulted, so the RLS check would pass for the wrong reason.
    const uploadPath = `${user.uid}/ai-marker/key-cutover.pdf`;
    const put = (p) =>
      fetch(`${ORIGIN}/storage/v1/object/homework-uploads/${p}`, {
        method: "POST",
        headers: { apikey: ANON, Authorization: `Bearer ${jwt}`, "Content-Type": "application/pdf", "x-upsert": "true" },
        body: "%PDF-1.4 key cutover probe",
      });
    const mine = await put(uploadPath);
    check(mine.status === 200, "storage accepts an upload inside the caller's folder", `${mine.status}`);
    const theirs = await put(`00000000-0000-0000-0000-000000000000/ai-marker/key-cutover.pdf`);
    check(theirs.status === 400 || theirs.status === 403, "storage refuses another account's folder", `${theirs.status}`);
    await fetch(`${ORIGIN}/storage/v1/object/homework-uploads/${uploadPath}`, {
      method: "DELETE",
      headers: { apikey: ANON, Authorization: `Bearer ${jwt}` },
    });

    // 4. the closed RPC stays closed for a real session too
    const rpc = await hit(`${ORIGIN}/rest/v1/rpc/has_active_plan`, { apikey: ANON, bearer: jwt, body: JSON.stringify({ _user_id: user.uid }) });
    check(rpc.status === 401 || rpc.status === 403, "has_active_plan is not executable by a student session", `${rpc.status}`);
  } finally {
    await deleteThrowaway(user.uid);
  }

  console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
  return failures;
}

const mode = process.argv[2];
if (mode === "snapshot") snapshot(process.argv[3]).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
else if (mode === "compare") compare(process.argv[3], process.argv[4]);
else if (mode === "verify") verify().then((f) => process.exit(f === 0 ? 0 : 1)).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
else { console.error("usage: snapshot <tag> | compare <a> <b> | verify"); process.exit(1); }
