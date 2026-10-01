export const revalidate = 3600; // 1 hour ISR - cache paginated photo list
export const dynamicParams = true;

import type { Metadata } from "next"
import PhotosView from "../../PhotosView"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params
  const page = Number(p.page) || 1

  return {
    title: "Visual Journalism & Photo Stories | The Ground Narrative",
    description: "Explore premium independent photojournalism, photo essays, and in-depth visual narratives covering geopolitics, culture, conflict, and human stories from around the globe.",
    alternates: {
      canonical: "https://www.groundnarrative.com/photos",
    },
    ...(page > 1 && {
      robots: { index: false, follow: true },
    }),
  }
}

export default async function PhotosPagedPage({ params }: any) {
  const p = await params
  const page = Number(p.page) || 1
  return <PhotosView page={page} category="all" />
}
