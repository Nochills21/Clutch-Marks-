// Login-free shell for the marketing/legal pages (/pricing, /privacy, /terms).
// AppLayout redirects signed-out visitors to /auth, so these routes need their
// own chrome to stay publicly reachable (and indexable).
//
// The header is auth-aware: /pricing sits outside AppLayout, so a signed-in
// student arriving via the sidebar's Upgrade link used to see a "Log in" /
// "Start revising" header with no trace of their account — it looked exactly
// like the click had signed them out.
import { Link, Outlet } from "react-router-dom";
import { ArrowRight, LayoutDashboard, LogOut } from "lucide-react";
import { BrandLockup } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export function PublicShell() {
  const { user, loading, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-3 px-4">
          <Link to="/" className="min-w-0">
            <BrandLockup size={36} subtitle="Study platform" />
          </Link>
          <div className="flex items-center gap-1.5 shrink-0">
            <ThemeToggle />
            {loading ? null : user ? (
              <>
                <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Link to="/dashboard" className="gap-1.5">
                    <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5 text-muted-foreground hover:text-foreground">
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Link to="/auth">Log in</Link>
                </Button>
                <Button asChild size="sm" className="sheen gap-1.5">
                  <Link to="/auth">
                    Start revising <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="container max-w-5xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}
