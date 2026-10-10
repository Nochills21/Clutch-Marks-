// Content integrity: the three ways content has actually been damaged here,
// recomputed from the live tables so a broken row surfaces the moment it exists
// rather than when someone thinks to run an audit.
//
// The report is a database function (public.content_integrity_findings(), see
// migration 20261008150000) rather than a snapshot table: a stale "all clear"
// is worse than no panel at all, so every visit asks the database again.
//
// What it looks for, and why each one:
//   * replacement characters (U+FFFD) — what a broken encode/decode round trip
//     leaves behind; one multi-byte character becomes one U+FFFD per byte.
//   * correct_option that cannot point at the right option — a value equal to
//     the option count is the signature of the old 1-based seeds, and anything
//     outside 0..n-1 marks students against the wrong answer. Duplicated or
//     blank options are reported with it because they break marking the same way.
//   * material_type 'note' where student pages read 'notes' — the row saves,
//     looks right in the console, and is invisible to students.
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { SEOHead } from "@/components/SEOHead";
import { QueryError } from "@/components/QueryError";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import {
  CATEGORY_ORDER,
  adminPathForTable,
  categoryMeta,
  filterFindings,
  isSeverityError,
  sortFindings,
  summariseFindings,
  type IntegrityFinding,
} from "@/lib/contentIntegrity";
import { format } from "date-fns";
import { AlertTriangle, ArrowRight, CheckCircle2, RefreshCw, ShieldCheck } from "lucide-react";

export default function AdminContentIntegrity() {
  const [rows, setRows] = useState<IntegrityFinding[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const { failure, report, clear } = useLoadFailure("the content integrity report");

  const load = useCallback(async () => {
    setLoading(true);
    clear();
    const { data, error } = await supabase.rpc("content_integrity_findings");
    // A failed check must never read as "nothing damaged" — that is exactly the
    // false all-clear this page exists to prevent.
    if (error) {
      report(error);
      setRows([]);
      setCheckedAt(null);
      setLoading(false);
      return;
    }
    setRows((data ?? []) as IntegrityFinding[]);
    setCheckedAt(new Date());
    setLoading(false);
  }, [clear, report]);

  useEffect(() => { load(); }, [load]);

  const summary = useMemo(() => summariseFindings(rows), [rows]);
  const shown = useMemo(
    () => sortFindings(filterFindings(rows, filter)),
    [rows, filter],
  );

  const filters = useMemo(
    () => [
      { key: "all", label: "All findings", count: summary.total },
      ...CATEGORY_ORDER.map((category) => ({
        key: category,
        label: categoryMeta(category).label,
        count: summary.byCategory.find((c) => c.category === category)?.count ?? 0,
      })),
    ],
    [summary],
  );

  return (
    <div className="space-y-6">
      <SEOHead
        title="Content integrity — Admin Console"
        description="Damaged content rows — replacement characters, mis-indexed answers and material type aliases — recomputed live from the database."
        path="/admin/content-integrity"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" /> Content integrity
          </h1>
          <p className="text-muted-foreground">
            Checked live against the content tables, so a row that breaks shows up here without
            anyone running an audit.{" "}
            {checkedAt && `Last checked ${format(checkedAt, "MMM d, HH:mm")}.`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={summary.clean ? "secondary" : summary.errors > 0 ? "destructive" : "outline"}
            className="gap-1"
          >
            {summary.clean
              ? <CheckCircle2 className="h-3 w-3" />
              : <AlertTriangle className="h-3 w-3" />}
            {summary.clean
              ? "Nothing damaged"
              : `${summary.total} finding${summary.total === 1 ? "" : "s"}`}
          </Badge>
          <Button variant="outline" size="sm" className="gap-2" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Re-check
          </Button>
        </div>
      </div>

      {/* The cards are the filters: the count and the drill-down are the same
          thing, so choosing one never means hunting for a matching chip. */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filters.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={active}
              className={`rounded-xl border p-4 text-left transition-colors ${
                active ? "border-primary/50 bg-primary/5" : "hover:border-primary/30"
              }`}
            >
              <p className={`text-xl font-bold leading-none ${f.count > 0 && f.key !== "all" ? "text-amber-600" : ""}`}>
                {f.count}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{f.label}</p>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => <Skeleton key={i} className="h-12 rounded-xl" />)}
        </div>
      ) : failure ? (
        <QueryError message={failure} onRetry={load} />
      ) : !shown.length ? (
        <Card>
          <CardContent className="py-12 flex flex-col items-center gap-2 text-center">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            <p className="text-sm font-medium">
              {summary.clean
                ? "No damaged rows found."
                : "Nothing in this category — other checks still have findings."}
            </p>
            <p className="text-xs text-muted-foreground max-w-lg">
              Three checks ran over the content tables: replacement characters in any text a
              student reads, answers whose index cannot point at the right option, and
              material types the student surfaces do not read. This is recomputed on every visit,
              so a clean panel means clean now.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px]">Severity</TableHead>
                  <TableHead>Problem</TableHead>
                  <TableHead>Row</TableHead>
                  <TableHead className="text-right">Repair</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shown.map((f, i) => {
                  const meta = categoryMeta(f.category);
                  const path = adminPathForTable(f.table_name);
                  const error = isSeverityError(f);
                  return (
                    <TableRow key={`${f.category}-${f.table_name}-${f.row_id}-${f.field}-${i}`}>
                      <TableCell>
                        <Badge variant={error ? "destructive" : "secondary"} className="gap-1 text-[11px]">
                          {error && <AlertTriangle className="h-3 w-3" />}
                          {error ? "Error" : "Warning"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium">{meta.label}</p>
                        <p className="text-xs text-muted-foreground">{f.detail}</p>
                        {f.snippet && (
                          <p className="mt-1 max-w-[420px] truncate font-mono text-[11px] text-muted-foreground">
                            {f.snippet}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{f.label ?? "—"}</p>
                        <p className="text-xs text-muted-foreground">
                          {f.table_name}
                          {f.field ? ` · ${f.field}` : ""}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground/70 break-all">
                          {f.row_id}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        {path ? (
                          <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs">
                            <Link to={path}>
                              Open <ArrowRight className="h-3 w-3" />
                            </Link>
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">No screen</span>
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

      <div className="grid gap-4 lg:grid-cols-3">
        {CATEGORY_ORDER.map((category) => {
          const meta = categoryMeta(category);
          return (
            <Card key={category} className="border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{meta.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground">{meta.blurb}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Fixing one: </span>
                  {meta.fix}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
