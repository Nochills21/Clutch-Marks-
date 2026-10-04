import { describe, it, expect } from "vitest";
import { slugifyTopicName, topicSlugOf, topicNotesPath } from "./topicUrls";

describe("slugifyTopicName", () => {
  it("lowercases and hyphenates a plain name", () => {
    expect(slugifyTopicName("Algebra — Equations")).toBe("algebra-equations");
  });

  it("keeps leading numbering so topics stay in syllabus order", () => {
    expect(slugifyTopicName("1.1 Types of number, sets, powers and roots")).toBe(
      "1-1-types-of-number-sets-powers-and-roots",
    );
  });

  it("strips diacritics rather than dropping the letter", () => {
    expect(slugifyTopicName("Café Théorème")).toBe("cafe-theoreme");
  });

  it("collapses runs of separators and trims them", () => {
    expect(slugifyTopicName("  Ratio   &   Proportion  ")).toBe("ratio-proportion");
  });
});

describe("topicSlugOf", () => {
  it("prefers the stored slug so renaming a topic cannot move its page", () => {
    expect(topicSlugOf({ slug: "algebra-equations", name: "Algebra — Equations (2026)" })).toBe(
      "algebra-equations",
    );
  });

  it("falls back to the name for rows created before slugs were persisted", () => {
    expect(topicSlugOf({ slug: null, name: "Algebra — Equations" })).toBe("algebra-equations");
    expect(topicSlugOf({ name: "Algebra — Equations" })).toBe("algebra-equations");
  });

  it("treats a blank stored slug as absent", () => {
    expect(topicSlugOf({ slug: "   ", name: "Algebra — Equations" })).toBe("algebra-equations");
  });
});

describe("topicNotesPath", () => {
  it("lowercases the level so links never depend on caller casing", () => {
    expect(topicNotesPath("mathematics", "OL", "algebra-equations")).toBe(
      "/study/mathematics/ol/algebra-equations/notes",
    );
  });
});
