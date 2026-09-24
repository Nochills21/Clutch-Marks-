// Weekly parent digest: per linked child, quiz scores for the last 7 days and
// the weakest topics (by accuracy), plus practice/lesson activity. Invoked by
// pg_cron every Monday 07:00 UTC via pg_net with a shared secret
// (x-digest-secret, stored in private.app_secrets alongside the welcome one),
// or manually by an admin. Sends via Resend when RESEND_API_KEY is set;
// otherwise returns what would have been sent (dry-run mode for testing).
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = Deno.env.get("SITE_URL") ?? "https://clutch-marks.lovable.app";
const FROM = Deno.env.get("WELCOME_FROM_EMAIL") ?? "Clutch Marks <onboarding@resend.dev>";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type ChildRow = {
  student_id: string;
  full_name: string | null;
  quizzes: number;
  avg_score: number | null; // 0..100
  lessons_done: number;
  practice_done: number;
  weak_topics: { name: string; pct: number; n: number }[];
};

async function buildChildReport(admin: ReturnType<typeof createClient>, studentId: string): Promise<ChildRow | null> {
  const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();

  const { data: prof } = await admin
    .from("profiles").select("full_name").eq("user_id", studentId).single();

  // Weekly quiz attempts + their per-question correctness from answers jsonb
  const { data: attempts } = await admin
    .from("quiz_attempts")
    .select("score, total_questions, answers, quiz_id")
    .eq("user_id", studentId)
    .gte("created_at", since);

  // Topic accuracy: join this week's answered questions to their topics
  const questionIds: string[] = [];
  for (const a of attempts ?? []) {
    const ans = Array.isArray(a.answers) ? a.answers : [];
    for (const x of ans as { question_id?: string; selected?: number }[]) {
      if (x?.question_id) questionIds.push(x.question_id);
    }
  }

  const topicAccuracy = new Map<string, { correct: number; n: number }>();
  if (questionIds.length > 0) {
    const { data: qs } = await admin
      .from("questions")
      .select("id, correct_option, quizzes(topic_id, topics(name))")
      .in("id", questionIds);
    const byId = new Map((qs ?? []).map((q) => [q.id, q]));
    for (const a of attempts ?? []) {
      const ans = Array.isArray(a.answers) ? a.answers : [];
      for (const x of ans as { question_id?: string; selected?: number }[]) {
        const q = x?.question_id ? byId.get(x.question_id) : undefined;
        if (!q) continue;
        const quiz = Array.isArray(q.quizzes) ? q.quizzes[0] : q.quizzes;
        const topic = quiz?.topics;
        const name = (Array.isArray(topic) ? topic[0]?.name : topic?.name) ?? "General";
        const t = topicAccuracy.get(name) ?? { correct: 0, n: 0 };
        t.n += 1;
        if (x.selected === q.correct_option) t.correct += 1;
        topicAccuracy.set(name, t);
      }
    }
  }

  const weak_topics = [...topicAccuracy.entries()]
    .map(([name, t]) => ({ name, pct: Math.round((t.correct / t.n) * 100), n: t.n }))
    .filter((t) => t.pct < 70)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3);

  const { count: lessons_done } = await admin
    .from("lesson_progress").select("*", { count: "exact", head: true })
    .eq("user_id", studentId).eq("completed", true).gte("completed_at", since);

  const { count: practice_done } = await admin
    .from("practice_attempts").select("*", { count: "exact", head: true })
    .eq("user_id", studentId).gte("created_at", since);

  const scored = (attempts ?? []).filter((a) => (a.total_questions ?? 0) > 0);
  const avg_score = scored.length
    ? Math.round(scored.reduce((s, a) => s + (a.score / a.total_questions) * 100, 0) / scored.length)
    : null;

  return {
    student_id: studentId,
    full_name: prof?.full_name ?? null,
    quizzes: scored.length,
    avg_score,
    lessons_done: lessons_done ?? 0,
    practice_done: practice_done ?? 0,
    weak_topics,
  };
}

