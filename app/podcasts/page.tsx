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

export default async function PodcastsPage({ searchParams }: any) {
  const s = await searchParams
  const page = Number(s.page) || 1
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const podcasts = await client.fetch(
    `*[_type == "podcast"]
      | order(publishedAt desc)[$start...$end] {
        title,
        description,
        duration,
        thumbnail,
        publishedAt,
        "slug": slug.current,
        author->{ name }
      }`,
    { start, end }
  )

  const totalPodcasts = await client.fetch(
    `count(*[_type == "podcast"])`
  )

  const totalPages = Math.ceil(totalPodcasts / PAGE_SIZE)

  // Fetch data for sidebar
  const [breaking, trending] = await Promise.all([
    getBreakingNews(),
    getTrending()
  ])

  return (
    <main className="main-content-with-sidebar">
      <div className="container">
        <div className="main-content">
          <h1 style={{ marginBottom: "30px" }}>Podcasts</h1>
          <p className="category-count" style={{ marginBottom: "20px" }}>
            {totalPodcasts} {totalPodcasts === 1 ? 'podcast' : 'podcasts'}
          </p>

          <div className="podcast-list">
            {podcasts?.map((podcast: any) => (
              <article key={podcast.slug} className="podcast-item">
                <Link href={`/podcasts/${podcast.slug}`}>
                  <div className="podcast-thumbnail">
                    {podcast.thumbnail ? (
                      <Image
                        src={urlFor(podcast.thumbnail).width(120).height(120).url()}
                        alt={podcast.title}
                        width={120}
                        height={120}
                      />
                    ) : (
                      <div className="podcast-placeholder">
                        🎧
                      </div>
                    )}
                  </div>
                  <div className="podcast-content">
                    <h4>{podcast.title}</h4>
                    {podcast.duration && (
                      <p className="podcast-duration">{podcast.duration}</p>
                    )}
                    {podcast.description && (
                      <p className="summary">
                        {podcast.description.slice(0, 150)}...
                      </p>
                    )}
                    <p className="meta">
                      {timeAgo(podcast.publishedAt)} • {podcast.author?.name}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {podcasts?.length === 0 && (
            <p style={{ textAlign: "center", padding: "40px" }}>
              No podcasts available yet.
            </p>
          )}

          <Pagination currentPage={page} totalPages={totalPages} basePath="podcasts" />
        </div>
        <RightSidebar breaking={breaking} trending={trending} />
      </div>
    </main>
  )
}
