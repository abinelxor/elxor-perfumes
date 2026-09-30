"use client";

import React, { useState } from "react";
import Preloader from "@/components/Preloader";
import ScrollObserver from "@/components/ScrollObserver";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import CollectionSection, {
  PerfumeItem,
} from "@/components/CollectionSection";
import Marquee from "@/components/Marquee";
import PhilosophySection from "@/components/PhilosophySection";
import ValuesSection from "@/components/ValuesSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FragranceModal from "@/components/FragranceModal";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<PerfumeItem | null>(
    null
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [contactOpen, setContactOpen] = useState(false);

  const handleAddToCart = (
    perfume: PerfumeItem,
    size: string,
    quantity: number
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.perfume.id === perfume.id && item.size === size
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      }
      return [...prev, { perfume, size, quantity }];
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* 1. Preloader: exact ELXOR executive loader with frame preload */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* 2. Lenis Smooth Scroll & Scroll Reveal Observer */}
      <ScrollObserver />

      {/* 3. Luxury Navigation Bar & Fullscreen Mobile Menu */}
      <Navbar
        onOpenCart={() => setCartOpen(true)}
        cartCount={totalCartCount}
        onOpenContact={() => setContactOpen(true)}
      />

      <main>
        {/* 4. HERO: 460vh pinned frame sequence with 4 heading chapters */}
        <HeroSection
          isReady={isLoaded}
          onExploreClick={() => {
            const el = document.getElementById("collection");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 5. Statement Section with progressive word light-up */}
        <StatementSection />

        {/* 6. Collection: 640vh pinned product sequence with self-drawing lines,
               feathers, frosted cards, notes, finale row & 7 sparks */}
        <CollectionSection
          onSelectPerfume={(perfume) => setSelectedPerfume(perfume)}
          onContactClick={() => setContactOpen(true)}
        />

        {/* 7. Marquee ticker */}
        <Marquee />

        {/* 8. Philosophy split section with parallax */}
        <PhilosophySection />

        {/* 9. Values section with bespoke SVG emblems */}
        <ValuesSection />

        {/* 10. Experience split section with parallax */}
        <ExperienceSection
          onDiscoverClick={() => {
            const el = document.getElementById("collection");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 11. Luxury Get In Touch Contact Section */}
        <ContactSection />
      </main>

      {/* 11. Luxury 4-Column Footer */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* 12. Interactive Fragrance Discovery Modal */}
      <FragranceModal
        perfume={selectedPerfume}
        onClose={() => setSelectedPerfume(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 13. Luxury Slide-in Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
      />

      {/* 14. Luxury Concierge Contact Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
