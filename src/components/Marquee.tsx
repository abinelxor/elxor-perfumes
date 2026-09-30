"use client";

import React from "react";

export default function Marquee() {
  const items = [
    "Noir Essence",
    "Royal Oud",
    "Silver Ambre",
    "Velvet Rouge",
    "Noir Essence",
    "Royal Oud",
    "Silver Ambre",
    "Velvet Rouge",
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
