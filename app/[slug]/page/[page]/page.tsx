export const revalidate = 3600; // 1 hour ISR - cache paginated category pages
export const dynamicParams = true;

import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import CategoryView, { RESERVED_ROUTES, getCategoryMeta } from "../../CategoryView"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params
  const slug = p.slug
  const page = Number(p.page) || 1

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
    // Paginated views compete with the first page; tell Google to ignore them.
    ...(page > 1 && {
      robots: { index: false, follow: true },
    }),
  }
}

export default async function CategoryPagedPage({ params }: any) {
  const p = await params
  const page = Number(p.page) || 1
  return <CategoryView slug={p.slug} page={page} />
}
