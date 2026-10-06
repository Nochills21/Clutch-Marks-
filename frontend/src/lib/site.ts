/**
 * Single source of truth for site identity, so the switch from the temporary
 * pages.dev host to clutchmarks.com is one build variable rather than a sweep
 * through hard-coded URLs.
 *
 * The JSON-LD blocks inside older pages still hard-code the original Lovable
 * URL — those should be migrated to SITE.url as each page is restyled.
 */
import { SITE_URL } from "@/lib/env";

export const SITE = {
  name: "Clutch Marks",
  /** Public origin, no trailing slash. Override with VITE_SITE_URL in CI. */
  url: SITE_URL,
  tagline: "Revise smarter. Score higher.",
  description:
    "Revision notes, exam-style topic questions with instant marking, and past papers with mark schemes for Maths, Physics and Computer Science at OL, AS and A2.",
  supportEmail: "support@clutchmarks.study",
  /** Brand gold — keep in step with --gold in src/index.css. */
  gold: "#E8B01E",
  goldDeep: "#C6821A",
} as const;

export const absoluteUrl = (path: string) =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
