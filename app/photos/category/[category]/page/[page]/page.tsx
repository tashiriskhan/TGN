export const revalidate = 3600; // 1 hour ISR - cache paginated filtered photo list
export const dynamicParams = true;

import type { Metadata } from "next"
import PhotosView from "../../../../PhotosView"

function categoryLabel(raw: string) {
  const decoded = decodeURIComponent(raw || '')
  return decoded.charAt(0).toUpperCase() + decoded.slice(1).replace(/-/g, ' ')
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params
  const category = p.category
  const page = Number(p.page) || 1

  return {
    title: `${categoryLabel(category)} Photo Stories | The Ground Narrative`,
    description: `Explore independent photojournalism and photo essays on ${categoryLabel(category)} from The Ground Narrative.`,
    alternates: {
      canonical: `https://www.groundnarrative.com/photos/category/${category}`,
    },
    ...(page > 1 && {
      robots: { index: false, follow: true },
    }),
  }
}

export default async function PhotosCategoryPagedPage({ params }: any) {
  const p = await params
  const page = Number(p.page) || 1
  return <PhotosView page={page} category={p.category} />
}
