"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export interface PerfumeItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  price: string;
  size: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  story: string;
}

export const perfumesData: PerfumeItem[] = [
  {
    id: "sanctix",
    name: "SANCTIX",
    tagline: "Sacred Amber. Luminous Heat. Unrivaled Majesty.",
    image: "/images/perfume_sanctix.png",
    price: "$380",
    size: "100ml / 3.4 FL. OZ.",
    topNotes: ["Solar Bergamot", "Golden Saffron", "Pink Pepper"],
    heartNotes: ["Liquid Amber", "Smoked Incense", "Honeyed Labdanum"],
    baseNotes: ["Sacred Oud", "Bourbon Vanilla", "Precious Woods"],
    story:
      "A radiant creation born from molten gold and sacred resins. Sanctix opens with vibrant solar citrus and rare spice before deepening into a glowing heart of ambergris, rare woods, and pure golden warmth.",
  },
  {
    id: "amoriel",
    name: "AMORIEL",
    tagline: "Celestial Blooms. Velvet Silk. Pure Devotion.",
    image: "/images/perfume_amoriel.png",
    price: "$360",
    size: "100ml / 3.4 FL. OZ.",
    topNotes: ["White Peach", "Sweet Mandarin", "Dewy Neroli"],
    heartNotes: ["Celestial Jasmine", "Imperial White Rose", "Soft Iris"],
    baseNotes: ["Cashmere Silk", "Warm Sandalwood", "Golden Amber Accord"],
    story:
      "An ethereal symphony of white petals and golden silk. Amoriel captures the delicate majesty of celestial jasmine, soft powdery iris, and warm velvety cashmere, leaving an unforgettable, enchanting trail.",
  },
];

interface CollectionSectionProps {
  onSelectPerfume?: (perfume: PerfumeItem) => void;
  onContactClick?: () => void;
}

