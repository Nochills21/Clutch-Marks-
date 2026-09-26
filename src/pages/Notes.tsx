// Revision-notes library (uploaded study materials) — presented as an
// editorial reading surface: numbered entries, display-serif titles and a
// measure-limited reader, rather than a wall of identical cards.
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEOHead } from "@/components/SEOHead";
import { getRouteMeta } from "@/lib/seoRoutes";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";
import { openProtectedFile, getSignedUrl } from "@/lib/contentFiles";
import { WatermarkOverlay } from "@/components/WatermarkOverlay";
import { LEVELS, LEVEL_LABELS } from "@/lib/subjects";
import { toast } from "sonner";
import {
  FileText, Search, Download, CheckCircle2, Circle, AlertCircle, RotateCcw, ExternalLink, Eye, Loader2,
} from "lucide-react";
import { ContentEditor } from "@/components/admin/ContentEditor";

export interface NoteRow {
  id: string;
  title: string;
  file_url: string | null;
  content: string | null;
  topic_id: string | null;
  topic_name: string;
  subject_name: string;
  subject_id: string;
  level: string;
}

export async function fetchNotes(): Promise<NoteRow[]> {
  const { data, error } = await supabase
    .from("study_materials")
    .select("id, title, file_url, content, topic_id, topics(id, name, subject_levels(level, subjects(id, name)))")
    .eq("material_type", "notes")
    .order("title");
  if (error) throw error;
  return (data ?? []).map((m: any) => ({
    id: m.id,
    title: m.title,
    file_url: m.file_url,
    content: m.content,
    topic_id: m.topic_id,
    topic_name: m.topics?.name ?? "Unassigned",
    subject_name: m.topics?.subject_levels?.subjects?.name ?? "General",
    subject_id: m.topics?.subject_levels?.subjects?.id ?? "none",
    level: m.topics?.subject_levels?.level ?? "",
  }));
}

export function useNoteProgress() {
  const { user } = useAuth();
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user) return;
    supabase
      .from("material_progress")
      .select("material_id, completed")
      .eq("user_id", user.id)
      .then(({ data }) => {
        const map: Record<string, boolean> = {};
        (data ?? []).forEach((r: any) => { map[r.material_id] = r.completed; });
        setDone(map);
      });
  }, [user]);

  const toggle = async (materialId: string) => {
    if (!user) return;
    const next = !done[materialId];
    setDone((d) => ({ ...d, [materialId]: next }));
    const { error } = await supabase.from("material_progress").upsert(
      {
        user_id: user.id,
        material_id: materialId,
        completed: next,
        completed_at: next ? new Date().toISOString() : null,
      },
      { onConflict: "user_id,material_id" },
    );
    if (error) {
      setDone((d) => ({ ...d, [materialId]: !next }));
      toast.error("Could not save progress");
    }
  };

  return { done, toggle };
}

export async function downloadNote(note: NoteRow) {
  if (!note.file_url) return;
  // Protected download: same watermarked bytes via serve-material.
  await openProtectedFile("study-materials", note.file_url, note.title);
}

