// Per-lesson notes view.
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { openProtectedFile } from "@/lib/contentFiles";
import { toast } from "sonner";
import { PreviewBanner } from "@/components/PreviewBanner";
import { SITE_URL } from "@/lib/seoRoutes";
import { WatermarkOverlay } from "@/components/WatermarkOverlay";
import { useNoteProgress, downloadNote, type NoteRow } from "./Notes";
import { FeedbackNudge } from "@/components/FeedbackNudge";
import { LEVEL_LABELS } from "@/lib/subjects";
import { Download, ExternalLink, CheckCircle2, Circle, ArrowLeft, Pencil } from "lucide-react";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { ManuscriptHead, ManuscriptSection } from "@/components/StudyManuscript";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";
import { QueryError } from "@/components/QueryError";
import { useLoadFailure } from "@/hooks/useLoadFailure";

export default function LessonNotes() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const { failure, report } = useLoadFailure("this lesson");
  const [reloadKey, setReloadKey] = useState(0);
  const bump = () => setReloadKey((k) => k + 1);
  const [lesson, setLesson] = useState<any>(null);
  const [notes, setNotes] = useState<NoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [lessonDone, setLessonDone] = useState(false);
  const { done, toggle } = useNoteProgress();
  const { pickedIds, loaded: prefsLoaded, isAdmin: isAdminRole, needsSubjectPick } = useMySubjects();

  useEffect(() => {
    if (!lessonId) return;
    const load = async () => {
      setLoading(true);
      const { data: l, error: lessonError } = await supabase
        .from("lessons")
        .select("id, title, content, topic_id, topics(name, subject_levels(id, level, subjects(name, slug)))")
        .eq("id", lessonId)
        .maybeSingle();
      // Report before bailing, and always settle `loading` — returning here
      // with the spinner still on left the page stuck.
      if (lessonError) { report(lessonError); setLoading(false); return; }
      setLesson(l);
      if (l?.topic_id) {
        const { data, error: notesError } = await supabase
          .from("study_materials")
          .select("id, title, file_url, content, topic_id")
          .eq("material_type", "notes")
          .eq("topic_id", l.topic_id)
          .order("title");
        if (notesError) { report(notesError); setLoading(false); return; }
        const t: any = l as any;
        setNotes((data ?? []).map((m: any) => ({
          id: m.id,
          title: m.title,
          file_url: m.file_url,
          content: m.content,
          material_type: m.material_type ?? "notes",
          topic_id: m.topic_id,
          topic_name: t.topics?.name ?? "",
          subject_name: t.topics?.subject_levels?.subjects?.name ?? "",
          subject_id: "",
          subject_level_id: t.topics?.subject_levels?.id ?? "",
          level: t.topics?.subject_levels?.level ?? "",
        })));
      }
      if (user) {
        const { data: p, error: progressError } = await supabase
          .from("lesson_progress")
          .select("completed")
          .eq("user_id", user.id)
          .eq("lesson_id", lessonId)
          .maybeSingle();
        if (progressError) { report(progressError); setLoading(false); return; }
        setLessonDone(!!p?.completed);
      }
      setLoading(false);
    };
    load();
  }, [lessonId, user, reloadKey, report]);

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

  if (!isAdminRole && !prefsLoaded) {
    return (
      <div className="flex justify-center py-24">
        <div className="h-8 w-8 rounded-full border-primary/30 border animate-spin" />
      </div>
    );
  }
  // "Does this reader still have to pick subjects?" is asked in one place.
  if (needsSubjectPick) {
    return (
      <div className="space-y-6">
        <SEOHead title="Lesson Notes — Clutch Marks" description="View and download the uploaded notes for this lesson." path={`/lessons/${lessonId}/notes`} />
        <SubjectGate />
      </div>
    );
  }

  if (loading) {
    return <div className="space-y-3"><Skeleton className="h-10 w-48" /><Skeleton className="h-40 rounded-xl" /></div>;
  }

  if (failure) {
    return (
      <div className="space-y-4">
        <SEOHead title="Lesson Notes — Clutch Marks" description="View and download the uploaded notes for this lesson." path={`/lessons/${lessonId}/notes`} />
        <QueryError message={failure} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  if (!lesson) {
    return (
      <Card><CardContent className="py-12 text-center space-y-3">
        <p className="text-muted-foreground">Lesson not found.</p>
        <Button variant="outline" onClick={() => navigate("/lessons")}>Back to Lessons</Button>
      </CardContent></Card>
    );
  }

  // Students only see lessons belonging to a subject-level they picked.
  const lessonSlId = lesson?.topics?.subject_levels?.id;
  if (!isAdminRole && prefsLoaded && lessonSlId && !pickedIds.has(lessonSlId)) {
    return (
      <Card><CardContent className="py-12 text-center space-y-3">
        <p className="text-muted-foreground">You haven't selected this subject yet.</p>
        <Button variant="outline" onClick={() => navigate("/lessons")}>Back to Lessons</Button>
      </CardContent></Card>
    );
  }

  const level = lesson.topics?.subject_levels?.level;

  return (
    <div className="cm-study space-y-5">
      <PreviewBanner />
      <WatermarkOverlay />
      <SEOHead
        title={`${lesson.title} — Notes | Clutch Marks`}
        description="View and download the uploaded notes for this lesson and track your completion."
        path={`/lessons/${lessonId}/notes`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: `${lesson.title} — Notes`,
          url: `${SITE_URL}/lessons/${lessonId}/notes`,
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
            url: `${SITE_URL}/`,
          },
        }}
      />

      <Button variant="ghost" asChild className="gap-2"><Link to="/lessons"><ArrowLeft className="h-4 w-4" /> Back to Lessons</Link></Button>

      <ManuscriptHead
        eyebrow={
          lesson.topics?.subject_levels?.subjects?.name
            ? `${lesson.topics.subject_levels.subjects.name}${level ? ` · ${LEVEL_LABELS[level as "OL"] ?? level}` : ""}`
            : "Lesson notes"
        }
        title={lesson.title}
        lede={lesson.topics?.name ? `Lesson · ${lesson.topics.name}` : null}
        actions={
          <>
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
          </>
        }
      />

      {role === "admin" && lesson.content && (
        <ManuscriptSection
          eyebrow="Lesson notes"
          actions={
            <ContentEditor
              entityType="lesson"
              entityId={lesson.id}
              initialTitle={lesson.title}
              initialContent={lesson.content}
              onSaved={bump}
            />
          }
        >
          <div
            className="cm-notes"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </ManuscriptSection>
      )}

      {lessonDone && <FeedbackNudge tool="notes" toolLabel={lesson.title} />}

      <ManuscriptSection eyebrow="Study materials" title="Uploaded notes">
        <div className="space-y-3">
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notes have been uploaded for this topic yet.</p>
          ) : notes.map((n) => (
            <div key={n.id} className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
              <button onClick={() => toggle(n.id)} aria-label={done[n.id] ? "Mark as not studied" : "Mark as studied"} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md hover:bg-muted">
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
                  onClick={async () => {
                    if (!n.file_url) return;
                    try {
                      await openProtectedFile("study-materials", n.file_url);
                    } catch (e: any) {
                      toast.error(e?.message ?? "Could not open this file");
                    }
                  }}>
                  <ExternalLink className="h-3.5 w-3.5" /> Open
                </Button>
                <Button size="sm" variant="ghost" className="gap-1" disabled={!n.file_url}
                  onClick={() => downloadNote(n).catch((e: any) => toast.error(e?.message ?? "Could not download this file"))}>
                  <Download className="h-3.5 w-3.5" /> Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ManuscriptSection>

    </div>
  );
}
