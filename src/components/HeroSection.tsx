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
  onDiscoverClick,
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

  // Track scroll position through the pinned hero section (240vh track for comfortable, silky scrubbing)
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

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "240vh",
        backgroundColor: "#050505",
      }}
    >
      {/* Sticky Fullscreen Viewport for Pure Frame Scrubbing: fits screen 100% perfectly */}
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
        {/* Full-bleed 1080p Ultra-HQ WebP Canvas: fits screen edge-to-edge */}
        <HeroScrollCanvas progress={scrollProgress} />

        {/* Hero Content Overlay: Compact & Non-Intrusive, leaving the entire animation in full view */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            width: "100%",
            maxWidth: "1400px",
            height: "100%",
            margin: "0 auto",
            padding: isMobile ? "40px 20px 24px" : "50px 48px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            pointerEvents: "none",
          }}
        >
          {/* Main Content Area: Centered Minimalist Scroll Indicator */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: "15px",
            }}
          >
            {/* Scroll Hint */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                opacity: scrollProgress > 0.85 ? 0.2 : 0.9,
                transition: "opacity 0.4s ease",
                background: "rgba(8, 7, 6, 0.45)",
                padding: "6px 14px",
                borderRadius: "20px",
                border: "1px solid rgba(216, 162, 83, 0.15)",
                backdropFilter: "blur(8px)",
                pointerEvents: "auto",
              }}
            >
              <span
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "2.5px",
                  color: "#ded3c2",
                  textTransform: "uppercase",
                  fontWeight: 400,
                }}
              >
                SCROLL TO EXPERIENCE
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
        </div>
      </div>
    </section>
  );
}
