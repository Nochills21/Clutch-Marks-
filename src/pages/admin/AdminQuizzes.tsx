// Manage quizzes and questions.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Brain, Upload } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import { QueryError } from "@/components/QueryError";
import { Badge } from "@/components/ui/badge";
import { getSafeUploadExtension } from "@/lib/fileValidation";
import { contentGuardMessage, contentSaveError } from "@/lib/contentGuards";
import { resolveQuizOptions } from "@/lib/quizAnswers";

export default function AdminQuizzes() {
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topicId, setTopicId] = useState("");
  const [timeLimit, setTimeLimit] = useState<number | "">("");
  const [isPublished, setIsPublished] = useState(false);
  const [examFile, setExamFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const [questionsOpen, setQuestionsOpen] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [qText, setQText] = useState("");
  const [qOptions, setQOptions] = useState(["", "", "", ""]);
  const [qCorrect, setQCorrect] = useState(0);
  const [qExplanation, setQExplanation] = useState("");
  const { failure, report, clear } = useLoadFailure("quizzes");

  const load = async () => {
    clear();
    const [q, t] = await Promise.all([
      supabase.from("quizzes").select("*, topics(name)").order("created_at", { ascending: false }),
      supabase.from("topics").select("*").order("sort_order"),
    ]);
    // Both reads used to collapse into `?? []`, so a failed request rendered an
    // empty console with no hint anything had gone wrong.
    const error = q.error ?? t.error;
    if (error) {
      report(error);
      setQuizzes([]);
      setTopics([]);
      return;
    }
    setQuizzes(q.data ?? []);
    setTopics(t.data ?? []);
  };

  useEffect(() => { load(); }, []);

  const loadQuestions = async (quizId: string) => {
    const { data, error } = await supabase.from("questions").select("*").eq("quiz_id", quizId).order("sort_order");
    // Otherwise a failed read showed "this quiz has no questions".
    if (error) {
      report(error);
      setQuestions([]);
      setQuestionsOpen(quizId);
      return;
    }
    setQuestions(data ?? []);
    setQuestionsOpen(quizId);
  };

  const saveQuiz = async () => {
    let examFileUrl: string | null = editing?.exam_file_url ?? null;

    if (examFile) {
      setUploadingFile(true);
      const ext = getSafeUploadExtension(examFile);
      if (!ext) {
        toast({ title: "File upload blocked", description: "Unsupported file type. Allowed: PDF, Word, images.", variant: "destructive" });
        setUploadingFile(false);
        return;
      }
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("quiz-files").upload(path, examFile);
      if (uploadErr) {
        toast({ title: "File upload failed", description: uploadErr.message, variant: "destructive" });
        setUploadingFile(false);
        return;
      }
      // Store path only (bucket is private, use signed URLs to access)
      examFileUrl = path;
      setUploadingFile(false);
    }

    const payload: any = {
      title, description, topic_id: topicId || null,
      time_limit_minutes: timeLimit || null, is_published: isPublished,
      exam_file_url: examFileUrl,
    };

    let quizId = editing?.id;
    if (editing) {
      const { error } = await supabase.from("quizzes").update(payload).eq("id", editing.id);
      // A refused update still toasted "Updated", so a title with a damaged
      // character looked saved while the database kept the old one.
      if (error) {
        toast(contentSaveError("Could not update the quiz", error.message));
        return;
      }
    } else {
      const { data, error } = await supabase.from("quizzes").insert(payload).select("id").single();
      // A failed insert still toasted "Created", leaving the admin with no quiz.
      if (error) {
        toast({ title: "Could not create the quiz", description: error.message, variant: "destructive" });
        return;
      }
      quizId = data?.id;
    }

    // If exam file was uploaded and it's a new quiz, auto-create confirmation question
    let setupWarning: string | null = null;
    if (examFileUrl && !editing && quizId) {
      const { error } = await supabase.from("questions").insert({
        quiz_id: quizId,
        question_text: "Have you completed and submitted the exam?",
        options: ["Yes, I have submitted my exam", "No, I have not submitted yet"],
        correct_option: 0,
        explanation: "Make sure you upload your solved exam file before confirming.",
        sort_order: 0,
      });
      // The quiz itself saved, so still report success — but never swallow it:
      // without this the quiz looked ready with no confirmation step.
      if (error) setupWarning = contentGuardMessage(error.message) ?? error.message;
    }

    toast(
      setupWarning
        ? {
            title: "Quiz created, but its confirmation question was not",
            description: `${setupWarning} Add it under Questions.`,
            variant: "destructive",
          }
        : { title: editing ? "Updated" : "Created" },
    );
    setOpen(false); setEditing(null); resetForm(); load();
  };

  const addQuestion = async () => {
    if (!questionsOpen || !qText.trim()) return;
    // Blank option slots are dropped before saving, which shifts every option
    // after them, so the index the form reports is not the one that belongs in
    // the row. Resolve the picked option by its text (see quizAnswers.ts).
    const resolved = resolveQuizOptions(qOptions, qCorrect);
    if (resolved.error) {
      toast({ title: "Could not add the question", description: resolved.error, variant: "destructive" });
      return;
    }
    const { options, correctOption } = resolved;
    const { error } = await supabase.from("questions").insert({
      quiz_id: questionsOpen, question_text: qText, options,
      correct_option: correctOption, explanation: qExplanation || null, sort_order: questions.length,
    });
    // Ignoring this emptied the form and claimed "Question added" for a question
    // the database had refused.
    if (error) {
      toast(contentSaveError("Could not add the question", error.message));
      return;
    }
    setQText(""); setQOptions(["", "", "", ""]); setQCorrect(0); setQExplanation("");
    loadQuestions(questionsOpen);
    toast({ title: "Question added" });
  };

  const removeQuestion = async (id: string) => {
    await supabase.from("questions").delete().eq("id", id);
    if (questionsOpen) loadQuestions(questionsOpen);
  };

  const resetForm = () => {
    setTitle(""); setDescription(""); setTopicId(""); setTimeLimit(""); setIsPublished(false); setExamFile(null);
  };

  if (questionsOpen) {
    const quiz = quizzes.find((q) => q.id === questionsOpen);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold">{quiz?.title} - Questions</h1></div>
          <Button variant="ghost" onClick={() => setQuestionsOpen(null)}>← Back</Button>
        </div>
        <Card className="neon-border bg-card">
          <CardHeader><CardTitle className="text-lg">Add Question</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Question</Label><Textarea value={qText} onChange={(e) => setQText(e.target.value)} className="bg-secondary/50 border-border" /></div>
            {qOptions.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <Label className="w-20">Option {i + 1}</Label>
                <Input value={opt} onChange={(e) => { const n = [...qOptions]; n[i] = e.target.value; setQOptions(n); }} className="bg-secondary/50 border-border" />
                <input type="radio" name="correct" checked={qCorrect === i} onChange={() => setQCorrect(i)} />
                <span className="text-xs text-muted-foreground">Correct</span>
              </div>
            ))}
            <div><Label>Explanation (optional)</Label><Textarea value={qExplanation} onChange={(e) => setQExplanation(e.target.value)} className="bg-secondary/50 border-border" /></div>
            <Button onClick={addQuestion}>Add Question</Button>
          </CardContent>
        </Card>
        {failure && questionsOpen && (
          <QueryError message={failure} onRetry={() => loadQuestions(questionsOpen)} className="mb-3" />
        )}
        <div className="space-y-3">
          {questions.map((q, i) => (
            <Card key={q.id} className="neon-border bg-card">
              <CardContent className="flex items-start justify-between p-4">
                <div>
                  <p className="font-medium">Q{i + 1}. {q.question_text}</p>
                  <div className="mt-1 space-y-0.5">
                    {(Array.isArray(q.options) ? q.options : []).map((opt: string, j: number) => (
                      <p key={j} className={`text-sm ${j === q.correct_option ? "text-primary font-medium" : "text-muted-foreground"}`}>
                        {j === q.correct_option ? "✓" : "○"} {opt}
                      </p>
                    ))}
                  </div>
                </div>
                <Button size="icon" variant="ghost" aria-label="Delete question" title="Delete question" onClick={() => removeQuestion(q.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Quizzes</h1><p className="text-muted-foreground">Create and manage quizzes</p></div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setEditing(null); resetForm(); } }}>
          <DialogTrigger asChild><Button className="gap-2 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground glow-shadow"><Plus className="h-4 w-4" /> Add Quiz</Button></DialogTrigger>
          <DialogContent className="neon-border bg-card">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Quiz</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-secondary/50 border-border" /></div>
              <div><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="bg-secondary/50 border-border" /></div>
              <div><Label>Topic</Label>
                <Select value={topicId} onValueChange={setTopicId}>
                  <SelectTrigger className="bg-secondary/50 border-border"><SelectValue placeholder="Select topic" /></SelectTrigger>
                  <SelectContent>{topics.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Time Limit (minutes)</Label><Input type="number" value={timeLimit} onChange={(e) => setTimeLimit(+e.target.value || "")} className="bg-secondary/50 border-border" /></div>
              
              {/* Exam File Upload */}
              <div className="space-y-2">
                <Label>Exam File (optional)</Label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-border p-3 hover:border-primary/40 transition-colors bg-secondary/30">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{examFile ? examFile.name : "Upload exam file (PDF, DOC, etc.)"}</span>
                    <input type="file" className="hidden" onChange={(e) => setExamFile(e.target.files?.[0] ?? null)} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
                  </label>
                  {examFile && <Button size="sm" variant="ghost" onClick={() => setExamFile(null)}>Clear</Button>}
                </div>
                {editing?.exam_file_url && !examFile && (
                  <p className="text-xs text-muted-foreground">Current file attached. Upload a new one to replace.</p>
                )}
              </div>

              <div className="flex items-center gap-2"><Switch checked={isPublished} onCheckedChange={setIsPublished} /><Label>Published</Label></div>
              <Button onClick={saveQuiz} className="w-full bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground" disabled={uploadingFile}>
                {uploadingFile ? "Uploading…" : editing ? "Update" : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {failure && <QueryError message={failure} onRetry={load} />}
      <div className="space-y-3">
        {quizzes.map((q) => (
          <Card key={q.id} className="neon-border bg-card">
            <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="font-medium">{q.title}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary">{(q as any).topics?.name ?? "General"}</Badge>
                  <Badge variant={q.is_published ? "default" : "outline"}>{q.is_published ? "Published" : "Draft"}</Badge>
                  {q.exam_file_url && <Badge variant="outline" className="border-primary/30 text-primary">📎 Exam File</Badge>}
                </div>
              </div>
              <div className="ml-auto flex shrink-0 gap-2">
                <Button size="sm" variant="outline" className="border-border/60 hover:border-primary/30" onClick={() => loadQuestions(q.id)}>Questions</Button>
                <Button size="icon" variant="ghost" aria-label={`Edit ${q.title}`} title={`Edit ${q.title}`} onClick={() => { setEditing(q); setTitle(q.title); setDescription(q.description ?? ""); setTopicId(q.topic_id ?? ""); setTimeLimit(q.time_limit_minutes ?? ""); setIsPublished(q.is_published); setOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" aria-label={`Delete ${q.title}`} title={`Delete ${q.title}`} onClick={async () => { await supabase.from("quizzes").delete().eq("id", q.id); load(); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
