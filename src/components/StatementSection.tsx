"use client";

import React, { useEffect, useRef, useState } from "react";

export default function StatementSection() {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const words = [
    { text: "ELXOR", isBrand: true },
    { text: "is" },
    { text: "more" },
    { text: "than" },
    { text: "a" },
    { text: "fragrance." },
    { text: "It" },
    { text: "is" },
    { text: "a" },
    { text: "signature.", isGold: true },
  ];

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
    <section className="statement" aria-label="Brand statement">
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
            {w.text}{" "}
          </span>
        ))}
      </p>
      <p className="wordmark" data-reveal>
        <span className="brand">ELXOR</span>
      </p>
    </section>
  );
}
