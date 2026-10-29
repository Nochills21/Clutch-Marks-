// Create (or delete) a throwaway student for signed-in verification of the five
// student surfaces. Credentials are written to .freebuff-tmp/verify-student.json
// (gitignored scratch), never printed, and the account is deleted afterwards.
//
//   node .freebuff/make-verify-student.cjs create
//   node .freebuff/make-verify-student.cjs delete
const fs = require("fs");
const https = require("https");
const { createClient } = require("@supabase/supabase-js");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const ENV = fs.readFileSync(".env", "utf8");
const ANON = (ENV.match(/VITE_SUPABASE_PUBLISHABLE_KEY\s*=\s*"?([^"\n]+)"?/) || [])[1];
const OUT = ".freebuff-tmp/verify-student.json";

const api = (method, path) =>
  new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}${path}`,
        method,
        headers: { Authorization: `Bearer ${TOKEN}` },
      },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve({ status: res.statusCode, body: d }));
      },
    );
    req.on("error", reject);
    req.end();
  });

(async () => {
  const mode = process.argv[2] || "create";
  const keys = JSON.parse((await api("GET", "/api-keys")).body);
  const serviceKey = (keys.find((k) => k.name === "service_role") || {}).api_key;
  const admin = createClient(`https://${REF}.supabase.co`, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (mode === "delete") {
    if (!fs.existsSync(OUT)) {
      console.log("nothing to delete");
      return;
    }
    const { userId } = JSON.parse(fs.readFileSync(OUT, "utf8"));
    const { error } = await admin.auth.admin.deleteUser(userId);
    fs.unlinkSync(OUT);
    console.log(error ? `delete failed: ${error.message}` : "deleted the throwaway student");
    return;
  }

  const email = `verify-student-${crypto.randomUUID().slice(0, 8)}@igcse-platform.local`;
  const password = `Vf_${crypto.randomUUID()}`;
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: "Verification student" },
  });
  if (error || !data.user) throw new Error(`createUser: ${error?.message}`);

  // The signup trigger writes the role row; assert it landed rather than assume.
  const { data: roles } = await admin
    .from("user_roles")
    .select("role, is_approved")
    .eq("user_id", data.user.id);
  fs.writeFileSync(OUT, JSON.stringify({ userId: data.user.id, email, password }, null, 2) + "\n");
  console.log(`created ${email} roles=${JSON.stringify(roles)}`);
  void ANON;
})();
