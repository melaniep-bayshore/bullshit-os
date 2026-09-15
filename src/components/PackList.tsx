import { packingList } from "@/lib/pack";
import type { FitnessBand, Trail, WeatherWindow } from "@/types/trail";

interface PackListProps {
  trail: Trail;
  band: FitnessBand;
  window?: WeatherWindow;
}

export function PackList({ trail, band, window }: PackListProps) {
  const items = packingList(trail, band, window);

  return (
    <section className="pack">
      <h2>Pack</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} data-required={item.required}>
            <strong>{item.label}</strong>
            <span>{item.why}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
