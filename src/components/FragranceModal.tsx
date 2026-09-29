"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Check, Sparkles } from "lucide-react";
import { PerfumeItem } from "./CollectionSection";

interface FragranceModalProps {
  perfume: PerfumeItem | null;
  onClose: () => void;
  onAddToCart: (perfume: PerfumeItem, size: string, quantity: number) => void;
}

export default function FragranceModal({
  perfume,
  onClose,
  onAddToCart,
}: FragranceModalProps) {
  const [selectedSize, setSelectedSize] = useState("100ml");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!perfume) return null;

  const handleAdd = () => {
    onAddToCart(perfume, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "rgba(5, 5, 5, 0.85)",
        backdropFilter: "blur(14px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "850px",
          background: "#0c0a08",
          border: "1px solid rgba(216, 162, 83, 0.4)",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow:
            "0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(216, 162, 83, 0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(20, 18, 14, 0.7)",
            border: "1px solid rgba(216, 162, 83, 0.3)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ecc480",
            cursor: "pointer",
            zIndex: 10,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#f5d799";
            e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(216, 162, 83, 0.3)";
            e.currentTarget.style.transform = "none";
          }}
        >
          <X size={18} />
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
          }}
          className="modal-grid"
        >
          {/* Left: Product Visual */}
          <div
            style={{
              position: "relative",
              minHeight: "420px",
              background: "#050403",
              borderRight: "1px solid rgba(216, 162, 83, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "30px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "340px",
              }}
            >
              <Image
                src={perfume.image}
                alt={perfume.name}
                fill
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.8))",
                }}
              />
            </div>
          </div>

          {/* Right: Fragrance Details */}
          <div
            style={{
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  letterSpacing: "3px",
                  color: "#d8a253",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                HAUTE PARFUMERIE
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.9rem",
                  letterSpacing: "1.5px",
                  color: "#ecc480",
                  marginBottom: "6px",
                  fontWeight: 500,
                }}
              >
                {perfume.name}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  color: "#c2bab0",
                  marginBottom: "16px",
                }}
              >
                &ldquo;{perfume.tagline}&rdquo;
              </p>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  color: "#aba395",
                  fontWeight: 300,
                  marginBottom: "24px",
                }}
              >
                {perfume.story}
              </p>

              {/* Olfactory Notes Pyramid */}
              <div
                style={{
                  background: "rgba(216, 162, 83, 0.04)",
                  border: "1px solid rgba(216, 162, 83, 0.2)",
                  borderRadius: "3px",
                  padding: "16px 18px",
                  marginBottom: "24px",
                }}
              >
                <div style={{ marginBottom: "8px", fontSize: "0.82rem" }}>
                  <span style={{ color: "#ecc480", fontWeight: 600, letterSpacing: "1px" }}>
                    TOP NOTES:{" "}
                  </span>
                  <span style={{ color: "#d2cbbf" }}>{perfume.topNotes.join(" • ")}</span>
                </div>
                <div style={{ marginBottom: "8px", fontSize: "0.82rem" }}>
                  <span style={{ color: "#ecc480", fontWeight: 600, letterSpacing: "1px" }}>
                    HEART NOTES:{" "}
                  </span>
                  <span style={{ color: "#d2cbbf" }}>{perfume.heartNotes.join(" • ")}</span>
                </div>
                <div style={{ fontSize: "0.82rem" }}>
                  <span style={{ color: "#ecc480", fontWeight: 600, letterSpacing: "1px" }}>
                    BASE NOTES:{" "}
                  </span>
                  <span style={{ color: "#d2cbbf" }}>{perfume.baseNotes.join(" • ")}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div style={{ display: "flex", gap: "12px", marginBottom: "26px" }}>
                {["50ml", "100ml"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background:
                        selectedSize === size
                          ? "rgba(216, 162, 83, 0.15)"
                          : "transparent",
                      border: `1px solid ${
                        selectedSize === size
                          ? "#ecc480"
                          : "rgba(216, 162, 83, 0.3)"
                      }`,
                      color: selectedSize === size ? "#ecc480" : "#aba395",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      letterSpacing: "1px",
                      borderRadius: "3px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {size === "50ml" ? "50ml — $280" : "100ml — " + perfume.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag Action */}
            <div style={{ display: "flex", gap: "14px" }}>
              <button
                onClick={handleAdd}
                className="btn-gold-solid"
                style={{
                  flex: 1,
                  padding: "14px",
                  fontSize: "0.88rem",
                  letterSpacing: "2px",
                }}
              >
                {added ? (
                  <>
                    <Check size={18} />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
