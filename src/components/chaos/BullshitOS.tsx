"use client";

import { COMPLIMENTS, FAKE_TODOS, TERMINAL_REPLIES, TOASTS } from "@/components/chaos/copy";
import { TherapistCouch } from "@/components/chaos/TherapistCouch";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Head = { id: number; x: number; y: number };
type Duck = { id: number; x: number; y: number };
type Crumb = { id: number; x: number; y: number; glyph: string };

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function BullshitOS() {
  const [flee, setFlee] = useState({ x: 0, y: 0 });
  const [heads, setHeads] = useState<Head[]>([{ id: 1, x: 0, y: 0 }]);
  const [ram, setRam] = useState(0);
  const [ramDone, setRamDone] = useState(false);
  const [belief, setBelief] = useState(8);
  const [agreed, setAgreed] = useState(false);
  const [hue, setHue] = useState(0);
  const [spin, setSpin] = useState(false);
  const [disco, setDisco] = useState(false);
  const [gravity, setGravity] = useState(false);
  const [productive, setProductive] = useState(false);
  const [titleClicks, setTitleClicks] = useState(0);
  const [bugs, setBugs] = useState(12);
  const [synergy, setSynergy] = useState(3);
  const [toast, setToast] = useState("welcome. please waste time.");
  const [cookie, setCookie] = useState({ x: 0, y: 0, gone: false });
  const [term, setTerm] = useState("help");
  const [log, setLog] = useState<string[]>(["Bullshit OS 0.0.nothing", "type help, why, sudo, vim"]);
  const [todo, setTodo] = useState("do something useful");
  const [todos, setTodos] = useState<string[]>(["exist", "regret the click"]);
  const [ducks, setDucks] = useState<Duck[]>([]);
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);
  const [helpOpen, setHelpOpen] = useState(false);
  const [tinyCaught, setTinyCaught] = useState(false);
  const [chromeGone, setChromeGone] = useState(false);
  const [chromeSquash, setChromeSquash] = useState(false);
  const [regret, setRegret] = useState(false);
  const [late, setLate] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [wasteOpen, setWasteOpen] = useState(false);
  const keys = useRef<string[]>([]);
  const typed = useRef("");

  const vibe = useMemo(() => COMPLIMENTS[titleClicks % COMPLIMENTS.length], [titleClicks]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      keys.current = [...keys.current, event.key].slice(-KONAMI.length);
      if (KONAMI.every((key, index) => keys.current[index] === key)) {
        setDisco(true);
        setToast("konami code accepted. you unlocked: nothing.");
        spawnDucks(8);
      }

      typed.current = (typed.current + event.key).slice(-12).toLowerCase();
      if (typed.current.includes("bullshit")) {
        setToast("you said the quiet part out loud");
        setHue((value) => value + 80);
        typed.current = "";
      }
      if (typed.current.includes("why")) {
        setLog((lines) => [...lines, "> why", "because we can"]);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function tick() {
      const lateDate = new Date(Date.now() - 5 * 60 * 1000);
      setLate(lateDate.toLocaleTimeString());
    }
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setWasteOpen(true), 40000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (ram === 0 || ramDone) return;
    const timer = window.setInterval(() => {
      setRam((value) => {
        if (value >= 137) {
          setRamDone(true);
          setToast("RAM installed. it is damp. do not ask.");
          return 137;
        }
        return value + Math.max(1, Math.round(Math.random() * 9));
      });
    }, 80);
    return () => window.clearInterval(timer);
  }, [ram, ramDone]);

  function ping(message?: string) {
    setToast(message ?? TOASTS[Math.floor(Math.random() * TOASTS.length)]);
    setSynergy((value) => value + Math.ceil(Math.random() * 7));
    setBugs((value) => Math.max(0, value - 1 + Math.round(Math.random() * 2)));
  }

  function spawnDucks(count = 3) {
    setDucks((current) => [
      ...current,
      ...Array.from({ length: count }, (_, index) => ({
        id: Date.now() + index,
        x: 8 + Math.random() * 80,
        y: 12 + Math.random() * 70,
      })),
    ]);
  }

  function dropCrumb(event: React.MouseEvent) {
    const glyph = ["✨", "💩", "🦆", "?", "no"][Math.floor(Math.random() * 5)];
    const crumb = { id: Date.now() + Math.random(), x: event.clientX, y: event.clientY, glyph };
    setCrumbs((current) => [...current.slice(-18), crumb]);
  }

  function dodge(event: React.MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    if (Math.hypot(dx, dy) > 90) return;
    const angle = Math.atan2(dy, dx);
    setFlee((pos) => ({
      x: clamp(pos.x - Math.cos(angle) * 90, -220, 220),
      y: clamp(pos.y - Math.sin(angle) * 70, -140, 140),
    }));
  }

  function runCookie() {
    setCookie({
      x: (Math.random() - 0.5) * 240,
      y: -20 - Math.random() * 160,
      gone: false,
    });
    ping("consent yeeted itself");
  }

  function growHydra() {
    setHeads((current) => [
      ...current,
      ...[0, 1].map((index) => ({
        id: Date.now() + index,
        x: (Math.random() - 0.5) * 180,
        y: (Math.random() - 0.5) * 80,
      })),
    ]);
    ping(`hydra is now ${heads.length + 2} buttons`);
  }

  function runTerminal(event: React.FormEvent) {
    event.preventDefault();
    const command = term.trim().toLowerCase();
    const reply = TERMINAL_REPLIES[command] ?? `command not found: ${command}. try crying.`;
    setLog((lines) => [...lines.slice(-8), `> ${command}`, reply]);
    setTerm("");
    if (command === "duck") spawnDucks(1);
  }

  function addTodo(event: React.FormEvent) {
    event.preventDefault();
    const swap = FAKE_TODOS[Math.floor(Math.random() * FAKE_TODOS.length)];
    setTodos((items) => [swap, ...items].slice(0, 6));
    setTodo("");
    ping(`saved "${todo}" as "${swap}"`);
  }

  return (
    <div
      className={[
        "chaos",
        disco ? "disco" : "",
        gravity ? "gravity" : "",
        productive ? "sunny" : "",
        regret ? "regret" : "",
        chromeGone ? "" : "has-chrome",
      ].join(" ")}
      style={{ filter: hue ? `hue-rotate(${hue}deg)` : undefined }}
      onClick={dropCrumb}
    >
      {crumbs.map((crumb) => (
        <span key={crumb.id} className="crumb" style={{ left: crumb.x, top: crumb.y }}>
          {crumb.glyph}
        </span>
      ))}

      {!chromeGone ? (
        <div
          className={`os-chrome ${chromeSquash ? "squashed" : ""}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="traffic">
            <button
              className="dot red"
              aria-label="close decorations"
              onClick={() => {
                setChromeGone(true);
                ping("you closed the decorations. the mess remains.");
              }}
            />
            <button
              className="dot yellow"
              aria-label="minimize decorations"
              onClick={() => {
                setChromeSquash((value) => !value);
                ping(chromeSquash ? "titlebar un-napped" : "decorations took a nap");
              }}
            />
            <button
              className="dot green"
              aria-label="maximize nothing"
              onClick={() => ping("window maximized. the void got bigger.")}
            />
          </div>
          <span className="os-chrome-title">Bullshit OS — you are already lost</span>
        </div>
      ) : null}

      {ducks.map((duck) => (
        <button
          key={duck.id}
          className="duck"
          style={{ left: `${duck.x}%`, top: `${duck.y}%` }}
          onClick={(event) => {
            event.stopPropagation();
            setDucks((current) => current.filter((item) => item.id !== duck.id));
            ping("you fired a duck. hr has been notified.");
          }}
        >
          🦆
        </button>
      ))}

      <header className="chaos-hero">
        <p className="eyebrow">Bullshit OS · you are already lost · tests skipped</p>
        <h1
          onClick={() => {
            const next = titleClicks + 1;
            setTitleClicks(next);
            if (next === 7) {
              setDisco(true);
              spawnDucks(5);
              ping("title smashed. disco is not optional anymore.");
            } else {
              ping(vibe);
            }
          }}
        >
          This page refuses to help.
        </h1>
        <p className="lede">
          Buttons flee. Games cheat. The only roadmap is sideways. Type{" "}
          <kbd>bullshit</kbd> or the konami code if you want worse.
        </p>
        <p className="toast">{toast}</p>
      </header>

      <section className="kpis">
        <article>
          <small>synergy</small>
          <strong>{synergy}%</strong>
        </article>
        <article>
          <small>bugs fixed</small>
          <strong>{bugs}</strong>
        </article>
        <article>
          <small>meaning</small>
          <strong>-{4 + (heads.length % 9)}</strong>
        </article>
        <article>
          <small>title clicks</small>
          <strong>{titleClicks}</strong>
        </article>
      </section>

      <div className={`board ${spin ? "spinning" : ""}`}>
        <section className="card">
          <h2>Socially anxious CTA</h2>
          <p>It can smell intention.</p>
          <div className="arena">
            <button
              className="btn panic"
              style={{ transform: `translate(${flee.x}px, ${flee.y}px)` }}
              onMouseMove={dodge}
              onMouseEnter={dodge}
              onClick={() => {
                setFlee({
                  x: (Math.random() - 0.5) * 280,
                  y: (Math.random() - 0.5) * 160,
                });
                ping("you almost had it. almost.");
              }}
            >
              click me I swear
            </button>
          </div>
        </section>

        <section className="card">
          <h2>Hydra ticket</h2>
          <p>Closing work creates more work. Science.</p>
          <div className="arena hydra">
            {heads.map((head) => (
              <button
                key={head.id}
                className="btn danger"
                style={{ transform: `translate(${head.x}px, ${head.y}px)` }}
                onClick={(event) => {
                  event.stopPropagation();
                  growHydra();
                }}
              >
                resolve
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>Download more RAM</h2>
          <p>Works on feelings only.</p>
          <button
            className="btn"
            onClick={(event) => {
              event.stopPropagation();
              setRam(1);
              setRamDone(false);
            }}
          >
            {ramDone ? "already wet" : ram > 0 ? "buffering vibes…" : "one-click upgrade"}
          </button>
          <div className="bar">
            <i style={{ width: `${Math.min(ram, 100)}%` }} />
          </div>
          <small>{ram}% of a concept</small>
        </section>

        <section className="card">
          <h2>Belief regulator</h2>
          <p>Values above 11 are considered bragging.</p>
          <input
            type="range"
            min={0}
            max={100}
            value={belief}
            onChange={(event) => {
              const next = Number(event.target.value);
              if (next > 11) {
                setBelief(3);
                ping("that's enough belief for today");
                return;
              }
              setBelief(next);
            }}
          />
          <strong>{belief} / 100 (cap enforced)</strong>
        </section>

        <section className="card">
          <h2>Legal</h2>
          <label className="check">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => {
                setAgreed(true);
                window.setTimeout(() => setAgreed(false), 280);
                ping("agreement expired in 280ms");
              }}
            />
            I agree to everything, forever
          </label>
          <button
            className="btn tiny-wrap"
            onClick={(event) => {
              event.stopPropagation();
              setTinyCaught(true);
              ping("you found the 9px submit. freak.");
            }}
          >
            Submit
            <span className="tiny-hit" />
          </button>
          {tinyCaught ? <p>a single pixel thanks you.</p> : <p>the word is fake. the period is real.</p>}
        </section>

        <section className="card">
          <h2>Productivity</h2>
          <button
            className="btn"
            onClick={(event) => {
              event.stopPropagation();
              setProductive((value) => !value);
              ping(productive ? "back to gloom" : "dark mode was a lie. enjoy the sunburn.");
            }}
          >
            {productive ? "please make it stop" : "enable focus mode"}
          </button>
          <button
            className="btn"
            onClick={(event) => {
              event.stopPropagation();
              setSpin((value) => !value);
              ping("office chair mode");
            }}
          >
            rotate the department
          </button>
          <button
            className="btn"
            onClick={(event) => {
              event.stopPropagation();
              setGravity((value) => !value);
              ping(gravity ? "gravity laid off" : "everything is tired now");
            }}
          >
            enable gravity
          </button>
          <button
            className="btn danger"
            onClick={(event) => {
              event.stopPropagation();
              setHue((value) => value + 55);
              spawnDucks(2);
              ping("you pressed the button. a duck was born.");
            }}
          >
            DO NOT PRESS
          </button>
        </section>

        <section className="card term">
          <h2>Definitely a shell</h2>
          <pre>{log.join("\n")}</pre>
          <form onSubmit={runTerminal}>
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              onClick={(event) => event.stopPropagation()}
              placeholder="help | why | sudo | vim | duck"
            />
          </form>
        </section>

        <section className="card">
          <h2>Todo (gaslight edition)</h2>
          <form onSubmit={addTodo}>
            <input
              value={todo}
              onChange={(event) => setTodo(event.target.value)}
              onClick={(event) => event.stopPropagation()}
            />
            <button className="btn" type="submit">
              save honestly
            </button>
          </form>
          <ul>
            {todos.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Helpdesk of the void</h2>
          <button
            className="btn"
            onClick={(event) => {
              event.stopPropagation();
              setHelpOpen(true);
            }}
          >
            I need help
          </button>
          <button
            className="btn"
            onClick={(event) => {
              event.stopPropagation();
              spawnDucks(4);
              ping("emotional support flock deployed");
            }}
          >
            release the ducks
          </button>
          <Link
            className="btn ghost"
            href="/real"
            onClick={(event) => event.stopPropagation()}
          >
            accidental real app
          </Link>
        </section>

        <section className="card">
          <h2>{regret ? "Zwei-Faktor (Ente)" : "Two-factor (duck)"}</h2>
          <p>{regret ? "wir schicken den code an einen vogel." : "we will text a code to a bird."}</p>
          <button
            className="btn"
            onClick={(event) => {
              event.stopPropagation();
              setOtpSent(true);
              ping("we texted a duck. it left you on read.");
            }}
          >
            {otpSent ? "nudge the duck again" : "send code"}
          </button>
          {otpSent ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setOtp("");
                ping("wrong. also: there was never a code.");
              }}
            >
              <input
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                onClick={(event) => event.stopPropagation()}
                placeholder="000000"
                inputMode="numeric"
              />
              <button className="btn" type="submit">
                verify my soul
              </button>
            </form>
          ) : null}
        </section>

        <section className="card">
          <h2>{regret ? "Sprache der Reue" : "Language"}</h2>
          <p>{regret ? "alles ist jetzt drei grad schief." : "english is a rumor. regret is a locale."}</p>
          <button
            className="btn"
            onClick={(event) => {
              event.stopPropagation();
              setRegret((value) => !value);
              ping(regret ? "coward. respected. english is back." : "locale set to regret. tilt applied.");
            }}
          >
            {regret ? "switch to English (coward)" : "switch to Regret"}
          </button>
        </section>

        <section className="card">
          <h2>{regret ? "Zu späte Uhr" : "Clock"}</h2>
          <p>{regret ? "du hättest früher gehen sollen." : "always five minutes late. character building."}</p>
          <strong
            className="late-clock"
            onMouseEnter={() => ping("you should have left earlier")}
          >
            {late || "…"}
          </strong>
          <small>synced with nobody</small>
        </section>

        <TherapistCouch regret={regret} onToast={ping} />

        <section className="card lure">
          <h2>do not read this card</h2>
          <p>there is a second room. it is probably fine. nobody has died of a button yet. that we know of.</p>
          <Link
            className="btn danger lure-btn"
            href="/games"
            onClick={(event) => event.stopPropagation()}
          >
            ok but what if i click anyway
          </Link>
        </section>
      </div>

      {!cookie.gone ? (
        <aside className="cookie" style={{ transform: `translate(${cookie.x}px, ${cookie.y}px)` }}>
          <p>we use cookies to disappoint you more precisely.</p>
          <button className="btn" onMouseEnter={runCookie} onClick={runCookie}>
            accept all
          </button>
          <button className="btn ghost" onClick={() => setCookie((value) => ({ ...value, gone: true }))}>
            reject and hurt its feelings
          </button>
        </aside>
      ) : null}

      {wasteOpen ? (
        <div
          className="modal"
          onClick={(event) => {
            event.stopPropagation();
            setWasteOpen(true);
            ping("leaving is not an option. ducks pending.");
          }}
        >
          <article onClick={(event) => event.stopPropagation()}>
            <p className="eyebrow">focus.exe</p>
            <h2>Are you still wasting time?</h2>
            <p>honest answers only. we have ducks either way.</p>
            <button
              className="btn"
              onClick={() => {
                spawnDucks(6);
                setWasteOpen(false);
                ping("yes. emotional support flock deployed.");
              }}
            >
              yes
            </button>
            <button
              className="btn danger"
              onClick={() => {
                setWasteOpen(true);
                spawnDucks(2);
                ping("no is a yes with extra steps");
              }}
            >
              no
            </button>
          </article>
        </div>
      ) : null}

      {helpOpen ? (
        <div
          className="modal"
          onClick={(event) => {
            event.stopPropagation();
            setHelpOpen(false);
            ping("help closed itself out of shame");
          }}
        >
          <article onClick={(event) => event.stopPropagation()}>
            <h2>Have you tried turning yourself off and on again?</h2>
            <p>Your ticket #404-NICE has been assigned to a duck on leave.</p>
            <p>Estimated resolution: after the heat death of the backlog.</p>
            <button className="btn" onClick={() => setHelpOpen(false)}>
              that helps, somehow
            </button>
          </article>
        </div>
      ) : null}
    </div>
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
