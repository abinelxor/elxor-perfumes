"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FRAME_COUNT,
  frameStore,
  getNearestLoaded,
  startFrameLoading,
} from "@/lib/frameCache";

interface HeroSectionProps {
  isReady?: boolean;
  onExploreClick?: () => void;
}

const FRAME_MAP: [number, number][] = [
  [0, 0],
  [0.18, 27],
  [0.42, 49],
  [0.66, 78],
  [1, 119],
];

const progressToFrame = (p: number): number => {
  for (let k = 1; k < FRAME_MAP.length; k++) {
    const [p1, f1] = FRAME_MAP[k];
    const [p0, f0] = FRAME_MAP[k - 1];
    if (p <= p1) {
      const t = (p - p0) / (p1 - p0);
      return f0 + (f1 - f0) * t;
    }
  }
  return FRAME_COUNT - 1;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const LABELS = ["Essence", "Unveiling", "Trail", "Signature"];
const CUTS = [0.42, 0.66];

export default function HeroSection({
  isReady = true,
  onExploreClick,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const chapterNumRef = useRef<HTMLElement>(null);
  const chapterLabelRef = useRef<HTMLSpanElement>(null);

  const chapterElementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    startFrameLoading();

    const hero = heroRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    const dust = dustCanvasRef.current;
    const shade = shadeRef.current;
    const flashEl = flashRef.current;
    const chaptersEl = chaptersRef.current;
    const track = trackRef.current;
    const chapterNum = chapterNumRef.current;
    const chapterLabel = chapterLabelRef.current;

    if (!hero || !sticky || !canvas || !dust || !shade || !flashEl || !chaptersEl)
      return;

    const ctx = canvas.getContext("2d", { alpha: false });
    const dctx = dust.getContext("2d");
    if (!ctx || !dctx) return;

    // Sprite for gold dust
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const sc = sprite.getContext("2d");
    if (sc) {
      const g = sc.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255, 244, 220, 1)");
      g.addColorStop(0.18, "rgba(250, 216, 150, 0.8)");
      g.addColorStop(0.45, "rgba(213, 160, 80, 0.18)");
      g.addColorStop(1, "rgba(213, 160, 80, 0)");
      sc.fillStyle = g;
      sc.fillRect(0, 0, 64, 64);
    }

    let dw = 0;
    let dh = 0;
    let ddpr = 1;
    interface Mote {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      ph: number;
      tw: number;
      a: number;
      depth: number;
    }
    let motes: Mote[] = [];
    let dustVel = 0;
    let lastScrollForDust = 0;
    let dustBoostFlash = 0;

    const spawnMote = (anywhere: boolean): Mote => ({
      x: Math.random() * dw,
      y: anywhere ? Math.random() * dh : dh + 20,
      r: (1.2 + Math.random() * 3.2) * ddpr,
      vy: (0.12 + Math.random() * 0.4) * ddpr,
      vx: (Math.random() - 0.5) * 0.12 * ddpr,
      ph: Math.random() * Math.PI * 2,
      tw: 0.008 + Math.random() * 0.025,
      a: 0.25 + Math.random() * 0.55,
      depth: 0.5 + Math.random() * 1.2,
    });

    const sizeDust = () => {
      ddpr = Math.min(window.devicePixelRatio || 1, 1.5);
      dw = dust.width = Math.round(sticky.clientWidth * ddpr);
      dh = dust.height = Math.round(sticky.clientHeight * ddpr);
      const count = window.innerWidth < 760 ? 38 : 80;
      motes = Array.from({ length: count }, () => spawnMote(true));
    };

    let cw = 0;
    let ch = 0;
    let lastDrawn = -1;

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cw = Math.round(sticky.clientWidth * dpr);
      ch = Math.round(sticky.clientHeight * dpr);
      canvas.width = cw;
      canvas.height = ch;
      lastDrawn = -1;
    };

    const drawFrame = (targetIndex: number) => {
      const i = getNearestLoaded(targetIndex);
      if (i < 0 || i === lastDrawn) return;
      const img = frameStore.frames[i];
      if (!img || !img.naturalWidth) return;

      const isMobilePortrait = sticky.clientWidth < 768 || ch > cw * 1.12;

      if (!isMobilePortrait) {
        const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const w = img.naturalWidth * s;
        const h = img.naturalHeight * s;
        ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
        lastDrawn = i;
        return;
      }

      // Mobile portrait view: fit the presentation box fully with breathing margins
      const progress = clamp(targetIndex / (FRAME_COUNT - 1));

      // Frames on phones are smaller than the 1920px originals; scale the constants below
      const k = img.naturalWidth / 1920;

      // In early frames, center precisely on the perfume box (horizontal center = 977)
      // As the bottle emerges, center smoothly on the bottle (center = 960)
      const boxCenterX = 977 * k;
      const bottleCenterX = 960 * k;
      const targetCenterX = lerp(boxCenterX, bottleCenterX, clamp((progress - 0.22) / 0.38));

      // Scale:
      // Fit the complete 1158px box into ~90% of screen width (cw / 1280) with equal breathing margins on left and right
      // As bottle emerges, scale smoothly so the bottle is grand and majestic
      const startScale = cw / (1280 * k);
      const endScale = Math.min(cw / (1060 * k), (ch / img.naturalHeight) * 0.94);
      const s = lerp(startScale, endScale, clamp((progress - 0.28) / 0.5));

      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;

      const sx = (cw / 2) - targetCenterX * s;

      // Vertical position:
      // In early frames, center on the box vertical center (y = 420)
      // Place it right in the visual middle (0.46 of screen height) between top navbar and bottom text
      const boxCenterY = 420 * k;
      const bottleCenterY = 540 * k;
      const targetCenterY = lerp(boxCenterY, bottleCenterY, clamp((progress - 0.22) / 0.38));
      const desiredScreenY = lerp(ch * 0.46, ch * 0.48, progress);
      const sy = desiredScreenY - targetCenterY * s;

      // Fill canvas background with matching dark warm gradient so canvas is seamless
      const bgGrad = ctx.createLinearGradient(0, 0, 0, ch);
      bgGrad.addColorStop(0, "#080604");
      bgGrad.addColorStop(clamp(Math.max(0, sy) / ch), "#120a05");
      bgGrad.addColorStop(clamp(Math.min(ch, sy + h) / ch), "#251408");
      bgGrad.addColorStop(1, "#080604");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, cw, ch);

      // Draw the frame image
      ctx.drawImage(img, sx, sy, w, h);

      // Soft edge blending for the top and bottom of the frame
      const blendH = Math.min(32 * (cw / 390), h * 0.12);

      // Top soft blend
      const topGrad = ctx.createLinearGradient(0, sy - 1, 0, sy + blendH);
      topGrad.addColorStop(0, "#120a05");
      topGrad.addColorStop(1, "rgba(18, 10, 5, 0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, sy - 1, cw, blendH + 1);

      // Bottom soft blend
      const btmGrad = ctx.createLinearGradient(0, sy + h - blendH, 0, sy + h + 1);
      btmGrad.addColorStop(0, "rgba(37, 20, 8, 0)");
      btmGrad.addColorStop(1, "#251408");
      ctx.fillStyle = btmGrad;
      ctx.fillRect(0, sy + h - blendH, cw, blendH + 1);

      lastDrawn = i;
    };

    const drawDust = () => {
      if (window.innerWidth < 768) return; // dust layer is hidden on phones
      const y = window.scrollY;
      if (y > heroTop + hero.offsetHeight) return;
      const vel = y - lastScrollForDust;
      lastScrollForDust = y;
      dustVel += (clamp(vel, -60, 60) * 0.06 - dustVel) * 0.12;
      dctx.clearRect(0, 0, dw, dh);
      dctx.globalCompositeOperation = "lighter";
      const glow = 1 + dustBoostFlash * 1.4;
      for (const m of motes) {
        m.ph += m.tw;
        m.y -= (m.vy + dustVel * ddpr) * m.depth;
        m.x += m.vx + Math.sin(m.ph) * 0.18 * ddpr;
        if (m.y < -30) Object.assign(m, spawnMote(false));
        else if (m.y > dh + 30) Object.assign(m, spawnMote(false), { y: -20 });
        if (m.x < -30) m.x = dw + 20;
        else if (m.x > dw + 30) m.x = -20;
        const size = m.r * 6 * (0.8 + m.depth * 0.3);
        dctx.globalAlpha = Math.min(
          1,
          m.a * (0.55 + 0.45 * Math.sin(m.ph * 1.7)) * glow
        );
        dctx.drawImage(sprite, m.x - size / 2, m.y - size / 2, size, size);
      }
      dctx.globalAlpha = 1;
    };

    let heroTop = 0;
    let heroRange = 1;
    let vh = window.innerHeight;

    const measure = () => {
      vh = window.innerHeight;
      const r = hero.getBoundingClientRect();
      heroTop = r.top + window.scrollY;
      heroRange = Math.max(1, hero.offsetHeight - vh);
      sizeCanvas();
      sizeDust();
    };

    measure();

    // Mouse tracking for 3D depth
    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    let lastMx = 9;
    let lastMy = 9;

    const handleMouseMove = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const chapterConfigs = [
      { a: -1, c: 0.1, d: 0.17, side: "b" as const, on: false, lastE: -1 },
      { a: 0.19, c: 0.36, d: 0.42, side: "l" as const, on: false, lastE: -1 },
      { a: 0.44, c: 0.6, d: 0.66, side: "r" as const, on: false, lastE: -1 },
      { a: 0.7, c: 2, d: 3, side: "b" as const, on: false, lastE: -1 },
    ];

    let smoothP = 0;
    let lastFlash = -1;
    let lastRailIdx = -1;
    const shadeState = { l: -1, r: -1, b: -1 };

    let running = true;
    let lastRaw = -1;
    const update = () => {
      if (!running) return;

      const raw = clamp((window.scrollY - heroTop) / heroRange);
      const isMobile = window.innerWidth < 768;

      // Phones: nothing to do while the scroll position is unchanged (saves battery and
      // avoids needless style writes that can hitch iOS momentum scrolling)
      if (isMobile && raw === lastRaw) {
        requestAnimationFrame(update);
        return;
      }
      lastRaw = raw;
      // Phones: no easing (see CollectionSection) so the hero never chases the scroll
      const lerpFactor = isMobile ? 1 : 0.14;
      smoothP += (raw - smoothP) * lerpFactor;
      if (Math.abs(raw - smoothP) < 0.0004) smoothP = raw;
      const p = smoothP;

      // Draw canvas frame
      drawFrame(Math.round(progressToFrame(p)));

      // Camera push-out / push-in
      const zoom =
        p < 0.18
          ? lerp(1.12, 1.04, p / 0.18)
          : p < 0.66
          ? 1.04
          : lerp(1.04, 1.09, (p - 0.66) / 0.34);
      canvas.style.setProperty("--zoom", zoom.toFixed(4));

      // Warm bloom flash at video cuts
      const flash = Math.max(
        ...CUTS.map((cut) => 1 - Math.abs(p - cut) / 0.024),
        0
      );
      const flashE = flash * flash * (3 - 2 * flash);
      if (Math.abs(flashE - lastFlash) > 0.002) {
        lastFlash = flashE;
        flashEl.style.setProperty("--flash", (flashE * 0.75).toFixed(3));
      }
      dustBoostFlash = flashE;

      // Mouse depth
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;
      if (Math.abs(mx - lastMx) > 0.0005 || Math.abs(my - lastMy) > 0.0005) {
        lastMx = mx;
        lastMy = my;
        canvas.style.setProperty("--mx", `${(-mx * 16).toFixed(2)}px`);
        canvas.style.setProperty("--my", `${(-my * 10).toFixed(2)}px`);
        chaptersEl.style.setProperty("--tx", `${(mx * 10).toFixed(2)}px`);
        chaptersEl.style.setProperty("--ty", `${(my * 6).toFixed(2)}px`);
      }

      // Shading & chapters
      const sh = { l: 0, r: 0, b: 0 };
      let railIdx = 0;

      chapterConfigs.forEach((c, idx) => {
        const el = chapterElementsRef.current[idx];
        if (!el) return;

        const shouldBeOn = isReady && p >= c.a && p < c.d;
        if (shouldBeOn !== c.on) {
          c.on = shouldBeOn;
          el.classList.toggle("is-in", shouldBeOn);
        }

        const e = clamp((p - c.c) / (c.d - c.c));
        if (Math.abs(e - c.lastE) > 0.001) {
          c.lastE = e;
          el.style.setProperty("--co", (1 - e).toFixed(3));
          el.style.setProperty("--cy", `${(-e * 70).toFixed(1)}px`);
          el.style.setProperty("--cb", `${(e * 10).toFixed(2)}px`);
        }

        if (p >= c.a) railIdx = idx;

        const inAmt = idx === 0 ? 1 : clamp((p - c.a) / 0.05);
        const vis =
          (p >= c.a || idx === 0) && p < c.d ? inAmt * (1 - e) : 0;
        sh[c.side] = Math.max(sh[c.side], vis);
      });

      (["l", "r", "b"] as const).forEach((k) => {
        if (Math.abs(sh[k] - shadeState[k]) > 0.002) {
          shadeState[k] = sh[k];
          shade.style.setProperty(`--shade-${k}`, sh[k].toFixed(3));
        }
      });

      shade.style.setProperty(
        "--end-fade",
        (clamp((p - 0.93) / 0.07) * 0.75).toFixed(3)
      );
      sticky.style.setProperty("--hint", (1 - clamp(p / 0.035)).toFixed(3));

      if (track) {
        track.style.setProperty("--p", p.toFixed(4));
      }

      if (railIdx !== lastRailIdx) {
        lastRailIdx = railIdx;
        if (chapterNum) {
          chapterNum.textContent = String(railIdx + 1).padStart(2, "0");
        }
        if (chapterLabel) {
          chapterLabel.textContent = LABELS[railIdx];
        }
      }

      drawDust();
      requestAnimationFrame(update);
    };

    const rafId = requestAnimationFrame(update);

    // New frames arriving may improve what should be on screen right now
    const onFrames = () => {
      lastRaw = -1;
    };
    frameStore.subscribers.add(onFrames);

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      // Ignore the address-bar height jitter on phones; only re-measure on width change
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      lastRaw = -1;
      measure();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      frameStore.subscribers.delete(onFrames);
    };
  }, [isReady]);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__sticky" ref={stickyRef}>
        <canvas className="hero__canvas" ref={canvasRef} aria-hidden="true" />
        <div className="hero__shade" ref={shadeRef} aria-hidden="true" />
        <div className="hero__flash" ref={flashRef} aria-hidden="true" />
        <canvas className="hero__dust" ref={dustCanvasRef} aria-hidden="true" />

        <div className="hero__chapters" ref={chaptersRef}>
          {/* Chapter 1: Center */}
          <article
            className="chapter chapter--center"
            ref={(el) => {
              chapterElementsRef.current[0] = el;
            }}
          >
            <p className="eyebrow" data-piece style={{ "--i": 0 } as React.CSSProperties}>
              <span className="brand">ELXOR Perfumes</span>
            </p>
            <h1 className="chapter__title">
              <span className="w" style={{ "--i": 1 } as React.CSSProperties}>
                The
              </span>
              <span className="w" style={{ "--i": 2 } as React.CSSProperties}>
                Essence
              </span>
              <br />
              <span
                className="w gold-text"
                style={{ "--i": 3 } as React.CSSProperties}
              >
                of
              </span>
              <span
                className="w gold-text"
                style={{ "--i": 4 } as React.CSSProperties}
              >
                Elegance
              </span>
            </h1>
          </article>

          {/* Chapter 2: Left */}
          <article
            className="chapter chapter--left"
            ref={(el) => {
              chapterElementsRef.current[1] = el;
            }}
          >
            <p className="eyebrow" data-piece style={{ "--i": 0 } as React.CSSProperties}>
              II · The Unveiling
            </p>
            <h2 className="chapter__title">
              <span className="w" style={{ "--i": 1 } as React.CSSProperties}>
                Luxury
              </span>
              <span className="w" style={{ "--i": 2 } as React.CSSProperties}>
                begins
              </span>
              <br />
              <span
                className="w gold-text"
                style={{ "--i": 3 } as React.CSSProperties}
              >
                before
              </span>
              <span
                className="w gold-text"
                style={{ "--i": 4 } as React.CSSProperties}
              >
                the
              </span>
              <br />
              <span
                className="w gold-text"
                style={{ "--i": 5 } as React.CSSProperties}
              >
                first
              </span>
              <span
                className="w gold-text"
                style={{ "--i": 6 } as React.CSSProperties}
              >
                note
              </span>
            </h2>
            <p
              className="chapter__body"
              data-piece
              style={{ "--i": 7 } as React.CSSProperties}
            >
              It begins the moment the box opens, and the light finds the bottle.
            </p>
          </article>

          {/* Chapter 3: Right */}
          <article
            className="chapter chapter--right"
            ref={(el) => {
              chapterElementsRef.current[2] = el;
            }}
          >
            <p className="eyebrow" data-piece style={{ "--i": 0 } as React.CSSProperties}>
              III · The Trail
            </p>
            <h2 className="chapter__title">
              <span className="w" style={{ "--i": 1 } as React.CSSProperties}>
                One
              </span>
              <span className="w" style={{ "--i": 2 } as React.CSSProperties}>
                touch.
              </span>
              <br />
              <span
                className="w gold-text"
                style={{ "--i": 3 } as React.CSSProperties}
              >
                The
              </span>
              <span
                className="w gold-text"
                style={{ "--i": 4 } as React.CSSProperties}
              >
                air
              </span>
              <span
                className="w gold-text"
                style={{ "--i": 5 } as React.CSSProperties}
              >
                remembers.
              </span>
            </h2>
            <p
              className="chapter__body"
              data-piece
              style={{ "--i": 6 } as React.CSSProperties}
            >
              A single spray, and every room you leave holds a quiet trace of you.
            </p>
          </article>

          {/* Chapter 4: Center Final */}
          <article
            className="chapter chapter--center chapter--final"
            ref={(el) => {
              chapterElementsRef.current[3] = el;
            }}
          >
            <p className="eyebrow" data-piece style={{ "--i": 0 } as React.CSSProperties}>
              IV · The Signature
            </p>
            <h2 className="chapter__title">
              <span className="w" style={{ "--i": 1 } as React.CSSProperties}>
                Don’t
              </span>
              <span className="w" style={{ "--i": 2 } as React.CSSProperties}>
                just
              </span>
              <span className="w" style={{ "--i": 3 } as React.CSSProperties}>
                wear
              </span>
              <span className="w" style={{ "--i": 4 } as React.CSSProperties}>
                a
              </span>
              <span className="w" style={{ "--i": 5 } as React.CSSProperties}>
                fragrance,
              </span>
              <br />
              <span
                className="w gold-text"
                style={{ "--i": 6 } as React.CSSProperties}
              >
                Leave
              </span>
              <span
                className="w gold-text"
                style={{ "--i": 7 } as React.CSSProperties}
              >
                a
              </span>
              <span
                className="w gold-text"
                style={{ "--i": 8 } as React.CSSProperties}
              >
                Presence
              </span>
            </h2>
            <p
              className="chapter__body"
              data-piece
              style={{ "--i": 9 } as React.CSSProperties}
            >
              Two signatures, each composed for a different kind of presence.
            </p>
            <div
              data-piece
              style={{ "--i": 10 } as React.CSSProperties}
            >
              <a
                href="#collection"
                className="btn btn--gold"
                style={{ whiteSpace: "nowrap" }}
                onClick={(e) => {
                  e.preventDefault();
                  if (onExploreClick) {
                    onExploreClick();
                  } else {
                    document
                      .getElementById("collection")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Explore the collection <i className="arrow" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>

        {/* Right rail indicator */}
        <aside className="hero__rail" aria-hidden="true">
          <span className="hero__count">
            <b ref={chapterNumRef} className="js-chapter">
              01
            </b>{" "}
            / 04
          </span>
          <span className="hero__track">
            <span ref={trackRef} className="js-track" />
          </span>
          <span ref={chapterLabelRef} className="hero__label js-label">
            Essence
          </span>
        </aside>
      </div>
    </section>
  );
}
