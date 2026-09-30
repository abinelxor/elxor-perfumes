import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ELXOR PERFUMES | The Essence of Elegance",
  description:
    "ELXOR Perfumes. Timeless fragrances crafted for those who appreciate distinction. Discover Noir Essence, Royal Oud, Silver Ambre and Velvet Rouge.",
  keywords:
    "luxury perfume, luxury fragrances, ELXOR, oud, noir essence, velvet rouge, silver ambre, luxury scents",
  icons: {
    icon: "/images/favicon.png",
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
