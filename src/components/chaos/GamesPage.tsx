"use client";

import { OsHomeLink } from "@/components/chaos/OsHomeLink";
import { GaslightToe } from "@/components/chaos/games/GaslightToe";
import { GuessWrong } from "@/components/chaos/games/GuessWrong";
import { JiraBoss } from "@/components/chaos/games/JiraBoss";
import { PsychicRps } from "@/components/chaos/games/PsychicRps";
import { ReactionScam } from "@/components/chaos/games/ReactionScam";
import { WhackNobody } from "@/components/chaos/games/WhackNobody";
import { useEffect, useState } from "react";

export function GamesPage() {
  const [hacked, setHacked] = useState(false);
  const [toast, setToast] = useState("you were warned. kind of.");

  useEffect(() => {
    const timer = window.setTimeout(() => setHacked(true), 450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="chaos games-room">
      <header className="chaos-hero">
        <OsHomeLink
          aside="the room behind the button"
          onHover={() => setToast("this is a door. surprisingly.")}
        />
        <h1>You clicked anyway.</h1>
        <p className="lede">
          Nothing here is fair. That was the whole pitch. You may leave whenever you like.
          You will not.
        </p>
        <p className="toast">{toast}</p>
      </header>

      <div className="board">
        <JiraBoss onToast={setToast} />
        <PsychicRps onToast={setToast} />
        <GuessWrong onToast={setToast} />
        <ReactionScam onToast={setToast} />
        <WhackNobody onToast={setToast} />
        <GaslightToe onToast={setToast} />
      </div>

      {hacked ? (
        <div className="modal" onClick={() => setHacked(false)}>
          <article className="hack-pop" onClick={(event) => event.stopPropagation()}>
            <p className="eyebrow">security.exe</p>
            <h2>Maybe I now hacked you.</h2>
            <p>Or maybe not. We don&apos;t know. :)</p>
            <p>Your cookies are fine. Your dignity is pending.</p>
            <button className="btn danger" onClick={() => setHacked(false)}>
              sure, whatever
            </button>
          </article>
        </div>
      ) : null}
    </div>
  );
}
