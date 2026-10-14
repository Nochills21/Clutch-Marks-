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
import { topicNotesPath, topicSlugOf } from "@/lib/topicUrls";
import { ArrowLeft, Download } from "lucide-react";

interface MaterialPage {
  id: string;
  title: string;
  content: string | null;
  topics: {
    id: string;
    name: string;
    slug: string | null;
    subject_levels: {
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

  useEffect(() => {
    if (!materialId) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("study_materials")
        .select("id, title, content, topics(id, name, slug, subject_levels(level, subjects(name, slug)))")
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
  const html = DOMPurify.sanitize(materialContentToHtml(material.content));

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
