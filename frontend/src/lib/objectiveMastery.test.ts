import { describe, it, expect } from "vitest";
import {
  checksLabel,
  describeDue,
  dueObjectives,
  groupByTopic,
  isDue,
  ladderDaysFor,
  masteryPercent,
  nextActionCopy,
  overdueDays,
  stateMeta,
  weakestFirst,
  type NextObjectiveRow,
  type ObjectiveMasteryRow,
} from "./objectiveMastery";

const NOW = new Date("2026-10-09T12:00:00.000Z");
const daysFrom = (n: number) => new Date(NOW.getTime() + n * 86_400_000).toISOString();

function row(over: Partial<ObjectiveMasteryRow> = {}): ObjectiveMasteryRow {
  return {
    subject_slug: "mathematics",
    level: "OL",
    topic_id: "topic-1",
    topic_slug: "algebra-equations",
    topic_name: "Algebra — Equations",
    objective_id: "obj-1",
    code: "0580 2.5c",
    statement: "Solve a quadratic equation by factorising it",
    sort_order: 3,
    checks: 2,
    attempted: 2,
    correct: 1,
    state: "working",
    stage: 1,
    due_at: daysFrom(2),
    overdue: false,
    last_reviewed_at: daysFrom(-1),
    ...over,
  };
}

function nextRow(over: Partial<NextObjectiveRow> = {}): NextObjectiveRow {
  const base = row();
  const { sort_order: _sort, overdue: _o, last_reviewed_at: _l, ...rest } = base;
  return { action: "practise", ...rest, ...over } as NextObjectiveRow;
}

describe("checksLabel", () => {
  it("says nothing answered rather than pretending a score", () => {
    expect(checksLabel({ correct: 0, attempted: 0, checks: 2 })).toBe("0 of 2 checks answered");
  });

  it("reports current correctness against the number of checks", () => {
    expect(checksLabel({ correct: 2, attempted: 3, checks: 3 })).toBe("2 of 3 checks right");
  });

  it("admits an objective with no checks instead of showing 0 of 0", () => {
    expect(checksLabel({ correct: 0, attempted: 0, checks: 0 })).toBe("no checks yet");
  });
});

describe("masteryPercent", () => {
  it("is the share of checks currently right, not of attempts", () => {
    expect(masteryPercent({ correct: 1, checks: 4 })).toBe(25);
    expect(masteryPercent({ correct: 2, checks: 2 })).toBe(100);
  });

  it("is zero rather than NaN when an objective has no checks", () => {
    expect(masteryPercent({ correct: 0, checks: 0 })).toBe(0);
  });
});

describe("the schedule ladder", () => {
  it("widens: 1, 3, 7, 16, 35 days", () => {
    expect([1, 2, 3, 4, 5].map(ladderDaysFor)).toEqual([1, 3, 7, 16, 35]);
  });

  it("clamps instead of returning undefined for a stage outside the ladder", () => {
    expect(ladderDaysFor(0)).toBe(1);
    expect(ladderDaysFor(99)).toBe(35);
  });
});

describe("due dates in words", () => {
  it("treats a row with no answer as unscheduled, whatever its due_at says", () => {
    const unscheduled = { due_at: daysFrom(-3), attempted: 0 };
    expect(isDue(unscheduled, NOW)).toBe(false);
    expect(describeDue(unscheduled, NOW)).toBe("no schedule yet");
    expect(overdueDays(unscheduled, NOW)).toBe(0);
  });

  it("distinguishes due now, tomorrow and later", () => {
    expect(describeDue({ due_at: daysFrom(0), attempted: 1 }, NOW)).toBe("due now");
    expect(describeDue({ due_at: daysFrom(1), attempted: 1 }, NOW)).toBe("due tomorrow");
    expect(describeDue({ due_at: daysFrom(3), attempted: 1 }, NOW)).toBe("due in 3 days");
  });

  it("counts whole days late", () => {
    expect(describeDue({ due_at: daysFrom(-1), attempted: 1 }, NOW)).toBe("1 day overdue");
    expect(describeDue({ due_at: daysFrom(-5.5), attempted: 1 }, NOW)).toBe("5 days overdue");
    expect(overdueDays({ due_at: daysFrom(-5.5), attempted: 2 }, NOW)).toBe(5);
  });
});

describe("dueObjectives", () => {
  it("keeps only what is due, most overdue first", () => {
    const rows = [
      row({ objective_id: "later", due_at: daysFrom(2) }),
      row({ objective_id: "late", due_at: daysFrom(-5) }),
      row({ objective_id: "just-due", due_at: daysFrom(0) }),
      row({ objective_id: "unscheduled", attempted: 0, due_at: daysFrom(-9) }),
    ];
    expect(dueObjectives(rows, NOW).map((r) => r.objective_id)).toEqual(["late", "just-due"]);
  });
});

