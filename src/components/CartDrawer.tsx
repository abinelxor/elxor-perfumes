"use client";

import React from "react";
import Image from "next/image";
import { X, Trash2, ArrowRight, ShieldCheck, Gift } from "lucide-react";
import { PerfumeItem } from "./CollectionSection";

export interface CartItem {
  perfume: PerfumeItem;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, item) => {
    const basePrice = parseInt(item.perfume.price.replace("$", ""), 10) || 340;
    const price = item.size === "50ml" ? 280 : basePrice;
    return acc + price * item.quantity;
  }, 0);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        backgroundColor: "var(--overlay)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          height: "100%",
          backgroundColor: "var(--surface)",
          borderLeft: "1px solid rgba(216, 162, 83, 0.35)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-15px 0 45px var(--shadow-strong)",
          padding: "30px 26px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "20px",
            borderBottom: "1px solid rgba(216, 162, 83, 0.2)",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                position: "relative",
                width: "42px",
                height: "45px",
                filter: "drop-shadow(0 1px 6px rgba(154, 111, 43, 0.3))",
                flexShrink: 0,
              }}
            >
              <Image
                src="/images/logo.png"
                alt="ELXOR"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  letterSpacing: "3px",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                }}
              >
                YOUR SELECTION
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.4rem",
                  color: "var(--gold-text-strong)",
                  letterSpacing: "1.5px",
                  fontWeight: 500,
                }}
              >
                SHOPPING BAG
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Shopping Bag"
            style={{
              background: "transparent",
              border: "1px solid rgba(216, 162, 83, 0.3)",
              borderRadius: "50%",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--gold-text-strong)",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Items List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            paddingRight: "6px",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                margin: "auto 0",
                color: "var(--muted)",
                fontFamily: "var(--font-sans)",
              }}
            >
              <p style={{ fontSize: "1rem", marginBottom: "12px" }}>
                Your shopping bag is currently empty.
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--dim)" }}>
                Explore our signature haute parfumerie collection to begin.
              </p>
            </div>
          ) : (
            items.map((item, idx) => {
              const basePrice =
                parseInt(item.perfume.price.replace("$", ""), 10) || 340;
              const unitPrice = item.size === "50ml" ? 280 : basePrice;

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    background: "rgba(216, 162, 83, 0.04)",
                    border: "1px solid rgba(216, 162, 83, 0.2)",
                    borderRadius: "4px",
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "60px",
                      height: "60px",
                      borderRadius: "3px",
                      overflow: "hidden",
                      background: "var(--surface-2)",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.perfume.image}
                      alt={item.perfume.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "0.95rem",
                        letterSpacing: "1.2px",
                        color: "var(--gold-text-strong)",
                      }}
                    >
                      {item.perfume.name}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                        display: "block",
                        marginTop: "2px",
                      }}
                    >
                      {item.size} • Qty: {item.quantity}
                    </span>
                    <span
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--gold-text-strong)",
                        fontWeight: 600,
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      ${unitPrice * item.quantity}
                    </span>
                  </div>

                  <button
                    onClick={() => onRemoveItem(idx)}
                    aria-label="Remove item"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--dim)",
                      cursor: "pointer",
                      padding: "6px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#d9534f")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Perks & Total */}
        {items.length > 0 && (
          <div
            style={{
              paddingTop: "20px",
              borderTop: "1px solid rgba(216, 162, 83, 0.2)",
            }}
          >
            {/* Luxury Perks */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "20px",
                fontSize: "0.8rem",
                color: "var(--muted)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Gift size={15} color="var(--gold-text-strong)" />
                <span>Complimentary luxury gift box & 2 sample vials</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={15} color="var(--gold-text-strong)" />
                <span>Complimentary insured worldwide white-glove delivery</span>
              </div>
            </div>

            {/* Total */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9rem",
                  letterSpacing: "2px",
                  color: "var(--ink)",
                  textTransform: "uppercase",
                }}
              >
                SUBTOTAL
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.4rem",
                  color: "var(--gold-text-strong)",
                  fontWeight: 600,
                }}
              >
                ${totalAmount}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              className="btn-gold-solid"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "0.88rem",
                letterSpacing: "2px",
              }}
              onClick={() => {
                alert("Thank you for your discerning taste! Order simulated for ELXOR PERFUMES.");
              }}
            >
              <span>CHECKOUT</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
