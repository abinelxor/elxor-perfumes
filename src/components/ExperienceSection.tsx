"use client";

import React, { useEffect, useRef } from "react";

interface ExperienceSectionProps {
  onDiscoverClick?: () => void;
}

export default function ExperienceSection({
  onDiscoverClick,
}: ExperienceSectionProps) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    const img = imgRef.current;
    if (!media || !img) return;

    const update = () => {
      if (window.innerWidth <= 860) return; // stacked layout: no scroll-linked motion
      const vh = window.innerHeight;
      const r = media.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const off = (r.top + r.height / 2 - vh / 2) * -0.06;
      img.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;

    };

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDiscoverClick) {
      onDiscoverClick();
    } else {
      document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="split split--image-right" id="experience">
      <div className="split__media" ref={mediaRef} data-parallax="-0.06">
        <img
          ref={imgRef}
          src="/images/experience-sanctix.webp"
          alt="ELXOR Sanctix Eau de Parfum on white silk and marble with a gold arch"
          width={1024}
          height={1536}
          loading="lazy"
        />
      </div>

      <div className="split__content">
        <p className="eyebrow" data-reveal>
          <span className="brand">ELXOR</span> Experience
        </p>

        <h2 className="section-title section-title--left" data-split-reveal>
          <span className="w" style={{ "--i": 0 } as React.CSSProperties}>Your</span>
          <span className="w" style={{ "--i": 1 } as React.CSSProperties}>scent.</span>
          <br />
          <span className="w gold-text" style={{ "--i": 2 } as React.CSSProperties}>Your</span>
          <span className="w gold-text" style={{ "--i": 3 } as React.CSSProperties}>signature.</span>
        </h2>

        <div className="divider divider--left" data-reveal>
          <i />
        </div>

        <p className="split__text" data-reveal>
          More than a fragrance, <span className="brand">ELXOR</span> is a
          reflection of who you are. Each note is a journey, each creation a
          memory, designed to leave a lasting impression.
        </p>

        <div data-reveal>
          <a href="#collection" className="btn btn--ghost" onClick={handleClick}>
            Shop Now <i className="arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
