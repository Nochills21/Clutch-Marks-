// Upload/manage study materials (with versioning + preview thumbnails).
//
// The `preview_url` / `page_count` / `source_range` columns have always existed
// on `study_materials` and are read by MaterialPreview on topic pages, but
// nothing ever wrote them — so every thumbnail, page count and source-range
// badge in the app was permanently blank. This form now captures them.
import { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Upload, FileIcon, X } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { Badge } from "@/components/ui/badge";
import { MaterialPreview } from "@/components/MaterialPreview";
import { deleteVersions, listVersions, recordVersion, removeStorageObjects } from "@/lib/contentFiles";
import { getSafeUploadExtension, validateUploadFile } from "@/lib/fileValidation";
import { FileVersionHistory } from "@/components/FileVersionHistory";

const UNASSIGNED = "unassigned";

interface TopicOption {
  id: string;
  name: string;
  subject_level_id: string | null;
}

export default function AdminMaterials() {
  const { toast } = useToast();
  const [materials, setMaterials] = useState<any[]>([]);
  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topicId, setTopicId] = useState<string>(UNASSIGNED);
  const [materialType, setMaterialType] = useState("notes");
  const [file, setFile] = useState<File | null>(null);
  const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [existingPreviewUrl, setExistingPreviewUrl] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState("");
  const [sourceRange, setSourceRange] = useState("");
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const [materialsRes, topicsRes] = await Promise.all([
      supabase.from("study_materials").select("*, topics(name)").order("created_at", { ascending: false }),
      supabase.from("topics").select("id, name, subject_level_id").order("name"),
    ]);
    setMaterials(materialsRes.data ?? []);
    setTopics((topicsRes.data ?? []) as TopicOption[]);
  };

  useEffect(() => { load(); }, []);

  const topicLabel = useMemo(() => {
    const map = new Map<string, string>();
    topics.forEach((t) => map.set(t.id, t.subject_level_id ? t.name : `${t.name} (no subject)`));
    return map;
  }, [topics]);

  const resetForm = () => {
    setOpen(false); setEditing(null); setTitle(""); setContent(""); setTopicId(UNASSIGNED);
    setMaterialType("notes"); setFile(null); setExistingFileUrl(null);
    setPreviewFile(null); setExistingPreviewUrl(null); setPageCount(""); setSourceRange("");
  };

  /** Upload one file into the private bucket, returning its storage path. */
  const uploadTo = async (bucket: string, folder: string, chosen: File): Promise<string> => {
    // Never interpolate a raw filename extension into a storage path.
    const ext = getSafeUploadExtension(chosen);
    if (!ext) throw new Error(`Unsupported file type for “${chosen.name}”.`);
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, chosen);
    if (error) throw error;
    return path;
  };

  const save = async () => {
    if (!title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    // Track uploads so a later failure can clean up what was already written.
    const uploaded: { bucket: string; path: string; slot: string; name: string }[] = [];

    try {
      let fileUrl = existingFileUrl;
      if (file) {
        const check = validateUploadFile(file);
        if ("error" in check) throw new Error(check.error);
        fileUrl = await uploadTo("study-materials", "materials", file);
        uploaded.push({ bucket: "study-materials", path: fileUrl, slot: "file", name: file.name });
      }

      let previewUrl = existingPreviewUrl;
      if (previewFile) {
        if (!previewFile.type.startsWith("image/")) {
          throw new Error("The preview thumbnail must be an image (PNG, JPG, GIF or WebP).");
        }
        previewUrl = await uploadTo("study-materials", "previews", previewFile);
        uploaded.push({ bucket: "study-materials", path: previewUrl, slot: "preview", name: previewFile.name });
      }

      const parsedPages = pageCount.trim() === "" ? null : Number(pageCount);
      if (parsedPages !== null && (!Number.isFinite(parsedPages) || parsedPages < 1)) {
        throw new Error("Page count must be a positive number.");
      }

      const payload = {
        title: title.trim(),
        content,
        topic_id: topicId === UNASSIGNED ? null : topicId,
        material_type: materialType,
        file_url: fileUrl,
        preview_url: previewUrl,
        page_count: parsedPages,
        source_range: sourceRange.trim() || null,
      };

      let materialId = editing?.id as string | undefined;
      if (editing) {
        const { error } = await supabase.from("study_materials").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("study_materials").insert(payload).select("id").single();
        if (error) throw error;
        materialId = data?.id;
      }
      if (!materialId) throw new Error("The material was saved but no id was returned.");

      // Version rows are history, not decoration — surface failures.
      for (const item of uploaded) {
        await recordVersion({
          entityType: "material",
          entityId: materialId,
          slot: item.slot,
          bucket: item.bucket,
          filePath: item.path,
          fileName: item.name,
        });
      }

      toast({ title: editing ? "Material updated" : "Material created" });
      resetForm();
      await load();
    } catch (e: any) {
      // Undo partial uploads so a failed save never leaves orphaned objects.
      for (const item of uploaded) {
        try {
          await removeStorageObjects(item.bucket, [item.path]);
        } catch {
          /* best effort */
        }
      }
      toast({
        title: "Could not save material",
        description: e?.message ?? "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const removeMaterial = async (m: any) => {
    if (!window.confirm(`Delete “${m.title}”? Its uploaded file and version history are removed too.`)) return;
    setBusyId(m.id);
    try {
      // Collect the stored objects first: after the row is gone the version rows
      // are the only record of what was on disk.
      const versions = await listVersions("material", m.id).catch(() => []);
      const paths = versions.map((v) => v.file_path);

      const { error } = await supabase.from("study_materials").delete().eq("id", m.id);
      if (error) throw error;

      await deleteVersions("material", m.id).catch(() => undefined);
      if (m.preview_url) paths.push(m.preview_url);
      await removeStorageObjects("study-materials", paths).catch(() => undefined);

      toast({ title: "Material deleted" });
      await load();
    } catch (e: any) {
      toast({ title: "Delete failed", description: e?.message, variant: "destructive" });
    } finally {
      setBusyId(null);
    }
  };

  const openEdit = (m: any) => {
    setEditing(m);
    setTitle(m.title);
    setContent(m.content ?? "");
    setTopicId(m.topic_id ?? UNASSIGNED);
    setMaterialType(m.material_type ?? "notes");
    setExistingFileUrl(m.file_url ?? null);
    setExistingPreviewUrl(m.preview_url ?? null);
    setPageCount(m.page_count != null ? String(m.page_count) : "");
    setSourceRange(m.source_range ?? "");
    setFile(null);
    setPreviewFile(null);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Study Materials</h1>
          <p className="text-muted-foreground">Manage revision content</p>
        </div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Material</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Material</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Type</Label>
                  <Select value={materialType} onValueChange={setMaterialType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="notes">Notes</SelectItem>
                      <SelectItem value="summary">Summary</SelectItem>
                      <SelectItem value="flashcard">Flashcard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Topic</Label>
                  <Select value={topicId} onValueChange={setTopicId}>
                    <SelectTrigger><SelectValue placeholder="Unassigned" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
                      {topics.map((t) => (
                        <SelectItem key={t.id} value={t.id}>{topicLabel.get(t.id) ?? t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Topics are created in <Link to="/admin/subjects" className="text-primary underline">Admin → Subjects</Link> so
                    they always belong to a subject and level.
                  </p>
                </div>
              </div>

              <div><Label>Content</Label>
                <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[200px]" />
              </div>

              <div className="rounded-lg border p-3 space-y-3">
                <p className="text-sm font-medium">File &amp; preview</p>

                <div>
                  <Label>Material file (optional — PDF, Office, image or text)</Label>
                  <div className="mt-1 flex items-center gap-3">
                    <input ref={fileRef} type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                    <Button type="button" size="sm" variant="outline" onClick={() => fileRef.current?.click()} className="gap-2">
                      <Upload className="h-3 w-3" /> {file ? "Change file" : "Upload file"}
                    </Button>
                    {file && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileIcon className="h-3 w-3" />
                        <span className="truncate max-w-[180px]">{file.name}</span>
                        <button type="button" onClick={() => setFile(null)} aria-label="Remove selected file"><X className="h-3 w-3" /></button>
                      </div>
                    )}
                    {!file && existingFileUrl && <Badge variant="outline" className="gap-1"><FileIcon className="h-3 w-3" /> File attached</Badge>}
                  </div>
                </div>

                <div>
                  <Label>Preview thumbnail (optional image shown in topic lists)</Label>
                  <div className="mt-1 flex items-center gap-3">
                    <input ref={previewRef} type="file" accept="image/*" className="hidden"
                      onChange={(e) => setPreviewFile(e.target.files?.[0] ?? null)} />
                    <Button type="button" size="sm" variant="outline" onClick={() => previewRef.current?.click()} className="gap-2">
                      <Upload className="h-3 w-3" /> {previewFile ? "Change thumbnail" : "Upload thumbnail"}
                    </Button>
                    {(previewFile || existingPreviewUrl) && (
                      <MaterialPreview
                        fileUrl={existingFileUrl}
                        previewUrl={existingPreviewUrl}
                        pageCount={pageCount.trim() === "" ? null : Number(pageCount)}
                        sourceRange={sourceRange.trim() || null}
                      />
                    )}
                    {previewFile && (
                      <button type="button" onClick={() => setPreviewFile(null)} className="text-xs text-muted-foreground underline">
                        Undo new thumbnail
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Page count (optional)</Label>
                    <Input value={pageCount} onChange={(e) => setPageCount(e.target.value)} inputMode="numeric" placeholder="e.g. 12" />
                  </div>
                  <div>
                    <Label>Source range (optional)</Label>
                    <Input value={sourceRange} onChange={(e) => setSourceRange(e.target.value)} placeholder="e.g. P1 notes p3–33" />
                  </div>
                </div>
              </div>

              <Button onClick={save} className="w-full" disabled={saving}>
                {saving ? "Saving…" : editing ? "Update" : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {materials.length === 0 && (
          <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">No materials yet.</CardContent></Card>
        )}
        {materials.map((m) => (
          <Card key={m.id} className="border-border/60 shadow-sm">
            <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <MaterialPreview
                  fileUrl={m.file_url}
                  previewUrl={m.preview_url}
                  pageCount={m.page_count}
                  sourceRange={m.source_range}
                  variant="compact"
                />
                <div className="min-w-0">
                  <p className="font-medium truncate">{m.title}</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <Badge variant="secondary">{m.topics?.name ?? "General"}</Badge>
                    <Badge variant="outline" className="capitalize">{m.material_type}</Badge>
                    {m.file_url && <Badge variant="outline" className="gap-1"><FileIcon className="h-3 w-3" /> File</Badge>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileVersionHistory entityType="material" entityId={m.id} onRestored={load} />
                <Button size="icon" variant="ghost" onClick={() => openEdit(m)} aria-label={`Edit ${m.title}`}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" disabled={busyId === m.id} onClick={() => removeMaterial(m)}
                  aria-label={`Delete ${m.title}`}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
