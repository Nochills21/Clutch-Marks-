// Accuracy harness for the live `ai-correction` worker.
//
// Unlike the acceptance probe (which only checks *that* marking happens),
// this checks *whether the marks are right*: it stages a mark scheme the
// harness itself wrote from independently verified maths (WMA11/01, 9 Oct
// 2025, Q7 + Q2 — every expected value recomputed in node before use), then
// submits a student script with a deliberate error profile and scores the
// marker against ground truth:
//
//   Item 1  Q7(a) [3]: fully correct working            -> expect 3/3
//   Item 2  Q7(b) [3]: right method, arithmetic slip    -> expect 1-2/3
//   Item 3  Q7(c) [3]: wrong method, wrong answer       -> expect 0-1/3
//   Item 4  Q2    [5]: fully correct working            -> expect 5/5
//
// Usage: node .freebuff-tmp/ai-accuracy-test.cjs
// Exit 0 only if every accuracy check passes. All fixtures (user,
// subscription, uploads, past_papers row) are removed afterwards.
const fs = require("fs");
const https = require("https");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const ENV = fs.readFileSync(".env", "utf8");
const REF = (ENV.match(/^VITE_SUPABASE_PROJECT_ID\s*=\s*"?(.*?)"?\s*$/m) || [])[1];
const ANON = (ENV.match(/^VITE_SUPABASE_PUBLISHABLE_KEY\s*=\s*"?(.*?)"?\s*$/m) || [])[1];
if (!REF || !ANON) throw new Error("could not read project ref / anon key from .env");
const SUPABASE_URL = `https://${REF}.supabase.co`;
const FN_URL = `${SUPABASE_URL}/functions/v1/ai-correction`;

const RUN = crypto.randomUUID().slice(0, 8);
const TEST_TITLE = `ACCURACY-TEST ${RUN} — WMA11/01 Oct 2025 (throwaway)`;

// Ground truth, recomputed in node (see session notes): OP = 6.0302,
// OQ = 8.8302 -> 8.83, total area = 210.63 -> 211, perimeter = 56.46 -> 56.
const MARK_SCHEME_TEXT = `Edexcel IAL Pure Mathematics P1 (WMA11/01) - 9 October 2025 - mark scheme extract.
Q7(a) [3 marks]: M1 uses area of sector = 1/2 r^2 theta with area 30 and theta 1.65 to find OP (OP^2 = 60/1.65, OP = 6.03). M1 adds PQ: OQ = OP + 2.8. A1 OQ = 8.83 m to 3 s.f.
Q7(b) [3 marks]: M1 major sector angle = 2pi - 1.65 (= 4.63). M1 major sector area = 1/2 x (their OQ)^2 x (2pi - 1.65). A1 total = 211 m^2 to the nearest integer (accept 210.5-211.5 unrounded).
Q7(c) [3 marks]: M1 both arc lengths: (their OP) x 1.65 and (their OQ) x (2pi - 1.65). M1 adds both straight radial edges 2 x 2.8. A1 56 m to 2 s.f. (accept 56-57).
Q2 [5 marks]: M1 expands (x-3)^2(2x-5) to a four-term cubic. A1 correct cubic 2x^3 - 17x^2 + 48x - 45. M1 integrates term by term (x^n -> x^(n+1)/(n+1) for at least three terms). A1 three correct integrated terms. A1 fully correct x^4/2 - 17x^3/3 + 24x^2 - 45x + c.`;

