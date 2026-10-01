export const revalidate = 3600; // 1 hour ISR - cache category pages
export const dynamicParams = true;

import type { Metadata } from "next"
import { client } from "@/sanity/lib/sanity"
import { siteConfig } from "@/config/site"
import CategoryView, { RESERVED_ROUTES, getCategoryMeta } from "./CategoryView"

export async function generateStaticParams() {
  try {
    const query = `*[_type == "category"]{ "slug": slug.current }`;
    const categories = await client.fetch(query) as any[];
    return categories.map((c: any) => ({ slug: c.slug }));
  } catch (e) {
    console.error("Error generating static params for categories:", e);
    return [];
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params
  const slug = p.slug

  if (RESERVED_ROUTES.includes(slug)) {
    return {}
  }

  const category = await getCategoryMeta(slug)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.title} | The Ground Narrative`,
    description: category.description || `Read in-depth reporting and stories on ${category.title} from The Ground Narrative.`,
    alternates: {
      canonical: `${siteConfig.url}/${slug}`,
    },
  }
}

export default async function CategoryPage({ params }: any) {
  const p = await params
  return <CategoryView slug={p.slug} page={1} />
}
