// The free-preview rule: one note in each subject-level, newest first, and the
// same note everywhere. These assertions exist because four surfaces resolve
// "which note is free" independently — a change here that only some of them
// honour shows up as a note that opens from the subject hub and is refused on
// its own page.
import { describe, expect, it } from "vitest";
import {
  FREE_NOTE_PREVIEW_LIMIT,
  fetchOpenableNoteIdsForLevel,
  isLockedNote,
  newestFirst,
  openableIdsAcrossLevels,
  openableNoteIds,
} from "./noteAccess";

const note = (id: string, created_at: string, material_type = "notes") => ({ id, created_at, material_type });

describe("noteAccess", () => {
  it("is one note per level", () => {
    expect(FREE_NOTE_PREVIEW_LIMIT).toBe(1);
  });

  it("gives a free reader the newest note of a level", () => {
    const level = [
      note("old", "2026-01-01T00:00:00Z"),
      note("new", "2026-03-01T00:00:00Z"),
      note("middle", "2026-02-01T00:00:00Z"),
    ];
    expect([...openableNoteIds(level, false)]).toEqual(["new"]);
  });

  it("gives a paid reader everything", () => {
    const level = [note("a", "2026-01-01T00:00:00Z"), note("b", "2026-02-01T00:00:00Z")];
    expect(openableNoteIds(level, true).size).toBe(2);
  });

  it("applies the rule per level when the list spans levels", () => {
    const library = [
      note("ol-new", "2026-05-01T00:00:00Z"),
      note("ol-old", "2026-01-01T00:00:00Z"),
      note("as-new", "2026-04-01T00:00:00Z"),
      note("as-old", "2026-02-01T00:00:00Z"),
    ].map((n, i) => ({ ...n, subject_level_id: i < 2 ? "ol-bio" : "as-bio" }));

    expect([...openableIdsAcrossLevels(library, false)].sort()).toEqual(["as-new", "ol-new"]);
    expect(openableIdsAcrossLevels(library, true).size).toBe(4);
  });

  it("prefers a full note to a newer summary", () => {
    const level = [
      note("summary", "2026-06-01T00:00:00Z", "summary"),
      note("notes", "2026-01-01T00:00:00Z"),
    ];
    expect([...openableNoteIds(level, false)]).toEqual(["notes"]);
    // …but a level with only summaries still gets its newest one.
    const summariesOnly = [
      note("s-old", "2026-01-01T00:00:00Z", "summary"),
      note("s-new", "2026-02-01T00:00:00Z", "summary"),
    ];
    expect([...openableNoteIds(summariesOnly, false)]).toEqual(["s-new"]);
  });

  it("never makes an exam-technique extra the free note", () => {
    const level = [
      note("technique", "2026-06-01T00:00:00Z", "exam-technique"),
      note("notes", "2026-01-01T00:00:00Z"),
    ];
    expect([...openableNoteIds(level, false)]).toEqual(["notes"]);
  });

  it("breaks a tie by id so two surfaces cannot disagree", () => {
    const level = [note("b", "2026-01-01T00:00:00Z"), note("a", "2026-01-01T00:00:00Z")];
    expect([...openableNoteIds(level, false)]).toEqual(["a"]);
    expect(newestFirst(level).map((n) => n.id)).toEqual(["a", "b"]);
  });

  it("locks nothing until the answer is known", () => {
    expect(isLockedNote("anything", null)).toBe(false);
    expect(isLockedNote("locked", new Set(["free"]))).toBe(true);
    expect(isLockedNote("free", new Set(["free"]))).toBe(false);
  });

  it("returns null — not an empty set — when the level is unknown", async () => {
    // An empty set would lock every note on the page while the level resolves.
    await expect(fetchOpenableNoteIdsForLevel(undefined, false)).resolves.toBeNull();
    // A paid reader skips the query entirely.
    await expect(fetchOpenableNoteIdsForLevel("some-level", true)).resolves.toBeNull();
  });
});
