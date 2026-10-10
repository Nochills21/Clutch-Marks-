// Student-facing PDF exports, drawn on the Clutch Marks frame.
//
// Everything a student takes away from the site should look like it came from
// us: brand band, tabular footers, and a watermark naming the account it was
// generated for. The drawing primitives live in `brandPdf.ts`; this module
// only decides what goes on the page.
//
// These are async because the brand tile is loaded once per session — pass the
// signed-in user's identity in (`useAuth()` already has it) so the watermark
// names the right account.

import {
  BRAND_GOLD,
  BRAND_INK,
  BRAND_MUTED,
  BRAND_RED,
  BRAND_GREEN,
  createPdfFrame,
  finishPdf,
  loadBrandMark,
  pdfFileName,
  type BrandIdentity,
} from "@/lib/brandPdf";
import type { AiCorrectionOutput, CorrectedPaper } from "@/lib/ai";

/** Strip the handful of tags notes/lessons are stored with. */
function plainText(html: string | null | undefined): string {
  return String(html ?? "")
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/<\/(p|li|h[1-6]|div)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export interface LessonPdfSource {
  title: string;
  content?: string | null;
  video_url?: string | null;
  subject?: string | null;
  level?: string | null;
}

export async function exportLessonToPdf(
  lesson: LessonPdfSource,
  identity?: BrandIdentity | null,
): Promise<void> {
  const mark = await loadBrandMark();
  const subtitle = [lesson.subject, lesson.level].filter(Boolean).join(" · ") || null;
  const frame = createPdfFrame(
    { title: lesson.title, subtitle, kind: "Revision notes" },
    mark,
  );

  const body = plainText(lesson.content) || "No content available.";
  frame.write(body, { size: 10.5, lineHeight: 5.4 });

  if (lesson.video_url) {
    frame.gap(4);
    frame.rule();
    frame.write("Video", { size: 11, bold: true, color: BRAND_GOLD });
    frame.write(lesson.video_url, { size: 9, italic: true, color: BRAND_MUTED });
  }

  const doc = finishPdf(frame, identity);
  doc.save(pdfFileName(lesson.title));
}

export interface FlashcardPdfCard {
  front: string;
  back: string;
}

export async function exportFlashcardsToPdf(
  setTitle: string,
  cards: FlashcardPdfCard[],
  identity?: BrandIdentity | null,
): Promise<void> {
  const mark = await loadBrandMark();
  const frame = createPdfFrame(
    {
      title: setTitle,
      subtitle: `${cards.length} card${cards.length === 1 ? "" : "s"}`,
      kind: "Flashcards",
    },
    mark,
  );

  cards.forEach((card, i) => {
    frame.y += 1;
    if (frame.y > frame.bottom - 24) frame.page();
    frame.write(`${String(i + 1).padStart(2, "0")}  ${card.front}`, {
      size: 11,
      bold: true,
      keepTogether: true,
    });
    frame.write(card.back, { size: 10, color: BRAND_MUTED, indent: 8 });
    frame.gap(2.5);
    if (i < cards.length - 1) frame.rule();
  });

  const doc = finishPdf(frame, identity);
  doc.save(pdfFileName(setTitle, "flashcards"));
}

export interface QuizResultQuestion {
  question: string;
  options: string[];
  /** Index the student picked, or null if skipped. */
  selected: number | null;
  correct_option: number;
  explanation?: string | null;
}

export interface QuizResultMeta {
  quizTitle: string;
  topicName?: string | null;
  subject?: string | null;
  level?: string | null;
  correct: number;
  total: number;
  /** Per-question rows for the review section (optional but expected). */
  questions?: QuizResultQuestion[];
  identity?: BrandIdentity | null;
}

/** Per-question review rows, tuned for a printed revision page. */
function writeQuizReview(frame: ReturnType<typeof createPdfFrame>, questions: QuizResultQuestion[]) {
  const { doc } = frame;
  questions.forEach((q, index) => {
    const picked = q.selected;
    const right = picked !== null && picked === q.correct_option;
    const tone = picked === null ? BRAND_MUTED : right ? BRAND_GREEN : BRAND_RED;
    const label = picked === null ? "Not answered" : right ? "Correct" : "Incorrect";

    if (frame.y > frame.bottom - 26) frame.page();
    const top = frame.y;
    frame.write(`Question ${index + 1}`, { size: 10.5, bold: true, keepTogether: true });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(tone[0], tone[1], tone[2]);
    doc.text(label.toUpperCase(), frame.x + frame.maxWidth, top, { align: "right" });

    frame.write(plainText(q.question), { size: 9.5 });
    const chosen = picked !== null ? q.options[picked] : null;
    const actual = q.options[q.correct_option];
    if (chosen !== null) {
      frame.write(`You answered: ${plainText(chosen)}`, {
        size: 9,
        indent: 4,
        color: right ? BRAND_GREEN : BRAND_RED,
      });
    }
    if (!right && actual !== undefined) {
      frame.write(`Correct answer: ${plainText(actual)}`, {
        size: 9,
        indent: 4,
        color: BRAND_GREEN,
      });
    }
    if (q.explanation) {
      frame.write(plainText(q.explanation), {
        size: 8.5,
        indent: 4,
        italic: true,
        color: BRAND_MUTED,
      });
    }
    frame.gap(2.5);
    if (index < questions.length - 1) frame.rule();
  });
}

/**
 * A finished quiz, as branded revision paper: score panel, then the review.
 *
 * This is what makes a quiz result something a student can revise from offline
 * (and what carries the Clutch Marks watermark into whatever folder they keep
 * it in).
 */
export async function exportQuizResultToPdf(meta: QuizResultMeta): Promise<void> {
  const mark = await loadBrandMark();
  const identity = meta.identity ?? null;
  const frame = createPdfFrame(
    {
      title: meta.quizTitle,
      subtitle: [meta.subject, meta.level, meta.topicName].filter(Boolean).join(" · ") || null,
      kind: "Quiz result",
    },
    mark,
  );
  const { doc } = frame;

  const percent = meta.total > 0 ? Math.round((meta.correct / meta.total) * 100) : 0;
  const panelTop = frame.y;
  const panelHeight = 24;
  doc.setFillColor(250, 247, 240);
  doc.roundedRect(frame.x, panelTop, frame.maxWidth, panelHeight, 2, 2, "F");
  doc.setDrawColor(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]);
  doc.setLineWidth(0.5);
  doc.line(frame.x, panelTop, frame.x, panelTop + panelHeight);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]);
  doc.text("SCORE", frame.x + 5, panelTop + 8);

  doc.setFont("times", "bold");
  doc.setFontSize(24);
  doc.setTextColor(BRAND_INK[0], BRAND_INK[1], BRAND_INK[2]);
  doc.text(`${meta.correct}/${meta.total}`, frame.x + 5, panelTop + 18.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(BRAND_MUTED[0], BRAND_MUTED[1], BRAND_MUTED[2]);
  doc.text(`${percent}% ${gradeBand(percent)}`, frame.x + 46, panelTop + 15);

  const wrong = (meta.questions ?? []).filter(
    (q) => q.selected === null || q.selected !== q.correct_option,
  ).length;
  if (meta.questions?.length) {
    doc.setFontSize(9);
    doc.text(`${wrong} to review`, frame.x + frame.maxWidth - 5, panelTop + 15, { align: "right" });
  }
  frame.y = panelTop + panelHeight + 7;

  const questions = meta.questions ?? [];
  if (questions.length > 0) {
    frame.write("Review", { size: 12, bold: true, font: "times" });
    frame.rule();
    writeQuizReview(frame, questions);
  }

  const doc2 = finishPdf(frame, identity);
  doc2.save(pdfFileName(`${meta.quizTitle} result`));
}

