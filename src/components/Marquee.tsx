"use client";

import React from "react";

interface MarqueeProps {
  text?: string;
}

export default function Marquee({ text = "Make Every Moment Memorable with ELXOR Perfumes" }: MarqueeProps) {
  // The phrase repeats to fill the moving banner
  const items = Array.from({ length: 6 }, () => text);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <span>{item}</span>
            <img
              src="/images/gold_star-alpha.png"
              alt=""
              width={22}
              height={22}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
