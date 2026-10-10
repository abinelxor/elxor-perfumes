import type { Metadata, Viewport } from "next";
import "./globals.css";
import { buildMetadata, getSiteSettings } from "@/lib/content";
import { SITE_URL } from "@/lib/defaults";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const base = buildMetadata(settings.defaultSeo);

  return {
    ...base,
    metadataBase: new URL(settings.siteUrl || SITE_URL),
    verification: {
      google: "Vc7M4v_S7LKq279AyB0PRcmwl-9HNn-hwiNpOgpG8iY",
    },
    icons: {
      icon: "/images/favicon.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const organizationWebSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.elxorperfumes.com/#organization",
      "name": "ELXOR Perfumes",
      "url": "https://www.elxorperfumes.com/",
      "description":
        "ELXOR Perfumes is a UAE-based fragrance brand offering luxury unisex Eau de Parfum fragrances designed to leave a memorable presence.",
      "slogan": "Unveil your Aura",
      "brand": {
        "@type": "Brand",
        "name": "ELXOR Perfumes",
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Arab Emirates",
      },
      "sameAs": ["https://www.amazon.ae/"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.elxorperfumes.com/#website",
      "url": "https://www.elxorperfumes.com/",
      "name": "ELXOR Perfumes",
      "description":
        "Discover ELXOR Perfumes, a UAE perfume brand offering luxury unisex Eau de Parfum fragrances.",
      "publisher": {
        "@id": "https://www.elxorperfumes.com/#organization",
      },
      "inLanguage": "en-AE",
    },
    {
      "@type": "WebPage",
      "@id": "https://www.elxorperfumes.com/#webpage",
      "url": "https://www.elxorperfumes.com/",
      "name": "ELXOR Perfumes | Luxury Unisex Perfumes in UAE",
      "description":
        "Discover ELXOR Perfumes, a UAE fragrance brand offering luxury unisex Eau de Parfum fragrances including AMORIEL and SANCTIX.",
      "isPartOf": {
        "@id": "https://www.elxorperfumes.com/#website",
      },
      "about": {
        "@id": "https://www.elxorperfumes.com/#organization",
      },
      "inLanguage": "en-AE",
    },
  ],
};

const productAmorielSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.elxorperfumes.com/amoriel/#product",
  "name": "ELXOR AMORIEL",
  "brand": {
    "@type": "Brand",
    "name": "ELXOR Perfumes",
  },
  "description":
    "AMORIEL is a luxury unisex Eau de Parfum by ELXOR Perfumes, designed for a distinctive and long-lasting fragrance experience.",
  "category": "Perfume",
  "audience": {
    "@type": "PeopleAudience",
    "suggestedGender": "Unisex",
  },
  "url": "https://www.elxorperfumes.com/amoriel/",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint (light is the default) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('elxor-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}`,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M7L8FSRC');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZYVY13R5NS"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZYVY13R5NS');
`,
          }}
        />

        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="Vc7M4v_S7LKq279AyB0PRcmwl-9HNn-hwiNpOgpG8iY"
        />

        {/* Schema.org Organization, WebSite & WebPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationWebSchema),
          }}
        />

        {/* Schema.org Product: AMORIEL */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productAmorielSchema),
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..700&family=Inria+Serif:wght@400&family=Inter:wght@300;400;500;600&family=Pinyon+Script&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          as="image"
          href="/frames/frame_001.webp"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          as="image"
          href="/frames-m/frame_001.webp"
          media="(max-width: 767px)"
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M7L8FSRC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
