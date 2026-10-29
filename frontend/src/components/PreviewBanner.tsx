// Subtle preview-mode banner shown to free users across gated surfaces.
// Visually quiet — a soft gold hairline rule above the page content — so the
// limitation feels intentional and editorial rather than broken. Paid and
// admin users see nothing.
import { usePlanAccess } from "@/hooks/useSubscription";
import { useTeacherScope } from "@/hooks/useTeacherScope";
import { Lock, Sparkles } from "lucide-react";

export function PreviewBanner() {
  const { isPreview, loading } = usePlanAccess();
  // A teacher is on the free tier and is not on the free preview: their subject
  // is fully open. Promoting "one note per subject" over that is simply wrong,
  // and TeacherScopeNotice already says what the account covers.
  const teacher = useTeacherScope();
  if (loading || !isPreview || teacher.isTeacher) return null;

  return (
    <div className="border-border/40 border-b bg-background/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-7 lg:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-soft/40 border border-gold/20">
            <Lock className="h-4 w-4 text-gold" />
          </div>
          <p className="text-sm text-gold-soft">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Free plan: one note in every subject and level, previews of the rest. Unlock everything with a paid plan.
          </p>
        </div>
      </div>
    </div>
  );
}
