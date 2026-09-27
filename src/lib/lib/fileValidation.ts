// Upload safety: MIME/extension allow-list and filename sanitization for admin uploads.
export const ALLOWED_UPLOAD_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
];

export const ALLOWED_UPLOAD_EXTENSIONS = [
  "pdf", "png", "jpg", "jpeg", "gif", "webp",
  "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt",
];

export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024; // 25 MB

export function validateUploadFile(file: File): { ok: true } | { ok: false; error: string } {
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "File is too large (max 25 MB)." };
  }
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const mimeOk = ALLOWED_UPLOAD_MIME_TYPES.includes(file.type);
  const extOk = ALLOWED_UPLOAD_EXTENSIONS.includes(ext);
  if (!mimeOk || !extOk) {
    return {
      ok: false,
      error: "Unsupported file type. Allowed: PDF, Word, Excel, PowerPoint, images, plain text.",
    };
  }
  return { ok: true };
}

/**
 * Storage-safe extension for upload paths. Never interpolate the raw filename
 * extension into a storage object path: a crafted name like "report.pdf/../.."
 * or one with no/odd extensions could escape the intended folder or collide
 * with storage path semantics. Returns the canonical extension from the
 * allow-list, or null when the file has none.
 */
export function getSafeUploadExtension(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return ALLOWED_UPLOAD_EXTENSIONS.includes(ext) ? ext : null;
}
