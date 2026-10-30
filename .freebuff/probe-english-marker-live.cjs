// Live end-to-end probe for phase 3.3 — the English evaluator.
//
//   node .freebuff/probe-english-marker-live.cjs
//
// Marks a real English composition (Cambridge IGCSE First Language English 0500
// Paper 2, the paper on file with topic "Analysing Language Choices") with a
// throwaway funded student, and asserts that the marker switched regimes:
//
//   * the response says it used band descriptors, not a mark scheme;
//   * every question is band-marked, with named criteria, bands and quoted
//     evidence — and no M1/A1/B1 marking language anywhere;
//   * the criteria's own marks add up to the question total, and no mark
//     exceeds it (the reconciliation is what makes a band mark defensible);
//   * the missed band still queues review cards in the paper's topic.
//
// English has no mark scheme on file (both English qualifications are
// catalogue-only), so `mark_scheme.loaded === false` is the correct result here
// — the descriptors travel in the prompt.
//
// This spends AI credits: one marking call. Everything it creates is removed.
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

let failures = 0;
const check = (ok, label, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? "  — " + detail : ""}`);
  if (!ok) failures += 1;
};

// A composition written the way a mid-band IGCSE student actually writes one:
// clear sense of place, thin development, competent but repetitive syntax. It
// exists to be placed in a band, not to score points.
const SCRIPT = [
  {
    question:
      "0500/22 Question 2 (Composition, 25 marks): Describe a place that matters to you and explain why it is memorable.",
    answer:
      "The market opens before the sun is properly up. My grandfather takes me there on Fridays and we always go the same way, past the bakery and down the narrow street where the shutters are still closed. The market is loud. There are people shouting about the price of tomatoes and people shouting about the price of fish, and the noise goes up and hits the metal roof and comes back down again. It smells of cardamom and old wood and sometimes of the drains.\n\n" +
      "The tiles are cool even in August. I know this because I used to sit on them when I was small, near the man who sells lemons, and wait for my grandfather to finish talking to everyone he has ever met. He talks to everyone. He talks to the man who sells lemons and the man who sells nothing at all, who just sits there with a chair and an opinion.\n\n" +
      "It is memorable because it is the same every week and because one day it will not be. My grandfather is old now and he walks slower than the shutters opening. I still go on Fridays. I buy the lemons myself and I say good morning to the man with the chair, and I sit on the cool tiles for a minute before I go home."
  },
];

async function main() {
  const keys = JSON.parse((await mgmt("GET", "/api-keys")).body);
  const serviceKey = keys.find((k) => k.name === "service_role").api_key;
  const admin = createClient(ORIGIN, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

  // ── the English paper, its topic, and the level it belongs to ────────────
  const { data: paper, error: paperErr } = await admin
    .from("past_papers")
    .select("id, title, session, year, paper_number, subject_slug, topic_id, topics(id, name, subject_level_id)")
    .eq("subject_slug", "english-first-language-cambridge")
    .eq("paper_number", "Paper 2 (22)")
    .order("year", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (paperErr || !paper) throw new Error(`paper lookup: ${paperErr?.message ?? "not found"}`);
  const topic = paper.topics;
  if (!topic?.subject_level_id) throw new Error("the English paper has no topic/level — cannot mark against a subject level");
  console.log(`paper: ${paper.title}`);
  console.log(`topic: ${topic.name}\n`);

  const setTitle = `Marking misses: ${topic.name}`.slice(0, 120);
  const { data: preSet } = await admin
    .from("flashcard_sets").select("id, flashcards(id)").eq("topic_id", topic.id).eq("title", setTitle).maybeSingle();
  const preCardIds = new Set((preSet?.flashcards ?? []).map((c) => c.id));

  // ── a throwaway student who passes the plan gate ─────────────────────────
  const email = `english-band-${crypto.randomUUID().slice(0, 8)}@igcse-platform.local`;
  const password = `En_${crypto.randomUUID()}`;
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email, password, email_confirm: true, user_metadata: { full_name: "English band probe" },
  });
  if (createErr || !created.user) throw new Error(`createUser: ${createErr?.message}`);
  const uid = created.user.id;

  const { error: subErr } = await admin.from("subscriptions").insert({
    user_id: uid, plan_id: "monthly", status: "active",
    starts_at: new Date().toISOString(), ends_at: new Date(Date.now() + 30 * 864e5).toISOString(),
  });
  if (subErr) throw new Error(`subscription: ${subErr.message}`);

  const client = createClient(ORIGIN, ANON, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: session, error: signInErr } = await client.auth.signInWithPassword({ email, password });
  if (signInErr) throw new Error(`signIn: ${signInErr.message}`);

  try {
    const res = await fetch(`${ORIGIN}/functions/v1/ai-correction`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: ANON, Authorization: `Bearer ${session.session.access_token}` },
      body: JSON.stringify({
        paper: SCRIPT,
        subjectLevelId: topic.subject_level_id,
        paperRef: {
          id: paper.id, title: paper.title, session: paper.session,
          year: paper.year, paperNumber: paper.paper_number, markSchemeUrl: null,
        },
      }),
    });
    const marked = await res.json();
    check(res.status === 200, "marking returned 200", `${res.status}${res.status === 200 ? "" : " " + JSON.stringify(marked).slice(0, 200)}`);
    if (res.status !== 200) throw new Error("marking failed — nothing to assert");

    // ── 1. the marker switched regimes, and says so ───────────────────────
    check(marked.marking?.regime === "english_band", "response reports the English band regime", JSON.stringify(marked.marking));
    check(/english/i.test(String(marked.marking?.subject ?? "")), "the subject resolved to English", String(marked.marking?.subject));
    // English is catalogue-only: no scheme on file is correct, not a failure.
    check(marked.mark_scheme?.loaded === false, "no mark scheme claimed for a catalogue-only English paper", JSON.stringify(marked.mark_scheme));

    const papers = marked.corrected_papers ?? [];
    check(papers.length === SCRIPT.length, "one result per task", `${papers.length}/${SCRIPT.length}`);
    check((marked.marking?.banded_questions ?? 0) >= 1, "at least one task was band-marked", String(marked.marking?.banded_questions));

    const banded = papers.filter((p) => p.marking_mode === "band");
    check(banded.length === papers.length, "every task marked on bands, not on points", banded.map((p) => p.marking_mode).join(","));

    for (const q of banded) {
      const criteria = q.criteria ?? [];
      check(criteria.length >= 1, `criteria returned (${criteria.length})`, String(q.question).slice(0, 46));
      const sumAvailable = criteria.reduce((s, c) => s + Number(c.marks_available ?? 0), 0);
      check(sumAvailable === q.total_marks, `criteria add up to the task total (${sumAvailable}/${q.total_marks})`);
      check(q.marks_earned <= q.total_marks && q.marks_earned >= 0, `mark inside the task total (${q.marks_earned}/${q.total_marks})`);
      // A placed band with quoted evidence is never a 0-mark script: that
      // combination is a reply that dropped the arithmetic, not a blank page.
      check(q.marks_earned > 0, `a band placement carries marks (${q.marks_earned}/${q.total_marks} in ${q.band})`);
      check(criteria.every((c) => c.marks_awarded <= c.marks_available), "no criterion awarded above its own maximum");
      check(criteria.every((c) => String(c.name || "").trim().length > 0), "every criterion is named");
      check(criteria.every((c) => String(c.band || "").trim().length > 0), "every criterion carries a band label",
        criteria.map((c) => c.band).join(" / "));
      check(criteria.every((c) => String(c.evidence || "").trim().length > 0),
        "every placement quotes the student's writing", String(criteria[0]?.evidence ?? "").slice(0, 60));
      check(criteria.every((c) => String(c.descriptor || "").trim().length > 0), "every criterion quotes its descriptor");
      check(Boolean(String(q.band ?? "").trim()), "the task has a question-level band", String(q.band));

      // ── 2. the checklist the panel renders is criteria, not mark points ──
      const points = q.mark_points ?? [];
      check(points.length === criteria.length, "one checklist entry per criterion", `${points.length}/${criteria.length}`);
      const labels = points.map((p) => String(p.point));
      check(labels.every((l) => !/^(M|A|B)\d+\b/.test(l.trim())), "no M1/A1/B1 marking language on a writing task",
        labels[0]?.slice(0, 60));
      check(labels.some((l) => /band/i.test(l)), "the checklist names the band", labels.find((l) => /band/i.test(l))?.slice(0, 70));
      check(points.some((p) => p.verdict === "MISS") || q.marks_earned === q.total_marks,
        "a lost band mark is a MISS a student can claim", `${points.filter((p) => p.verdict === "MISS").length} MISS`);
    }

    console.log("\n  band placement:");
    for (const q of banded) {
      console.log(`    ${q.marks_earned}/${q.total_marks}  ${q.band}  ${String(q.question).slice(0, 56)}`);
      for (const c of q.criteria ?? []) {
        console.log(`      ${c.name} — ${c.band} ${c.marks_awarded}/${c.marks_available}`);
        console.log(`        ${String(c.descriptor).slice(0, 96)}`);
        console.log(`        evidence: ${String(c.evidence).slice(0, 96)}`);
        console.log(`        next:     ${String(c.next_step).slice(0, 96)}`);
      }
    }

    // ── 3. the lost band still feeds the review queue ─────────────────────
    const queue = marked.review_queue ?? {};
    const anyMiss = banded.some((q) => (q.mark_points ?? []).some((p) => p.verdict === "MISS"));
    check(!anyMiss || (queue.enqueued_cards ?? 0) > 0, "a lost band mark queues review cards", `enqueued_cards=${queue.enqueued_cards}`);
    check((queue.focus_topics ?? []).includes(topic.name), "response names the paper's topic", JSON.stringify(queue.focus_topics));

    // ── 4. what the student's own row stored ──────────────────────────────
    const { data: stored } = await admin
      .from("ai_correction").select("id, corrected_papers, overall_grade")
      .eq("user_id", uid).order("created_at", { ascending: false }).limit(1).maybeSingle();
    const first = stored?.corrected_papers?.[0];
    check(first?.marking_mode === "band", "the stored marking keeps the band mode", String(first?.marking_mode));
    check(Array.isArray(first?.criteria) && first.criteria.length > 0, "the stored marking keeps its criteria");
    const { data: audit } = await admin
      .from("ai_audit_log").select("id, action, model").eq("user_id", uid).eq("action", "paper_correction").limit(1).maybeSingle();
    check(Boolean(audit), "the marking is audit-logged", String(audit?.model ?? ""));
  } finally {
    const { data: nowCards } = await admin.from("flashcard_sets").select("id, flashcards(id)")
      .eq("topic_id", topic.id).eq("title", setTitle).maybeSingle();
    const made = (nowCards?.flashcards ?? []).map((c) => c.id).filter((id) => !preCardIds.has(id));
    if (made.length > 0) await admin.from("flashcards").delete().in("id", made);
    if (!preSet && nowCards?.id) await admin.from("flashcard_sets").delete().eq("id", nowCards.id);

    const { error: delErr } = await admin.auth.admin.deleteUser(uid);
    if (delErr) console.error(`WARNING: cleanup failed for ${email}: ${delErr.message}`);
    else console.log(`\ncleanup: removed ${made.length} card(s)${preSet ? "" : ", the set"} and the throwaway account`);
  }

  console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error("PROBE ERROR:", e.message); process.exit(1); });
