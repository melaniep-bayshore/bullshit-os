import { ScoreBadge } from "@/components/ScoreBadge";
import { WeatherStrip } from "@/components/WeatherStrip";
import { distance, elevation } from "@/lib/format";
import { formatHours } from "@/lib/plan";
import type { TripPlan } from "@/types/trail";
import Link from "next/link";

interface TripCardProps {
  plan: TripPlan;
  featured?: boolean;
}

export function TripCard({ plan, featured = false }: TripCardProps) {
  const { trail, start, finish } = plan;

  return (
    <article className={featured ? "trip featured" : "trip"}>
      <header>
        <p className="valley">
          {trail.valley} · {trail.country}
        </p>
        <h2>
          <Link href={`/trail/${trail.id}`}>{trail.name}</Link>
        </h2>
        <ScoreBadge score={plan.score} />
      </header>

      <dl>
        <div>
          <dt>From</dt>
          <dd>
            {start.name} · {elevation(start.elevationM)}
          </dd>
        </div>
        <div>
          <dt>To</dt>
          <dd>
            {finish.name} · {elevation(finish.elevationM)}
          </dd>
        </div>
        <div>
          <dt>Move</dt>
          <dd>
            {distance(plan.totalKm)} · +{plan.totalAscentM} m · {formatHours(plan.movingHours)}
          </dd>
        </div>
      </dl>

      <WeatherStrip windows={plan.windows} />

      <ul className="tags">
        {trail.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}
