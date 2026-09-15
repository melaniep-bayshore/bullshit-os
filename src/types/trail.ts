export type FitnessBand = "easy" | "steady" | "spicy";

export type Aspect = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

export type Surface = "path" | "scree" | "via-ferrata" | "glacier-approach";

export interface Waypoint {
  id: string;
  name: string;
  elevationM: number;
  lat: number;
  lon: number;
  hut: boolean;
}

export interface Segment {
  from: string;
  to: string;
  distanceKm: number;
  ascentM: number;
  descentM: number;
  hours: number;
  surface: Surface;
  aspect: Aspect;
  notes?: string;
}

export interface Trail {
  id: string;
  name: string;
  valley: string;
  country: "CH" | "AT" | "IT" | "DE" | "FR";
  fitness: FitnessBand;
  season: [number, number];
  waypoints: Waypoint[];
  segments: Segment[];
  tags: string[];
}

export interface WeatherWindow {
  date: string;
  cloudCover: number;
  precipMm: number;
  windKmh: number;
  freezingLevelM: number;
  rating: "go" | "maybe" | "stay";
}

export interface TripPlan {
  trail: Trail;
  start: Waypoint;
  finish: Waypoint;
  totalKm: number;
  totalAscentM: number;
  movingHours: number;
  windows: WeatherWindow[];
  score: number;
}
