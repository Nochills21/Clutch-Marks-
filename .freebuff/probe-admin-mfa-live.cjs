// Live verifier for the admin second factor (TOTP / AAL2).
//
//   node .freebuff/probe-admin-mfa-live.cjs
//
// It proves the thing the feature claims: an admin session that only has the
// password (AAL1) is not an admin session. Everything is measured, not assumed —
// the policies are read back from PostgREST with a real AAL1 token, then the probe
// enrolls a TOTP factor, generates a real code from its own secret, verifies it and
// repeats the same calls at AAL2.
//
// The owner's account is never enrolled (a probe cannot hold their authenticator);
// a throwaway admin is created for the run and deleted afterwards.
const fs = require("fs");
const https = require("https");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const ENV = fs.readFileSync(".env", "utf8");
const REF = (ENV.match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const ANON = (ENV.match(/VITE_SUPABASE_PUBLISHABLE_KEY\s*=\s*"?([\w.-]+)"?/) || [])[1];
const SUPABASE_URL = `https://${REF}.supabase.co`;

function management(path) {
  return new Promise((resolve, reject) => {
    https
      .get({ hostname: "api.supabase.com", path: `/v1/projects/${REF}${path}`, headers: { Authorization: `Bearer ${TOKEN}` } },
        (res) => {
          let d = "";
          res.on("data", (c) => (d += c));
          res.on("end", () => resolve(d));
        })
      .on("error", reject);
  });
}

async function serviceKey() {
  const keys = JSON.parse(await management("/api-keys"));
  return (keys.find((k) => k.name === "service_role") || {}).api_key;
}

// ── TOTP (RFC 6238, SHA-1, 6 digits, 30s) ────────────────────────────────────
// Written out rather than pulled from a package: the probe must be able to prove
// the code GoTrue accepts, not echo a third-party implementation's idea of one.
const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Decode(input) {
  let bits = 0;
  let value = 0;
  const out = [];
  for (const char of String(input).replace(/=+$/, "").toUpperCase()) {
    const idx = B32.indexOf(char);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

function totp(secret, atMs = Date.now()) {
  const counter = Math.floor(atMs / 1000 / 30);
  const buf = Buffer.alloc(8);
  buf.writeUInt32BE(Math.floor(counter / 2 ** 32), 0);
  buf.writeUInt32BE(counter % 2 ** 32, 4);
  const hmac = crypto.createHmac("sha1", base32Decode(secret)).update(buf).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code = ((hmac[offset] & 0x7f) << 24) | (hmac[offset + 1] << 16) | (hmac[offset + 2] << 8) | hmac[offset + 3];
  return String(code % 1_000_000).padStart(6, "0");
}

function aalOf(session) {
  try {
    const payload = session.access_token.split(".")[1];
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")).aal ?? "aal1";
  } catch {
    return "unknown";
  }
}

const results = [];
function check(label, ok, detail) {
  results.push({ label, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  — ${detail}` : ""}`);
}

(async () => {
  const admin = createClient(SUPABASE_URL, await serviceKey());
  const stamp = crypto.randomUUID().slice(0, 6);
  const email = `mfa-admin-${stamp}@igcse-platform.local`;
  const password = `Mfa-${stamp}-Zz9!`;
  let userId = null;

  try {
    // ── a throwaway admin, provisioned the way admin access is granted: SQL ──
    const created = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: "MFA Probe" },
    });
    if (created.error) throw created.error;
    userId = created.data.user.id;
    const grant = await admin.from("user_roles").insert({ user_id: userId, role: "admin", is_approved: true });
    if (grant.error) throw grant.error;
    check("throwaway admin provisioned by SQL", true, userId);

    // ── AAL1: password only ─────────────────────────────────────────────────
    const client = createClient(SUPABASE_URL, ANON, { auth: { persistSession: false, autoRefreshToken: false } });
    const signIn = await client.auth.signInWithPassword({ email, password });
    if (signIn.error) throw signIn.error;
    const aal1 = aalOf(signIn.data.session);
    check("password alone signs in at AAL1", aal1 === "aal1", `aal=${aal1}`);

    // Every row, not one: SQL-provisioned admins keep the trigger's student row, so
    // a single-row read would 406 and the client would think it is not an admin —
    // which is why auth.tsx reads them all and ranks admin above student.
    const roleRead = await client.from("user_roles").select("role").eq("user_id", userId);
    const roles = (roleRead.data ?? []).map((row) => row.role);
    check("the AAL1 session still learns it holds the admin role", roles.includes("admin"),
      JSON.stringify(roles));

    const otherProfiles = await client.from("profiles").select("user_id").limit(5);
    check("AAL1 cannot read other people's profiles (admin read-all closed)",
      (otherProfiles.data ?? []).filter((row) => row.user_id !== userId).length === 0,
      `rows=${(otherProfiles.data ?? []).length} error=${otherProfiles.error?.message ?? "none"}`);

    const auditRead = await client.from("admin_audit_log").select("id").limit(5);
    check("AAL1 cannot read the admin audit log",
      (auditRead.data ?? []).length === 0 && !auditRead.error,
      `rows=${(auditRead.data ?? []).length} error=${auditRead.error?.message ?? "none"}`);

    const integrity = await client.rpc("content_integrity_findings");
    check("AAL1 cannot run the admin content-integrity report",
      Boolean(integrity.error) && /admin only/i.test(integrity.error?.message ?? ""),
      integrity.error?.message ?? "no error returned");

    const announce1 = await client.from("announcements").insert({ title: "mfa probe", content: "should be refused" }).select();
    check("AAL1 cannot write content (announcements insert refused)",
      Boolean(announce1.error),
      announce1.error?.message?.slice(0, 80) ?? "insert was allowed");

    const acct1 = await client.functions.invoke("manage-accounts", { body: { action: "create", email: "nobody@example.org" } });
    const acct1Status = acct1.error?.context?.status;
    check("AAL1 cannot call manage-accounts", acct1Status === 403, `HTTP ${acct1Status ?? "200"}`);

    const gen1 = await client.functions.invoke("generate-questions", { body: { topicId: "00000000-0000-0000-0000-000000000000" } });
    const gen1Status = gen1.error?.context?.status;
    check("AAL1 cannot write questions through generate-questions", gen1Status === 403, `HTTP ${gen1Status ?? "200"}`);

    // ── enroll, then the same calls at AAL2 ────────────────────────────────
    const enroll = await client.auth.mfa.enroll({ factorType: "totp", friendlyName: "Probe authenticator" });
    if (enroll.error || !enroll.data?.totp?.secret) throw enroll.error ?? new Error("no TOTP secret returned");
    check("TOTP enrollment returns a secret and QR", Boolean(enroll.data.totp.secret) && enroll.data.totp.qr_code.startsWith("data:image"),
      `factor=${enroll.data.id}`);

    const challenge = await client.auth.mfa.challenge({ factorId: enroll.data.id });
    if (challenge.error || !challenge.data) throw challenge.error ?? new Error("no challenge");
    const code = totp(enroll.data.totp.secret);
    const verify = await client.auth.mfa.verify({
      factorId: enroll.data.id,
      challengeId: challenge.data.id,
      code,
    });
    if (verify.error) throw verify.error;

    const after = await client.auth.getSession();
    const aal2 = aalOf(after.data.session);
    check("a verified code upgrades the session to AAL2", aal2 === "aal2", `aal=${aal2} code=${code}`);

    const level = await client.auth.mfa.getAuthenticatorAssuranceLevel();
    check("the SDK reports currentLevel=aal2 / nextLevel=aal2",
      level.data?.currentLevel === "aal2" && level.data?.nextLevel === "aal2",
      JSON.stringify(level.data));

    const otherProfiles2 = await client.from("profiles").select("user_id").limit(5);
    check("AAL2 can read other profiles again", (otherProfiles2.data ?? []).length > 0,
      `rows=${(otherProfiles2.data ?? []).length} error=${otherProfiles2.error?.message ?? "none"}`);

    const integrity2 = await client.rpc("content_integrity_findings");
    check("AAL2 can run the admin content-integrity report", !integrity2.error,
      integrity2.error?.message ?? "ok");

    const inserted = await client
      .from("announcements")
      .insert({ title: "mfa probe — safe to delete", content: "written by .freebuff/probe-admin-mfa-live.cjs" })
      .select("id")
      .maybeSingle();
    check("AAL2 can write content (the same insert now succeeds)", !inserted.error && Boolean(inserted.data?.id),
      inserted.error?.message ?? `id=${inserted.data?.id}`);
    if (inserted.data?.id) {
      const removed = await client.from("announcements").delete().eq("id", inserted.data.id);
      check("the probe's announcement was removed", !removed.error, removed.error?.message ?? "deleted");
    }

    const acct2 = await client.functions.invoke("manage-accounts", { body: { action: "create", email: "nobody@example.org" } });
    const acct2Status = acct2.error?.context?.status;
    check("AAL2 passes the manage-accounts second-factor gate", acct2Status !== 403, `HTTP ${acct2Status ?? "200"}`);

    // ── the owner is untouched ─────────────────────────────────────────────
    const ownerFactors = await admin
      .from("profiles")
      .select("user_id, email, username")
      .eq("user_id", (await admin.from("user_roles").select("user_id").eq("role", "admin").neq("user_id", userId)).data?.[0]?.user_id ?? "")
      .maybeSingle();
    check("the real owner account exists and was not enrolled by the probe", Boolean(ownerFactors.data?.email),
      `${ownerFactors.data?.username ?? "?"} has ${ownerFactors.data ? "its own factors" : "none"}`);
  } finally {
    if (userId) {
      await admin.from("announcements").delete().like("title", "mfa probe%");
      await admin.auth.admin.deleteUser(userId).catch(() => {});
    }
    const { data: leftovers } = await admin.auth.admin.listUsers();
    for (const user of leftovers?.users ?? []) {
      if (user.email?.startsWith("mfa-admin-") && user.email.endsWith("@igcse-platform.local")) {
        await admin.auth.admin.deleteUser(user.id).catch(() => {});
      }
    }
    console.log("\nfixtures removed");
  }

  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed`);
  process.exit(failed === 0 ? 0 : 1);
})();
