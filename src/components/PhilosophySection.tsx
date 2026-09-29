"use client";

import React, { useState } from "react";
import Image from "next/image";
import AnimatedReveal from "./AnimatedReveal";

const valuesList = [
  {
    id: "quality",
    title: "QUALITY",
    desc: "Only the finest ingredients for exceptional fragrances.",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="#cca762"
          strokeWidth="1.2"
          fill="rgba(204, 167, 98, 0.05)"
        />
        <path
          d="M16 20L24 14L32 20L24 34L16 20Z"
          stroke="#ecc480"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M16 20H32M24 14V34M20 20L24 34L28 20"
          stroke="#ecc480"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "elegance",
    title: "ELEGANCE",
    desc: "Fragrances that reflect refinement and class.",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="#cca762"
          strokeWidth="1.2"
          fill="rgba(204, 167, 98, 0.05)"
        />
        <path
          d="M15 31L17 19L24 25L31 19L33 31H15Z"
          stroke="#ecc480"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="17" cy="17" r="1.5" fill="#ecc480" />
        <circle cx="24" cy="22" r="1.5" fill="#ecc480" />
        <circle cx="31" cy="17" r="1.5" fill="#ecc480" />
      </svg>
    ),
  },
  {
    id: "craftsmanship",
    title: "CRAFTSMANSHIP",
    desc: "Meticulously crafted with attention to detail.",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="#cca762"
          strokeWidth="1.2"
          fill="rgba(204, 167, 98, 0.05)"
        />
        <path
          d="M32 16C32 16 26 16.5 21 21.5C16 26.5 16 32 16 32C16 32 21.5 32 26.5 27C31.5 22 32 16 32 16Z"
          stroke="#ecc480"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M16 32L24 24"
          stroke="#ecc480"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "authenticity",
    title: "AUTHENTICITY",
    desc: "True fragrances for true individuals.",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="#cca762"
          strokeWidth="1.2"
          fill="rgba(204, 167, 98, 0.05)"
        />
        <polygon
          points="24,14 27,21 34,22 29,27 30,34 24,30 18,34 19,27 14,22 21,21"
          stroke="#ecc480"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function PhilosophySection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="philosophy"
      style={{
        position: "relative",
        padding: "110px 24px 100px",
        backgroundColor: "#050505",
        overflow: "hidden",
      }}
    >
      {/* Ambient background light */}
      <div
        className="animate-pulse-slow"
        style={{
          position: "absolute",
          top: "20%",
          right: "20%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(216, 162, 83, 0.1) 0%, transparent 65%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Top Two Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "50px",
            alignItems: "center",
            marginBottom: "80px",
          }}
          className="philosophy-top-grid"
        >
          {/* Left Column: Heading & Text */}
          <div style={{ maxWidth: "620px" }}>
            <AnimatedReveal direction="up" delay={0.1} distance={20}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  letterSpacing: "4px",
                  color: "#d8a253",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  marginBottom: "20px",
                  display: "block",
                }}
              >
                ELXOR PHILOSOPHY
              </span>
            </AnimatedReveal>

            <AnimatedReveal direction="up" delay={0.2} distance={30}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.4rem, 4.4vw, 3.8rem)",
                  lineHeight: 1.15,
                  fontWeight: 500,
                  letterSpacing: "1.5px",
                  marginBottom: "28px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    background:
                      "linear-gradient(135deg, #fdf4d8 0%, #ecc480 35%, #d4a04d 70%, #9e7025 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ELEGANCE IS
                </span>
                <span
                  style={{
                    display: "block",
                    background:
                      "linear-gradient(135deg, #fdf4d8 0%, #ecc480 35%, #d4a04d 70%, #9e7025 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  NOT SIMPLY SEEN.
                </span>
                <span
                  style={{
                    display: "block",
                    background:
                      "linear-gradient(135deg, #fdf4d8 0%, #ecc480 35%, #d4a04d 70%, #9e7025 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  IT IS EXPERIENCED.
                </span>
              </h2>
            </AnimatedReveal>

            <AnimatedReveal direction="up" delay={0.35} distance={25}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "#c3bcaf",
                  fontWeight: 300,
                }}
              >
                At ELXOR, we believe fragrance is more than a scent — it is a form
                of self-expression. Our philosophy is rooted in quality,
                craftsmanship and timeless elegance, creating fragrances that
                become a part of your identity.
              </p>
            </AnimatedReveal>
          </div>

          {/* Right Column: Visual with Perfume & Jasmine Flowers */}
          <AnimatedReveal direction="left" delay={0.25} distance={35}>
            <div
              className="philosophy-visual-box"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1.5 / 1",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
                transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Image
                src="/images/philosophy_visual.png"
                alt="ELXOR Philosophy Fragrance"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "4px",
                }}
              />
            </div>
          </AnimatedReveal>
        </div>

        {/* Section Divider: — OUR VALUES — */}
        <AnimatedReveal direction="up" delay={0.1} distance={20}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              marginBottom: "50px",
            }}
          >
            <span
              style={{
                width: "80px",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(216, 162, 83, 0.7))",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                letterSpacing: "4px",
                color: "#d8a253",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              OUR VALUES
            </span>
            <span
              style={{
                width: "80px",
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(216, 162, 83, 0.7), transparent)",
              }}
            />
          </div>
        </AnimatedReveal>

        {/* 4 Values Cards Grid with Interactive Stagger */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "22px",
            marginBottom: "75px",
          }}
          className="values-grid"
        >
          {valuesList.map((val, idx) => {
            const isHovered = hoveredCard === val.id;
            return (
              <AnimatedReveal
                key={val.id}
                direction="up"
                delay={0.1 * (idx + 1)}
                distance={30}
              >
                <div
                  className="luxury-card"
                  onMouseEnter={() => setHoveredCard(val.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    borderRadius: "2px",
                    padding: "40px 24px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: isHovered
                      ? "1px solid rgba(245, 215, 153, 0.75)"
                      : "1px solid rgba(216, 162, 83, 0.35)",
                    background: "#080706",
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    boxShadow: isHovered
                      ? "0 20px 45px rgba(0, 0, 0, 0.9), 0 0 25px rgba(212, 175, 55, 0.2)"
                      : "none",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "20px",
                      transform: isHovered ? "scale(1.12)" : "scale(1)",
                      filter: isHovered
                        ? "drop-shadow(0 0 12px rgba(236, 196, 128, 0.6))"
                        : "none",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {val.icon}
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.1rem",
                      letterSpacing: "2.5px",
                      color: isHovered ? "#f7e3b5" : "#ecc480",
                      fontWeight: 500,
                      marginBottom: "14px",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {val.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.88rem",
                      color: "#d4cbbe",
                      lineHeight: 1.6,
                      fontWeight: 300,
                      maxWidth: "240px",
                    }}
                  >
                    {val.desc}
                  </p>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>

        {/* Bottom Signature Quote with Sparkling Center Star */}
        <AnimatedReveal direction="up" delay={0.2} distance={25}>
          <div
            style={{
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {/* Gold Star Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  flex: 1,
                  maxWidth: "280px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(216, 162, 83, 0.8))",
                }}
              />
              <div
                className="animate-star-glint"
                style={{
                  position: "relative",
                  width: "24px",
                  height: "24px",
                }}
              >
                <Image
                  src="/images/gold_star.png"
                  alt="✦"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span
                style={{
                  flex: 1,
                  maxWidth: "280px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, rgba(216, 162, 83, 0.8), transparent)",
                }}
              />
            </div>

            {/* Quote Text */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.95rem",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                color: "#ecc480",
                fontWeight: 400,
                filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.2))",
              }}
            >
              ELXOR IS MORE THAN A FRAGRANCE. IT IS A SIGNATURE.
            </p>
          </div>
        </AnimatedReveal>
      </div>

      <style jsx>{`
        .philosophy-visual-box:hover {
          transform: scale(1.02);
        }
        @media (max-width: 990px) {
          .philosophy-top-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .values-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
