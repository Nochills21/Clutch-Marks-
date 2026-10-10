// The Clutch Marks document frame.
//
// Every PDF the platform hands a student (a lesson, a flashcard deck, an
// AI-marked script) is drawn through this module so the output is *ours*: the
// brand tile and wordmark, a gold hairline, tabular page numbers, and a
// per-page watermark carrying the account the file was generated for.
//
// Two rules keep it from becoming a liability:
//   * The watermark identity is passed in, never fetched here. A PDF writer
//     that talks to Supabase cannot be unit-tested, and the callers already
//     have the signed-in user.
//   * Nothing about it throws. A missing logo or an environment without a
//     canvas/FileReader (jsdom) degrades to a text-only frame rather than
//     failing the export the student asked for.

import { jsPDF, GState } from "jspdf";

/** Brand words. Kept here so no PDF ever spells the product differently. */
export const BRAND = {
  name: "Clutch Marks",
  domain: "clutchmarks.study",
  tagline: "Cambridge notes, marking and progress in one place",
} as const;

/** Brand palette as RGB triples (the UI tokens are HSL; PDFs need absolutes). */
export const BRAND_INK: [number, number, number] = [21, 20, 25];
export const BRAND_GOLD: [number, number, number] = [186, 127, 8];
export const BRAND_GOLD_BRIGHT: [number, number, number] = [249, 183, 16];
export const BRAND_MUTED: [number, number, number] = [110, 110, 120];
export const BRAND_RULE: [number, number, number] = [229, 226, 220];
export const BRAND_CREAM: [number, number, number] = [255, 253, 250];
export const BRAND_RED: [number, number, number] = [178, 45, 45];
export const BRAND_GREEN: [number, number, number] = [22, 128, 90];

/** Page geometry, in millimetres (jsPDF's default unit). */
export const PAGE_MARGIN = 15;
/** Height of the tinted brand band at the top of page 1. */
export const BAND_HEIGHT = 30;
/** Y below which no new line should be started (footers live under it). */
export const FOOTER_RESERVE = 16;

/** Who the file was generated for — burned into the watermark and footer. */
export interface BrandIdentity {
  /** Email, username or "Name (email)" for the signed-in account. */
  owner?: string | null;
  /** Short reference shown in the footer (audit ref, set id, paper slug…). */
  ref?: string | null;
  /** ISO string or Date; defaults to "now". */
  generatedAt?: string | Date | null;
}

export interface BrandedDocOptions {
  /** Document title, drawn in the brand band. */
  title: string;
  /** One-line context under the title (subject · level · paper …). */
  subtitle?: string | null;
  /** Right-hand label in the band, e.g. "Marked script" or "Revision notes". */
  kind?: string | null;
  identity?: BrandIdentity | null;
}

/* ────────────────────────────── brand tile ────────────────────────────── */

let markPromise: Promise<string | null> | null = null;

/**
 * The brand tile as a data URL, or null when it cannot be read.
 *
 * Cached for the lifetime of the page: a flashcard deck export renders one
 * document, but a student exporting three lessons in a row should not refetch
 * the same PNG each time. jsdom has no `FileReader`, so this resolves to null
 * in tests instead of rejecting.
 */
export function loadBrandMark(): Promise<string | null> {
  if (markPromise) return markPromise;
  markPromise = (async () => {
    try {
      if (typeof fetch !== "function" || typeof FileReader === "undefined") return null;
      const res = await fetch("/brand/mark-512.png", { cache: "force-cache" });
      if (!res.ok) return null;
      const blob = await res.blob();
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("Could not read the brand mark"));
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  })();
  return markPromise;
}

/** Test seam: forget the cached tile (also used after a theme/brand rebuild). */
export function resetBrandMarkCache() {
  markPromise = null;
}

/* ─────────────────────────────── the frame ────────────────────────────── */

export interface WriteOptions {
  size?: number;
  bold?: boolean;
  italic?: boolean;
  font?: "helvetica" | "times" | "courier";
  color?: [number, number, number];
  /** Line height in mm; defaults to ~1.35 × size. */
  lineHeight?: number;
  /** Keep the whole block on one page when it fits (off = split across pages). */
  keepTogether?: boolean;
  /** Left inset in mm. */
  indent?: number;
}

