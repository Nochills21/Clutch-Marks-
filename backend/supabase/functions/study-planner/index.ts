import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Approval gate: pending accounts cannot consume AI credits
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: roleRow } = await admin
      .from("user_roles")
      .select("is_approved, role")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!roleRow?.is_approved && roleRow?.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Account not yet approved" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();
    const clamp = (v: unknown, max = 2000) => typeof v === "string" ? v.slice(0, max) : "";
    const quizPerformance = clamp(body.quizPerformance);
    const upcomingHomework = clamp(body.upcomingHomework);
    const weakTopics = clamp(body.weakTopics);
    const targetExamDate = clamp(body.targetExamDate, 64);
    const hoursPerWeek = Number.isFinite(body.hoursPerWeek) ? Math.min(80, Math.max(1, Number(body.hoursPerWeek))) : 5;
    const subjectLevelId = body.subjectLevelId ?? null;

    // --- Provider selection ---
    // Prefer whichever provider is actually configured rather than always
    // assuming Lovable: Cloudflare Workers AI (free tier, and what the marking
    // worker uses) when its keys are present, then the Lovable gateway, else the
    // deterministic offline planner further down.
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const CLOUDFLARE_API_KEY = Deno.env.get("CLOUDFLARE_API_KEY");
    const CLOUDFLARE_ACCOUNT_ID = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
    const HAS_CLOUDFLARE = Boolean(CLOUDFLARE_API_KEY && CLOUDFLARE_ACCOUNT_ID);
    const PROVIDER = Deno.env.get("AI_PROVIDER") ||
      (HAS_CLOUDFLARE ? "cloudflare" : LOVABLE_API_KEY ? "lovable" : "offline");

    // Workers AI retires models and rejects unknown names outright; the old
    // `llama-3.1-8b-instruct` was deprecated on 2026-05-30.
    const CF_MODEL_ALIASES: Record<string, string> = {
      "llama-3.1-8b-instruct": "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-3.1-8b-instruct": "@cf/meta/llama-3.1-8b-instruct-fp8",
      "llama-3.1-8b-instruct-fp8": "@cf/meta/llama-3.1-8b-instruct-fp8",
    };
    const cfModelRaw = (Deno.env.get("CLOUDFLARE_MODEL") || "").trim();
    const CF_MODEL = CF_MODEL_ALIASES[cfModelRaw] ||
      (cfModelRaw.startsWith("@cf/") ? cfModelRaw : "@cf/meta/llama-3.1-8b-instruct-fp8");

    const systemPrompt = `You are an expert Cambridge IGCSE / AS / A-Level tutor and study planner for Mathematics (0580/9709), Physics (0625/9702) and Computer Science (0478/9618).
Generate a personalized, week-by-week revision schedule for a student based on their performance, upcoming deadlines, and available study time.

Format your response in clean markdown with:
- A short overview paragraph
- A week-by-week breakdown using ## headings (e.g., ## Week 1)
- For each week: bullet points with specific topics, recommended activities (lessons, quizzes, flashcards, past papers), and estimated time
- A final "## Tips" section with 3-5 study strategies tailored to their weak areas

Be specific, actionable, and motivating. Reference real Cambridge syllabus topics for the student's subjects (e.g. quadratics, circular measure, data representation, thermal physics).`;

    const userPrompt = `Create a study plan with these inputs:

**Target exam date:** ${targetExamDate || "Not specified"}
**Available study time:** ${hoursPerWeek || 5} hours per week
**Recent quiz performance:** ${quizPerformance || "No quiz data yet"}
**Upcoming homework deadlines:** ${upcomingHomework || "None"}
**Topics needing focus:** ${weakTopics || "Not identified yet — recommend a balanced review"}
**Subject:** ${subjectLevelId ? "IGCSE / AS / A-Level (see subject context)" : "General"}

Build a realistic schedule that prioritizes weak areas while covering the broader Cambridge syllabus for their subjects.`;

    let plan: string;
    let model: string;
    let costCents = 0;

    // Deterministic fallback, shared by "no provider configured" and
    // "provider failed or timed out" — a student must always get a usable plan.
    const buildOfflinePlan = (reason: string) => {
      const weeks = Math.max(2, Math.min(12, Math.ceil(28 / Math.max(1, hoursPerWeek))));
      const focus = weakTopics
        ? weakTopics.split(/[;\n]/).map((s) => s.trim()).filter(Boolean).slice(0, 5)
        : ["a balanced review of all your subjects"];
      const lines: string[] = [
        `# Your ${weeks}-week study plan`,
        ``,
        `Target: ${targetExamDate || "no exam date set"} · ${hoursPerWeek} h/week. ${reason}`,
        ``,
      ];
      for (let w = 1; w <= weeks; w += 1) {
        const topic = focus[(w - 1) % focus.length];
        lines.push(`## Week ${w}`, `- Focus topic: ${topic}`, `- 2 lessons + 1 quiz on the focus topic`, `- 1 set of flashcards on the topics you missed last week`, `- 1 past-paper section under timed conditions`, ``);
      }
      lines.push(`## Tips`, `- Do quizzes before reading notes — the misses tell you what to study.`, `- Review last week's incorrect questions every Monday.`, `- Keep sessions under 45 minutes and log them in the planner.`);
      return lines.join("\n");
    };

    if (!LOVABLE_API_KEY && !HAS_CLOUDFLARE) {
      // Graceful fallback: build a deterministic week-by-week plan from the same inputs
      plan = buildOfflinePlan("Generated offline (AI planner not configured) — still personalised to your quiz results.");
      model = "offline-fallback";
    } else if (PROVIDER === "cloudflare") {
      if (!CLOUDFLARE_API_KEY || !CLOUDFLARE_ACCOUNT_ID) {
        return new Response(
          JSON.stringify({ error: "CLOUDFLARE_API_KEY and CLOUDFLARE_ACCOUNT_ID are required for Cloudflare AI" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      // Bound the upstream call ourselves. The platform kills the whole worker
      // at ~150s and the browser only ever sees an opaque 504/546, so a slow or
      // queued model must not be allowed to run the invocation into that wall.
      const AI_CALL_TIMEOUT_MS = 90_000;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), AI_CALL_TIMEOUT_MS);
      let aiPlan = "";
      let cfStatus = 0;
      try {
        const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${CF_MODEL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            // A week-by-week plan runs long; 1200 tokens is plenty and keeps
            // generation time well inside the budget above.
            max_tokens: 1200,
          }),
          signal: controller.signal,
        });
        cfStatus = res.status;
        if (res.status === 429) {
          return new Response(JSON.stringify({ error: "Rate limit reached, please try again shortly." }), {
            status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        if (res.ok) {
          const data = await res.json();
          // `/ai/run` answers with the standard envelope; `response` may be a
          // string or (for some models) an already-parsed object.
          const out = data.result?.response ?? "";
          aiPlan = typeof out === "string" ? out : JSON.stringify(out, null, 2);
        } else {
          console.error("Cloudflare AI error:", res.status, (await res.text()).slice(0, 300));
        }
      } catch (e) {
        console.error("Cloudflare AI call failed:", e instanceof Error ? e.message : String(e));
      } finally {
        clearTimeout(timer);
      }

      if (aiPlan.trim()) {
        plan = aiPlan;
        model = CF_MODEL;
        costCents = 0;
      } else {
        // Never leave the student with a 504: fall back to the deterministic
        // plan and say so, rather than pretending nothing happened.
        plan = buildOfflinePlan(
          cfStatus ? `Generated offline (the AI planner returned HTTP ${cfStatus}) — still personalised to your quiz results.`
            : "Generated offline (the AI planner did not respond in time) — still personalised to your quiz results.",
        );
        model = "offline-fallback";
      }
    } else {
      // Loable / OpenAI-compatible
      if (!LOVABLE_API_KEY) {
        return new Response(
          JSON.stringify({ error: "LOVABLE_API_KEY is required for AI generation" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });
      if (!res.ok) {
        if (res.status === 429) {
          return new Response(JSON.stringify({ error: "Rate limit reached, please try again shortly." }), {
            status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        if (res.status === 402) {
          return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds to your Lovable AI workspace." }), {
            status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const t = await res.text();
        console.error("AI gateway error:", res.status, t);
        return new Response(JSON.stringify({ error: "AI gateway error" }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const data = await res.json();
      plan = data.choices?.[0]?.message?.content ?? "";
      model = data.model ?? "unknown";
      costCents = data.costCents ?? 0;
    }

    // Persist to study_plans with ai_generated = true
    await admin.from("study_plans").insert({
      user_id: user.id,
      title: `AI Plan – ${targetExamDate || "no date"}`,
      content: plan,
      start_date: null,
      end_date: targetExamDate || null,
      subject_level_id: subjectLevelId || null,
      ai_generated: true,
      ai_model: model,
      created_at: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ plan, model, costCents }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("study-planner error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
}

// The edge runtime only dispatches a function whose entrypoint actually starts a
// server. With a bare `export function handler` the isolate has nothing to
// answer requests with, so every invocation hangs until the platform kills it
// (~150s, surfacing as an opaque 504/546). Every other function in this project
// calls `Deno.serve(...)`; the named export is kept so tests can import it.
Deno.serve(handler);

