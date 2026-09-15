import { OsHomeLink } from "@/components/chaos/OsHomeLink";
import { ElevationSketch } from "@/components/ElevationSketch";
import { PackList } from "@/components/PackList";
import { TripCard } from "@/components/TripCard";
import { TRAILS } from "@/data/trails";
import { shortestLoop } from "@/lib/graph";
import { toPlan } from "@/lib/plan";
import { notFound } from "next/navigation";

interface TrailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TrailPage({ params }: TrailPageProps) {
  const { id } = await params;
  const trail = TRAILS.find((entry) => entry.id === id);
  if (!trail) notFound();

  const plan = toPlan(trail, trail.fitness, new Date("2026-07-11T08:00:00Z"));
  const hops = shortestLoop(trail);

  return (
    <main className="studio">
      <OsHomeLink aside="trail desk" />
      <TripCard plan={plan} featured />
      <ElevationSketch trail={trail} width={640} height={120} />

      <ol className="hops">
        {hops.map((hop) => (
          <li key={hop.waypoint.id}>
            <strong>{hop.waypoint.name}</strong>
            <span>{hop.waypoint.elevationM} m</span>
            <em>
              {hop.hours.toFixed(1)} h · +{hop.ascentM} m
            </em>
          </li>
        ))}
      </ol>

      <PackList trail={trail} band={trail.fitness} window={plan.windows[0]} />
    </main>
  );
}
