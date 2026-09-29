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
  const [showNavbar, setShowNavbar] = useState(false);

  // Fallback scroll listener ensuring navbar is always visible on sections below the hero
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("home");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        if (rect.bottom <= window.innerHeight * 0.4) {
          setShowNavbar(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Dedicated Luxury Preloader ensuring all 125 WebP frames are fully decoded before entry */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Interactive Golden Fragrance Dust Canvas & Cursor Aura */}
      <GoldenDustCanvas />

      {/* Top Navbar: ONLY shown after scrolling animation completes */}
      <Navbar
        visible={showNavbar}
        onOpenCart={() => setCartOpen(true)}
        cartCount={totalCartCount}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* 1. Hero Section with 1080p Ultra-HQ WebP Frame Scrubbing Animation */}
      <HeroSection
        onProgressChange={(progress) => {
          // Show navbar only after the scrolling animation completes
          setShowNavbar(progress >= 0.92);
        }}
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
