import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Upload, FileIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { recordVersion } from "@/lib/contentFiles";
import { validateUploadFile } from "@/lib/fileValidation";
import { FileVersionHistory } from "@/components/FileVersionHistory";


async function resolveTopicId(name: string): Promise<string | null> {
  if (!name.trim()) return null;
  const trimmed = name.trim();
  const { data: existing } = await supabase.from("topics").select("id").ilike("name", trimmed).limit(1).single();
  if (existing) return existing.id;
  const { data: created } = await supabase.from("topics").insert({ name: trimmed }).select("id").single();
  return created?.id ?? null;
}

// Bucket is private: open files through a short-lived signed URL.
async function openMaterialFile(fileUrl: string) {
  const marker = "/study-materials/";
  const idx = fileUrl.indexOf(marker);
  const path = idx >= 0 ? fileUrl.slice(idx + marker.length) : fileUrl;
  const { data } = await supabase.storage.from("study-materials").createSignedUrl(path, 300);
  if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener,noreferrer");
}



export default function AdminMaterials() {
  const { toast } = useToast();
  const [materials, setMaterials] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topicName, setTopicName] = useState("");
  const [materialType, setMaterialType] = useState("notes");
  const [file, setFile] = useState<File | null>(null);
  const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data } = await supabase.from("study_materials").select("*, topics(name)").order("created_at", { ascending: false });
    setMaterials(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setOpen(false); setEditing(null); setTitle(""); setContent(""); setTopicName(""); setMaterialType("notes"); setFile(null); setExistingFileUrl(null);
  };

  const save = async () => {
    setUploading(true);
    let fileUrl = existingFileUrl;
    let uploadedPath: string | null = null;

    if (file) {
      const check = validateUploadFile(file);
      if (check.ok === false) {
        toast({ title: "Invalid file", description: check.error, variant: "destructive" });
        setUploading(false);
        return;
      }

      const ext = file.name.split(".").pop();
      const path = `materials/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("study-materials").upload(path, file);
      if (uploadError) {
        toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
        setUploading(false);
        return;
      }
      // Store the storage path — the bucket is private, so files are opened via signed URLs.
      fileUrl = path;
      uploadedPath = path;
    }

    const topicId = await resolveTopicId(topicName);
    const payload = { title, content, topic_id: topicId, material_type: materialType, file_url: fileUrl };
    let materialId = editing?.id as string | undefined;
    if (editing) {
      await supabase.from("study_materials").update(payload).eq("id", editing.id);
    } else {
      const { data: created } = await supabase.from("study_materials").insert(payload).select("id").single();
      materialId = created?.id;
    }

    if (uploadedPath && materialId && file) {
      await recordVersion({
        entityType: "material",
        entityId: materialId,
        slot: "file",
        bucket: "study-materials",
        filePath: uploadedPath,
        fileName: file.name,
      });
    }

    toast({ title: editing ? "Updated" : "Created" });
    resetForm();
    load();
    setUploading(false);
  };


  const openEdit = (m: any) => {
    setEditing(m); setTitle(m.title); setContent(m.content ?? ""); setTopicName(m.topics?.name ?? ""); setMaterialType(m.material_type); setExistingFileUrl(m.file_url ?? null); setFile(null); setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Study Materials</h1><p className="text-muted-foreground">Manage revision content</p></div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> Add Material</Button></DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Material</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
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
              <div><Label>Topic</Label>
                <Input value={topicName} onChange={(e) => setTopicName(e.target.value)} placeholder="e.g. Marketing, Finance, HR" />
              </div>
              <div><Label>Content</Label><Textarea value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[200px]" /></div>
              <div>
                <Label>File (optional)</Label>
                <div className="flex items-center gap-3 mt-1">
                  <input ref={fileRef} type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                  <Button type="button" size="sm" variant="outline" onClick={() => fileRef.current?.click()} className="gap-2">
                    <Upload className="h-3 w-3" /> {file ? "Change File" : "Upload File"}
                  </Button>
                  {file && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileIcon className="h-3 w-3" />
                      <span className="truncate max-w-[200px]">{file.name}</span>
                      <button onClick={() => setFile(null)}><X className="h-3 w-3" /></button>
                    </div>
                  )}
                  {!file && existingFileUrl && (
                    <a href={existingFileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline flex items-center gap-1">
                      <FileIcon className="h-3 w-3" /> Current file
                    </a>
                  )}
                </div>
              </div>
              <Button onClick={save} className="w-full" disabled={uploading}>{uploading ? "Uploading…" : editing ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-3">
        {materials.map((m) => (
          <Card key={m.id} className="border-border/60 shadow-sm">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{m.title}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary">{m.topics?.name ?? "General"}</Badge>
                  <Badge variant="outline" className="capitalize">{m.material_type}</Badge>
                  {m.file_url && (
                    <button type="button" onClick={() => openMaterialFile(m.file_url)}>
                      <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-muted"><FileIcon className="h-3 w-3" /> File</Badge>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileVersionHistory entityType="material" entityId={m.id} />

                <Button size="icon" variant="ghost" onClick={() => openEdit(m)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={async () => { await supabase.from("study_materials").delete().eq("id", m.id); load(); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
