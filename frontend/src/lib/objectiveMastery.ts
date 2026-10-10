// What the mastery loop's numbers mean, in one place.
//
// The rows come from public.my_objective_mastery() and public.my_next_objective()
// (supabase/migrations/20261009200000_objective_mastery_loop.sql), recomputed on
// every call from the student's own attempts. The schedule behind them is a
// five-step ladder — 1, 3, 7, 16, 35 days — advanced by answers, never by the
// client.
//
// This module only decides how those rows are labelled, ordered, grouped and
// phrased, so the page and any future surface agree about what "weakest" and
// "due" mean.
//
// Every function that needs the current time takes it as an argument: a pure
// function of (row, now) is testable, and a component that reads Date.now()
// inside a helper cannot be.

export type MasteryState = "not_started" | "working" | "mastered";

export interface ObjectiveMasteryRow {
  subject_slug: string;
  level: string;
  topic_id: string;
  topic_slug: string;
  topic_name: string;
  objective_id: string;
  code: string;
  statement: string;
  sort_order: number;
  /** How many tagged questions the topic has for this objective. */
  checks: number;
  attempted: number;
  correct: number;
  state: string;
  /** Rung of the resurfacing ladder: 0 = answered, not yet right. */
  stage: number;
  due_at: string | null;
  overdue: boolean;
  last_reviewed_at: string | null;
}

export type NextAction = "review" | "practise" | "start";

export interface NextObjectiveRow {
  action: string;
  subject_slug: string;
  level: string;
  topic_id: string;
  topic_slug: string;
  topic_name: string;
  objective_id: string;
  code: string;
  statement: string;
  checks: number;
  attempted: number;
  correct: number;
  state: string;
  stage: number;
  due_at: string | null;
  overdue: boolean;
}

export interface StateMeta {
  label: string;
  /** What the state means, for a student who has not seen this panel before. */
  blurb: string;
  /** Badge classes, matching the rest of the app's tone vocabulary. */
  tone: string;
}

export const STATE_META: Record<MasteryState, StateMeta> = {
  not_started: {
    label: "Not started",
    blurb: "No answer yet on this objective, so there is nothing to say about it.",
    tone: "bg-muted text-muted-foreground",
  },
  working: {
    label: "Working on it",
    blurb: "Answered, but not every check is right yet — this is the objective to revisit.",
    tone: "bg-warning text-warning-foreground",
  },
  mastered: {
    label: "Mastered",
    blurb: "Every check on this objective is currently right. It still resurfaces, just less often.",
    tone: "bg-success/90 text-success-foreground",
  },
};

const UNKNOWN_STATE: StateMeta = {
  label: "Unknown",
  blurb: "The report returned a state this build has no copy for.",
  tone: "bg-muted text-muted-foreground",
};

export function stateMeta(state: string): StateMeta {
  return STATE_META[state as MasteryState] ?? UNKNOWN_STATE;
}

/** Days between reviews, by ladder rung. Mirrors objective_review_interval(). */
export const SCHEDULE_LADDER_DAYS = [1, 3, 7, 16, 35] as const;

export function ladderDaysFor(stage: number): number {
  const index = Math.min(Math.max(stage, 1), SCHEDULE_LADDER_DAYS.length) - 1;
  return SCHEDULE_LADDER_DAYS[index];
}

export function masteryPercent(row: { correct: number; checks: number }): number {
  if (row.checks <= 0) return 0;
  return Math.round((row.correct / row.checks) * 100);
}

export function checksLabel(row: { correct: number; attempted: number; checks: number }): string {
  if (row.checks <= 0) return "no checks yet";
  if (row.attempted === 0) return `0 of ${row.checks} checks answered`;
  return `${row.correct} of ${row.checks} checks right`;
}

const DAY_MS = 86_400_000;

function dueInDays(dueAt: string, now: Date): number {
  return (new Date(dueAt).getTime() - now.getTime()) / DAY_MS;
}

/** Is this objective due to resurface? False when it has never been answered. */
export function isDue(row: { due_at: string | null; attempted: number }, now: Date): boolean {
  if (!row.due_at || row.attempted === 0) return false;
  return new Date(row.due_at).getTime() <= now.getTime();
}

export function overdueDays(row: { due_at: string | null; attempted: number }, now: Date): number {
  // An objective nobody has answered has no schedule, so nothing about it can
  // be late — same rule as isDue() and describeDue().
  if (!row.due_at || row.attempted === 0) return 0;
  const days = -dueInDays(row.due_at, now);
  return days <= 0 ? 0 : Math.floor(days);
}

/** "due now", "due in 3 days", "5 days overdue" — the wording the panel uses. */
export function describeDue(row: { due_at: string | null; attempted: number }, now: Date): string {
  if (!row.due_at || row.attempted === 0) return "no schedule yet";
  const days = dueInDays(row.due_at, now);
  if (days <= 0) {
    const overdue = Math.floor(-days);
    return overdue < 1 ? "due now" : overdue === 1 ? "1 day overdue" : `${overdue} days overdue`;
  }
  const until = Math.ceil(days);
  return until === 1 ? "due tomorrow" : `due in ${until} days`;
}

