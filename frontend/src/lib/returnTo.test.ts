import { describe, expect, it } from "vitest";
import { postLoginPath, safeReturnTo } from "./returnTo";

describe("safeReturnTo", () => {
  it("keeps ordinary in-app paths, including their query string", () => {
    expect(safeReturnTo("/ai-marker")).toBe("/ai-marker");
    expect(safeReturnTo("/study/maths/igcse/algebra/notes")).toBe(
      "/study/maths/igcse/algebra/notes",
    );
    expect(safeReturnTo("/practice?tab=review&mode=bookmarked")).toBe(
      "/practice?tab=review&mode=bookmarked",
    );
  });

  it("rejects other origins, in every shape a browser would follow", () => {
    expect(safeReturnTo("https://evil.example/steal")).toBeNull();
    expect(safeReturnTo("//evil.example/steal")).toBeNull();
    // A backslash is resolved to a slash by browsers, so this is `//evil…`.
    expect(safeReturnTo("/\\evil.example/steal")).toBeNull();
    expect(safeReturnTo("javascript:alert(1)")).toBeNull();
    expect(safeReturnTo("evil.example")).toBeNull();
  });

  it("rejects values that would loop back into the auth flow", () => {
    expect(safeReturnTo("/auth")).toBeNull();
    expect(safeReturnTo("/auth/callback?code=abc")).toBeNull();
    expect(safeReturnTo("/reset-password")).toBeNull();
    // Segment-aware: a page that merely starts with the same letters is fine.
    expect(safeReturnTo("/authentic-notes")).toBe("/authentic-notes");
  });

  it("rejects control characters and absurdly long values", () => {
    expect(safeReturnTo("/notes\nSet-Cookie: x")).toBeNull();
    expect(safeReturnTo(`/${"a".repeat(2000)}`)).toBeNull();
  });

  it("treats missing values as 'no destination'", () => {
    expect(safeReturnTo(null)).toBeNull();
    expect(safeReturnTo(undefined)).toBeNull();
    expect(safeReturnTo("")).toBeNull();
  });
});

describe("postLoginPath", () => {
  it("follows a safe next, and otherwise lands on the dashboard", () => {
    expect(postLoginPath("/ai-marker")).toBe("/ai-marker");
    expect(postLoginPath(null)).toBe("/dashboard");
    expect(postLoginPath("//evil.example")).toBe("/dashboard");
    expect(postLoginPath("/auth")).toBe("/dashboard");
  });
});
