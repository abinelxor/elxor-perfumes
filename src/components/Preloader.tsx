"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { frameCache, TOTAL_FRAMES, getFrameUrl } from "@/lib/frameCache";

interface PreloaderProps {
  onComplete: () => void;
}

const MAX_DURATION_MS = 2500; // Ramp to 100% within 2.5s, exit by 3.0s max

export default function Preloader({ onComplete }: PreloaderProps) {
  const [displayPct, setDisplayPct] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const hasFinishedRef = useRef(false);
  const startTimeRef = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);

  // Disable body scroll while preloading
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Completion trigger: max 3 seconds total (including 500ms fade-out)
  const triggerFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setDisplayPct(100);

    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        document.body.style.overflow = "unset";
        onComplete();
      }, 500);
    }, 200);
  };

  // High-throughput parallel frame preloading in background
  useEffect(() => {
    let isCancelled = false;

    // If already loaded in cache
    if (frameCache.isFullyLoaded && frameCache.loadedCount >= TOTAL_FRAMES) {
      triggerFinish();
      return;
    }

    let loaded = frameCache.loadedCount;

    const loadSingleFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (frameCache.images[index] && frameCache.images[index]!.complete) {
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
              // Ignore fallback
            }
          }
          frameCache.images[index] = img;
          loaded++;
          frameCache.loadedCount = loaded;
          if (loaded >= TOTAL_FRAMES) {
            frameCache.isFullyLoaded = true;
            if (!isCancelled) triggerFinish();
          }
          resolve();
        };

        img.onload = onDone;
        img.onerror = () => {
          loaded++;
          frameCache.loadedCount = loaded;
          if (loaded >= TOTAL_FRAMES) {
            frameCache.isFullyLoaded = true;
            if (!isCancelled) triggerFinish();
          }
          resolve();
        };
      });
    };

    // 30 parallel streams for fast loading
    const loadAll = async () => {
      const concurrency = 30;
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
    };

    loadAll();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Smooth timer-driven & load-driven percentage loop (strictly caps duration to max 3s)
  useEffect(() => {
    const updateProgress = () => {
      if (hasFinishedRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const timeRatio = Math.min(1, elapsed / MAX_DURATION_MS);
      const realRatio = Math.min(1, frameCache.loadedCount / TOTAL_FRAMES);

      // Percentage is the maximum of real download progress or time-elapsed ramp
      const targetPct = Math.min(100, Math.max(Math.round(realRatio * 100), Math.round(timeRatio * 100)));

      setDisplayPct((prev) => {
        if (prev < targetPct) {
          const step = Math.max(1, Math.ceil((targetPct - prev) * 0.25));
          return Math.min(targetPct, prev + step);
        }
        return prev;
      });

      if (elapsed >= MAX_DURATION_MS || frameCache.loadedCount >= TOTAL_FRAMES) {
        triggerFinish();
        return;
      }

      rafRef.current = requestAnimationFrame(updateProgress);
    };

    rafRef.current = requestAnimationFrame(updateProgress);

    // Hard fallback timeout: guarantees exit within 3000ms max under all conditions
    const hardTimeout = setTimeout(() => {
      triggerFinish();
    }, 2700);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(hardTimeout);
    };
  }, []);

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
        transform: isExiting ? "scale(1.02)" : "scale(1)",
        pointerEvents: isExiting ? "none" : "auto",
        transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Subtle Golden Aura Glow */}
      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236, 196, 128, 0.16) 0%, rgba(184, 134, 54, 0.04) 50%, transparent 70%)",
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
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* ELXOR 3D Logo with breathing glow */}
        <div
          style={{
            position: "relative",
            width: "95px",
            height: "95px",
            marginBottom: "24px",
            filter: "drop-shadow(0 4px 22px rgba(212, 175, 55, 0.45))",
            animation: "pulseLogo 2.5s ease-in-out infinite",
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
            fontSize: "0.72rem",
            letterSpacing: "4px",
            color: "#ECC480",
            textTransform: "uppercase",
            marginBottom: "10px",
            fontWeight: 500,
          }}
        >
          ELXOR HAUTE PARFUMERIE
        </span>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.3rem, 3.2vw, 1.7rem)",
            fontWeight: 400,
            letterSpacing: "1.5px",
            color: "#f8f6f0",
            marginBottom: "28px",
          }}
        >
          THE ESSENCE OF ELEGANCE
        </h2>

        {/* Progress Bar Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "300px",
            height: "2px",
            background: "rgba(255, 255, 255, 0.12)",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "14px",
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
              boxShadow: "0 0 12px rgba(236, 196, 128, 0.9)",
              transition: "width 0.1s ease-out",
            }}
          />
        </div>

        {/* ONLY Percentage Display (No frames text) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            fontSize: "0.82rem",
            letterSpacing: "3px",
            color: "#ECC480",
            fontWeight: 600,
          }}
        >
          <span>{displayPct}%</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulseLogo {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 4px 22px rgba(212, 175, 55, 0.4));
          }
          50% {
            transform: scale(1.04);
            filter: drop-shadow(0 6px 30px rgba(236, 196, 128, 0.7));
          }
        }
      `}</style>
    </div>
  );
}
