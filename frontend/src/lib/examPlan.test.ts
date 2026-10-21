import { describe, expect, it } from "vitest";
import { buildExamPlan, daysBetween, PRACTICE_WINDOW_DAYS, toCalendarDate } from "./examPlan";

const TODAY = "2026-10-21";

function plan(examDate: string, topics: string[] = [], today = TODAY) {
  return buildExamPlan({ examDate, today, topics });
}

describe("daysBetween", () => {
  it("counts whole calendar days across a month boundary", () => {
    expect(daysBetween("2026-10-21", "2026-11-05")).toBe(15);
  });

  it("handles a leap day", () => {
    expect(daysBetween("2028-02-28", "2028-03-01")).toBe(2);
  });

  it("is negative when the target is earlier", () => {
    expect(daysBetween("2026-10-21", "2026-10-18")).toBe(-3);
  });

  it("rejects anything that is not YYYY-MM-DD", () => {
    expect(() => daysBetween("21/10/2026", "2026-10-22")).toThrow();
  });
});

describe("toCalendarDate", () => {
  it("formats the local calendar day with zero padding", () => {
    expect(toCalendarDate(new Date(2026, 0, 5, 23, 30))).toBe("2026-01-05");
  });
});

describe("buildExamPlan: boundaries", () => {
  it("says so when the sitting has passed", () => {
    const p = plan("2026-10-18");
    expect(p.items).toEqual([]);
    expect(p.note).toMatch(/already passed/);
  });

  it("gives a same-day sitting one item and no revision", () => {
    const p = plan(TODAY);
    expect(p.daysUntil).toBe(0);
    expect(p.items).toEqual([
      { date: TODAY, kind: "exam", title: "Sitting today", topics: [], daysBefore: 0 },
    ]);
  });

  it("gives a one-day sitting a light review and the sitting, nothing else", () => {
    const p = plan("2026-10-22", ["Algebra"]);
    expect(p.items.map((i) => i.kind)).toEqual(["light", "exam"]);
    expect(p.items[0].date).toBe(TODAY);
    expect(p.note).toMatch(/no room to spread/);
  });

  it("puts all topics on the single learning day at exactly the window boundary", () => {
    // 16 days out: one learning day (today), then the full 15-day practice window.
    const p = plan("2026-11-06", ["A", "B", "C"]);
    expect(p.daysUntil).toBe(PRACTICE_WINDOW_DAYS + 1);
    const learn = p.items.filter((i) => i.kind === "learn");
    expect(learn).toHaveLength(1);
    expect(learn[0]).toMatchObject({ date: TODAY, topics: ["A", "B", "C"] });
  });
});

describe("buildExamPlan: backwards pacing", () => {
  it("ends with a light review the day before and the sitting last", () => {
    const p = plan("2026-12-01", ["A", "B"]);
    const last = p.items[p.items.length - 1];
    const penultimate = p.items[p.items.length - 2];
    expect(last).toMatchObject({ kind: "exam", date: "2026-12-01", daysBefore: 0 });
    expect(penultimate).toMatchObject({ kind: "light", date: "2026-11-30", daysBefore: 1 });
  });

  it("alternates timed papers and mistake review in the practice window", () => {
    const p = plan("2026-11-10");
    const practice = p.items.filter((i) => i.daysBefore >= 2 && i.daysBefore <= PRACTICE_WINDOW_DAYS);
    for (const item of practice) {
      expect(item.kind).toBe(item.daysBefore % 2 === 0 ? "past-paper" : "review");
    }
    expect(practice.length).toBe(PRACTICE_WINDOW_DAYS - 1);
  });

  it("places learning topics in syllabus order, each exactly once", () => {
    const topics = ["T1", "T2", "T3", "T4", "T5", "T6", "T7"];
    const p = plan("2026-12-31", topics);
    const learnedInOrder = p.items
      .filter((i) => i.kind === "learn")
      .flatMap((i) => i.topics);
    expect(learnedInOrder).toEqual(topics);
  });

  it("spreads three topics across distant days when there is room", () => {
    const p = plan("2026-12-31", ["A", "B", "C"]);
    const learnDates = p.items.filter((i) => i.kind === "learn" && i.topics.length > 0).map((i) => i.date);
    expect(learnDates).toHaveLength(3);
    expect(new Set(learnDates).size).toBe(3);
    expect(learnDates[0] < learnDates[2]).toBe(true);
  });

  it("keeps every item inside today..sitting and in date order", () => {
    const p = plan("2026-12-15", ["A", "B", "C", "D"]);
    for (const item of p.items) {
      expect(item.date >= TODAY).toBe(true);
      expect(item.date <= "2026-12-15").toBe(true);
    }
    const dates = p.items.map((i) => i.date);
    expect([...dates].sort()).toEqual(dates);
  });

  it("reports phases that run from the sitting backwards", () => {
    const p = plan("2026-12-01", ["A"]);
    const kinds = p.phases.map((ph) => ph.kind);
    expect(kinds).toEqual(["learn", "past-paper", "light", "exam"]);
    expect(p.phases.find((ph) => ph.kind === "exam")).toMatchObject({ from: "2026-12-01", to: "2026-12-01" });
  });
});

describe("buildExamPlan: notes", () => {
  it("asks for a subject when none is chosen, and still plans the calendar", () => {
    const p = plan("2026-12-01");
    expect(p.note).toMatch(/Choose a subject/);
    const learn = p.items.filter((i) => i.kind === "learn");
    expect(learn.length).toBeGreaterThan(0);
    expect(learn.every((i) => i.topics.length === 0)).toBe(true);
  });

  it("explains that a short run-in has no learning pass when topics exist", () => {
    const p = plan("2026-11-05", ["A", "B"]);
    expect(p.note).toMatch(/no full learning pass/);
    expect(p.items.filter((i) => i.kind === "review" && i.topics.length > 0).length).toBeGreaterThan(0);
  });
});
