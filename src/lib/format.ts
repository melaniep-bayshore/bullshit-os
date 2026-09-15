import type { FitnessBand, WeatherWindow } from "@/types/trail";

const NUMBER = new Intl.NumberFormat("de-CH");

export function elevation(meters: number): string {
  return `${NUMBER.format(meters)} m`;
}

export function distance(km: number): string {
  return `${km.toFixed(1)} km`;
}

export function weatherLabel(window: WeatherWindow): string {
  if (window.rating === "go") return "Clear window";
  if (window.rating === "maybe") return "Soft weather";
  return "Hut day";
}

export function scoreTone(score: number): "good" | "ok" | "skip" {
  if (score >= 74) return "good";
  if (score >= 52) return "ok";
  return "skip";
}

export function bandLabel(band: FitnessBand): string {
  if (band === "easy") return "Easy legs";
  if (band === "steady") return "Steady day";
  return "Spicy day";
}

export function windLabel(kmh: number): string {
  if (kmh < 15) return "Calm";
  if (kmh < 28) return "Breeze";
  if (kmh < 40) return "Gusty";
  return "Hold the ridge";
}

export function frostLine(meters: number): string {
  return `Freezing around ${elevation(meters)}`;
}

export function compactWindow(window: WeatherWindow): string {
  return [
    window.date.slice(5),
    weatherLabel(window),
    `${window.precipMm} mm`,
    windLabel(window.windKmh),
  ].join(" · ");
}
