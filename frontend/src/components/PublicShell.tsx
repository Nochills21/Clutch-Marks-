// Login-free shell for the marketing/legal pages (/pricing, /privacy, /terms).
// AppLayout redirects signed-out visitors to /auth, so these routes need their
// own chrome to stay publicly reachable (and indexable).
import { Link, Outlet } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BrandLockup } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export function PublicShell() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-3 px-4">
          <Link to="/" className="min-w-0">
            <BrandLockup size={36} subtitle="Study platform" />
          </Link>
          <div className="flex items-center gap-1.5 shrink-0">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Link to="/auth">Log in</Link>
            </Button>
            <Button asChild size="sm" className="sheen gap-1.5">
              <Link to="/auth">
                Start revising <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container max-w-5xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}
