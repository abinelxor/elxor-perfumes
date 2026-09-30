"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { frameCache, TOTAL_FRAMES, getFrameUrl } from "@/lib/frameCache";

interface HeroScrollCanvasProps {
  progress: number; // 0.0 to 1.0
}

export default function HeroScrollCanvas({ progress }: HeroScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const rafIdRef = useRef<number | null>(null);

  // Draw target frame fitting the screen edge-to-edge with maximum visual fidelity
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Enable high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 1. Check if current requested frame is in cache
    let img = frameCache.images[frameIndex];

    // If not loaded, trigger on-demand load and draw nearest available frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      if (!img) {
        const loadingImg = new window.Image();
        loadingImg.src = getFrameUrl(frameIndex);
        loadingImg.onload = () => {
          frameCache.images[frameIndex] = loadingImg;
          // Redraw if this is still the active frame
          if (Math.round(currentFrameRef.current) === frameIndex) {
            drawFrame(frameIndex);
          }
        };
        frameCache.images[frameIndex] = loadingImg;
      }

      // Find nearest loaded frame as immediate fallback
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

    // Aspect ratio fitting: Cover mode
    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const sw = iw * ratio;
    const sh = ih * ratio;

    // Center horizontally
    const sx = (cw - sw) / 2;

    // Anchor to top (sy = 0) whenever sh >= ch so bottle cap and spray crown are NEVER clipped
    const sy = sh >= ch ? 0 : (ch - sh) / 2;

    ctx.drawImage(img, 0, 0, iw, ih, sx, sy, sw, sh);
  }, []);

  // Map progress (0 to 1) directly to target frame (1 to 120)
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      drawFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Smooth frame interpolation loop (lerp) for forward and reverse scrolling
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.04) {
        currentFrameRef.current += diff * 0.25; // Responsive, silky smooth lerp
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

  // Initial immediate draw and ensure frame 1 is loaded immediately
  useEffect(() => {
    const initialImg = new window.Image();
    initialImg.src = getFrameUrl(1);
    initialImg.onload = () => {
      frameCache.images[1] = initialImg;
      drawFrame(1);
    };
    if (frameCache.images[1] && frameCache.images[1]!.complete) {
      drawFrame(1);
    }
  }, [drawFrame]);

  // Non-blocking background progressive preloading for all 120 frames
  useEffect(() => {
    let isCancelled = false;
    let currentIndex = 2;

    const loadNext = () => {
      if (isCancelled || currentIndex > TOTAL_FRAMES) return;
      const idx = currentIndex++;
      if (frameCache.images[idx] && frameCache.images[idx]!.complete) {
        loadNext();
        return;
      }
      const img = new window.Image();
      img.src = getFrameUrl(idx);
      img.onload = () => {
        frameCache.images[idx] = img;
        loadNext();
      };
      img.onerror = () => {
        loadNext();
      };
    };

    // 8 parallel workers to smoothly preload frames in background
    const workers = Math.min(8, TOTAL_FRAMES);
    for (let i = 0; i < workers; i++) {
      loadNext();
    }

    return () => {
      isCancelled = true;
    };
  }, []);

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
