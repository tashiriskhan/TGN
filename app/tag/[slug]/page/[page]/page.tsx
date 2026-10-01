export const revalidate = 3600; // 1 hour ISR - cache paginated tag pages
export const dynamicParams = true;

import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import TagView, { getTagTitle } from "../../TagView"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params
  const slug = p.slug
  const page = Number(p.page) || 1

  const tagTitle = await getTagTitle(slug)

  if (!tagTitle) {
    return {
      title: "Tag Not Found",
    }
  }

  return {
    title: `Stories about #${tagTitle} | The Ground Narrative`,
    description: `Browse all stories, reports, and coverage tagged with #${tagTitle} on The Ground Narrative.`,
    alternates: {
      canonical: `${siteConfig.url}/tag/${slug}`,
    },
    ...(page > 1 && {
      robots: { index: false, follow: true },
    }),
  }
}

export default async function TagPagedPage({ params }: any) {
  const p = await params
  const page = Number(p.page) || 1
  return <TagView slug={p.slug} page={page} />
}
