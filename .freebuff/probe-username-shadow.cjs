// One handle, one account — including when two students claim it at once.
//
//   node .freebuff/probe-username-shadow.cjs
//
// Two questions, both measured against the live project:
//   1. Can one student's handle select another student's account, so that the
//      owner cannot sign in? (The underscore case below.)
//   2. Do two students racing for the same handle end up sharing it?
//
// `login-with-username` resolves a handle with a case-insensitive LIKE pattern,
// and the canonical username alphabet includes the underscore. In SQL LIKE an
// underscore matches any single character, so the handle `sam_1` and the handle
// `samx1` are the same pattern: the lookup matches two rows, resolves to nobody,
// and the student who typed their own correct handle cannot sign in.
//
// This probe creates two such accounts and drives the real login path, so the
// claim is measured rather than argued. Fixtures are @igcse-platform.local and
// are removed afterwards, including leftovers from an interrupted run.
const fs = require("fs");
const https = require("https");
const { createClient } = require("@supabase/supabase-js");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const ENV = fs.readFileSync(".env", "utf8");
const ANON = (ENV.match(/VITE_SUPABASE_PUBLISHABLE_KEY\s*=\s*"?([^"\n]+)"?/) || [])[1];
const SUPABASE_URL = `https://${REF}.supabase.co`;

const api = (method, path) =>
  new Promise((resolve, reject) => {
    const req = https.request(
      { hostname: "api.supabase.com", path: `/v1/projects/${REF}${path}`, method, headers: { Authorization: `Bearer ${TOKEN}` } },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve({ status: res.statusCode, body: d }));
      },
    );
    req.on("error", reject);
    req.end();
  });

async function serviceKey() {
  const keys = JSON.parse((await api("GET", "/api-keys")).body);
  const key = (keys.find((k) => k.name === "service_role") || {}).api_key;
  if (!key) throw new Error("could not read the service_role key");
  return key;
}

async function signUp({ email, password, username, name }) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON, Authorization: `Bearer ${ANON}` },
    body: JSON.stringify({ email, password, data: { full_name: name, role: "student", username } }),
  });
  const body = await res.json().catch(() => null);
  return { status: res.status, userId: body?.user?.id ?? body?.id ?? null };
}

async function loginWithUsername(identifier, password) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/login-with-username`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON, Authorization: `Bearer ${ANON}` },
    body: JSON.stringify({ identifier, password }),
  });
  const body = await res.json().catch(() => null);
  return { status: res.status, body };
}

const results = [];
function check(label, ok, detail) {
  results.push({ label, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  — ${detail}` : ""}`);
}

(async () => {
  const admin = createClient(SUPABASE_URL, await serviceKey());
  const stamp = crypto.randomUUID().slice(0, 5);
  const password = `Probe-${stamp}-Zz9!`;
  const created = [];

  // Underscore in one handle, the same pattern with a letter in the other.
  const withUnderscore = { email: `shadow-${stamp}-a@igcse-platform.local`, username: `sam_${stamp}` };
  const withLetter = { email: `shadow-${stamp}-b@igcse-platform.local`, username: `samx${stamp}` };

  try {
    for (const s of [withUnderscore, withLetter]) {
      const r = await signUp({ ...s, password, name: `Probe ${s.username}` });
      if (r.userId) created.push(r.userId);
      s.userId = r.userId;
    }
    check("two probe students created", Boolean(withUnderscore.userId && withLetter.userId),
      `a=${withUnderscore.userId} b=${withLetter.userId}`);
    if (!withUnderscore.userId || !withLetter.userId) throw new Error("could not create the probe accounts");

    const stored = async (userId) => {
      const { data } = await admin.from("profiles").select("username").eq("user_id", userId).maybeSingle();
      return data?.username ?? null;
    };
    check("both handles stored as chosen",
      (await stored(withUnderscore.userId)) === withUnderscore.username &&
        (await stored(withLetter.userId)) === withLetter.username,
      `${await stored(withUnderscore.userId)} / ${await stored(withLetter.userId)}`);

    // ── the login path, with each student's own handle and password ──────
    const ownShort = await loginWithUsername(withUnderscore.username, password);
    check("the student whose handle contains an underscore can sign in",
      ownShort.status === 200 && Boolean(ownShort.body?.access_token),
      `HTTP ${ownShort.status} ${JSON.stringify(ownShort.body?.error ?? "")}`);

    const ownLetter = await loginWithUsername(withLetter.username, password);
    check("the other student can sign in with their own handle",
      ownLetter.status === 200 && Boolean(ownLetter.body?.access_token),
      `HTTP ${ownLetter.status} ${JSON.stringify(ownLetter.body?.error ?? "")}`);

    // ── why the escape is needed: the raw pattern reach ──────────────────
    // Informational, not a verdict: this reproduces the lookup the functions
    // used before the fix, so the collision is visible rather than asserted.
    const { data: asPattern } = await admin
      .from("profiles")
      .select("username")
      .ilike("username", withUnderscore.username);
    console.log(
      `INFO  raw ilike(${withUnderscore.username}) matched ${JSON.stringify((asPattern ?? []).map((r) => r.username))}`,
    );

    // The lookup the fixed functions perform: case-insensitive, but literal.
    const escaped = withUnderscore.username.replace(/([\\%_])/g, "\\$1");
    const { data: literal, error: literalError } = await admin
      .from("profiles")
      .select("username")
      .ilike("username", escaped);
    check("an escaped lookup selects exactly the one account",
      !literalError && (literal ?? []).length === 1 && literal[0].username === withUnderscore.username,
      `${literalError?.message ?? ""} matched=${JSON.stringify((literal ?? []).map((r) => r.username))}`);

    // ── both students claim the same new handle, at the same moment ──────
    const clients = await Promise.all(
      [withUnderscore, withLetter].map(async (s) => {
        const c = createClient(SUPABASE_URL, ANON);
        const { error } = await c.auth.signInWithPassword({ email: s.email, password });
        if (error) throw new Error(`sign-in failed for ${s.email}: ${error.message}`);
        return c;
      }),
    );
    const contested = `contested_${stamp}`;
    const claims = await Promise.all(
      clients.map((c) => c.rpc("set_my_username", { _username: contested })),
    );
    const winners = claims.filter((r) => r.data?.ok === true);
    const losers = claims.filter((r) => r.data?.ok !== true);
    check("exactly one of two simultaneous claims wins", winners.length === 1,
      JSON.stringify(claims.map((r) => r.data)));
    check("the loser is told the handle is taken", losers.length === 1 && losers[0].data?.error === "taken",
      JSON.stringify(losers[0]?.data));

    const { data: holders } = await admin
      .from("profiles")
      .select("user_id, username")
      .ilike("username", contested);
    check("the handle is stored on exactly one account", (holders ?? []).length === 1,
      JSON.stringify((holders ?? []).map((r) => r.username)));
    check("the winner is the account that holds it", (holders ?? [])[0]?.user_id ===
      [withUnderscore, withLetter][winners.length ? claims.indexOf(winners[0]) : 0]?.userId,
      `holders=${JSON.stringify((holders ?? []).map((r) => r.user_id))}`);
  } finally {
    for (const id of created) await admin.auth.admin.deleteUser(id).catch(() => {});
    console.log(`\n${results.filter((r) => r.ok).length}/${results.length} checks passed`);
    if (results.some((r) => !r.ok)) process.exit(1);
  }
})();
