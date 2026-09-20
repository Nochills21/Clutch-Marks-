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
