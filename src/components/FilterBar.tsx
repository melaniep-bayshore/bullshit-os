import type { FitnessBand } from "@/types/trail";

const BANDS: FitnessBand[] = ["easy", "steady", "spicy"];

interface FilterBarProps {
  band: FitnessBand;
  valley: string;
  valleys: string[];
  onBand: (band: FitnessBand) => void;
  onValley: (valley: string) => void;
}

export function FilterBar({ band, valley, valleys, onBand, onValley }: FilterBarProps) {
  return (
    <form className="filters" onSubmit={(event) => event.preventDefault()}>
      <fieldset>
        <legend>Fitness</legend>
        {BANDS.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="band"
              checked={band === option}
              onChange={() => onBand(option)}
            />
            {option}
          </label>
        ))}
      </fieldset>

      <label className="valley-pick">
        Valley
        <select value={valley} onChange={(event) => onValley(event.target.value)}>
          <option value="any">Any valley</option>
          {valleys.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}
