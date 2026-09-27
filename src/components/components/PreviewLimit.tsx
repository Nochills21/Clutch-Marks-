// Preview limiting for free users: renders the first `limit` children of a
// list, then an upgrade card for the rest. Full-plan users see everything.
// Usage:
//   const visible = usePreviewSlice(items);            // sliced array
//   const { slice, hiddenCount } = usePreviewSliceWithLimit(items, limit); // sliced array + hidden count
//   <PreviewLimit hiddenCount={items.length - visible.length} />
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";
import { FREE_PREVIEW_LIMIT, usePlanAccess } from "@/hooks/useSubscription";

/** Slice a list to the plan's preview limit. */
export function usePreviewSlice<T>(items: T[]): T[] {
  const { previewLimit, loading } = usePlanAccess();
  if (loading || !items) return items ?? [];
  return items.slice(0, previewLimit);
}

/** Slice a list to the first `limit` items (plan-aware). */
export function usePreviewSliceWithLimit<T>(items: T[], limit: number): {
  slice: T[];
  hiddenCount: number;
} {
  const { loading, previewLimit, hasPaid } = usePlanAccess();
  // Full-access users see everything; the numeric limit only matters for
  // free-plan lists. The page-level FREE_PREVIEW_LIMIT is the value to use.
  const limitForSlice =
    hasPaid ? items.length : Math.max(0, Math.min(limit, previewLimit));
  if (loading || !items) return { slice: items ?? [], hiddenCount: 0 };
  const slice = items.slice(0, limitForSlice);
  const hiddenCount = items.length - slice.length;
  return { slice, hiddenCount };
}

/** The upgrade card shown after the preview slice when items were hidden. */
export function PreviewLimit({
  hiddenCount,
  what = "items",
}: {
  hiddenCount: number;
  what?: string;
}) {
  const { isPreview, loading } = usePlanAccess();
  if (loading || !isPreview || hiddenCount <= 0) return null;

  return (
    <Card className="neon-border border-dashed">
      <CardContent className="flex flex-col items-center py-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-4">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-semibold mb-1">
          + {hiddenCount} more {what} included in the full plan
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mb-5">
          You're seeing a preview. The full plan unlocks everything — every note,
          quiz, past paper and practice set — from $5/month on the annual plan.
        </p>
        <Button asChild size="sm" className="gap-2 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground">
          <Link to="/pricing"><Sparkles className="h-4 w-4" /> View plans</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export { FREE_PREVIEW_LIMIT, usePlanAccess };
