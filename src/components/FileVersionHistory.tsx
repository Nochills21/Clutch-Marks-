import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { History, Eye } from "lucide-react";
import { listVersions, openSignedFile, type ContentEntityType, type FileVersion } from "@/lib/contentFiles";
import { format } from "date-fns";

export function FileVersionHistory({ entityType, entityId, label = "Versions" }: {
  entityType: ContentEntityType; entityId: string; label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [versions, setVersions] = useState<FileVersion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    listVersions(entityType, entityId).then((v) => { setVersions(v); setLoading(false); });
  }, [open, entityType, entityId]);

  return (
    <>
      <Button size="sm" variant="ghost" className="gap-1" onClick={() => setOpen(true)}>
        <History className="h-3.5 w-3.5" /> {label}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>File version history</DialogTitle></DialogHeader>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : versions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No uploads recorded yet.</p>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {versions.map((v) => (
                <div key={v.id} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{v.file_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {v.slot} · {format(new Date(v.created_at), "d MMM yyyy, HH:mm")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline">v{v.version}</Badge>
                    <Button size="sm" variant="outline" className="gap-1"
                      onClick={() => openSignedFile(v.bucket, v.file_path)}>
                      <Eye className="h-3.5 w-3.5" /> Preview
                    </Button>
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
