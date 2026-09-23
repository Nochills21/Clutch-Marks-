// Inline preview of study-material PDFs (page-range peek).
import { useEffect, useState } from "react";
import { getSignedUrl } from "@/lib/contentFiles";
import { FileText } from "lucide-react";

interface MaterialPreviewProps {
  fileUrl: string | null;
  previewUrl: string | null;
  pageCount: number | null;
  sourceRange: string | null;
  /** compact = inline badge row only (no thumbnail) */
  variant?: "thumb" | "compact";
}

/**
 * Shows a small page-1 thumbnail of the material PDF plus "N pages" and the
 * source range (e.g. "P1 notes p3–33") so students can preview chapter
 * contents before opening the full document.
 */
export function MaterialPreview({ fileUrl, previewUrl, pageCount, sourceRange, variant = "thumb" }: MaterialPreviewProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    if (!previewUrl) { setSrc(null); return; }
    getSignedUrl("study-materials", previewUrl, 600)
      .then((url) => { if (!cancelled) setSrc(url); })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [previewUrl]);

  const badges = (
    <>
      {pageCount != null && (
        <span className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {pageCount} {pageCount === 1 ? "page" : "pages"}
        </span>
      )}
      {sourceRange && (
        <span className="inline-flex items-center rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
          {sourceRange}
        </span>
      )}
    </>
  );

  if (variant === "compact") {
    return <span className="inline-flex items-center gap-1">{badges}</span>;
  }

  if (!previewUrl || failed) {
    // No preview available: keep layout stable with a placeholder chip when there's a file
    return fileUrl ? (
      <div className="flex h-16 w-14 shrink-0 items-center justify-center rounded-md border bg-muted/40">
        <FileText className="h-5 w-5 text-muted-foreground/60" />
      </div>
    ) : null;
  }

  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <div className="relative h-16 w-14 overflow-hidden rounded-md border bg-white shadow-sm dark:bg-muted/40">
        {src ? (
          <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FileText className="h-4 w-4 animate-pulse text-muted-foreground/40" />
          </div>
        )}
      </div>
      <span className="inline-flex items-center gap-1">{badges}</span>
    </div>
  );
}
