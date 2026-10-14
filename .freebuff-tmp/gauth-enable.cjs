// Enable Google sign-in on the live Supabase project (Management API).
// Credentials come from env vars GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET so
// they never touch disk. Only non-secret fields are ever printed.
const fs = require("fs");
const https = require("https");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const ENV = fs.readFileSync(".env", "utf8");
const REF = (ENV.match(/^VITE_SUPABASE_PROJECT_ID\s*=\s*"?(.*?)"?\s*$/m) || [])[1];
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
if (!TOKEN || !REF) throw new Error("missing management token or project ref");
if (!CLIENT_ID || !CLIENT_SECRET) throw new Error("set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET");

function mgmt(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}${path}`,
        method,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          ...(payload
            ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(payload) }
            : {}),
        },
      },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve({ status: res.statusCode, body: d }));
      },
    );
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function scrub(cfg) {
  const keep = [
    "external_google_enabled",
    "external_google_client_id",
    "site_url",
    "uri_allow_list",
    "external_email_enabled",
  ];
  const out = {};
  for (const k of keep) out[k] = cfg[k];
  out.external_google_secret_set = typeof cfg.external_google_secret === "string" && cfg.external_google_secret.length > 0;
  return out;
}

(async () => {
  const before = await mgmt("GET", "/config/auth");
  if (before.status !== 200) throw new Error(`GET config/auth: HTTP ${before.status} ${before.body.slice(0, 120)}`);
  console.log("before:", JSON.stringify(scrub(JSON.parse(before.body))));

  const patch = await mgmt("PATCH", "/config/auth", {
    external_google_enabled: true,
    external_google_client_id: CLIENT_ID,
    external_google_secret: CLIENT_SECRET,
  });
  console.log(`PATCH status: ${patch.status}`);
  if (patch.status !== 200 && patch.status !== 201) throw new Error(`PATCH failed: ${patch.body.slice(0, 300)}`);

  const after = await mgmt("GET", "/config/auth");
  const cfg = JSON.parse(after.body);
  const view = scrub(cfg);
  // Never print secret material; confirm presence only.
  console.log("after:", JSON.stringify(view));
  if (view.external_google_enabled !== true) throw new Error("provider still not enabled after PATCH");
  if (!view.external_google_client_id) throw new Error("client id missing after PATCH");
  if (!view.external_google_secret_set) throw new Error("secret missing after PATCH");
  console.log("Google provider enabled with client id + secret present");
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
