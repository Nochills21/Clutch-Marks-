// Quiz hub: published quizzes per topic.
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Brain, Clock, CheckCircle2, XCircle, Download, Upload, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { loadFailureMessage } from "@/lib/net";
import { ToastAction } from "@/components/ui/toast";
import { SEOHead } from "@/components/SEOHead";
import { validateUploadFile } from "@/lib/fileValidation";
import { FREE_PREVIEW_LIMIT, PreviewLimit, usePlanAccess, usePreviewSliceWithLimit } from "@/components/PreviewLimit";
import { PreviewBanner } from "@/components/PreviewBanner";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";

function LocalLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={`text-sm font-medium ${className ?? ""}`}>{children}</label>;
}

interface StudentQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  options: string[];
  sort_order: number;
}

interface GradeResult {
  question_id: string;
  selected: number;
  correct_option: number;
  explanation: string | null;
  options: string[];
}

export default function Quizzes() {
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<StudentQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [gradeResults, setGradeResults] = useState<GradeResult[]>([]);

  // Exam file submission
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [uploadingSubmission, setUploadingSubmission] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState<string | null>(null);

  // AI feedback
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const { loading: planLoading, isPreview, hasPaid } = usePlanAccess();

  useEffect(() => {
    supabase.from("quizzes").select("*, topics(*)").eq("is_published", true).order("created_at", { ascending: false })
      .then(({ data, error }) => {
        // PostgREST resolves with { error } instead of throwing, so ignoring it
        // turned a failed query into an empty list — "no quizzes yet" when the
        // truth was "could not load".
        if (error) {
          toast({ title: "Could not load quizzes", description: error.message, variant: "destructive" });
          return;
        }
        setQuizzes(data ?? []);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subject & level gate INPUTS. The gate itself renders below, after every
  // hook: returning early from above the hooks would change the hook count
  // between renders and trip React's "fewer hooks than expected" guard.
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pickedIds, loaded: prefsLoaded, isAdmin: isAdminRole } = useMySubjects();

  // Quizzes whose topic belongs to one of the student's picked subject-levels.
  //
  // `topics` is a to-one embed (quizzes.topic_id → topics.id), so PostgREST
  // returns an OBJECT. Reading it as an array (`topics?.[0]`) was undefined for
  // every quiz, which left the topic→level map empty and silently turned the
  // subject filter into a no-op — every student saw every subject's quizzes,
  // including the ones they had not picked.
  const visibleQuizzes = useMemo(() => {
    if (isAdminRole) return quizzes;
    if (!prefsLoaded) return [];
    // Anonymous visitors are not enrolled in anything, so they see the whole
    // published list. A signed-in student is scoped to their picks; either way
    // the free-plan slice above them decides how many are actually shown.
    if (!user) return quizzes;
    return quizzes.filter((q) => {
      const sl = (q as any).topics?.subject_level_id as string | undefined;
      return sl ? pickedIds.has(sl) : false;
    });
  }, [quizzes, isAdminRole, prefsLoaded, pickedIds, user]);

  // Free-plan preview: the first two quizzes of the picked subjects, sliced from
  // the same list the cards render. The previous approach rendered rows from
  // `get_free_preview`, whose shape (item_id / item_type / title) is not a quiz
  // row at all — free students got cards labelled "General" whose Start Quiz did
  // nothing, and paid students had their subject filter bypassed entirely.
  const { slice: shownQuizzes, hiddenCount } =
    usePreviewSliceWithLimit(visibleQuizzes, FREE_PREVIEW_LIMIT);

  if (!isAdminRole && !prefsLoaded) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!isAdminRole && user && pickedIds.size === 0) {
    return (
      <div className="space-y-6">
        <SEOHead path="/quizzes" />
        <SubjectGate />
      </div>
    );
  }

  const startQuiz = async (quiz: any) => {
    // Questions are loaded through an approval-gated RPC and marking writes an
    // attempt, so a signed-out visitor is asked to sign in. Without this the
    // card click ended in "permission denied for function get_student_questions".
    if (!user) {
      toast({
        title: "Sign in to take this quiz",
        description: "Attempts are saved to your account so your progress counts.",
        action: <ToastAction altText="Sign in" onClick={() => navigate("/auth")}>Sign in</ToastAction>,
      });
      return;
    }
    const { data, error: questionsError } = await supabase.rpc("get_student_questions", { _quiz_id: quiz.id });
    // Without this a failed fetch opened an empty quiz that looked broken.
    if (questionsError) {
      toast({
        title: "Couldn't open that quiz",
        description: loadFailureMessage("this quiz", questionsError),
        variant: "destructive",
        action: <ToastAction altText="Retry" onClick={() => startQuiz(quiz)}>Retry</ToastAction>,
      });
      return;
    }
    setQuestions((data as StudentQuestion[]) ?? []);
    setActiveQuiz(quiz);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setGradeResults([]);
    setSubmissionFile(null);
    setSubmissionUrl(null);
    setAiFeedback(null);
  };

  const uploadSubmission = async () => {
    if (!submissionFile || !user || !activeQuiz) return;
    setUploadingSubmission(true);
    const ext = submissionFile.name.split('.').pop();
    const path = `quiz-submissions/${user.id}/${activeQuiz.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("homework-uploads").upload(path, submissionFile);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploadingSubmission(false);
      return;
    }
    setSubmissionUrl(path);
    setUploadingSubmission(false);
    toast({ title: "File uploaded!", description: "Your exam has been submitted." });
  };

  const submitQuiz = async () => {
    if (!user || !activeQuiz) return;

    const { data, error } = await supabase.rpc("grade_quiz", {
      _quiz_id: activeQuiz.id,
      _answers: answers,
      _submission_file_url: submissionUrl || null,
    });

    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }

    const result = data as unknown as { correct: number; total: number; results: GradeResult[] };
    setScore({ correct: result.correct, total: result.total });
    setGradeResults(result.results);
    setSubmitted(true);
    toast({ title: "Quiz submitted!", description: `You scored ${result.correct}/${result.total}` });
  };

  const getAiFeedback = async () => {
    if (!gradeResults.length || !activeQuiz) return;
    setLoadingFeedback(true);
    setAiFeedback(null);

    try {
      const { data, error } = await supabase.functions.invoke("quiz-feedback", {
        body: {
          quizId: activeQuiz.id,
          answers,
        },
      });



      if (error) throw error;
      if (data?.error) {
        toast({ title: "AI Feedback", description: data.error, variant: "destructive" });
      } else {
        setAiFeedback(data.feedback);
      }
    } catch (e: any) {
      toast({ title: "Failed to get feedback", description: e.message, variant: "destructive" });
    } finally {
      setLoadingFeedback(false);
    }
  };

  if (activeQuiz) {
    const hasExamFile = !!activeQuiz.exam_file_url;

    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <SEOHead path="/quizzes" />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{activeQuiz.title}</h1>
            <p className="text-muted-foreground">{questions.length} questions</p>
          </div>
          <Button variant="ghost" onClick={() => setActiveQuiz(null)}>← Back</Button>
        </div>

        {hasExamFile && (
          <Card className="neon-border bg-card">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">📄 Exam File</h3>
              <p className="text-sm text-muted-foreground">Download the exam, solve it, then upload your answers below.</p>
              <Button variant="outline" className="gap-2 border-primary/30 hover:border-primary/50" onClick={async () => {
                const path = activeQuiz.exam_file_url;
                const { data, error: signError } = await supabase.storage.from("quiz-files").createSignedUrl(path, 3600);
                // A silent failure here meant "Download Exam" simply did nothing.
                if (signError || !data?.signedUrl) {
                  toast({
                    title: "Couldn't open the exam file",
                    description: loadFailureMessage("this exam file", signError),
                    variant: "destructive",
                  });
                  return;
                }
                window.open(data.signedUrl, "_blank", "noopener,noreferrer");
              }}>
                <Download className="h-4 w-4" /> Download Exam
              </Button>
              {!submitted && (
                <div className="space-y-3 pt-2">
                  <LocalLabel className="text-sm font-medium">Upload your solved exam:</LocalLabel>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-border p-3 hover:border-primary/40 transition-colors bg-secondary/30">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {submissionFile ? submissionFile.name : "Choose file..."}
                      </span>
                      <input type="file" className="hidden" onChange={(e) => {
                        const f = e.target.files?.[0] ?? null;
                        if (f) {
                          const result = validateUploadFile(f);
                          if (result.ok === false) {
                            toast({ title: "Invalid file", description: result.error, variant: "destructive" });
                            e.target.value = "";
                            return;
                          }
                        }
                        setSubmissionFile(f);
                      }} />
                    </label>
                    {submissionFile && !submissionUrl && (
                      <Button size="sm" onClick={uploadSubmission} disabled={uploadingSubmission}>
                        {uploadingSubmission ? "Uploading…" : "Upload"}
                      </Button>
                    )}
                  </div>
                  {submissionUrl && (
                    <p className="text-sm text-primary flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> Exam submitted successfully
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {questions.map((q, idx) => {
          const options = Array.isArray(q.options) ? q.options : [];
          const result = gradeResults.find(r => r.question_id === q.id);
          return (
            <Card key={q.id} className="neon-border bg-card">
              <CardContent className="p-5">
                <p className="font-medium mb-3">
                  <span className="text-primary mr-2">Q{idx + 1}.</span>
                  {q.question_text}
                </p>
                <div className="space-y-2">
                  {options.map((opt: string, i: number) => {
                    const selected = answers[q.id] === i;
                    const isCorrect = submitted && result && i === result.correct_option;
                    const isWrong = submitted && selected && result && i !== result.correct_option;
                    return (
                      <button
                        key={i}
                        disabled={submitted}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                        className={`w-full text-left rounded-lg border p-3 text-sm transition-colors ${
                          isCorrect ? "border-primary bg-primary/10" :
                          isWrong ? "border-destructive bg-destructive/10" :
                          selected ? "border-primary/50 bg-primary/5" :
                          "border-border hover:border-primary/30 hover:bg-secondary/50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {submitted && isCorrect && <CheckCircle2 className="h-4 w-4 text-primary" />}
                          {submitted && isWrong && <XCircle className="h-4 w-4 text-destructive" />}
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {submitted && result?.explanation && (
                  <p className="mt-3 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">{result.explanation}</p>
                )}
              </CardContent>
            </Card>
          );
        })}

        {!submitted ? (
          <Button onClick={submitQuiz} size="lg" className="w-full bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground glow-shadow" disabled={Object.keys(answers).length < questions.length}>
            Submit Quiz
          </Button>
        ) : (
          <div className="space-y-4">
            <Card className="neon-border border-primary/30">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold neon-text">{score?.correct}/{score?.total}</p>
                <p className="text-muted-foreground mt-1">
                  {((score?.correct ?? 0) / (score?.total ?? 1) * 100).toFixed(0)}% correct
                </p>
              </CardContent>
            </Card>

            {/* AI Feedback Section */}
            {!aiFeedback && (
              <Button
                onClick={getAiFeedback}
                disabled={loadingFeedback}
                className="w-full gap-2 bg-gradient-to-r from-[hsl(var(--neon-purple))] to-primary text-primary-foreground"
                size="lg"
              >
                {loadingFeedback ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing your answers…</>
                ) : (
                  <><Sparkles className="h-4 w-4" /> Get AI-Powered Feedback</>
                )}
              </Button>
            )}

            {aiFeedback && (
              <Card className="neon-border border-[hsl(var(--neon-purple))]/30 bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Study Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                    {aiFeedback}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PreviewBanner />
      <SEOHead path="/quizzes" />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge</p>
      </div>
      {shownQuizzes.length === 0 ? (
        <Card className="neon-border bg-card"><CardContent className="flex flex-col items-center py-12">
          <Brain className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No quizzes available yet.</p>
        </CardContent></Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shownQuizzes.map((q) => (
            <Card key={q.id} className="cursor-pointer neon-border bg-card hover:border-primary/40 transition-all" onClick={() => startQuiz(q)}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{(q as any).topics?.name ?? "General"}</Badge>
                  <div className="flex items-center gap-2">
                    {q.exam_file_url && <Badge variant="outline" className="border-primary/30 text-primary text-[10px]">📎 Exam</Badge>}
                    {q.time_limit_minutes && <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{q.time_limit_minutes}m</span>}
                  </div>
                </div>
                <CardTitle className="text-lg mt-2">{q.title}</CardTitle>
                {q.description && <CardDescription>{q.description}</CardDescription>}
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground">Start Quiz</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <PreviewLimit hiddenCount={hiddenCount} what="quizzes" />
    </div>
  );
}

