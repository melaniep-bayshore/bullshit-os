import { describe, expect, it } from "vitest";
import { TRAILS } from "@/data/trails";
import { fitnessFit, inSeason, tripScore, weatherScore } from "@/lib/score";
import { forecastWindow } from "@/lib/weather";

const faulhorn = TRAILS[0];

describe("fitnessFit", () => {
  it("keeps a steady alpine day in the green", () => {
    const score = fitnessFit(faulhorn, "steady");
    expect(score).toBeGreaterThan(70);
  });

  it("penalizes a spicy band mismatch less than an easy one", () => {
    expect(fitnessFit(faulhorn, "spicy")).toBeGreaterThan(fitnessFit(faulhorn, "easy"));
  });
});

describe("weatherScore", () => {
  it("returns a mid score when the window is empty", () => {
    expect(weatherScore([])).toBe(40);
  });

  it("scores a go-day higher than a stay-day", () => {
    const go = weatherScore([
      { date: "2026-07-11", cloudCover: 20, precipMm: 0, windKmh: 12, freezingLevelM: 3400, rating: "go" },
    ]);
    const stay = weatherScore([
      { date: "2026-07-12", cloudCover: 90, precipMm: 12, windKmh: 48, freezingLevelM: 2100, rating: "stay" },
    ]);
    expect(go).toBeGreaterThan(stay);
  });
});

describe("tripScore", () => {
  it("stays inside 0..100", () => {
    const windows = forecastWindow(faulhorn, new Date("2026-07-11T08:00:00Z"));
    const score = tripScore(faulhorn, "steady", windows);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});

describe("inSeason", () => {
  it("marks July as in season for Faulhorn", () => {
    expect(inSeason(faulhorn, new Date("2026-07-11"))).toBe(true);
  });
});
