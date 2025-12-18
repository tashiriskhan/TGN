// Always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import RightSidebar from "@/app/components/RightSidebar"
import Pagination from "@/app/components/Pagination"
import { getBreakingNews } from "@/sanity/lib/getBreakingNews"
import { getTrending } from "@/sanity/lib/getTrending"

const PAGE_SIZE = 12

export default async function VideosPage({ searchParams }: any) {
  const s = await searchParams
  const page = Number(s.page) || 1
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const videoStories = await client.fetch(
    `*[_type == "videoStory"]
      | order(publishedAt desc)[$start...$end] {
        title,
        description,
        thumbnail,
        publishedAt,
        "slug": slug.current,
        author->{ name }
      }`,
    { start, end }
  )

  const totalVideos = await client.fetch(
    `count(*[_type == "videoStory"])`
  )

  const totalPages = Math.ceil(totalVideos / PAGE_SIZE)

  // Fetch data for sidebar
  const [breaking, trending] = await Promise.all([
    getBreakingNews(),
    getTrending()
  ])

  return (
    <main className="main-content-with-sidebar">
      <div className="container">
        <div className="main-content">
          <h1 style={{ marginBottom: "30px" }}>Video Stories</h1>
          <p className="category-count" style={{ marginBottom: "20px" }}>
            {totalVideos} {totalVideos === 1 ? 'video' : 'videos'}
          </p>

          <div className="tgn-3col-grid">
            {videoStories?.map((story: any) => (
              <article key={story.slug} className="tgn-card">
                <Link href={`/videos/${story.slug}`}>
                  <div style={{ position: "relative" }}>
                    {story.thumbnail && (
                      <Image
                        className="tgn-card-img"
                        src={urlFor(story.thumbnail).width(400).height(300).url()}
                        alt={story.title}
                        width={400}
                        height={300}
                      />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(0, 0, 0, 0.7)",
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        color: "white",
                      }}
                    >
                      ▶
                    </div>
                  </div>
                  <div className="tgn-card-content">
                    <h4>{story.title}</h4>
                    {story.description && (
                      <p className="summary">
                        {story.description.slice(0, 100)}...
                      </p>
                    )}
                    <p className="meta">
                      {timeAgo(story.publishedAt)} • {story.author?.name}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {videoStories?.length === 0 && (
            <p style={{ textAlign: "center", padding: "40px" }}>
              No video stories available yet.
            </p>
          )}

          <Pagination currentPage={page} totalPages={totalPages} basePath="videos" />
        </div>
        <RightSidebar breaking={breaking} trending={trending} />
      </div>
    </main>
  )
}
