import { describe, expect, it } from "vitest";
import { formatCodeInput } from "./mfa";

// The code box is the one piece of the second factor that is pure formatting;
// everything else is GoTrue's. These cases are the ones a person actually
// produces: pasting a code with a space, typing past six digits, pasting a whole
// otpauth URI by mistake.
describe("formatCodeInput", () => {
  it("groups six digits the way an authenticator app shows them", () => {
    expect(formatCodeInput("123456")).toBe("123 456");
    expect(formatCodeInput("123")).toBe("123");
    expect(formatCodeInput("1234")).toBe("123 4");
  });

  it("strips everything that is not a digit", () => {
    expect(formatCodeInput("123 456")).toBe("123 456");
    expect(formatCodeInput(" 123-456 ")).toBe("123 456");
    expect(formatCodeInput("12a3b4c5d6")).toBe("123 456");
  });

  it("keeps only the first six digits", () => {
    expect(formatCodeInput("123456789")).toBe("123 456");
    expect(formatCodeInput("1234567")).toBe("123 456");
  });

  it("treats empty and null-ish input as empty rather than throwing", () => {
    expect(formatCodeInput("")).toBe("");
    expect(formatCodeInput(undefined as unknown as string)).toBe("");
  });
});
