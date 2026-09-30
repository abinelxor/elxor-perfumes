"use client";

import React, { useState, useEffect, useRef } from "react";
import HeroScrollCanvas from "./HeroScrollCanvas";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onExploreClick?: () => void;
  onDiscoverClick?: () => void;
  onProgressChange?: (progress: number) => void;
}

export default function HeroSection({
  onExploreClick,
  onProgressChange,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll position through the pinned hero section (calibrated 100vh-130vh scroll distance)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      setScrollProgress(progress);
      if (onProgressChange) {
        onProgressChange(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onProgressChange]);

  // Scroll indicator opacity: visible at start, disappears smoothly after scrolling begins
  const scrollIndicatorOpacity =
    scrollProgress <= 0.03
      ? 0.95
      : Math.max(0, 1 - (scrollProgress - 0.03) * 14);

  const handleScrollToCollection = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById("collection");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: isMobile ? "200vh" : "230vh",
        backgroundColor: "#050505",
      }}
    >
      {/* Sticky Fullscreen Viewport for pure frame scrubbing (Frame 1 to 120) */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        {/* Full-bleed 1080p Ultra-HQ WebP Canvas from the 120-frame video */}
        <HeroScrollCanvas progress={scrollProgress} />

        {/* Minimal Bottom Fade: only the bottom edge to blend seamlessly into #collection */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "120px",
            zIndex: 2,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.6) 65%, #050505 100%)",
          }}
        />

        {/* Subtle Bottom Scroll Indicator: SCROLL TO DISCOVER ↓ */}
        <div
          onClick={handleScrollToCollection}
          style={{
            position: "absolute",
            bottom: isMobile ? "18px" : "28px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            opacity: scrollIndicatorOpacity,
            pointerEvents: scrollIndicatorOpacity > 0.1 ? "auto" : "none",
            transition:
              "opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease",
            cursor: "pointer",
            background: "rgba(9, 7, 6, 0.55)",
            padding: "7px 18px",
            borderRadius: "22px",
            border: "1px solid rgba(216, 162, 83, 0.22)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(236, 196, 128, 0.55)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(216, 162, 83, 0.22)";
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.68rem",
              letterSpacing: "2.8px",
              color: "#ded3c2",
              textTransform: "uppercase",
              fontWeight: 400,
              userSelect: "none",
            }}
          >
            SCROLL TO DISCOVER ↓
          </span>
          <div
            className="animate-bounce"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ECC480",
            }}
          >
            <ChevronDown size={14} />
          </div>
        </div>
      </div>
    </section>
  );
}
