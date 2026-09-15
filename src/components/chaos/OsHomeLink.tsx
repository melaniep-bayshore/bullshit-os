"use client";

import Link from "next/link";

export function OsHomeLink({ aside, onHover }: { aside: string; onHover?: () => void }) {
  return (
    <p className="eyebrow">
      <Link
        href="/"
        className="os-home"
        title="back to the lobby of regret"
        onMouseEnter={onHover}
      >
        ← Bullshit OS
      </Link>
      <span> · {aside}</span>
    </p>
  );
}
