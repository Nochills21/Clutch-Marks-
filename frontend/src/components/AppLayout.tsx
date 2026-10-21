// Shell: sidebar + topbar + routed content; device-aware layout.
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationCenter } from "@/components/NotificationCenter";
import { ContentProtection } from "@/components/ContentProtection";
import { SubjectFilterNotice } from "@/components/SubjectFilterNotice";
import { useDeviceType } from "@/hooks/useDevice";

// Routes that must render without an account. Their content is readable by
// anonymous callers (the tables allow anonymous SELECT) and they are the pages a
// crawler has to be able to reach, so bouncing to /auth here would both hide the
// content from visitors and hand a search engine a sign-in redirect instead of
// the page. Personal routes keep the redirect below.
const PUBLIC_CONTENT_PREFIXES = [
  "/subjects",
  "/lessons",
  "/notes",
  "/quizzes",
  "/past-papers",
  "/study/",
];

export function AppLayout() {
  const { user, loading } = useAuth();
  const device = useDeviceType();
  const { pathname, search } = useLocation();
  const isPublicContent = PUBLIC_CONTENT_PREFIXES.some(
    (prefix) => pathname === prefix.replace(/\/$/, "") || pathname.startsWith(prefix),
  );
  // Carry the page they asked for through the sign-in form. Without this a
  // signed-out deep link ended on /dashboard and the visitor had to find the
  // page again; `postLoginPath` re-validates whatever comes back.
  const signInHref = `/auth?next=${encodeURIComponent(`${pathname}${search}`)}`;


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-primary/30 border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && !isPublicContent) return <Navigate to={signInHref} replace />;

  return (
    <SidebarProvider defaultOpen={device === "laptop"}>
      <ContentProtection />
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-2 sm:gap-3 border-b border-border/60 bg-background/75 backdrop-blur-xl px-3 sm:px-4 lg:px-8">
            <SidebarTrigger />
            <div className="flex-1" />
            <ThemeToggle />
            <NotificationCenter />
          </header>
          <main className="flex-1 p-4 sm:p-5 md:p-7 lg:p-9">
            {/* Says what the subject picker is hiding, and undoes it. */}
            <SubjectFilterNotice />
            <Outlet />
          </main>
        </div>
      </div>

    </SidebarProvider>
  );
}
