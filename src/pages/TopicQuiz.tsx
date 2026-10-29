// Per-topic quiz page with mark-scheme explanations.
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
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
import { ManuscriptHead, ManuscriptQuestion } from "@/components/StudyManuscript";
import { FeedbackNudge } from "@/components/FeedbackNudge";
import { LEVELS, LEVEL_LABELS, subjectIcon, subjectAccent, type SubjectLevelCode } from "@/lib/subjects";
import { canonicalLevelSlug, levelAliasCodes, levelNeedsRedirect } from "@/lib/levelSlug";
import {
  topicNotesPath,
  topicQuizPath,
  slugifyTopicName,
  topicSlugOf,
} from "@/lib/topicUrls";
import { topicDisplayName, topicHead } from "@/lib/topicSeo";
import {
  ArrowRight,
  Bookmark,
  Play,
  FileDown,
  ListChecks,
} from "lucide-react";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";
import { NotInYourSubjects, useSubjectUnpicked } from "@/components/NotInYourSubjects";
import { StudyLoadError } from "@/components/StudyLoadError";
import { exportQuizResultToPdf, gradeBand } from "@/lib/pdfExport";

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

interface GradeRow {
  question_id: string;
  selected: number;
  correct_option: number;
  explanation: string | null;
  options: string[];
}

