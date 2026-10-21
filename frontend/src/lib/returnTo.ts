// Where to send someone after they sign in.
//
// The app used to bounce a signed-out visitor to /auth and then always land
// them on /dashboard, so opening a deep link (a topic, the AI marker, a quiz)
// while signed out meant finding the page again by hand. The intended path now
// travels in `?next=`, and this is the one place that decides whether it is
// safe to follow.
//
// A redirect target taken from a URL is a classic open-redirect sink, so the
// rules are allow-list shaped: same-origin absolute paths only, nothing that a
// browser could read as another origin, and nothing that would loop back into
// the sign-in flow. Anything that fails is discarded in favour of the default.

/** Longest target we will carry; real app paths are far shorter. */
const MAX_LENGTH = 2000;

/**
 * Routes that would bounce the user straight back to the sign-in form, or that
 * only make sense mid-flow, so they are never a legitimate post-login target.
 */
const DISALLOWED_PREFIXES = ["/auth", "/reset-password"];

/**
 * Normalise a `?next=` value into a path we are willing to navigate to.
 *
 * Returns `null` when the value is missing or unsafe; callers fall back to the
 * dashboard.
 *
 * Rejected on purpose:
 * - `https://evil.example` and `//evil.example` — not our origin.
 * - `/\evil.example` — browsers resolve the backslash to a slash, so this is
 *   `//evil.example` wearing a disguise.
 * - `/authentic`-style values are fine (prefix matching is on whole segments),
 *   but `/auth` and `/auth/callback` are not, because they loop.
 * - control characters and newlines, which can be used to smuggle a different
 *   header/value past naive checks.
 */
export function safeReturnTo(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.length > MAX_LENGTH) return null;

  // Leading whitespace can be trimmed by some parsers; only an exact leading
  // slash counts, so test the raw value.
  if (!value.startsWith("/")) return null;
  // Protocol-relative ("//host") and backslash variants both leave the origin.
  if (value.startsWith("//") || value.includes("\\")) return null;
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(value)) return null;

  const path = value.split(/[?#]/)[0] ?? "";
  for (const prefix of DISALLOWED_PREFIXES) {
    if (path === prefix || path.startsWith(`${prefix}/`)) return null;
  }

  return value;
}

/** The post-login destination: the safe `next`, else the dashboard. */
export function postLoginPath(next: string | null | undefined): string {
  return safeReturnTo(next) ?? "/dashboard";
}
