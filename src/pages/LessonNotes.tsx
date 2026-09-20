import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { openSignedFile } from "@/lib/contentFiles";
import { useNoteProgress, downloadNote, type NoteRow } from "@/pages/Notes";
import { LEVEL_LABELS } from "@/lib/subjects";
import { FileText, Download, ExternalLink, CheckCircle2, Circle, ArrowLeft, Pencil } from "lucide-react";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function LessonNotes() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [reloadKey, setReloadKey] = useState(0);
  const bump = () => setReloadKey((k) => k + 1);
  const [lesson, setLesson] = useState<any>(null);
  const [notes, setNotes] = useState<NoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [lessonDone, setLessonDone] = useState(false);
  const { done, toggle } = useNoteProgress();

  useEffect(() => {
    if (!lessonId) return;
    const load = async () => {
      setLoading(true);
      const { data: l } = await supabase
        .from("lessons")
        .select("id, title, content, topic_id, topics(name, subject_levels(level, subjects(name, slug)))")
        .eq("id", lessonId)
        .maybeSingle();
      setLesson(l);
      if (l?.topic_id) {
        const { data } = await supabase
          .from("study_materials")
          .select("id, title, file_url, content, topic_id")
          .eq("material_type", "notes")
          .eq("topic_id", l.topic_id)
          .order("title");
        const t: any = l as any;
        setNotes((data ?? []).map((m: any) => ({
          id: m.id,
          title: m.title,
          file_url: m.file_url,
          content: m.content,
          topic_id: m.topic_id,
          topic_name: t.topics?.name ?? "",
          subject_name: t.topics?.subject_levels?.subjects?.name ?? "",
          subject_id: "",
          level: t.topics?.subject_levels?.level ?? "",
        })));
      }
      if (user) {
        const { data: p } = await supabase
          .from("lesson_progress")
          .select("completed")
          .eq("user_id", user.id)
          .eq("lesson_id", lessonId)
          .maybeSingle();
        setLessonDone(!!p?.completed);
      }
      setLoading(false);
    };
    load();
  }, [lessonId, user, reloadKey]);

  const toggleLesson = async () => {
    if (!user || !lessonId) return;
    const next = !lessonDone;
    setLessonDone(next);
    if (next) {
      await supabase.from("lesson_progress").upsert({
        user_id: user.id, lesson_id: lessonId, completed: true, completed_at: new Date().toISOString(),
      });
    } else {
      await supabase.from("lesson_progress").delete().eq("user_id", user.id).eq("lesson_id", lessonId);
    }
  };

  if (loading) {
    return <div className="space-y-3"><Skeleton className="h-10 w-48" /><Skeleton className="h-40 rounded-xl" /></div>;
  }

  if (!lesson) {
    return (
      <Card><CardContent className="py-12 text-center space-y-3">
        <p className="text-muted-foreground">Lesson not found.</p>
        <Button variant="outline" onClick={() => navigate("/lessons")}>Back to Lessons</Button>
      </CardContent></Card>
    );
  }

  const level = lesson.topics?.subject_levels?.level;

  return (
    <div className="space-y-5">
      <SEOHead
        title={`${lesson.title} — Notes | Clutch Marks`}
        description="View and download the uploaded notes for this lesson and track your completion."
        path={`/lessons/${lessonId}/notes`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: `${lesson.title} — Notes`,
          url: `https://clutch-marks.lovable.app/lessons/${lessonId}/notes`,
          learningResourceType: "Lesson notes",
          educationalLevel:
            (level && (LEVEL_LABELS[level as "OL"] ?? level)) || undefined,
          about: lesson.topics?.name
            ? { "@type": "Thing", name: lesson.topics.name }
            : undefined,
          inLanguage: "en",
          provider: {
            "@type": "EducationalOrganization",
            name: "Clutch Marks",
            url: "https://clutch-marks.lovable.app/",
          },
        }}
      />

      <Button variant="ghost" asChild className="gap-2"><Link to="/lessons"><ArrowLeft className="h-4 w-4" /> Back to Lessons</Link></Button>

      {role === "admin" && lesson.content && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between gap-2">
              <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> Lesson notes</span>
              <ContentEditor
                entityType="lesson"
                entityId={lesson.id}
                initialTitle={lesson.title}
                initialContent={lesson.content}
                onSaved={bump}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="text-sm leading-relaxed [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mt-3 [&_h3]:font-semibold [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-muted [&_pre]:p-3 [&_table]:w-full [&_table]:border"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{lesson.title}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {lesson.topics?.subject_levels?.subjects?.name && (
              <Badge variant="secondary" className="text-[10px]">{lesson.topics.subject_levels.subjects.name}</Badge>
            )}
            {level && <Badge variant="outline" className="text-[10px]">{LEVEL_LABELS[level as "OL"] ?? level}</Badge>}
            <span className="text-xs text-muted-foreground">{lesson.topics?.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <ContentEditor
              entityType="lesson"
              entityId={lesson.id}
              initialTitle={lesson.title}
              initialContent={lesson.content ?? null}
              onSaved={bump}
              trigger={
                <Button variant="outline" className="gap-2">
                  <Pencil className="h-4 w-4" /> Edit lesson
                </Button>
              }
            />
          )}
          <Button onClick={toggleLesson} variant={lessonDone ? "outline" : "default"} className="gap-2">
            {lessonDone ? <><CheckCircle2 className="h-4 w-4" /> Completed</> : "Mark lesson complete"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> Uploaded notes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notes have been uploaded for this topic yet.</p>
          ) : notes.map((n) => (
            <div key={n.id} className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
              <button onClick={() => toggle(n.id)} aria-label={done[n.id] ? "Mark as not studied" : "Mark as studied"} className="shrink-0">
                {done[n.id] ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
              </button>
              <p className="min-w-0 flex-1 truncate text-sm font-medium">{n.title}</p>
              <div className="flex gap-2">
                {role === "admin" && (
                  <ContentEditor
                    entityType="material"
                    entityId={n.id}
                    initialTitle={n.title}
                    initialContent={n.content ?? null}
                    onSaved={bump}
                  />
                )}
                <Button size="sm" variant="outline" className="gap-1" disabled={!n.file_url}
                  onClick={() => n.file_url && openSignedFile("study-materials", n.file_url)}>
                  <ExternalLink className="h-3.5 w-3.5" /> Open
                </Button>
                <Button size="sm" variant="ghost" className="gap-1" disabled={!n.file_url} onClick={() => downloadNote(n)}>
                  <Download className="h-3.5 w-3.5" /> Download
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
