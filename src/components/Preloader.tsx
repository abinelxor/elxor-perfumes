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
        backgroundColor: "#040404",
        backgroundImage:
          "radial-gradient(ellipse 70% 50% at 50% 45%, #0a0805 0%, #040404 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        boxShadow: "inset 0 0 160px rgba(0, 0, 0, 0.98)",
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "scale(1.02)" : "scale(1)",
        pointerEvents: isExiting ? "none" : "auto",
        transition:
          "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Subtle Whisper-Soft Golden Aura (Subtle touch behind logo) */}
      <div
        style={{
          position: "absolute",
          top: "calc(50% - 75px)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.09) 0%, rgba(184, 134, 54, 0.03) 45%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* ELXOR 3D Logo with executive breathing luminescence (increased size) */}
        <div
          style={{
            position: "relative",
            width: "clamp(190px, 25vw, 218px)",
            height: "clamp(190px, 25vw, 218px)",
            marginBottom: "26px",
            filter:
              "drop-shadow(0 12px 28px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 15px rgba(212, 175, 55, 0.22))",
            animation: "executiveLuminescence 4s ease-in-out infinite",
          }}
        >
          <Image
            src="/images/logo.png"
            alt="ELXOR Paris"
            fill
            style={{ objectFit: "contain" }}
            priority
            quality={100}
          />
        </div>

        {/* Title: UNVEIL YOUR AURA */}
        <h2
          style={{
            fontFamily: "var(--font-cinzel), 'Cinzel', serif",
            fontSize: "clamp(1.35rem, 3.2vw, 1.85rem)",
            fontWeight: 400,
            letterSpacing: "clamp(4px, 1.2vw, 6px)",
            marginBottom: "28px",
            background:
              "linear-gradient(135deg, #FFF9EE 0%, #F5D799 26%, #D4AF37 54%, #B88636 82%, #7A5317 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 2px 14px rgba(212, 175, 55, 0.35))",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          UNVEIL YOUR AURA
        </h2>

        {/* Progress Bar Container - Executive Minimalist Hairline */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "340px",
            height: "2px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(216, 162, 83, 0.2)",
            borderRadius: "2px",
            overflow: "visible",
            marginBottom: "18px",
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
                "linear-gradient(90deg, #9e7025 0%, #d4a04d 55%, #fff7e6 100%)",
              boxShadow:
                "0 0 16px rgba(236, 196, 128, 0.95), 0 0 32px rgba(212, 175, 55, 0.4)",
              transition: "width 0.1s ease-out",
              borderRadius: "2px",
            }}
          >
            {/* Executive Glowing Head Bead */}
            {displayPct > 0 && displayPct < 100 && (
              <div
                style={{
                  position: "absolute",
                  right: "-2px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#fffdf8",
                  boxShadow:
                    "0 0 8px #f5d799, 0 0 16px #d4af37, 0 0 25px rgba(236, 196, 128, 0.9)",
                }}
              />
            )}
          </div>
        </div>

        {/* ONLY Percentage Display (Executive Stately Spacing) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            fontSize: "0.86rem",
            letterSpacing: "1.5px",
            fontFamily: "var(--font-sans), 'Montserrat', sans-serif",
            fontVariantNumeric: "tabular-nums",
            color: "#ECC480",
            fontWeight: 500,
            textShadow: "0 0 14px rgba(236, 196, 128, 0.65)",
          }}
        >
          <span>{displayPct}%</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes executiveLuminescence {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 12px rgba(212, 175, 55, 0.18));
          }
          50% {
            transform: scale(1.015);
            filter: drop-shadow(0 14px 32px rgba(0, 0, 0, 0.98)) drop-shadow(0 0 18px rgba(212, 175, 55, 0.28));
          }
        }
      `}</style>
    </div>
  );
}