export default function TopicQuiz() {
  const { slug: subject, level, topic } = useParams<{
    slug: string;
    level: string;
    topic: string;
  }>();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjectMeta, setSubjectMeta] = useState<Tables<"subjects"> | null>(null);
  const [subjectLevel, setSubjectLevel] = useState<Tables<"subject_levels"> | null>(null);
  const [topicTitle, setTopicTitle] = useState<string | null>(null);
  const topicSlug = useMemo(() => slugifyTopicName(topic ?? ""), [topic]);
  const [topicId, setTopicId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<TopicQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [results, setResults] = useState<GradeRow[]>([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<TopicQuestion[]>([]);
  // After marking: the whole paper, or only the ones to redo.
  const [reviewOnly, setReviewOnly] = useState(false);
  const [exporting, setExporting] = useState(false);
  // Bumped by "Try again" to re-run the load effect.
  const [retryKey, setRetryKey] = useState(0);

  const { user } = useAuth();
  const { loaded: prefsLoaded, isAdmin: isAdminRole, needsSubjectPick } = useMySubjects();
  const unpicked = useSubjectUnpicked(subjectLevel?.id);

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

        // `igcse` and `ol` resolve to the same level; the canonical redirect
        // below keeps one address for it (see @/lib/levelSlug).
        const { data: sl, error: slError } = await supabase.from("subject_levels").select("*").eq("subject_id", subjectRow.id).in("level", levelAliasCodes(level ?? "")).limit(1);
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
      } catch (e) {
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

  // One row per question, whatever happened to it. The review, the counters and
  // the exported PDF all read from this derivation, so they cannot disagree.
  const reviewRows = useMemo(() => {
    return questions.map((question, ordinal) => {
      const result = results.find((r) => r.question_id === question.id);
      const raw = answers[question.id];
      const picked = typeof raw === "number" ? raw : null;
      const status: "correct" | "incorrect" | "unanswered" = picked === null
        ? "unanswered"
        : result && picked === result.correct_option
          ? "correct"
          : "incorrect";
      return { ordinal, question, result, picked, status };
    });
  }, [questions, results, answers]);

  const counts = useMemo(() => {
    return reviewRows.reduce(
      (acc, row) => {
        acc[row.status] += 1;
        return acc;
      },
      { correct: 0, incorrect: 0, unanswered: 0 },
    );
  }, [reviewRows]);

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
      // A topic's bank is spread across several quizzes (the paper, checkpoints,
      // drills), and grade_quiz marks one quiz per call. Submitting only
      // questions[0].quiz_id scored 10 of the 41 questions on screen and left
      // the other 31 out of the attempt history and the review ledger, so the
      // groups are graded separately and merged here.
      const groups = new Map<string, TopicQuestion[]>();
      for (const q of questions) {
        const group = groups.get(q.quiz_id);
        if (group) group.push(q);
        else groups.set(q.quiz_id, [q]);
      }

      const resultsData: GradeRow[] = [];
      let correctCount = 0;
      for (const [quizId, group] of groups) {
        const { data, error: rpcError } = await supabase.rpc("grade_quiz", {
          _quiz_id: quizId,
          _answers: Object.fromEntries(group.map((q) => [q.id, answers[q.id] ?? -1])),
        });
        if (rpcError) throw rpcError;
        const gradePayload = data as { results?: GradeRow[]; correct?: number } | null;
        resultsData.push(...(gradePayload?.results ?? []));
        correctCount += gradePayload?.correct ?? 0;
      }
      if (resultsData.length === 0) throw new Error("No answers were marked — please try again.");

      setResults(resultsData);
      setScore({ correct: correctCount, total: questions.length });
      setSubmitted(true);
      setReviewOnly(false);
      toast({ title: "Answers submitted", description: `You got ${correctCount}/${questions.length} correct.`, variant: "default" });
    } catch (e) {
      toast({ title: "Submission failed", description: e.message, variant: "destructive" });
    }
  };

  const reset = () => {
    setAnswers({});
    setSelected(null);
    setSubmitted(false);
    setScore(null);
    setResults([]);
    setReviewOnly(false);
  };

  if (!isAdminRole && !prefsLoaded) {
    return (
      <div className="flex justify-center py-24">
        <div className="h-8 w-8 rounded-full border-primary/30 border animate-spin" />
      </div>
    );
  }
  // "Does this reader still have to pick subjects?" is asked in one place.
  if (subjectLevel && levelNeedsRedirect(subjectLevel.level, level ?? "")) {
    return (
      <Navigate
        replace
        to={`/study/${subject}/${canonicalLevelSlug(subjectLevel.level)}/${topicSlug}/quiz`}
      />
    );
  }

  if (needsSubjectPick) {
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
  // Shared with the other four surfaces that can open an unpicked subject —
  // see `useSubjectUnpicked`. `topicId` stays here: without it this is a
  // missing topic, not a missing pick.
  if (topicId && unpicked) {
    return (
      <NotInYourSubjects
        subjectLevelId={subjectLevel.id}
        subjectName={subjectMeta?.name ?? null}
        level={subjectLevel.level}
        backTo={topicNotesPath(subjectMeta?.slug ?? "", subjectLevel?.level.toLowerCase() ?? "", topicSlug)}
        backLabel="Back to topic"
      />
    );
  }

  if (error || !subjectMeta || !subjectLevel || !topicTitle || !topicId) {
    return (
      <StudyLoadError
        failure={error}
        loadTitle="Couldn't load these questions"
        missingTitle="Topic questions not found"
        missingDetail="No questions have been added for this topic yet."
        onRetry={() => setRetryKey((k) => k + 1)}
        backTo={topicNotesPath(subjectMeta?.slug ?? "", subjectLevel?.level.toLowerCase() ?? "", topicSlug)}
        backLabel="Back to topic"
      />
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
  const percent = (score?.correct ?? 0) / Math.max(1, score?.total ?? 1) * 100;
  const visibleRows = reviewOnly
    ? reviewRows.filter((row) => row.status !== "correct")
    : reviewRows;

  const downloadResult = async () => {
    setExporting(true);
    try {
      await exportQuizResultToPdf({
        quizTitle: `${topicLabel} — topic questions`,
        topicName: topicLabel,
        subject: subjectMeta.name,
        level: LEVEL_LABELS[levelCode],
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

      <ManuscriptHead
        eyebrow={`${subjectMeta.name} · ${LEVEL_LABELS[levelCode]}`}
        title={topicLabel}
        lede={`${topicQuestions} exam-style question${topicQuestions === 1 ? "" : "s"} for ${topicLabel}. Answer all the questions, submit, and review the marking and explanations.`}
        actions={
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to={`/practice?level=${subjectLevel.id}&topic=${topicId}&mode=incorrect`}>Practise mistakes <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Questions", value: topicQuestions, icon: Play, color: accent.text },
          { label: "Bookmarked", value: bookmarkedQuestions.length, icon: Bookmark, color: accent.text },
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
              <p className="text-sm text-muted-foreground">
                {submitted
                  ? `${counts.correct} correct · ${counts.incorrect} incorrect${counts.unanswered ? ` · ${counts.unanswered} blank` : ""}`
                  : `${questions.length} question${questions.length === 1 ? "" : "s"} · tap each to answer`}
              </p>
            </div>
            {/* Marking a quiz records an attempt against an account, so a
                signed-out reader gets a sign-in prompt instead of a button that
                silently does nothing (submit() returns early without a user). */}
            {!submitted && user && (
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground"
                onClick={submit}
                disabled={questions.length === 0}
              >
                {questions.length === 0 ? "No questions yet" : "Submit answers"}
              </Button>
            )}
            {!submitted && !user && questions.length > 0 && (
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground"
              >
                <Link to="/auth">Sign in to be marked</Link>
              </Button>
            )}
            {submitted && questions.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <div className="text-center">
                  <p className="font-mono text-3xl font-bold neon-text">{score?.correct ?? 0}</p>
                  <p className="text-sm text-muted-foreground">{score?.total ?? 0} questions</p>
                </div>
                <Badge variant="secondary">{percent.toFixed(0)}% · {gradeBand(percent)}</Badge>
                <Button
                  variant={reviewOnly ? "default" : "outline"}
                  className="gap-2"
                  aria-pressed={reviewOnly}
                  onClick={() => setReviewOnly((v) => !v)}
                >
                  <ListChecks className="h-4 w-4" />
                  {reviewOnly ? "Showing what to review" : "Only what to review"}
                </Button>
                <Button variant="outline" className="gap-2" onClick={downloadResult} disabled={exporting}>
                  <FileDown className="h-4 w-4" /> {exporting ? "Building PDF…" : "Download result"}
                </Button>
                <Button variant="outline" className="gap-2" onClick={reset}>
                  <ArrowRight className="h-4 w-4" /> Try again
                </Button>
              </div>
            )}
          </div>
          {submitted && questions.length > 0 && (
            <>
              <Progress
                value={percent}
                className="mt-4 h-2"
              />
              <div className="mt-3">
                <FeedbackNudge tool="quiz" toolLabel={`${topicLabel} quiz`} />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {submitted && reviewOnly && visibleRows.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            Nothing to review — every question was answered correctly.
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {visibleRows.map(({ ordinal, question, result, picked }) => (
          <ManuscriptQuestion
            key={question.id}
            /* The ordinal is the position on the full paper, so filtering
               the list does not renumber the questions. */
            eyebrow={`Question ${ordinal + 1} · ${question.difficulty ?? topicLabel}`}
            question={question.question_text}
            options={question.options as string[]}
            selected={picked ?? null}
            correctOption={result ? result.correct_option : null}
            disabled={submitted}
            onSelect={(i) => selectAnswer(question.id, i)}
            explanation={result?.explanation ?? null}
            actions={
              <BookmarkButton
                questionId={question.id}
                bookmarked={question.bookmarked}
                onChange={(next) => toggleBookmark(question.id, next)}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
