"use client";

import React from "react";

export default function Marquee() {
  const items = [
    "Make Every Moment Memorable with ELXOR Perfumes",
    "Make Every Moment Memorable with ELXOR Perfumes",
    "Make Every Moment Memorable with ELXOR Perfumes",
    "Make Every Moment Memorable with ELXOR Perfumes",
    "Make Every Moment Memorable with ELXOR Perfumes",
    "Make Every Moment Memorable with ELXOR Perfumes",
  ];

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
