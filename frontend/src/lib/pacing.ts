// Pacing: where the clock actually went.
//
// The quiz page has always shown a sitting clock; it never recorded what the
// clock measured. Timing is one of the few things a candidate cannot see for
// themselves — they remember the paper feeling rushed, not that question 3 ate
// eleven minutes of a forty-five minute paper. This module turns the recorded
// per-question seconds into one sentence worth acting on, and it is pure so the
// thresholds are testable rather than tuned by feel in a component.

export interface QuestionTiming {
  /** The question's id, for keying rows; not used by the maths. */
  questionId: string;
  /** Position in the paper, 0-based, matching the question's order. */
  ordinal: number;
  /** Seconds spent on this question before answering it. */
  seconds: number;
}

export interface PacingHighlight {
  ordinal: number;
  seconds: number;
  /** How many times the median this question took (0 when there is no median). */
  multipleOfMedian: number;
}

export interface PacingSummary {
  /** Questions with a recorded time. */
  answered: number;
  /** Time on those questions, in seconds. */
  totalSeconds: number;
  medianSeconds: number;
  slowest: PacingHighlight | null;
  fastest: PacingHighlight | null;
  /** Slowest question's share of the recorded time, rounded to a percent. */
  shareOnSlowestPercent: number;
  /** A question is "slow" at 2.5× the median and at least a minute. */
  slowestIsNotable: boolean;
  /** Questions that were left blank, when the caller knows the count. */
  blank: number;
  /** One sentence to show the student. Never shames; always actionable. */
  advice: string;
}

/** Format seconds as "1m 20s" / "40s". */
export function formatSeconds(total: number): string {
  const s = Math.max(0, Math.round(total));
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  if (minutes === 0) return `${seconds}s`;
  if (seconds === 0) return `${minutes}m`;
  return `${minutes}m ${seconds}s`;
}

function median(sorted: number[]): number {
  if (sorted.length === 0) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? Math.round((sorted[mid - 1] + sorted[mid]) / 2) : sorted[mid];
}

/**
 * Summarise one sitting.
 *
 * `blank` is passed in rather than inferred: a blank question has no timing
 * because the student never answered it, and that absence is the most
 * actionable fact in the whole summary.
 */
export function pacingSummary(
  timings: QuestionTiming[],
  opts: { blank?: number; limitSeconds?: number } = {},
): PacingSummary {
  const clean = timings
    .filter((t) => Number.isFinite(t.seconds) && t.seconds >= 0)
    .map((t) => ({ ...t, seconds: Math.round(t.seconds) }));
  const blank = Math.max(0, Math.round(opts.blank ?? 0));

  if (clean.length === 0) {
    return {
      answered: 0,
      totalSeconds: 0,
      medianSeconds: 0,
      slowest: null,
      fastest: null,
      shareOnSlowestPercent: 0,
      slowestIsNotable: false,
      blank,
      advice:
        blank > 0
          ? "No timings were recorded for this sitting. In the next one, answer in order so the clock can show you where it went."
          : "No timings were recorded for this sitting.",
    };
  }

  const totalSeconds = clean.reduce((sum, t) => sum + t.seconds, 0);
  const sorted = [...clean].map((t) => t.seconds).sort((a, b) => a - b);
  const med = median(sorted);

  const toHighlight = (t: QuestionTiming): PacingHighlight => ({
    ordinal: t.ordinal,
    seconds: t.seconds,
    multipleOfMedian: med > 0 ? Math.round((t.seconds / med) * 10) / 10 : 0,
  });

  let slowestEntry = clean[0];
  let fastestEntry = clean[0];
  for (const t of clean) {
    if (t.seconds > slowestEntry.seconds) slowestEntry = t;
    if (t.seconds < fastestEntry.seconds) fastestEntry = t;
  }

  const slowest = toHighlight(slowestEntry);
  const fastest = toHighlight(fastestEntry);
  const shareOnSlowestPercent = totalSeconds > 0 ? Math.round((slowest.seconds / totalSeconds) * 100) : 0;
  const slowestIsNotable = slowest.seconds >= 60 && slowest.multipleOfMedian >= 2.5;

  const limit = opts.limitSeconds ?? 0;
  const usedAlmostAll = limit > 0 && totalSeconds >= limit * 0.9;

  let advice: string;
  if (blank > 0) {
    advice =
      `You left ${blank} question${blank === 1 ? "" : "s"} blank. ` +
      (slowestIsNotable
        ? `Question ${slowest.ordinal + 1} took ${formatSeconds(slowest.seconds)} — ${slowest.multipleOfMedian}× your average. Answering it and moving on would have bought the time for the blanks.`
        : "Answering in order and moving on at the target time is worth more marks than polishing any one answer.");
  } else if (slowestIsNotable) {
    advice =
      `Question ${slowest.ordinal + 1} took ${formatSeconds(slowest.seconds)} — ${slowest.multipleOfMedian}× your average ` +
      `(${formatSeconds(med)}) and ${shareOnSlowestPercent}% of the paper. In the exam, give each question a budget before you start and move on when it is spent.`;
  } else if (usedAlmostAll) {
    advice = `You used ${formatSeconds(totalSeconds)} of the ${formatSeconds(limit)} allowed. Nothing ran away from you — now work on finishing a little earlier so you can check your answers.`;
  } else if (med === 0) {
    // Most questions came in under a second on the clock, so there is no pattern
    // to read; "0× your average" would be a meaningless sentence.
    advice = "Your answers were recorded in under a second each, so there is no pacing pattern to read yet. Sit a timed set to see where your time goes.";
  } else {
    advice = `Your time was evenly spread: no question took more than ${slowest.multipleOfMedian}× your average of ${formatSeconds(med)}. That is the pacing pattern you want under exam pressure.`;
  }

  return {
    answered: clean.length,
    totalSeconds,
    medianSeconds: med,
    slowest,
    fastest,
    shareOnSlowestPercent,
    slowestIsNotable,
    blank,
    advice,
  };
}

