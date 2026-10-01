export const revalidate = 3600; // 1 hour ISR - cache tag pages
export const dynamicParams = true;

import type { Metadata } from "next"
import { client } from "@/sanity/lib/sanity"
import { siteConfig } from "@/config/site"
import TagView, { getTagTitle } from "./TagView"

export async function generateStaticParams() {
  try {
    const query = `*[_type == "tag"] | order(title asc)[0...100]{ "slug": slug.current }`;
    const tags = await client.fetch(query) as any[];
    return tags.map((t: any) => ({ slug: t.slug }));
  } catch (e) {
    console.error("Error generating static params for tags:", e);
    return [];
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params
  const slug = p.slug

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
  }
}

export default async function TagPage({ params }: any) {
  const p = await params
  return <TagView slug={p.slug} page={1} />
}