function digestHtml(parentName: string, children: ChildRow[]): string {
  const first = (parentName || "").split(" ")[0] || "there";
  const sections = children.map((c) => {
    const name = (c.full_name || "Your child").split(" ")[0];
    const scoreLine = c.avg_score !== null
      ? `<strong>${c.avg_score}%</strong> average across <strong>${c.quizzes}</strong> quiz${c.quizzes === 1 ? "" : "zes"}`
      : "no quizzes yet this week";
    const activity = `📘 ${c.lessons_done} lesson${c.lessons_done === 1 ? "" : "s"} · ✏️ ${c.practice_done} practice question${c.practice_done === 1 ? "" : "s"}`;
    const weak = c.weak_topics.length
      ? `<div style="margin-top:8px"><span style="color:#b91c1c;font-weight:600">Needs work:</span> ${c.weak_topics
          .map((t) => `${t.name} (${t.pct}%)`).join(", ")}</div>`
      : "";
    return `
    <div style="border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:12px 0">
      <h3 style="margin:0 0 6px;color:#1a1a2e">${name}</h3>
      <p style="margin:0">${scoreLine}</p>
      <p style="margin:4px 0 0;color:#6b7280;font-size:14px">${activity}</p>
      ${weak}
      <p style="margin:10px 0 0">
        <a href="${SITE_URL}/lessons" style="color:#5b21b6;font-weight:600">Help them revise →</a>
      </p>
    </div>`;
  }).join("");

  return `
  <div style="font-family:Segoe UI,Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1a1a2e">
    <h2 style="color:#5b21b6">${first}, here's this week's progress 📊</h2>
    ${sections || "<p>No linked children yet.</p>"}
    <p style="color:#6b7280;font-size:13px;margin-top:20px">You get this summary every Monday. Encourage a streak — daily practice is what moves grades.</p>
  </div>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

    const expected = Deno.env.get("DIGEST_SECRET");
    const provided = req.headers.get("x-digest-secret");
    if (!expected || provided !== expected) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { dryRun } = await req.json().catch(() => ({ dryRun: false })) as { dryRun?: boolean };

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    // Every parent with at least one linked child.
    const { data: links, error: linksErr } = await admin
      .from("parent_student_links").select("parent_id, student_id");
    if (linksErr) throw new Error(linksErr.message);
    if (!links || links.length === 0) return new Response(JSON.stringify({ sent: 0, reason: "no links" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const byParent = new Map<string, string[]>();
    for (const l of links) {
      byParent.set(l.parent_id, [...(byParent.get(l.parent_id) ?? []), l.student_id]);
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    const results: { parent: string; ok: boolean; skipped?: boolean; error?: string }[] = [];

    for (const [parentId, studentIds] of byParent) {
      const { data: prof } = await admin
        .from("profiles").select("email, full_name").eq("user_id", parentId).single();
      if (!prof?.email) continue;

      const children: ChildRow[] = [];
      for (const sid of studentIds) {
        const c = await buildChildReport(admin, sid);
        if (c) children.push(c);
      }

      if (apiKey && !dryRun) {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: FROM,
            to: [prof.email],
            subject: "Your child's weekly Clutch Marks progress 📊",
            html: digestHtml(prof.full_name, children),
          }),
        });
        results.push({ parent: prof.email, ok: res.ok, error: res.ok ? undefined : (await res.text()).slice(0, 200) });
      } else {
        // Dry-run (or no API key): return what would have been sent so callers can verify.
        results.push({ parent: prof.email, ok: true, skipped: true, preview: digestHtml(prof.full_name, children), children } as never);
      }
    }

    return new Response(JSON.stringify({ sent: results.filter((r) => r.ok && !r.skipped).length, results }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("weekly-digest error:", e instanceof Error ? e.message : e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
