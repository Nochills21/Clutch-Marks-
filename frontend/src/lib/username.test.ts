import { describe, expect, it } from "vitest";
import { escapeLike, normalizeUsername, USERNAME_RE, usernameProblem, validateUsername } from "./username";

describe("escapeLike", () => {
  // The underscore is legal in a handle and in an email local part, and it is a
  // single-character wildcard in SQL LIKE: unescaped, one account's identifier
  // selects another's row. Measured on the login path before the fix.
  it("escapes the wildcards an identifier can contain", () => {
    expect(escapeLike("sam_1")).toBe("sam\\_1");
    expect(escapeLike("a_b.c-d")).toBe("a\\_b.c-d");
    expect(escapeLike("100%pure")).toBe("100\\%pure");
  });

  it("escapes a backslash so the escape itself cannot be swallowed", () => {
    // One literal backslash in, two out.
    expect(escapeLike("a\\b")).toBe("a\\\\b");
  });

  it("leaves an ordinary handle alone", () => {
    expect(escapeLike("jane.doe-2")).toBe("jane.doe-2");
  });
});

describe("normalizeUsername", () => {
  it("trims, lower-cases and drops a leading @", () => {
    expect(normalizeUsername("  @Jane.Doe ")).toBe("jane.doe");
    expect(normalizeUsername("@@amina_9")).toBe("amina_9");
  });

  it("leaves an already-clean handle untouched", () => {
    expect(normalizeUsername("kofi.boateng-2")).toBe("kofi.boateng-2");
  });

  it("treats null-ish input as empty rather than throwing", () => {
    expect(normalizeUsername("")).toBe("");
    expect(normalizeUsername(undefined as unknown as string)).toBe("");
  });
});

describe("USERNAME_RE", () => {
  it.each(["abc", "jane.doe", "a_b-c.d", "x".repeat(32)])("accepts %s", (value) => {
    expect(USERNAME_RE.test(value)).toBe(true);
  });

  it.each([
    ["ab", "too short"],
    ["x".repeat(33), "too long"],
    ["Jane.Doe", "mixed case must be normalised first"],
    ["jane doe", "space"],
    ["jane@doe", "at sign"],
    ["jane+doe", "plus"],
    ["jané", "non-ascii letter"],
  ])("rejects %s (%s)", (value) => {
    expect(USERNAME_RE.test(value)).toBe(false);
  });
});

describe("usernameProblem", () => {
  it("names the specific problem", () => {
    expect(usernameProblem("")).toBe("empty");
    expect(usernameProblem("@")).toBe("empty");
    expect(usernameProblem("ab")).toBe("too_short");
    expect(usernameProblem("a".repeat(33))).toBe("too_long");
    expect(usernameProblem("jane doe")).toBe("characters");
    expect(usernameProblem("jane.doe")).toBeNull();
  });
});

describe("validateUsername", () => {
  it("returns the normalised value on success", () => {
    expect(validateUsername(" @Jane_Doe ")).toEqual({ status: "valid", value: "jane_doe" });
  });

  it("returns a readable message on failure", () => {
    const result = validateUsername("Jane Doe");
    expect(result.status).toBe("invalid");
    if (result.status === "invalid") {
      expect(result.problem).toBe("characters");
      expect(result.message).toMatch(/lowercase letters, numbers, dots/);
    }
  });

  it("accepts the boundaries exactly", () => {
    expect(validateUsername("abc").status).toBe("valid");
    expect(validateUsername("x".repeat(32)).status).toBe("valid");
  });
});
