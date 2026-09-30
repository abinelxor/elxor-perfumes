"use client";

import React from "react";

interface FooterProps {
  onOpenContact?: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img
            src="/images/logo-320.png"
            alt="ELXOR"
            width={92}
            height={94}
            loading="lazy"
            style={{ width: "72px", height: "auto", marginBottom: "26px" }}
          />
          <h2>The Essence of Elegance</h2>
          <p>
            Crafting timeless fragrances for those who appreciate distinction.{" "}
            <span className="brand">ELXOR</span> is more than a fragrance. It is
            a signature.
          </p>
          <p className="wordmark wordmark--left footer__wordmark">
            <span className="brand">ELXOR</span>
          </p>
        </div>

        <div className="footer__col">
          <h3>Quick Links</h3>
          <a href="#home" onClick={(e) => handleScrollTo(e, "home")}>
            Home
          </a>
          <a href="#philosophy" onClick={(e) => handleScrollTo(e, "philosophy")}>
            About Us
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              if (onOpenContact) {
                e.preventDefault();
                onOpenContact();
              }
            }}
          >
            Contact Us
          </a>
        </div>

        <div className="footer__col">
          <h3>Our Collection</h3>
          <a href="#collection" onClick={(e) => handleScrollTo(e, "collection")}>
            Men&rsquo;s Fragrances
          </a>
          <a href="#collection" onClick={(e) => handleScrollTo(e, "collection")}>
            Women&rsquo;s Fragrances
          </a>
          <a href="#collection" onClick={(e) => handleScrollTo(e, "collection")}>
            Signature Collection
          </a>
          <a href="#collection" onClick={(e) => handleScrollTo(e, "collection")}>
            Discovery Set
          </a>
        </div>

        <div className="footer__col">
          <h3>Contact Us</h3>
          <a href="mailto:info@elxorperfumes.com">info@elxorperfumes.com</a>
          <a href="tel:+919876543210">+91 98765 43210</a>
          <span>Your Location, India</span>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          &copy; <span className="js-year">{currentYear}</span>{" "}
          <span className="brand">ELXOR Perfumes</span>. All rights reserved.
        </p>
        <nav aria-label="Legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Sitemap</a>
        </nav>
      </div>
    </footer>
  );
}
