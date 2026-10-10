import { SITE } from "@/lib/site";

/**
 * The privacy/terms documents, reduced to the few values code depends on.
 *
 * PDPL (Saudi Personal Data Protection Law) compliance rests on being able to
 * show *which* version of a document a reader accepted and *when*. That only
 * works if the version is one value shared by the page that renders the
 * document and the form that records the acceptance — so they live here, and
 * the two cannot drift apart.
 *
 * Bump a version whenever the corresponding document changes materially: a
 * reader who accepted the old text has not accepted the new one, and the
 * consent records keep both, in order, with their timestamps.
 */

/**
 * Every privacy question, request and complaint lands here. Taken from the site
 * identity rather than repeated, so the notice, the rights page, the app shell
 * and the emails cannot drift to different inboxes.
 */
export const PRIVACY_CONTACT_EMAIL = SITE.supportEmail;

/**
 * Document versions, stored verbatim with each acceptance. Date-shaped so the
 * audit trail reads as a timeline; change them when the text changes.
 */
export const PRIVACY_POLICY_VERSION = "2026-10-08";
export const TERMS_VERSION = "2026-10-08";

/** Human-readable date shown on the legal pages. */
export const LEGAL_LAST_UPDATED = "8 October 2026";

export type ConsentKind = "privacy" | "terms" | "guardian" | "marketing";

/** What the signup form sends; recorded by the auth trigger on account creation. */
export interface SignupConsent {
  privacy_version: string;
  terms_version: string;
  accepted_at: string;
}

export function buildSignupConsent(acceptedAt: Date = new Date()): SignupConsent {
  return {
    privacy_version: PRIVACY_POLICY_VERSION,
    terms_version: TERMS_VERSION,
    accepted_at: acceptedAt.toISOString(),
  };
}

/** Where a data-subject request is sent, and where the notice points. */
export const PRIVACY_CONTACT_HREF = `mailto:${PRIVACY_CONTACT_EMAIL}`;

/**
 * Questions a reader can file from /data-rights. `kind` matches the check
 * constraint on public.data_requests, so a new value here needs a migration.
 */
export const DATA_REQUEST_KINDS = [
  { kind: "access", label: "See everything you hold about me" },
  { kind: "portability", label: "Send me a portable copy" },
  { kind: "correction", label: "Correct something that is wrong" },
  { kind: "objection", label: "Stop a particular use" },
  { kind: "deletion", label: "Delete my account and data" },
] as const;

export type DataRequestKind = (typeof DATA_REQUEST_KINDS)[number]["kind"];

/** How long we promise to answer a request — stated in the notice too. */
export const DATA_REQUEST_RESPONSE_DAYS = 30;
