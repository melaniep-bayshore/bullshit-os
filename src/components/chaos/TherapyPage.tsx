"use client";

import { OsHomeLink } from "@/components/chaos/OsHomeLink";
import { TherapistCouch } from "@/components/chaos/TherapistCouch";
import Link from "next/link";
import { useState } from "react";

export function TherapyPage() {
  const [toast, setToast] = useState("The hour is 50 minutes. We will use none of them well.");

  return (
    <div className="chaos therapy-room">
      <header className="chaos-hero">
        <OsHomeLink
          aside="the couch behind the ticket"
          onHover={() => setToast("this is a door. surprisingly.")}
        />
        <h1>Tell me your sorrows.</h1>
        <p className="lede">
          There is no Steve. There is a couch. Talking is theoretically allowed.
        </p>
        <p className="toast">{toast}</p>
      </header>

      <div className="board">
        <TherapistCouch onToast={setToast} />
      </div>

      <p className="therapy-escape">
        <Link className="os-home" href="/games">
          ← back to the games (coward)
        </Link>
      </p>
    </div>
  );
}
