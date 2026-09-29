"use client";

import React, { useState } from "react";
import Image from "next/image";
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
    }, 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3500,
        backgroundColor: "rgba(5, 5, 5, 0.85)",
        backdropFilter: "blur(12px)",
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
          maxWidth: "560px",
          backgroundColor: "#0d0b09",
          border: "1px solid rgba(216, 162, 83, 0.4)",
          borderRadius: "4px",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.95)",
          padding: "36px 32px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close contact dialog"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "transparent",
            border: "1px solid rgba(216, 162, 83, 0.3)",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ecc480",
            cursor: "pointer",
          }}
        >
          <X size={16} />
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "40px 10px" }}>
            <CheckCircle2
              size={52}
              color="#ecc480"
              style={{ margin: "0 auto 20px" }}
            />
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.6rem",
                color: "#ecc480",
                marginBottom: "12px",
              }}
            >
              MESSAGE RECEIVED
            </h3>
            <p style={{ color: "#c2baa9", fontSize: "0.95rem" }}>
              Our bespoke concierge team will be in touch with you shortly.
            </p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div
                style={{
                  position: "relative",
                  width: "56px",
                  height: "60px",
                  margin: "0 auto 14px",
                  filter: "drop-shadow(0 2px 10px rgba(212, 175, 55, 0.4))",
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="ELXOR"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  letterSpacing: "3px",
                  color: "#d8a253",
                  textTransform: "uppercase",
                }}
              >
                VIP CONCIERGE
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.7rem",
                  color: "#ecc480",
                  letterSpacing: "1.5px",
                  fontWeight: 500,
                  marginTop: "6px",
                }}
              >
                GET IN TOUCH
              </h3>
              <p
                style={{
                  color: "#aaa294",
                  fontSize: "0.9rem",
                  marginTop: "8px",
                  fontWeight: 300,
                }}
              >
                For bespoke fragrance consultations, private orders, or sample discovery inquiries.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    letterSpacing: "1.5px",
                    color: "#ecc480",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  Your Name
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
                    padding: "12px 14px",
                    background: "rgba(216, 162, 83, 0.04)",
                    border: "1px solid rgba(216, 162, 83, 0.3)",
                    borderRadius: "3px",
                    color: "#f8f6f0",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      letterSpacing: "1.5px",
                      color: "#ecc480",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                    }}
                  >
                    Email Address
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
                      padding: "12px 14px",
                      background: "rgba(216, 162, 83, 0.04)",
                      border: "1px solid rgba(216, 162, 83, 0.3)",
                      borderRadius: "3px",
                      color: "#f8f6f0",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      letterSpacing: "1.5px",
                      color: "#ecc480",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                    }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "rgba(216, 162, 83, 0.04)",
                      border: "1px solid rgba(216, 162, 83, 0.3)",
                      borderRadius: "3px",
                      color: "#f8f6f0",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    letterSpacing: "1.5px",
                    color: "#ecc480",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  Inquiry or Scent Preferences
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
                    padding: "12px 14px",
                    background: "rgba(216, 162, 83, 0.04)",
                    border: "1px solid rgba(216, 162, 83, 0.3)",
                    borderRadius: "3px",
                    color: "#f8f6f0",
                    fontSize: "0.9rem",
                    outline: "none",
                    resize: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-gold-solid"
                style={{
                  marginTop: "12px",
                  padding: "14px",
                  fontSize: "0.85rem",
                  letterSpacing: "2px",
                }}
              >
                <span>SEND INQUIRY</span>
                <Send size={15} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
