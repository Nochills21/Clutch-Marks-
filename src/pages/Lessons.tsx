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
import { CheckCircle2, Circle, BookOpen, ChevronRight, Download, FileText, Loader2, ClipboardList, Archive, Layers } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { exportLessonToPdf } from "@/lib/pdfExport";
import { SEOHead } from "@/components/SEOHead";
import { openSignedFile } from "@/lib/contentFiles";
import { topicNotesPath, topicQuizPath, topicPapersPath, topicSlugOf } from "@/lib/topicUrls";
import { LEVELS, LEVEL_LABELS } from "@/lib/subjects";
import { useMySubjects } from "@/hooks/useMySubjects";
import { usePreviewSlice, PreviewLimit, usePlanAccess, FREE_PREVIEW_LIMIT } from "@/components/PreviewLimit";
import { PreviewBanner } from "@/components/PreviewBanner";
import { SubjectGate } from "@/components/SubjectGate";
import { FeedbackNudge } from "@/components/FeedbackNudge";
import { SubjectPicker } from "@/components/SubjectPicker";

export default function Lessons() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { subject, level, topic } = useParams<{ subject?: string; level?: string; topic?: string }>();
  const [topics, setTopics] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]);
  // Per-topic hub links (notes / questions / past papers) plus the badge label
  // (subject + level), so same-named topics on different levels — Nuclear
  // Physics (OL vs A2), Thermal Physics — are distinguishable in the list.
  const [topicLinks, setTopicLinks] = useState<Record<string, { notes: string; quiz: string; papers: string } | undefined>>({});
  const [topicMeta, setTopicMeta] = useState<Record<string, { subject: string; level: string }>>({});
  const topicSlugMap = useMemo(() => new Map(topics.map((t) => [t.id, topicSlugOf(t)])), [topics]);
  const { pickedIds, loaded: prefsLoaded, isAdmin, needsSubjectPick } = useMySubjects();

  // Save the open lesson as branded revision paper. The export loads the brand
  // tile and stamps the account watermark, so it is async and can fail (offline,
  // a blocked canvas) — awaited in a try/catch rather than fired into the void.
  const saveLessonPdf = async (lesson: any) => {
    try {
      await exportLessonToPdf(lesson, { owner: user?.email ?? user?.id ?? null });
      toast({ title: "Saved", description: "Your PDF is downloading." });
    } catch (e: any) {
      toast({
        title: "Couldn't build the PDF",
        description: e?.message ?? "Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const load = async () => {
      const [topicsRes, lessonsRes, notesRes, progressRes, slRes, subRes] = await Promise.all([
        supabase.from("topics").select("*").order("sort_order"),
        supabase.from("lessons").select("*").order("sort_order"),
        supabase.from("study_materials").select("id, title, file_url, topic_id").eq("material_type", "notes"),
        user ? supabase.from("lesson_progress").select("lesson_id, completed").eq("user_id", user.id) : Promise.resolve({ data: [] }),
        supabase.from("subject_levels").select("id, level, subject_id"),
        supabase.from("subjects").select("id, name, slug"),
      ]);
      const topicsList = topicsRes.data ?? [];
      setTopics(topicsList);
      setLessons(lessonsRes.data ?? []);
      setNotes(notesRes.data ?? []);
      const prog: Record<string, boolean> = {};
      (progressRes.data ?? []).forEach((p: any) => { prog[p.lesson_id] = p.completed; });
      setProgress(prog);
      // Resolve each topic's hub links (notes / questions / papers) and badge
      // label via its subject level + subject slug.
      const slMap = new Map(((slRes.data ?? []) as any[]).map((s) => [s.id, s]));
      const subMap = new Map(((subRes.data ?? []) as any[]).map((s) => [s.id, s]));
      const links: Record<string, { notes: string; quiz: string; papers: string } | undefined> = {};
      const meta: Record<string, { subject: string; level: string }> = {};
      for (const t of topicsList) {
        const sl = slMap.get((t as any).subject_level_id);
        const sub = sl ? subMap.get(sl.subject_id) : undefined;
        const slug = sub?.slug;
        if (slug && sl) {
          const lvl = sl.level.toLowerCase();
          const tslug = topicSlugOf(t);
          links[t.id] = {
            notes: topicNotesPath(slug, lvl, tslug),
            quiz: topicQuizPath(slug, lvl, tslug),
            papers: topicPapersPath(slug, lvl, tslug),
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
  }, [user]);

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

  const { loading: planLoading, isPreview, previewLimit, hasPaid } = usePlanAccess();
  const visibleTopics = useMemo(() => {
    if (isAdmin || !prefsLoaded) return topics;
    // Signed-in students are scoped to the subjects they picked. An anonymous
    // visitor has no picks, and an empty pick set would filter the whole index
    // away — they see every subject, still cut down by the free-plan slice
    // below, exactly like a student on the free plan.
    const picked = user
      ? topics.filter((t: any) => pickedIds.has((t as any).subject_level_id))
      : topics;
    if (planLoading) return picked;
    // Free plan: first 2 lessons per subject-level (preview limit)
    if (!isPreview) {
      const byLevel = new Map<string, any[]>();
      for (const t of picked) {
        const qs = lessons.filter((l: any) => l.topic_id === t.id);
        byLevel.set(t.id, qs);
      }
      const limited = new Map<string, any[]>();
      for (const [levelId, qs] of byLevel) {
        limited.set(levelId, qs.slice(0, FREE_PREVIEW_LIMIT));
      }
      return picked.filter((t) => limited.get(t.id)?.length > 0);
    }
    return picked;
  }, [topics, pickedIds, prefsLoaded, isAdmin, lessons, planLoading, isPreview, FREE_PREVIEW_LIMIT, user]);

  // Hidden lesson count for the free-plan upgrade prompt.
  const hiddenCount = useMemo(() => {
    if (isAdmin || !prefsLoaded) return 0;
    if (!isPreview) {
      let total = 0;
      for (const t of pickedIds ? topics.filter((t: any) => pickedIds.has(t.subject_level_id)) : topics) {
        total += (lessons.filter((l: any) => l.topic_id === t.id)).length;
      }
      return total;
    }
    return 0;
  }, [topics, pickedIds, lessons, isAdmin, isPreview]);

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
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedLesson.content.replace(/\n/g, "<br/>")) }} />
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
            const topicLessons = lessons.filter((l) => l.topic_id === topic.id);
            const topicNotes = notes.filter((n) => n.topic_id === topic.id);
            const completedCount = topicLessons.filter((l) => progress[l.id]).length;
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
                      <p className="text-xs text-muted-foreground">{completedCount}/{topicLessons.length} lessons</p>
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
                    {/* Topic menu: one tap to the topic's notes, questions,
                        past papers or flashcards — no hunting through rows. */}
                    <div className="grid grid-cols-2 gap-2 px-1 pb-3 sm:grid-cols-4">
                      <Button size="sm" variant="outline" className="gap-1.5" disabled={!links} onClick={() => links && navigate(links.notes)}>
                        <FileText className="h-3.5 w-3.5" /> Notes
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1.5" disabled={!links} onClick={() => links && navigate(links.quiz)}>
                        <ClipboardList className="h-3.5 w-3.5" /> Questions
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1.5" disabled={!links} onClick={() => links && navigate(links.papers)}>
                        <Archive className="h-3.5 w-3.5" /> Past papers
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
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-muted transition-colors text-left"
                        >
                          {progress[lesson.id] ? (
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                          )}
                          <span className="flex-1">{lesson.title}</span>
                          {dest && (
                            <span
                              role="link"
                              tabIndex={0}
                              onClick={(e) => { e.stopPropagation(); navigate(dest); }}
                              onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); navigate(dest); } }}
                              className="rounded px-2 py-0.5 text-xs text-primary hover:underline"
                            >
                              Notes
                            </span>
                          )}
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
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
                            if (n.file_url) openSignedFile("study-materials", n.file_url).catch((e: any) => toast({ title: "Couldn't open this file", description: e?.message ?? "Please try again.", variant: "destructive" }));
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
                    {topicLessons.length === 0 && (
                      <p className="text-sm text-muted-foreground px-3 py-2">No lessons in this topic yet.</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
      <LessonsPreviewGate hiddenCount={hiddenCount} />
    </div>
  );
}

// Shared preview-limit state for the lessons page (persisted per subject-level).
// Lesson pages apply preview limiting per subject-level. Free-plan users see
// the first FREE_PREVIEW_LIMIT lessons per level (from PreviewLimit.tsx) and
// the remainder is replaced with an upgrade prompt.
export function LessonsPreviewGate({ hiddenCount }: { hiddenCount: number }) {
  const { isPreview, loading } = usePlanAccess();
  if (loading || !isPreview || hiddenCount <= 0) return null;
  return (
    <PreviewLimit
      hiddenCount={hiddenCount}
      what="lesson"
    />
  );
}

