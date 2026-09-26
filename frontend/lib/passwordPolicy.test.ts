import { describe, it, expect, vi, afterEach } from "vitest";
import { validatePassword, isBreachedPassword, PASSWORD_RULES_TEXT } from "./passwordPolicy";

afterEach(() => vi.unstubAllGlobals());

describe("validatePassword", () => {
  // ── Validity table: one row per rule ────────────────────────────────────
  const invalid: Array<[string, string, RegExp]> = [
    ["student", "Aa1!", /at least 6/], // below minimum
    ["admin", "Aa1!Aa1!", /Admin passwords must be at least 12/], // admin length floor
    ["student", "aa1!aa1!", /uppercase/], // missing each required group
    ["student", "AA1!AA1!", /lowercase/],
    ["student", "Aa!Aa!Aa!", /number/],
    ["student", "Aa1Aa1Aa1", /symbol/],
  ];
  it.each(invalid)("rejects %s password %j", (role, password, pattern) => {
    expect(validatePassword(password, role as "student" | "admin")).toMatch(pattern);
  });

  // ── Boundary table: exactly at each minimum ─────────────────────────────
  const boundary: Array<[string, string]> = [
    ["student", "Aa1!Aa"], // 6 chars
    ["admin", "Aa1!Aa1!Aa1!"], // 12 chars
  ];
  it.each(boundary)("accepts %s password at exact minimum %j", (role, password) => {
    expect(validatePassword(password, role as "student" | "admin")).toBeNull();
  });

  it("reports every missing group in one message", () => {
    // Lowercase-only input: uppercase, number, and symbol all missing together.
    expect(validatePassword("abcdef", "student")).toBe(
      "Password must contain an uppercase letter, a number, a symbol.",
    );
  });

  it("exposes rule text shown on the signup form", () => {
    expect(PASSWORD_RULES_TEXT).toMatch(/6/);
  });
});

describe("isBreachedPassword", () => {
  // Stub digest: 20 bytes of 0xAA → SHA-1 hex "A"×40 → prefix "AAAAA", suffix "A"×35.
  const SUFFIX = "A".repeat(35);
  const stubCrypto = () =>
    vi.stubGlobal("crypto", { subtle: { digest: async () => new Uint8Array(20).fill(0xaa) } });

  it("returns true when the hash suffix appears in the range response", async () => {
    stubCrypto();
    vi.stubGlobal("fetch", vi.fn(async () => new Response(`abc123:1\n${SUFFIX}:42\n`)));
    await expect(isBreachedPassword("whatever")).resolves.toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.pwnedpasswords.com/range/AAAAA",
      expect.anything(),
    );
  });

  it("returns false when absent, non-OK, or network failure (fails open)", async () => {
    stubCrypto();
    vi.stubGlobal("fetch", vi.fn(async () => new Response(`zzz:1\n`)));
    await expect(isBreachedPassword("safe")).resolves.toBe(false);
    vi.stubGlobal("fetch", vi.fn(async () => new Response("nope", { status: 503 })));
    await expect(isBreachedPassword("safe")).resolves.toBe(false);
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("offline"); }));
    await expect(isBreachedPassword("safe")).resolves.toBe(false);
  });
});
