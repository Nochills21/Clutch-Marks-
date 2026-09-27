// Content protection layer: deters saving, copying and screenshotting of study
// material. Mounted once in AppLayout. This is a deterrent, not DRM — a
// determined user with a camera can always defeat software; the goal is to
// make casual theft (copy-paste, save-image, print-to-PDF, right-click) hard
// and to leave the watermark as the traceable backstop.
// Admins are exempt so content management stays fully usable.
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

// Shortcuts that save/print/share content — blocked when Ctrl/Meta is held.
const BLOCKED_KEYS = new Set(["p", "s", "u"]);

export function ContentProtection() {
  const { role } = useAuth();
  const isAdmin = role === "admin";

  useEffect(() => {
    if (isAdmin) return;

    // 1. Kill selection + copy/paste-menu affordances globally via CSS.
    const style = document.createElement("style");
    style.id = "content-protection";
    style.textContent = `
      /* Inputs and any explicitly allowed region keep normal behaviour. */
      body { -webkit-user-select: none; user-select: none; }
      input, textarea, [contenteditable="true"], [data-allow-select="true"], .allow-select {
        -webkit-user-select: text; user-select: text;
      }
      img { -webkit-touch-callout: none; }
      @media print {
        body * { visibility: hidden !important; }
        body::after {
          content: "Printing is disabled — Clutch Marks content is protected.";
          visibility: visible;
          display: block;
          padding: 40px;
          font-size: 18px;
        }
      }
    `;
    document.head.appendChild(style);

    // 2. Block the event-level paths: context menu, copy/cut/paste outside
    //    inputs, drag-start for images/links, and save/print shortcut keys.
    const isEditable = (t: EventTarget | null) =>
      t instanceof HTMLElement &&
      (t.closest("input, textarea, [contenteditable='true'], [data-allow-select='true'], .allow-select") !== null);

    const onContextMenu = (e: MouseEvent) => {
      if (!isEditable(e.target)) e.preventDefault();
    };
    const onCopyCut = (e: ClipboardEvent) => {
      if (!isEditable(e.target)) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === "IMG" || el.tagName === "A" || !isEditable(e.target)) e.preventDefault();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return;
      const mod = e.ctrlKey || e.metaKey;
      if (mod && BLOCKED_KEYS.has(e.key.toLowerCase())) {
        e.preventDefault();
      }
      // DevTools shortcuts are noisy to block fully; F12 alone is blocked as a deterrent.
      if (e.key === "F12") e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("copy", onCopyCut);
    document.addEventListener("cut", onCopyCut);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      style.remove();
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("copy", onCopyCut);
      document.removeEventListener("cut", onCopyCut);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isAdmin]);

  return null;
}
