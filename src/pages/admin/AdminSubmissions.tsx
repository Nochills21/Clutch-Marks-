// Grade homework submissions.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/useToast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Download, Upload, FileCheck, Loader2, ClipboardList, Brain, Eye,
} from "lucide-react";
import { getSafeUploadExtension } from "@/lib/fileValidation";

interface HWSubmission {
  id: string;
  homework_id: string;
  user_id: string;
  status: string;
  file_url: string | null;
  content: string | null;
  submitted_at: string;
  grade: string | null;
  feedback: string | null;
  correction_file_url: string | null;
  homework_title: string;
  student_name: string;
  student_username: string | null;
}

interface QuizSubmission {
  id: string;
  quiz_id: string;
  user_id: string;
  score: number | null;
  total_questions: number | null;
  completed_at: string | null;
  submission_file_url: string | null;
  correction_file_url: string | null;
  answers: any;
  quiz_title: string;
  student_name: string;
  student_username: string | null;
}

export default function AdminSubmissions() {
  const { toast } = useToast();
  const [hwSubmissions, setHwSubmissions] = useState<HWSubmission[]>([]);
  const [quizSubmissions, setQuizSubmissions] = useState<QuizSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  // Grading dialog
  const [gradeTarget, setGradeTarget] = useState<HWSubmission | null>(null);
  const [gradeValue, setGradeValue] = useState("");
  const [feedbackValue, setFeedbackValue] = useState("");
  const [correctionFile, setCorrectionFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Quiz correction dialog
  const [quizGradeTarget, setQuizGradeTarget] = useState<QuizSubmission | null>(null);
  const [quizCorrectionFile, setQuizCorrectionFile] = useState<File | null>(null);
  const [quizSaving, setQuizSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);

    // Load homework submissions with joined data
    const { data: hwData } = await supabase
      .from("homework_submissions")
      .select("id, homework_id, user_id, status, file_url, content, submitted_at, grade, feedback, correction_file_url")
      .order("submitted_at", { ascending: false });

    // Load quiz attempts that have submission files
    const { data: quizData } = await supabase
      .from("quiz_attempts")
      .select("id, quiz_id, user_id, score, total_questions, completed_at, submission_file_url, correction_file_url, answers")
      .order("started_at", { ascending: false });

    // Get unique user IDs and homework/quiz IDs
    const allUserIds = [
      ...(hwData ?? []).map(s => s.user_id),
      ...(quizData ?? []).map(s => s.user_id),
    ];
    const hwIds = (hwData ?? []).map(s => s.homework_id);
    const quizIds = (quizData ?? []).map(s => s.quiz_id);

    const { data: profiles } = allUserIds.length > 0
      ? await supabase.from("profiles").select("user_id, full_name, username").in("user_id", [...new Set(allUserIds)])
      : { data: [] };

    const { data: homeworks } = hwIds.length > 0
      ? await supabase.from("homework").select("id, title").in("id", [...new Set(hwIds)])
      : { data: [] };

    const { data: quizzes } = quizIds.length > 0
      ? await supabase.from("quizzes").select("id, title").in("id", [...new Set(quizIds)])
      : { data: [] };

    const profileMap = Object.fromEntries((profiles ?? []).map(p => [p.user_id, p]));
    const hwMap = Object.fromEntries((homeworks ?? []).map(h => [h.id, h]));
    const quizMap = Object.fromEntries((quizzes ?? []).map(q => [q.id, q]));

    setHwSubmissions((hwData ?? []).map(s => ({
      ...s,
      homework_title: hwMap[s.homework_id]?.title ?? "Unknown",
      student_name: profileMap[s.user_id]?.full_name ?? "Unknown",
      student_username: profileMap[s.user_id]?.username ?? null,
    })));

    setQuizSubmissions((quizData ?? []).filter(s => s.submission_file_url).map(s => ({
      ...s,
      quiz_title: quizMap[s.quiz_id]?.title ?? "Unknown",
      student_name: profileMap[s.user_id]?.full_name ?? "Unknown",
      student_username: profileMap[s.user_id]?.username ?? null,
    })));

    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const downloadSignedFile = async (bucket: string, path: string) => {
    // Strip any full URL prefix — we only need the storage path
    let cleanPath = path;
    const marker = `/object/public/${bucket}/`;
    const idx = path.indexOf(marker);
    if (idx !== -1) cleanPath = path.slice(idx + marker.length);

    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(cleanPath, 3600);
    if (error || !data?.signedUrl) {
      toast({ title: "Could not open file", description: error?.message ?? "Unknown error", variant: "destructive" });
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  // ── HOMEWORK GRADING ──
  const openGradeDialog = (sub: HWSubmission) => {
    setGradeTarget(sub);
    setGradeValue(sub.grade ?? "");
    setFeedbackValue(sub.feedback ?? "");
    setCorrectionFile(null);
  };

  const saveHomeworkGrade = async () => {
    if (!gradeTarget) return;
    setSaving(true);

    let correctionUrl = gradeTarget.correction_file_url;

    if (correctionFile) {
      const ext = getSafeUploadExtension(correctionFile);
      if (!ext) {
        toast({ title: "Upload blocked", description: "Unsupported file type.", variant: "destructive" });
        setSaving(false);
        return;
      }
      const path = `corrections/${gradeTarget.user_id}/${gradeTarget.homework_id}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("homework-uploads").upload(path, correctionFile);
      if (uploadErr) {
        toast({ title: "Upload failed", description: uploadErr.message, variant: "destructive" });
        setSaving(false);
        return;
      }
      correctionUrl = path;
    }

    const { error } = await supabase
      .from("homework_submissions")
      .update({
        grade: gradeValue || null,
        feedback: feedbackValue || null,
        correction_file_url: correctionUrl,
        status: gradeValue ? "graded" : "reviewed",
        graded_at: new Date().toISOString(),
      })
      .eq("id", gradeTarget.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Submission graded successfully." });
      setGradeTarget(null);
      loadData();
    }
    setSaving(false);
  };

  // ── QUIZ CORRECTION ──
  const openQuizGradeDialog = (sub: QuizSubmission) => {
    setQuizGradeTarget(sub);
    setQuizCorrectionFile(null);
  };

  const saveQuizCorrection = async () => {
    if (!quizGradeTarget) return;
    setQuizSaving(true);

    let correctionUrl = quizGradeTarget.correction_file_url;

    if (quizCorrectionFile) {
      const ext = getSafeUploadExtension(quizCorrectionFile);
      if (!ext) {
        toast({ title: "Upload blocked", description: "Unsupported file type.", variant: "destructive" });
        setQuizSaving(false);
        return;
      }
      const path = `quiz-corrections/${quizGradeTarget.user_id}/${quizGradeTarget.quiz_id}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("homework-uploads").upload(path, quizCorrectionFile);
      if (uploadErr) {
        toast({ title: "Upload failed", description: uploadErr.message, variant: "destructive" });
        setQuizSaving(false);
        return;
      }
      correctionUrl = path;
    }

    const { error } = await supabase
      .from("quiz_attempts")
      .update({ correction_file_url: correctionUrl })
      .eq("id", quizGradeTarget.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Correction file uploaded." });
      setQuizGradeTarget(null);
      loadData();
    }
    setQuizSaving(false);
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      graded: "bg-green-500/20 text-green-400 border-green-500/30",
      reviewed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    };
    return map[status] ?? "bg-muted text-muted-foreground";
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Submissions</h1>
        <p className="text-muted-foreground">Review, grade, and upload corrections for student work</p>
      </div>

      <Tabs defaultValue="homework">
        <TabsList className="bg-secondary/60">
          <TabsTrigger value="homework" className="gap-2">
            <ClipboardList className="h-4 w-4" /> Homework ({hwSubmissions.length})
          </TabsTrigger>
          <TabsTrigger value="exams" className="gap-2">
            <Brain className="h-4 w-4" /> Exam Files ({quizSubmissions.length})
          </TabsTrigger>
        </TabsList>

        {/* ── HOMEWORK TAB ── */}
        <TabsContent value="homework">
          <Card className="neon-border bg-card/80 backdrop-blur">
            <CardContent className="p-0">
              {hwSubmissions.length === 0 ? (
                <div className="flex flex-col items-center py-16 text-muted-foreground">
                  <ClipboardList className="h-12 w-12 mb-4 opacity-40" />
                  <p>No homework submissions yet</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Homework</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hwSubmissions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{sub.student_name}</p>
                            {sub.student_username && (
                              <p className="text-xs text-muted-foreground">@{sub.student_username}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{sub.homework_title}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(sub.submitted_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusBadge(sub.status)}>
                            {sub.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{sub.grade || "—"}</TableCell>
                        <TableCell className="text-right space-x-2">
                          {sub.file_url && (
                            <Button size="sm" variant="outline" className="gap-1"
                              onClick={() => downloadSignedFile("homework-uploads", sub.file_url!)}>
                              <Download className="h-3.5 w-3.5" /> File
                            </Button>
                          )}
                          {sub.correction_file_url && (
                            <Button size="sm" variant="outline" className="gap-1 text-green-400 border-green-500/30"
                              onClick={() => downloadSignedFile("homework-uploads", sub.correction_file_url!)}>
                              <FileCheck className="h-3.5 w-3.5" /> Correction
                            </Button>
                          )}
                          <Button size="sm" className="gap-1" onClick={() => openGradeDialog(sub)}>
                            <Eye className="h-3.5 w-3.5" /> Grade
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── EXAMS TAB ── */}
        <TabsContent value="exams">
          <Card className="neon-border bg-card/80 backdrop-blur">
            <CardContent className="p-0">
              {quizSubmissions.length === 0 ? (
                <div className="flex flex-col items-center py-16 text-muted-foreground">
                  <Brain className="h-12 w-12 mb-4 opacity-40" />
                  <p>No exam file submissions yet</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Quiz / Exam</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizSubmissions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{sub.student_name}</p>
                            {sub.student_username && (
                              <p className="text-xs text-muted-foreground">@{sub.student_username}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{sub.quiz_title}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {sub.completed_at ? new Date(sub.completed_at).toLocaleDateString() : "—"}
                        </TableCell>
                        <TableCell>
                          {sub.score !== null ? `${sub.score}/${sub.total_questions}` : "—"}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {sub.submission_file_url && (
                            <Button size="sm" variant="outline" className="gap-1"
                              onClick={() => downloadSignedFile("homework-uploads", sub.submission_file_url!)}>
                              <Download className="h-3.5 w-3.5" /> Submission
                            </Button>
                          )}
                          {sub.correction_file_url && (
                            <Button size="sm" variant="outline" className="gap-1 text-green-400 border-green-500/30"
                              onClick={() => downloadSignedFile("homework-uploads", sub.correction_file_url!)}>
                              <FileCheck className="h-3.5 w-3.5" /> Correction
                            </Button>
                          )}
                          <Button size="sm" className="gap-1" onClick={() => openQuizGradeDialog(sub)}>
                            <Upload className="h-3.5 w-3.5" /> Upload Correction
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ── HOMEWORK GRADE DIALOG ── */}
      <Dialog open={!!gradeTarget} onOpenChange={(o) => { if (!o) setGradeTarget(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
            <DialogDescription>
              <strong>{gradeTarget?.student_name}</strong> — {gradeTarget?.homework_title}
            </DialogDescription>
          </DialogHeader>

          {gradeTarget?.content && (
            <div className="rounded-lg bg-secondary/50 p-3 text-sm max-h-32 overflow-auto">
              {gradeTarget.content}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Grade</Label>
              <Input placeholder="e.g. A, 85%, Pass" value={gradeValue} onChange={e => setGradeValue(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Feedback</Label>
              <Textarea placeholder="Write feedback for the student..." value={feedbackValue} onChange={e => setFeedbackValue(e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Upload Correction File (optional)</Label>
              <Input type="file" onChange={e => setCorrectionFile(e.target.files?.[0] ?? null)} />
              {gradeTarget?.correction_file_url && (
                <p className="text-xs text-muted-foreground">A correction file already exists. Uploading a new one will replace it.</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setGradeTarget(null)}>Cancel</Button>
            <Button onClick={saveHomeworkGrade} disabled={saving} className="gap-2">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── QUIZ CORRECTION DIALOG ── */}
      <Dialog open={!!quizGradeTarget} onOpenChange={(o) => { if (!o) setQuizGradeTarget(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Correction</DialogTitle>
            <DialogDescription>
              Upload corrected file for <strong>{quizGradeTarget?.student_name}</strong> — {quizGradeTarget?.quiz_title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Correction File</Label>
              <Input type="file" onChange={e => setQuizCorrectionFile(e.target.files?.[0] ?? null)} />
              {quizGradeTarget?.correction_file_url && (
                <p className="text-xs text-muted-foreground">A correction file already exists. Uploading a new one will replace it.</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setQuizGradeTarget(null)}>Cancel</Button>
            <Button onClick={saveQuizCorrection} disabled={quizSaving || !quizCorrectionFile} className="gap-2">
              {quizSaving && <Loader2 className="h-4 w-4 animate-spin" />} Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
