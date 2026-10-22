/**
 * One definition of a username, shared by signup, account settings and the
 * client-side guard.
 *
 * The database is the authority — `public.username_is_canonical`,
 * `public.username_sanitize` and `public.set_my_username` enforce the same
 * shape — but the form needs to say *why* a value is rejected before a round
 * trip, and `login-with-username` resolves case-insensitively, so the two must
 * agree. Keep this file and the migration in step.
 */
export const USERNAME_MIN = 3;
export const USERNAME_MAX = 32;

/** Lower-case letters, digits, dot, dash, underscore. Same as the SQL regex. */
export const USERNAME_RE = new RegExp(`^[a-z0-9._-]{${USERNAME_MIN},${USERNAME_MAX}}$`);

export const USERNAME_RULES =
  "3–32 characters: lowercase letters, numbers, dots, dashes or underscores.";

export type UsernameProblem = "empty" | "too_short" | "too_long" | "characters";

const MESSAGES: Record<UsernameProblem, string> = {
  empty: "Choose a username.",
  too_short: `Usernames need at least ${USERNAME_MIN} characters.`,
  too_long: `Usernames can be at most ${USERNAME_MAX} characters.`,
  characters: "Use only lowercase letters, numbers, dots, dashes and underscores.",
};

/** The same normalisation the signup form and the database apply. */
export function normalizeUsername(raw: string): string {
  return String(raw ?? "")
    .trim()
    .replace(/^@+/, "")
    .toLowerCase();
}

export function usernameProblem(raw: string): UsernameProblem | null {
  const value = normalizeUsername(raw);
  if (!value) return "empty";
  if (value.length < USERNAME_MIN) return "too_short";
  if (value.length > USERNAME_MAX) return "too_long";
  if (!USERNAME_RE.test(value)) return "characters";
  return null;
}

// A string discriminant, not a boolean one: this project compiles with
// `strict: false`, where `ok: true | false` widens to `boolean` and TypeScript
// stops narrowing the union at the call site.
export type UsernameCheck =
  | { status: "valid"; value: string }
  | { status: "invalid"; problem: UsernameProblem; message: string };

/**
 * Normalise and validate in one step. The returned `value` is what should be
 * sent to the server — never the raw input.
 */
export function validateUsername(raw: string): UsernameCheck {
  const value = normalizeUsername(raw);
  const problem = usernameProblem(value);
  if (problem) return { status: "invalid", problem, message: MESSAGES[problem] };
  return { status: "valid", value };
}
