import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { customJsonLd, faqPageSchema, jsonLd, type PageDoc, type ProductDoc } from "@/lib/content";
import { SITE_URL } from "@/lib/defaults";
import { sizedImage } from "@/lib/sanity/image";

const portableComponents: PortableTextComponents = {
  types: {
    imageWithAlt: ({ value }: { value: { url?: string; alt?: string; caption?: string } }) =>
      value?.url ? (
        <figure className="prose__figure">
          <img src={sizedImage(value.url, 1400)} alt={value.alt ?? ""} loading="lazy" />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
};

function JsonLd({ json }: { json: string | null }) {
  if (!json) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="subpage__faq" aria-label="Frequently asked questions">
      <h2 className="section-title section-title--left">FAQs</h2>
      {faqs.map((f) => (
        <details key={f.question} className="subpage__faq-item">
          <summary>{f.question}</summary>
          <p>{f.answer}</p>
        </details>
      ))}
    </section>
  );
}

/** A standalone page created in the Studio (About, policy, landing page...). */
export function PageView({ page }: { page: PageDoc }) {
  const faqs = (page.faqs ?? []).filter((f) => f.question && f.answer);
  return (
    <article className="subpage__article">
      {page.heroImage && (
        <img
          className="subpage__hero"
          src={sizedImage(page.heroImage, 1800)}
          alt={page.heroAlt ?? ""}
        />
      )}
      <p className="eyebrow">
        <span className="brand">ELXOR</span>
      </p>
      <h1 className="section-title section-title--left">{page.heading || page.title}</h1>
      {page.intro && <p className="subpage__intro">{page.intro}</p>}
      {page.body && page.body.length > 0 && (
        <div className="prose">
          <PortableText
            value={page.body as Parameters<typeof PortableText>[0]["value"]}
            components={portableComponents}
          />
        </div>
      )}
      {faqs.length > 0 && <FaqList faqs={faqs} />}

      <JsonLd json={faqs.length > 0 ? jsonLd(faqPageSchema(faqs, `${SITE_URL}/${page.slug}`)) : null} />
      <JsonLd json={customJsonLd(page.seo?.structuredData)} />
    </article>
  );
}

function money(price: number, currency?: string) {
  const amount = Number.isInteger(price) ? String(price) : price.toFixed(2);
  return currency === "USD" ? `$${amount}` : `${currency ?? "AED"} ${amount}`;
}

/** A product created in the Studio, with price, stock and Product schema. */
export function ProductView({ product }: { product: ProductDoc }) {
  const images = [
    product.image ? { url: product.image, alt: product.imageAlt ?? product.name } : null,
    ...(product.gallery ?? []).map((g) => (g.url ? { url: g.url, alt: g.alt ?? product.name } : null)),
  ].filter(Boolean) as { url: string; alt: string }[];

  const inStock = product.inStock !== false;
  const pageUrl = `${SITE_URL}/${product.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${pageUrl}/#product`,
    name: product.name,
    description: product.description || product.story,
    image: images.map((i) => sizedImage(i.url, 1200)),
    sku: product.sku,
    brand: { "@type": "Brand", name: "ELXOR Perfumes" },
    url: pageUrl,
    ...(product.price !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: product.currency ?? "AED",
            availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: product.buyUrl || pageUrl,
          },
        }
      : {}),
  };

  const notes: [string, string[] | undefined][] = [
    ["Top notes", product.topNotes],
    ["Heart notes", product.heartNotes],
    ["Base notes", product.baseNotes],
  ];

  return (
    <article className="product">
      <div className="product__gallery">
        {images.map((img, i) => (
          <img
            key={img.url}
            src={sizedImage(img.url, i === 0 ? 1200 : 800)}
            alt={img.alt}
            className={i === 0 ? "product__main" : "product__thumb"}
          />
        ))}
      </div>

      <div className="product__info">
        <p className="eyebrow">
          Eau de Parfum{product.size ? ` · ${product.size}` : ""}
        </p>
        <h1 className="section-title section-title--left">{product.name}</h1>
        {product.tagline && <p className="product__tagline">{product.tagline}</p>}

        {product.price !== undefined && (
          <p className="product__price">
            {product.compareAtPrice ? (
              <s className="product__compare">{money(product.compareAtPrice, product.currency)}</s>
            ) : null}
            <span>{money(product.price, product.currency)}</span>
            <span className={`product__stock ${inStock ? "is-in" : "is-out"}`}>
              {inStock ? "In stock" : "Out of stock"}
            </span>
          </p>
        )}

        {product.description && <p className="product__text">{product.description}</p>}
        {product.story && product.story !== product.description && (
          <p className="product__text">{product.story}</p>
        )}

        <div className="product__notes">
          {notes.map(([label, list]) =>
            list && list.length > 0 ? (
              <div key={label}>
                <h2>{label}</h2>
                <p>{list.join(", ")}</p>
              </div>
            ) : null,
          )}
        </div>

        {product.signatureQuote && <blockquote className="product__quote">{product.signatureQuote}</blockquote>}

        {inStock && product.buyUrl ? (
          <a className="btn btn--gold" href={product.buyUrl} target="_blank" rel="noopener noreferrer">
            Buy on Amazon <i className="arrow" aria-hidden="true" />
          </a>
        ) : !inStock ? (
          <span className="btn btn--ghost product__soldout" aria-disabled="true">
            Currently unavailable
          </span>
        ) : null}
      </div>

      <JsonLd json={jsonLd(schema)} />
      <JsonLd json={customJsonLd(product.seo?.structuredData)} />
    </article>
  );
}
