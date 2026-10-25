import type { Metadata, Viewport } from "next";
import "../globals.css";
import CodeSlot from "@/components/CodeSlot";
import { buildMetadata, customJsonLdBlocks, getCodeSnippets, getSiteSettings, jsonLd } from "@/lib/content";
import { builtInSchema } from "@/lib/builtInSchema";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Custom head/body code added in the Studio, grouped by where it should be placed
  const [snippets, settings] = await Promise.all([getCodeSnippets(), getSiteSettings()]);

  // Schema markup pasted in Site settings > Default SEO (any number of blocks). Built-in
  // markup is only added for types the editor did not supply, so nothing is duplicated.
  const custom = customJsonLdBlocks(settings.defaultSeo?.structuredData);
  const schemaBlocks = [
    ...custom.json,
    ...builtInSchema
      .filter((block) => !block.types.some((type) => custom.types.has(type)))
      .map((block) => jsonLd(block.data)),
  ];
  const at = (position: string) => snippets.filter((snippet) => snippet.position === position);

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <CodeSlot snippets={at("headStart")} />
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

        {/* Schema.org markup: Organization, WebSite, WebPage, Products, Breadcrumbs (editable in Site settings) */}
        {schemaBlocks.map((json, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: json }}
          />
        ))}

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
        <CodeSlot snippets={at("headEnd")} />
      </head>
      <body>
        <CodeSlot snippets={at("bodyStart")} />
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
        <CodeSlot snippets={at("bodyEnd")} />
      </body>
    </html>
  );
}
