"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { frameCache, TOTAL_FRAMES, getFrameUrl } from "@/lib/frameCache";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [displayPct, setDisplayPct] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Disable body scroll while preloading
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Smoothly interpolate display percentage toward real loaded percentage
  useEffect(() => {
    const targetPct = Math.round((loadedCount / TOTAL_FRAMES) * 100);

    const updateDisplay = () => {
      setDisplayPct((prev) => {
        if (prev < targetPct) {
          const diff = targetPct - prev;
          const step = Math.max(1, Math.ceil(diff * 0.2));
          return Math.min(targetPct, prev + step);
        }
        return prev;
      });
      animationFrameRef.current = requestAnimationFrame(updateDisplay);
    };

    animationFrameRef.current = requestAnimationFrame(updateDisplay);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [loadedCount]);

  // Load all 300 frames concurrently with controlled batches
  useEffect(() => {
    let isCancelled = false;

    // If already loaded in cache (e.g. on route change)
    if (frameCache.isFullyLoaded && frameCache.loadedCount >= TOTAL_FRAMES) {
      setLoadedCount(TOTAL_FRAMES);
      setDisplayPct(100);
      setIsReady(true);
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 700);
      }, 400);
      return;
    }

    let loaded = 0;

    const loadSingleFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (frameCache.images[index] && frameCache.images[index]!.complete) {
          loaded++;
          if (!isCancelled) setLoadedCount(loaded);
          resolve();
          return;
        }

        const img = new window.Image();
        img.src = getFrameUrl(index);

        const onDone = async () => {
          if (img.decode) {
            try {
              await img.decode();
            } catch {
              // Ignore decode fallback
            }
          }
          frameCache.images[index] = img;
          loaded++;
          frameCache.loadedCount = loaded;
          if (!isCancelled) setLoadedCount(loaded);
          resolve();
        };

        img.onload = onDone;
        img.onerror = () => {
          loaded++;
          frameCache.loadedCount = loaded;
          if (!isCancelled) setLoadedCount(loaded);
          resolve();
        };
      });
    };

    // Load with a high-throughput concurrency queue (25 parallel streams)
    const loadAll = async () => {
      const concurrency = 25;
      let currentIndex = 1;

      const worker = async () => {
        while (currentIndex <= TOTAL_FRAMES) {
          if (isCancelled) return;
          const idx = currentIndex++;
          await loadSingleFrame(idx);
        }
      };

      const workers = Array.from({ length: concurrency }, () => worker());
      await Promise.all(workers);

      if (isCancelled) return;

      frameCache.isFullyLoaded = true;
      setIsReady(true);

      // Brief pause at 100% to let the user appreciate the completed state, then dissolve
      setTimeout(() => {
        if (isCancelled) return;
        setIsExiting(true);
        setTimeout(() => {
          if (!isCancelled) {
            document.body.style.overflow = "unset";
            onComplete();
          }
        }, 750);
      }, 500);
    };

    loadAll();

    return () => {
      isCancelled = true;
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "scale(1.03)" : "scale(1)",
        pointerEvents: isExiting ? "none" : "auto",
        transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Golden Aura Glow */}
      <div
        style={{
          position: "absolute",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236, 196, 128, 0.18) 0%, rgba(184, 134, 54, 0.05) 50%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "460px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* ELXOR 3D Logo with breathing glow */}
        <div
          style={{
            position: "relative",
            width: "110px",
            height: "110px",
            marginBottom: "28px",
            filter: "drop-shadow(0 4px 25px rgba(212, 175, 55, 0.5))",
            animation: "pulseLogo 3s ease-in-out infinite",
          }}
        >
          <Image
            src="/images/logo.png"
            alt="ELXOR Paris"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* Brand Overline */}
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            letterSpacing: "4px",
            color: "#ECC480",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontWeight: 500,
          }}
        >
          ELXOR HAUTE PARFUMERIE
        </span>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.4rem, 3.5vw, 1.9rem)",
            fontWeight: 400,
            letterSpacing: "1.5px",
            color: "#f8f6f0",
            marginBottom: "32px",
          }}
        >
          THE ESSENCE OF ELEGANCE
        </h2>

        {/* Progress Bar Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "340px",
            height: "2px",
            background: "rgba(255, 255, 255, 0.12)",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${displayPct}%`,
              background:
                "linear-gradient(90deg, #9e7025 0%, #d4a04d 50%, #ECC480 100%)",
              boxShadow: "0 0 14px rgba(236, 196, 128, 0.9)",
              transition: "width 0.15s ease-out",
            }}
          />
        </div>

        {/* Percentage & Frame Count Details */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "340px",
            fontSize: "0.75rem",
            letterSpacing: "2px",
            color: "#b0a594",
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "#ECC480", fontWeight: 600 }}>
            {displayPct}%
          </span>
          <span>
            {loadedCount} / {TOTAL_FRAMES} FRAMES
          </span>
        </div>

        {/* Status text */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.78rem",
            letterSpacing: "1.5px",
            color: isReady ? "#ECC480" : "#7c7263",
            transition: "color 0.3s ease",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          {isReady ? "✦ COMPLETE • ENTERING EXPERIENCE" : "Precaching Fragrance Sequence"}
        </p>
      </div>

      <style jsx>{`
        @keyframes pulseLogo {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 4px 25px rgba(212, 175, 55, 0.45));
          }
          50% {
            transform: scale(1.04);
            filter: drop-shadow(0 6px 35px rgba(236, 196, 128, 0.75));
          }
        }
      `}</style>
    </div>
  );
}
