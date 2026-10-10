import { getProducts, getSiteSettings, jsonLd, faqPageSchema, resolveContact, resolveFaqs } from "@/lib/content";
import { getHomeContent } from "@/lib/homeContent";
import HomeClient from "@/components/HomeClient";

// Re-generate at most once a minute; the Sanity webhook can refresh it instantly.
export const revalidate = 60;

export default async function Home() {
  const [products, settings, content] = await Promise.all([
    getProducts(),
    getSiteSettings(),
    getHomeContent(),
  ]);
  const faqs = resolveFaqs(settings);

  // Social links are stored by platform name in Site settings
  const social = (name: string) =>
    settings.socialLinks?.find((link) => link.platform?.toLowerCase() === name)?.url || undefined;

  return (
    <>
      {/* Schema.org FAQPage, generated from the same FAQ list shown on the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(faqs)) }}
      />
      <HomeClient
        content={content}
        facebookUrl={social("facebook")}
        instagramUrl={social("instagram")}
        products={products}
        faqs={faqs}
        contact={resolveContact(settings)}
      />
    </>
  );
}
