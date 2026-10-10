"use client";

import React, { useEffect, useRef } from "react";
import TitleWords from "./TitleWords";
import { withBrand } from "./brand";
import { defaultHome, type SplitContent } from "@/lib/homeDefaults";

interface ExperienceSectionProps {
  content?: SplitContent;
  onDiscoverClick?: () => void;
}

export default function ExperienceSection({
  onDiscoverClick,
  content = defaultHome.experience,
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
          src={content.image}
          alt={content.imageAlt}
          width={1024}
          height={1536}
          loading="lazy"
        />
      </div>

      <div className="split__content">
        <p className="eyebrow" data-reveal>
          {withBrand(content.eyebrow)}
        </p>

        <h2 className="section-title section-title--left" data-split-reveal>
          <TitleWords white={content.titleWhite} gold={content.titleGold} />
        </h2>

        <div className="divider divider--left" data-reveal>
          <i />
        </div>

        <p className="split__text" data-reveal>
          {withBrand(content.text)}
        </p>

        <div data-reveal>
          <a href="#collection" className="btn btn--ghost" onClick={handleClick}>
            {content.buttonLabel} <i className="arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
