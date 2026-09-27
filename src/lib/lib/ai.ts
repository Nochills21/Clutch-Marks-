// AI client: thin wrappers around the Supabase Edge workers.
// - Study planner: POST /ai/study-planner
// - Paper auto-correction: POST /ai-correction
// Both workers enforce approval gates + audit logging server-side.

import { supabase } from "@/integrations/supabase/client";

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
  const { data, error } = await supabase.functions.invoke("ai-study-planner", {
    body: input,
  });
  if (error || !data) {
    // Fallback: build a deterministic plan inline so the planner stays
    // functional even before the worker is configured.
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

/**
 * Call the AI paper auto-correction worker.
 */
export async function callPaperCorrector(
  paper: string | CorrectedPaperInput[],
  provider: AiProvider = "cloudflare",
  subjectLevelId?: string,
): Promise<AiCorrectionOutput> {
  const { data, error } = await supabase.functions.invoke("ai-correction", {
    body: {
      paper,
      subjectLevelId,
      model: "llama-3.1-8b-instruct",
      provider,
    },
  });
  if (error || !data) {
    throw new Error(error?.message ?? "AI correction worker returned no data");
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
  const { data, error } = await (supabase as any)
    .from("ai_correction")
    .insert({
      user_id: supabase.auth.getUser().then(u => u.data.user?.id),
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
