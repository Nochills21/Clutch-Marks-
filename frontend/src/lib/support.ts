/**
 * The one support address, deliberately dependency-free.
 *
 * `site.ts` re-exports it as `SITE.supportEmail` for the app shell, the legal
 * pages and the homepage, and every other surface takes it from there. The
 * crash boundary imports this module directly rather than `site.ts`, which
 * reads the subject catalogue: the fallback has to render even when an ordinary
 * import is what broke.
 *
 * The mailbox must be one a person actually reads. The domain inbox
 * (support@clutchmarks.study) forwards here — see docs/infrastructure.md — and
 * the sending identity (no-reply@) is a separate thing, never a contact route.
 */
export const SUPPORT_EMAIL = "clutchmarks.support@gmail.com";

/** `mailto:` for the support address, with an optional pre-filled subject. */
export function supportMailto(subject?: string): string {
  const base = `mailto:${SUPPORT_EMAIL}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
