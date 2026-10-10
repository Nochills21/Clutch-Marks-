// Uploading a solved past paper so the AI marker can read it.
//
// Scripts go into the existing private `homework-uploads` bucket, under the
// caller's own uid: `<user_id>/ai-marker/<uuid>.<ext>`. That shape is not
// cosmetic — the bucket's storage policy only permits an insert whose first
// path segment is the uploader's uid, and the `ai-correction` worker refuses to
// read any object outside the caller's own folder. Keeping the convention in
// one place is what makes those two rules agree.
//
// The path is deliberately random rather than the original filename: student
// filenames carry names ("jane-smith-paper4.pdf") and are not worth leaking
// into shared storage listings.

import { supabase } from "@/integrations/supabase/client";
import { getSafeUploadExtension } from "@/lib/fileValidation";
import type { AnswerFileRef } from "@/lib/ai";

/** Where answer scripts live. Must match `ANSWER_BUCKET` in the worker. */
export const ANSWER_SCRIPT_BUCKET = "homework-uploads";

/** Per-file ceiling. The worker caps the *total* at 20 MB across six files. */
export const MAX_SCRIPT_BYTES = 12 * 1024 * 1024;
export const MAX_SCRIPT_FILES = 6;

/** Only what a marker can actually read: a PDF or a photo of the page. */
const ALLOWED_SCRIPT_EXTENSIONS = ["pdf", "png", "jpg", "jpeg", "webp", "gif"];
const ALLOWED_SCRIPT_MIME = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
];

export interface UploadedScript extends AnswerFileRef {
  bucket: string;
  path: string;
  name: string;
  mimeType: string;
  size: number;
}

export function validateScriptFile(file: File): { ok: true } | { ok: false; error: string } {
  const ext = getSafeUploadExtension(file) ?? "";
  const mimeOk = ALLOWED_SCRIPT_MIME.includes(file.type);
  const extOk = ALLOWED_SCRIPT_EXTENSIONS.includes(ext);
  if (!mimeOk && !extOk) {
    return { ok: false, error: "Upload a PDF or a photo (PNG, JPG, WEBP or GIF) of your answers." };
  }
  if (file.size > MAX_SCRIPT_BYTES) {
    return { ok: false, error: "That file is over 12 MB — try a smaller scan or photo." };
  }
  return { ok: true };
}

/**
 * Push one script and return the reference the worker needs.
 *
 * Throws (rather than returning an error object) so callers can rely on
 * try/catch: a partially uploaded set must be cleaned up by the caller, and a
 * silently-null path would send the marker a paper with missing pages.
 */
export async function uploadAnswerScript(
  file: File,
  userId: string,
): Promise<UploadedScript> {
  const check = validateScriptFile(file);
  if (check.ok === false) throw new Error(check.error);

  const ext = getSafeUploadExtension(file) ?? "pdf";
  const path = `${userId}/ai-marker/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(ANSWER_SCRIPT_BUCKET).upload(path, file, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) throw new Error(`Upload failed: ${error.message}`);

  return {
    bucket: ANSWER_SCRIPT_BUCKET,
    path,
    name: file.name,
    mimeType: file.type || "application/pdf",
    size: file.size,
  };
}

/** Best-effort removal of uploaded scripts (student deleted them, or cleanup). */
export async function removeAnswerScripts(scripts: AnswerFileRef[]): Promise<void> {
  const paths = [...new Set(scripts.map((s) => s.path).filter(Boolean))];
  if (paths.length === 0) return;
  await supabase.storage.from(ANSWER_SCRIPT_BUCKET).remove(paths);
}

/** Human-readable size for the upload list. */
export function formatScriptSize(bytes: number): string {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isPdfScript(script: AnswerFileRef): boolean {
  return (script.name ?? script.path).toLowerCase().endsWith(".pdf");
}
