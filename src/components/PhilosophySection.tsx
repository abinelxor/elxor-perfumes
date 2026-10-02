"use client";

import React, { useEffect, useRef } from "react";

export default function PhilosophySection() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    const img = imgRef.current;
    if (!media || !img) return;

    const handleScroll = () => {
      const vh = window.innerHeight;
      const r = media.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const off = (r.top + r.height / 2 - vh / 2) * -0.06;
      img.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="split split--image-left" id="philosophy">
      <div className="split__media" ref={mediaRef} data-parallax="-0.06">
        <img
          ref={imgRef}
          src="/images/ELXOR_AMORIEL_left.png?v=3"
          alt="ELXOR Amoriel perfume bottle on golden stone with celestial blooms"
          width={1440}
          height={1240}
          loading="lazy"
        />
      </div>

      <div className="split__content">
        <p className="eyebrow" data-reveal>
          <span className="brand">ELXOR</span> Philosophy
        </p>

        <h2 className="section-title section-title--left" data-split-reveal>
          <span className="w" style={{ "--i": 0 } as React.CSSProperties}>Elegance</span>
          <span className="w" style={{ "--i": 1 } as React.CSSProperties}>is</span>
          <span className="w" style={{ "--i": 2 } as React.CSSProperties}>not</span>
          <span className="w" style={{ "--i": 3 } as React.CSSProperties}>simply</span>
          <span className="w" style={{ "--i": 4 } as React.CSSProperties}>seen.</span>
          <br />
          <span className="w gold-text" style={{ "--i": 5 } as React.CSSProperties}>It</span>
          <span className="w gold-text" style={{ "--i": 6 } as React.CSSProperties}>is</span>
          <span className="w gold-text" style={{ "--i": 7 } as React.CSSProperties}>experienced.</span>
        </h2>

        <div className="divider divider--left" data-reveal>
          <i />
        </div>

        <p className="split__text" data-reveal>
          At <span className="brand">ELXOR</span>, we believe fragrance is more
          than a scent. It is a form of self-expression. Our philosophy is
          rooted in quality, craftsmanship and timeless elegance, creating
          fragrances that become a part of your identity.
        </p>

        <p className="wordmark wordmark--left" data-reveal>
          <span className="brand">ELXOR Perfumes</span>
        </p>
      </div>
    </section>
  );
}
