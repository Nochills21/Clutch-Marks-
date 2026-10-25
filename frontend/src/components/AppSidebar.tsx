// Navigation: role-specific link sets (admin/student/parent) and the
// student-preview toggle for admins. Calendar is handled by the study planner.
import { BookOpen, LayoutDashboard, FileText, Brain, BarChart3,
  Megaphone, LogOut, Users, GraduationCap, FileCheck,
  Layers, Library, BookMarked, Archive, Sparkles, Database,
  Target, Eye, EyeOff, History, CreditCard, MessageSquareHeart, Trophy, MailX,
  ShieldCheck, Wand2, ShieldAlert, ListChecks, Gauge, PenLine, CalendarDays, LogIn,
  Settings as SettingsIcon,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth, enterStudentPreview } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { BrandLockup } from "@/components/BrandMark";


const studentLinkGroups = [
  {
    title: "Get started",
    links: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Subjects", url: "/subjects", icon: Library },
    ],
  },
  {
    title: "Study & practise",
    links: [
      // One entry for everything written: notes hub (lessons are reached from it).
      { title: "Notes", url: "/notes", icon: FileText },
      { title: "Flashcards", url: "/flashcards", icon: Layers },
      { title: "Quizzes", url: "/quizzes", icon: Brain },
      { title: "Practice", url: "/practice", icon: Target },
      { title: "Past Papers", url: "/past-papers", icon: Archive },
      { title: "AI Marker", url: "/ai-marker", icon: Wand2 },
    ],
  },
  {
    title: "Progress",
    links: [
      // Mastery is the objective-level review loop; Progress shows wider trends.
      { title: "Mastery", url: "/mastery", icon: GraduationCap },
      { title: "Command words", url: "/command-words", icon: PenLine },
      { title: "Exam plan", url: "/exam-plan", icon: CalendarDays },
      { title: "Progress", url: "/progress", icon: BarChart3 },
      { title: "Study Planner", url: "/study-planner", icon: Sparkles },
      { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
    ],
  },
  {
    title: "Account",
    links: [
      // Identity first: the username is also the sign-in handle.
      { title: "Settings", url: "/settings", icon: SettingsIcon },
      { title: "Feedback", url: "/feedback", icon: MessageSquareHeart },
      { title: "Upgrade", url: "/pricing", icon: CreditCard },
    ],
  },
];

const adminLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  // Build and publish curriculum first, then review the student/account work.
  { title: "Subjects", url: "/admin/subjects", icon: Library },
  { title: "Manage Lessons", url: "/admin/lessons", icon: FileText },
  { title: "Study Materials", url: "/admin/materials", icon: FileText },
  { title: "Manage Quizzes", url: "/admin/quizzes", icon: Brain },
  { title: "Question Bank", url: "/admin/question-bank", icon: Database },
  { title: "Manage Flashcards", url: "/admin/flashcards", icon: Layers },
  { title: "Past Papers", url: "/admin/past-papers", icon: Archive },
  { title: "Announcements", url: "/admin/announcements", icon: Megaphone },
  { title: "Accounts", url: "/admin/accounts", icon: Users },
  { title: "Grade Book", url: "/admin/gradebook", icon: BookMarked },
  { title: "Submissions", url: "/admin/submissions", icon: FileCheck },
  { title: "Audit Log", url: "/admin/audit-log", icon: History },
  // Content health: damage that is invisible in the console (a replacement
  // character, a 1-based answer index, a material_type students never read)
  // surfaces here without waiting for an audit.
  { title: "Content Integrity", url: "/admin/content-integrity", icon: ShieldAlert },
  // Coverage: the boards' own subtopic lists against our topics, so "the whole
  // specification is covered" is a number an admin can read, per spec.
  { title: "Syllabus Coverage", url: "/admin/syllabus-coverage", icon: ListChecks },
  // AI marking quota: papers marked today and Gemini refusals, from the audit log.
  { title: "AI Quota", url: "/admin/ai-quota", icon: Gauge },
  { title: "Payments", url: "/admin/payments", icon: CreditCard },
  { title: "Feedback", url: "/admin/feedback", icon: MessageSquareHeart },
  { title: "Email Health", url: "/admin/suppressions", icon: MailX },
  // PDPL: the queue behind the notification admins get when a reader files a
  // request from /data-rights.
  { title: "Data Requests", url: "/admin/data-requests", icon: ShieldCheck },
];

// App version shown in small writing at the bottom of the sidebar.
// Keep in sync with package.json "version".
// 1.2.0 — every archive paper is filed under a topic of its own level, so the
// past-paper archive's subject/topic/level pickers (and a topic page's "Past
// papers" link) return real papers instead of widening to the subject; plus the
// ⌘K search palette and the topic page's study links.
// 1.2.1 — the site copy, structured data and llms.txt name all six subjects
// (the archive now holds Biology, Chemistry and English rows too), and long
// equations, code and tables scroll inside the note instead of pushing a phone
// page sideways.
const APP_VERSION = "1.2.1";

const parentLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Child Progress", url: "/progress", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: SettingsIcon },
  { title: "Feedback", url: "/feedback", icon: MessageSquareHeart },
];

export function AppSidebar() {
  const { role, user, signOut, studentPreview, exitStudentPreview } = useAuth();
  // While previewing, role is masked to "student" — use the real admin flag for the toggle.
  const isAdmin = studentPreview || role === "admin";
  const linkGroups = role === "admin"
    ? [{ title: "Console", links: adminLinks }]
    : role === "parent"
      ? [{ title: "Family", links: parentLinks }]
      : studentLinkGroups;

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="px-5 pt-6 pb-4">
        <Link to={role === "admin" ? "/admin/subjects" : user ? "/dashboard" : "/"} className="block">
          {/* The public content pages render inside this shell for signed-out
              visitors too, and the subtitle used to read "loading" forever for
              them because it was `role ?? "loading"`. */}
          <BrandLockup subtitle={role ?? (user ? "student" : "visitor")} />
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
        {linkGroups.map((group) => (
          <SidebarGroup key={group.title} className="pt-3">
            <SidebarGroupLabel className="eyebrow px-3 mb-2 text-sidebar-foreground/35">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {group.links.map((item) => (
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
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

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
        <div className="flex items-center justify-between gap-2">
          <ThemeToggle variant="ghost" size="icon" />
          {/* Signed-out visitors reach this shell through the public study
              pages, where an unconditional "Sign Out" offered to sign out of
              nothing and there was no way in. */}
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0 gap-2 text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent text-xs"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm" className="shrink-0 gap-2 text-sidebar-foreground/60 hover:text-sidebar-foreground text-xs">
              <Link to="/auth">
                <LogIn className="h-4 w-4" /> Log in
              </Link>
            </Button>
          )}
        </div>
        <div className="flex items-center justify-center gap-1">
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
              href="mailto:support@clutchmarks.study"
              title="Contact support"
              className="text-[11px] text-sidebar-foreground/40 hover:text-sidebar-foreground px-1"
            >
              Support
            </a>
        </div>
        <p className="pt-1 text-center text-[10px] tabular-nums text-sidebar-foreground/30">
          v{APP_VERSION}
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
