import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Sparkles, Layers, Loader2, GraduationCap } from "lucide-react";
import {
  subjectIcon, subjectAccent, SUBJECT_ICON_NAMES, SUBJECT_COLORS,
  LEVELS, LEVEL_LABELS, type SubjectLevelCode,
} from "@/lib/subjects";

type Level = { id: string; subject_id: string; level: SubjectLevelCode; description: string | null; is_active: boolean; sort_order: number };
type Subject = { id: string; name: string; slug: string; description: string | null; icon: string; color: string; sort_order: number; is_active: boolean };
type Topic = { id: string; name: string; description: string | null; sort_order: number; subject_level_id: string | null };

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

export default function AdminSubjects() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  // subject dialog
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Subject | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "", icon: "BookOpen", color: "primary", sort_order: 0, is_active: true });

  // topic dialog
  const [topicOpen, setTopicOpen] = useState(false);
  const [topicLevelId, setTopicLevelId] = useState<string | null>(null);
  const [topicName, setTopicName] = useState("");
  const [topicDesc, setTopicDesc] = useState("");

  // AI dialog
  const [aiOpen, setAiOpen] = useState(false);
  const [aiTopicId, setAiTopicId] = useState<string>("");
  const [aiCount, setAiCount] = useState(10);
  const [aiDifficulty, setAiDifficulty] = useState("medium");
  const [aiTitle, setAiTitle] = useState("");
  const [generating, setGenerating] = useState(false);

  const load = async () => {
    const [s, l, t] = await Promise.all([
      supabase.from("subjects").select("*").order("sort_order"),
      supabase.from("subject_levels").select("*").order("sort_order"),
      supabase.from("topics").select("id, name, description, sort_order, subject_level_id").order("sort_order"),
    ]);
    setSubjects((s.data as Subject[]) ?? []);
    setLevels((l.data as Level[]) ?? []);
    setTopics((t.data as Topic[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const levelsBySubject = useMemo(() => {
    const map = new Map<string, Level[]>();
    for (const l of levels) map.set(l.subject_id, [...(map.get(l.subject_id) ?? []), l]);
    return map;
  }, [levels]);

  const topicsByLevel = useMemo(() => {
    const map = new Map<string, Topic[]>();
    for (const t of topics) {
      if (!t.subject_level_id) continue;
      map.set(t.subject_level_id, [...(map.get(t.subject_level_id) ?? []), t]);
    }
    return map;
  }, [topics]);

  const unassigned = topics.filter((t) => !t.subject_level_id);

  const resetForm = () => setForm({ name: "", slug: "", description: "", icon: "BookOpen", color: "primary", sort_order: subjects.length + 1, is_active: true });

  const saveSubject = async () => {
    if (!form.name.trim()) { toast({ title: "Name is required", variant: "destructive" }); return; }
    const payload = {
      name: form.name.trim(),
      slug: slugify(form.slug || form.name),
      description: form.description.trim() || null,
      icon: form.icon,
      color: form.color,
      sort_order: form.sort_order,
      is_active: form.is_active,
    };
    let subjectId = editing?.id;
    if (editing) {
      const { error } = await supabase.from("subjects").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Failed", description: error.message, variant: "destructive" }); return; }
    } else {
      const { data, error } = await supabase.from("subjects").insert(payload).select("id").single();
      if (error) { toast({ title: "Failed", description: error.message, variant: "destructive" }); return; }
      subjectId = data.id;
      await supabase.from("subject_levels").insert(
        LEVELS.map((level, i) => ({ subject_id: subjectId!, level, sort_order: i + 1 })),
      );
    }
    toast({ title: editing ? "Subject updated" : "Subject created" });
    setOpen(false); setEditing(null); resetForm(); load();
  };

  const removeSubject = async (s: Subject) => {
    const { error } = await supabase.from("subjects").delete().eq("id", s.id);
    if (error) { toast({ title: "Failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Subject deleted" });
    load();
  };

  const toggleLevel = async (l: Level, active: boolean) => {
    await supabase.from("subject_levels").update({ is_active: active }).eq("id", l.id);
    setLevels((prev) => prev.map((x) => (x.id === l.id ? { ...x, is_active: active } : x)));
  };

  const saveTopic = async () => {
    if (!topicLevelId || !topicName.trim()) return;
    const { error } = await supabase.from("topics").insert({
      name: topicName.trim(),
      description: topicDesc.trim() || null,
      subject_level_id: topicLevelId,
      sort_order: (topicsByLevel.get(topicLevelId)?.length ?? 0) + 1,
    });
    if (error) { toast({ title: "Failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Topic added" });
    setTopicOpen(false); setTopicName(""); setTopicDesc(""); load();
  };

  const assignTopic = async (topicId: string, levelId: string) => {
    await supabase.from("topics").update({ subject_level_id: levelId }).eq("id", topicId);
    toast({ title: "Topic assigned" });
    load();
  };

  const generate = async () => {
    if (!aiTopicId) { toast({ title: "Pick a topic first", variant: "destructive" }); return; }
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-questions", {
        body: { topicId: aiTopicId, count: aiCount, difficulty: aiDifficulty, quizTitle: aiTitle || undefined },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      toast({ title: "Question bank generated", description: `${(data as any).count} questions added to "${(data as any).title}".` });
      setAiOpen(false); setAiTitle("");
    } catch (e: any) {
      toast({ title: "Generation failed", description: e.message ?? "Please try again.", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="space-y-4">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-40 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" /> Subjects
          </h1>
          <p className="text-muted-foreground">Manage subjects, their OL / AS / A2 levels, topics and AI question banks.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={aiOpen} onOpenChange={setAiOpen}>
            <DialogTrigger asChild><Button variant="outline" className="gap-2"><Sparkles className="h-4 w-4" /> AI question bank</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Generate an AI question bank</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Topic</Label>
                  <Select value={aiTopicId} onValueChange={setAiTopicId}>
                    <SelectTrigger><SelectValue placeholder="Select a topic" /></SelectTrigger>
                    <SelectContent>
                      {topics.map((t) => {
                        const lvl = levels.find((l) => l.id === t.subject_level_id);
                        const subj = subjects.find((s) => s.id === lvl?.subject_id);
                        return (
                          <SelectItem key={t.id} value={t.id}>
                            {subj ? `${subj.name} ${lvl?.level} — ` : ""}{t.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Questions</Label>
                    <Input type="number" min={1} max={25} value={aiCount} onChange={(e) => setAiCount(Number(e.target.value) || 10)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <Select value={aiDifficulty} onValueChange={setAiDifficulty}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Set title (optional)</Label>
                  <Input value={aiTitle} onChange={(e) => setAiTitle(e.target.value)} placeholder="Auto-named if left blank" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={generate} disabled={generating} className="gap-2">
                  {generating ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</> : <><Sparkles className="h-4 w-4" /> Generate</>}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setEditing(null); resetForm(); } }}>
            <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> Add subject</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} subject</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2"><Label>Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Chemistry" />
                </div>
                <div className="space-y-2"><Label>URL slug</Label>
                  <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder={slugify(form.name) || "chemistry"} />
                </div>
                <div className="space-y-2"><Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2"><Label>Icon</Label>
                    <Select value={form.icon} onValueChange={(v) => setForm({ ...form, icon: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{SUBJECT_ICON_NAMES.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>Colour</Label>
                    <Select value={form.color} onValueChange={(v) => setForm({ ...form, color: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{SUBJECT_COLORS.map((c) => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>Order</Label>
                    <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) || 0 })} />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div><p className="text-sm font-medium">Visible to students</p><p className="text-xs text-muted-foreground">Hidden subjects only show for admins.</p></div>
                  <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                </div>
              </div>
              <DialogFooter><Button onClick={saveSubject}>{editing ? "Save changes" : "Create subject"}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {subjects.length === 0 && (
        <Card><CardContent className="p-10 text-center text-muted-foreground">No subjects yet — add your first one.</CardContent></Card>
      )}

      {subjects.map((s) => {
        const Icon = subjectIcon(s.icon);
        const accent = subjectAccent(s.color);
        const subjLevels = (levelsBySubject.get(s.id) ?? []).sort((a, b) => LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level));
        return (
          <Card key={s.id} className={accent.border}>
            <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
              <div className="flex items-start gap-3 min-w-0">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${accent.border} ${accent.bg} ${accent.text}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="flex items-center gap-2">
                    {s.name}
                    {!s.is_active && <Badge variant="outline">Hidden</Badge>}
                  </CardTitle>
                  <CardDescription>/{s.slug}{s.description ? ` — ${s.description}` : ""}</CardDescription>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => { setEditing(s); setForm({ name: s.name, slug: s.slug, description: s.description ?? "", icon: s.icon, color: s.color, sort_order: s.sort_order, is_active: s.is_active }); setOpen(true); }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => removeSubject(s)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {subjLevels.map((l) => {
                const lvlTopics = topicsByLevel.get(l.id) ?? [];
                return (
                  <div key={l.id} className="rounded-xl border border-border/60 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">{LEVEL_LABELS[l.level]}</p>
                        <p className="text-[11px] text-muted-foreground">{lvlTopics.length} topic{lvlTopics.length === 1 ? "" : "s"}</p>
                      </div>
                      <Switch checked={l.is_active} onCheckedChange={(v) => toggleLevel(l, v)} />
                    </div>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {lvlTopics.map((t) => (
                        <div key={t.id} className="rounded-lg bg-muted/40 px-2.5 py-1.5 text-xs truncate">{t.name}</div>
                      ))}
                      {lvlTopics.length === 0 && <p className="text-xs text-muted-foreground">No topics yet.</p>}
                    </div>
                    <Button size="sm" variant="outline" className="w-full gap-1"
                      onClick={() => { setTopicLevelId(l.id); setTopicOpen(true); }}>
                      <Plus className="h-3.5 w-3.5" /> Add topic
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}

      {unassigned.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Layers className="h-4 w-4" /> Unassigned topics</CardTitle>
            <CardDescription>Move existing topics into a subject and level.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {unassigned.map((t) => (
              <div key={t.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3">
                <p className="text-sm font-medium">{t.name}</p>
                <Select onValueChange={(v) => assignTopic(t.id, v)}>
                  <SelectTrigger className="w-[240px]"><SelectValue placeholder="Assign to subject & level" /></SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) =>
                      (levelsBySubject.get(s.id) ?? []).map((l) => (
                        <SelectItem key={l.id} value={l.id}>{s.name} — {LEVEL_LABELS[l.level]}</SelectItem>
                      )),
                    )}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Dialog open={topicOpen} onOpenChange={setTopicOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>New topic</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Name</Label><Input value={topicName} onChange={(e) => setTopicName(e.target.value)} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={topicDesc} onChange={(e) => setTopicDesc(e.target.value)} /></div>
          </div>
          <DialogFooter><Button onClick={saveTopic}>Add topic</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
