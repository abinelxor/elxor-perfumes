"use client";

import React from "react";
import TitleWords from "./TitleWords";
import { defaultHome, type SectionHeaderContent } from "@/lib/homeDefaults";

// Decorative emblem for each value, by position
const ICONS: React.ReactNode[] = [
  <>
    <path d="M24 6c6 9 12 15.5 12 23a12 12 0 0 1-24 0C12 21.5 18 15 24 6Z" />
    <path d="M18 30a6 6 0 0 0 6 6" />
  </>,
  <>
    <path d="M8 18 16 8h16l8 10-16 22L8 18Z" />
    <path d="M8 18h32M20 8l-4 10 8 22 8-22-4-10" />
  </>,
  <>
    <path d="M20 6h8v6h-8zM18 12h12l2 6H16l2-6Z" />
    <rect x="11" y="18" width="26" height="24" rx="3" />
    <path d="M17 26h14M17 32h9" />
  </>,
  <>
    <circle cx="24" cy="20" r="12" />
    <path d="m19 20 3.5 3.5L29 17" />
    <path d="m16 30-4 12 7-3 5 5 5-5 7 3-4-12" />
  </>,
];

interface ValuesSectionProps {
  header?: SectionHeaderContent;
  values?: { title: string; text: string }[];
}

export default function ValuesSection({
  header = defaultHome.valuesHeader,
  values = defaultHome.values,
}: ValuesSectionProps) {
  return (
    <section className="values section" aria-labelledby="values-title">
      <header className="section-head">
        <p className="eyebrow" data-reveal>
          {header.eyebrow}
        </p>
        <h2 className="section-title" id="values-title" data-split-reveal>
          <TitleWords white={header.titleWhite} gold={header.titleGold} inline />
        </h2>
        <div className="divider" data-reveal>
          <i />
        </div>
      </header>

      <div className="values__grid">
        {values.map((value, i) => (
          <div className="value" data-reveal key={`${value.title}-${i}`}>
            <svg viewBox="0 0 48 48" aria-hidden="true">
              {ICONS[i % ICONS.length]}
            </svg>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
