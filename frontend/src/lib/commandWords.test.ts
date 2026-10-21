import { describe, expect, it } from "vitest";
import { COMMAND_WORDS, DRILLS, drillOrder, findCommandWord } from "./commandWords";

describe("command words", () => {
  it("covers the words a paper actually uses", () => {
    const words = COMMAND_WORDS.map((c) => c.word);
    for (const required of ["state", "describe", "explain", "calculate", "compare", "deduce", "suggest", "evaluate"]) {
      expect(words).toContain(required);
    }
  });

  it("has a unique word, and every entry carries the four teaching fields", () => {
    const words = COMMAND_WORDS.map((c) => c.word);
    expect(new Set(words).size).toBe(words.length);
    for (const c of COMMAND_WORDS) {
      for (const field of [c.wants, c.shape, c.trap]) {
        expect(field.trim().length, `${c.word} has an empty teaching field`).toBeGreaterThan(20);
      }
    }
  });

  it("gives every drill exactly one correct option that exists", () => {
    for (const d of DRILLS) {
      expect(d.options.length, `${d.id} needs at least two options`).toBeGreaterThanOrEqual(2);
      expect(d.answer).toBeGreaterThanOrEqual(0);
      expect(d.answer).toBeLessThan(d.options.length);
      expect(d.options[d.answer].trim().length, `${d.id} has an empty correct option`).toBeGreaterThan(3);
      expect(d.why.trim().length, `${d.id} has no explanation`).toBeGreaterThan(40);
    }
  });

  it("does not repeat an option inside one drill", () => {
    for (const d of DRILLS) {
      const normalised = d.options.map((o) => o.trim().toLowerCase());
      expect(new Set(normalised).size, `${d.id} repeats an option`).toBe(normalised.length);
    }
  });

  it("keeps the correct answer off a single fixed position", () => {
    // The objectives gate caught 12/12 correct answers sitting at option 0;
    // the same guessability would ruin a drill bank.
    const positions = new Set(DRILLS.map((d) => d.answer));
    expect(positions.size, "all drills answer at the same option index").toBeGreaterThan(1);
  });

  it("looks words up tolerantly and returns null for an unknown word", () => {
    expect(findCommandWord("  Explain. ")?.word).toBe("explain");
    expect(findCommandWord("Compare:")?.word).toBe("compare");
    expect(findCommandWord("sketch")).toBeNull();
  });

  it("gives the trainer a stable order with every drill exactly once", () => {
    const first = drillOrder();
    const second = drillOrder();
    expect(first.map((d) => d.id)).toEqual(second.map((d) => d.id));
    expect(new Set(first.map((d) => d.id)).size).toBe(DRILLS.length);
  });
});
