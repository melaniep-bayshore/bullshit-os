import { weatherLabel } from "@/lib/format";
import type { WeatherWindow } from "@/types/trail";

interface WeatherStripProps {
  windows: WeatherWindow[];
}

export function WeatherStrip({ windows }: WeatherStripProps) {
  return (
    <ol className="weather-strip">
      {windows.map((window) => (
        <li key={window.date} data-rating={window.rating}>
          <strong>{window.date.slice(5)}</strong>
          <span>{weatherLabel(window)}</span>
          <em>{window.freezingLevelM} m frost</em>
        </li>
      ))}
    </ol>
  );
}
