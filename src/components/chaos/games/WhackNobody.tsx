"use client";

import { useState } from "react";

export function WhackNobody({ onToast }: { onToast: (message: string) => void }) {
  const [mole, setMole] = useState(2);
  const [you, setYou] = useState(0);
  const [them, setThem] = useState(0);

  function miss(index: number) {
    setThem((value) => value + 1);
    setMole((current) => {
      const next = [0, 1, 2, 3, 4, 5].filter((hole) => hole !== current && hole !== index);
      return next[Math.floor(Math.random() * next.length)] ?? 0;
    });
    onToast("the mole filed a restraining order");
  }

  return (
    <article className="card game" onClick={(event) => event.stopPropagation()}>
      <h2>Whack-a-mole</h2>
      <p>if you can hover it, you do not deserve it.</p>
      <div className="holes">
        {Array.from({ length: 6 }, (_, index) => (
          <button
            key={index}
            className={`hole ${mole === index ? "up" : ""}`}
            onMouseEnter={() => {
              if (mole === index) miss(index);
            }}
            onClick={() => {
              if (mole === index) {
                setYou(0);
                miss(index);
              }
            }}
          >
            {mole === index ? "🐹" : "·"}
          </button>
        ))}
      </div>
      <small>
        you {you} — moles {them}
      </small>
    </article>
  );
}
