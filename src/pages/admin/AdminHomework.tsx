import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

async function resolveTopicId(name: string): Promise<string | null> {
  if (!name.trim()) return null;
  const trimmed = name.trim();
  const { data: existing } = await supabase.from("topics").select("id").ilike("name", trimmed).limit(1).single();
  if (existing) return existing.id;
  const { data: created } = await supabase.from("topics").insert({ name: trimmed }).select("id").single();
  return created?.id ?? null;
}

export default function AdminHomework() {
  const { toast } = useToast();
  const [homework, setHomework] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topicName, setTopicName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const load = async () => {
    const { data } = await supabase.from("homework").select("*, topics(name)").order("created_at", { ascending: false });
    setHomework(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    const topicId = await resolveTopicId(topicName);
    const payload = { title, description, topic_id: topicId, due_date: dueDate || null };
    if (editing) {
      await supabase.from("homework").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("homework").insert(payload);
    }
    toast({ title: editing ? "Updated" : "Created" });
    setOpen(false); setEditing(null); setTitle(""); setDescription(""); setTopicName(""); setDueDate(""); load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Homework</h1><p className="text-muted-foreground">Assign homework</p></div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setEditing(null); }}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> Assign</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Homework</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
              <div><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} /></div>
              <div><Label>Topic</Label>
                <Input value={topicName} onChange={(e) => setTopicName(e.target.value)} placeholder="e.g. Marketing, Finance, HR" />
              </div>
              <div><Label>Due Date</Label><Input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></div>
              <Button onClick={save} className="w-full">{editing ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-3">
        {homework.map((hw) => (
          <Card key={hw.id} className="border-border/60 shadow-sm">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{hw.title}</p>
                <div className="flex gap-2 mt-1">
                  {hw.topics?.name && <Badge variant="secondary">{hw.topics.name}</Badge>}
                  {hw.due_date && <span className="text-xs text-muted-foreground">Due: {format(new Date(hw.due_date), "PPP")}</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => { setEditing(hw); setTitle(hw.title); setDescription(hw.description ?? ""); setTopicName(hw.topics?.name ?? ""); setDueDate(hw.due_date ?? ""); setOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={async () => { await supabase.from("homework").delete().eq("id", hw.id); load(); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
