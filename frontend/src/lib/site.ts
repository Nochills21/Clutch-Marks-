/**
 * Single source of truth for site identity, so moving the public origin (preview
 * host, custom domain, or a future rename) is one build variable rather than a
 * sweep through hard-coded URLs.
 *
 * Every JSON-LD block and every hard-coded origin reads these values — there is
 * no second place where a domain is written down.
 */
import { SITE_URL } from "@/lib/env";
import { subjectCoverage } from "@/lib/subjectCatalogue";
import { SITE_LEGAL_NAME } from "@/lib/seoRoutes";
import { SUPPORT_EMAIL } from "@/lib/support";

export const SITE = {
  name: "Clutch Marks",
  /**
   * The legal entity that owns and licenses the site. Used where the copy is a
   * legal statement rather than the product name — the copyright line, the
   * privacy notice's controller, the terms' ownership clause, the Organization
   * JSON-LD and the watermark on served PDFs. The brand stays `name`.
   */
  legalName: SITE_LEGAL_NAME,
  /** Public origin, no trailing slash. Override with VITE_SITE_URL in CI. */
  url: SITE_URL,
  tagline: "Revise smarter. Score higher.",
  description: `Topic notes, exam-style questions with instant marking, and a past-paper archive for ${subjectCoverage()}.`,
  // The inbox the privacy notice, data-rights page, footer, crash screen, error
  // pages, feedback form and AI-marker copy all point at. It must stay the
  // mailbox that is actually monitored: a stale address here silently publishes
  // a different contact on one surface than another. The literal lives in
  // `@/lib/support` so the crash boundary can read it without importing this
  // module (which builds strings from the subject catalogue). The sending
  // identity (no-reply@clutchmarks.study) is a separate thing — see
  // docs/infrastructure.md.
  supportEmail: SUPPORT_EMAIL,
  /** Brand gold — keep in step with --gold in src/index.css. */
  gold: "#E8B01E",
  goldDeep: "#C6821A",
} as const;

export const absoluteUrl = (path: string) =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
