import type { FitnessBand, Trail, WeatherWindow } from "@/types/trail";
import { daylightNeed, movingHours, totalAscent } from "@/lib/score";

export type PackItem = {
  id: string;
  label: string;
  why: string;
  required: boolean;
};

export function packingList(trail: Trail, band: FitnessBand, window?: WeatherWindow): PackItem[] {
  const items: PackItem[] = [
    { id: "shell", label: "Wind shell", why: "Ridges turn even on a green day.", required: true },
    { id: "water", label: "1.5L water", why: `${trail.valley} huts are not a guarantee.`, required: true },
    { id: "snack", label: "Dense snack", why: `${Math.round(movingHours(trail) * 60)} moving minutes.`, required: true },
    { id: "map", label: "Offline map", why: "Phone battery dies before the descent.", required: true },
  ];

  if (totalAscent(trail) > 900 || band === "spicy") {
    items.push({ id: "poles", label: "Poles", why: "Saves knees on the long down.", required: false });
  }

  if (trail.segments.some((segment) => segment.surface !== "path")) {
    items.push({ id: "helmet", label: "Helmet", why: "Scree or iron on the line.", required: true });
  }

  if (window && (window.precipMm >= 3 || window.rating !== "go")) {
    items.push({ id: "rain", label: "Pack cover", why: "Soft weather on the best day.", required: true });
  }

  if (daylightNeed(trail) >= 8) {
    items.push({ id: "headlamp", label: "Headlamp", why: "Long day, early start.", required: true });
  }

  if (trail.waypoints.some((point) => point.hut)) {
    items.push({ id: "cash", label: "Hut cash", why: "Card readers nap at 2 000 m.", required: false });
  }

  return items;
}

export function requiredCount(items: PackItem[]): number {
  return items.filter((item) => item.required).length;
}
