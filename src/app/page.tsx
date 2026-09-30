"use client";

import React, { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CollectionSection, {
  PerfumeItem,
} from "@/components/CollectionSection";
import PhilosophySection from "@/components/PhilosophySection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import FragranceModal from "@/components/FragranceModal";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import ContactModal from "@/components/ContactModal";
import GoldenDustCanvas from "@/components/GoldenDustCanvas";

export default function Home() {
  const [selectedPerfume, setSelectedPerfume] = useState<PerfumeItem | null>(
    null
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [contactOpen, setContactOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

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
    <main
      style={{
        position: "relative",
        backgroundColor: "#050505",
        minHeight: "100vh",
        color: "#f8f6f0",
      }}
    >
      {/* Dedicated Luxury Preloader with breathing logo and percentage */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Interactive Golden Fragrance Dust Canvas & Cursor Aura */}
      <GoldenDustCanvas />

      {/* Top Luxury Glassmorphism Navbar */}
      <Navbar
        visible={showNavbar}
        onOpenCart={() => setCartOpen(true)}
        cartCount={totalCartCount}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* 1. Hero Section with 120-Frame Cinematic Scroll Animation */}
      <HeroSection
        onExploreClick={() => {
          const el = document.getElementById("collection");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onDiscoverClick={() => {
          const el = document.getElementById("philosophy");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. Collection Section (Second Section) */}
      <CollectionSection
        onSelectPerfume={(perfume) => setSelectedPerfume(perfume)}
      />

      {/* 3. Philosophy & Values Section (Third Section) */}
      <PhilosophySection />

      {/* 4. Experience Section (Fourth Section) */}
      <ExperienceSection
        onDiscoverClick={() => {
          const el = document.getElementById("collection");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 5. Footer (Fifth Section) */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Interactive Quick-View Fragrance Discovery Modal */}
      <FragranceModal
        perfume={selectedPerfume}
        onClose={() => setSelectedPerfume(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Luxury Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
      />

      {/* Contact Concierge Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </main>
  );
}
