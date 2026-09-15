import { scoreTone } from "@/lib/format";

interface ScoreBadgeProps {
  score: number;
}

const LABELS = {
  good: "Go",
  ok: "Maybe",
  skip: "Hold",
} as const;

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const tone = scoreTone(score);

  return (
    <span className={`badge badge-${tone}`}>
      {LABELS[tone]} · {score}
    </span>
  );
}
