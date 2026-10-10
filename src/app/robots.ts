import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The editing studio and webhook are not for search engines
      disallow: ["/studio", "/api/"],
    },
    sitemap: "https://www.elxorperfumes.com/sitemap.xml",
  };
}
