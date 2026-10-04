// Past-paper file helpers.
//
// The archive rows carry the board's own paper code in two places — the title
// ("… Computer Science 0478 — Paper 1: Computer Systems (0478/12)") and the
// trailing digits of `paper_number` ("Paper 1 (12)") — while the PDFs an admin
// downloads from the boards are named by convention:
//
//   Cambridge: 0478_s24_qp_12.pdf      (qp = question paper, ms = mark scheme)
//   Cambridge: 0625_w23_ms_42.pdf
//   Edexcel:   WMA12_01_que_20240118.pdf
//   Edexcel:   WMA12_01_msc_20240307.pdf
//
// Both sides are parsed here so a folder of papers can be attached in bulk
// without the admin hand-picking a row per file.

export type PaperKind = "paper" | "mark_scheme" | "unknown";

export interface ArchivePaper {
  id: string;
  title: string;
  year: number | null;
  session: string | null;
  paper_number: string | null;
}

export interface ParsedPaperFileName {
  fileName: string;
  /** Board paper/syllabus code, uppercase: "0478", "WMA12", "9709". */
  code: string | null;
  /** Paper identifier as used by the board: "12", "41", "01". */
  paperToken: string | null;
  year: number | null;
  session: string | null;
  kind: PaperKind;
}

export interface PaperFileMatch {
  file: ParsedPaperFileName;
  /** Chosen row, or the only candidate when the match is exact. */
  row: ArchivePaper | null;
  status: "ready" | "ambiguous" | "unmatched";
  /** Rows the file could belong to when `status` is "ambiguous". */
  candidates: ArchivePaper[];
  /** Short, human-readable explanation of the decision. */
  reason: string;
}

const SESSIONS = ["Feb/Mar", "May/June", "Oct/Nov"];

/** `(0478/12)` or `(WMA12/01)` — the board's code + paper number. */
const TITLE_CODE_RE = /\(([A-Z]{2,4}\d{2,4}|\d{4})\s*\/\s*(\d{1,3})\)/i;
/** Fallback: any 4-digit syllabus code that appears in the title. */
const TITLE_BARE_CODE_RE = /\b(\d{4})\b/;
/** `Paper 1 (12)` / `Paper 2 (21)` — trailing digits are the paper token. */
const PAPER_NUMBER_RE = /\((\d{1,3})\)\s*$/;

/** Tokens that identify what a file is. */
const KIND_TOKENS: Record<string, PaperKind> = {
  qp: "paper",
  q: "paper",
  que: "paper",
  question: "paper",
  ms: "mark_scheme",
  msc: "mark_scheme",
  msd: "mark_scheme",
  rms: "mark_scheme",
  mrk: "mark_scheme",
  mark: "mark_scheme",
};

/**
 * Scan the filename into meaningful pieces, in order.
 *
 * Scanning (rather than splitting on separators) keeps `s24` whole — splitting
 * on the letter/digit boundary turned it into `s` + `24`, which then read `24`
 * as the paper number and lost the session and year entirely. It also copes
 * with names that have no separators at all, like `0580S24QP22v2`.
 */
const PIECE_RE = /([smw]\d{2})|(20\d{6})|([a-z]{2,4}\d{2,4})|(\d{4})|([a-z]+)|(\d{1,3})/gi;

function scanPieces(fileName: string): string[] {
  const base = fileName.replace(/\.[a-z0-9]+$/i, "").toLowerCase();
  return [...base.matchAll(PIECE_RE)].map((m) => m[0]);
}

/** Turn a 2-digit board year ("24") into 2024. */
function toFullYear(twoDigits: string): number | null {
  const n = Number(twoDigits);
  if (!Number.isFinite(n)) return null;
  return n >= 90 ? 1900 + n : 2000 + n;
}

/** Session letter used by Cambridge: s = May/June, w = Oct/Nov, m = Feb/Mar. */
function sessionFromLetter(letter: string): string | null {
  if (letter === "s") return "May/June";
  if (letter === "w") return "Oct/Nov";
  if (letter === "m") return "Feb/Mar";
  return null;
}

/** Month of an Edexcel-style yyyymmdd date → the session the archive uses. */
function sessionFromMonth(month: number): string | null {
  if (month >= 1 && month <= 3) return "Feb/Mar";
  if (month >= 5 && month <= 6) return "May/June";
  if (month >= 9 && month <= 11) return "Oct/Nov";
  return null;
}

