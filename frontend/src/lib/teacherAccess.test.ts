import { describe, expect, it } from "vitest";
import {
  describeTeacherScope,
  scopeCoversLevel,
  scopeCoversSlug,
  scopeFromGrant,
  type TeacherGrantRow,
} from "./teacherAccess";

const grant: TeacherGrantRow = {
  subject_id: "subj-physics",
  subjects: {
    id: "subj-physics",
    name: "Physics",
    slug: "physics",
    subject_levels: [{ id: "phy-ol" }, { id: "phy-as" }, { id: "phy-a2" }],
  },
};

const scope = scopeFromGrant(grant)!;

describe("teacherAccess", () => {
  it("flattens a grant into every level of the subject", () => {
    expect(scope).toEqual({
      subjectId: "subj-physics",
      subjectSlug: "physics",
      subjectName: "Physics",
      levelIds: ["phy-ol", "phy-as", "phy-a2"],
    });
  });

  it("returns null when the subject is missing rather than an empty scope", () => {
    expect(scopeFromGrant(null)).toBeNull();
    expect(scopeFromGrant({ subject_id: "x", subjects: null })).toBeNull();
  });

  it("covers all three levels of its subject and no other level", () => {
    expect(scopeCoversLevel(scope, "phy-ol")).toBe(true);
    expect(scopeCoversLevel(scope, "phy-a2")).toBe(true);
    expect(scopeCoversLevel(scope, "chem-ol")).toBe(false);
    expect(scopeCoversLevel(scope, null)).toBe(false);
  });

  it("covers its subject slug only", () => {
    expect(scopeCoversSlug(scope, "physics")).toBe(true);
    expect(scopeCoversSlug(scope, "chemistry")).toBe(false);
    expect(scopeCoversSlug(null, "physics")).toBe(false);
  });

  it("names the subject and the upgrade path", () => {
    expect(describeTeacherScope(scope)).toContain("Physics");
    expect(describeTeacherScope(scope)).toMatch(/paid plan/i);
    expect(describeTeacherScope(null)).toMatch(/no subject assigned/i);
  });

  it("treats a subject with no levels as covering nothing", () => {
    const empty = scopeFromGrant({
      subject_id: "s",
      subjects: { id: "s", name: "Empty", slug: "empty", subject_levels: [] },
    })!;
    expect(scopeCoversLevel(empty, "any-level")).toBe(false);
  });
});
