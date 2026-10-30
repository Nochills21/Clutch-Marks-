// Turning missed mark-scheme points into review cards (phase 3.4).
//
// Pure, so the frontend suite can import and test it directly — the same reason
// marks.ts lives here. The database work (ensuring a set, inserting cards,
// queueing progress) stays in index.ts; this decides *what* a card says.
//
// What a card says was settled by running the loop live against 0580/22 and
// reading the output. The first version used the mark-scheme point as the front
// and produced cards like "A1 for 144 cao" / "M1 for 2000 ÷ 5.087" — examiner
// shorthand that gives away the answer (the point names the result) and asks
// nothing of the student. A card is worth queueing only if its front is a
// prompt that can be answered, so:
//
//   front = the question, as the paper asked it
//   back  = the mark scheme's model answer, then the marks that were lost
//
// One question therefore yields one card however many marks it cost, because
// two cards with the same front are the same card.

import type { MarkPoint } from "./marks.ts";

export interface MissedCard {
  /** The question — something the student can actually be asked. */
  front: string;
  /** What they should have written, and which marks went missing. */
  back: string;
}

/** More than this per question is a wall of cards nobody reviews. */
const MAX_CARDS_PER_QUESTION = 8;
const MAX_TEXT = 400;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_TEXT) : "";
}

/**
 * One card for a question that lost marks, or none.
 *
 * `modelAnswer` is the question's `correct_answer` from the marking result: the
 * same text the panel shows as "Mark scheme". `accept_equivalents` are the
 * fallback, because "any valid method" still beats an empty back. With no
 * question there is nothing to ask, and with no answer nothing to learn, so the
 * card is dropped rather than queued unanswerable — the defects stay visible in
 * the checklist either way.
 *
 * `limit` is the room left in the whole-paper cap; it is 1 here because a single
 * question produces a single card, but it is honoured so the caller's cap is
 * enforced in one place.
 */
export function cardsFromMissedPoints(
  points: MarkPoint[] | undefined,
  modelAnswer: string | undefined,
  limit = MAX_CARDS_PER_QUESTION,
  question?: string,
): MissedCard[] {
  if (!Array.isArray(points) || points.length === 0 || limit <= 0) return [];

  const front = clean(question);
  if (!front) return [];

  const lost: string[] = [];
  const seen = new Set<string>();
  for (const point of points) {
    if (!point || point.verdict !== "MISS") continue;
    const label = clean(point.point);
    if (!label || seen.has(label.toLowerCase())) continue;
    seen.add(label.toLowerCase());
    lost.push(label);
  }
  if (lost.length === 0) return [];

  const answer = clean(modelAnswer)
    || clean(points.find((p) => p?.verdict === "MISS")?.accept_equivalents?.join(" / ") ?? "");
  const back = [answer, lost.length > 0 ? `Mark${lost.length > 1 ? "s" : ""} lost: ${lost.join(" · ")}` : ""]
    .filter(Boolean)
    .join("\n\n");
  if (!back) return [];

  return [{ front, back }];
}
