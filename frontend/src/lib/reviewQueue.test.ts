import { describe, expect, it } from "vitest";
import { cardsFromMissedPoints } from "../../../supabase/functions/ai-correction/reviewQueue";
import { mergeFocusTopics } from "../../../supabase/functions/study-planner/focus";
import type { MarkPoint } from "../../../supabase/functions/ai-correction/marks";

const point = (over: Partial<MarkPoint>): MarkPoint => ({
  point: "M1 — substitutes into v = u + at",
  verdict: "MISS",
  evidence: "",
  accept_equivalents: [],
  reject_contradictions: [],
  ignore_clauses: [],
  ...over,
});

const Q = "Work out 2000 ÷ 5.087, correct to 4 significant figures.";

describe("cardsFromMissedPoints (phase 3.4)", () => {
  it("fronts the card on the question, with the answer and lost marks on the back", () => {
    const cards = cardsFromMissedPoints(
      [
        point({ point: "M1 for 2000 ÷ 5.087" }),
        point({ point: "B1 for 393", verdict: "PASS", evidence: "393" }),
      ],
      "393",
      8,
      Q,
    );
    expect(cards).toHaveLength(1);
    expect(cards[0].front).toBe(Q);
    expect(cards[0].back).toContain("393");
    expect(cards[0].back).toContain("Mark lost: M1 for 2000 ÷ 5.087");
  });

  it("is one card per question, not per mark lost", () => {
    // The live run produced "A1 for 144 cao" and "M1 for …" as two cards with the
    // same back. Same question, same card.
    const cards = cardsFromMissedPoints(
      [point({ point: "M1 for a correct product of prime factors" }), point({ point: "A1 for 144 cao" })],
      "144",
      8,
      "Find the lowest common multiple of 36 and 48.",
    );
    expect(cards).toHaveLength(1);
    expect(cards[0].back).toContain("Marks lost:");
  });

  it("never uses the mark-scheme label as the question", () => {
    // "A1 for 144 cao" gives the answer away and asks nothing.
    const [card] = cardsFromMissedPoints([point({ point: "A1 for 144 cao" })], "144", 8, Q);
    expect(card.front).toBe(Q);
    expect(card.front).not.toContain("A1");
  });

  it("drops a question with no text — there is nothing to ask", () => {
    expect(cardsFromMissedPoints([point({})], "144", 8, "")).toEqual([]);
    expect(cardsFromMissedPoints([point({})], "144", 8)).toEqual([]);
  });

  it("falls back to the accepted equivalents when there is no model answer", () => {
    const cards = cardsFromMissedPoints(
      [point({ accept_equivalents: ["any valid method", "graphical solution"] })],
      "",
      8,
      Q,
    );
    expect(cards[0].back).toContain("any valid method / graphical solution");
  });

  it("ignores PASS-only questions and an absent checklist", () => {
    expect(cardsFromMissedPoints([point({ verdict: "PASS" })], "x", 8, Q)).toEqual([]);
    expect(cardsFromMissedPoints(undefined, "x", 8, Q)).toEqual([]);
    expect(cardsFromMissedPoints([], "x", 8, Q)).toEqual([]);
  });

  it("honours the room left in the whole-paper cap", () => {
    // index.ts passes what remains of MAX_CARDS_PER_MARKING.
    expect(cardsFromMissedPoints([point({})], "answer", 0, Q)).toEqual([]);
    expect(cardsFromMissedPoints([point({})], "answer", 1, Q)).toHaveLength(1);
  });
});

describe("mergeFocusTopics (phase 3.4)", () => {
  it("adds topics with cards due now after the existing focus", () => {
    expect(mergeFocusTopics("Integration; Vectors", ["Forces and equilibrium"])).toBe(
      "Integration; Vectors; Forces and equilibrium",
    );
  });

  it("does not repeat a topic the student already named, whatever the case", () => {
    expect(mergeFocusTopics("Vectors", ["vectors", "Circular measure"])).toBe(
      "Vectors; Circular measure",
    );
  });

  it("starts from the queue when there is no existing focus", () => {
    expect(mergeFocusTopics("", ["Energetics", "Kinematics"])).toBe("Energetics; Kinematics");
  });

  it("takes at most three additions so the focus list stays actionable", () => {
    expect(mergeFocusTopics("", ["a", "b", "c", "d", "e"])).toBe("a; b; c");
  });

  it("ignores blank entries and a non-string input", () => {
    expect(mergeFocusTopics("", ["", "  ", "Energetics"])).toBe("Energetics");
    expect(mergeFocusTopics(undefined as unknown as string, [])).toBe("");
  });
});
