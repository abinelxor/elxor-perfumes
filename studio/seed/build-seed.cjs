// Generates seed/data.ndjson from the site's current content.
// Run once:  npm run seed        (needs `npx sanity login` first)
const fs = require("fs");
const path = require("path");

const faqs = [
  ["What is ELXOR?", "ELXOR is a Dubai-based perfume brand producing two fragrance collections, AMORIEL and SANCTIX, for men, women, and unisex wear. The brand sells exclusively through Amazon."],
  ["Are ELXOR perfumes unisex?", "Explore the product descriptions for AMORIEL and SANCTIX to find the intended audience for each fragrance. Check the individual fragrance listing for the most accurate details."],
  ["Where can I buy ELXOR perfume online?", "ELXOR is sold only through its official Amazon storefront. ELXOR does not sell through this website or supply third-party resellers. The official Amazon storefront is the only channel where authenticity is guaranteed."],
  ["Does ELXOR offer perfume gift sets for women and men?", "ELXOR fragrances make an elegant gift choice for both men and women, offering sophisticated scents suitable for different occasions and personal styles. Check the official Amazon storefront for currently available products and gift sets."],
].map(([question, answer], i) => ({ _key: `faq${i + 1}`, _type: "faqItem", question, answer }));

const keywords = "best unisex perfumes in UAE, Luxury perfumes in Dubai, Buy Unisex perfumes, Shop unisex perfumes in online, perfume for men, perfume for women, Top Perfume brand in UAE, Best Perfumes in online, top Lasting perfume fragrances, Lasting perfumes for men, Lasting perfumes for women, which is the best unisex lasting perfume, perfume gifts buy online, best perfume gift for men and women"
  .split(",").map((k) => k.trim());

const title = "Top Unisex Fragrances & Best Unisex Perfumes | ELXOR";
const description = "Discover ELXOR’s best unisex perfumes and fragrances. Explore good unisex perfumes crafted for a lasting, elegant presence. Shop ELXOR on Amazon UAE.";

const settings = {
  _id: "siteSettings",
  _type: "siteSettings",
  siteName: "ELXOR Perfumes",
  siteUrl: "https://www.elxorperfumes.com",
  email: "info@elxorperfumes.com",
  phone: "+971 554696935",
  whatsapp: "+971 554696935",
  address: "Dubai, United Arab Emirates",
  faqs,
  defaultSeo: { _type: "seo", metaTitle: title, metaDescription: description, keywords, ogTitle: title, ogDescription: description, noIndex: false },
};

const product = (o, order, imageFile) => ({
  _id: `product-${o.slug}`,
  _type: "product",
  name: o.name,
  slug: { _type: "slug", current: o.slug },
  tagline: o.tagline,
  description: o.description,
  story: o.story,
  signatureQuote: o.signatureQuote,
  size: "50ml",
  topNotes: o.top, heartNotes: o.heart, baseNotes: o.base,
  mainImage: { _type: "imageWithAlt", alt: `ELXOR ${o.name} perfume bottle`, asset: { _sanityAsset: `image@file://./images/${imageFile}` } },
  price: o.price, currency: "USD", inStock: true, order,
  seo: { _type: "seo", metaTitle: `${o.name} Eau de Parfum | ELXOR`, metaDescription: o.description },
});

const docs = [
  settings,
  product({ slug: "amoriel", name: "AMORIEL", tagline: "A Fragrance That Speaks of Elegance", description: "A luxurious unisex Eau de Parfum crafted for those who appreciate sophistication, confidence, and timeless elegance.", story: "Discover AMORIEL, a luxurious unisex Eau de Parfum crafted for those who appreciate sophistication, confidence, and timeless elegance. Designed for both men and women, AMORIEL creates a captivating presence that complements your personality and leaves a memorable impression wherever you go.", signatureQuote: "AMORIEL by ELXOR — Wear the feeling. Leave the memory.", top: ["White Peach", "Sweet Mandarin", "Dewy Neroli"], heart: ["Celestial Jasmine", "Imperial White Rose", "Soft Iris"], base: ["Cashmere Silk", "Warm Sandalwood", "Golden Amber Accord"], price: 360 }, 1, "perfume_amoriel.png"),
  product({ slug: "sanctix", name: "SANCTIX", tagline: "The Essence of Power and Mystery", description: "An exclusive unisex Eau de Parfum created for individuals who embrace confidence, sophistication, and distinctive style.", story: "Step into a world of refined luxury with SANCTIX, an exclusive unisex Eau de Parfum created for individuals who embrace confidence, sophistication, and distinctive style. Designed for both men and women, SANCTIX adds an aura of intrigue to your presence, making every moment feel exceptional.", signatureQuote: "SANCTIX by ELXOR — Your presence. Your power. Your signature.", top: ["Solar Bergamot", "Golden Saffron", "Pink Pepper"], heart: ["Liquid Amber", "Smoked Incense", "Honeyed Labdanum"], base: ["Sacred Oud", "Bourbon Vanilla", "Precious Woods"], price: 380 }, 2, "perfume_sanctix.png"),
];

fs.writeFileSync(path.join(__dirname, "data.ndjson"), docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents to seed/data.ndjson`);
