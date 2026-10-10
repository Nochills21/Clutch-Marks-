import { describe, expect, it } from "vitest";

import { contentGuardMessage, contentSaveError } from "./contentGuards";

// The constraint names here are the ones 20261009140000_content_guards.sql adds;
// if a guard is renamed in SQL, this fails and the console goes back to raw
// PostgREST text.
const GUARDED_TABLES = [
  "questions",
  "quizzes",
  "topics",
  "lessons",
  "study_materials",
  "flashcards",
  "flashcard_sets",
  "past_papers",
  "announcements",
];

describe("contentGuardMessage", () => {
  it("explains a replacement-character rejection for every guarded table", () => {
    for (const table of GUARDED_TABLES) {
      const message = `new row for relation "${table}" violates check constraint "${table}_no_replacement_character"`;
      expect(contentGuardMessage(message), table).toMatch(/U\+FFFD/);
    }
  });

  it("explains an answer index that cannot point at an option", () => {
    const message =
      'new row for relation "questions" violates check constraint "questions_answer_index_in_range"';
    expect(contentGuardMessage(message)).toMatch(/correct/i);
  });

  it("stays out of the way for failures that are not content guards", () => {
    expect(contentGuardMessage('duplicate key value violates unique constraint "topics_name_key"')).toBeNull();
    expect(contentGuardMessage("permission denied for table lessons")).toBeNull();
    expect(contentGuardMessage("")).toBeNull();
    expect(contentGuardMessage(undefined)).toBeNull();
    expect(contentGuardMessage(null)).toBeNull();
  });
});

describe("contentSaveError", () => {
  it("keeps the caller's title and the raw message for an ordinary failure", () => {
    expect(contentSaveError("Could not save the lesson", "permission denied for table lessons")).toEqual({
      title: "Could not save the lesson",
      description: "permission denied for table lessons",
      variant: "destructive",
    });
  });

  it("says the content itself was refused when a guard fired", () => {
    const props = contentSaveError(
      "Could not save the lesson",
      'new row for relation "lessons" violates check constraint "lessons_no_replacement_character"',
    );
    expect(props.title).toMatch(/not saved/i);
    expect(props.description).toMatch(/U\+FFFD/);
    expect(props.variant).toBe("destructive");
  });
});
