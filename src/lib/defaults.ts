/** Content used when Sanity has no value yet. Keeps the site identical to before. */

export const SITE_URL = "https://www.elxorperfumes.com";

export const defaultSeo = {
  title: "Top Unisex Fragrances & Best Unisex Perfumes | ELXOR",
  description:
    "Discover ELXOR’s best unisex perfumes and fragrances. Explore good unisex perfumes crafted for a lasting, elegant presence. Shop ELXOR on Amazon UAE.",
  keywords:
    "best unisex perfumes in UAE, Luxury perfumes in Dubai, Buy Unisex perfumes, Shop unisex perfumes in online, perfume for men, perfume for women, Top Perfume brand in UAE, Best Perfumes in online, top Lasting perfume fragrances, Lasting perfumes for men, Lasting perfumes for women, which is the best unisex lasting perfume, perfume gifts buy online, best perfume gift for men and women",
};

export const defaultContact = {
  email: "info@elxorperfumes.com",
  phone: "+971 554696935",
  whatsapp: "+971 554696935",
  address: "Dubai, United Arab Emirates",
};

export interface FaqEntry {
  question: string;
  answer: string;
}

/** Plain-text FAQ (also used for the FAQPage JSON-LD so page and schema always match). */
export const defaultFaqs: FaqEntry[] = [
  {
    question: "What is ELXOR?",
    answer:
      "ELXOR is a Dubai-based perfume brand producing two fragrance collections, AMORIEL and SANCTIX, for men, women, and unisex wear. The brand sells exclusively through Amazon.",
  },
  {
    question: "Are ELXOR perfumes unisex?",
    answer:
      "Explore the product descriptions for AMORIEL and SANCTIX to find the intended audience for each fragrance. Check the individual fragrance listing for the most accurate details.",
  },
  {
    question: "Where can I buy ELXOR perfume online?",
    answer:
      "ELXOR is sold only through its official Amazon storefront. ELXOR does not sell through this website or supply third-party resellers. The official Amazon storefront is the only channel where authenticity is guaranteed.",
  },
  {
    question: "Does ELXOR offer perfume gift sets for women and men?",
    answer:
      "ELXOR fragrances make an elegant gift choice for both men and women, offering sophisticated scents suitable for different occasions and personal styles. Check the official Amazon storefront for currently available products and gift sets.",
  },
];
