// "Find a quiz" + a five-question diagnostic, for the /quizzes hub.
//
// The hub's empty state used to be a card that said "No quizzes available yet."
// and nothing else — a dead end on the one page whose whole job is to get a
// student answering questions. A student who has not picked subjects, or whose
// picks hold no published quiz, had no way forward from there.
//
// This is that way forward: pick board, subject and level, then answer five
// questions with instant marking. Marking goes through `check_practice_answer`,
// the same RPC the practice page uses, so the answers are written to the
// student's practice history and the review queue — this is a real attempt, not
// a demo that vanishes.
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LEVEL_LABELS, type SubjectLevelCode } from "@/lib/subjects";
import { loadFailureMessage } from "@/lib/net";
import { CheckCircle2, XCircle, Brain, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

/** Which board teaches a subject. Only the ESL subject is OxfordAQA today. */
function boardOfSlug(slug: string): string {
  return /oxford/i.test(slug) ? "OxfordAQA" : "Cambridge (CAIE)";
}

interface LevelOption {
  id: string;
  level: string;
  subjectId: string;
  subjectName: string;
  subjectSlug: string;
}

interface QuizRow {
  id: string;
  title: string;
}

interface DiagnosticQuestion {
  id: string;
  question_text: string;
  options: string[];
}

const DIAGNOSTIC_LENGTH = 5;

export function QuizFinder() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [levels, setLevels] = useState<LevelOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [failure, setFailure] = useState<string | null>(null);
  const [board, setBoard] = useState<string>("Cambridge (CAIE)");
  const [subjectId, setSubjectId] = useState<string>("");
  const [levelId, setLevelId] = useState<string>("");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("subject_levels")
        .select("id, level, subject_id, subjects(id, name, slug)")
        .order("level");
      if (!active) return;
      if (error) {
        setFailure(loadFailureMessage("the subject list", error));
        setLoading(false);
        return;
      }
      const options: LevelOption[] = (data ?? []).map((row) => {
        const subject = row.subjects as unknown as { id: string; name: string; slug: string } | null;
        return {
          id: row.id,
          level: row.level,
          subjectId: row.subject_id,
          subjectName: subject?.name ?? "Subject",
          subjectSlug: subject?.slug ?? "",
        };
      });
      setLevels(options);
      // Default to a level that actually has a published quiz. The first row in
      // alphabetical order was English First Language IGCSE, whose quizzes do not
      // exist yet — so the diagnostic opened straight onto "no questions", the
      // same dead end the picker exists to remove.
      const { data: quizRows } = await supabase
        .from("quizzes")
        .select("topic_id, topics!inner(subject_level_id)")
        .eq("is_published", true);
      if (!active) return;
      const withQuizzes = new Set<string>();
      for (const row of quizRows ?? []) {
        const topic = row.topics as unknown as { subject_level_id: string } | null;
        if (topic?.subject_level_id) withQuizzes.add(topic.subject_level_id);
      }
      const rank = (level: string) => ["OL", "IGCSE", "AS", "A2"].indexOf(level);
      const preferred = [...options]
        .filter((option) => boardOfSlug(option.subjectSlug) === "Cambridge (CAIE)")
        .sort((a, b) => Number(withQuizzes.has(b.id)) - Number(withQuizzes.has(a.id)) || rank(a.level) - rank(b.level));
      const first = preferred[0];
      if (first) {
        setSubjectId(first.subjectId);
        setLevelId(first.id);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const subjects = useMemo(() => {
    const seen = new Map<string, string>();
    for (const option of levels) {
      if (boardOfSlug(option.subjectSlug) !== board) continue;
      if (!seen.has(option.subjectId)) seen.set(option.subjectId, option.subjectName);
    }
    return [...seen].map(([id, name]) => ({ id, name }));
  }, [levels, board]);

  const subjectLevels = useMemo(
    () => levels.filter((option) => option.subjectId === subjectId),
    [levels, subjectId],
  );

  const selected = levels.find((option) => option.id === levelId) ?? null;

  const chooseBoard = (next: string) => {
    setBoard(next);
    const first = levels.find((option) => boardOfSlug(option.subjectSlug) === next);
    setSubjectId(first?.subjectId ?? "");
    setLevelId(first?.id ?? "");
  };

  const chooseSubject = (next: string) => {
    setSubjectId(next);
    setLevelId(levels.find((option) => option.subjectId === next)?.id ?? "");
  };

  if (running && selected) {
    return (
      <DiagnosticQuiz
        levelId={selected.id}
        subjectName={selected.subjectName}
        levelCode={selected.level}
        subjectSlug={selected.subjectSlug}
        signedIn={!!user}
        onExit={() => setRunning(false)}
        onFailure={(message) => {
          setRunning(false);
          toast({ title: "Couldn't start the diagnostic", description: message, variant: "destructive" });
        }}
      />
    );
  }

  return (
    <Card className="neon-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-primary" /> Find a quiz
        </CardTitle>
        <CardDescription>
          Choose a board, subject and level — or answer five questions now and see where you stand.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {failure ? (
          <p className="text-sm text-destructive">{failure}</p>
        ) : loading ? (
          <Skeleton className="h-24 rounded-lg" />
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Board</span>
                <Select value={board} onValueChange={chooseBoard}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cambridge (CAIE)">Cambridge (CAIE)</SelectItem>
                    <SelectItem value="OxfordAQA">OxfordAQA</SelectItem>
                  </SelectContent>
                </Select>
              </label>
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Subject</span>
                <Select value={subjectId} onValueChange={chooseSubject}>
                  <SelectTrigger><SelectValue placeholder="Choose a subject" /></SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Level</span>
                <Select value={levelId} onValueChange={setLevelId}>
                  <SelectTrigger><SelectValue placeholder="Choose a level" /></SelectTrigger>
                  <SelectContent>
                    {subjectLevels.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {LEVEL_LABELS[option.level as SubjectLevelCode] ?? option.level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                className="gap-2"
                disabled={!levelId}
                onClick={() => setRunning(true)}
              >
                <Sparkles className="h-4 w-4" /> Start a 5-question diagnostic
              </Button>
              {selected && (
                <Button asChild variant="outline" className="gap-1.5">
                  <Link
                    to={`/study/${selected.subjectSlug}/${selected.level.toLowerCase()}`}
                  >
                    Browse {selected.subjectName} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              <span className="text-xs text-muted-foreground">
                {DIAGNOSTIC_LENGTH} questions · instant feedback
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function DiagnosticQuiz({
  levelId,
  subjectName,
  levelCode,
  subjectSlug,
  signedIn,
  onExit,
  onFailure,
}: {
  levelId: string;
  subjectName: string;
  levelCode: string;
  subjectSlug: string;
  signedIn: boolean;
  onExit: () => void;
  onFailure: (message: string) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [failure, setFailure] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<QuizRow | null>(null);
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [marked, setMarked] = useState<{ correct: boolean; correct_option: number; explanation: string | null } | null>(null);
  const [score, setScore] = useState(0);
  const [checking, setChecking] = useState(false);
  const [done, setDone] = useState(false);

  const levelLabel = LEVEL_LABELS[levelCode as SubjectLevelCode] ?? levelCode;

  useEffect(() => {
    let active = true;
    // `get_student_questions` is authenticated-only, so an anonymous visitor
    // cannot even read the questions. Asking anyway produced "no questions have
    // been published" for a level that has 515 of them; the sign-in card below
    // is the honest answer.
    if (!signedIn) {
      setLoading(false);
      return () => {
        active = false;
      };
    }
    (async () => {
      const { data: topicRows, error: topicError } = await supabase
        .from("topics")
        .select("id")
        .eq("subject_level_id", levelId);
      if (!active) return;
      if (topicError) {
        setFailure(loadFailureMessage("this level's topics", topicError));
        setLoading(false);
        return;
      }
      const topicIds = (topicRows ?? []).map((row) => row.id);
      if (!topicIds.length) {
        setFailure("This level has no topics yet.");
        setLoading(false);
        return;
      }
      const { data: quizzes, error: quizError } = await supabase
        .from("quizzes")
        .select("id, title")
        .eq("is_published", true)
        .in("topic_id", topicIds)
        .order("created_at", { ascending: false })
        .limit(8);
      if (!active) return;
      if (quizError) {
        setFailure(loadFailureMessage("this level's quizzes", quizError));
        setLoading(false);
        return;
      }
      // The newest quiz of the level is the diagnostic, unless it has no
      // questions — a published empty quiz should not block the check.
      for (const candidate of quizzes ?? []) {
        const { data: rows } = await supabase.rpc("get_student_questions", { _quiz_id: candidate.id });
        if (!active) return;
        const list = (rows ?? []) as DiagnosticQuestion[];
        if (list.length) {
          setQuiz({ id: candidate.id, title: candidate.title });
          setQuestions(list.slice(0, DIAGNOSTIC_LENGTH));
          setLoading(false);
          return;
        }
      }
      setFailure(`${subjectName} ${levelLabel} has no published questions yet — try another level.`);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [levelId, subjectName, levelLabel, signedIn]);

  const question = questions[index] ?? null;

  const check = async () => {
    if (selected === null || !question) return;
    setChecking(true);
    const { data, error } = await supabase.rpc("check_practice_answer", {
      _question_id: question.id,
      _selected: selected,
    });
    setChecking(false);
    if (error) {
      onFailure(loadFailureMessage("this answer", error));
      return;
    }
    const result = data as { correct: boolean; correct_option: number; explanation: string | null };
    setMarked(result);
    if (result.correct) setScore((value) => value + 1);
  };

  const next = () => {
    setMarked(null);
    setSelected(null);
    if (index + 1 >= questions.length) setDone(true);
    else setIndex((value) => value + 1);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setMarked(null);
    setScore(0);
    setDone(false);
  };

  return (
    <Card className="neon-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-lg">
            {subjectName} · {levelLabel} diagnostic
          </CardTitle>
          <Badge variant="secondary">{DIAGNOSTIC_LENGTH} questions</Badge>
        </div>
        {quiz && <CardDescription>From “{quiz.title}”</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-28 rounded-lg" />
          </div>
        ) : !signedIn ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Checking an answer saves it to your practice history, so it needs an account. The
              questions are free — sign in to mark them.
            </p>
            <div className="flex gap-2">
              <Button asChild><Link to="/auth">Sign in</Link></Button>
              <Button variant="ghost" onClick={onExit}>Back</Button>
            </div>
          </div>
        ) : failure ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{failure}</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onExit}>Back to the picker</Button>
              <Button asChild variant="outline">
                <Link to={`/study/${subjectSlug}/${levelCode.toLowerCase()}`}>Open the subject</Link>
              </Button>
            </div>
          </div>
        ) : done ? (
          <div className="space-y-3">
            <p className="text-2xl font-bold">
              {score} / {questions.length}
            </p>
            <p className="text-sm text-muted-foreground">
              {score === questions.length
                ? "Everything correct — try a full quiz to keep the streak."
                : score === 0
                  ? "Every mark missed is in your review queue now, so this is the best place to start."
                  : "Your missed questions are in your practice history — the review queue will bring them back."}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={restart} variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" /> Again
              </Button>
              <Button asChild className="gap-2">
                <Link to={`/study/${subjectSlug}/${levelCode.toLowerCase()}`}>
                  Open {subjectName} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" onClick={onExit}>Back to quizzes</Button>
            </div>
          </div>
        ) : question ? (
          <>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Question {index + 1} of {questions.length}</span>
                <span>{score} correct</span>
              </div>
              <Progress value={((index + (marked ? 1 : 0)) / questions.length) * 100} />
            </div>
            <p className="font-medium leading-relaxed">{question.question_text}</p>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => {
                const isChosen = selected === optionIndex;
                const isCorrect = marked?.correct_option === optionIndex;
                const wrongChoice = marked && isChosen && !isCorrect;
                return (
                  <button
                    key={optionIndex}
                    type="button"
                    disabled={!!marked}
                    onClick={() => setSelected(optionIndex)}
                    className={[
                      "flex w-full items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                      isCorrect
                        ? "border-emerald-500/50 bg-emerald-500/10"
                        : wrongChoice
                          ? "border-destructive/50 bg-destructive/10"
                          : isChosen
                            ? "border-primary/50 bg-primary/5"
                            : "border-border hover:bg-muted",
                    ].join(" ")}
                  >
                    <span className="mt-0.5 font-semibold text-muted-foreground">
                      {"ABCD"[optionIndex] ?? optionIndex + 1}
                    </span>
                    <span className="flex-1">{option}</span>
                    {isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                    {wrongChoice && <XCircle className="h-4 w-4 text-destructive" />}
                  </button>
                );
              })}
            </div>
            {marked && (
              <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-sm">
                <p className="font-medium">
                  {marked.correct ? "Correct." : `Not quite — the answer is ${"ABCD"[marked.correct_option] ?? marked.correct_option + 1}.`}
                </p>
                {marked.explanation && (
                  <p className="mt-1 text-muted-foreground">{marked.explanation}</p>
                )}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {!marked ? (
                <Button onClick={check} disabled={selected === null || checking} className="gap-2">
                  {checking ? "Checking…" : "Check answer"}
                </Button>
              ) : (
                <Button onClick={next} className="gap-2">
                  {index + 1 >= questions.length ? "See result" : "Next question"} <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" onClick={onExit}>Exit</Button>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
