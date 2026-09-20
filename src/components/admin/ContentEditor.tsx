import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { History, Pencil, RotateCcw } from "lucide-react";

export type EditableEntity = "lesson" | "material";

interface ContentEditorProps {
  entityType: EditableEntity;
  entityId: string;
  initialTitle: string;
  /** null content = file-based material (no text to edit) */
  initialContent: string | null;
  onSaved?: () => void;
  trigger?: React.ReactNode;
}

export function ContentEditor({ entityType, entityId, initialTitle, initialContent, onSaved, trigger }: ContentEditorProps) {
  const { role } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent ?? "");
  const [saving, setSaving] = useState(false);
  const [revisions, setRevisions] = useState<any[]>([]);
  const [preview, setPreview] = useState(false);

  useEffect(() => { setTitle(initialTitle); setContent(initialContent ?? ""); }, [initialTitle, initialContent, open]);

  const loadRevisions = async () => {
    const { data } = await supabase
      .from("content_revisions")
      .select("id, version, title, created_at, created_by_username")
      .eq("entity_type", entityType)
      .eq("entity_id", entityId)
      .order("version", { ascending: false });
    setRevisions(data ?? []);
  };

  useEffect(() => { if (open) loadRevisions(); }, [open, entityType, entityId]);

  const save = async () => {
    setSaving(true);
    const table = entityType === "lesson" ? "lessons" : "study_materials";
    const payload: Record<string, unknown> = { title: title.trim() || initialTitle };
    if (initialContent !== null) payload.content = content;
    const { error } = await supabase.from(table).update(payload).eq("id", entityId);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Saved", description: "Previous version stored in history." });
    loadRevisions();
    onSaved?.();
  };

  const restore = async (revisionId: string) => {
    const { error } = await supabase.rpc("restore_content_revision", { p_revision_id: revisionId });
    if (error) {
      toast({ title: "Restore failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Version restored" });
    setOpen(false);
    onSaved?.();
  };

  if (role !== "admin") return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" variant="ghost" className="gap-1"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">Edit {entityType}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="history">History{revisions.length > 0 ? ` (${revisions.length})` : ""}</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            {initialContent !== null && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label>Content</Label>
                  <Button size="sm" variant="ghost" onClick={() => setPreview((p) => !p)} className="h-7 text-xs">
                    {preview ? "Edit source" : "Preview"}
                  </Button>
                </div>
                {preview ? (
                  <div
                    className="min-h-64 rounded-md border bg-muted/30 p-4 text-sm [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:font-semibold [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-muted [&_pre]:p-3 [&_table]:w-full [&_table]:border"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="min-h-64 font-mono text-xs" />
                )}
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {initialContent === null
                  ? "File-based material — only the title can be edited here."
                  : "Saving keeps the current version in History."}
              </p>
              <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="pt-2">
            {revisions.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">No previous versions yet — history starts from the first edit.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Version</TableHead>
                    <TableHead>Saved</TableHead>
                    <TableHead>By</TableHead>
                    <TableHead>Title at that time</TableHead>
                    <TableHead className="text-right">Restore</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revisions.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell><Badge variant="outline">v{r.version}</Badge></TableCell>
                      <TableCell className="text-xs">{new Date(r.created_at).toLocaleString()}</TableCell>
                      <TableCell className="text-xs">{r.created_by_username ?? "system"}</TableCell>
                      <TableCell className="max-w-48 truncate text-xs">{r.title ?? "—"}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => restore(r.id)}>
                          <RotateCcw className="h-3.5 w-3.5" /> Restore
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
