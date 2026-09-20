import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Heart } from "lucide-react";

export function ParentDashboard() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--neon-cyan))] to-[hsl(185_80%_35%)] p-8 text-white neon-border">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-medium mb-4">
            <Heart className="h-3 w-3" /> Parent View
          </div>
          <h1 className="text-3xl font-bold mb-2">Parent Dashboard</h1>
          <p className="text-white/70 text-sm">Monitor your child's learning progress and performance.</p>
        </div>
      </div>

      <Card className="neon-border bg-card">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-5">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-lg font-semibold mb-2">No Student Linked</h2>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Link your account to your child's account to view their progress. Contact the admin to set up the link.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
