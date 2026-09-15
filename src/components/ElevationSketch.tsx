import type { Trail } from "@/types/trail";

interface ElevationSketchProps {
  trail: Trail;
  width?: number;
  height?: number;
}

export function ElevationSketch({ trail, width = 320, height = 88 }: ElevationSketchProps) {
  const points = sample(trail);
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = Math.max(1, max - min);

  const path = points
    .map((elevation, index) => {
      const x = (index / Math.max(1, points.length - 1)) * width;
      const y = height - ((elevation - min) / span) * (height - 8) - 4;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg className="elevation" viewBox={`0 0 ${width} ${height}`} role="img">
      <title>Elevation profile</title>
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function sample(trail: Trail): number[] {
  const values: number[] = trail.waypoints.map((point) => point.elevationM);

  for (const segment of trail.segments) {
    const from = trail.waypoints.find((point) => point.id === segment.from);
    if (!from) continue;
    values.push(from.elevationM + segment.ascentM - segment.descentM * 0.35);
  }

  return values;
}
