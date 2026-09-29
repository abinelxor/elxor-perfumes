"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedReveal from "./AnimatedReveal";

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
    id: "noir-essence",
    name: "NOIR ESSENCE",
    tagline: "Bold. Mysterious. Unforgettable.",
    image: "/images/perfume_noir_essence.png",
    price: "$340",
    size: "100ml / 3.4 FL. OZ.",
    topNotes: ["Black Truffle", "Smoked Bergamot", "Pink Pepper"],
    heartNotes: ["Black Orchid", "Midnight Jasmine", "Patchouli Leaf"],
    baseNotes: ["Smoked Incense", "Bourbon Vanilla", "Rare Dark Amber"],
    story:
      "A nocturnal masterpiece evoking shadow and light. Noir Essence wraps the wearer in an intoxicating aura of rare dark woods, golden smoke, and mysterious midnight blooms.",
  },
  {
    id: "royal-oud",
    name: "ROYAL OUD",
    tagline: "A timeless expression of luxury.",
    image: "/images/perfume_royal_oud.png",
    price: "$390",
    size: "100ml / 3.4 FL. OZ.",
    topNotes: ["Calabrian Lemon", "Sicilian Bergamot", "Cardamom"],
    heartNotes: ["Cambodian Agarwood", "Damask Rose", "Cedar Shards"],
    baseNotes: ["Warm Sandalwood", "Golden Amber", "Rich Tonka Bean"],
    story:
      "Crafted for modern royalty. Royal Oud marries precious aged Cambodian agarwood with glowing warm amber and majestic roses, forming an unmistakable statement of prestige.",
  },
  {
    id: "silver-ambre",
    name: "SILVER AMBRE",
    tagline: "Fresh. Refined. Distinct.",
    image: "/images/perfume_silver_ambre.png",
    price: "$310",
    size: "100ml / 3.4 FL. OZ.",
    topNotes: ["Silver Mint", "Crisp Mandarin", "Aquatic Minerals"],
    heartNotes: ["Grey Ambergris", "White Iris", "Clary Sage"],
    baseNotes: ["Cashmere Wood", "White Musk", "Vetiver Root"],
    story:
      "A crystal-clear horizon in twilight. Silver Ambre presents an exhilarating interplay of crisp minerality and velvety warmth, leaving a pristine and unforgettable trail.",
  },
  {
    id: "velvet-rouge",
    name: "VELVET ROUGE",
    tagline: "Passion in every drop.",
    image: "/images/perfume_velvet_rouge.png",
    price: "$360",
    size: "100ml / 3.4 FL. OZ.",
    topNotes: ["Black Cherry", "Blood Orange", "Persian Saffron"],
    heartNotes: ["Crimson Velvet Rose", "Cacao Pod", "Plum Blossom"],
    baseNotes: ["Roasted Tonka", "Leather", "Golden Honeycomb"],
    story:
      "An opulent dance of seduction. Velvet Rouge weaves luscious dark cherry and velvety crimson roses with fiery saffron, burning with quiet intensity and timeless passion.",
  },
];

interface CollectionSectionProps {
  onSelectPerfume: (perfume: PerfumeItem) => void;
}

export default function CollectionSection({
  onSelectPerfume,
}: CollectionSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="collection"
      style={{
        position: "relative",
        padding: "110px 24px 120px",
        backgroundColor: "#050505",
        overflow: "hidden",
      }}
    >
      {/* Background Ambience with soft golden radial flare */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(216, 162, 83, 0.09) 0%, transparent 70%)",
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
        {/* Header Section */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "840px",
            margin: "0 auto 70px",
          }}
        >
          {/* Overline with side lines: — OUR COLLECTION — */}
          <AnimatedReveal direction="down" delay={0.1} distance={20}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  width: "55px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(216, 162, 83, 0.8))",
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
                OUR COLLECTION
              </span>
              <span
                style={{
                  width: "55px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, rgba(216, 162, 83, 0.8), transparent)",
                }}
              />
            </div>
          </AnimatedReveal>

          {/* Headline */}
          <AnimatedReveal direction="up" delay={0.2} distance={25}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                fontWeight: 500,
                letterSpacing: "1.5px",
                marginBottom: "20px",
                background:
                  "linear-gradient(135deg, #fdf4d8 0%, #ecc480 35%, #d4a04d 70%, #a27429 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              CRAFTED FOR DISTINCTION
            </h2>
          </AnimatedReveal>

          {/* Description */}
          <AnimatedReveal direction="up" delay={0.3} distance={20}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "#c2bab0",
                fontWeight: 300,
                maxWidth: "760px",
                margin: "0 auto",
              }}
            >
              At ELXOR, we believe fragrance is more than a scent — it is a
              statement of individuality, elegance and timeless appeal. Our
              creations are crafted for those who seek the extraordinary.
            </p>
          </AnimatedReveal>
        </div>

        {/* 4 Cards Grid with Staggered Scroll Reveal */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
          className="collection-grid"
        >
          {perfumesData.map((item, index) => {
            const isHovered = hoveredId === item.id;
            return (
              <AnimatedReveal
                key={item.id}
                direction="up"
                delay={0.15 * (index + 1)}
                distance={35}
              >
                <div
                  className="luxury-card"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    borderRadius: "2px",
                    display: "flex",
                    flexDirection: "column",
                    border: isHovered
                      ? "1px solid rgba(245, 215, 153, 0.75)"
                      : "1px solid rgba(216, 162, 83, 0.38)",
                    background: "#080706",
                    cursor: "pointer",
                    padding: "16px 16px 28px",
                    boxShadow: isHovered
                      ? "0 22px 45px -8px rgba(0, 0, 0, 0.95), 0 0 25px rgba(212, 175, 55, 0.25)"
                      : "0 10px 25px rgba(0, 0, 0, 0.6)",
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onClick={() => onSelectPerfume(item)}
                >
                  {/* Product Image Frame */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1.35 / 1",
                      overflow: "hidden",
                      borderRadius: "2px",
                      marginBottom: "24px",
                      background: "#030303",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        transform: isHovered ? "scale(1.06)" : "scale(1)",
                        transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </div>

                  {/* Title & Tagline */}
                  <div
                    style={{
                      textAlign: "center",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          letterSpacing: "1.8px",
                          color: isHovered ? "#f7e3b5" : "#ecc480",
                          marginBottom: "8px",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {item.name}
                      </h3>

                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.88rem",
                          color: "#e2dbcf",
                          lineHeight: 1.5,
                          fontWeight: 300,
                          marginBottom: "24px",
                        }}
                      >
                        {item.tagline}
                      </p>
                    </div>

                    {/* Discover Button with animated hover arrow */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        className="btn-gold-outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPerfume(item);
                        }}
                        style={{
                          padding: "10px 22px",
                          fontSize: "0.78rem",
                          letterSpacing: "1.8px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: isHovered ? "12px" : "8px",
                          backgroundColor: isHovered
                            ? "rgba(212, 175, 55, 0.12)"
                            : "transparent",
                          borderColor: isHovered ? "#f5d799" : "rgba(204, 167, 98, 0.35)",
                          color: isHovered ? "#f5d799" : "#cca762",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <span>DISCOVER</span>
                        <ArrowRight
                          size={14}
                          style={{
                            transform: isHovered ? "translateX(3px)" : "translateX(0)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          .collection-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 600px) {
          .collection-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