describe("weakestFirst", () => {
  it("puts a late review ahead of a merely wrong objective", () => {
    const late = row({ objective_id: "late", state: "mastered", correct: 2, due_at: daysFrom(-4) });
    const wrong = row({ objective_id: "wrong", state: "working", correct: 0, due_at: daysFrom(3) });
    expect(weakestFirst([wrong, late], NOW).map((r) => r.objective_id)).toEqual(["late", "wrong"]);
  });

  it("orders the rest by how much of the objective is right, then never-started, then mastered", () => {
    const rows = [
      row({ objective_id: "half", state: "working", correct: 1, checks: 2 }),
      row({ objective_id: "none-right", state: "working", correct: 0, checks: 2 }),
      row({ objective_id: "untouched", state: "not_started", attempted: 0, correct: 0 }),
      row({ objective_id: "done", state: "mastered", correct: 2 }),
    ];
    expect(weakestFirst(rows, NOW).map((r) => r.objective_id)).toEqual([
      "none-right",
      "half",
      "untouched",
      "done",
    ]);
  });
});

describe("groupByTopic", () => {
  it("groups, counts each state and keeps the board's order inside a topic", () => {
    const rows = [
      row({ objective_id: "c", code: "0580 2.5c", sort_order: 3 }),
      row({ objective_id: "a", code: "0580 2.5a", sort_order: 1, state: "mastered", correct: 2 }),
      row({ objective_id: "b", code: "0580 2.5b", sort_order: 2, state: "not_started", attempted: 0 }),
    ];
    const [group] = groupByTopic(rows);
    expect(group.objectives.map((o) => o.objective_id)).toEqual(["a", "b", "c"]);
    expect({ mastered: group.mastered, working: group.working, notStarted: group.notStarted }).toEqual({
      mastered: 1,
      working: 1,
      notStarted: 1,
    });
    expect(group.complete).toBe(false);
  });

  it("is complete only when every objective is currently right", () => {
    const rows = [
      row({ objective_id: "a", state: "mastered", correct: 2 }),
      row({ objective_id: "b", state: "mastered", correct: 2 }),
    ];
    expect(groupByTopic(rows)[0].complete).toBe(true);
  });

  it("does not call a topic with no objectives complete", () => {
    expect(groupByTopic([])).toEqual([]);
  });
});

describe("nextActionCopy", () => {
  it("leads with the late review when the schedule is overdue", () => {
    const copy = nextActionCopy(nextRow({ action: "review", overdue: true, due_at: daysFrom(-4), state: "mastered", correct: 2 }), NOW);
    expect(copy.action).toBe("review");
    expect(copy.cta).toBe("Check it again");
    expect(copy.detail).toContain("4 days overdue");
    expect(copy.detail).toContain("2 of 2 checks right");
  });

  it("names the weakness when the objective is being got wrong", () => {
    // The due phrase starts a sentence in this branch, so it is capitalised —
    // it follows a dash in the review branch and a comma elsewhere.
    const copy = nextActionCopy(
      nextRow({ action: "practise", state: "working", correct: 0, checks: 2, due_at: daysFrom(1) }),
      NOW,
    );
    expect(copy.cta).toBe("Practise this objective");
    expect(copy.detail).toContain("0 of 2 checks right");
    expect(copy.detail).toContain("Due tomorrow");
  });

  it("offers the checks when nothing has been answered", () => {
    const copy = nextActionCopy(nextRow({ action: "start", state: "not_started", attempted: 0, correct: 0, checks: 1 }), NOW);
    expect(copy.cta).toBe("Start the checks");
    expect(copy.detail).toContain("1 short check ");
  });

  it("falls back to maintenance rather than an empty panel", () => {
    const copy = nextActionCopy(nextRow({ action: "review", overdue: false, due_at: daysFrom(9), state: "mastered", correct: 2 }), NOW);
    expect(copy.title).toBe("Keep this one fresh");
    expect(copy.detail).toContain("due in 9 days");
  });

  it("treats an action this build does not know as a review", () => {
    expect(nextActionCopy(nextRow({ action: "something-new" }), NOW).action).toBe("review");
  });
});

describe("stateMeta", () => {
  it("has copy for the three real states", () => {
    expect(stateMeta("mastered").label).toBe("Mastered");
    expect(stateMeta("working").label).toBe("Working on it");
    expect(stateMeta("not_started").label).toBe("Not started");
  });

  it("labels an unknown state instead of rendering undefined", () => {
    expect(stateMeta("half-right").label).toBe("Unknown");
  });
});
