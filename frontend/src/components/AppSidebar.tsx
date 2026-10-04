// Navigation: role-specific link sets (admin/student/parent), bookmarks,
// student-preview toggle for admins.// Calendar removed: the study planner covers scheduling.
import { BookOpen, LayoutDashboard, FileText, ClipboardList, Brain, BarChart3,
  Megaphone, LogOut, Users, GraduationCap, Shield, FileCheck,
  Layers, Library, BookMarked, Archive, Sparkles, Database,
  Target, Eye, EyeOff, History, CreditCard, MessageSquareHeart, Trophy, MailX,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth, enterStudentPreview } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BookmarkedSection } from "@/components/BookmarkedSection";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { BrandLockup } from "@/components/BrandMark";
import { useEffect, useState } from "react";
import { countUnreadAnnouncements } from "@/lib/announcements";


const studentLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Subjects", url: "/subjects", icon: Library },
  { title: "Lessons", url: "/lessons", icon: BookOpen },
  { title: "Revision Notes", url: "/notes", icon: FileText },
  { title: "Quizzes", url: "/quizzes", icon: Brain },
  { title: "Flashcards", url: "/flashcards", icon: Layers },
  { title: "Study Planner", url: "/study-planner", icon: Sparkles },
  { title: "Practice", url: "/practice", icon: Target },
  { title: "Topic Questions", url: "/question-bank", icon: Database },
  { title: "Progress", url: "/progress", icon: BarChart3 },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },

  { title: "Past Papers", url: "/past-papers", icon: Archive },
  { title: "Announcements", url: "/announcements", icon: Megaphone },
  { title: "Feedback", url: "/feedback", icon: MessageSquareHeart },
  { title: "Upgrade", url: "/pricing", icon: CreditCard },
];

const adminLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Subjects", url: "/admin/subjects", icon: Library },
  { title: "Manage Lessons", url: "/admin/lessons", icon: FileText },
  { title: "Manage Quizzes", url: "/admin/quizzes", icon: Brain },
  { title: "Study Materials", url: "/admin/materials", icon: FileText },
  { title: "Announcements", url: "/admin/announcements", icon: Megaphone },
  { title: "Accounts", url: "/admin/accounts", icon: Users },
  { title: "Manage Flashcards", url: "/admin/flashcards", icon: Layers },
  { title: "Question Bank", url: "/admin/question-bank", icon: Database },
  { title: "Submissions", url: "/admin/submissions", icon: FileCheck },
  { title: "Grade Book", url: "/admin/gradebook", icon: BookMarked },
  { title: "Past Papers", url: "/admin/past-papers", icon: Archive },
  { title: "Audit Log", url: "/admin/audit-log", icon: History },
  { title: "Payments", url: "/admin/payments", icon: CreditCard },
  { title: "Feedback", url: "/admin/feedback", icon: MessageSquareHeart },
  { title: "Email Health", url: "/admin/suppressions", icon: MailX },
];

const parentLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Child Progress", url: "/progress", icon: BarChart3 },
  { title: "Announcements", url: "/announcements", icon: Megaphone },
  { title: "Feedback", url: "/feedback", icon: MessageSquareHeart },
];

/** Show a red badge on the Announcements tab when the student has unread
 * announcements. The bell in the top-right already opens the same feed, so a
 * single tap covers both.
 */
export function AppSidebar() {
  const { role, signOut, studentPreview, exitStudentPreview, user } = useAuth();
  // While previewing, role is masked to "student" — use the real admin flag for the toggle.
  const isAdmin = studentPreview || role === "admin";
  const links = role === "admin" ? adminLinks : role === "parent" ? parentLinks : studentLinks;

  // Unread count for the red badge on the Announcements tab.
  //
  // Read state is per user (public.announcement_reads, migration
  // 20260929121000) — not the deprecated global `announcements.unread` flag,
  // which could only ever show every student the same number, and not
  // `notifications` either, which is a different feed and was empty, so the
  // badge never appeared. Opening the announcements feed records the reads and
  // clears this count.
  const [unreadCount, setUnreadCount] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (!user) return;
    let mounted = true;
    countUnreadAnnouncements(user.id)
      .then((count) => {
        if (mounted) setUnreadCount(count);
      })
      .catch(() => {
        // A failed count must not invent a badge.
        if (mounted) setUnreadCount(0);
      });
    return () => {
      mounted = false;
    };
  }, [user]);
  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="px-5 pt-6 pb-4">
        <Link to={role === "admin" ? "/admin/subjects" : "/dashboard"} className="block">
          <BrandLockup subtitle={role ?? "loading"} />
        </Link>
      </SidebarHeader>

      <div className="px-5">
        <hr className="rule-gold" />
      </div>

      <SidebarContent className="px-3">
        {studentPreview && (
          <div className="mx-1 mt-3 flex items-center justify-between gap-2 rounded-xl border border-primary/40 bg-primary/10 px-3 py-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
              <Eye className="h-3.5 w-3.5" /> Viewing as student
            </span>
            <button
              onClick={exitStudentPreview}
              className="text-[11px] font-medium text-primary/80 underline underline-offset-2 hover:text-primary"
            >
              Exit
            </button>
          </div>
        )}
        <SidebarGroup className="pt-3">
          <SidebarGroupLabel className="eyebrow px-3 mb-2 text-sidebar-foreground/35">
            {role === "admin" ? "Console" : "Study"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {links.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-sidebar-foreground/65 transition-colors duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-foreground font-semibold before:absolute before:left-0 before:top-1/2 before:h-4 before:w-[2px] before:-translate-y-1/2 before:rounded-full before:bg-primary"
                    >
                      <item.icon className="h-[17px] w-[17px] shrink-0 opacity-80 group-hover:opacity-100" />
                      <span>{item.title}</span>
                      {item.title === "Announcements" && (role !== "admin" || studentPreview) && (
                        <span className="ml-auto flex shrink-0 items-center justify-center rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                          {unreadCount ?? 0}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {role !== "parent" && <BookmarkedSection />}
      </SidebarContent>


      <SidebarFooter className="p-4 space-y-2">
        {isAdmin && (
          studentPreview ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
              onClick={exitStudentPreview}
            >
              <EyeOff className="h-4 w-4" /> Exit Student Preview
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 text-sidebar-foreground/60 hover:text-sidebar-foreground"
              onClick={enterStudentPreview}
            >
              <Eye className="h-4 w-4" /> Student Preview
            </Button>
          )
        )}
        <Separator className="bg-sidebar-border/50" />
        <div className="flex items-center justify-between">
          <ThemeToggle variant="ghost" size="icon" />
          <div className="flex items-center gap-1">
            <a
              href="/privacy"
              className="text-[11px] text-sidebar-foreground/40 hover:text-sidebar-foreground px-1"
            >
              Privacy
            </a>
            <span className="text-sidebar-foreground/20 text-[11px]">·</span>
            <a
              href="/terms"
              className="text-[11px] text-sidebar-foreground/40 hover:text-sidebar-foreground px-1"
            >
              Terms
            </a>
            <span className="text-sidebar-foreground/20 text-[11px]">·</span>
            <a
              href="mailto:support@clutchmarks.com"
              title="Contact support"
              className="text-[11px] text-sidebar-foreground/40 hover:text-sidebar-foreground px-1"
            >
              Support
            </a>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent text-xs"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
