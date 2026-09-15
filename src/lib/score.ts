import type { FitnessBand, Trail, WeatherWindow } from "@/types/trail";

const FITNESS_CEILING: Record<FitnessBand, { hours: number; ascent: number }> = {
  easy: { hours: 5, ascent: 700 },
  steady: { hours: 7.5, ascent: 1200 },
  spicy: { hours: 10, ascent: 1800 },
};

export function movingHours(trail: Trail): number {
  return trail.segments.reduce((sum, segment) => sum + segment.hours, 0);
}

export function totalAscent(trail: Trail): number {
  return trail.segments.reduce((sum, segment) => sum + segment.ascentM, 0);
}

export function totalDistance(trail: Trail): number {
  return trail.segments.reduce((sum, segment) => sum + segment.distanceKm, 0);
}

export function fitnessFit(trail: Trail, band: FitnessBand): number {
  const ceiling = FITNESS_CEILING[band];
  const hours = movingHours(trail);
  const ascent = totalAscent(trail);

  const hourPenalty = Math.max(0, hours - ceiling.hours) * 8;
  const ascentPenalty = Math.max(0, ascent - ceiling.ascent) / 40;
  const underuse = Math.max(0, ceiling.hours - hours) * 1.4;

  return clamp(100 - hourPenalty - ascentPenalty - underuse, 0, 100);
}

export function weatherScore(windows: WeatherWindow[]): number {
  if (windows.length === 0) return 40;

  const weights = { go: 100, maybe: 58, stay: 8 };
  const raw = windows.reduce((sum, window) => {
    const windCut = Math.max(0, window.windKmh - 35) * 1.2;
    const wetCut = window.precipMm * 6;
    return sum + weights[window.rating] - windCut - wetCut;
  }, 0);

  return clamp(raw / windows.length, 0, 100);
}

export function tripScore(
  trail: Trail,
  band: FitnessBand,
  windows: WeatherWindow[],
): number {
  const fit = fitnessFit(trail, band);
  const sky = weatherScore(windows);
  const seasonBonus = inSeason(trail, new Date()) ? 8 : -18;
  const hutBonus = trail.waypoints.some((point) => point.hut) ? 6 : 0;
  const groundCut = surfacePenalty(trail) * 0.35;

  return clamp(fit * 0.45 + sky * 0.4 + seasonBonus + hutBonus - groundCut, 0, 100);
}

export function inSeason(trail: Trail, date: Date): boolean {
  const month = date.getUTCMonth() + 1;
  const [from, to] = trail.season;
  return from <= to ? month >= from && month <= to : month >= from || month <= to;
}

export function surfacePenalty(trail: Trail): number {
  const weights = {
    path: 0,
    scree: 6,
    "via-ferrata": 12,
    "glacier-approach": 16,
  } as const;

  const raw = trail.segments.reduce((sum, segment) => sum + weights[segment.surface], 0);
  return clamp(raw, 0, 28);
}

export function daylightNeed(trail: Trail): number {
  const hours = movingHours(trail);
  const buffer = trail.segments.some((segment) => segment.surface !== "path") ? 1.5 : 0.8;
  return Math.ceil(hours + buffer);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