export interface PdfFrame {
  doc: jsPDF;
  /** Left edge of the text column. */
  x: number;
  /** Usable width of the text column. */
  maxWidth: number;
  /** Current vertical cursor (mm, from the top of the page). */
  y: number;
  /** Y beyond which `write` starts a new page. */
  bottom: number;
  /** Write wrapped text; returns the cursor position after the block. */
  write(text: string, opts?: WriteOptions): number;
  /** Drop `mm` millimetres of vertical space. */
  gap(mm?: number): void;
  /** Start a new page and re-draw the running header. */
  page(): void;
  /** Horizontal rule across the text column. */
  rule(color?: [number, number, number], width?: number): void;
  /** Place the vertical cursor explicitly (clamped below the header). */
  setY(y: number): void;
}

/**
 * Header/title band plus a text frame. Async only for the logo; pass the
 * result of `loadBrandMark()` in when the caller already has it.
 */
export function createPdfFrame(
  opts: BrandedDocOptions,
  mark: string | null = null,
): PdfFrame {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const x = PAGE_MARGIN;
  const maxWidth = pageWidth - PAGE_MARGIN * 2;
  const bottom = pageHeight - FOOTER_RESERVE;

  const frame: PdfFrame = {
    doc,
    x,
    maxWidth,
    y: 0,
    bottom,
    gap(mm = 3) {
      frame.y += mm;
    },
    setY(y: number) {
      frame.y = y;
    },
    rule(color = BRAND_RULE, width = 0.4) {
      if (frame.y > bottom) frame.page();
      doc.setDrawColor(color[0], color[1], color[2]);
      doc.setLineWidth(width);
      doc.line(x, frame.y, x + maxWidth, frame.y);
      frame.y += 4;
    },
    page() {
      doc.addPage();
      drawRunningHeader(doc, mark, opts);
      frame.y = bandBottom(opts) + 6;
    },
    write(text, o = {}) {
      const size = o.size ?? 10;
      const font = o.font ?? "helvetica";
      const lineHeight = o.lineHeight ?? size * 0.48;
      const indent = o.indent ?? 0;
      doc.setFont(font, o.bold ? (o.italic ? "bolditalic" : "bold") : o.italic ? "italic" : "normal");
      doc.setFontSize(size);
      const color = o.color ?? BRAND_INK;
      doc.setTextColor(color[0], color[1], color[2]);

      const width = maxWidth - indent;
      const lines = doc.splitTextToSize(String(text ?? ""), width) as string[];
      const needed = lines.length * lineHeight + 1;
      // `keepTogether` avoids the classic "heading orphaned at the page foot".
      if (frame.y + needed > bottom || (o.keepTogether && frame.y + needed > bottom)) {
        frame.page();
      }
      for (const line of lines) {
        if (frame.y > bottom) frame.page();
        doc.text(line, x + indent, frame.y);
        frame.y += lineHeight;
      }
      return frame.y;
    },
  };

  drawTitleBand(doc, mark, opts, maxWidth, pageWidth);
  frame.y = bandBottom(opts) + 6;
  return frame;
}

/** Where the content column starts on page 1 (below the tinted band). */
export function bandBottom(opts: BrandedDocOptions): number {
  return opts.subtitle ? BAND_HEIGHT + 10 : BAND_HEIGHT;
}

/** Page 1: tinted band, brand tile, wordmark, title, subtitle, kind label. */
function drawTitleBand(
  doc: jsPDF,
  mark: string | null,
  opts: BrandedDocOptions,
  maxWidth: number,
  pageWidth: number,
) {
  doc.setFillColor(BRAND_CREAM[0], BRAND_CREAM[1], BRAND_CREAM[2]);
  doc.rect(0, 0, pageWidth, BAND_HEIGHT + (opts.subtitle ? 8 : 0), "F");
  doc.setFillColor(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]);
  doc.rect(0, 0, pageWidth, 2.2, "F");

  let textX = PAGE_MARGIN;
  if (mark) {
    try {
      doc.addImage(mark, "PNG", PAGE_MARGIN, 8, 13, 13);
      textX = PAGE_MARGIN + 17;
    } catch {
      /* a broken logo must not stop the document */
    }
  }

  doc.setFont("times", "bold");
  doc.setFontSize(8);
  doc.setTextColor(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]);
  doc.text(BRAND.name.toUpperCase(), textX, 12, { charSpace: 0.7 });

  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(BRAND_INK[0], BRAND_INK[1], BRAND_INK[2]);
  const titleLines = doc.splitTextToSize(opts.title, maxWidth - (textX - PAGE_MARGIN)) as string[];
  doc.text(titleLines[0] ?? "", textX, 20);

  if (opts.subtitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(BRAND_MUTED[0], BRAND_MUTED[1], BRAND_MUTED[2]);
    doc.text(String(opts.subtitle), textX, 26);
  }

  if (opts.kind) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]);
    const label = opts.kind.toUpperCase();
    const width = doc.getTextWidth(label);
    doc.text(label, pageWidth - PAGE_MARGIN - width, 12, { charSpace: 0.5 });
  }
}

