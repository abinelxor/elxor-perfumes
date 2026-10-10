import type { Metadata } from "next";
import { sanityFetch } from "./sanity/client";
import { sizedImage } from "./sanity/image";
import type { CodeSnippetData } from "@/components/CodeSlot";
import { perfumesData, type PerfumeItem } from "./products";
import { SITE_URL, defaultContact, defaultFaqs, defaultSeo, type FaqEntry } from "./defaults";

/* ---------- Types (shape of the GROQ projections below) ---------- */

export interface SanitySeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: string;
}

export interface SiteSettings {
  siteName?: string;
  siteUrl?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  socialLinks?: { platform?: string; url?: string }[];
  faqs?: FaqEntry[];
  defaultSeo?: SanitySeo;
}

interface SanityProduct {
  _id: string;
  _updatedAt: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  story?: string;
  signatureQuote?: string;
  size?: string;
  topNotes?: string[];
  heartNotes?: string[];
  baseNotes?: string[];
  price?: number;
  compareAtPrice?: number;
  currency?: string;
  inStock?: boolean;
  stockQuantity?: number;
  sku?: string;
  buyUrl?: string;
  image?: string;
  imageAlt?: string;
  gallery?: { url?: string; alt?: string; caption?: string }[];
  seo?: SanitySeo;
}

export interface ProductDoc extends SanityProduct {
  _type: "product";
}

export interface PageDoc {
  _type: "page";
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  heading?: string;
  intro?: string;
  heroImage?: string;
  heroAlt?: string;
  // Portable Text blocks (rendered with @portabletext/react)
  body?: unknown[];
  faqs?: FaqEntry[];
  seo?: SanitySeo;
}

/* ---------- GROQ ---------- */

const SEO = `{
  metaTitle, metaDescription, keywords, canonicalUrl, ogTitle, ogDescription,
  "ogImage": ogImage.asset->url, noIndex, structuredData
}`;

const PRODUCT_FIELDS = `
  _id, _updatedAt, name, "slug": slug.current, tagline, description, story, signatureQuote,
  size, topNotes, heartNotes, baseNotes, price, compareAtPrice, currency, inStock,
  stockQuantity, sku, buyUrl,
  "image": mainImage.asset->url, "imageAlt": mainImage.alt,
  "gallery": gallery[]{ "url": asset->url, alt, caption },
  seo ${SEO}
`;

const SETTINGS_QUERY = `*[_id == "siteSettings"][0]{
  siteName, siteUrl, email, phone, whatsapp, address,
  socialLinks[]{ platform, url },
  faqs[]{ question, answer },
  defaultSeo ${SEO}
}`;

const PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current)] | order(order asc, _createdAt asc){ ${PRODUCT_FIELDS} }`;

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _type, _id, _updatedAt, title, "slug": slug.current, heading, intro,
  "heroImage": heroImage.asset->url, "heroAlt": heroImage.alt,
  body[]{ ..., _type == "imageWithAlt" => { ..., "url": asset->url } },
  faqs[]{ question, answer },
  seo ${SEO}
}`;

