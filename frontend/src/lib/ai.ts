// AI client: thin wrappers around the Supabase Edge workers.
// - Study planner: POST /ai/study-planner
// - Paper auto-correction: POST /ai-correction
// Both workers enforce approval gates + audit logging server-side.

import { supabase } from "@/integrations/supabase/client";
import { AI_TIMEOUT_MS, TIMEOUT_HEADER } from "@/lib/net";

/**
 * AI generation legitimately outlasts a normal request, so these calls raise
 * the ceiling above `DEFAULT_TIMEOUT_MS` instead of being cut off mid-plan.
 */
const aiRequest = { headers: { [TIMEOUT_HEADER]: String(AI_TIMEOUT_MS) } };

export type AiProvider = "cloudflare" | "openai" | "lovable";

export interface AiStudyPlanInput {
  quizPerformance: string;      // e.g. "Quiz: 3/5; Midpaper: 7/10"
  upcomingHomework: string;     // e.g. "Vectors due 2026-09-30"
  weakTopics: string;           // e.g. "Integration, Circular measure"
  targetExamDate: string;       // ISO date
  hoursPerWeek: number;
  subjectLevelId?: string;      // which subject/syllabus to scope the plan to
}

export interface AiStudyPlanOutput {
  plan: string;     // markdown
  model: string;
  costCents: number;
}

export interface CorrectedPaper {
  question: string;
  original_answer: string;
  correct_answer: string;
  marks_earned: number;
  total_marks: number;
  feedback: string;
  grade: number;        // 0-100 per question
  comment: string;
  watermark: string;
  audit_ref: string;
}

export interface AiCorrectionOutput {
  corrected_papers: CorrectedPaper[];
  overall_grade: number;
  total_possible: number;
  total_earned: number;
  audit_ref: string;
}

/**
 * Call the study-planner Edge worker. Falls back to a deterministic
 * offline plan if AI_PROVIDER is unset or the worker returns an error.
 */
export async function callStudyPlanner(
  input: AiStudyPlanInput,
  provider: AiProvider = "cloudflare",
): Promise<AiStudyPlanOutput> {
  // The deployed worker is named `study-planner`. This used to request
  // `ai-study-planner`, which does not exist, so every call 404'd and the
  // planner silently served the offline fallback forever.
  const { data, error } = await supabase.functions.invoke("study-planner", {
    body: input,
    ...aiRequest,
  });
  if (error || !data) {
    // Fallback: build a deterministic plan inline so the planner stays
    // functional even before the worker is configured. Logged so a real outage
    // is distinguishable from the intentional offline plan.
    console.warn("study-planner unavailable, using offline plan:", error?.message ?? "no data");
    return buildFallbackPlan(input);
  }
  if (data.error) {
    return buildFallbackPlan(input);
  }
  return {
    plan: data.plan,
    model: data.model ?? "unknown",
    costCents: data.costCents ?? 0,
  };
}

function buildFallbackPlan(input: AiStudyPlanInput): AiStudyPlanOutput {
  const weeks = Math.max(2, Math.min(12, Math.ceil(28 / Math.max(1, input.hoursPerWeek))));
  const focus = input.weakTopics
    ? input.weakTopics.split(/[;\n]/).map((s) => s.trim()).filter(Boolean).slice(0, 5)
    : ["a balanced review of all your subjects"];
  const lines: string[] = [
    `# Your ${weeks}-week study plan`,
    ``,
    `Target: ${input.targetExamDate || "no exam date set"} · ${input.hoursPerWeek} h/week. Generated offline (AI planner not configured) — still personalised to your quiz results.`,
    ``,
  ];
  for (let w = 1; w <= weeks; w += 1) {
    const topic = focus[(w - 1) % focus.length];
    lines.push(`## Week ${w}`, `- Focus topic: ${topic}`, `- 2 lessons + 1 quiz on the focus topic`, `- 1 set of flashcards on the topics you missed last week`, `- 1 past-paper section under timed conditions`, ``);
  }
  lines.push(`## Tips`, `- Do quizzes before reading notes — the misses tell you what to study.`, `- Review last week's incorrect questions every Monday.`, `- Keep sessions under 45 minutes and log them in the planner.`);
  return { plan: lines.join("\n"), model: "offline-fallback", costCents: 0 };
}

/** Names the exact past paper a correction is scoped to (paper-scoped practice). */
export interface PaperRef {
  id?: string;
  title?: string;
  session?: string | null;
  year?: number | null;
  paperNumber?: string | null;
  markSchemeUrl?: string | null;
}

/**
 * Call the AI paper auto-correction worker.
 *
 * `paperRef` (optional) anchors the marking to one specific past paper, so the
 * paper-scoped practice flow corrects against that paper rather than a generic
 * set of answers. It is ignored by clients that don't send it.
 */
export async function callPaperCorrector(
  paper: string | CorrectedPaperInput[],
  provider: AiProvider = "cloudflare",
  subjectLevelId?: string,
  paperRef?: PaperRef,
): Promise<AiCorrectionOutput> {
  const { data, error } = await supabase.functions.invoke("ai-correction", {
    body: {
      paper,
      subjectLevelId,
      paperRef,
      // No model is pinned here: the worker resolves a current Workers AI model
      // (the old `llama-3.1-8b-instruct` was retired and made every call fail).
      provider,
    },
    ...aiRequest,
  });
  if (error || !data) {
    // Name the worker in the message: this endpoint is a separate deployment and
    // an undeployed function otherwise surfaces only as "non-2xx status code".
    throw new Error(
      `AI marking is unavailable right now (ai-correction): ${error?.message ?? "no data"}`,
    );
  }
  return {
    corrected_papers: data.corrected_papers ?? [],
    overall_grade: data.overall_grade ?? 0,
    total_possible: data.total_possible ?? 0,
    total_earned: data.total_earned ?? 0,
    audit_ref: data.audit_ref ?? "",
  };
}

// Shape for a single question (used by the client to build the array)
export interface CorrectedPaperInput {
  question?: string;
  answer?: string;
  text?: string;
  idx?: number;
}

/**
 * Insert a persisted AI correction row into `ai_correction` (the student
 * who triggered the call is the owner, per the RLS policy).
 */
export async function persistCorrection(
  paperText: string,
  corrected: CorrectedPaper[],
  subjectLevelId: string | undefined,
  model: string,
): Promise<{ id: string }> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  // A failed auth read must not be reported as "Not signed in" — that blamed the
  // student for a request that never landed.
  if (userError) throw userError;
  const user = userData.user;
  if (!user) throw new Error("Not signed in");

  const { data, error } = await (supabase as any)
    .from("ai_correction")
    .insert({
      user_id: user.id,
      subject_level_id: subjectLevelId ?? null,
      paper_text: paperText,
      corrected_papers: corrected,
      overall_grade: corrected.reduce((s, q) => s + q.marks_earned, 0) /
        Math.max(1, corrected.reduce((s, q) => s + q.total_marks, 0)) * 100,
      total_possible: corrected.reduce((s, q) => s + q.total_marks, 0),
      total_earned: corrected.reduce((s, q) => s + q.marks_earned, 0),
      model,
    } as any)
    .select("id")
    .single();
  if (error) throw error;
  const row = data as any;
  return { id: row.id };
}
