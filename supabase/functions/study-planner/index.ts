import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
      return new Response(JSON.stringify({ error: "Account not yet approved" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const clamp = (v: unknown, max = 2000) => typeof v === "string" ? v.slice(0, max) : "";
    const quizPerformance = clamp(body.quizPerformance);
    const upcomingHomework = clamp(body.upcomingHomework);
    const weakTopics = clamp(body.weakTopics);
    const targetExamDate = clamp(body.targetExamDate, 64);
    const hoursPerWeek = Number.isFinite(body.hoursPerWeek) ? Math.min(80, Math.max(1, Number(body.hoursPerWeek))) : 5;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are an expert IGCSE Business Studies tutor and study planner.
Generate a personalized, week-by-week revision schedule for a student based on their performance, upcoming deadlines, and available study time.

Format your response in clean markdown with:
- A short overview paragraph
- A week-by-week breakdown using ## headings (e.g., ## Week 1)
- For each week: bullet points with specific topics, recommended activities (lessons, quizzes, flashcards, past papers), and estimated time
- A final "## Tips" section with 3-5 study strategies tailored to their weak areas

Be specific, actionable, and motivating. Reference IGCSE Business Studies curriculum topics.`;

    const userPrompt = `Create a study plan with these inputs:

**Target exam date:** ${targetExamDate || "Not specified"}
**Available study time:** ${hoursPerWeek || 5} hours per week
**Recent quiz performance:** ${quizPerformance || "No quiz data yet"}
**Upcoming homework deadlines:** ${upcomingHomework || "None"}
**Topics needing focus:** ${weakTopics || "Not identified yet — recommend a balanced review"}

Build a realistic schedule that prioritizes weak areas while covering the broader IGCSE Business Studies syllabus.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached, please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const plan = data.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ plan }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("study-planner error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
