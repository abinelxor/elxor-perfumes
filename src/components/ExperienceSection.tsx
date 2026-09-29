"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedReveal from "./AnimatedReveal";

interface ExperienceSectionProps {
  onDiscoverClick?: () => void;
}

export default function ExperienceSection({
  onDiscoverClick,
}: ExperienceSectionProps) {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section
      id="experience"
      style={{
        position: "relative",
        padding: "110px 24px 120px",
        backgroundColor: "#050505",
        overflow: "hidden",
      }}
    >
      {/* Golden lighting background glow with slow pulse */}
      <div
        className="animate-pulse-slow"
        style={{
          position: "absolute",
          top: "25%",
          left: "15%",
          width: "550px",
          height: "550px",
          background:
            "radial-gradient(circle, rgba(216, 162, 83, 0.1) 0%, transparent 65%)",
          filter: "blur(65px)",
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "50px",
            alignItems: "center",
          }}
          className="experience-grid"
        >
          {/* Left Column: Heading, description, button */}
          <div style={{ maxWidth: "600px" }}>
            {/* Overline with trailing line: ELXOR EXPERIENCE — */}
            <AnimatedReveal direction="up" delay={0.1} distance={20}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  marginBottom: "20px",
                }}
              >
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
                  ELXOR EXPERIENCE
                </span>
                <span
                  style={{
                    width: "70px",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, rgba(216, 162, 83, 0.8), transparent)",
                  }}
                />
              </div>
            </AnimatedReveal>

            {/* Main Headline */}
            <AnimatedReveal direction="up" delay={0.2} distance={30}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.6rem, 4.8vw, 4.2rem)",
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
                  YOUR SCENT.
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
                  YOUR SIGNATURE.
                </span>
              </h2>
            </AnimatedReveal>

            {/* Paragraph */}
            <AnimatedReveal direction="up" delay={0.35} distance={25}>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "#c3bcaf",
                  fontWeight: 300,
                  marginBottom: "42px",
                }}
              >
                <p style={{ marginBottom: "8px" }}>
                  More than a fragrance, ELXOR is a reflection of who you are.
                </p>
                <p style={{ marginBottom: "8px" }}>
                  Each note is a journey, each creation a memory,
                </p>
                <p>designed to leave a lasting impression.</p>
              </div>
            </AnimatedReveal>

            {/* Solid Gold Button: DISCOVER ELXOR → with magnetic arrow animation */}
            <AnimatedReveal direction="up" delay={0.5} distance={20}>
              <div>
                <a
                  href="#collection"
                  onClick={onDiscoverClick}
                  className="btn-gold-solid"
                  onMouseEnter={() => setBtnHovered(true)}
                  onMouseLeave={() => setBtnHovered(false)}
                  style={{
                    padding: "16px 36px",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                    letterSpacing: "2px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: btnHovered ? "14px" : "10px",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <span>DISCOVER ELXOR</span>
                  <ArrowRight
                    size={16}
                    style={{
                      transform: btnHovered ? "translateX(4px)" : "translateX(0)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </a>
              </div>
            </AnimatedReveal>
          </div>

          {/* Right Column: Visual on Water with Floating Satin & Smooth Lift */}
          <AnimatedReveal direction="left" delay={0.3} distance={40}>
            <div
              className="experience-visual-box"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1.33 / 1",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85)",
                transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Image
                src="/images/experience_visual.png"
                alt="ELXOR Signature Experience"
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
      </div>

      <style jsx>{`
        .experience-visual-box:hover {
          transform: scale(1.025);
        }
        @media (max-width: 990px) {
          .experience-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .experience-grid > div:first-child {
            margin: 0 auto;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
