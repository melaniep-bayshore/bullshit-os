import type { Segment, Trail, Waypoint } from "@/types/trail";

export interface RouteHop {
  waypoint: Waypoint;
  incoming?: Segment;
  hours: number;
  ascentM: number;
  distanceKm: number;
}

export interface RouteSummary {
  hops: RouteHop[];
  hours: number;
  ascentM: number;
  distanceKm: number;
  huts: Waypoint[];
}

export function shortestLoop(trail: Trail): RouteHop[] {
  const byId = new Map(trail.waypoints.map((point) => [point.id, point]));
  const hops: RouteHop[] = [];

  let hours = 0;
  let ascentM = 0;
  let distanceKm = 0;

  for (const segment of trail.segments) {
    const waypoint = byId.get(segment.to);
    if (!waypoint) continue;

    hours += segment.hours;
    ascentM += segment.ascentM;
    distanceKm += segment.distanceKm;
    hops.push({ waypoint, incoming: segment, hours, ascentM, distanceKm });
  }

  const start = trail.waypoints[0];
  if (start) {
    hops.unshift({ waypoint: start, hours: 0, ascentM: 0, distanceKm: 0 });
  }

  return hops;
}

export function summarizeRoute(trail: Trail): RouteSummary {
  const hops = shortestLoop(trail);
  const last = hops[hops.length - 1];

  return {
    hops,
    hours: last?.hours ?? 0,
    ascentM: last?.ascentM ?? 0,
    distanceKm: last?.distanceKm ?? 0,
    huts: trail.waypoints.filter((point) => point.hut),
  };
}

export function neighbors(trail: Trail, waypointId: string): Segment[] {
  return trail.segments.filter((segment) => segment.from === waypointId);
}

export function incoming(trail: Trail, waypointId: string): Segment[] {
  return trail.segments.filter((segment) => segment.to === waypointId);
}

export function closestHut(trail: Trail, fromId: string): Waypoint | null {
  const huts = trail.waypoints.filter((point) => point.hut);
  if (huts.length === 0) return null;

  const start = trail.waypoints.find((point) => point.id === fromId);
  if (!start) return huts[0];

  return huts.slice().sort((left, right) => {
    const leftDelta = Math.abs(left.elevationM - start.elevationM);
    const rightDelta = Math.abs(right.elevationM - start.elevationM);
    return leftDelta - rightDelta;
  })[0];
}

export function highPoint(trail: Trail): Waypoint | null {
  if (trail.waypoints.length === 0) return null;
  return trail.waypoints.slice().sort((left, right) => right.elevationM - left.elevationM)[0];
}

export function exposure(trail: Trail): number {
  const weights = {
    path: 1,
    scree: 1.35,
    "via-ferrata": 1.8,
    "glacier-approach": 2.1,
  } as const;

  const raw = trail.segments.reduce((sum, segment) => {
    return sum + segment.hours * weights[segment.surface];
  }, 0);

  return Math.round(raw * 10) / 10;
}

export function bailouts(trail: Trail): Waypoint[] {
  return trail.waypoints.filter((point) => point.hut || point.elevationM < 1800);
}
