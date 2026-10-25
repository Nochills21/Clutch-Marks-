// Global search palette — ⌘K / Ctrl+K (or "/") from any page.
//
// The catalogue is ~200 topics across 17 subject-levels, and until now the only
// way to reach one was the sidebar → Subjects → hub → topic → a tab. This jumps
// straight to a topic's notes, its questions or its papers, from wherever the
// reader is.
//
// Three deliberate choices:
//  * The Supabase client is imported *inside* the loader. AppLayout renders for
//    signed-out visitors on the public study pages, and the shell's whole point
//    (see authBootstrap.ts) is that those visitors never download
//    @supabase/supabase-js. Opening the palette is what pulls it in.
//  * `shouldFilter={false}`: matching and ranking are the tested rules in
//    `@/lib/globalSearch`, so a topic can match on its subject or level, and
//    pressing Enter always opens the row the reader can see highlighted.
//  * Quiz and Past-paper rows are only offered for topics that actually have
//    them. A search result that lands on "no questions yet" is worse than no
//    result at all.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Archive, BarChart3, BookOpen, Brain, FileText, GraduationCap, Layers,
  LayoutDashboard, Library, Loader2, Play, RotateCcw, Search,
  Settings as SettingsIcon, Target, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useAuth } from "@/lib/auth";
import { LEVEL_FILTER_LABELS, levelLabel } from "@/lib/levels";
import { topicNotesPath, topicQuizPath, topicSlugOf } from "@/lib/topicUrls";
import {
  EXAM_BOARD_LABELS,
  matchesTokens,
  normaliseForSearch,
  resolveBoard,
  scoreName,
  tokenize,
  type ExamBoardKey,
} from "@/lib/globalSearch";

/** How many destination rows a query may render. */
const MAX_TOPIC_ROWS = 30;
/** How many subject hubs a query may render. */
const MAX_HUB_ROWS = 6;

type DestinationKind = "notes" | "quiz" | "papers";

const DESTINATION_ICON: Record<DestinationKind, LucideIcon> = {
  notes: FileText,
  quiz: Play,
  papers: Archive,
};

/** Reading order for a topic's destinations; also the tie-break when sorting. */
const DESTINATION_ORDER: Record<DestinationKind, number> = { notes: 0, quiz: 1, papers: 2 };

interface Destination {
  kind: DestinationKind;
  label: string;
  path: string;
}

interface IndexedTopic {
  id: string;
  name: string;
  subjectName: string;
  subjectSlug: string;
  level: string;
  levelLabel: string;
  board: ExamBoardKey;
  haystack: string;
  destinations: Destination[];
}

interface Hub {
  path: string;
  subjectName: string;
  level: string;
  levelLabel: string;
  board: ExamBoardKey;
}

interface PageRoute {
  label: string;
  path: string;
  keywords: string;
  icon: LucideIcon;
  /** Account pages mean nothing to a signed-out visitor on a public page. */
  requiresAccount?: boolean;
}

const PAGE_ROUTES: PageRoute[] = [
  { label: "Dashboard", path: "/dashboard", keywords: "home overview", icon: LayoutDashboard, requiresAccount: true },
  { label: "Subjects", path: "/subjects", keywords: "catalogue choose subjects", icon: Library },
  { label: "Notes", path: "/notes", keywords: "notes library revision materials summaries", icon: FileText },
  { label: "Flashcards", path: "/flashcards", keywords: "cards recall decks", icon: Layers },
  { label: "Quizzes", path: "/quizzes", keywords: "quiz test questions", icon: Brain },
  { label: "Practice", path: "/practice", keywords: "practice drill bank questions", icon: Target },
  { label: "Past papers", path: "/past-papers", keywords: "archive papers mark schemes", icon: Archive },
  { label: "Mastery", path: "/mastery", keywords: "objectives reviews strengths", icon: GraduationCap, requiresAccount: true },
  { label: "Progress", path: "/progress", keywords: "stats results", icon: BarChart3, requiresAccount: true },
  { label: "Settings", path: "/settings", keywords: "account two factor username password", icon: SettingsIcon, requiresAccount: true },
];

