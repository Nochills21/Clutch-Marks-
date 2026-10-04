// Version history viewer for uploaded material files, with restore support.
//
// Previously the dialog claimed "revert support" in its header comment without
// offering any, and a failed load left it stuck on "Loading…" forever because
// the loading flag was only cleared inside `.then()`.
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { History, Eye, Download, RotateCcw, AlertCircle } from "lucide-react";
import {
  listVersions,
  openProtectedFile,
  openSignedFile,
  recordVersion,
  type ContentEntityType,
  type FileVersion,
} from "@/lib/contentFiles";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/useToast";
import { format } from "date-fns";

/**
 * Where a version's bytes can be written back to. Restoring is only offered for
 * slots we know how to map; anything else still offers preview and download.
 */
const RESTORE_TARGETS: Record<string, { table: "study_materials"; column: "file_url" | "preview_url" }> = {
  "material:file": { table: "study_materials", column: "file_url" },
  "material:preview": { table: "study_materials", column: "preview_url" },
};

const SLOT_LABELS: Record<string, string> = {
  file: "Document",
  preview: "Thumbnail",
};

export function FileVersionHistory({ entityType, entityId, label = "Versions", onRestored }: {
  entityType: ContentEntityType;
  entityId: string;
  label?: string;
  onRestored?: () => void;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [versions, setVersions] = useState<FileVersion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    listVersions(entityType, entityId)
      .then((v) => { if (!cancelled) setVersions(v); })
      .catch((e: any) => { if (!cancelled) setError(e?.message ?? "Could not load version history"); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [open, entityType, entityId]);

  const restore = async (v: FileVersion) => {
    const target = RESTORE_TARGETS[`${entityType}:${v.slot}`];
    if (!target) return;
    setRestoringId(v.id);
    try {
      // The table/column pair comes from the hard-coded allow-list above, so the
      // cast is only needed because the key is computed rather than literal.
      const { error: updateError } = await (supabase as any)
        .from(target.table)
        .update({ [target.column]: v.file_path })
        .eq("id", entityId);
      if (updateError) throw updateError;

      // History stays append-only: the rollback itself becomes a version, so
      // the change is visible and can be undone again.
      await recordVersion({
        entityType,
        entityId,
        slot: v.slot,
        bucket: v.bucket,
        filePath: v.file_path,
        fileName: v.file_name,
      });

      const { data: refreshed, error: refreshError } = await supabase
        .from("content_file_versions")
        .select("*")
        .eq("entity_type", entityType)
        .eq("entity_id", entityId)
        .order("version", { ascending: false });
      // Ignoring this left the pre-rollback list on screen, so a successful
      // restore looked like it had done nothing.
      if (refreshError) throw refreshError;
      setVersions((refreshed ?? []) as FileVersion[]);

      toast({ title: "Version restored", description: `v${v.version} is live again.` });
      onRestored?.();
    } catch (e: any) {
      toast({ title: "Restore failed", description: e?.message, variant: "destructive" });
    } finally {
      setRestoringId(null);
    }
  };

  return (
    <>
      <Button size="sm" variant="ghost" className="gap-1" onClick={() => setOpen(true)}>
        <History className="h-3.5 w-3.5" /> {label}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>File version history</DialogTitle>
            <DialogDescription>
              Every upload is kept. Open or download any version, or make an older one current again.
            </DialogDescription>
          </DialogHeader>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : error ? (
            <p className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" /> {error}
            </p>
          ) : versions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No uploads recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {versions.map((v) => (
                <div key={v.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{v.file_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {SLOT_LABELS[v.slot] ?? v.slot} · {format(new Date(v.created_at), "d MMM yyyy, HH:mm")}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant="outline">v{v.version}</Badge>
                    <Button size="sm" variant="outline" className="gap-1"
                      onClick={() => openSignedFile(v.bucket, v.file_path)}>
                      <Eye className="h-3.5 w-3.5" /> Preview
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1"
                      onClick={() => openProtectedFile(v.bucket, v.file_path, v.file_name)}>
                      <Download className="h-3.5 w-3.5" /> Download
                    </Button>
                    {RESTORE_TARGETS[`${entityType}:${v.slot}`] && (
                      <Button size="sm" variant="secondary" className="gap-1"
                        disabled={restoringId === v.id} onClick={() => restore(v)}>
                        <RotateCcw className="h-3.5 w-3.5" />
                        {restoringId === v.id ? "Restoring…" : "Restore"}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