/**
 * Overdue first and most overdue at the top; that is the resurfacing order, and
 * the same rule my_next_objective() applies server-side.
 */
export function dueObjectives<T extends { due_at: string | null; attempted: number }>(
  rows: T[],
  now: Date,
): T[] {
  return rows
    .filter((row) => isDue(row, now))
    .sort((a, b) => new Date(a.due_at as string).getTime() - new Date(b.due_at as string).getTime());
}

/**
 * Weakest first: not-yet-right before not-started before mastered, and within
 * the not-yet-right group the lowest proportion of checks right comes first.
 * Overdue objectives jump the queue, because a review that is late is the one
 * most likely to be forgotten.
 */
export function weakestFirst<T extends { state: string; correct: number; checks: number; attempted: number; due_at: string | null; last_reviewed_at: string | null }>(
  rows: T[],
  now: Date = new Date(),
): T[] {
  const stateRank = (state: string) => (state === "working" ? 0 : state === "not_started" ? 1 : 2);
  const ratio = (row: T) => (row.attempted > 0 && row.checks > 0 ? row.correct / row.checks : 1);
  return [...rows].sort((a, b) => {
    const aDue = isDue(a, now) ? 0 : 1;
    const bDue = isDue(b, now) ? 0 : 1;
    if (aDue !== bDue) return aDue - bDue;
    if (stateRank(a.state) !== stateRank(b.state)) return stateRank(a.state) - stateRank(b.state);
    if (ratio(a) !== ratio(b)) return ratio(a) - ratio(b);
    return (a.last_reviewed_at ?? "").localeCompare(b.last_reviewed_at ?? "");
  });
}

export interface TopicObjectives<T> {
  topic_id: string;
  topic_name: string;
  topic_slug: string;
  subject_slug: string;
  level: string;
  objectives: T[];
  mastered: number;
  working: number;
  notStarted: number;
  /** True when every objective of the topic is currently right. */
  complete: boolean;
}

/** Group the flat report by topic, keeping the code order inside each topic. */
export function groupByTopic<T extends { topic_id: string; topic_name: string; topic_slug: string; subject_slug: string; level: string; state: string; code: string; sort_order: number }>(
  rows: T[],
): TopicObjectives<T>[] {
  const groups = new Map<string, TopicObjectives<T>>();
  for (const row of rows) {
    let group = groups.get(row.topic_id);
    if (!group) {
      group = {
        topic_id: row.topic_id,
        topic_name: row.topic_name,
        topic_slug: row.topic_slug,
        subject_slug: row.subject_slug,
        level: row.level,
        objectives: [],
        mastered: 0,
        working: 0,
        notStarted: 0,
        complete: false,
      };
      groups.set(row.topic_id, group);
    }
    group.objectives.push(row);
    if (row.state === "mastered") group.mastered += 1;
    else if (row.state === "working") group.working += 1;
    else group.notStarted += 1;
  }
  for (const group of groups.values()) {
    group.objectives.sort((a, b) => a.sort_order - b.sort_order || a.code.localeCompare(b.code));
    group.complete = group.objectives.length > 0 && group.mastered === group.objectives.length;
  }
  return [...groups.values()].sort((a, b) => a.topic_name.localeCompare(b.topic_name));
}

export interface NextActionCopy {
  /** Heading for the next-action card. */
  title: string;
  /** One sentence saying why this objective and not another. */
  detail: string;
  /** Button label. */
  cta: string;
  /** Which RPC action this came from, so tests and analytics can read it. */
  action: NextAction;
}

/**
 * The copy for the weakest-objective card. Kept out of the component so the
 * branch that matters — a review that is late beats one that is merely wrong —
 * can be tested without rendering anything.
 */
function capitalise(text: string): string {
  return text ? text[0].toUpperCase() + text.slice(1) : text;
}

export function nextActionCopy(row: NextObjectiveRow, now: Date): NextActionCopy {
  const action = (["review", "practise", "start"].includes(row.action) ? row.action : "review") as NextAction;
  const checks = checksLabel(row);

  if (action === "review" && row.overdue) {
    return {
      title: "Resurface this objective",
      detail: `You answered this before and it is ${describeDue(row, now)} — the check is due again. ${checks}.`,
      cta: "Check it again",
      action,
    };
  }
  if (action === "practise") {
    return {
      title: "Fix your weakest objective",
      // Capitalised: the due phrase starts a sentence here, unlike in the two
      // branches above where it follows a dash or a comma.
      detail: `This is where you are losing most marks: ${checks}. ${capitalise(describeDue(row, now))}.`,
      cta: "Practise this objective",
      action,
    };
  }
  if (action === "start") {
    return {
      title: "Start this objective",
      detail: `Nothing answered here yet — ${row.checks} short check${row.checks === 1 ? "" : "s"} will tell you where you stand.`,
      cta: "Start the checks",
      action,
    };
  }
  return {
    title: "Keep this one fresh",
    detail: `Every check is currently right. A short review keeps it that way — ${describeDue(row, now)}.`,
    cta: "Review it",
    action,
  };
}
