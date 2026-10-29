import { describe, expect, it } from "vitest";
import { canonicalLevelSlug, levelAliasCodes, levelNeedsRedirect } from "./levelSlug";

describe("canonicalLevelSlug", () => {
  it("maps each code to its URL segment", () => {
    expect(canonicalLevelSlug("OL")).toBe("ol");
    expect(canonicalLevelSlug("IGCSE")).toBe("igcse");
    expect(canonicalLevelSlug("AS")).toBe("as");
    expect(canonicalLevelSlug("a2")).toBe("a2");
  });

  it("keeps an unknown level as itself rather than inventing a segment", () => {
    expect(canonicalLevelSlug("Foundation")).toBe("foundation");
  });
});

describe("levelAliasCodes", () => {
  it("treats ol and igcse as the same qualification", () => {
    expect(levelAliasCodes("igcse")).toEqual(["OL", "IGCSE"]);
    expect(levelAliasCodes("OL")).toEqual(["OL", "IGCSE"]);
  });

  it("accepts the written-out spellings", () => {
    expect(levelAliasCodes("o-level")).toEqual(["OL", "IGCSE"]);
    expect(levelAliasCodes("as-level")).toEqual(["AS"]);
    expect(levelAliasCodes("a-level")).toEqual(["A2"]);
  });

  it("does not resolve AS to A2 or vice versa", () => {
    expect(levelAliasCodes("as")).not.toContain("A2");
    expect(levelAliasCodes("a2")).not.toContain("AS");
  });

  it("keeps an unknown slug queryable so the page can say it is missing", () => {
    expect(levelAliasCodes("foundation")).toEqual(["FOUNDATION"]);
  });
});

describe("levelNeedsRedirect", () => {
  it("sends /igcse on a Cambridge (OL) subject to /ol", () => {
    expect(levelNeedsRedirect("OL", "igcse")).toBe(true);
  });

  it("sends /ol on an English (IGCSE) subject to /igcse", () => {
    expect(levelNeedsRedirect("IGCSE", "ol")).toBe(true);
  });

  it("leaves the canonical address alone", () => {
    expect(levelNeedsRedirect("OL", "ol")).toBe(false);
    expect(levelNeedsRedirect("IGCSE", "igcse")).toBe(false);
    expect(levelNeedsRedirect("AS", "as")).toBe(false);
    expect(levelNeedsRedirect("A2", "a2")).toBe(false);
  });

  it("redirects the written-out spellings to the short segment", () => {
    expect(levelNeedsRedirect("OL", "o-level")).toBe(true);
    expect(levelNeedsRedirect("A2", "a-level")).toBe(true);
  });

  it("is case-insensitive, so an upper-case address does not bounce", () => {
    expect(levelNeedsRedirect("OL", "OL")).toBe(false);
  });
});
