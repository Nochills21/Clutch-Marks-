import { describe, expect, it } from "vitest";
import { bandForPercent, topicMasterySummary } from "./topicMastery";

describe("bandForPercent", () => {
  it("is green at 80% and above", () => {
    expect(bandForPercent(80)).toBe("green");
    expect(bandForPercent(100)).toBe("green");
  });
  it("is amber for any progress below 80%", () => {
    expect(bandForPercent(1)).toBe("amber");
    expect(bandForPercent(79)).toBe("amber");
  });
  it("is red at zero", () => {
    expect(bandForPercent(0)).toBe("red");
  });
});

describe("topicMasterySummary", () => {
  it("marks a fully-mastered topic exam-ready", () => {
    const s = topicMasterySummary([{ state: "mastered" }, { state: "mastered" }]);
    expect(s).toMatchObject({ total: 2, mastered: 2, percent: 100, band: "green", examReady: true, label: "Exam-ready" });
  });
  it("reports working state with partial progress", () => {
    const s = topicMasterySummary([
      { state: "mastered" },
      { state: "working" },
      { state: "not_started" },
      { state: "not_started" },
    ]);
    expect(s).toMatchObject({ total: 4, mastered: 1, working: 1, notStarted: 2, percent: 25, band: "amber", examReady: false, label: "Working on it" });
  });
  it("handles an empty topic without claiming readiness", () => {
    const s = topicMasterySummary([]);
    expect(s).toMatchObject({ total: 0, percent: 0, band: "red", examReady: false, label: "Not started" });
  });
});
