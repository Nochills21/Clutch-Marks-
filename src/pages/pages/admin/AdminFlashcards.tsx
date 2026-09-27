// Manage flashcard decks.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, Layers } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminFlashcards() {
  const { toast } = useToast();
  const [sets, setSets] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topicId, setTopicId] = useState<string>("");
  const [expandedSet, setExpandedSet] = useState<string | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [editingCard, setEditingCard] = useState<any>(null);

  const load = async () => {
    const [setsRes, topicsRes] = await Promise.all([
      supabase.from("flashcard_sets").select("*, topics(name)").order("created_at", { ascending: false }),
      supabase.from("topics").select("*").order("sort_order"),
    ]);
    setSets(setsRes.data ?? []);
    setTopics(topicsRes.data ?? []);
  };

  useEffect(() => { load(); }, []);

  const loadCards = async (setId: string) => {
    const { data } = await supabase.from("flashcards").select("*").eq("set_id", setId).order("sort_order");
    setCards(data ?? []);
  };

  const toggleExpand = (setId: string) => {
    if (expandedSet === setId) {
      setExpandedSet(null);
      setCards([]);
    } else {
      setExpandedSet(setId);
      loadCards(setId);
    }
  };

  const saveSet = async () => {
    const payload = {
      title,
      description: description || null,
      topic_id: topicId || null,
    };
    if (editing) {
      await supabase.from("flashcard_sets").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("flashcard_sets").insert(payload);
    }
    resetForm();
    load();
    toast({ title: editing ? "Set updated" : "Set created" });
  };

  const deleteSet = async (id: string) => {
    await supabase.from("flashcard_sets").delete().eq("id", id);
    if (expandedSet === id) setExpandedSet(null);
    load();
    toast({ title: "Set deleted" });
  };

  const editSet = (s: any) => {
    setEditing(s);
    setTitle(s.title);
    setDescription(s.description ?? "");
    setTopicId(s.topic_id ?? "");
    setOpen(true);
  };

  const resetForm = () => {
    setOpen(false);
    setEditing(null);
    setTitle("");
    setDescription("");
    setTopicId("");
  };

  const saveCard = async () => {
    if (!expandedSet) return;
    const payload = { set_id: expandedSet, front: cardFront, back: cardBack, sort_order: cards.length };
    if (editingCard) {
      await supabase.from("flashcards").update({ front: cardFront, back: cardBack }).eq("id", editingCard.id);
    } else {
      await supabase.from("flashcards").insert(payload);
    }
    setCardFront("");
    setCardBack("");
    setEditingCard(null);
    loadCards(expandedSet);
    toast({ title: editingCard ? "Card updated" : "Card added" });
  };

  const deleteCard = async (id: string) => {
    await supabase.from("flashcards").delete().eq("id", id);
    if (expandedSet) loadCards(expandedSet);
    toast({ title: "Card deleted" });
  };

  const startEditCard = (c: any) => {
    setEditingCard(c);
    setCardFront(c.front);
    setCardBack(c.back);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Flashcard Sets</h1>
          <p className="text-muted-foreground text-sm">Create and manage flashcard sets for student revision</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); else setOpen(true); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> New Set</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Create"} Flashcard Set</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Marketing Mix" /></div>
              <div><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional description" /></div>
              <div>
                <Label>Topic</Label>
                <Select value={topicId} onValueChange={setTopicId}>
                  <SelectTrigger><SelectValue placeholder="Select topic (optional)" /></SelectTrigger>
                  <SelectContent>
                    {topics.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={saveSet} disabled={!title.trim()} className="w-full">{editing ? "Update" : "Create"} Set</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {sets.length === 0 && (
        <Card className="border-dashed"><CardContent className="py-12 text-center text-muted-foreground"><Layers className="mx-auto h-10 w-10 mb-3 opacity-40" />No flashcard sets yet. Create one to get started.</CardContent></Card>
      )}

      <div className="space-y-3">
        {sets.map((s) => (
          <Card key={s.id} className="overflow-hidden">
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => toggleExpand(s.id)}>
              <div className="flex items-center gap-3 min-w-0">
                <Layers className="h-5 w-5 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{s.title}</p>
                  {s.description && <p className="text-xs text-muted-foreground truncate">{s.description}</p>}
                </div>
                {s.topics?.name && <Badge variant="secondary" className="shrink-0">{s.topics.name}</Badge>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); editSet(s); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); deleteSet(s.id); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                {expandedSet === s.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </div>

            {expandedSet === s.id && (
              <div className="border-t bg-muted/10 p-4 space-y-4">
                <div className="flex gap-2 items-end">
                  <div className="flex-1"><Label className="text-xs">Front</Label><Input value={cardFront} onChange={(e) => setCardFront(e.target.value)} placeholder="Question / term" /></div>
                  <div className="flex-1"><Label className="text-xs">Back</Label><Input value={cardBack} onChange={(e) => setCardBack(e.target.value)} placeholder="Answer / definition" /></div>
                  <Button onClick={saveCard} disabled={!cardFront.trim() || !cardBack.trim()} size="sm">{editingCard ? "Update" : "Add"}</Button>
                  {editingCard && <Button variant="ghost" size="sm" onClick={() => { setEditingCard(null); setCardFront(""); setCardBack(""); }}>Cancel</Button>}
                </div>

                {cards.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No cards yet. Add your first card above.</p>
                ) : (
                  <div className="space-y-2">
                    {cards.map((c, i) => (
                      <div key={c.id} className="flex items-center gap-3 rounded-lg border bg-background p-3">
                        <span className="text-xs text-muted-foreground w-6">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{c.front}</p>
                          <p className="text-xs text-muted-foreground truncate">{c.back}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEditCard(c)}><Pencil className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteCard(c.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
