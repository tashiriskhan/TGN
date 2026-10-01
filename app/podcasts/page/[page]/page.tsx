export const revalidate = 3600; // 1 hour ISR - cache paginated podcast list
export const dynamicParams = true;

import type { Metadata } from "next"
import PodcastsView from "../../PodcastsView"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params
  const page = Number(p.page) || 1

  return {
    title: "Independent Journalism Podcasts & Audio Stories | The Ground Narrative",
    description: "Listen to in-depth audio stories, independent journalism, interviews, and deep dives covering global politics, conflict, culture, and international affairs.",
    alternates: {
      canonical: "https://www.groundnarrative.com/podcasts",
    },
    ...(page > 1 && {
      robots: { index: false, follow: true },
    }),
  }
}

export default async function PodcastsPagedPage({ params }: any) {
  const p = await params
  const page = Number(p.page) || 1
  return <PodcastsView page={page} />
}
