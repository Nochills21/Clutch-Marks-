import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, BookOpen, ChevronRight, Download, FileText } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { exportLessonToPdf } from "@/lib/pdfExport";
import { SEOHead } from "@/components/SEOHead";
import { openSignedFile } from "@/lib/contentFiles";
import { topicNotesPath, slugifyTopicName } from "@/lib/topicUrls";
import { LEVELS, LEVEL_LABELS } from "@/lib/subjects";

export default function Lessons() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { subject, level, topic } = useParams<{ subject?: string; level?: string; topic?: string }>();
  const [topics, setTopics] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [topicPaths, setTopicPaths] = useState<Record<string, string | undefined>>({});
  const topicSlugMap = useMemo(() => new Map(topics.map((t) => [t.id, slugifyTopicName(t.name)])), [topics]);

  useEffect(() => {
    const load = async () => {
      const [topicsRes, lessonsRes, notesRes, progressRes, slRes, subRes] = await Promise.all([
        supabase.from("topics").select("*").order("sort_order"),
        supabase.from("lessons").select("*").order("sort_order"),
        supabase.from("study_materials").select("id, title, file_url, topic_id").eq("material_type", "notes"),
        user ? supabase.from("lesson_progress").select("lesson_id, completed").eq("user_id", user.id) : Promise.resolve({ data: [] }),
        supabase.from("subject_levels").select("id, level, subject_id"),
        supabase.from("subjects").select("id, slug"),
      ]);
      const topicsList = topicsRes.data ?? [];
      setTopics(topicsList);
      setLessons(lessonsRes.data ?? []);
      setNotes(notesRes.data ?? []);
      const prog: Record<string, boolean> = {};
      (progressRes.data ?? []).forEach((p: any) => { prog[p.lesson_id] = p.completed; });
      setProgress(prog);
      // Resolve each topic's SEO-friendly notes path via its subject level + subject slug.
      const slMap = new Map(((slRes.data ?? []) as any[]).map((s) => [s.id, s]));
      const subMap = new Map(((subRes.data ?? []) as any[]).map((s) => [s.id, s.slug]));
      const paths: Record<string, string | undefined> = {};
      for (const t of topicsList) {
        const sl = slMap.get((t as any).subject_level_id);
        const slug = sl ? subMap.get(sl.subject_id) : undefined;
        paths[t.id] = slug && sl ? topicNotesPath(slug, sl.level.toLowerCase(), slugifyTopicName(t.name)) : undefined;
      }
      setTopicPaths(paths);
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

  if (selectedLesson) {
    return (
      <div className="space-y-4">
        <SEOHead title="Lesson — Clutch Marks" description="Browse structured lessons covering the full syllabus with video and text content." path="/lessons" />
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
              <Button variant="outline" className="gap-2" onClick={() => exportLessonToPdf(selectedLesson)}>
                <Download className="h-4 w-4" /> Save as PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SEOHead title="Lessons — Clutch Marks" description="Browse structured lessons covering the full syllabus with video and text content." path="/lessons" />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Lessons</h1>
        <p className="text-muted-foreground">Structured lessons and notes by topic</p>
      </div>

      {topics.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No topics available yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="multiple" className="space-y-3">
          {topics.map((topic) => {
            const topicLessons = lessons.filter((l) => l.topic_id === topic.id);
            const completedCount = topicLessons.filter((l) => progress[l.id]).length;
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
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 pb-2">
                    {topicLessons.map((lesson) => {
                      const dest = topicPaths[lesson.topic_id];
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
                    {notes.filter((n) => n.topic_id === topic.id).map((n) => {
                      const dest = topicPaths[n.topic_id];
                      if (!n.file_url && !dest) return null;
                      return (
                        <button
                          key={n.id}
                          onClick={() => (n.file_url ? openSignedFile("study-materials", n.file_url) : dest && navigate(dest))}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-muted transition-colors text-left"
                        >
                          <FileText className="h-4 w-4 text-primary shrink-0" />
                          <span className="flex-1 truncate">{n.title}</span>
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
    </div>
  );
}
