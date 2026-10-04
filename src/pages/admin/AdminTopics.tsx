// Manage topics per subject-level.
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Upload, FileText, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { validateUploadFile } from "@/lib/fileValidation";
import { openSignedFile } from "@/lib/contentFiles";

type Note = { id: string; title: string; file_url: string | null; topic_id: string | null };

export default function AdminTopics() {
  const { toast } = useToast();
  const [topics, setTopics] = useState<any[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [uploadingTopic, setUploadingTopic] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const load = async () => {
    const [t, n] = await Promise.all([
      supabase.from("topics").select("*").order("sort_order"),
      supabase.from("study_materials").select("id, title, file_url, topic_id").eq("material_type", "notes").order("created_at", { ascending: false }),
    ]);
    setTopics(t.data ?? []);
    setNotes((n.data ?? []) as Note[]);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    const payload = { name, description, sort_order: sortOrder };
    if (editing) {
      await supabase.from("topics").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("topics").insert(payload);
    }
    toast({ title: editing ? "Updated" : "Created" });
    setOpen(false); setEditing(null); setName(""); setDescription(""); setSortOrder(0);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("topics").delete().eq("id", id);
    toast({ title: "Deleted" });
    load();
  };

  const openEdit = (t: any) => {
    setEditing(t); setName(t.name); setDescription(t.description ?? ""); setSortOrder(t.sort_order); setOpen(true);
  };

  const uploadNote = async (topicId: string, file: File) => {
    const check = validateUploadFile(file);
    if (check.ok === false) {
      toast({ title: "Upload blocked", description: check.error, variant: "destructive" });
      return;
    }
    setUploadingTopic(topicId);
    const path = `notes/${topicId}/${Date.now()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
    const { error } = await supabase.storage.from("study-materials").upload(path, file);
    if (error) {
      setUploadingTopic(null);
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      return;
    }
    const { error: insertError } = await supabase.from("study_materials").insert({
      topic_id: topicId,
      title: file.name,
      material_type: "notes",
      file_url: path,
    });
    setUploadingTopic(null);
    if (insertError) {
      toast({ title: "Could not save note", description: insertError.message, variant: "destructive" });
      return;
    }
    toast({ title: "Notes uploaded" });
    load();
  };

  const removeNote = async (note: Note) => {
    if (note.file_url) await supabase.storage.from("study-materials").remove([note.file_url]);
    await supabase.from("study_materials").delete().eq("id", note.id);
    toast({ title: "Note removed" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Topics</h1>
          <p className="text-muted-foreground">Manage chapters and their lesson notes</p>
        </div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setEditing(null); setName(""); setDescription(""); } }}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> Add Topic</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Topic</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} /></div>
              <div><Label>Sort Order</Label><Input type="number" value={sortOrder} onChange={(e) => setSortOrder(+e.target.value)} /></div>
              <Button onClick={save} className="w-full">{editing ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-3">
        {topics.map((t) => {
          const topicNotes = notes.filter((n) => n.topic_id === t.id);
          return (
            <Card key={t.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium">{t.name}</p>
                    {t.description && <p className="text-sm text-muted-foreground">{t.description}</p>}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <input
                      type="file"
                      className="hidden"
                      ref={(el) => { fileInputs.current[t.id] = el; }}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        e.target.value = "";
                        if (f) uploadNote(t.id, f);
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      disabled={uploadingTopic === t.id}
                      onClick={() => fileInputs.current[t.id]?.click()}
                    >
                      {uploadingTopic === t.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      Upload notes
                    </Button>
                    <Button size="icon" variant="ghost" aria-label={`Edit ${t.name}`} title={`Edit ${t.name}`} onClick={() => openEdit(t)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" aria-label={`Delete ${t.name}`} title={`Delete ${t.name}`} onClick={() => remove(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>

                {topicNotes.length > 0 && (
                  <div className="space-y-1 rounded-lg border border-border/60 p-2">
                    {topicNotes.map((n) => (
                      <div key={n.id} className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{n.title}</span>
                        <Button size="icon" variant="ghost" disabled={!n.file_url} aria-label={`Open ${n.title}`} title={n.file_url ? `Open ${n.title}` : "No file uploaded"} onClick={() => n.file_url && openSignedFile("study-materials", n.file_url)}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" aria-label={`Delete ${n.title}`} title={`Delete ${n.title}`} onClick={() => removeNote(n)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
