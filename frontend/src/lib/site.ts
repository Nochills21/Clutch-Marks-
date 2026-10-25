/**
 * Single source of truth for site identity, so moving the public origin (preview
 * host, custom domain, or a future rename) is one build variable rather than a
 * sweep through hard-coded URLs.
 *
 * The JSON-LD blocks inside older pages still hard-code the original Lovable
 * URL — those should be migrated to SITE.url as each page is restyled.
 */
import { SITE_URL } from "@/lib/env";
import { subjectCoverage } from "@/lib/subjectCatalogue";
import { SITE_LEGAL_NAME } from "@/lib/seoRoutes";

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
  // The inbox the privacy notice, data-rights page and app shell all point at.
  // It must stay the address that is actually live (inbound routed via Resend —
  // see docs/infrastructure.md): a personal mailbox here silently publishes a
  // different contact on the legal pages than everywhere else.
  supportEmail: "support@clutchmarks.study",
  /** Brand gold — keep in step with --gold in src/index.css. */
  gold: "#E8B01E",
  goldDeep: "#C6821A",
} as const;

export const absoluteUrl = (path: string) =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
