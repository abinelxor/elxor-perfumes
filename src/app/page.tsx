import { getProducts, getSiteSettings, jsonLd, faqPageSchema, resolveContact, resolveFaqs } from "@/lib/content";
import HomeClient from "@/components/HomeClient";

// Re-generate at most once a minute; the Sanity webhook can refresh it instantly.
export const revalidate = 60;

export default async function Home() {
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);
  const faqs = resolveFaqs(settings);

  return (
    <>
      {/* Schema.org FAQPage, generated from the same FAQ list shown on the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(faqs)) }}
      />
      <HomeClient products={products} faqs={faqs} contact={resolveContact(settings)} />
    </>
  );
}
