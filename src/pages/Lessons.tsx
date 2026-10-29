// All topics with their lessons and notes, filtered by subject picker.
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/useToast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, BookOpen, ChevronRight, Download, FileText, Loader2, ClipboardList, Layers, Lock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { exportLessonToPdf } from "@/lib/pdfExport";
import { SEOHead } from "@/components/SEOHead";
import { openSignedFile } from "@/lib/contentFiles";
import { topicNotesPath, topicQuizPath, topicSlugOf } from "@/lib/topicUrls";
import { LEVELS, LEVEL_LABELS } from "@/lib/subjects";
import { useMySubjects } from "@/hooks/useMySubjects";
import { usePlanAccess } from "@/components/PreviewLimit";
import { openableLessonIds, isLockedLesson, ranksByLevel } from "@/lib/lessonAccess";
import { materialContentToHtml } from "@/lib/objectiveTeach";
import { PreviewBanner } from "@/components/PreviewBanner";
import { SubjectGate } from "@/components/SubjectGate";
import { FeedbackNudge } from "@/components/FeedbackNudge";
import { SubjectPicker } from "@/components/SubjectPicker";
import type { Tables } from "@/integrations/supabase/types";

// What the index needs to draw a row: everything but the body. `content` is the
// bulk of the table and the list never renders it, so it is fetched only for the
// lesson a reader opens.
type LessonRow = Pick<Tables<"lessons">, "id" | "title" | "topic_id" | "sort_order" | "video_url" | "zoom_url">;

