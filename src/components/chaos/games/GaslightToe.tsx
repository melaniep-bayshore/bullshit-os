"use client";

import { useRef, useState } from "react";

type Cell = "X" | "O" | null;
type Status = "playing" | "stealing" | "over";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

const EMPTY: Cell[] = Array.from({ length: 9 }, () => null);

export function GaslightToe({ onToast }: { onToast: (message: string) => void }) {
  const [board, setBoard] = useState<Cell[]>(EMPTY);
  const [status, setStatus] = useState<Status>("playing");
  const [note, setNote] = useState("you are X. you start. this is fine.");
  const [line, setLine] = useState<number[] | null>(null);
  const lock = useRef(false);

  function reset() {
    lock.current = false;
    setBoard(EMPTY);
    setStatus("playing");
    setLine(null);
    setNote("again? brave. you are X. you start.");
  }

  function play(index: number) {
    if (lock.current || status === "over" || board[index]) return;
    lock.current = true;

    const asX = write(board, index, "X");
    const lastCell = empties(board).length === 1;
    const playerWouldWin = winner(asX) === "X";

    if (playerWouldWin || lastCell) {
      setBoard(asX);
      setStatus("stealing");
      setNote("nice finish. wait.");
      window.setTimeout(() => {
        const stolen = forceOWin(write(board, index, "O"));
        const win = winningLine(stolen, "O");
        setBoard(stolen);
        setLine(win);
        setStatus("over");
        setNote("plot twist: that was an O. i win. always have.");
        onToast("tic-tac-toe called. you were X until it mattered.");
        lock.current = false;
      }, 280);
      return;
    }

    setBoard(asX);
    setNote("cute. my turn.");
    window.setTimeout(() => {
      const next = computerMove(asX);
      setBoard(next);
      setNote("your move, sunshine.");
      lock.current = false;
    }, 420);
  }

  return (
    <article className="card game" onClick={(event) => event.stopPropagation()}>
      <h2>Tic-tac-toe (fair)</h2>
      <p>{note}</p>
      <div className="ttt">
        {board.map((cell, index) => (
          <button
            key={index}
            className={[
              "ttt-cell",
              cell === "O" ? "o" : "",
              cell === "X" ? "x" : "",
              line?.includes(index) ? "win" : "",
              status === "stealing" && cell === "X" ? "lying" : "",
            ].join(" ")}
            onClick={() => play(index)}
            disabled={status === "over" || Boolean(cell)}
          >
            {cell ?? ""}
          </button>
        ))}
      </div>
      <button className="btn" onClick={reset}>
        rematch (still cursed)
      </button>
    </article>
  );
}

function write(board: Cell[], index: number, mark: Cell): Cell[] {
  const next = board.slice();
  next[index] = mark;
  return next;
}

function empties(board: Cell[]): number[] {
  return board.flatMap((cell, index) => (cell ? [] : [index]));
}

function winner(board: Cell[]): Cell {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

function winningLine(board: Cell[], mark: Cell): number[] | null {
  for (const triple of LINES) {
    if (triple.every((index) => board[index] === mark)) return [...triple];
  }
  return null;
}

function computerMove(board: Cell[]): Cell[] {
  const spots = empties(board);
  if (spots.length === 0) return board;

  const nonBlocking = spots.filter((index) => winner(write(board, index, "X")) !== "X");
  const pool = nonBlocking.length > 0 ? nonBlocking : spots;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return write(board, pick, "O");
}

function forceOWin(board: Cell[]): Cell[] {
  if (winner(board) === "O") return board;

  const ranked = LINES.slice().sort((left, right) => oScore(board, right) - oScore(board, left));
  const next = board.slice();
  for (const index of ranked[0]) next[index] = "O";
  return next;
}

function oScore(board: Cell[], triple: readonly number[]): number {
  return triple.reduce((sum, index) => sum + (board[index] === "O" ? 2 : board[index] === null ? 1 : 0), 0);
}
