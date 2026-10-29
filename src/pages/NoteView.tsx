// Reader page for a single study material. Notes are stored as HTML, so they
// must render as a page (with the same manuscript design as the topic and
// lesson notes), not as a file download or a dialog.
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { PreviewBanner } from "@/components/PreviewBanner";
import { WatermarkOverlay } from "@/components/WatermarkOverlay";
import { ManuscriptHead, ManuscriptSection } from "@/components/StudyManuscript";
import { QueryError } from "@/components/QueryError";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth";
import { exportLessonToPdf } from "@/lib/pdfExport";
import { LEVEL_LABELS } from "@/lib/subjects";
import { materialContentToHtml } from "@/lib/objectiveTeach";
import { applyMathHtml } from "@/lib/mathText";
import { topicNotesPath, topicSlugOf } from "@/lib/topicUrls";
import { fetchOpenableNoteIdsForLevel, isLockedNote } from "@/lib/noteAccess";
import { usePlanAccess } from "@/hooks/useSubscription";
import { ArrowLeft, Download, Lock, Sparkles } from "lucide-react";

interface MaterialPage {
  id: string;
  title: string;
  content: string | null;
  topics: {
    id: string;
    name: string;
    slug: string | null;
    subject_levels: {
      id: string;
      level: string;
      subjects: { name: string; slug: string } | null;
    } | null;
  } | null;
}

export default function NoteView() {
  const { materialId } = useParams();
  const { failure, report } = useLoadFailure("this note");
  const { user } = useAuth();
  const { toast } = useToast();
  const [material, setMaterial] = useState<MaterialPage | null>(null);
  const [loading, setLoading] = useState(true);
  // One note per subject-level is free; this page is also reachable by direct
  // URL, so the lock has to be decided here too or a shared link sidesteps the
  // subject hub. `null` means "not resolved" and locks nothing.
  const { hasPaid } = usePlanAccess();
  const [openableNotes, setOpenableNotes] = useState<Set<string> | null>(null);

  useEffect(() => {
    if (!materialId) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("study_materials")
        .select("id, title, content, topics(id, name, slug, subject_levels(id, level, subjects(name, slug)))")
        .eq("id", materialId)
        .maybeSingle();
      if (cancelled) return;
      if (error) report(error);
      setMaterial((data as unknown as MaterialPage) ?? null);
      setLoading(false);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [materialId, report]);

  useEffect(() => {
    const levelId = material?.topics?.subject_levels?.id;
    if (hasPaid || !levelId) { setOpenableNotes(null); return; }
    let cancelled = false;
    fetchOpenableNoteIdsForLevel(levelId, false).then((ids) => {
      if (!cancelled) setOpenableNotes(ids);
    });
    return () => { cancelled = true; };
  }, [hasPaid, material?.id, material?.topics?.subject_levels?.id]);

  if (loading) {
    return <div className="space-y-3"><Skeleton className="h-10 w-48" /><Skeleton className="h-40 rounded-xl" /></div>;
  }

  if (failure) {
    return (
      <div className="space-y-4">
        <SEOHead title="Notes — Clutch Marks" description="Revision notes on Clutch Marks." path={`/notes/${materialId}`} />
        <QueryError message={failure} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  if (!material || !material.content) {
    return (
      <Card><CardContent className="py-12 text-center space-y-3">
        <p className="text-muted-foreground">Note not found.</p>
        <Button variant="outline" asChild><Link to="/notes">Back to Notes</Link></Button>
      </CardContent></Card>
    );
  }

  const topic = material.topics;
  const subject = topic?.subject_levels?.subjects ?? null;
  const level = topic?.subject_levels?.level ?? "";
  const levelLabel = level ? (LEVEL_LABELS[level as "OL"] ?? level) : "";
  const topicHref = topic && subject && level ? topicNotesPath(subject.slug, level, topicSlugOf(topic)) : null;

  // A free account reads one note per subject-level. Reaching a locked note by
  // direct URL lands here, so the page offers the upgrade rather than the body
  // the listing page refused to open.
  if (isLockedNote(material.id, openableNotes)) {
    return (
      <div className="cm-study space-y-5">
        <SEOHead
          title={`${material.title} — Notes | Clutch Marks`}
          description={`Revision notes on ${topic?.name ?? "this topic"} for Cambridge IGCSE and A Level study.`}
          path={`/notes/${material.id}`}
        />
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/notes"><ArrowLeft className="h-4 w-4" /> Back to Notes</Link>
        </Button>
        <ManuscriptHead
          eyebrow={subject ? `${subject.name}${levelLabel ? ` · ${levelLabel}` : ""}` : "Notes"}
          title={material.title}
          lede={topic?.name ? `Topic · ${topic.name}` : null}
        />
        <Card className="neon-border border-dashed">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-1 font-semibold">This note is part of the full plan</h3>
            <p className="mb-5 max-w-md text-sm text-muted-foreground">
              A free account reads one note in each subject and level — {subject?.name ?? "this subject"}{" "}
              {levelLabel} has its free note open elsewhere. The full plan unlocks every note, summary,
              quiz and past paper.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button asChild size="sm" className="gap-2 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground">
                <Link to="/pricing"><Sparkles className="h-4 w-4" /> Unlock all notes</Link>
              </Button>
              {topicHref && (
                <Button asChild size="sm" variant="outline" className="gap-2">
                  <Link to={topicHref}>Back to this topic</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sanitise first, then typeset: the notes store maths as `\( ... \)` in the
  // same corpus the questions use, and KaTeX's output is generated locally from
  // that TeX, so it must not be run through the sanitizer.
  const html = applyMathHtml(DOMPurify.sanitize(materialContentToHtml(material.content)));

  // Same branded PDF as a lesson: the export stamps the account watermark on
  // every page, so a downloaded copy always names who took it.
  const saveNotePdf = async () => {
    try {
      await exportLessonToPdf(
        {
          title: material.title,
          content: materialContentToHtml(material.content ?? ""),
          subject: subject?.name ?? null,
          level: levelLabel || null,
        },
        { owner: user?.email ?? user?.id ?? null },
      );
      toast({ title: "Saved", description: "Your PDF is downloading." });
    } catch (e) {
      toast({
        title: "Couldn't build the PDF",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="cm-study space-y-5">
      <PreviewBanner />
      <WatermarkOverlay />
      <SEOHead
        title={`${material.title} — Notes | Clutch Marks`}
        description={`Revision notes on ${topic?.name ?? "this topic"} for Cambridge IGCSE and A Level study.`}
        path={`/notes/${material.id}`}
      />

      <Button variant="ghost" asChild className="gap-2">
        <Link to="/notes"><ArrowLeft className="h-4 w-4" /> Back to Notes</Link>
      </Button>

      <ManuscriptHead
        eyebrow={subject ? `${subject.name}${levelLabel ? ` · ${levelLabel}` : ""}` : "Notes"}
        title={material.title}
        lede={topic?.name ? `Topic · ${topic.name}` : null}
        actions={
          <>
            {topicHref && (
              <Button variant="outline" asChild className="gap-2">
                <Link to={topicHref}>Open topic</Link>
              </Button>
            )}
            <Button variant="outline" className="gap-2" onClick={saveNotePdf}>
              <Download className="h-4 w-4" /> Save as PDF
            </Button>
          </>
        }
      />

      <ManuscriptSection eyebrow="Notes">
        <div className="cm-notes" dangerouslySetInnerHTML={{ __html: html }} />
      </ManuscriptSection>
    </div>
  );
}
