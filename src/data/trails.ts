import type { Trail } from "@/types/trail";

export const TRAILS: Trail[] = [
  {
    id: "faulhorn-loop",
    name: "Faulhorn sunset loop",
    valley: "Grindelwald",
    country: "CH",
    fitness: "steady",
    season: [6, 10],
    tags: ["lake", "ridge", "hut"],
    waypoints: [
      { id: "bort", name: "Bort", elevationM: 1570, lat: 46.64, lon: 8.02, hut: false },
      { id: "first", name: "First", elevationM: 2167, lat: 46.66, lon: 8.05, hut: false },
      { id: "faulhorn", name: "Faulhorn", elevationM: 2681, lat: 46.67, lon: 8.0, hut: true },
      { id: "bachalp", name: "Bachalpsee", elevationM: 2265, lat: 46.66, lon: 8.03, hut: false },
    ],
    segments: [
      { from: "bort", to: "first", distanceKm: 4.2, ascentM: 610, descentM: 20, hours: 1.8, surface: "path", aspect: "S" },
      { from: "first", to: "faulhorn", distanceKm: 5.1, ascentM: 540, descentM: 30, hours: 2.1, surface: "path", aspect: "SW" },
      { from: "faulhorn", to: "bachalp", distanceKm: 3.4, ascentM: 40, descentM: 460, hours: 1.2, surface: "path", aspect: "SE" },
    ],
  },
  {
    id: "gosausee-zwieselalm",
    name: "Gosausee to Zwieselalm",
    valley: "Gosau",
    country: "AT",
    fitness: "easy",
    season: [5, 10],
    tags: ["lake", "forest", "family"],
    waypoints: [
      { id: "front", name: "Vorderer Gosausee", elevationM: 933, lat: 47.53, lon: 13.51, hut: false },
      { id: "zwiesel", name: "Zwieselalm", elevationM: 1447, lat: 47.52, lon: 13.49, hut: true },
    ],
    segments: [
      {
        from: "front",
        to: "zwiesel",
        distanceKm: 6.8,
        ascentM: 540,
        descentM: 30,
        hours: 2.6,
        surface: "path",
        aspect: "E",
        notes: "Stop for Kaiserschmarrn if the hut terrace is open.",
      },
    ],
  },
  {
    id: "tre-cime-circuit",
    name: "Tre Cime circuit",
    valley: "Sexten",
    country: "IT",
    fitness: "steady",
    season: [6, 9],
    tags: ["dolomites", "classic", "photos"],
    waypoints: [
      { id: "auronzo", name: "Rifugio Auronzo", elevationM: 2320, lat: 46.61, lon: 12.29, hut: true },
      { id: "lavaredo", name: "Rifugio Lavaredo", elevationM: 2344, lat: 46.62, lon: 12.31, hut: true },
      { id: "locatelli", name: "Rifugio Locatelli", elevationM: 2405, lat: 46.63, lon: 12.32, hut: true },
    ],
    segments: [
      { from: "auronzo", to: "lavaredo", distanceKm: 2.4, ascentM: 80, descentM: 50, hours: 0.8, surface: "path", aspect: "S" },
      { from: "lavaredo", to: "locatelli", distanceKm: 3.1, ascentM: 220, descentM: 160, hours: 1.4, surface: "scree", aspect: "N" },
      { from: "locatelli", to: "auronzo", distanceKm: 4.6, ascentM: 180, descentM: 270, hours: 1.9, surface: "path", aspect: "W" },
    ],
  },
  {
    id: "watzmann-hut",
    name: "Watzmannhaus day",
    valley: "Berchtesgaden",
    country: "DE",
    fitness: "spicy",
    season: [6, 9],
    tags: ["hut", "steep", "limestone"],
    waypoints: [
      { id: "hammerstiel", name: "Hammerstiel", elevationM: 780, lat: 47.58, lon: 12.94, hut: false },
      { id: "watzmann", name: "Watzmannhaus", elevationM: 1930, lat: 47.56, lon: 12.93, hut: true },
    ],
    segments: [
      { from: "hammerstiel", to: "watzmann", distanceKm: 7.4, ascentM: 1180, descentM: 40, hours: 4.2, surface: "path", aspect: "E" },
    ],
  },
  {
    id: "lac-blanc",
    name: "Lac Blanc balcony",
    valley: "Chamonix",
    country: "FR",
    fitness: "steady",
    season: [6, 9],
    tags: ["lake", "views", "classic"],
    waypoints: [
      { id: "flegere", name: "Flégère", elevationM: 1877, lat: 45.96, lon: 6.88, hut: false },
      { id: "blanc", name: "Lac Blanc", elevationM: 2352, lat: 45.98, lon: 6.89, hut: true },
    ],
    segments: [
      { from: "flegere", to: "blanc", distanceKm: 5.6, ascentM: 520, descentM: 40, hours: 2.4, surface: "path", aspect: "S" },
    ],
  },
  {
    id: "oeschinensee-shore",
    name: "Oeschinensee shore",
    valley: "Kandersteg",
    country: "CH",
    fitness: "easy",
    season: [5, 10],
    tags: ["lake", "family", "picnic"],
    waypoints: [
      { id: "top", name: "Oeschinen gondola", elevationM: 1682, lat: 46.5, lon: 7.72, hut: false },
      { id: "shore", name: "Lake bench", elevationM: 1578, lat: 46.5, lon: 7.73, hut: false },
    ],
    segments: [
      { from: "top", to: "shore", distanceKm: 3.2, ascentM: 40, descentM: 140, hours: 1.1, surface: "path", aspect: "S" },
    ],
  },
];

export const VALLEYS = [...new Set(TRAILS.map((trail) => trail.valley))];