const STUDENT_SCRIPT = [
  {
    question: "Q7(a) [3 marks] Sector POS, angle 1.65 rad, area 30 m^2, PQ = 2.8 m. Show OQ = 8.83 m (3 s.f.).",
    answer: "Area = 1/2 r^2 theta: 30 = 0.5 x OP^2 x 1.65, so OP^2 = 60/1.65 = 36.36, OP = 6.03. OQ = OP + PQ = 6.03 + 2.8 = 8.83 m (3 s.f.).",
    expect: { earned: 3, total: 3 },
  },
  {
    question: "Q7(b) [3 marks] Find the total surface area of the swimming pool to the nearest integer.",
    answer: "Major angle = 2pi - 1.65 = 4.63. Major area = 0.5 x 8.83^2 x 4.63 = 178.4 (my arithmetic). Total = 30 + 178.4 = 208.4, so 208 m^2.",
    expect: { earnedMin: 1, earnedMax: 2, total: 3 },
  },
  {
    question: "Q7(c) [3 marks] Find the total perimeter of the swimming pool to 2 s.f.",
    answer: "Perimeter = 2 x pi x 8.83 + 2 x pi x 6.03 = 55.5 + 37.9 = 93.4, so 93 m.",
    expect: { earnedMin: 0, earnedMax: 1, total: 3 },
  },
  {
    question: "Q2 [5 marks] Find integral (x-3)^2 (2x-5) dx in simplest form.",
    answer: "Expand: (x^2-6x+9)(2x-5) = 2x^3 - 17x^2 + 48x - 45. Integrate: x^4/2 - 17x^3/3 + 24x^2 - 45x + c.",
    expect: { earned: 5, total: 5 },
  },
];

function buildTextPdf(lines) {
  const esc = (s) => s.replace(/([()\\])/g, "\\$1");
  const content = lines.map((l, i) => `${i === 0 ? "" : "0 -20 Td "}(${esc(l)}) Tj`).join(" ");
  const body = `BT /F1 11 Tf 50 760 Td ${content} ET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${Buffer.byteLength(body)} >>\nstream\n${body}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((o, i) => { offsets.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, "latin1");
}

const api = (method, path, body) =>
  new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}${path}`,
        method,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          ...(payload ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(payload) } : {}),
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

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

