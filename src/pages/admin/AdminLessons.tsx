// Manage lessons.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { Badge } from "@/components/ui/badge";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import { QueryError } from "@/components/QueryError";
import { contentGuardMessage, contentSaveError } from "@/lib/contentGuards";

/** PostgREST's "no rows for .single()" code — an expected result here, not a failure. */
const NO_ROWS = "PGRST116";

async function resolveTopicId(name: string): Promise<string | null> {
  if (!name.trim()) return null;
  const trimmed = name.trim();
  const { data: existing, error: lookupError } = await supabase
    .from("topics").select("id").ilike("name", trimmed).limit(1).single();
  // Anything other than "no rows" is a real failure. Swallowing it made a
  // broken lookup look like "topic not found", so the save quietly created a
  // second topic with the same name.
  if (lookupError && lookupError.code !== NO_ROWS) throw lookupError;
  if (existing) return existing.id;
  const { data: created, error: createError } = await supabase
    .from("topics").insert({ name: trimmed }).select("id").single();
  if (createError) throw createError;
  return created?.id ?? null;
}

export default function AdminLessons() {
  const { toast } = useToast();
  const [lessons, setLessons] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topicName, setTopicName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [zoomUrl, setZoomUrl] = useState("");
  const { failure, report, clear } = useLoadFailure("lessons");

  const load = async () => {
    clear();
    const { data, error } = await supabase.from("lessons").select("*, topics(name)").order("sort_order");
    // Ignoring this showed an empty console to an admin whose request failed.
    if (error) {
      report(error);
      setLessons([]);
      return;
    }
    setLessons(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    let topicId: string | null = null;
    try {
      topicId = await resolveTopicId(topicName);
    } catch (e: any) {
      // A topic name is guarded too, so a damaged one can be refused here.
      toast({
        title: "Could not look up that topic",
        description: contentGuardMessage(e?.message) ?? e?.message,
        variant: "destructive",
      });
      return;
    }
    const payload = { title, content, topic_id: topicId!, video_url: videoUrl || null, zoom_url: zoomUrl || null, sort_order: sortOrder };
    if (!topicId) {
      toast({ title: "Error", description: "Please enter a topic name", variant: "destructive" });
      return;
    }
    const { error } = editing
      ? await supabase.from("lessons").update(payload).eq("id", editing.id)
      : await supabase.from("lessons").insert(payload);
    // A refused save used to close the dialog and toast "Updated" anyway.
    if (error) {
      toast(contentSaveError("Could not save the lesson", error.message));
      return;
    }
    toast({ title: editing ? "Updated" : "Created" });
    setOpen(false); setEditing(null); setTitle(""); setContent(""); setTopicName(""); setVideoUrl(""); setZoomUrl(""); setSortOrder(0);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("lessons").delete().eq("id", id);
    toast({ title: "Deleted" }); load();
  };

  const openEdit = (l: any) => {
    setEditing(l); setTitle(l.title); setContent(l.content ?? ""); setTopicName(l.topics?.name ?? ""); setVideoUrl(l.video_url ?? ""); setZoomUrl(l.zoom_url ?? ""); setSortOrder(l.sort_order); setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Lessons</h1><p className="text-muted-foreground">Manage lesson content</p></div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setEditing(null); }}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> Add Lesson</Button></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Lesson</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Topic</Label>
                <Input value={topicName} onChange={(e) => setTopicName(e.target.value)} placeholder="e.g. Marketing, Finance, HR" />
              </div>
              <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
              <div><Label>Content</Label><Textarea value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[200px]" /></div>
              <div><Label>Video URL (optional)</Label><Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} /></div>
              <div><Label>Zoom Meeting Link (optional)</Label><Input value={zoomUrl} onChange={(e) => setZoomUrl(e.target.value)} placeholder="https://zoom.us/j/..." /></div>
              <div><Label>Sort Order</Label><Input type="number" value={sortOrder} onChange={(e) => setSortOrder(+e.target.value)} /></div>
              <Button onClick={save} className="w-full">{editing ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {failure && <QueryError message={failure} onRetry={load} />}
      <div className="space-y-3">
        {lessons.map((l) => (
          <Card key={l.id} className="border-border/60 shadow-sm">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{l.title}</p>
                <Badge variant="secondary" className="mt-1">{l.topics?.name ?? "No topic"}</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" aria-label={`Edit ${l.title}`} title={`Edit ${l.title}`} onClick={() => openEdit(l)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" aria-label={`Delete ${l.title}`} title={`Delete ${l.title}`} onClick={() => remove(l.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
