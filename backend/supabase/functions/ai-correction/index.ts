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

// Workers AI retires models; a stale or bare name is rejected outright
// ("No such model"). `llama-3.1-8b-instruct` was deprecated on 2026-05-30 and
// older clients still send its short name, so map known names and default.
const MODEL_ALIASES: Record<string, string> = {
  "llama-3.1-8b-instruct": "@cf/meta/llama-3.1-8b-instruct-fp8",
  "@cf/meta/llama-3.1-8b-instruct": "@cf/meta/llama-3.1-8b-instruct-fp8",
  "llama-3.1-8b-instruct-fp8": "@cf/meta/llama-3.1-8b-instruct-fp8",
  "llama-3.3-70b-instruct-fp8-fast": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
};
const DEFAULT_CF_MODEL = Deno.env.get("CLOUDFLARE_MODEL") ||
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

/** Accept a full `@cf/...` id, map a legacy/short name, else fall back. */
function resolveModel(raw: unknown): string {
  if (typeof raw === "string" && raw.trim()) {
    const name = raw.trim();
    if (MODEL_ALIASES[name]) return MODEL_ALIASES[name];
    if (name.startsWith("@cf/")) return name;
  }
  return DEFAULT_CF_MODEL;
}

// Cloudflare Workers AI.
// Uses `/ai/run/<model>` (the standard envelope) rather than the
// OpenAI-compatible route, and returns the raw `response`: some models answer
// with a JSON string while others (e.g. llama-3.3-70b) hand back an
// already-parsed object, so both shapes must be tolerated downstream.
async function callCloudflareAI(
  model: string,
  prompt: string,
  system: string,
): Promise<unknown> {
  const apiKey = Deno.env.get("CLOUDFLARE_API_KEY");
  const accountId = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
  if (!apiKey) throw new Error("CLOUDFLARE_API_KEY not set");
  if (!accountId) throw new Error("CLOUDFLARE_ACCOUNT_ID not set");
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
        max_tokens: 2048,
      }),
    },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Cloudflare AI error: ${res.status} ${detail.slice(0, 200)}`);
  }
  const data = await res.json();
  if (data.success === false) {
    throw new Error(
      `Cloudflare AI error: ${JSON.stringify(data.errors ?? data).slice(0, 200)}`,
    );
  }
  return data.result?.response ?? "";
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

/**
 * Normalise the model's reply into JSON, tolerating markdown fences, a JSON
 * string, or an already-parsed array/object (Workers AI models differ).
 */
function parseModelJson(text: unknown): unknown {
  if (typeof text === "object" && text !== null) return text;
  const cleaned = String(text ?? "")
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    // Fall back to the outermost JSON array found in the reply.
    const start = cleaned.indexOf("[");
    const end = cleaned.lastIndexOf("]");
    if (start !== -1 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error("The marking model did not return valid JSON.");
  }
}

/** Stable hash of the submitted paper, for the audit log. */
async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

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
      ).join("\n\n---\n\n")
      : rawPaper;

    const fullPrompt = `${rubric}

## The paper to correct
${paperText}

## Instructions
Return ONLY a JSON array. No markdown fences, no explanations outside the JSON.`;

    // Prompt + model selection. The client may still send the retired
    // `llama-3.1-8b-instruct`; resolve it per provider so the request is valid.
    const requestedModel = typeof model === "string" && model.trim()
      ? model.trim()
      : "";
    const modelName = PROVIDER === "cloudflare"
      ? resolveModel(requestedModel)
      : (requestedModel || "gpt-4o-mini");
    let llmOutput: unknown;
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
    // parseModelJson strips a fence anyway and retries once before giving up.
    const parsed = parseModelJson(llmOutput);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error("The marking model returned no usable results. Please try again.");
    }

    const auditRef = crypto.randomUUID();

    const corrected: CorrectedPaper[] = parsed.map((raw: any, idx: number) => {
      const marksEarned = Number(raw?.marks_earned ?? 0) || 0;
      const totalMarks = Number(raw?.total_marks ?? 0) || 0;
      return {
        question: String(raw?.question ?? `Question ${idx + 1}`),
        original_answer: String(raw?.original_answer ?? ""),
        correct_answer: String(raw?.correct_answer ?? ""),
        marks_earned: marksEarned,
        total_marks: totalMarks,
        feedback: String(raw?.feedback ?? ""),
        // Recompute the grade from the marks so a stray model value can never
        // report more than 100%.
        grade: totalMarks > 0 ? Math.round((marksEarned / totalMarks) * 100) : 0,
        comment: String(raw?.comment ?? ""),
        watermark: `Clutch Marks · AI-marked · ${auditRef.slice(0, 8)}`,
        audit_ref: auditRef,
      };
    });

    const totalPossible = corrected.reduce((s, q) => s + q.total_marks, 0);
    const totalEarned = corrected.reduce((s, q) => s + q.marks_earned, 0);
    const overallGrade = totalPossible > 0
      ? Math.round((totalEarned / totalPossible) * 100)
      : 0;

    // Audit log is written with the service role: students never write here.
    const inputHash = await sha256Hex(
      typeof paperText === "string" ? paperText : JSON.stringify(paperText),
    );
    const { error: auditError } = await admin.from("ai_audit_log").insert({
      user_id: user.id,
      action: "paper_correction",
      input_hash: inputHash,
      model: modelName,
      provider: PROVIDER,
      output_preview: JSON.stringify(corrected).slice(0, 2000),
      grade: overallGrade,
      corrected_paper: corrected,
      cost_cents: 0,
    });
    // A failed audit write must not lose the student's marking.
    if (auditError) console.error("ai-correction audit log failed:", auditError.message);

    return new Response(
      JSON.stringify({
        corrected_papers: corrected,
        overall_grade: overallGrade,
        total_possible: totalPossible,
        total_earned: totalEarned,
        audit_ref: auditRef,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    console.error("ai-correction failed:", message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
}

Deno.serve(handler);
