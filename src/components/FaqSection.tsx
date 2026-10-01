"use client";

import React, { useState } from "react";
import { ChevronDown, ExternalLink, Sparkles, MessageCircle } from "lucide-react";

interface FaqItem {
  id: string;
  num: string;
  question: string;
  answer: React.ReactNode;
  tag?: string;
}

interface FaqSectionProps {
  onOpenContact?: () => void;
}

export default function FaqSection({ onOpenContact }: FaqSectionProps) {
  // Start with all items closed so only headings are shown by default; click to expand
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const faqData: FaqItem[] = [
    {
      id: "faq-1",
      num: "01",
      tag: "Brand & Origins",
      question: "What is ELXOR?",
      answer: (
        <>
          <p>
            <strong className="brand gold-highlight">ELXOR</strong> is a luxury
            Dubai-based perfume house crafting two signature fragrance collections,{" "}
            <strong className="gold-highlight">AMORIEL</strong> and{" "}
            <strong className="gold-highlight">SANCTIX</strong>, tailored for
            men, women, and universal wear.
          </p>
          <p style={{ marginTop: "12px" }}>
            Born from the heart of the Middle East&apos;s rich olfactory heritage,
            our creations blend noble oud, radiant amber, and rare florals with modern
            French perfumery techniques. The brand sells exclusively through Amazon.
          </p>
        </>
      ),
    },
    {
      id: "faq-2",
      num: "02",
      tag: "Composition & Gender",
      question: "Are ELXOR perfumes unisex?",
      answer: (
        <>
          <p>
            Yes. Both <strong className="gold-highlight">AMORIEL</strong> and{" "}
            <strong className="gold-highlight">SANCTIX</strong> are crafted as
            luxury unisex fragrances, designed to be worn and celebrated by both
            men and women without boundary.
          </p>
          <p style={{ marginTop: "12px" }}>
            Rather than adhering to traditional gender divisions, each composition
            features harmonious, balanced accords that adapt intuitively to your
            unique skin chemistry, personal style, and every distinctive occasion.
          </p>
        </>
      ),
    },
    {
      id: "faq-3",
      num: "03",
      tag: "Authorized Channels",
      question: "Where can I buy ELXOR perfume online?",
      answer: (
        <>
          <p>
            <strong className="brand gold-highlight">ELXOR</strong> is sold only
            through our official Amazon storefront. We do not sell directly
            through this website, and we do not supply third-party unauthorized
            resellers.
          </p>
          <p style={{ marginTop: "12px" }}>
            This exclusive distribution ensures strict batch freshness, climate-controlled
            storage, and guaranteed authenticity for every bottle delivered to your door.
          </p>
          <div className="faq-action-row">
            <a
              href="https://www.amazon.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="faq-cta-btn"
            >
              <span>Visit Official Store</span>
              <ExternalLink size={14} />
            </a>
            <span className="faq-authenticity-pill">
              <Sparkles size={13} color="var(--gold)" />
              100% Guaranteed Authentic
            </span>
          </div>
        </>
      ),
    },
    {
      id: "faq-4",
      num: "04",
      tag: "Gifting & Presentation",
      question: "Does ELXOR offer perfume gift sets for women and men?",
      answer: (
        <>
          <p>
            Yes. <strong className="brand gold-highlight">ELXOR</strong> fragrances
            make an exceptional, elegant gift choice for both men and women,
            offering sophisticated scents suitable for different celebrations,
            milestones, and personal milestones.
          </p>
          <p style={{ marginTop: "12px" }}>
            Every bottle arrives in our executive midnight-and-gold presentation
            casket, complete with our signature seal, making it ready for gifting
            upon arrival.
          </p>
        </>
      ),
    },
  ];

  return (
    <section className="faq-section section" id="faq" aria-labelledby="faq-title">
      {/* Background ambient lighting */}
      <div className="faq-ambient-glow" aria-hidden="true" />

      <div className="faq-container">
        {/* Section Header */}
        <header className="section-head faq-header">
          <p className="eyebrow" data-reveal>
            <span className="brand">ELXOR</span> Inquiries
          </p>
          <h2 className="section-title" id="faq-title" data-split-reveal>
            <span className="w" style={{ "--i": 0 } as React.CSSProperties}>
              Frequently
            </span>
            <span className="w" style={{ "--i": 1 } as React.CSSProperties}>
              Asked
            </span>
            <span className="w gold-text" style={{ "--i": 2 } as React.CSSProperties}>
              Questions
            </span>
          </h2>
          <div className="divider" data-reveal>
            <i />
          </div>
          <p className="faq-subtitle" data-reveal>
            Clear insight into our Dubai heritage, bespoke unisex creations, and
            official acquisition channels.
          </p>
        </header>

        {/* FAQ Accordion List */}
        <div className="faq-list" data-reveal role="region" aria-label="Frequently Asked Questions">
          {faqData.map((item) => {
            const isOpen = openIds.has(item.id);
            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                >
                  <div className="faq-trigger-left">
                    <span className="faq-num">{item.num}</span>
                    <div className="faq-title-wrap">
                      {item.tag && <span className="faq-tag">{item.tag}</span>}
                      <h3 className="faq-question">{item.question}</h3>
                    </div>
                  </div>

                  {/* High-visibility arrow mark button with reliable rotation */}
                  <div
                    className={`faq-icon-bubble ${isOpen ? "faq-icon-bubble--open" : ""}`}
                    aria-hidden="true"
                    title={isOpen ? "Click to collapse" : "Click to expand"}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      backgroundColor: isOpen ? "var(--gold-hi)" : "rgba(213, 174, 111, 0.08)",
                      borderColor: isOpen ? "#f5dca8" : "var(--line)",
                      color: isOpen ? "#050403" : "var(--gold)",
                      boxShadow: isOpen
                        ? "0 0 18px rgba(245, 220, 168, 0.65), 0 0 32px rgba(213, 174, 111, 0.4)"
                        : "none",
                    }}
                  >
                    <ChevronDown size={19} strokeWidth={2.4} />
                  </div>
                </button>

                {/* Animated Accordion Body */}
                <div
                  id={`faq-answer-${item.id}`}
                  className="faq-content-grid"
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                >
                  <div className="faq-content-inner">
                    <div className="faq-answer">{item.answer}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Concierge Assistance Card */}
        <div className="faq-footer-card" data-reveal>
          <div className="faq-footer-content">
            <div className="faq-footer-icon">
              <MessageCircle size={22} color="var(--gold)" />
            </div>
            <div>
              <h4>Have an unanswered inquiry?</h4>
              <p>
                Our bespoke fragrance advisors in Dubai are at your service for
                personalized scent consultations.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="faq-concierge-btn"
            onClick={() => {
              if (onOpenContact) {
                onOpenContact();
              } else {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span>Speak with Concierge</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          position: relative;
          padding: clamp(90px, 12vw, 150px) var(--gutter);
          background-color: var(--bg);
          overflow: hidden;
          border-top: 1px solid var(--line-soft);
        }

        .faq-ambient-glow {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(850px, 90vw);
          height: 480px;
          background: radial-gradient(
            ellipse at center,
            rgba(213, 174, 111, 0.07) 0%,
            rgba(97, 53, 0, 0.03) 48%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }

        .faq-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 920px;
          margin: 0 auto;
        }

        .faq-header {
          margin-bottom: clamp(40px, 6vw, 64px);
          text-align: center;
        }

        .faq-subtitle {
          color: var(--muted);
          font-size: clamp(14.5px, 1.25vw, 16.5px);
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.68;
          font-weight: 300;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ------------------ FAQ ITEM CARD ------------------ */
        .faq-item {
          position: relative;
          background: linear-gradient(
            145deg,
            rgba(18, 14, 9, 0.72) 0%,
            rgba(8, 6, 4, 0.88) 100%
          );
          border: 1px solid var(--line-soft);
          border-radius: 8px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.4s var(--ease),
            box-shadow 0.4s var(--ease),
            background 0.4s var(--ease),
            transform 0.4s var(--ease);
          overflow: hidden;
        }

        /* Active gold accent indicator line on the left */
        .faq-item::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, var(--gold-hi), var(--gold), var(--gold-lo));
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0.9;
        }

        .faq-item:hover {
          border-color: rgba(213, 174, 111, 0.38);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4),
            0 0 20px rgba(213, 174, 111, 0.08);
          transform: translateY(-2px);
        }

        .faq-item--open {
          border-color: rgba(213, 174, 111, 0.55);
          background: linear-gradient(
            145deg,
            rgba(24, 18, 11, 0.86) 0%,
            rgba(10, 8, 5, 0.96) 100%
          );
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55),
            0 0 28px rgba(213, 174, 111, 0.14);
        }

        .faq-item--open::before {
          transform: scaleY(1);
        }

        /* ------------------ TRIGGER BUTTON ------------------ */
        .faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(22px, 3.2vw, 28px) clamp(22px, 3.6vw, 34px);
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          color: var(--ink);
          font-family: inherit;
          gap: 20px;
        }

        .faq-trigger-left {
          display: flex;
          align-items: flex-start;
          gap: clamp(16px, 2.5vw, 26px);
          flex: 1;
        }

        .faq-num {
          font-family: var(--f-display);
          font-size: clamp(14px, 1.4vw, 17px);
          font-weight: 500;
          color: var(--gold);
          letter-spacing: 0.08em;
          padding-top: 3px;
          min-width: 28px;
          opacity: 0.85;
          transition: opacity 0.3s ease, color 0.3s ease;
        }

        .faq-item--open .faq-num {
          opacity: 1;
          color: var(--gold-hi);
          text-shadow: 0 0 12px rgba(213, 174, 111, 0.4);
        }

        .faq-title-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .faq-tag {
          font-size: 10.5px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--dim);
          font-family: var(--f-display);
          transition: color 0.3s ease;
        }

        .faq-item--open .faq-tag {
          color: var(--gold);
        }

        .faq-question {
          font-family: var(--f-display);
          font-size: clamp(16.5px, 2vw, 20.5px);
          font-weight: 500;
          letter-spacing: 0.03em;
          line-height: 1.35;
          color: var(--ink);
          margin: 0;
          transition: color 0.3s ease;
        }

        .faq-item:hover .faq-question,
        .faq-item--open .faq-question {
          color: #fff;
        }

        /* ------------------ CHEVRON ICON BUBBLE ------------------ */
        .faq-icon-bubble {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .faq-trigger:hover .faq-icon-bubble {
          transform: scale(1.08);
        }

        /* ------------------ ACCORDION BODY (GRID ANIMATION) ------------------ */
        .faq-content-grid {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .faq-item--open .faq-content-grid {
          grid-template-rows: 1fr;
        }

        .faq-content-inner {
          overflow: hidden;
        }

        .faq-answer {
          padding: 0 clamp(22px, 3.6vw, 34px) clamp(24px, 3.4vw, 32px)
            clamp(66px, 7vw, 88px);
          color: var(--muted);
          font-size: clamp(14px, 1.2vw, 15.5px);
          line-height: 1.78;
          font-weight: 300;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s;
          user-select: text;
          cursor: auto;
        }

        .faq-item--open .faq-answer {
          opacity: 1;
          transform: translateY(0);
        }

        .faq-answer :global(.gold-highlight) {
          color: var(--gold-hi);
          font-weight: 600;
        }

        /* Action Row inside Answer (for Amazon storefront link) */
        .faq-action-row {
          margin-top: 18px;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .faq-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          background: linear-gradient(135deg, rgba(213, 174, 111, 0.18), rgba(140, 102, 49, 0.1));
          border: 1px solid rgba(213, 174, 111, 0.4);
          border-radius: 4px;
          color: var(--gold-hi);
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .faq-cta-btn:hover {
          background: linear-gradient(135deg, var(--gold), var(--gold-lo));
          color: #050403;
          border-color: var(--gold);
          box-shadow: 0 4px 16px rgba(213, 174, 111, 0.35);
        }

        .faq-authenticity-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--dim);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: var(--f-display);
        }

        /* ------------------ FOOTER ASSISTANCE CARD ------------------ */
        .faq-footer-card {
          margin-top: 40px;
          padding: clamp(24px, 3.4vw, 32px);
          background: radial-gradient(
              ellipse at 0% 50%,
              rgba(97, 53, 0, 0.25) 0%,
              transparent 65%
            ),
            rgba(15, 12, 8, 0.6);
          border: 1px dashed var(--line);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .faq-footer-content {
          display: flex;
          align-items: center;
          gap: 18px;
          flex: 1;
          min-width: 260px;
        }

        .faq-footer-icon {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid var(--line);
          background: rgba(213, 174, 111, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .faq-footer-content h4 {
          font-family: var(--f-display);
          font-size: 16px;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: 4px;
        }

        .faq-footer-content p {
          color: var(--muted);
          font-size: 13.5px;
          line-height: 1.5;
          margin: 0;
        }

        .faq-concierge-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: transparent;
          border: 1px solid var(--gold);
          border-radius: 4px;
          color: var(--gold);
          font-family: var(--f-display);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.35s var(--ease);
          white-space: nowrap;
        }

        .faq-concierge-btn .btn-arrow {
          transition: transform 0.3s ease;
        }

        .faq-concierge-btn:hover {
          background: var(--gold-btn-gradient);
          color: #050403;
          border-color: transparent;
          box-shadow: 0 4px 20px rgba(213, 174, 111, 0.4);
        }

        .faq-concierge-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* ------------------ RESPONSIVE BREAKPOINTS ------------------ */
        @media (max-width: 768px) {
          .faq-trigger {
            padding: 18px 18px;
            gap: 12px;
          }

          .faq-trigger-left {
            gap: 14px;
          }

          .faq-answer {
            padding: 0 18px 20px 18px;
          }

          .faq-footer-card {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }

          .faq-footer-content {
            flex-direction: column;
            text-align: center;
          }

          .faq-concierge-btn {
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
