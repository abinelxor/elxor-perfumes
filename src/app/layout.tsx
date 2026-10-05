import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://elxorperfumes.com"),
  alternates: {
    canonical: "https://elxorperfumes.com",
  },
  title: "Luxury Unisex Perfume Dubai | ELXOR Long Lasting Fragrance",
  description:
    "ELXOR is a Dubai perfume brand with two long lasting fragrance collections, Signature and Promise, for men and women. Order online via Amazon in the UAE.",
  keywords:
    "luxury unisex perfume dubai, elxor long lasting fragrance, dubai perfume brand, amoriel, sanctix, eau de parfum, perfume for men, perfume for women, best perfume for men, best perfumes for women, buy best perfume online, amazon uae",
  verification: {
    google: "Vc7M4v_S7LKq279AyB0PRcmwl-9HNn-hwiNpOgpG8iY",
  },
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    title: "Luxury Unisex Perfume Dubai | ELXOR Long Lasting Fragrance",
    description:
      "ELXOR is a Dubai perfume brand with two long lasting fragrance collections, Signature and Promise, for men and women. Order online via Amazon in the UAE.",
    url: "https://elxorperfumes.com",
    type: "website",
    siteName: "ELXOR Perfumes",
  },
};

export const viewport: Viewport = {
  themeColor: "#050403",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
        <link rel="preload" as="image" href="/frames/frame_001.webp" />
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
