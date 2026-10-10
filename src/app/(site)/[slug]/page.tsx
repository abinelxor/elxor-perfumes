import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubPageShell from "@/components/SubPageShell";
import { PageView, ProductView } from "@/components/SanityPage";
import {
  buildMetadata,
  getAllSlugs,
  getPageBySlug,
  getProductBySlug,
  getSiteSettings,
  resolveContact,
} from "@/lib/content";

// Pages and products created in the Studio are served at /<slug>.
export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams() {
  const docs = await getAllSlugs();
  return docs.map(({ slug }) => ({ slug }));
}

async function getDoc(slug: string) {
  const page = await getPageBySlug(slug);
  if (page) return { kind: "page" as const, doc: page };
  const product = await getProductBySlug(slug);
  if (product) return { kind: "product" as const, doc: product };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const found = await getDoc(slug);
  if (!found) return { title: "Page not found | ELXOR", robots: { index: false } };

  if (found.kind === "page") {
    return buildMetadata(found.doc.seo, {
      title: `${found.doc.title} | ELXOR`,
      description: found.doc.intro,
      path: `/${slug}`,
    });
  }
  return buildMetadata(found.doc.seo, {
    title: `${found.doc.name} Eau de Parfum | ELXOR`,
    description: found.doc.description || found.doc.tagline,
    path: `/${slug}`,
  });
}

export default async function SanitySlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [found, settings] = await Promise.all([getDoc(slug), getSiteSettings()]);
  if (!found) notFound();

  return (
    <SubPageShell email={resolveContact(settings).email}>
      {found.kind === "page" ? <PageView page={found.doc} /> : <ProductView product={found.doc} />}
    </SubPageShell>
  );
}
