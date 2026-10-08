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
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";
import { openProtectedFile, getSignedUrl } from "@/lib/contentFiles";
import { WatermarkOverlay } from "@/components/WatermarkOverlay";
import { LEVELS, LEVEL_LABELS } from "@/lib/subjects";
import { toast } from "sonner";
import { loadFailureMessage } from "@/lib/net";
import {
  FileText, Search, Download, CheckCircle2, Circle, AlertCircle, RotateCcw, ExternalLink, Eye, Loader2,
} from "lucide-react";
import { ContentEditor } from "@/components/admin/ContentEditor";

export interface NoteRow {
  id: string;
  title: string;
  file_url: string | null;
  content: string | null;
  material_type: string;
  topic_id: string | null;
  topic_name: string;
  subject_name: string;
  subject_id: string;
  subject_level_id: string;
  level: string;
}

/** Material types this library surfaces, in the order the filter offers them. */
export const LIBRARY_TYPES = ["notes", "summary"] as const;

// A ceiling so the library cannot silently grow into an unbounded query.
const LIBRARY_LIMIT = 500;

export async function fetchNotes(): Promise<NoteRow[]> {
  const { data, error } = await supabase
    .from("study_materials")
    .select("id, title, file_url, content, material_type, topic_id, topics(id, name, subject_levels(id, level, subjects(id, name)))")
    // Previously pinned to "notes", which hid every "summary" material from the
    // library — half the content was only reachable from a topic page.
    .in("material_type", LIBRARY_TYPES as unknown as string[])
    .order("title")
    .limit(LIBRARY_LIMIT);
  if (error) throw error;
  return (data ?? []).map((m: any) => ({
    id: m.id,
    title: m.title,
    file_url: m.file_url,
    content: m.content,
    material_type: m.material_type ?? "notes",
    topic_id: m.topic_id,
    topic_name: m.topics?.name ?? "Unassigned",
    subject_name: m.topics?.subject_levels?.subjects?.name ?? "General",
    subject_id: m.topics?.subject_levels?.subjects?.id ?? "none",
    subject_level_id: m.topics?.subject_levels?.id ?? "",
    level: m.topics?.subject_levels?.level ?? "",
  }));
}

export function useNoteProgress() {
  const { user } = useAuth();
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("material_progress")
          .select("material_id, completed")
          .eq("user_id", user.id);
        // PostgREST resolves with `{ error }` rather than rejecting, so the
        // old `catch` below never fired for a failed query: the tick marks just
        // silently vanished. Say so instead.
        if (error) {
          toast.error(loadFailureMessage("your study progress", error));
          return;
        }
        const map: Record<string, boolean> = {};
        (data ?? []).forEach((r: any) => { map[r.material_id] = r.completed; });
        setDone(map);
      } catch (e) {
        // A failed progress read must not surface as an unhandled rejection;
        // the list still works, it just shows nothing as studied yet.
        console.error("Could not load note progress:", e);
      }
    })();
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
  const [type, setType] = useState("all");
  const [viewing, setViewing] = useState<NoteRow | null>(null);
  const { done, toggle } = useNoteProgress();
  // The library is scoped to the student's picked subject-levels, the same way
  // the dashboard tiles are. Without this a Mathematics + Physics student read
  // Computer Science A2 notes under a "Showing only your subjects" banner.
  const { user } = useAuth();
  const { pickedIds, loaded: prefsLoaded, isAdmin: isAdminRole } = useMySubjects();
  const scoped = !isAdminRole && prefsLoaded && pickedIds.size > 0;

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
    notes.forEach((n) => seen.set(n.subject_id, n.subject_name));
    return [...seen.entries()];
  }, [notes]);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return notes.filter((n) => {
      if (scoped && !pickedIds.has(n.subject_level_id)) return false;
      if (subject !== "all" && n.subject_id !== subject) return false;
      if (level !== "all" && n.level !== level) return false;
      if (type !== "all" && n.material_type !== type) return false;
      if (!term) return true;
      // Search the body too, not just the title: students look for a term they
      // remember reading, not the note's heading.
      const body = (n.content ?? "").replace(/<[^>]*>/g, " ").toLowerCase();
      return (
        n.title.toLowerCase().includes(term) ||
        n.topic_name.toLowerCase().includes(term) ||
        body.includes(term)
      );
    });
  }, [notes, q, subject, level, type, scoped, pickedIds]);

  const completedCount = visible.filter((n) => done[n.id]).length;
  const progressPct = visible.length ? Math.round((completedCount / visible.length) * 100) : 0;

  // Subject & level gate: students must pick at least one subject (and its
  // level) before any notes are shown. While preferences are still loading we
  // render nothing — never the content itself. Sits after every hook so the
  // early returns never change hook order.
  if (!isAdminRole && !prefsLoaded) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!isAdminRole && user && pickedIds.size === 0) {
    return (
      <div className="mx-auto max-w-4xl space-y-8">
        <SEOHead path="/notes" />
        <SubjectGate />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Only while a note is actually open. On the library list the watermark
          covered the whole viewport — sidebar, filters and every card — without
          protecting anything: the list shows titles and types, not content. */}
      {viewing && <WatermarkOverlay />}
      <SEOHead path="/notes" />

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
              : // Study ticks are per-account: promising a progress figure to a
                // visitor who has no account to record it against was a number
                // that could never move.
                !user
                ? "Sign in to track which notes you've studied"
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
            <SelectItem value="all">All subjects</SelectItem>
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
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full sm:w-[150px]" aria-label="Material type"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="notes">Notes</SelectItem>
            <SelectItem value="summary">Summaries</SelectItem>
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

                    {/* Per-account control: hidden when signed out instead of
                        rendering a toggle whose only outcome is "nothing". */}
                    {user && (
                      <button
                        onClick={() => toggle(n.id)}
                        aria-label={studied ? "Mark as not studied" : "Mark as studied"}
                        className="shrink-0 transition-transform hover:scale-110"
                      >
                        {studied
                          ? <CheckCircle2 className="h-5 w-5 text-primary" />
                          : <Circle className="h-5 w-5 text-muted-foreground/40" />}
                      </button>
                    )}

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
                        <span className="min-w-0 text-xs text-muted-foreground truncate">{n.topic_name}</span>
                        {n.material_type === "summary" && (
                          <Badge variant="outline" className="text-[10px] capitalize">Summary</Badge>
                        )}
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
                      {/* File-backed controls only appear when there is a file. Every
                          material in the library is HTML-only today, so these used to
                          render as 60 dead, unlabelled buttons per page. */}
                      {n.file_url && (
                        <>
                          <Button size="sm" variant="ghost" className="gap-1"
                            onClick={() => openProtectedFile("study-materials", n.file_url!)}>
                            <ExternalLink className="h-3.5 w-3.5" /> Open
                          </Button>
                          <Button size="sm" variant="ghost"
                            aria-label={`Download ${n.title}`}
                            title={`Download ${n.title}`}
                            onClick={() => downloadNote(n)}>
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
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
