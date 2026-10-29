import { describe, it, expect } from "vitest";
import {
  courseOrder,
  isLockedLesson,
  openableLessonIds,
  rankTopics,
  ranksByLevel,
} from "./lessonAccess";

// Every lesson in the live estate carries `sort_order = 1` (it orders lessons
// *within* a topic), which is why the topic's own order has to decide the free
// pick. These fixtures reproduce that.
const topicRank = new Map([
  ["topic-late", 0],
  ["topic-early", 1],
]);

const lessons = [
  { id: "b", topic_id: "topic-early", sort_order: 1 },
  { id: "a", topic_id: "topic-late", sort_order: 1 },
  { id: "c", topic_id: "topic-late", sort_order: 1 },
];

describe("rankTopics", () => {
  it("orders by the topic's sort_order, not the list's arrival order", () => {
    const rank = rankTopics([
      { id: "t3", sort_order: 3 },
      { id: "t1", sort_order: 1 },
      { id: "t2", sort_order: 2 },
    ]);
    expect([...rank.entries()].sort((x, y) => x[1] - y[1]).map(([id]) => id)).toEqual(["t1", "t2", "t3"]);
  });

  // Two topics sharing a sort_order must not resolve differently per surface,
  // or the hub and the index would hand out different free lessons.
  it("breaks a tie by id, so the order is stable", () => {
    const a = rankTopics([{ id: "z", sort_order: 1 }, { id: "a", sort_order: 1 }]);
    const b = rankTopics([{ id: "a", sort_order: 1 }, { id: "z", sort_order: 1 }]);
    expect(a.get("a")).toBe(0);
    expect([...a.entries()]).toEqual([...b.entries()]);
  });
});

describe("ranksByLevel", () => {
  it("ranks each subject-level independently", () => {
    const ranks = ranksByLevel([
      { id: "ol-b", subject_level_id: "ol", sort_order: 2 },
      { id: "as-a", subject_level_id: "as", sort_order: 1 },
      { id: "ol-a", subject_level_id: "ol", sort_order: 1 },
    ]);
    expect(ranks.get("ol")).toEqual(new Map([["ol-a", 0], ["ol-b", 1]]));
    expect(ranks.get("as")).toEqual(new Map([["as-a", 0]]));
  });
});

describe("courseOrder", () => {
  it("reads topic first, then the lesson within it", () => {
    expect(courseOrder(lessons, topicRank).map((l) => l.id)).toEqual(["a", "c", "b"]);
  });

  it("still gives a stable order when no topic rank is supplied", () => {
    expect(courseOrder(lessons).map((l) => l.id)).toEqual(["a", "b", "c"]);
  });
});

describe("openableLessonIds", () => {
  it("opens exactly one lesson per level on the free plan — the course's first", () => {
    const open = openableLessonIds(lessons, false, topicRank);
    expect([...open]).toEqual(["a"]);
  });

  it("opens everything for a paid account or an admin", () => {
    expect([...openableLessonIds(lessons, true, topicRank)].sort()).toEqual(["a", "b", "c"]);
  });

  // Guards the rule the two surfaces share: the pick must come from the course
  // order, not from the id tie-break, or a free reader gets a lesson from the
  // middle of the course.
  it("does not pick by id", () => {
    expect(openableLessonIds([...lessons].reverse(), false, topicRank).has("a")).toBe(true);
  });
});

describe("isLockedLesson", () => {
  it("locks nothing before the answer is resolved", () => {
    expect(isLockedLesson("b", null)).toBe(false);
  });

  it("locks the rows outside the free pick", () => {
    const open = openableLessonIds(lessons, false, topicRank);
    expect(isLockedLesson("a", open)).toBe(false);
    expect(isLockedLesson("b", open)).toBe(true);
  });
});