/** The loose band labels used on-screen, kept in one place. */
export function gradeBand(percent: number): string {
  if (percent >= 85) return "Excellent";
  if (percent >= 70) return "Strong";
  if (percent >= 55) return "Getting there";
  if (percent >= 40) return "Keep going";
  return "Needs work";
}

export interface MarkedPaperMeta {
  /** e.g. "Mathematics 0580 · Paper 4 · Oct/Nov 2024". */
  title: string;
  /** Student's display name, printed on the cover. */
  studentName?: string | null;
  /** Subject / level line. */
  subject?: string | null;
  level?: string | null;
  /** How the answers reached us. */
  source?: "paste" | "upload" | "mixed" | null;
  /** Names of the uploaded scripts, listed on the cover. */
  answerFiles?: string[] | null;
  /** Human-readable reference printed on the cover. */
  reference?: string | null;
  /** The signed-in account (watermark + footer). */
  identity?: BrandIdentity | null;
}

const SOURCE_LABEL: Record<string, string> = {
  paste: "Typed answers",
  upload: "Uploaded script",
  mixed: "Uploaded script + typed answers",
};

function markLabel(paper: CorrectedPaper): string {
  if (paper.total_marks <= 0) return "—";
  return `${paper.marks_earned}/${paper.total_marks}`;
}

/**
 * The marked script: a branded, watermarked PDF of an AI-marked sitting.
 *
 * This is the shareable artefact of the AI marker — a student can keep it,
 * print it, or hand it to a tutor, and it still says who marked it, for whom,
 * and under which audit reference.
 */
