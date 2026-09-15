"use client";

import { useRef, useState } from "react";

type Phase = "idle" | "wait" | "now" | "fail";

export function ReactionScam({ onToast }: { onToast: (message: string) => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [ms, setMs] = useState<number | null>(null);
  const started = useRef(0);
  const timer = useRef<number>(0);

  function arm() {
    window.clearTimeout(timer.current);
    setPhase("wait");
    setMs(null);
    timer.current = window.setTimeout(() => {
      started.current = Date.now();
      setPhase("now");
    }, 800 + Math.random() * 1600);
  }

  function slap() {
    if (phase === "wait") {
      window.clearTimeout(timer.current);
      setPhase("fail");
      setMs(null);
      onToast("too early. you lunged at a vibe.");
      return;
    }
    if (phase !== "now") return;
    const delta = Date.now() - started.current;
    setMs(delta);
    setPhase("fail");
    onToast(delta < 180 ? "bot detected. no human is that eager." : "window was 12ms. you are soup.");
  }

  const label =
    phase === "wait" ? "wait…" : phase === "now" ? "NOW" : phase === "fail" ? "again, coward" : "start";

  return (
    <article className="card game" onClick={(event) => event.stopPropagation()}>
      <h2>Reaction test</h2>
      <p>wait for green. do not be a person about it.</p>
      <button
        className={`btn reaction ${phase}`}
        onClick={() => {
          if (phase === "idle" || phase === "fail") arm();
          else slap();
        }}
      >
        {label}
      </button>
      {ms !== null ? <small>your time: {ms}ms (invalid, emotionally)</small> : <small>green means regret</small>}
    </article>
  );
}
