// Exam plan: a revision schedule paced backwards from one sitting.
//
// Students do not plan from today forwards; they plan from the exam. This module
// lays the calendar out from the sitting date and back, so the last days are
// always the ones that matter most (light review, timed papers), the middle is
// for mistakes, and the early weeks are for learning the topics in order. It is
// pure and works on calendar dates (YYYY-MM-DD) so the day a student sees never
// shifts with the time zone of the browser that rendered it.

/** The last this many days before a sitting are practice, not new learning. */
export const PRACTICE_WINDOW_DAYS = 15;

export type PlanKind = "learn" | "review" | "past-paper" | "light" | "exam";

export interface PlanItem {
  /** Calendar day, YYYY-MM-DD. */
  date: string;
  kind: PlanKind;
  title: string;
  /** Topic names scheduled that day, in syllabus order. Empty for practice days. */
  topics: string[];
  /** 1 is the day before the sitting; 0 is the sitting itself. */
  daysBefore: number;
}

export interface PlanPhase {
  kind: PlanKind;
  label: string;
  /** First and last day of the phase, YYYY-MM-DD, inclusive. */
  from: string;
  to: string;
}

export interface ExamPlan {
  /** Whole days from today to the sitting; 0 when it is today. */
  daysUntil: number;
  items: PlanItem[];
  phases: PlanPhase[];
  /** One sentence for the student when the plan needs explaining, else null. */
  note: string | null;
}

const DAY_MS = 86_400_000;

function parseYmd(value: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new Error(`not a calendar date: ${value}`);
  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function formatYmd(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/** YYYY-MM-DD for a Date, using the local calendar day (what the student sees). */
export function toCalendarDate(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${mm}-${dd}`;
}

/** Whole calendar days from `from` to `to` (negative when `to` is earlier). */
export function daysBetween(from: string, to: string): number {
  return Math.round((parseYmd(to) - parseYmd(from)) / DAY_MS);
}

function addDays(date: string, days: number): string {
  return formatYmd(parseYmd(date) + days * DAY_MS);
}

/**
 * Build the plan for one sitting.
 *
 * `topics` is the subject's topic names in syllabus order (empty when the exam
 * has no subject). Topics are never reordered, so the plan reads the way the
 * course does.
 */
export function buildExamPlan(input: {
  examDate: string;
  today: string;
  topics: string[];
}): ExamPlan {
  const daysUntil = daysBetween(input.today, input.examDate);
  const topics = input.topics.map((t) => t.trim()).filter((t) => t.length > 0);

  if (daysUntil < 0) {
    return { daysUntil, items: [], phases: [], note: "This sitting has already passed." };
  }
  if (daysUntil === 0) {
    return {
      daysUntil,
      items: [{ date: input.examDate, kind: "exam", title: "Sitting today", topics: [], daysBefore: 0 }],
      phases: [],
      note: "Your sitting is today. Eat, check your equipment and take a few minutes to breathe before you start.",
    };
  }

  const items: PlanItem[] = [];
  const at = (daysBefore: number) => addDays(input.examDate, -daysBefore);

  // The day before: nothing new, just the formulae and the command words.
  items.push({
    date: at(1),
    kind: "light",
    title: "Light review: formulae, command words and an early night",
    topics: [],
    daysBefore: 1,
  });

  // The practice window, counted back from the sitting. Even days are timed papers;
  // odd days are for working through the mistakes of the paper before.
  const practiceFrom = Math.min(PRACTICE_WINDOW_DAYS, daysUntil);
  const practiceDays: number[] = [];
  for (let back = practiceFrom; back >= 2; back--) practiceDays.push(back);
  for (const back of practiceDays) {
    if (back % 2 === 0) {
      items.push({
        date: at(back),
        kind: "past-paper",
        title: "Timed past paper, then mark it against the mark scheme",
        topics: [],
        daysBefore: back,
      });
    } else {
      items.push({
        date: at(back),
        kind: "review",
        title: "Redo the questions you missed, and write down why each one went wrong",
        topics: [],
        daysBefore: back,
      });
    }
  }

  // The learning window: everything earlier than the practice window, in order.
  const learnDays: number[] = [];
  for (let back = daysUntil; back > PRACTICE_WINDOW_DAYS; back--) learnDays.push(back);
  // With no learning window (fewer than 16 days), topics go on the review days instead.
  const slots = learnDays.length > 0 ? learnDays : practiceDays.filter((b) => b % 2 === 1);

  if (slots.length > 0) {
    const perSlot: string[][] = slots.map(() => []);
    topics.forEach((topic, i) => {
      perSlot[Math.floor((i * slots.length) / topics.length)].push(topic);
    });
    slots.forEach((back, i) => {
      const dayTopics = perSlot[i];
      const isLearn = learnDays.length > 0;
      if (isLearn) {
        items.push({
          date: at(back),
          kind: "learn",
          title:
            dayTopics.length > 0
              ? `Learn: ${dayTopics.join(", ")}`
              : topics.length === 0
                ? "Work through your notes for this subject"
                : "Catch-up and consolidation: revisit your notes on what you have covered so far",
          topics: dayTopics,
          daysBefore: back,
        });
      } else {
        // Replace the review item on this day with one that names its topics.
        const idx = items.findIndex((it) => it.daysBefore === back);
        if (idx >= 0 && dayTopics.length > 0) {
          items[idx] = {
            ...items[idx],
            title: `Review: ${dayTopics.join(", ")}, then redo the questions you missed`,
            topics: dayTopics,
          };
        }
      }
    });
  }

  items.push({
    date: input.examDate,
    kind: "exam",
    title: "Sitting day",
    topics: [],
    daysBefore: 0,
  });

  items.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  const phases: PlanPhase[] = [];
  if (learnDays.length > 0) {
    phases.push({
      kind: "learn",
      label: "Learn the topics",
      from: at(daysUntil),
      to: at(PRACTICE_WINDOW_DAYS + 1),
    });
  }
  if (practiceFrom >= 2) {
    phases.push({
      kind: "past-paper",
      label: "Timed papers and mistakes",
      from: at(practiceFrom),
      to: at(2),
    });
  }
  phases.push({ kind: "light", label: "Light review", from: at(1), to: at(1) });
  phases.push({ kind: "exam", label: "Sitting", from: input.examDate, to: input.examDate });

  let note: string | null = null;
  if (topics.length === 0) {
    note = "Choose a subject for this sitting to see its topics in the plan.";
  } else if (slots.length === 0) {
    note = `Only ${daysUntil} day${daysUntil === 1 ? "" : "s"} to go: there is no room to spread the topics, so spend the time on past papers.`;
  } else if (learnDays.length === 0) {
    note = `Only ${daysUntil} day${daysUntil === 1 ? "" : "s"} to go, so there is no full learning pass: your topics are spread over the review days.`;
  }

  return { daysUntil, items, phases, note };
}
