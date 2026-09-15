import { movingHours, totalAscent, totalDistance, tripScore } from "@/lib/score";
import { bestDay, forecastWindow, summarizeForecast } from "@/lib/weather";
import type { FitnessBand, Trail, TripPlan, WeatherWindow } from "@/types/trail";

export interface PlanInput {
  trails: Trail[];
  band: FitnessBand;
  valley?: string;
  country?: Trail["country"];
  tags?: string[];
  start?: Date;
  days?: number;
}

export interface PlanNote {
  headline: string;
  detail: string;
}

export function rankTrips(input: PlanInput): TripPlan[] {
  const start = input.start ?? new Date();

  return input.trails
    .filter((trail) => matches(trail, input))
    .map((trail) => toPlan(trail, input.band, start, input.days))
    .sort((left, right) => right.score - left.score);
}

export function toPlan(trail: Trail, band: FitnessBand, start: Date, days = 3): TripPlan {
  const windows = forecastWindow(trail, start, days);
  const first = trail.waypoints[0];
  const last = trail.waypoints[trail.waypoints.length - 1] ?? first;

  return {
    trail,
    start: first,
    finish: last,
    totalKm: round(totalDistance(trail), 1),
    totalAscentM: totalAscent(trail),
    movingHours: round(movingHours(trail), 1),
    windows,
    score: Math.round(tripScore(trail, band, windows)),
  };
}

export function annotate(plan: TripPlan): PlanNote[] {
  const notes: PlanNote[] = [
    {
      headline: `${plan.trail.valley} · ${plan.trail.country}`,
      detail: `${plan.totalKm} km · +${plan.totalAscentM} m · ${formatHours(plan.movingHours)}`,
    },
    {
      headline: summarizeForecast(plan.windows),
      detail: windowLine(bestDay(plan.windows)),
    },
  ];

  if (plan.score >= 74) {
    notes.push({ headline: "Green light", detail: "Fitness and sky line up. Pack light." });
  } else if (plan.score >= 52) {
    notes.push({ headline: "Soft go", detail: "Keep a hut bailout and a shorter descent." });
  } else {
    notes.push({ headline: "Hold", detail: "Swap to a valley walk or a bakery day." });
  }

  if (plan.trail.waypoints.some((point) => point.hut)) {
    notes.push({ headline: "Hut on route", detail: "Reserve if the weekend sits on a holiday." });
  }

  return notes;
}

export function formatHours(hours: number): string {
  const whole = Math.floor(hours);
  const minutes = Math.round((hours - whole) * 60);
  return minutes === 0 ? `${whole}h` : `${whole}h ${minutes}m`;
}

export function pickValley(plans: TripPlan[]): string | null {
  if (plans.length === 0) return null;

  const byValley = new Map<string, number>();
  for (const plan of plans) {
    byValley.set(plan.trail.valley, (byValley.get(plan.trail.valley) ?? 0) + plan.score);
  }

  return [...byValley.entries()].sort((left, right) => right[1] - left[1])[0]?.[0] ?? null;
}

function matches(trail: Trail, input: PlanInput): boolean {
  if (input.valley && trail.valley !== input.valley) return false;
  if (input.country && trail.country !== input.country) return false;
  if (input.tags && input.tags.length > 0) {
    const hasTag = input.tags.some((tag) => trail.tags.includes(tag));
    if (!hasTag) return false;
  }
  return true;
}

function windowLine(window: WeatherWindow | null): string {
  if (!window) return "Forecast still empty.";
  return `${window.date} · ${window.cloudCover}% cloud · ${window.precipMm} mm · frost ${window.freezingLevelM} m`;
}

function round(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
