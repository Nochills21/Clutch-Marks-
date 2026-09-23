// Manage AI/topic question bank.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/useToast";
import { Database, Sparkles, Search } from "lucide-react";

export default function AdminQuestionBank() {
  const { toast } = useToast();
  const [topics, setTopics] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [filterTopic, setFilterTopic] = useState<string>("all");
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [pickedTopics, setPickedTopics] = useState<Record<string, boolean>>({});
  const [count, setCount] = useState(10);
  const [title, setTitle] = useState("");
  const [building, setBuilding] = useState(false);

  const load = async () => {
    const [t, q, qz] = await Promise.all([
      supabase.from("topics").select("*").order("sort_order"),
      supabase.from("questions").select("id, question_text, quiz_id, correct_option, options"),
      supabase.from("quizzes").select("id, title, topic_id"),
    ]);
    setTopics(t.data ?? []);
    setQuestions(q.data ?? []);
    setQuizzes(qz.data ?? []);
  };
  useEffect(() => { load(); }, []);

  const quizMap = new Map(quizzes.map((q) => [q.id, q]));
  const topicMap = new Map(topics.map((t) => [t.id, t.name]));

  const filtered = questions.filter((q) => {
    const quiz = quizMap.get(q.quiz_id);
    if (filterTopic !== "all" && quiz?.topic_id !== filterTopic) return false;
    if (search && !q.question_text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const buildQuiz = async () => {
    const topicIds = Object.entries(pickedTopics).filter(([_, v]) => v).map(([k]) => k);
    if (topicIds.length === 0 || !title.trim()) {
      toast({ title: "Pick at least one topic and enter a title", variant: "destructive" });
      return;
    }
    setBuilding(true);
    try {
      // Pool: questions whose quiz belongs to picked topics
      const pool = questions.filter((q) => {
        const qz = quizMap.get(q.quiz_id);
        return qz && topicIds.includes(qz.topic_id);
      });
      if (pool.length === 0) throw new Error("No questions found for the selected topics.");
      const picked = pool.sort(() => Math.random() - 0.5).slice(0, count);

      const { data: newQuiz, error: e1 } = await supabase.from("quizzes").insert({
        title: title.trim(),
        description: `Auto-generated from ${topicIds.length} topic(s)`,
        topic_id: topicIds[0],
        is_published: true,
      }).select().single();
      if (e1) throw e1;

      const rows = picked.map((q, i) => ({
        quiz_id: newQuiz.id,
        question_text: q.question_text,
        options: q.options,
        correct_option: q.correct_option,
        sort_order: i,
      }));
      const { error: e2 } = await supabase.from("questions").insert(rows);
      if (e2) throw e2;

      toast({ title: "Quiz built!", description: `Created "${newQuiz.title}" with ${rows.length} questions.` });
      setOpen(false);
      setTitle("");
      setPickedTopics({});
      load();
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally {
      setBuilding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" /> Question Bank
          </h1>
          <p className="text-muted-foreground">Search every question across all quizzes and auto-build new ones.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Sparkles className="h-4 w-4" /> Auto-build Quiz</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Auto-build a new quiz</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Quiz title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Mixed Practice — Marketing" />
              </div>
              <div className="space-y-2">
                <Label>Number of questions</Label>
                <Input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Number(e.target.value) || 10)} />
              </div>
              <div className="space-y-2">
                <Label>Pick topics</Label>
                <div className="max-h-48 overflow-y-auto rounded-lg border p-2 space-y-1">
                  {topics.map((t) => (
                    <label key={t.id} className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted/50 rounded text-sm cursor-pointer">
                      <Checkbox
                        checked={!!pickedTopics[t.id]}
                        onCheckedChange={(v) => setPickedTopics((p) => ({ ...p, [t.id]: !!v }))}
                      />
                      {t.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={buildQuiz} disabled={building}>{building ? "Building…" : "Build quiz"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions…" className="pl-9" />
        </div>
        <select
          value={filterTopic}
          onChange={(e) => setFilterTopic(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="all">All topics</option>
          {topics.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} question{filtered.length === 1 ? "" : "s"}</p>

      <div className="space-y-2">
        {filtered.slice(0, 100).map((q) => {
          const quiz = quizMap.get(q.quiz_id);
          const topicName = quiz ? topicMap.get(quiz.topic_id) : null;
          return (
            <Card key={q.id}>
              <CardContent className="p-4 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {topicName && <Badge variant="secondary" className="text-[10px]">{topicName}</Badge>}
                  {quiz && <Badge variant="outline" className="text-[10px]">{quiz.title}</Badge>}
                </div>
                <p className="text-sm">{q.question_text}</p>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length > 100 && (
          <p className="text-xs text-center text-muted-foreground">Showing first 100 of {filtered.length}. Refine your filter.</p>
        )}
      </div>
    </div>
  );
}
