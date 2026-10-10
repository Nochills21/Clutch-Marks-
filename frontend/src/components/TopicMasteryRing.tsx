// Topic mastery ring: the share of a topic's objectives mastered, as a ring.
//
// Green at 80%+, amber for any progress, red when nothing is mastered — the
// same convention as the summary helper, so the ring and the label can never
// disagree. Pure SVG, no chart dependency.

import type { MasteryBand } from "@/lib/topicMastery";

const BAND_STROKE: Record<MasteryBand, string> = {
  green: "stroke-emerald-500",
  amber: "stroke-amber-500",
  red: "stroke-red-500/70",
};

export function TopicMasteryRing({
  percent,
  band,
  size = 44,
  label,
}: {
  percent: number;
  band: MasteryBand;
  size?: number;
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  return (
    <div
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? `Topic mastery ${clamped}%`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-border"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={BAND_STROKE[band]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-[10px] font-bold tabular-nums text-foreground">
        {clamped}%
      </span>
    </div>
  );
}

export default TopicMasteryRing;
