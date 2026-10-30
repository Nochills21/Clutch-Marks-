// English marking for ai-correction (phase 3.3). Pure (no Deno or network
// APIs) so the frontend test suite can import it directly — same arrangement as
// marks.ts.
//
// Why English needs its own path: every other subject is marked point by point
// (M1 for the method, A1 for the answer), and the marker's prompt and output
// were built entirely around that. An English writing task has no points to
// award: the examiner reads the piece, decides which band of a descriptor grid
// it sits in, and returns a mark for each named criterion. Marking a composition
// as if it were a maths question produced either a refusal or a fiction.
//
// English is not one regime, it is two, and the paper decides which:
//   - Reading tasks (0500 Paper 1: comprehension, "give two reasons", summary
//     by content points) really are point-marked. Those keep the mark-scheme
//     checklist — no band, no criteria.
//   - Writing tasks (directed writing, composition, 9280 writing) are banded.
//     Those return `criteria`, one entry per descriptor the board names.
//
// The totals are never invented here. A criterion carries the marks the paper
// itself gives it (`marks_available`), and `reconcileBand` only checks that the
// criteria add up to the question's total and rescales proportionally when the
// model's arithmetic drifts. The bands and their weights belong to the board.

import { type MarkPoint } from "./marks.ts";

/** The two English qualifications in the estate, by subject slug. */
const ENGLISH_SLUG_PREFIX = "english";

/**
 * True for a subject whose marking is English.
 *
 * Keyed on the slug (`english-first-language-cambridge`,
 * `english-as-a-second-language-oxford`) with the name as a fallback, because a
 * renamed slug must not silently return the marker to M/A/B marking.
 */
export function isEnglishSubject(
  slug: string | null | undefined,
  name?: string | null,
): boolean {
  const cleanSlug = String(slug ?? "").trim().toLowerCase();
  if (cleanSlug.startsWith(ENGLISH_SLUG_PREFIX)) return true;
  const cleanName = String(name ?? "").trim().toLowerCase();
  return cleanName.startsWith("english ");
}

export interface BandCriterion {
  /** The board's own criterion name, e.g. "Content and Structure". */
  name: string;
  /** The band it was placed in, e.g. "Band 3". Empty when the paper has none. */
  band: string;
  marks_awarded: number;
  marks_available: number;
  /** The descriptor wording for that band, which is what the mark means. */
  descriptor: string;
  /** Quoted from the student's writing — the reason for the placement. */
  evidence: string;
  /** One concrete thing that would move it up a band. */
  next_step: string;
}

export interface NormalisedBand {
  criteria: BandCriterion[];
  marks_earned: number;
  total_marks: number;
  /** The question-level band label the model gave, when it gave one. */
  band: string;
  /**
   * One checklist entry per criterion, so the panel that already renders
   * mark-scheme points and the claim-a-mark flow both work unchanged. A
   * criterion awarded in full is PASS; one that lost marks is MISS, which is
   * exactly the claim a student may want to dispute.
   */
  points: MarkPoint[];
  /** True when nothing usable came back, so the caller keeps the point path. */
  absent: boolean;
  /** True when the criteria's own totals disagreed and had to be rescaled. */
  rescaled: boolean;
  /**
   * True when the criteria carried no marks at all and the question-level mark
   * had to be shared across them. Measured live: a model placed a piece in
   * Band 2 and sent every criterion `marks_awarded: 0`, which read as a 0/25
   * composition — a band that high cannot score nothing.
   */
  derivedFromQuestion: boolean;
}

const MAX_CRITERIA = 8;
const MAX_TEXT = 300;
const MAX_DESCRIPTOR = 400;

