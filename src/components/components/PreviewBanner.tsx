// Subtle preview-mode banner shown to free users across gated surfaces.
// Visually quiet — a soft gold hairline rule above the page content — so the
// limitation feels intentional and editorial rather than broken. Paid and
// admin users see nothing.
import { usePlanAccess } from "@/hooks/useSubscription";
import { Lock, Sparkles } from "lucide-react";

export function PreviewBanner() {
  const { isPreview, loading } = usePlanAccess();
  if (loading || !isPreview) return null;

  return (
    <div className="border-border/40 border-b bg-background/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-7 lg:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-soft/40 border border-gold/20">
            <Lock className="h-4 w-4 text-gold" />
          </div>
          <p className="text-sm text-gold-soft">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Free plan: preview of the first 2 items. Unlock everything with a paid plan.
          </p>
        </div>
      </div>
    </div>
  );
}
