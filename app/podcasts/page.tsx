export const revalidate = 3600; // 1 hour ISR - cache podcast list page

import type { Metadata } from "next"
import PodcastsView from "./PodcastsView"

export const metadata: Metadata = {
  title: "Independent Journalism Podcasts & Audio Stories | The Ground Narrative",
  description: "Listen to in-depth audio stories, independent journalism, interviews, and deep dives covering global politics, conflict, culture, and international affairs.",
  alternates: {
    canonical: "https://www.groundnarrative.com/podcasts",
  },
}

export default function PodcastsPage() {
  return <PodcastsView page={1} />
}
