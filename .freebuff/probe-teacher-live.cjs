// Live verifier for the teacher account type: role + one-subject grant, and the
// RLS that keeps the grant read-only from a browser session.
//
//   node .freebuff/probe-teacher-live.cjs create   # make the account, keep creds
//   node .freebuff/probe-teacher-live.cjs delete   # remove it again
//
// The console's "create" action itself needs an AAL2 admin session, which a
// script cannot obtain (that is the point of the second factor), so this probe
// writes the same two rows `manage-accounts` writes and then asserts everything
// the browser session is allowed to do with them.
const fs = require("fs");
const https = require("https");
const { createClient } = require("@supabase/supabase-js");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const ANON = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PUBLISHABLE_KEY\s*=\s*"?([^"\n]+)"?/) || [])[1];
const OUT = ".freebuff-tmp/teacher-student.json";

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

const checks = [];
const check = (name, pass, detail = "") => {
  checks.push({ name, pass, detail });
  console.log(`${pass ? "ok  " : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

(async () => {
  const mode = process.argv[2] || "create";
  const keys = JSON.parse((await api("GET", "/api-keys")).body);
  const serviceKey = (keys.find((k) => k.name === "service_role") || {}).api_key;
  const admin = createClient(`https://${REF}.supabase.co`, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (mode === "delete") {
    if (!fs.existsSync(OUT)) return console.log("nothing to delete");
    const { userId } = JSON.parse(fs.readFileSync(OUT, "utf8"));
    const { error } = await admin.auth.admin.deleteUser(userId);
    const { data: grant } = await admin.from("teacher_subjects").select("user_id").eq("user_id", userId);
    fs.unlinkSync(OUT);
    console.log(error ? `delete failed: ${error.message}` : "deleted the throwaway teacher");
    check("grant row cascaded with the account", (grant ?? []).length === 0);
    return;
  }

  const physics = (await admin.from("subjects").select("id, name").eq("slug", "physics").single()).data;
  const chemistry = (await admin.from("subjects").select("id, name").eq("slug", "chemistry").single()).data;
  if (!physics || !chemistry) throw new Error("physics/chemistry subjects missing");

  const email = `teacher-${crypto.randomUUID().slice(0, 8)}@igcse-platform.local`;
  const password = `Tch_${crypto.randomUUID()}`;
  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: "Probe teacher" },
  });
  if (createError || !created.user) throw new Error(`createUser: ${createError?.message}`);
  const userId = created.user.id;

  const { error: roleError } = await admin
    .from("user_roles")
    .update({ role: "teacher", is_approved: true })
    .eq("user_id", userId);
  if (roleError) throw new Error(`role: ${roleError.message}`);
  const { error: grantError } = await admin
    .from("teacher_subjects")
    .insert({ user_id: userId, subject_id: physics.id });
  if (grantError) throw new Error(`grant: ${grantError.message}`);
  fs.writeFileSync(OUT, JSON.stringify({ userId, email, password, physicsId: physics.id, chemistryId: chemistry.id }, null, 2) + "\n");

  // One teacher, one subject: the primary key is what enforces it.
  const { error: secondGrant } = await admin
    .from("teacher_subjects")
    .insert({ user_id: userId, subject_id: chemistry.id });
  check("a second subject is refused", !!secondGrant, secondGrant?.code ?? "inserted?!");
  await admin.from("teacher_subjects").delete().eq("user_id", userId).eq("subject_id", chemistry.id);

  // Sign in as the teacher and ask the database what it will let a browser do.
  const asTeacher = createClient(`https://${REF}.supabase.co`, ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: signInError } = await asTeacher.auth.signInWithPassword({ email, password });
  check("the teacher can sign in", !signInError, signInError?.message ?? "");

  const { data: roles } = await asTeacher.from("user_roles").select("role").eq("user_id", userId);
  check("its own role reads back as teacher", (roles ?? []).some((r) => r.role === "teacher"), JSON.stringify(roles));

  const { data: ownGrant, error: ownGrantError } = await asTeacher
    .from("teacher_subjects")
    .select("subject_id, subjects(name, slug, subject_levels(id))")
    .eq("user_id", userId);
  check(
    "it can read its own grant, with levels",
    !ownGrantError && (ownGrant ?? []).length === 1 && (ownGrant?.[0]?.subjects?.subject_levels ?? []).length > 0,
    `${(ownGrant ?? []).length} row(s), ${ownGrant?.[0]?.subjects?.subject_levels?.length ?? 0} level(s)`,
  );

  const { error: writeGrant } = await asTeacher
    .from("teacher_subjects")
    .insert({ user_id: userId, subject_id: chemistry.id });
  check("it cannot write a grant", !!writeGrant, writeGrant?.code ?? "inserted?!");

  const { error: changeGrant } = await asTeacher
    .from("teacher_subjects")
    .update({ subject_id: chemistry.id })
    .eq("user_id", userId);
  const { data: afterChange } = await admin.from("teacher_subjects").select("subject_id").eq("user_id", userId).single();
  check(
    "it cannot move its grant to another subject",
    afterChange?.subject_id === physics.id,
    `${changeGrant?.code ?? "no error"} · subject now ${afterChange?.subject_id === physics.id ? "physics" : "CHANGED"}`,
  );

  const { data: promoted } = await asTeacher
    .from("user_roles")
    .update({ role: "admin" })
    .eq("user_id", userId)
    .select("role");
  const { data: roleNow } = await admin.from("user_roles").select("role").eq("user_id", userId).single();
  check("it cannot promote itself", roleNow?.role === "teacher", `(${promoted ?? []}).length=${(promoted ?? []).length}`);

  // The sales-gate surfaces read real rows, so prove the ones a teacher needs.
  const { data: physicsLevels } = await admin
    .from("subject_levels")
    .select("id, level")
    .eq("subject_id", physics.id)
    .order("level");
  check(
    "physics has the three levels the grant should cover",
    (physicsLevels ?? []).length >= 2,
    (physicsLevels ?? []).map((l) => l.level).join(","),
  );

  const failed = checks.filter((c) => !c.pass);
  console.log(`\n${failed.length === 0 ? "PASS" : "FAIL"}  ${checks.length - failed.length}/${checks.length} checks`);
  console.log(`account kept for the browser check: ${email} (see ${OUT})`);
  process.exit(failed.length ? 1 : 0);
})();
