import React from "react";

const lines = (text: string | undefined) =>
  (text ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const wordsOf = (line: string) => line.split(/\s+/).filter(Boolean);

/** Number of word spans a title renders (used to number the elements that follow it). */
export function titleWordCount(white?: string, gold?: string): number {
  return [...lines(white), ...lines(gold)].reduce((n, line) => n + wordsOf(line).length, 0);
}

interface TitleWordsProps {
  white?: string;
  gold?: string;
  /** index of the first word (drives the staggered reveal) */
  start?: number;
  /** keep the gold part on the same line as the white part */
  inline?: boolean;
}

/**
 * Two-tone headline split into animated word spans: white lines first, then gold
 * lines. Each line break in the text becomes a <br />. Matches the markup the
 * reveal animations were originally written against.
 */
export default function TitleWords({ white, gold, start = 0, inline = false }: TitleWordsProps) {
  const whiteLines = lines(white);
  const goldLines = lines(gold);
  let index = start;

  const renderLine = (line: string, isGold: boolean) =>
    wordsOf(line).map((word) => {
      const i = index++;
      return (
        <span
          key={`${isGold ? "g" : "w"}-${i}`}
          className={isGold ? "w gold-text" : "w"}
          style={{ "--i": i } as React.CSSProperties}
        >
          {word}
        </span>
      );
    });

  const out: React.ReactNode[] = [];
  const all: { line: string; gold: boolean }[] = [
    ...whiteLines.map((line) => ({ line, gold: false })),
    ...goldLines.map((line) => ({ line, gold: true })),
  ];

  all.forEach((entry, n) => {
    if (n > 0) {
      const joinsGoldInline = inline && entry.gold && !all[n - 1].gold;
      if (!joinsGoldInline) out.push(<br key={`br-${n}`} />);
    }
    out.push(...renderLine(entry.line, entry.gold));
  });

  return <>{out}</>;
}
