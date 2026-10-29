// Revision-notes library (uploaded study materials) — presented as an
// editorial reading surface: numbered entries, display-serif titles and a
// measure-limited reader, rather than a wall of identical cards.
import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEOHead } from "@/components/SEOHead";
import { useMySubjects } from "@/hooks/useMySubjects";
import { useTeacherScope } from "@/hooks/useTeacherScope";
import { SubjectGate } from "@/components/SubjectGate";
import { openProtectedFile } from "@/lib/contentFiles";
import { LEVEL_FILTER_LABELS, LEVEL_LABELS, levelLabel } from "@/lib/subjects";
import { toast } from "sonner";
import { loadFailureMessage } from "@/lib/net";
import {
  FileText, Search, Download, CheckCircle2, Circle, AlertCircle, RotateCcw, ExternalLink, Eye, Loader2, Lock,
} from "lucide-react";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { usePlanAccess } from "@/components/PreviewLimit";
import { isLockedNote, openableIdsAcrossLevels } from "@/lib/noteAccess";

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
  /** Only used to pick each level's one free note; see `lib/noteAccess`. */
  created_at?: string | null;
}

/** Material types this library surfaces, in the order the filter offers them. */
export const LIBRARY_TYPES = ["notes", "summary"] as const;

// A ceiling so the library cannot silently grow into an unbounded query.
const LIBRARY_LIMIT = 500;

/**
 * The library's shelf. Scoped server-side to the student's picked levels, and
 * without note *bodies*.
 *
 * Both halves matter. The query used to read every note and summary in the
 * estate and filter them in the browser, so a student with one level picked
 * downloaded all 340 rows — 4.4 MB of HTML bodies, 6.6 s warm and 45 s cold —
 * to render 40. `topics!inner` plus the level filter makes Postgres do the
 * narrowing (measured: 40 rows, 20 KB, 0.7 s), and dropping `content` is what
 * takes the other 4.3 MB out of the response; the reader fetches its own body
 * when a note is opened, so the list never needed it.
 *
 * Admins keep the bodies: the inline editor on each row opens with them.
 */
export async function fetchNotes(opts: { levelIds?: string[]; withContent?: boolean } = {}): Promise<NoteRow[]> {
  // Two literal selects rather than one built from a variable: the typed client
  // parses the select string at compile time, and a `columns` variable comes
  // back as a ParserError.
  const lean = () => supabase
    .from("study_materials")
    .select("id, title, file_url, material_type, topic_id, created_at, topics!inner(id, name, subject_levels(id, level, subjects(id, name)))")
    // Previously pinned to "notes", which hid every "summary" material from the
    // library — half the content was only reachable from a topic page.
    .in("material_type", LIBRARY_TYPES as unknown as string[])
    .order("title")
    .limit(LIBRARY_LIMIT);
  const full = () => supabase
    .from("study_materials")
    .select("id, title, file_url, content, material_type, topic_id, created_at, topics!inner(id, name, subject_levels(id, level, subjects(id, name)))")
    .in("material_type", LIBRARY_TYPES as unknown as string[])
    .order("title")
    .limit(LIBRARY_LIMIT);

  const levels = opts.levelIds ?? [];
  type Row = {
    id: string; title: string; file_url: string | null; content?: string | null;
    material_type: string | null; topic_id: string | null; created_at: string | null;
    topics: { name: string | null; subject_levels: { id: string; level: string; subjects: { id: string; name: string } | null } | null } | null;
  };
  let rows: Row[];
  if (opts.withContent) {
    const q = full();
    const { data, error } = await (levels.length ? q.in("topics.subject_level_id", levels) : q);
    if (error) throw error;
    rows = (data ?? []) as unknown as Row[];
  } else {
    const q = lean();
    const { data, error } = await (levels.length ? q.in("topics.subject_level_id", levels) : q);
    if (error) throw error;
    rows = (data ?? []) as unknown as Row[];
  }
  return rows.map((m) => ({
    id: m.id,
    title: m.title,
    file_url: m.file_url,
    content: m.content ?? null,
    material_type: m.material_type ?? "notes",
    topic_id: m.topic_id,
    topic_name: m.topics?.name ?? "Unassigned",
    subject_name: m.topics?.subject_levels?.subjects?.name ?? "General",
    subject_id: m.topics?.subject_levels?.subjects?.id ?? "none",
    subject_level_id: m.topics?.subject_levels?.id ?? "",
    level: m.topics?.subject_levels?.level ?? "",
    created_at: m.created_at ?? null,
  }));
}

/**
 * Notes whose *body* contains the term — the half of search the shelf can no
 * longer answer, because it no longer holds the bodies. Postgres matches them
 * and returns ids only, so a search costs a few hundred bytes instead of 4 MB.
 *
 * PostgREST's `or` syntax splits on commas and parens, so those are stripped
 * from the term rather than escaped: a note search for a bracket is not a
 * search worth sending.
 */
