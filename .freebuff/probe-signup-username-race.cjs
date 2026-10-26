// Two sign-ups submitting the same handle at the same instant: both accounts
// must be created, with distinct handles. This is the case the EXISTS pre-check
// cannot win on its own — it is the unique index that decides, and the trigger's
// exception handler that keeps the loser's signup alive.
//
//   node .freebuff/probe-signup-username-race.cjs
//
// Run it more than once: the window is a millisecond wide, so a single green run
// is weak evidence and three are better. Fixtures are removed afterwards.
const fs = require("fs");
const https = require("https");
const { createClient } = require("@supabase/supabase-js");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const ENV = fs.readFileSync(".env", "utf8");
const ANON = (ENV.match(/VITE_SUPABASE_PUBLISHABLE_KEY\s*=\s*"?([^"\n]+)"?/) || [])[1];
const URL = `https://${REF}.supabase.co`;

const api = (method, path) =>
  new Promise((resolve, reject) => {
    const req = https.request({ hostname: "api.supabase.com", path: `/v1/projects/${REF}${path}`, method,
      headers: { Authorization: `Bearer ${TOKEN}` } }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => resolve({ body: d }));
    });
    req.on("error", reject);
    req.end();
  });

async function serviceKey() {
  const keys = JSON.parse((await api("GET", "/api-keys")).body);
  return (keys.find((k) => k.name === "service_role") || {}).api_key;
}

async function signUp(email, username, password) {
  const res = await fetch(`${URL}/auth/v1/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON, Authorization: `Bearer ${ANON}` },
    body: JSON.stringify({ email, password, data: { full_name: username, role: "student", username } }),
  });
  const body = await res.json().catch(() => null);
  return { status: res.status, userId: body?.user?.id ?? body?.id ?? null, error: body?.msg ?? body?.error_description ?? body?.message ?? null };
}

(async () => {
  const admin = createClient(URL, await serviceKey());
  const stamp = crypto.randomUUID().slice(0, 6);
  const password = `Probe-${stamp}-Zz9!`;
  const handle = `racer_${stamp}`;
  const created = [];

  try {
    const [one, two] = await Promise.all([
      signUp(`race-${stamp}-a@igcse-platform.local`, handle, password),
      signUp(`race-${stamp}-b@igcse-platform.local`, handle, password),
    ]);
    for (const r of [one, two]) if (r.userId) created.push(r.userId);
    console.log("signup 1:", JSON.stringify(one));
    console.log("signup 2:", JSON.stringify(two));

    const { data: rows } = await admin.from("profiles").select("user_id, username").in("user_id", created);
    console.log("stored:", JSON.stringify((rows ?? []).map((r) => r.username)));
    const names = (rows ?? []).map((r) => r.username);
    const distinct = new Set(names).size === names.length;
    const bothCreated = Boolean(one.userId && two.userId);
    const oneExact = names.includes(handle);
    const suffixed = names.filter((n) => n && n.startsWith(`${handle}-`) && n.length === handle.length + 6).length === 1;
    console.log(
      bothCreated && distinct && oneExact && suffixed ? "PASS  both accounts created, handles distinct"
        : `FAIL  bothCreated=${bothCreated} distinct=${distinct} oneExact=${oneExact} suffixed=${suffixed}`,
    );
    process.exitCode = bothCreated && distinct && oneExact ? 0 : 1;
  } finally {
    for (const id of created) await admin.auth.admin.deleteUser(id).catch(() => {});
  }
})();
