// Calendar of deadlines, quizzes and live lessons.
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Brain, Video } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SEOHead } from "@/components/SEOHead";

type CalendarEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: "quiz" | "zoom";
  meta?: string;
};

const typeConfig = {
  quiz: { icon: Brain, label: "Quiz", dotClass: "bg-primary", badgeClass: "bg-primary/10 text-primary border-primary/30" },
  zoom: { icon: Video, label: "Zoom Lesson", dotClass: "bg-success", badgeClass: "bg-success/10 text-success border-success/30" },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    const load = async () => {
      const evts: CalendarEvent[] = [];

      // Published quizzes
      const { data: quizzes } = await supabase.from("quizzes").select("id, title, created_at").eq("is_published", true);
      (quizzes ?? []).forEach((q: any) => {
        evts.push({ id: q.id, title: q.title, date: q.created_at.slice(0, 10), type: "quiz" });
      });

      // Lessons with Zoom URLs
      const { data: lessons } = await supabase.from("lessons").select("id, title, zoom_url, created_at").not("zoom_url", "is", null);
      (lessons ?? []).forEach((l: any) => {
        if (l.zoom_url) evts.push({ id: l.id, title: l.title, date: l.created_at.slice(0, 10), type: "zoom", meta: l.zoom_url });
      });

      setEvents(evts);
    };
    load();
  }, []);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [events]);

  const navigate = (dir: number) => {
    if (viewMode === "month") {
      setCurrentDate(new Date(year, month + dir, 1));
    } else {
      setCurrentDate(new Date(currentDate.getTime() + dir * 7 * 86400000));
    }
  };

  const today = formatDate(new Date());

  // Month grid
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  // Week view
  const weekStart = useMemo(() => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }, [currentDate]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const monthLabel = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const DayCell = ({ dateStr, dayNum, isCurrentMonth }: { dateStr: string; dayNum: number; isCurrentMonth: boolean }) => {
    const dayEvents = eventsByDate[dateStr] ?? [];
    const isToday = dateStr === today;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className={cn(
            "min-h-[80px] border border-border/50 p-1.5 rounded-lg cursor-pointer transition-colors hover:bg-muted/40",
            !isCurrentMonth && "opacity-30",
            isToday && "ring-2 ring-primary/40 bg-primary/5"
          )}>
            <span className={cn("text-xs font-medium", isToday ? "text-primary font-bold" : "text-foreground")}>{dayNum}</span>
            <div className="flex flex-wrap gap-0.5 mt-1">
              {dayEvents.slice(0, 3).map((e) => (
                <div key={e.id} className={cn("h-1.5 w-1.5 rounded-full", typeConfig[e.type].dotClass)} />
              ))}
              {dayEvents.length > 3 && <span className="text-[9px] text-muted-foreground">+{dayEvents.length - 3}</span>}
            </div>
          </div>
        </PopoverTrigger>
        {dayEvents.length > 0 && (
          <PopoverContent className="w-64 p-3 space-y-2" align="start">
            <p className="text-xs font-semibold text-foreground">{new Date(dateStr + "T12:00:00").toLocaleDateString("default", { weekday: "long", month: "short", day: "numeric" })}</p>
            {dayEvents.map((e) => {
              const cfg = typeConfig[e.type];
              const Icon = cfg.icon;
              return (
                <div key={e.id} className={cn("flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs", cfg.badgeClass)}>
                  <Icon className="h-3 w-3 shrink-0" />
                  <span className="truncate">{e.title}</span>
                </div>
              );
            })}
          </PopoverContent>
        )}
      </Popover>
    );
  };

  return (
    <div className="space-y-6">
      <SEOHead title="Calendar — Clutch Marks" description="Stay on top of quizzes and Zoom sessions with your study calendar." path="/calendar" />
      <div>
        <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
        <p className="text-muted-foreground text-sm">View quizzes and Zoom lessons</p>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}><ChevronLeft className="h-4 w-4" /></Button>
          <h2 className="text-lg font-semibold text-foreground min-w-[180px] text-center">{monthLabel}</h2>
          <Button variant="outline" size="icon" onClick={() => navigate(1)}><ChevronRight className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => setCurrentDate(new Date())}>Today</Button>
        </div>
        <div className="flex gap-1">
          <Button variant={viewMode === "month" ? "default" : "outline"} size="sm" onClick={() => setViewMode("month")}>Month</Button>
          <Button variant={viewMode === "week" ? "default" : "outline"} size="sm" onClick={() => setViewMode("week")}>Week</Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs">
        {Object.entries(typeConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={cn("h-2.5 w-2.5 rounded-full", cfg.dotClass)} />
            <span className="text-muted-foreground">{cfg.label}</span>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-2 sm:p-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wider py-1">{d}</div>
            ))}
          </div>

          {viewMode === "month" ? (
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: totalCells }, (_, i) => {
                const dayNum = i - firstDay + 1;
                const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
                let displayDate: Date;
                if (dayNum < 1) {
                  displayDate = new Date(year, month, dayNum);
                } else if (dayNum > daysInMonth) {
                  displayDate = new Date(year, month, dayNum);
                } else {
                  displayDate = new Date(year, month, dayNum);
                }
                const dateStr = formatDate(displayDate);
                return <DayCell key={i} dateStr={dateStr} dayNum={displayDate.getDate()} isCurrentMonth={isCurrentMonth} />;
              })}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((d, i) => {
                const dateStr = formatDate(d);
                const isCurrentMonth = d.getMonth() === month;
                return <DayCell key={i} dateStr={dateStr} dayNum={d.getDate()} isCurrentMonth={isCurrentMonth} />;
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
