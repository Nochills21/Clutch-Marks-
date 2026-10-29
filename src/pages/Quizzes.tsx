// Quiz hub: published quizzes per topic.
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ManuscriptQuestion } from "@/components/StudyManuscript";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import {
  Brain,
  Clock,
  CheckCircle2,
  XCircle,
  Download,
  Upload,
  Sparkles,
  Loader2,
  FileDown,
  ListChecks,
  Timer,
} from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { loadFailureMessage } from "@/lib/net";
import { ToastAction } from "@/components/ui/toast";
import { SEOHead } from "@/components/SEOHead";
import { validateUploadFile } from "@/lib/fileValidation";
import { FREE_PREVIEW_LIMIT, PreviewLimit, usePlanAccess, usePreviewSliceWithLimit } from "@/components/PreviewLimit";
import { PreviewBanner } from "@/components/PreviewBanner";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";
import { QuizFinder } from "@/components/QuizFinder";
import { exportQuizResultToPdf, gradeBand } from "@/lib/pdfExport";
import { formatSeconds, pacingSummary, toTimingRows, type PacingSummary, type QuestionTiming } from "@/lib/pacing";

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

/** mm:ss for the sitting clock. */
function formatClock(totalSeconds: number) {
  const s = Math.max(0, totalSeconds);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

type ReviewRow = {
  /** Position in the full paper, so "Q3" stays Q3 even when the list is filtered. */
  ordinal: number;
  question: StudentQuestion;
  result: GradeResult | undefined;
  /** What the student picked, or null when they left it blank. */
  picked: number | null;
  status: "correct" | "incorrect" | "unanswered";
};

/** A published quiz row with its topic embed (`select("*, topics(*)")`). */
type QuizRow = Tables<"quizzes"> & { topics: Tables<"topics"> | null };

export default function Quizzes() {
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<QuizRow[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<QuizRow | null>(null);
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

  // Sitting clock. `time_limit_minutes` has always been shown on the hub card
  // but was never enforced, so a "45 minute paper" was just a label.
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const deadlineRef = useRef<number | null>(null);

  // Post-marking review: the whole paper, or just the ones to redo.
  const [reviewOnly, setReviewOnly] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Pacing: seconds spent on each question before it was answered, plus the
  // summary shown once the paper is marked. `lastTimingAt` is the moment of the
  // previous answer (or the start of the sitting), so each question's time is the
  // gap before the student answered it.
  const [pacing, setPacing] = useState<PacingSummary | null>(null);
  const timingsRef = useRef<Map<string, number>>(new Map());
  const lastTimingAtRef = useRef<number | null>(null);

  /** Record how long the student took on a question, then answer it. */
  const recordAnswer = (question: StudentQuestion, option: number) => {
    const now = Date.now();
    const from = lastTimingAtRef.current ?? now;
    // A first answer inside the same tick is 0s, which the summary treats as a
    // real (very fast) answer rather than a missing one.
    timingsRef.current.set(question.id, Math.max(0, Math.round((now - from) / 1000)));
    lastTimingAtRef.current = now;
    setAnswers((a) => ({ ...a, [question.id]: option }));
  };

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
  const { pickedIds, loaded: prefsLoaded, isAdmin: isAdminRole, needsSubjectPick } = useMySubjects();

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
      const sl = q.topics?.subject_level_id as string | undefined;
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

  const timeLimitSeconds = useMemo(() => {
    const minutes = Number(activeQuiz?.time_limit_minutes ?? 0);
    return Number.isFinite(minutes) && minutes > 0 ? Math.round(minutes * 60) : 0;
  }, [activeQuiz]);

  // Countdown from a wall-clock deadline, not a decrementing counter, so a
  // backgrounded tab does not quietly gain the student extra time. Cleared when
  // the quiz closes and when the paper is marked.
  useEffect(() => {
    if (!activeQuiz || !timeLimitSeconds || submitted) {
      deadlineRef.current = null;
      return;
    }
    deadlineRef.current = Date.now() + timeLimitSeconds * 1000;
    setTimedOut(false);
    const tick = () => {
      if (deadlineRef.current == null) return;
      const left = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left <= 0) setTimedOut(true);
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [activeQuiz, timeLimitSeconds, submitted]);

  const timeUsedPct = timeLimitSeconds > 0
    ? Math.min(100, Math.round(((timeLimitSeconds - secondsLeft) / timeLimitSeconds) * 100))
    : 0;

  // One row per question, whatever happened to it, so the review, the counters
  // and the exported PDF all read from the same derivation.
  const reviewRows: ReviewRow[] = useMemo(() => {
    return questions.map((question, ordinal) => {
      const result = gradeResults.find((r) => r.question_id === question.id);
      const raw = answers[question.id];
      const picked = typeof raw === "number" ? raw : null;
      const status: ReviewRow["status"] = picked === null
        ? "unanswered"
        : result && picked === result.correct_option
          ? "correct"
          : "incorrect";
      return { ordinal, question, result, picked, status };
    });
  }, [questions, gradeResults, answers]);

  const counts = useMemo(() => {
    return reviewRows.reduce(
      (acc, row) => {
        acc[row.status] += 1;
        return acc;
      },
      { correct: 0, incorrect: 0, unanswered: 0 },
    );
  }, [reviewRows]);

  // Hooks are declared; now the early returns are safe.
  if (!isAdminRole && !prefsLoaded) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (needsSubjectPick) {
    return (
      <div className="space-y-6">
        <SEOHead path="/quizzes" />
        <SubjectGate />
      </div>
    );
  }

  const startQuiz = async (quiz: QuizRow) => {
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
    setReviewOnly(false);
    setTimedOut(false);
    setSecondsLeft(0);
    setPacing(null);
    timingsRef.current = new Map();
    lastTimingAtRef.current = Date.now();
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

    // Send -1 for anything left blank. That matters when the clock ran out: the
    // student could not answer the rest, and an absent key would otherwise be
    // indistinguishable from "not part of this paper".
    const payload = Object.fromEntries(questions.map((q) => [q.id, answers[q.id] ?? -1]));

    // Summarise pacing before the network round trip, so the student sees it
    // even if the marking call is slow. Blanks are counted from the answers map,
    // not from the timings: a blank question has no timing by definition.
    const timings: QuestionTiming[] = questions
      .map((q, ordinal) => ({ questionId: q.id, ordinal, seconds: timingsRef.current.get(q.id) }))
      .filter((t): t is QuestionTiming => typeof t.seconds === "number");
    const blank = questions.length - timings.length;
    setPacing(pacingSummary(timings, { blank, limitSeconds: timeLimitSeconds }));

    const { data, error } = await supabase.rpc("grade_quiz", {
      _quiz_id: activeQuiz.id,
      _answers: payload,
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
    setReviewOnly(false);
    // Best effort, and deliberately not awaited: pacing is a study aid, not part
    // of the attempt. A failure to store it must not look like a failed paper.
    const rows = toTimingRows(timings, { userId: user.id, quizId: activeQuiz.id });
    if (rows.length > 0) {
      void supabase.from("question_timings").insert(rows).then(({ error: timingError }) => {
        if (timingError) console.error("pacing: could not store timings", timingError);
      });
    }
    toast({ title: "Quiz submitted!", description: `You scored ${result.correct}/${result.total}` });
  };

  const exportResult = async () => {
    if (!activeQuiz) return;
    setExporting(true);
    try {
      await exportQuizResultToPdf({
        quizTitle: activeQuiz.title ?? "Quiz result",
        topicName: activeQuiz.topics?.name ?? null,
        correct: score?.correct ?? 0,
        total: score?.total ?? questions.length,
        questions: reviewRows.map((row) => ({
          question: row.question.question_text,
          options: Array.isArray(row.question.options) ? row.question.options : [],
          selected: row.picked,
          // After a successful grade every question has a result row; -1 is only
          // a fallback so a missing row cannot be misread as "correct".
          correct_option: row.result?.correct_option ?? -1,
          explanation: row.result?.explanation ?? null,
        })),
        identity: { owner: user?.email ?? null },
      });
    } catch (e) {
      toast({ title: "Couldn't build the PDF", description: e?.message ?? "Please try again.", variant: "destructive" });
    } finally {
      setExporting(false);
    }
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
    } catch (e) {
      toast({ title: "Failed to get feedback", description: e.message, variant: "destructive" });
    } finally {
      setLoadingFeedback(false);
    }
  };

  if (activeQuiz) {
    const hasExamFile = !!activeQuiz.exam_file_url;
    const percent = (score?.correct ?? 0) / Math.max(1, score?.total ?? 1) * 100;
    const visibleRows = reviewOnly
      ? reviewRows.filter((row) => row.status !== "correct")
      : reviewRows;

    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <SEOHead path="/quizzes" />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{activeQuiz.title}</h1>
            <p className="text-muted-foreground">{questions.length} questions</p>
          </div>
          <Button variant="ghost" onClick={() => setActiveQuiz(null)}>
            ← Back to quizzes
          </Button>
        </div>

        {/* Sitting clock. Only for a timed paper, and only until it is marked. */}
        {timeLimitSeconds > 0 && !submitted && (secondsLeft > 0 || timedOut) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge
                variant={timedOut ? "destructive" : "outline"}
                className="gap-1 font-mono text-sm"
                aria-live="polite"
              >
                <Clock className="h-3.5 w-3.5" /> {formatClock(secondsLeft)}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {Number(activeQuiz.time_limit_minutes)}-minute paper · time used
              </span>
            </div>
            <Progress value={timeUsedPct} className="h-1.5" />
          </div>
        )}

        {timedOut && !submitted && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            <Clock className="h-4 w-4 shrink-0" /> Time's up — submit your paper for marking.
          </div>
        )}

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

        {submitted && reviewRows.length > 0 && (
          <Card className="neon-border border-primary/30">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div className="flex items-center gap-5">
                <div>
                  <p className="font-mono text-3xl font-bold neon-text">{score?.correct ?? 0}/{score?.total ?? 0}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {percent.toFixed(0)}% · {gradeBand(percent)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" /> {counts.correct} correct
                  </Badge>
                  <Badge variant="outline" className="gap-1 text-destructive">
                    <XCircle className="h-3 w-3" /> {counts.incorrect} incorrect
                  </Badge>
                  {counts.unanswered > 0 && (
                    <Badge variant="outline" className="gap-1">{counts.unanswered} blank</Badge>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={reviewOnly ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  aria-pressed={reviewOnly}
                  onClick={() => setReviewOnly((v) => !v)}
                >
                  <ListChecks className="h-4 w-4" />
                  {reviewOnly ? "Showing what to review" : "Only what to review"}
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={exportResult} disabled={exporting}>
                  {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                  Download result (PDF)
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    setAnswers({});
                    setSubmitted(false);
                    setScore(null);
                    setGradeResults([]);
                    setReviewOnly(false);
                    setAiFeedback(null);
                    setPacing(null);
                    timingsRef.current = new Map();
                    lastTimingAtRef.current = Date.now();
                  }}
                >
                  Try again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {submitted && pacing && pacing.answered > 0 && (
          <Card className="neon-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Timer className="h-4 w-4 text-primary" /> Where your time went
              </CardTitle>
              <CardDescription className="leading-relaxed">{pacing.advice}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="font-mono text-lg font-semibold">{formatSeconds(pacing.totalSeconds)}</p>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Total on answers</p>
              </div>
              <div>
                <p className="font-mono text-lg font-semibold">{formatSeconds(pacing.medianSeconds)}</p>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Typical question</p>
              </div>
              <div>
                <p className="font-mono text-lg font-semibold">
                  {pacing.slowest ? formatSeconds(pacing.slowest.seconds) : "—"}
                </p>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {pacing.slowest ? `Slowest (Q${pacing.slowest.ordinal + 1})` : "Slowest"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {submitted && reviewOnly && visibleRows.length === 0 && (
          <Card className="neon-border bg-card">
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              Nothing to review — every question was answered correctly.
            </CardContent>
          </Card>
        )}

        {visibleRows.map((row) => {
          const { question: q, result, ordinal } = row;
          const options = Array.isArray(q.options) ? q.options : [];
          return (
            <ManuscriptQuestion
              key={q.id}
              eyebrow={`Question ${ordinal + 1}`}
              question={q.question_text}
              options={options}
              selected={row.picked ?? null}
              correctOption={submitted && result ? result.correct_option : null}
              disabled={submitted || timedOut}
              onSelect={(i) => recordAnswer(q, i)}
              explanation={submitted ? result?.explanation ?? null : null}
            />
          );
        })}

        {!submitted ? (
          <Button
            onClick={submitQuiz}
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground glow-shadow"
            // Normally every question must be answered, but a run-out clock must
            // not trap the student: once time is up they can submit what they have.
            disabled={!timedOut && Object.keys(answers).length < questions.length}
          >
            {timedOut ? "Submit for marking (time's up)" : "Submit Quiz"}
          </Button>
        ) : (
          <div className="space-y-4">
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
      {/* Choosing a board, subject and level — and a five-question diagnostic —
          is the way forward from a list this account cannot see anything in.
          The old empty state said only "No quizzes available yet." */}
      <QuizFinder />
      {shownQuizzes.length === 0 ? (
        <Card className="neon-border bg-card"><CardContent className="flex flex-col items-center py-10 text-center">
          <Brain className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="max-w-md text-muted-foreground">
            {user
              ? "No quizzes match the subjects you have picked yet. The diagnostic above works for every level, and adding a subject brings its quizzes into this list."
              : "This list follows the subjects you pick, and marking an answer needs an account. Sign in to see your subjects' quizzes and to mark the five-question diagnostic above."}
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link to={user ? "/subjects" : "/auth"}>{user ? "Add a subject" : "Sign in"}</Link>
          </Button>
        </CardContent></Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shownQuizzes.map((q) => (
            <Card key={q.id} className="cursor-pointer neon-border bg-card hover:border-primary/40 transition-all" onClick={() => startQuiz(q)}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{q.topics?.name ?? "General"}</Badge>
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