/** Rows to persist for one sitting — one per timed question. */
export function toTimingRows(
  timings: QuestionTiming[],
  ids: { userId: string; quizId: string },
): Array<{
  user_id: string;
  quiz_id: string;
  question_id: string;
  ordinal: number;
  seconds: number;
}> {
  return timings
    .filter((t) => Number.isFinite(t.seconds) && t.seconds >= 0 && t.seconds <= 3600)
    .map((t) => ({
      user_id: ids.userId,
      quiz_id: ids.quizId,
      question_id: t.questionId,
      ordinal: t.ordinal,
      seconds: Math.round(t.seconds),
    }));
}

/** One stored timing row, as read back from question_timings. */
export interface TimingRow {
  quiz_id: string;
  created_at: string;
  ordinal: number;
  seconds: number;
}

/** One sitting: every question timed in one submission. */
export interface SittingPace {
  /** quiz id and submission time together identify one sitting. */
  key: string;
  at: string;
  answered: number;
  medianSeconds: number;
}

export interface TimeTrend {
  /** Oldest first, at most `last` sittings. */
  sittings: SittingPace[];
  /** One sentence on how the typical time per question has moved. */
  advice: string;
}

/**
 * How the typical time per question has changed across recent sittings.
 *
 * A sitting is the set of rows written by one submission, so rows that share a
 * quiz and a timestamp belong together. The median is used per sitting so one
 * stalled question does not drag the whole picture. The advice compares the
 * oldest and newest sitting in the window, and only calls a change a change when
 * it is both a few seconds and a tenth of the starting pace.
 */
export function sittingTrend(rows: TimingRow[], opts: { last?: number } = {}): TimeTrend {
  const last = Math.max(2, Math.round(opts.last ?? 6));
  const groups = new Map<string, { at: string; seconds: number[] }>();
  for (const r of rows) {
    if (!Number.isFinite(r.seconds) || r.seconds < 0) continue;
    const key = `${r.quiz_id}|${r.created_at}`;
    const group = groups.get(key) ?? { at: r.created_at, seconds: [] };
    group.seconds.push(Math.round(r.seconds));
    groups.set(key, group);
  }

  const all: SittingPace[] = [...groups.entries()]
    .map(([key, g]) => ({
      key,
      at: g.at,
      answered: g.seconds.length,
      medianSeconds: median([...g.seconds].sort((a, b) => a - b)),
    }))
    .sort((a, b) => Date.parse(a.at) - Date.parse(b.at));

  const sittings = all.slice(-last);

  let advice: string;
  if (sittings.length < 2) {
    advice = "Sit at least two timed papers to see how your pace is changing.";
  } else {
    const first = sittings[0].medianSeconds;
    const latest = sittings[sittings.length - 1].medianSeconds;
    const diff = latest - first;
    const n = sittings.length;
    if (Math.abs(diff) < Math.max(3, first * 0.1)) {
      advice = `Your typical time per question has held at about ${formatSeconds(latest)} across the last ${n} sittings.`;
    } else if (diff < 0) {
      advice = `Your typical time per question has come down from ${formatSeconds(first)} to ${formatSeconds(latest)} across the last ${n} sittings. That is more time for checking.`;
    } else {
      advice = `Your typical time per question has risen from ${formatSeconds(first)} to ${formatSeconds(latest)} across the last ${n} sittings. Check whether a few hard questions are taking the time, or whether you are running short at the end.`;
    }
  }

  return { sittings, advice };
}
