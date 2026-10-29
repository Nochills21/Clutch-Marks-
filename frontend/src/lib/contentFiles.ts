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

/**
 * Buckets are private — always read files through a short-lived signed URL.
 *
 * `downloadName` asks Storage for a `Content-Disposition: attachment` response,
 * which is what keeps the fallback path a download instead of a preview. (The
 * route that normally serves these files, serve-material, already returns an
 * attachment when asked; without this the fallback silently swapped a download
 * button into "opens a tab".)
 */
export async function getSignedUrl(bucket: string, urlOrPath: string, expiresIn = 300, downloadName?: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(toStoragePath(bucket, urlOrPath), expiresIn, downloadName ? { download: downloadName } : undefined);
  if (error) throw error;
  return data.signedUrl;
}

/** Trigger a forced download of an already-resolved URL (blob: or signed). */
function downloadUrl(url: string, name: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
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

/**
 * Thrown when the caller has no session, so no file could possibly be served.
 *
 * The material buckets are private and `serve-material` requires a token, so a
 * signed-out click can never succeed. The archive and the notes pages are
 * public, which is exactly where that click happens — it must lead to sign-in
 * rather than to Storage's "Object not found".
 */
export class SignInRequired extends Error {
  constructor(message = "Sign in to open this file.") {
    super(message);
    this.name = "SignInRequired";
  }
}

/**
 * Where to send a visitor who clicked a file without a session.
 *
 * Carries the current URL through `/auth` so they come back to the list they
 * were reading instead of landing on the dashboard.
 */
export function signInPath(): string {
  const here = `${window.location.pathname}${window.location.search}`;
  return `/auth?next=${encodeURIComponent(here)}`;
}

/** Close a reserved tab that never got a file, so no about:blank is left behind. */
function closeTab(tab: Window | null) {
  if (tab && !tab.closed) tab.close();
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

  // Ask for the session BEFORE reserving a tab. This used to throw "no session"
  // only after opening one, so a signed-out visitor was left with a blank
  // about:blank tab and then got "Object not found" from the signed-URL
  // fallback (the bucket's read policy is `auth.uid() is not null`).
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  // A failed session read used to be indistinguishable from "not signed in".
  if (sessionError) throw sessionError;
  const session = sessionData.session;
  if (!session?.access_token) throw new SignInRequired();

  // Browsers only allow a popup inside the click that caused it. The watermark
  // fetch below takes seconds, so reserve the tab synchronously here and point
  // it at the file once the bytes are ready. Downloads don't need a tab.
  const tab = downloadName ? null : openPendingTab();
  try {
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
      downloadUrl(url, downloadName);
    } else {
      showInTab(tab, url);
    }
    setTimeout(() => URL.revokeObjectURL(url), 120_000);
  } catch (error) {
    // No session is not a fallback case: the signed-URL route cannot work either
    // while the bucket is private, so report it as what it is.
    if (error instanceof SignInRequired) {
      closeTab(tab);
      throw error;
    }
    // Function unavailable — degrade to a raw signed URL rather than blocking.
    // Awaited so a failure here reaches the caller's try/catch (which toasts)
    // instead of becoming an unhandled rejection nobody ever sees.
    console.warn("serve-material unavailable, falling back to a signed URL:", error);
    try {
      // Pass the download intent through: a signed URL that downloads is still
      // the action the caller asked for.
      await openSignedFile(bucket, path, downloadName, tab);
    } catch (fallbackError) {
      // Both routes failed — do not leave the reserved tab on about:blank.
      closeTab(tab);
      throw fallbackError;
    }
  }
}

/** Opens a blank tab inside the current user gesture, to be navigated later. */
function openPendingTab(): Window | null {
  const tab = window.open("about:blank", "_blank");
  if (tab) tab.opener = null;
  return tab;
}

/** Points a tab reserved by openPendingTab at url, or opens one if none was reserved. */
function showInTab(tab: Window | null, url: string) {
  if (tab && !tab.closed) tab.location.href = url;
  else window.open(url, "_blank", "noopener,noreferrer");
}

export async function openSignedFile(
  bucket: string,
  urlOrPath: string,
  downloadName?: string,
  tab: Window | null = null,
) {
  // External PDFs are not in our bucket: open them directly.
  if (isExternalUrl(urlOrPath)) {
    window.open(urlOrPath, "_blank", "noopener,noreferrer");
    return;
  }
  // Same rule as openProtectedFile: a private bucket cannot be signed without a
  // session, so name that instead of surfacing Storage's "Object not found".
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new SignInRequired();
  const url = await getSignedUrl(bucket, urlOrPath, 300, downloadName);
  if (downloadName) downloadUrl(url, downloadName);
  else showInTab(tab, url);
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
