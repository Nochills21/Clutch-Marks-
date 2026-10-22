import { describe, it, expect } from "vitest";
import {
  PLAN_ROWS,
  PAID_PLAN_IDS,
  money,
  planById,
  totalOf,
  perMonthOf,
  billedLabel,
  savingsVsMonthly,
  cheapestPerMonth,
} from "./plans";
import { FAQ_ITEMS, PRICING_JSON_LD, getRouteMeta } from "./seoRoutes";

const monthly = planById("monthly")!;
const quarterly = planById("quarterly")!;
const annual = planById("annual")!;

describe("plan snapshot", () => {
  it("carries every tier the page renders", () => {
    expect(PLAN_ROWS.map((p) => p.id).sort()).toEqual(["annual", "free", "monthly", "quarterly"]);
  });

  it("keeps the stored monthly rate and the billed total consistent", () => {
    // The generator refuses to write a file that disagrees with itself; this
    // catches a hand-edited snapshot before a build ships it.
    for (const plan of PLAN_ROWS) {
      const derived = Math.round((plan.priceTotal / plan.months) * 100) / 100;
      expect(Math.abs(plan.priceMonthly - derived)).toBeLessThanOrEqual(0.011);
      expect(plan.priceTotal).toBeGreaterThanOrEqual(0);
      expect(plan.months).toBeGreaterThanOrEqual(1);
    }
  });
});

describe("money formatting", () => {
  it("shows whole dollars without cents and cents with two decimals", () => {
    expect(money(40)).toBe("$40");
    expect(money(6.67)).toBe("$6.67");
    expect(money(0)).toBe("$0");
  });

  it("rounds float noise away", () => {
    expect(money(80 / 12)).toBe("$6.67");
    expect(money(40 - 6.67)).toBe("$33.33");
  });
});

describe("per-term copy", () => {
  it("quotes the billed total, not months × rate", () => {
    // 6.67 × 12 is 80.04; the plan is billed 80. The total is the column.
    expect(totalOf(annual)).toBe("$80");
    expect(totalOf(quarterly)).toBe("$60");
    expect(totalOf(monthly)).toBe("$40");
  });

  it("derives the monthly rate from the total", () => {
    expect(perMonthOf(quarterly)).toBe("$20");
    expect(perMonthOf(annual)).toBe("$6.67");
    expect(perMonthOf(monthly)).toBe("$40");
  });

  it("only names a billed amount for terms longer than a month", () => {
    expect(billedLabel(monthly)).toBe("/month");
    expect(billedLabel(quarterly)).toBe("/month · billed $60");
    expect(billedLabel(annual)).toBe("/month · billed $80");
  });
});

describe("savings vs monthly", () => {
  it("computes the per-month saving and the percentage", () => {
    expect(savingsVsMonthly(quarterly)).toEqual({ amount: 20, label: "$20", percent: 50 });
    expect(savingsVsMonthly(annual)).toEqual({ amount: 33.33, label: "$33.33", percent: 83 });
  });

  it("has nothing to compare the monthly plan to", () => {
    expect(savingsVsMonthly(monthly)).toBeNull();
  });
});

describe("cheapest per-month rate", () => {
  it("picks the annual tier for the 'from $X/month' upsell", () => {
    expect(cheapestPerMonth()).toEqual({ plan: annual, label: "$6.67" });
  });
});

describe("no price drift between surfaces", () => {
  // Everything below reads the same snapshot, so these assertions fail the
  // moment a price is edited in one place and not regenerated.
  const costFaq = FAQ_ITEMS.find((f) => /how much/i.test(f.q));
  const course = PRICING_JSON_LD.find((node) => (node as { "@type"?: string })["@type"] === "Course") as
    | { offers: Array<{ name: string; price: string; priceCurrency: string }> }
    | undefined;

  it("has a cost answer and a Course offer list", () => {
    expect(costFaq).toBeTruthy();
    expect(course?.offers?.length).toBe(PAID_PLAN_IDS.length);
  });

  it("mentions only prices that exist in the plan snapshot", () => {
    const allowed = new Set(
      PLAN_ROWS.flatMap((p) => [totalOf(p), perMonthOf(p)]),
    );
    const mentioned = costFaq!.a.match(/\$[\d.]+/g) ?? [];
    expect(mentioned.length).toBeGreaterThan(0);
    for (const amount of mentioned) expect(allowed.has(amount)).toBe(true);
  });

  it("states both billed totals in the FAQ", () => {
    expect(costFaq!.a).toContain(`(${totalOf(quarterly)})`);
    expect(costFaq!.a).toContain(`(${totalOf(annual)})`);
  });

  it("quotes the cheapest rate in the /pricing meta description", () => {
    const meta = getRouteMeta("/pricing");
    expect(meta?.description ?? "").toContain(cheapestPerMonth()!.label);
  });

  it("prices every JSON-LD offer at the plan's billed total", () => {
    const offers = course!.offers;
    expect(offers.map((o) => o.name)).toEqual(PAID_PLAN_IDS.map((id) => planById(id)!.name));
    expect(offers.map((o) => o.price)).toEqual(PAID_PLAN_IDS.map((id) => String(planById(id)!.priceTotal)));
    expect(offers.every((o) => o.priceCurrency === "USD")).toBe(true);
  });
});
