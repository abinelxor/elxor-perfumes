"use client";

import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onOpenContact?: () => void;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
}

export default function Footer({
  onOpenContact,
  email = "info@elxorperfumes.com",
  phone = "+971 554696935",
  whatsapp = "+971 554696935",
  address = "Dubai, United Arab Emirates",
}: FooterProps) {
  const telHref = `tel:${phone.replace(/[^+d]/g, "")}`;
  const waHref = `https://wa.me/${whatsapp.replace(/D/g, "")}`;
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const win = window as unknown as {
        lenis?: { scrollTo: (t: HTMLElement, opts?: { offset?: number; duration?: number }) => void };
      };
      if (win.lenis) {
        win.lenis.scrollTo(target, { offset: 0, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img
            src="/images/elxor-logo.png"
            alt="ELXOR Perfumes"
            width={120}
            height={127}
            loading="lazy"
            style={{
              width: "115px",
              height: "auto",
              marginBottom: "24px",
              filter: "drop-shadow(0 2px 14px rgba(213, 174, 111, 0.3))",
            }}
          />
          <h2>The Essence of Elegance</h2>
          <p>
            Crafting timeless fragrances for those who appreciate distinction.{" "}
            <span className="brand">ELXOR</span> is more than a fragrance. It is
            a signature.
          </p>

          {/* Luxury Social Media Icon Buttons */}
          <div className="footer__socials" aria-label="Social media channels">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/19ZHzYdMmr/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="Follow ELXOR on Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/elxorperfumes?utm_source=qr&stkn=N3UyYXd3d3QwMW85"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="Follow ELXOR on Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="Chat with ELXOR on WhatsApp (+971 554696935)"
              title="WhatsApp: +971 554696935"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            {/* Direct Call */}
            <a
              href="tel:+971554696935"
              className="footer__social-btn"
              aria-label="Call ELXOR (+971 554696935)"
              title="Call: +971 554696935"
            >
              <Phone size={18} aria-hidden="true" />
            </a>
          </div>

          <p className="wordmark wordmark--left footer__wordmark">
            <span className="brand">ELXOR</span>
          </p>
        </div>

        <div className="footer__col">
          <h3>Quick Links</h3>
          <a href="#home" onClick={(e) => handleScrollTo(e, "home")}>
            Home
          </a>
          <a href="#about" onClick={(e) => handleScrollTo(e, "about")}>
            About Us
          </a>
          <a href="#faq" onClick={(e) => handleScrollTo(e, "faq")}>
            FAQ
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
            Amoriel
          </a>
          <a href="#collection" onClick={(e) => handleScrollTo(e, "collection")}>
            Sanctix
          </a>
        </div>

        <div className="footer__col">
          <h3>Contact Us</h3>
          <a href={telHref} className="footer__contact-line" title="Call directly">
            <Phone size={14} className="footer__contact-icon" />
            <span>{phone}</span>
          </a>
          <a
            href="https://wa.me/971554696935"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__contact-line"
            title="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="footer__contact-icon" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>{whatsapp} (WhatsApp)</span>
          </a>
          <a href={`mailto:${email}`} className="footer__contact-line" title="Email us">
            <Mail size={14} className="footer__contact-icon" />
            <span>{email}</span>
          </a>
          <span className="footer__contact-line">
            <MapPin size={14} className="footer__contact-icon" />
            <span>{address}</span>
          </span>
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
