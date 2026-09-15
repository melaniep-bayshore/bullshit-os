"use client";

import { useState } from "react";

const MOVES = ["rock", "paper", "scissors"] as const;
type Move = (typeof MOVES)[number];

const BEATS: Record<Move, Move> = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

const GLYPH: Record<Move, string> = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

export function PsychicRps({ onToast }: { onToast: (message: string) => void }) {
  const [you, setYou] = useState<Move | null>(null);
  const [cpu, setCpu] = useState<Move | null>(null);
  const [thinking, setThinking] = useState(false);
  const [losses, setLosses] = useState(0);

  function throwMove(move: Move) {
    if (thinking) return;
    setYou(move);
    setCpu(null);
    setThinking(true);

    window.setTimeout(() => {
      setCpu(BEATS[move]);
      setThinking(false);
      setLosses((value) => value + 1);
      onToast("the computer waited. then it cheated. legally.");
    }, 700);
  }

  return (
    <article className="card game" onClick={(event) => event.stopPropagation()}>
      <h2>Rock paper scissors</h2>
      <p>I pick second. that is called strategy.</p>
      <div className="rps">
        {MOVES.map((move) => (
          <button key={move} className="btn" onClick={() => throwMove(move)} disabled={thinking}>
            {GLYPH[move]} {move}
          </button>
        ))}
      </div>
      <p className="game-score">
        you {you ? GLYPH[you] : "—"} vs cpu {thinking ? "…" : cpu ? GLYPH[cpu] : "—"}
      </p>
      <small>record: 0–{losses}–0. character building.</small>
    </article>
  );
}
