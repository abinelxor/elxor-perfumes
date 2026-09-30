"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { startFrameLoading, frameStore } from "@/lib/frameCache";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [displayPct, setDisplayPct] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const hasFinishedRef = useRef(false);
  const targetPctRef = useRef(0);
  const shownPctRef = useRef(0);
  const t0Ref = useRef(0);
  const fontsReadyRef = useRef(false);
  const barRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    t0Ref.current = performance.now();
    document.body.classList.add("is-loading");

    // Check font readiness
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        fontsReadyRef.current = true;
      });
    } else {
      fontsReadyRef.current = true;
    }
    const fontTimeout = setTimeout(() => {
      fontsReadyRef.current = true;
    }, 3500);

    const release = () => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;
      targetPctRef.current = 100;
      setIsDone(true);
      document.body.classList.remove("is-loading");
      setTimeout(() => {
        onComplete();
      }, 650);
    };

    let rafId: number;
    const loaderTick = () => {
      shownPctRef.current +=
        (targetPctRef.current - shownPctRef.current) * 0.12;
      const currentVal = Math.round(shownPctRef.current);
      setDisplayPct(currentVal);

      if (barRef.current) {
        barRef.current.style.width = `${shownPctRef.current.toFixed(2)}%`;
        barRef.current.style.setProperty(
          "--tip",
          shownPctRef.current > 0.5 && shownPctRef.current < 99.5 ? "1" : "0"
        );
      }
      if (pctRef.current) {
        pctRef.current.textContent = String(currentVal);
      }

      const elapsed = performance.now() - t0Ref.current;
      const allReady = frameStore.isFullyLoaded;
      const sparseReady = frameStore.isSparseReady;
      const fontsReady = fontsReadyRef.current;
      const ready =
        (allReady || (sparseReady && elapsed > 2800)) &&
        fontsReady &&
        elapsed > 1200;

      if (!hasFinishedRef.current && (ready || elapsed > 8000)) {
        release();
      }

      if (!hasFinishedRef.current || shownPctRef.current < 99.5) {
        rafId = requestAnimationFrame(loaderTick);
      }
    };

    rafId = requestAnimationFrame(loaderTick);

    // Start parallel loading of 120 frames
    const onProgress = (ratio: number) => {
      targetPctRef.current = Math.max(targetPctRef.current, ratio * 100);
    };

    startFrameLoading(onProgress);

    return () => {
      clearTimeout(fontTimeout);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("is-loading");
    };
  }, [onComplete]);

  return (
    <div
      className={`loader ${isDone ? "is-done" : ""}`}
      aria-hidden={isDone}
      style={{
        transition:
          "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s linear",
      }}
    >
      <div className="loader__glow" />
      <div className="loader__inner">
        <div className="loader__logo">
          <img
            src="/images/logo-preloader-crisp.png"
            alt="ELXOR"
            width={240}
            height={254}
          />
        </div>
        <h2 className="loader__title">
          Enter the world of <span className="brand">ELXOR</span>
        </h2>
        <div className="loader__bar">
          <span ref={barRef} className="js-bar">
            <i />
          </span>
        </div>
        <p className="loader__pct">
          <span ref={pctRef} className="js-pct">
            {displayPct}
          </span>
          %
        </p>
      </div>
    </div>
  );
}
