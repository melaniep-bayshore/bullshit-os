"use client";

import { OsHomeLink } from "@/components/chaos/OsHomeLink";
import { ElevationSketch } from "@/components/ElevationSketch";
import { FilterBar } from "@/components/FilterBar";
import { TripCard } from "@/components/TripCard";
import { useWeekendPlan } from "@/hooks/useWeekendPlan";

export default function TrailsPage() {
  const { filters, setBand, setValley, valleys, plans, pick, maybe } = useWeekendPlan();

  return (
    <main className="studio">
      <header className="hero">
        <OsHomeLink aside="accidental product" />
        <h1>Find a loop that fits Saturday.</h1>
        <p className="lede">
          The one page that almost does a job. Public hut-to-hut classics, scored
          against a fake forecast. No accounts. No keys.
        </p>
      </header>

      <FilterBar
        band={filters.band}
        valley={filters.valley}
        valleys={valleys}
        onBand={setBand}
        onValley={setValley}
      />

      {pick ? (
        <section className="pick">
          <TripCard plan={pick} featured />
          <ElevationSketch trail={pick.trail} />
        </section>
      ) : (
        <p className="empty">No trails in that valley yet.</p>
      )}

      <section>
        <h2>{maybe.length} windows above 62</h2>
        <div className="grid">
          {plans.map((plan) => (
            <TripCard key={plan.trail.id} plan={plan} />
          ))}
        </div>
      </section>
    </main>
  );
}