export async function searchNoteIds(term: string, levelIds: string[] = []): Promise<Set<string>> {
  const safe = term.trim().toLowerCase().replace(/[,()*]/g, " ").trim();
  if (safe.length < 2) return new Set();
  let query = supabase
    .from("study_materials")
    .select("id, topics!inner(subject_level_id)")
    .in("material_type", LIBRARY_TYPES as unknown as string[])
    .ilike("content", `%${safe}%`)
    .limit(LIBRARY_LIMIT);
  if (levelIds.length) query = query.in("topics.subject_level_id", levelIds);
  const { data, error } = await query;
  if (error) throw error;
  return new Set((data ?? []).map((r) => r.id));
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
        (data ?? []).forEach((r) => { map[r.material_id] = r.completed; });
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
  // Topic pages link here with ?topic=<id> so a student lands on that topic's
  // notes in one click; the chip below clears it back to the whole library.
  const [params, setParams] = useSearchParams();
  const topicFilter = params.get("topic");
  const { done, toggle } = useNoteProgress();
  // The library is scoped to the student's picked subject-levels, the same way
  // the dashboard tiles are. Without this a Mathematics + Physics student read
  // Computer Science A2 notes under a "Showing only your subjects" banner.
  const { user } = useAuth();
  const {
    pickedIds,
    loaded: prefsLoaded,
    isAdmin: isAdminRole,
    needsSubjectPick,
    filtering,
  } = useMySubjects();

  // The shelf is narrowed in the query itself, so the picks have to be known
  // first — fetching before they resolve is what made every student download
  // the whole estate. An admin (or a signed-out visitor, who has no picks)
  // fetches the library unfiltered.
  const scopeLevelIds = useMemo(
    () => (!isAdminRole && pickedIds.size > 0 ? [...pickedIds] : []),
    [isAdminRole, pickedIds],
  );
  // A stable string for dependency arrays: the array is rebuilt on every pick
  // change, and comparing arrays by identity would refetch on every render.
  const scopeKey = scopeLevelIds.join(",");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setNotes(await fetchNotes({ levelIds: scopeLevelIds, withContent: isAdminRole }));
    } catch (e) {
      setError(e.message ?? "Failed to load notes");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!prefsLoaded) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- scopeKey encodes the picks
  }, [prefsLoaded, scopeKey, isAdminRole]);

  // Bodies live on the server now, so "search inside the note" is a query, not a
  // substring test. Local title/topic matches still render instantly; the ids
  // that only the body matches arrive a moment later.
  const [bodyMatches, setBodyMatches] = useState<Set<string> | null>(null);
  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) { setBodyMatches(null); return; }
    let cancelled = false;
    const timer = window.setTimeout(() => {
      searchNoteIds(term, scopeLevelIds)
        .then((ids) => { if (!cancelled) setBodyMatches(ids); })
        // A failed body search must not break the library: titles still filter.
        .catch(() => { if (!cancelled) setBodyMatches(null); });
    }, 250);
    return () => { cancelled = true; window.clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- scopeKey encodes the picks
  }, [q, scopeKey]);

  const subjects = useMemo(() => {
    const seen = new Map<string, string>();
    notes.forEach((n) => {
      // A material with no topic carries the "General" fallback from
      // fetchNotes. That is the absence of a subject, not a subject, so it was
      // a filter option that promised a shelf which does not exist.
      if (n.subject_id === "none") return;
      seen.set(n.subject_id, n.subject_name);
    });
    return [...seen.entries()];
  }, [notes]);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return notes.filter((n) => {
      if (filtering && !pickedIds.has(n.subject_level_id)) return false;
      if (topicFilter && n.topic_id !== topicFilter) return false;
      if (subject !== "all" && n.subject_id !== subject) return false;
      // Matched on the label, because two level codes are both shown as
      // "IGCSE": filtering on the raw code made the filter show two identical
      // entries and each one hide the other code's notes.
      if (level !== "all" && levelLabel(n.level) !== level) return false;
      if (type !== "all" && n.material_type !== type) return false;
      if (!term) return true;
      // Search the body too, not just the title: students look for a term they
      // remember reading, not the note's heading. The body half is answered by
      // Postgres (`bodyMatches`); title and topic match locally and instantly.
      return (
        n.title.toLowerCase().includes(term) ||
        n.topic_name.toLowerCase().includes(term) ||
        Boolean(bodyMatches?.has(n.id))
      );
    });
  }, [notes, q, subject, level, type, filtering, pickedIds, topicFilter, bodyMatches]);
  const topicFilterName = topicFilter ? notes.find((n) => n.topic_id === topicFilter)?.topic_name : null;

  // One note per subject-level is free. Computed from the whole library, not the
  // filtered view, so searching cannot change which note is the free one.
  const { hasPaid } = usePlanAccess();
  // A teacher reads all of one subject and none of the rest, so the grant is
  // handed to the same per-level picker a free account uses.
  const teacher = useTeacherScope();
  const teacherLevels = useMemo(
    () => new Set(teacher.scope?.levelIds ?? []),
    [teacher.scope],
  );
  const openableNotes = useMemo(
    () => openableIdsAcrossLevels(notes, hasPaid, teacherLevels),
    [notes, hasPaid, teacherLevels],
  );

  const completedCount = visible.filter((n) => done[n.id]).length;
  // Subject → level → topic → title, so the library reads as a shelf of topics
  // rather than one alphabetical pile. Headers are drawn where the group changes.
  const ordered = useMemo(
    () => [...visible].sort((a, b) =>
      a.subject_name.localeCompare(b.subject_name) ||
      a.level.localeCompare(b.level) ||
      a.topic_name.localeCompare(b.topic_name) ||
      a.title.localeCompare(b.title)),
    [visible],
  );
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
  if (needsSubjectPick) {
    return (
      <div className="cm-study mx-auto max-w-4xl space-y-8">
        <SEOHead path="/notes" />
        <SubjectGate />
      </div>
    );
  }

  return (
    <div className="cm-study mx-auto max-w-4xl space-y-8">
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
            {LEVEL_FILTER_LABELS.map((label) => (
              <SelectItem key={label} value={label}>{label}</SelectItem>
            ))}
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

      {topicFilter && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-primary/25 bg-primary/5 px-4 py-2.5 text-sm">
          <span>Showing notes for <span className="font-medium">{topicFilterName ?? "this topic"}</span></span>
          <Button size="sm" variant="ghost" onClick={() => setParams({})}>Show all notes</Button>
        </div>
      )}

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
          {ordered.map((n, i) => {
            const studied = !!done[n.id];
            const locked = isLockedNote(n.id, openableNotes);
            const prev = ordered[i - 1];
            const newSubject = prev?.subject_id !== n.subject_id || prev?.level !== n.level;
            const newTopic = newSubject || prev?.topic_id !== n.topic_id;
            return (
              <Fragment key={n.id}>
              {newSubject && (
                <li className="pt-4 first:pt-0">
                  <p className="eyebrow">
                    {n.subject_name} · {LEVEL_LABELS[n.level as "OL"] ?? n.level}
                  </p>
                </li>
              )}
              {newTopic && (
                <li>
                  <h2 className="font-display text-base font-semibold tracking-tight">{n.topic_name}</h2>
                </li>
              )}
              <li>
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
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-transform hover:bg-muted"
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
                        {/* The topic is already the group heading above the entry;
                            repeating it beside a title that is usually the topic
                            name printed the same words twice in one row. */}
                        {n.topic_name !== n.title && (
                          <>
                            <span className="text-muted-foreground/30">·</span>
                            <span className="min-w-0 text-xs text-muted-foreground truncate">{n.topic_name}</span>
                          </>
                        )}
                        {n.material_type === "summary" && (
                          <Badge variant="outline" className="text-[10px] capitalize">Summary</Badge>
                        )}
                        {/* Locked entries stay listed: a free account gets one note
                            per subject and level, and the rows it cannot open are
                            what the plan is selling. */}
                        {locked && (
                          <Badge variant="outline" className="gap-1 border-dashed text-[10px] text-muted-foreground">
                            <Lock className="h-3 w-3" /> Full plan
                          </Badge>
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
                      {locked ? (
                        <Button size="sm" variant="outline" className="gap-1" asChild>
                          <Link to="/pricing" title="One note in this subject and level is free — unlock the rest">
                            <Lock className="h-3.5 w-3.5" /> Unlock
                          </Link>
                        </Button>
                      ) : (
                        // Every library row is an HTML note — the shelf no longer
                        // carries `content`, so its presence cannot decide this.
                        <Button size="sm" variant="secondary" className="gap-1" asChild>
                          <Link to={`/notes/${n.id}`}><Eye className="h-3.5 w-3.5" /> Read</Link>
                        </Button>
                      )}
                      {/* File-backed controls only appear when there is a file. Every
                          material in the library is HTML-only today, so these used to
                          render as 60 dead, unlabelled buttons per page. */}
                      {/* A locked entry offers nothing to open or download: the
                          file is the same note the card is gating. */}
                      {n.file_url && !locked && (
                        <>
                          <Button size="sm" variant="ghost" className="gap-1"
                            onClick={async () => {
                              try {
                                await openProtectedFile("study-materials", n.file_url!);
                              } catch (e) {
                                toast.error(e?.message ?? "Could not open this file");
                              }
                            }}>
                            <ExternalLink className="h-3.5 w-3.5" /> Open
                          </Button>
                          <Button size="sm" variant="ghost"
                            aria-label={`Download ${n.title}`}
                            title={`Download ${n.title}`}
                            onClick={() => downloadNote(n).catch((e) => toast.error(e?.message ?? "Could not download this file"))}>
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </li>
              </Fragment>
            );
          })}
        </ol>
      )}

      <p className="text-xs text-muted-foreground">
        Looking for a specific lesson? Open it from <Link to="/lessons" className="text-primary underline">Lessons</Link> to view its notes.
      </p>
    </div>
  );
}