export async function exportMarkedPaperToPdf(
  result: AiCorrectionOutput,
  meta: MarkedPaperMeta,
): Promise<void> {
  const mark = await loadBrandMark();
  const identity: BrandIdentity = {
    ...(meta.identity ?? {}),
    ref: meta.identity?.ref ?? meta.reference ?? result.audit_ref ?? null,
    owner: meta.identity?.owner ?? meta.studentName ?? null,
  };

  const frame = createPdfFrame(
    { title: meta.title, subtitle: meta.studentName ?? null, kind: "Marked script" },
    mark,
  );
  const { doc } = frame;

  // ── cover summary ──
  const panelWidth = frame.maxWidth;
  const panelTop = frame.y;
  const panelHeight = 26;
  doc.setFillColor(250, 247, 240);
  doc.roundedRect(frame.x, panelTop, panelWidth, panelHeight, 2, 2, "F");
  doc.setDrawColor(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]);
  doc.setLineWidth(0.5);
  doc.line(frame.x, panelTop, frame.x, panelTop + panelHeight);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]);
  doc.text("OVERALL MARK", frame.x + 5, panelTop + 8);

  doc.setFont("times", "bold");
  doc.setFontSize(26);
  doc.setTextColor(BRAND_INK[0], BRAND_INK[1], BRAND_INK[2]);
  doc.text(`${result.overall_grade}%`, frame.x + 5, panelTop + 19);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(BRAND_MUTED[0], BRAND_MUTED[1], BRAND_MUTED[2]);
  doc.text(
    `${result.total_earned} of ${result.total_possible} marks · ${result.corrected_papers.length} question${
      result.corrected_papers.length === 1 ? "" : "s"
    }`,
    frame.x + 42,
    panelTop + 12,
  );
  if (meta.subject || meta.level) {
    doc.text([meta.subject, meta.level].filter(Boolean).join(" · "), frame.x + 42, panelTop + 18);
  }
  if (meta.reference) {
    doc.text(`Reference ${meta.reference}`, frame.x + panelWidth - 5, panelTop + 18, {
      align: "right",
    });
  }
  frame.y = panelTop + panelHeight + 6;

  const details = [
    SOURCE_LABEL[meta.source ?? "paste"] ?? null,
    meta.answerFiles?.length ? `Script: ${meta.answerFiles.join(", ")}` : null,
    `Marked by ${"Clutch Marks"} AI`,
  ].filter(Boolean) as string[];
  for (const line of details) {
    frame.write(line, { size: 8.5, color: BRAND_MUTED });
  }

  frame.gap(3);
  frame.rule();

  // ── per-question breakdown ──
  result.corrected_papers.forEach((paper, index) => {
    const full = paper.total_marks > 0 && paper.marks_earned >= paper.total_marks;
    const none = paper.total_marks > 0 && paper.marks_earned <= 0;
    const tone = full ? BRAND_GREEN : none ? BRAND_RED : BRAND_GOLD;

    if (frame.y > frame.bottom - 30) frame.page();
    frame.write(`Question ${index + 1}`, { size: 11.5, bold: true, keepTogether: true });
    const cursor = frame.y;
    frame.write(markLabel(paper), { size: 9, bold: true, color: tone });
    doc.setFontSize(9);
    doc.setTextColor(tone[0], tone[1], tone[2]);
    doc.text(markLabel(paper), frame.x + frame.maxWidth, cursor - 3, { align: "right" });

    const question = plainText(paper.question);
    if (question) frame.write(question, { size: 9.5, color: BRAND_MUTED });

    if (paper.original_answer) {
      frame.write("Their answer", { size: 8.5, bold: true, color: BRAND_MUTED });
      frame.write(plainText(paper.original_answer), { size: 9.5, indent: 4 });
    }
    if (paper.correct_answer) {
      frame.write("Model answer", { size: 8.5, bold: true, color: BRAND_MUTED });
      frame.write(plainText(paper.correct_answer), { size: 9.5, indent: 4 });
    }
    if (paper.feedback || paper.comment) {
      frame.write([paper.feedback, paper.comment].filter(Boolean).join(" "), {
        size: 9,
        italic: true,
        indent: 4,
        color: BRAND_MUTED,
      });
    }
    frame.gap(3);
    if (index < result.corrected_papers.length - 1) frame.rule();
  });

  // ── provenance ──
  frame.gap(2);
  frame.write(
    `Marked by the Clutch Marks AI examiner. AI marking is a study aid, not an official Cambridge result${
      meta.reference ? ` (reference ${meta.reference})` : ""
    }.`,
    { size: 8, italic: true, color: BRAND_MUTED },
  );

  const finished = finishPdf(frame, identity);
  finished.save(pdfFileName(meta.title, "marked"));
}
