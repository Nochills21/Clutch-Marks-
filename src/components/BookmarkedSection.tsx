import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import {
  SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Bookmark, ChevronRight, FileText, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SavedMaterial { id: string; title: string }

export function BookmarkedSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [materials, setMaterials] = useState<SavedMaterial[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user || !open || loaded) return;
    (async () => {
      const [m, q] = await Promise.all([
        supabase.from("bookmarks").select("material_id, study_materials(id, title)").eq("user_id", user.id),
        supabase.from("question_bookmarks").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      setMaterials(((m.data ?? []) as any[])
        .map((r) => r.study_materials)
        .filter(Boolean)
        .map((s: any) => ({ id: s.id, title: s.title })));
      setQuestionCount(q.count ?? 0);
      setLoaded(true);
    })();
  }, [user, open, loaded]);

  return (
    <SidebarGroup>
      <Collapsible open={open} onOpenChange={(v) => { setOpen(v); if (!v) setLoaded(false); }}>
        <CollapsibleTrigger className="w-full">
          <SidebarGroupLabel className="flex w-full items-center gap-2 text-sidebar-foreground/30 text-[10px] uppercase tracking-[0.15em] font-semibold px-3 mb-1 cursor-pointer hover:text-sidebar-foreground/60 transition-colors">
            <ChevronRight className={cn("h-3 w-3 transition-transform", open && "rotate-90")} />
            Bookmarked
          </SidebarGroupLabel>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/practice?mode=bookmarked")}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <HelpCircle className="h-[18px] w-[18px] shrink-0" />
                  <span>Saved questions</span>
                  <span className="ml-auto text-[11px] text-sidebar-foreground/40">{questionCount}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {materials.map((m) => (
                <SidebarMenuItem key={m.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/revision?material=${m.id}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <FileText className="h-[18px] w-[18px] shrink-0" />
                      <span className="truncate">{m.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {loaded && materials.length === 0 && questionCount === 0 && (
                <p className="px-3 py-2 text-[11px] text-sidebar-foreground/40 flex items-center gap-2">
                  <Bookmark className="h-3 w-3" /> Nothing bookmarked yet
                </p>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
}
