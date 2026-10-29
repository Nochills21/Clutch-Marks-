import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Row shape read from `questions` with the service-role client (untyped).
interface QuizQuestion {
  id: string;
  question_text: string | null;
  options: unknown;
  correct_option: number;
  explanation: string | null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const admin = createClient(supabaseUrl, serviceKey);

    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) throw new Error("Not authenticated");

    const body = await req.json().catch(() => ({}));
    const quizId: string | undefined = body?.quizId;
    const answers: Record<string, number> | undefined = body?.answers;

    if (!quizId || typeof quizId !== "string" || !answers || typeof answers !== "object") {
      return new Response(
        JSON.stringify({ error: "quizId and answers are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify the user has actually attempted this quiz (anti-abuse)
    const { data: attempt } = await admin
      .from("quiz_attempts")
      .select("id")
      .eq("user_id", user.id)
      .eq("quiz_id", quizId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!attempt) {
      return new Response(
        JSON.stringify({ error: "No attempt found for this quiz" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch quiz + questions from DB (NEVER trust client-supplied text)
    const { data: quiz } = await admin
      .from("quizzes")
      .select("id, title, topics(name)")
      .eq("id", quizId)
      .maybeSingle();
    if (!quiz) throw new Error("Quiz not found");

    const { data: questions } = await admin
      .from("questions")
      .select("id, question_text, options, correct_option, explanation")
      .eq("quiz_id", quizId)
      .order("sort_order");

    if (!questions || questions.length === 0) throw new Error("No questions found");

    const wrong = (questions as QuizQuestion[]).filter((q) => {
      const sel = answers[q.id];
      return typeof sel !== "number" || sel !== q.correct_option;
    });
    const totalQuestions = questions.length;
    const correctCount = totalQuestions - wrong.length;

    if (wrong.length === 0) {
      return new Response(
        JSON.stringify({
          feedback:
            "🎉 Perfect score! You answered every question correctly. Keep up the excellent work!",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const questionDetails = wrong
      .map((q, i: number) => {
        const options = Array.isArray(q.options) ? q.options : [];
        const sel = answers[q.id];
        return `Question: "${q.question_text || `Question ${i + 1}`}"
Student answered: "${options[sel] ?? `Option ${sel}`}"
Correct answer: "${options[q.correct_option] ?? `Option ${q.correct_option}`}"
Mark scheme/explanation: "${q.explanation || "No mark scheme provided"}"`;
      })
      .join("\n\n");

    const topicName = (quiz.topics as { name?: string | null } | null)?.name ?? null;

    const prompt = `You are an IGCSE Business Studies tutor. A student just completed the quiz "${quiz.title}"${topicName ? ` on the topic "${topicName}"` : ""}.

They scored ${correctCount}/${totalQuestions}.

Here are the questions they got wrong, along with the mark scheme/explanation for each:

${questionDetails}

Please provide:
1. A brief, encouraging summary of their performance
2. For each wrong answer, explain WHY the correct answer is right using the mark scheme provided, and what misconception might have led to the wrong choice
3. A list of specific IGCSE Business Studies topics they should revise based on their mistakes
4. 2-3 practical study tips for improving in these areas

Keep the tone supportive and educational. Use clear formatting with headings.`;

    // Gemini, through the generativelanguage REST API — the same key and model
    // ai-correction marks with. The key travels in the x-goog-api-key header,
    // never in the URL, so it cannot land in an access log.
    const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") || "gemini-3.5-flash-lite";
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured");

    const aiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: "You are an expert IGCSE Business Studies tutor. Provide detailed, mark-scheme-based feedback on quiz performance. Reference the mark scheme explanations when available. Be encouraging but thorough.",
              },
            ],
          },
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 4096 },
        }),
      }
    );

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "AI is busy right now. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      console.error("Gemini error:", aiResponse.status, await aiResponse.text().catch(() => ""));
      throw new Error("AI analysis failed");
    }

    const aiData = await aiResponse.json();
    const aiParts: Array<{ text?: unknown }> = Array.isArray(aiData?.candidates?.[0]?.content?.parts)
      ? aiData.candidates[0].content.parts
      : [];
    const feedback =
      aiParts.map((p) => String(p?.text ?? "")).join("").trim() || "Unable to generate feedback.";

    return new Response(JSON.stringify({ feedback }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("quiz-feedback error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
