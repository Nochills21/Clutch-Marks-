// Live acceptance probe for "students can change their own username".
//
//   node .freebuff/probe-username-selfservice-live.cjs
//
// Drives the real path the Settings page uses — a signed-in session calling
// `public.set_my_username` — and checks the rules the database is responsible
// for, not the ones the form happens to enforce:
//
//   1. a valid handle is stored, lower-cased, even when sent as "@MiXeD"
//   2. a handle another student holds is refused with error "taken" (any casing)
//   3. malformed input is refused with error "invalid", and nothing is written
//   4. re-submitting the current handle answers "unchanged"
//   5. a direct PostgREST write of a mixed-case handle is refused by the trigger
//   6. clearing the username is refused (admin-only), as is touching another row
//   7. the new handle signs in and the old one no longer does
//   8. the change leaves an admin-visible audit row
//   9. an anonymous caller cannot execute the RPC
//
// Fixtures are @igcse-platform.local and removed afterwards, including leftovers
// from an interrupted run.
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
      { hostname: "api.supabase.com", path: `/v1/projects/${REF}${path}`, method,
        headers: { Authorization: `Bearer ${TOKEN}` } },
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
  const stamp = crypto.randomUUID().slice(0, 6);
  const password = `Probe-${stamp}-Zz9!`;
  const created = [];

  try {
    // ── two students, each with their own handle ────────────────────────
    const a = { email: `selfuser-${stamp}-a@igcse-platform.local`, username: `probe${stamp}a` };
    const b = { email: `selfuser-${stamp}-b@igcse-platform.local`, username: `probe${stamp}b` };
    for (const s of [a, b]) {
      const r = await signUp({ ...s, password, name: `Probe ${s.username}` });
      if (r.userId) created.push(r.userId);
      s.userId = r.userId;
    }
    check("two probe students created", Boolean(a.userId && b.userId), `a=${a.userId} b=${b.userId}`);
    if (!a.userId || !b.userId) throw new Error("could not create the probe accounts");

    const clientA = createClient(SUPABASE_URL, ANON);
    const signInA = await clientA.auth.signInWithPassword({ email: a.email, password });
    check("probe student can sign in", !signInA.error && Boolean(signInA.data.session),
      signInA.error?.message ?? "session");

    const rpc = (value) => clientA.rpc("set_my_username", { _username: value });
    const stored = async (userId) => {
      const { data } = await admin.from("profiles").select("username").eq("user_id", userId).maybeSingle();
      return data?.username ?? null;
    };

    // ── 1. a valid handle, sent with @ and mixed case ───────────────────
    // The underscore is deliberate: it is legal in a handle and it is a
    // single-character wildcard in SQL LIKE, so this handle only signs in if the
    // lookup escaped it (see probe-username-shadow.cjs for the two-account case).
    const newHandle = `Renamed_${stamp}`;
    const first = await rpc(`@${newHandle.toUpperCase()}`);
    const lower = newHandle.toLowerCase();
    check("valid handle accepted", !first.error && first.data?.ok === true,
      first.error?.message ?? JSON.stringify(first.data));
    check("handle stored lower-cased", (await stored(a.userId)) === lower,
      `stored=${await stored(a.userId)} expected=${lower}`);
    check("RPC returns the stored handle", first.data?.username === lower, JSON.stringify(first.data?.username));

    // ── 2. taken by another student, in a different casing ──────────────
    const taken = await rpc(b.username.toUpperCase());
    check("a handle another student holds is refused", taken.data?.ok === false && taken.data?.error === "taken",
      JSON.stringify(taken.data));
    check("the refusal left the caller's handle alone", (await stored(a.userId)) === lower);

    // ── 3. malformed input ──────────────────────────────────────────────
    for (const bad of ["ab", "has space", "jane@doe", "x".repeat(33), "é"]) {
      const r = await rpc(bad);
      check(`malformed handle ${JSON.stringify(bad)} refused as invalid`,
        r.data?.ok === false && r.data?.error === "invalid", JSON.stringify(r.data));
    }
    check("no malformed value reached the table", (await stored(a.userId)) === lower);

    // ── 4. same handle again ────────────────────────────────────────────
    const unchanged = await rpc(lower);
    check("re-submitting the current handle answers unchanged",
      unchanged.data?.ok === false && unchanged.data?.error === "unchanged", JSON.stringify(unchanged.data));

    // ── 5. a direct write of a mixed-case handle ────────────────────────
    const direct = await clientA.from("profiles").update({ username: "MixedCase" }).eq("user_id", a.userId);
    check("direct PostgREST write of a mixed-case handle is refused",
      Boolean(direct.error) && /Invalid username/i.test(direct.error?.message ?? ""),
      direct.error?.message ?? "no error returned");
    check("the refused direct write changed nothing", (await stored(a.userId)) === lower);

    // ── 6. clearing, and another row ────────────────────────────────────
    const clear = await clientA.from("profiles").update({ username: null }).eq("user_id", a.userId);
    check("clearing the username is admin-only",
      Boolean(clear.error) && /administrator/i.test(clear.error?.message ?? ""),
      clear.error?.message ?? "no error returned");

    // The two fields that were silently writable before this feature (the guard
    // asked whether the caller was the service role, but inside a SECURITY
    // DEFINER function that answer is always yes). These are the regression
    // checks for that hole, not just for the username feature.
    const emailChange = await clientA
      .from("profiles")
      .update({ email: `moved-${stamp}@igcse-platform.local` })
      .eq("user_id", a.userId);
    check("a student cannot change their own email",
      Boolean(emailChange.error) && /administrator/i.test(emailChange.error?.message ?? ""),
      emailChange.error?.message ?? "no error returned");
    const { data: emailNow } = await admin
      .from("profiles").select("email").eq("user_id", a.userId).maybeSingle();
    check("the email is unchanged", emailNow?.email === a.email, `stored=${emailNow?.email}`);

    const ownerChange = await clientA
      .from("profiles")
      .update({ user_id: b.userId })
      .eq("user_id", a.userId);
    check("a student cannot move a profile to another owner",
      Boolean(ownerChange.error) && /administrator/i.test(ownerChange.error?.message ?? ""),
      ownerChange.error?.message ?? "no error returned");

    const other = await clientA
      .from("profiles")
      .update({ username: `stolen${stamp}` })
      .eq("user_id", b.userId)
      .select("user_id");
    check("another student's row is not updatable", (other.data ?? []).length === 0,
      `rows=${(other.data ?? []).length} error=${other.error?.message ?? "none"}`);
    check("the other student's handle is untouched", (await stored(b.userId)) === b.username);

    // ── 7. sign-in follows the new handle ───────────────────────────────
    for (const id of created) {
      await admin.auth.admin.updateUserById(id, { email_confirm: true }).catch(() => {});
    }
    const loginNew = await loginWithUsername(lower, password);
    check("the new handle signs in", loginNew.status === 200 && Boolean(loginNew.body?.access_token),
      `HTTP ${loginNew.status}`);
    // Handles are shown as @name (settings badge, leaderboard), so the sigil is
    // what students retype. The login form and login-with-username both strip it
    // before deciding whether the value is an address or a handle.
    const loginAt = await loginWithUsername(`@${lower.toUpperCase()}`, password);
    check("the new handle signs in when typed as @handle",
      loginAt.status === 200 && Boolean(loginAt.body?.access_token), `HTTP ${loginAt.status}`);
    const loginOld = await loginWithUsername(a.username, password);
    check("the old handle no longer signs in", loginOld.status !== 200,
      `HTTP ${loginOld.status} ${JSON.stringify(loginOld.body?.error ?? "")}`);

    // ── 8. audit trail ──────────────────────────────────────────────────
    const { data: audit } = await admin
      .from("admin_audit_log")
      .select("actor_id, action, entity, details, created_at")
      .eq("entity_id", a.userId)
      .eq("action", "update")
      .order("created_at", { ascending: false })
      .limit(1);
    const row = (audit ?? [])[0];
    check("the change is in the admin audit log",
      row?.actor_id === a.userId && row?.details?.self_service === true,
      JSON.stringify(row?.details ?? null));

    // ── 9. anonymous callers ────────────────────────────────────────────
    const anon = createClient(SUPABASE_URL, ANON);
    const anonCall = await anon.rpc("set_my_username", { _username: "anonprobe" });
    check("an anonymous caller cannot change a username", Boolean(anonCall.error),
      anonCall.error?.message ?? "no error returned");
  } finally {
    for (const id of created) await admin.auth.admin.deleteUser(id).catch(() => {});
    const { data: leftovers } = await admin
      .from("profiles").select("user_id")
      .like("email", "selfuser-%@igcse-platform.local");
    for (const r of leftovers ?? []) await admin.auth.admin.deleteUser(r.user_id).catch(() => {});
    console.log("\nfixtures removed");
  }

  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed`);
  process.exit(failed === 0 ? 0 : 1);
})();
