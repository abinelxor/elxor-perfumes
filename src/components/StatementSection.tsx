"use client";

import React, { useEffect, useRef } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { defaultHome, type NarrativeBlock } from "@/lib/homeDefaults";

const narrativeComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="statement__lead">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    brand: ({ children }) => <span className="brand">{children}</span>,
  },
};

interface StatementSectionProps {
  text?: string;
  gold?: string;
  narrative?: NarrativeBlock[];
}

export default function StatementSection({
  text = defaultHome.statementText,
  gold = defaultHome.statementGold,
  narrative = defaultHome.statementNarrative,
}: StatementSectionProps) {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const words = [
    ...text.split(/\s+/).filter(Boolean).map((word) => ({ text: word, isBrand: word === "ELXOR" })),
    ...gold.split(/\s+/).filter(Boolean).map((word) => ({ text: word, isGold: true })),
  ] as { text: string; isBrand?: boolean; isGold?: boolean }[];

  useEffect(() => {
    let lastLit = -1;

    const handleScroll = () => {
      const el = statementRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;

      const prog = Math.min(
        1,
        Math.max(0, (vh * 0.88 - r.top) / (vh * 0.6))
      );
      const lit = Math.round(prog * words.length);

      if (lit === lastLit) return;
      lastLit = lit;

      wordRefs.current.forEach((w, i) => {
        if (!w) return;
        if (i < lit) {
          w.classList.add("on");
        } else {
          w.classList.remove("on");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [words.length]);

  return (
    <section className="statement" id="about" aria-label="Brand statement">
      <span className="statement__quote" aria-hidden="true">
        &ldquo;
      </span>
      <p className="statement__text js-highlight" ref={statementRef}>
        {words.map((w, i) => (
          <span
            key={i}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className={`w ${w.isBrand ? "brand" : ""} ${
              w.isGold ? "gold-text" : ""
            }`}
          >
            {w.text}
          </span>
        ))}
      </p>
      <div className="statement__narrative" data-reveal>
        <PortableText
          value={narrative as Parameters<typeof PortableText>[0]["value"]}
          components={narrativeComponents}
        />
      </div>
      <p className="wordmark" data-reveal>
        <span className="brand">ELXOR</span>
      </p>
    </section>
  );
}
