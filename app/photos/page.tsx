export const revalidate = 3600; // 1 hour ISR - cache photo list page

import type { Metadata } from "next"
import PhotosView from "./PhotosView"

export const metadata: Metadata = {
  title: "Visual Journalism & Photo Stories | The Ground Narrative",
  description: "Explore premium independent photojournalism, photo essays, and in-depth visual narratives covering geopolitics, culture, conflict, and human stories from around the globe.",
  alternates: {
    canonical: "https://www.groundnarrative.com/photos",
  },
};

export default function PhotosPage() {
  return <PhotosView page={1} category="all" />
}