(async () => {
  const keys = JSON.parse((await api("GET", "/api-keys")).body);
  const serviceKey = (keys.find((k) => k.name === "service_role") || {}).api_key;
  if (!serviceKey) throw new Error("no service_role key");
  const admin = createClient(SUPABASE_URL, serviceKey);

  let userId = null;
  let paperId = null;
  const schemePath = `accuracy-tests/${RUN}/wma11-oct2025-markscheme.pdf`;
  try {
    // Remove any stale test rows from crashed runs (same title prefix).
    await admin.from("past_papers").delete().like("title", "ACCURACY-TEST %");

    // Stage the mark scheme: text-layer PDF in past-papers + catalogue row.
    const pdf = buildTextPdf(MARK_SCHEME_TEXT.split("\n"));
    const { error: upErr } = await admin.storage.from("past-papers").upload(schemePath, pdf, {
      contentType: "application/pdf",
    });
    if (upErr) throw new Error(`mark scheme upload: ${upErr.message}`);
    const { data: paperRow, error: paperErr } = await admin
      .from("past_papers")
      .insert({
        title: TEST_TITLE,
        year: 2025,
        session: "October",
        paper_number: "WMA11/01",
        mark_scheme_url: schemePath,
      })
      .select("id")
      .single();
    if (paperErr) throw new Error(`past_papers insert: ${paperErr.message}`);
    paperId = paperRow.id;

    // Throwaway approved + subscribed student.
    const email = `ai-acc-${RUN}@igcse-platform.local`;
    const password = `Pw_${crypto.randomUUID()}`;
    const { data, error } = await admin.auth.admin.createUser({
      email, password, email_confirm: true, user_metadata: { full_name: "AI accuracy test", role: "student" },
    });
    if (error || !data.user) throw new Error(`createUser: ${error?.message}`);
    userId = data.user.id;
    const { data: updated } = await admin.from("user_roles").update({ role: "student", is_approved: true }).eq("user_id", userId).select("id");
    if (!updated?.length) await admin.from("user_roles").insert({ user_id: userId, role: "student", is_approved: true });
    const { error: planError } = await admin.from("subscriptions").insert({
      user_id: userId, plan_id: "monthly", status: "active",
      starts_at: new Date().toISOString(), ends_at: new Date(Date.now() + 30 * 864e5).toISOString(),
    });
    if (planError) throw new Error(`subscriptions: ${planError.message}`);
    const anon = createClient(SUPABASE_URL, ANON);
    const { data: signIn, error: signInError } = await anon.auth.signInWithPassword({ email, password });
    if (signInError || !signIn.session) throw new Error(`signIn: ${signInError?.message}`);

    // The marking call under test.
    const t0 = Date.now();
    const res = await fetch(FN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: ANON, Authorization: `Bearer ${signIn.session.access_token}` },
      body: JSON.stringify({
        paper: STUDENT_SCRIPT.map((s) => ({ question: s.question, answer: s.answer })),
        paperRef: { id: paperId, title: "Pure Mathematics P1", session: "October", year: 2025, paperNumber: "WMA11/01" },
      }),
    });
    const json = await res.json().catch(() => null);
    const ms = Date.now() - t0;
    // Full evidence on disk: a future single-mark wobble can be diagnosed
    // item by item instead of re-running blind.
    try {
      fs.writeFileSync(
        `.freebuff-tmp/acc-run-${RUN}.json`,
        JSON.stringify({ run: RUN, at: new Date().toISOString(), status: res.status, ms, json }, null, 2),
      );
    } catch {}
    console.log(`evidence: .freebuff-tmp/acc-run-${RUN}.json`);
    check("marking call succeeds (HTTP 200 + 4 items)", res.status === 200 && json?.corrected_papers?.length === 4,
      `HTTP ${res.status} items=${json?.corrected_papers?.length ?? "-"} model=${json?.model ?? "-"} ${ms}ms err=${String(json?.error ?? "").slice(0, 80)}`);
    check("marking grounded on staged mark scheme", json?.mark_scheme?.loaded === true,
      `mark_scheme=${JSON.stringify(json?.mark_scheme ?? null)}`);
    if (res.status !== 200 || json?.corrected_papers?.length !== 4) return;

    // Score each item against ground truth.
    let earnedSum = 0, possibleSum = 0;
    json.corrected_papers.forEach((item, i) => {
      const spec = STUDENT_SCRIPT[i];
      const e = item.marks_earned, t = item.total_marks;
      earnedSum += e; possibleSum += t;
      const totalOk = t === spec.expect.total;
      const earnedOk = spec.expect.earned !== undefined
        ? e === spec.expect.earned
        : e >= spec.expect.earnedMin && e <= spec.expect.earnedMax;
      check(`item ${i + 1} marks ${e}/${t} (expect ${spec.expect.earned ?? `${spec.expect.earnedMin}-${spec.expect.earnedMax}`}/${spec.expect.total})`,
        totalOk && earnedOk, `feedback=${String(item.feedback ?? "").slice(0, 100)}`);
      check(`item ${i + 1} has model answer + feedback`, String(item.correct_answer ?? "").length > 10 && String(item.feedback ?? "").length > 10,
        `correct=${String(item.correct_answer ?? "").slice(0, 60)}`);
    });
    check(`overall total ${earnedSum}/${possibleSum} (expect 9-11/14)`, possibleSum === 14 && earnedSum >= 9 && earnedSum <= 11,
      `grade=${json?.overall_grade}`);
  } finally {
    // PostgREST filter builders are thenable but carry no .catch, so route
    // every cleanup through a real promise.
    const ignore = (p) => Promise.resolve(p).catch(() => {});
    if (userId) await ignore(admin.auth.admin.deleteUser(userId));
    if (paperId) await ignore(admin.from("past_papers").delete().eq("id", paperId));
    await ignore(admin.storage.from("past-papers").remove([schemePath]));
    console.log("fixtures removed");
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} accuracy checks passed`);
  process.exit(failed.length ? 1 : 0);
})().catch((e) => {
  console.error("harness crashed:", e?.message ?? e);
  process.exit(1);
});
