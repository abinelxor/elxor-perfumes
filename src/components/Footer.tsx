"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import AnimatedReveal from "./AnimatedReveal";

interface FooterProps {
  onOpenContact?: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  return (
    <footer
      id="contact"
      style={{
        position: "relative",
        backgroundColor: "#050505",
        paddingTop: "80px",
        overflow: "hidden",
        borderTop: "1px solid rgba(216, 162, 83, 0.4)",
      }}
    >
      {/* Golden landscape ambience overlay at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "240px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(184, 134, 54, 0.04) 50%, rgba(216, 162, 83, 0.09) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* 4 Columns Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.9fr 1.1fr 1.2fr",
            gap: "50px",
            paddingBottom: "60px",
          }}
          className="footer-grid"
        >
          {/* Column 1: Brand Info */}
          <AnimatedReveal direction="up" delay={0.1} distance={20}>
            <div>
              <div
                style={{
                  position: "relative",
                  width: "90px",
                  height: "96px",
                  marginBottom: "20px",
                  filter: "drop-shadow(0 2px 14px rgba(212, 175, 55, 0.45))",
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="ELXOR"
                  fill
                  style={{ objectFit: "contain", objectPosition: "left center" }}
                />
              </div>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  letterSpacing: "3.5px",
                  textTransform: "uppercase",
                  color: "#ecc480",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                THE ESSENCE OF ELEGANCE
              </p>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: "#b0a99c",
                  fontWeight: 300,
                  marginBottom: "28px",
                  maxWidth: "340px",
                }}
              >
                Crafting timeless fragrances for those who appreciate distinction.
                ELXOR is more than a fragrance. It is a signature.
              </p>

              {/* Social Icons */}
              <div style={{ display: "flex", gap: "14px" }}>
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="social-btn"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "1px solid rgba(216, 162, 83, 0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ecc480",
                    transition: "all 0.3s ease",
                    background: "rgba(216, 162, 83, 0.04)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="social-btn"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "1px solid rgba(216, 162, 83, 0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ecc480",
                    transition: "all 0.3s ease",
                    background: "rgba(216, 162, 83, 0.04)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="social-btn"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "1px solid rgba(216, 162, 83, 0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ecc480",
                    transition: "all 0.3s ease",
                    background: "rgba(216, 162, 83, 0.04)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon
                      points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                      fill="currentColor"
                    ></polygon>
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="#"
                  aria-label="Pinterest"
                  className="social-btn"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "1px solid rgba(216, 162, 83, 0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ecc480",
                    transition: "all 0.3s ease",
                    background: "rgba(216, 162, 83, 0.04)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="9" x2="12" y2="21"></line>
                    <path d="M8 12a4 4 0 0 1 8 0c0 3-2 6-4 9-2-3-4-6-4-9z"></path>
                    <circle cx="12" cy="7" r="3"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </AnimatedReveal>

          {/* Column 2: Quick Links */}
          <AnimatedReveal direction="up" delay={0.2} distance={20}>
            <div>
              <h4
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  letterSpacing: "2.5px",
                  color: "#ecc480",
                  fontWeight: 500,
                  marginBottom: "28px",
                }}
              >
                QUICK LINKS
              </h4>

              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                }}
              >
                <li>
                  <a
                    href="#home"
                    style={{ color: "#d0c7bb", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ecc480")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#d0c7bb")}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#philosophy"
                    style={{ color: "#d0c7bb", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ecc480")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#d0c7bb")}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={onOpenContact}
                    style={{ color: "#d0c7bb", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ecc480")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#d0c7bb")}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </AnimatedReveal>

          {/* Column 3: Our Collection */}
          <AnimatedReveal direction="up" delay={0.3} distance={20}>
            <div>
              <h4
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  letterSpacing: "2.5px",
                  color: "#ecc480",
                  fontWeight: 500,
                  marginBottom: "28px",
                }}
              >
                OUR COLLECTION
              </h4>

              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                }}
              >
                {[
                  "Men’s Fragrances",
                  "Women’s Fragrances",
                  "Signature Collection",
                  "Discovery Set",
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#collection"
                      style={{ color: "#d0c7bb", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#ecc480")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#d0c7bb")
                      }
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedReveal>

          {/* Column 4: Contact Us */}
          <AnimatedReveal direction="up" delay={0.4} distance={20}>
            <div>
              <h4
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  letterSpacing: "2.5px",
                  color: "#ecc480",
                  fontWeight: 500,
                  marginBottom: "28px",
                }}
              >
                CONTACT US
              </h4>

              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                }}
              >
                <li style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid rgba(216, 162, 83, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ecc480",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={16} />
                  </div>
                  <a
                    href="mailto:info@elxorperfumes.com"
                    style={{ color: "#d0c7bb", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ecc480")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#d0c7bb")}
                  >
                    info@elxorperfumes.com
                  </a>
                </li>

                <li style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid rgba(216, 162, 83, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ecc480",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={16} />
                  </div>
                  <a
                    href="tel:+919876543210"
                    style={{ color: "#d0c7bb", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ecc480")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#d0c7bb")}
                  >
                    +91 98765 43210
                  </a>
                </li>

                <li style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid rgba(216, 162, 83, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ecc480",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={16} />
                  </div>
                  <span style={{ color: "#d0c7bb" }}>Your Location, India</span>
                </li>
              </ul>
            </div>
          </AnimatedReveal>
        </div>

        {/* Center Golden Divider with Sparkling Star */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            padding: "24px 0 28px",
          }}
        >
          <span
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(216, 162, 83, 0.6) 50%, rgba(216, 162, 83, 0.9) 100%)",
            }}
          />

          <div
            className="animate-star-glint"
            style={{
              position: "relative",
              width: "24px",
              height: "24px",
              flexShrink: 0,
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
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(216, 162, 83, 0.9) 0%, rgba(216, 162, 83, 0.6) 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Sub-Footer Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "40px",
            fontFamily: "var(--font-sans)",
            fontSize: "0.82rem",
            color: "#8c8477",
          }}
          className="sub-footer"
        >
          <div>© 2025 ELXOR PERFUMES. All rights reserved.</div>

          <div style={{ display: "flex", gap: "20px" }}>
            <a
              href="#"
              style={{ color: "inherit", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ecc480")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8c8477")}
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a
              href="#"
              style={{ color: "inherit", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ecc480")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8c8477")}
            >
              Terms & Conditions
            </a>
            <span>|</span>
            <a
              href="#"
              style={{ color: "inherit", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ecc480")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8c8477")}
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .social-btn:hover {
          border-color: #f5d799 !important;
          box-shadow: 0 0 16px rgba(216, 162, 83, 0.5) !important;
          transform: translateY(-3px) scale(1.08) !important;
        }
        @media (max-width: 990px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 650px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .sub-footer {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
