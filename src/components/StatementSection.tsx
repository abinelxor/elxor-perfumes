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
            {w.text}
          </span>
        ))}
      </p>
      <div className="statement__narrative" data-reveal>
        <p className="statement__lead">
          <strong className="brand">ELXOR Perfumes</strong> is a Dubai-based luxury fragrance brand created for those who believe a fragrance should be more than just a scent—it should become a signature of presence. Our collection combines refined fragrance artistry, sophisticated character, and long-lasting performance to create memorable scents for modern lifestyles. Our current collection features two distinctive unisex Eau de Parfum collections, <strong>AMORIEL</strong> and <strong>SANCTIX</strong>, each designed to transcend traditional boundaries and offer an elegant expression that can be enjoyed as a <em>perfume for men</em> or a <em>perfume for women</em>. Whether you are searching for the best perfume for men, the best perfumes for women, or a versatile unisex fragrance, ELXOR offers sophisticated aromas designed to leave a lasting impression.
        </p>
      </div>
      <p className="wordmark" data-reveal>
        <span className="brand">ELXOR</span>
      </p>
    </section>
  );
}
