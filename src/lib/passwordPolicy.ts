// Password policy shared by the signup form and the manage-accounts edge function.
// The auth server (GoTrue) enforces the global minimum length; complexity and
// breached-password checks are enforced here (and server-side in the edge
// function for admin-created/updated accounts) because the managed-config
// complexity field is unavailable on this plan.

export const PASSWORD_RULES_TEXT =
  "At least 6 characters, with an uppercase letter, a lowercase letter, a number, and a symbol";

export const ADMIN_PASSWORD_RULES_TEXT =
  "At least 12 characters, with an uppercase letter, a lowercase letter, a number, and a symbol";

const GROUPS: Array<[RegExp, string]> = [
  [/[a-z]/, "a lowercase letter"],
  [/[A-Z]/, "an uppercase letter"],
  [/[0-9]/, "a number"],
  [/[^A-Za-z0-9]/, "a symbol"],
];

/**
 * Validate a password for a given role. Returns null when valid, otherwise a
 * human-readable reason. Complexity is required for every account; admins must
 * additionally use at least 12 characters.
 */
export function validatePassword(password: string, role: "student" | "admin"): string | null {
  // Students keep their existing 6-character minimum but now need character
  // variety; admins must use at least 12 characters on top of that.
  const min = role === "admin" ? 12 : 6;
  if (typeof password !== "string" || password.length < min) {
    return role === "admin"
      ? `Admin passwords must be at least ${min} characters.`
      : `Password must be at least ${min} characters.`;
  }
  const missing = GROUPS.filter(([re]) => !re.test(password)).map(([, label]) => label);
  if (missing.length > 0) {
    return `Password must contain ${missing.join(", ")}.`;
  }
  return null;
}

/**
 * Check the password against the HaveIBeenPwned corpus via the k-anonymity
 * range API: only the first 5 characters of the SHA-1 hash leave the device,
 * so the password itself is never transmitted. Returns true when the password
 * appears in known breaches. Fails open (returns false) if the service is
 * unreachable — availability beats a hard dependency on a third party.
 */
export async function isBreachedPassword(password: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const digest = await crypto.subtle.digest("SHA-1", data);
    const hash = Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { "Add-Padding": "true" },
    });
    if (!res.ok) return false;
    const body = await res.text();
    for (const line of body.split("\n")) {
      const [hashSuffix] = line.trim().split(":");
      if (hashSuffix === suffix) return true;
    }
    return false;
  } catch {
    return false;
  }
}
