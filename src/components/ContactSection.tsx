"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 4000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container" data-reveal>
        <h2 className="contact-title">GET IN TOUCH</h2>

        {submitted ? (
          <div className="contact-success">
            <CheckCircle2 size={48} color="var(--gold)" />
            <h3>Inquiry Received</h3>
            <p>
              Thank you for reaching out. Our bespoke fragrance concierge will
              be in touch with you shortly.
            </p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* YOUR NAME */}
            <div className="form-group form-group--full">
              <label htmlFor="contact-name">YOUR NAME</label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Lord / Lady / Discerning Guest"
              />
            </div>

            {/* EMAIL ADDRESS & PHONE */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-email">EMAIL ADDRESS</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="guest@luxury.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-phone">PHONE</label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+971 55 469 6935"
                />
              </div>
            </div>

            {/* INQUIRY OR SCENT PREFERENCES */}
            <div className="form-group form-group--full">
              <label htmlFor="contact-message">
                INQUIRY OR SCENT PREFERENCES
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell us about your signature fragrance preferences..."
              />
            </div>

            {/* SEND INQUIRY BUTTON */}
            <button type="submit" className="contact-submit-btn">
              <span>SEND INQUIRY</span>
              <Send size={16} strokeWidth={2} />
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .contact-section {
          position: relative;
          padding: clamp(80px, 11vw, 140px) var(--gutter);
          background: radial-gradient(
              ellipse 70% 60% at 50% 50%,
              rgba(97, 53, 0, 0.28) 0%,
              transparent 72%
            ),
            var(--bg);
          border-top: 1px solid var(--line-soft);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .contact-container {
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
        }

        .contact-title {
          font-family: var(--f-display);
          font-size: clamp(34px, 4.8vw, 62px);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: clamp(36px, 5vw, 54px);
          background: linear-gradient(
            135deg,
            #fff9ee 0%,
            #f5d799 26%,
            #d4af37 54%,
            #b88636 82%,
            #7a5317 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 2px 16px rgba(212, 175, 55, 0.35));
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-group label {
          font-family: var(--f-body);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--amber);
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          background: rgba(14, 11, 8, 0.85);
          border: 1px solid rgba(213, 174, 111, 0.36);
          border-radius: 6px;
          padding: 15px 18px;
          color: var(--ink);
          font-family: var(--f-body);
          font-size: 15px;
          outline: none;
          transition: all 0.3s var(--ease);
          box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #7d7265;
          opacity: 0.85;
          font-weight: 400;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--gold-hi);
          box-shadow: 0 0 16px rgba(212, 175, 55, 0.28),
            inset 0 2px 6px rgba(0, 0, 0, 0.7);
          background: rgba(18, 14, 10, 0.95);
        }

        .form-group textarea {
          resize: none;
          min-height: 120px;
        }

        .contact-submit-btn {
          margin-top: 10px;
          width: 100%;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(
            100deg,
            #b98c4a,
            var(--gold-hi) 45%,
            var(--gold) 70%,
            #a57a3d
          );
          background-size: 200% 100%;
          border: none;
          border-radius: 6px;
          color: #140d04;
          font-family: var(--f-body);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s var(--ease);
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.25);
        }

        .contact-submit-btn:hover {
          background-position: 100% 50%;
          box-shadow: 0 8px 32px rgba(212, 175, 55, 0.45);
          transform: translateY(-2px);
          gap: 16px;
        }

        .contact-success {
          text-align: center;
          padding: 60px 20px;
          background: rgba(18, 14, 10, 0.6);
          border: 1px solid var(--line);
          border-radius: 8px;
        }

        .contact-success h3 {
          font-family: var(--f-display);
          font-size: 24px;
          color: var(--gold-hi);
          margin: 18px 0 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .contact-success p {
          color: var(--muted);
          font-size: 15px;
          max-width: 440px;
          margin: 0 auto;
        }

        @media (max-width: 680px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          .contact-title {
            font-size: 32px;
          }
        }
      `}</style>
    </section>
  );
}