function text(value: unknown, limit = MAX_TEXT): string {
  if (typeof value === "string") return value.replace(/\s+/g, " ").trim().slice(0, limit);
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

/** "7/10", "7 out of 10" and 7 all read as 7. */
function numberFrom(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;
  const match = value.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

/**
 * The band-marking prompt that replaces the M/A/B one for English.
 *
 * It has to state both regimes explicitly: the model sees the whole script, and
 * a 0500 script is routinely half comprehension and half composition. It also
 * has to refuse the two failures that made the old prompt wrong here — awarding
 * marks for "correct method" in an essay, and placing a band without quoting
 * the writing that justified it.
 */
export const ENGLISH_SYSTEM_PROMPT =
  `You are an experienced Cambridge IGCSE First Language English (0500) and OxfordAQA International GCSE English as a Second Language (9280) examiner. You mark the way a real examiner does: a band is a judgement about the whole piece, and every judgement is anchored in a quotation from what the student wrote.

There are TWO kinds of question on an English paper, and you must mark each the way its own paper does.

1. READING and LANGUAGE questions (comprehension, "give two reasons", "explain what the writer means", summary by content points):
   These are point-marked. Return ONE entry in mark_points per mark available, exactly as a mark scheme lists them — the acceptable point and whether the student made it. Do not return criteria for these.

2. WRITING tasks (directed writing, composition, 9280 writing tasks, and any task marked on a descriptor grid):
   These are BAND-marked. Do not award marks for "method" or "correct answer" — there is no such mark in an essay. Instead:
   - Place the piece in a band on EXACTLY the criteria the board's grid names for that task. The grids are fixed, and they are these (learned from the published mark schemes, not assumed):
     * Cambridge 0500/22, Question 1 (Directed Writing) — TWO criteria: "Writing" (25 marks) and "Reading" (15 marks), total 40. The Reading mark is point-marked against the scheme's content points; the Writing mark is banded.
     * Cambridge 0500/22, Questions 2–5 (Composition) — TWO criteria: "Content and Structure" (16 marks) and "Style and Accuracy" (24 marks), total 40.
     * OxfordAQA 9280/W — TWO criteria: "Content and Communication" and "Language", with the paper's own split per question: Q1 (photograph) 6 + 3 = 9; Q2 (letter) 6 + 6 = 12; Q3 (four bullet points) 8 + 8 = 16; Q4 (two bullet points) 8 + 15 = 23.
   - Never invent a criterion the board does not use. "Organisation", "Accuracy", "Content and Organisation" and "Structure" as standalone criteria do not exist on either of these papers: organisation is assessed inside Content and Structure (0500) or Content and Communication (9280), and accuracy inside Style and Accuracy (0500) or Language (9280). A third criterion is always wrong.
   - Give marks_awarded and marks_available for each criterion from the split above, and make them add up to the question's total. Only if the paper is a different component with a split these rules do not cover, divide the question's total across the board's criteria in the proportion its grid gives them.
   - Quote the descriptor wording that applies, and quote the student's own words that justify the placement.
   - Name one concrete change that would move the criterion up a band. "Write more" is not a criterion move; "open the second paragraph with the counter-argument instead of listing it third" is.

Each question object MUST have exactly these keys:
- question: the question or task, as the paper words it
- original_answer: what the student actually wrote (transcribe faithfully; for a long piece, quote the opening and the parts you judged)
- correct_answer: for a reading question, the accepted answer. For a writing task, a short model answer at the top band — two to four sentences is enough to show the standard, not a full rewrite.
- marks_earned: integer marks awarded
- total_marks: the task's total from the paper or its bracket — never invent or rescale a total
- band: the question-level band, e.g. "Band 4" (writing tasks only; "" for reading questions)
- feedback: 1-2 sentences in a tutor's voice — what is working and the single highest-value change
- grade: percentage for this question (0-100)
- comment: 1-2 sentences on the grade
- criteria: for writing tasks ONLY, an array of objects with exactly:
  - name: the board's criterion name
  - band: the band label, e.g. "Band 3"
  - marks_awarded: integer, at most marks_available
  - marks_available: integer, this criterion's share of the task total
  - descriptor: the band's own wording
  - evidence: quoted from the student's writing — the lines that earned this band
  - next_step: one concrete improvement
  Return [] for reading questions.
- mark_points: for reading questions, one entry per mark, each an object with exactly:
  - point, verdict ("PASS" or "MISS"), evidence (quoted), accept_equivalents, reject_contradictions, ignore_clauses
  For writing tasks return [] and let criteria carry the assessment.

How bands work:
- A band is holistic. Do not count features to place a piece; read it, then decide, then justify with the clearest quotation.
- MOST SCRIPTS SIT IN THE MIDDLE OF THE GRID. Real examiners place the majority of candidates in the middle bands, not at the top. A competent, clear, correct piece is middle-band writing: it has done the job and has not yet shown the control, range or precision the top band describes. Reserve the top band for a piece that satisfies every clause of its descriptor — if you are still listing "next steps" that would improve it materially, it was not top band.
- When you are torn between two bands, place the LOWER one and name what is missing. The student can claim the higher band (the mark is provisional), but an inflated band teaches them nothing and they cannot tell it was generous.
- Sanity-check the mark against the band: a 25-mark composition that a real examiner would place around 15–19 must not come back at 23. If the criteria's marks and your band disagree, the band is the judgement and the marks follow it.
- The top band is not "flawless" — it is what the descriptor says. If the piece meets it, award it.
- Accuracy is judged against the board's own allowance: 9280 tolerates errors that do not impede communication; 0500 composition marks technical accuracy within Style. Do not invent a rule the grid does not state.
- A short piece that does everything asked is not automatically below a long one that wanders.

Anti-hallucination rules (hard requirements):
- QUOTE TO PLACE: every band placement must carry evidence quoted from the student's writing. If you cannot quote it, you cannot place it — say the piece was blank or illegible instead.
- Do not invent requirements the task never set (a specific length, a particular structure, a set number of paragraphs) unless the paper states them.
- Never reward or penalise handwriting, spelling of names, or neatness: you are marking the writing, not the page.
- Fill in correct_answer even when the student wrote nothing.
- Never output anything except the JSON array.`;

/**
 * Subject-specific guidance appended to the marking context.
 *
 * Kept separate from the prompt so the paper being sat can be named in it —
 * "mark this 0500/22 composition" is a materially different instruction from
 * "mark this 9280 writing task".
 */
export function englishRubric(subjectName: string, level: string | null | undefined): string {
  return `
## Marking style — English
- Subject: ${subjectName || "English"}
- Level: ${level || "IGCSE"}

- Reading questions are point-marked: one checklist entry per mark, in the paper's order.
- Writing tasks are band-marked: place each board criterion in a band, quote the descriptor, quote the student's evidence, and make the criteria add up to the task total.
- The criteria are the board's, and there are always two of them on these papers: 0500/22 Question 1 is Writing (25) + Reading (15); 0500/22 Questions 2–5 are Content and Structure (16) + Style and Accuracy (24); 9280/W is Content and Communication + Language, split 6+3, 6+6, 8+8 or 8+15 depending on the question. Never return a third criterion, and never rename one: "Organisation" and "Accuracy" on their own are not criteria on either paper.
- There are no method marks and no accuracy marks on an essay. Never write "M1", "A1" or "B1" for a writing task.
- Feedback names one change that would raise the band, in terms the student can act on tonight.`;
}

/**
 * Read a band-marked question out of the model's reply.
 *
 * Everything is defensive, for the same reason `normaliseChecklist` is: a model
 * that sends prose instead of an array, or an award above the criterion's own
 * total, must neither crash the marker nor hand a student a mark the board's
 * grid does not give. `fallbackTotal` is the question total already normalised
 * from the reply, used when the criteria's own totals cannot be trusted.
 */
export function reconcileBand(
  raw: Record<string, unknown> | null | undefined,
  fallbackTotal: number,
  fallbackEarned = 0,
): NormalisedBand {
  const source = raw?.criteria ?? raw?.band_criteria ?? raw?.bands;
  const entries = Array.isArray(source) ? source : [];

  const criteria: BandCriterion[] = [];
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry as Record<string, unknown>;
    const name = text(record.name ?? record.criterion ?? record.label, 80);
    if (!name) continue;

    const availableRaw = numberFrom(record.marks_available ?? record.available ?? record.out_of);
    const awardedRaw = numberFrom(record.marks_awarded ?? record.awarded ?? record.marks);
    // A criterion with no marks at all is a heading, not an assessment.
    if (availableRaw === null && awardedRaw === null) continue;

    const available = Math.max(0, Math.floor(availableRaw ?? fallbackTotal));
    const awarded = Math.min(available, Math.max(0, Math.floor(awardedRaw ?? 0)));
    if (available === 0) continue;

    criteria.push({
      name,
      band: text(record.band ?? record.level, 40),
      marks_awarded: awarded,
      marks_available: available,
      descriptor: text(record.descriptor ?? record.band_descriptor, MAX_DESCRIPTOR),
      evidence: text(record.evidence ?? record.quote, MAX_DESCRIPTOR),
      next_step: text(record.next_step ?? record.improvement, MAX_TEXT),
    });
    if (criteria.length >= MAX_CRITERIA) break;
  }

  if (criteria.length === 0) {
    return {
      criteria: [],
      marks_earned: 0,
      total_marks: Math.max(0, Math.floor(fallbackTotal)),
      band: "",
      points: [],
      absent: true,
      rescaled: false,
      derivedFromQuestion: false,
    };
  }

  const criterionTotal = criteria.reduce((s, c) => s + c.marks_available, 0);
  const earned = criteria.reduce((s, c) => s + c.marks_awarded, 0);

  // A placed band with no marks under it is not a 0-mark script — it is a
  // reply that named the judgement and dropped the arithmetic. The
  // question-level mark is the only number left that means anything, so share
  // it across the criteria in proportion to their maxima. Marked `derived` so
  // the caller can say so rather than presenting it as the model's own split.
  let derivedFromQuestion = false;
  if (earned === 0 && fallbackEarned > 0) {
    const share = Math.min(fallbackEarned, criterionTotal);
    let allocated = 0;
    for (const criterion of criteria) {
      criterion.marks_awarded = Math.min(
        criterion.marks_available,
        Math.round((criterion.marks_available / criterionTotal) * share),
      );
      allocated += criterion.marks_awarded;
    }
    // Rounding can leave a mark unallocated; put it on the largest criterion.
    if (allocated !== share) {
      const largest = criteria.reduce((a, b) =>
        b.marks_available > a.marks_available ? b : a
      );
      largest.marks_awarded = Math.min(
        largest.marks_available,
        Math.max(0, largest.marks_awarded + (share - allocated)),
      );
    }
    derivedFromQuestion = true;
  }

  // The question's total is the authority (it is on the paper). When the
  // criteria claim a different one — a common slip when a grid is remembered
  // rather than read — scale the criteria onto the paper's total instead of
  // letting the question score above or below its own maximum.
  const targetTotal = Math.floor(fallbackTotal) > 0 ? Math.floor(fallbackTotal) : criterionTotal;
  let total_marks = criterionTotal;
  // Read back from the criteria, not from `earned`, because the derivation
  // above may have just given them their marks.
  let marks_earned = criteria.reduce((s, c) => s + c.marks_awarded, 0);
  let rescaled = false;

  // Only rescale when the paper's total can actually be shared out; a total
  // smaller than the number of criteria (a mis-read bracket) is left alone.
  if (targetTotal >= criteria.length && criterionTotal !== targetTotal) {
    rescaled = true;
    const ratio = targetTotal / criterionTotal;
    let running = 0;
    for (const criterion of criteria) {
      const scaledAvailable = Math.max(1, Math.round(criterion.marks_available * ratio));
      const share = criterion.marks_awarded / criterion.marks_available;
      criterion.marks_available = scaledAvailable;
      criterion.marks_awarded = Math.min(
        scaledAvailable,
        Math.max(0, Math.round(share * scaledAvailable)),
      );
      running += scaledAvailable;
    }
    total_marks = criteria.reduce((s, c) => s + c.marks_available, 0);
    marks_earned = criteria.reduce((s, c) => s + c.marks_awarded, 0);
    // Rounding can leave the sum a mark or two off the paper's total; fold the
    // difference into the largest criterion so the panel never shows 23/22.
    if (running !== targetTotal || total_marks !== targetTotal) {
      const largest = criteria.reduce((a, b) =>
        b.marks_available > a.marks_available ? b : a
      );
      largest.marks_available += targetTotal - total_marks;
      if (largest.marks_awarded > largest.marks_available) {
        largest.marks_awarded = largest.marks_available;
      }
      total_marks = criteria.reduce((s, c) => s + c.marks_available, 0);
      marks_earned = criteria.reduce((s, c) => s + c.marks_awarded, 0);
    }
  }

  const points: MarkPoint[] = criteria.map((criterion) => ({
    // The band label and the descriptor are the mark's meaning, so they travel
    // in the checklist text the panel already renders.
    point: [criterion.name, criterion.band, criterion.descriptor]
      .filter(Boolean)
      .join(" — ")
      .slice(0, MAX_TEXT),
    verdict: criterion.marks_awarded >= criterion.marks_available ? "PASS" : "MISS",
    evidence: criterion.evidence,
    // A band grid states no "oe" or "ignore" lists, and inventing them would
    // put words in the board's mouth.
    accept_equivalents: [],
    reject_contradictions: [],
    ignore_clauses: [],
  }));

  return {
    criteria,
    marks_earned,
    total_marks,
    band: text(raw?.band ?? raw?.band_label, 40),
    points,
    absent: false,
    rescaled,
    derivedFromQuestion,
  };
}
