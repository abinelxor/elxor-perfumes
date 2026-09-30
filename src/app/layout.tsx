import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxury Unisex Perfume Dubai | ELXOR Long Lasting Fragrance",
  description:
    "ELXOR is a Dubai perfume brand with two long lasting fragrance collections, Signature and Promise, for men and women. Order online via Amazon in the UAE.",
  keywords:
    "luxury unisex perfume dubai, elxor long lasting fragrance, dubai perfume brand, amoriel, sanctix, eau de parfum, perfume for men, perfume for women, best perfume for men, best perfumes for women, buy best perfume online, amazon uae",
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    title: "Luxury Unisex Perfume Dubai | ELXOR Long Lasting Fragrance",
    description:
      "ELXOR is a Dubai perfume brand with two long lasting fragrance collections, Signature and Promise, for men and women. Order online via Amazon in the UAE.",
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
      <body>{children}</body>
    </html>
  );
}
