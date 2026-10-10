export interface PerfumeItem {
  id: string;
  name: string;
  tagline: string;
  description?: string;
  image: string;
  price: string;
  size: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  story: string;
  signatureQuote?: string;
  slug?: string;
  inStock?: boolean;
  buyUrl?: string;
}

/**
 * Built-in products. Used until the Sanity dataset has at least two products,
 * so the site always renders even if the CMS is empty or unreachable.
 */
export const perfumesData: PerfumeItem[] = [
  {
    id: "amoriel",
    name: "AMORIEL",
    tagline: "A Fragrance That Speaks of Elegance",
    description:
      "A luxurious unisex Eau de Parfum crafted for those who appreciate sophistication, confidence, and timeless elegance.",
    image: "/images/perfume_amoriel.png",
    price: "$360",
    size: "50ml",
    topNotes: ["White Peach", "Sweet Mandarin", "Dewy Neroli"],
    heartNotes: ["Celestial Jasmine", "Imperial White Rose", "Soft Iris"],
    baseNotes: ["Cashmere Silk", "Warm Sandalwood", "Golden Amber Accord"],
    story:
      "Discover AMORIEL, a luxurious unisex Eau de Parfum crafted for those who appreciate sophistication, confidence, and timeless elegance. Designed for both men and women, AMORIEL creates a captivating presence that complements your personality and leaves a memorable impression wherever you go.",
    signatureQuote: "AMORIEL by ELXOR — Wear the feeling. Leave the memory.",
  },
  {
    id: "sanctix",
    name: "SANCTIX",
    tagline: "The Essence of Power and Mystery",
    description:
      "An exclusive unisex Eau de Parfum created for individuals who embrace confidence, sophistication, and distinctive style.",
    image: "/images/perfume_sanctix.png",
    price: "$380",
    size: "50ml",
    topNotes: ["Solar Bergamot", "Golden Saffron", "Pink Pepper"],
    heartNotes: ["Liquid Amber", "Smoked Incense", "Honeyed Labdanum"],
    baseNotes: ["Sacred Oud", "Bourbon Vanilla", "Precious Woods"],
    story:
      "Step into a world of refined luxury with SANCTIX, an exclusive unisex Eau de Parfum created for individuals who embrace confidence, sophistication, and distinctive style. Designed for both men and women, SANCTIX adds an aura of intrigue to your presence, making every moment feel exceptional.",
    signatureQuote: "SANCTIX by ELXOR — Your presence. Your power. Your signature.",
  },
];
