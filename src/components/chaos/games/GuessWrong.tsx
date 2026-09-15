"use client";

import { useState } from "react";

export function GuessWrong({ onToast }: { onToast: (message: string) => void }) {
  const [pick, setPick] = useState<number | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const [wrongs, setWrongs] = useState(0);

  function guess(value: number) {
    const other = value === 7 ? 3 : ((value + 3) % 10) + 1;
    setPick(value);
    setAnswer(other);
    setWrongs((count) => count + 1);
    onToast(`it was ${other}. everyone knew.`);
  }

  return (
    <article className="card game" onClick={(event) => event.stopPropagation()}>
      <h2>Guess the number</h2>
      <p>1 to 10. i already picked. no i will not show you.</p>
      <div className="nums">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
          <button key={value} className="btn ghost" onClick={() => guess(value)}>
            {value}
          </button>
        ))}
      </div>
      {pick ? (
        <p className="game-score">
          you said {pick}. heinous. it was {answer}.
        </p>
      ) : (
        <small>trust is a skill issue.</small>
      )}
      {wrongs >= 4 ? <small> {wrongs} wrongs. statistically a lifestyle.</small> : null}
    </article>
  );
}
