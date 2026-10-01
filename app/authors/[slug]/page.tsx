export const revalidate = 3600; // 1 hour ISR - cache author pages
export const dynamicParams = true;

import type { Metadata } from "next"
import { client } from "@/sanity/lib/sanity"
import { siteConfig } from "@/config/site"
import AuthorView, { getAuthorInfo } from "./AuthorView"

export async function generateStaticParams() {
  try {
    const query = `*[_type == "author"]{ "slug": slug.current }`;
    const authors = await client.fetch(query) as any[];
    return authors.map((a: any) => ({ slug: a.slug }));
  } catch (e) {
    console.error("Error generating static params for authors:", e);
    return [];
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params
  const slug = p.slug

  const author = await getAuthorInfo(slug)

  if (!author) {
    const derivedName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
    return {
      title: `${derivedName} | Journalist & Writer`,
      description: `Read articles and reports written by ${derivedName} on The Ground Narrative.`,
      alternates: {
        canonical: `${siteConfig.url}/authors/${slug}`,
      },
    }
  }

  const description = author.bio
    ? `${author.bio.slice(0, 155)}...`
    : `Read articles and reports written by ${author.name} on The Ground Narrative.`

  return {
    title: `${author.name} | Journalist & Writer`,
    description,
    alternates: {
      canonical: `${siteConfig.url}/authors/${slug}`,
    },
  }
}

export default async function AuthorPage({ params }: any) {
  const p = await params
  return <AuthorView slug={p.slug} page={1} />
}