export function parsePaperFileName(fileName: string): ParsedPaperFileName {
  const tokens = scanPieces(fileName);
  let code: string | null = null;
  let paperToken: string | null = null;
  let year: number | null = null;
  let session: string | null = null;
  let kind: PaperKind = "unknown";

  for (const token of tokens) {
    // 4-digit syllabus code (Cambridge) — skip the 4-digit year range.
    if (/^\d{4}$/.test(token) && !code) {
      const asYear = Number(token);
      if (asYear >= 2015 && asYear <= 2035) { year ??= asYear; continue; }
      code = token;
      continue;
    }
    // Letter-led board code: WMA12, YPH11, XMA01.
    const boardCode = token.match(/^([a-z]{2,4})(\d{2})$/);
    if (boardCode && !code) { code = (boardCode[1] + boardCode[2]).toUpperCase(); continue; }
    // Cambridge session token: s24 / w23 / m21.
    const sessionToken = token.match(/^([smw])(\d{2})$/);
    if (sessionToken) {
      session ??= sessionFromLetter(sessionToken[1]);
      year ??= toFullYear(sessionToken[2]);
      continue;
    }
    // Edexcel exam date: 20240118.
    const dateToken = token.match(/^(20\d{2})(0[1-9]|1[0-2])([0-3]\d)$/);
    if (dateToken) {
      year ??= Number(dateToken[1]);
      session ??= sessionFromMonth(Number(dateToken[2]));
      continue;
    }
    if (KIND_TOKENS[token]) { kind = KIND_TOKENS[token]; continue; }
    if (/^\d{1,3}$/.test(token) && !paperToken) {
      const n = Number(token);
      // Plausible paper numbers only: 1–99 but not a year fragment.
      if (n >= 1 && n <= 99) { paperToken = String(n).padStart(2, "0"); continue; }
    }
  }

  return { fileName, code, paperToken, year, session, kind };
}

export function archivePaperKeys(row: ArchivePaper): { code: string | null; paperToken: string | null } {
  const title = row.title ?? "";
  const codeMatch = title.match(TITLE_CODE_RE);
  let code: string | null = null;
  let paperToken: string | null = null;

  if (codeMatch) {
    code = codeMatch[1].toUpperCase();
    paperToken = codeMatch[2].padStart(2, "0");
  } else {
    const bare = title.match(TITLE_BARE_CODE_RE);
    if (bare) code = bare[1];
  }
  if (!paperToken) {
    const num = (row.paper_number ?? "").match(PAPER_NUMBER_RE);
    if (num) paperToken = num[1].padStart(2, "0");
  }
  return { code, paperToken };
}

/** Score a candidate: higher is better; -1 means "cannot be this row". */
function scoreCandidate(file: ParsedPaperFileName, row: ArchivePaper): number {
  const keys = archivePaperKeys(row);
  // The code is the strongest signal — without it, a match is a guess.
  if (!file.code || !keys.code || file.code !== keys.code) return -1;
  let score = 10;
  if (file.paperToken && keys.paperToken && file.paperToken === keys.paperToken) score += 10;
  else if (file.paperToken && keys.paperToken) return -1; // both known, they disagree
  if (file.year) {
    if (!row.year || row.year !== file.year) return -1;
    score += 5;
  }
  if (file.session) {
    if (row.session === file.session) score += 3;
  }
  return score;
}

/**
 * Match a folder of board PDFs to archive rows.
 *
 * `status` is "ready" when one row stands clearly above the rest, "ambiguous"
 * when several rows tie (the archive keeps one row per year/session, so a file
 * with no year token cannot choose between them), and "unmatched" when no row
 * carries the same board code.
 */
export function matchPaperFiles(fileNames: string[], rows: ArchivePaper[]): PaperFileMatch[] {
  return fileNames.map((fileName) => {
    const file = parsePaperFileName(fileName);
    if (!file.code) {
      return { file, row: null, status: "unmatched" as const, candidates: [], reason: "No board paper code in the filename" };
    }
    const scored = rows
      .map((row) => ({ row, score: scoreCandidate(file, row) }))
      .filter((s) => s.score >= 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
      return { file, row: null, status: "unmatched" as const, candidates: [], reason: `No archive row for ${file.code}` };
    }
    const best = scored[0];
    const tied = scored.filter((s) => s.score === best.score);
    if (tied.length > 1) {
      return {
        file,
        row: null,
        status: "ambiguous" as const,
        candidates: tied.map((t) => t.row),
        reason: `Same code and paper in ${tied.length} years — pick one`,
      };
    }
    const missing = !file.year && !file.session && !file.paperToken;
    if (missing) {
      return { file, row: null, status: "ambiguous" as const, candidates: scored.map((s) => s.row), reason: "Filename carries no year, session or paper number" };
    }
    return {
      file,
      row: best.row,
      status: "ready" as const,
      candidates: [best.row],
      reason: file.year && file.session ? `${file.code}/${file.paperToken ?? "—"} · ${file.session} ${file.year}` : `${file.code}/${file.paperToken ?? "—"}`,
    };
  });
}

/** Human name for the exam board behind a source URL. */
export function boardLabel(sourceUrl: string | null | undefined): string | null {
  if (!sourceUrl) return null;
  let host: string;
  try {
    host = new URL(sourceUrl).hostname.toLowerCase();
  } catch {
    return null;
  }
  if (host.endsWith("cambridgeinternational.org")) return "Cambridge International";
  if (host.endsWith("pearson.com") || host.endsWith("edexcel.com")) return "Pearson Edexcel";
  if (host.endsWith("ocr.org.uk")) return "OCR";
  if (host.endsWith("aqa.org.uk")) return "AQA";
  if (host.endsWith("wjec.co.uk")) return "WJEC";
  if (host.endsWith("ccea.org.uk")) return "CCEA";
  return host.replace(/^www\./, "");
}

