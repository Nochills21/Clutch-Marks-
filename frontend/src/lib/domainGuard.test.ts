// Repo-wide guard against the retired .com domain.
//
// The public site moved to clutchmarks.study. A single stale hard-coded domain is
// enough to point students at a dead host or a dead support inbox, and it can
// reappear anywhere — a JSX label, a mailto, a JSON-LD block, a legal page, a
// generated PDF footer — so a test that names three files cannot catch it.
//
// This scans *every tracked file* (what the repo actually ships) and requires
// each occurrence to be an explicitly listed, reasoned exemption. To add an
// exemption, add it below with a reason: an unreasoned exemption is how this
// kind of guard rots.
//
// NOTE: the pattern is written escaped (backslash before the dot). That keeps
// the plain literal out of this file, so the guard does not have to exempt
// itself — and it means every comment, title and reason here must avoid the
// plain literal too (write "the retired .com domain", not the address).
import { execFileSync } from "child_process";
import { readFileSync } from "fs";
import path from "path";
import { describe, it, expect } from "vitest";

const root = process.cwd();

/** The retired domain, matched literally. Deliberately escaped — see the note above. */
const RETIRED_DOMAIN = /clutchmarks\.com/i;

interface Exemption {
  /** Exact repo-relative path, or predicate over one (POSIX separators). */
  match: (file: string) => boolean;
  reason: string;
}

/**
 * Every occurrence the guard tolerates. Keep this list short: an entry here is a
 * promise that something else keeps the file honest.
 */
const EXEMPTIONS: Exemption[] = [
  {
    match: (file) => file === "frontend/src/lib/email-config.test.ts",
    reason:
      "Negative assertions: this file exists to prove the retired address is NOT used, so it has to name it.",
  },
  {
    match: (file) => file === "production/clutchmarks-frontend.html",
    reason:
      "Checked-in single-file production bundle (build output snapshot). Regenerate it from source instead of hand-editing it.",
  },
  {
    match: (file) => file.startsWith("public/downloads/") && file.endsWith(".pdf"),
    reason:
      "Generated PDF artifacts: the footer is baked in at generation time by .freebuff/pdftool, so the fix is to regenerate them.",
  },
];

/**
 * Tracked files are the repo's real contents; anything gitignored (node_modules,
 * dist, .env) is generated and gets fixed by its generator, not by editing it.
 */
function trackedFiles(): string[] {
  return execFileSync("git", ["ls-files", "-z"], {
    cwd: root,
    maxBuffer: 64 * 1024 * 1024,
  })
    .toString("utf8")
    .split("\0")
    .filter(Boolean);
}

interface Occurrence {
  file: string;
  line: number;
  text: string;
}

/**
 * latin1 maps bytes to chars one-for-one, so binary artifacts such as PDFs can
 * be scanned without decoding errors swallowing the match.
 */
function scan(file: string): Occurrence[] {
  let text: string;
  try {
    text = readFileSync(path.join(root, file)).toString("latin1");
  } catch {
    return []; // unreadable (broken symlink, permissions) — nothing to report
  }
  const found: Occurrence[] = [];
  for (const [i, line] of text.split("\n").entries()) {
    if (RETIRED_DOMAIN.test(line)) {
      found.push({ file, line: i + 1, text: line.trim().slice(0, 160) });
    }
  }
  return found;
}

const occurrences = trackedFiles().flatMap(scan);

const isExempt = (file: string) => EXEMPTIONS.some((e) => e.match(file));

const buildReport = (offenders: Occurrence[]) =>
  [
    `Found ${offenders.length} reference(s) to the retired domain.`,
    "",
    ...offenders.map((o) => `  ${o.file}:${o.line}  ${o.text}`),
    "",
    "Replace them with the live origin (SITE.url / SITE.supportEmail) or, if the",
    "mention is deliberate, add the file to EXEMPTIONS in this file with a reason.",
  ].join("\n");

describe("retired site domain", () => {
  it("matches the retired address and ignores the live one", () => {
    // Self-check: keeps the block above from silently passing on a broken pattern.
    expect(RETIRED_DOMAIN.test("support@" + "clutchmarks" + "." + "com")).toBe(true);
    expect(RETIRED_DOMAIN.test("support@clutchmarks.study")).toBe(false);
    expect(RETIRED_DOMAIN.test("https://clutchmarks.study/legal")).toBe(false);
  });

  it("appears in no tracked file outside the listed exemptions", () => {
    const offenders = occurrences.filter((o) => !isExempt(o.file));
    expect(offenders.map((o) => `${o.file}:${o.line}`), buildReport(offenders)).toEqual([]);
  });

  it("still has every exemption covering a real occurrence", () => {
    // A stale exemption silently widens the hole this guard is meant to close,
    // so an exemption that no longer matches anything is a failure.
    const stale = EXEMPTIONS.filter((e) => !occurrences.some((o) => e.match(o.file)));
    expect(
      stale.map((e) => e.reason),
      `Delete these exemptions from ${path.relative(root, __filename)} — they no longer match anything.`,
    ).toEqual([]);
  });
});
