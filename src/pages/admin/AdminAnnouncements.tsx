// Publish announcements.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { format } from "date-fns";
import { contentSaveError } from "@/lib/contentGuards";

export default function AdminAnnouncements() {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const load = () =>
    supabase
      .from("announcements")
      .select("*")
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          toast({ title: "Could not load announcements", description: error.message, variant: "destructive" });
          return;
        }
        setAnnouncements(data ?? []);
      });

  useEffect(() => { load(); }, []);

  const save = async () => {
    const { error } = await supabase.from("announcements").insert({ title, content });
    // A refused post used to clear the form and toast "Posted" — the
    // announcement was simply never there.
    if (error) {
      toast(contentSaveError("Could not post the announcement", error.message));
      return;
    }
    toast({ title: "Posted" });
    setOpen(false); setTitle(""); setContent(""); load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Announcements</h1><p className="text-muted-foreground">Post updates</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> Post</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Announcement</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
              <div><Label>Content</Label><Textarea value={content} onChange={(e) => setContent(e.target.value)} /></div>
              <Button onClick={save} className="w-full">Post</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-3">
        {announcements.map((a) => (
          <Card key={a.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{format(new Date(a.published_at), "PPP")}</p>
              </div>
              <Button size="icon" variant="ghost" aria-label={`Delete ${a.title}`} title={`Delete ${a.title}`} onClick={async () => { await supabase.from("announcements").delete().eq("id", a.id); load(); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
