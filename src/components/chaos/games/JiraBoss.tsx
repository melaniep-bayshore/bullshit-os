"use client";

import Link from "next/link";
import { useState } from "react";

const EXTRAS = [
  "and dark mode",
  "and IE",
  "and the logo bigger",
  "and also smaller",
  "and a flag nobody will turn off",
];

const CLOSINGS = [
  { btn: "mark Done*", toast: "closed. for a mood. not in the database." },
  { btn: "no i mean actually", toast: "PM: wait can we just quickly…" },
  { btn: "I have dinner plans", toast: "QA: cannot reproduce. also it is broken." },
  { btn: "I SAID DONE", toast: "reopened by Steve (last day: March)." },
  { btn: "close it or I will cry", toast: "legal wants a meeting about the meeting." },
  { btn: "fine. take the sprint.", toast: "cloned into 3 tickets so the board looks busy." },
];

const PINGS = [
  "PM: per my last standup, this is a 5 minute thing.",
  "@you any update? (Friday 18:03)",
  "Datadog, emotionally: it is on fire again.",
  "changing to In Progress so the board looks alive.",
  "acceptance: it should feel premium. premium is a feeling.",
  "a stakeholder pasted a screenshot of Slack. that is the spec.",
];

export function JiraBoss({ onToast }: { onToast: (message: string) => void }) {
  const [title, setTitle] = useState("PROD IS ON FIRE");
  const [points, setPoints] = useState(3);
  const [assignee, setAssignee] = useState("you (obviously)");
  const [tries, setTries] = useState(0);
  const [thread, setThread] = useState<string[]>([
    "opened Friday 17:51. AC: as discussed. you were on mute.",
  ]);
  const [steveOpen, setSteveOpen] = useState(false);

  const closing = CLOSINGS[Math.min(tries, CLOSINGS.length - 1)];

  function say(line: string, toast: string) {
    setThread((lines) => [...lines, line].slice(-6));
    onToast(toast);
  }

  function close() {
    const extra = EXTRAS[tries % EXTRAS.length];
    const nextTries = tries + 1;
    setTries(nextTries);
    setPoints((value) => (value < 8 ? 8 : value < 21 ? 21 : 89));
    setTitle((current) => (current.includes(extra) ? current : `${current} ${extra}`));
    setAssignee("you (obviously)");
    say(`you: ${closing.btn}`, closing.toast);
  }

  function steve() {
    setAssignee("you (obviously)");
    setSteveOpen(true);
    onToast("There is no Steve.");
  }

  function ping() {
    const line = PINGS[Math.floor(Math.random() * PINGS.length)];
    say(line, "comment added. nobody read the ones before it.");
  }

  return (
    <article className="card game" onClick={(event) => event.stopPropagation()}>
      <h2>Bossfight: Jira</h2>
      <p>one ticket. you will not beat it. it has a PM.</p>

      <div className="jira-ticket">
        <strong>PROD-1847 · {points}sp · {assignee}</strong>
        <h3>{title}</h3>
        <ul className="jira-thread">
          {thread.map((line, index) => (
            <li key={`${line}-${index}`}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="jira-btns">
        <button className="btn danger" onClick={close}>
          {closing.btn}
        </button>
        <button className="btn ghost" onClick={steve}>
          assign Steve
        </button>
        <button className="btn ghost" onClick={ping}>
          @you any update?
        </button>
      </div>

      <small>
        {tries === 0
          ? "estimate: 5 minutes. the minutes have children."
          : `${tries} dones. 0 tickets closed. the sprint ended during this sentence.`}
      </small>

      {steveOpen ? (
        <div
          className="modal"
          onClick={() => setSteveOpen(false)}
        >
          <article onClick={(event) => event.stopPropagation()}>
            <p className="eyebrow">people.exe</p>
            <h2>There is no Steve. It&apos;s just you. Fix the problem.</h2>
            <button className="btn danger" onClick={() => setSteveOpen(false)}>
              Ok, I guess
            </button>
            <Link
              className="btn ghost"
              href="/therapy"
              onClick={(event) => event.stopPropagation()}
            >
              talk to a therapist
            </Link>
          </article>
        </div>
      ) : null}
    </article>
  );
}
