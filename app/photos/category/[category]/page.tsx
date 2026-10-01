export const revalidate = 3600; // 1 hour ISR - cache filtered photo list

import type { Metadata } from "next"
import PhotosView from "../../PhotosView"

function categoryLabel(raw: string) {
  const decoded = decodeURIComponent(raw || '')
  return decoded.charAt(0).toUpperCase() + decoded.slice(1).replace(/-/g, ' ')
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params
  const category = p.category

  return {
    title: `${categoryLabel(category)} Photo Stories | The Ground Narrative`,
    description: `Explore independent photojournalism and photo essays on ${categoryLabel(category)} from The Ground Narrative.`,
    alternates: {
      canonical: `https://www.groundnarrative.com/photos/category/${category}`,
    },
  }
}

export default async function PhotosCategoryPage({ params }: any) {
  const p = await params
  return <PhotosView page={1} category={p.category} />
}
