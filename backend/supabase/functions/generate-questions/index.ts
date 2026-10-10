import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);

    const url = Deno.env.get("SUPABASE_URL")!;
    const userClient = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return json({ error: "Unauthorized" }, 401);

    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role, is_approved")
      .eq("user_id", user.id)
      .maybeSingle();
    if (roleRow?.role !== "admin" || !roleRow?.is_approved) {
      return json({ error: "Admins only" }, 403);
    }

    const body = await req.json().catch(() => ({}));
    const topicId: string | undefined = body?.topicId;
    const count = Math.min(25, Math.max(1, Number(body?.count) || 10));
    const difficulty = ["easy", "medium", "hard"].includes(body?.difficulty) ? body.difficulty : "medium";
    if (!topicId || typeof topicId !== "string") return json({ error: "topicId is required" }, 400);

    const { data: topic } = await admin
      .from("topics")
      .select("id, name, description, subject_level_id")
      .eq("id", topicId)
      .maybeSingle();
    if (!topic) return json({ error: "Topic not found" }, 404);

    let subjectName = "General Studies";
    let level = "OL";
    if (topic.subject_level_id) {
      const { data: sl } = await admin
        .from("subject_levels")
        .select("level, subjects(name)")
        .eq("id", topic.subject_level_id)
        .maybeSingle();
      if (sl) {
        level = sl.level;
        subjectName = (sl as any).subjects?.name ?? subjectName;
      }
    }
    const levelLabel = level === "OL" ? "IGCSE" : level === "AS" ? "AS Level" : "A2 Level";

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return json({ error: "AI is not configured" }, 500);

    const prompt = `Create ${count} ${difficulty}-difficulty multiple-choice exam questions for ${levelLabel} ${subjectName}.
Topic: "${topic.name}".${topic.description ? ` Topic notes: ${topic.description}` : ""}

Rules:
- Exactly 4 answer options per question, only one correct.
- Exam-board style wording, unambiguous, syllabus appropriate for ${levelLabel}.
- Include a concise explanation (1-3 sentences) for the correct answer.
- correct_option is the zero-based index of the correct option.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are an expert examiner who writes high-quality multiple-choice questions. Always reply with the requested tool call." },
          { role: "user", content: prompt },
        ],
        tools: [{
          type: "function",
          function: {
            name: "submit_questions",
            description: "Submit the generated multiple-choice questions",
            parameters: {
              type: "object",
              properties: {
                questions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      question_text: { type: "string" },
                      options: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 4 },
                      correct_option: { type: "integer", minimum: 0, maximum: 3 },
                      explanation: { type: "string" },
                    },
                    required: ["question_text", "options", "correct_option", "explanation"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["questions"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "submit_questions" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) return json({ error: "Rate limit reached, please try again shortly." }, 429);
      if (response.status === 402) return json({ error: "AI credits exhausted. Please add credits to your workspace." }, 402);
      console.error("AI gateway error", response.status, await response.text());
      return json({ error: "AI gateway error" }, 500);
    }

    const data = await response.json();
    const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    let parsed: any;
    try {
      parsed = typeof args === "string" ? JSON.parse(args) : args;
    } catch {
      return json({ error: "AI returned an unreadable response" }, 502);
    }

    const generated = (parsed?.questions ?? []).filter((q: any) =>
      q && typeof q.question_text === "string" &&
      Array.isArray(q.options) && q.options.length === 4 &&
      Number.isInteger(q.correct_option) && q.correct_option >= 0 && q.correct_option <= 3
    ).slice(0, count);

    if (generated.length === 0) return json({ error: "The AI did not return any usable questions" }, 502);

    const title = typeof body?.quizTitle === "string" && body.quizTitle.trim()
      ? body.quizTitle.trim().slice(0, 120)
      : `AI Practice — ${topic.name} (${level})`;

    const { data: quiz, error: quizError } = await admin
      .from("quizzes")
      .insert({
        title,
        description: `AI-generated ${difficulty} question set for ${subjectName} ${level}.`,
        topic_id: topic.id,
        is_published: body?.publish === false ? false : true,
      })
      .select("id, title")
      .single();
    if (quizError) throw quizError;

    const rows = generated.map((q: any, i: number) => ({
      quiz_id: quiz.id,
      question_text: String(q.question_text).slice(0, 2000),
      options: q.options.map((o: unknown) => String(o).slice(0, 500)),
      correct_option: q.correct_option,
      explanation: typeof q.explanation === "string" ? q.explanation.slice(0, 1000) : null,
      sort_order: i,
    }));

    const { error: qError } = await admin.from("questions").insert(rows);
    if (qError) throw qError;

    return json({ quizId: quiz.id, title: quiz.title, count: rows.length });
  } catch (e) {
    console.error("generate-questions failed", e);
    return json({ error: "Failed to generate questions" }, 500);
  }
});