const LEVEL_ORDER = ["IGCSE", "AS Level", "A2 Level"];

const isMac = typeof navigator !== "undefined" && /mac|iphone|ipad|ipod/i.test(navigator.platform);

/** "⌘K" on a Mac, "Ctrl K" everywhere else. */
export const SEARCH_SHORTCUT_LABEL = isMac ? "⌘K" : "Ctrl K";

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
        active
          ? "border-primary/50 bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function SearchPalette() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [boardFilter, setBoardFilter] = useState<"all" | ExamBoardKey>("all");
  const [topics, setTopics] = useState<IndexedTopic[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // One attempt per mount unless the reader asks for a retry: the overlay's
  // first open used to fire the loader twice (state updates land a frame later).
  const started = useRef(false);

  const load = useCallback(async () => {
    started.current = true;
    setLoading(true);
    setError(null);
    try {
      // Loaded here, not at module scope — see the header comment.
      const { supabase } = await import("@/integrations/supabase/client");
      const [topicsRes, boardsRes, quizzesRes] = await Promise.all([
        supabase
          .from("topics")
          .select("id, name, slug, subject_level_id, subject_levels(level, subjects(name, slug))"),
        // The only board column in the schema. `subjects.name` carries it for
        // the two English rows, which have no statements yet.
        supabase.from("syllabus_statements").select("subject_level_id, board").limit(2000),
        supabase.from("quizzes").select("topic_id, is_published").eq("is_published", true).limit(3000),
      ]);

      // Papers are paged, not capped. PostgREST answers at most `max_rows` rows
      // (1000 on this project) whatever `limit` says, and the archive holds more
      // than that — a single request dropped its tail, and every topic in that
      // tail then offered no "Past papers" destination even though its papers
      // were filed. `order("id")` keeps the pages stable.
      const paperRows: { topic_id: string | null }[] = [];
      for (let from = 0; ; from += 1000) {
        const { data, error } = await supabase
          .from("past_papers")
          .select("topic_id")
          .order("id")
          .range(from, from + 999);
        if (error) throw error;
        paperRows.push(...(data ?? []));
        if ((data ?? []).length < 1000) break;
      }

      const failure = [topicsRes.error, boardsRes.error, quizzesRes.error].find(Boolean);
      if (failure) throw failure;

      const boardsByLevel = new Map<string, string[]>();
      for (const row of boardsRes.data ?? []) {
        if (!row.subject_level_id || !row.board) continue;
        const list = boardsByLevel.get(row.subject_level_id) ?? [];
        list.push(row.board);
        boardsByLevel.set(row.subject_level_id, list);
      }
      const quizzesByTopic = new Set((quizzesRes.data ?? []).map((r) => r.topic_id).filter(Boolean));
      const papersByTopic = new Set(paperRows.map((r) => r.topic_id).filter(Boolean));

      const built: IndexedTopic[] = [];
      for (const topic of topicsRes.data ?? []) {
        const levelRow = topic.subject_levels;
        const subject = levelRow?.subjects;
        if (!levelRow || !subject?.slug) continue;
        const slug = topicSlugOf(topic);
        const board = resolveBoard(boardsByLevel.get(topic.subject_level_id ?? ""), subject.name);
        const label = levelLabel(levelRow.level);
        const destinations: Destination[] = [
          {
            kind: "notes",
            label: "Notes",
            path: topicNotesPath(subject.slug, levelRow.level, slug),
          },
        ];
        if (quizzesByTopic.has(topic.id)) {
          destinations.push({
            kind: "quiz",
            label: "Topic questions",
            path: topicQuizPath(subject.slug, levelRow.level, slug),
          });
        }
        if (papersByTopic.has(topic.id)) {
          destinations.push({
            kind: "papers",
            label: "Past papers",
            path: `/past-papers?subject=${subject.slug}&level=${levelRow.level.toUpperCase()}&topic=${topic.id}`,
          });
        }
        built.push({
          id: topic.id,
          name: topic.name,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          level: levelRow.level,
          levelLabel: label,
          board,
          // Subject, level and board are all searchable: "chemistry as edexcel"
          // should reach the topic without anyone typing its name.
          haystack: normaliseForSearch(
            `${topic.name} ${subject.name} ${label} ${levelRow.level} ${subject.slug} ${EXAM_BOARD_LABELS[board]}`,
          ),
          destinations,
        });
      }
      built.sort(
        (a, b) =>
          a.subjectName.localeCompare(b.subjectName) ||
          LEVEL_ORDER.indexOf(a.levelLabel) - LEVEL_ORDER.indexOf(b.levelLabel) ||
          a.name.localeCompare(b.name),
      );
      setTopics(built);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search could not load the topic list.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Open from anywhere: ⌘K / Ctrl+K toggles, "/" opens when the reader is not
  // typing into something else (a search box, the AI marker, a note editor).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey;
      if (mod && (event.key === "k" || event.key === "K")) {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }
      if (event.key === "/" && !mod && !event.altKey) {
        const target = event.target as HTMLElement | null;
        const typing =
          !!target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.tagName === "SELECT" ||
            target.isContentEditable);
        if (!typing) {
          event.preventDefault();
          setOpen(true);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open && !topics && !loading && !error && !started.current) void load();
  }, [open, topics, loading, error, load]);

  const tokens = useMemo(() => tokenize(query), [query]);

  const hubs = useMemo<Hub[]>(() => {
    const seen = new Map<string, Hub>();
    for (const topic of topics ?? []) {
      if (levelFilter !== "all" && topic.levelLabel !== levelFilter) continue;
      if (boardFilter !== "all" && topic.board !== boardFilter) continue;
      const key = `${topic.subjectSlug}/${topic.level}`;
      if (seen.has(key)) continue;
      seen.set(key, {
        path: `/study/${topic.subjectSlug}/${topic.level.toLowerCase()}`,
        subjectName: topic.subjectName,
        level: topic.level,
        levelLabel: topic.levelLabel,
        board: topic.board,
      });
    }
    return [...seen.values()];
  }, [topics, levelFilter, boardFilter]);

  const matchedHubs = useMemo(() => {
    if (!tokens.length) return hubs;
    return hubs
      .filter((hub) =>
        matchesTokens(normaliseForSearch(`${hub.subjectName} ${hub.levelLabel}`), tokens),
      )
      .slice(0, MAX_HUB_ROWS);
  }, [hubs, tokens]);

  const pageMatches = useMemo(() => {
    const pages = PAGE_ROUTES.filter((page) => !page.requiresAccount || !!user);
    if (!tokens.length) return pages;
    return pages.filter((page) =>
      matchesTokens(normaliseForSearch(`${page.label} ${page.keywords}`), tokens),
    );
  }, [tokens, user]);

  const rows = useMemo(() => {
    if (!topics || !tokens.length) return [];
    const matches: { topic: IndexedTopic; destination: Destination; score: number }[] = [];
    for (const topic of topics) {
      if (levelFilter !== "all" && topic.levelLabel !== levelFilter) continue;
      if (boardFilter !== "all" && topic.board !== boardFilter) continue;
      if (!matchesTokens(topic.haystack, tokens)) continue;
      const score = scoreName(topic.name, tokens);
      for (const destination of topic.destinations) {
        matches.push({ topic, destination, score });
      }
    }
    matches.sort(
      (a, b) =>
        a.score - b.score ||
        a.topic.name.localeCompare(b.topic.name) ||
        DESTINATION_ORDER[a.destination.kind] - DESTINATION_ORDER[b.destination.kind],
    );
    return matches.slice(0, MAX_TOPIC_ROWS);
  }, [topics, tokens, levelFilter, boardFilter]);

  const boardsAvailable = useMemo(() => {
    const present = new Set<ExamBoardKey>();
    for (const topic of topics ?? []) present.add(topic.board);
    return (Object.keys(EXAM_BOARD_LABELS) as ExamBoardKey[]).filter((key) => present.has(key));
  }, [topics]);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const shortcutInDialog = SEARCH_SHORTCUT_LABEL;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        aria-label={`Search topics, notes, questions and papers (${shortcutInDialog})`}
        className="h-9 gap-2 px-2 text-muted-foreground sm:px-3"
      >
        <Search className="h-4 w-4" />
        <span className="hidden text-xs sm:inline">Search</span>
        <kbd className="hidden rounded border px-1.5 py-0.5 text-[10px] font-medium md:inline">
          {shortcutInDialog}
        </kbd>
      </Button>

      {/* The query is cleared on close but the filters are kept: reopening a
          palette that still shows the last search reads like a stale page. */}
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setQuery("");
        }}
      >
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[620px]">
          <DialogTitle className="sr-only">Search Clutch Marks</DialogTitle>
          <DialogDescription className="sr-only">
            Find a topic and jump to its notes, topic questions or past papers.
          </DialogDescription>
          <Command
            shouldFilter={false}
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2.5"
          >
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder="Search a topic, subject or level…"
              className="pr-9"
            />
            <div className="flex flex-wrap items-center gap-1.5 border-b px-3 py-2">
              <FilterChip active={levelFilter === "all"} onClick={() => setLevelFilter("all")}>
                All levels
              </FilterChip>
              {LEVEL_FILTER_LABELS.map((label) => (
                <FilterChip
                  key={label}
                  active={levelFilter === label}
                  onClick={() => setLevelFilter(label)}
                >
                  {label}
                </FilterChip>
              ))}
              {/* Only offered when the catalogue actually spans boards, so the
                  row never shows four options that change nothing. */}
              {boardsAvailable.length > 1 && (
                <span className="ml-auto flex flex-wrap items-center gap-1.5">
                  <FilterChip active={boardFilter === "all"} onClick={() => setBoardFilter("all")}>
                    All boards
                  </FilterChip>
                  {boardsAvailable.map((board) => (
                    <FilterChip
                      key={board}
                      active={boardFilter === board}
                      onClick={() => setBoardFilter(board)}
                    >
                      {EXAM_BOARD_LABELS[board]}
                    </FilterChip>
                  ))}
                </span>
              )}
            </div>
            <CommandList className="max-h-[min(60vh,420px)]">
              {loading && !topics && (
                <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading the topic list…
                </div>
              )}
              {error && !topics && (
                <div className="flex flex-col items-center gap-2 py-8 text-center text-sm">
                  <p className="text-muted-foreground">{error}</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => void load()}
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Try again
                  </Button>
                </div>
              )}
              {!loading && !error && <CommandEmpty>No topic or page matches that search.</CommandEmpty>}

              {pageMatches.length > 0 && (
                <CommandGroup heading="Go to">
                  {pageMatches.map((page) => (
                    <CommandItem
                      key={page.path}
                      value={`page:${page.path}`}
                      onSelect={() => go(page.path)}
                    >
                      <page.icon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{page.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {matchedHubs.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Subjects">
                    {matchedHubs.map((hub) => (
                      <CommandItem
                        key={hub.path}
                        value={`hub:${hub.path}`}
                        onSelect={() => go(hub.path)}
                      >
                        <BookOpen className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="min-w-0 flex-1 truncate">{hub.subjectName}</span>
                        <span className="ml-2 shrink-0 text-[11px] text-muted-foreground">
                          {hub.levelLabel}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {rows.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Topics">
                    {rows.map(({ topic, destination }) => {
                      const Icon = DESTINATION_ICON[destination.kind];
                      return (
                        <CommandItem
                          key={`${topic.id}:${destination.kind}`}
                          value={`${topic.id}:${destination.kind}`}
                          onSelect={() => go(destination.path)}
                          className="items-start"
                        >
                          <Icon className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate">{topic.name}</span>
                            <span className="block truncate text-[11px] text-muted-foreground">
                              {topic.subjectName} · {topic.levelLabel}
                            </span>
                          </span>
                          <span className="ml-2 shrink-0 self-center rounded border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                            {destination.label}
                          </span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </>
              )}
            </CommandList>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t px-3 py-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-3">
                <span>↑↓ to move</span>
                <span>↵ to open</span>
                <span>esc to close</span>
              </span>
              <span className="tabular-nums">{shortcutInDialog} to reopen</span>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
