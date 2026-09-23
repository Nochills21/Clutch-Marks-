// Navigation: role-specific link sets (admin/student/parent), bookmarks,
// student-preview toggle for admins.
import {
  BookOpen, LayoutDashboard, FileText, ClipboardList, Brain, BarChart3,
  Megaphone, LogOut, Users, GraduationCap, Shield, FileCheck,
  Layers, CalendarDays, Library, BookMarked, Archive, Sparkles, Database,
  Target, Eye, EyeOff, History, CreditCard, MessageSquareHeart,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth, enterStudentPreview } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BookmarkedSection } from "@/components/BookmarkedSection";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


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

  { title: "Calendar", url: "/calendar", icon: CalendarDays },
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
];

const parentLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Child Progress", url: "/progress", icon: BarChart3 },
  { title: "Announcements", url: "/announcements", icon: Megaphone },
  { title: "Feedback", url: "/feedback", icon: MessageSquareHeart },
];

export function AppSidebar() {
  const { role, signOut, studentPreview, exitStudentPreview } = useAuth();
  // While previewing, role is masked to "student" — use the real admin flag for the toggle.
  const isAdmin = studentPreview || role === "admin";
  const links = role === "admin" ? adminLinks : role === "parent" ? parentLinks : studentLinks;

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[hsl(var(--neon-purple))] text-primary-foreground shadow-lg glow-shadow">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-sidebar-foreground truncate tracking-tight">Clutch Marks</p>
            <p className="text-[11px] text-sidebar-foreground/40 capitalize font-medium">{role ?? "..."}</p>
          </div>
        </div>
      </SidebarHeader>

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
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/30 text-[10px] uppercase tracking-[0.15em] font-semibold px-3 mb-1">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {links.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-sidebar-foreground/60 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-primary/15 text-primary font-semibold shadow-[0_0_12px_hsl(var(--neon-blue)/0.15)]"
                    >
                      <item.icon className="h-[18px] w-[18px] shrink-0" />
                      <span>{item.title}</span>
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
