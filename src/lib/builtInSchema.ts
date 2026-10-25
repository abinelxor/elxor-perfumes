import type { JsonLdNode } from "./jsonld";

const SITE = "https://www.elxorperfumes.com";

/**
 * The schema.org markup the site ships with. Anything pasted into Site settings >
 * Default SEO > Schema markup replaces the built-in block(s) of the same type, so the
 * two never duplicate. (FAQPage is generated from the FAQ list, not listed here.)
 */
export const builtInSchema: { types: string[]; data: JsonLdNode }[] = [
  {
    types: ["Organization"],
    data: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "ELXOR Perfumes",
      url: `${SITE}/`,
      description:
        "A Dubai-based luxury fragrance brand offering sophisticated, long-lasting unisex Eau de Parfum fragrances.",
      brand: {
        "@type": "Brand",
        "@id": `${SITE}/#brand`,
        name: "ELXOR",
        url: `${SITE}/`,
      },
      email: "sales@elxorperfumes.com",
      telephone: "+971554696935",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+971554696935",
        email: "sales@elxorperfumes.com",
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: ["English"],
      },
    },
  },
  {
    types: ["WebSite"],
    data: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "ELXOR Perfumes",
      description: "Discover ELXOR luxury unisex fragrances, including AMORIEL and SANCTIX.",
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    },
  },
  {
    types: ["WebPage"],
    data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE}/#webpage`,
      url: `${SITE}/`,
      name: "ELXOR Perfumes | The Essence of Elegance",
      description:
        "Explore ELXOR's luxury unisex Eau de Parfum fragrances, AMORIEL and SANCTIX, inspired by elegance, individuality and lasting presence.",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#organization` },
      mainEntity: { "@id": `${SITE}/#brand` },
      inLanguage: "en",
    },
  },
  {
    types: ["Product"],
    data: {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${SITE}/#amoriel`,
      name: "ELXOR AMORIEL",
      brand: { "@type": "Brand", "@id": `${SITE}/#brand`, name: "ELXOR" },
      category: "Unisex Eau de Parfum",
      description:
        "A luxurious unisex Eau de Parfum crafted for those who appreciate sophistication, confidence and timeless elegance.",
      url: `${SITE}/`,
    },
  },
  {
    types: ["Product"],
    data: {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${SITE}/#sanctix`,
      name: "ELXOR SANCTIX",
      brand: { "@type": "Brand", "@id": `${SITE}/#brand`, name: "ELXOR" },
      category: "Unisex Eau de Parfum",
      description:
        "An exclusive unisex Eau de Parfum created for individuals who embrace confidence, sophistication and distinctive style.",
      url: `${SITE}/`,
    },
  },
  {
    types: ["BreadcrumbList"],
    data: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Collection", item: `${SITE}/#collection` },
      ],
    },
  },
];
