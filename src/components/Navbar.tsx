"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenCart?: () => void;
  cartCount?: number;
  onOpenContact?: () => void;
  visible?: boolean;
}

export default function Navbar({
  onOpenCart,
  cartCount = 0,
  onOpenContact,
  visible = true,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition:
            "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, background 0.4s ease, padding 0.4s ease",
          background: scrolled
            ? "rgba(5, 5, 5, 0.88)"
            : "linear-gradient(180deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0) 100%)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(212, 175, 55, 0.15)"
            : "1px solid transparent",
          padding: scrolled ? "14px 0" : "20px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "64px",
                width: "60px",
                filter: "drop-shadow(0 2px 12px rgba(212, 175, 55, 0.4))",
                transition: "transform 0.3s ease",
              }}
            >
              <Image
                src="/images/logo.png"
                alt="ELXOR"
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "48px",
            }}
            className="desktop-nav"
          >
            <a
              href="#home"
              onClick={() => setActiveLink("home")}
              style={{
                color: activeLink === "home" ? "#ECC480" : "#d8cbba",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                letterSpacing: "2.5px",
                fontWeight: 500,
                textTransform: "uppercase",
                position: "relative",
                paddingBottom: "6px",
                transition: "color 0.3s ease",
              }}
            >
              HOME
              {activeLink === "home" && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "15%",
                    width: "70%",
                    height: "2px",
                    background:
                      "linear-gradient(90deg, #ECC480 0%, #D8A253 100%)",
                    borderRadius: "2px",
                    boxShadow: "0 0 8px rgba(236, 196, 128, 0.6)",
                  }}
                />
              )}
            </a>

            <a
              href="#philosophy"
              onClick={() => setActiveLink("about")}
              style={{
                color: activeLink === "about" ? "#ECC480" : "#d8cbba",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                letterSpacing: "2.5px",
                fontWeight: 500,
                textTransform: "uppercase",
                position: "relative",
                paddingBottom: "6px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ECC480")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  activeLink === "about" ? "#ECC480" : "#d8cbba")
              }
            >
              ABOUT US
              {activeLink === "about" && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "15%",
                    width: "70%",
                    height: "2px",
                    background:
                      "linear-gradient(90deg, #ECC480 0%, #D8A253 100%)",
                    borderRadius: "2px",
                  }}
                />
              )}
            </a>

            <a
              href="#contact"
              onClick={() => {
                setActiveLink("contact");
                if (onOpenContact) onOpenContact();
              }}
              style={{
                color: activeLink === "contact" ? "#ECC480" : "#d8cbba",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                letterSpacing: "2.5px",
                fontWeight: 500,
                textTransform: "uppercase",
                position: "relative",
                paddingBottom: "6px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ECC480")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  activeLink === "contact" ? "#ECC480" : "#d8cbba")
              }
            >
              CONTACT US
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Bag Icon */}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                aria-label="View Shopping Bag"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#d8cbba",
                  cursor: "pointer",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ECC480")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#d8cbba")}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "2px",
                      background:
                        "linear-gradient(135deg, #ECC480 0%, #D8A253 100%)",
                      color: "#120d04",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Explore Pill Button */}
            <a
              href="#collection"
              className="btn-pill-outline"
              style={{
                display: "inline-flex",
              }}
            >
              EXPLORE
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              aria-label="Toggle menu"
              style={{
                display: "none",
                background: "transparent",
                border: "none",
                color: "#ECC480",
                cursor: "pointer",
                padding: "6px",
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(5, 5, 5, 0.98)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "36px",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "72px",
              height: "76px",
              marginBottom: "12px",
              filter: "drop-shadow(0 2px 14px rgba(212, 175, 55, 0.45))",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="ELXOR"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#ECC480",
              fontSize: "1.4rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "var(--font-serif)",
            }}
          >
            HOME
          </a>
          <a
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#f8f6f0",
              fontSize: "1.4rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "var(--font-serif)",
            }}
          >
            ABOUT US
          </a>
          <a
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#f8f6f0",
              fontSize: "1.4rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "var(--font-serif)",
            }}
          >
            COLLECTION
          </a>
          <a
            href="#contact"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenContact) onOpenContact();
            }}
            style={{
              color: "#f8f6f0",
              fontSize: "1.4rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "var(--font-serif)",
            }}
          >
            CONTACT US
          </a>
          <a
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-gold-solid"
            style={{ marginTop: "20px" }}
          >
            EXPLORE COLLECTION
          </a>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
