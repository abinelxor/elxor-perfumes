// Pure data + types (no Sanity client), safe to import from client components.

/* ---------- Types ---------- */

export interface SectionHeaderContent {
  eyebrow: string;
  titleWhite: string;
  titleGold: string;
  lead?: string;
}

export interface SplitContent {
  eyebrow: string;
  titleWhite: string;
  titleGold: string;
  text: string;
  buttonLabel: string;
  image: string;
  imageAlt: string;
}

export interface HeroChapterContent {
  eyebrow: string;
  titleWhite: string;
  titleGold: string;
  body?: string;
  buttonLabel?: string;
}

/** Minimal Portable Text shape (what the Studio stores for the brand story). */
export interface NarrativeBlock {
  _key?: string;
  _type: "block";
  style?: string;
  children: { _key?: string; _type: "span"; text: string; marks?: string[] }[];
  markDefs?: unknown[];
}

export interface HomeContent {
  heroChapters: HeroChapterContent[];
  statementText: string;
  statementGold: string;
  statementNarrative: NarrativeBlock[];
  collectionHeader: SectionHeaderContent;
  finale: {
    titleWhite: string;
    titleGold: string;
    buttonLabel: string;
    noteOne: string;
    noteTwo: string;
  };
  marqueeText: string;
  philosophy: SplitContent;
  valuesHeader: SectionHeaderContent;
  values: { title: string; text: string }[];
  experience: SplitContent;
  faqHeader: SectionHeaderContent;
  contact: { title: string; submitLabel: string; successTitle: string; successText: string };
  footerHeading: string;
  footerText: string;
}

/* ---------- Built-in content (exactly what the site showed before the CMS) ---------- */

const span = (text: string, marks: string[] = []) => ({ _type: "span" as const, text, marks });

export const defaultHome: HomeContent = {
  heroChapters: [
    { eyebrow: "ELXOR Perfumes", titleWhite: "The Essence", titleGold: "of Elegance" },
    {
      eyebrow: "II · The Unveiling",
      titleWhite: "Luxury begins",
      titleGold: "before the\nfirst note",
      body: "It begins the moment the box opens, and the light finds the bottle.",
    },
    {
      eyebrow: "III · The Trail",
      titleWhite: "One touch.",
      titleGold: "The air remembers.",
      body: "A single spray, and every room you leave holds a quiet trace of you.",
    },
    {
      eyebrow: "IV · The Signature",
      titleWhite: "Don’t just wear a fragrance,",
      titleGold: "Leave a Presence",
      body: "Two signatures, each composed for a different kind of presence.",
      buttonLabel: "Explore the collection",
    },
  ],
  statementText: "ELXOR is more than a fragrance. It is a",
  statementGold: "signature.",
  statementNarrative: [
    {
      _type: "block",
      style: "normal",
      children: [
        span("ELXOR Perfumes", ["strong", "brand"]),
        span(
          " is a Dubai-based luxury fragrance brand created for those who believe a fragrance should be more than just a scent—it should become a signature of presence. Our collection combines refined fragrance artistry, sophisticated character, and long-lasting performance to create memorable scents for modern lifestyles. Our current collection features two distinctive unisex Eau de Parfum collections, ",
        ),
        span("AMORIEL", ["strong"]),
        span(" and "),
        span("SANCTIX", ["strong"]),
        span(
          ", each designed to transcend traditional boundaries and offer an elegant expression that can be enjoyed as a ",
        ),
        span("perfume for men", ["em"]),
        span(" or a "),
        span("perfume for women", ["em"]),
        span(
          ". Whether you are searching for the best perfume for men, the best perfumes for women, or a versatile unisex fragrance, ELXOR offers sophisticated aromas designed to leave a lasting impression.",
        ),
      ],
    },
  ],
  collectionHeader: {
    eyebrow: "Our Collection",
    titleWhite: "Crafted for",
    titleGold: "distinction",
    lead: "At ELXOR, we believe fragrance is more than a scent. It is a statement of individuality, elegance and timeless appeal. Our creations are crafted for those who seek the extraordinary.",
  },
  finale: {
    titleWhite: "Two signatures.",
    titleGold: "Which one is yours?",
    buttonLabel: "Find your signature",
    noteOne: "pure devotion",
    noteTwo: "sacred & luminous",
  },
  marqueeText: "Make Every Moment Memorable with ELXOR Perfumes",
  philosophy: {
    eyebrow: "ELXOR Philosophy",
    titleWhite: "Elegance is not simply seen.",
    titleGold: "It is experienced.",
    text: "At ELXOR, we believe fragrance is more than a scent. It is a form of self-expression. Our philosophy is rooted in quality, craftsmanship and timeless elegance, creating fragrances that become a part of your identity.",
    buttonLabel: "Shop Now",
    image: "/images/philosophy-amoriel.webp",
    imageAlt: "ELXOR Amoriel Eau de Parfum on a marble plinth with white blooms and gold ribbon",
  },
  valuesHeader: { eyebrow: "Our Values", titleWhite: "What every bottle", titleGold: "carries" },
  values: [
    { title: "Quality", text: "Only the finest ingredients for exceptional fragrances." },
    { title: "Elegance", text: "Fragrances that reflect refinement and class." },
    { title: "Craftsmanship", text: "Meticulously crafted with attention to detail." },
    { title: "Authenticity", text: "True fragrances for true individuals." },
  ],
  experience: {
    eyebrow: "ELXOR Experience",
    titleWhite: "Your scent.",
    titleGold: "Your signature.",
    text: "More than a fragrance, ELXOR is a reflection of who you are. Each note is a journey, each creation a memory, designed to leave a lasting impression.",
    buttonLabel: "Shop Now",
    image: "/images/experience-sanctix.webp",
    imageAlt: "ELXOR Sanctix Eau de Parfum on white silk and marble with a gold arch",
  },
  faqHeader: {
    eyebrow: "ELXOR Inquiries",
    titleWhite: "Frequently Asked",
    titleGold: "Questions",
    lead: "Clear insight into our Dubai heritage, bespoke unisex creations, and official acquisition channels.",
  },
  contact: {
    title: "GET IN TOUCH",
    submitLabel: "SEND INQUIRY",
    successTitle: "Inquiry Received",
    successText:
      "Thank you for reaching out. Our bespoke fragrance concierge will be in touch with you shortly.",
  },
  footerHeading: "The Essence of Elegance",
  footerText:
    "Crafting timeless fragrances for those who appreciate distinction. ELXOR is more than a fragrance. It is a signature.",
};
