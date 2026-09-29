"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { frameCache, TOTAL_FRAMES } from "@/lib/frameCache";

interface HeroScrollCanvasProps {
  progress: number; // 0.0 to 1.0
}

export default function HeroScrollCanvas({ progress }: HeroScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const rafIdRef = useRef<number | null>(null);

  // Draw target frame fitting the screen edge-to-edge perfectly with high DPI
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Enable high-quality bicubic image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Get image from preloaded cache
    let img = frameCache.images[frameIndex];

    // Fallback to nearest loaded frame if needed
    if (!img || !img.complete || img.naturalWidth === 0) {
      let closestDist = Infinity;
      let closestIdx = -1;
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const candidate = frameCache.images[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const dist = Math.abs(i - frameIndex);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        }
      }
      if (closestIdx !== -1) {
        img = frameCache.images[closestIdx];
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    // Fit the screen edge-to-edge perfectly (Cover mode)
    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const sw = iw * ratio;
    const sh = ih * ratio;

    // Center horizontally
    const sx = (cw - sw) / 2;

    // Anchor to top (sy = 0) whenever sh >= ch so the top of the bottle cap is NEVER clipped!
    const sy = sh >= ch ? 0 : (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, iw, ih, sx, sy, sw, sh);
  }, []);

  // Map progress (0 to 1) directly to target frame (1 to 125)
  useEffect(() => {
    const clamped = Math.max(0, Math.min(1, progress));
    const target = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.round(clamped * (TOTAL_FRAMES - 1)) + 1)
    );
    targetFrameRef.current = target;
  }, [progress]);

  // Handle canvas sizing on resize and DPR
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      drawFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Smooth frame interpolation loop (lerp)
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.22; // Responsive smooth lerp
        drawFrame(Math.round(currentFrameRef.current));
      } else if (Math.round(current) !== target) {
        currentFrameRef.current = target;
        drawFrame(target);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Initial draw
  useEffect(() => {
    drawFrame(1);
  }, [drawFrame]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#050505",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
