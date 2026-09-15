"use client";

import { useState } from "react";

const REPLIES = [
  "Hm... sounds shitty. Sorry for you :( I PayPalled you €0. Go and buy ice cream, maybe that helps.",
  ".... shit, you are back.",
];

export function TherapistCouch({
  regret = false,
  onToast,
}: {
  regret?: boolean;
  onToast?: (message: string) => void;
}) {
  const [sorrow, setSorrow] = useState("");
  const [session, setSession] = useState<string[]>([]);
  const [visits, setVisits] = useState(0);

  return (
    <section className="card term span-2">
      <h2>{regret ? "Therapeut (0€)" : "Therapist (€0)"}</h2>
      <p>{regret ? "Erzähl mir dein Leid." : "Tell me your sorrows."}</p>
      <pre>
        {session.length ? session.join("\n") : "The couch is a textarea. I bill in ice cream."}
      </pre>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const line = sorrow.trim() || "(silence. loud.)";
          const reply = REPLIES[visits % REPLIES.length];
          setVisits((value) => value + 1);
          setSession((lines) => [...lines.slice(-6), `you: ${line}`, reply].slice(-8));
          setSorrow("");
          onToast?.("Session invoiced: €0 and a vibe.");
        }}
      >
        <input
          value={sorrow}
          onChange={(event) => setSorrow(event.target.value)}
          onClick={(event) => event.stopPropagation()}
          placeholder="Tell me your sorrows"
        />
        <button className="btn" type="submit">
          dump feelings
        </button>
      </form>
    </section>
  );
}
