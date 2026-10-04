// Opens study-material and past-paper files through the serve-material edge
// function so every download is signed, watermarked, and audit-logged.
import { supabase } from "@/integrations/supabase/client";
import { SUPABASE_KEY_SAFE, SUPABASE_URL_SAFE } from "@/lib/env";
import { fetchWithTimeout, RENDER_TIMEOUT_MS, TIMEOUT_HEADER, withDeadline } from "@/lib/net";

export type ContentEntityType = "material" | "past_paper";

/** Strips a legacy public URL down to the storage path inside the bucket. */
export function toStoragePath(bucket: string, urlOrPath: string) {
  const marker = `/${bucket}/`;
  const idx = urlOrPath.indexOf(marker);
  return idx >= 0 ? urlOrPath.slice(idx + marker.length) : urlOrPath;
}

/**
 * Archive rows may point at a direct external PDF (e.g. a paper sourced from
 * PhysicsAndMathsTutor) instead of an object in our private bucket. Those links
 * are already public, so they are opened as-is rather than routed through
 * signing/watermarking (which would 404 them).
 */
export function isExternalUrl(urlOrPath: string | null | undefined): boolean {
  return !!urlOrPath && /^https?:\/\//i.test(urlOrPath.trim());
}

/** Buckets are private — always read files through a short-lived signed URL. */
export async function getSignedUrl(bucket: string, urlOrPath: string, expiresIn = 300) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(toStoragePath(bucket, urlOrPath), expiresIn);
  if (error) throw error;
  return data.signedUrl;
}

const FN_BASE = `${SUPABASE_URL_SAFE}/functions/v1/serve-material`;
const EXT_FN_BASE = `${SUPABASE_URL_SAFE}/functions/v1/serve-external-paper`;

/**
 * Open a past paper we link to but do not host.
 *
 * The external URL is never rendered as a bare <a href> — a free account could
 * click straight through and read the whole paper, unwatermarked, untracked.
 * Instead we ask serve-external-paper, which applies the same entitlement rule
 * as serve-material and audits the click, and only then open the returned URL
 * in a new tab. Free accounts get `{ upgrade: true }` back and never learn the
 * destination.
 *
 * The server decides; this helper only reflects the answer. It throws an
 * `ExternalPaperGated` error when the plan is the blocker, so callers can show
 * an upgrade prompt rather than a generic failure.
 */
export class ExternalPaperGated extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExternalPaperGated";
  }
}

export async function openExternalPaper(url: string, label?: string) {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  const session = sessionData.session;
  if (!session?.access_token) throw new Error("no session");

  const res = await fetchWithTimeout(EXT_FN_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
      apikey: SUPABASE_KEY_SAFE,
    },
    body: JSON.stringify({ url, label }),
  });

  if (res.status === 403) {
    const body = await res.json().catch(() => ({}));
    if (body?.upgrade) {
      throw new ExternalPaperGated(body.message ?? "This paper is part of the full plan.");
    }
    throw new Error(body?.error ?? "Not allowed");
  }
  if (!res.ok) throw new Error(`serve-external-paper ${res.status}`);

  const { url: target } = (await res.json()) as { url?: string };
  if (!target) throw new Error("serve-external-paper returned no url");
  window.open(target, "_blank", "noopener,noreferrer");
}

/**
 * Fetch our material through the serve-material edge function.
 * PDFs come back watermarked per-user (Clutch Marks + identity footer burned
 * into the bytes server-side) and the download is audit-logged; other file
 * types are streamed unchanged. Falls back to a plain signed URL if the
 * function is unreachable, so material access never hard-fails.
 */
