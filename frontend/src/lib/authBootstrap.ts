/**
 * When the app is allowed to load the Supabase client at all.
 *
 * The client is 173 kB of vendor code, and `AuthProvider` used to import it
 * eagerly, so every visitor downloaded it — and then the provider immediately
 * called `getSession()` and subscribed to `onAuthStateChange` — before the
 * landing page could even paint. For `/` none of that can change what is
 * rendered: the landing page shows the same header and the same CTAs whether or
 * not anyone is signed in. So the rule is: load it when the page needs it, or
 * when a session is already stored.
 *
 * This module is deliberately dependency-free (no Supabase, no React) so the
 * rule can be unit-tested without a network, and so importing it costs nothing.
 */

/**
 * Routes whose content is readable without an account.
 *
 * Moved from `AppLayout`, which used its own copy to decide whether to bounce a
 * signed-out visitor to /auth: the tables behind these pages allow anonymous
 * SELECT (the app is built to be crawlable), so both rules must agree. Two
 * copies drifting is how a page ends up "public enough to index, private enough
 * to redirect".
 */
export const PUBLIC_CONTENT_PREFIXES = [
  "/subjects",
  "/lessons",
  "/notes",
  "/quizzes",
  "/past-papers",
  "/study/",
] as const;

/**
 * Marketing and legal pages. They render their own chrome (`PublicShell`) and
 * are prerendered for crawlers, so an anonymous visitor is a first-class case.
 */
const PUBLIC_STANDALONE_PATHS = ["/", "/pricing", "/privacy", "/terms", "/data-rights", "/downloads"];

/**
 * Pathname → the page's content is readable by a signed-out visitor.
 *
 * Matched by whole segment, not by bare prefix: `startsWith` alone made
 * `/past-papers-archive` public content because it starts with `/past-papers`,
 * and would do the same for a future `/notes-old` page. A prefix only extends to
 * a `/`.
 */
export function isPublicContentPath(pathname: string): boolean {
  return PUBLIC_CONTENT_PREFIXES.some((prefix) => {
    const base = prefix.replace(/\/$/, "");
    return pathname === base || pathname.startsWith(`${base}/`);
  });
}

/** Pathname → the page renders correctly for a signed-out visitor. */
export function isSignedOutOkPath(pathname: string): boolean {
  const normalised = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return isPublicContentPath(normalised) || PUBLIC_STANDALONE_PATHS.includes(normalised);
}

function browserStorage(): Storage | null {
  try {
    // Safari in private mode has a localStorage whose *access* throws, not just
    // its writes, so this has to be wrapped rather than feature-detected.
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch {
    return null;
  }
}

/**
 * Does the browser hold a Supabase session? The library stores its session as
 * `sb-<project-ref>-auth-token` (plus a `-code-verifier` while a PKCE sign-in is
 * in flight), in localStorage by default — the client is created with
 * `storage: localStorage`, so cookies are not in play here.
 *
 * Reading the key is not the same as trusting it: the provider still asks
 * GoTrue who the session belongs to. This only decides whether to ask at all.
 */
export function hasStoredSession(storage: Storage | null = browserStorage()): boolean {
  if (!storage) return false;
  try {
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (key && /^sb-.*-auth-token/i.test(key)) return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Whether this page load should boot auth (fetch the client, restore the
 * session, subscribe to changes).
 *
 * A stored session always boots, even on the landing page: the subject picker
 * there reads the signed-in user, and someone who is signed in expects the app
 * to know it. What this avoids is the anonymous case — which is most landing
 * page traffic — where none of it can affect the render.
 */
export function shouldBootstrapAuth(pathname: string): boolean {
  if (hasStoredSession()) return true;
  return !isSignedOutOkPath(pathname);
}

