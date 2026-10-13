/**
 * Three-state exam readiness for one topic, from the student's own bank data.
 *
 *  - not_started:    no question in the topic has been answered yet
 *  - exam_ready:     at least 80% of the bank tried AND at least 80% of the
 *                    answers correct
 *  - working_on_it:  anything in between
 */
export type TopicReadiness = "not_started" | "working_on_it" | "exam_ready";

export interface ReadinessInput {
  total_questions: number;
  answered: number;
  correct: number;
}

export const EXAM_READY_COVERAGE = 0.8;
export const EXAM_READY_ACCURACY = 0.8;

export function topicReadiness(s: ReadinessInput): TopicReadiness {
  if (s.answered <= 0) return "not_started";
  const coverage = s.total_questions > 0 ? s.answered / s.total_questions : 0;
  const accuracy = s.correct / s.answered;
  if (coverage >= EXAM_READY_COVERAGE && accuracy >= EXAM_READY_ACCURACY) return "exam_ready";
  return "working_on_it";
}

export const READINESS_LABEL: Record<TopicReadiness, string> = {
  not_started: "Not started",
  working_on_it: "Working on it",
  exam_ready: "Exam-ready",
};
