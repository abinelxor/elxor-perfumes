"use client";

import React from "react";

export default function ValuesSection() {
  return (
    <section className="values section" aria-labelledby="values-title">
      <header className="section-head">
        <p className="eyebrow" data-reveal>
          Our Values
        </p>
        <h2 className="section-title" id="values-title" data-split-reveal>
          <span className="w" style={{ "--i": 0 } as React.CSSProperties}>What</span>
          <span className="w" style={{ "--i": 1 } as React.CSSProperties}>every</span>
          <span className="w" style={{ "--i": 2 } as React.CSSProperties}>bottle</span>
          <span className="w gold-text" style={{ "--i": 3 } as React.CSSProperties}>carries</span>
        </h2>
        <div className="divider" data-reveal>
          <i />
        </div>
      </header>

      <div className="values__grid">
        <div className="value" data-reveal>
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M24 6c6 9 12 15.5 12 23a12 12 0 0 1-24 0C12 21.5 18 15 24 6Z" />
            <path d="M18 30a6 6 0 0 0 6 6" />
          </svg>
          <h3>Quality</h3>
          <p>Only the finest ingredients for exceptional fragrances.</p>
        </div>

        <div className="value" data-reveal>
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M8 18 16 8h16l8 10-16 22L8 18Z" />
            <path d="M8 18h32M20 8l-4 10 8 22 8-22-4-10" />
          </svg>
          <h3>Elegance</h3>
          <p>Fragrances that reflect refinement and class.</p>
        </div>

        <div className="value" data-reveal>
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M20 6h8v6h-8zM18 12h12l2 6H16l2-6Z" />
            <rect x="11" y="18" width="26" height="24" rx="3" />
            <path d="M17 26h14M17 32h9" />
          </svg>
          <h3>Craftsmanship</h3>
          <p>Meticulously crafted with attention to detail.</p>
        </div>

        <div className="value" data-reveal>
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="20" r="12" />
            <path d="m19 20 3.5 3.5L29 17" />
            <path d="m16 30-4 12 7-3 5 5 5-5 7 3-4-12" />
          </svg>
          <h3>Authenticity</h3>
          <p>True fragrances for true individuals.</p>
        </div>
      </div>
    </section>
  );
}