const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function CollectionSection({
  onSelectPerfume,
  onContactClick,
}: CollectionSectionProps) {
  const seqRef = useRef<HTMLDivElement>(null);
  const bottleRefs = useRef<(HTMLElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const noteRefs = useRef<(HTMLElement | null)[]>([]);
  const ghostRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const stepsWrapRef = useRef<HTMLOListElement>(null);
  const lineARefs = useRef<(SVGPathElement | null)[]>([]);
  const lineBRefs = useRef<(SVGPathElement | null)[]>([]);
  const seqFinalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seq = seqRef.current;
    if (!seq) return;

    let seqTop = 0;
    let seqRange = 1;
    let vh = window.innerHeight;
    let smoothQ = 0;
    let seqVisible = false;
    let lastStep = -1;
    let finalOn = false;

    const measureSeq = () => {
      vh = window.innerHeight;
      seqTop = seq.getBoundingClientRect().top + window.scrollY;
      seqRange = Math.max(1, seq.offsetHeight - vh);
    };

    measureSeq();

    let running = true;
    const update = () => {
      if (!running) return;

      const y = window.scrollY;
      const near =
        y + vh > seqTop - vh * 0.5 && y < seqTop + seq.offsetHeight + vh * 0.5;

      if (!near) {
        seqVisible = false;
        requestAnimationFrame(update);
        return;
      }

      const raw = clamp((y - seqTop) / seqRange);
      smoothQ = seqVisible ? smoothQ + (raw - smoothQ) * 0.14 : raw;
      if (Math.abs(raw - smoothQ) < 0.0003) smoothQ = raw;
      seqVisible = true;
      const q = smoothQ;
      const mobile = window.innerWidth <= 760;
      const vw = window.innerWidth / 100;

      // Draw SVG lines
      const da = (1 - clamp(q / 0.55)).toFixed(4);
      const db = (1 - clamp((q - 0.20) / 0.6)).toFixed(4);
      lineARefs.current.forEach((l) => {
        if (l) l.style.setProperty("--draw", da);
      });
      lineBRefs.current.forEach((l) => {
        if (l) l.style.setProperty("--draw", db);
      });

      const active = q < 0.32 ? 0 : 1;
      const finaleProgress = ease(clamp((q - 0.64) / 0.08));

      perfumesData.forEach((_, i) => {
        const dir = i % 2 ? 1 : -1;
        const isFirst = i === 0;

        // Solo enter / exit
        const soloEnter = isFirst ? 1 : easeOut(clamp((q - 0.28) / 0.09));
        const soloExit = isFirst ? ease(clamp((q - 0.28) / 0.09)) : 0;
        const soloVis = isFirst ? 1 - soloExit : soloEnter;
        const float = Math.sin(
          clamp((q - (isFirst ? 0.04 : 0.38)) / 0.26) * Math.PI
        );

        // Solo positions
        const pX = 0;
        const pY = isFirst ? -soloExit * 24 : (1 - soloEnter) * 24;
        const pR =
          (1 - soloEnter) * -12 * dir + soloExit * 10 * dir + float * 2.5 * dir;
        const pS =
          0.88 + 0.12 * (isFirst ? 1 - soloExit * 0.1 : soloEnter) + float * 0.02;

        // Finale side-by-side row positions
        const rowX = mobile
          ? ((i % 2) - 0.5) * 44 * vw
          : (i - 0.5) * Math.min(30 * vw, 380);
        const rowY = mobile ? 2 : 5;
        const rowS = mobile ? 0.48 : 0.54;

        let tx, ty, rot, sc, op;
        if (q >= 0.64) {
          if (isFirst) {
            // Sanctix re-enters from left into finale position
            tx = rowX;
            ty = rowY + (1 - finaleProgress) * 24;
            rot = (1 - finaleProgress) * -8 + float * 2 * dir;
            sc = rowS;
            op = finaleProgress;
          } else {
            // Amoriel smoothly slides from center to right into finale position
            tx = lerp(pX, rowX, finaleProgress);
            ty = lerp(0, rowY, finaleProgress);
            rot = lerp(pR, 0, finaleProgress) + float * 2 * dir;
            sc = lerp(1.0, rowS, finaleProgress);
            op = 1;
          }
        } else {
          tx = pX;
          ty = pY;
          rot = pR;
          sc = pS;
          op = soloVis;
        }

        const b = bottleRefs.current[i];
        if (b) {
          b.style.opacity = op.toFixed(3);
          b.style.transform = `translate(-50%, -50%) translate3d(${tx.toFixed(
            1
          )}px, ${ty.toFixed(2)}vh, 0) rotate(${rot.toFixed(
            2
          )}deg) scale(${sc.toFixed(3)})`;
        }

        // Ghost number behind bottle (fades out as finale begins)
        const ghostVis = soloVis * (1 - ease(clamp((q - 0.62) / 0.05)));
        const g = ghostRefs.current[i];
        if (g) {
          g.style.opacity = (ghostVis * 0.9).toFixed(3);
          g.style.transform = `translate(-50%, -50%) translateY(${pY.toFixed(
            2
          )}vh) scale(${(
            0.92 +
            0.08 * (isFirst ? 1 - soloExit : soloEnter)
          ).toFixed(3)})`;
        }

        const c = cardRefs.current[i];
        if (c) {
          const side = isFirst ? 1 : -1;
          const cin = isFirst ? 1 : ease(clamp((q - 0.30) / 0.08));
          const cout = isFirst
            ? ease(clamp((q - 0.28) / 0.08))
            : ease(clamp((q - 0.62) / 0.06));
          const cx = mobile ? 0 : (1 - cin) * side * 16;
          const cy =
            (1 - cin) * (mobile ? 10 : 8) - cout * (mobile ? 12 : 24);
          const cr = mobile ? 0 : side * (2 + (1 - cin) * 7) - cout * side * 5;
          const cb = (1 - cin) * 10 + cout * 8;
          c.style.opacity = (cin * (1 - cout)).toFixed(3);
          c.style.transform = `translate(${cx.toFixed(
            2
          )}vw, calc(var(--tyb) + ${cy.toFixed(2)}vh)) rotate(${cr.toFixed(
            2
          )}deg)`;
          c.style.filter = cb > 0.05 ? `blur(${cb.toFixed(2)}px)` : "none";
          c.style.pointerEvents = cin > 0.9 && cout < 0.1 ? "auto" : "none";
        }

        const n = noteRefs.current[i];
        if (n) {
          const nin = isFirst ? 1 : clamp((q - 0.32) / 0.08);
          const nout = isFirst
            ? ease(clamp((q - 0.28) / 0.08))
            : ease(clamp((q - 0.62) / 0.06));
          n.style.opacity = (easeOut(nin) * (1 - nout)).toFixed(3);
          n.style.transform = `translateY(${(-nout * 30).toFixed(
            1
          )}px) rotate(${i % 2 ? 3 : -3}deg)`;
          n.style.setProperty(
            "--draw",
            isFirst
              ? (1 - clamp(q / 0.18)).toFixed(3)
              : (1 - clamp((q - 0.35) / 0.18)).toFixed(3)
          );
        }

        const st = stepRefs.current[i];
        if (st) {
          const fillProg = isFirst
            ? clamp(q / 0.28)
            : clamp((q - 0.32) / 0.30);
          st.style.setProperty("--fill", fillProg.toFixed(3));
        }
      });

      if (active !== lastStep) {
        lastStep = active;
        stepRefs.current.forEach((st, k) => {
          if (st) st.classList.toggle("is-active", k === active);
        });
      }

      // Hide step indicator during finale
      if (stepsWrapRef.current) {
        stepsWrapRef.current.style.setProperty(
          "--steps",
          (1 - clamp((q - 0.62) / 0.05)).toFixed(3)
        );
      }

      // Toggle finale stage
      const on = q >= 0.68;
      if (on !== finalOn) {
        finalOn = on;
        if (seqFinalRef.current) {
          seqFinalRef.current.classList.toggle("is-in", on);
        }
      }

      requestAnimationFrame(update);
    };

    const rafId = requestAnimationFrame(update);

    const handleResize = () => {
      measureSeq();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCardDiscover = (
    e: React.MouseEvent,
    perfume: PerfumeItem
  ) => {
    e.preventDefault();
    if (onSelectPerfume) {
      onSelectPerfume(perfume);
    }
  };

  const notesList = [
    "sacred & luminous",
    "pure devotion",
  ];

  const handleFinaleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onContactClick) {
      onContactClick();
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sparks = [
    { x: "-38vw", y: "-4vh", s: 1.1, d: "0ms" },
    { x: "34vw", y: "-12vh", s: 0.8, d: "120ms" },
    { x: "-26vw", y: "20vh", s: 0.6, d: "240ms" },
    { x: "40vw", y: "16vh", s: 1.3, d: "80ms" },
    { x: "-44vw", y: "34vh", s: 0.9, d: "300ms" },
    { x: "22vw", y: "-30vh", s: 0.55, d: "200ms" },
    { x: "-14vw", y: "-34vh", s: 0.7, d: "360ms" },
  ];

  return (
    <section className="collection" id="collection">
      {/* Section Header */}
      <header className="section-head collection__head">
        <p className="eyebrow" data-reveal>
          Our Collection
        </p>
        <h2 className="section-title" data-split-reveal>
          <span className="w" style={{ "--i": 0 } as React.CSSProperties}>Crafted</span>
          <span className="w" style={{ "--i": 1 } as React.CSSProperties}>for</span>
          <span className="w gold-text" style={{ "--i": 2 } as React.CSSProperties}>distinction</span>
        </h2>
        <div className="divider" data-reveal>
          <i />
        </div>
        <p className="section-lead" data-reveal>
          At <span className="brand">ELXOR</span>, we believe fragrance is more
          than a scent. It is a statement of individuality, elegance and
          timeless appeal. Our creations are crafted for those who seek the
          extraordinary.
        </p>
      </header>

      {/* Pinned 640vh Product Stage */}
      <div className="seq" ref={seqRef}>
        <div className="seq__sticky">
          {/* Flowing Gold Lines */}
          <svg
            className="seq__lines"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="goldLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#8c6631" stopOpacity="0" />
                <stop offset=".25" stopColor="#d5ae6f" />
                <stop offset=".6" stopColor="#f5dca8" />
                <stop offset="1" stopColor="#8c6631" stopOpacity=".2" />
              </linearGradient>
            </defs>
            <path
              ref={(el) => {
                lineARefs.current[0] = el;
              }}
              className="seq__line seq__line--glow js-line-a"
              pathLength={1}
              d="M-80 660 C 200 520, 380 840, 660 720 S 1060 360, 1520 470"
            />
            <path
              ref={(el) => {
                lineARefs.current[1] = el;
              }}
              className="seq__line js-line-a"
              pathLength={1}
              d="M-80 660 C 200 520, 380 840, 660 720 S 1060 360, 1520 470"
            />
            <path
              ref={(el) => {
                lineBRefs.current[0] = el;
              }}
              className="seq__line seq__line--glow js-line-b"
              pathLength={1}
              d="M-80 230 C 240 110, 440 400, 740 300 S 1190 70, 1520 250"
            />
            <path
              ref={(el) => {
                lineBRefs.current[1] = el;
              }}
              className="seq__line js-line-b"
              pathLength={1}
              d="M-80 230 C 240 110, 440 400, 740 300 S 1190 70, 1520 250"
            />
          </svg>

          {/* Ghost outline numbers behind bottles */}
          <div className="seq__ghost" aria-hidden="true">
            {perfumesData.map((_, i) => (
              <span
                key={i}
                ref={(el) => {
                  ghostRefs.current[i] = el;
                }}
                data-i={i}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </div>

          {/* 3D Bottles Stage */}
          <div className="seq__stage">
            {perfumesData.map((perfume, i) => (
              <figure
                key={perfume.id}
                className="seq__bottle"
                ref={(el) => {
                  bottleRefs.current[i] = el;
                }}
                data-i={i}
              >
                <img
                  src={perfume.image}
                  alt={`ELXOR ${perfume.name} perfume bottle`}
                  width={640}
                  height={640}
                />
              </figure>
            ))}
          </div>

          {/* Statement Cards */}
          {perfumesData.map((perfume, i) => {
            const isRight = i % 2 === 0;
            return (
              <article
                key={perfume.id}
                className={`seq__card ${
                  isRight ? "seq__card--right" : "seq__card--left"
                }`}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-i={i}
              >
                <img
                  className="seq__card-star"
                  src="/images/gold_star-alpha.png"
                  alt=""
                  width={40}
                  height={40}
                />
                <p className="eyebrow">Signature No. {String(i + 1).padStart(2, "0")}</p>
                <h3>{perfume.name}</h3>
                <span className="seq__card-rule" />
                <p className="seq__card-text">{perfume.tagline}</p>
                <button
                  type="button"
                  className="link"
                  onClick={(e) => handleCardDiscover(e, perfume)}
                >
                  Discover <i className="arrow" aria-hidden="true" />
                </button>
              </article>
            );
          })}

          {/* Handwritten Cursive Notes with Self-Drawing Curved Arrows */}
          {notesList.map((noteText, i) => {
            const isLeft = i % 2 === 0;
            return (
              <p
                key={i}
                className={`seq__note ${
                  isLeft ? "seq__note--left" : "seq__note--right"
                }`}
                ref={(el) => {
                  noteRefs.current[i] = el;
                }}
                data-i={i}
                aria-hidden="true"
              >
                <span>{noteText}</span>
                {isLeft ? (
                  <svg viewBox="0 0 120 60">
                    <path
                      pathLength={1}
                      d="M6 8 C 40 4, 70 18, 92 44"
                    />
                    <path
                      pathLength={1}
                      d="M78 42 L 93 45 L 92 30"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 120 60">
                    <path
                      pathLength={1}
                      d="M114 8 C 80 4, 50 18, 28 44"
                    />
                    <path
                      pathLength={1}
                      d="M42 42 L 27 45 L 28 30"
                    />
                  </svg>
                )}
              </p>
            );
          })}



          {/* Finale Stage: Both Perfumes Showcased Side by Side */}
          <div className="seq__final" ref={seqFinalRef}>
            <h2 className="seq__title">
              <span className="w" style={{ "--i": 0 } as React.CSSProperties}>Two</span>
              <span className="w" style={{ "--i": 1 } as React.CSSProperties}>signatures.</span>
              <br />
              <span className="w gold-text" style={{ "--i": 2 } as React.CSSProperties}>Which</span>
              <span className="w gold-text" style={{ "--i": 3 } as React.CSSProperties}>one</span>
              <span className="w gold-text" style={{ "--i": 4 } as React.CSSProperties}>is</span>
              <span className="w gold-text" style={{ "--i": 5 } as React.CSSProperties}>yours?</span>
            </h2>
            <div data-piece style={{ "--i": 6 } as React.CSSProperties}>
              <a
                href="#contact"
                className="btn btn--gold"
                onClick={handleFinaleClick}
              >
                Find your signature <i className="arrow" aria-hidden="true" />
              </a>
            </div>

            {/* 7 Gold Star Sparks */}
            {sparks.map((spark, idx) => (
              <img
                key={idx}
                className="seq__spark"
                src="/images/gold_star-alpha.png"
                alt=""
                width={40}
                height={40}
                style={
                  {
                    "--x": spark.x,
                    "--y": spark.y,
                    "--s": spark.s,
                    "--d": spark.d,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* Step Progress Indicators */}
          <ol className="seq__steps" ref={stepsWrapRef} aria-hidden="true">
            {perfumesData.map((perfume, i) => (
              <li
                key={perfume.id}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-i={i}
                className={i === 0 ? "is-active" : ""}
              >
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{perfume.name}</span>
                <i />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
