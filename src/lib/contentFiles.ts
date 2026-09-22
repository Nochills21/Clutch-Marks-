import { supabase } from "@/integrations/supabase/client";

export type ContentEntityType = "material" | "past_paper";

/** Strips a legacy public URL down to the storage path inside the bucket. */
export function toStoragePath(bucket: string, urlOrPath: string) {
  const marker = `/${bucket}/`;
  const idx = urlOrPath.indexOf(marker);
  return idx >= 0 ? urlOrPath.slice(idx + marker.length) : urlOrPath;
}

/** Buckets are private — always read files through a short-lived signed URL. */
export async function getSignedUrl(bucket: string, urlOrPath: string, expiresIn = 300) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(toStoragePath(bucket, urlOrPath), expiresIn);
  if (error) throw error;
  return data.signedUrl;
}

const FN_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/serve-material`;

/**
 * Fetch our material through the serve-material edge function.
 * PDFs come back watermarked per-user (Clutch Marks + identity footer burned
 * into the bytes server-side) and the download is audit-logged; other file
 * types are streamed unchanged. Falls back to a plain signed URL if the
 * function is unreachable, so material access never hard-fails.
 */
export async function openProtectedFile(bucket: string, urlOrPath: string, downloadName?: string) {
  const path = toStoragePath(bucket, urlOrPath);
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) throw new Error("no session");
    const res = await fetch(FN_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
      body: JSON.stringify({ bucket, path }),
    });
    if (!res.ok) throw new Error(`serve-material ${res.status}`);
    const blob = await res.blob();
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
  } catch {
    // Function unavailable — degrade to a raw signed URL rather than blocking.
    openSignedFile(bucket, path);
  }
}

export async function openSignedFile(bucket: string, urlOrPath: string) {
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
  const { data } = await supabase
    .from("content_file_versions")
    .select("*")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("version", { ascending: false });
  return (data ?? []) as FileVersion[];
}

export async function recordVersion(args: {
  entityType: ContentEntityType;
  entityId: string;
  slot: string;
  bucket: string;
  filePath: string;
  fileName: string;
}) {
  const { data: latest } = await supabase
    .from("content_file_versions")
    .select("version")
    .eq("entity_type", args.entityType)
    .eq("entity_id", args.entityId)
    .eq("slot", args.slot)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("content_file_versions").insert({
    entity_type: args.entityType,
    entity_id: args.entityId,
    slot: args.slot,
    bucket: args.bucket,
    file_path: args.filePath,
    file_name: args.fileName,
    version: (latest?.version ?? 0) + 1,
  });
}

export function isPreviewable(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return ["pdf", "png", "jpg", "jpeg", "gif", "webp"].includes(ext);
}
