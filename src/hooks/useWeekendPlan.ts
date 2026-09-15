import { useMemo, useState } from "react";
import { TRAILS, VALLEYS } from "@/data/trails";
import { rankTrips } from "@/lib/plan";
import type { FitnessBand, TripPlan } from "@/types/trail";

export interface WeekendFilters {
  band: FitnessBand;
  valley: string | "any";
}

export function useWeekendPlan(initial: WeekendFilters = { band: "steady", valley: "any" }) {
  const [filters, setFilters] = useState<WeekendFilters>(initial);

  const plans = useMemo<TripPlan[]>(() => {
    return rankTrips({
      trails: TRAILS,
      band: filters.band,
      valley: filters.valley === "any" ? undefined : filters.valley,
    });
  }, [filters]);

  const pick = plans[0] ?? null;
  const maybe = plans.filter((plan) => plan.score >= 62);

  return {
    filters,
    setBand: (band: FitnessBand) => setFilters((prev) => ({ ...prev, band })),
    setValley: (valley: WeekendFilters["valley"]) => setFilters((prev) => ({ ...prev, valley })),
    valleys: VALLEYS,
    plans,
    pick,
    maybe,
  };
}
