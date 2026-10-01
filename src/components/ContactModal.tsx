"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3500,
        backgroundColor: "rgba(5, 4, 3, 0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          backgroundColor: "#0a0806",
          border: "1px solid rgba(213, 174, 111, 0.36)",
          borderRadius: "6px",
          boxShadow:
            "0 30px 70px rgba(0, 0, 0, 0.98), 0 0 40px rgba(212, 175, 55, 0.12)",
          padding: "clamp(32px, 5vw, 44px) clamp(24px, 4vw, 36px)",
          position: "relative",
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
            background: "transparent",
            border: "1px solid rgba(213, 174, 111, 0.28)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#d5ae6f",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#f5dca8";
            e.currentTarget.style.color = "#f5dca8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(213, 174, 111, 0.28)";
            e.currentTarget.style.color = "#d5ae6f";
          }}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "40px 10px" }}>
            <CheckCircle2
              size={52}
              color="#d5ae6f"
              style={{ margin: "0 auto 20px" }}
            />
            <h3
              style={{
                fontFamily: "var(--f-display)",
                fontSize: "1.7rem",
                color: "#f5dca8",
                letterSpacing: "0.08em",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              INQUIRY RECEIVED
            </h3>
            <p style={{ color: "#bcb2a3", fontSize: "0.95rem" }}>
              Our bespoke fragrance concierge will be in touch with you shortly.
            </p>
          </div>
        ) : (
          <>
            <h2
              style={{
                fontFamily: "var(--f-display)",
                fontSize: "clamp(30px, 4vw, 42px)",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: "32px",
                background:
                  "linear-gradient(135deg, #fff9ee 0%, #f5d799 26%, #d4af37 54%, #b88636 82%, #7a5317 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 2px 14px rgba(212, 175, 55, 0.35))",
              }}
            >
              GET IN TOUCH
            </h2>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {/* YOUR NAME */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--amber)",
                    fontFamily: "var(--f-body)",
                  }}
                >
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lord / Lady / Discerning Guest"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    background: "rgba(14, 11, 8, 0.85)",
                    border: "1px solid rgba(213, 174, 111, 0.36)",
                    borderRadius: "6px",
                    padding: "14px 18px",
                    color: "var(--ink)",
                    fontFamily: "var(--f-body)",
                    fontSize: "15px",
                    outline: "none",
                    boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.6)",
                  }}
                />
              </div>

              {/* EMAIL & PHONE */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "18px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--amber)",
                      fontFamily: "var(--f-body)",
                    }}
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="guest@luxury.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    style={{
                      width: "100%",
                      background: "rgba(14, 11, 8, 0.85)",
                      border: "1px solid rgba(213, 174, 111, 0.36)",
                      borderRadius: "6px",
                      padding: "14px 18px",
                      color: "var(--ink)",
                      fontFamily: "var(--f-body)",
                      fontSize: "15px",
                      outline: "none",
                      boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.6)",
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--amber)",
                      fontFamily: "var(--f-body)",
                    }}
                  >
                    PHONE
                  </label>
                  <input
                    type="tel"
                    placeholder="+971 55 469 6935"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    style={{
                      width: "100%",
                      background: "rgba(14, 11, 8, 0.85)",
                      border: "1px solid rgba(213, 174, 111, 0.36)",
                      borderRadius: "6px",
                      padding: "14px 18px",
                      color: "var(--ink)",
                      fontFamily: "var(--f-body)",
                      fontSize: "15px",
                      outline: "none",
                      boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.6)",
                    }}
                  />
                </div>
              </div>

              {/* INQUIRY OR SCENT PREFERENCES */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--amber)",
                    fontFamily: "var(--f-body)",
                  }}
                >
                  INQUIRY OR SCENT PREFERENCES
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your signature fragrance preferences..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  style={{
                    width: "100%",
                    background: "rgba(14, 11, 8, 0.85)",
                    border: "1px solid rgba(213, 174, 111, 0.36)",
                    borderRadius: "6px",
                    padding: "14px 18px",
                    color: "var(--ink)",
                    fontFamily: "var(--f-body)",
                    fontSize: "15px",
                    outline: "none",
                    resize: "none",
                    minHeight: "110px",
                    boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.6)",
                  }}
                />
              </div>

              {/* SEND INQUIRY BUTTON */}
              <button
                type="submit"
                style={{
                  marginTop: "8px",
                  width: "100%",
                  height: "54px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  background:
                    "linear-gradient(100deg, #b98c4a, #f5dca8 45%, #d5ae6f 70%, #a57a3d)",
                  border: "none",
                  borderRadius: "6px",
                  color: "#140d04",
                  fontFamily: "var(--f-body)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(212, 175, 55, 0.25)",
                  transition: "all 0.4s var(--ease)",
                }}
              >
                <span>SEND INQUIRY</span>
                <Send size={16} strokeWidth={2} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
