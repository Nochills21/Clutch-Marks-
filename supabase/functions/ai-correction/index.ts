// AI paper auto-correction worker.
// - Fetches the student's subject-level & syllabus context.
// - Calls an LLM via @cloudflare/workers-types (Cloudflare AI) or a
//   Lovable-compatible OpenAI endpoint.
// - Returns a structured mark-scheme breakdown + per-question feedback.
// - Audit-logs the correction to `ai_audit_log`.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Optional: free override to switch providers without redeploying env vars.
const PROVIDER = Deno.env.get("AI_PROVIDER") || "cloudflare";

// Cloudflare Workers AI
async function callCloudflareAI(
  model: string,
  prompt: string,
  system: string,
): Promise<string> {
  const apiKey = Deno.env.get("CLOUDFLARE_API_KEY");
  if (!apiKey) throw new Error("CLOUDFLARE_API_KEY not set");
  const res = await fetch("https://api.cloudflare.com/client/v4/accounts/" +
    Deno.env.get("CLOUDFLARE_ACCOUNT_ID") + "/ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
        max_tokens: 2048,
      }),
    });
  if (!res.ok) throw new Error(`Cloudflare AI error: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

// Lovable / OpenAI-compatible fallback
async function callOpenAiCompat(
  model: string,
  prompt: string,
  system: string,
): Promise<string> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("OPENAI_API_KEY not set");
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      max_tokens: 2048,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

interface CorrectedPaper {
  question: string;
  original_answer: string;
  correct_answer: string;
  marks_earned: number;
  total_marks: number;
  feedback: string;
  grade: number;
  comment: string;
  watermark: string;
  audit_ref: string;
}

const SYSTEM_PROMPT = `You are an expert Cambridge IGCSE / AS / A-Level examiner for Mathematics (0580/9709), Physics (0625/9702) and Computer Science (0478/9618).

Read the student's answer, compare it against the mark scheme, and return a structured JSON array with one object per question.

Each object MUST have exactly these keys:
- question: the question text
- original_answer: the student's submission
- correct_answer: the examiner's model answer
- marks_earned: integer marks awarded
- total_marks: total marks for the question
- feedback: 1-2 sentences on what was right / what to fix
- grade: overall percentage (0-100)
- comment: 1-2 sentences on the grade

Rules:
- Do NOT invent marks; only award what the mark scheme clearly supports.
- Be kind but precise; the tone should be a tutor giving feedback, not a robot.
- Fill in correct_answer from the mark scheme even if the student got nothing.
- Never output anything except the JSON array.`;

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

    // Approval gate
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
    const { paper: rawPaper, model, studentName, examSession } = body;

    if (!rawPaper) {
      return new Response(
        JSON.stringify({ error: "Missing 'paper' field" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Extract a per-subject-level context. The client pages pass a `subjectLevelId`.
    const subjectLevelId = body.subjectLevelId ?? null;

    // Optional paper context: the paper-scoped practice flow names the exact
    // past paper being sat so marking is anchored to that paper, not a generic
    // set of answers. Unknown to older clients, so it is entirely optional.
    const paperRef = (body.paperRef ?? null) as
      | { title?: string; session?: string | null; year?: number | null; paperNumber?: string | null; markSchemeUrl?: string | null }
      | null;

    // Build rubric + mark-scheme text from the lesson/syllabus tables when available.
    // Fall back to a generic prompt if no context is present.
    let rubric = "";
    if (subjectLevelId) {
      const { data: subjects } = await supabase
        .from("subject_levels")
        .select("subject_id, level")
        .eq("id", subjectLevelId)
        .single();
      const { data: subjectsList } = await supabase
        .from("subjects")
        .select("id, name, slug, icon, color")
        .in("id", subjects ? [subjects.subject_id] : []);
      const subject = subjectsList?.[0];
      rubric = `
## Subject context
- Subject: ${subject?.name ?? "IGCSE / AS / A-Level"}
- Level: ${subjects?.level ?? ""}
- Slug: ${subject?.slug ?? ""}

Mark scheme style:
- Award marks only for correct methods and final answers.
- Partial credit for correct steps even if the final answer is wrong.
- Deduct marks with a one-line explanation.`;

      // Include the student's latest self-assessment if any
      const { data: latestAttempt } = await admin
        .from("content_feedback")
        .select("comment, rating")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (latestAttempt?.comment) {
        rubric += `
## Student's own notes
- They flagged: ${latestAttempt.comment}`;
      }
    }

    if (paperRef && (paperRef.title || paperRef.paperNumber)) {
      const descriptor = [
        paperRef.title,
        paperRef.session ?? undefined,
        paperRef.year ? String(paperRef.year) : undefined,
        paperRef.paperNumber ?? undefined,
      ].filter(Boolean).join(" · ");
      rubric += `
## Paper being sat
- ${descriptor}
- Mark the student's answers against this paper's mark scheme for the questions they attempted.`;
    }

    // Assembly per-question input
    // The student pastes a list of "question: answer" pairs. We format it for the LLM.
    const paperText = Array.isArray(rawPaper)
      ? rawPaper.map((p: any) =>
        `Q: ${p.question || "Question " + (p.idx ?? "")}\nStudent answer: ${p.answer || p.text || ""}`
      ).join("\n\n---)\n\n")
      : rawPaper;

    const fullPrompt = `${rubric}

## The paper to correct
${paperText}

## Instructions
Return ONLY a JSON array. No markdown fences, no explanations outside the JSON.`;

    // Prompt + model selection
    const modelName = model || "llama-3.1-8b-instruct";
    let llmOutput: string;
    if (PROVIDER === "cloudflare") {
      llmOutput = await callCloudflareAI(
        modelName,
        fullPrompt,
        SYSTEM_PROMPT,
      );
    } else {
      llmOutput = await callOpenAiCompat(
        modelName,
        fullPrompt,
        SYSTEM_PROMPT,
      );
    }

    // Normalize the LLM response to JSON. Since the prompt says "no markdown fences",
    // we just try JSON.parse. If the LLM added ``
