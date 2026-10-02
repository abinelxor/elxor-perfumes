"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export default function ScrollObserver() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Smooth Scroll initialization with Lenis
    let lenis: Lenis | null = null;
    let rafId: number;

    if (!prefersReducedMotion) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      lenis = new Lenis({
        lerp: isMobile ? 0.07 : 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: isMobile ? 0.85 : 1,
      });
      (window as unknown as { lenis?: Lenis | null }).lenis = lenis;

      const tick = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }

    // IntersectionObserver for [data-reveal] and [data-split-reveal]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    const observeElements = () => {
      document
        .querySelectorAll("[data-reveal], [data-split-reveal]")
        .forEach((el) => observer.observe(el));
    };

    observeElements();
    const timer = setTimeout(observeElements, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
      (window as unknown as { lenis?: Lenis | null }).lenis = null;
    };
  }, []);

  return null;
}
