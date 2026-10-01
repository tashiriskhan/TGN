export const revalidate = 3600; // 1 hour ISR - cache paginated author pages
export const dynamicParams = true;

import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import AuthorView, { getAuthorInfo } from "../../AuthorView"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params
  const slug = p.slug
  const page = Number(p.page) || 1

  const author = await getAuthorInfo(slug)

  if (!author) {
    const derivedName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
    return {
      title: `${derivedName} | Journalist & Writer`,
      description: `Read articles and reports written by ${derivedName} on The Ground Narrative.`,
      alternates: {
        canonical: `${siteConfig.url}/authors/${slug}`,
      },
      ...(page > 1 && {
        robots: { index: false, follow: true },
      }),
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
    ...(page > 1 && {
      robots: { index: false, follow: true },
    }),
  }
}

export default async function AuthorPagedPage({ params }: any) {
  const p = await params
  const page = Number(p.page) || 1
  return <AuthorView slug={p.slug} page={page} />
}