const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0]{ _type, ${PRODUCT_FIELDS} }`;

const CODE_QUERY = `*[_type == "codeSnippet" && enabled != false && defined(code)] | order(order asc, _createdAt asc){
  _id, position, scope, code, includeHome, extraPaths,
  "paths": pages[]->slug.current
}`;

const SLUGS_QUERY = `*[_type in ["page", "product"] && defined(slug.current)]{ _type, "slug": slug.current, _updatedAt }`;

/* ---------- Fetchers ---------- */

export async function getSiteSettings(): Promise<SiteSettings> {
  return (await sanityFetch<SiteSettings | null>(SETTINGS_QUERY)) ?? {};
}

function formatPrice(price: number | undefined, currency: string | undefined): string {
  if (price === undefined || price === null) return "";
  const amount = Number.isInteger(price) ? String(price) : price.toFixed(2);
  return currency === "USD" ? `$${amount}` : `${currency ?? "AED"} ${amount}`;
}

function toPerfume(p: SanityProduct): PerfumeItem {
  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    tagline: p.tagline ?? "",
    description: p.description,
    image: sizedImage(p.image, 1200) ?? "",
    price: formatPrice(p.price, p.currency),
    size: p.size ?? "50ml",
    topNotes: p.topNotes ?? [],
    heartNotes: p.heartNotes ?? [],
    baseNotes: p.baseNotes ?? [],
    story: p.story ?? p.description ?? "",
    signatureQuote: p.signatureQuote,
    inStock: p.inStock,
    buyUrl: p.buyUrl,
  };
}

/**
 * Products for the home-page collection. The scroll scene is designed for two
 * bottles, so Sanity products are used only when there are at least two with an
 * image; otherwise the built-in products are shown.
 */
export async function getProducts(): Promise<PerfumeItem[]> {
  const docs = (await sanityFetch<SanityProduct[]>(PRODUCTS_QUERY)) ?? [];
  const usable = docs.filter((d) => d.image).map(toPerfume);
  return usable.length >= 2 ? usable.slice(0, 2) : perfumesData;
}

export async function getPageBySlug(slug: string): Promise<PageDoc | null> {
  return sanityFetch<PageDoc | null>(PAGE_QUERY, { slug });
}

export async function getProductBySlug(slug: string): Promise<ProductDoc | null> {
  return sanityFetch<ProductDoc | null>(PRODUCT_QUERY, { slug });
}

export async function getAllSlugs(): Promise<
  { _type: "page" | "product"; slug: string; _updatedAt: string }[]
> {
  return (await sanityFetch(SLUGS_QUERY)) ?? [];
}

/** Custom head/body code snippets added in the Studio ("Custom code" documents). */
export async function getCodeSnippets(): Promise<CodeSnippetData[]> {
  return (await sanityFetch<CodeSnippetData[]>(CODE_QUERY)) ?? [];
}

export function resolveContact(settings: SiteSettings) {
  return {
    email: settings.email || defaultContact.email,
    phone: settings.phone || defaultContact.phone,
    whatsapp: settings.whatsapp || settings.phone || defaultContact.whatsapp,
    address: settings.address || defaultContact.address,
  };
}

export function resolveFaqs(settings: SiteSettings): FaqEntry[] {
  const faqs = (settings.faqs ?? []).filter((f) => f.question && f.answer);
  return faqs.length > 0 ? faqs : defaultFaqs;
}

/* ---------- SEO helpers ---------- */

/** Build Next.js metadata from a Sanity SEO object, falling back to defaults. */
export function buildMetadata(
  seo: SanitySeo | undefined,
  fallback: { title?: string; description?: string; keywords?: string; path?: string } = {},
): Metadata {
  const title = seo?.metaTitle || fallback.title || defaultSeo.title;
  const description = seo?.metaDescription || fallback.description || defaultSeo.description;
  const keywords = seo?.keywords?.length ? seo.keywords.join(", ") : (fallback.keywords ?? defaultSeo.keywords);
  const canonical = seo?.canonicalUrl || `${SITE_URL}${fallback.path ?? ""}`;
  const ogImage = seo?.ogImage ? [{ url: sizedImage(seo.ogImage, 1200) as string }] : undefined;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: seo?.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: canonical,
      type: "website",
      siteName: "ELXOR Perfumes",
      ...(ogImage ? { images: ogImage } : {}),
    },
  };
}

/** Serialise JSON-LD safely for a <script> tag (escapes "<" so "</script>" can't break out). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Validate and re-serialise editor-supplied JSON-LD; returns null if it isn't valid JSON. */
export function customJsonLd(raw: string | undefined): string | null {
  if (!raw || !raw.trim()) return null;
  try {
    return jsonLd(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function faqPageSchema(faqs: FaqEntry[], url = SITE_URL + "/") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    url,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
