// Per-topic quiz page with mark-scheme explanations.
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { TopicBreadcrumb } from "@/components/TopicBreadcrumb";
import { useToast } from "@/hooks/useToast";
import { BookmarkButton } from "@/components/BookmarkButton";
import { FeedbackNudge } from "@/components/FeedbackNudge";
import { LEVELS, LEVEL_LABELS, subjectIcon, subjectAccent, type SubjectLevelCode } from "@/lib/subjects";
import {
  topicNotesPath,
  topicQuizPath,
  topicPapersPath,
  slugifyTopicName,
  topicSlugOf,
} from "@/lib/topicUrls";
import { topicDisplayName, topicHead } from "@/lib/topicSeo";
import {
  Brain,
  CheckCircle2,
  XCircle,
  Archive,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Play,
  RotateCcw,
} from "lucide-react";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";

interface TopicQuestion {
  id: string;
  question_text: string;
  options: string[];
  difficulty: string;
  quiz_title: string;
  quiz_id: string;
  is_ai_generated: boolean;
  bookmarked: boolean;
  last_correct: boolean | null;
}

export default function TopicQuiz() {
  const { slug: subject, level, topic } = useParams<{
    slug: string;
    level: string;
    topic: string;
  }>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjectMeta, setSubjectMeta] = useState<any>(null);
  const [subjectLevel, setSubjectLevel] = useState<any>(null);
  const [topicTitle, setTopicTitle] = useState<string | null>(null);
  const topicSlug = useMemo(() => slugifyTopicName(topic ?? ""), [topic]);
  const [topicId, setTopicId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<TopicQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [results, setResults] = useState<{ question_id: string; selected: number; correct_option: number; explanation: string | null; options: string[] }[]>([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<TopicQuestion[]>([]);
  // Bumped by "Try again" to re-run the load effect.
  const [retryKey, setRetryKey] = useState(0);

  const { user } = useAuth();
  const { pickedIds, loaded: prefsLoaded, isAdmin: isAdminRole } = useMySubjects();

  // The stored name wins verbatim: topicSeo.titleFor writes the static head from
  // the same string, so title-casing it here would give this URL two titles.
  const topicLabel = useMemo(() => topicDisplayName(topicTitle, topic ?? ""), [topicTitle, topic]);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: sub, error: subError } = await supabase.from("subjects").select("*").ilike("slug", subject ?? "").limit(1);
        if (subError) throw subError;
        const subjectRow = sub?.[0] ?? null;
        if (!subjectRow) {
          setError("Subject not found");
          setLoading(false);
          return;
        }
        setSubjectMeta(subjectRow);

        const { data: sl, error: slError } = await supabase.from("subject_levels").select("*").eq("subject_id", subjectRow.id).eq("level", (level ?? "").toUpperCase() as SubjectLevelCode).limit(1);
        if (slError) throw slError;
        const levelRow = sl?.[0] ?? null;
        if (!levelRow) {
          setError("Level not found");
          setLoading(false);
          return;
        }
        setSubjectLevel(levelRow);

        const { data: tps, error: tpsError } = await supabase.from("topics").select("*").eq("subject_level_id", levelRow.id).order("sort_order");
        if (tpsError) throw tpsError;
        const topicList = tps ?? [];
        const topicRow = topicList.find(
          (t) =>
            topicSlugOf(t) === topicSlug ||
            // Last-resort match for URLs minted before slugs were persisted.
            slugifyTopicName(t.name) === topicSlug ||
            t.name.toLowerCase() === (topic ?? "").replace(/-/g, " ").toLowerCase(),
        );
        if (!topicRow) {
          setError("Topic not found on this level");
          setLoading(false);
          return;
        }
        setTopicTitle(topicRow.name);
        setTopicId(topicRow.id);

        if (active) {
          const { data, error: questionsError } = await supabase.rpc("browse_questions", {
            _topic_id: topicRow.id,
            _subject_level_id: levelRow.id,
            _difficulty: null,
            _exam_type: null,
            _search: null,
            _limit: 200,
            _offset: 0,
          });
          if (questionsError) throw questionsError;
          if (active && data) {
            setQuestions((data as unknown as TopicQuestion[]) ?? []);
            setBookmarkedQuestions((data as unknown as TopicQuestion[]).filter((q) => q.bookmarked));
          }
        }
      } catch (e: any) {
        setError(e.message ?? "Failed to load topic questions");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [subject, level, topic, topicSlug, retryKey]);

  const topicSourceLink = useMemo(() => {
    if (!subjectMeta || !subjectLevel) return "#";
    return topicNotesPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug);
  }, [subjectMeta, subjectLevel, topicSlug]);

  const toggleBookmark = async (questionId: string, next: boolean) => {
    setQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, bookmarked: next } : q)));
    setBookmarkedQuestions((prev) => {
      if (next) {
        const q = questions.find((x) => x.id === questionId);
        return q && !prev.find((x) => x.id === questionId) ? [...prev, q] : prev;
      }
      return prev.filter((q) => q.id !== questionId);
    });
  };

  const selectAnswer = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setSelected(questionId);
  };

  const submit = async () => {
    if (!user || !topicId || !subjectLevel) return;
    const unanswered = questions.filter((q) => answers[q.id] === undefined).length;
    if (unanswered > 0) {
      toast({ title: "Not ready", description: `Answer ${unanswered} more question${unanswered > 1 ? "s" : ""} before submitting.`, variant: "destructive" });
      return;
    }

    try {
      const { data, error: rpcError } = await supabase.rpc("grade_quiz", {
        _quiz_id: questions.length > 0 ? questions[0].quiz_id : undefined,
        _answers: Object.fromEntries(questions.map((q) => [q.id, answers[q.id] ?? -1])),
      });
      if (rpcError) throw rpcError;

      const resultsData = (data as any)?.results ?? questions.map((q) => ({
        question_id: q.id,
        selected: answers[q.id] ?? -1,
        correct_option: 0,
        explanation: null,
        options: (q.options as string[]) ?? [],
      }));

      setResults((resultsData as any[]) ?? []);
      const correctCount = resultsData.filter((r) => (r as any).selected === (r as any).correct_option).length;
      setScore({ correct: correctCount, total: questions.length });
      setSubmitted(true);
      toast({ title: "Answers submitted", description: `You got ${correctCount}/${questions.length} correct.`, variant: "default" });
    } catch (e: any) {
      toast({ title: "Submission failed", description: e.message, variant: "destructive" });
    }
  };

  const reset = () => {
    setAnswers({});
    setSelected(null);
    setSubmitted(false);
    setScore(null);
    setResults([]);
  };

  if (!isAdminRole && !prefsLoaded) {
    return (
      <div className="flex justify-center py-24">
        <div className="h-8 w-8 rounded-full border-primary/30 border animate-spin" />
      </div>
    );
  }
  if (!isAdminRole && user && prefsLoaded && pickedIds.size === 0) {
    return (
      <div className="space-y-6">
        <SEOHead title={`${topicLabel} — Topic Questions | Clutch Marks`} description="Exam-style topic questions with instant marking." path={topicQuizPath(subjectMeta?.slug ?? "", subjectLevel?.level.toLowerCase() ?? "", topicSlug)} />
        <SubjectGate />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  // Students only see topics belonging to a subject-level they picked.
  // Anonymous visitors are not enrolled in any subject yet, so they see the
  // topic regardless; signing in and picking it afterwards personalises the
  // view.
  if (!isAdminRole && user && prefsLoaded && topicId && !pickedIds.has(subjectLevel?.id ?? "")) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Topic questions not found</CardTitle>
          <CardDescription>You haven't selected this subject yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="gap-2">
            <Link to={topicNotesPath(subjectMeta?.slug ?? "", subjectLevel?.level.toLowerCase() ?? "", topicSlug)}><ArrowLeft className="h-4 w-4" /> Back to topic</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (error || !subjectMeta || !subjectLevel || !topicTitle || !topicId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {error && !/not found/i.test(error) ? "Couldn't load these questions" : "Topic questions not found"}
          </CardTitle>
          <CardDescription>{error ?? "No questions have been added for this topic yet."}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setRetryKey((k) => k + 1)}>
            <RotateCcw className="h-4 w-4" /> Try again
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to={topicNotesPath(subjectMeta?.slug ?? "", subjectLevel?.level.toLowerCase() ?? "", topicSlug)}><ArrowLeft className="h-4 w-4" /> Back to topic</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const Icon = subjectIcon(subjectMeta.icon);
  const accent = subjectAccent(subjectMeta.color);
  const levelCode = subjectLevel.level as SubjectLevelCode;
  const topicSeo = topicHead(
    {
      subjectSlug: subjectMeta.slug,
      subjectName: subjectMeta.name,
      level: subjectLevel.level,
      topicSlug,
      topicName: topicLabel,
    },
    "quiz",
  );

  const topicQuestions = questions.length;

  return (
    <div className="space-y-6">
      {/* Title, description, canonical and JSON-LD come from topicSeo, which is
          also what the build-time prerenderer writes into this URL's static HTML
          — so the crawler's head and the browser's head cannot disagree. */}
      <SEOHead {...topicSeo} />

      <TopicBreadcrumb
        subjectName={subjectMeta.name}
        levelLabel={LEVEL_LABELS[levelCode]}
        topicName={topicLabel}
        currentLabel="Topic Questions"
        subjectSlug={subjectMeta.slug}
        level={subjectLevel.level.toLowerCase()}
        topicSlug={topicSlug}
      />

      <div className={`glass-card p-6 flex flex-wrap items-center gap-4 ${accent.border}`}>
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${accent.border} ${accent.bg} ${accent.text}`}>
          <Icon className="h-7 w-7" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <h1 className="text-2xl font-bold tracking-tight">{topicLabel}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">{subjectMeta.name}</Badge>
            <Badge variant="outline">{LEVEL_LABELS[levelCode]}</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {topicQuestions} exam-style question{topicQuestions === 1 ? "" : "s"} for {topicLabel}.
            Answer all the questions, submit, and review the marking and explanations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to={`/practice?level=${subjectLevel.id}&topic=${topicId}`}>Practise mistakes <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Button>
          {bookmarkedQuestions.length > 0 && (
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link to={`/practice?level=${subjectLevel.id}&mode=bookmarked`}>
                <Bookmark className="h-3.5 w-3.5" /> Bookmarked ({bookmarkedQuestions.length})
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Questions", value: topicQuestions, icon: Play, color: accent.text },
          { label: "Bookmarked", value: bookmarkedQuestions.length, icon: Bookmark, color: accent.text },
          { label: "Past Papers", value: 0, icon: Archive, color: accent.text },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <s.icon className={`h-5 w-5 ${s.color}`} />
              <div>
                <p className="text-xl font-bold leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">{topicLabel} questions</h2>
              <p className="text-sm text-muted-foreground">{questions.length} question{questions.length === 1 ? "" : "s"} · tap each to answer</p>
            </div>
            {!submitted && (
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground"
                onClick={submit}
                disabled={questions.length === 0}
              >
                {questions.length === 0 ? "No questions yet" : "Submit answers"}
              </Button>
            )}
            {submitted && questions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-3xl font-bold neon-text">{score?.correct ?? 0}</p>
                    <p className="text-sm text-muted-foreground">{score?.total ?? 0} questions</p>
                  </div>
                  <Button variant="outline" className="gap-2" onClick={reset}>
                    <ArrowRight className="h-4 w-4" /> Try again
                  </Button>
                </div>
                <FeedbackNudge tool="quiz" toolLabel={`${topicLabel} quiz`} />
              </div>
            )}
          </div>
          {submitted && questions.length > 0 && (
            <Progress
              value={((score?.correct ?? 0) / (score?.total ?? 1)) * 100}
              className="mt-4 h-2"
            />
          )}
        </CardContent>
      </Card>

      <div className="space-y-2">
        {questions.map((question, index) => {
          const result = results.find((r) => r.question_id === question.id);
          const selectedOption = answers[question.id] ?? -1;
          const isCorrect = result && selectedOption === result.correct_option;
          const isWrong = result && selectedOption !== -1 && selectedOption !== result.correct_option;

          return (
            <Card key={question.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-medium truncate">Question {index + 1}</p>
                    <p className="text-sm text-muted-foreground truncate">{question.quiz_title ?? topicLabel}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className="capitalize">{question.difficulty}</Badge>
                    <BookmarkButton
                      questionId={question.id}
                      bookmarked={question.bookmarked}
                      onChange={(next) => toggleBookmark(question.id, next)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-base font-medium mb-4">{question.question_text}</p>
                <div className="space-y-2">
                  {(question.options as string[]).map((option, i) => {
                    const selectedThisQuestion = selectedOption === i;
                    const showCorrectness = submitted && result;
                    const optionCorrect = showCorrectness && i === result.correct_option;
                    const optionWrong = showCorrectness && selectedThisQuestion && !optionCorrect;
                    return (
                      <button
                        key={i}
                        disabled={submitted}
                        onClick={() => selectAnswer(question.id, i)}
                        className={`w-full text-left rounded-lg border p-3 text-sm transition-colors ${selectedThisQuestion ? "border-primary bg-primary/5" : ""} ${optionCorrect ? "border-primary bg-primary/10" : ""} ${optionWrong ? "border-destructive bg-destructive/10" : ""} ${!submitted ? "hover:border-primary/30 hover:bg-secondary/30" : ""}`}
                      >
                        <span className="flex items-center gap-2">
                          {showCorrectness && optionCorrect && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                          {showCorrectness && optionWrong && <XCircle className="h-4 w-4 text-destructive shrink-0" />}
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {result && result.explanation && (
                  <p className="mt-4 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">{result.explanation}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