export const ALL_SESSIONS = SESSIONS;

/** Sessions the boards run, in calendar order. `Specimen` is included so the
 *  sample papers (which carry their own session) are always reachable. */
export const SESSION_ORDER = ["Feb/Mar", "May/June", "Oct/Nov", "Specimen"];

/** Order sessions by the board calendar, extras last. */
export function sortSessions(a: string, b: string): number {
  const ia = SESSION_ORDER.indexOf(a);
  const ib = SESSION_ORDER.indexOf(b);
  if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  return a.localeCompare(b);
}

/** Anything the archive filter needs from a row. The row may carry more. */
export interface ArchiveFilterablePaper {
  title: string;
  year?: number | null;
  session?: string | null;
  paper_number?: string | null;
  level?: string | null;
  source_url?: string | null;
}

export interface ArchiveFilters {
  /** Free-text query; matches title/paper/session/board/year. */
  search?: string;
  /** `subject_level` id. `null`/"all" = any. */
  level?: string | null;
  /** Board label, e.g. "Pearson Edexcel". `null`/"all" = any. */
  board?: string | null;
  /** Paper-group label, e.g. "Paper 1". `null`/"all" = any. */
  paper?: string | null;
  /** e.g. "May/June", "Specimen". `null`/"all" = any. */
  session?: string | null;
  /** Exact year. `null`/"all" = any. */
  year?: number | null;
}

/**
 * Exam board behind an archive row. The title leads with the board for most
 * rows ("Cambridge IGCSE …", "Edexcel IAL …"); the 9600-series AS/A Level rows
 * carry no board prefix, so fall back to the source link, then to Cambridge.
 */
export function archiveBoard(p: ArchiveFilterablePaper): string {
  const title = String(p?.title ?? "");
  if (/^edexcel\b/i.test(title)) return "Pearson Edexcel";
  if (/^cambridge\b/i.test(title)) return "Cambridge International";
  return boardLabel(p?.source_url) ?? "Cambridge International";
}

/**
 * The part of the title after the em dash is the paper's own name
 * ("Paper 1: Core (0580/12)", "Unit 3: …", "Mechanics M1 (WME01/01)"). Strip
 * the board code in parentheses and collapse numbered papers to "Paper 1" /
 * "Unit 3" so the filter stays short.
 */
export function archivePaperGroup(p: ArchiveFilterablePaper): string {
  const title = String(p?.title ?? "");
  const after = title.includes("—") ? title.slice(title.indexOf("—") + 1).trim() : "";
  const base = (after || String(p?.paper_number ?? "")).replace(/\s*\([^)]*\)\s*$/, "").trim();
  const numbered = base.match(/^(paper|unit)\s+(\d+)/i);
  if (numbered) return `${numbered[1][0].toUpperCase()}${numbered[1].slice(1).toLowerCase()} ${numbered[2]}`;
  return base || String(p?.paper_number ?? "") || "—";
}

/** Papers first, then units, then the named Edexcel modules. */
export function paperSortKey(label: string): string {
  const numbered = label.match(/^(paper|unit)\s+(\d+)/i);
  if (numbered) return `${numbered[1].toLowerCase() === "paper" ? "0" : "1"}-${String(Number(numbered[2])).padStart(2, "0")}`;
  return `2-${label.toLowerCase()}`;
}

/** True when a row survives every non-`null` filter in `filters`. */
export function matchesArchiveFilters(p: ArchiveFilterablePaper, filters: ArchiveFilters): boolean {
  if (filters.level && filters.level !== "all" && p.level !== filters.level) return false;
  if (filters.board && filters.board !== "all" && archiveBoard(p) !== filters.board) return false;
  if (filters.paper && filters.paper !== "all" && archivePaperGroup(p) !== filters.paper) return false;
  if (filters.session && filters.session !== "all" && (p.session ?? "") !== filters.session) return false;
  if (filters.year != null && p.year !== filters.year) return false;
  const q = (filters.search ?? "").trim().toLowerCase();
  if (q) {
    const hay = [p.title, p.paper_number, p.session, archiveBoard(p), archivePaperGroup(p), String(p.year ?? "")]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

/**
 * Apply the archive filters to a list of rows.
 *
 * Deliberately pure and, crucially, applied to the *whole* list — callers must
 * run this before any free-preview slice, otherwise a search only ever sees the
 * first few rows and older papers / specimens look missing.
 */
export function filterArchivePapers<T extends ArchiveFilterablePaper>(papers: T[], filters: ArchiveFilters): T[] {
  return papers.filter((p) => matchesArchiveFilters(p, filters));
}
