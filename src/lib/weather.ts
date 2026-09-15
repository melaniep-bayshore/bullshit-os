import type { Aspect, Trail, WeatherWindow } from "@/types/trail";

const RATINGS = ["go", "maybe", "stay"] as const;

const ASPECT_SUN: Record<Aspect, number> = {
  N: 0.35,
  NE: 0.48,
  E: 0.62,
  SE: 0.78,
  S: 0.92,
  SW: 0.84,
  W: 0.7,
  NW: 0.5,
};

export interface ForecastOptions {
  days?: number;
  bias?: "dry" | "mixed" | "wet";
}

export function forecastWindow(
  trail: Trail,
  start: Date,
  daysOrOptions: number | ForecastOptions = 3,
): WeatherWindow[] {
  const options = typeof daysOrOptions === "number" ? { days: daysOrOptions } : daysOrOptions;
  const days = options.days ?? 3;
  const bias = options.bias ?? "mixed";

  return Array.from({ length: days }, (_, index) => {
    const date = addDays(start, index);
    const seed = hash(`${trail.id}:${date.toISOString().slice(0, 10)}:${bias}`);
    return buildWindow(trail, date, seed, bias);
  });
}

export function bestDay(windows: WeatherWindow[]): WeatherWindow | null {
  if (windows.length === 0) return null;
  return [...windows].sort((left, right) => rank(right) - rank(left))[0];
}

export function worstDay(windows: WeatherWindow[]): WeatherWindow | null {
  if (windows.length === 0) return null;
  return [...windows].sort((left, right) => rank(left) - rank(right))[0];
}

export function goDays(windows: WeatherWindow[]): WeatherWindow[] {
  return windows.filter((window) => window.rating === "go");
}

export function streak(windows: WeatherWindow[]): number {
  let best = 0;
  let current = 0;

  for (const window of windows) {
    if (window.rating === "stay") {
      current = 0;
      continue;
    }
    current += 1;
    best = Math.max(best, current);
  }

  return best;
}

export function freezingSpread(windows: WeatherWindow[]): { min: number; max: number } {
  if (windows.length === 0) return { min: 0, max: 0 };

  return windows.reduce(
    (acc, window) => ({
      min: Math.min(acc.min, window.freezingLevelM),
      max: Math.max(acc.max, window.freezingLevelM),
    }),
    { min: Number.POSITIVE_INFINITY, max: 0 },
  );
}

export function aspectComfort(trail: Trail, window: WeatherWindow): number {
  const sun = trail.segments.reduce((sum, segment) => sum + ASPECT_SUN[segment.aspect], 0);
  const mean = sun / Math.max(1, trail.segments.length);
  const wetPenalty = window.precipMm * 4;
  const windPenalty = Math.max(0, window.windKmh - 28) * 0.8;

  return clamp(mean * 100 - wetPenalty - windPenalty, 0, 100);
}

export function summarizeForecast(windows: WeatherWindow[]): string {
  const pick = bestDay(windows);
  if (!pick) return "No forecast yet.";
  if (pick.rating === "go") return `Best window ${pick.date}: clear enough to move.`;
  if (pick.rating === "maybe") return `Soft window ${pick.date}: keep the hut as plan B.`;
  return `Hold on ${pick.date}: better a terrace day than a ridge.`;
}

function buildWindow(trail: Trail, date: Date, seed: number, bias: "dry" | "mixed" | "wet"): WeatherWindow {
  const wetShift = bias === "wet" ? 5 : bias === "dry" ? -2 : 0;
  const highPoint = Math.max(...trail.waypoints.map((point) => point.elevationM));

  const cloudCover = clamp(15 + (seed % 70) + wetShift * 6, 0, 100);
  const precipMm = clamp(basePrecip(seed) + wetShift, 0, 24);
  const windKmh = 8 + (seed % 42);
  const freezingLevelM = Math.max(1800, 2200 + (seed % 1600) - Math.round(highPoint / 80));

  const rating =
    precipMm >= 8 || windKmh >= 45
      ? RATINGS[2]
      : cloudCover > 62 || precipMm >= 3
        ? RATINGS[1]
        : RATINGS[0];

  return {
    date: date.toISOString().slice(0, 10),
    cloudCover,
    precipMm,
    windKmh,
    freezingLevelM,
    rating,
  };
}

function basePrecip(seed: number): number {
  if (seed % 11 === 0) return 6 + (seed % 9);
  if (seed % 7 === 0) return 3 + (seed % 4);
  return seed % 4;
}

function rank(window: WeatherWindow): number {
  const sky = { go: 30, maybe: 12, stay: 0 }[window.rating];
  return sky - window.precipMm * 3 - Math.max(0, window.windKmh - 25) - window.cloudCover * 0.08;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function hash(value: string): number {
  let acc = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    acc ^= value.charCodeAt(index);
    acc = Math.imul(acc, 16777619);
  }
  return acc >>> 0;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
