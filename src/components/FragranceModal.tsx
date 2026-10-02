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
  const [selectedSize, setSelectedSize] = useState("50ml");
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
        className="modal-card"
        style={{
          position: "relative",
          width: "92vw",
          maxWidth: "980px",
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
            top: "16px",
            right: "16px",
            background: "rgba(20, 18, 14, 0.7)",
            border: "1px solid rgba(216, 162, 83, 0.3)",
            borderRadius: "50%",
            width: "34px",
            height: "34px",
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
          <X size={17} />
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.35fr",
            alignItems: "stretch",
          }}
          className="modal-grid"
        >
          {/* Left: Product Visual */}
          <div
            style={{
              position: "relative",
              minHeight: "360px",
              background: "#050403",
              borderRight: "1px solid rgba(216, 162, 83, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "300px",
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
            className="modal-content-scroll"
            style={{
              padding: "26px 30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.68rem",
                  letterSpacing: "2.5px",
                  color: "#d8a253",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                HAUTE PARFUMERIE
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.65rem",
                  letterSpacing: "1.2px",
                  color: "#ecc480",
                  marginBottom: "2px",
                  fontWeight: 500,
                }}
              >
                {perfume.name}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  color: "#c2bab0",
                  marginBottom: "10px",
                }}
              >
                &ldquo;{perfume.tagline}&rdquo;
              </p>

              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.79rem",
                  lineHeight: 1.48,
                  color: "#aba395",
                  fontWeight: 300,
                  marginBottom: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "7px",
                }}
              >
                {perfume.story.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {perfume.signatureQuote && (
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.78rem",
                    color: "#ecc480",
                    fontStyle: "italic",
                    letterSpacing: "0.3px",
                    fontWeight: 500,
                    marginBottom: "14px",
                    padding: "7px 12px",
                    background: "rgba(216, 162, 83, 0.08)",
                    borderLeft: "2px solid #ecc480",
                    borderRadius: "0 2px 2px 0",
                  }}
                >
                  {perfume.signatureQuote}
                </p>
              )}

              {/* Size */}
              <div style={{ marginBottom: "14px", fontSize: "0.8rem", color: "#aba395", letterSpacing: "1px", fontFamily: "var(--font-sans)" }}>
                SIZE: <span style={{ color: "#ecc480", fontWeight: 500 }}>50ml</span>
              </div>
            </div>

            {/* Shop Now Action */}
            <div style={{ display: "flex", gap: "14px" }}>
              <button
                onClick={handleAdd}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "rgba(216, 162, 83, 0.15)",
                  border: "1px solid #ecc480",
                  color: "#ecc480",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  letterSpacing: "1.5px",
                  borderRadius: "3px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(216, 162, 83, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(216, 162, 83, 0.15)";
                }}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>SHOP NOW</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>SHOP NOW</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-card {
          max-height: 94vh;
        }
        @media (max-width: 768px) {
          .modal-card {
            max-height: 90vh;
            overflow-y: auto !important;
          }
          .modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .modal-card::-webkit-scrollbar,
        .modal-content-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .modal-card::-webkit-scrollbar-thumb,
        .modal-content-scroll::-webkit-scrollbar-thumb {
          background: rgba(216, 162, 83, 0.35);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