/** Pages 2+: a compact running header so a loose page is still ours. */
function drawRunningHeader(doc: jsPDF, mark: string | null, opts: BrandedDocOptions) {
  const pageWidth = doc.internal.pageSize.getWidth();
  let textX = PAGE_MARGIN;
  if (mark) {
    try {
      doc.addImage(mark, "PNG", PAGE_MARGIN, 8, 7, 7);
      textX = PAGE_MARGIN + 10;
    } catch {
      /* ignore */
    }
  }
  doc.setFont("times", "bold");
  doc.setFontSize(8);
  doc.setTextColor(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]);
  doc.text(BRAND.name.toUpperCase(), textX, 12.5, { charSpace: 0.7 });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(BRAND_MUTED[0], BRAND_MUTED[1], BRAND_MUTED[2]);
  const title = String(opts.title);
  const width = doc.getTextWidth(title);
  doc.text(title, Math.max(textX + 24, pageWidth - PAGE_MARGIN - width), 12.5);

  doc.setDrawColor(BRAND_RULE[0], BRAND_RULE[1], BRAND_RULE[2]);
  doc.setLineWidth(0.3);
  doc.line(PAGE_MARGIN, 15.5, pageWidth - PAGE_MARGIN, 15.5);
}

/* ─────────────────────────── watermark & footers ─────────────────────── */

function formatGeneratedAt(value: BrandIdentity["generatedAt"]): string {
  const date = value instanceof Date ? value : value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

/**
 * Tiled diagonal watermark carrying our name and the account the file belongs
 * to. Drawn once over every page at low opacity, exactly like the on-screen
 * overlay and the server-side PDF stamp, so a shared file is traceable back to
 * the account that generated it.
 */
export function drawWatermark(doc: jsPDF, identity?: BrandIdentity | null) {
  const pages = doc.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const owner = (identity?.owner ?? "").trim();
  const stamp = owner ? `${BRAND.name} · ${owner}` : BRAND.name;

  for (let page = 1; page <= pages; page += 1) {
    doc.setPage(page);
    try {
      doc.setGState(new GState({ opacity: 0.07 }));
    } catch {
      /* older/odd runtimes: draw it opaque and lighter instead */
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(BRAND_MUTED[0], BRAND_MUTED[1], BRAND_MUTED[2]);
    for (let row = 0; row < 12; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        doc.text(stamp, 6 + col * 70, 24 + row * 24, { angle: 32 });
      }
    }
    try {
      doc.setGState(new GState({ opacity: 1 }));
    } catch {
      /* ignore */
    }
  }
}

/** Footer on every page: brand, identity, generation date, page x of y. */
export function drawFooters(doc: jsPDF, identity?: BrandIdentity | null) {
  const pages = doc.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const owner = (identity?.owner ?? "").trim();
  const ref = (identity?.ref ?? "").trim();
  const generated = formatGeneratedAt(identity?.generatedAt);

  for (let page = 1; page <= pages; page += 1) {
    doc.setPage(page);
    const y = pageHeight - 9;
    doc.setDrawColor(BRAND_RULE[0], BRAND_RULE[1], BRAND_RULE[2]);
    doc.setLineWidth(0.3);
    doc.line(PAGE_MARGIN, y - 4, pageWidth - PAGE_MARGIN, y - 4);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]);
    doc.text(`${BRAND.name} · ${BRAND.domain}`, PAGE_MARGIN, y);

    doc.setTextColor(BRAND_MUTED[0], BRAND_MUTED[1], BRAND_MUTED[2]);
    const middle = [owner && `For ${owner}`, ref && `Ref ${ref}`, generated]
      .filter(Boolean)
      .join(" · ");
    if (middle) doc.text(middle, pageWidth / 2, y, { align: "center" });

    doc.text(`Page ${page} of ${pages}`, pageWidth - PAGE_MARGIN, y, { align: "right" });
  }
}

/**
 * Finalise a frame: stamp the watermark and footers, then hand the document
 * back for saving. Call this once, after the body has been written.
 */
export function finishPdf(frame: PdfFrame, identity?: BrandIdentity | null): jsPDF {
  drawWatermark(frame.doc, identity);
  drawFooters(frame.doc, identity);
  return frame.doc;
}

/** "" -> "fallback.pdf"; otherwise a slugified, lowercase, extension-safe name. */
export function pdfFileName(base: string, suffix?: string): string {
  const slug = String(base ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `${slug || "clutch-marks-document"}${suffix ? `-${suffix}` : ""}.pdf`;
}
