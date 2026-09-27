// Subject-level hub: materials, questions, exams, question-bank tabs.
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEOHead } from "@/components/SEOHead";
import { BookmarkButton } from "@/components/BookmarkButton";
import { subjectIcon, subjectAccent, LEVEL_LABELS, type SubjectLevelCode } from "@/lib/subjects";
import { topicNotesPath, topicQuizPath, topicPapersPath, slugifyTopicName } from "@/lib/topicUrls";
import { usePreviewSlice, PreviewLimit } from "@/components/PreviewLimit";
import { PreviewBanner } from "@/components/PreviewBanner";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";
import { BookOpen, FileText, Brain, Archive, Database, ArrowLeft, ArrowRight, Search, Sparkles } from "lucide-react";

interface BankQuestion {
  id: string;
  quiz_title: string;
  question_text: string;
  difficulty: string;
  exam_type: string;
  is_ai_generated: boolean;
  topic_id: string | null;
  topic_name: string | null;
  bookmarked: boolean;
  last_correct: boolean | null;
}

const ALL = "all";

export default function Subject() {
  const { slug = "", level = "" } = useParams();
  const levelCode = level.toUpperCase() as SubjectLevelCode;
  const location = useLocation();

  // If the URL has a hash (e.g. #questions, #bank), scroll to that tab after
  // the page and tabs render.
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;

    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState<any>(null);
  const [subjectLevel, setSubjectLevel] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);
  const [questions, setQuestions] = useState<BankQuestion[]>([]);

  const { pickedIds, loaded: prefsLoaded, isAdmin: isAdminRole } = useMySubjects();
  const needsSubjectPick = !isAdminRole && prefsLoaded && pickedIds.size === 0;

  // filters
  const [search, setSearch] = useState("");
  const [topicFilter, setTopicFilter] = useState(ALL);
  const [difficulty, setDifficulty] = useState(ALL);
  const [examType, setExamType] = useState(ALL);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setSearch(""); setTopicFilter(ALL); setDifficulty(ALL); setExamType(ALL);
      const { data: subj } = await supabase
        .from("subjects").select("*").eq("slug", slug).maybeSingle();
      if (!active) return;
      setSubject(subj ?? null);
      if (!subj) { setLoading(false); return; }

      const { data: sl } = await supabase
        .from("subject_levels").select("*").eq("subject_id", subj.id).eq("level", levelCode).maybeSingle();
      if (!active) return;
      setSubjectLevel(sl ?? null);
      if (!sl) { setLoading(false); return; }

      const { data: tp } = await supabase
        .from("topics").select("*").eq("subject_level_id", sl.id).order("sort_order");
      if (!active) return;
      const topicList = tp ?? [];
      setTopics(topicList);
      const ids = topicList.map((t: any) => t.id);

      if (ids.length) {
        const [ls, ms, qz, pp] = await Promise.all([
          supabase.from("lessons").select("id, title, topic_id, sort_order").in("topic_id", ids).order("sort_order"),
          supabase.from("study_materials").select("id, title, topic_id, material_type, file_url").in("topic_id", ids),
          supabase.from("quizzes").select("id, title, topic_id, description, is_published, exam_type, is_ai_generated").in("topic_id", ids),
          supabase.from("past_papers").select("id, title, year, session, paper_number, topic_id").in("topic_id", ids).order("year", { ascending: false }),
        ]);
        if (!active) return;
        setLessons(ls.data ?? []);
        setMaterials(ms.data ?? []);
        setQuizzes((qz.data ?? []).filter((q: any) => q.is_published));
        setPapers(pp.data ?? []);
      } else {
        setLessons([]); setMaterials([]); setQuizzes([]); setPapers([]);
      }
      setLoading(false);
    })();
    return () => { active = false; };
  }, [slug, levelCode]);

  // questions come through the secure RPC (no answers exposed)
  useEffect(() => {
    if (!subjectLevel) { setQuestions([]); return; }
    let active = true;
    (async () => {
      const { data } = await supabase.rpc("browse_questions", {
        _topic_id: topicFilter === ALL ? null : topicFilter,
        _subject_level_id: subjectLevel.id,
        _difficulty: difficulty === ALL ? null : difficulty,
        _exam_type: examType === ALL ? null : examType,
        _search: search.trim() || null,
        _limit: 200,
        _offset: 0,
      });
      if (active) setQuestions(((data ?? []) as unknown as BankQuestion[]));
    })();
    return () => { active = false; };
  }, [subjectLevel, topicFilter, difficulty, examType, search]);

  const topicNameMap = useMemo(() => new Map(topics.map((t) => [t.id, t.name])), [topics]);
  const topicSlugMap = useMemo(() => new Map(topics.map((t) => [t.id, slugifyTopicName(t.name)])), [topics]);

  const matchesText = (...values: (string | null | undefined)[]) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return values.some((v) => (v ?? "").toLowerCase().includes(q));
  };
  const matchesTopic = (topicId: string | null) => topicFilter === ALL || topicId === topicFilter;

  const visibleLessons = lessons.filter((l) => matchesTopic(l.topic_id) && matchesText(l.title, topicNameMap.get(l.topic_id)));
  const visibleMaterials = materials.filter((m) => matchesTopic(m.topic_id) && matchesText(m.title, m.material_type, topicNameMap.get(m.topic_id)));
  const visibleQuizzes = quizzes.filter((q) =>
    matchesTopic(q.topic_id) && matchesText(q.title, q.description) &&
    (examType === ALL || q.exam_type === examType));
  const visiblePapers = papers.filter((p) =>
    matchesTopic(p.topic_id) && matchesText(p.title, p.session, p.paper_number, String(p.year)) &&
    (examType === ALL || examType === "exam" || examType === "mock"));

  // Free-plan preview: show only the first few items of every list; the rest
  // collapses into an upgrade prompt. Full-plan users see everything.
  const previewLessons = usePreviewSlice(visibleLessons);
  const previewMaterials = usePreviewSlice(visibleMaterials);
  const previewQuizzes = usePreviewSlice(visibleQuizzes);
  const previewPapers = usePreviewSlice(visiblePapers);
  const previewQuestions = usePreviewSlice(questions);
  const aiQuestions = questions.filter((q) => q.is_ai_generated);
  const previewAiQuestions = usePreviewSlice(aiQuestions);

  if (!isAdminRole && !prefsLoaded) {
    return (
      <div className="flex justify-center py-24">
        <div className="h-8 w-8 rounded-full border-primary/30 border animate-spin" />
      </div>
    );
  }
  if (needsSubjectPick) {
    return (
      <div className="space-y-6">
        <SEOHead title={`${subject?.name ?? "Subject"} — Clutch Marks`} description="Lessons, revision materials, exams and a question bank." path={`/study/${slug}/${level}`} />
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

  // Students only see subject-levels they picked; admins see everything.
  if (!isAdminRole && prefsLoaded && !(pickedIds.has(subjectLevel?.id ?? ""))) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subject not found</CardTitle>
          <CardDescription>You haven't selected this subject yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/subjects"><ArrowLeft className="h-4 w-4" /> Back to subjects</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!subject || !subjectLevel) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subject not found</CardTitle>
          <CardDescription>This subject or level isn't available yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/subjects"><ArrowLeft className="h-4 w-4" /> Back to subjects</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const Icon = subjectIcon(subject.icon);
  const accent = subjectAccent(subject.color);

  const empty = (label: string) => (
    <p className="py-10 text-center text-sm text-muted-foreground">No {label} match your filters.</p>
  );

  const setBookmark = (id: string, next: boolean) =>
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, bookmarked: next } : q)));

  const questionCard = (q: BankQuestion) => (
    <Card key={q.id}>
      <CardContent className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-sm font-medium line-clamp-2">{q.question_text}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <Badge variant="secondary">{q.topic_name ?? "General"}</Badge>
            <Badge variant="outline" className="capitalize">{q.difficulty}</Badge>
            {q.is_ai_generated && <Badge variant="outline" className="gap-1"><Sparkles className="h-3 w-3" /> Gen</Badge>}
            {q.last_correct === false && <Badge variant="outline" className="text-destructive border-destructive/40">Retry</Badge>}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <BookmarkButton questionId={q.id} bookmarked={q.bookmarked} onChange={(next) => setBookmark(q.id, next)} />
          <Button asChild size="sm">
            <Link to={`/practice?tab=topics&topic=${q.topic_id ?? ""}`}>Practise</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <SEOHead
        title={`${subject.name} ${LEVEL_LABELS[levelCode]} — Clutch Marks`}
        description={`Lessons, revision materials, exams and a question bank for ${subject.name} ${LEVEL_LABELS[levelCode]}.`}
        path={`/study/${slug}/${level}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: `${subject.name} ${LEVEL_LABELS[levelCode]}`,
          description: `Lessons, revision materials, exams and a question bank for ${subject.name} ${LEVEL_LABELS[levelCode]}.`,
          url: `https://clutch-marks.lovable.app/study/${slug}/${level}`,
          provider: {
            "@type": "EducationalOrganization",
            name: "Clutch Marks",
            url: "https://clutch-marks.lovable.app/",
          },
        }}
      />

      <div className={`glass-card p-6 flex flex-wrap items-center gap-4 ${accent.border}`}>
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${accent.border} ${accent.bg} ${accent.text}`}>
          <Icon className="h-7 w-7" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{subject.name}</h1>
            <Badge variant="secondary">{LEVEL_LABELS[levelCode]}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {subjectLevel.description || subject.description || "Everything you need for this level."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to={`/practice?level=${subjectLevel.id}&mode=incorrect`}>Practise mistakes</Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to="/subjects"><ArrowLeft className="h-4 w-4" /> All subjects</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: "Topics", value: topics.length, icon: BookOpen },
          { label: "Lessons", value: lessons.length, icon: FileText },
          { label: "Exams & Quizzes", value: quizzes.length, icon: Brain },
          { label: "Past Papers", value: papers.length, icon: Archive },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <s.icon className={`h-5 w-5 ${accent.text}`} />
              <div>
                <p className="text-xl font-bold leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" placeholder="Search this subject…" />
          </div>
          <Select value={topicFilter} onValueChange={setTopicFilter}>
            <SelectTrigger className="w-[190px]"><SelectValue placeholder="Topic" /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All topics</SelectItem>
              {topics.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Any difficulty</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Select value={examType} onValueChange={setExamType}>
            <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Any exam type</SelectItem>
              <SelectItem value="quiz">Quiz</SelectItem>
              <SelectItem value="exam">Exam</SelectItem>
              <SelectItem value="mock">Mock</SelectItem>
              <SelectItem value="ai_bank">Question bank</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <PreviewBanner />
      <Tabs defaultValue="materials">
        <TabsList className="flex-wrap h-auto" id="tabs">
          <TabsTrigger value="materials">Material ({visibleLessons.length + visibleMaterials.length})</TabsTrigger>
          <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
          <TabsTrigger value="exams">Exams ({visibleQuizzes.length + visiblePapers.length})</TabsTrigger>
          <TabsTrigger value="bank">Question Bank ({aiQuestions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" id="materials" className="space-y-3 pt-4">
          {visibleLessons.length === 0 && visibleMaterials.length === 0 ? empty("material") : (
            <>
              {previewLessons.map((l) => {
                const ts = topicSlugMap.get(l.topic_id);
                return (
                  <Card key={l.id}>
                    <CardContent className="flex items-center justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{l.title}</p>
                        <p className="text-xs text-muted-foreground">Lesson · {topicNameMap.get(l.topic_id) ?? "General"}</p>
                      </div>
                      <Button asChild size="sm" variant="ghost" className="gap-1">
                        {ts ? (
                          <Link to={topicNotesPath(subject!.slug!, subjectLevel!.level.toLowerCase(), ts)}>Open <ArrowRight className="h-3.5 w-3.5" /></Link>
                        ) : (
                          <Link to="/lessons">Open <ArrowRight className="h-3.5 w-3.5" /></Link>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
              {previewMaterials.map((m) => {
                const ts = topicSlugMap.get(m.topic_id);
                return (
                  <Card key={m.id}>
                    <CardContent className="flex items-center justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{m.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{m.material_type} · {topicNameMap.get(m.topic_id) ?? "General"}</p>
                      </div>
                      <Button asChild size="sm" variant="ghost" className="gap-1">
                        {ts ? (
                          <Link to={topicNotesPath(subject!.slug!, subjectLevel!.level.toLowerCase(), ts)}>Open <ArrowRight className="h-3.5 w-3.5" /></Link>
                        ) : (
                          <Link to="/notes">Open <ArrowRight className="h-3.5 w-3.5" /></Link>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
              <PreviewLimit
                hiddenCount={visibleLessons.length + visibleMaterials.length - previewLessons.length - previewMaterials.length}
                what="materials"
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="questions" id="questions" className="space-y-3 pt-4">
          {previewQuestions.length === 0 ? empty("questions") : (
            <>
              {previewQuestions.map(questionCard)}
              <PreviewLimit hiddenCount={questions.length - previewQuestions.length} what="questions" />
            </>
          )}
        </TabsContent>

        <TabsContent value="exams" id="exams" className="space-y-3 pt-4">
          {visibleQuizzes.length === 0 && visiblePapers.length === 0 ? empty("exams") : (
            <>
              {previewQuizzes.map((q) => {
                const ts = topicSlugMap.get(q.topic_id);
                return (
                  <Card key={q.id}>
                    <CardContent className="flex items-center justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{q.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{q.description || topicNameMap.get(q.topic_id) || "Exam"}</p>
                        <Badge variant="outline" className="mt-1.5 capitalize">{String(q.exam_type).replace("_", " ")}</Badge>
                      </div>
                      <Button asChild size="sm" variant="ghost" className="gap-1">
                        {ts ? (
                          <Link to={topicQuizPath(subject!.slug!, subjectLevel!.level.toLowerCase(), ts)}>Start <ArrowRight className="h-3.5 w-3.5" /></Link>
                        ) : (
                          <Link to="/quizzes">Start <ArrowRight className="h-3.5 w-3.5" /></Link>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
              {previewPapers.map((p) => {
                const ts = topicSlugMap.get(p.topic_id);
                return (
                  <Card key={p.id}>
                    <CardContent className="flex items-center justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.year}{p.session ? ` · ${p.session}` : ""}{p.paper_number ? ` · ${p.paper_number}` : ""} · Past paper</p>
                      </div>
                      <Button asChild size="sm" variant="ghost" className="gap-1">
                        {ts && subjectLevel ? (
                          <Link to={topicPapersPath(subject!.slug!, subjectLevel.level.toLowerCase(), ts)}>Open <ArrowRight className="h-3.5 w-3.5" /></Link>
                        ) : (
                          <Link to="/past-papers">Open <ArrowRight className="h-3.5 w-3.5" /></Link>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
              <PreviewLimit
                hiddenCount={visibleQuizzes.length + visiblePapers.length - previewQuizzes.length - previewPapers.length}
                what="exams & past papers"
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="bank" id="bank" className="space-y-3 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5 text-primary" /> Question Bank</CardTitle>
              <CardDescription>
                AI-written exam questions for {subject.name} {LEVEL_LABELS[levelCode]} with instant marking and explanations.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild className="gap-2"><Link to="/practice?tab=topics">Open topic questions <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button asChild variant="outline" className="gap-2"><Link to={`/practice?level=${subjectLevel.id}&mode=bookmarked`}>Bookmarked questions</Link></Button>
            </CardContent>
          </Card>
          {previewAiQuestions.length === 0 ? empty("AI questions") : (
            <>
              {previewAiQuestions.map(questionCard)}
              <PreviewLimit hiddenCount={aiQuestions.length - previewAiQuestions.length} what="AI questions" />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
