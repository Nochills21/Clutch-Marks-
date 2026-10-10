// Syllabus coverage: the board's own subtopic list, as a checklist we can be
// held to — and the gap between "mapped" and "top-grade ready".
//
// The numbers are a database function (public.syllabus_coverage(), see
// migrations 20261009180000 / 190000) recomputed on every visit, not a snapshot:
// a statement whose topic loses its notes, or one with no topic at all, has to
// show up the moment that is true. docs/syllabus-coverage.md is the reasoning
// behind the two readiness levels; the SQL is the interface and this page is
// presentation.
//
// Gaps come first. Rows the boards' own list is fully covered by are the quiet
// majority of this table and are not the reason to open it.
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { SEOHead } from "@/components/SEOHead";
import { QueryError } from "@/components/QueryError";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import {
  COVERAGE_FILTERS,
  coverageRank,
  filterCoverage,
  searchCoverage,
  sortCoverage,
  summariseCoverage,
  tierLabel,
  topicPathFor,
  type CoverageFilter,
  type CoverageRow,
} from "@/lib/syllabusCoverage";
import { format } from "date-fns";
import { AlertTriangle, ArrowRight, CheckCircle2, ListChecks, RefreshCw } from "lucide-react";

export default function AdminSyllabusCoverage() {
  const [rows, setRows] = useState<CoverageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);
  const [filter, setFilter] = useState<CoverageFilter>("all");
  const [query, setQuery] = useState("");
  const { failure, report, clear } = useLoadFailure("the syllabus coverage report");

  const load = useCallback(async () => {
    setLoading(true);
    clear();
    const { data, error } = await supabase.rpc("syllabus_coverage");
    // A failed call must not render as "everything is covered" — that is the
    // false all-clear this page exists to prevent.
    if (error) {
      report(error);
      setRows([]);
      setCheckedAt(null);
      setLoading(false);
      return;
    }
    setRows((data ?? []) as CoverageRow[]);
    setCheckedAt(new Date());
    setLoading(false);
  }, [clear, report]);

  useEffect(() => { load(); }, [load]);

  const summary = useMemo(() => summariseCoverage(rows), [rows]);
  const shown = useMemo(
    () => sortCoverage(filterCoverage(searchCoverage(rows, query), filter)),
    [rows, filter, query],
  );

  return (
    <div className="space-y-6">
      <SEOHead
        title="Syllabus coverage — Admin Console"
        description="Every official board subtopic, the topic that teaches it, and whether that topic is ready — recomputed live from the database."
        path="/admin/syllabus-coverage"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-primary" /> Syllabus coverage
          </h1>
          <p className="text-muted-foreground">
            The boards' own subtopic lists, each statement mapped to the topic that teaches it.{" "}
            {checkedAt && `Last checked ${format(checkedAt, "MMM d, HH:mm")}.`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={summary.clean ? "secondary" : "destructive"}
            className="gap-1"
          >
            {summary.clean
              ? <CheckCircle2 className="h-3 w-3" />
              : <AlertTriangle className="h-3 w-3" />}
            {summary.clean
              ? `${summary.statements} statements, all mapped`
              : `${summary.unmapped} unmapped`}
          </Badge>
          <Button variant="outline" size="sm" className="gap-2" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Re-check
          </Button>
        </div>
      </div>

      {/* The cards are the filters: the count and the drill-down are the same
          thing, so choosing one never means hunting for a matching chip. */}
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {COVERAGE_FILTERS.map((f) => {
          const active = filter === f.key;
          const count = summary.counts[f.key];
          const needsWork = f.key === "needs-attention" || f.key === "unmapped";
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={active}
              title={f.blurb}
              className={`rounded-xl border p-4 text-left transition-colors ${
                active ? "border-primary/50 bg-primary/5" : "hover:border-primary/30"
              }`}
            >
              <p className={`text-xl font-bold leading-none ${needsWork && count > 0 ? "text-amber-600" : ""}`}>
                {count}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{f.label}</p>
            </button>
          );
        })}
      </div>

      {summary.specs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {summary.specs.map((spec) => (
            <Badge key={spec.key} variant="outline" className="gap-1.5 py-1 text-[11px] font-normal">
              <span className="font-semibold">{spec.label}</span>
              <span className="text-muted-foreground">
                {spec.statements} statements · {spec.mapped} mapped · {spec.aStarReady} A*-ready
              </span>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {COVERAGE_FILTERS.find((f) => f.key === filter)?.blurb}
        </p>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by code, statement or topic…"
          className="sm:max-w-xs"
          aria-label="Filter coverage rows"
        />
      </div>

      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => <Skeleton key={i} className="h-12 rounded-xl" />)}
        </div>
      ) : failure ? (
        <QueryError message={failure} onRetry={load} />
      ) : !rows.length ? (
        // Zero rows is not "covered": it means no specification has been loaded
        // (the seeder writes public.syllabus_statements), or the report refused
        // the caller. Never render it as a clean bill of health.
        <Card>
          <CardContent className="py-12 flex flex-col items-center gap-2 text-center">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            <p className="text-sm font-medium">No statements loaded.</p>
            <p className="text-xs text-muted-foreground max-w-lg">
              The report returned no rows, so nothing is being checked. Load a board's outline with{" "}
              <code className="font-mono">node .freebuff/content-syllabus-statements.cjs all</code> — see
              docs/syllabus-coverage.md.
            </p>
          </CardContent>
        </Card>
      ) : !shown.length ? (
        <Card>
          <CardContent className="py-12 flex flex-col items-center gap-2 text-center">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            <p className="text-sm font-medium">
              {query
                ? "No statement matches that filter."
                : "Nothing in this bucket — other buckets still have rows."}
            </p>
            <p className="text-xs text-muted-foreground max-w-lg">
              Coverage is recomputed on every visit, so an empty bucket means empty now.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[132px]">Statement</TableHead>
                  <TableHead>Subtitle</TableHead>
                  <TableHead className="w-[210px]">Topic</TableHead>
                  <TableHead className="w-[180px]">Teaching layer</TableHead>
                  <TableHead className="w-[88px] text-right">Open</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shown.map((row) => {
                  const rank = coverageRank(row);
                  const path = topicPathFor(row);
                  return (
                    <TableRow key={`${row.spec_code}-${row.level}-${row.code}`}>
                      <TableCell>
                        <p className="font-mono text-sm">{row.code}</p>
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                          {row.spec_code} · {row.level}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium">
                          {row.title || <span className="text-muted-foreground">(untitled statement)</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {tierLabel(row.tier)}
                          {row.area ? ` · ${row.area}` : ""}
                        </p>
                      </TableCell>
                      <TableCell>
                        {row.topic_slug ? (
                          <>
                            <p className="text-sm">{row.topic_name ?? row.topic_slug}</p>
                            <p className="font-mono text-[10px] text-muted-foreground break-all">
                              {row.topic_slug}
                            </p>
                          </>
                        ) : (
                          <Badge variant="destructive" className="gap-1 text-[11px]">
                            <AlertTriangle className="h-3 w-3" /> Unmapped
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {rank === 0 && (
                            <Badge variant="destructive" className="text-[11px]">No topic</Badge>
                          )}
                          {rank === 1 && (
                            <Badge variant="outline" className="text-[11px] text-amber-600">
                              Below the floor
                            </Badge>
                          )}
                          {(rank === 2 || rank === 3) && (
                            <Badge variant="secondary" className="text-[11px]">Notes + practice</Badge>
                          )}
                          {rank === 2 && (
                            <Badge variant="outline" className="text-[11px]">No A* layer</Badge>
                          )}
                          {rank === 3 && (
                            <Badge variant="secondary" className="gap-1 text-[11px]">
                              <CheckCircle2 className="h-3 w-3" /> A*-ready
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          {row.topic_note_chars.toLocaleString()} chars · {row.topic_questions} questions ·{" "}
                          {row.exam_tier_questions} exam-tier · {row.technique_materials} technique
                        </p>
                        {/* The statement's own count, not the topic's. It is what
                            "this statement is covered" actually rests on, and a
                            zero here inside a topic with 29 questions is the
                            finding the topic-level figure cannot show. */}
                        <p
                          className={`mt-0.5 text-[10px] ${
                            row.mapped && row.statement_questions === 0
                              ? "text-amber-600 dark:text-amber-500"
                              : "text-muted-foreground"
                          }`}
                        >
                          {row.statement_questions} question{row.statement_questions === 1 ? "" : "s"} on this statement
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        {path ? (
                          <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs">
                            <Link to={path}>
                              Notes <ArrowRight className="h-3 w-3" />
                            </Link>
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">No topic</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      <p className="text-xs text-muted-foreground">
        Showing {shown.length} of {rows.length} statements.
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-dashed">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">What the two levels mean</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Notes + practice</span> — the floor: at least
              1,000 characters of notes and 15 questions on the topic. Something to teach from and
              something to practise.
            </p>
            <p>
              <span className="font-medium text-foreground">A*-ready</span> — the top-grade layer as well:
              5+ exam-tier questions and an exam-technique material. The gap between the two is the
              honest answer to "do we go an extra step?".
            </p>
          </CardContent>
        </Card>
        <Card className="border-dashed">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Where these rows come from</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>
              Each statement is the board's own wording, taken from its PDF by{" "}
              <span className="font-mono">.freebuff/syllabus-outline.cjs</span> and mapped by{" "}
              <span className="font-mono">.freebuff/content-syllabus-statements.cjs</span>. Nothing is
              hand-typed into the database.
            </p>
            <p>
              The mapping is a claim, so an unmapped statement stays NULL and appears here rather than
              passing silently. A statement whose board half differs from the half our topic sits in is
              kept at the board's own level — see docs/syllabus-coverage.md §1.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
