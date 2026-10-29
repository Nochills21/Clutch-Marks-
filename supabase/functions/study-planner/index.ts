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
    const body = await req.json();
    const clamp = (v: unknown, max = 2000) => typeof v === "string" ? v.slice(0, max) : "";
    const quizPerformance = clamp(body.quizPerformance);
    const upcomingHomework = clamp(body.upcomingHomework);
    const weakTopics = clamp(body.weakTopics);
    const targetExamDate = clamp(body.targetExamDate, 64);
    const hoursPerWeek = Number.isFinite(body.hoursPerWeek) ? Math.min(80, Math.max(1, Number(body.hoursPerWeek))) : 5;
    const subjectLevelId = body.subjectLevelId ?? null;

    // --- Provider selection ---
    // Gemini is the default — the same key and model ai-correction marks with.
    // AI_PROVIDER=cloudflare keeps the Workers AI path; with neither key set the
    // deterministic plan below is served instead.
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") || "gemini-3.5-flash-lite";
    const CLOUDFLARE_API_KEY = Deno.env.get("CLOUDFLARE_API_KEY");
    const CLOUDFLARE_ACCOUNT_ID = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
    const PROVIDER = Deno.env.get("AI_PROVIDER") || "gemini";

    const systemPrompt = `You are an expert tutor and study planner for Cambridge IGCSE (Mathematics 0580, Physics 0625, Computer Science 0478), Edexcel International AS/A Level (Mathematics, Physics, Chemistry, Biology) and Cambridge AS/A Level Computer Science (9618).
Generate a personalized, week-by-week revision schedule for a student based on their performance, upcoming deadlines, and available study time.

Format your response in clean markdown with:
- A short overview paragraph
- A week-by-week breakdown using ## headings (e.g., ## Week 1)
- For each week: bullet points with specific topics, recommended activities (lessons, quizzes, flashcards, past papers), and estimated time
- A final "## Tips" section with 3-5 study strategies tailored to their weak areas

Markdown hygiene (the renderer takes these literally, so get them right):
- One marker run per heading line: write "## Week 1", never "### ## Week 1"
- Never use === or --- underlines beneath headings
- Bullets use a hyphen only (never * or +); nest with two spaces per level
- Bold for emphasis with double asterisks; never reveal model names or ids

Be specific, actionable, and motivating. Reference real syllabus topics for the student's subjects and board (Cambridge for IGCSE and Computer Science; Edexcel International for AS/A2 Maths, Physics, Chemistry and Biology) (e.g. quadratics, circular measure, data representation, thermal physics).`;

    const userPrompt = `Create a study plan with these inputs:

**Target exam date:** ${targetExamDate || "Not specified"}
**Available study time:** ${hoursPerWeek || 5} hours per week
**Recent quiz performance:** ${quizPerformance || "No quiz data yet"}
**Upcoming homework deadlines:** ${upcomingHomework || "None"}
**Topics needing focus:** ${weakTopics || "Not identified yet — recommend a balanced review"}
**Subject:** ${subjectLevelId ? "IGCSE / AS / A-Level (see subject context)" : "General"}

Build a realistic schedule that prioritizes weak areas while covering the broader syllabus for their subjects.`;

    let plan: string;
    let model: string;
    let costCents = 0;

    if (!GEMINI_API_KEY && !CLOUDFLARE_API_KEY) {
      // Graceful fallback: build a deterministic week-by-week plan from the same inputs
      const weeks = Math.max(2, Math.min(12, Math.ceil(28 / Math.max(1, hoursPerWeek))));
      const focus = weakTopics
        ? weakTopics.split(/[;\n]/).map((s) => s.trim()).filter(Boolean).slice(0, 5)
        : ["a balanced review of all your subjects"];
      const lines: string[] = [
        `# Your ${weeks}-week study plan`,
        ``,
        `Target: ${targetExamDate || "no exam date set"} · ${hoursPerWeek} h/week. Generated offline (AI planner not configured) — still personalised to your quiz results.`,
        ``,
      ];
      for (let w = 1; w <= weeks; w += 1) {
        const topic = focus[(w - 1) % focus.length];
        lines.push(`## Week ${w}`, `- Focus topic: ${topic}`, `- 2 lessons + 1 quiz on the focus topic`, `- 1 set of flashcards on the topics you missed last week`, `- 1 past-paper section under timed conditions`, ``);
      }
      lines.push(`## Tips`, `- Do quizzes before reading notes — the misses tell you what to study.`, `- Review last week's incorrect questions every Monday.`, `- Keep sessions under 45 minutes and log them in the planner.`);
      plan = lines.join("\n");
      model = "offline-fallback";
    } else if (PROVIDER === "cloudflare" || !GEMINI_API_KEY) {
      if (!CLOUDFLARE_API_KEY || !CLOUDFLARE_ACCOUNT_ID) {
        return new Response(
          JSON.stringify({ error: "CLOUDFLARE_API_KEY and CLOUDFLARE_ACCOUNT_ID are required for Cloudflare AI" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instruct",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 2048,
        }),
      });
      if (!res.ok) {
        if (res.status === 429) {
          return new Response(JSON.stringify({ error: "Rate limit reached, please try again shortly." }), {
            status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const t = await res.text();
        console.error("Cloudflare AI error:", res.status, t);
        return new Response(JSON.stringify({ error: "Cloudflare AI gateway error" }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const data = await res.json();
      plan = data.choices?.[0]?.message?.content ?? "";
      model = data.model ?? "unknown";
      costCents = data.costCents ?? 0;
    } else {
      // Gemini, through the generativelanguage REST API. The key travels in the
      // x-goog-api-key header, never in the URL, so it cannot land in an access log.
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 2048 },
        }),
      });
      if (!res.ok) {
        if (res.status === 429) {
          return new Response(JSON.stringify({ error: "Rate limit reached, please try again shortly." }), {
            status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const t = await res.text();
        console.error("Gemini error:", res.status, t);
        return new Response(JSON.stringify({ error: "AI gateway error" }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const data = await res.json();
      const parts: Array<{ text?: unknown }> = Array.isArray(data?.candidates?.[0]?.content?.parts)
        ? data.candidates[0].content.parts
        : [];
      plan = parts.map((p) => String(p?.text ?? "")).join("");
      model = GEMINI_MODEL;
      costCents = 0;
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

// Without this the function deploys ACTIVE but is never dispatched: only
// `handler` is exported, so invocations hang until the platform kills them.
// (Same pattern as ai-correction.)
Deno.serve(handler);