export async function openProtectedFile(bucket: string, urlOrPath: string, downloadName?: string) {
  // External PDFs are not in our bucket: open them directly.
  if (isExternalUrl(urlOrPath)) {
    window.open(urlOrPath, "_blank", "noopener,noreferrer");
    return;
  }
  const path = toStoragePath(bucket, urlOrPath);
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    // A failed session read used to be indistinguishable from "not signed in".
    if (sessionError) throw sessionError;
    const session = sessionData.session;
    if (!session?.access_token) throw new Error("no session");
    const res = await fetchWithTimeout(FN_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
        apikey: SUPABASE_KEY_SAFE,
        // Watermarking a large PDF server-side outlasts the default ceiling.
        [TIMEOUT_HEADER]: String(RENDER_TIMEOUT_MS),
      },
      body: JSON.stringify({ bucket, path }),
    });
    if (!res.ok) throw new Error(`serve-material ${res.status}`);
    // Bound the body too: headers can arrive and then the stream stall.
    const blob = await withDeadline(res.blob(), RENDER_TIMEOUT_MS);
    const url = URL.createObjectURL(blob);
    if (downloadName) {
      // Forced-download variant (keeps the watermarked bytes).
      const a = document.createElement("a");
      a.href = url;
      a.download = downloadName;
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setTimeout(() => URL.revokeObjectURL(url), 120_000);
  } catch (error) {
    // Function unavailable — degrade to a raw signed URL rather than blocking.
    // Awaited so a failure here reaches the caller's try/catch (which toasts)
    // instead of becoming an unhandled rejection nobody ever sees.
    console.warn("serve-material unavailable, falling back to a signed URL:", error);
    await openSignedFile(bucket, path);
  }
}

export async function openSignedFile(bucket: string, urlOrPath: string) {
  // External PDFs are not in our bucket: open them directly.
  if (isExternalUrl(urlOrPath)) {
    window.open(urlOrPath, "_blank", "noopener,noreferrer");
    return;
  }
  const url = await getSignedUrl(bucket, urlOrPath);
  window.open(url, "_blank", "noopener,noreferrer");
}

export interface FileVersion {
  id: string;
  entity_type: string;
  entity_id: string;
  slot: string;
  bucket: string;
  file_path: string;
  file_name: string;
  version: number;
  created_at: string;
}

export async function listVersions(entityType: ContentEntityType, entityId: string) {
  const { data, error } = await supabase
    .from("content_file_versions")
    .select("*")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("version", { ascending: false });
  // Callers already have try/catch + error UI wired up, but PostgREST resolves
  // with `{ error }` rather than rejecting — so that UI could never fire and a
  // failed read looked like "no versions yet". Throw so they can react.
  if (error) throw error;
  return (data ?? []) as FileVersion[];
}

export interface RecordVersionArgs {
  entityType: ContentEntityType;
  entityId: string;
  slot: string;
  bucket: string;
  filePath: string;
  fileName: string;
}

/**
 * Append a version row for a freshly uploaded file.
 *
 * The version number is `max + 1` computed client-side, so two admins uploading
 * at once can pick the same number. A unique-violation is therefore retried a
 * couple of times rather than dropped, and a real failure is thrown so the
 * caller can report it instead of silently losing history.
 */
export async function recordVersion(args: RecordVersionArgs): Promise<number> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const { data: latest, error: readError } = await supabase
      .from("content_file_versions")
      .select("version")
      .eq("entity_type", args.entityType)
      .eq("entity_id", args.entityId)
      .eq("slot", args.slot)
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (readError) throw readError;

    const version = (latest?.version ?? 0) + 1;
    const { error: insertError } = await supabase.from("content_file_versions").insert({
      entity_type: args.entityType,
      entity_id: args.entityId,
      slot: args.slot,
      bucket: args.bucket,
      file_path: args.filePath,
      file_name: args.fileName,
      version,
    });
    if (!insertError) return version;
    // 23505 = unique_violation: another upload took this number; recompute.
    if (insertError.code !== "23505") throw insertError;
  }
  throw new Error("Could not record a file version (too many concurrent uploads)");
}

/** Remove every version row for an entity (used when the entity is deleted). */
export async function deleteVersions(entityType: ContentEntityType, entityId: string) {
  const { error } = await supabase
    .from("content_file_versions")
    .delete()
    .eq("entity_type", entityType)
    .eq("entity_id", entityId);
  if (error) throw error;
}

/** Best-effort removal of stored objects; missing objects are not an error. */
export async function removeStorageObjects(bucket: string, paths: string[]) {
  const unique = [...new Set(paths.filter(Boolean))];
  if (unique.length === 0) return;
  const { error } = await supabase.storage.from(bucket).remove(unique);
  if (error) throw error;
}

export function isPreviewable(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return ["pdf", "png", "jpg", "jpeg", "gif", "webp"].includes(ext);
}
