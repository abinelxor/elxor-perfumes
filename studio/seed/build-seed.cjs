// Generates seed/data.ndjson from the site's current content.
// Run once:  npm run seed        (needs `npx sanity login` first)
const fs = require("fs");
const path = require("path");
const Module = require("module");
const { pathToFileURL } = require("url");

// Absolute file URL so the importer finds each image regardless of where it is run from
const assetUrl = (file) => `image@${pathToFileURL(path.join(__dirname, "images", file)).href}`;

// Load the website's built-in home-page content (TypeScript) so Sanity starts out
// identical to what the site already shows.
function loadTs(file) {
  const ts = require(path.join(__dirname, "../../node_modules/typescript"));
  const src = fs.readFileSync(file, "utf8");
  const out = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const m = new Module(file);
  m.filename = file;
  m._compile(out, file);
  return m.exports;
}
const { defaultHome } = loadTs(path.join(__dirname, "../../src/lib/homeDefaults.ts"));
let keyCounter = 0;
const k = (p) => p + "_" + ++keyCounter;
const image = (file, alt) => ({ _type: "imageWithAlt", alt, asset: { _sanityAsset: assetUrl(file) } });
const header = (h) => ({ _type: "sectionHeader", eyebrow: h.eyebrow, titleWhite: h.titleWhite, titleGold: h.titleGold, ...(h.lead ? { lead: h.lead } : {}) });
const split = (c, file) => ({ _type: "splitSection", eyebrow: c.eyebrow, titleWhite: c.titleWhite, titleGold: c.titleGold, text: c.text, buttonLabel: c.buttonLabel, image: image(file, c.imageAlt) });

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
  logo: image("elxor-logo.png", "ELXOR Perfumes"),
  socialLinks: [
    { _key: "social_facebook", _type: "socialLink", platform: "Facebook", url: "https://www.facebook.com/share/19ZHzYdMmr/" },
    { _key: "social_instagram", _type: "socialLink", platform: "Instagram", url: "https://www.instagram.com/elxorperfumes?utm_source=qr&stkn=N3UyYXd3d3QwMW85" },
  ],
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
  mainImage: { _type: "imageWithAlt", alt: `ELXOR ${o.name} perfume bottle`, asset: { _sanityAsset: assetUrl(imageFile) } },
  price: o.price, currency: "USD", inStock: true, order,
  seo: { _type: "seo", metaTitle: `${o.name} Eau de Parfum | ELXOR`, metaDescription: o.description },
});

const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroChapters: defaultHome.heroChapters.map((c) => ({ _key: k("hero"), _type: "heroChapter", ...Object.fromEntries(Object.entries(c).filter(([, v]) => v !== undefined)) })),
  statementText: defaultHome.statementText,
  statementGold: defaultHome.statementGold,
  statementNarrative: defaultHome.statementNarrative.map((b) => ({
    _key: k("block"),
    _type: "block",
    style: "normal",
    markDefs: [],
    children: b.children.map((c) => ({ _key: k("span"), _type: "span", text: c.text, marks: c.marks || [] })),
  })),
  collectionHeader: header(defaultHome.collectionHeader),
  finale: { ...defaultHome.finale },
  marqueeText: defaultHome.marqueeText,
  philosophy: split(defaultHome.philosophy, "philosophy-amoriel.webp"),
  valuesHeader: header(defaultHome.valuesHeader),
  values: defaultHome.values.map((v) => ({ _key: k("value"), _type: "valueItem", ...v })),
  experience: split(defaultHome.experience, "experience-sanctix.webp"),
  faqHeader: header(defaultHome.faqHeader),
  contact: { ...defaultHome.contact },
  footerHeading: defaultHome.footerHeading,
  footerText: defaultHome.footerText,
};

const docs = [
  settings,
  homePage,
  product({ slug: "amoriel", name: "AMORIEL", tagline: "A Fragrance That Speaks of Elegance", description: "A luxurious unisex Eau de Parfum crafted for those who appreciate sophistication, confidence, and timeless elegance.", story: "Discover AMORIEL, a luxurious unisex Eau de Parfum crafted for those who appreciate sophistication, confidence, and timeless elegance. Designed for both men and women, AMORIEL creates a captivating presence that complements your personality and leaves a memorable impression wherever you go.", signatureQuote: "AMORIEL by ELXOR — Wear the feeling. Leave the memory.", top: ["White Peach", "Sweet Mandarin", "Dewy Neroli"], heart: ["Celestial Jasmine", "Imperial White Rose", "Soft Iris"], base: ["Cashmere Silk", "Warm Sandalwood", "Golden Amber Accord"], price: 360 }, 1, "perfume_amoriel.png"),
  product({ slug: "sanctix", name: "SANCTIX", tagline: "The Essence of Power and Mystery", description: "An exclusive unisex Eau de Parfum created for individuals who embrace confidence, sophistication, and distinctive style.", story: "Step into a world of refined luxury with SANCTIX, an exclusive unisex Eau de Parfum created for individuals who embrace confidence, sophistication, and distinctive style. Designed for both men and women, SANCTIX adds an aura of intrigue to your presence, making every moment feel exceptional.", signatureQuote: "SANCTIX by ELXOR — Your presence. Your power. Your signature.", top: ["Solar Bergamot", "Golden Saffron", "Pink Pepper"], heart: ["Liquid Amber", "Smoked Incense", "Honeyed Labdanum"], base: ["Sacred Oud", "Bourbon Vanilla", "Precious Woods"], price: 380 }, 2, "perfume_sanctix.png"),
];

fs.writeFileSync(path.join(__dirname, "data.ndjson"), docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents to seed/data.ndjson`);