export default function Lessons() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { subject, level, topic } = useParams<{ subject?: string; level?: string; topic?: string }>();
  const [topics, setTopics] = useState<Tables<"topics">[]>([]);
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [selectedLesson, setSelectedLesson] = useState<Tables<"lessons"> | null>(null);
  // The row whose body is being fetched, so a click is acknowledged while it
  // travels. Without it a slow request looked like a dead button.
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Pick<Tables<"study_materials">, "id" | "title" | "file_url" | "topic_id">[]>([]);
  // Per-topic hub links (notes / questions) plus the badge label
  // (subject + level), so same-named topics on different levels — Nuclear
  // Physics (OL vs A2), Thermal Physics — are distinguishable in the list.
  const [topicLinks, setTopicLinks] = useState<Record<string, { notes: string; quiz: string } | undefined>>({});
  const [topicMeta, setTopicMeta] = useState<Record<string, { subject: string; level: string }>>({});
  const topicSlugMap = useMemo(() => new Map(topics.map((t) => [t.id, topicSlugOf(t)])), [topics]);
  const { pickedIds, loaded: prefsLoaded, isAdmin, needsSubjectPick } = useMySubjects();

  // Save the open lesson as branded revision paper. The export loads the brand
  // tile and stamps the account watermark, so it is async and can fail (offline,
  // a blocked canvas) — awaited in a try/catch rather than fired into the void.
  const saveLessonPdf = async (lesson: Tables<"lessons">) => {
    try {
      await exportLessonToPdf(lesson, { owner: user?.email ?? user?.id ?? null });
      toast({ title: "Saved", description: "Your PDF is downloading." });
    } catch (e) {
      toast({
        title: "Couldn't build the PDF",
        description: e?.message ?? "Please try again.",
        variant: "destructive",
      });
    }
  };

  const pickKey = useMemo(() => [...pickedIds].sort().join(","), [pickedIds]);

  useEffect(() => {
    // The picks decide which levels are asked for, so wait for them: this page
    // used to fetch every topic, every lesson body and every note title in the
    // estate and then discard most of it in `scopedTopics`. For a two-subject
    // student that was five subjects' worth of rows.
    if (user && !isAdmin && !prefsLoaded) return;
    // No picks means the subject gate is on screen. An empty `in.()` would be a
    // 400, so answer it here rather than asking the server for nothing.
    const scopeToPicks = !!user && !isAdmin;
    if (scopeToPicks && pickedIds.size === 0) {
      setTopics([]);
      setLessons([]);
      setNotes([]);
      setTopicLinks({});
      setTopicMeta({});
      return;
    }
    let cancelled = false;
    const load = async () => {
      let topicQuery = supabase.from("topics").select("*").order("sort_order");
      if (scopeToPicks) topicQuery = topicQuery.in("subject_level_id", [...pickedIds]);
      const topicsRes = await topicQuery;
      if (cancelled) return;
      const topicsList = topicsRes.data ?? [];
      setTopics(topicsList);
      // Lessons and notes are scoped by the topics that survived the filter. An
      // anonymous visitor has no picks and keeps the whole index, so their
      // queries stay unfiltered rather than sending 191 ids in a URL.
      const topicIds = topicsList.map((t) => t.id);
      let lessonQuery = supabase
        .from("lessons")
        .select("id, title, topic_id, sort_order, video_url, zoom_url")
        .order("sort_order");
      let notesQuery = supabase
        .from("study_materials")
        .select("id, title, file_url, topic_id")
        .eq("material_type", "notes");
      if (scopeToPicks) {
        lessonQuery = lessonQuery.in("topic_id", topicIds);
        notesQuery = notesQuery.in("topic_id", topicIds);
      }
      const [lessonsRes, notesRes, progressRes, slRes, subRes] = await Promise.all([
        lessonQuery,
        notesQuery,
        user ? supabase.from("lesson_progress").select("lesson_id, completed").eq("user_id", user.id) : Promise.resolve({ data: [] }),
        supabase.from("subject_levels").select("id, level, subject_id"),
        supabase.from("subjects").select("id, name, slug"),
      ]);
      if (cancelled) return;
      setLessons(lessonsRes.data ?? []);
      setNotes(notesRes.data ?? []);
      const prog: Record<string, boolean> = {};
      (progressRes.data ?? []).forEach((p) => { prog[p.lesson_id] = p.completed; });
      setProgress(prog);
      // Resolve each topic's hub links (notes / questions) and badge
      // label via its subject level + subject slug.
      const slMap = new Map((slRes.data ?? []).map((s) => [s.id, s]));
      const subMap = new Map((subRes.data ?? []).map((s) => [s.id, s]));
      const links: Record<string, { notes: string; quiz: string } | undefined> = {};
      const meta: Record<string, { subject: string; level: string }> = {};
      for (const t of topicsList) {
        const sl = slMap.get(t.subject_level_id);
        const sub = sl ? subMap.get(sl.subject_id) : undefined;
        const slug = sub?.slug;
        if (slug && sl) {
          const lvl = sl.level.toLowerCase();
          const tslug = topicSlugOf(t);
          links[t.id] = {
            notes: topicNotesPath(slug, lvl, tslug),
            quiz: topicQuizPath(slug, lvl, tslug),
          };
          meta[t.id] = { subject: sub.name, level: sl.level };
        } else {
          links[t.id] = undefined;
        }
      }
      setTopicLinks(links);
      setTopicMeta(meta);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [user, isAdmin, prefsLoaded, pickKey]);

  const toggleComplete = async (lessonId: string) => {
    if (!user) return;
    const isCompleted = progress[lessonId];
    if (isCompleted) {
      await supabase.from("lesson_progress").delete().eq("user_id", user.id).eq("lesson_id", lessonId);
    } else {
      await supabase.from("lesson_progress").upsert({ user_id: user.id, lesson_id: lessonId, completed: true, completed_at: new Date().toISOString() });
    }
    setProgress((p) => ({ ...p, [lessonId]: !isCompleted }));
  };

  const openLesson = async (row: LessonRow) => {
    setOpeningId(row.id);
    const { data, error } = await supabase.from("lessons").select("*").eq("id", row.id).maybeSingle();
    setOpeningId(null);
    if (error || !data) {
      toast({
        title: "Couldn't open this lesson",
        description: error?.message ?? "It may have been removed. Try again.",
        variant: "destructive",
      });
      return;
    }
    setSelectedLesson(data);
  };

  const { loading: planLoading, hasPaid } = usePlanAccess();
  // Signed-in students are scoped to the subjects they picked. An anonymous
  // visitor has no picks, and an empty pick set would filter the whole index
  // away — they see every subject, with the same one-free-lesson-per-level rule
  // applied as everywhere else.
  const scopedTopics = useMemo(() => {
    if (isAdmin || !prefsLoaded) return topics;
    return user ? topics.filter((t) => pickedIds.has(t.subject_level_id)) : topics;
  }, [topics, pickedIds, prefsLoaded, isAdmin, user]);
  // The list of topics does not depend on the plan: a paid user used to lose
  // every topic that had no lessons because the free-plan branch was written as
  // `if (!isPreview)` and returned only `limited` (lesson-bearing) topics.
  const visibleTopics = scopedTopics;

  // Which lesson a free account may open, resolved exactly as the subject hub
  // and the notes library do it: one per subject-level, and it is the first
  // lesson of that level's first topic (`topicRank` is what puts the first topic
  // first — every lesson's own `sort_order` is 1, ordering only within a topic).
  //
  // The index used to slice each topic to one lesson and count the remainder
  // into a "+ N more lessons" card, which hid what the plan contains and could
  // hand a free reader a different lesson here than the hub had just offered.
  // Locked rows now stay in the list, as the locked notes do.
  const levelOfTopic = useMemo(
    () => new Map(topics.map((t) => [t.id, t.subject_level_id])),
    [topics],
  );
  const topicRanks = useMemo(() => ranksByLevel(topics), [topics]);

  // `null` locks nothing: while the plan is still loading no row may flash as
  // locked, the same contract as `isLockedLesson`'s "not resolved yet".
  const openableLessons = useMemo(() => {
    if (planLoading) return null;
    const fullAccess = hasPaid || isAdmin;
    const byLevel = new Map<string, LessonRow[]>();
    for (const l of lessons) {
      const levelId = l.topic_id ? levelOfTopic.get(l.topic_id) : undefined;
      if (!levelId) continue;
      const list = byLevel.get(levelId) ?? [];
      list.push(l);
      byLevel.set(levelId, list);
    }
    const open = new Set<string>();
    for (const [levelId, list] of byLevel) {
      for (const id of openableLessonIds(list, fullAccess, topicRanks.get(levelId))) open.add(id);
    }
    return open;
  }, [lessons, levelOfTopic, topicRanks, planLoading, hasPaid, isAdmin]);

  // Only signed-in students are gated: an anonymous visitor has picked no
  // subjects by definition and must still see the lesson index. That rule lives
  // in useMySubjects now, so this page cannot drift from the others.

  // Subject & level gate: students must pick at least one subject (and its
  // level) before any lesson content renders — nothing is shown while prefs
  // are loading or when nothing is picked. Early returns sit after every hook.
  if (!isAdmin && !prefsLoaded) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (needsSubjectPick) {
    return (
      <div className="space-y-6">
        <SEOHead path="/lessons" />
        <SubjectGate />
      </div>
    );
  }

  if (selectedLesson) {
    return (
      <div className="space-y-4">
        <SEOHead path="/lessons" />
        <Button variant="ghost" onClick={() => setSelectedLesson(null)} className="gap-2">
          ← Back to Lessons
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{selectedLesson.title}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            {selectedLesson.content ? (
              // Lesson bodies are HTML written by the content pipeline, with a
              // handful of rows carrying appended markdown headings. The old
              // `\n` → `<br/>` swap put a stray break between every block — and
              // rendered an appended `### Worked example` as literal hashes. The
              // converter passes HTML through and converts heading lines only.
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(materialContentToHtml(selectedLesson.content)) }} />
            ) : (
              <p className="text-muted-foreground">No content available yet.</p>
            )}
            {selectedLesson.video_url && (
              <div className="mt-4">
                <a href={selectedLesson.video_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  Watch Video →
                </a>
              </div>
            )}
            {selectedLesson.zoom_url && (
              <div className="mt-4">
                <a href={selectedLesson.zoom_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  Join Zoom Meeting →
                </a>
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              <Button onClick={() => toggleComplete(selectedLesson.id)} variant={progress[selectedLesson.id] ? "outline" : "default"}>
                {progress[selectedLesson.id] ? "Mark Incomplete" : "Mark Complete ✓"}
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => saveLessonPdf(selectedLesson)}>
                <Download className="h-4 w-4" /> Save as PDF
              </Button>
            </div>
            {progress[selectedLesson.id] && (
              <div className="mt-4">
                <FeedbackNudge tool="lesson" toolLabel={selectedLesson.title} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PreviewBanner />
      <SEOHead path="/lessons" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lessons</h1>
          <p className="text-muted-foreground">Structured lessons and notes by topic</p>
        </div>
        <SubjectPicker />
      </div>

      {needsSubjectPick ? (
        <SubjectGate />
      ) : visibleTopics.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No topics available yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="multiple" className="space-y-3">
          {visibleTopics.map((topic) => {
            const allTopicLessons = lessons.filter((l) => l.topic_id === topic.id);
            // Every lesson stays listed. On the free plan the rows the account
            // cannot open are what the plan is selling, so they carry a lock and
            // an Unlock link rather than being folded into a count.
            const topicLessons = allTopicLessons;
            const topicNotes = notes.filter((n) => n.topic_id === topic.id);
            const completedCount = allTopicLessons.filter((l) => progress[l.id]).length;
            const links = topicLinks[topic.id];
            const meta = topicMeta[topic.id];
            return (
              <AccordionItem key={topic.id} value={topic.id} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
                      {topic.sort_order + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{topic.name}</p>
                      <p className="text-xs text-muted-foreground">{completedCount}/{allTopicLessons.length} lessons</p>
                    </div>
                    {meta && (
                      <div className="ml-1 flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-[10px]">{meta.subject}</Badge>
                        <Badge variant="outline" className="text-[10px]">{LEVEL_LABELS[meta.level as "OL"] ?? meta.level}</Badge>
                      </div>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 pb-2">
                    {/* Keep topic actions focused on learning here; past papers
                        live together in the dedicated archive tab. */}
                    <div className="grid grid-cols-2 gap-2 px-1 pb-3 sm:grid-cols-3">
                      <Button size="sm" variant="outline" className="gap-1.5" disabled={!links} onClick={() => links && navigate(links.notes)}>
                        <FileText className="h-3.5 w-3.5" /> Notes
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1.5" disabled={!links} onClick={() => links && navigate(links.quiz)}>
                        <ClipboardList className="h-3.5 w-3.5" /> Questions
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1.5" onClick={() => navigate("/flashcards")}>
                        <Layers className="h-3.5 w-3.5" /> Flashcards
                      </Button>
                    </div>
                    {topicLessons.length > 0 && (
                      <p className="px-3 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Lessons</p>
                    )}
                    {topicLessons.map((lesson) => {
                      const dest = topicLinks[lesson.topic_id]?.notes;
                      const locked = isLockedLesson(lesson.id, openableLessons);
                      return (
                        <button
                          key={lesson.id}
                          // A locked row still does something useful: it opens the
                          // plan, like the hub's Unlock button, instead of silently
                          // rendering lesson content the account did not pay for.
                          onClick={() => (locked ? navigate("/pricing") : openLesson(lesson))}
                          disabled={openingId === lesson.id}
                          title={locked ? "One lesson in this subject and level is free — unlock the rest" : undefined}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-muted transition-colors text-left"
                        >
                          {locked ? (
                            <Lock className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                          ) : progress[lesson.id] ? (
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                          )}
                          <span className={`flex-1 ${locked ? "text-muted-foreground" : ""}`}>{lesson.title}</span>
                          {locked ? (
                            // The row already carries the lock icon as its state;
                            // the word is the action, so it does not repeat it.
                            <span className="rounded px-2 py-0.5 text-xs text-primary">Unlock</span>
                          ) : dest ? (
                            <span
                              role="link"
                              tabIndex={0}
                              onClick={(e) => { e.stopPropagation(); navigate(dest); }}
                              onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); navigate(dest); } }}
                              className="rounded px-2 py-0.5 text-xs text-primary hover:underline"
                            >
                              Notes
                            </span>
                          ) : null}
                          {openingId === lesson.id ? (
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      );
                    })}
                    {topicNotes.length > 0 && (
                      <p className="px-3 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Files & notes</p>
                    )}
                    {topicNotes.map((n) => {
                      const dest = topicLinks[n.topic_id]?.notes;
                      if (!n.file_url && !dest) return null;
                      return (
                        <button
                          key={n.id}
                          onClick={() => {
                            if (n.file_url) openSignedFile("study-materials", n.file_url).catch((e) => toast({ title: "Couldn't open this file", description: e?.message ?? "Please try again.", variant: "destructive" }));
                            else if (dest) navigate(dest);
                          }}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-muted transition-colors text-left"
                        >
                          <FileText className="h-4 w-4 text-primary shrink-0" />
                          <span className="min-w-0 flex-1 truncate">{n.title}</span>
                          <span className="text-xs text-muted-foreground">Notes</span>
                        </button>
                      );
                    })}
                    {allTopicLessons.length === 0 && (
                      <p className="text-sm text-muted-foreground px-3 py-2">No lessons in this topic yet.</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}

