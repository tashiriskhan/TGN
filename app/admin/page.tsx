import React from "react";
import type { Metadata } from "next";
import { getCombinedStories } from "@/app/lib/storyBridge";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Dashboard | The Ground Narrative",
  robots: {
    index: false,
    follow: false,
  },
};

export const revalidate = 300; // 5 min refresh for admin - revalidate=0 is expensive on Netlify

export default async function AdminPage() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...100]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    isFeatured,
    isTrending,
    isBreaking,
    isOpinion,
    isInDepth,
    isSpecial
  }`;

  const data = (await getCombinedStories(query)) as any;

  const sanityStories = (data.sanity || []).map((item: any) => ({
    ...item,
    sourceType: "sanity" as const,
  }));

  const sheetStories = (data.sheet || []).map((item: any) => ({
    ...item,
    sourceType: "sheet" as const,
  }));

  // Merge Sanity & Sheets stories
  const combined = [...sanityStories, ...sheetStories].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <main className="main-content-full">
      <div className="container">
        <AdminDashboardClient initialStories={combined} />
      </div>
    </main>
  );
}