export default function Notes() {
  const { role } = useAuth();
  const [notes, setNotes] = useState<NoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("all");
  const [level, setLevel] = useState("all");
  const [viewing, setViewing] = useState<NoteRow | null>(null);
  const { done, toggle } = useNoteProgress();
  const { pickedIds, loaded: prefsLoaded, isAdmin: isAdminRole } = useMySubjects();

  // Subject scoping from "My subjects": students only see notes whose
  // (subject, level) pair matches one of their picked subject_levels. Admins
  // and guests (mySL === null) see everything. `mySL` holds "subjectId|level"
  // keys for the picked pairs.
  const [mySL, setMySL] = useState<Set<string> | null>(null);
  useEffect(() => {
    if (isAdminRole || !prefsLoaded || pickedIds.size === 0) { setMySL(null); return; }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("subject_levels")
        .select("id, subject_id, level")
        .in("id", [...pickedIds]);
      if (cancelled) return;
      setMySL(new Set((data ?? []).map((sl: any) => `${sl.subject_id}|${sl.level}`)));
    })();
    return () => { cancelled = true; };
  }, [isAdminRole, prefsLoaded, pickedIds]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setNotes(await fetchNotes());
    } catch (e: any) {
      setError(e.message ?? "Failed to load notes");
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const subjects = useMemo(() => {
    const seen = new Map<string, string>();
    notes.forEach((n) => {
      if (mySL && !mySL.has(`${n.subject_id}|${n.level}`)) return;
      seen.set(n.subject_id, n.subject_name);
    });
    return [...seen.entries()];
  }, [notes, mySL]);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return notes.filter((n) =>
      (!mySL || mySL.has(`${n.subject_id}|${n.level}`)) &&
      (subject === "all" || n.subject_id === subject) &&
      (level === "all" || n.level === level) &&
      (!term || n.title.toLowerCase().includes(term) || n.topic_name.toLowerCase().includes(term)));
  }, [notes, q, subject, level, mySL]);

  const completedCount = visible.filter((n) => done[n.id]).length;
  const progressPct = visible.length ? Math.round((completedCount / visible.length) * 100) : 0;

  // Subject & level gate: students must pick at least one subject (and its
  // level) before any notes are shown, and only their picked subjects render.
  // While preferences — or the picked subject_levels lookup — are still
  // loading we render nothing — never the content itself. Sits after every
  // hook so the early returns never change hook order.
  if (!isAdminRole && (!prefsLoaded || (pickedIds.size > 0 && !mySL))) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!isAdminRole && pickedIds.size === 0) {
    return (
      <div className="mx-auto max-w-4xl space-y-8">
        <SEOHead
          title="Revision Notes — Clutch Marks"
          description="Search and filter uploaded topic notes by subject, level and keyword, then open, download and track what you've studied."
          path="/notes"
        />
        <SubjectGate />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <WatermarkOverlay />
      <SEOHead
        title="Revision Notes — Clutch Marks"
        description="Search and filter uploaded topic notes by subject, level and keyword, then open, download and track what you've studied."
        path="/notes"
        jsonLd={getRouteMeta("/notes")?.jsonLd}
      />

      {/* ---------- masthead ---------- */}
      <header>
        <p className="eyebrow mb-3 flex items-center gap-2">
          <FileText className="h-3.5 w-3.5 text-primary" /> The library
        </p>
        <h1 className="display-xl text-3xl lg:text-4xl">Revision notes</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {loading
            ? "Loading notes…"
            : visible.length === 0
              ? "No notes in this view"
              : `${completedCount} of ${visible.length} marked as studied — ${progressPct}% of this set`}
        </p>
        <hr className="rule-gold mt-6" />
      </header>

      {/* ---------- filters ---------- */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes or topic keywords…"
            className="pl-9"
            aria-label="Search notes"
          />
        </div>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Subject" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{mySL ? "All my subjects" : "All subjects"}</SelectItem>
            {subjects.map(([id, name]) => <SelectItem key={id} value={id}>{name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Level" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            {LEVELS.map((l) => <SelectItem key={l} value={l}>{LEVEL_LABELS[l]}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <Card className="border-destructive/40">
          <CardContent className="flex items-center justify-between gap-3 p-4">
            <p className="text-sm text-destructive flex items-center gap-2"><AlertCircle className="h-4 w-4" /> {error}</p>
            <Button size="sm" variant="outline" onClick={load} className="gap-1"><RotateCcw className="h-3.5 w-3.5" /> Try again</Button>
          </CardContent>
        </Card>
      )}

      {/* ---------- entries ---------- */}
      {loading ? (
        <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
      ) : visible.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-14">
            <FileText className="h-9 w-9 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">No notes match your search.</p>
          </CardContent>
        </Card>
      ) : (
        <ol className="space-y-3">
          {visible.map((n, i) => {
            const studied = !!done[n.id];
            return (
              <li key={n.id}>
                <Card
                  className={`group relative overflow-hidden transition-colors ${studied ? "border-primary/25" : ""}`}
                >
                  {/* gold rail marks the entry as studied */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0 h-full w-[2px] transition-opacity ${studied ? "bg-primary opacity-100" : "opacity-0"}`}
                  />
                  <CardContent className="flex flex-wrap items-center gap-4 p-5">
                    <span className="num hidden w-7 shrink-0 font-mono text-xs text-muted-foreground/50 sm:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <button
                      onClick={() => toggle(n.id)}
                      aria-label={studied ? "Mark as not studied" : "Mark as studied"}
                      className="shrink-0 transition-transform hover:scale-110"
                    >
                      {studied
                        ? <CheckCircle2 className="h-5 w-5 text-primary" />
                        : <Circle className="h-5 w-5 text-muted-foreground/40" />}
                    </button>

                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[15px] font-semibold leading-snug tracking-tight">
                        {n.title}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="eyebrow">{n.subject_name}</span>
                        {n.level && (
                          <>
                            <span className="text-muted-foreground/30">·</span>
                            <span className="eyebrow">{LEVEL_LABELS[n.level as "OL"] ?? n.level}</span>
                          </>
                        )}
                        <span className="text-muted-foreground/30">·</span>
                        <span className="text-xs text-muted-foreground truncate">{n.topic_name}</span>
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      {role === "admin" && (
                        <ContentEditor
                          entityType="material"
                          entityId={n.id}
                          initialTitle={n.title}
                          initialContent={n.content ?? null}
                          onSaved={load}
                        />
                      )}
                      {n.content && (
                        <Button size="sm" variant="secondary" className="gap-1" onClick={() => setViewing(n)}>
                          <Eye className="h-3.5 w-3.5" /> Read
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="gap-1" disabled={!n.file_url}
                        onClick={() => n.file_url && openProtectedFile("study-materials", n.file_url)}>
                        <ExternalLink className="h-3.5 w-3.5" /> Open
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-1" disabled={!n.file_url}
                        onClick={() => downloadNote(n)}>
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ol>
      )}

      {/* ---------- reader ---------- */}
      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="text-left">
            <p className="eyebrow mb-1">
              {viewing ? `${viewing.subject_name}${viewing.level ? ` · ${LEVEL_LABELS[viewing.level as "OL"] ?? viewing.level}` : ""}` : ""}
            </p>
            <DialogTitle className="font-display text-2xl font-semibold tracking-tight">
              {viewing?.title}
            </DialogTitle>
            <DialogDescription>{viewing?.topic_name}</DialogDescription>
            <hr className="rule-gold mt-3" />
          </DialogHeader>
          <div className="prose-elegant pt-1">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize((viewing?.content ?? "").replace(/\n/g, "<br/>")),
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      <p className="text-xs text-muted-foreground">
        Looking for a specific lesson? Open it from <Link to="/lessons" className="text-primary underline">Lessons</Link> to view its notes.
      </p>
    </div>
  );
}
