// Per-topic mastery summary: the roll-up behind the mastery rings.
//
// Objectives report `state` per row (not_started / working / mastered) from
// the mastery RPCs. A topic's ring is the share mastered; the band follows the
// same 80%-green convention students know from Uplearn-style trackers, and a
// topic is exam-ready only when every objective is mastered.

export type MasteryBand = "red" | "amber" | "green";

export interface TopicMasteryItem {
  state: string;
}

export interface TopicMasterySummary {
  total: number;
  mastered: number;
  working: number;
  notStarted: number;
  /** Share mastered, 0–100. */
  percent: number;
  band: MasteryBand;
  /** True when every objective is mastered (and at least one exists). */
  examReady: boolean;
  label: string;
}

/** Green at 80%+, amber for any progress, red when nothing is mastered. */
export function bandForPercent(percent: number): MasteryBand {
  if (percent >= 80) return "green";
  if (percent > 0) return "amber";
  return "red";
}

export function topicMasterySummary(items: TopicMasteryItem[]): TopicMasterySummary {
  const total = items.length;
  const mastered = items.filter((i) => i.state === "mastered").length;
  const working = items.filter((i) => i.state === "working").length;
  const notStarted = total - mastered - working;
  const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
  const examReady = total > 0 && mastered === total;
  const label = examReady
    ? "Exam-ready"
    : working > 0 || mastered > 0
      ? "Working on it"
      : "Not started";
  return { total, mastered, working, notStarted, percent, band: bandForPercent(percent), examReady, label };
}
