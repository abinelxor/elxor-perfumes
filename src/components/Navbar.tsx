"use client";

import React, { useState, useEffect } from "react";

interface NavbarProps {
  onOpenCart?: () => void;
  cartCount?: number;
  onOpenContact?: () => void;
}

export default function Navbar({
  onOpenCart,
  cartCount = 0,
  onOpenContact,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer for active link
  useEffect(() => {
    const sections = ["home", "collection", "philosophy", "experience", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleToggleMenu = () => {
    const nextState = !menuOpen;
    setMenuOpen(nextState);
    if (nextState) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (menuOpen) {
      setMenuOpen(false);
      document.body.classList.remove("menu-open");
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={`nav ${isScrolled ? "is-scrolled" : ""}`}>
        <a
          href="#home"
          className="nav__logo"
          aria-label="ELXOR Perfumes"
          onClick={(e) => handleLinkClick(e, "home")}
        >
          <img
            src="/images/logo-preloader-crisp.png"
            alt="ELXOR Perfumes"
            width={58}
            height={61}
          />
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a
            href="#home"
            className={activeSection === "home" ? "is-active" : ""}
            onClick={(e) => handleLinkClick(e, "home")}
          >
            Home
          </a>
          <a
            href="#collection"
            className={activeSection === "collection" ? "is-active" : ""}
            onClick={(e) => handleLinkClick(e, "collection")}
          >
            Collection
          </a>
          <a
            href="#philosophy"
            className={activeSection === "philosophy" ? "is-active" : ""}
            onClick={(e) => handleLinkClick(e, "philosophy")}
          >
            About Us
          </a>
          <a
            href="#experience"
            className={activeSection === "experience" ? "is-active" : ""}
            onClick={(e) => handleLinkClick(e, "experience")}
          >
            Experience
          </a>
          <a
            href="#contact"
            className={activeSection === "contact" ? "is-active" : ""}
            onClick={(e) => handleLinkClick(e, "contact")}
          >
            Contact Us
          </a>
        </nav>

        <div className="nav__spacer" aria-hidden="true" />

        <button
          className="nav__toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={handleToggleMenu}
        >
          <span />
          <span />
        </button>
      </header>

      {/* Fullscreen Luxury Mobile Menu */}
      <div className="menu" id="menu" aria-hidden={!menuOpen}>
        <nav className="menu__links" aria-label="Mobile">
          <a href="#home" onClick={(e) => handleLinkClick(e, "home")}>
            <em>01</em>Home
          </a>
          <a
            href="#collection"
            onClick={(e) => handleLinkClick(e, "collection")}
          >
            <em>02</em>Collection
          </a>
          <a
            href="#philosophy"
            onClick={(e) => handleLinkClick(e, "philosophy")}
          >
            <em>03</em>Philosophy
          </a>
          <a
            href="#experience"
            onClick={(e) => handleLinkClick(e, "experience")}
          >
            <em>04</em>Experience
          </a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, "contact")}>
            <em>05</em>Contact
          </a>
        </nav>
        <p className="menu__script">The essence of elegance</p>
      </div>
    </>
  );
}
