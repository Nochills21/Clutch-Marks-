// Wellbeing-first gamification helpers.
//
// Design rules this file exists to enforce (see the migration
// 20261007140000_gamification_wellbeing_rework.sql for the server side):
//   * effort is rewarded for understanding — completions, correct answers and
//     *corrected mistakes* — never for time spent online;
//   * a 10, 20 and 30 minute session are worth exactly the same (a flat 20 XP),
//     so the timer can never become the point;
//   * nothing stored anywhere counts down, resets or is lost by missing a day;
//   * every optional surface (leaderboard, reminders, animations, encouragement)
//     is a stored preference the student owns.
//
// All writes go through security-definer RPCs; the client never touches the
// tables directly.
import { supabase } from "@/integrations/supabase/client";

export type StudyPrefs = {
  weekly_goal_days: number;
  session_minutes: number;
  leaderboard_visible: boolean;
  reminders_enabled: boolean;
  animations_enabled: boolean;
  encouragement_enabled: boolean;
};

/** The three session lengths a student may choose between. Equals in value. */
export const SESSION_CHOICES = [10, 20, 30] as const;
export type SessionMinutes = (typeof SESSION_CHOICES)[number];

export const DEFAULT_PREFS: StudyPrefs = {
  weekly_goal_days: 3,
  session_minutes: 20,
  leaderboard_visible: true,
  reminders_enabled: true,
  animations_enabled: true,
  encouragement_enabled: true,
};

export type PersonalWins = {
  days_studied: number;
  mistakes_fixed: number;
  mistakes_fixed_by_subject: { subject: string; fixed: number }[];
  lessons_completed: number;
  notes_completed: number;
  quizzes_done: number;
  best_quiz_pct: number | null;
  sessions_completed: number;
  subject_improvements: { subject: string; recent_pct: number; delta: number }[];
};

export type StartSessionResult = {
  id: string;
  planned_minutes: number;
  started_at: string;
};

export type FinishSessionResult = {
  xp_earned: number;
  days_this_week: number;
  weekly_goal_days: number;
  weekly_goal_met: boolean;
  today_goal_met: boolean;
};

export async function fetchStudyPrefs(): Promise<StudyPrefs> {
  const { data, error } = await supabase.rpc("my_study_prefs");
  if (error || !data) return DEFAULT_PREFS;
  return { ...DEFAULT_PREFS, ...(data as unknown as Partial<StudyPrefs>) };
}

export async function saveStudyPrefs(patch: Partial<StudyPrefs>): Promise<StudyPrefs> {
  const { data, error } = await supabase.rpc("set_study_prefs", { _patch: patch });
  if (error || !data) throw error ?? new Error("Could not save your preferences");
  return { ...DEFAULT_PREFS, ...(data as unknown as Partial<StudyPrefs>) };
}

export async function fetchPersonalWins(days = 7): Promise<PersonalWins | null> {
  const { data, error } = await supabase.rpc("my_wins", { _days: days });
  // Encouragement is decorative: a failed read shows nothing rather than an error.
  if (error || !data) return null;
  return data as unknown as PersonalWins;
}

export async function startFocusSession(minutes: SessionMinutes): Promise<StartSessionResult> {
  const { data, error } = await supabase.rpc("start_study_session", { _minutes: minutes });
  if (error || !data) throw error ?? new Error("Could not start the session");
  return data as unknown as StartSessionResult;
}

export async function finishFocusSession(
  sessionId: string,
  completed = true,
): Promise<FinishSessionResult> {
  const { data, error } = await supabase.rpc("finish_study_session", {
    _session_id: sessionId,
    _completed: completed,
  });
  if (error || !data) throw error ?? new Error("Could not save the session");
  return data as unknown as FinishSessionResult;
}

/**
 * Up to `max` specific, encouraging statements drawn from what the student
 * actually did. Deliberately quiet: no streaks-as-pressure, no "you missed",
 * no exclamation-only filler, and an empty list when there is nothing true to
 * say (the caller renders nothing rather than manufacturing a message).
 */
export function encouragementLines(wins: PersonalWins | null, max = 2): string[] {
  if (!wins) return [];
  const lines: string[] = [];

  const byImprovement = [...(wins.subject_improvements ?? [])].sort((a, b) => b.delta - a.delta);
  for (const s of byImprovement) {
    if (lines.length >= max) break;
    if (s.delta >= 5) {
      lines.push(`Your ${s.subject} quiz average is up ${s.delta} points on last week (now ${s.recent_pct}%).`);
    }
  }

  const fixed = wins.mistakes_fixed;
  if (fixed > 0 && lines.length < max) {
    const top = (wins.mistakes_fixed_by_subject ?? [])[0];
    lines.push(
      top
        ? `You corrected ${fixed} ${plural(fixed, "mistake")} this week — ${top.fixed} of them in ${top.subject}.`
        : `You corrected ${fixed} ${plural(fixed, "mistake")} this week.`,
    );
  }

  if (wins.sessions_completed > 0 && lines.length < max) {
    lines.push(
      `You finished ${wins.sessions_completed} focus ${plural(wins.sessions_completed, "session")}.`,
    );
  }

  if (wins.best_quiz_pct !== null && wins.best_quiz_pct >= 70 && lines.length < max) {
    lines.push(`Your best quiz score this week was ${wins.best_quiz_pct}%.`);
  }

  if (lines.length < max && (wins.lessons_completed > 0 || wins.notes_completed > 0)) {
    const bits: string[] = [];
    if (wins.lessons_completed > 0) bits.push(`${wins.lessons_completed} ${plural(wins.lessons_completed, "lesson")}`);
    if (wins.notes_completed > 0) bits.push(`${wins.notes_completed} ${plural(wins.notes_completed, "set of notes")}`);
    lines.push(`You worked through ${bits.join(" and ")}.`);
  }

  return lines.slice(0, max);
}

function plural(n: number, word: string): string {
  return n === 1 ? word : `${word}s`;
}

/** ISO weekday numbers (1 = Monday … 7 = Sunday) with the current day marked. */
export function weekStrip(studiedDays: number[], today = new Date()) {
  const todayIso = today.getDay() === 0 ? 7 : today.getDay();
  return [
    { iso: 1, short: "Mon" },
    { iso: 2, short: "Tue" },
    { iso: 3, short: "Wed" },
    { iso: 4, short: "Thu" },
    { iso: 5, short: "Fri" },
    { iso: 6, short: "Sat" },
    { iso: 7, short: "Sun" },
  ].map((d) => ({ ...d, studied: studiedDays.includes(d.iso), isToday: d.iso === todayIso }));
}
